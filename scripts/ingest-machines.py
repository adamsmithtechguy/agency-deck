#!/usr/bin/env python3
"""Parse the pasted machine export, geocode UK postcodes, emit TypeScript data.

Accepts the original messy paste, or compact pipe-delimited rows:
name|model|postcode|city|lat|lng|date|operator|label
"""

from __future__ import annotations

import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW = Path(__file__).with_name("machines-raw.txt")
OUT_TS = ROOT / "src" / "data" / "machineSites.ts"
OUT_JSON = ROOT / "src" / "data" / "machine-sites.json"

PC_RE = re.compile(r"\b([A-Z]{1,2}\d[A-Z\d]{0,2})\s*(\d[A-Z]{2})\b", re.I)
DATE_RE = re.compile(r"\b(\d{1,2} [A-Z][a-z]{2} 20\d{2})\b")
FLOAT_RE = re.compile(r"(-?\d{1,2}\.\d{3,})")
CYRILLIC = str.maketrans("АВЕКМНОРСТХ", "ABEKMHOPCTX")
PC_TYPOS = {
    "SP19 2PP": "SW19 2PP",
    "НА1 3TP": "HA1 3TP",
}

MODELS = [
    "BevMax4 Media 24V",
    "BevMax4 Classic 24V",
    "BevMax3 Media 24V",
    "BevMax3 Classic 24V",
    "BevMax Refresh",
    "Merchant4",
    "Merchant6",
    "Snakky Max",
    "Callisto",
    "Europa",
    "Screens",
    "Samba",
    "Blinx",
]


def normalise_pc(value: str) -> str:
    cleaned = value.upper().translate(CYRILLIC)
    cleaned = re.sub(r"[^A-Z0-9]", "", cleaned)
    if len(cleaned) < 5:
        return ""
    spaced = f"{cleaned[:-3]} {cleaned[-3:]}"
    return PC_TYPOS.get(spaced, spaced)


def uk_coord(lat: float, lng: float) -> bool:
    return 49.8 <= lat <= 60.9 and -8.8 <= lng <= 2.0


def extract_postcode(block: str) -> str:
    found = [normalise_pc(m.group(0)) for m in PC_RE.finditer(block)]
    found = [p for p in found if p]
    return found[-1] if found else ""


def extract_coords(block: str) -> tuple[float, float] | None:
    nums = [float(x) for x in FLOAT_RE.findall(block)]
    for i in range(len(nums) - 1, 0, -1):
        lat, lng = nums[i - 1], nums[i]
        if uk_coord(lat, lng):
            return lat, lng
    return None


def extract_model(block: str) -> str:
    for model in MODELS:
        if model.lower() in block.lower():
            return model
    return ""


def tidy_label(raw: str, city: str, operator: str) -> str:
    text = re.sub(r"\s+", " ", raw or "").strip(" ,;")
    text = re.sub(r"\b-?\d{1,2}\.\d{3,}\b", " ", text)
    text = DATE_RE.sub(" ", text)
    text = re.sub(r"\s+", " ", text).strip(" ,;")
    gym = re.search(r"(The Gym(?: Group)? [^;]+)", text)
    if gym:
        return gym.group(1).strip(" ,")
    snap = re.search(r"(Snap Fitness [^;]+)", text)
    if snap:
        return snap.group(1).strip(" ,")
    if "Airport" in (operator or "") or re.search(r"\bAirport\b", text):
        if "Manchester" in text or "MAN " in text:
            return "Manchester Airport"
        if "Stansted" in text or "Stanstead" in text or "STN " in text:
            return "London Stansted Airport"
        if "East Midlands" in text or "EMA " in text:
            return "East Midlands Airport"
        if "Southend" in text:
            return "London Southend Airport"
        return operator or "Airport"
    if operator and operator not in ("Selecta", "Unknown") and len(operator) < 48:
        if city and city.lower() not in operator.lower():
            return f"{operator}"
        return operator
    if city:
        return city
    return text[:60] if text else "Site"


def extract_site_label(block: str, city: str, operator: str) -> str:
    lines = [ln.strip(" \t,") for ln in block.splitlines() if ln.strip()]
    venue = re.compile(
        r"(The Gym|Snap Fitness|Powerleague|PureGym|Pure Gym|Airport|University|Hospital|Golf Club|ASDA|Royal Holloway|Fitness First|Leisure|Oxford Brookes|EVRI|UCL|City, University)",
        re.I,
    )
    for line in lines[1:]:
        if venue.search(line) and not line.startswith("BB") and "Monitoring" not in line and "Campaign" not in line:
            if ";" in line and not re.search(r"^(The Gym|Snap Fitness|Oxford Brookes|University)", line):
                continue
            return tidy_label(line, city, operator)
    return tidy_label("", city, operator)


def extract_city(block: str, postcode: str) -> str:
    coords = extract_coords(block)
    if not coords:
        return ""
    lat_s = str(coords[0])
    idx = block.find(lat_s)
    before = re.sub(r"\s+", " ", block[:idx]).strip()
    if postcode:
        before = before.split(postcode)[-1]
    before = re.sub(
        r"\b(Greater London|Greater Manchester|West Yorkshire|South Yorkshire|West Midlands|East Sussex|West Sussex|North Yorkshire|Tyne and Wear|Rhondda Cynon Taf|North East Lincolnshire|London Borough of [A-Za-z]+)\b",
        " ",
        before,
    )
    tokens = [t.strip(" ,") for t in re.split(r"[\t,]", before) if t.strip(" ,")]
    if tokens:
        city = re.sub(r"\s+", " ", tokens[-1]).strip(" ,")
        if 2 <= len(city) <= 40:
            return city
    return ""


def parse_pipe_row(line: str) -> dict | None:
    parts = [p.strip() for p in line.split("|")]
    if len(parts) < 8:
        return None
    name, model, postcode, city, lat_s, lng_s, installed, operator, *rest = parts
    label = rest[0] if rest else city
    try:
        lat, lng = float(lat_s), float(lng_s)
    except ValueError:
        lat = lng = None
    return {
        "name": name,
        "model": model,
        "postcode": normalise_pc(postcode) if postcode else "",
        "city": city,
        "operator": operator or "Unknown",
        "installed": installed,
        "srcLat": lat,
        "srcLng": lng,
        "label": label or city or "Unknown site",
    }


def parse_blocks(text: str) -> list[dict]:
    text = text.replace("\u00a0", " ")
    lines = [ln for ln in text.splitlines() if ln.strip() and not ln.startswith("#")]
    if lines and "|" in lines[0] and lines[0].startswith("BB"):
        rows = [parse_pipe_row(ln) for ln in lines]
        return [r for r in rows if r]

    chunks = re.split(r"(?m)(?=^BB(?!\d))", text)
    machines: list[dict] = []
    seen: set[str] = set()
    for chunk in chunks:
        chunk = chunk.strip()
        if not chunk.startswith("BB"):
            continue
        rec_lines = [ln.strip() for ln in chunk.splitlines() if ln.strip()]
        name = re.sub(r"\s+", " ", rec_lines[0]).strip()
        if name in seen:
            name = f"{name} #{len(seen)}"
        seen.add(name)
        date_m = DATE_RE.search(chunk)
        installed = date_m.group(1) if date_m else ""
        operator = ""
        if date_m:
            operator = re.sub(r"\s+", " ", chunk[date_m.end() :]).strip(" \t,")
            operator = operator.split("\n")[0].strip(" \t,")
        postcode = extract_postcode(chunk)
        coords = extract_coords(chunk)
        city = extract_city(chunk, postcode)
        machines.append(
            {
                "name": name,
                "model": extract_model(chunk),
                "postcode": postcode,
                "city": city,
                "operator": operator or "Unknown",
                "installed": installed,
                "srcLat": coords[0] if coords else None,
                "srcLng": coords[1] if coords else None,
                "label": extract_site_label(chunk, city, operator),
            }
        )
    return machines


def geocode(postcodes: list[str]) -> dict[str, tuple[float, float]]:
    lookup: dict[str, tuple[float, float]] = {}
    unique = sorted({p for p in postcodes if p})
    print(f"geocoding {len(unique)} postcodes…", flush=True)
    for i in range(0, len(unique), 100):
        batch = unique[i : i + 100]
        payload = json.dumps({"postcodes": batch}).encode()
        req = urllib.request.Request(
            "https://api.postcodes.io/postcodes",
            data=payload,
            headers={"Content-Type": "application/json"},
            method="POST",
        )
        try:
            with urllib.request.urlopen(req, timeout=30) as res:
                body = json.loads(res.read().decode())
        except urllib.error.URLError as exc:
            print(f"batch failed ({exc}); retrying once", flush=True)
            time.sleep(1.2)
            with urllib.request.urlopen(req, timeout=30) as res:
                body = json.loads(res.read().decode())
        for row in body.get("result", []):
            query = normalise_pc(row.get("query") or "")
            result = row.get("result")
            if query and result and result.get("latitude") is not None:
                lookup[query] = (float(result["latitude"]), float(result["longitude"]))
        time.sleep(0.12)
    missing = [p for p in unique if p not in lookup]
    for pc in missing:
        outcode = pc.split()[0]
        url = f"https://api.postcodes.io/outcodes/{urllib.parse.quote(outcode)}"
        try:
            with urllib.request.urlopen(url, timeout=15) as res:
                body = json.loads(res.read().decode())
            result = body.get("result")
            if result and result.get("latitude") is not None:
                lookup[pc] = (float(result["latitude"]), float(result["longitude"]))
                print(f"  outcode fallback {pc} → {outcode}")
        except urllib.error.URLError:
            pass
    return lookup


def cluster(machines: list[dict], geo: dict[str, tuple[float, float]]) -> list[dict]:
    groups: dict[str, list[dict]] = defaultdict(list)
    skipped = 0
    for m in machines:
        lat = lng = None
        pc = m["postcode"]
        if pc in geo:
            lat, lng = geo[pc]
        elif m["srcLat"] is not None and m["srcLng"] is not None and uk_coord(m["srcLat"], m["srcLng"]):
            lat, lng = m["srcLat"], m["srcLng"]
        if lat is None:
            skipped += 1
            continue
        key = pc or f"{round(lat, 4)},{round(lng, 4)}"
        groups[key].append({**m, "lat": lat, "lng": lng})
    if skipped:
        print(f"skipped {skipped} machines with no usable location")

    sites = []
    for rows in groups.values():
        labels = Counter(r["label"] for r in rows if r["label"])
        cities = Counter(r["city"] for r in rows if r["city"])
        operators = Counter(r["operator"] for r in rows if r["operator"])
        sites.append(
            {
                "postcode": rows[0]["postcode"],
                "lat": round(rows[0]["lat"], 5),
                "lng": round(rows[0]["lng"], 5),
                "city": cities.most_common(1)[0][0] if cities else "",
                "label": tidy_label(
                    labels.most_common(1)[0][0] if labels else "",
                    cities.most_common(1)[0][0] if cities else "",
                    operators.most_common(1)[0][0] if operators else "",
                ),
                "operator": operators.most_common(1)[0][0] if operators else "",
                "count": len(rows),
                "machines": [
                    {
                        "name": r["name"],
                        "model": r["model"],
                        "operator": r["operator"],
                        "installed": r["installed"],
                    }
                    for r in rows
                ],
            }
        )
    sites.sort(key=lambda s: (-s["count"], s["label"]))
    return sites


def emit_ts(sites: list[dict], machine_count: int, geocoded: int) -> str:
    slim = [
        {
            "postcode": s["postcode"],
            "lat": s["lat"],
            "lng": s["lng"],
            "city": s["city"],
            "label": s["label"],
            "operator": s["operator"],
            "count": s["count"],
        }
        for s in sites
    ]
    payload = json.dumps(slim, ensure_ascii=False)
    return f"""// Auto-generated by scripts/ingest-machines.py — live Bright.Blue estate.
export type MachineSite = {{
  postcode: string
  lat: number
  lng: number
  city: string
  label: string
  operator: string
  count: number
}}

export const MACHINE_COUNT = {machine_count}
export const SITE_COUNT = {len(sites)}
export const GEOCODED_SITES = {geocoded}

export const MACHINE_SITES: MachineSite[] = {payload}
"""


def main() -> int:
    if not RAW.exists():
        print(f"missing {RAW}", file=sys.stderr)
        return 1
    machines = parse_blocks(RAW.read_text(encoding="utf-8"))
    print(f"parsed {len(machines)} machines")
    missing_pc = sum(1 for m in machines if not m["postcode"])
    print(f"without postcode: {missing_pc}")
    geo = geocode([m["postcode"] for m in machines])
    print(f"geocoded {len(geo)} postcodes")
    sites = cluster(machines, geo)
    geocoded_sites = sum(1 for s in sites if s["postcode"] in geo)
    OUT_TS.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(sites, ensure_ascii=False, indent=2), encoding="utf-8")
    OUT_TS.write_text(emit_ts(sites, len(machines), geocoded_sites), encoding="utf-8")
    print(f"wrote {OUT_TS.relative_to(ROOT)} ({len(sites)} sites, {sum(s['count'] for s in sites)} plotted)")
    print(f"wrote {OUT_JSON.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

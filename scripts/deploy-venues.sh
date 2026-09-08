#!/usr/bin/env bash
# Slim deploy: venues deck only (full dist is too large for a first Pages upload).
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
src="$root/dist"
out="$root/.venues-dist"
rm -rf "$out"
mkdir -p "$out/assets" "$out/brand"
cp "$src/event-venues.html" "$out/index.html"
cp "$src/assets/"*.js "$src/assets/"*.css "$out/assets/"
cp "$src/brand/symbol.png" "$out/brand/"
cp "$src/assets/bb-logo.png" "$out/assets/"
cp -R "$src/assets/connected-events" "$out/assets/"
npx wrangler pages deploy "$out" --project-name=bright-blue-event-venues --branch=main --commit-dirty=true

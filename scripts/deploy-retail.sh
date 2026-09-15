#!/usr/bin/env bash
# Slim deploy: connected-retail pack only (full dist includes unused videos).
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
src="$root/dist"
out="$root/.retail-dist"
rm -rf "$out"
mkdir -p "$out/assets/connected-retail" "$out/assets/bento" "$out/brand"
cp "$src/connected-retail.html" "$out/index.html"
cp "$root/share-intro.html" "$out/intro.html"
cp "$root/share-intro.html" "$out/intro-connect.html"
cp "$src/assets/"*.js "$src/assets/"*.css "$out/assets/"
cp "$src/brand/symbol.png" "$out/brand/"
cp "$src/assets/bb-logo.png" "$out/assets/"
cp "$src/assets/gym-group-connected.jpg" "$out/assets/"
cp "$src/assets/magnum-airport.png" "$out/assets/"
cp -R "$src/assets/connected-retail/." "$out/assets/connected-retail/"
cp -R "$src/assets/bento/." "$out/assets/bento/"
npx wrangler pages deploy "$out" --project-name=bright-blue-connected-retail --branch=main --commit-dirty=true

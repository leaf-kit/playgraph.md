#!/usr/bin/env bash
# Generate PNG icons from app-icon.svg at standard sizes.
# Requires: rsvg-convert (librsvg) — install via `brew install librsvg`
#
# Usage: ./scripts/generate-icons.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
IMAGES_DIR="$PROJECT_DIR/images"
SVG="$IMAGES_DIR/app-icon.svg"

if ! command -v rsvg-convert &>/dev/null; then
  echo "Error: rsvg-convert not found. Install with: brew install librsvg"
  exit 1
fi

if [ ! -f "$SVG" ]; then
  echo "Error: $SVG not found"
  exit 1
fi

# Standard icon sizes
SIZES=(16 32 64 128 256 512 1024)

echo "Generating PNG icons from $SVG ..."
for size in "${SIZES[@]}"; do
  out="$IMAGES_DIR/app-icon-${size}x${size}.png"
  rsvg-convert -w "$size" -h "$size" "$SVG" -o "$out"
  echo "  -> app-icon-${size}x${size}.png"
done

# Generate logo PNGs
LOGO_SVG="$IMAGES_DIR/logo.svg"
if [ -f "$LOGO_SVG" ]; then
  echo "Generating logo PNGs ..."
  rsvg-convert -w 640 -h 160 "$LOGO_SVG" -o "$IMAGES_DIR/logo-640x160.png"
  echo "  -> logo-640x160.png"
  rsvg-convert -w 1280 -h 320 "$LOGO_SVG" -o "$IMAGES_DIR/logo-1280x320.png"
  echo "  -> logo-1280x320.png"
fi

# Generate macOS .icns if iconutil is available
if command -v iconutil &>/dev/null; then
  echo "Generating macOS .icns ..."
  ICONSET="$IMAGES_DIR/app-icon.iconset"
  mkdir -p "$ICONSET"

  rsvg-convert -w 16   -h 16   "$SVG" -o "$ICONSET/icon_16x16.png"
  rsvg-convert -w 32   -h 32   "$SVG" -o "$ICONSET/icon_16x16@2x.png"
  rsvg-convert -w 32   -h 32   "$SVG" -o "$ICONSET/icon_32x32.png"
  rsvg-convert -w 64   -h 64   "$SVG" -o "$ICONSET/icon_32x32@2x.png"
  rsvg-convert -w 128  -h 128  "$SVG" -o "$ICONSET/icon_128x128.png"
  rsvg-convert -w 256  -h 256  "$SVG" -o "$ICONSET/icon_128x128@2x.png"
  rsvg-convert -w 256  -h 256  "$SVG" -o "$ICONSET/icon_256x256.png"
  rsvg-convert -w 512  -h 512  "$SVG" -o "$ICONSET/icon_256x256@2x.png"
  rsvg-convert -w 512  -h 512  "$SVG" -o "$ICONSET/icon_512x512.png"
  rsvg-convert -w 1024 -h 1024 "$SVG" -o "$ICONSET/icon_512x512@2x.png"

  iconutil -c icns "$ICONSET" -o "$IMAGES_DIR/app-icon.icns"
  rm -rf "$ICONSET"
  echo "  -> app-icon.icns"
fi

echo "Done."

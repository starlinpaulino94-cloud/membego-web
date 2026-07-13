#!/usr/bin/env bash
# Sincroniza el design system desde la fuente canónica (membego-app/packages/ui).
# Uso: ./scripts/sync-ui.sh /ruta/a/membego-app
set -euo pipefail
SRC="${1:?ruta al repo membego-app}/packages/ui"
[ -d "$SRC" ] || { echo "No existe $SRC"; exit 1; }
rm -rf packages/ui
cp -r "$SRC" packages/ui
echo "packages/ui sincronizado desde $SRC"

#!/usr/bin/env bash
# =============================================================
#  Hotel Real — Generador de Miniaturas
#  Uso: bash generar-miniaturas.sh
#  Requisito: macOS (usa sips, incluido por defecto)
# =============================================================

set -e

BASE="$(cd "$(dirname "$0")" && pwd)/images/habitaciones"
TIPOS=(doble-twin matrimonial-estandar matrimonial-adicional triple)
ANCHO=400
ALTO=300

echo "=== Generando miniaturas (${ANCHO}x${ALTO}px) ==="
echo ""

for tipo in "${TIPOS[@]}"; do
  DIR="$BASE/$tipo"
  ORIGEN="$DIR/principal.jpg"

  if [[ ! -f "$ORIGEN" ]]; then
    echo "  [SALTAR] $tipo — no existe principal.jpg"
    continue
  fi

  echo "  [$tipo]"

  for n in 1 2 3; do
    DESTINO="$DIR/miniatura-$n.jpg"

    # Copia la original y luego redimensiona in-place con sips
    cp "$ORIGEN" "$DESTINO"
    sips --resampleHeightWidth $ALTO $ANCHO "$DESTINO" --out "$DESTINO" > /dev/null 2>&1

    echo "    ✓ miniatura-$n.jpg  (${ANCHO}x${ALTO}px)"
  done
done

echo ""
echo "=== Listo ==="

#!/bin/bash
# ============================================================
# CompreFi — Script de Conversão PNG → WebP
# ============================================================
# Este script:
#   1. Converte todos os PNGs em src/assets/ para WebP (qualidade 90)
#   2. Atualiza todos os imports nos arquivos .ts e .tsx
#   3. Remove os PNGs originais após conversão bem-sucedida
#
# Pré-requisito: instalar cwebp
#   macOS:   brew install webp
#   Ubuntu:  sudo apt install webp
#
# Uso: bash convert-to-webp.sh
# ============================================================

set -e

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar se cwebp está instalado
if ! command -v cwebp &> /dev/null; then
    echo -e "${RED}Erro: cwebp não encontrado.${NC}"
    echo "Instale com:"
    echo "  macOS:  brew install webp"
    echo "  Ubuntu: sudo apt install webp"
    exit 1
fi

# Verificar se estamos na raiz do projeto
if [ ! -d "src/assets" ]; then
    echo -e "${RED}Erro: pasta src/assets não encontrada.${NC}"
    echo "Execute este script na raiz do projeto CompreFi."
    exit 1
fi

echo -e "${YELLOW}=== CompreFi: Conversão PNG → WebP ===${NC}"
echo ""

# Contadores
TOTAL=0
CONVERTED=0
FAILED=0
SAVED_BYTES=0

# Passo 1: Converter PNGs para WebP
echo -e "${YELLOW}[1/3] Convertendo PNGs para WebP (qualidade 90)...${NC}"
echo ""

while IFS= read -r -d '' png_file; do
    TOTAL=$((TOTAL + 1))
    webp_file="${png_file%.png}.webp"
    
    # Tamanho original
    original_size=$(stat -f%z "$png_file" 2>/dev/null || stat -c%s "$png_file" 2>/dev/null)
    
    # Converter
    if cwebp -q 90 "$png_file" -o "$webp_file" -quiet 2>/dev/null; then
        # Tamanho novo
        new_size=$(stat -f%z "$webp_file" 2>/dev/null || stat -c%s "$webp_file" 2>/dev/null)
        saved=$((original_size - new_size))
        SAVED_BYTES=$((SAVED_BYTES + saved))
        CONVERTED=$((CONVERTED + 1))
        
        # Calcular redução percentual
        if [ "$original_size" -gt 0 ]; then
            reduction=$(echo "scale=0; (100 - ($new_size * 100 / $original_size))" | bc)
        else
            reduction=0
        fi
        
        echo -e "  ${GREEN}✓${NC} $(basename "$png_file") → .webp (${reduction}% menor)"
    else
        FAILED=$((FAILED + 1))
        echo -e "  ${RED}✗${NC} Falha: $(basename "$png_file")"
    fi
done < <(find src/assets -name "*.png" -print0)

echo ""
echo -e "${YELLOW}[2/3] Atualizando imports nos arquivos .ts e .tsx...${NC}"
echo ""

# Passo 2: Atualizar imports — trocar .png por .webp em todos os arquivos de código
IMPORTS_UPDATED=0

# Buscar em arquivos .ts, .tsx, .js, .jsx, .css
while IFS= read -r -d '' code_file; do
    if grep -q '\.png' "$code_file" 2>/dev/null; then
        # Usar sed para substituir .png por .webp (compatível com macOS e Linux)
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' 's/\.png/.webp/g' "$code_file"
        else
            sed -i 's/\.png/.webp/g' "$code_file"
        fi
        count=$(grep -c '\.webp' "$code_file" 2>/dev/null || echo "0")
        IMPORTS_UPDATED=$((IMPORTS_UPDATED + 1))
        echo -e "  ${GREEN}✓${NC} $(echo "$code_file" | sed 's|^\./||')"
    fi
done < <(find src -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.css" \) -print0)

# Também verificar index.html e vite.config
for extra_file in index.html vite.config.ts vite.config.js; do
    if [ -f "$extra_file" ] && grep -q '\.png' "$extra_file" 2>/dev/null; then
        if [[ "$OSTYPE" == "darwin"* ]]; then
            sed -i '' 's/\.png/.webp/g' "$extra_file"
        else
            sed -i 's/\.png/.webp/g' "$extra_file"
        fi
        IMPORTS_UPDATED=$((IMPORTS_UPDATED + 1))
        echo -e "  ${GREEN}✓${NC} $extra_file"
    fi
done

echo ""
echo -e "${YELLOW}[3/3] Removendo PNGs originais...${NC}"
echo ""

# Passo 3: Remover PNGs originais (apenas os que foram convertidos com sucesso)
REMOVED=0
while IFS= read -r -d '' png_file; do
    webp_file="${png_file%.png}.webp"
    if [ -f "$webp_file" ]; then
        rm "$png_file"
        REMOVED=$((REMOVED + 1))
    fi
done < <(find src/assets -name "*.png" -print0)

# Resumo
SAVED_MB=$(echo "scale=1; $SAVED_BYTES / 1048576" | bc)

echo ""
echo -e "${GREEN}=== Conversão Concluída ===${NC}"
echo ""
echo "  Imagens encontradas:  $TOTAL"
echo "  Convertidas:          $CONVERTED"
echo "  Falhas:               $FAILED"
echo "  PNGs removidos:       $REMOVED"
echo "  Arquivos atualizados: $IMPORTS_UPDATED"
echo -e "  Espaço economizado:   ${GREEN}${SAVED_MB} MB${NC}"
echo ""

if [ "$FAILED" -gt 0 ]; then
    echo -e "${YELLOW}⚠ Algumas imagens falharam. Verifique os erros acima.${NC}"
fi

# Verificar se há JPGs também
JPG_COUNT=$(find src/assets -name "*.jpg" -o -name "*.jpeg" | wc -l | tr -d ' ')
if [ "$JPG_COUNT" -gt 0 ]; then
    echo -e "${YELLOW}⚠ Encontrados $JPG_COUNT arquivos JPG/JPEG que não foram convertidos.${NC}"
    echo "  Se quiser converter também, me avisa."
fi

echo ""
echo "Próximo passo: rode 'npm run dev' e verifique se tudo carrega normalmente."

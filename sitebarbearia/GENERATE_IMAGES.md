# 🔧 Script para Gerar Imagens Placeholder

Este script criará imagens placeholder para o site da Barbearia Mayke.
Execute este script uma vez para gerar as imagens necessárias.

# Opção 1: Usar Python (recomendado)

```python
from PIL import Image, ImageDraw, ImageFont
import os

# Criar pasta se não existir
os.makedirs('images', exist_ok=True)

# Cores
preto = (26, 26, 26)
dourado = (212, 175, 55)
branco = (255, 255, 255)

# 1. Logo - img1 (50x50, quadrado)
img1 = Image.new('RGB', (200, 200), preto)
draw = ImageDraw.Draw(img1)
draw.text((50, 80), 'MB', fill=dourado, font=None)
img1.save('images/img1.jpg')
print('✓ img1.jpg criada')

# 2. Hero Background - img2 (1920x600)
img2 = Image.new('RGB', (1920, 600), preto)
draw = ImageDraw.Draw(img2)
draw.text((800, 250), 'Barbearia Mayke', fill=dourado, font=None)
img2.save('images/img2.jpg')
print('✓ img2.jpg criada')

# 3. Sobre a Barbearia - img3 (500x500)
img3 = Image.new('RGB', (500, 500), branco)
draw = ImageDraw.Draw(img3)
draw.rectangle([50, 50, 450, 450], outline=dourado, width=3)
draw.text((150, 220), 'Barbearia', fill=preto, font=None)
img3.save('images/img3.jpg')
print('✓ img3.jpg criada')

# 4. Galeria - img4 (600x400)
img4 = Image.new('RGB', (600, 400), (45, 45, 45))
draw = ImageDraw.Draw(img4)
draw.ellipse([150, 50, 450, 350], fill=dourado)
img4.save('images/img4.jpg')
print('✓ img4.jpg criada')

# 5. Galeria - img5 (600x400)
img5 = Image.new('RGB', (600, 400), dourado)
draw = ImageDraw.Draw(img5)
draw.rectangle([100, 100, 500, 300], fill=preto)
img5.save('images/img5.jpg')
print('✓ img5.jpg criada')

# 6. Galeria - img6 (600x400)
img6 = Image.new('RGB', (600, 400), (60, 60, 60))
draw = ImageDraw.Draw(img6)
for i in range(0, 600, 50):
    draw.line([(i, 0), (i, 400)], fill=dourado, width=2)
img6.save('images/img6.jpg')
print('✓ img6.jpg criada')

print('\n✓ Todas as imagens foram criadas com sucesso!')
```

# Opção 2: ImageMagick (CLI)

```bash
# Setup (executar uma vez)
# No Windows: instale ImageMagick de https://imagemagick.org/

# Logo
magick -size 200x200 xc:'rgb(26,26,26)' -pointsize 60 -fill 'rgb(212,175,55)' -gravity center -annotate +0+0 'MB' images/img1.jpg

# Hero Background
magick -size 1920x600 xc:'rgb(26,26,26)' -pointsize 100 -fill 'rgb(212,175,55)' -gravity center -annotate +0+0 'Barbearia Mayke' images/img2.jpg

# Sobre
magick -size 500x500 xc:'rgb(255,255,255)' -stroke 'rgb(212,175,55)' -strokewidth 3 -fill none -draw 'rectangle 50,50 450,450' images/img3.jpg

# Galeria 1
magick -size 600x400 xc:'rgb(45,45,45)' -fill 'rgb(212,175,55)' -draw 'circle 300,200 450,350' images/img4.jpg

# Galeria 2
magick -size 600x400 xc:'rgb(212,175,55)' -fill 'rgb(26,26,26)' -draw 'rectangle 100,100 500,300' images/img5.jpg

# Galeria 3
magick -size 600x400 xc:'rgb(60,60,60)' -stroke 'rgb(212,175,55)' -strokewidth 2 -draw 'line 0,0 600,400' -draw 'line 600,0 0,400' images/img6.jpg
```

# Opção 3: Usar Online

Se não tiver Python ou ImageMagick, você pode:

1. Acessar https://placeholder.com/
2. Criar placeholders como:
   - img1: 200x200 (logo)
   - img2: 1920x600 (hero)
   - img3: 500x500 (sobre)
   - img4, img5, img6: 600x400 (galeria)

3. Salvar como jpg na pasta `images/`

---

## Instruções para Produção

Após gerar as imagens placeholder, **substitua-as com imagens reais profissionais** da barbearia antes de lançar o site em produção.

### Requisitos de Imagem:
- **img1** (Logo): 200x200px, formato PNG com transparência recomendado
- **img2** (Hero): Mínimo 1920x600px, fotografia de alta qualidade
- **img3** (Sobre): 500x500px, foto do espaço ou equipe
- **img4-6** (Galeria): 600x400px cada, fotos dos trabalhos realizados

---

**Após gerar as imagens, o site estará 100% funcional!** ✓

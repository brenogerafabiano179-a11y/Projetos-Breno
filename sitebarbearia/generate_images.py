#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Script para Gerar Imagens Placeholder - Barbearia Mayke
Cria 6 imagens placeholder profissionais para o site

Uso:
    python3 generate_images.py

Requisitos:
    pip install Pillow
"""

import os
import sys
from PIL import Image, ImageDraw, ImageFont


def criar_imagens():
    """Cria todas as imagens placeholder necessárias"""
    
    # Criar pasta se não existir
    os.makedirs('images', exist_ok=True)
    
    # Definir cores
    PRETO = (26, 26, 26)
    BRANCO = (255, 255, 255)
    DOURADO = (212, 175, 55)
    CINZA = (60, 60, 60)
    CINZA_CLARO = (45, 45, 45)
    VERDE_ESCURO = (45, 80, 22)
    
    print("🎨 Gerando imagens para Barbearia Mayke...\n")
    
    # ===== IMG1: LOGO (200x200) =====
    print("📝 Criando img1.jpg (Logo 200x200)...", end=" ")
    img1 = Image.new('RGB', (200, 200), PRETO)
    draw1 = ImageDraw.Draw(img1)
    
    # Desenhar border dourada
    draw1.rectangle([5, 5, 195, 195], outline=DOURADO, width=4)
    
    # Desenhar texto
    try:
        # Tentar usar fonte maior
        fonte = ImageFont.truetype("arial.ttf", 80)
    except:
        # Usar fonte padrão
        fonte = ImageFont.load_default()
    
    draw1.text((50, 50), "MB", fill=DOURADO, font=fonte)
    img1.save('images/img1.jpg', 'JPEG', quality=95)
    print("✓")
    
    # ===== IMG2: HERO BACKGROUND (1920x600) =====
    print("📝 Criando img2.jpg (Hero 1920x600)...", end=" ")
    img2 = Image.new('RGB', (1920, 600), PRETO)
    draw2 = ImageDraw.Draw(img2)
    
    # Gradiente simulado com linhas
    step = 600 // 30
    for i in range(30):
        cor_intensity = int(26 + (34 * i / 30))
        cor = (cor_intensity, cor_intensity, cor_intensity)
        draw2.rectangle([0, i*step, 1920, (i+1)*step], fill=cor)
    
    # Desenhar decorações
    draw2.rectangle([100, 100, 1820, 500], outline=DOURADO, width=3)
    draw2.line([100, 300, 1820, 300], fill=DOURADO, width=2)
    
    # Texto
    try:
        fonte_grande = ImageFont.truetype("arial.ttf", 100)
    except:
        fonte_grande = ImageFont.load_default()
    
    draw2.text((400, 200), "Barbearia Mayke", fill=DOURADO, font=fonte_grande)
    draw2.text((600, 380), "Cortes Modernos e Atendimento de Qualidade", fill=BRANCO)
    
    img2.save('images/img2.jpg', 'JPEG', quality=95)
    print("✓")
    
    # ===== IMG3: SOBRE (500x500) =====
    print("📝 Criando img3.jpg (Sobre 500x500)...", end=" ")
    img3 = Image.new('RGB', (500, 500), BRANCO)
    draw3 = ImageDraw.Draw(img3)
    
    # Desenhar frame/border
    draw3.rectangle([20, 20, 480, 480], outline=DOURADO, width=4)
    draw3.rectangle([50, 50, 450, 450], outline=DOURADO, width=2)
    
    # Desenhar círculo
    draw3.ellipse([150, 100, 350, 300], outline=DOURADO, width=3)
    
    # Texto
    try:
        fonte_media = ImageFont.truetype("arial.ttf", 40)
    except:
        fonte_media = ImageFont.load_default()
    
    draw3.text((100, 350), "Qualidade em Cada Corte", fill=DOURADO, font=fonte_media)
    draw3.text((80, 420), "Estilo e Profissionalismo", fill=PRETO)
    
    img3.save('images/img3.jpg', 'JPEG', quality=95)
    print("✓")
    
    # ===== IMG4: GALERIA 1 (600x400) =====
    print("📝 Criando img4.jpg (Galeria 1 - 600x400)...", end=" ")
    img4 = Image.new('RGB', (600, 400), CINZA_CLARO)
    draw4 = ImageDraw.Draw(img4)
    
    # Desenhar patterns
    draw4.ellipse([100, 50, 500, 350], fill=DOURADO)
    draw4.ellipse([150, 100, 450, 300], fill=PRETO)
    draw4.polygon([(300, 120), (350, 200), (250, 200)], fill=DOURADO)
    
    img4.save('images/img4.jpg', 'JPEG', quality=95)
    print("✓")
    
    # ===== IMG5: GALERIA 2 (600x400) =====
    print("📝 Criando img5.jpg (Galeria 2 - 600x400)...", end=" ")
    img5 = Image.new('RGB', (600, 400), DOURADO)
    draw5 = ImageDraw.Draw(img5)
    
    # Desenhar padrão geométrico
    draw5.rectangle([80, 60, 520, 340], fill=PRETO)
    draw5.rectangle([120, 100, 480, 300], fill=PRETO, outline=DOURADO, width=3)
    
    # Linhas diagonais
    draw5.line([200, 150, 400, 250], fill=DOURADO, width=3)
    draw5.line([200, 250, 400, 150], fill=DOURADO, width=3)
    
    img5.save('images/img5.jpg', 'JPEG', quality=95)
    print("✓")
    
    # ===== IMG6: GALERIA 3 (600x400) =====
    print("📝 Criando img6.jpg (Galeria 3 - 600x400)...", end=" ")
    img6 = Image.new('RGB', (600, 400), CINZA)
    draw6 = ImageDraw.Draw(img6)
    
    # Desenhar grid
    for x in range(0, 601, 50):
        draw6.line([(x, 0), (x, 400)], fill=DOURADO, width=2)
    
    for y in range(0, 401, 50):
        draw6.line([(0, y), (600, y)], fill=DOURADO, width=2)
    
    # Desenhar forma central
    draw6.polygon(
        [(300, 80), (480, 200), (420, 350), (180, 350), (120, 200)],
        fill=DOURADO,
        outline=BRANCO,
    )
    
    img6.save('images/img6.jpg', 'JPEG', quality=95)
    print("✓")
    
    print("\n" + "="*50)
    print("✅ SUCESSO! Todas as imagens foram criadas!")
    print("="*50)
    print("\nArquivos criados:")
    print("  • images/img1.jpg - Logo (200x200)")
    print("  • images/img2.jpg - Hero Background (1920x600)")
    print("  • images/img3.jpg - Sobre a Barbearia (500x500)")
    print("  • images/img4.jpg - Galeria 1 (600x400)")
    print("  • images/img5.jpg - Galeria 2 (600x400)")
    print("  • images/img6.jpg - Galeria 3 (600x400)")
    print("\n💡 Dica: Substitua essas imagens com fotos profissionais reais")
    print("   quando estiver pronto para produção!")
    print("\n✨ O site está 100% funcional agora!")
    print("   Abra 'index.html' em seu navegador para visualizar.\n")


def main():
    """Função principal"""
    try:
        from PIL import Image, ImageDraw
        print("✓ Pillow importado com sucesso\n")
    except ImportError:
        print("❌ ERRO: Pillow não está instalado!")
        print("\nPara instalar, execute:")
        print("  pip install Pillow")
        print("\nOu no Windows:")
        print("  pip install pillow")
        sys.exit(1)
    
    try:
        criar_imagens()
    except Exception as e:
        print(f"\n❌ ERRO ao criar imagens: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()

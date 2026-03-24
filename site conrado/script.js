/**
 * ================================================================
 * Ótima — Agência de Tráfego Pago
 * script.js — JavaScript principal: animações e interatividade
 * ================================================================
 */

/* ----------------------------------------------------------------
   1. UTILITÁRIOS
   ---------------------------------------------------------------- */

/**
 * Seleciona um elemento do DOM.
 * @param {string} sel - Seletor CSS
 * @param {Document|Element} ctx - Contexto (padrão: document)
 * @returns {Element|null}
 */
const $ = (sel, ctx = document) => ctx.querySelector(sel);

/**
 * Seleciona múltiplos elementos do DOM.
 * @param {string} sel - Seletor CSS
 * @param {Document|Element} ctx - Contexto (padrão: document)
 * @returns {NodeList}
 */
const $$ = (sel, ctx = document) => ctx.querySelectorAll(sel);


/* ----------------------------------------------------------------
   2. HEADER — Efeito ao rolar + menu mobile
   ---------------------------------------------------------------- */

/**
 * Adiciona/remove a classe .scrolled ao header conforme o scroll.
 * Isso ativa o blur e o fundo semi-opaco definido no CSS.
 */
function initHeaderScroll() {
  const header = $('#header');
  if (!header) return;

  const SCROLL_THRESHOLD = 60; // px para ativar o efeito

  function updateHeader() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // Verifica no carregamento (caso a página já esteja scrollada)
  updateHeader();

  // Escuta o evento de scroll com performance otimizada
  window.addEventListener('scroll', updateHeader, { passive: true });
}

/**
 * Controla o menu hamburguer no mobile.
 * Abre/fecha o nav principal.
 */
function initMobileMenu() {
  const hamburger = $('#hamburger');
  const nav = $('#mainNav');
  if (!hamburger || !nav) return;

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Fecha o menu ao clicar em um link de navegação
  $$('.nav__link', nav).forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  // Fecha o menu ao clicar fora dele
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
    }
  });
}


/* ----------------------------------------------------------------
   3. SCROLL REVEAL — Animações ao entrar na viewport
   ---------------------------------------------------------------- */

/**
 * Observa elementos com atributo [data-animate] e adiciona
 * a classe .is-visible quando entram na viewport.
 * Suporta delays personalizados via [data-delay].
 */
function initScrollReveal() {
  const elements = $$('[data-animate]');
  if (!elements.length) return;

  // Configurações do IntersectionObserver
  const observerOptions = {
    threshold: 0.12,      // Ativa quando 12% do elemento está visível
    rootMargin: '0px 0px -60px 0px' // Margem negativa: ativa um pouco antes do fim
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = parseInt(el.dataset.delay, 10) || 0;

        // Aplica o delay via timeout
        setTimeout(() => {
          el.classList.add('is-visible');
        }, delay);

        // Para de observar depois da animação (one-shot)
        observer.unobserve(el);
      }
    });
  }, observerOptions);

  elements.forEach(el => observer.observe(el));
}


/* ----------------------------------------------------------------
   4. ANIMAÇÃO DOS CARDS — Efeito parallax leve no hover
   ---------------------------------------------------------------- */

/**
 * Adiciona efeito de rotação 3D suave nos cards ao mover o mouse.
 */
function initCardTilt() {
  const cards = $$('.card');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX  = e.clientX - centerX;
      const mouseY  = e.clientY - centerY;

      // Rotação máxima de 6 graus
      const rotateY =  (mouseX / (rect.width  / 2)) * 6;
      const rotateX = -(mouseY / (rect.height / 2)) * 6;

      card.style.transform    = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      card.style.transition   = 'transform .1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.transition = 'transform .4s ease';
    });
  });
}


/* ----------------------------------------------------------------
   5. ANIMAÇÃO DOS STEPS DO MÉTODO — Entrada sequencial
   ---------------------------------------------------------------- */

/**
 * Anima cada step do método em sequência quando entrar na viewport.
 * Usa o IntersectionObserver para disparar apenas uma vez.
 */
function initStepsAnimation() {
  const stepsGrid = $('.metodo__grid');
  if (!stepsGrid) return;

  const steps = $$('.step', stepsGrid);
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;

        steps.forEach((step, index) => {
          setTimeout(() => {
            step.style.opacity   = '1';
            step.style.transform = 'translateY(0)';
          }, index * 180);
        });

        observer.disconnect();
      }
    });
  }, { threshold: 0.2 });

  // Estado inicial: invisível e deslocado
  steps.forEach(step => {
    step.style.opacity    = '0';
    step.style.transform  = 'translateY(40px)';
    step.style.transition = 'opacity .6s ease, transform .6s ease';
  });

  observer.observe(stepsGrid);
}


/* ----------------------------------------------------------------
   6. NÚMERO ANIMADO — Contagem nos cards de stats
   ---------------------------------------------------------------- */

/**
 * Anima a contagem de números nos cards de diferenciais e hero stats.
 * @param {Element} el - Elemento com o número
 * @param {number} target - Valor final
 * @param {number} duration - Duração da animação em ms
 * @param {string} prefix - Prefixo (ex: "R$")
 * @param {string} suffix - Sufixo (ex: "M+", "+")
 */
function animateCounter(el, target, duration = 1800, prefix = '', suffix = '') {
  const start     = performance.now();
  const startVal  = 0;

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Easing: ease-out cúbico
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = Math.floor(startVal + (target - startVal) * eased);

    el.textContent = prefix + current + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

/**
 * Inicializa os contadores animados ao entrar na viewport.
 */
function initCounters() {
  const counterEls = $$('.diff-card strong');
  if (!counterEls.length) return;

  // Mapeia os valores alvo de cada card
  const counterData = [
    { target: 200, prefix: '+', suffix: '' },
    { target: 10,  prefix: 'R$', suffix: 'M+' },
    { target: 5,   prefix: '',  suffix: '★' },
    { target: 24,  prefix: '',  suffix: '/7' },
  ];

  let animated = false;
  const container = $('.diferencial__cards');
  if (!container) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;

        counterEls.forEach((el, i) => {
          const data = counterData[i];
          if (data) {
            animateCounter(el, data.target, 1600, data.prefix, data.suffix);
          }
        });

        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  observer.observe(container);
}


/* ----------------------------------------------------------------
   7. NAV LINKS — Destaque do link ativo ao rolar
   ---------------------------------------------------------------- */

/**
 * Destaca automaticamente o link de navegação da seção visível.
 */
function initActiveNavLinks() {
  const sections = $$('section[id]');
  const navLinks = $$('.nav__link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');

        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-40% 0px -55% 0px'
  });

  sections.forEach(section => observer.observe(section));
}


/* ----------------------------------------------------------------
   8. SMOOTH SCROLL — Rolagem suave para âncoras
   ---------------------------------------------------------------- */

/**
 * Garante rolagem suave para âncoras internas, respeitando
 * a altura do header fixo.
 */
function initSmoothScroll() {
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;

      const target = $(href);
      if (!target) return;

      e.preventDefault();

      const header = $('#header');
      const offset = header ? header.offsetHeight + 16 : 80;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}


/* ----------------------------------------------------------------
   9. FOOTER — Ano atual dinâmico
   ---------------------------------------------------------------- */

/**
 * Insere o ano atual no copyright do footer.
 */
function initCurrentYear() {
  const yearEl = $('#currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}


/* ----------------------------------------------------------------
   10. PARALLAX LEVE NO HERO — Efeito de profundidade
   ---------------------------------------------------------------- */

/**
 * Aplica um leve efeito parallax na imagem de fundo do hero
 * conforme o usuário rola a página.
 */
function initHeroParallax() {
  const heroBg = $('.hero__bg-img');
  if (!heroBg) return;

  // Só ativa em desktop para não prejudicar a performance mobile
  const mq = window.matchMedia('(min-width: 768px)');
  if (!mq.matches) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
      heroBg.style.transform = `translateY(${scrollY * 0.25}px)`;
    }
  }, { passive: true });
}


/* ----------------------------------------------------------------
   11. EFEITO DE TEXTO DIGITADO — Badge do Hero (opcional)
   ---------------------------------------------------------------- */

/**
 * Simula um efeito de digitação no badge do hero.
 * @param {Element} el - Elemento de texto
 * @param {string} text - Texto completo
 * @param {number} speed - Velocidade em ms por caractere
 */
function typewriterEffect(el, text, speed = 70) {
  if (!el) return;
  el.textContent = '';
  let i = 0;

  const timer = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(timer);
  }, speed);
}


/* ----------------------------------------------------------------
   12. EFEITO GLOW NO CURSOR — Trilha neon ao mover o mouse
   ---------------------------------------------------------------- */

/**
 * Cria uma trilha de glow ciano que segue o cursor do mouse.
 * Apenas em desktop.
 */
function initCursorGlow() {
  const mq = window.matchMedia('(min-width: 992px)');
  if (!mq.matches) return;

  // Cria o elemento de glow
  const glow = document.createElement('div');
  glow.id = 'cursor-glow';
  Object.assign(glow.style, {
    position: 'fixed',
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(13,226,255,.07) 0%, transparent 70%)',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    zIndex: '9999',
    transition: 'opacity .3s ease',
    opacity: '0',
  });
  document.body.appendChild(glow);

  let mouseX = 0, mouseY = 0;
  let glowX  = 0, glowY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    glow.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });

  // Interpolação suave do cursor
  function animateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;
    glow.style.left = `${glowX}px`;
    glow.style.top  = `${glowY}px`;
    requestAnimationFrame(animateGlow);
  }

  animateGlow();
}


/* ----------------------------------------------------------------
   13. INICIALIZAÇÃO PRINCIPAL
   ---------------------------------------------------------------- */

/**
 * Inicializa todos os módulos quando o DOM estiver pronto.
 */
document.addEventListener('DOMContentLoaded', () => {

  // Header
  initHeaderScroll();
  initMobileMenu();

  // Scroll & animações
  initScrollReveal();
  initSmoothScroll();
  initActiveNavLinks();

  // Cards e steps
  initCardTilt();
  initStepsAnimation();

  // Contadores
  initCounters();

  // Parallax e efeitos
  initHeroParallax();
  initCursorGlow();

  // Footer
  initCurrentYear();

  // Efeito de digitação no badge do hero
  const heroBadgeText = $('.hero__badge');
  if (heroBadgeText) {
    const originalContent = heroBadgeText.innerHTML;
    // Preserva o ícone e digita apenas o texto
    const iconEl  = heroBadgeText.querySelector('i');
    const textPart = ' Agência de Tráfego Pago';

    if (iconEl) {
      heroBadgeText.textContent = '';
      heroBadgeText.appendChild(iconEl.cloneNode(true));
      const textNode = document.createTextNode('');
      heroBadgeText.appendChild(textNode);

      let i = 0;
      const timer = setInterval(() => {
        textNode.textContent += textPart[i];
        i++;
        if (i >= textPart.length) clearInterval(timer);
      }, 55);
    }
  }

  console.log('%c✨ Ótima Agência — Site carregado com sucesso!', 'color:#0de2ff; font-size:14px; font-weight:bold;');
});


/* ----------------------------------------------------------------
   14. PERFORMANCE — Lazy loading de imagens
   ---------------------------------------------------------------- */

/**
 * Adiciona loading="lazy" em imagens que não estão visíveis
 * inicialmente para melhorar a performance de carregamento.
 */
(function lazyImages() {
  // As imagens do hero não devem ter lazy (Above the fold)
  const nonLazySelectors = ['.hero__bg-img'];
  const allImages = $$('img');

  allImages.forEach(img => {
    const isAboveFold = nonLazySelectors.some(sel => img.closest(sel) || img.matches(sel));
    if (!isAboveFold) {
      img.setAttribute('loading', 'lazy');
    }
  });
})();

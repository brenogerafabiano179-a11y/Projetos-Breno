// ===================================
// VARIÁVEIS GLOBAIS
// ===================================

const formulario = document.getElementById('agendamentoForm');
const inputData = document.getElementById('data');
const selectHorario = document.getElementById('horario');
const horariosDisplay = document.getElementById('horariosDisplay');
const nomeInput = document.getElementById('nome');
const servicoInput = document.getElementById('servico');

// WhatsApp Business Number (ajustar conforme necessário)
const WHATSAPP_NUMBER = '5599999999999';

// ===================================
// INICIALIZAÇÃO
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    inicializarData();
    setupEventListeners();
    setupScrollAnchors();
    setupBotoesAgendar();
});

// ===================================
// FUNÇÕES DE DATA E HORÁRIOS
// ===================================

/**
 * Inicializa a data mínima do input (hoje)
 */
function inicializarData() {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');
    
    const dataFormatada = `${ano}-${mes}-${dia}`;
    inputData.min = dataFormatada;
    inputData.value = dataFormatada;
    
    // Preencher horários para hoje
    preencherHorarios(dataFormatada);
}

/**
 * Gera array de horários a cada 30 minutos (08:00 a 18:00)
 */
function gerarHorarios() {
    const horarios = [];
    
    for (let hora = 8; hora <= 18; hora++) {
        for (let minuto = 0; minuto < 60; minuto += 30) {
            const h = String(hora).padStart(2, '0');
            const m = String(minuto).padStart(2, '0');
            horarios.push(`${h}:${m}`);
        }
    }
    
    return horarios;
}

/**
 * Simula horários ocupados (desabilita alguns aleatoriamente)
 * Aproximadamente 30-40% dos horários são ocupados
 */
function simularHorariosOcupados(horarios) {
    const horariosOcupados = new Set();
    const totalHorarios = horarios.length;
    const quantidadeOcupados = Math.floor(totalHorarios * (Math.random() * 0.15 + 0.25));
    
    while (horariosOcupados.size < quantidadeOcupados) {
        const indiceAleatorio = Math.floor(Math.random() * totalHorarios);
        horariosOcupados.add(horarios[indiceAleatorio]);
    }
    
    return horariosOcupados;
}

/**
 * Preenche o select de horários com valores disponíveis
 */
function preencherHorarios(dataSelecionada) {
    const horarios = gerarHorarios();
    const horariosOcupados = simularHorariosOcupados(horarios);
    
    // Limpar o select
    selectHorario.innerHTML = '<option value="">Selecione um horário</option>';
    
    // Criar e adicionar opções
    horarios.forEach(horario => {
        const option = document.createElement('option');
        option.value = horario;
        
        if (horariosOcupados.has(horario)) {
            option.textContent = `${horario} (Ocupado)`;
            option.disabled = true;
        } else {
            option.textContent = horario;
        }
        
        selectHorario.appendChild(option);
    });
    
    // Preparar display dos horários
    prepararDisplayHorarios(horarios, horariosOcupados);
}

/**
 * Cria visualização dos horários disponíveis em grid
 */
function prepararDisplayHorarios(horarios, horariosOcupados) {
    horariosDisplay.innerHTML = '<h4 style="margin-bottom: 15px; color: #333;">Horários Disponíveis:</h4>';
    
    const grid = document.createElement('div');
    grid.className = 'horarios-grid';
    
    horarios.forEach(horario => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'horario-btn';
        btn.textContent = horario;
        
        if (horariosOcupados.has(horario)) {
            btn.disabled = true;
            btn.textContent = '✕ ' + horario;
        } else {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                selecionarHorario(horario, btn);
            });
        }
        
        grid.appendChild(btn);
    });
    
    horariosDisplay.appendChild(grid);
    horariosDisplay.classList.add('active');
}

/**
 * Seleciona um horário no grid
 */
function selecionarHorario(horario, elemento) {
    // Remover seleção anterior
    document.querySelectorAll('.horario-btn.selected').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Adicionar nova seleção
    elemento.classList.add('selected');
    
    // Atualizar select
    selectHorario.value = horario;
}

// ===================================
// EVENT LISTENERS
// ===================================

function setupEventListeners() {
    // Quando a data muda, atualizar horários
    inputData.addEventListener('change', function() {
        const data = this.value;
        if (data) {
            preencherHorarios(data);
        }
    });
    
    // Submit do formulário
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        procesarAgendamento();
    });
}

// ===================================
// PROCESSAMENTO DO AGENDAMENTO
// ===================================

/**
 * Processa o agendamento e redireciona para WhatsApp
 */
function procesarAgendamento() {
    const nome = nomeInput.value.trim();
    const servico = servicoInput.value;
    const data = inputData.value;
    const horario = selectHorario.value;
    
    // Validações
    if (!nome) {
        showNotification('Por favor, insira seu nome', 'error');
        return;
    }
    
    if (!servico) {
        showNotification('Por favor, selecione um serviço', 'error');
        return;
    }
    
    if (!data) {
        showNotification('Por favor, selecione uma data', 'error');
        return;
    }
    
    if (!horario) {
        showNotification('Por favor, selecione um horário', 'error');
        return;
    }
    
    // Formatar data para apresentação
    const dataFormatada = formatarData(data);
    
    // Construir mensagem
    const mensagem = `Olá, gostaria de agendar um horário:\n\nNome: ${nome}\nServiço: ${servico}\nData: ${dataFormatada}\nHorário: ${horario}`;
    
    // Codificar para URL
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // Construir URL do WhatsApp
    const urlWhatsApp = `https://wa.me/${WHATSAPP_NUMBER}?text=${mensagemCodificada}`;
    
    // Abrir WhatsApp
    window.open(urlWhatsApp, '_blank');
    
    // Mostrar confirmação
    showNotification('Redirecionando para WhatsApp...', 'success');
    
    // Limpar formulário após 1 segundo
    setTimeout(() => {
        formulario.reset();
        inicializarData();
        horariosDisplay.classList.remove('active');
    }, 1500);
}

/**
 * Formata data do formato YYYY-MM-DD para DD/MM/YYYY
 */
function formatarData(dataStr) {
    const [ano, mes, dia] = dataStr.split('-');
    return `${dia}/${mes}/${ano}`;
}

// ===================================
// NOTIFICAÇÕES
// ===================================

/**
 * Mostra notificações (toast) na tela
 */
function showNotification(mensagem, tipo = 'info') {
    // Criar elemento de notificação
    const notificacao = document.createElement('div');
    notificacao.className = `notification notification-${tipo}`;
    notificacao.textContent = mensagem;
    
    // Estilos inline (por ser dinâmico)
    notificacao.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${tipo === 'success' ? '#4caf50' : tipo === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 2000;
        animation: slideIn 0.3s ease;
        font-weight: 500;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Adicionar ao body
    document.body.appendChild(notificacao);
    
    // Remover após 3 segundos
    const timeoutId = setTimeout(() => {
        notificacao.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notificacao.remove();
        }, 300);
    }, 3000);
    
    // Permitir fechar ao clicar
    notificacao.addEventListener('click', () => {
        clearTimeout(timeoutId);
        notificacao.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notificacao.remove();
        }, 300);
    });
}

// ===================================
// SCROLL SUAVE E ÂNCORAS
// ===================================

function setupScrollAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Não interceptar cliques em #
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// BOTÕES DE AGENDAMENTO
// ===================================

function setupBotoesAgendar() {
    const botoesAgendar = document.querySelectorAll(
        '.btn-agendar-header, .btn-hero'
    );
    
    botoesAgendar.forEach(botao => {
        botao.addEventListener('click', function() {
            const secaoAgendamento = document.getElementById('agendamento');
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = secaoAgendamento.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Focar no input de nome
            setTimeout(() => {
                nomeInput.focus();
            }, 500);
        });
    });
}

// ===================================
// ANIMAÇÕES ADICIONAIS
// ===================================

// Adicionar animações aos elementos quando entram na viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Aplicar observer a elementos
document.querySelectorAll('.servico-card, .contato-card, .galeria-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===================================
// ESTILO DE ANIMAÇÕES (injetado dinamicamente)
// ===================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// RESPONSIVIDADE DO HEADER
// ===================================

// Menu responsivo (se necessário em futuro)
window.addEventListener('resize', function() {
    // Redimensionamento responsivo
});

// ===================================
// SMOOTH SCROLL POLYFILL (compatibilidade)
// ===================================

if (!('scrollBehavior' in document.documentElement.style)) {
    console.log('Polyfill de smooth scroll não disponível, usando fallback');
}

// ===================================
// LOGS DE DESENVOLVIMENTO
// ===================================

console.log('🔧 Barbearia Mayke - Site Carregado com Sucesso');
console.log('📱 Responsivo: Testado em desktop, tablet e mobile');
console.log('⚙️ Funcionalidades: Agendamento com WhatsApp, Horários Dinâmicos, Validação de Formulário');

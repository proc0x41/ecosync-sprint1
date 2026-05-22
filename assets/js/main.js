/* ============================================
   ECOSYNC + AVATAR LUMI - JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const menuBtn = document.querySelector('.cabecalho__menu-btn');
    const menu = document.querySelector('.cabecalho__ul');
    
    if (menuBtn && menu) {
        menuBtn.addEventListener('click', function() {
            menuBtn.classList.toggle('cabecalho__menu-btn--active');
            menu.classList.toggle('cabecalho__ul--ativo');
        });
        
        // Fechar menu ao clicar em um link
        const links = menu.querySelectorAll('.cabecalho__a');
        links.forEach(function(link) {
            link.addEventListener('click', function() {
                menuBtn.classList.remove('cabecalho__menu-btn--active');
                menu.classList.remove('cabecalho__ul--ativo');
            });
        });
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(function(item) {
        const pergunta = item.querySelector('.faq__pergunta');
        
        if (pergunta) {
            pergunta.addEventListener('click', function() {
                // Fechar outros itens
                faqItems.forEach(function(outroItem) {
                    if (outroItem !== item) {
                        outroItem.classList.remove('faq__item--ativo');
                    }
                });
                
                // Toggle do item clicado
                item.classList.toggle('faq__item--ativo');
            });
        }
    });
    
    // Validação de Formulário
    const formContato = document.querySelector('.contato__form');
    
    if (formContato) {
        formContato.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = formContato.querySelector('#nome');
            const email = formContato.querySelector('#email');
            const mensagem = formContato.querySelector('#mensagem');
            const btn = formContato.querySelector('.form__btn');
            
            let valido = true;
            
            // Validar nome
            if (!nome || !nome.value.trim()) {
                mostrarErro(nome, 'Por favor, informe seu nome');
                valido = false;
            } else if (nome.value.trim().length < 3) {
                mostrarErro(nome, 'O nome deve ter pelo menos 3 caracteres');
                valido = false;
            } else {
                mostrarSucesso(nome);
            }
            
            // Validar email
            if (!email || !email.value.trim()) {
                mostrarErro(email, 'Por favor, informe seu email');
                valido = false;
            } else if (!validarEmail(email.value)) {
                mostrarErro(email, 'Por favor, informe um email válido');
                valido = false;
            } else {
                mostrarSucesso(email);
            }
            
            // Validar mensagem
            if (!mensagem || !mensagem.value.trim()) {
                mostrarErro(mensagem, 'Por favor, escreva sua mensagem');
                valido = false;
            } else if (mensagem.value.trim().length < 10) {
                mostrarErro(mensagem, 'A mensagem deve ter pelo menos 10 caracteres');
                valido = false;
            } else {
                mostrarSucesso(mensagem);
            }
            
            if (valido) {
                // Simular envio
                btn.disabled = true;
                btn.textContent = 'Enviando...';
                
                setTimeout(function() {
                    btn.textContent = 'Mensagem Enviada!';
                    btn.style.background = 'linear-gradient(135deg, #4f9d69, #6ab885)';
                    
                    setTimeout(function() {
                        formContato.reset();
                        btn.disabled = false;
                        btn.textContent = 'Enviar Mensagem';
                        btn.style.background = '';
                        
                        // Limpar classes de validação
                        [nome, email, mensagem].forEach(function(campo) {
                            if (campo) {
                                campo.classList.remove('form__input--sucesso', 'form__input--erro');
                            }
                        });
                    }, 2000);
                }, 1500);
            }
        });
    }
    
    function mostrarErro(campo, mensagem) {
        if (!campo) return;
        
        campo.classList.remove('form__input--sucesso');
        campo.classList.add('form__input--erro');
        
        const erroElement = campo.parentElement.querySelector('.form__erro');
        if (erroElement) {
            erroElement.textContent = mensagem;
            erroElement.classList.add('form__erro--visivel');
        }
    }
    
    function mostrarSucesso(campo) {
        if (!campo) return;
        
        campo.classList.remove('form__input--erro');
        campo.classList.add('form__input--sucesso');
        
        const erroElement = campo.parentElement.querySelector('.form__erro');
        if (erroElement) {
            erroElement.classList.remove('form__erro--visivel');
        }
    }
    
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    // Calculadora de CO2
    const calcForm = document.querySelector('.calculadora__form');
    
    if (calcForm) {
        const inputs = calcForm.querySelectorAll('.form__input');
        const resultadoValor = document.querySelector('.calculadora__resultado-valor');
        const resultadoXp = document.querySelector('.calculadora__resultado-xp-valor');
        
        function calcularCO2() {
            let totalKm = 0;
            let energia = 0;
            
            inputs.forEach(function(input) {
                const valor = parseFloat(input.value) || 0;
                
                if (input.id === 'km-bike') {
                    totalKm += valor;
                } else if (input.id === 'km-transporte') {
                    totalKm += valor * 0.5;
                } else if (input.id === 'energia') {
                    energia = valor;
                }
            });
            
            // Calculo simplificado: 0.12kg CO2/km evitado
            const co2Bike = totalKm * 0.12;
            const co2Energia = energia * 0.5;
            const totalCO2 = co2Bike + co2Energia;
            
            // XP: 10 XP por kg de CO2
            const xp = Math.floor(totalCO2 * 10);
            
            if (resultadoValor) {
                animarNumero(resultadoValor, totalCO2, 1);
            }
            
            if (resultadoXp) {
                animarNumero(resultadoXp, xp, 0);
            }
        }
        
        inputs.forEach(function(input) {
            input.addEventListener('input', calcularCO2);
        });
        
        // Calcular inicial
        calcularCO2();
    }
    
    function animarNumero(elemento, valor, decimais) {
        const duracao = 500;
        const inicio = parseFloat(elemento.textContent) || 0;
        const diferenca = valor - inicio;
        const inicioTempo = performance.now();
        
        function atualizar(tempoAtual) {
            const decorrido = tempoAtual - inicioTempo;
            const progresso = Math.min(decorrido / duracao, 1);
            
            // Easing ease-out
            const easing = 1 - Math.pow(1 - progresso, 3);
            const atual = inicio + (diferenca * easing);
            
            elemento.textContent = atual.toFixed(decimais);
            
            if (progresso < 1) {
                requestAnimationFrame(atualizar);
            }
        }
        
        requestAnimationFrame(atualizar);
    }
    
    // Demo Lumi - Controles
    const btnNivel = document.querySelector('.lumi__btn--nivel');
    const btnXp = document.querySelector('.lumi__btn--xp');
    const lumiNivel = document.querySelector('.lumi__nivel');
    const lumiXpBar = document.querySelector('.lumi__xp-progresso');
    const lumiAvatar = document.querySelector('.lumi__avatar');
    
    if (btnNivel && btnXp) {
        let nivel = 1;
        let xp = 65;
        
        btnNivel.addEventListener('click', function() {
            nivel++;
            if (nivel > 10) nivel = 1;
            
            if (lumiNivel) {
                lumiNivel.textContent = 'Nível ' + nivel + ' - Guardian Lumi';
            }
            
            // Atualizar avatar
            if (lumiAvatar) {
                const tamanho = 15 + (nivel * 1.5);
                lumiAvatar.style.width = tamanho + 'rem';
                lumiAvatar.style.height = tamanho + 'rem';
            }
        });
        
        btnXp.addEventListener('click', function() {
            xp += 15;
            if (xp > 100) {
                xp = 0;
                nivel++;
                if (lumiNivel) {
                    lumiNivel.textContent = 'Nível ' + nivel + ' - Guardian Lumi';
                }
            }
            
            if (lumiXpBar) {
                lumiXpBar.style.width = xp + '%';
            }
        });
    }
    
    // Scroll Reveal simples
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Aplicar aos elementos
    const revealElements = document.querySelectorAll('.conteudo__sec, .recurso, .integrante, .cosmetico');
    
    revealElements.forEach(function(el, index) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(2rem)';
        el.style.transition = 'opacity 0.6s ease ' + (index * 0.1) + 's, transform 0.6s ease ' + (index * 0.1) + 's';
        observer.observe(el);
    });
});
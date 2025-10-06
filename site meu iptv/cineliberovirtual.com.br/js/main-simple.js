// JavaScript principal - Versão Simples
(function() {
    'use strict';
    
    // Otimização de imagens responsivas
    function optimizeImages() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(function(img) {
            // Adicionar sizes se não existir
            if (!img.hasAttribute('sizes')) {
                const width = img.getAttribute('width') || 300;
                if (width > 400) {
                    img.setAttribute('sizes', '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, ' + width + 'px');
                } else {
                    img.setAttribute('sizes', '(max-width: 768px) 100vw, ' + width + 'px');
                }
            }
        });
    }

    // Aguardar configuração do WhatsApp
    function getWhatsAppLink() {
        return window.WHATSAPP_CONFIG ? window.WHATSAPP_CONFIG.WHATSAPP_LINK : 'https://api.whatsapp.com/send/?phone=5521967827833&text=Ol%C3%A1%2C+gostaria+de+experimentar+a+Viu+TV+Plus.&type=phone_number&app_absent=0';
    }
    
    // Aplicar link do WhatsApp em todos os botões "Solicitar Teste"
    function setupWhatsAppLinks() {
        const WHATSAPP_LINK = getWhatsAppLink();
        const buttons = document.querySelectorAll('a, button');
        
        buttons.forEach(function(button) {
            const text = button.textContent.trim();
            if (text === 'Solicitar Teste') {
                button.href = WHATSAPP_LINK;
                button.target = '_blank';
                button.rel = 'noopener noreferrer';
                console.log('Link WhatsApp aplicado:', button.href);
            }
        });
    }
    
    // Toggle do menu hambúrguer
    function setupMobileMenu() {
        const menuToggle = document.querySelector('.menu-toggle');
        const mainNav = document.querySelector('.main-nav');
        
        if (menuToggle && mainNav) {
            menuToggle.addEventListener('click', function() {
                const isOpen = mainNav.style.display === 'block';
                const newState = isOpen ? 'none' : 'block';
                mainNav.style.display = newState;
                menuToggle.classList.toggle('active');
                
                // Atualizar aria-expanded para acessibilidade
                menuToggle.setAttribute('aria-expanded', newState === 'block' ? 'true' : 'false');
                menuToggle.setAttribute('aria-label', newState === 'block' ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
            });
            
            // Fechar menu ao clicar em um link
            const navLinks = mainNav.querySelectorAll('a');
            navLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 768) {
                        mainNav.style.display = 'none';
                        menuToggle.classList.remove('active');
                        menuToggle.setAttribute('aria-expanded', 'false');
                        menuToggle.setAttribute('aria-label', 'Abrir menu de navegação');
                    }
                });
            });
            
            // Fechar menu ao redimensionar para desktop
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768) {
                    mainNav.style.display = '';
                    menuToggle.classList.remove('active');
                }
            });
        }
    }
    
    // Scroll suave para âncoras internas
    function setupSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = link.getAttribute('href');
                
                if (href === '#' || href === '') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    
                    const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 80;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // FAQ Accordion
    function setupFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(function(item, index) {
            const question = item.querySelector('h3');
            const answer = item.querySelector('.faq-answer');
            
            if (question && answer) {
                question.style.cursor = 'pointer';
                
                question.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const isActive = item.classList.contains('active');
                    
                    // Fechar todos os outros itens
                    faqItems.forEach(function(otherItem) {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle do item atual
                    if (isActive) {
                        item.classList.remove('active');
                    } else {
                        item.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Animação de contagem dos números com easing
    function animateNumber(element, finalNumber, duration) {
        const startTime = Date.now();
        element.classList.add('animating');
        
        function easeOutQuart(t) {
            return 1 - (--t) * t * t * t;
        }
        
        function updateNumber() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const currentNumber = finalNumber * easedProgress;
            
            // Formatação dos números
            if (finalNumber >= 1000) {
                const thousands = Math.floor(currentNumber / 1000);
                element.textContent = '+' + thousands + '.000';
            } else if (finalNumber >= 100) {
                element.textContent = Math.floor(currentNumber) + '%';
            } else {
                element.textContent = Math.floor(currentNumber) + 'h';
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                element.classList.remove('animating');
            }
        }
        
        requestAnimationFrame(updateNumber);
    }
    
    // Configurar animação dos stats
    function setupStatsAnimation() {
        const statsSection = document.querySelector('.social-proof');
        const statItems = document.querySelectorAll('.stat-item');
        const statNumbers = document.querySelectorAll('.stat-item h3');
        let animationTriggered = false;
        
        if (!statsSection || statNumbers.length === 0) return;
        
        console.log('Configurando animação dos stats...');
        
        // Configurar Intersection Observer
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && !animationTriggered) {
                    animationTriggered = true;
                    console.log('Iniciando animação dos stats');
                    
                    // Animar entrada dos cards
                    statItems.forEach(function(item, index) {
                        setTimeout(function() {
                            item.classList.add('animate-in');
                        }, index * 150);
                    });
                    
                    // Animar números
                    statNumbers.forEach(function(numberElement, index) {
                        const originalText = numberElement.textContent;
                        
                        // Resetar para 0 antes da animação
                        if (originalText.includes('15.000')) {
                            numberElement.textContent = '+0.000';
                            setTimeout(function() {
                                animateNumber(numberElement, 15000, 2500);
                            }, (index * 200) + 500);
                        } else if (originalText.includes('99.9')) {
                            numberElement.textContent = '0.0%';
                            setTimeout(function() {
                                animateNumberPercent(numberElement, 99.9, 2000);
                            }, (index * 200) + 500);
                        } else if (originalText.includes('24 horas')) {
                            numberElement.textContent = '0 horas';
                            setTimeout(function() {
                                animateNumberText(numberElement, '24 horas', 1500);
                            }, (index * 200) + 500);
                        } else if (originalText.includes('Horas')) {
                            numberElement.textContent = '0 Horas';
                            setTimeout(function() {
                                animateNumberHours(numberElement, 4, 1800);
                            }, (index * 200) + 500);
                        }
                    });
                }
            });
        }, {
            threshold: 0.3 // Trigger quando 30% da seção estiver visível
        });
        
        observer.observe(statsSection);
    }
    
    // Animação para texto específico
    function animateNumberText(element, finalText, duration) {
        element.classList.add('animating');
        
        setTimeout(function() {
            element.textContent = finalText;
            element.classList.remove('animating');
        }, duration / 2);
    }
    
    // Animação específica para porcentagem
    function animateNumberPercent(element, finalNumber, duration) {
        const startTime = Date.now();
        element.classList.add('animating');
        
        function easeOutQuart(t) {
            return 1 - (--t) * t * t * t;
        }
        
        function updatePercent() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const currentNumber = finalNumber * easedProgress;
            
            element.textContent = currentNumber.toFixed(1) + '%';
            
            if (progress < 1) {
                requestAnimationFrame(updatePercent);
            } else {
                element.classList.remove('animating');
            }
        }
        
        requestAnimationFrame(updatePercent);
    }
    
    // Animação específica para horas
    function animateNumberHours(element, finalNumber, duration) {
        const startTime = Date.now();
        element.classList.add('animating');
        
        function easeOutQuart(t) {
            return 1 - (--t) * t * t * t;
        }
        
        function updateHours() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const currentNumber = finalNumber * easedProgress;
            
            element.textContent = Math.floor(currentNumber) + ' Horas';
            
            if (progress < 1) {
                requestAnimationFrame(updateHours);
            } else {
                element.classList.remove('animating');
            }
        }
        
        requestAnimationFrame(updateHours);
    }
    
    // Inicialização
    document.addEventListener('DOMContentLoaded', function() {
        setupWhatsAppLinks();
        setupMobileMenu();
        setupSmoothScroll();
        setupFAQAccordion();
        setupStatsAnimation();
        optimizeImages();
    });
    
})();
// ═══════════ PETCARE - FUNCIONALIDADES ═══════════

document.addEventListener('DOMContentLoaded', function() {
    
    // ═══════════ MENU MOBILE ═══════════
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    if (burger) {
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animação do ícone hambúrguer
            const lines = burger.querySelectorAll('div');
            if (navLinks.classList.contains('active')) {
                lines[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });
        
        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const lines = burger.querySelectorAll('div');
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            });
        });
    }

    // ═══════════ SCROLL SUAVE ═══════════
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ═══════════ ANIMAÇÕES DE SCROLL ═══════════
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Adicionar classe fade-in aos elementos
    document.querySelectorAll('.service-card, .product-card, .why-item, .contact-info, .contact-form').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // ═══════════ FORMULÁRIO DE AGENDAMENTO ═══════════
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados do formulário
            const formData = {
                nome: document.getElementById('nome').value,
                telefone: document.getElementById('telefone').value,
                email: document.getElementById('email').value,
                pet: document.getElementById('pet').value,
                tipo: document.getElementById('tipo').value,
                servico: document.getElementById('servico').value,
                data: document.getElementById('data').value
            };
            
            // Validar campos
            if (!formData.nome || !formData.telefone || !formData.email || !formData.pet || !formData.data) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Simular envio
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span class="loading"></span> Agendando...';
            btn.disabled = true;
            
            setTimeout(() => {
                showNotification(`Consulta agendada com sucesso! Entraremos em contato com ${formData.nome}.`, 'success');
                appointmentForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    // ═══════════ FORMULÁRIO DE CONTATO ═══════════
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span class="loading"></span> Enviando...';
            btn.disabled = true;
            
            setTimeout(() => {
                showNotification('Mensagem enviada com sucesso! Responderemos em breve.', 'success');
                contactForm.reset();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 1500);
        });
    }

    // ═══════════ SISTEMA DE NOTIFICAÇÕES ═══════════
    function showNotification(message, type = 'success') {
        // Remover notificação existente
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Remover após 4 segundos
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    // ═══════════ EFEITO PARALLAX NO HERO ═══════════
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const heroContent = document.querySelector('.hero-content');
            const heroImage = document.querySelector('.hero-image');
            
            if (scrolled < window.innerHeight) {
                if (heroContent) heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
                if (heroImage) heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
            }
        });
    }

    // ═══════════ CONTADOR DE ESTATÍSTICAS ═══════════
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function update() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start) + (element.dataset.suffix || '');
                requestAnimationFrame(update);
            } else {
                element.textContent = target + (element.dataset.suffix || '');
            }
        }
        
        update();
    }

    // Animar contadores quando visíveis
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numElement = entry.target.querySelector('.num');
                if (numElement && !numElement.dataset.animated) {
                    numElement.dataset.animated = 'true';
                    const target = parseInt(numElement.textContent);
                    animateCounter(numElement, target);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stats > div').forEach(stat => {
        statsObserver.observe(stat);
    });

    // ═══════════ EFEITO DE DIGITAÇÃO NO TÍTULO ═══════════
    // Removido - estava causando problemas com tags HTML
    // O título agora aparece normalmente com animação CSS

    // ═══════════ BOTÃO DE VOLTAR AO TOPO ═══════════
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #ff6b6b 0%, #ffa502 100%);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s;
        z-index: 1000;
        box-shadow: 0 5px 20px rgba(255, 107, 107, 0.3);
    `;
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ═══════════ LAZY LOADING DE IMAGENS ═══════════
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ═══════════ EFEITO DE HOVER NOS CARDS ═══════════
    document.querySelectorAll('.service-card, .product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ═══════════ VALIDAÇÃO DE FORMULÁRIOS EM TEMPO REAL ═══════════
    document.querySelectorAll('input[type="email"]').forEach(input => {
        input.addEventListener('blur', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                this.style.borderColor = '#d63031';
                showNotification('Por favor, insira um e-mail válido.', 'error');
            } else {
                this.style.borderColor = '#e0e0e0';
            }
        });
    });

    // ═══════════ MÁSCARA DE TELEFONE ═══════════
    const phoneInput = document.getElementById('telefone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                value = '(' + value;
            }
            if (value.length > 3) {
                value = value.slice(0, 3) + ') ' + value.slice(3);
            }
            if (value.length > 10) {
                value = value.slice(0, 10) + '-' + value.slice(10, 14);
            }
            
            this.value = value;
        });
    }

    // ═══════════ ANIMAÇÃO DE ENTRADA DOS ELEMENTOS ═══════════
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section-header, .service-card, .product-card, .why-item');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executar uma vez ao carregar

    // ═══════════ EFEITO DE PARTÍCULAS NO HERO ═══════════
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${Math.random() > 0.5 ? '#ff6b6b' : '#4ecdc4'};
            border-radius: 50%;
            opacity: 0.3;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
        `;
        
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 5000);
        }
    }

    // Criar partículas periodicamente
    setInterval(createParticle, 2000);

    // Adicionar animação de flutuação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0) rotate(0deg);
            }
            50% {
                transform: translateY(-20px) rotate(180deg);
            }
        }
    `;
    document.head.appendChild(style);

    console.log('🐾 PetCare - Sistema carregado com sucesso!');
});
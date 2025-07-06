// Global variables
let currentSection = 'home';
let isLoading = true;

// DOM elements
const loader = document.getElementById('loader');
const sidebar = document.querySelector('.sidebar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileOverlay = document.getElementById('mobile-overlay');
const closeMobileMenu = document.getElementById('close-mobile-menu');
const navItems = document.querySelectorAll('.nav-item');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const sections = document.querySelectorAll('.section');
const chatButton = document.querySelector('.chat-button');
const chatPopup = document.querySelector('.chat-popup');
const chatClose = document.querySelector('.chat-close');
const contactForm = document.querySelector('.contact-form');
const productCards = document.querySelectorAll('.product-card');
const buyButtons = document.querySelectorAll('.buy-button');
const ctaButton = document.querySelector('.cta-button');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeLoader();
    initializeNavigation();
    initializeAnimations();
    initializeInteractions();
    initializeScrollEffects();
    initializeChat();
    initializeForm();
    initializeProducts();
    initializeAccessibility();
});

// Loader functionality
function initializeLoader() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
            isLoading = false;
            
            // Initialize scroll-based animations after loader
            setTimeout(() => {
                initializeScrollAnimations();
            }, 500);
        }, 2500);
    });
}

// Navigation functionality
function initializeNavigation() {
    // Desktop navigation
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = item.getAttribute('data-section');
            navigateToSection(targetSection);
            updateActiveNavItem(item);
        });
    });

    // Mobile navigation
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
        document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
    });

    closeMobileMenu.addEventListener('click', closeMobileNavigation);
    
    mobileOverlay.addEventListener('click', (e) => {
        if (e.target === mobileOverlay) {
            closeMobileNavigation();
        }
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = link.getAttribute('data-section');
            navigateToSection(targetSection);
            closeMobileNavigation();
            
            // Update desktop nav active state
            const correspondingNavItem = document.querySelector(`.nav-item[data-section="${targetSection}"]`);
            if (correspondingNavItem) {
                updateActiveNavItem(correspondingNavItem);
            }
        });
    });

    // CTA button navigation
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            navigateToSection('products');
            const productsNavItem = document.querySelector('.nav-item[data-section="products"]');
            if (productsNavItem) {
                updateActiveNavItem(productsNavItem);
            }
        });
    }
}

function closeMobileNavigation() {
    mobileMenuBtn.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        currentSection = sectionId;
    }
}

function updateActiveNavItem(activeItem) {
    navItems.forEach(item => item.classList.remove('active'));
    activeItem.classList.add('active');
}

// Animation initialization
function initializeAnimations() {
    // Card symbol animations
    animateCardSymbols();
    
    // Parallax background effects
    initializeParallaxEffects();
    
    // Stagger animations for product cards
    staggerProductCardAnimations();
}

function animateCardSymbols() {
    const symbols = ['♠', '♥', '♣', '♦'];
    const cardSymbols = document.querySelectorAll('.card-symbol:not(.rotating)');
    
    if (cardSymbols.length > 0) {
        setInterval(() => {
            cardSymbols.forEach((symbol, index) => {
                const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
                setTimeout(() => {
                    symbol.textContent = randomSymbol;
                    symbol.style.transform = 'scale(1.2)';
                    setTimeout(() => {
                        symbol.style.transform = 'scale(1)';
                    }, 200);
                }, index * 300);
            });
        }, 8000);
    }
}

function initializeParallaxEffects() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const fallingRoses = document.querySelector('.falling-roses');
        const floatingCards = document.querySelector('.floating-cards');
        
        if (fallingRoses) {
            fallingRoses.style.transform = `translateY(${rate}px)`;
        }
        
        if (floatingCards) {
            floatingCards.style.transform = `translateX(${rate * 0.3}px) translateY(${rate * 0.2}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

function staggerProductCardAnimations() {
    productCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('animate-fade-in');
    });
}

// Interaction handlers
function initializeInteractions() {
    // Product card hover effects
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-15px) scale(1.02)';
            card.style.boxShadow = '0 25px 50px rgba(212, 175, 55, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
        });
    });

    // Button interactions with ripple effect
    const interactiveButtons = document.querySelectorAll('.cta-button, .buy-button, .submit-button');
    interactiveButtons.forEach(button => {
        button.addEventListener('click', createRippleEffect);
    });

    // Social link hover effects
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-8px) scale(1.1) rotate(5deg)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0) scale(1) rotate(0deg)';
        });
    });

    // Payment method card hover effects
    const paymentCards = document.querySelectorAll('.payment-method-card');
    paymentCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(212, 175, 55, 0.3)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'none';
        });
    });
}

function createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Scroll effects
function initializeScrollEffects() {
    let lastScrollTop = 0;
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', throttle(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Update current section based on scroll position
        updateCurrentSection();
        
        // Sidebar hide/show on mobile
        if (window.innerWidth <= 1024) {
            if (scrollTop > lastScrollTop && scrollTop > scrollThreshold) {
                // Scrolling down
                if (mobileOverlay.classList.contains('active')) {
                    closeMobileNavigation();
                }
            }
        }
        
        lastScrollTop = scrollTop;
    }, 16));
}

function updateCurrentSection() {
    const scrollPosition = window.pageYOffset + window.innerHeight / 2;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            if (currentSection !== sectionId) {
                currentSection = sectionId;
                const activeNavItem = document.querySelector(`.nav-item[data-section="${sectionId}"]`);
                if (activeNavItem) {
                    updateActiveNavItem(activeNavItem);
                }
            }
        }
    });
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special handling for product cards
                if (entry.target.classList.contains('product-card')) {
                    const delay = Array.from(productCards).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                } else {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const animatedElements = document.querySelectorAll('.product-card, .section-title, .contact-form-container, .info-card, .hero-text, .poker-card-display, .payment-method-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        observer.observe(el);
    });
}

// Chat functionality
function initializeChat() {
    if (chatButton && chatPopup && chatClose) {
        chatButton.addEventListener('click', () => {
            chatPopup.classList.toggle('active');
            
            // Add entrance animation
            if (chatPopup.classList.contains('active')) {
                chatButton.style.transform = 'scale(0.9) rotate(15deg)';
                setTimeout(() => {
                    chatButton.style.transform = 'scale(1) rotate(0deg)';
                }, 200);
            }
        });

        chatClose.addEventListener('click', () => {
            chatPopup.classList.remove('active');
        });

        // Close chat when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.floating-chat')) {
                chatPopup.classList.remove('active');
            }
        });

        // Chat option interactions
        const chatOptions = document.querySelectorAll('.chat-option');
        chatOptions.forEach(option => {
            option.addEventListener('click', () => {
                const optionText = option.textContent;
                showNotification(`Solicitud recibida: ${optionText}. Te contactaremos pronto.`, 'success');
                chatPopup.classList.remove('active');
            });
        });
    }
}

// Form handling
function initializeForm() {
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (!name || !email || !message) {
                showNotification('Por favor, completa todos los campos.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, ingresa un correo electrónico válido.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            
            submitButton.innerHTML = '<span>Enviando...</span>';
            submitButton.disabled = true;
            
            setTimeout(() => {
                showNotification('¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.', 'success');
                contactForm.reset();
                
                // Reset form labels
                const labels = contactForm.querySelectorAll('label');
                labels.forEach(label => {
                    label.style.top = '20px';
                    label.style.fontSize = '16px';
                    label.style.color = 'var(--text-light)';
                });
                
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });

        // Enhanced form interactions
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Product interactions with WhatsApp integration
function initializeProducts() {
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const platformName = button.getAttribute('data-platform');
            
            // Add click animation
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
            
            // Redirect to WhatsApp
            redirectToWhatsApp(platformName);
        });
    });
}

function redirectToWhatsApp(platformName) {
    const phoneNumber = '+1234567890'; // Replace with actual WhatsApp number
    const message = `Quiero comprar ${platformName}`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Show confirmation before redirect
    showPurchaseConfirmation(platformName, whatsappUrl);
}

function showPurchaseConfirmation(platformName, whatsappUrl) {
    const modal = document.createElement('div');
    modal.className = 'purchase-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>¡Excelente elección!</h3>
                <button class="modal-close">✕</button>
            </div>
            <div class="modal-body">
                <div class="platform-preview">
                    <div class="platform-icon whatsapp-icon">💬</div>
                    <h4>${platformName}</h4>
                </div>
                <p>Serás redirigido a WhatsApp para completar tu compra de <strong>${platformName}</strong>.</p>
                <div class="modal-features">
                    <div class="feature-item">
                        <span class="feature-icon">✓</span>
                        <span>Atención personalizada</span>
                    </div>
                    <div class="feature-item">
                        <span class="feature-icon">✓</span>
                        <span>Activación inmediata</span>
                    </div>
                    <div class="feature-item">
                        <span class="feature-icon">✓</span>
                        <span>Soporte 24/7</span>
                    </div>
                </div>
                <div class="modal-actions">
                    <button class="confirm-button" onclick="window.open('${whatsappUrl}', '_blank')">
                        <span>💬 Ir a WhatsApp</span>
                    </button>
                    <button class="cancel-button">Cancelar</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Style the modal
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    });
    
    // Event listeners
    const closeButton = modal.querySelector('.modal-close');
    const cancelButton = modal.querySelector('.cancel-button');
    
    const closeModal = () => {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.9)';
        setTimeout(() => {
            modal.remove();
        }, 300);
    };
    
    closeButton.addEventListener('click', closeModal);
    cancelButton.addEventListener('click', closeModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// Accessibility features
function initializeAccessibility() {
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'Escape':
                // Close any open modals or popups
                document.querySelectorAll('.purchase-modal').forEach(modal => {
                    modal.style.opacity = '0';
                    setTimeout(() => modal.remove(), 300);
                });
                chatPopup.classList.remove('active');
                closeMobileNavigation();
                break;
                
            case 'Tab':
                // Ensure focus is visible
                document.body.classList.add('keyboard-navigation');
                break;
        }
    });
    
    // Remove keyboard navigation class on mouse use
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Announce section changes for screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    document.body.appendChild(announcer);
    
    // Update announcer when section changes
    let lastAnnouncedSection = '';
    setInterval(() => {
        if (currentSection !== lastAnnouncedSection) {
            const sectionNames = {
                home: 'Inicio',
                products: 'Productos',
                contact: 'Contacto'
            };
            announcer.textContent = `Navegando a sección: ${sectionNames[currentSection] || currentSection}`;
            lastAnnouncedSection = currentSection;
        }
    }, 1000);
}

// Utility functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close">✕</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    requestAnimationFrame(() => {
        notification.classList.add('show');
    });
    
    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoRemove);
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

function getNotificationIcon(type) {
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || 'ℹ';
}

// Performance monitoring
function initializePerformanceMonitoring() {
    // Monitor frame rate
    let lastTime = performance.now();
    let frameCount = 0;
    
    function checkFrameRate() {
        const currentTime = performance.now();
        frameCount++;
        
        if (currentTime - lastTime >= 1000) {
            const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
            
            if (fps < 30) {
                // Reduce animations if performance is poor
                document.body.classList.add('reduced-motion');
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(checkFrameRate);
    }
    
    requestAnimationFrame(checkFrameRate);
}

// Initialize performance monitoring
initializePerformanceMonitoring();

// Add dynamic styles
const dynamicStyles = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .purchase-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .modal-content {
        background: var(--card-bg);
        border: 2px solid var(--gold);
        border-radius: 25px;
        max-width: 500px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        transform: scale(0.9);
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        backdrop-filter: blur(15px);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30px;
        border-bottom: 1px solid rgba(212, 175, 55, 0.3);
    }
    
    .modal-header h3 {
        font-family: 'Playfair Display', serif;
        color: var(--gold);
        margin: 0;
        font-size: 24px;
    }
    
    .modal-close {
        background: none;
        border: none;
        color: var(--text-light);
        font-size: 24px;
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        transition: all 0.3s ease;
    }
    
    .modal-close:hover {
        background: rgba(212, 175, 55, 0.2);
        color: var(--gold);
    }
    
    .modal-body {
        padding: 30px;
    }
    
    .platform-preview {
        text-align: center;
        margin-bottom: 25px;
    }
    
    .platform-preview .platform-icon {
        width: 80px;
        height: 80px;
        margin: 0 auto 15px;
        font-size: 32px;
    }
    
    .whatsapp-icon {
        background: linear-gradient(45deg, #25d366, #128c7e) !important;
    }
    
    .platform-preview h4 {
        font-family: 'Playfair Display', serif;
        color: var(--gold);
        margin: 0;
        font-size: 20px;
    }
    
    .modal-body p {
        color: var(--text-light);
        line-height: 1.6;
        margin-bottom: 25px;
        opacity: 0.9;
    }
    
    .modal-features {
        margin-bottom: 30px;
    }
    
    .feature-item {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
        color: var(--text-light);
        opacity: 0.8;
    }
    
    .feature-icon {
        color: var(--gold);
        font-weight: bold;
    }
    
    .modal-actions {
        display: flex;
        gap: 15px;
        justify-content: center;
    }
    
    .confirm-button,
    .cancel-button {
        padding: 12px 25px;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 2px solid;
    }
    
    .confirm-button {
        background: linear-gradient(45deg, #25d366, #128c7e);
        border-color: #25d366;
        color: white;
    }
    
    .confirm-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(37, 211, 102, 0.4);
    }
    
    .cancel-button {
        background: transparent;
        border-color: var(--text-light);
        color: var(--text-light);
    }
    
    .cancel-button:hover {
        background: rgba(255, 255, 255, 0.1);
        transform: translateY(-2px);
    }
    
    .notification {
        position: fixed;
        top: 100px;
        right: -400px;
        background: var(--card-bg);
        border: 2px solid var(--gold);
        border-radius: 15px;
        padding: 20px;
        max-width: 350px;
        z-index: 10001;
        transition: right 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        backdrop-filter: blur(15px);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
    }
    
    .notification.show {
        right: 20px;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .notification-icon {
        font-size: 20px;
        font-weight: bold;
    }
    
    .notification-success .notification-icon {
        color: #4CAF50;
    }
    
    .notification-error .notification-icon {
        color: #f44336;
    }
    
    .notification-warning .notification-icon {
        color: #ff9800;
    }
    
    .notification-info .notification-icon {
        color: var(--blue-rose);
    }
    
    .notification-message {
        color: var(--text-light);
        flex: 1;
        line-height: 1.4;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--text-light);
        cursor: pointer;
        font-size: 16px;
        opacity: 0.7;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
    
    .keyboard-navigation *:focus {
        outline: 3px solid var(--gold) !important;
        outline-offset: 2px !important;
    }
    
    .reduced-motion * {
        animation-duration: 0.1s !important;
        transition-duration: 0.1s !important;
    }
    
    @media (max-width: 768px) {
        .modal-content {
            margin: 20px;
            max-height: calc(100vh - 40px);
        }
        
        .modal-header,
        .modal-body {
            padding: 20px;
        }
        
        .modal-actions {
            flex-direction: column;
        }
        
        .notification {
            right: -350px;
            max-width: 300px;
        }
        
        .notification.show {
            right: 10px;
        }
    }
`;

// Inject dynamic styles
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// Export functions for potential external use
window.LiarsKingsShop = {
    navigateToSection,
    showNotification,
    redirectToWhatsApp
};
// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    
    // Détecter Safari et iOS
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    console.log('Browser Detection - Safari:', isSafari, 'iOS:', isIOS, 'Mobile:', isMobile);
    
    // ==================== MOBILE MENU ====================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu && navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                hamburger && !hamburger.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ==================== MENU NAVIGATION ====================
    const menuNavBtns = document.querySelectorAll('.menu-nav-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    
    if (menuNavBtns.length > 0 && menuSections.length > 0) {
        menuNavBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const sectionId = this.getAttribute('data-section');
                
                // Update active button
                menuNavBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Show active section
                menuSections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === sectionId) {
                        section.classList.add('active');
                    }
                });
                
                // Scroll to top of menu container on mobile
                if (isMobile) {
                    const menuContainer = document.querySelector('.menu-container');
                    if (menuContainer) {
                        menuContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }
            });
        });
    }
    
    // ==================== 3D MODEL LOADING - FIX FOR SAFARI ====================
    const loadButtons = document.querySelectorAll('.load-3d-btn');
    
    loadButtons.forEach(button => {
        button.addEventListener('click', async function(e) {
            e.preventDefault();
            
            // Prevent double clicks
            if (this.classList.contains('loading') || this.classList.contains('loaded')) {
                return;
            }
            
            this.classList.add('loading');
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Chargement...';
            
            const modelUrl = this.getAttribute('data-model');
            const targetId = this.getAttribute('data-target');
            const placeholder = document.getElementById(targetId);
            
            if (!modelUrl || !placeholder) {
                console.error('Model URL or placeholder not found');
                this.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Erreur';
                this.classList.remove('loading');
                return;
            }
            
            try {
                if (isSafari || isIOS) {
                    // Safari/iOS: Alternative approach with download link
                    const safariMessage = document.createElement('div');
                    safariMessage.className = 'safari-model-message';
                    safariMessage.style.cssText = `
                        background: var(--gold-primary);
                        padding: 1rem;
                        border-radius: 12px;
                        text-align: center;
                        animation: fadeIn 0.3s ease;
                    `;
                    safariMessage.innerHTML = `
                        <i class="fas fa-download" style="font-size: 1.2rem; color: var(--navy-deep);"></i>
                        <p style="margin-top: 0.5rem; font-size: 0.75rem; color: var(--navy-deep); font-weight: 500;">Modèle 3D disponible</p>
                        <a href="${modelUrl}" target="_blank" style="display: inline-block; margin-top: 0.5rem; padding: 0.4rem 1rem; background: var(--navy-deep); color: var(--gold-primary); text-decoration: none; border-radius: 50px; font-size: 0.7rem;">
                            <i class="fas fa-external-link-alt"></i> Visualiser le modèle
                        </a>
                    `;
                    placeholder.innerHTML = '';
                    placeholder.appendChild(safariMessage);
                    this.innerHTML = '<i class="fas fa-download"></i> Modèle disponible';
                    this.classList.add('loaded');
                } else {
                    // Chrome/Others: Use model-viewer
                    // Clear placeholder
                    placeholder.innerHTML = '';
                    
                    // Create model-viewer element
                    const modelViewer = document.createElement('model-viewer');
                    modelViewer.setAttribute('src', modelUrl);
                    modelViewer.setAttribute('alt', 'Plat 3D');
                    modelViewer.setAttribute('camera-controls', '');
                    modelViewer.setAttribute('environment-image', 'neutral');
                    modelViewer.setAttribute('style', 'width:100%; height:150px; border-radius:12px; background:#E8F0F5;');
                    modelViewer.setAttribute('auto-rotate', '');
                    modelViewer.setAttribute('rotation-per-second', '30deg');
                    
                    // Add loading indicator
                    modelViewer.addEventListener('load', function() {
                        console.log('Model loaded successfully');
                    });
                    
                    modelViewer.addEventListener('error', function(e) {
                        console.error('Model loading error:', e);
                        placeholder.innerHTML = '<div style="background:#E8F0F5; height:150px; display:flex; align-items:center; justify-content:center; border-radius:12px; flex-direction:column;"><i class="fas fa-cube" style="font-size:2rem; color:#C9A03D;"></i><p style="font-size:0.7rem; margin-top:0.5rem;">Modèle non disponible</p></div>';
                    });
                    
                    placeholder.appendChild(modelViewer);
                    
                    this.innerHTML = '<i class="fas fa-check"></i> Plat chargé 🍽️';
                    this.classList.add('loaded');
                }
            } catch (error) {
                console.error('Error loading model:', error);
                this.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Réessayer';
                placeholder.innerHTML = '<div style="background:#E8F0F5; height:150px; display:flex; align-items:center; justify-content:center; border-radius:12px; flex-direction:column;"><i class="fas fa-cube" style="font-size:2rem; color:#C9A03D;"></i><p style="font-size:0.7rem; margin-top:0.5rem;">Cliquez pour réessayer</p></div>';
            }
            
            this.classList.remove('loading');
        });
    });
    
    // ==================== CONTACT FORM ====================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const message = document.getElementById('message')?.value.trim();
            
            if (name && email && message) {
                alert(`Merci ${name} ! Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.`);
                contactForm.reset();
            } else {
                alert('Veuillez remplir tous les champs obligatoires.');
            }
        });
    }
    
    // ==================== SMOOTH SCROLL FOR ANCHORS ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && href !== '' && href !== '/') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offset = 70;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ==================== SCROLL ANIMATION ====================
    const animatedElements = document.querySelectorAll('.feature-card, .menu-item, .testimonial-card, .info-card');
    
    if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '30px'
        });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(15px)';
            el.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers
        animatedElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }
    
    // ==================== ACTIVE NAVIGATION ON SCROLL ====================
    const sections = document.querySelectorAll('.menu-section');
    const navButtons = document.querySelectorAll('.menu-nav-btn');
    
    if (sections.length > 0 && navButtons.length > 0 && 'IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '-100px 0px -200px 0px',
            threshold: 0.3
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.id;
                    navButtons.forEach(btn => {
                        btn.classList.remove('active');
                        if (btn.getAttribute('data-section') === activeId) {
                            btn.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
    
    // ==================== NAVBAR SCROLL EFFECT ====================
    const navbar = document.querySelector('.navbar');
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                if (navbar) {
                    if (window.scrollY > 50) {
                        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
                    } else {
                        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                    }
                }
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // ==================== FIX FOR IOS SAFARI 100vh ====================
    if (isSafari || isIOS) {
        const setVh = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        setVh();
        window.addEventListener('resize', setVh);
        window.addEventListener('orientationchange', setVh);
        
        // Fix for active states on iOS
        document.querySelectorAll('button, .btn, .load-3d-btn, .menu-nav-btn').forEach(btn => {
            btn.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.97)';
            });
            btn.addEventListener('touchend', function() {
                this.style.transform = '';
            });
            btn.addEventListener('touchcancel', function() {
                this.style.transform = '';
            });
        });
    }
    
    // ==================== FIX FORM INPUTS ON IOS ====================
    if (isIOS) {
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                document.body.style.position = 'relative';
            });
            input.addEventListener('blur', () => {
                document.body.style.position = '';
                window.scrollTo(0, 0);
            });
        });
    }
    
    // ==================== PRELOAD PLACEHOLDER IMAGES ====================
    // Create placeholder images for all model placeholders
    const placeholders = document.querySelectorAll('.model-placeholder');
    placeholders.forEach(placeholder => {
        if (!placeholder.querySelector('img') && !placeholder.querySelector('model-viewer')) {
            const img = document.createElement('img');
            img.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 150\'%3E%3Crect width=\'200\' height=\'150\' fill=\'%23E8F0F5\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\' fill=\'%23C9A03D\' font-size=\'14\'%3E🍽️%3C/text%3E%3C/svg%3E';
            img.style.width = '100%';
            img.style.height = '150px';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '12px';
            placeholder.appendChild(img);
        }
    });
    
    console.log('Seb\'s Garden - Site chargé avec succès');
});

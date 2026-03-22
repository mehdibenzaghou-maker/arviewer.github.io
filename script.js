// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== DETECT SAFARI ====================
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    
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
    
    // ==================== HORIZONTAL SCROLL MENU NAVIGATION ====================
    const menuNav = document.querySelector('.menu-nav');
    const menuNavBtns = document.querySelectorAll('.menu-nav-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    
    // Smooth scroll for active button into view
    function scrollToActiveButton(activeBtn) {
        if (menuNav && activeBtn) {
            try {
                const scrollLeft = activeBtn.offsetLeft - menuNav.offsetLeft - 20;
                menuNav.scrollTo({
                    left: Math.max(0, scrollLeft),
                    behavior: 'smooth'
                });
            } catch(e) {
                // Fallback for Safari
                menuNav.scrollLeft = activeBtn.offsetLeft - menuNav.offsetLeft - 20;
            }
        }
    }
    
    if (menuNavBtns.length > 0 && menuSections.length > 0) {
        menuNavBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const sectionId = this.getAttribute('data-section');
                
                // Update active button
                menuNavBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Scroll button into view
                scrollToActiveButton(this);
                
                // Show active section
                menuSections.forEach(section => {
                    if (section.id === sectionId) {
                        section.style.display = 'block';
                        section.classList.add('active');
                        // Trigger reflow for animation
                        void section.offsetHeight;
                    } else {
                        section.style.display = 'none';
                        section.classList.remove('active');
                    }
                });
            });
        });
        
        // Touch events for smoother scrolling (Safari compatible)
        if (menuNav) {
            let startX;
            let scrollLeft;
            let isDragging = false;
            
            menuNav.addEventListener('touchstart', (e) => {
                startX = e.touches[0].pageX - menuNav.offsetLeft;
                scrollLeft = menuNav.scrollLeft;
                isDragging = true;
            });
            
            menuNav.addEventListener('touchmove', (e) => {
                if (!isDragging || !startX) return;
                const x = e.touches[0].pageX - menuNav.offsetLeft;
                const walk = (x - startX) * 1.5;
                menuNav.scrollLeft = scrollLeft - walk;
            });
            
            menuNav.addEventListener('touchend', () => {
                isDragging = false;
                startX = null;
            });
            
            menuNav.addEventListener('touchcancel', () => {
                isDragging = false;
                startX = null;
            });
        }
    }
    
    // ==================== 3D MODEL LAZY LOADING ====================
    const modelViewers = document.querySelectorAll('model-viewer');
    
    modelViewers.forEach(viewer => {
        const src = viewer.getAttribute('src');
        if (src && !viewer.getAttribute('data-src')) {
            viewer.setAttribute('data-src', src);
            viewer.removeAttribute('src');
        }
    });
    
    const loadButtons = document.querySelectorAll('.load-3d-btn');
    
    loadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.classList.contains('loaded')) return;
            
            const parent = this.closest('.menu-item-3d');
            const viewer = parent ? parent.querySelector('model-viewer') : null;
            
            if (viewer) {
                const dataSrc = viewer.getAttribute('data-src');
                if (dataSrc && !viewer.getAttribute('src')) {
                    viewer.setAttribute('src', dataSrc);
                    this.innerHTML = '<i class="fas fa-check"></i> Plat chargé 🍽️';
                    this.classList.add('loaded');
                }
            }
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
                alert(`Merci ${name} ! Votre message a été envoyé avec succès.`);
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
                            scrollToActiveButton(btn);
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
    
    // ==================== FIX TOUCH ISSUES FOR SAFARI ====================
    if (isSafari || isIOS) {
        // Fix for 100vh issue on iOS
        const setVh = () => {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };
        
        setVh();
        window.addEventListener('resize', setVh);
        window.addEventListener('orientationchange', setVh);
        
        // Fix for active states
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
    
    // ==================== FIX FOR MODEL-VIEWER ON SAFARI ====================
    if (isSafari) {
        // Safari needs extra time for model-viewer
        const load3dButtons = document.querySelectorAll('.load-3d-btn');
        load3dButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                setTimeout(() => {
                    const parent = this.closest('.menu-item-3d');
                    const viewer = parent ? parent.querySelector('model-viewer') : null;
                    if (viewer) {
                        viewer.style.opacity = '0.99';
                        setTimeout(() => {
                            viewer.style.opacity = '';
                        }, 100);
                    }
                }, 50);
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
    
    console.log('Seb\'s Garden - Safari Compatible');
});

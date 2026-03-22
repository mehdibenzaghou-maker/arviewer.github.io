// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== MOBILE MENU ====================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
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
            const scrollLeft = activeBtn.offsetLeft - menuNav.offsetLeft - 20;
            menuNav.scrollTo({
                left: scrollLeft,
                behavior: 'smooth'
            });
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
                
                // Show active section with smooth transition
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
        
        // Touch events for smoother scrolling
        let startX;
        let scrollLeft;
        
        if (menuNav) {
            menuNav.addEventListener('touchstart', (e) => {
                startX = e.touches[0].pageX - menuNav.offsetLeft;
                scrollLeft = menuNav.scrollLeft;
            });
            
            menuNav.addEventListener('touchmove', (e) => {
                if (!startX) return;
                e.preventDefault();
                const x = e.touches[0].pageX - menuNav.offsetLeft;
                const walk = (x - startX) * 1.5;
                menuNav.scrollLeft = scrollLeft - walk;
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
    
    if (sections.length > 0 && navButtons.length > 0) {
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
    
    // ==================== FIX TOUCH ISSUES ====================
    if ('ontouchstart' in window) {
        document.body.style.cursor = 'pointer';
        
        // Prevent zoom on double tap
        let lastTouchEnd = 0;
        document.addEventListener('touchend', function(e) {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
    }
    
    console.log('Seb\'s Garden - Mobile Optimized');
});

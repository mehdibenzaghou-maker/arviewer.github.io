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
        
        // Close menu when clicking on links
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
            });
        });
    }
    
    // ==================== 3D MODEL LAZY LOADING ====================
    // Get all model-viewer elements
    const modelViewers = document.querySelectorAll('model-viewer');
    
    // Store original src and remove it to prevent auto-load
    modelViewers.forEach(viewer => {
        const src = viewer.getAttribute('src');
        if (src && !viewer.getAttribute('data-src')) {
            viewer.setAttribute('data-src', src);
            viewer.removeAttribute('src');
        }
    });
    
    // Handle load buttons
    const loadButtons = document.querySelectorAll('.load-3d-btn');
    
    loadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Skip if already loaded
            if (this.classList.contains('loaded')) return;
            
            // Find the model-viewer
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
                alert(`Merci ${name} ! Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.`);
                contactForm.reset();
            } else {
                alert('Veuillez remplir tous les champs obligatoires.');
            }
        });
    }
    
    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && href !== '' && href !== '/') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // ==================== SCROLL ANIMATION (Optimized) ====================
    // Use Intersection Observer with low threshold for better performance
    const animatedElements = document.querySelectorAll('.feature-card, .menu-item, .testimonial-card, .info-card');
    
    if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target); // Stop observing after animation
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            observer.observe(el);
        });
    } else {
        // Fallback for older browsers
        animatedElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }
    
    // ==================== NAVBAR SCROLL EFFECT ====================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        if (navbar) {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            }
            lastScroll = currentScroll;
        }
    });
    
    // ==================== TOUCH OPTIMIZATIONS ====================
    // Prevent double-tap zoom on buttons
    const allButtons = document.querySelectorAll('button, .btn, .load-3d-btn');
    allButtons.forEach(btn => {
        btn.addEventListener('touchstart', function(e) {
            // Allow normal behavior but prevent zoom if needed
            if (e.target.closest('.menu-nav-btn')) {
                e.preventDefault();
            }
        });
    });
    
    // ==================== LAZY LOAD IMAGES ====================
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // ==================== FIX TOUCH ISSUES ON MOBILE ====================
    if ('ontouchstart' in window) {
        document.body.style.cursor = 'pointer';
    }
    
    console.log('Seb\'s Garden - Site chargé avec succès');
});

// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== MOBILE MENU ====================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // ==================== MENU NAVIGATION ====================
    const menuNavBtns = document.querySelectorAll('.menu-nav-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    
    if (menuNavBtns.length > 0) {
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
    // Trouver tous les model-viewer et les désactiver initialement
    const modelViewers = document.querySelectorAll('model-viewer');
    
    modelViewers.forEach(viewer => {
        // Stocker l'URL originale dans data-src si elle est dans src
        const src = viewer.getAttribute('src');
        if (src && !viewer.getAttribute('data-src')) {
            viewer.setAttribute('data-src', src);
            viewer.removeAttribute('src');
        }
        // S'assurer que le viewer n'a pas de src
        if (viewer.getAttribute('src')) {
            viewer.removeAttribute('src');
        }
    });
    
    // Gérer les boutons "Voir le plat"
    const loadButtons = document.querySelectorAll('.load-3d-btn');
    
    loadButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Vérifier si déjà chargé
            if (this.classList.contains('loaded')) {
                return;
            }
            
            // Trouver le model-viewer parent
            const parent = this.closest('.menu-item-3d');
            const viewer = parent ? parent.querySelector('model-viewer') : null;
            
            if (viewer) {
                const dataSrc = viewer.getAttribute('data-src');
                if (dataSrc && !viewer.getAttribute('src')) {
                    // Charger le modèle
                    viewer.setAttribute('src', dataSrc);
                    // Marquer le bouton comme chargé
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
            
            const name = document.getElementById('name')?.value;
            const email = document.getElementById('email')?.value;
            const message = document.getElementById('message')?.value;
            
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
            if (href !== '#' && href !== '' && href !== '/') {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // ==================== SCROLL ANIMATION ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card, .menu-item, .testimonial-card, .info-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
    
    // ==================== NAVBAR SCROLL EFFECT ====================
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            }
        }
    });
    

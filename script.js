// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    
    // ==================== MOBILE MENU ====================
    var hamburger = document.querySelector('.hamburger');
    var navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            } else {
                navMenu.classList.add('active');
            }
        });
        
        // Close menu when clicking on links
        var navLinks = document.querySelectorAll('.nav-menu a');
        for (var i = 0; i < navLinks.length; i++) {
            navLinks[i].addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        }
    }
    
    // ==================== MENU NAVIGATION ====================
    var menuNavBtns = document.querySelectorAll('.menu-nav-btn');
    var menuSections = document.querySelectorAll('.menu-section');
    
    if (menuNavBtns.length > 0 && menuSections.length > 0) {
        for (var i = 0; i < menuNavBtns.length; i++) {
            menuNavBtns[i].addEventListener('click', function(e) {
                var sectionId = this.getAttribute('data-section');
                
                // Update active button
                for (var j = 0; j < menuNavBtns.length; j++) {
                    menuNavBtns[j].classList.remove('active');
                }
                this.classList.add('active');
                
                // Show active section
                for (var k = 0; k < menuSections.length; k++) {
                    menuSections[k].classList.remove('active');
                    if (menuSections[k].id === sectionId) {
                        menuSections[k].classList.add('active');
                    }
                }
            });
        }
    }
    
    // ==================== 3D MODEL LOADING ====================
    var loadButtons = document.querySelectorAll('.load-3d-btn');
    
    for (var i = 0; i < loadButtons.length; i++) {
        loadButtons[i].addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if already loaded
            if (this.classList.contains('loaded')) {
                return;
            }
            
            var modelUrl = this.getAttribute('data-model');
            var targetId = this.getAttribute('data-target');
            var placeholder = document.getElementById(targetId);
            
            if (!modelUrl || !placeholder) {
                return;
            }
            
            // Show loading state
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Chargement...';
            this.classList.add('loading');
            
            // Clear placeholder
            placeholder.innerHTML = '';
            
            // Create model viewer
            var modelViewer = document.createElement('model-viewer');
            modelViewer.setAttribute('src', modelUrl);
            modelViewer.setAttribute('alt', 'Plat 3D');
            modelViewer.setAttribute('camera-controls', '');
            modelViewer.setAttribute('environment-image', 'neutral');
            modelViewer.setAttribute('style', 'width:100%; height:140px; border-radius:12px; background:#E8F0F5;');
            
            placeholder.appendChild(modelViewer);
            
            // Update button
            this.innerHTML = '<i class="fas fa-check"></i> Plat chargé 🍽️';
            this.classList.add('loaded');
            this.classList.remove('loading');
        });
    }
    
    // ==================== CONTACT FORM ====================
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var name = document.getElementById('name');
            var email = document.getElementById('email');
            var message = document.getElementById('message');
            
            if (name && email && message) {
                if (name.value.trim() && email.value.trim() && message.value.trim()) {
                    alert('Merci ' + name.value.trim() + ' ! Votre message a été envoyé avec succès.');
                    contactForm.reset();
                } else {
                    alert('Veuillez remplir tous les champs obligatoires.');
                }
            }
        });
    }
    
    // ==================== SMOOTH SCROLL ====================
    var allLinks = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < allLinks.length; i++) {
        allLinks[i].addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href && href !== '#' && href !== '') {
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    var offset = 70;
                    var elementPosition = target.getBoundingClientRect().top;
                    var offsetPosition = elementPosition + window.pageYOffset - offset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
    
    // ==================== SCROLL ANIMATION ====================
    var animatedElements = document.querySelectorAll('.feature-card, .menu-item, .testimonial-card, .info-card');
    
    function checkVisibility() {
        for (var i = 0; i < animatedElements.length; i++) {
            var el = animatedElements[i];
            var rect = el.getBoundingClientRect();
            var windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight - 100) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        }
    }
    
    // Set initial styles
    for (var i = 0; i < animatedElements.length; i++) {
        animatedElements[i].style.opacity = '0';
        animatedElements[i].style.transform = 'translateY(15px)';
        animatedElements[i].style.transition = 'opacity 0.3s, transform 0.3s';
    }
    
    // Check on scroll
    window.addEventListener('scroll', checkVisibility);
    window.addEventListener('resize', checkVisibility);
    checkVisibility();
    
    // ==================== NAVBAR SCROLL EFFECT ====================
    var navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
            }
        }
    });
    
    // ==================== CREATE PLACEHOLDER IMAGES ====================
    var placeholders = document.querySelectorAll('.model-placeholder');
    for (var i = 0; i < placeholders.length; i++) {
        var placeholder = placeholders[i];
        if (!placeholder.querySelector('img') && !placeholder.querySelector('model-viewer')) {
            var img = document.createElement('img');
            img.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 200 150\'%3E%3Crect width=\'200\' height=\'150\' fill=\'%23E8F0F5\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\' fill=\'%23C9A03D\' font-size=\'14\'%3E🍽️%3C/text%3E%3C/svg%3E';
            img.style.width = '100%';
            img.style.height = '140px';
            img.style.objectFit = 'cover';
            img.style.borderRadius = '12px';
            placeholder.appendChild(img);
        }
    }
    
    console.log('Site chargé');
});

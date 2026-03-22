// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Menu Navigation - Section Switching
const menuNavBtns = document.querySelectorAll('.menu-nav-btn');
const menuSections = document.querySelectorAll('.menu-section');

if (menuNavBtns.length > 0) {
    menuNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionId = btn.getAttribute('data-section');
            
            menuNavBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            menuSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === sectionId) {
                    section.classList.add('active');
                }
            });
        });
    });
}

// 3D Model Lazy Loading - Load only when "Voir le plat" button is clicked
document.addEventListener('DOMContentLoaded', () => {
    const modelViewers = document.querySelectorAll('model-viewer');
    
    // Initially hide all model-viewers and store their src
    modelViewers.forEach(viewer => {
        const originalSrc = viewer.getAttribute('src');
        if (originalSrc) {
            viewer.setAttribute('data-src', originalSrc);
            viewer.removeAttribute('src');
            viewer.classList.remove('loaded');
        }
    });
    
    // Handle load buttons
    const loadButtons = document.querySelectorAll('.load-3d-btn');
    loadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Check if already loaded
            if (button.classList.contains('loaded')) {
                return;
            }
            
            const parent = button.closest('.menu-item-3d');
            const viewer = parent ? parent.querySelector('model-viewer') : null;
            
            if (viewer) {
                const dataSrc = viewer.getAttribute('data-src');
                if (dataSrc && !viewer.getAttribute('src')) {
                    viewer.setAttribute('src', dataSrc);
                    viewer.classList.add('loaded');
                    button.innerHTML = '<i class="fas fa-check"></i> Plat chargé 🍽️';
                    button.classList.add('loaded');
                }
            }
        });
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
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

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Fix for dashboard buttons in index
document.querySelectorAll('.btn, .hero-buttons a, .cta-buttons a').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href !== '#' && !href.startsWith('#')) {
            // Allow normal navigation
            return true;
        }
    });
});

// Scroll Animation for Elements
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

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
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

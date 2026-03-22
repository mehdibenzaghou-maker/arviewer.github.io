// Menu mobile toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Menu Page Logic - Section Navigation
const sectionBtns = document.querySelectorAll('.section-btn');
const menuSections = document.querySelectorAll('.menu-section');

if (sectionBtns.length > 0) {
    sectionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const sectionId = btn.getAttribute('data-section');
            
            // Update active button
            sectionBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
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

// Model Viewer Lazy Loading - Load 3D models only when "Montrez le plat" button is clicked
document.addEventListener('DOMContentLoaded', () => {
    const modelViewers = document.querySelectorAll('model-viewer');
    
    // Initially, set all model-viewers to not load automatically
    modelViewers.forEach(viewer => {
        // Store original src
        const originalSrc = viewer.getAttribute('src');
        if (originalSrc) {
            viewer.setAttribute('data-original-src', originalSrc);
            viewer.removeAttribute('src');
            viewer.style.opacity = '0.5';
            viewer.style.background = '#EFF7FF';
        }
    });
    
    // Find all AR buttons and replace with custom load buttons
    const arButtons = document.querySelectorAll('.ar-button');
    arButtons.forEach(button => {
        const parentModel = button.closest('.dish-model');
        if (parentModel) {
            const viewer = parentModel.querySelector('model-viewer');
            if (viewer) {
                // Change button text and functionality
                button.textContent = '🍽️ Montrez le plat';
                button.classList.add('load-model-btn');
                button.removeAttribute('rel');
                button.href = 'javascript:void(0)';
                
                // Add click event to load model
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const originalSrc = viewer.getAttribute('data-original-src');
                    if (originalSrc && !viewer.getAttribute('src')) {
                        viewer.setAttribute('src', originalSrc);
                        viewer.style.opacity = '1';
                        button.textContent = '✓ Plat chargé 🍽️';
                        button.style.background = '#2C6E9E';
                        button.disabled = true;
                    }
                });
            }
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simple form validation and feedback
        const name = document.getElementById('name')?.value;
        const email = document.getElementById('email')?.value;
        const message = document.getElementById('message')?.value;
        
        if (name && email && message) {
            alert(`Merci ${name} ! Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.`);
            contactForm.reset();
        } else {
            alert('Veuillez remplir tous les champs obligatoires.');
        }
    });
}

// Smooth scroll for anchor links
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

// Add scroll animation for elements
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

document.querySelectorAll('.feature-card, .dish-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease';
    observer.observe(el);
});

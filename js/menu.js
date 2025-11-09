// Menu section navigation
document.addEventListener('DOMContentLoaded', function() {
    const sectionButtons = document.querySelectorAll('.section-btn');
    const menuSections = document.querySelectorAll('.menu-section');

    sectionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSection = this.getAttribute('data-section');
            
            // Update active button
            sectionButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show target section
            menuSections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetSection) {
                    section.classList.add('active');
                }
            });
        });
    });

    // Hamburger menu for mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
});
// Model Viewer Debug (add this to existing menu.js)
console.log('🔄 Checking Google Model Viewer...');

if (customElements && customElements.get('model-viewer')) {
    console.log('✅ Google Model Viewer is loaded and working!');
} else {
    console.log('❌ Google Model Viewer FAILED to load');
    
    // Try to load it manually
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    document.head.appendChild(script);
    console.log('🔄 Attempting to load Model Viewer manually...');
}

// Check model viewers after page loads
setTimeout(() => {
    const modelViewers = document.querySelectorAll('model-viewer');
    console.log('📊 Model viewers found:', modelViewers.length);
    
    modelViewers.forEach((viewer, index) => {
        viewer.addEventListener('error', (e) => {
            console.error(`❌ Model Viewer ${index + 1} ERROR:`, e);
        });
        
        viewer.addEventListener('load', () => {
            console.log(`✅ Model Viewer ${index + 1} loaded successfully`);
        });
    });
}, 1000);

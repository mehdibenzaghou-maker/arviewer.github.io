// Contact form handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }
            
            // Here you would typically send the form data to your backend
            // For now, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
        
        // Show/hide reservation fields based on subject
        const subjectSelect = document.getElementById('subject');
        const reservationFields = ['date', 'time', 'guests'];
        
        function toggleReservationFields() {
            const isReservation = subjectSelect.value === 'reservation';
            
            reservationFields.forEach(field => {
                const element = document.getElementById(field);
                const label = element.previousElementSibling;
                
                if (isReservation) {
                    element.style.display = 'block';
                    label.style.display = 'block';
                    element.required = true;
                } else {
                    element.style.display = 'none';
                    label.style.display = 'none';
                    element.required = false;
                }
            });
        }
        
        subjectSelect.addEventListener('change', toggleReservationFields);
        toggleReservationFields(); // Initial call
    }
});

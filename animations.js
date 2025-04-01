// Animation initialization for UVP Foundation website

// Function to handle scroll animations
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.dataset.animation) {
                    entry.target.classList.add(entry.target.dataset.animation);
                }
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Function for handling typed text animations
function initTypeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Function to initialize all animations
function initAnimations() {
    // Initialize scroll animations
    handleScrollAnimations();
    
    // Add hover effect to buttons
    const buttons = document.querySelectorAll('.read-more-btn, .register-btn, button');
    buttons.forEach(button => {
        if (!button.classList.contains('btn-hover-effect')) {
            button.classList.add('btn-hover-effect');
        }
    });
    
    // Initialize any specific animations for the current page
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        // Homepage specific animations
        const headerText = document.getElementById('intro-typing-text');
        if (headerText && !headerText.dataset.initialized) {
            // Use the existing typing logic from the page if available
            headerText.dataset.initialized = 'true';
        }
    }
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initAnimations);

// Re-initialize animations when window is resized
window.addEventListener('resize', handleScrollAnimations); 
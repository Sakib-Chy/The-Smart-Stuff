document.addEventListener("DOMContentLoaded", function() {
    const elements = document.querySelectorAll('.section, .cta-button');

    elements.forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(50px)';
    });

    window.addEventListener('scroll', function() {
        elements.forEach(element => {
            const position = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (position < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
                element.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
            }
        });
    });
});

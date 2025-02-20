document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        section.style.opacity = 0;
        section.style.transform = 'translateY(50px)';
    });

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            const sectionPosition = section.offsetTop;
            const windowHeight = window.innerHeight;

            if (scrollPosition + windowHeight > sectionPosition + 100) {
                section.style.transition = 'opacity 0.5s, transform 0.5s';
                section.style.opacity = 1;
                section.style.transform = 'translateY(0)';
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;

        sections.forEach(section => {
            const sectionPosition = section.offsetTop;

            if (scrollPosition + windowHeight > sectionPosition + 100) {
                section.style.opacity = 1;
                section.style.transform = 'translateY(0)';
            }
        });
    });
});

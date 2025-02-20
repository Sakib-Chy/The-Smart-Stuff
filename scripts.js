document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM fully loaded and parsed");
    
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        console.log("Initial opacity and transform applied to section: ", section.id);
        section.style.opacity = 0;
        section.style.transform = 'translateY(50px)';
    });

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        const windowHeight = window.innerHeight;
        console.log("Scroll position:", scrollPosition);

        sections.forEach(section => {
            const sectionPosition = section.offsetTop;
            console.log("Section position for", section.id, ":", sectionPosition);

            if (scrollPosition + windowHeight > sectionPosition + 100) {
                console.log("Animating section:", section.id);
                section.style.opacity = 1;
                section.style.transform = 'translateY(0)';
            }
        });
    });
});

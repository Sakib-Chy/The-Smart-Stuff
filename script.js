// Highlight active link based on scroll position
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').includes(current)) {
      link.classList.add('active');
    }
  });
});
// Enable smooth scrolling and section locking
let isScrolling = false;

window.addEventListener("scroll", () => {
  if (isScrolling) return; // Prevent multiple scroll triggers

  const sections = document.querySelectorAll("section");
  let currentSection = null;

  // Find the section closest to the top of the viewport
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      currentSection = section;
    }
  });

  // Snap to the current section
  if (currentSection) {
    isScrolling = true;
    window.scrollTo({
      top: currentSection.offsetTop,
      behavior: "smooth",
    });

    // Reset the scrolling flag after the scroll animation completes
    setTimeout(() => {
      isScrolling = false;
    }, 500); // Adjust timeout to match scroll duration
  }
});

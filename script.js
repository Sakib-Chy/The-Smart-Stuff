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
// Enable soft scroll lock (snap at 90% of section height)
let isScrolling = false;

window.addEventListener("scroll", () => {
  if (isScrolling) return; // Prevent multiple scroll triggers

  const sections = document.querySelectorAll("section");
  let currentSection = null;

  // Find the section closest to the top of the viewport
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const scrollPosition = window.scrollY + window.innerHeight * 0.9; // 90% threshold

    if (scrollPosition >= sectionTop + sectionHeight) {
      currentSection = section.nextElementSibling; // Snap to the next section
    }
  });

  // Snap to the next section if the threshold is reached
  if (currentSection && currentSection.tagName === "SECTION") {
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

// Handle navbar clicks to directly scroll to the desired section
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    const targetId = link.getAttribute("href"); // Get the target section ID
    const targetSection = document.querySelector(targetId); // Find the target section

    if (targetSection) {
      isScrolling = true; // Set the scrolling flag to prevent conflicts
      window.scrollTo({
        top: targetSection.offsetTop,
        behavior: "smooth",
      });

      // Reset the scrolling flag after the scroll animation completes
      setTimeout(() => {
        isScrolling = false;
      }, 500); // Adjust timeout to match scroll duration
    }
  });
});

// Toggle between Login and Register forms
const toggleFormButton = document.getElementById("toggle-form");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const formTitle = document.getElementById("form-title");

toggleFormButton.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default link behavior

  if (loginForm.classList.contains("active-form")) {
    // Switch to Register Form
    loginForm.classList.remove("active-form");
    loginForm.classList.add("hidden-form");
    registerForm.classList.remove("hidden-form");
    registerForm.classList.add("active-form");
    formTitle.textContent = "Register";
    toggleFormButton.textContent = "Login";
  } else {
    // Switch to Login Form
    registerForm.classList.remove("active-form");
    registerForm.classList.add("hidden-form");
    loginForm.classList.remove("hidden-form");
    loginForm.classList.add("active-form");
    formTitle.textContent = "Login";
    toggleFormButton.textContent = "Register";
  }
});

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
// Track scrolling state
let isScrolling = false;
let lastScrollTime = 0;
const scrollCooldown = 800; // Cooldown period in milliseconds

// Update active navigation link based on scroll position
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');
  
  let currentSectionId = '';
  const scrollPosition = window.scrollY + (window.innerHeight / 3);

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      currentSectionId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === currentSectionId) {
      link.classList.add('active');
    }
  });
}

// Smooth scroll to section
function smoothScrollToSection(targetPosition) {
  isScrolling = true;
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
  
  // Reset scrolling state after animation
  setTimeout(() => {
    isScrolling = false;
  }, scrollCooldown);
}

// Handle scroll events
window.addEventListener('scroll', () => {
  if (isScrolling) return;
  
  const currentTime = Date.now();
  if (currentTime - lastScrollTime < scrollCooldown) return;
  
  lastScrollTime = currentTime;
  updateActiveNavLink();
});

// Handle navbar clicks
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (isScrolling) return;
    
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      const targetPosition = targetSection.offsetTop - 60; // Adjust for navbar height
      smoothScrollToSection(targetPosition);
    }
  });
});

// Handle initial page load
window.addEventListener('load', () => {
  // Check if URL has a hash and scroll to that section
  if (window.location.hash) {
    const targetSection = document.querySelector(window.location.hash);
    if (targetSection) {
      setTimeout(() => {
        const targetPosition = targetSection.offsetTop - 60;
        window.scrollTo(0, targetPosition);
      }, 100);
    }
  }
  
  updateActiveNavLink();
});

// Optional: Update active link on window resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(updateActiveNavLink, 100);
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
const toggleToRegister = document.getElementById("toggle-to-register");
const toggleToLogin = document.getElementById("toggle-to-login");
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const formTitle = document.getElementById("form-title");

// Function to switch to the Register form
toggleToRegister.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default link behavior
  loginForm.classList.remove("active-form");
  loginForm.classList.add("hidden-form");
  registerForm.classList.remove("hidden-form");
  registerForm.classList.add("active-form");
  formTitle.textContent = "Register";
});

// Function to switch to the Login form
toggleToLogin.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default link behavior
  registerForm.classList.remove("active-form");
  registerForm.classList.add("hidden-form");
  loginForm.classList.remove("hidden-form");
  loginForm.classList.add("active-form");
  formTitle.textContent = "Login";
});

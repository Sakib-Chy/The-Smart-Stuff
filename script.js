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
// Define scroll variables
let isScrolling = false;
let lastScrollTime = 0;
let currentSectionIndex = 0;
const scrollCooldown = 1000; // Longer cooldown for smoother transitions
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav a');

// Get the nearest section index based on scroll position
function getNearestSectionIndex() {
  const viewportMiddle = window.scrollY + (window.innerHeight / 2);
  let nearestIndex = 0;
  let minDistance = Infinity;

  sections.forEach((section, index) => {
    const sectionMiddle = section.offsetTop + (section.offsetHeight / 2);
    const distance = Math.abs(viewportMiddle - sectionMiddle);
    
    if (distance < minDistance) {
      minDistance = distance;
      nearestIndex = index;
    }
  });

  return nearestIndex;
}

// Smooth scroll to a specific section
function scrollToSection(index) {
  if (isScrolling) return;
  
  isScrolling = true;
  currentSectionIndex = index;
  
  const targetPosition = sections[index].offsetTop - 60; // Adjust for navbar
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });

  // Update active nav link
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${sections[index].id}`) {
      link.classList.add('active');
    }
  });

  // Reset scroll state after animation
  setTimeout(() => {
    isScrolling = false;
  }, scrollCooldown);
}

// Handle mouse wheel events
function handleWheel(event) {
  if (isScrolling) {
    event.preventDefault();
    return;
  }

  const currentTime = Date.now();
  if (currentTime - lastScrollTime < scrollCooldown) {
    event.preventDefault();
    return;
  }

  lastScrollTime = currentTime;
  
  // Determine scroll direction
  const direction = event.deltaY > 0 ? 1 : -1;
  const nearestIndex = getNearestSectionIndex();
  const targetIndex = Math.max(0, Math.min(sections.length - 1, nearestIndex + direction));

  if (nearestIndex !== targetIndex) {
    event.preventDefault();
    scrollToSection(targetIndex);
  }
}

// Handle keyboard navigation
function handleKeydown(event) {
  if (isScrolling) return;

  const currentTime = Date.now();
  if (currentTime - lastScrollTime < scrollCooldown) return;

  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    const direction = event.key === 'ArrowDown' ? 1 : -1;
    const targetIndex = Math.max(0, Math.min(sections.length - 1, currentSectionIndex + direction));
    scrollToSection(targetIndex);
  }
}

// Handle navbar clicks
function handleNavClick(event) {
  event.preventDefault();
  if (isScrolling) return;

  const targetId = event.currentTarget.getAttribute('href');
  const targetSection = document.querySelector(targetId);
  const targetIndex = Array.from(sections).indexOf(targetSection);

  if (targetIndex !== -1) {
    scrollToSection(targetIndex);
  }
}

// Initialize scroll handling
function initScrollHandling() {
  // Add event listeners
  window.addEventListener('wheel', handleWheel, { passive: false });
  window.addEventListener('keydown', handleKeydown);
  navLinks.forEach(link => link.addEventListener('click', handleNavClick));

  // Handle initial page load
  if (window.location.hash) {
    const targetSection = document.querySelector(window.location.hash);
    if (targetSection) {
      const targetIndex = Array.from(sections).indexOf(targetSection);
      setTimeout(() => scrollToSection(targetIndex), 100);
    }
  }

  // Set initial section index
  currentSectionIndex = getNearestSectionIndex();
}

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    scrollToSection(currentSectionIndex);
  }, 100);
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initScrollHandling);


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

// Create Intersection Observer for animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3 // Trigger when 30% of element is visible
};

// Callback function when element becomes visible
const animateOnScroll = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-up');
      observer.unobserve(entry.target); // Stop observing once animated
    }
  });
};

// Create the observer
const observer = new IntersectionObserver(animateOnScroll, observerOptions);

// Function to initialize animations
function initScrollAnimations() {
  // Get About section elements
  const aboutSection = document.querySelector('.about-us');
  const aboutTitle = aboutSection.querySelector('h2');
  const aboutText = aboutSection.querySelector('p');

  // Add initial class
  aboutTitle.classList.add('animate-on-scroll');
  aboutText.classList.add('animate-on-scroll');

  // Start observing elements
  observer.observe(aboutTitle);
  observer.observe(aboutText);
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initScrollAnimations);

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

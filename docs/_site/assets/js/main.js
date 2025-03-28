document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const navTrigger = document.querySelector('.nav-trigger');
  const menuIcon = document.querySelector('.menu-icon');
  
  if (menuIcon && navTrigger) {
    menuIcon.addEventListener('click', function() {
      navTrigger.checked = !navTrigger.checked;
    });
  }
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Add animation classes on scroll
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  if (animateElements.length > 0) {
    const checkIfInView = () => {
      const windowHeight = window.innerHeight;
      const windowTopPosition = window.scrollY;
      const windowBottomPosition = windowTopPosition + windowHeight;
      
      animateElements.forEach(element => {
        const elementHeight = element.offsetHeight;
        const elementTopPosition = element.offsetTop;
        const elementBottomPosition = elementTopPosition + elementHeight;
        
        // Check if element is in viewport
        if (
          (elementBottomPosition >= windowTopPosition) &&
          (elementTopPosition <= windowBottomPosition)
        ) {
          element.classList.add('fade-in');
        }
      });
    };
    
    window.addEventListener('scroll', checkIfInView);
    window.addEventListener('resize', checkIfInView);
    
    // Initial check
    checkIfInView();
  }
  
  // Language selector enhancement
  const languageSelector = document.querySelector('.language-selector');
  
  if (languageSelector) {
    const currentLang = languageSelector.querySelector('.current-lang');
    const dropdown = languageSelector.querySelector('.language-dropdown');
    
    // Touch devices support
    if (currentLang) {
      currentLang.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (dropdown) {
          dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
        }
      });
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!languageSelector.contains(e.target)) {
        if (dropdown) {
          dropdown.style.display = 'none';
        }
      }
    });
  }
});

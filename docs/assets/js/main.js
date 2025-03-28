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
  
  // AI Sidebar functionality
  const aiSidebar = document.querySelector('.ai-sidebar');
  const aiToggleButtons = document.querySelectorAll('.toggle-ai-sidebar');
  
  if (aiSidebar && aiToggleButtons.length > 0) {
    // Add a floating AI toggle button to mobile view
    const floatingButton = document.createElement('button');
    floatingButton.className = 'ai-toggle-button';
    floatingButton.innerHTML = '<i class="fas fa-robot"></i>';
    document.body.appendChild(floatingButton);
    
    // Add toggle functionality to all buttons
    [...aiToggleButtons, floatingButton].forEach(button => {
      button.addEventListener('click', function() {
        aiSidebar.classList.toggle('active');
      });
    });
    
    // Send message functionality
    const userInput = document.getElementById('ai-user-input');
    const sendButton = document.getElementById('ai-send-button');
    const messagesContainer = document.getElementById('ai-messages');
    
    if (userInput && sendButton && messagesContainer) {
      sendButton.addEventListener('click', function() {
        const message = userInput.value.trim();
        if (message) {
          // Add user message
          const userMessageEl = document.createElement('div');
          userMessageEl.className = 'ai-message user-message';
          userMessageEl.innerHTML = `<p>${message}</p>`;
          messagesContainer.appendChild(userMessageEl);
          
          // Clear input
          userInput.value = '';
          
          // Scroll to bottom
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
          
          // Simulate AI response (placeholder)
          setTimeout(() => {
            const aiMessageEl = document.createElement('div');
            aiMessageEl.className = 'ai-message';
            
            // Choose a generic response based on the current language
            const lang = document.documentElement.lang || 'en';
            let responseText = 'This is a placeholder for the AI assistant response. In a real implementation, this would connect to an AI service.';
            
            if (lang === 'it') {
              responseText = 'Questo è un segnaposto per la risposta dell\'assistente AI. In un\'implementazione reale, questo si collegherebbe a un servizio AI.';
            }
            
            aiMessageEl.innerHTML = `<p>${responseText}</p>`;
            messagesContainer.appendChild(aiMessageEl);
            
            // Scroll to bottom again
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
          }, 1000);
        }
      });
      
      // Allow Enter key to send message
      userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendButton.click();
        }
      });
    }
  }
  
  // Search functionality
  const searchToggle = document.getElementById('search-toggle');
  const searchContainer = document.getElementById('search-container');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchResultsList = document.querySelector('.search-results-list');
  const searchResultsMessage = document.querySelector('.search-results-message');
  
  if (searchToggle && searchContainer && searchClose) {
    searchToggle.addEventListener('click', function() {
      searchContainer.classList.add('active');
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 100);
      }
    });
    
    searchClose.addEventListener('click', function() {
      searchContainer.classList.remove('active');
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && searchContainer.classList.contains('active')) {
        searchContainer.classList.remove('active');
      }
    });
    
    // Simple search functionality (placeholder)
    if (searchInput && searchResults && searchResultsList && searchResultsMessage) {
      searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        
        if (query.length > 2) {
          // Hide message, show placeholder results
          searchResultsMessage.style.display = 'none';
          searchResultsList.style.display = 'block';
          
          // In a real implementation, this would filter actual search results
          // This is just a placeholder to show the UI behavior
        } else {
          // Show message, hide results
          searchResultsMessage.style.display = 'block';
          searchResultsList.style.display = 'none';
        }
      });
    }
  }
  
  // Comment form functionality (placeholder)
  const commentForm = document.getElementById('comment-form');
  
  if (commentForm) {
    commentForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nameInput = this.querySelector('#comment-name');
      const emailInput = this.querySelector('#comment-email');
      const commentText = this.querySelector('#comment-text');
      
      if (nameInput && emailInput && commentText) {
        // Show a confirmation message
        const lang = document.documentElement.lang || 'en';
        let message = 'Comment submitted! (This is a placeholder - in a real implementation, this would save to a database)';
        
        if (lang === 'it') {
          message = 'Commento inviato! (Questo è un segnaposto - in un\'implementazione reale, questo verrebbe salvato in un database)';
        }
        
        alert(message);
        
        // Reset the form
        commentForm.reset();
      }
    });
  }
});

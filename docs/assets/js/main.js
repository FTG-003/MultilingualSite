document.addEventListener('DOMContentLoaded', function() {
  // Mobile navigation toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navigation = document.querySelector('.site-navigation');
  
  if (mobileMenuToggle && navigation) {
    mobileMenuToggle.addEventListener('click', function() {
      navigation.classList.toggle('active');
      this.classList.toggle('active');
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
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Language selector
  const languageSelector = document.querySelector('.language-selector');
  
  if (languageSelector) {
    const currentLang = languageSelector.querySelector('.current-lang');
    const dropdown = languageSelector.querySelector('.language-dropdown');
    
    if (currentLang && dropdown) {
      currentLang.addEventListener('click', function(e) {
        e.preventDefault();
        dropdown.classList.toggle('active');
      });
      
      // Close when clicking outside
      document.addEventListener('click', function(e) {
        if (!languageSelector.contains(e.target)) {
          dropdown.classList.remove('active');
        }
      });
    }
  }
  
  // AI Sidebar functionality
  const aiToggle = document.getElementById('ai-toggle');
  const aiSidebar = document.querySelector('.ai-sidebar');
  const aiClose = document.getElementById('ai-close');
  
  if (aiToggle && aiSidebar) {
    aiToggle.addEventListener('click', function() {
      aiSidebar.classList.toggle('active');
      this.classList.toggle('active');
    });
  }
  
  if (aiClose && aiSidebar) {
    aiClose.addEventListener('click', function() {
      aiSidebar.classList.remove('active');
      if (aiToggle) aiToggle.classList.remove('active');
    });
  }
  
  // AI Chat functionality
  const aiSend = document.getElementById('ai-send');
  const aiUserInput = document.getElementById('ai-user-input');
  const aiMessages = document.getElementById('ai-messages');
  
  if (aiSend && aiUserInput && aiMessages) {
    // Send message function
    function sendAiMessage() {
      const message = aiUserInput.value.trim();
      if (!message) return;
      
      // Add user message
      const userMessage = document.createElement('div');
      userMessage.className = 'message user-message';
      userMessage.innerHTML = `<p>${message}</p>`;
      aiMessages.appendChild(userMessage);
      
      // Clear input and scroll
      aiUserInput.value = '';
      aiMessages.scrollTop = aiMessages.scrollHeight;
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = "This is a simulated AI response. In a real implementation, this would connect to an AI service that provides meaningful answers about peeragogy concepts.";
        const aiMessage = document.createElement('div');
        aiMessage.className = 'message ai-message';
        aiMessage.innerHTML = `<p>${aiResponse}</p>`;
        aiMessages.appendChild(aiMessage);
        aiMessages.scrollTop = aiMessages.scrollHeight;
      }, 800);
    }
    
    // Send button click
    aiSend.addEventListener('click', sendAiMessage);
    
    // Enter key
    aiUserInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendAiMessage();
      }
    });
  }
  
  // Search functionality
  const searchToggle = document.getElementById('search-toggle');
  const searchContainer = document.getElementById('search-container');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');
  
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
  }
  
  // Back to top button
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

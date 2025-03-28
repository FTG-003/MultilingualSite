/**
 * PeerGang - Main JavaScript
 * Core functionality for the PeerGang website
 */

document.addEventListener('DOMContentLoaded', function() {
  initTheme();
  initMobileMenu();
  initLanguageSelector();
  initSearch();
  initAIAssistant();
  initSmoothScroll();
  initCommentForm();
});

/**
 * Initialize theme (dark/light mode)
 */
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme preference or use OS preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
    document.body.classList.add('dark-theme');
  }
  
  // Toggle theme when button is clicked
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-theme');
      const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
    });
  }
  
  // Update theme if OS preference changes
  prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    }
  });
}

/**
 * Initialize mobile menu
 */
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', () => {
      mainNav.classList.toggle('active');
      mobileMenuToggle.setAttribute(
        'aria-expanded',
        mainNav.classList.contains('active')
      );
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        !e.target.closest('.main-nav') &&
        !e.target.closest('.mobile-menu-toggle') &&
        mainNav.classList.contains('active')
      ) {
        mainNav.classList.remove('active');
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}

/**
 * Initialize language selector
 */
function initLanguageSelector() {
  const languageOptions = document.querySelectorAll('.language-option');
  const currentLanguage = document.querySelector('.current-language');
  
  if (languageOptions.length && currentLanguage) {
    languageOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all options
        languageOptions.forEach(opt => opt.classList.remove('active'));
        
        // Add active class to clicked option
        option.classList.add('active');
        
        // Update current language display
        currentLanguage.textContent = option.textContent;
        
        // Here you would handle actual language change
        // For now, just store the preference
        const lang = option.getAttribute('data-lang');
        localStorage.setItem('language', lang);
        
        // Close dropdown (if using JS for this)
        const dropdown = document.querySelector('.language-dropdown');
        if (dropdown) {
          dropdown.style.display = 'none';
          setTimeout(() => {
            dropdown.style.display = '';
          }, 100);
        }
      });
    });
  }
}

/**
 * Initialize search functionality
 */
function initSearch() {
  const searchToggle = document.getElementById('search-toggle');
  const searchOverlay = document.getElementById('search-overlay');
  const searchClose = document.getElementById('search-close');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchTabs = document.querySelectorAll('.search-tab');
  
  if (searchToggle && searchOverlay) {
    // Open search
    searchToggle.addEventListener('click', () => {
      searchOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (searchInput) {
        setTimeout(() => searchInput.focus(), 100);
      }
    });
    
    // Close search
    if (searchClose) {
      searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
    
    // Close search with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // Handle search input
    if (searchInput && searchResults) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        
        // Clear results if query is empty
        if (!query) {
          searchResults.innerHTML = `
            <div class="search-empty">
              <p>Start typing to search</p>
            </div>
          `;
          return;
        }
        
        // Simulate search results for now
        simulateSearchResults(query);
      });
    }
    
    // Handle search tabs
    if (searchTabs.length) {
      searchTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          searchTabs.forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          
          // Rerun search with current filter
          if (searchInput && searchInput.value.trim()) {
            simulateSearchResults(searchInput.value.trim());
          }
        });
      });
    }
  }
  
  // For demo purposes only - in production, replace with actual search
  function simulateSearchResults(query) {
    const activeTab = document.querySelector('.search-tab.active');
    const filter = activeTab ? activeTab.getAttribute('data-tab') : 'all';
    
    // Simulate loading state
    searchResults.innerHTML = `
      <div class="search-loading">
        <p>Searching...</p>
      </div>
    `;
    
    // Simulate network delay
    setTimeout(() => {
      // Demo results - replace with actual search logic
      const results = [
        {
          type: 'chapter',
          title: 'Peeragogy in a Nutshell',
          url: '/chapters/en/peeragogy-in-a-nutshell.html',
          excerpt: 'An overview of the core concepts and principles of peeragogy...'
        },
        {
          type: 'pattern',
          title: 'Heartbeat Pattern',
          url: '/patterns/heartbeat.html',
          excerpt: 'Maintaining regular rhythms in peer learning communities...'
        },
        {
          type: 'resource',
          title: 'Collaborative Learning Tools',
          url: '/resources/tools.html',
          excerpt: 'A collection of digital tools that support peer learning...'
        },
        {
          type: 'chapter',
          title: 'Motivation in Peer Learning',
          url: '/chapters/en/motivation.html',
          excerpt: 'Understanding what drives engagement in peer learning environments...'
        }
      ];
      
      // Filter results based on tab
      const filtered = filter === 'all' 
        ? results 
        : results.filter(r => r.type === filter.slice(0, -1)); // Remove 's' from end
      
      // No results
      if (filtered.length === 0) {
        searchResults.innerHTML = `
          <div class="search-empty">
            <p>No results found for "${query}"</p>
          </div>
        `;
        return;
      }
      
      // Render results
      let resultsHTML = '';
      filtered.forEach(result => {
        resultsHTML += `
          <a href="${result.url}" class="search-result">
            <div class="search-result-type">${result.type}</div>
            <h3 class="search-result-title">${highlightMatch(result.title, query)}</h3>
            <p class="search-result-excerpt">${highlightMatch(result.excerpt, query)}</p>
          </a>
        `;
      });
      
      searchResults.innerHTML = resultsHTML;
    }, 300);
  }
  
  // Helper to highlight matching text
  function highlightMatch(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }
}

/**
 * Initialize AI assistant
 */
function initAIAssistant() {
  const aiToggle = document.getElementById('ai-toggle');
  const aiSidebar = document.getElementById('ai-sidebar');
  const aiClose = document.getElementById('ai-sidebar-close');
  const aiInput = document.getElementById('ai-input');
  const aiSend = document.getElementById('ai-send');
  const aiMessages = document.getElementById('ai-messages');
  const aiTools = document.querySelectorAll('.ai-tool');
  
  if (aiToggle && aiSidebar) {
    // Toggle AI sidebar
    aiToggle.addEventListener('click', () => {
      aiSidebar.classList.toggle('active');
      if (aiSidebar.classList.contains('active') && aiInput) {
        setTimeout(() => aiInput.focus(), 100);
      }
    });
    
    // Close AI sidebar
    if (aiClose) {
      aiClose.addEventListener('click', () => {
        aiSidebar.classList.remove('active');
      });
    }
    
    // Send message
    if (aiInput && aiSend && aiMessages) {
      // Auto resize textarea
      aiInput.addEventListener('input', () => {
        aiInput.style.height = 'auto';
        aiInput.style.height = aiInput.scrollHeight + 'px';
      });
      
      // Handle send on click
      aiSend.addEventListener('click', sendAIMessage);
      
      // Handle send on Enter (but Shift+Enter for new line)
      aiInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendAIMessage();
        }
      });
    }
    
    // Handle AI tools
    if (aiTools.length) {
      aiTools.forEach(tool => {
        tool.addEventListener('click', () => {
          const action = tool.getAttribute('data-action');
          handleAIToolAction(action);
        });
      });
    }
  }
  
  function sendAIMessage() {
    const message = aiInput.value.trim();
    if (!message) return;
    
    // Append user message
    appendAIMessage('user', message);
    
    // Clear input
    aiInput.value = '';
    aiInput.style.height = 'auto';
    
    // Simulate AI response
    simulateAIResponse(message);
  }
  
  function simulateAIResponse(userMessage) {
    // Show typing indicator
    const typingElement = document.createElement('div');
    typingElement.className = 'ai-message ai-message-assistant ai-typing';
    typingElement.innerHTML = `
      <div class="ai-message-avatar">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="16" fill="#4F46E5"/>
          <path d="M16 18.6667C18.9455 18.6667 21.3333 16.2789 21.3333 13.3333C21.3333 10.3878 18.9455 8 16 8C13.0545 8 10.6667 10.3878 10.6667 13.3333C10.6667 16.2789 13.0545 18.6667 16 18.6667Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M10.6667 18.6667C10.6667 22.3486 13.0545 25.3333 16 25.3333C18.9455 25.3333 21.3333 22.3486 21.3333 18.6667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="ai-message-content">
        <div class="ai-typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;
    aiMessages.appendChild(typingElement);
    aiMessages.scrollTop = aiMessages.scrollHeight;
    
    // Simulate delay
    setTimeout(() => {
      // Remove typing indicator
      aiMessages.removeChild(typingElement);
      
      // Generate response based on user message
      let response = "I'd be happy to help you learn more about peeragogy! Could you tell me what specific aspect you're interested in?";
      
      if (userMessage.toLowerCase().includes('pattern')) {
        response = "Peeragogy patterns are reusable solutions to common challenges in peer learning. The core patterns include Wrapper, Heartbeat, Roadmap, Use or Make, Carrying capacity, and several others. Each pattern addresses a specific aspect of creating and maintaining effective peer learning environments. Would you like me to explain any specific pattern in more detail?";
      } else if (userMessage.toLowerCase().includes('ai') || userMessage.toLowerCase().includes('artificial intelligence')) {
        response = "AI can enhance peeragogy in several ways! It can provide personalized support to learners, help discover relevant resources, automate routine tasks, and provide learning analytics. The key is integrating AI thoughtfully to enhance human collaboration rather than replace it. PeerGang aims to demonstrate this balanced approach to AI-enhanced peer learning.";
      } else if (userMessage.toLowerCase().includes('traditional') || userMessage.toLowerCase().includes('pedagogy')) {
        response = "Great question! Traditional pedagogy typically features one-way knowledge flow from teacher to student, hierarchical authority structures, pre-determined curricula, and standardized assessment. Peeragogy, on the other hand, embraces multi-directional knowledge sharing, distributed authority, emergent and co-created curricula, and peer-based formative assessment. It's not about rejecting traditional approaches entirely, but offering a complementary framework better suited to certain learning contexts.";
      }
      
      // Append AI response
      appendAIMessage('assistant', response);
    }, 1500);
  }
  
  function handleAIToolAction(action) {
    let prompt = '';
    
    switch (action) {
      case 'explain':
        prompt = "Could you explain what peeragogy is in simple terms?";
        break;
      case 'summarize':
        prompt = "Could you summarize the key principles of peeragogy?";
        break;
      case 'examples':
        prompt = "Can you give me some examples of successful peeragogy projects?";
        break;
      default:
        return;
    }
    
    // Set the prompt in the input
    if (aiInput) {
      aiInput.value = prompt;
      aiInput.style.height = 'auto';
      aiInput.style.height = aiInput.scrollHeight + 'px';
      aiInput.focus();
    }
  }
  
  function appendAIMessage(sender, text) {
    const messageElement = document.createElement('div');
    messageElement.className = `ai-message ai-message-${sender}`;
    
    if (sender === 'user') {
      messageElement.innerHTML = `
        <div class="ai-message-avatar">
          <img src="/assets/images/avatar-placeholder.svg" alt="User" width="32" height="32">
        </div>
        <div class="ai-message-content">
          <p>${text.replace(/\n/g, '<br>')}</p>
        </div>
      `;
    } else {
      messageElement.innerHTML = `
        <div class="ai-message-avatar">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="16" fill="#4F46E5"/>
            <path d="M16 18.6667C18.9455 18.6667 21.3333 16.2789 21.3333 13.3333C21.3333 10.3878 18.9455 8 16 8C13.0545 8 10.6667 10.3878 10.6667 13.3333C10.6667 16.2789 13.0545 18.6667 16 18.6667Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.6667 18.6667C10.6667 22.3486 13.0545 25.3333 16 25.3333C18.9455 25.3333 21.3333 22.3486 21.3333 18.6667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="ai-message-content">
          <p>${text.replace(/\n/g, '<br>')}</p>
        </div>
      `;
    }
    
    aiMessages.appendChild(messageElement);
    aiMessages.scrollTop = aiMessages.scrollHeight;
  }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      
      // Skip if it's just "#" or empty
      if (targetId === '#' || !targetId) return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Calculate offset (accounting for sticky header)
        const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = targetPosition - headerHeight - 20; // 20px extra padding
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without scrolling
        history.pushState(null, null, targetId);
      }
    });
  });
}

/**
 * Initialize comment form
 */
function initCommentForm() {
  const commentForm = document.getElementById('comment-form');
  const commentTextarea = document.getElementById('comment-textarea');
  const commentsList = document.getElementById('comments-list');
  
  if (commentForm && commentTextarea) {
    commentForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const comment = commentTextarea.value.trim();
      if (!comment) return;
      
      // In a real app, this would send data to server
      // For demo, we'll just append locally
      
      // Clear textarea
      commentTextarea.value = '';
      
      // Show success message
      alert('Thanks for your comment! In a real app, this would be saved to the database.');
    });
  }
  
  // Initialize upvote buttons
  if (commentsList) {
    commentsList.querySelectorAll('[data-action="upvote"]').forEach(button => {
      button.addEventListener('click', (e) => {
        const countElement = button.querySelector('.vote-count');
        if (countElement) {
          // Toggle upvoted state
          if (button.classList.contains('upvoted')) {
            button.classList.remove('upvoted');
            countElement.textContent = parseInt(countElement.textContent) - 1;
          } else {
            button.classList.add('upvoted');
            countElement.textContent = parseInt(countElement.textContent) + 1;
          }
        }
      });
    });
  }
}
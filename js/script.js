// WorkerHelper - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Set up all event listeners and initial state
    setupLanguageSelector();
    setupMobileNavigation();
    setupAboutModal();
    setupSmoothScrolling();
    setupAnimations();
    
    // Apply initial language (default to English)
    const savedLang = localStorage.getItem('workerhelper-language') || 'en';
    changeLanguage(savedLang);
}

// Language Selector Functionality
function setupLanguageSelector() {
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const langOptions = document.querySelectorAll('.lang-option');

    if (!langBtn || !langDropdown) return;

    // Toggle dropdown on button click
    langBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!langBtn.contains(e.target) && !langDropdown.contains(e.target)) {
            langDropdown.classList.remove('active');
        }
    });

    // Handle language selection
    langOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            changeLanguage(selectedLang);
            langDropdown.classList.remove('active');
            
            // Save language preference
            localStorage.setItem('workerhelper-language', selectedLang);
        });
    });
}

// Change website language
function changeLanguage(lang) {
    // Apply translations if the translation system is available
    if (window.WorkerHelperI18n && window.WorkerHelperI18n.applyTranslations) {
        window.WorkerHelperI18n.applyTranslations(lang);
    }
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Add subtle animation to show language change
    document.body.style.transition = 'opacity 0.3s ease';
    document.body.style.opacity = '0.95';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 200);
}

// Mobile Navigation
function setupMobileNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // Reset hamburger menu
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            
            // Reset hamburger menu
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// About Modal Functionality
function setupAboutModal() {
    const aboutBtn = document.getElementById('aboutBtn');
    const aboutOverlay = document.getElementById('aboutOverlay');
    const closeAbout = document.getElementById('closeAbout');
    const learnMoreBtn = document.getElementById('learnMoreBtn');

    if (!aboutBtn || !aboutOverlay || !closeAbout) return;

    // Open about modal
    function openAboutModal() {
        aboutOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        
        // Focus trap for accessibility
        const focusableElements = aboutOverlay.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
        }
    }

    // Close about modal
    function closeAboutModal() {
        aboutOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Event listeners
    aboutBtn.addEventListener('click', openAboutModal);
    if (learnMoreBtn) {
        learnMoreBtn.addEventListener('click', openAboutModal);
    }
    closeAbout.addEventListener('click', closeAboutModal);

    // Close modal when clicking on overlay (but not the modal content)
    aboutOverlay.addEventListener('click', function(e) {
        if (e.target === aboutOverlay) {
            closeAboutModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && aboutOverlay.classList.contains('active')) {
            closeAboutModal();
        }
    });
}

// Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
    // Handle all anchor links that start with #
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Animation on Scroll
function setupAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.service-card, .article-card, .contact-item, .hero-content, .section-title'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (!header) return;

    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Utility function to show notifications (can be extended later)
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    `;

    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            break;
        case 'error':
            notification.style.background = 'linear-gradient(135deg, #f44336, #da190b)';
            break;
        case 'warning':
            notification.style.background = 'linear-gradient(135deg, #ff9800, #f57c00)';
            break;
        default:
            notification.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
    }

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Button click handlers for hero section
document.addEventListener('DOMContentLoaded', function() {
    const getStartedBtn = document.querySelector('.btn-primary');
    
    if (getStartedBtn && getStartedBtn.textContent.includes('Get Started')) {
        getStartedBtn.addEventListener('click', function() {
            showNotification('Welcome to WorkerHelper! Registration feature coming soon.', 'info');
        });
    }
});

// Article link handlers
document.addEventListener('DOMContentLoaded', function() {
    const articleLinks = document.querySelectorAll('.article-link');
    
    articleLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            showNotification('Article content is being prepared. Check back soon!', 'info');
        });
    });
});

// Contact form handling (placeholder for future implementation)
function handleContactForm(formData) {
    // This would be implemented with actual backend integration
    showNotification('Thank you for your message! We will get back to you soon.', 'success');
}

// Accessibility improvements
document.addEventListener('keydown', function(e) {
    // Skip to main content with Alt+M
    if (e.altKey && e.key === 'm') {
        e.preventDefault();
        const main = document.querySelector('main');
        if (main) {
            main.focus();
            main.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Performance optimization: Lazy load images if implemented
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Error handling for missing elements
function handleMissingElements() {
    const criticalElements = ['#langBtn', '#aboutBtn', '#menuToggle'];
    
    criticalElements.forEach(selector => {
        if (!document.querySelector(selector)) {
            console.warn(`WorkerHelper: Critical element ${selector} not found`);
        }
    });
}

// Initialize error handling
document.addEventListener('DOMContentLoaded', handleMissingElements);

// Export functions for potential external use
window.WorkerHelperApp = {
    changeLanguage,
    showNotification,
    handleContactForm
};

console.log('WorkerHelper application initialized successfully!');
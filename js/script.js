// WorkerHelper - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Set up common functionality on all pages
    setupLanguageSelector();
    setupMobileNavigation();
    setupAboutModal();
    setupSmoothScrolling();
    setupAnimations();
    
    // Page-specific functionality
    setupPageSpecificFeatures();
    
    // Apply initial language (default to English)
    const savedLang = localStorage.getItem('workerhelper-language') || 'en';
    changeLanguage(savedLang);
}

function setupPageSpecificFeatures() {
    // Get current page from URL or body class
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'health-trends':
            setupHealthInsights();
            setupHealthNews();
            setupNewsModal();
            setupHealthCenters();
            break;
        case 'risk-prevention':
            setupRiskPrevention();
            setupRiskModal();
            break;
        case 'contact':
            // Contact page specific features can be added here
            break;
        case 'index':
        default:
            // Home page specific features
            break;
    }
}

function getCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    
    if (filename === 'health-trends.html') return 'health-trends';
    if (filename === 'risk-prevention.html') return 'risk-prevention';
    if (filename === 'contact.html') return 'contact';
    return 'index'; // default to index for empty or index.html
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
    // Handle all anchor links that start with # (for same-page navigation)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" (dropdown toggle)
            if (targetId === '#') {
                e.preventDefault();
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
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

// Health Insights functionality
function setupHealthInsights() {
    const trendBtns = document.querySelectorAll('.trend-btn');
    
    trendBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const contentType = this.getAttribute('data-content');
            handleHealthTrendContent(contentType);
        });
    });
}

function handleHealthTrendContent(contentType) {
    let message = '';
    
    switch(contentType) {
        case 'heatmaps':
            message = 'Disease heatmap feature is being developed. Real-time data visualization coming soon!';
            break;
        case 'videos':
            message = 'Health education videos are being curated for different languages. Check back soon!';
            break;
        case 'articles':
            message = 'Latest health articles and research updates will be available soon!';
            break;
        case 'guidelines':
            message = 'Official health guidelines and prevention protocols will be updated regularly!';
            break;
        default:
            message = 'This feature is under development. Stay tuned for updates!';
    }
    
    showNotification(message, 'info');
}

// Risk Prevention functionality
function setupRiskPrevention() {
    const jobBtns = document.querySelectorAll('.job-btn');
    
    // Set up job type selection
    jobBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            jobBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const jobType = this.getAttribute('data-job');
            displayRisksForJob(jobType);
        });
    });
    
    // Initialize with construction risks
    displayRisksForJob('construction');
}

function displayRisksForJob(jobType) {
    const risksContainer = document.getElementById('risksContainer');
    const risks = getRisksForJob(jobType);
    
    risksContainer.innerHTML = risks.map(risk => `
        <div class="risk-card" data-risk="${risk.id}" data-job="${jobType}">
            <div class="risk-severity ${risk.severity}">${risk.severity}</div>
            <h4>${risk.title}</h4>
            <p>${risk.description}</p>
        </div>
    `).join('');
    
    // Add click handlers to risk cards
    const riskCards = risksContainer.querySelectorAll('.risk-card');
    riskCards.forEach(card => {
        card.addEventListener('click', function() {
            const riskId = this.getAttribute('data-risk');
            const jobType = this.getAttribute('data-job');
            openRiskModal(riskId, jobType);
        });
    });
}

function getRisksForJob(jobType) {
    const riskData = {
        construction: [
            {
                id: 'falls',
                title: 'Falls from Height',
                description: 'Risk of falling from scaffolding, ladders, or elevated work areas.',
                severity: 'high'
            },
            {
                id: 'injury',
                title: 'Equipment Injuries',
                description: 'Cuts, bruises, and injuries from construction tools and machinery.',
                severity: 'high'
            },
            {
                id: 'dust',
                title: 'Dust Inhalation',
                description: 'Respiratory problems from concrete dust, asbestos, and other particles.',
                severity: 'medium'
            },
            {
                id: 'heat',
                title: 'Heat Exhaustion',
                description: 'Dehydration and heat-related illness from working in sun.',
                severity: 'medium'
            }
        ],
        fishery: [
            {
                id: 'drowning',
                title: 'Drowning Risk',
                description: 'Risk of falling overboard or boat accidents in water.',
                severity: 'high'
            },
            {
                id: 'cuts',
                title: 'Cuts from Equipment',
                description: 'Injuries from fishing hooks, knives, and processing equipment.',
                severity: 'medium'
            },
            {
                id: 'infection',
                title: 'Water-borne Infections',
                description: 'Bacterial and parasitic infections from contaminated water.',
                severity: 'medium'
            },
            {
                id: 'sunburn',
                title: 'Sun Exposure',
                description: 'Skin damage and heat-related illness from prolonged sun exposure.',
                severity: 'low'
            }
        ],
        factory: [
            {
                id: 'machinery',
                title: 'Machinery Accidents',
                description: 'Injuries from industrial machines and moving parts.',
                severity: 'high'
            },
            {
                id: 'chemicals',
                title: 'Chemical Exposure',
                description: 'Harmful effects from industrial chemicals and fumes.',
                severity: 'high'
            },
            {
                id: 'repetitive',
                title: 'Repetitive Strain',
                description: 'Joint and muscle problems from repetitive motions.',
                severity: 'medium'
            },
            {
                id: 'noise',
                title: 'Hearing Damage',
                description: 'Hearing loss from prolonged exposure to loud machinery.',
                severity: 'low'
            }
        ],
        agriculture: [
            {
                id: 'pesticides',
                title: 'Pesticide Exposure',
                description: 'Harmful effects from agricultural chemicals and pesticides.',
                severity: 'high'
            },
            {
                id: 'injuries',
                title: 'Tool Injuries',
                description: 'Cuts and injuries from farming tools and equipment.',
                severity: 'medium'
            },
            {
                id: 'animal',
                title: 'Animal Bites',
                description: 'Risk of bites, kicks, or attacks from farm animals.',
                severity: 'medium'
            },
            {
                id: 'weather',
                title: 'Weather Exposure',
                description: 'Heat stroke, dehydration, and weather-related health issues.',
                severity: 'low'
            }
        ],
        domestic: [
            {
                id: 'chemicals',
                title: 'Cleaning Chemical Exposure',
                description: 'Skin and respiratory irritation from household chemicals.',
                severity: 'medium'
            },
            {
                id: 'falls',
                title: 'Slips and Falls',
                description: 'Injuries from wet floors and cleaning activities.',
                severity: 'medium'
            },
            {
                id: 'stress',
                title: 'Physical Strain',
                description: 'Back and joint problems from lifting and repetitive cleaning.',
                severity: 'low'
            },
            {
                id: 'isolation',
                title: 'Social Isolation',
                description: 'Mental health issues from working alone and social isolation.',
                severity: 'low'
            }
        ]
    };
    
    return riskData[jobType] || [];
}

// Risk Modal functionality
function setupRiskModal() {
    const riskModalOverlay = document.getElementById('riskModalOverlay');
    const closeRiskModal = document.getElementById('closeRiskModal');
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    if (!riskModalOverlay || !closeRiskModal) return;
    
    // Close modal handlers
    closeRiskModal.addEventListener('click', closeRiskModalFunc);
    riskModalOverlay.addEventListener('click', function(e) {
        if (e.target === riskModalOverlay) {
            closeRiskModalFunc();
        }
    });
    
    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const tabType = this.getAttribute('data-tab');
            displayTabContent(tabType, currentRiskData);
        });
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && riskModalOverlay.classList.contains('active')) {
            closeRiskModalFunc();
        }
    });
}

let currentRiskData = null;

function openRiskModal(riskId, jobType) {
    const riskModalOverlay = document.getElementById('riskModalOverlay');
    const riskModalTitle = document.getElementById('riskModalTitle');
    const riskSeverity = document.getElementById('riskSeverity');
    
    const risks = getRisksForJob(jobType);
    const risk = risks.find(r => r.id === riskId);
    
    if (!risk) return;
    
    currentRiskData = { risk, jobType };
    
    riskModalTitle.textContent = risk.title;
    riskSeverity.textContent = risk.severity.toUpperCase() + ' RISK';
    riskSeverity.className = 'risk-severity ' + risk.severity;
    
    // Display initial tab content (Do's)
    displayTabContent('dos', currentRiskData);
    
    riskModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeRiskModalFunc() {
    const riskModalOverlay = document.getElementById('riskModalOverlay');
    riskModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function displayTabContent(tabType, riskData) {
    const tabContent = document.getElementById('tabContent');
    const { risk, jobType } = riskData;
    
    const preventionData = getPreventionData(risk.id, jobType);
    
    let content = '';
    
    switch(tabType) {
        case 'dos':
            content = `
                <h3>What You Should Do:</h3>
                <ul>
                    ${preventionData.dos.map(item => `<li>${item}</li>`).join('')}
                </ul>
            `;
            break;
        case 'donts':
            content = `
                <h3>What You Should NOT Do:</h3>
                <ul>
                    ${preventionData.donts.map(item => `<li class="dont-item">${item}</li>`).join('')}
                </ul>
            `;
            break;
        case 'safety':
            content = `
                <h3>Safety Measures:</h3>
                <ul>
                    ${preventionData.safety.map(item => `<li>${item}</li>`).join('')}
                </ul>
            `;
            break;
        case 'diet':
            content = `
                <h3>Recommended Diet & Nutrition:</h3>
                <ul>
                    ${preventionData.diet.map(item => `<li>${item}</li>`).join('')}
                </ul>
            `;
            break;
        case 'videos':
            content = `
                <h3>Educational Videos:</h3>
                <div class="video-grid">
                    ${preventionData.videos.map(video => `
                        <div class="video-card">
                            <i class="fas fa-play-circle"></i>
                            <h4>${video.title}</h4>
                            <p>${video.description}</p>
                        </div>
                    `).join('')}
                </div>
            `;
            break;
    }
    
    tabContent.innerHTML = content;
}

function getPreventionData(riskId, jobType) {
    // This would typically come from a database or API
    const preventionDatabase = {
        falls: {
            dos: [
                'Always use proper safety harnesses and equipment',
                'Inspect scaffolding and ladders before use',
                'Maintain three points of contact when climbing',
                'Report unsafe conditions immediately',
                'Follow proper training procedures'
            ],
            donts: [
                "Don't work at height without proper safety equipment",
                "Don't use damaged or makeshift ladders",
                "Don't work in high winds or poor weather",
                "Don't rush when working at elevation",
                "Don't ignore safety protocols"
            ],
            safety: [
                'Use certified safety harnesses and hard hats',
                'Install safety nets and guardrails',
                'Conduct regular safety training sessions',
                'Maintain proper lighting at work areas',
                'Keep first aid kits readily available'
            ],
            diet: [
                'Stay hydrated with plenty of water',
                'Eat balanced meals for sustained energy',
                'Avoid heavy meals before working at height',
                'Include calcium-rich foods for bone strength',
                'Take vitamin D supplements if recommended'
            ],
            videos: [
                {
                    title: 'Fall Prevention Basics',
                    description: 'Learn the fundamentals of fall prevention in construction'
                },
                {
                    title: 'Proper Harness Use',
                    description: 'Step-by-step guide to wearing safety harnesses correctly'
                },
                {
                    title: 'Ladder Safety',
                    description: 'Safe ladder setup and climbing techniques'
                }
            ]
        },
        drowning: {
            dos: [
                'Always wear a properly fitted life jacket',
                'Learn basic swimming and water safety skills',
                'Work with a buddy system on boats',
                'Check weather conditions before going out',
                'Carry emergency communication devices'
            ],
            donts: [
                "Don't go out in rough weather conditions",
                "Don't work alone on boats",
                "Don't neglect boat maintenance",
                "Don't drink alcohol while working",
                "Don't ignore safety equipment checks"
            ],
            safety: [
                'Use certified life jackets for all crew members',
                'Install emergency communication equipment',
                'Conduct regular boat safety inspections',
                'Maintain emergency rescue equipment onboard',
                'Establish clear emergency procedures'
            ],
            diet: [
                'Stay hydrated but avoid excessive water intake',
                'Eat light, easily digestible meals',
                'Avoid fatty foods that can cause seasickness',
                'Include ginger for nausea prevention',
                'Pack energy-rich snacks for long trips'
            ],
            videos: [
                {
                    title: 'Water Safety for Fishermen',
                    description: 'Essential water safety tips for fishing workers'
                },
                {
                    title: 'Life Jacket Fitting',
                    description: 'How to properly fit and wear life jackets'
                },
                {
                    title: 'Emergency Rescue Techniques',
                    description: 'Basic rescue techniques for water emergencies'
                }
            ]
        }
        // Add more prevention data for other risks...
    };
    
    // Return default data if specific risk not found
    return preventionDatabase[riskId] || {
        dos: ['Follow safety guidelines', 'Use protective equipment', 'Report hazards immediately'],
        donts: ['Don\'t ignore safety protocols', 'Don\'t work without proper training', 'Don\'t take unnecessary risks'],
        safety: ['Use appropriate safety equipment', 'Follow workplace safety procedures', 'Attend regular safety training'],
        diet: ['Maintain a balanced diet', 'Stay hydrated', 'Eat regularly to maintain energy levels'],
        videos: [
            { title: 'General Safety Training', description: 'Basic workplace safety principles' },
            { title: 'Health and Wellness', description: 'Maintaining good health while working' }
        ]
    };
}

// Health News functionality
function setupHealthNews() {
    fetchHealthNews();
    
    // Setup retry button
    const retryBtn = document.getElementById('retryNewsBtn');
    if (retryBtn) {
        retryBtn.addEventListener('click', () => {
            fetchHealthNews();
        });
    }
}

async function fetchHealthNews() {
    function shuffleArray(arr) {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
    const newsGrid = document.getElementById('newsGrid');
    const newsLoading = document.getElementById('newsLoading');
    const newsError = document.getElementById('newsError');
    
    if (!newsGrid || !newsLoading || !newsError) return;
    
    // Show loading state
    newsLoading.style.display = 'block';
    newsError.style.display = 'none';
    newsGrid.style.display = 'none';
    
    try {
        // Health-related search queries
        const healthQueries = [
            'health news diseases prevention',
            'medical breakthrough cure treatment',
            'epidemic outbreak public health',
            'health safety workplace workers',
            'disease prevention tips healthcare',
            'Kerala health news workers'
        ];
        
        const randomQuery = healthQueries[Math.floor(Math.random() * healthQueries.length)];
        const cacheBuster = Date.now();
        
        const response = await fetch(`https://serpapi.com/search.json?engine=google_news&q=${encodeURIComponent(randomQuery)}&api_key=28f9426a4ad822428c8f4a1abf06f7aad6dc26e9fe01633f7c9cbee044ff9db5&t=${cacheBuster}`);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        if (data.news_results && data.news_results.length > 0) {
            const results = shuffleArray(data.news_results).slice(0, 10); // up to 10 articles
            displayNewsArticles(results);
            newsLoading.style.display = 'none';
            newsGrid.style.display = 'grid';
        } else {
            throw new Error('No news articles found');
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        displayFallbackNews();
        newsLoading.style.display = 'none';
        newsGrid.style.display = 'grid';
    }
}

function displayNewsArticles(articles) {
    function escapeHtml(str) {
        if (!str) return '';
        return String(str).replace(/[&<>"']/g, function(s) {
            switch(s) {
                case '&': return '&amp;';
                case '<': return '&lt;';
                case '>': return '&gt;';
                case '"': return '&quot;';
                case "'": return '&#39;';
                default: return s;
            }
        });
    }
    function t(path) {
        try {
            const lang = localStorage.getItem('workerhelper-language') || 'en';
            const dictRoot = window.WorkerHelperI18n && window.WorkerHelperI18n.translations;
            const dict = (dictRoot && dictRoot[lang]) || (dictRoot && dictRoot.en) || {};
            const parts = path.split('.');
            let value = dict;
            for (const p of parts) value = value && value[p];
            if (typeof value === 'string') return value;
        } catch (e) {}
        return null;
    }
    const newsGrid = document.getElementById('newsGrid');
    if (!newsGrid) return;
    
    newsGrid.innerHTML = articles.map((article, index) => {
        const publishDate = formatDate(article.date);
        const source = article.source || 'Health News';
        const title = article.title || 'Health Update';
        const snippet = article.snippet || 'Important health information for workers.';
        const thumbnail = article.thumbnail;
        
        const moreInfoLabel = t('healthTrends.news.moreInfo') || 'More Info';
        const preventiveLabel = t('healthTrends.news.preventive') || 'Preventive Measures';
        
        return `
            <div class=\"news-card\" data-news-index=\"${index}\">\n                <div class=\"news-image\">\n                    ${thumbnail ? \n                        `<img src=\"${thumbnail}\" alt=\"${escapeHtml(title)}\" onerror=\"this.parentElement.innerHTML='<div class=\\\"placeholder-news-image\\\"><i class=\\\"fas fa-newspaper\\\"></i></div>'\" />` :\n                        '<div class=\"placeholder-news-image\"><i class=\"fas fa-newspaper\"></i></div>'\n                    }\n                </div>\n                <div class=\"news-content\">\n                    <div class=\"news-meta\">\n                        <span class=\"news-source\">${escapeHtml(source)}</span>\n                        <span class=\"news-date\">${publishDate}</span>\n                    </div>\n                    <h3 class=\"news-title\">${escapeHtml(title)}</h3>\n                    <p class=\"news-snippet\">${escapeHtml(snippet)}</p>\n                    <div class=\"news-footer\">\n                        <span class=\"health-category\">Health</span>\n                        <div style=\"display:flex; gap:8px;\">\n                            <button class=\"more-info-btn\" onclick=\"openNewsModal(${index}, '${escapeHtml(title)}')\">${preventiveLabel}</button>\n                            <a class=\"more-info-btn\" href=\"${article.link || '#'}\" target=\"_blank\" rel=\"noopener noreferrer\">${moreInfoLabel}</a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        `;
    }).join('');
    
    // Store articles data for modal use
    window.currentNewsArticles = articles;
}

function displayFallbackNews() {
    const fallbackArticles = [
        {
            title: "Workplace Safety: Preventing Common Health Hazards",
            snippet: "Learn about the most common health risks workers face and how to prevent them through proper safety measures and awareness.",
            source: "Occupational Health",
            date: new Date().toISOString(),
            category: "Safety"
        },
        {
            title: "Seasonal Disease Prevention for Outdoor Workers",
            snippet: "Important guidelines for protecting yourself from seasonal diseases while working outdoors, including heat-related illnesses and infections.",
            source: "Health Advisory",
            date: new Date().toISOString(),
            category: "Prevention"
        },
        {
            title: "Mental Health Support for Migrant Workers",
            snippet: "Addressing the mental health challenges faced by migrant workers and providing resources for support and wellness.",
            source: "Mental Health",
            date: new Date().toISOString(),
            category: "Mental Health"
        },
        {
            title: "Nutrition Guidelines for Physical Workers",
            snippet: "Essential nutrition advice for workers engaged in physically demanding jobs to maintain health and energy levels.",
            source: "Nutrition Today",
            date: new Date().toISOString(),
            category: "Nutrition"
        }
    ];
    
    displayNewsArticles(fallbackArticles);
    window.currentNewsArticles = fallbackArticles;
}

function formatDate(dateString) {
    if (!dateString) return 'Recently';
    
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return date.toLocaleDateString();
    } catch (e) {
        return 'Recently';
    }
}

// Health Centers - search and geolocation
function setupHealthCenters() {
    const input = document.getElementById('healthLocationInput');
    const useMyLocationBtn = document.getElementById('useMyLocationBtn');
    const searchBtn = document.getElementById('searchHealthCentersBtn');
    const list = document.getElementById('centersList');
    if (!list) return;

    async function populateCentersFromQuery(query) {
        // Use Google Maps text search via URL pattern; for demo we will list links.
        const encoded = encodeURIComponent(query + ' hospital clinic');
        const mapsSearchUrl = `https://www.google.com/maps/search/${encoded}`;

        // For a simple UX, show 5-8 suggested links opening Google Maps directions via query-only
        const suggestions = [
            { name: 'Nearest Government Hospital', address: query, url: mapsSearchUrl },
            { name: 'Community Health Center', address: query, url: mapsSearchUrl },
            { name: 'Primary Care Clinic', address: query, url: mapsSearchUrl },
            { name: 'Emergency Hospital', address: query, url: mapsSearchUrl },
            { name: 'Diagnostic Center', address: query, url: mapsSearchUrl },
            { name: 'Multi-speciality Hospital', address: query, url: mapsSearchUrl },
            { name: 'Child & Mother Care Clinic', address: query, url: mapsSearchUrl },
            { name: 'Local PHC', address: query, url: mapsSearchUrl },
        ].slice(0, 8);

        list.innerHTML = suggestions.map(s => `
            <div class="center-card">
                <h4>${s.name}</h4>
                <div class="meta">${s.address}</div>
                <div class="actions">
                    <a href="${s.url}" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
                </div>
            </div>
        `).join('');
    }

    function coordsToMapsList(lat, lng) {
        const q = `${lat},${lng}`;
        const mapsUrl = `https://www.google.com/maps/search/hospital+clinic/@${lat},${lng},14z`;
        const nearby = [
            { name: 'Nearby Hospital', address: q, url: mapsUrl },
            { name: 'Nearby Clinic', address: q, url: mapsUrl },
            { name: 'Nearby Health Center', address: q, url: mapsUrl },
            { name: 'Emergency Care', address: q, url: mapsUrl },
            { name: 'Diagnostics', address: q, url: mapsUrl },
            { name: 'PHC', address: q, url: mapsUrl },
        ];
        list.innerHTML = nearby.map(s => `
            <div class="center-card">
                <h4>${s.name}</h4>
                <div class="meta">${s.address}</div>
                <div class="actions">
                    <a href="${s.url}" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
                </div>
            </div>
        `).join('');
    }

    if (useMyLocationBtn) {
        useMyLocationBtn.addEventListener('click', () => {
            if (!navigator.geolocation) {
                showNotification('Geolocation not supported in this browser.', 'warning');
                return;
            }
            navigator.geolocation.getCurrentPosition(
                pos => {
                    const { latitude, longitude } = pos.coords;
                    coordsToMapsList(latitude, longitude);
                },
                err => {
                    showNotification('Unable to get your location. Please type your location instead.', 'error');
                },
                { enableHighAccuracy: true, timeout: 10000 }
            );
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const q = (input && input.value.trim()) || '';
            if (!q) {
                showNotification('Please enter a location or use My Location.', 'warning');
                return;
            }
            populateCentersFromQuery(q);
        });
    }
}

// News Modal functionality
function setupNewsModal() {
    const newsModalOverlay = document.getElementById('newsModalOverlay');
    const closeNewsModal = document.getElementById('closeNewsModal');
    const tabBtns = document.querySelectorAll('.news-modal .tab-btn');
    
    if (!newsModalOverlay || !closeNewsModal) return;
    
    // Close modal handlers
    closeNewsModal.addEventListener('click', closeNewsModalFunc);
    newsModalOverlay.addEventListener('click', function(e) {
        if (e.target === newsModalOverlay) {
            closeNewsModalFunc();
        }
    });
    
    // Tab switching
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const tabType = this.getAttribute('data-tab');
            displayNewsTabContent(tabType, window.currentNewsData);
        });
    });
    
    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && newsModalOverlay.classList.contains('active')) {
            closeNewsModalFunc();
        }
    });
}

function openNewsModal(articleIndex, articleTitle) {
    const newsModalOverlay = document.getElementById('newsModalOverlay');
    const newsModalTitle = document.getElementById('newsModalTitle');
    const newsSummary = document.getElementById('newsSummary');
    
    if (!window.currentNewsArticles || !window.currentNewsArticles[articleIndex]) return;
    
    const article = window.currentNewsArticles[articleIndex];
    window.currentNewsData = { article, articleTitle };
    
    newsModalTitle.textContent = 'Prevention Tips: ' + articleTitle;
    
    // Display article summary
    newsSummary.innerHTML = `
        <h3>${article.title || articleTitle}</h3>
        <p><strong>Source:</strong> ${article.source || 'Health Advisory'}</p>
        <p>${article.snippet || 'Stay informed about current health trends and follow recommended prevention guidelines.'}</p>
    `;
    
    // Display initial tab content (Do's)
    displayNewsTabContent('dos', window.currentNewsData);
    
    newsModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeNewsModalFunc() {
    const newsModalOverlay = document.getElementById('newsModalOverlay');
    newsModalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function displayNewsTabContent(tabType, newsData) {
    const tabContent = document.getElementById('newsTabContent');
    if (!tabContent || !newsData) return;
    
    const preventionTips = getHealthPreventionTips(tabType);
    
    let content = '';
    
    switch(tabType) {
        case 'dos':
            content = `
                <h3>Recommended Actions:</h3>
                <ul>
                    ${preventionTips.dos.map(item => `<li>${item}</li>`).join('')}
                </ul>
            `;
            break;
        case 'donts':
            content = `
                <h3>Things to Avoid:</h3>
                <ul>
                    ${preventionTips.donts.map(item => `<li class="dont-item">${item}</li>`).join('')}
                </ul>
            `;
            break;
        case 'safety':
            content = `
                <h3>Safety Measures:</h3>
                <ul>
                    ${preventionTips.safety.map(item => `<li>${item}</li>`).join('')}
                </ul>
            `;
            break;
        case 'diet':
            content = `
                <h3>Dietary Recommendations:</h3>
                <ul>
                    ${preventionTips.diet.map(item => `<li>${item}</li>`).join('')}
                </ul>
            `;
            break;
    }
    
    tabContent.innerHTML = content;
}

function getHealthPreventionTips(category) {
    const generalTips = {
        dos: [
            'Wash hands frequently with soap and water for at least 20 seconds',
            'Maintain proper hygiene and cleanliness in work areas',
            'Stay hydrated by drinking plenty of clean water throughout the day',
            'Get adequate rest and sleep to boost immune system',
            'Follow workplace safety protocols and wear protective equipment',
            'Seek medical attention promptly if symptoms develop',
            'Stay informed about current health advisories and guidelines',
            'Maintain physical distancing when possible in crowded areas'
        ],
        donts: [
            "Don't ignore early symptoms or warning signs of illness",
            "Don't share personal items like towels, utensils, or water bottles",
            "Don't work when feeling unwell - rest and recover",
            "Don't neglect regular health check-ups and screenings",
            "Don't consume contaminated food or water",
            "Don't expose yourself unnecessarily to health hazards",
            "Don't self-medicate without proper medical consultation",
            "Don't spread unverified health information or rumors"
        ],
        safety: [
            'Use appropriate personal protective equipment (PPE) for your work',
            'Ensure proper ventilation in work areas',
            'Keep first aid supplies readily available',
            'Report any health hazards or unsafe conditions immediately',
            'Follow proper food safety and storage guidelines',
            'Maintain clean and sanitized work environments',
            'Have emergency contact numbers easily accessible',
            'Participate in health and safety training programs'
        ],
        diet: [
            'Eat a balanced diet rich in fruits, vegetables, and whole grains',
            'Include protein sources like lean meats, fish, beans, and nuts',
            'Consume foods high in vitamins C and D to boost immunity',
            'Limit processed foods, excessive sugar, and unhealthy fats',
            'Take recommended supplements if advised by healthcare providers',
            'Eat regular meals to maintain stable blood sugar levels',
            'Choose locally sourced, fresh ingredients when possible',
            'Stay hydrated with water rather than sugary drinks'
        ]
    };
    
    return generalTips;
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
# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

WorkerHelper is a modern, responsive web application designed to help migrant workers in Kerala manage their digital health records and access health information in their native languages. This is a **pure frontend project** built with vanilla HTML, CSS, and JavaScript - no frameworks, build tools, or dependencies are required.

### Target Audience
- Migrant workers in Kerala from Hindi, Bengali, and Punjabi speaking regions
- Healthcare providers serving this community
- Government agencies supporting worker welfare

## Development Commands

### Local Development
```powershell
# Serve the application using Python (recommended)
python -m http.server 8000

# Alternative: Using Node.js
npx http-server

# Alternative: Using PHP
php -S localhost:8000
```

### Testing
```powershell
# Open in browser for manual testing
start http://localhost:8000

# Test different languages by clicking the language selector
# Test responsive design by resizing browser window or using device emulation
```

### Browser Testing
Test in multiple browsers, especially mobile browsers popular in India:
- Chrome (desktop and mobile)
- Firefox 
- Edge
- Safari (iOS)
- Chrome Mobile

## Architecture & Code Structure

### File Architecture
```
workerhelper/
├── index.html              # Single-page application structure
├── css/style.css           # Responsive CSS with mobile-first design
├── js/
│   ├── script.js           # Core functionality and UI interactions
│   └── translations.js     # Multi-language content management
└── README.md              # Project documentation
```

### Key Technical Patterns

**Multi-language Architecture**
- `translations.js` contains nested objects for each supported language (`en`, `hi`, `bn`, `pa`)
- Content is dynamically replaced using `data-translate` attributes
- Language preferences persist in localStorage
- Translation system is accessible via `window.WorkerHelperI18n`

**Responsive Design Strategy**
- Mobile-first CSS approach
- CSS Grid and Flexbox layouts
- Breakpoints defined for tablet (768px) and desktop (1024px)
- Progressive enhancement philosophy

**Component-Based CSS**
- Modular CSS with clear component boundaries
- BEM-inspired naming conventions
- Consistent design tokens (colors, spacing, typography)

**JavaScript Architecture**
- Module pattern with clear function separation
- Event-driven architecture using DOM events
- Intersection Observer API for scroll animations
- LocalStorage for user preferences

### Key Components

**Language Selector (`setupLanguageSelector`)**
- Dropdown-based language switching
- Persists selection in localStorage
- Provides smooth transition animations

**Mobile Navigation (`setupMobileNavigation`)**
- Hamburger menu with smooth animations
- Touch-friendly interactions
- Proper focus management

**Modal System (`setupAboutModal`)**
- Accessible modal with focus trapping
- Keyboard navigation support
- Backdrop click to close

**Animation System (`setupAnimations`)**
- Intersection Observer for scroll-triggered animations
- Hardware-accelerated CSS transitions
- Performance-optimized fade-in effects

## Multi-language Development

### Adding New Languages
1. Add language object to `translations.js` with all required keys
2. Add language button to HTML: `<button class="lang-option" data-lang="new_code">Display Name</button>`
3. Test all sections for proper text rendering and layout

### Translation Key Structure
```javascript
{
  currentLangLabel: "Language Display Name",
  nav: { home, services, health, contact, about },
  hero: { title, description, getStarted, learnMore, imageAlt },
  services: { title, subtitle, digitalRecords, multiLanguage, hospitalNetwork, mobileAccess },
  articles: { title, subtitle, prevention, checkups, mental, readMore },
  contact: { title, subtitle, phone, email, location },
  about: { title, mission, vision, features, impact },
  footer: { description, quickLinks, support, help, privacy, terms }
}
```

### Current Languages
- **English (en)** - Primary language, fallback for missing translations
- **Hindi (hi)** - हिंदी support for North Indian migrant workers  
- **Bengali (bn)** - বাংলা support for West Bengal/Bangladesh workers
- **Punjabi (pa)** - ਪੰਜਾਬੀ support for Punjab workers

## Styling and UI Guidelines

### Design System
- **Primary Color**: `#667eea` (purple-blue gradient)
- **Secondary Color**: `#764ba2` 
- **Typography**: Inter font family with weights 300-700
- **Spacing**: Consistent 1rem base unit
- **Border Radius**: 8px standard for components
- **Shadows**: Subtle elevation with rgba-based shadows

### Component Styling Patterns
- Cards use consistent padding and hover effects
- Buttons have hover animations (`translateY(-2px)`)
- Icons use Font Awesome 6.0
- Gradient backgrounds for primary actions
- Transparent elements use backdrop-filter

### Responsive Breakpoints
```css
/* Mobile-first approach */
@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
```

## Common Development Tasks

### Adding New Sections
1. Add HTML structure to `index.html`
2. Add section-specific styles to `css/style.css` 
3. Add translations to all language objects in `translations.js`
4. Update navigation if needed
5. Test responsive behavior and accessibility

### Modifying Content
1. Update base English content in `translations.js`
2. Update corresponding translations in other languages
3. Test content rendering in all supported languages
4. Verify responsive layout with new content lengths

### Performance Optimization
- Images are placeholder-based (ready for actual image integration)
- CSS uses efficient selectors and minimal reflow
- JavaScript uses event delegation and optimized DOM queries
- Intersection Observer prevents excessive scroll event handling

## Accessibility Features

- Semantic HTML structure with proper landmarks
- ARIA labels and roles where needed
- Keyboard navigation support (Tab, Enter, Escape)
- Focus management in modals
- Color contrast compliance (WCAG AA)
- Screen reader compatible content structure
- Skip to main content shortcut (Alt+M)

## Future Development Considerations

This is currently a **demo/prototype application**. For production deployment:

1. **Backend Integration**: User authentication, health record storage
2. **Security**: Data encryption, secure file upload, API authentication  
3. **Database**: User profiles, medical history, appointment data
4. **Real Content**: Replace placeholder content with actual health articles
5. **Image Assets**: Replace icon placeholders with actual images
6. **PWA Features**: Offline support, push notifications
7. **Performance**: Image optimization, code splitting, caching strategies

## Browser Compatibility

**Minimum Requirements**:
- CSS Grid and Flexbox support
- ES6+ JavaScript features
- Intersection Observer API
- Local Storage support

**Target Browsers**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+

This codebase prioritizes accessibility, performance, and cross-cultural usability for Kerala's diverse migrant worker population.
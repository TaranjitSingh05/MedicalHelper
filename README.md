# WorkerHelper - Digital Health Record System for Kerala Workers

A modern, responsive website designed to help migrant workers in Kerala manage their health records and access health-related information in their native languages.

## Features

### 🌟 Core Features
- **Digital Health Records**: Secure storage and management of medical records
- **Multi-language Support**: Available in English, Hindi, Bengali, and Punjabi
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Accessibility**: Built with accessibility best practices in mind

### 🔧 Technical Features
- **Pure HTML/CSS/JavaScript**: No frameworks required
- **Mobile-first Design**: Responsive layout optimized for all devices
- **Language Switching**: Real-time content translation
- **Smooth Navigation**: Interactive navigation with scroll effects
- **Modal System**: Elegant About Us modal with focus management
- **Progressive Enhancement**: Works with or without JavaScript

## Project Structure

```
workerhelper/
├── index.html              # Main HTML file
├── css/
│   └── style.css           # Main stylesheet with responsive design
├── js/
│   ├── translations.js     # Multi-language content
│   └── script.js           # Interactive features and functionality
├── images/                 # Image assets (placeholder folder)
└── README.md              # This file
```

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (optional but recommended)

### Installation

1. **Clone or download the project:**
   ```bash
   git clone <repository-url>
   cd workerhelper
   ```

2. **Open the project:**
   - Option 1: Open `index.html` directly in your web browser
   - Option 2: Use a local web server (recommended)

3. **Using a local web server (recommended):**
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (with http-server package)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

4. **Open in browser:**
   Navigate to `http://localhost:8000` in your web browser

## Languages Supported

The website supports four languages with comprehensive translations:

- **English** (en) - Default language
- **हिंदी** (hi) - Hindi
- **বাংলা** (bn) - Bengali  
- **ਪੰਜਾਬੀ** (pa) - Punjabi

Language preferences are automatically saved in the browser's local storage.

## Sections Overview

### 1. Home Page
- Hero section with compelling messaging
- Clear call-to-action buttons
- Responsive design with modern gradients

### 2. Services
- Digital health records management
- Multi-language support explanation
- Hospital network connectivity
- Mobile access features

### 3. Health Articles
- Disease prevention guides
- Regular health checkup information
- Mental health support resources
- Placeholder content ready for expansion

### 4. Contact
- Emergency helpline information
- Email support contact
- Office location details

### 5. About Us (Modal)
- Mission and vision statements
- Key features overview
- Impact statistics
- Detailed project information

## Customization

### Adding New Languages

1. **Add translations** in `js/translations.js`:
   ```javascript
   const translations = {
     // ... existing languages
     'new_lang': {
       currentLangLabel: "New Language",
       // ... add all translation keys
     }
   };
   ```

2. **Add language option** in `index.html`:
   ```html
   <button class="lang-option" data-lang="new_lang">New Language</button>
   ```

### Modifying Styles

The CSS is organized with clear sections:
- Reset and base styles
- Typography
- Components (buttons, cards, etc.)
- Layout sections
- Responsive breakpoints
- Animations and effects

### Adding New Sections

1. Add HTML structure in `index.html`
2. Add corresponding styles in `css/style.css`
3. Add translations for all supported languages
4. Update navigation if needed

## Browser Support

- **Modern Browsers**: Chrome 60+, Firefox 60+, Safari 12+, Edge 79+
- **Mobile Browsers**: iOS Safari 12+, Chrome Mobile 60+
- **Features**: CSS Grid, Flexbox, ES6+ JavaScript, Intersection Observer

## Performance

- **Lightweight**: Minimal dependencies, optimized CSS/JS
- **Fast Loading**: Efficient asset loading and caching
- **Smooth Animations**: Hardware-accelerated CSS animations
- **Responsive Images**: Placeholder system ready for lazy loading

## Accessibility

- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Proper focus trapping in modals
- **Screen Reader Support**: ARIA labels and roles
- **Color Contrast**: WCAG AA compliant color schemes

## Future Enhancements

- **Backend Integration**: User registration and login
- **Database Storage**: Actual health record management
- **File Upload**: Medical document upload functionality
- **Appointment Booking**: Integration with healthcare providers
- **Notifications**: SMS/Email alert system
- **Mobile App**: Native mobile application
- **Offline Support**: Progressive Web App capabilities

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across browsers and devices
5. Submit a pull request

## License

This project is created for educational and humanitarian purposes. Please ensure compliance with local regulations regarding health data management.

## Contact

For questions or support regarding this project, please use the contact information provided in the application.

---

**Note**: This is a demonstration project. For production use, ensure proper security measures, data protection compliance, and backend infrastructure are implemented.
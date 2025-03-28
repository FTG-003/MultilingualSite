# PeerGang

PeerGang is a digital command center for AI-enhanced learning, built with pure HTML, CSS, and JavaScript. The platform combines the principles of peeragogy (peer-to-peer learning) with cutting-edge AI technology to create more effective, collaborative, and personalized learning experiences.

## Features

- **Modern, Clean Design**: Responsive interface with dark/light theme options
- **Enhanced Readability**: Typography-focused design that prioritizes content readability
- **AI Integration**: Built-in AI assistant to support learners and facilitate discussions
- **Peeragogy Framework**: Based on the chapter structure of the Peeragogy Handbook
- **Modular Architecture**: Clean separation of components and concerns

## Project Structure

```
peergang/
├── assets/
│   ├── css/
│   │   ├── styles.css        # Main stylesheet
│   │   └── chapter.css       # Chapter-specific styles
│   ├── js/
│   │   └── main.js           # Core JavaScript functionality
│   └── images/               # Image assets
├── chapters/
│   └── en/                   # English language chapters
├── components/               # Reusable HTML components
│   ├── header.html
│   ├── footer.html
│   ├── ai-sidebar.html
│   ├── search.html
│   └── comments.html
├── index.html                # Homepage
└── server.js                 # Simple Node.js server for local development
```

## Getting Started

### Prerequisites

- Node.js 20.x or higher

### Running Locally

1. Clone this repository
2. Navigate to the project directory: `cd peergang`
3. Start the server: `node server.js`
4. Open your browser and go to: `http://localhost:5000`

## Design Philosophy

PeerGang is built on the following principles:

1. **Direct Control**: Pure HTML/CSS/JS approach for complete control over the codebase
2. **Simplicity**: No frameworks or static site generators to reduce complexity
3. **Modularity**: Components-based structure for easy maintenance and extension
4. **AI Enhancement**: Seamless integration of AI capabilities to augment human collaboration
5. **Accessibility**: Design that works for everyone, regardless of device or ability

## Future Enhancements

- Expanded chapter content
- Enhanced AI capabilities with API integrations
- User authentication and profiles
- Advanced search functionality
- Multilingual support expansion

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- The Peeragogy community for their pioneering work
- Contributors to the Peeragogy Handbook
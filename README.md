# Humapedia 👥

[![GitHub Repo](https://img.shields.io/badge/GitHub-humapedia%2Fhumapedia-blue?logo=github)](https://github.com/humapedia/humapedia.git)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/github/actions/workflow/status/humapedia/humapedia/ci.yml?branch=main)](https://github.com/humapedia/humapedia/actions)
[![Coverage Status](https://img.shields.io/codecov/c/github/humapedia/humapedia)](https://codecov.io/gh/humapedia/humapedia)
[![Contributors](https://img.shields.io/github/contributors/humapedia/humapedia)](https://github.com/humapedia/humapedia/graphs/contributors)
[![Last Commit](https://img.shields.io/github/last-commit/humapedia/humapedia)](https://github.com/humapedia/humapedia/commits/main)

> **The Collaborative Internet Human Encyclopedia for Finding People**

---

## 📋 Table of Contents
- [Vision](#vision)
- [About Humapedia](#about-humapedia)
- [Features](#features)
- [Architecture Overview](#architecture-overview)
- [Privacy & Ethics](#privacy--ethics)
- [Community & Governance](#community--governance)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Core Components & Pages](#core-components--pages)
- [FAQ](#faq)
- [Changelog & Updates](#changelog--updates)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [Support](#support)
- [License](#license)

---

## 🌠 Vision

Humapedia envisions a world where every person can be discovered, connected, and understood through ethical, AI-powered technology. We believe in a future where people search is:
- **Accessible**: Open to all, regardless of background or location
- **Empowering**: Enabling meaningful connections and knowledge sharing
- **Ethical**: Built on privacy, transparency, and user control
- **Innovative**: Leveraging the latest in AI, data, and web technology

---

## 🌟 About Humapedia

Humapedia is a next-generation, collaborative internet human encyclopedia designed specifically for **finding people**. Leveraging advanced AI-powered face recognition and intelligent text search, Humapedia enables users to discover, connect, and learn about individuals from around the world. Our mission is to make people search accessible, secure, and privacy-conscious for everyone.

### What Makes Humapedia Unique?
- **AI-Powered Face Search**: Upload a photo to find matching profiles using state-of-the-art facial recognition (costs 3 credits per search).
- **Intelligent Text Search**: Search by name, company, or keywords, with advanced filters for location, profession, and more.
- **Credit System**: Fair usage with a transparent credit system for premium features.
- **Comprehensive Profiles**: Rich, detailed user profiles with social links, experience, and more.
- **Privacy First**: User privacy and data protection are core principles.
- **Modern UI/UX**: Clean, responsive, and accessible design.
- **Community-Driven**: Open to contributions and feedback from users worldwide.

---

## ✨ Features

### 🔍 Search & Discovery
- **Face Search**: Upload a clear photo, apply filters, and let AI find matching profiles (3 credits per search).
- **Text Search**: Search by name, company, or keywords. Apply filters for location, profession, and more.
- **Search History**: View, repeat, and manage your past searches with analytics and statistics.

### 👤 Profile Management
- **Detailed Profiles**: View and manage comprehensive user profiles.
- **Favorites & Sharing**: Save favorite profiles and share them easily.

### 💳 Credit System
- **Purchase Credits**: Multiple packages, instant delivery, and secure payment options.
- **Credit Usage Tracking**: Transparent usage and purchase history.

### 📊 Analytics & Visualization
- **Analytics Dashboard**: Key metrics, top searches, and user activity insights.
- **Data Visualization**: Interactive charts and graphs for trends and growth.

### 🛠️ User Tools
- **User Settings**: Manage profile, privacy, preferences, and security.
- **Notification Center**: Stay updated with important alerts and search results.
- **Help Center**: FAQ, help articles, and contact support.

### 🌙 Modern Experience
- **Dark/Light Theme**: Seamless theme switching.
- **Responsive Design**: Optimized for all devices.
- **Accessibility**: WCAG 2.1 compliant.

---

## 🏗️ Architecture Overview

### Frontend
- **Framework**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS, Heroicons, Framer Motion, Next-themes
- **State Management**: React hooks, Context API
- **Testing**: Jest, React Testing Library

### Backend/API
- **API**: Next.js API Routes, RESTful endpoints
- **Validation**: Zod for schema validation
- **Mock Data**: In-memory mock DB for rapid prototyping
- **Authentication**: (Planned) OAuth, JWT, and session management

### AI & Data
- **Face Recognition**: AI-powered image analysis (integration-ready)
- **Search Algorithms**: Intelligent text and filter-based search
- **Analytics**: Usage tracking, search statistics, and reporting

### Security
- **Data Protection**: Secure handling of user data and images
- **Rate Limiting**: Prevent abuse of search endpoints
- **Role-Based Access**: (Planned) Admin, user, and guest roles
- **CI/CD**: GitHub Actions, Docker, Husky, ESLint, Prettier

---

## 🛡️ Privacy & Ethics

- **User Consent**: All face searches require explicit user action and consent
- **Data Minimization**: Only essential data is stored; no unnecessary retention
- **Transparency**: Clear privacy policy and user controls
- **Right to Be Forgotten**: Users can delete their data and search history
- **Ethical AI**: No use of AI for surveillance or discrimination
- **Open Source**: Code and algorithms are open for review and improvement

---

## 🌍 Community & Governance

- **Open Governance**: Decisions made transparently with community input
- **Code of Conduct**: Inclusive, respectful, and safe environment
- **Contribution Guidelines**: Clear process for code, docs, and ideas
- **Recognition**: Top contributors and community champions highlighted
- **Events**: Regular community calls, hackathons, and feedback sessions

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Modern web browser
- Git

### Quick Start
```bash
# Clone the repository
git clone https://github.com/humapedia/humapedia.git
cd humapedia

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev

# Open your browser at http://localhost:3000
```

### Docker Deployment
```bash
# Build Docker image
docker build -t humapedia .
# Run container
docker run -p 3000:3000 humapedia
```

---

## 💻 Usage

### Main Navigation
1. **Search**: Use Face Search or Text Search to find people.
2. **Credits**: Manage and purchase credits for premium features.
3. **History**: View and analyze your search history.
4. **Analytics**: Explore platform-wide search and user analytics.
5. **Settings**: Manage your account, privacy, and preferences.
6. **Notifications**: Stay updated with alerts and search results.
7. **Help**: Access FAQ, help articles, and support.
8. **Visualization**: Explore interactive data visualizations.

### Search Methods
- **Face Search**: Upload a photo, apply filters, and view AI-matched profiles. Each search costs 3 credits.
- **Text Search**: Enter a name, company, or keywords. Apply filters and browse results.

### Example: Face Search Flow
```text
1. Go to /search and select the "Face Search" tab
2. Upload a clear photo (JPEG, PNG, WebP, max 10MB)
3. (Optional) Add filters: location, profession, company
4. Click "Analyze" — 3 credits will be deducted
5. View matching profiles with confidence scores and details
```

### Example: Text Search Flow
```text
1. Go to /search and select the "Text Search" tab
2. Enter a name, company, or keywords
3. (Optional) Add filters: location, profession, company
4. Click "Search"
5. Browse paginated results and view detailed profiles
```

### Example: Credits Purchase
```text
1. Go to /credits
2. Select a credit package (e.g., 10, 50, 100 credits)
3. Choose payment method (credit card, PayPal, Stripe)
4. Complete purchase and credits are instantly added
```

### Screenshots
<!--
Add screenshots here for UI walkthroughs, e.g.:
![Face Search UI](docs/screenshots/face-search.png)
![Analytics Dashboard](docs/screenshots/analytics-dashboard.png)
-->

---

## 🔌 API Documentation

### REST API Endpoints

#### **Face Search**
- `POST /api/face-search` — Perform an AI-powered face search (requires image data, costs 3 credits)

#### **Text Search**
- `GET /api/text-search` — Search for people by name, company, or keywords (supports filters)

#### **Profiles**
- `GET /api/profiles/:id` — Get detailed profile information
- `PUT /api/profiles/:id` — Update profile information
- `DELETE /api/profiles/:id` — Delete a profile

#### **Credits**
- `GET /api/credits` — Get current user credit balance and pricing
- `POST /api/credits` — Purchase credits

#### **Search History**
- `GET /api/search-history` — Fetch user search history and stats
- `POST /api/search-history` — Save a new search entry
- `DELETE /api/search-history` — Delete a search entry or clear all

#### **Notifications**
- `GET /api/notifications` — Fetch user notifications
- `POST /api/notifications` — Mark as read, dismiss, etc.

---

## 🧩 Core Components & Pages

- **FaceSearch**: AI-powered face search UI
- **TextSearch**: Intelligent text search UI
- **ProfileCard**: Rich profile display component
- **CreditsManager**: Manage and purchase credits
- **SearchHistory**: View and analyze search history
- **AnalyticsDashboard**: Platform analytics and insights
- **DataVisualization**: Interactive charts and graphs
- **UserSettings**: Manage profile, privacy, and security
- **NotificationCenter**: Alerts and updates
- **HelpCenter**: FAQ, help articles, and support

### Main Pages
- `/search` — Main search page (Face & Text Search)
- `/credits` — Manage credits
- `/history` — Search history
- `/analytics` — Analytics dashboard
- `/visualization` — Data visualization
- `/settings` — User settings
- `/notifications` — Notification center
- `/help` — Help center

---

## ❓ FAQ

**Q: Is my data safe on Humapedia?**
A: Yes. We use strong encryption, never sell your data, and give you full control over your information.

**Q: How does face search work?**
A: We use AI to analyze facial features in uploaded images and match them to profiles in our database. Each search costs 3 credits to ensure fair use.

**Q: Can I delete my search history or profile?**
A: Absolutely. You can delete your search history or your entire profile at any time from your settings.

**Q: What if I run out of credits?**
A: You can still browse profiles, but will need to purchase more credits to perform new face searches.

**Q: How can I contribute?**
A: Fork the repo, make your changes, and open a pull request! See [Contributing](#contributing) for more.

---

## 📝 Changelog & Updates

See [CHANGELOG.md](CHANGELOG.md) for a full history of updates and improvements.

- **2024-06-01**: Major refactor to people search focus, new UI, and analytics
- **2024-05-20**: Added credit system and payment integration
- **2024-05-10**: Launched analytics dashboard and data visualization
- **2024-05-01**: Initial release with face and text search

---

## 🤝 Contributing

We welcome contributions from the community! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### How to Contribute
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Commit with a meaningful message
6. Push and open a Pull Request

### Code Style
- Follow ESLint and Prettier configuration
- Use TypeScript
- Write meaningful commit messages
- Include tests for new features

---

## 🗺️ Roadmap

### Phase 1: People Search Foundation
- Face and text search
- Profile management
- Credit system
- Search history

### Phase 2: Analytics & Visualization
- Analytics dashboard
- Data visualization
- Notification system

### Phase 3: Community & Expansion
- User contributions
- Advanced privacy controls
- Multilingual support

### Phase 4: Innovation
- AI-powered recommendations
- Mobile app
- Global partnerships

---

## 🆘 Support
- **Documentation**: [docs.humapedia.org](https://docs.humapedia.org)
- **Community Forum**: [community.humapedia.org](https://community.humapedia.org)
- **Email**: support@humapedia.org
- **GitHub**: [https://github.com/humapedia/humapedia.git](https://github.com/humapedia/humapedia.git)

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by the Humapedia Team**

_Empowering people search and connection through AI and community._

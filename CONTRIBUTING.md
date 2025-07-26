# Contributing to Humapedia 🌍

Thank you for your interest in contributing to Humapedia! We welcome contributions from the community and appreciate your help in building the ultimate human knowledge encyclopedia.

## Table of Contents

- [Getting Started](#getting-started)
- [Types of Contributions](#types-of-contributions)
- [Development Setup](#development-setup)
- [Code Style](#code-style)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Content Guidelines](#content-guidelines)
- [Community Guidelines](#community-guidelines)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Git
- A modern web browser

### Quick Start

1. **Fork the repository**
   - Click the "Fork" button on the GitHub repository page
   - Clone your forked repository to your local machine

2. **Set up the development environment**
   ```bash
   git clone https://github.com/your-username/humapedia.git
   cd humapedia
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Types of Contributions

We welcome various types of contributions:

### 🎨 UI/UX Improvements
- Design enhancements
- User interface improvements
- Accessibility improvements
- Responsive design fixes

### 🐛 Bug Fixes
- Bug reports and fixes
- Performance improvements
- Security enhancements

### ✨ New Features
- New pages and components
- Enhanced functionality
- API integrations
- Search improvements

### 📚 Content Contributions
- Historical articles
- Cultural information
- Achievement documentation
- Timeline events

### 📖 Documentation
- README improvements
- API documentation
- Code comments
- Tutorial guides

### 🧪 Testing
- Unit tests
- Integration tests
- End-to-end tests
- Test coverage improvements

## Development Setup

### Environment Variables

Copy the example environment file and configure your local environment:

```bash
cp env.example .env.local
```

Update the `.env.local` file with your configuration:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/humapedia"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# API Keys (optional for development)
GOOGLE_API_KEY="your-google-api-key"
OPENAI_API_KEY="your-openai-api-key"
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run type-check` - Run TypeScript type checking
- `npm run format` - Format code with Prettier

## Code Style

### General Guidelines

- Follow the existing code style and patterns
- Use TypeScript for type safety
- Write meaningful commit messages
- Include comments for complex logic
- Keep functions small and focused

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

Examples:
```
feat: Add search functionality to timeline page
fix: Resolve navigation issue in mobile view
docs: Update README with installation instructions
```

### File Naming Conventions

- Use kebab-case for file names: `hero-section.tsx`
- Use PascalCase for component names: `HeroSection`
- Use camelCase for variables and functions: `handleSearch`

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write tests for new features
- Ensure good test coverage
- Use descriptive test names
- Test both success and error cases

Example test structure:

```typescript
import { render, screen } from '@testing-library/react'
import { HeroSection } from '@/components/hero-section'

describe('HeroSection', () => {
  it('renders the main heading', () => {
    render(<HeroSection />)
    expect(screen.getByText(/The Ultimate Human Knowledge Encyclopedia/i)).toBeInTheDocument()
  })

  it('handles search form submission', () => {
    // Test implementation
  })
})
```

## Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes**
   - Write your code
   - Add tests if applicable
   - Update documentation if needed

3. **Test your changes**
   ```bash
   npm run lint
   npm run type-check
   npm test
   npm run build
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: Add amazing feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

6. **Create a Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Fill out the PR template
   - Submit the PR

### Pull Request Guidelines

- Provide a clear description of the changes
- Include screenshots for UI changes
- Reference related issues
- Ensure all tests pass
- Follow the code style guidelines

## Content Guidelines

### Article Writing

When contributing content:

- **Accuracy**: Ensure information is accurate and well-researched
- **Sources**: Include reliable sources and references
- **Neutrality**: Maintain a neutral, objective tone
- **Completeness**: Provide comprehensive coverage of the topic
- **Clarity**: Write in clear, accessible language

### Content Structure

Articles should follow this structure:

1. **Introduction**: Brief overview of the topic
2. **Historical Context**: Background and context
3. **Main Content**: Detailed information
4. **Impact**: Significance and influence
5. **References**: Sources and further reading

### Image Guidelines

- Use high-quality, relevant images
- Ensure proper licensing and attribution
- Optimize images for web use
- Include alt text for accessibility

## Community Guidelines

### Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please:

- Be respectful and considerate
- Use inclusive language
- Welcome newcomers
- Give constructive feedback
- Help others learn

### Communication

- Use GitHub Issues for bug reports and feature requests
- Use GitHub Discussions for general questions
- Be patient and helpful with other contributors
- Ask questions when you need clarification

### Getting Help

If you need help:

1. Check the documentation
2. Search existing issues and discussions
3. Ask questions in GitHub Discussions
4. Contact the maintainers

## Recognition

Contributors will be recognized in:

- The project README
- Release notes
- Contributor hall of fame
- GitHub contributors page

## License

By contributing to Humapedia, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Humapedia! Your help makes this project better for everyone. 🌍 
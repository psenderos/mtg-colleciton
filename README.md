# MTG Collection Manager

A React application for managing Magic: The Gathering card collections, featuring integration with the Scryfall API for card search and discovery.

## Features

- 🔍 **Card Search**: Search for Magic cards using the Scryfall API
- 📱 **Responsive Design**: Mobile-friendly interface with Material-UI components
- 🎨 **Modern UI**: Clean interface with top navigation bar and drawer menu
- 📄 **Pagination**: Navigate through large search results efficiently
- ⚡ **Fast Performance**: Built with React and TypeScript for optimal performance

## Getting Started

### Prerequisites

- Node.js (v22 or higher)
- Yarn package manager
- Mise (recommended for dependency management)

### Installation

#### Option 1: With Mise (Recommended)

1. Install [Mise](https://mise.jdx.dev/getting-started.html) if you haven't already
2. Clone the repository:
   ```bash
   git clone https://github.com/psenderos/mtg-colleciton.git
   cd mtg-colleciton
   ```
3. Install system dependencies and project dependencies:
   ```bash
   mise install
   mise run install
   ```
4. Start the development server:
   ```bash
   mise run dev
   ```

#### Option 2: Manual Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/psenderos/mtg-colleciton.git
   cd mtg-colleciton
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Start the development server:
   ```bash
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Usage

### Card Search

1. Open the application in your browser
2. Click on "Card Search" in the navigation drawer
3. Enter at least 3 characters in the search box
4. Click the "Search" button or press Enter
5. Browse through the results using pagination if needed

### Search Tips

- Search by card name: `Lightning Bolt`
- Search by card type: `type:instant`
- Search by mana cost: `mana:3`
- Search by color: `color:red`
- Combine searches: `Lightning type:instant`

For more advanced search syntax, visit the [Scryfall Search Reference](https://scryfall.com/docs/syntax).

## Available Scripts

### With Mise (Recommended)

- `mise run dev` - Runs the app in development mode with Vite
- `mise run build` - Builds the app for production
- `mise run test` - Runs tests with Vitest
- `mise run test-ui` - Runs tests with Vitest UI
- `mise run lint` - Runs ESLint
- `mise run preview` - Preview production build
- `mise run clean` - Clean build artifacts and dependencies

### With Yarn

- `yarn dev` - Runs the app in development mode with Vite
- `yarn build` - Builds the app for production
- `yarn test` - Runs tests with Vitest
- `yarn test:ui` - Runs tests with Vitest UI
- `yarn lint` - Runs ESLint
- `yarn preview` - Preview production build

## API Integration

This application uses the [Scryfall API](https://scryfall.com/docs/api) to fetch Magic: The Gathering card data. The API service includes:

- Card search functionality
- Error handling for network issues
- Pagination support
- Rate limiting compliance

## Technology Stack

- **React 19** - Frontend framework
- **TypeScript** - Type safety and developer experience
- **Vite** - Modern build tool and development server
- **Material-UI (MUI)** - Component library and design system
- **Axios** - HTTP client for API requests
- **Vitest** - Fast unit testing framework
- **ESLint** - Code linting and quality
- **Yarn** - Package manager
- **Mise** - System dependency management

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Layout.tsx      # Main layout with navigation
├── pages/              # Page components
│   └── CardSearchPage.tsx
├── services/           # API and business logic
│   └── api.ts         # Scryfall API service
├── App.tsx            # Main application component
└── index.tsx          # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [Scryfall](https://scryfall.com/) for providing the comprehensive Magic: The Gathering API
- [Material-UI](https://mui.com/) for the excellent React component library
- The Magic: The Gathering community for inspiration and feedback
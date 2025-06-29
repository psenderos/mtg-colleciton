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

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/psenderos/mtg-colleciton.git
   cd mtg-colleciton
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
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

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## API Integration

This application uses the [Scryfall API](https://scryfall.com/docs/api) to fetch Magic: The Gathering card data. The API service includes:

- Card search functionality
- Error handling for network issues
- Pagination support
- Rate limiting compliance

## Technology Stack

- **React 19** - Frontend framework
- **TypeScript** - Type safety and developer experience
- **Material-UI (MUI)** - Component library and design system
- **Axios** - HTTP client for API requests
- **Jest & Testing Library** - Testing framework

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
import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';

// Mock the API service to avoid axios import issues
jest.mock('./services/api', () => ({
  apiService: {
    searchCards: jest.fn(),
    testConnection: jest.fn(),
  },
  ScryfallCard: {},
  ScryfallSearchResponse: {},
  ApiService: jest.fn(),
}));

// Create the same theme as used in App
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

test('renders MTG Collection Manager', () => {
  render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
  
  // Test that the main components are rendered
  const appBarTitle = screen.getByText(/MTG Collection Manager/i);
  const cardSearchTitles = screen.getAllByText(/Card Search/i);
  const searchInput = screen.getByLabelText(/Search for Magic cards/i);
  
  expect(appBarTitle).toBeInTheDocument();
  expect(cardSearchTitles.length).toBeGreaterThan(0); // Should appear in navigation and page header
  expect(searchInput).toBeInTheDocument();
});

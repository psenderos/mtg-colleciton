import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { vi } from 'vitest';
import { CardSearchPage } from './pages/CardSearchPage';

// Mock the API service to avoid axios import issues
vi.mock('./services/api', () => ({
  apiService: {
    searchCards: vi.fn(),
    testConnection: vi.fn(),
  },
  ScryfallCard: {},
  ScryfallSearchResponse: {},
  ApiService: vi.fn(),
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
      <CardSearchPage />
    </ThemeProvider>
  );
  
  // Test that the main components are rendered
  const cardSearchTitle = screen.getByText(/Card Search/i);
  const searchInput = screen.getByLabelText(/Search for Magic cards/i);
  
  expect(cardSearchTitle).toBeInTheDocument();
  expect(searchInput).toBeInTheDocument();
});

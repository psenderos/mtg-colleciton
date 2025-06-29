import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CardSearchPage } from '../pages/CardSearchPage';

// Mock react-router-dom to avoid dependency issues
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

// Mock the API service
jest.mock('../services/api', () => ({
  apiService: {
    searchCards: jest.fn(),
    getCardByMtgoId: jest.fn(),
    getCardPrints: jest.fn(),
    testConnection: jest.fn(),
  },
  ScryfallCard: {},
  ScryfallSearchResponse: {},
  ApiService: jest.fn(),
}));

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

describe('CardSearchPage', () => {
  test('renders card search page correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <CardSearchPage />
      </ThemeProvider>
    );
    
    // Test that the main components are rendered
    const cardSearchTitle = screen.getByText(/Card Search/i);
    const searchInput = screen.getByLabelText(/Search for Magic cards/i);
    const searchButton = screen.getByRole('button', { name: /search/i });
    
    expect(cardSearchTitle).toBeInTheDocument();
    expect(searchInput).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
  });
});
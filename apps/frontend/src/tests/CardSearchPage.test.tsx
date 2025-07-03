import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { CardSearchPage } from '../pages/CardSearchPage';
import searchReducer from '../store/searchSlice';
import { vi } from 'vitest';

// Mock the API service
vi.mock('../services/scryfull_service', () => ({
  scrifallService: {
    searchCards: vi.fn(),
    getCardByMtgoId: vi.fn(),
  },
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

// Create a test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      search: searchReducer,
    },
  });
};

describe('CardSearchPage', () => {
  test('renders card search page correctly', () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CardSearchPage />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
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
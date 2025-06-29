import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Card as ScryfallCard } from '../types/cards';

interface SearchState {
  query: string;
  results: ScryfallCard[];
  currentPage: number;
  totalCards: number;
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: '',
  results: [],
  currentPage: 1,
  totalCards: 0,
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<{
      results: ScryfallCard[];
      totalCards: number;
      currentPage: number;
    }>) => {
      state.results = action.payload.results;
      state.totalCards = action.payload.totalCards;
      state.currentPage = action.payload.currentPage;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearSearch: (state) => {
      state.query = '';
      state.results = [];
      state.currentPage = 1;
      state.totalCards = 0;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setSearchQuery,
  setSearchResults,
  setLoading,
  setError,
  clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
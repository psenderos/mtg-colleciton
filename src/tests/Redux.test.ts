import { describe, it, expect } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { Card as ScryfallCard } from '../types/cards';
import searchReducer, {
  setSearchQuery,
  setSearchResults,
  setLoading,
  setError,
  clearSearch,
} from '../store/searchSlice';

const createTestStore = () => {
  return configureStore({
    reducer: {
      search: searchReducer,
    },
  });
};

const createMockCard = (id: string, name: string, mtgo_id: number): Partial<ScryfallCard> => ({
  id,
  name,
  mtgo_id,
});

describe('Redux Search State', () => {
  it('should handle setting search query', () => {
    const store = createTestStore();
    
    store.dispatch(setSearchQuery('reanimate'));
    
    const state = store.getState();
    expect(state.search.query).toBe('reanimate');
  });

  it('should handle setting search results', () => {
    const store = createTestStore();
    
    const mockResults = [
      createMockCard('1', 'Reanimate', 123),
      createMockCard('2', 'Dark Ritual', 456),
    ] as ScryfallCard[];
    
    store.dispatch(setSearchResults({
      results: mockResults,
      totalCards: 2,
      currentPage: 1,
    }));
    
    const state = store.getState();
    expect(state.search.results).toEqual(mockResults);
    expect(state.search.totalCards).toBe(2);
    expect(state.search.currentPage).toBe(1);
  });

  it('should handle loading state', () => {
    const store = createTestStore();
    
    store.dispatch(setLoading(true));
    
    const state = store.getState();
    expect(state.search.loading).toBe(true);
  });

  it('should handle error state', () => {
    const store = createTestStore();
    
    store.dispatch(setError('Search failed'));
    
    const state = store.getState();
    expect(state.search.error).toBe('Search failed');
  });

  it('should handle clearing search state', () => {
    const store = createTestStore();
    
    // First set some data
    store.dispatch(setSearchQuery('test'));
    store.dispatch(setSearchResults({
      results: [createMockCard('1', 'Test Card', 999)] as ScryfallCard[],
      totalCards: 1,
      currentPage: 1,
    }));
    store.dispatch(setLoading(true));
    store.dispatch(setError('Some error'));
    
    // Then clear it
    store.dispatch(clearSearch());
    
    const state = store.getState();
    expect(state.search.query).toBe('');
    expect(state.search.results).toEqual([]);
    expect(state.search.totalCards).toBe(0);
    expect(state.search.currentPage).toBe(1);
    expect(state.search.loading).toBe(false);
    expect(state.search.error).toBe(null);
  });

  it('should maintain search state across multiple actions', () => {
    const store = createTestStore();
    
    // Simulate a complete search flow
    store.dispatch(setSearchQuery('lightning'));
    store.dispatch(setLoading(true));
    
    const mockResults = [
      createMockCard('1', 'Lightning Bolt', 789),
    ] as ScryfallCard[];
    
    store.dispatch(setSearchResults({
      results: mockResults,
      totalCards: 1,
      currentPage: 1,
    }));
    store.dispatch(setLoading(false));
    
    const state = store.getState();
    expect(state.search.query).toBe('lightning');
    expect(state.search.results).toEqual(mockResults);
    expect(state.search.totalCards).toBe(1);
    expect(state.search.loading).toBe(false);
    expect(state.search.error).toBe(null);
  });
});
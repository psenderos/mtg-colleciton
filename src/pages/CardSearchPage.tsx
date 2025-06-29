import React, { useState, useCallback } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Pagination,
  Paper,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { apiService, ScryfallCard } from '../services/api';

export const CardSearchPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ScryfallCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCards, setTotalCards] = useState(0);

  const cardsPerPage = 175; // Scryfall's default page size

  const handleSearch = useCallback(async (query: string, page: number = 1) => {
    if (query.trim().length < 3) {
      setError('Search query must be at least 3 characters long');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiService.searchCards(query.trim(), page);
      setSearchResults(response.data);
      setTotalCards(response.total_cards);
      setCurrentPage(page);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setSearchResults([]);
      setTotalCards(0);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSearchButtonClick = () => {
    handleSearch(searchQuery, 1);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    handleSearch(searchQuery, page);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSearchButtonClick();
    }
  };

  const totalPages = Math.ceil(totalCards / cardsPerPage);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Card Search
      </Typography>
      
      <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
          <TextField
            fullWidth
            label="Search for Magic cards..."
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            error={!!error && error.includes('3 characters')}
            helperText={error && error.includes('3 characters') ? error : 'Enter at least 3 characters to search'}
            disabled={loading}
          />
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleSearchButtonClick}
            disabled={loading || searchQuery.trim().length < 3}
            sx={{ minWidth: 120, height: 56 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Search'}
          </Button>
        </Box>
      </Paper>

      {error && !error.includes('3 characters') && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress size={60} />
        </Box>
      )}

      {!loading && searchResults.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom>
            Found {totalCards} card{totalCards !== 1 ? 's' : ''} {searchQuery && `for "${searchQuery}"`}
          </Typography>
          
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: { 
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: 2,
            mb: 3 
          }}>
            {searchResults.map((card) => (
              <Card key={card.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {card.name}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {card.type_line}
                  </Typography>
                  
                  {card.mana_cost && (
                    <Typography variant="body2" gutterBottom>
                      <strong>Mana Cost:</strong> {card.mana_cost}
                    </Typography>
                  )}
                  
                  {card.oracle_text && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>Text:</strong> {card.oracle_text}
                    </Typography>
                  )}
                  
                  {(card.power || card.toughness) && (
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      <strong>P/T:</strong> {card.power}/{card.toughness}
                    </Typography>
                  )}
                  
                  <Typography variant="caption" display="block" sx={{ mt: 2 }}>
                    Set: {card.set_name}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                size="large"
                disabled={loading}
              />
            </Box>
          )}
        </>
      )}

      {!loading && searchQuery.trim().length >= 3 && searchResults.length === 0 && !error && (
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No cards found for "{searchQuery}"
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Try adjusting your search terms or check the spelling.
          </Typography>
        </Box>
      )}
    </Box>
  );
};
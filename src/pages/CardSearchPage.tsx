import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
  Alert,
  Pagination,
  Paper,
  CardActionArea,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { scrifallService } from '../services/scryfull_service';
import { Card as ScryfallCard } from '../types/cards';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setSearchQuery,
  setSearchResults,
  setLoading,
  setError,
} from '../store/searchSlice';

export const CardSearchPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    query: searchQuery,
    results: searchResults,
    currentPage,
    totalCards,
    loading,
    error,
  } = useAppSelector((state) => state.search);

  const cardsPerPage = 175; // Scryfall's default page size

  const getCardImage = (card: ScryfallCard) => {
    if (card.image_uris?.normal) {
      return card.image_uris.normal;
    }
    if (card.card_faces?.[0]?.image_uris?.normal) {
      return card.card_faces[0].image_uris.normal;
    }
    return null;
  };

  const handleCardClick = (card: ScryfallCard) => {
    if (card.mtgo_id) {
      navigate(`/cards/${card.mtgo_id}`);
    } else {
      // Fallback: if no mtgo_id, show alert
      alert('This card is not available on MTGO');
    }
  };

  const handleSearch = useCallback(async (query: string, page: number = 1) => {
    if (query.trim().length < 3) {
      dispatch(setError('Search query must be at least 3 characters long'));
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
      const response = await scrifallService.searchCards({ q: query.trim(), page });
      dispatch(setSearchResults({
        results: response.data,
        totalCards: response.totalCards || 0,
        currentPage: page,
      }));
      dispatch(setSearchQuery(query));
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'An unknown error occurred'));
      dispatch(setSearchResults({
        results: [],
        totalCards: 0,
        currentPage: 1,
      }));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

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
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
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
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
              lg: 'repeat(5, 1fr)'
            },
            gap: 2,
            mb: 3 
          }}>
            {searchResults.map((card) => {
              const cardImage = getCardImage(card);
              return (
                <Card 
                  key={card.id} 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      cursor: 'pointer',
                    },
                  }}
                >
                  <CardActionArea 
                    onClick={() => handleCardClick(card)}
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    {cardImage ? (
                      <CardMedia
                        component="img"
                        image={cardImage}
                        alt={card.name}
                        sx={{ 
                          height: 280,
                          objectFit: 'cover',
                          flexGrow: 1
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          height: 280,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          bgcolor: 'grey.200',
                          flexGrow: 1
                        }}
                      >
                        <Typography color="text.secondary" variant="body2">
                          No image
                        </Typography>
                      </Box>
                    )}
                    <CardContent sx={{ p: 1, flexShrink: 0 }}>
                      <Typography 
                        variant="body2" 
                        component="h3" 
                        sx={{ 
                          fontWeight: 'bold',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {card.name}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          display: 'block'
                        }}
                      >
                        {card.set_name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
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
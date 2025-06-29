import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CircularProgress,
  Alert,
  Button,
  Chip,
  List,
  ListItem,
  ListItemText,
  Paper,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { scrifallService } from '../services/scryfull_service';
import { Card as ScryfallCard } from '../types/cards';

export const CardDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [card, setCard] = useState<ScryfallCard | null>(null);
  const [cardVersions, setCardVersions] = useState<ScryfallCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCardDetails = async () => {
      if (!id) {
        setError('No card ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch card details
        const cardDetails = await scrifallService.getCardByMtgoId(parseInt(id));
        setCard(cardDetails);

        // Fetch all versions of this card
        const versions = await scrifallService.searchCards({ 
          q: `!"${cardDetails.name}"`, 
          unique: 'prints', 
          order: 'released' 
        });
        setCardVersions(versions.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load card details');
      } finally {
        setLoading(false);
      }
    };

    fetchCardDetails();
  }, [id]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const getCardImage = (card: ScryfallCard) => {
    if (card.image_uris?.normal) {
      return card.image_uris.normal;
    }
    if (card.card_faces?.[0]?.image_uris?.normal) {
      return card.card_faces[0].image_uris.normal;
    }
    return null;
  };

  const formatPrice = (price: string | undefined) => {
    if (!price || price === '0.00') return 'N/A';
    return `$${price}`;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBackClick}
          sx={{ mb: 2 }}
        >
          Back to Search
        </Button>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!card) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBackClick}
          sx={{ mb: 2 }}
        >
          Back to Search
        </Button>
        <Alert severity="info">Card not found</Alert>
      </Box>
    );
  }

  const cardImage = getCardImage(card);

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBackClick}
        sx={{ mb: 3 }}
        variant="outlined"
      >
        Back to Search
      </Button>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* Card Image */}
        <Box sx={{ flex: { xs: '1', md: '0 0 50%' }, display: 'flex', justifyContent: 'center' }}>
          {cardImage ? (
            <img
              src={cardImage}
              alt={card.name}
              style={{
                maxWidth: '100%',
                height: 'auto',
                borderRadius: '12px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              }}
            />
          ) : (
            <Card sx={{ width: 300, height: 420, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography color="text.secondary">No image available</Typography>
            </Card>
          )}
        </Box>

        {/* Card Details */}
        <Box sx={{ flex: { xs: '1', md: '0 0 50%' } }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {card.name}
          </Typography>

          <Typography variant="h6" color="text.secondary" gutterBottom>
            {card.type_line}
          </Typography>

          {card.mana_cost && (
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Mana Cost:</strong> {card.mana_cost}
            </Typography>
          )}

          {card.oracle_text && (
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="body2">
                <strong>Rules Text:</strong>
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
                {card.oracle_text}
              </Typography>
            </Paper>
          )}

          {card.flavor_text && (
            <Paper sx={{ p: 2, mb: 2, bgcolor: 'grey.50' }}>
              <Typography variant="body2" fontStyle="italic">
                {card.flavor_text}
              </Typography>
            </Paper>
          )}

          {(card.power || card.toughness) && (
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Power/Toughness:</strong> {card.power}/{card.toughness}
            </Typography>
          )}

          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            <strong>Set:</strong> {card.set_name}
          </Typography>

          {/* Prices */}
          {card.prices && (
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Prices
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {card.prices.usd && (
                  <Chip label={`USD: ${formatPrice(card.prices.usd)}`} variant="outlined" />
                )}
                {card.prices.usd_foil && (
                  <Chip label={`USD Foil: ${formatPrice(card.prices.usd_foil)}`} variant="outlined" />
                )}
                {card.prices.eur && (
                  <Chip label={`EUR: €${card.prices.eur}`} variant="outlined" />
                )}
                {card.prices.tix && (
                  <Chip label={`MTGO: ${card.prices.tix} tix`} variant="outlined" />
                )}
              </Box>
            </Paper>
          )}
        </Box>
      </Box>

      {/* Available Versions */}
      {cardVersions.length > 0 && (
        <Paper sx={{ p: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Available Versions ({cardVersions.length})
          </Typography>
          <List>
            {cardVersions.map((version) => (
              <ListItem
                key={version.id}
                sx={{
                  border: '1px solid',
                  borderColor: version.mtgo_id?.toString() === id ? 'primary.main' : 'divider',
                  borderRadius: 1,
                  mb: 1,
                  bgcolor: version.mtgo_id?.toString() === id ? 'primary.light' : 'background.paper',
                  '&:hover': {
                    bgcolor: version.mtgo_id?.toString() === id ? 'primary.light' : 'action.hover',
                    cursor: version.mtgo_id?.toString() === id ? 'default' : 'pointer',
                  },
                }}
                onClick={() => {
                  if (version.mtgo_id && version.mtgo_id.toString() !== id) {
                    navigate(`/cards/${version.mtgo_id}`);
                  }
                }}
              >
                <ListItemText
                  primary={version.set_name}
                  secondary={
                    <Box>
                      {version.prices?.usd && (
                        <Typography component="span" variant="body2" color="text.secondary">
                          USD: {formatPrice(version.prices.usd)}
                        </Typography>
                      )}
                      {version.mtgo_id?.toString() === id && (
                        <Chip size="small" label="Current" color="primary" sx={{ ml: 1 }} />
                      )}
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};
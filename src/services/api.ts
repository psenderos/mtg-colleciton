import axios from 'axios';

// Scryfall API base URL
const SCRYFALL_API_BASE = 'https://api.scryfall.com';

// Types for Scryfall API responses
export interface ScryfallCard {
  id: string;
  name: string;
  mana_cost?: string;
  type_line: string;
  oracle_text?: string;
  power?: string;
  toughness?: string;
  set_name: string;
  mtgo_id?: number;
  flavor_text?: string;
  prices?: {
    usd?: string;
    usd_foil?: string;
    eur?: string;
    eur_foil?: string;
    tix?: string;
  };
  image_uris?: {
    small: string;
    normal: string;
    large: string;
  };
  card_faces?: Array<{
    image_uris?: {
      small: string;
      normal: string;
      large: string;
    };
  }>;
}

export interface ScryfallSearchResponse {
  data: ScryfallCard[];
  total_cards: number;
  has_more: boolean;
  next_page?: string;
}

export class ApiService {
  private axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: SCRYFALL_API_BASE,
      timeout: 10000,
    });
  }

  /**
   * Search for Magic: The Gathering cards using Scryfall API
   * @param query Search query string
   * @param page Page number (optional, starts from 1)
   * @returns Promise with search results
   */
  async searchCards(query: string, page: number = 1): Promise<ScryfallSearchResponse> {
    try {
      const response = await this.axiosInstance.get('/cards/search', {
        params: {
          q: query,
          page: page,
          format: 'json',
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          // No cards found
          return {
            data: [],
            total_cards: 0,
            has_more: false,
          };
        }
        throw new Error(`API Error: ${error.response?.data?.details || error.message}`);
      }
      throw new Error('Unknown error occurred while searching cards');
    }
  }

  /**
   * Get card details by MTGO ID
   * @param mtgoId MTGO ID of the card
   * @returns Promise with card details
   */
  async getCardByMtgoId(mtgoId: number): Promise<ScryfallCard> {
    try {
      const response = await this.axiosInstance.get(`/cards/mtgo/${mtgoId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`API Error: ${error.response?.data?.details || error.message}`);
      }
      throw new Error('Unknown error occurred while fetching card details');
    }
  }

  /**
   * Get all prints of a card by name
   * @param cardName Name of the card
   * @returns Promise with all prints/versions
   */
  async getCardPrints(cardName: string): Promise<ScryfallCard[]> {
    try {
      const response = await this.axiosInstance.get('/cards/search', {
        params: {
          q: `!"${cardName}"`,
          unique: 'prints',
          order: 'released',
        },
      });
      return response.data.data || [];
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return [];
        }
        throw new Error(`API Error: ${error.response?.data?.details || error.message}`);
      }
      throw new Error('Unknown error occurred while fetching card prints');
    }
  }

  /**
   * Test method to verify API connectivity
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.axiosInstance.get('/cards/random');
      return true;
    } catch (error) {
      console.error('API connection test failed:', error);
      return false;
    }
  }
}

// Export a singleton instance
export const apiService = new ApiService();
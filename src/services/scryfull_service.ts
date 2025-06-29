import axios, { AxiosInstance } from 'axios';
import { Card, CardList, RulingList, CardSearchParams, Autocomplete } from '../types/cards';
import { Set, SetList } from '../types/sets';
import { CardSymbolList, ManaCost } from '../types/symbols';
import { Catalog } from '../types/catalog';
import { BulkData, BulkDataList } from '../types/bulk';
import { Error as ScryfallError } from '../types/common';

/**
 * Comprehensive Scryfall API Service
 * Implements all endpoints from https://scryfall.com/docs/api
 */
export class ScrifallService {
  private axiosInstance: AxiosInstance;
  private readonly baseUrl = 'https://api.scryfall.com';

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'MTG Collection Manager/1.0'
      }
    });
  }

  // ===== CARD ENDPOINTS =====

  /**
   * Search for cards
   * GET /cards/search
   */
  async searchCards(params: CardSearchParams): Promise<CardList> {
    try {
      const response = await this.axiosInstance.get('/cards/search', { params });
      return response.data;
    } catch (error) {
      return this.handleError(error, { data: [], hasMore: false, object: 'list' });
    }
  }

  /**
   * Get a card by Scryfall ID
   * GET /cards/:id
   */
  async getCard(id: string): Promise<Card> {
    try {
      const response = await this.axiosInstance.get(`/cards/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get a card by MTGO ID
   * GET /cards/mtgo/:id
   */
  async getCardByMtgoId(id: number): Promise<Card> {
    try {
      const response = await this.axiosInstance.get(`/cards/mtgo/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get a card by Multiverse ID
   * GET /cards/multiverse/:id
   */
  async getCardByMultiverseId(id: number): Promise<Card> {
    try {
      const response = await this.axiosInstance.get(`/cards/multiverse/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get a card by set code and collector number
   * GET /cards/:code/:number
   */
  async getCardBySetAndNumber(setCode: string, collectorNumber: string): Promise<Card> {
    try {
      const response = await this.axiosInstance.get(`/cards/${setCode}/${collectorNumber}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get a random card
   * GET /cards/random
   */
  async getRandomCard(query?: string): Promise<Card> {
    try {
      const params = query ? { q: query } : {};
      const response = await this.axiosInstance.get('/cards/random', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get card collection by identifiers
   * POST /cards/collection
   */
  async getCollection(identifiers: Array<{ id?: string; mtgoId?: number; multiverseId?: number; oracleId?: string; illustrationId?: string; name?: string; set?: string; collectorNumber?: string }>): Promise<CardList> {
    try {
      const response = await this.axiosInstance.post('/cards/collection', {
        identifiers
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get card by exact name
   * GET /cards/named
   */
  async getCardByName(name: string, set?: string): Promise<Card> {
    try {
      const params: { exact: string; set?: string } = { exact: name };
      if (set) params.set = set;
      const response = await this.axiosInstance.get('/cards/named', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get card by fuzzy name
   * GET /cards/named
   */
  async getCardByFuzzyName(name: string, set?: string): Promise<Card> {
    try {
      const params: { fuzzy: string; set?: string } = { fuzzy: name };
      if (set) params.set = set;
      const response = await this.axiosInstance.get('/cards/named', { params });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get autocomplete suggestions
   * GET /cards/autocomplete
   */
  async getAutocomplete(query: string, includeExtras: boolean = false): Promise<Autocomplete> {
    try {
      const response = await this.axiosInstance.get('/cards/autocomplete', {
        params: { q: query, include_extras: includeExtras }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get card rulings
   * GET /cards/:id/rulings
   */
  async getCardRulings(id: string): Promise<RulingList> {
    try {
      const response = await this.axiosInstance.get(`/cards/${id}/rulings`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get card rulings by MTGO ID
   * GET /cards/mtgo/:id/rulings
   */
  async getCardRulingsByMtgoId(id: number): Promise<RulingList> {
    try {
      const response = await this.axiosInstance.get(`/cards/mtgo/${id}/rulings`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get card rulings by Multiverse ID
   * GET /cards/multiverse/:id/rulings
   */
  async getCardRulingsByMultiverseId(id: number): Promise<RulingList> {
    try {
      const response = await this.axiosInstance.get(`/cards/multiverse/${id}/rulings`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get card rulings by set and collector number
   * GET /cards/:code/:number/rulings
   */
  async getCardRulingsBySetAndNumber(setCode: string, collectorNumber: string): Promise<RulingList> {
    try {
      const response = await this.axiosInstance.get(`/cards/${setCode}/${collectorNumber}/rulings`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ===== SET ENDPOINTS =====

  /**
   * Get all sets
   * GET /sets
   */
  async getSets(): Promise<SetList> {
    try {
      const response = await this.axiosInstance.get('/sets');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get a set by ID
   * GET /sets/:id
   */
  async getSet(id: string): Promise<Set> {
    try {
      const response = await this.axiosInstance.get(`/sets/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get a set by code
   * GET /sets/:code
   */
  async getSetByCode(code: string): Promise<Set> {
    try {
      const response = await this.axiosInstance.get(`/sets/${code}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get a set by TCGPlayer ID
   * GET /sets/tcgplayer/:id
   */
  async getSetByTcgPlayerId(id: number): Promise<Set> {
    try {
      const response = await this.axiosInstance.get(`/sets/tcgplayer/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ===== SYMBOL ENDPOINTS =====

  /**
   * Get all card symbols
   * GET /symbology
   */
  async getSymbols(): Promise<CardSymbolList> {
    try {
      const response = await this.axiosInstance.get('/symbology');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Parse mana cost
   * GET /symbology/parse-mana
   */
  async parseManaCost(cost: string): Promise<ManaCost> {
    try {
      const response = await this.axiosInstance.get('/symbology/parse-mana', {
        params: { cost }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ===== CATALOG ENDPOINTS =====

  /**
   * Get card names catalog
   * GET /catalog/card-names
   */
  async getCardNames(): Promise<Catalog> {
    try {
      const response = await this.axiosInstance.get('/catalog/card-names');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get artist names catalog
   * GET /catalog/artist-names
   */
  async getArtistNames(): Promise<Catalog> {
    try {
      const response = await this.axiosInstance.get('/catalog/artist-names');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get word bank catalog
   * GET /catalog/word-bank
   */
  async getWordBank(): Promise<Catalog> {
    try {
      const response = await this.axiosInstance.get('/catalog/word-bank');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get creature types catalog
   * GET /catalog/creature-types
   */
  async getCreatureTypes(): Promise<Catalog> {
    try {
      const response = await this.axiosInstance.get('/catalog/creature-types');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get planeswalker types catalog
   * GET /catalog/planeswalker-types
   */
  async getPlaneswalkerTypes(): Promise<Catalog> {
    try {
      const response = await this.axiosInstance.get('/catalog/planeswalker-types');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get land types catalog
   * GET /catalog/land-types
   */
  async getLandTypes(): Promise<Catalog> {
    try {
      const response = await this.axiosInstance.get('/catalog/land-types');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get artifact types catalog
   * GET /catalog/artifact-types
   */
  async getArtifactTypes(): Promise<Catalog> {
    try {
      const response = await this.axiosInstance.get('/catalog/artifact-types');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get enchantment types catalog
   * GET /catalog/enchantment-types
   */
  async getEnchantmentTypes(): Promise<Catalog> {
    try {
      const response = await this.axiosInstance.get('/catalog/enchantment-types');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get spell types catalog
   * GET /catalog/spell-types
   */
  async getSpellTypes(): Promise<Catalog> {
    try {
      const response = await this.axiosInstance.get('/catalog/spell-types');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get powers catalog
   * GET /catalog/powers
   */
  async getPowers(): Promise<Catalog> {
    try {
      const response = await this.axiosInstance.get('/catalog/powers');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get toughnesses catalog
   * GET /catalog/toughnesses
   */
  async getToughnesses(): Promise<Catalog> {
    try {
      const response = await this.axiosInstance.get('/catalog/toughnesses');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get loyalties catalog
   * GET /catalog/loyalties
   */
  async getLoyalties(): Promise<Catalog> {
    try {
      const response = await this.axiosInstance.get('/catalog/loyalties');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get watermarks catalog
   * GET /catalog/watermarks
   */
  async getWatermarks(): Promise<Catalog> {
    try {
      const response = await this.axiosInstance.get('/catalog/watermarks');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get keyword abilities catalog
   * GET /catalog/keyword-abilities
   */
  async getKeywordAbilities(): Promise<Catalog> {
    try {
      const response = await this.axiosInstance.get('/catalog/keyword-abilities');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get keyword actions catalog
   * GET /catalog/keyword-actions
   */
  async getKeywordActions(): Promise<Catalog> {
    try {
      const response = await this.axiosInstance.get('/catalog/keyword-actions');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get ability words catalog
   * GET /catalog/ability-words
   */
  async getAbilityWords(): Promise<Catalog> {
    try {
      const response = await this.axiosInstance.get('/catalog/ability-words');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ===== BULK DATA ENDPOINTS =====

  /**
   * Get bulk data information
   * GET /bulk-data
   */
  async getBulkData(): Promise<BulkDataList> {
    try {
      const response = await this.axiosInstance.get('/bulk-data');
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get specific bulk data item
   * GET /bulk-data/:id
   */
  async getBulkDataItem(id: string): Promise<BulkData> {
    try {
      const response = await this.axiosInstance.get(`/bulk-data/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // ===== UTILITY METHODS =====

  /**
   * Handle API errors consistently
   */
  private handleError(error: unknown, fallback?: unknown): unknown {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404 && fallback) {
        return fallback;
      }
      const scryfallError: ScryfallError = error.response?.data || {
        object: 'error',
        code: 'api_error',
        status: error.response?.status || 500,
        details: error.message
      };
      throw new Error(`Scryfall API Error: ${scryfallError.details}`);
    }
    throw new Error('Unknown error occurred while calling Scryfall API');
  }

  /**
   * Test API connectivity
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.getRandomCard();
      return true;
    } catch (error) {
      console.error('Scryfall API connection test failed:', error);
      return false;
    }
  }
}

// Export a singleton instance
export const scrifallService = new ScrifallService();
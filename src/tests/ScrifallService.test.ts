import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { ScrifallService } from '../services/scryfull_service';

// Mock axios
vi.mock('axios', () => ({
  default: {
    create: vi.fn(() => ({
      get: vi.fn(),
      post: vi.fn(),
    })),
    isAxiosError: vi.fn(() => false),
  },
}));

describe('ScrifallService', () => {
  let service: ScrifallService;
  let mockAxiosInstance: {
    get: ReturnType<typeof vi.fn>;
    post: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockAxiosInstance = {
      get: vi.fn(),
      post: vi.fn(),
    };
    (axios.create as ReturnType<typeof vi.fn>).mockReturnValue(mockAxiosInstance);
    service = new ScrifallService();
  });

  it('should create an instance with correct configuration', () => {
    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://api.scryfall.com',
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'MTG Collection Manager/1.0'
      }
    });
  });

  it('should search for cards', async () => {
    const mockResponse = {
      data: {
        object: 'list',
        data: [],
        hasMore: false,
        totalCards: 0
      }
    };
    mockAxiosInstance.get.mockResolvedValue(mockResponse);

    const result = await service.searchCards({ q: 'Lightning Bolt' });

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/cards/search', {
      params: { q: 'Lightning Bolt' }
    });
    expect(result).toEqual(mockResponse.data);
  });

  it('should get a card by ID', async () => {
    const mockCard = {
      data: {
        object: 'card',
        id: 'test-id',
        name: 'Test Card'
      }
    };
    mockAxiosInstance.get.mockResolvedValue(mockCard);

    const result = await service.getCard('test-id');

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/cards/test-id');
    expect(result).toEqual(mockCard.data);
  });

  it('should get a random card', async () => {
    const mockCard = {
      data: {
        object: 'card',
        id: 'random-id',
        name: 'Random Card'
      }
    };
    mockAxiosInstance.get.mockResolvedValue(mockCard);

    const result = await service.getRandomCard();

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/cards/random', { params: {} });
    expect(result).toEqual(mockCard.data);
  });

  it('should get sets', async () => {
    const mockSets = {
      data: {
        object: 'list',
        data: [],
        hasMore: false
      }
    };
    mockAxiosInstance.get.mockResolvedValue(mockSets);

    const result = await service.getSets();

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/sets');
    expect(result).toEqual(mockSets.data);
  });

  it('should get symbols', async () => {
    const mockSymbols = {
      data: {
        object: 'list',
        data: [],
        hasMore: false
      }
    };
    mockAxiosInstance.get.mockResolvedValue(mockSymbols);

    const result = await service.getSymbols();

    expect(mockAxiosInstance.get).toHaveBeenCalledWith('/symbology');
    expect(result).toEqual(mockSymbols.data);
  });

  it('should handle errors correctly', async () => {
    const error = new Error('API Error');
    mockAxiosInstance.get.mockRejectedValue(error);

    await expect(service.getCard('invalid-id')).rejects.toThrow('Unknown error occurred while calling Scryfall API');
  });
});
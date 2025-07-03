import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { BackendApiService, VersionResponse } from '../services/backendApi';

// Mock axios
vi.mock('axios');
const mockedAxios = vi.mocked(axios);

describe('BackendApiService', () => {
  let service: BackendApiService;
  let mockAxiosInstance: any;

  beforeEach(() => {
    mockAxiosInstance = {
      get: vi.fn(),
    };
    
    mockedAxios.create = vi.fn().mockReturnValue(mockAxiosInstance);
    
    service = new BackendApiService();
  });

  describe('constructor', () => {
    it('should create axios instance with correct config', () => {
      expect(mockedAxios.create).toHaveBeenCalledWith({
        baseURL: 'http://localhost:8080',
        timeout: 10000,
      });
    });
  });

  describe('getLastVersion', () => {
    it('should return version data on successful request', async () => {
      const mockResponse: VersionResponse = { version: '1.0.0' };
      mockAxiosInstance.get.mockResolvedValue({ data: mockResponse });

      const result = await service.getLastVersion();

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/api/lastVersion');
      expect(result).toEqual(mockResponse);
    });

    it('should throw error with API error message on axios error', async () => {
      const errorResponse = {
        response: {
          data: {
            error: 'No active version found'
          }
        }
      };
      
      mockedAxios.isAxiosError = vi.fn().mockReturnValue(true);
      mockAxiosInstance.get.mockRejectedValue(errorResponse);

      await expect(service.getLastVersion()).rejects.toThrow('Backend API Error: No active version found');
    });

    it('should throw generic error on non-axios error', async () => {
      mockedAxios.isAxiosError = vi.fn().mockReturnValue(false);
      mockAxiosInstance.get.mockRejectedValue(new Error('Network error'));

      await expect(service.getLastVersion()).rejects.toThrow('Unknown error occurred while fetching version');
    });
  });

  describe('testConnection', () => {
    it('should return true on successful health check', async () => {
      mockAxiosInstance.get.mockResolvedValue({ data: { status: 'ok' } });

      const result = await service.testConnection();

      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/health');
      expect(result).toBe(true);
    });

    it('should return false on failed health check', async () => {
      mockAxiosInstance.get.mockRejectedValue(new Error('Connection failed'));

      const result = await service.testConnection();

      expect(result).toBe(false);
    });
  });
});
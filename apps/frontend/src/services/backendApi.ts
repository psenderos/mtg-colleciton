import axios from 'axios';

// Backend API base URL
const BACKEND_API_BASE = process.env.REACT_APP_BACKEND_API_URL || 'http://localhost:8080';

// Types for backend API responses
export interface VersionResponse {
  version: string;
}

export class BackendApiService {
  private axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BACKEND_API_BASE,
      timeout: 10000,
    });
  }

  /**
   * Get the latest active version from the backend
   * @returns Promise with version information
   */
  async getLastVersion(): Promise<VersionResponse> {
    try {
      const response = await this.axiosInstance.get('/api/lastVersion');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Backend API Error: ${error.response?.data?.error || error.message}`);
      }
      throw new Error('Unknown error occurred while fetching version');
    }
  }

  /**
   * Test method to verify backend connectivity
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.axiosInstance.get('/health');
      return true;
    } catch (error) {
      console.error('Backend API connection test failed:', error);
      return false;
    }
  }
}

// Export a singleton instance
export const backendApiService = new BackendApiService();
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'development' ? 'http://localhost:3000/api' : 'http://localhost:3000/api');

class ApiService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add token to requests
    this.client.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle responses
    this.client.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.code === 'ECONNABORTED') {
          console.error('Request timeout - using fallback data');
        } else {
          console.error('API request failed:', error.message);
        }
        throw error;
      }
    );
  }

  // Songs
  async getSongs(params = {}) {
    return this.client.get('/songs', { params });
  }

  async getSong(id) {
    return this.client.get(`/songs/${id}`);
  }

  async createSong(songData) {
    return this.client.post('/songs', songData);
  }

  async updateSong(id, songData) {
    return this.client.put(`/songs/${id}`, songData);
  }

  async deleteSong(id) {
    return this.client.delete(`/songs/${id}`);
  }

  async updatePlayCount(id) {
    return this.client.patch(`/songs/${id}/play`);
  }

  // Auth
  async login(credentials) {
    return this.client.post('/auth/login', credentials);
  }

  async register(userData) {
    return this.client.post('/auth/register', userData);
  }
}

export default new ApiService();
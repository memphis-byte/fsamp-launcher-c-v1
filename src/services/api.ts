import axios from 'axios';
import { API_BASE_URL, MAX_RETRIES } from '../utils/constants';
import { Server, NewsItem } from '../types';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const config = error.config;
    if (!config || !config.retry) {
      config.retry = 0;
    }

    config.retry += 1;

    if (config.retry <= MAX_RETRIES) {
      await new Promise(res => setTimeout(res, 1000 * config.retry));
      return apiClient(config);
    }

    return Promise.reject(error);
  }
);

export const serverAPI = {
  getServers: async (): Promise<Server[]> => {
    const { data } = await apiClient.get('/servers');
    return data;
  },

  getServerInfo: async (ip: string, port: number): Promise<Server> => {
    const { data } = await apiClient.get(`/servers/${ip}:${port}`);
    return data;
  },

  searchServers: async (query: string): Promise<Server[]> => {
    const { data } = await apiClient.get('/servers/search', { params: { q: query } });
    return data;
  },

  pingServer: async (ip: string, port: number): Promise<number> => {
    const start = Date.now();
    try {
      await apiClient.get(`/servers/ping/${ip}:${port}`);
      return Date.now() - start;
    } catch {
      return 999;
    }
  },
};

export const newsAPI = {
  getNews: async (): Promise<NewsItem[]> => {
    const { data } = await apiClient.get('/news');
    return data;
  },

  getNewsById: async (id: string): Promise<NewsItem> => {
    const { data } = await apiClient.get(`/news/${id}`);
    return data;
  },
};

export default apiClient;
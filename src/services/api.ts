import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (data: { username: string; email: string; password: string; displayName?: string }) =>
    api.post('/auth/register', data),
  login: (data: { username: string; password: string }) =>
    api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
};

export const usersAPI = {
  getProfile: () => api.get('/users/me'),
  getUser: (id: number) => api.get(`/users/${id}`),
  getUserMurmurs: (id: number) => api.get(`/users/${id}/murmurs`),
  follow: (id: number) => api.post(`/users/${id}/follow`),
  unfollow: (id: number) => api.delete(`/users/${id}/follow`),
  getFollowers: (id: number) => api.get(`/users/${id}/followers`),
  getFollowing: (id: number) => api.get(`/users/${id}/following`),
};

export const murmursAPI = {
  getAll: (page: number = 1, limit: number = 10) =>
    api.get('/murmurs', { params: { page, limit } }),
  getOne: (id: number) => api.get(`/murmurs/${id}`),
  create: (content: string) => api.post('/murmurs/me/murmurs', { content }),
  delete: (id: number) => api.delete(`/murmurs/me/murmurs/${id}`),
  like: (id: number) => api.post(`/murmurs/${id}/like`),
  unlike: (id: number) => api.delete(`/murmurs/${id}/like`),
  getTimeline: (page: number = 1, limit: number = 10) =>
    api.get('/murmurs/timeline/me', { params: { page, limit } }),
};

export default api;
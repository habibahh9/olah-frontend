import axios from 'axios';

// ── Base Instance ─────────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request Interceptor ───────────────────────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor ──────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'Terjadi kesalahan.';
    
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      
      // Mencegah auto-reload jika user sudah berada di halaman /login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(new Error(message));
  }
);

// ── Auth → LoginPage, RegisterPage ───────────────────────────────────────────
export const authAPI = {
  register: async (data) => {
    const res = await api.post('/auth/register', data);
    if (res?.data?.token) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user || {}));
    }
    return res;
  },
  login: async (data) => {
    const res = await api.post('/auth/login', data);
    if (res?.data?.token) {
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user || {}));
    }
    return res;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return api.post('/auth/logout');
  },
  getMe: async () => {
    const res = await api.get('/auth/me');
    if (res?.data?.user) {
      const current = JSON.parse(localStorage.getItem('user') || '{}');
      localStorage.setItem('user', JSON.stringify({ ...current, ...res.data.user }));
    }
    return res;
  },
};

// ── Recipes → ResepPage, DetailResepPage, CepatPage, BahanLengkapPage ─────────
export const recipeAPI = {
  getAll: (params) => api.get('/recipes', { params }),
  getById: (id) => api.get(`/recipes/${id}`),
  getCepat: () => api.get('/recipes?type=cepat'),       // resep cepat
  getByBahan: (params) => api.get('/recipes', { params }),      // filter bahan
  create: (data) => api.post('/recipes', data),
  update: (id, data) => api.put(`/recipes/${id}`, data),
  delete: (id) => api.delete(`/recipes/${id}`),
  toggleLove: (id) => api.post(`/recipes/${id}/love`),
  getRecommendations: (params = {}) => api.get("/recipes/recommend", { params }),
};

// ── Pantry → BahanPage, TambahItemPage ───────────────────────────────────────
export const pantryAPI = {
  getAll: () => api.get('/pantry'),
  addItem: (data) => api.post('/pantry', data),
  updateItem: (id, data) => api.put(`/pantry/${id}`, data),
  deleteItem: (id) => api.delete(`/pantry/${id}`),
};

// ── Shopping List → KeranjangPage ─────────────────────────────────────────────
export const shoppingListAPI = {
  getAll: () => api.get('/shopping-list'),
  addItem: ({ ingredientName, name }) => {
    const itemName = ingredientName || name;
    return api.post('/shopping-list', { items: [{ name: itemName }] });
  },
  updateItem: (id, data) => api.put(`/shopping-list/${id}`, data),
  toggleItem: (id) => api.patch(`/shopping-list/${id}/toggle`),
  deleteItem: (id) => api.delete(`/shopping-list/${id}`),
  clearChecked: () => api.delete('/shopping-list/clear-checked'),
};

// ── Users → ProfilePage, SandiPage ───────────────────────────────────────────
export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
  deleteAccount: () => api.delete('/users/account'),
};

// ── Riwayat → RiwayatPage ─────────────────────────────────────────────────────
export const riwayatAPI = {
  getAll: () => api.get('/users/history'),
  addItem: (data) => api.post('/users/history', data),
  clear: () => api.delete('/users/history'),
};

// ── Detail Masak → DetailMasakPage ────────────────────────────────────────────
export const masakAPI = {
  getDetail: (id) => api.get(`/recipes/${id}/steps`),
  selesai: (id) => api.post(`/recipes/${id}/selesai`),
};

export const notificationAPI = {
  getAll: () => api.get('/users/notifications'),
};

export const articleAPI = {
  getAll: () => api.get('/articles'),
};


export default api;
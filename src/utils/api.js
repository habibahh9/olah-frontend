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
      window.location.href = '/login';
    }
    return Promise.reject(new Error(message));
  }
);

// ── Auth → LoginPage, RegisterPage ───────────────────────────────────────────
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
<<<<<<< HEAD
  login:    (data) => api.post('/auth/login', data),
  logout:   ()     => api.post('/auth/logout'),
  getMe:    ()     => api.get('/auth/me'),
=======
  login: (data) => api.post('/auth/login', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
>>>>>>> a6a8478 (update api endpoint)
};

// ── Recipes → ResepPage, DetailResepPage, CepatPage, BahanLengkapPage ─────────
export const recipeAPI = {
<<<<<<< HEAD
  getAll:        (params) => api.get('/recipes', { params }),
  getById:       (id)     => api.get(`/recipes/${id}`),
  getCepat:      ()       => api.get('/recipes?type=cepat'),       // resep cepat
  getByBahan:    (params) => api.get('/recipes', { params }),      // filter bahan
  create:        (data)   => api.post('/recipes', data),
  update:        (id, data) => api.put(`/recipes/${id}`, data),
  delete:        (id)     => api.delete(`/recipes/${id}`),
=======
  getAll: (params) => api.get('/recipes', { params }),
  getById: (id) => api.get(`/recipes/${id}`),
  getCepat: () => api.get('/recipes?type=cepat'),       // resep cepat
  getByBahan: (params) => api.get('/recipes', { params }),      // filter bahan
  create: (data) => api.post('/recipes', data),
  update: (id, data) => api.put(`/recipes/${id}`, data),
  delete: (id) => api.delete(`/recipes/${id}`),
>>>>>>> a6a8478 (update api endpoint)
};

// ── Pantry → BahanPage, TambahItemPage ───────────────────────────────────────
export const pantryAPI = {
<<<<<<< HEAD
  getAll:     ()         => api.get('/pantry'),
  addItem:    (data)     => api.post('/pantry', data),
  updateItem: (id, data) => api.put(`/pantry/${id}`, data),
  deleteItem: (id)       => api.delete(`/pantry/${id}`),
=======
  getAll: () => api.get('/pantry'),
  addItem: (data) => api.post('/pantry', data),
  updateItem: (id, data) => api.put(`/pantry/${id}`, data),
  deleteItem: (id) => api.delete(`/pantry/${id}`),
>>>>>>> a6a8478 (update api endpoint)
};

// ── Shopping List → KeranjangPage ─────────────────────────────────────────────
export const shoppingListAPI = {
<<<<<<< HEAD
  getAll:     ()         => api.get('/shopping-list'),
  addItem:    (data)     => api.post('/shopping-list', data),
  updateItem: (id, data) => api.put(`/shopping-list/${id}`, data),
  deleteItem: (id)       => api.delete(`/shopping-list/${id}`),
  clearAll:   ()         => api.delete('/shopping-list'),
=======
  getAll: () => api.get('/shopping-list'),
  addItem: (data) => api.post('/shopping-list', data),
  updateItem: (id, data) => api.put(`/shopping-list/${id}`, data),
  deleteItem: (id) => api.delete(`/shopping-list/${id}`),
  clearAll: () => api.delete('/shopping-list'),
>>>>>>> a6a8478 (update api endpoint)
};

// ── Users → ProfilePage, SandiPage ───────────────────────────────────────────
export const userAPI = {
<<<<<<< HEAD
  getProfile:     ()     => api.get('/users/profile'),
  updateProfile:  (data) => api.put('/users/profile', data),
  changePassword: (data) => api.patch('/users/change-password', data),
  deleteAccount:  ()     => api.delete('/users/account'),
=======
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  changePassword: (data) => api.patch('/users/change-password', data),
  deleteAccount: () => api.delete('/users/account'),
>>>>>>> a6a8478 (update api endpoint)
};

// ── Riwayat → RiwayatPage ─────────────────────────────────────────────────────
export const riwayatAPI = {
<<<<<<< HEAD
  getAll:  ()   => api.get('/users/riwayat'),
  addItem: (data) => api.post('/users/riwayat', data),
  clear:   ()   => api.delete('/users/riwayat'),
=======
  getAll: () => api.get('/users/riwayat'),
  addItem: (data) => api.post('/users/riwayat', data),
  clear: () => api.delete('/users/riwayat'),
>>>>>>> a6a8478 (update api endpoint)
};

// ── Detail Masak → DetailMasakPage ────────────────────────────────────────────
export const masakAPI = {
  getDetail: (id) => api.get(`/recipes/${id}/steps`),
<<<<<<< HEAD
  selesai:   (id) => api.post(`/recipes/${id}/selesai`),
};

// ── Article → ArticlePage ─────────────────────────────────────────────────────
export const articleAPI = {
  getAll:  (params) => api.get('/articles', { params }),
  getById: (id)     => api.get(`/articles/${id}`),
=======
  selesai: (id) => api.post(`/recipes/${id}/selesai`),
>>>>>>> a6a8478 (update api endpoint)
};

export const notificationAPI = {
  getAll: () => api.get('/users/notifications'),
};

<<<<<<< HEAD
=======
export const articleAPI = {
  getAll: () => api.get('/articles'),
};

>>>>>>> a6a8478 (update api endpoint)
export default api;
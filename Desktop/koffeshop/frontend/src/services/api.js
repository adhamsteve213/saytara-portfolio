import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default {
  // Auth
  register(data) {
    return api.post('/register', data);
  },
  login(data) {
    return api.post('/login', data);
  },
  logout() {
    return api.post('/logout');
  },
  getCurrentUser() {
    return api.get('/user');
  },

  // Categories
  categories: {
    getAll: () => api.get('/categories'),
    getById: (id) => api.get(`/categories/${id}`),
    create: (data) => api.post('/admin/categories', data),
    update: (id, data) => api.put(`/admin/categories/${id}`, data),
    delete: (id) => api.delete(`/admin/categories/${id}`),
  },

  // Products  
  products: {
    getAll: (params = {}) => api.get('/products', { params }),
    getById: (id) => api.get(`/products/${id}`),
    getFeatured: () => api.get('/products/featured'),
    create: (data) => api.post('/admin/products', data),
    update: (id, data) => api.put(`/admin/products/${id}`, data),
    delete: (id) => api.delete(`/admin/products/${id}`),
  },

  // Cart
  cart: {
    get: () => api.get('/cart'),
    add: (data) => api.post('/cart', data),
    update: (id, data) => api.put(`/cart/${id}`, data),
    remove: (id) => api.delete(`/cart/${id}`),
    clear: () => api.delete('/cart'),
  },

  // Orders
  orders: {
    getAll: () => api.get('/orders'),
    create: (data) => api.post('/orders', data),
    getById: (id) => api.get(`/orders/${id}`),
    cancel: (id) => api.put(`/orders/${id}/cancel`),
    getAllAdmin: () => api.get('/admin/orders'),
    updateStatus: (id, data) => api.put(`/admin/orders/${id}/status`, data),
  },

  // Legacy methods for backwards compatibility
  getCategories() {
    return this.categories.getAll();
  },
  getCategory(id) {
    return this.categories.getById(id);
  },
  createCategory(data) {
    return api.post('/admin/categories', data);
  },
  updateCategory(id, data) {
    return api.put(`/admin/categories/${id}`, data);
  },
  deleteCategory(id) {
    return api.delete(`/admin/categories/${id}`);
  },

  // Products
  getProducts(params = {}) {
    return api.get('/products', { params });
  },
  getProduct(id) {
    return api.get(`/products/${id}`);
  },
  getFeaturedProducts() {
    return api.get('/products/featured');
  },
  createProduct(data) {
    return api.post('/admin/products', data);
  },
  updateProduct(id, data) {
    return api.put(`/admin/products/${id}`, data);
  },
  deleteProduct(id) {
    return api.delete(`/admin/products/${id}`);
  },

  // Cart
  getCart() {
    return api.get('/cart');
  },
  addToCart(data) {
    return api.post('/cart', data);
  },
  updateCartItem(id, data) {
    return api.put(`/cart/${id}`, data);
  },
  removeFromCart(id) {
    return api.delete(`/cart/${id}`);
  },
  clearCart() {
    return api.delete('/cart');
  },

  // Orders
  getOrders() {
    return api.get('/orders');
  },
  createOrder(data) {
    return api.post('/orders', data);
  },
  getOrder(id) {
    return api.get(`/orders/${id}`);
  },
  cancelOrder(id) {
    return api.put(`/orders/${id}/cancel`);
  },
  getAllOrders() {
    return api.get('/admin/orders');
  },
  updateOrderStatus(id, data) {
    return api.put(`/admin/orders/${id}/status`, data);
  },
};

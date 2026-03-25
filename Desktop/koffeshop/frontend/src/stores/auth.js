import { defineStore } from 'pinia';
import api from '@/services/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('auth_token'),
    isAuthenticated: !!localStorage.getItem('auth_token'),
  }),

  getters: {
    isAdmin: (state) => state.user?.role === 'admin',
  },

  actions: {
    async login(credentials) {
      try {
        const response = await api.login(credentials);
        console.log('Login response:', response);
        // Laravel returns {success, message, data: {user, token}}
        // Interceptor returns response.data, so we get {success, message, data: {user, token}}
        const authData = response.data || response;
        this.token = authData.token;
        this.user = authData.user;
        this.isAuthenticated = true;
        localStorage.setItem('auth_token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
        return response;
      } catch (error) {
        console.error('Login error in store:', error);
        throw error;
      }
    },

    async register(userData) {
      try {
        const response = await api.register(userData);
        console.log('Register response:', response);
        // Laravel returns {success, message, data: {user, token}}
        const authData = response.data || response;
        this.token = authData.token;
        this.user = authData.user;
        this.isAuthenticated = true;
        localStorage.setItem('auth_token', this.token);
        localStorage.setItem('user', JSON.stringify(this.user));
        return response;
      } catch (error) {
        console.error('Register error in store:', error);
        throw error;
      }
    },

    async logout() {
      try {
        await api.logout();
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        this.user = null;
        this.token = null;
        this.isAuthenticated = false;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
      }
    },

    async fetchUser() {
      if (!this.token) return;
      try {
        const response = await api.getCurrentUser();
        this.user = response.data || response;
        this.isAuthenticated = true;
      } catch (error) {
        console.error('Fetch user error:', error);
        this.logout();
      }
    },
  },
});

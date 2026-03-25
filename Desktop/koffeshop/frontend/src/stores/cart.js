import { defineStore } from 'pinia';
import api from '@/services/api';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    total: 0,
  }),

  getters: {
    itemCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    cartTotal: (state) => state.total,
  },

  actions: {
    async fetchCart() {
      try {
        const response = await api.getCart();
        this.items = response.data.items || [];
        this.total = response.data.total || 0;
      } catch (error) {
        console.error('Fetch cart error:', error);
        this.items = [];
        this.total = 0;
      }
    },

    async addToCart(productId, quantity = 1) {
      try {
        await api.addToCart({ product_id: productId, quantity });
        await this.fetchCart();
      } catch (error) {
        throw error;
      }
    },

    async updateQuantity(cartItemId, quantity) {
      try {
        await api.updateCartItem(cartItemId, { quantity });
        await this.fetchCart();
      } catch (error) {
        throw error;
      }
    },

    async removeItem(cartItemId) {
      try {
        await api.removeFromCart(cartItemId);
        await this.fetchCart();
      } catch (error) {
        throw error;
      }
    },

    async clearCart() {
      try {
        await api.clearCart();
        this.items = [];
        this.total = 0;
      } catch (error) {
        throw error;
      }
    },
  },
});

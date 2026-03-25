import { defineStore } from 'pinia';

export const useWishlistStore = defineStore('wishlist', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('wishlist') || '[]'),
  }),

  getters: {
    itemCount: (state) => state.items.length,
    isInWishlist: (state) => (productId) => {
      return state.items.some(item => item.id === productId);
    },
  },

  actions: {
    toggleWishlist(product) {
      const index = this.items.findIndex(item => item.id === product.id);
      if (index > -1) {
        this.items.splice(index, 1);
      } else {
        this.items.push(product);
      }
      localStorage.setItem('wishlist', JSON.stringify(this.items));
    },

    removeFromWishlist(productId) {
      this.items = this.items.filter(item => item.id !== productId);
      localStorage.setItem('wishlist', JSON.stringify(this.items));
    },

    clearWishlist() {
      this.items = [];
      localStorage.removeItem('wishlist');
    },
  },
});

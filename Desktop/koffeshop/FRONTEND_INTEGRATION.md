# Frontend Integration Guide

## Quick Start

### 1. Install Axios in Frontend

```bash
cd frontend
npm install axios
```

### 2. Create API Service (frontend/src/services/api.js)

```javascript
import axios from "axios";

const API_URL = "http://localhost:8000/api";

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
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
      // Token expired, redirect to login
      localStorage.removeItem("auth_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default {
  // Auth
  register(data) {
    return api.post("/register", data);
  },
  login(data) {
    return api.post("/login", data);
  },
  logout() {
    return api.post("/logout");
  },
  getCurrentUser() {
    return api.get("/user");
  },

  // Categories
  getCategories() {
    return api.get("/categories");
  },
  getCategory(id) {
    return api.get(`/categories/${id}`);
  },

  // Products
  getProducts(params = {}) {
    return api.get("/products", { params });
  },
  getProduct(id) {
    return api.get(`/products/${id}`);
  },
  getFeaturedProducts() {
    return api.get("/products/featured");
  },

  // Cart
  getCart() {
    return api.get("/cart");
  },
  addToCart(data) {
    return api.post("/cart", data);
  },
  updateCartItem(id, data) {
    return api.put(`/cart/${id}`, data);
  },
  removeFromCart(id) {
    return api.delete(`/cart/${id}`);
  },
  clearCart() {
    return api.delete("/cart");
  },

  // Orders
  getOrders() {
    return api.get("/orders");
  },
  createOrder(data) {
    return api.post("/orders", data);
  },
  getOrder(id) {
    return api.get(`/orders/${id}`);
  },
  cancelOrder(id) {
    return api.put(`/orders/${id}/cancel`);
  },

  // Admin
  admin: {
    // Categories
    createCategory(data) {
      return api.post("/admin/categories", data);
    },
    updateCategory(id, data) {
      return api.put(`/admin/categories/${id}`, data);
    },
    deleteCategory(id) {
      return api.delete(`/admin/categories/${id}`);
    },

    // Products
    createProduct(data) {
      return api.post("/admin/products", data);
    },
    updateProduct(id, data) {
      return api.put(`/admin/products/${id}`, data);
    },
    deleteProduct(id) {
      return api.delete(`/admin/products/${id}`);
    },

    // Orders
    getAllOrders() {
      return api.get("/admin/orders");
    },
    updateOrderStatus(id, data) {
      return api.put(`/admin/orders/${id}/status`, data);
    },
  },
};
```

### 3. Create Auth Store (frontend/src/stores/auth.js)

```javascript
import { defineStore } from "pinia";
import api from "@/services/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("auth_token"),
    isAuthenticated: false,
  }),

  actions: {
    async login(credentials) {
      try {
        const response = await api.login(credentials);
        this.token = response.data.token;
        this.user = response.data.user;
        this.isAuthenticated = true;
        localStorage.setItem("auth_token", this.token);
        return response;
      } catch (error) {
        throw error;
      }
    },

    async register(userData) {
      try {
        const response = await api.register(userData);
        this.token = response.data.token;
        this.user = response.data.user;
        this.isAuthenticated = true;
        localStorage.setItem("auth_token", this.token);
        return response;
      } catch (error) {
        throw error;
      }
    },

    async logout() {
      try {
        await api.logout();
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        this.user = null;
        this.token = null;
        this.isAuthenticated = false;
        localStorage.removeItem("auth_token");
      }
    },

    async fetchUser() {
      try {
        const response = await api.getCurrentUser();
        this.user = response.data;
        this.isAuthenticated = true;
      } catch (error) {
        this.logout();
      }
    },
  },
});
```

### 4. Create Cart Store (frontend/src/stores/cart.js)

```javascript
import { defineStore } from "pinia";
import api from "@/services/api";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
    total: 0,
  }),

  getters: {
    itemCount: (state) => state.items.length,
    cartTotal: (state) => state.total,
  },

  actions: {
    async fetchCart() {
      try {
        const response = await api.getCart();
        this.items = response.data.items;
        this.total = response.data.total;
      } catch (error) {
        console.error("Fetch cart error:", error);
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
```

### 5. Example Component Usage

```vue
<template>
  <div>
    <h2>Products</h2>
    <div v-for="product in products" :key="product.id">
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <p>${{ product.price }}</p>
      <button @click="addToCart(product.id)">Add to Cart</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";
import { useCartStore } from "@/stores/cart";

const products = ref([]);
const cartStore = useCartStore();

onMounted(async () => {
  try {
    const response = await api.getProducts();
    products.value = response.data;
  } catch (error) {
    console.error("Error loading products:", error);
  }
});

const addToCart = async (productId) => {
  try {
    await cartStore.addToCart(productId, 1);
    alert("Product added to cart!");
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};
</script>
```

## CORS Configuration

The Laravel backend should allow requests from your Vue frontend. Ensure your `.env` file has:

```env
SESSION_DRIVER=cookie
SANCTUM_STATEFUL_DOMAINS=localhost:5173,127.0.0.1:5173
```

And in `config/cors.php`:

```php
'paths' => ['api/*', 'sanctum/csrf-cookie'],
'allowed_origins' => ['http://localhost:5173'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => true,
```

## Testing the Connection

1. Start Laravel backend:

   ```bash
   cd koffeshop
   php artisan serve
   ```

2. Start Vue frontend:

   ```bash
   cd frontend
   npm run dev
   ```

3. Test the API:
   - Navigate to http://localhost:5173
   - Try registering a new user
   - Browse products
   - Add items to cart
   - Create an order

## Common Issues

### CORS Errors

- Make sure `SANCTUM_STATEFUL_DOMAINS` includes your frontend URL
- Check that the backend is running on port 8000
- Verify the API_URL in your frontend matches the backend URL

### Authentication Issues

- Ensure token is stored in localStorage after login
- Check that Authorization header is being sent with requests
- Verify the token hasn't expired

### 419 CSRF Token Mismatch

- This shouldn't happen with API routes, but if it does:
  - Make sure you're using `/api/` prefix for all routes
  - Check that Sanctum is properly configured

## Next Steps

1. Install Pinia for state management: `npm install pinia`
2. Set up Vue Router for navigation
3. Create login/register pages
4. Build product listing and detail pages
5. Create shopping cart page
6. Build checkout and order pages
7. Add admin dashboard for management

<template>
  <nav class="navbar navbar-expand-lg navbar-dark fixed-top glass-effect">
    <div class="container-fluid">
      <!-- Hamburger Menu -->
      <button
        class="btn btn-link text-white navbar-toggler-custom"
        @click="$emit('toggle-sidebar')"
      >
        <span class="navbar-toggler-icon-custom">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <!-- Logo -->
      <router-link to="/" class="navbar-brand mx-3 float-animation">
        <span class="text-gradient fw-bold fs-3">☕ Koffeshop</span>
      </router-link>

      <!-- Search Bar -->
      <div class="search-container mx-auto">
        <input
          type="text"
          v-model="searchQuery"
          @input="handleSearch"
          @focus="showResults = true"
          placeholder="Search products..."
          class="search-input"
        />
        <i class="bi bi-search search-icon"></i>

        <!-- Search Results -->
        <div v-if="showResults && searchQuery" class="search-results card-3d">
          <div v-if="loading" class="text-center py-3">
            <div class="spinner-border text-primary" role="status"></div>
          </div>
          <div
            v-else-if="searchResults.length === 0"
            class="text-center py-3 text-muted"
          >
            No products found
          </div>
          <div v-else>
            <div
              v-for="product in searchResults"
              :key="product.id"
              class="search-result-item"
              @click="goToProduct(product.id)"
            >
              <img
                :src="product.image || '/placeholder.jpg'"
                :alt="product.name"
                class="result-image"
              />
              <div class="result-info">
                <h6 class="mb-0">{{ product.name }}</h6>
                <p class="mb-0 text-muted small">
                  {{ product.category?.name }}
                </p>
                <p class="mb-0 text-success fw-bold">${{ product.price }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Links -->
      <div class="d-flex align-items-center gap-3">
        <!-- Cart -->
        <router-link
          to="/cart"
          class="nav-icon-link position-relative pulse-animation"
        >
          <i class="bi bi-cart3 fs-4"></i>
          <span v-if="cartStore.itemCount > 0" class="badge-custom">{{
            cartStore.itemCount
          }}</span>
        </router-link>

        <!-- Wishlist -->
        <router-link to="/wishlist" class="nav-icon-link position-relative">
          <i class="bi bi-heart fs-4"></i>
          <span v-if="wishlistStore.itemCount > 0" class="badge-custom">{{
            wishlistStore.itemCount
          }}</span>
        </router-link>

        <!-- Orders -->
        <router-link
          v-if="authStore.isAuthenticated"
          to="/orders"
          class="nav-icon-link"
        >
          <i class="bi bi-receipt fs-4"></i>
        </router-link>

        <!-- Admin Badge and Link -->
        <div
          v-if="authStore.isAuthenticated && authStore.isAdmin"
          class="admin-badge-container"
        >
          <span class="admin-badge pulse-animation">
            <i class="bi bi-star-fill"></i> ADMIN
          </span>
        </div>

        <router-link
          v-if="authStore.isAdmin"
          to="/admin"
          class="btn btn-sm btn-3d btn-admin-gradient"
        >
          <i class="bi bi-shield-check"></i> Dashboard
        </router-link>

        <!-- Auth Buttons -->
        <div v-if="!authStore.isAuthenticated" class="auth-buttons">
          <router-link to="/login" class="btn btn-sm btn-3d btn-gradient">
            <i class="bi bi-box-arrow-in-right"></i> Login
          </router-link>
        </div>
        <div v-else class="user-info-container">
          <span class="user-name">{{ authStore.user?.name }}</span>
          <button
            @click="handleLogout"
            class="btn btn-sm btn-3d btn-gradient-danger"
          >
            <i class="bi bi-box-arrow-right"></i> Logout
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";
import api from "@/services/api";

const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const searchQuery = ref("");
const searchResults = ref([]);
const showResults = ref(false);
const loading = ref(false);

let searchTimeout = null;

const handleSearch = async () => {
  if (searchTimeout) clearTimeout(searchTimeout);

  if (!searchQuery.value.trim()) {
    searchResults.value = [];
    return;
  }

  loading.value = true;

  searchTimeout = setTimeout(async () => {
    try {
      const response = await api.getProducts({ search: searchQuery.value });
      searchResults.value = response.data.slice(0, 5);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      loading.value = false;
    }
  }, 300);
};

const goToProduct = (id) => {
  showResults.value = false;
  searchQuery.value = "";
  router.push(`/products/${id}`);
};

const handleLogout = async () => {
  await authStore.logout();
  router.push("/");
};

// Close search results when clicking outside
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-container")) {
    showResults.value = false;
  }
});
</script>

<style lang="scss" scoped>
.navbar {
  padding: 1rem 0;
  z-index: 1000;
  background: rgba(111, 78, 55, 0.95) !important;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.navbar-toggler-custom {
  border: none;
  padding: 0;
  width: 30px;
  height: 25px;
  position: relative;
  cursor: pointer;

  &:focus {
    outline: none;
  }
}

.navbar-toggler-icon-custom {
  span {
    display: block;
    width: 100%;
    height: 3px;
    background: white;
    margin: 5px 0;
    transition: all 0.3s ease;
    border-radius: 3px;
  }
}

.search-container {
  position: relative;
  max-width: 500px;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 12px 45px 12px 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 16px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.5);
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
}

.search-icon {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.7);
  font-size: 18px;
}

.search-results {
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  right: 0;
  background: white;
  border-radius: 15px;
  max-height: 400px;
  overflow-y: auto;
  z-index: 1001;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.search-result-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-bottom: 1px solid #f0f0f0;

  &:hover {
    background: linear-gradient(135deg, #f8f9fa, #e9ecef);
    transform: translateX(5px);
  }

  &:last-child {
    border-bottom: none;
  }
}

.result-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.result-info {
  flex: 1;

  h6 {
    color: #2c3e50;
    font-weight: 600;
  }
}

.nav-icon-link {
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: #d4a574;
    transform: translateY(-3px);
  }
}

.badge-custom {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff6b6b;
  color: white;
  font-size: 11px;
  font-weight: bold;
  padding: 3px 7px;
  border-radius: 50%;
  box-shadow: 0 3px 10px rgba(255, 107, 107, 0.5);
  animation: pulse3d 2s ease-in-out infinite;
}

@keyframes pulse3d {
  0%,
  100% {
    transform: scale3d(1, 1, 1);
  }
  50% {
    transform: scale3d(1.1, 1.1, 1.1);
  }
}

.auth-buttons {
  .btn-gradient {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 8px 24px;
    font-weight: 600;
    letter-spacing: 0.5px;
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
      );
      transition: left 0.5s;
    }

    &:hover::before {
      left: 100%;
    }

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
    }
  }
}

.btn-gradient-danger {
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%);
  color: white;
  border: none;
  padding: 8px 24px;
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(255, 107, 107, 0.4);
  }
}

.btn-admin-gradient {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
  padding: 8px 24px;
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 10px 25px rgba(240, 147, 251, 0.5);
  }
}

.admin-badge-container {
  margin-right: 10px;
}

.admin-badge {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #333;
  padding: 6px 16px;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.75rem;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.4);
  display: inline-flex;
  align-items: center;
  gap: 5px;

  i {
    font-size: 0.85rem;
    animation: spin 3s linear infinite;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.user-info-container {
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-name {
  color: white;
  font-weight: 600;
  font-size: 0.95rem;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .search-container {
    max-width: 200px;
  }

  .navbar-brand {
    font-size: 1rem !important;
  }
}
</style>

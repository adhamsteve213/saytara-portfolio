<template>
  <div :class="['sidebar', { open: open }]" class="glass-effect">
    <button class="close-btn btn-3d" @click="$emit('close')">
      <i class="bi bi-x-lg"></i>
    </button>

    <div class="sidebar-header">
      <h4 class="text-gradient">☕ Menu</h4>
    </div>

    <div class="sidebar-content">
      <router-link to="/" class="sidebar-link card-3d" @click="$emit('close')">
        <i class="bi bi-house-door"></i>
        <span>Home</span>
      </router-link>

      <router-link
        to="/products"
        class="sidebar-link card-3d"
        @click="$emit('close')"
      >
        <i class="bi bi-grid"></i>
        <span>All Products</span>
      </router-link>

      <router-link
        to="/cart"
        class="sidebar-link card-3d"
        @click="$emit('close')"
      >
        <i class="bi bi-cart3"></i>
        <span>Cart</span>
        <span v-if="cartStore.itemCount > 0" class="badge bg-danger">{{
          cartStore.itemCount
        }}</span>
      </router-link>

      <router-link
        to="/wishlist"
        class="sidebar-link card-3d"
        @click="$emit('close')"
      >
        <i class="bi bi-heart"></i>
        <span>Wishlist</span>
        <span v-if="wishlistStore.itemCount > 0" class="badge bg-danger">{{
          wishlistStore.itemCount
        }}</span>
      </router-link>

      <router-link
        v-if="authStore.isAuthenticated"
        to="/orders"
        class="sidebar-link card-3d"
        @click="$emit('close')"
      >
        <i class="bi bi-receipt"></i>
        <span>My Orders</span>
      </router-link>

      <hr class="my-3" style="border-color: rgba(255, 255, 255, 0.3)" />

      <router-link
        to="/about"
        class="sidebar-link card-3d"
        @click="$emit('close')"
      >
        <i class="bi bi-info-circle"></i>
        <span>About Us</span>
      </router-link>

      <router-link
        to="/contact"
        class="sidebar-link card-3d"
        @click="$emit('close')"
      >
        <i class="bi bi-envelope"></i>
        <span>Contact</span>
      </router-link>

      <div v-if="authStore.isAdmin">
        <hr class="my-3" style="border-color: rgba(255, 255, 255, 0.3)" />
        <router-link
          to="/admin"
          class="sidebar-link card-3d admin-link"
          @click="$emit('close')"
        >
          <i class="bi bi-shield-check"></i>
          <span>Admin Dashboard</span>
        </router-link>
      </div>
    </div>
  </div>

  <div v-if="open" class="sidebar-overlay" @click="$emit('close')"></div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";

defineProps(["open"]);
defineEmits(["close"]);

const authStore = useAuthStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  left: -280px;
  top: 0;
  width: 280px;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  backdrop-filter: blur(20px);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  z-index: 1001;
  overflow-y: auto;
  box-shadow: 5px 0 30px rgba(0, 0, 0, 0.3);

  &.open {
    left: 0;
    animation: slideIn 0.3s ease-out;
  }
}

@keyframes slideIn {
  from {
    left: -280px;
    opacity: 0;
  }
  to {
    left: 0;
    opacity: 1;
  }
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg) scale(1.1);
  }
}

.sidebar-header {
  padding: 30px 20px;

  h4 {
    color: white;
    margin: 0;
    font-size: 1.8rem;
    font-weight: bold;
  }
}

.sidebar-content {
  padding: 0 15px 20px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  color: white;
  text-decoration: none;
  border-radius: 15px;
  margin-bottom: 10px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.1);

  i {
    font-size: 1.3rem;
  }

  span {
    font-weight: 500;
  }

  .badge {
    margin-left: auto;
    animation: pulse3d 2s ease-in-out infinite;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateX(10px) translateZ(20px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  }

  &.router-link-active {
    background: rgba(255, 255, 255, 0.3);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  }
}

.admin-link {
  background: linear-gradient(135deg, #ffd700, #ffed4e);
  color: #2c3e50;

  &:hover {
    background: linear-gradient(135deg, #ffed4e, #ffd700);
  }
}

.sidebar-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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

@media (max-width: 768px) {
  .sidebar {
    width: 260px;
    left: -260px;
  }
}
</style>

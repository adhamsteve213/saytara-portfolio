<template>
  <div class="wishlist-page container py-5">
    <h1 class="page-title text-center mb-5 slide-in">
      <span class="text-gradient">My Wishlist</span>
    </h1>

    <div
      v-if="wishlistStore.items.length === 0"
      class="empty-wishlist text-center py-5 card-3d bg-white rounded"
    >
      <i class="bi bi-heart display-1 text-muted mb-3"></i>
      <h3>Your wishlist is empty</h3>
      <p class="text-muted">Add your favorite items to wishlist!</p>
      <router-link to="/products" class="btn btn-primary btn-3d mt-3">
        <i class="bi bi-cup-hot"></i> Browse Products
      </router-link>
    </div>

    <div v-else class="row g-4">
      <div
        v-for="item in wishlistStore.items"
        :key="item.id"
        class="col-lg-3 col-md-4 col-sm-6"
      >
        <div class="product-card card-3d">
          <div class="product-image-wrapper">
            <img
              :src="item.image || 'https://via.placeholder.com/300'"
              :alt="item.name"
              class="product-image"
            />
            <button
              @click="removeFromWishlist(item.id)"
              class="remove-btn btn-3d"
            >
              <i class="bi bi-x-lg"></i>
            </button>
          </div>
          <div class="product-body">
            <h5 class="product-title">{{ item.name }}</h5>
            <p class="product-description">{{ item.description }}</p>
            <div class="product-footer">
              <span class="product-price">${{ item.price }}</span>
              <button
                @click="addToCart(item.id)"
                class="btn btn-sm btn-primary btn-3d"
              >
                <i class="bi bi-cart-plus"></i> Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useWishlistStore } from "@/stores/wishlist";
import { useCartStore } from "@/stores/cart";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const authStore = useAuthStore();

const removeFromWishlist = (productId) => {
  wishlistStore.removeFromWishlist(productId);
};

const addToCart = async (productId) => {
  if (!authStore.isAuthenticated) {
    router.push("/login");
    return;
  }
  try {
    await cartStore.addToCart(productId, 1);
    alert("Added to cart!");
  } catch (error) {
    alert("Failed to add to cart");
  }
};
</script>

<style lang="scss" scoped>
.wishlist-page {
  min-height: 100vh;
  padding-top: 40px;
}

.page-title {
  font-size: 3rem;
  font-weight: 900;
}

.empty-wishlist {
  padding: 60px 20px;
}

.product-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  height: 100%;
}

.product-image-wrapper {
  position: relative;
  height: 250px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.1);
}

.remove-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: #ff6b6b;
  border: none;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  z-index: 10;
}

.product-body {
  padding: 20px;
}

.product-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.product-description {
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-bottom: 15px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 800;
  color: #27ae60;
}
</style>

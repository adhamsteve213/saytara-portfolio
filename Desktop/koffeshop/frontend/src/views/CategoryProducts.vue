<template>
  <div class="category-products-page">
    <div class="container py-5">
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
      </div>

      <div v-else>
        <div class="category-header mb-5 text-center">
          <h1 class="text-gradient float-animation">
            {{ category?.name || "Category" }}
          </h1>
          <p class="lead text-white">{{ category?.description }}</p>
        </div>

        <div class="row g-4">
          <div
            v-for="product in products"
            :key="product.id"
            class="col-md-6 col-lg-3"
          >
            <div class="product-card card-3d h-100">
              <div class="product-image-wrapper">
                <img
                  :src="
                    product.image ||
                    'https://via.placeholder.com/300x300?text=' + product.name
                  "
                  :alt="product.name"
                  class="product-image"
                />
                <button
                  @click="toggleWishlist(product.id)"
                  class="wishlist-btn"
                  :class="{ active: wishlistStore.isInWishlist(product.id) }"
                >
                  <i
                    class="bi"
                    :class="
                      wishlistStore.isInWishlist(product.id)
                        ? 'bi-heart-fill'
                        : 'bi-heart'
                    "
                  ></i>
                </button>
              </div>
              <div class="card-body">
                <h5 class="card-title">{{ product.name }}</h5>
                <p class="card-text text-muted small">
                  {{ product.description?.substring(0, 60) }}...
                </p>
                <div class="d-flex justify-content-between align-items-center">
                  <span class="price text-primary fw-bold"
                    >${{ product.price }}</span
                  >
                  <router-link
                    :to="`/products/${product.id}`"
                    class="btn btn-sm btn-outline-primary"
                  >
                    View
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="products.length === 0" class="text-center py-5">
          <i
            class="bi bi-inbox"
            style="font-size: 4rem; opacity: 0.5; color: white"
          ></i>
          <p class="text-white mt-3">No products in this category</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useWishlistStore } from "@/stores/wishlist";
import api from "@/services/api";

const route = useRoute();
const wishlistStore = useWishlistStore();

const category = ref(null);
const products = ref([]);
const loading = ref(true);

const fetchCategoryProducts = async () => {
  loading.value = true;
  try {
    const categoryResponse = await api.categories.getById(route.params.id);
    category.value = categoryResponse.data;

    const productsResponse = await api.products.getAll({
      category_id: route.params.id,
    });
    products.value = productsResponse.data;
  } catch (error) {
    console.error("Failed to fetch category products:", error);
  } finally {
    loading.value = false;
  }
};

const toggleWishlist = (productId) => {
  const product = products.value.find((p) => p.id === productId);
  if (product) {
    wishlistStore.toggleWishlist(product);
  }
};

onMounted(() => {
  fetchCategoryProducts();
});
</script>

<style lang="scss" scoped>
.category-products-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.category-header {
  animation: slideIn 0.6s ease-out;
}

.product-card {
  background: white;
  border: none;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-10px);
  }
}

.product-image-wrapper {
  position: relative;
  overflow: hidden;
  height: 250px;
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

.wishlist-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 2;

  i {
    font-size: 1.2rem;
    color: #999;
    transition: all 0.3s ease;
  }

  &:hover {
    transform: scale(1.1);
    background: white;
  }

  &.active {
    i {
      color: #ff6b6b;
      animation: pulse-animation 0.6s ease;
    }
  }
}

.price {
  font-size: 1.3rem;
}
</style>

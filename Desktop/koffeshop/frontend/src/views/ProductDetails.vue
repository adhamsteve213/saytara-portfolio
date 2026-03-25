<template>
  <div class="product-details-page">
    <div class="container py-5">
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
      </div>

      <div v-else-if="product" class="row">
        <div class="col-md-6 mb-4">
          <div class="product-image-container float-animation">
            <img
              :src="
                product.image ||
                'https://via.placeholder.com/600x600?text=' + product.name
              "
              :alt="product.name"
              class="img-fluid rounded shadow-3d"
            />
          </div>
        </div>

        <div class="col-md-6">
          <div class="product-info bg-white p-4 rounded shadow-lg">
            <span class="badge bg-secondary mb-3">{{
              product.category?.name
            }}</span>
            <h1 class="product-title mb-3">{{ product.name }}</h1>
            <div class="price-tag mb-4">
              <span class="price text-gradient">${{ product.price }}</span>
            </div>

            <p class="product-description mb-4">{{ product.description }}</p>

            <div class="product-meta mb-4">
              <div class="meta-item">
                <i class="bi bi-box-seam"></i>
                <span>Stock: {{ product.stock_quantity }} available</span>
              </div>
              <div class="meta-item" v-if="product.size">
                <i class="bi bi-rulers"></i>
                <span>Size: {{ product.size }}</span>
              </div>
              <div class="meta-item">
                <i class="bi bi-check-circle"></i>
                <span>{{
                  product.is_available ? "Available" : "Out of Stock"
                }}</span>
              </div>
            </div>

            <div class="quantity-selector mb-4">
              <label class="form-label">Quantity:</label>
              <div class="input-group" style="width: 150px">
                <button
                  class="btn btn-outline-secondary"
                  @click="decreaseQty"
                  :disabled="quantity <= 1"
                  type="button"
                >
                  <i class="bi bi-dash"></i>
                </button>
                <input
                  v-model.number="quantity"
                  type="number"
                  class="form-control text-center"
                  min="1"
                  :max="product.stock_quantity"
                />
                <button
                  class="btn btn-outline-secondary"
                  @click="increaseQty"
                  :disabled="quantity >= product.stock_quantity"
                  type="button"
                >
                  <i class="bi bi-plus"></i>
                </button>
              </div>
            </div>

            <div class="action-buttons d-flex gap-3">
              <button
                @click="addToCart"
                class="btn btn-primary btn-3d flex-grow-1"
                :disabled="!product.is_available || addingToCart"
                type="button"
              >
                <i class="bi bi-cart-plus me-2"></i>
                {{ addingToCart ? "Adding..." : "Add to Cart" }}
              </button>
              <button
                @click="toggleWishlist"
                class="btn btn-outline-danger btn-3d"
                :class="{ active: isWishlisted }"
                type="button"
              >
                <i
                  class="bi"
                  :class="isWishlisted ? 'bi-heart-fill' : 'bi-heart'"
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-5">
        <i
          class="bi bi-exclamation-triangle"
          style="font-size: 4rem; opacity: 0.3"
        ></i>
        <p class="text-muted mt-3">Product not found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";
import { useAuthStore } from "@/stores/auth";
import api from "@/services/api";

const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const authStore = useAuthStore();

const product = ref(null);
const loading = ref(true);
const quantity = ref(1);
const addingToCart = ref(false);

const isWishlisted = computed(() => {
  return product.value ? wishlistStore.isInWishlist(product.value.id) : false;
});

const fetchProduct = async () => {
  loading.value = true;
  try {
    const response = await api.products.getById(route.params.id);
    console.log("API Response:", response);

    // API interceptor unwraps axios response.data, Laravel returns {success, data}
    if (response && response.data) {
      product.value = response.data;
      console.log("Product set:", product.value);
    } else {
      console.error("Invalid response structure:", response);
      product.value = null;
    }
  } catch (error) {
    console.error("Failed to fetch product:", error);
    product.value = null;
  } finally {
    loading.value = false;
  }
};

const addToCart = async () => {
  console.log("Add to cart clicked");
  if (!authStore.isAuthenticated) {
    console.log("User not authenticated, redirecting to login");
    router.push("/login");
    return;
  }

  addingToCart.value = true;
  try {
    console.log(
      `Adding product ${product.value.id} with quantity ${quantity.value}`
    );
    await cartStore.addToCart(product.value.id, quantity.value);
    alert("Product added to cart!");
  } catch (error) {
    console.error("Add to cart failed:", error);
    alert("Failed to add to cart");
  } finally {
    addingToCart.value = false;
  }
};

const toggleWishlist = () => {
  console.log("Toggle wishlist clicked");
  if (product.value) {
    wishlistStore.toggleWishlist(product.value);
  }
};

const increaseQty = () => {
  console.log("Increase quantity clicked");
  if (quantity.value < product.value.stock_quantity) {
    quantity.value++;
  }
};

const decreaseQty = () => {
  console.log("Decrease quantity clicked");
  if (quantity.value > 1) {
    quantity.value--;
  }
};

onMounted(() => {
  fetchProduct();
});
</script>

<style lang="scss" scoped>
.product-details-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-top: 2rem;
}

.product-image-container {
  position: relative;

  img {
    width: 100%;
    border-radius: 15px;
  }
}

.product-info {
  animation: slideIn 0.6s ease-out;
}

.product-title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
}

.price-tag {
  .price {
    font-size: 2.5rem;
    font-weight: bold;
  }
}

.product-description {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.8;
}

.product-meta {
  .meta-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
    border-bottom: 1px solid #eee;

    i {
      font-size: 1.2rem;
      color: var(--primary-color);
    }
  }
}

.quantity-selector {
  input[type="number"] {
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
}

.action-buttons {
  .btn.active {
    background-color: #ff6b6b;
    border-color: #ff6b6b;
    color: white;

    i {
      animation: pulse-animation 0.6s ease;
    }
  }
}
</style>

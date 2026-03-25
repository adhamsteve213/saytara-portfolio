<template>
  <div class="products-page">
    <div class="container py-5">
      <div class="row mb-4">
        <div class="col-md-8">
          <h1 class="text-gradient float-animation">Our Products</h1>
        </div>
        <div class="col-md-4">
          <select
            v-model="selectedCategory"
            class="form-select"
            @change="filterProducts"
          >
            <option value="">All Categories</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.name }}
            </option>
          </select>
        </div>
      </div>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
      </div>

      <div v-else class="row g-4">
        <div
          v-for="product in products"
          :key="product.id"
          class="col-md-6 col-lg-3"
        >
          <div
            class="product-card card-3d h-100"
            @click="goToProduct(product.id)"
          >
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
                @click.stop="toggleWishlist(product.id)"
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
              <span class="badge bg-secondary mb-2">{{
                product.category?.name
              }}</span>
              <h5 class="card-title">{{ product.name }}</h5>
              <p class="card-text text-muted small">
                {{ product.description?.substring(0, 60) }}...
              </p>
              <div class="price-container mb-3">
                <span class="price-tag">${{ product.price }}</span>
              </div>
              <div class="quantity-controls" @click.stop>
                <button @click="decreaseQuantity(product.id)" class="qty-btn">
                  <i class="bi bi-dash"></i>
                </button>
                <span class="qty-value">{{
                  productQuantities[product.id] || 1
                }}</span>
                <button @click="increaseQuantity(product.id)" class="qty-btn">
                  <i class="bi bi-plus"></i>
                </button>
              </div>
              <button
                @click.stop="addToCart(product.id)"
                class="btn btn-primary btn-3d w-100 mt-3"
              >
                <i class="bi bi-cart-plus"></i> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="!loading && products.length === 0" class="text-center py-5">
        <i class="bi bi-inbox" style="font-size: 4rem; opacity: 0.3"></i>
        <p class="text-muted mt-3">No products found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useWishlistStore } from "@/stores/wishlist";
import { useCartStore } from "@/stores/cart";
import { useAuthStore } from "@/stores/auth";
import api from "@/services/api";

const router = useRouter();
const wishlistStore = useWishlistStore();
const cartStore = useCartStore();
const authStore = useAuthStore();

const products = ref([]);
const categories = ref([]);
const selectedCategory = ref("");
const loading = ref(true);
const productQuantities = reactive({});

const goToProduct = (id) => {
  router.push(`/products/${id}`);
};

const increaseQuantity = (productId) => {
  if (!productQuantities[productId]) productQuantities[productId] = 1;
  productQuantities[productId]++;
};

const decreaseQuantity = (productId) => {
  if (!productQuantities[productId]) productQuantities[productId] = 1;
  if (productQuantities[productId] > 1) {
    productQuantities[productId]--;
  }
};

const addToCart = async (productId) => {
  if (!authStore.isAuthenticated) {
    router.push("/login");
    return;
  }
  try {
    const quantity = productQuantities[productId] || 1;
    await cartStore.addToCart(productId, quantity);
    alert(`Added ${quantity} item(s) to cart!`);
  } catch (error) {
    alert("Failed to add to cart");
  }
};

const fetchProducts = async () => {
  loading.value = true;
  try {
    const params = selectedCategory.value
      ? { category_id: selectedCategory.value }
      : {};
    const response = await api.products.getAll(params);
    products.value = response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
  } finally {
    loading.value = false;
  }
};

const fetchCategories = async () => {
  try {
    const response = await api.categories.getAll();
    categories.value = response.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  }
};

const filterProducts = () => {
  fetchProducts();
};

const toggleWishlist = (productId) => {
  const product = products.value.find((p) => p.id === productId);
  if (product) {
    wishlistStore.toggleWishlist(product);
  }
};

onMounted(() => {
  fetchCategories();
  fetchProducts();
});
</script>

<style lang="scss" scoped>
.products-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-top: 100px;
}

.product-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  cursor: pointer;
  border: none;

  &:hover {
    transform: translateY(-15px) scale(1.03);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
  }
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
  transform: scale(1.15) rotate(3deg);
}

.product-badge {
  position: absolute;
  top: 15px;
  left: 15px;
  padding: 5px 15px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 5;
}

.wishlist-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: white;
  border: none;
  color: #ff6b6b;
  font-size: 1.3rem;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
  }

  &.active {
    background: linear-gradient(135deg, #ff6b6b, #ee5a6f);
    color: white;
    animation: heartBeat 0.3s ease;
  }
}

@keyframes heartBeat {
  0%,
  100% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.3);
  }
  50% {
    transform: scale(1.1);
  }
}

.card-title {
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 10px;
}

.price-container {
  display: flex;
  justify-content: center;
}

.price-tag {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: #f8f9fa;
  padding: 8px 15px;
  border-radius: 30px;
}

.qty-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    transform: scale(1.15) rotate(90deg);
    box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: scale(0.9);
  }
}

.qty-value {
  min-width: 35px;
  text-align: center;
  font-weight: 700;
  font-size: 1.1rem;
  color: #2c3e50;
}

.text-gradient {
  background: linear-gradient(135deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
}

.form-select {
  border-radius: 15px;
  padding: 12px 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  transition: all 0.3s ease;

  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
  }
}
</style>

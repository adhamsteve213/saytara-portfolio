# Complete Frontend Setup Script - Creates ALL remaining view files

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Creating Complete Vue Frontend Files" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

$baseView = 'c:\Users\user\Desktop\koffeshop\frontend\src\views'

# All view files content in a hashtable
$viewFiles = @{

'ProductsPage.vue' = @'
<template>
  <div class="products-page container py-5">
    <h1 class="page-title text-center mb-5 slide-in">
      <span class="text-gradient">Our Products</span>
    </h1>
    <div class="filters-section mb-4 card-3d p-4 bg-white rounded">
      <div class="row g-3">
        <div class="col-md-4">
          <select v-model="selectedCategory" @change="applyFilters" class="form-select">
            <option value="">All Categories</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
        </div>
      </div>
    </div>
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;"></div>
    </div>
    <div v-else class="row g-4">
      <div v-for="product in products" :key="product.id" class="col-lg-3 col-md-4 col-sm-6">
        <div class="product-card card-3d">
          <div class="product-image-wrapper">
            <img :src="product.image || 'https://via.placeholder.com/300'" :alt="product.name" class="product-image" />
            <button @click="wishlistStore.toggleWishlist(product)" class="wishlist-btn btn-3d" :class="{ 'active': wishlistStore.isInWishlist(product.id) }">
              <i class="bi" :class="wishlistStore.isInWishlist(product.id) ? 'bi-heart-fill' : 'bi-heart'"></i>
            </button>
          </div>
          <div class="product-body">
            <span class="product-category">{{ product.category?.name }}</span>
            <h5 class="product-title">{{ product.name }}</h5>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-footer">
              <span class="product-price">${{ product.price }}</span>
              <button @click="addToCart(product.id)" class="btn btn-sm btn-primary btn-3d">
                <i class="bi bi-cart-plus"></i> Add
              </button>
            </div>
          </div>
          <router-link :to="`/products/${product.id}`" class="product-overlay"><span>View Details</span></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useCartStore, useWishlistStore, useAuthStore } from '@/stores/cart';
import api from '@/services/api';
const router = useRouter();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const authStore = useAuthStore();
const products = ref([]);
const categories = ref([]);
const loading = ref(true);
const selectedCategory = ref('');
onMounted(async () => {
  try {
    const [p, c] = await Promise.all([api.getProducts(), api.getCategories()]);
    products.value = p.data || [];
    categories.value = c.data || [];
  } catch (error) {
    console.error('Error:', error);
  } finally {
    loading.value = false;
  }
});
const applyFilters = async () => {
  loading.value = true;
  try {
    const params = selectedCategory.value ? { category_id: selectedCategory.value } : {};
    const response = await api.getProducts(params);
    products.value = response.data || [];
  } catch (error) {
    console.error('Error:', error);
  } finally {
    loading.value = false;
  }
};
const addToCart = async (productId) => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
    return;
  }
  try {
    await cartStore.addToCart(productId, 1);
    alert('Added to cart!');
  } catch (error) {
    alert('Failed to add to cart');
  }
};
</script>
<style lang="scss" scoped>
.products-page { min-height: 100vh; padding-top: 40px; }
.page-title { font-size: 3rem; font-weight: 900; }
.product-card { background: white; border-radius: 20px; overflow: hidden; position: relative; height: 100%; }
.product-image-wrapper { position: relative; height: 250px; overflow: hidden; }
.product-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.product-card:hover .product-image { transform: scale(1.1); }
.wishlist-btn { position: absolute; top: 15px; right: 15px; width: 45px; height: 45px; border-radius: 50%; background: white; border: none; color: #ff6b6b; font-size: 1.3rem; z-index: 10; cursor: pointer; }
.wishlist-btn.active { background: #ff6b6b; color: white; }
.product-body { padding: 20px; }
.product-category { display: inline-block; padding: 5px 15px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border-radius: 20px; font-size: 0.8rem; }
.product-title { font-size: 1.2rem; font-weight: 700; margin: 10px 0; }
.product-description { color: #7f8c8d; font-size: 0.9rem; margin-bottom: 15px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.product-footer { display: flex; justify-content: space-between; align-items: center; }
.product-price { font-size: 1.5rem; font-weight: 800; color: #27ae60; }
.product-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95)); display: flex; align-items: center; justify-content: center; opacity: 0; transition: all 0.3s ease; text-decoration: none; color: white; font-size: 1.2rem; font-weight: 600; }
.product-overlay:hover { opacity: 1; }
</style>
'@

'ProductDetails.vue' = @'
<template>
  <div class="product-details container py-5">
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;"></div>
    </div>
    <div v-else-if="product" class="row g-5">
      <div class="col-lg-6">
        <div class="product-image-container card-3d">
          <img :src="product.image || 'https://via.placeholder.com/600'" :alt="product.name" class="img-fluid rounded-3 shadow-3d float-animation" />
        </div>
      </div>
      <div class="col-lg-6">
        <div class="product-info slide-in">
          <span class="badge bg-primary mb-3 pulse-animation">{{ product.category?.name }}</span>
          <h1 class="product-title">{{ product.name }}</h1>
          <div class="product-price mb-4">
            <span class="current-price">${{ product.price }}</span>
          </div>
          <p class="product-description">{{ product.description }}</p>
          <div class="product-meta mb-4">
            <div class="meta-item">
              <i class="bi bi-check-circle text-success"></i>
              <span>{{ product.is_available ? 'In Stock' : 'Out of Stock' }}</span>
            </div>
            <div class="meta-item" v-if="product.size">
              <i class="bi bi-cup"></i>
              <span>Size: {{ product.size }}</span>
            </div>
          </div>
          <div class="quantity-selector mb-4">
            <label class="form-label fw-bold">Quantity:</label>
            <div class="input-group" style="width: 150px;">
              <button class="btn btn-outline-secondary btn-3d" @click="quantity > 1 && quantity--">
                <i class="bi bi-dash"></i>
              </button>
              <input type="number" v-model.number="quantity" class="form-control text-center" min="1" />
              <button class="btn btn-outline-secondary btn-3d" @click="quantity++">
                <i class="bi bi-plus"></i>
              </button>
            </div>
          </div>
          <div class="action-buttons d-flex gap-3">
            <button @click="addToCart" class="btn btn-primary btn-lg btn-3d flex-grow-1">
              <i class="bi bi-cart-plus"></i> Add to Cart
            </button>
            <button @click="toggleWishlist" class="btn btn-outline-danger btn-lg btn-3d" :class="{ 'active': isInWishlist }">
              <i class="bi" :class="isInWishlist ? 'bi-heart-fill' : 'bi-heart'"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore, useWishlistStore, useAuthStore } from '@/stores/cart';
import api from '@/services/api';
const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const authStore = useAuthStore();
const product = ref(null);
const loading = ref(true);
const quantity = ref(1);
const isInWishlist = computed(() => product.value && wishlistStore.isInWishlist(product.value.id));
onMounted(async () => {
  try {
    const response = await api.getProduct(route.params.id);
    product.value = response.data;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    loading.value = false;
  }
});
const addToCart = async () => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
    return;
  }
  try {
    await cartStore.addToCart(product.value.id, quantity.value);
    alert('Added to cart!');
  } catch (error) {
    alert('Failed to add to cart');
  }
};
const toggleWishlist = () => {
  wishlistStore.toggleWishlist(product.value);
};
</script>
<style lang="scss" scoped>
.product-details { min-height: 100vh; padding-top: 40px; }
.product-image-container { background: white; padding: 30px; border-radius: 20px; }
.product-title { font-size: 2.5rem; font-weight: 900; color: #2c3e50; margin-bottom: 20px; }
.current-price { font-size: 3rem; font-weight: 900; background: linear-gradient(135deg, #667eea, #764ba2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.product-description { font-size: 1.1rem; color: #7f8c8d; line-height: 1.8; margin-bottom: 30px; }
.product-meta { display: flex; gap: 30px; }
.meta-item { display: flex; align-items: center; gap: 10px; font-size: 1.1rem; }
.meta-item i { font-size: 1.3rem; }
.action-buttons .btn.active { background: #ff6b6b; border-color: #ff6b6b; color: white; }
</style>
'@

'CategoryProducts.vue' = @'
<template>
  <div class="category-products container py-5">
    <h1 class="page-title text-center mb-3 slide-in">
      <span class="text-gradient">{{ category?.name }}</span>
    </h1>
    <p class="text-center text-muted mb-5">{{ category?.description }}</p>
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;"></div>
    </div>
    <div v-else class="row g-4">
      <div v-for="product in products" :key="product.id" class="col-lg-3 col-md-4 col-sm-6">
        <div class="product-card card-3d">
          <div class="product-image-wrapper">
            <img :src="product.image || 'https://via.placeholder.com/300'" :alt="product.name" class="product-image" />
            <button @click="wishlistStore.toggleWishlist(product)" class="wishlist-btn btn-3d" :class="{ 'active': wishlistStore.isInWishlist(product.id) }">
              <i class="bi" :class="wishlistStore.isInWishlist(product.id) ? 'bi-heart-fill' : 'bi-heart'"></i>
            </button>
          </div>
          <div class="product-body">
            <h5 class="product-title">{{ product.name }}</h5>
            <p class="product-description">{{ product.description }}</p>
            <div class="product-footer">
              <span class="product-price">${{ product.price }}</span>
              <button @click="addToCart(product.id)" class="btn btn-sm btn-primary btn-3d">
                <i class="bi bi-cart-plus"></i>
              </button>
            </div>
          </div>
          <router-link :to="`/products/${product.id}`" class="product-overlay"><span>View Details</span></router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCartStore, useWishlistStore, useAuthStore } from '@/stores/cart';
import api from '@/services/api';
const route = useRoute();
const router = useRouter();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const authStore = useAuthStore();
const category = ref(null);
const products = ref([]);
const loading = ref(true);
onMounted(async () => {
  try {
    const [catRes, prodRes] = await Promise.all([
      api.getCategory(route.params.id),
      api.getProducts({ category_id: route.params.id })
    ]);
    category.value = catRes.data;
    products.value = prodRes.data || [];
  } catch (error) {
    console.error('Error:', error);
  } finally {
    loading.value = false;
  }
});
const addToCart = async (productId) => {
  if (!authStore.isAuthenticated) {
    router.push('/login');
    return;
  }
  try {
    await cartStore.addToCart(productId, 1);
    alert('Added to cart!');
  } catch (error) {
    alert('Failed');
  }
};
</script>
<style lang="scss" scoped>
.category-products { min-height: 100vh; }
.page-title { font-size: 3rem; font-weight: 900; }
.product-card { background: white; border-radius: 20px; overflow: hidden; position: relative; height: 100%; }
.product-image-wrapper { position: relative; height: 250px; overflow: hidden; }
.product-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.product-card:hover .product-image { transform: scale(1.1); }
.wishlist-btn { position: absolute; top: 15px; right: 15px; width: 45px; height: 45px; border-radius: 50%; background: white; border: none; color: #ff6b6b; font-size: 1.3rem; z-index: 10; cursor: pointer; }
.wishlist-btn.active { background: #ff6b6b; color: white; }
.product-body { padding: 20px; }
.product-title { font-size: 1.2rem; font-weight: 700; margin-bottom: 10px; }
.product-description { color: #7f8c8d; font-size: 0.9rem; margin-bottom: 15px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.product-footer { display: flex; justify-content: space-between; align-items: center; }
.product-price { font-size: 1.5rem; font-weight: 800; color: #27ae60; }
.product-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, rgba(102, 126, 234, 0.95), rgba(118, 75, 162, 0.95)); display: flex; align-items: center; justify-content: center; opacity: 0; transition: all 0.3s ease; text-decoration: none; color: white; font-size: 1.2rem; font-weight: 600; }
.product-overlay:hover { opacity: 1; }
</style>
'@

}

# Write all files
Write-Host "`nCreating view files..." -ForegroundColor Yellow
foreach ($file in $viewFiles.Keys) {
    $filePath = Join-Path $baseView $file
    $viewFiles[$file] | Out-File -FilePath $filePath -Encoding UTF8 -Force
    Write-Host "  ✓ $file" -ForegroundColor Green
}

Write-Host "`n✅ All view files created successfully!" -ForegroundColor Green
Write-Host "`nNext: Run the following command to start the dev server:" -ForegroundColor Cyan
Write-Host "  cd frontend" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
'@
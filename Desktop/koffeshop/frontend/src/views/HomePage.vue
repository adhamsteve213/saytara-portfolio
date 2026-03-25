<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="hero-title slide-in">
              Welcome to <span class="text-gradient">Koffeshop</span>
            </h1>
            <p class="hero-subtitle slide-in" style="animation-delay: 0.2s">
              Discover the perfect blend of taste and quality. From freshly
              brewed coffee to delicious pastries.
            </p>
            <div class="hero-buttons slide-in" style="animation-delay: 0.4s">
              <router-link
                to="/products"
                class="btn btn-lg btn-3d btn-primary me-3"
              >
                <i class="bi bi-cup-hot"></i> Explore Menu
              </router-link>
              <router-link
                to="/about"
                class="btn btn-lg btn-3d btn-outline-light"
              >
                Learn More
              </router-link>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-image float-animation">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800"
                alt="Coffee"
                class="img-fluid rounded-3 shadow-3d"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured-section py-5">
      <div class="container">
        <h2 class="section-title text-center mb-5">
          <span class="text-gradient">Featured Products</span>
        </h2>

        <div v-if="loading" class="text-center py-5">
          <div
            class="spinner-border text-primary"
            style="width: 3rem; height: 3rem"
            role="status"
          ></div>
        </div>

        <div v-else class="row g-4">
          <div
            v-for="(product, index) in featuredProducts"
            :key="product.id"
            class="col-lg-3 col-md-4 col-sm-6"
          >
            <div
              class="product-card card-3d"
              :style="{ animationDelay: `${index * 0.1}s` }"
              @click="goToProduct(product.id)"
            >
              <div class="product-image-wrapper">
                <img
                  :src="product.image || '/placeholder.jpg'"
                  :alt="product.name"
                  class="product-image"
                />
                <button
                  @click.stop="toggleWishlist(product)"
                  class="wishlist-btn btn-3d"
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
              <div class="product-body">
                <span class="product-category">{{
                  product.category?.name
                }}</span>
                <h5 class="product-title">{{ product.name }}</h5>
                <p class="product-description">{{ product.description }}</p>
                <div class="product-footer">
                  <span class="product-price">${{ product.price }}</span>
                  <div class="quantity-controls" @click.stop>
                    <button
                      @click="decreaseQuantity(product.id)"
                      class="qty-btn"
                    >
                      <i class="bi bi-dash"></i>
                    </button>
                    <span class="qty-value">{{
                      productQuantities[product.id] || 1
                    }}</span>
                    <button
                      @click="increaseQuantity(product.id)"
                      class="qty-btn"
                    >
                      <i class="bi bi-plus"></i>
                    </button>
                  </div>
                </div>
                <button
                  @click.stop="addToCartHandler(product.id)"
                  class="btn btn-sm btn-3d btn-primary w-100 mt-2"
                >
                  <i class="bi bi-cart-plus"></i> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-5">
          <router-link
            to="/products"
            class="btn btn-lg btn-3d btn-primary pulse-animation"
          >
            View All Products <i class="bi bi-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section
      class="categories-section py-5"
      style="background: rgba(255, 255, 255, 0.05)"
    >
      <div class="container">
        <h2 class="section-title text-center mb-5">
          <span class="text-gradient">Browse Categories</span>
        </h2>

        <div class="row g-4">
          <div
            v-for="category in categories"
            :key="category.id"
            class="col-lg-3 col-md-4 col-sm-6"
          >
            <router-link
              :to="`/category/${category.id}`"
              class="category-card card-3d"
            >
              <div class="category-image">
                <img
                  :src="category.image || '/placeholder.jpg'"
                  :alt="category.name"
                />
              </div>
              <div class="category-overlay">
                <h5>{{ category.name }}</h5>
                <p>{{ category.description }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section py-5">
      <div class="container">
        <div class="row g-4">
          <div class="col-lg-3 col-md-6">
            <div class="feature-card card-3d text-center">
              <div class="feature-icon">
                <i class="bi bi-truck"></i>
              </div>
              <h5>Fast Delivery</h5>
              <p>Quick and reliable delivery to your doorstep</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="feature-card card-3d text-center">
              <div class="feature-icon">
                <i class="bi bi-award"></i>
              </div>
              <h5>Premium Quality</h5>
              <p>Only the finest ingredients and products</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="feature-card card-3d text-center">
              <div class="feature-icon">
                <i class="bi bi-shield-check"></i>
              </div>
              <h5>Secure Payment</h5>
              <p>Safe and secure payment methods</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="feature-card card-3d text-center">
              <div class="feature-icon">
                <i class="bi bi-headset"></i>
              </div>
              <h5>24/7 Support</h5>
              <p>Always here to help you</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { useWishlistStore } from "@/stores/wishlist";
import { useAuthStore } from "@/stores/auth";
import api from "@/services/api";

const router = useRouter();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const authStore = useAuthStore();

const featuredProducts = ref([]);
const categories = ref([]);
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

onMounted(async () => {
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      api.getFeaturedProducts(),
      api.getCategories(),
    ]);

    featuredProducts.value = productsRes.data || [];
    categories.value = categoriesRes.data || [];
  } catch (error) {
    console.error("Error loading data:", error);
  } finally {
    loading.value = false;
  }
});

const addToCartHandler = async (productId) => {
  if (!authStore.isAuthenticated) {
    router.push("/login");
    return;
  }

  try {
    const quantity = productQuantities[productId] || 1;
    await cartStore.addToCart(productId, quantity);
    alert(`Added ${quantity} item(s) to cart!`);
  } catch (error) {
    console.error("Error adding to cart:", error);
    alert("Failed to add product to cart");
  }
};

const toggleWishlist = (product) => {
  wishlistStore.toggleWishlist(product);
};
</script>

<style lang="scss" scoped>
.home-page {
  min-height: 100vh;
}

.hero-section {
  min-height: 90vh;
  display: flex;
  align-items: center;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.9) 0%,
    rgba(118, 75, 162, 0.9) 100%
  );
  color: white;
  padding: 100px 0;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 20px;

  span {
    display: inline-block;
    animation: float 3s ease-in-out infinite;
  }
}

.hero-subtitle {
  font-size: 1.3rem;
  margin-bottom: 30px;
  opacity: 0.95;
}

.hero-image img {
  border-radius: 20px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 50px;
}

.product-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  height: 100%;
  animation: slideIn 0.6s ease-out both;
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
  transform: scale(1.1) rotate(2deg);
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

  &.active {
    background: #ff6b6b;
    color: white;
    animation: pulse3d 0.3s ease;
  }
}

.product-body {
  padding: 20px;
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

.product-category {
  display: inline-block;
  padding: 5px 15px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-bottom: 10px;
}

.product-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin: 10px 0;
  color: #2c3e50;
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
  margin-bottom: 10px;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #f8f9fa;
  padding: 5px;
  border-radius: 25px;
}

.qty-btn {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: scale(0.95);
  }
}

.qty-value {
  min-width: 30px;
  text-align: center;
  font-weight: 600;
  font-size: 0.95rem;
  color: #2c3e50;
}

.product-card {
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }
}

.category-card {
  display: block;
  position: relative;
  height: 250px;
  border-radius: 20px;
  overflow: hidden;
  text-decoration: none;
}

.category-image {
  width: 100%;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
}

.category-card:hover .category-image img {
  transform: scale(1.2);
}

.category-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;

  h5 {
    font-weight: 700;
    margin-bottom: 5px;
  }

  p {
    font-size: 0.9rem;
    margin: 0;
    opacity: 0.9;
  }
}

.feature-card {
  background: white;
  padding: 40px 20px;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.feature-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  animation: float 3s ease-in-out infinite;
}

.feature-card h5 {
  font-weight: 700;
  margin-bottom: 10px;
  color: #2c3e50;
}

.feature-card p {
  color: #7f8c8d;
  margin: 0;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.1rem;
  }

  .section-title {
    font-size: 2rem;
  }
}
</style>

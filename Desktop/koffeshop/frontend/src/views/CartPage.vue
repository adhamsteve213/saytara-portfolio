<template>
  <div class="cart-page container py-5">
    <h1 class="page-title text-center mb-5 slide-in">
      <span class="text-gradient">Shopping Cart</span>
    </h1>

    <div
      v-if="cartStore.items.length === 0"
      class="empty-cart text-center py-5 card-3d bg-white rounded"
    >
      <i class="bi bi-cart-x display-1 text-muted mb-3"></i>
      <h3>Your cart is empty</h3>
      <p class="text-muted">Add some delicious items to your cart!</p>
      <router-link to="/products" class="btn btn-primary btn-3d mt-3">
        <i class="bi bi-cup-hot"></i> Browse Products
      </router-link>
    </div>

    <div v-else class="row g-4">
      <div class="col-lg-8">
        <div class="cart-items">
          <div
            v-for="item in cartStore.items"
            :key="item.id"
            class="cart-item card-3d bg-white rounded mb-3 p-3"
          >
            <div class="row align-items-center g-3">
              <div class="col-md-2">
                <img
                  :src="
                    item.product?.image || 'https://via.placeholder.com/150'
                  "
                  :alt="item.product?.name"
                  class="img-fluid rounded"
                />
              </div>
              <div class="col-md-4">
                <h5 class="mb-1">{{ item.product?.name }}</h5>
                <p class="text-muted small mb-0">
                  {{ item.product?.category?.name }}
                </p>
              </div>
              <div class="col-md-2">
                <div class="quantity-controls">
                  <button
                    @click="updateQuantity(item, item.quantity - 1)"
                    class="btn btn-sm btn-outline-secondary"
                    :disabled="item.quantity <= 1"
                  >
                    <i class="bi bi-dash"></i>
                  </button>
                  <span class="mx-3 fw-bold">{{ item.quantity }}</span>
                  <button
                    @click="updateQuantity(item, item.quantity + 1)"
                    class="btn btn-sm btn-outline-secondary"
                  >
                    <i class="bi bi-plus"></i>
                  </button>
                </div>
              </div>
              <div class="col-md-2">
                <p class="price mb-0 fw-bold text-success">
                  ${{ (item.price * item.quantity).toFixed(2) }}
                </p>
              </div>
              <div class="col-md-2">
                <button
                  @click="removeItem(item.id)"
                  class="btn btn-sm btn-danger btn-3d w-100"
                >
                  <i class="bi bi-trash"></i> Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="cart-summary card-3d bg-white rounded p-4">
          <h4 class="mb-4">Order Summary</h4>
          <div class="d-flex justify-content-between mb-2">
            <span>Subtotal:</span>
            <span class="fw-bold">${{ cartStore.total.toFixed(2) }}</span>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <span>Tax (10%):</span>
            <span class="fw-bold"
              >${{ (cartStore.total * 0.1).toFixed(2) }}</span
            >
          </div>
          <hr />
          <div class="d-flex justify-content-between mb-4">
            <span class="fw-bold fs-5">Total:</span>
            <span class="fw-bold fs-4 text-success"
              >${{ (cartStore.total * 1.1).toFixed(2) }}</span
            >
          </div>
          <router-link
            to="/checkout"
            class="btn btn-primary btn-3d w-100 mb-2 pulse-animation"
          >
            <i class="bi bi-credit-card"></i> Proceed to Checkout
          </router-link>
          <router-link
            to="/products"
            class="btn btn-outline-secondary btn-3d w-100"
          >
            <i class="bi bi-arrow-left"></i> Continue Shopping
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();

onMounted(async () => {
  await cartStore.fetchCart();
});

const updateQuantity = async (item, newQuantity) => {
  if (newQuantity < 1) return;
  try {
    await cartStore.updateQuantity(item.id, newQuantity);
  } catch (error) {
    alert("Failed to update quantity");
  }
};

const removeItem = async (itemId) => {
  if (confirm("Remove this item from cart?")) {
    try {
      await cartStore.removeItem(itemId);
    } catch (error) {
      alert("Failed to remove item");
    }
  }
};
</script>

<style lang="scss" scoped>
.cart-page {
  min-height: 100vh;
  padding-top: 40px;
}

.page-title {
  font-size: 3rem;
  font-weight: 900;
}

.empty-cart {
  padding: 60px 20px;
}

.cart-item {
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  }

  img {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
}

.quantity-controls {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-summary {
  position: sticky;
  top: 100px;
}

.price {
  font-size: 1.3rem;
}

@media (max-width: 768px) {
  .cart-item {
    .row > div {
      text-align: center;
    }
  }
}
</style>

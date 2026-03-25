<template>
  <div class="checkout-page">
    <div class="container py-5">
      <h1 class="text-gradient text-center mb-5 float-animation">Checkout</h1>

      <div class="row">
        <div class="col-lg-7">
          <div class="checkout-form card-3d bg-white p-4 rounded mb-4">
            <h3 class="mb-4">Shipping Information</h3>
            <form @submit.prevent="placeOrder">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">First Name</label>
                  <input
                    v-model="form.firstName"
                    type="text"
                    class="form-control"
                    required
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Last Name</label>
                  <input
                    v-model="form.lastName"
                    type="text"
                    class="form-control"
                    required
                  />
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Email</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="form-control"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Phone Number</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  class="form-control"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Address</label>
                <input
                  v-model="form.address"
                  type="text"
                  class="form-control"
                  required
                />
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">City</label>
                  <input
                    v-model="form.city"
                    type="text"
                    class="form-control"
                    required
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Postal Code</label>
                  <input
                    v-model="form.postalCode"
                    type="text"
                    class="form-control"
                    required
                  />
                </div>
              </div>

              <h3 class="mt-4 mb-3">Payment Method</h3>
              <div class="payment-methods mb-4">
                <div class="form-check mb-2">
                  <input
                    v-model="form.paymentMethod"
                    class="form-check-input"
                    type="radio"
                    value="cash"
                    id="cash"
                    checked
                  />
                  <label class="form-check-label" for="cash">
                    <i class="bi bi-cash-coin me-2"></i> Cash on Delivery
                  </label>
                </div>
                <div class="form-check mb-2">
                  <input
                    v-model="form.paymentMethod"
                    class="form-check-input"
                    type="radio"
                    value="card"
                    id="card"
                  />
                  <label class="form-check-label" for="card">
                    <i class="bi bi-credit-card me-2"></i> Credit/Debit Card
                  </label>
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Order Notes (Optional)</label>
                <textarea
                  v-model="form.notes"
                  class="form-control"
                  rows="3"
                  placeholder="Any special instructions?"
                ></textarea>
              </div>
            </form>
          </div>
        </div>

        <div class="col-lg-5">
          <div class="order-summary card-3d bg-white p-4 rounded">
            <h3 class="mb-4">Order Summary</h3>

            <div class="summary-items mb-3">
              <div
                v-for="item in cartStore.items"
                :key="item.id"
                class="summary-item d-flex justify-content-between mb-2"
              >
                <span>{{ item.product.name }} x {{ item.quantity }}</span>
                <span
                  >${{ (item.product.price * item.quantity).toFixed(2) }}</span
                >
              </div>
            </div>

            <hr />

            <div class="summary-totals">
              <div class="d-flex justify-content-between mb-2">
                <span>Subtotal:</span>
                <span>${{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span>Tax (10%):</span>
                <span>${{ tax.toFixed(2) }}</span>
              </div>
              <div class="d-flex justify-content-between mb-3 fs-5 fw-bold">
                <span>Total:</span>
                <span class="text-primary">${{ total.toFixed(2) }}</span>
              </div>
            </div>

            <button
              @click="placeOrder"
              class="btn btn-primary btn-3d w-100"
              :disabled="loading || cartStore.items.length === 0"
            >
              <span
                v-if="loading"
                class="spinner-border spinner-border-sm me-2"
              ></span>
              {{ loading ? "Placing Order..." : "Place Order" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import { useAuthStore } from "@/stores/auth";
import api from "@/services/api";

const router = useRouter();
const cartStore = useCartStore();
const authStore = useAuthStore();

const form = ref({
  firstName: "",
  lastName: "",
  email: authStore.user?.email || "",
  phone: "",
  address: "",
  city: "",
  postalCode: "",
  paymentMethod: "cash",
  notes: "",
});

const loading = ref(false);

const subtotal = computed(() => cartStore.cartTotal);
const tax = computed(() => subtotal.value * 0.1);
const total = computed(() => subtotal.value + tax.value);

const placeOrder = async () => {
  if (cartStore.items.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  loading.value = true;
  try {
    console.log("Placing order with:", {
      payment_method: form.value.paymentMethod,
      notes: form.value.notes,
    });
    const response = await api.orders.create({
      payment_method: form.value.paymentMethod,
      notes: form.value.notes,
    });
    console.log("Order placed response:", response);

    await cartStore.clearCart();
    alert("Order placed successfully!");
    router.push("/orders");
  } catch (error) {
    alert("Failed to place order. Please try again.");
    console.error("Order error:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.checkout-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.checkout-form,
.order-summary {
  animation: slideIn 0.6s ease-out;
}

.summary-item {
  font-size: 0.95rem;
  color: #666;
}

.summary-totals {
  border-top: 2px solid #eee;
  padding-top: 1rem;
}

.payment-methods {
  .form-check-label {
    cursor: pointer;
    padding: 10px;
    border: 2px solid #eee;
    border-radius: 8px;
    display: block;
    transition: all 0.3s ease;

    &:hover {
      background-color: #f8f9fa;
      border-color: var(--primary-color);
    }
  }

  .form-check-input:checked + .form-check-label {
    background-color: #f0f8ff;
    border-color: var(--primary-color);
  }
}
</style>

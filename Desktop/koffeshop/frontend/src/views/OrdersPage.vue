<template>
  <div class="orders-page">
    <div class="container py-5">
      <h1 class="text-gradient text-center mb-5 float-animation">My Orders</h1>

      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status"></div>
      </div>

      <div v-else-if="orders.length > 0" class="orders-list">
        <div
          v-for="order in orders"
          :key="order.id"
          class="order-card card-3d bg-white rounded p-4 mb-4"
        >
          <div class="row align-items-center">
            <div class="col-md-8">
              <div class="d-flex align-items-center mb-3">
                <h4 class="mb-0 me-3">Order #{{ order.order_number }}</h4>
                <span class="badge" :class="getStatusBadgeClass(order.status)">
                  {{ order.status }}
                </span>
                <span class="badge bg-info ms-2">{{
                  order.payment_status
                }}</span>
              </div>

              <div class="order-info">
                <p class="mb-1">
                  <i class="bi bi-calendar me-2"></i>
                  <strong>Date:</strong> {{ formatDate(order.created_at) }}
                </p>
                <p class="mb-1">
                  <i class="bi bi-credit-card me-2"></i>
                  <strong>Payment:</strong> {{ order.payment_method }}
                </p>
                <p class="mb-0" v-if="order.notes">
                  <i class="bi bi-sticky me-2"></i>
                  <strong>Notes:</strong> {{ order.notes }}
                </p>
              </div>

              <div class="order-items mt-3">
                <h6 class="text-muted">Items:</h6>
                <ul class="list-unstyled">
                  <li
                    v-for="item in order.order_items"
                    :key="item.id"
                    class="mb-1"
                  >
                    {{ item.product.name }} x {{ item.quantity }} - ${{
                      item.subtotal
                    }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="col-md-4 text-md-end">
              <div class="order-total mb-3">
                <p class="mb-1 text-muted">Subtotal: ${{ order.subtotal }}</p>
                <p class="mb-1 text-muted">Tax: ${{ order.tax }}</p>
                <h3 class="text-primary mb-0">${{ order.total }}</h3>
              </div>

              <button
                v-if="order.status === 'pending'"
                @click="cancelOrder(order.id)"
                class="btn btn-outline-danger btn-sm"
              >
                <i class="bi bi-x-circle me-1"></i> Cancel Order
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-5">
        <i class="bi bi-bag-x" style="font-size: 5rem; opacity: 0.3"></i>
        <h3 class="mt-3 text-muted">No Orders Yet</h3>
        <p class="text-muted">Start shopping to create your first order!</p>
        <router-link to="/products" class="btn btn-primary btn-3d mt-3">
          <i class="bi bi-shop me-2"></i> Browse Products
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";

const orders = ref([]);
const loading = ref(true);

const fetchOrders = async () => {
  loading.value = true;
  try {
    const response = await api.orders.getAll();
    console.log("User Orders Response:", response);
    if (response && response.data) {
      orders.value = response.data;
    } else {
      orders.value = [];
    }
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    orders.value = [];
  } finally {
    loading.value = false;
  }
};

const cancelOrder = async (orderId) => {
  if (!confirm("Are you sure you want to cancel this order?")) {
    return;
  }

  try {
    await api.orders.cancel(orderId);
    await fetchOrders();
    alert("Order cancelled successfully");
  } catch (error) {
    alert("Failed to cancel order");
    console.error("Cancel error:", error);
  }
};

const getStatusBadgeClass = (status) => {
  const classes = {
    pending: "bg-warning",
    confirmed: "bg-info",
    processing: "bg-primary",
    shipped: "bg-success",
    delivered: "bg-success",
    cancelled: "bg-danger",
  };
  return classes[status] || "bg-secondary";
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

onMounted(() => {
  fetchOrders();
});
</script>

<style lang="scss" scoped>
.orders-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.order-card {
  animation: slideIn 0.6s ease-out;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
}

.order-info {
  p {
    color: #666;

    i {
      color: var(--primary-color);
    }
  }
}

.order-items {
  background-color: #f8f9fa;
  padding: 15px;
  border-radius: 8px;

  ul li {
    padding: 5px 0;
    border-bottom: 1px solid #e0e0e0;

    &:last-child {
      border-bottom: none;
    }
  }
}

.order-total {
  h3 {
    font-size: 2rem;
    font-weight: bold;
  }
}
</style>

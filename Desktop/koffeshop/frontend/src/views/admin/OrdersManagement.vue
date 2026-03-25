<template>
  <div class="orders-management">
    <h2 class="mb-4">Orders Management</h2>

    <div class="filter-bar mb-4">
      <div class="row">
        <div class="col-md-4">
          <select
            v-model="statusFilter"
            @change="filterOrders"
            class="form-select"
          >
            <option value="">All Orders</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
    </div>

    <div v-else class="table-responsive">
      <table class="table table-hover bg-white rounded">
        <thead class="table-dark">
          <tr>
            <th>Order #</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Items</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in filteredOrders" :key="order.id">
            <td>
              <strong>{{ order.order_number }}</strong>
            </td>
            <td>{{ order.user?.name || "N/A" }}</td>
            <td>{{ formatDate(order.created_at) }}</td>
            <td>{{ order.order_items?.length || 0 }} items</td>
            <td>
              <strong>${{ order.total }}</strong>
            </td>
            <td>
              <span class="badge bg-info mb-1">{{ order.payment_method }}</span>
              <select
                v-model="order.payment_status"
                @change="updatePaymentStatus(order.id, order.payment_status)"
                class="form-select form-select-sm mt-1"
                :class="
                  order.payment_status === 'paid'
                    ? 'border-success text-success'
                    : 'border-warning text-warning'
                "
              >
                <option value="unpaid">Unpaid</option>
                <option value="paid">Paid</option>
                <option value="refunded">Refunded</option>
              </select>
            </td>
            <td>
              <select
                v-model="order.status"
                @change="updateOrderStatus(order.id, order.status)"
                class="form-select form-select-sm"
                :class="getStatusClass(order.status)"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </td>
            <td>
              <button
                class="btn btn-sm btn-info"
                @click="viewOrderDetails(order)"
              >
                <i class="bi bi-eye"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Order Details Modal -->
    <div
      v-if="showDetailsModal"
      class="modal-backdrop"
      @click="showDetailsModal = false"
    >
      <div class="modal-dialog modal-lg" @click.stop>
        <div class="modal-content">
          <div class="modal-header">
            <h5>Order Details - #{{ selectedOrder?.order_number }}</h5>
            <button
              class="btn-close"
              @click="showDetailsModal = false"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row mb-3">
              <div class="col-md-6">
                <h6>Customer Information</h6>
                <p><strong>Name:</strong> {{ selectedOrder?.user?.name }}</p>
                <p><strong>Email:</strong> {{ selectedOrder?.user?.email }}</p>
              </div>
              <div class="col-md-6">
                <h6>Order Information</h6>
                <p>
                  <strong>Date:</strong>
                  {{ formatDate(selectedOrder?.created_at) }}
                </p>
                <p>
                  <strong>Payment:</strong> {{ selectedOrder?.payment_method }}
                </p>
                <p>
                  <strong>Status:</strong>
                  <span
                    class="badge"
                    :class="getStatusBadgeClass(selectedOrder?.status)"
                  >
                    {{ selectedOrder?.status }}
                  </span>
                </p>
              </div>
            </div>

            <h6>Order Items</h6>
            <table class="table table-sm">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in selectedOrder?.order_items" :key="item.id">
                  <td>{{ item.product?.name }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>${{ item.price }}</td>
                  <td>${{ item.subtotal }}</td>
                </tr>
              </tbody>
            </table>

            <div class="text-end mt-3">
              <p><strong>Subtotal:</strong> ${{ selectedOrder?.subtotal }}</p>
              <p><strong>Tax:</strong> ${{ selectedOrder?.tax }}</p>
              <h5>
                <strong>Total:</strong>
                <span class="text-primary">${{ selectedOrder?.total }}</span>
              </h5>
            </div>

            <div v-if="selectedOrder?.notes" class="mt-3">
              <h6>Order Notes</h6>
              <p class="bg-light p-3 rounded">{{ selectedOrder.notes }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import api from "@/services/api";

const orders = ref([]);
const loading = ref(true);
const statusFilter = ref("");
const showDetailsModal = ref(false);
const selectedOrder = ref(null);

const filteredOrders = computed(() => {
  if (!statusFilter.value) return orders.value;
  return orders.value.filter((order) => order.status === statusFilter.value);
});

const fetchOrders = async () => {
  loading.value = true;
  try {
    const response = await api.orders.getAllAdmin();
    console.log("Admin Orders Response:", response);
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

const updateOrderStatus = async (orderId, status) => {
  try {
    await api.orders.updateStatus(orderId, { status });
    await fetchOrders();
  } catch (error) {
    alert("Failed to update order status");
    console.error("Update error:", error);
    await fetchOrders();
  }
};

const updatePaymentStatus = async (orderId, status) => {
  try {
    await api.orders.updateStatus(orderId, { payment_status: status });
    await fetchOrders();
  } catch (error) {
    alert("Failed to update payment status");
    console.error("Update error:", error);
    await fetchOrders();
  }
};

const viewOrderDetails = (order) => {
  selectedOrder.value = order;
  showDetailsModal.value = true;
};

const filterOrders = () => {
  // Triggers computed property
};

const getStatusClass = (status) => {
  const classes = {
    pending: "bg-warning",
    confirmed: "bg-info",
    processing: "bg-primary",
    shipped: "bg-success",
    delivered: "bg-success",
    cancelled: "bg-danger",
  };
  return classes[status] || "";
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
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

onMounted(() => {
  fetchOrders();
});
</script>

<style lang="scss" scoped>
.orders-management {
  animation: slideIn 0.6s ease-out;
}

.filter-bar {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.modal-dialog {
  background: white;
  border-radius: 10px;
  max-width: 900px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideIn 0.3s ease-out;
}

.modal-header {
  padding: 20px;
  border-bottom: 1px solid #dee2e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-body {
  padding: 20px;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;

  &:before {
    content: "×";
  }
}
</style>

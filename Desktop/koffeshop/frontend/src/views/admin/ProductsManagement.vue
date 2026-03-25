<template>
  <div class="products-management">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Products Management</h2>
      <button class="btn btn-primary btn-3d" @click="showAddModal = true">
        <i class="bi bi-plus-circle me-2"></i> Add Product
      </button>
    </div>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
    </div>

    <div v-else class="table-responsive">
      <table class="table table-hover bg-white rounded">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>{{ product.id }}</td>
            <td>
              <img
                :src="product.image || 'https://via.placeholder.com/50'"
                alt="Product"
                style="
                  width: 50px;
                  height: 50px;
                  object-fit: cover;
                  border-radius: 5px;
                "
              />
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.category?.name }}</td>
            <td>${{ product.price }}</td>
            <td>{{ product.stock_quantity }}</td>
            <td>
              <span
                class="badge"
                :class="product.is_available ? 'bg-success' : 'bg-danger'"
              >
                {{ product.is_available ? "Available" : "Unavailable" }}
              </span>
            </td>
            <td>
              <span
                class="badge"
                :class="product.is_featured ? 'bg-warning' : 'bg-secondary'"
              >
                {{ product.is_featured ? "Featured" : "Normal" }}
              </span>
            </td>
            <td>
              <button
                class="btn btn-sm btn-warning me-1"
                @click="editProduct(product)"
              >
                <i class="bi bi-pencil"></i>
              </button>
              <button
                class="btn btn-sm btn-danger"
                @click="deleteProduct(product.id)"
              >
                <i class="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add/Edit Modal -->
    <div
      v-if="showAddModal || showEditModal"
      class="modal-backdrop"
      @click="closeModals"
    >
      <div class="modal-dialog" @click.stop>
        <div class="modal-content">
          <div class="modal-header">
            <h5>{{ showEditModal ? "Edit Product" : "Add Product" }}</h5>
            <button class="btn-close" @click="closeModals"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveProduct">
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input
                  v-model="productForm.name"
                  type="text"
                  class="form-control"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Category</label>
                <select
                  v-model="productForm.category_id"
                  class="form-select"
                  required
                >
                  <option value="">Select Category</option>
                  <option
                    v-for="cat in categories"
                    :key="cat.id"
                    :value="cat.id"
                  >
                    {{ cat.name }}
                  </option>
                </select>
              </div>

              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea
                  v-model="productForm.description"
                  class="form-control"
                  rows="3"
                ></textarea>
              </div>

              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Price</label>
                  <input
                    v-model.number="productForm.price"
                    type="number"
                    step="0.01"
                    class="form-control"
                    required
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Stock Quantity</label>
                  <input
                    v-model.number="productForm.stock_quantity"
                    type="number"
                    class="form-control"
                    required
                  />
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Image URL</label>
                <input
                  v-model="productForm.image"
                  type="url"
                  class="form-control"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Size</label>
                <input
                  v-model="productForm.size"
                  type="text"
                  class="form-control"
                />
              </div>

              <div class="form-check mb-3">
                <input
                  v-model="productForm.is_available"
                  class="form-check-input"
                  type="checkbox"
                  id="available"
                />
                <label class="form-check-label" for="available"
                  >Available</label
                >
              </div>

              <div class="form-check mb-3">
                <input
                  v-model="productForm.is_featured"
                  class="form-check-input"
                  type="checkbox"
                  id="featured"
                />
                <label class="form-check-label" for="featured">Featured</label>
              </div>

              <div class="d-flex gap-2">
                <button
                  type="submit"
                  class="btn btn-primary"
                  :disabled="saving"
                >
                  {{ saving ? "Saving..." : "Save" }}
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="closeModals"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/services/api";

const products = ref([]);
const categories = ref([]);
const loading = ref(true);
const saving = ref(false);
const showAddModal = ref(false);
const showEditModal = ref(false);

const productForm = ref({
  name: "",
  category_id: "",
  description: "",
  price: 0,
  stock_quantity: 0,
  image: "",
  size: "",
  is_available: true,
  is_featured: false,
});

const fetchProducts = async () => {
  loading.value = true;
  try {
    const response = await api.products.getAll();
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

const editProduct = (product) => {
  productForm.value = {
    ...product,
    category_id: product.category_id || product.category?.id,
  };
  showEditModal.value = true;
};

const saveProduct = async () => {
  saving.value = true;
  try {
    if (showEditModal.value) {
      await api.products.update(productForm.value.id, productForm.value);
    } else {
      await api.products.create(productForm.value);
    }
    await fetchProducts();
    closeModals();
    alert("Product saved successfully!");
  } catch (error) {
    alert("Failed to save product");
    console.error("Save error:", error);
  } finally {
    saving.value = false;
  }
};

const deleteProduct = async (id) => {
  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    await api.products.delete(id);
    await fetchProducts();
    alert("Product deleted successfully!");
  } catch (error) {
    alert("Failed to delete product");
    console.error("Delete error:", error);
  }
};

const closeModals = () => {
  showAddModal.value = false;
  showEditModal.value = false;
  productForm.value = {
    name: "",
    category_id: "",
    description: "",
    price: 0,
    stock_quantity: 0,
    image: "",
    size: "",
    is_available: true,
    is_featured: false,
  };
};

onMounted(() => {
  fetchProducts();
  fetchCategories();
});
</script>

<style lang="scss" scoped>
.products-management {
  animation: slideIn 0.6s ease-out;
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
  max-width: 600px;
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

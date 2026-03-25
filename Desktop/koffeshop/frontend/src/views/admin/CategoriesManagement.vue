<template>
  <div class="categories-management">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Categories Management</h2>
      <button class="btn btn-primary btn-3d" @click="showAddModal = true">
        <i class="bi bi-plus-circle me-2"></i> Add Category
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
            <th>Description</th>
            <th>Products</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td>{{ category.id }}</td>
            <td>
              <img
                :src="category.image || 'https://via.placeholder.com/50'"
                alt="Category"
                style="
                  width: 50px;
                  height: 50px;
                  object-fit: cover;
                  border-radius: 5px;
                "
              />
            </td>
            <td>
              <strong>{{ category.name }}</strong>
            </td>
            <td>{{ category.description?.substring(0, 50) }}...</td>
            <td>
              <span class="badge bg-info"
                >{{ category.products?.length || 0 }} products</span
              >
            </td>
            <td>
              <span
                class="badge"
                :class="category.is_active ? 'bg-success' : 'bg-danger'"
              >
                {{ category.is_active ? "Active" : "Inactive" }}
              </span>
            </td>
            <td>
              <button
                class="btn btn-sm btn-warning me-1"
                @click="editCategory(category)"
              >
                <i class="bi bi-pencil"></i>
              </button>
              <button
                class="btn btn-sm btn-danger"
                @click="deleteCategory(category.id)"
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
            <h5>{{ showEditModal ? "Edit Category" : "Add Category" }}</h5>
            <button class="btn-close" @click="closeModals"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveCategory">
              <div class="mb-3">
                <label class="form-label">Name</label>
                <input
                  v-model="categoryForm.name"
                  type="text"
                  class="form-control"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Description</label>
                <textarea
                  v-model="categoryForm.description"
                  class="form-control"
                  rows="3"
                ></textarea>
              </div>

              <div class="mb-3">
                <label class="form-label">Image URL</label>
                <input
                  v-model="categoryForm.image"
                  type="url"
                  class="form-control"
                />
              </div>

              <div class="form-check mb-3">
                <input
                  v-model="categoryForm.is_active"
                  class="form-check-input"
                  type="checkbox"
                  id="active"
                />
                <label class="form-check-label" for="active">Active</label>
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

const categories = ref([]);
const loading = ref(true);
const saving = ref(false);
const showAddModal = ref(false);
const showEditModal = ref(false);

const categoryForm = ref({
  name: "",
  description: "",
  image: "",
  is_active: true,
});

const fetchCategories = async () => {
  loading.value = true;
  try {
    const response = await api.categories.getAll();
    categories.value = response.data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
  } finally {
    loading.value = false;
  }
};

const editCategory = (category) => {
  categoryForm.value = { ...category };
  showEditModal.value = true;
};

const saveCategory = async () => {
  saving.value = true;
  try {
    if (showEditModal.value) {
      await api.categories.update(categoryForm.value.id, categoryForm.value);
    } else {
      await api.categories.create(categoryForm.value);
    }
    await fetchCategories();
    closeModals();
    alert("Category saved successfully!");
  } catch (error) {
    alert("Failed to save category");
    console.error("Save error:", error);
  } finally {
    saving.value = false;
  }
};

const deleteCategory = async (id) => {
  if (
    !confirm(
      "Are you sure you want to delete this category? All products in this category will be affected."
    )
  )
    return;

  try {
    await api.categories.delete(id);
    await fetchCategories();
    alert("Category deleted successfully!");
  } catch (error) {
    alert("Failed to delete category");
    console.error("Delete error:", error);
  }
};

const closeModals = () => {
  showAddModal.value = false;
  showEditModal.value = false;
  categoryForm.value = {
    name: "",
    description: "",
    image: "",
    is_active: true,
  };
};

onMounted(() => {
  fetchCategories();
});
</script>

<style lang="scss" scoped>
.categories-management {
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

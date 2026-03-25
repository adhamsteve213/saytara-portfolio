<template>
  <div class="admin-dashboard">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-3 col-lg-2 sidebar bg-dark p-0">
          <div class="sidebar-sticky">
            <div class="sidebar-header p-4 text-white">
              <h4>Admin Panel</h4>
              <p class="small mb-0">Welcome, Admin</p>
            </div>

            <nav class="nav flex-column">
              <router-link
                to="/admin"
                exact
                class="nav-link"
                active-class="active"
              >
                <i class="bi bi-speedometer2 me-2"></i> Dashboard
              </router-link>
              <router-link
                to="/admin/products"
                class="nav-link"
                active-class="active"
              >
                <i class="bi bi-box-seam me-2"></i> Products
              </router-link>
              <router-link
                to="/admin/categories"
                class="nav-link"
                active-class="active"
              >
                <i class="bi bi-tags me-2"></i> Categories
              </router-link>
              <router-link
                to="/admin/orders"
                class="nav-link"
                active-class="active"
              >
                <i class="bi bi-cart-check me-2"></i> Orders
              </router-link>
              <a href="/" class="nav-link">
                <i class="bi bi-house me-2"></i> Back to Site
              </a>
            </nav>
          </div>
        </div>

        <div class="col-md-9 col-lg-10 main-content">
          <div class="content-wrapper p-4">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const authStore = useAuthStore();

onMounted(() => {
  if (!authStore.isAdmin) {
    router.push("/");
  }
});
</script>

<style lang="scss" scoped>
.admin-dashboard {
  min-height: 100vh;
  background: #f8f9fa;
}

.sidebar {
  min-height: 100vh;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);

  .sidebar-header {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav-link {
    color: rgba(255, 255, 255, 0.7);
    padding: 15px 20px;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;

    &:hover {
      color: white;
      background-color: rgba(255, 255, 255, 0.1);
      border-left-color: #667eea;
    }

    &.active {
      color: white;
      background-color: rgba(255, 255, 255, 0.1);
      border-left-color: #667eea;
    }

    i {
      font-size: 1.2rem;
    }
  }
}

.main-content {
  padding: 0;
}

.content-wrapper {
  animation: slideIn 0.6s ease-out;
}
</style>

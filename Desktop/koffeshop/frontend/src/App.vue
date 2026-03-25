<template>
  <div id="app" :class="{ 'sidebar-open': sidebarOpen }">
    <Navbar @toggle-sidebar="sidebarOpen = !sidebarOpen" />
    <Sidebar :open="sidebarOpen" @close="sidebarOpen = false" />
    
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import Navbar from '@/components/Navbar.vue';
import Sidebar from '@/components/Sidebar.vue';
import Footer from '@/components/Footer.vue';

const sidebarOpen = ref(false);
const authStore = useAuthStore();
const cartStore = useCartStore();

onMounted(async () => {
  await authStore.fetchUser();
  if (authStore.isAuthenticated) {
    await cartStore.fetchCart();
  }
});
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.main-content {
  flex: 1;
  padding-top: 80px;
  transition: all 0.3s ease;
}

.sidebar-open .main-content {
  margin-left: 280px;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translate3d(30px, 0, 0) rotateY(-5deg);
}

.page-leave-to {
  opacity: 0;
  transform: translate3d(-30px, 0, 0) rotateY(5deg);
}
</style>

<template>
  <div class="login-page">
    <div class="container">
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-md-6 col-lg-5">
          <div class="login-card bg-white rounded p-5">
            <div class="text-center mb-4">
              <h2 class="text-gradient">Welcome Back!</h2>
              <p class="text-muted">Login to continue shopping</p>
            </div>

            <div v-if="errorMessage" class="alert alert-danger" role="alert">
              <i class="bi bi-exclamation-triangle me-2"></i>{{ errorMessage }}
            </div>

            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label class="form-label">Email Address</label>
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="bi bi-envelope"></i
                  ></span>
                  <input
                    v-model="form.email"
                    type="email"
                    class="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div class="mb-4">
                <label class="form-label">Password</label>
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="bi bi-lock"></i
                  ></span>
                  <input
                    v-model="form.password"
                    type="password"
                    class="form-control"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                class="btn btn-primary btn-3d w-100 mb-3"
                :disabled="loading"
              >
                <span
                  v-if="loading"
                  class="spinner-border spinner-border-sm me-2"
                ></span>
                {{ loading ? "Logging in..." : "Login" }}
              </button>

              <div class="text-center">
                <p class="mb-0">
                  Don't have an account?
                  <router-link to="/register" class="text-primary fw-bold"
                    >Register here</router-link
                  >
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";

const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();

const form = ref({
  email: "",
  password: "",
});
const loading = ref(false);
const errorMessage = ref("");

const handleLogin = async () => {
  errorMessage.value = "";
  loading.value = true;

  try {
    await authStore.login(form.value);
    // Fetch cart after successful login
    await cartStore.fetchCart();
    alert("Login successful! Welcome back.");
    router.push("/");
  } catch (error) {
    console.error("Login error:", error);
    if (error.response?.status === 401) {
      errorMessage.value = "Invalid email or password. Please try again.";
    } else if (error.response?.status === 422) {
      errorMessage.value = "Please provide valid email and password.";
    } else {
      errorMessage.value = "Login failed. Please try again later.";
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 500px;
    height: 500px;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 70%
    );
    top: -250px;
    right: -250px;
    animation: float 6s ease-in-out infinite;
  }

  &::after {
    content: "";
    position: absolute;
    width: 400px;
    height: 400px;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.08) 0%,
      transparent 70%
    );
    bottom: -200px;
    left: -200px;
    animation: float 8s ease-in-out infinite reverse;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  50% {
    transform: translate(30px, 30px) rotate(180deg);
  }
}

.login-card {
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
  border-radius: 25px;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.98) !important;
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.text-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 800;
  font-size: 2.2rem;
  margin-bottom: 0.5rem;
}

.alert {
  border-radius: 15px;
  border: none;
  animation: shake 0.5s ease;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
}

.form-label {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 8px;
  font-size: 0.95rem;
}

.input-group {
  margin-bottom: 0;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:focus-within {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
  }
}

.input-group-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  color: white;
  font-size: 1.1rem;
  padding: 12px 15px;
}

.form-control {
  border: none;
  padding: 12px 15px;
  font-size: 1rem;
  background: white;

  &:focus {
    box-shadow: none;
    outline: none;
  }

  &::placeholder {
    color: #adb5bd;
  }
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  padding: 14px;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  border-radius: 15px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: left 0.6s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

a {
  text-decoration: none;
  transition: all 0.3s ease;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;

  &:hover {
    transform: translateX(3px);
    text-decoration: underline;
  }
}

@media (max-width: 768px) {
  .text-gradient {
    font-size: 1.8rem;
  }

  .login-card {
    padding: 2rem !important;
  }
}
</style>

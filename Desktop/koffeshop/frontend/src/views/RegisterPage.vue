<template>
  <div class="register-page">
    <div class="container">
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-md-6 col-lg-5">
          <div class="register-card bg-white rounded p-5">
            <div class="text-center mb-4">
              <h2 class="text-gradient">Create Account</h2>
              <p class="text-muted">Join us today!</p>
            </div>

            <div v-if="errorMessage" class="alert alert-danger" role="alert">
              <i class="bi bi-exclamation-triangle me-2"></i>{{ errorMessage }}
            </div>

            <form @submit.prevent="handleRegister">
              <div class="mb-3">
                <label class="form-label">Full Name</label>
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="bi bi-person"></i
                  ></span>
                  <input
                    v-model="form.name"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': validationErrors.name }"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div
                  v-if="validationErrors.name"
                  class="invalid-feedback d-block"
                >
                  {{ validationErrors.name[0] }}
                </div>
              </div>

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
                    :class="{ 'is-invalid': validationErrors.email }"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div
                  v-if="validationErrors.email"
                  class="invalid-feedback d-block"
                >
                  {{ validationErrors.email[0] }}
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Password</label>
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="bi bi-lock"></i
                  ></span>
                  <input
                    v-model="form.password"
                    type="password"
                    class="form-control"
                    :class="{ 'is-invalid': validationErrors.password }"
                    placeholder="Create a password (min 8 characters)"
                    required
                  />
                </div>
                <div
                  v-if="validationErrors.password"
                  class="invalid-feedback d-block"
                >
                  {{ validationErrors.password[0] }}
                </div>
              </div>

              <div class="mb-4">
                <label class="form-label">Confirm Password</label>
                <div class="input-group">
                  <span class="input-group-text"
                    ><i class="bi bi-lock-fill"></i
                  ></span>
                  <input
                    v-model="form.password_confirmation"
                    type="password"
                    class="form-control"
                    placeholder="Confirm your password"
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
                {{ loading ? "Creating Account..." : "Register" }}
              </button>

              <div class="text-center">
                <p class="mb-0">
                  Already have an account?
                  <router-link to="/login" class="text-primary fw-bold"
                    >Login here</router-link
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
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
});
const loading = ref(false);
const errorMessage = ref("");
const validationErrors = ref({});

const handleRegister = async () => {
  errorMessage.value = "";
  validationErrors.value = {};

  // Client-side validation
  if (form.value.password !== form.value.password_confirmation) {
    errorMessage.value = "Passwords do not match!";
    return;
  }

  if (form.value.password.length < 8) {
    errorMessage.value = "Password must be at least 8 characters long.";
    return;
  }

  loading.value = true;
  try {
    await authStore.register(form.value);
    // Fetch cart after successful registration
    await cartStore.fetchCart();
    alert("Registration successful! Welcome to Koffeshop.");
    router.push("/");
  } catch (error) {
    console.error("Register error:", error);

    if (error.response?.status === 422) {
      // Laravel validation errors
      const errors = error.response.data.errors;
      if (errors) {
        validationErrors.value = errors;
        errorMessage.value = "Please fix the validation errors below.";
      } else {
        errorMessage.value =
          "Invalid registration data. Please check your inputs.";
      }
    } else if (error.response?.status === 409) {
      errorMessage.value =
        "Email already exists. Please use a different email or login.";
    } else {
      errorMessage.value = "Registration failed. Please try again later.";
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
.register-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.register-card {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.input-group {
  margin-bottom: 0;
}

.input-group-text {
  background-color: #f8f9fa;
  border: 1px solid #ced4da;
}

.form-control {
  border: 1px solid #ced4da;

  &:focus {
    box-shadow: 0 0 0 0.25rem rgba(102, 126, 234, 0.25);
    border-color: #667eea;
    outline: none;
  }
}
</style>

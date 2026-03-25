<template>
  <div class="contact-page">
    <div class="container py-5">
      <div class="contact-header text-center mb-5">
        <h1 class="text-gradient float-animation">Contact Us</h1>
        <p class="lead text-white">We'd love to hear from you!</p>
      </div>

      <div class="row">
        <div class="col-lg-6 mb-4">
          <div class="contact-form card-3d bg-white p-5 rounded">
            <h3 class="mb-4">Send us a Message</h3>
            <form @submit.prevent="sendMessage">
              <div class="mb-3">
                <label class="form-label">Your Name</label>
                <input
                  v-model="form.name"
                  type="text"
                  class="form-control"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Email Address</label>
                <input
                  v-model="form.email"
                  type="email"
                  class="form-control"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Subject</label>
                <input
                  v-model="form.subject"
                  type="text"
                  class="form-control"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Message</label>
                <textarea
                  v-model="form.message"
                  class="form-control"
                  rows="5"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                class="btn btn-primary btn-3d w-100"
                :disabled="loading"
              >
                <span
                  v-if="loading"
                  class="spinner-border spinner-border-sm me-2"
                ></span>
                {{ loading ? "Sending..." : "Send Message" }}
              </button>
            </form>
          </div>
        </div>

        <div class="col-lg-6 mb-4">
          <div class="contact-info card-3d bg-white p-5 rounded mb-4">
            <h3 class="mb-4">Get in Touch</h3>

            <div class="info-item mb-4">
              <div class="d-flex align-items-start">
                <i
                  class="bi bi-geo-alt-fill me-3"
                  style="font-size: 1.5rem; color: var(--primary-color)"
                ></i>
                <div>
                  <h5>Address</h5>
                  <p class="text-muted mb-0">
                    123 Coffee Street<br />Downtown District<br />City, State
                    12345
                  </p>
                </div>
              </div>
            </div>

            <div class="info-item mb-4">
              <div class="d-flex align-items-start">
                <i
                  class="bi bi-telephone-fill me-3"
                  style="font-size: 1.5rem; color: var(--primary-color)"
                ></i>
                <div>
                  <h5>Phone</h5>
                  <p class="text-muted mb-0">+1 (555) 123-4567</p>
                  <p class="text-muted mb-0">+1 (555) 987-6543</p>
                </div>
              </div>
            </div>

            <div class="info-item mb-4">
              <div class="d-flex align-items-start">
                <i
                  class="bi bi-envelope-fill me-3"
                  style="font-size: 1.5rem; color: var(--primary-color)"
                ></i>
                <div>
                  <h5>Email</h5>
                  <p class="text-muted mb-0">info@koffeshop.com</p>
                  <p class="text-muted mb-0">support@koffeshop.com</p>
                </div>
              </div>
            </div>

            <div class="info-item">
              <div class="d-flex align-items-start">
                <i
                  class="bi bi-clock-fill me-3"
                  style="font-size: 1.5rem; color: var(--primary-color)"
                ></i>
                <div>
                  <h5>Business Hours</h5>
                  <p class="text-muted mb-0">
                    Monday - Friday: 7:00 AM - 9:00 PM
                  </p>
                  <p class="text-muted mb-0">
                    Saturday - Sunday: 8:00 AM - 10:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="social-links card-3d bg-white p-4 rounded text-center">
            <h5 class="mb-3">Follow Us</h5>
            <div class="d-flex justify-content-center gap-3">
              <a href="#" class="social-icon">
                <i class="bi bi-facebook" style="font-size: 2rem"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="bi bi-instagram" style="font-size: 2rem"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="bi bi-twitter" style="font-size: 2rem"></i>
              </a>
              <a href="#" class="social-icon">
                <i class="bi bi-linkedin" style="font-size: 2rem"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const loading = ref(false);

const sendMessage = async () => {
  loading.value = true;

  // Simulate sending message
  setTimeout(() => {
    alert("Thank you for your message! We will get back to you soon.");
    form.value = {
      name: "",
      email: "",
      subject: "",
      message: "",
    };
    loading.value = false;
  }, 1500);
};
</script>

<style lang="scss" scoped>
.contact-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.contact-header {
  animation: slideIn 0.6s ease-out;
}

.contact-form,
.contact-info,
.social-links {
  animation: slideIn 0.6s ease-out;
}

.info-item {
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
}

.social-icon {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: rotateY(180deg) scale(1.1);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
  }
}
</style>

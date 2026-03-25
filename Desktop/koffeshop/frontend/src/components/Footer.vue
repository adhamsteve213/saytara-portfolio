<template>
  <footer class="footer glass-effect mt-5">
    <div class="container">
      <div class="row g-4">
        <!-- About Section -->
        <div class="col-lg-4 col-md-6">
          <h5 class="text-gradient mb-3 float-animation">☕ Koffeshop</h5>
          <p class="text-light">
            Your favorite coffee shop bringing you the finest blends and
            pastries. Experience the perfect cup, every time.
          </p>
          <div class="social-links">
            <a href="#" class="social-icon btn-3d"
              ><i class="bi bi-facebook"></i
            ></a>
            <a href="#" class="social-icon btn-3d"
              ><i class="bi bi-twitter"></i
            ></a>
            <a href="#" class="social-icon btn-3d"
              ><i class="bi bi-instagram"></i
            ></a>
            <a href="#" class="social-icon btn-3d"
              ><i class="bi bi-youtube"></i
            ></a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="col-lg-2 col-md-6">
          <h6 class="text-light mb-3">Quick Links</h6>
          <ul class="footer-links">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/products">Products</router-link></li>
            <li><router-link to="/about">About Us</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </div>

        <!-- Customer Service -->
        <div class="col-lg-3 col-md-6">
          <h6 class="text-light mb-3">Customer Service</h6>
          <ul class="footer-links">
            <li><router-link to="/cart">My Cart</router-link></li>
            <li><router-link to="/wishlist">Wishlist</router-link></li>
            <li><router-link to="/orders">My Orders</router-link></li>
            <li><a href="#">FAQs</a></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div class="col-lg-3 col-md-6">
          <h6 class="text-light mb-3">Contact Us</h6>
          <ul class="footer-contacts">
            <li>
              <i class="bi bi-geo-alt"></i>
              <span>123 Coffee Street, Bean City</span>
            </li>
            <li>
              <i class="bi bi-telephone"></i>
              <span>+1 234 567 8900</span>
            </li>
            <li>
              <i class="bi bi-envelope"></i>
              <span>info@koffeshop.com</span>
            </li>
            <li>
              <i class="bi bi-clock"></i>
              <span>Mon - Fri: 7:00 AM - 9:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      <hr class="my-4" style="border-color: rgba(255, 255, 255, 0.2)" />

      <div class="row">
        <div class="col-12 text-center">
          <p class="text-light mb-0">
            &copy; {{ currentYear }} Koffeshop. Made with
            <span class="text-danger pulse-animation">❤</span> for coffee
            lovers.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue";

const currentYear = computed(() => new Date().getFullYear());
</script>

<style lang="scss" scoped>
.footer {
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  backdrop-filter: blur(20px);
  padding: 60px 0 20px;
  color: white;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.3);
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.social-icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #d4a574;
    transform: translateY(-5px) rotateY(180deg);
  }
}

.footer-links {
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 10px;

    a {
      color: rgba(255, 255, 255, 0.8);
      text-decoration: none;
      transition: all 0.3s ease;
      display: inline-block;

      &:hover {
        color: #d4a574;
        transform: translateX(5px);
      }
    }
  }
}

.footer-contacts {
  list-style: none;
  padding: 0;

  li {
    display: flex;
    align-items: start;
    gap: 10px;
    margin-bottom: 15px;
    color: rgba(255, 255, 255, 0.8);

    i {
      color: #d4a574;
      font-size: 1.2rem;
      margin-top: 2px;
    }
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 0 20px;
    text-align: center;
  }

  .social-links {
    justify-content: center;
  }

  .footer-contacts li {
    justify-content: center;
    text-align: left;
  }
}
</style>

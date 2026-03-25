<template>
  <div class="about-page">
    <div class="container py-5">
      <div class="about-header text-center mb-5">
        <h1 class="text-gradient float-animation">About Koffeshop</h1>
        <p class="lead text-white">Your premium coffee destination</p>
      </div>

      <div class="row mb-5">
        <div class="col-lg-6 mb-4">
          <div class="about-card card-3d bg-white p-4 rounded">
            <h3 class="mb-3">Our Story</h3>
            <p>
              Founded in 2020, Koffeshop has been serving the finest coffee and
              pastries to our community. We believe in quality, sustainability,
              and creating memorable experiences for every customer.
            </p>
            <p>
              Our passion for coffee drives us to source the best beans from
              around the world, roasted to perfection right here in our shop.
            </p>
          </div>
        </div>

        <div class="col-lg-6 mb-4">
          <div class="about-card card-3d bg-white p-4 rounded">
            <h3 class="mb-3">Our Mission</h3>
            <p>
              To provide exceptional coffee experiences while supporting
              sustainable farming practices and building a welcoming community
              space.
            </p>
            <ul class="mt-3">
              <li>Premium quality coffee beans</li>
              <li>Sustainable sourcing</li>
              <li>Expert baristas</li>
              <li>Community focused</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="row mb-5">
        <div class="col-md-4 mb-4">
          <div class="feature-card card-3d bg-white p-4 text-center rounded">
            <div class="icon-wrapper mb-3">
              <i
                class="bi bi-cup-hot"
                style="font-size: 3rem; color: var(--primary-color)"
              ></i>
            </div>
            <h4>Quality Coffee</h4>
            <p class="text-muted">
              Hand-selected beans from the best farms worldwide
            </p>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="feature-card card-3d bg-white p-4 text-center rounded">
            <div class="icon-wrapper mb-3">
              <i
                class="bi bi-people"
                style="font-size: 3rem; color: var(--primary-color)"
              ></i>
            </div>
            <h4>Expert Team</h4>
            <p class="text-muted">Trained baristas passionate about coffee</p>
          </div>
        </div>

        <div class="col-md-4 mb-4">
          <div class="feature-card card-3d bg-white p-4 text-center rounded">
            <div class="icon-wrapper mb-3">
              <i
                class="bi bi-heart"
                style="font-size: 3rem; color: var(--primary-color)"
              ></i>
            </div>
            <h4>Made with Love</h4>
            <p class="text-muted">Every cup crafted with care and attention</p>
          </div>
        </div>
      </div>

      <div class="values-section card-3d bg-white p-5 rounded">
        <h2 class="text-center mb-4">Our Values</h2>
        <div class="row">
          <div class="col-md-3 text-center mb-3">
            <i class="bi bi-star-fill" style="font-size: 2rem; color: gold"></i>
            <h5 class="mt-2">Excellence</h5>
            <p class="small text-muted">Striving for perfection in every cup</p>
          </div>
          <div class="col-md-3 text-center mb-3">
            <i class="bi bi-globe" style="font-size: 2rem; color: green"></i>
            <h5 class="mt-2">Sustainability</h5>
            <p class="small text-muted">Caring for our planet and future</p>
          </div>
          <div class="col-md-3 text-center mb-3">
            <i class="bi bi-handshake" style="font-size: 2rem; color: blue"></i>
            <h5 class="mt-2">Community</h5>
            <p class="small text-muted">Building connections over coffee</p>
          </div>
          <div class="col-md-3 text-center mb-3">
            <i
              class="bi bi-lightning-fill"
              style="font-size: 2rem; color: orange"
            ></i>
            <h5 class="mt-2">Innovation</h5>
            <p class="small text-muted">Always exploring new flavors</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Static about page - no dynamic content needed
</script>

<style lang="scss" scoped>
.about-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.about-header {
  animation: slideIn 0.6s ease-out;
}

.about-card,
.feature-card,
.values-section {
  animation: slideIn 0.6s ease-out;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}

.icon-wrapper {
  animation: float-animation 3s ease-in-out infinite;
}

ul {
  li {
    padding: 8px 0;

    &:before {
      content: "✓ ";
      color: var(--primary-color);
      font-weight: bold;
      margin-right: 8px;
    }
  }
}
</style>

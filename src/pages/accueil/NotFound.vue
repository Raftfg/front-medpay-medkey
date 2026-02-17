<template>
  <div class="not-found-page">
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <div class="error-content py-5">
            <h1 class="error-code" style="font-size: 150px; font-weight: 800; color: var(--clr-main);">404</h1>
            <h2 class="error-title mb-4">Page Not Found</h2>
            <p class="error-description mb-5">
              Oops! The page you are looking for doesn't exist or has been moved.
            </p>
            <router-link to="/" class="btn-solid">Back to Home</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NotFound"
};
</script>

<style scoped>
.not-found-page {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-content {
  padding: 60px 20px;
}
</style>

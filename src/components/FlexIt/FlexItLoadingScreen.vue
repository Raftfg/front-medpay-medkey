<template>
  <div class="loading-screen" id="loading-screen" v-if="isLoading">
    <span class="bar top-bar"></span>
    <span class="bar down-bar"></span>
    <span class="progress-line"></span>
    <span class="loading-counter">{{ progress }}%</span>
  </div>
</template>

<script>
export default {
  name: "FlexItLoadingScreen",
  data() {
    return {
      isLoading: true,
      progress: 0
    };
  },
  mounted() {
    // Simulate loading progress
    const interval = setInterval(() => {
      if (this.progress < 100) {
        this.progress += Math.random() * 30;
        if (this.progress > 100) this.progress = 100;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          this.isLoading = false;
        }, 300);
      }
    }, 100);
  }
};
</script>

<style scoped>
/* Loading screen styles are already in the template CSS */
</style>

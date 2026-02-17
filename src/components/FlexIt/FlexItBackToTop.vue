<template>
  <div 
    class="back-to-top" 
    id="back-to-top" 
    @click="scrollToTop" 
    v-show="showButton"
    :class="{ 'show': showButton }"
  >
    <i class="bi bi-arrow-up icon"></i>
  </div>
</template>

<script>
export default {
  name: "FlexItBackToTop",
  data() {
    return {
      showButton: false
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      this.showButton = window.pageYOffset > 300;
    },
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
};
</script>

<style scoped>
/* Back to top button styles are already in the template CSS */
.back-to-top {
  transition: opacity 0.3s, visibility 0.3s;
}
</style>

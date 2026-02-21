<template>
  <div class="loading-screen" id="loading-screen" v-show="isVisible">
    <span class="bar top-bar" :style="barStyle"></span>
    <span class="bar down-bar" :style="barStyle"></span>
    <span class="progress-line" :style="progressLineStyle"></span>
    <span class="loading-counter">{{ progress }}%</span>
  </div>
</template>

<script>
export default {
  name: "FlexItLoadingScreen",
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      progress: 0,
      intervalId: null
    };
  },
  computed: {
    isVisible() {
      return this.visible;
    },
    barStyle() {
      const w = (100 - this.progress) / 2;
      return { width: w + "%" };
    },
    progressLineStyle() {
      return { transform: "scale(" + this.progress / 100 + ")" };
    }
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.startProgress();
      } else {
        this.stopProgress();
      }
    }
  },
  mounted() {
    if (this.visible) {
      this.startProgress();
    }
  },
  beforeDestroy() {
    this.stopProgress();
  },
  methods: {
    startProgress() {
      this.stopProgress();
      this.progress = 0;
      this.intervalId = setInterval(() => {
        if (this.progress < 100) {
          this.progress += Math.min(8, 100 - this.progress);
          if (this.progress > 100) this.progress = 100;
        } else {
          this.stopProgress();
          setTimeout(() => {
            this.$emit("done");
          }, 300);
        }
      }, 30);
    },
    stopProgress() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    }
  }
};
</script>

<style scoped>
.loading-screen {
  transition: opacity 0.5s ease;
}
</style>

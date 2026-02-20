<template>
  <!-- Start stats Section-->
  <section ref="statsSection" class="stats js-stats-counter mega-section">
    <div class="overlay-photo-image-bg" :style="{ backgroundImage: 'url(' + patternBg3 + ')' }" data-bg-opacity=".2"></div>
    <div class="container">
      <div class="stats-inner">
        <div class="row">
          <div v-for="(stat, idx) in stats" :key="idx" class="col-12 col-md-6 col-lg-3 stat-box">
            <div class="stat-box-inner wow fadeInUp" :data-wow-delay="(idx * 0.1) + 's'" data-tilt>
              <i :class="stat.icone + ' stat-icon'"></i>
              <p class="stat-num">
                <span class="counter" :data-from="0" :data-to="stat.valeur" data-speed="3000" data-refresh-interval="50">{{ stat.valeur }}</span>
                <span class="sign">{{ stat.suffixe }}</span>
              </p>
              <span class="stat-desc">{{ stat.description }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End stats Section-->
</template>

<script>
export default {
  name: "FlexItStats",
  data() {
    return {
      patternBg3: require("@/assets/flex-it/assets/images/sections-bg-images/pattern-bg-3.jpg"),
      counterStarted: false
    };
  },
  computed: {
    stats() {
      return this.$t('accueil.stats.items');
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.observeAndFireCounter();
      setTimeout(() => this.tryFireCounter(), 400);
      setTimeout(() => this.tryFireCounter(), 1200);
    });
  },
  methods: {
    tryFireCounter() {
      if (this.counterStarted) return;
      if (typeof window.fireFlexItCounter === "function") {
        window.fireFlexItCounter();
      }
    },
    startCountTo() {
      if (this.counterStarted) return;
      const $ = window.jQuery || window.$;
      if (!$ || !$.fn.countTo) return;
      const el = this.$refs.statsSection;
      if (!el) return;
      const $counters = $(el).find(".counter");
      if ($counters.length) {
        $counters.countTo();
        this.counterStarted = true;
      }
    },
    observeAndFireCounter() {
      const section = this.$refs.statsSection;
      if (!section || typeof IntersectionObserver === "undefined") {
        this.tryFireCounter();
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.counterStarted) {
              this.$nextTick(() => this.startCountTo());
            }
          });
        },
        { rootMargin: "0px", threshold: 0.1 }
      );
      observer.observe(section);
    }
  }
};
</script>

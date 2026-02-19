<template>
  <!-- Start stats Section-->
  <section class="stats js-stats-counter mega-section">
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
      patternBg3: require("@/assets/flex-it/assets/images/sections-bg-images/pattern-bg-3.jpg")
    };
  },
  computed: {
    stats() {
      return this.$t('accueil.stats.items');
    }
  }
};
</script>

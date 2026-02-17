<template>
  <!-- Start stats Section-->
  <section class="stats js-stats-counter mega-section">
    <div class="overlay-photo-image-bg" :style="{ backgroundImage: 'url(' + patternBg3 + ')' }" data-bg-opacity=".2"></div>
    <div class="container">
      <div class="stats-inner">
        <div class="row">
          <!--Info One-->
          <div v-for="(stat, idx) in stats" :key="idx" class="col-12 col-md-6 col-lg-3 stat-box">
            <div class="stat-box-inner" data-tilt><i :class="stat.icon + ' stat-icon'"></i>
              <p class="stat-num"><span class="counter" :data-from="stat.from" :data-to="stat.to" data-speed="3000" data-refresh-interval="50">{{ stat.to }}</span><span class="sign">+</span></p>
              <span class="stat-desc">{{ stat.desc }}</span>
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
      stats: [
        { from: 10, to: 750, icon: "flaticon-project-management", desc: "finished projects" },
        { from: 0, to: 23, icon: "flaticon-content-management", desc: "Created jobs" },
        { from: 0, to: 200, icon: "flaticon-user", desc: "happy customers" },
        { from: 0, to: 28, icon: "flaticon-aim", desc: "years Of exprience" }
      ]
    };
  }
};
</script>

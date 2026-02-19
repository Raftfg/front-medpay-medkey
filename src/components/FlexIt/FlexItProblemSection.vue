<template>
  <!-- Start Problem Section-->
  <section class="services services-boxed mega-section" id="probleme">
    <div class="container">
      <div class="sec-heading">
        <div class="content-area">
          <span class="pre-title wow fadeInUp" data-wow-delay=".2s">{{ $t('accueil.probleme.pre_titre') }}</span>
          <h2 class="title wow fadeInUp" data-wow-delay=".4s">{{ $t('accueil.probleme.titre') }}</h2>
          <p class="subtitle wow fadeInUp" data-wow-delay=".6s">{{ $t('accueil.probleme.sous_titre') }}</p>
        </div>
      </div>
      <div class="row gx-4 gy-4 services-row text-center">
        <div v-for="(point, index) in points" :key="index" class="col-12 col-md-6 col-lg-4 mx-auto">
          <div class="box service-box wow fadeInUp reveal-start" data-wow-offset="0" :data-wow-delay="(index + 1) * 0.2 + 's'">
            <div class="service-icon"><i :class="point.icone + ' font-icon'"></i></div>
            <span class="service-num hollow-text">{{ String(index + 1).padStart(2, '0') }}</span>
            <div class="service-content">
              <h3 class="service-title">{{ point.titre }}</h3>
              <p class="service-text">{{ point.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Problem Section-->
</template>

<script>
export default {
  name: "FlexItProblemSection",
  computed: {
    points() {
      return this.$t('accueil.probleme.points');
    }
  }
};
</script>

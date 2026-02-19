<template>
  <!-- Start BI/Reporting Section-->
  <section class="services services-boxed mega-section" id="bi-reporting">
    <div class="container">
      <div class="sec-heading">
        <div class="content-area">
          <span class="pre-title wow fadeInUp" data-wow-delay=".2s">{{ $t('accueil.bi_reporting.pre_titre') }}</span>
          <h2 class="title wow fadeInUp" data-wow-delay=".4s">{{ $t('accueil.bi_reporting.titre') }}</h2>
          <p class="subtitle wow fadeInUp" data-wow-delay=".6s">{{ $t('accueil.bi_reporting.sous_titre') }}</p>
        </div>
      </div>
      <div class="row gx-4 gy-4 services-row text-center">
        <div v-for="(indicateur, index) in indicateurs" :key="index" class="col-12 col-md-6 col-lg-3 mx-auto">
          <div class="box service-box wow fadeInUp reveal-start" data-wow-offset="0" :data-wow-delay="(index + 1) * 0.2 + 's'">
            <div class="service-icon"><i :class="indicateur.icone + ' font-icon'"></i></div>
            <div class="service-content">
              <h3 class="service-title">{{ indicateur.titre }}</h3>
              <p class="service-text">{{ indicateur.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-4 wow fadeInUp" data-wow-delay=".8s">
        <a class="btn-solid" href="#0">{{ $t('accueil.bi_reporting.cta') }}</a>
      </div>
    </div>
  </section>
  <!-- End BI/Reporting Section-->
</template>

<script>
export default {
  name: "FlexItBISection",
  computed: {
    indicateurs() {
      return this.$t('accueil.bi_reporting.indicateurs');
    }
  }
};
</script>

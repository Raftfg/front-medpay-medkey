<template>
  <!-- Start Solution Section-->
  <section class="about mega-section" id="solution">
    <div class="container">
      <div class="content-block">
        <div class="row">
          <div class="col-12 col-lg-6 d-flex align-items-center order-1 order-lg-0 about-col pad-end wow fadeInUp" data-wow-delay="0.6s">
            <div class="text-area">
              <div class="sec-heading light-title">
                <div class="content-area">
                  <span class="pre-title wow fadeInUp" data-wow-delay=".2s">{{ $t('accueil.solution.pre_titre') }}</span>
                  <h2 class="title wow fadeInUp" data-wow-delay=".4s">{{ $t('accueil.solution.titre') }}</h2>
                </div>
              </div>
              <p class="about-text">{{ $t('accueil.solution.description') }}</p>
              <div class="info-items-list">
                <div class="row">
                  <div class="col-12" v-for="(point, idx) in points" :key="idx">
                    <div class="info-item">
                      <span class="info-number">{{ String(idx + 1).padStart(2, '0') }}.</span>
                      <div class="info-content">
                        <h5 class="info-title">{{ point }}</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cta-area">
                <a class="btn-solid reveal-start" href="#modules">{{ $t('accueil.solution.cta') }}</a>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6 d-flex align-items-center order-0 order-lg-1 about-col wow fadeInUp" data-wow-delay="0.2s">
            <div class="img-area" data-tilt>
              <div class="image"><img class="about-img img-fluid" loading="lazy" src="@/assets/flex-it/assets/images/about/1.png" alt="Medkey platform"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Solution Section-->
</template>

<script>
export default {
  name: "FlexItSolutionSection",
  computed: {
    points() {
      return this.$t('accueil.solution.points');
    }
  }
};
</script>

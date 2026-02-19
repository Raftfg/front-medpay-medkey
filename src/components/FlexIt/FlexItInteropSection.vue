<template>
  <!-- Start Interoperability Section-->
  <section class="about mega-section" id="interoperabilite">
    <div class="container">
      <div class="content-block">
        <div class="row">
          <div class="col-12 col-lg-6 d-flex align-items-center about-col wow fadeInUp" data-wow-delay="0.2s">
            <div class="img-area" data-tilt>
              <div class="image"><img class="about-img img-fluid" loading="lazy" :style="{ borderRadius: '0.5rem' }" src="@/assets/flex-it/assets/images/about/4.png" alt="Interoperability"></div>
            </div>
          </div>
          <div class="col-12 col-lg-6 d-flex align-items-center about-col pad-start wow fadeInUp" data-wow-delay="0.6s">
            <div class="text-area">
              <div class="sec-heading light-title">
                <div class="content-area">
                  <span class="pre-title wow fadeInUp" data-wow-delay=".2s">{{ $t('accueil.interoperabilite.pre_titre') }}</span>
                  <h2 class="title wow fadeInUp" data-wow-delay=".4s">{{ $t('accueil.interoperabilite.titre') }}</h2>
                </div>
              </div>
              <p class="about-text">{{ $t('accueil.interoperabilite.sous_titre') }}</p>
              <div class="info-items-list">
                <div class="row">
                  <div class="col-12" v-for="(standard, idx) in standards" :key="idx">
                    <div class="info-item">
                      <i :class="standard.icone + ' info-icon'"></i>
                      <div class="info-content">
                        <h5 class="info-title">{{ standard.titre }}</h5>
                        <p class="info-text">{{ standard.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="cta-area">
                <a class="btn-solid" href="#0">{{ $t('accueil.interoperabilite.cta') }}</a>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Interoperability Section-->
</template>

<script>
export default {
  name: "FlexItInteropSection",
  computed: {
    standards() {
      return this.$t('accueil.interoperabilite.standards');
    }
  }
};
</script>

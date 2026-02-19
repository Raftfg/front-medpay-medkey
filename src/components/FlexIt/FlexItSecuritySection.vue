<template>
  <!-- Start Security Section-->
  <section class="about mega-section" id="securite">
    <div class="container">
      <div class="content-block">
        <div class="row">
          <div class="col-12 col-lg-6 d-flex align-items-center order-1 order-lg-0 about-col pad-end wow fadeInUp" data-wow-delay="0.6s">
            <div class="text-area">
              <div class="sec-heading light-title">
                <div class="content-area">
                  <span class="pre-title wow fadeInUp" data-wow-delay=".2s">{{ $t('accueil.securite.pre_titre') }}</span>
                  <h2 class="title wow fadeInUp" data-wow-delay=".4s">{{ $t('accueil.securite.titre') }}</h2>
                </div>
              </div>
              <p class="about-text">{{ $t('accueil.securite.sous_titre') }}</p>
              <div class="info-items-list">
                <div class="row">
                  <div class="col-12 col-xl-6" v-for="(garantie, idx) in garanties" :key="idx">
                    <div class="info-item">
                      <i :class="garantie.icone + ' info-icon'"></i>
                      <div class="info-content">
                        <h5 class="info-title">{{ garantie.titre }}</h5>
                        <p class="info-text">{{ garantie.description }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="cta-area">
                <a class="btn-solid reveal-start" href="#0">{{ $t('accueil.securite.cta') }}</a>
              </div> -->
            </div>
          </div>
          <div class="col-12 col-lg-6 d-flex align-items-center order-0 order-lg-1 about-col wow fadeInUp" data-wow-delay="0.2s">
            <div class="img-area" data-tilt>
              <div class="image"><img class="about-img img-fluid" loading="lazy" :style="{ borderRadius: '0.5rem' }" src="@/assets/flex-it/assets/images/about/5.png" alt="Security"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End Security Section-->
</template>

<script>
export default {
  name: "FlexItSecuritySection",
  computed: {
    garanties() {
      return this.$t('accueil.securite.garanties');
    }
  }
};
</script>

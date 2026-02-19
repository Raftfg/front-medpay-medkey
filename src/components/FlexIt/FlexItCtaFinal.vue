<template>
  <!-- Start CTA Final Section-->
  <section class="cta-section mega-section">
    <div class="overlay-photo-image-bg" :style="{ backgroundImage: 'url(' + bgImage + ')' }" data-bg-opacity=".25"></div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-8 text-center">
          <h2 class="title wow fadeInUp content-always-light" data-wow-delay=".2s">{{ $t('accueil.cta_final.titre') }}</h2>
          <p class="subtitle wow fadeInUp content-always-light mt-3 mb-4" data-wow-delay=".4s">{{ $t('accueil.cta_final.sous_titre') }}</p>
          <div class="cta-links-area wow fadeInUp" data-wow-delay=".6s">
            <a class="btn-solid cta-link cta-link-primary" href="#0">{{ $t('accueil.cta_final.cta_principal') }}</a>
            <!-- <a class="btn-outline cta-link content-always-light" href="#0">{{ $t('accueil.cta_final.cta_secondaire') }}</a> -->
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End CTA Final Section-->
</template>

<script>
export default {
  name: "FlexItCtaFinal",
  data() {
    return {
      bgImage: require("@/assets/flex-it/assets/images/sections-bg-images/pattern-bg-3.jpg")
    };
  }
};
</script>

<style scoped>
.cta-section {
  position: relative;
  padding: 100px 0;
  background-color: var(--clr-main, #1a1a2e);
  overflow: hidden;
}

.cta-section .overlay-photo-image-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0.25;
}

.cta-section .container {
  position: relative;
  z-index: 1;
}

.cta-section .title {
  font-size: 2.2rem;
  color: #fff;
}

.cta-section .subtitle {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.85);
}
</style>

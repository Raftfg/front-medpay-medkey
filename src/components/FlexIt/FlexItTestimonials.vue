<template>
  <!-- Start testimonials Section-->
  <section class="testimonials testimonials-1-col has-dark-bg mega-section" id="testimonials-img-bg">
    <div class="overlay-photo-image-bg parallax" :style="{ backgroundImage: 'url(' + testiBg + ')' }" data-bg-opacity=".25"></div>
    <div class="container">
      <div class="sec-heading centered">
        <div class="content-area">
          <span class="pre-title wow fadeInUp" data-wow-delay=".2s">{{ $t('accueil.temoignages.pre_titre') }}</span>
          <h2 class="title wow fadeInUp" data-wow-delay=".4s">{{ $t('accueil.temoignages.titre') }}</h2>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-lg-10 mx-auto">
          <div class="swiper-container wow fadeIn" data-wow-delay="0.4s">
            <div class="swiper-wrapper">
              <div v-for="(temoignage, idx) in temoignages" :key="idx" class="swiper-slide">
                <div class="testimonial-content">
                  <div class="customer-img"><img class="img-fluid" loading="lazy" :src="avatars[idx]" alt="customer image"></div>
                  <div class="customer-testimonial">
                    <div class="content">
                      <p class="testimonial-text">{{ temoignage.citation }}</p>
                    </div>
                  </div>
                  <div class="customer-info">
                    <div class="customer-details">
                      <p class="customer-name">{{ temoignage.auteur }}</p>
                      <p class="customer-role">{{ temoignage.poste }} — {{ temoignage.etablissement }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--navigation buttons-->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End testimonials Section-->
</template>

<script>
export default {
  name: "FlexItTestimonials",
  data() {
    return {
      testiBg: require("@/assets/flex-it/assets/images/sections-bg-images/1.jpg"),
      avatars: [
        require("@/assets/flex-it/assets/images/testimonials/1.png"),
        require("@/assets/flex-it/assets/images/testimonials/2.png"),
        require("@/assets/flex-it/assets/images/testimonials/3.png")
      ]
    };
  },
  computed: {
    temoignages() {
      return this.$t('accueil.temoignages.liste');
    }
  }
};
</script>

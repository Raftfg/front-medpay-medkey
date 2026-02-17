<template>
  <div class="flex-it-pricing-page">
    <FlexItBreadcrumb 
      title="Pricing Plans" 
      :breadcrumbs="[{ name: 'pricing', active: true }]" 
    />
    <FlexItPricingSection />
    <FlexItFAQSection />
    <section class="take-action elf-section has-dark-bg" id="take-action">
      <div class="overlay-photo-image-bg" :style="{ backgroundImage: 'url(' + takeActionBg + ')' }" data-bg-opacity=".25"></div>
      <div class="cta-wrapper">
        <div class="container">
          <div class="sec-heading centered mb-0">
            <div class="content-area">
              <span class="pre-title wow fadeInUp" data-wow-delay=".2s">contact us</span>
              <h2 class="title wow fadeInUp" data-wow-delay=".4s">get in touch with us</h2>
              <p class="subtitle wow fadeInUp" data-wow-delay=".6s">Lorem ipsum dolor sit amet consectetur adipisicing elit Omnis <br>id atque dignissimos repellat quae ullam.</p>
            </div>
          </div>
          <div class="see-more-area wow fadeInUp" data-wow-delay="0.8s">
            <router-link class="btn-solid cta-link" to="/contact-us">contact us</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import FlexItBreadcrumb from "@/components/FlexIt/FlexItBreadcrumb.vue";
import FlexItPricingSection from "@/components/FlexIt/FlexItPricingSection.vue";
import FlexItFAQSection from "@/components/FlexIt/FlexItFAQSection.vue";
import FlexItClientsSlider from "@/components/FlexIt/FlexItClientsSlider.vue";
import $ from 'jquery';

export default {
  name: "FlexItPricing",
  components: {
    FlexItBreadcrumb,
    FlexItPricingSection,
    FlexItFAQSection
  },
  data() {
    return {
      takeActionBg: require("@/assets/flex-it/assets/images/sections-bg-images/2.jpg")
    };
  },
  mounted() {
    try {
      require("@/assets/flex-it/js/main.js");
      if ($('.loading-screen').length) {
         $('.loading-screen').fadeOut(500);
      }
    } catch (e) {
      console.warn("Template JS initialization warning:", e);
    }
  }
};
</script>

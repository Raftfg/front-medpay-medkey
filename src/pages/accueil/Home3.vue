<template>
  <div class="home-3">
    <FlexItHero />
    <FlexItServicesSection />
    <FlexItAboutSection />
    <FlexItPortfolioSection />
    <FlexItPricingSection />
    <FlexItTestimonials />
    <FlexItBlogSection />
  </div>
</template>

<script>
import FlexItHero from "@/components/FlexIt/FlexItHero.vue";
import FlexItServicesSection from "@/components/FlexIt/FlexItServicesSection.vue";
import FlexItAboutSection from "@/components/FlexIt/FlexItAboutSection.vue";
import FlexItPortfolioSection from "@/components/FlexIt/FlexItPortfolioSection.vue";
import FlexItPricingSection from "@/components/FlexIt/FlexItPricingSection.vue";
import FlexItTestimonials from "@/components/FlexIt/FlexItTestimonials.vue";
import FlexItBlogSection from "@/components/FlexIt/FlexItBlogSection.vue";
import $ from 'jquery';

export default {
  name: "Home3",
  components: {
    FlexItHero,
    FlexItServicesSection,
    FlexItAboutSection,
    FlexItPortfolioSection,
    FlexItPricingSection,
    FlexItTestimonials,
    FlexItBlogSection
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

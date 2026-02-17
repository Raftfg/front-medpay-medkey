<template>
  <div class="flex-it-accueil">
    <FlexItHero />
    <FlexItServicesSection />
    <FlexItAboutSection />
    <FlexItStats />
    <FlexItPortfolioSection />
    <FlexItClientsSlider />
    <FlexItPricingSection />
    <FlexItTestimonials />
    <FlexItBlogSection />
  </div>
</template>

<script>
import FlexItHero from "@/components/FlexIt/FlexItHero.vue";
import FlexItServicesSection from "@/components/FlexIt/FlexItServicesSection.vue";
import FlexItAboutSection from "@/components/FlexIt/FlexItAboutSection.vue";
import FlexItStats from "@/components/FlexIt/FlexItStats.vue";
import FlexItPortfolioSection from "@/components/FlexIt/FlexItPortfolioSection.vue";
import FlexItClientsSlider from "@/components/FlexIt/FlexItClientsSlider.vue";
import FlexItPricingSection from "@/components/FlexIt/FlexItPricingSection.vue";
import FlexItTestimonials from "@/components/FlexIt/FlexItTestimonials.vue";
import FlexItBlogSection from "@/components/FlexIt/FlexItBlogSection.vue";
import $ from 'jquery';

export default {
  name: "FlexItAccueil",
  components: {
    FlexItHero,
    FlexItServicesSection,
    FlexItAboutSection,
    FlexItStats,
    FlexItPortfolioSection,
    FlexItClientsSlider,
    FlexItPricingSection,
    FlexItTestimonials,
    FlexItBlogSection
  },
  mounted() {
    try {
      // Re-initialize template JS logic
      // Note: We use require to execute the script in the context of this component
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

<style scoped>
/* Ensure sections are spaced correctly */
.flex-it-accueil {
  overflow-x: hidden;
}
</style>

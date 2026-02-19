<template>
  <div class="flex-it-accueil">
    <FlexItHero />
    <FlexItProblemSection />
    <FlexItSolutionSection />
    <FlexItModulesSection />
    <FlexItInteropSection />
    <FlexItSecuritySection />
    <FlexItBISection />
    <FlexItPricingSection />
    <FlexItStats />
    <FlexItTestimonials />
    <FlexItCtaFinal />
  </div>
</template>

<script>
import FlexItHero from "@/components/FlexIt/FlexItHero.vue";
import FlexItPricingSection from "@/components/FlexIt/FlexItPricingSection.vue";
import FlexItProblemSection from "@/components/FlexIt/FlexItProblemSection.vue";
import FlexItSolutionSection from "@/components/FlexIt/FlexItSolutionSection.vue";
import FlexItModulesSection from "@/components/FlexIt/FlexItModulesSection.vue";
import FlexItInteropSection from "@/components/FlexIt/FlexItInteropSection.vue";
import FlexItSecuritySection from "@/components/FlexIt/FlexItSecuritySection.vue";
import FlexItBISection from "@/components/FlexIt/FlexItBISection.vue";
import FlexItStats from "@/components/FlexIt/FlexItStats.vue";
import FlexItTestimonials from "@/components/FlexIt/FlexItTestimonials.vue";
import FlexItCtaFinal from "@/components/FlexIt/FlexItCtaFinal.vue";
import $ from 'jquery';

export default {
  name: "FlexItAccueil",
  components: {
    FlexItHero,
    FlexItPricingSection,
    FlexItProblemSection,
    FlexItSolutionSection,
    FlexItModulesSection,
    FlexItInteropSection,
    FlexItSecuritySection,
    FlexItBISection,
    FlexItStats,
    FlexItTestimonials,
    FlexItCtaFinal
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

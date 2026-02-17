<template>
  <div class="flex-it-about">
    <FlexItBreadcrumb 
      title="About Us" 
      :breadcrumbs="[{ name: 'about us', active: true }]" 
    />
    <FlexItAboutSection />
    <FlexItStats />
    <FlexItTeamSection />
    <FlexItTestimonials />
    <FlexItClientsSlider />
    <FlexItBlogSection :showCta="true" />
    
    <!-- Take Action Section (specific to inner pages) -->
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
import FlexItAboutSection from "@/components/FlexIt/FlexItAboutSection.vue";
import FlexItStats from "@/components/FlexIt/FlexItStats.vue";
import FlexItTeamSection from "@/components/FlexIt/FlexItTeamSection.vue";
import FlexItTestimonials from "@/components/FlexIt/FlexItTestimonials.vue";
import FlexItClientsSlider from "@/components/FlexIt/FlexItClientsSlider.vue";
import FlexItBlogSection from "@/components/FlexIt/FlexItBlogSection.vue";
import $ from 'jquery';

export default {
  name: "FlexItAbout",
  components: {
    FlexItBreadcrumb,
    FlexItAboutSection,
    FlexItStats,
    FlexItTeamSection,
    FlexItTestimonials,
    FlexItClientsSlider,
    FlexItBlogSection
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

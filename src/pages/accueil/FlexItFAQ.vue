<template>
  <div class="flex-it-faq-page">
    <FlexItBreadcrumb
      :title="$t('assistance_page.page_title')"
      :breadcrumbs="[{ name: $t('assistance_page.breadcrumb'), active: true }]"
    />
    <FlexItFAQSection />
    <section class="take-action elf-section has-dark-bg" id="take-action">
      <div class="overlay-photo-image-bg" :style="{ backgroundImage: 'url(' + takeActionBg + ')' }" data-bg-opacity=".25"></div>
      <div class="cta-wrapper">
        <div class="container">
          <div class="sec-heading centered mb-0">
            <div class="content-area">
              <span class="pre-title wow fadeInUp" data-wow-delay=".2s">{{ $t('assistance_page.take_action.pre_title') }}</span>
              <h2 class="title wow fadeInUp" data-wow-delay=".4s">{{ $t('assistance_page.take_action.title') }}</h2>
              <p class="subtitle wow fadeInUp" data-wow-delay=".6s">{{ $t('assistance_page.take_action.subtitle') }}</p>
            </div>
          </div>
          <div class="see-more-area wow fadeInUp" data-wow-delay="0.8s">
            <router-link class="btn-solid cta-link" to="/contact-us">{{ $t('assistance_page.take_action.cta') }}</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import FlexItBreadcrumb from "@/components/FlexIt/FlexItBreadcrumb.vue";
import FlexItFAQSection from "@/components/FlexIt/FlexItFAQSection.vue";

export default {
  name: "FlexItFAQ",
  components: {
    FlexItBreadcrumb,
    FlexItFAQSection
  },
  data() {
    return {
      takeActionBg: require("@/assets/flex-it/assets/images/sections-bg-images/2.jpg")
    };
  }
};
</script>

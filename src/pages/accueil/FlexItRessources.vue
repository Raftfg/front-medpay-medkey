<template>
  <div class="flex-it-ressources">
    <FlexItBreadcrumb
      :title="$t('ressources_page.page_title')"
      :breadcrumbs="[{ name: $t('ressources_page.breadcrumb'), active: true }]"
    />
    <section class="ressources-content mega-section" id="ressources">
      <div class="container">
        <div class="sec-heading centered mb-5">
          <div class="content-area">
            <h2 class="title wow fadeInUp" data-wow-delay=".2s">{{ $t('ressources_page.intro_title') }}</h2>
            <p class="subtitle wow fadeInUp" data-wow-delay=".3s">{{ $t('ressources_page.intro_subtitle') }}</p>
          </div>
        </div>

        <div class="doc-block mb-5">
          <h3 class="h4 mb-3 wow fadeInUp" data-wow-delay=".2s">{{ $t('ressources_page.doc_title') }}</h3>
          <p class="text-muted mb-4 wow fadeInUp" data-wow-delay=".25s">{{ $t('ressources_page.doc_subtitle') }}</p>
          <div class="row g-4">
            <div v-for="(item, idx) in docItems" :key="idx" class="col-12 col-md-6 col-lg-3">
              <div class="card h-100 border-0 shadow-sm wow fadeInUp" :data-wow-delay="0.1 * idx + 0.3 + 's'">
                <div class="card-body p-4">
                  <i :class="[item.icon, 'text-primary', 'mb-3']" style="font-size: 1.75rem;"></i>
                  <h5 class="card-title">{{ item.title }}</h5>
                  <p class="card-text text-muted small">{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="guides-block mb-5">
          <h3 class="h4 mb-3 wow fadeInUp" data-wow-delay=".2s">{{ $t('ressources_page.guides_title') }}</h3>
          <p class="text-muted mb-4 wow fadeInUp" data-wow-delay=".25s">{{ $t('ressources_page.guides_subtitle') }}</p>
          <div class="row g-3">
            <div v-for="(item, idx) in guidesItems" :key="idx" class="col-12 col-md-4">
              <div class="d-flex p-3 rounded border wow fadeInUp" :data-wow-delay="0.1 * idx + 0.4 + 's'">
                <i class="fas fa-file-alt text-primary me-3 mt-1"></i>
                <div>
                  <h6 class="mb-1">{{ item.title }}</h6>
                  <p class="text-muted small mb-0">{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="support-cta text-center py-4 px-3 rounded wow fadeInUp" data-wow-delay=".6s" style="background: var(--clr-main); background: linear-gradient(135deg, rgba(9,175,244,0.15) 0%, rgba(13,24,87,0.08) 100%);">
          <h4 class="h5 mb-2">{{ $t('ressources_page.support_title') }}</h4>
          <p class="text-muted mb-3">{{ $t('ressources_page.support_desc') }}</p>
          <router-link class="btn btn-solid" to="/contact-us">{{ $t('ressources_page.support_cta') }}</router-link>
        </div>
      </div>
    </section>

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

export default {
  name: "FlexItRessources",
  components: { FlexItBreadcrumb },
  computed: {
    docItems() {
      return this.$t("ressources_page.doc_items", { returnObjects: true });
    },
    guidesItems() {
      return this.$t("ressources_page.guides_items", { returnObjects: true });
    }
  },
  data() {
    return {
      takeActionBg: require("@/assets/flex-it/assets/images/sections-bg-images/2.jpg")
    };
  }
};
</script>

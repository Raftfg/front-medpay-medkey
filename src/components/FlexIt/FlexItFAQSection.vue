<template>
  <!-- Section FAQ / Assistance -->
  <section class="faq mega-section" id="faq">
    <div class="container">
      <div class="sec-heading centered">
        <div class="content-area">
          <span class="pre-title wow fadeInUp" data-wow-delay=".2s">{{ $t('menu.assistance') }}</span>
          <h2 class="title wow fadeInUp" data-wow-delay=".4s">{{ $t('assistance_page.faq_title') }}</h2>
          <p class="subtitle wow fadeInUp" data-wow-delay=".35s">{{ $t('assistance_page.faq_subtitle') }}</p>
        </div>
      </div>
      <div class="faq-accordion wow fadeInUp" data-wow-delay=".2s" id="accordion">
        <div class="row">
          <div class="col-12 col-lg-6">
            <div v-for="(item, idx) in faqs.slice(0, half)" :key="idx" class="card mb-2">
              <div class="card-header" :id="'heading-' + idx">
                <h5 class="mb-0 faq-title">
                  <button class="btn btn-link faq-btn collapsed" data-bs-toggle="collapse" :data-bs-target="'#collapse-' + idx" :aria-expanded="false" :aria-controls="'collapse-' + idx">
                    {{ item.q }}
                  </button>
                </h5>
              </div>
              <div :id="'collapse-' + idx" class="collapse" :aria-labelledby="'heading-' + idx" data-bs-parent="#accordion">
                <div class="card-body">
                  <p class="faq-answer">{{ item.a }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <div v-for="(item, idx) in faqs.slice(half)" :key="idx + half" class="card mb-2">
              <div class="card-header" :id="'heading-' + (idx + half)">
                <h5 class="mb-0 faq-title">
                  <button class="btn btn-link faq-btn collapsed" data-bs-toggle="collapse" :data-bs-target="'#collapse-' + (idx + half)" :aria-expanded="false" :aria-controls="'collapse-' + (idx + half)">
                    {{ item.q }}
                  </button>
                </h5>
              </div>
              <div :id="'collapse-' + (idx + half)" class="collapse" :aria-labelledby="'heading-' + (idx + half)" data-bs-parent="#accordion">
                <div class="card-body">
                  <p class="faq-answer">{{ item.a }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FlexItFAQSection",
  computed: {
    faqs() {
      const list = this.$t("assistance_page.faqs", { returnObjects: true });
      return Array.isArray(list) ? list : [];
    },
    half() {
      return Math.ceil(this.faqs.length / 2);
    }
  }
};
</script>

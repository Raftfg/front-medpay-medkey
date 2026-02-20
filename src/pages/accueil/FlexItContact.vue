<template>
  <div class="flex-it-contact">
    <FlexItBreadcrumb
      :title="$t('contact.page_title')"
      :breadcrumbs="[{ name: $t('contact.breadcrumb'), active: true }]"
    />
    <section class="contact-us mega-section pb-0" id="contact-us">
      <div class="container">
        <section class="locations-section mega-section">
          <div class="sec-heading centered">
            <div class="content-area">
              <h2 class="title wow fadeInUp" data-wow-delay=".4s">{{ $t('contact.offices_title') }}</h2>
            </div>
          </div>
          <div class="contact-info-panel">
            <div class="info-section">
              <div class="row justify-content-center">
                <div class="col-12 col-lg-6 col-xl-5">
                  <div class="info-panel wow fadeInUp" data-wow-delay=".4s">
                    <h4 class="location-title">{{ $t('contact.office.name') }}</h4>
                    <div class="line-on-side"></div>
                    <p class="location-address">{{ $t('contact.office.address') }}</p>
                    <div class="location-card">
                      <i class="flaticon-email icon"></i>
                      <div class="card-content">
                        <h6 class="content-title">{{ $t('contact.office.email_label') }}</h6>
                        <a class="email link" :href="'mailto:' + $t('contact.office.email')">{{ $t('contact.office.email') }}</a>
                      </div>
                    </div>
                    <div class="location-card">
                      <i class="flaticon-phone-call icon"></i>
                      <div class="card-content">
                        <h6 class="content-title">{{ $t('contact.office.phone_label') }}</h6>
                        <a class="tel link" :href="'tel:' + $t('contact.office.phone').replace(/\s/g, '')">{{ $t('contact.office.phone') }}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="map-section elf-section">
          <div class="sec-heading centered">
            <div class="content-area">
              <h2 class="title wow fadeInUp" data-wow-delay=".4s">{{ $t('contact.map_title') }}</h2>
            </div>
          </div>
          <div class="map-box wow fadeInUp" data-wow-delay=".6s">
            <div class="mapouter">
              <div class="gmap_canvas">
                <iframe
                  class="map-iframe"
                  title="MedKey Cotonou, Bénin"
                  :src="mapEmbedUrl"
                  allowfullscreen
               ></iframe>
              </div>
            </div>
          </div>
        </section>

        <section class="contact-us-form-section mega-section">
          <div class="row">
            <div class="col-12">
              <div class="contact-form-panel">
                <div class="sec-heading centered">
                  <div class="content-area">
                    <h2 class="title wow fadeInUp" data-wow-delay=".4s">{{ $t('contact.form_title') }}</h2>
                    <p v-if="$t('contact.form_intro')" class="subtitle wow fadeInUp" data-wow-delay=".5s">{{ $t('contact.form_intro') }}</p>
                  </div>
                </div>
                <div class="contact-form-inputs wow fadeInUp" data-wow-delay=".6s">
                  <div class="custom-form-area input-boxed">
                    <form class="main-form" id="contact-us-form" @submit.prevent="onSubmit">
                      <div v-if="formFeedback" :class="['form-feedback', formFeedback.type]">{{ formFeedback.message }}</div>
                      <div class="row">
                        <div class="col-12 col-lg-6">
                          <div class="input-wrapper">
                            <input
                              v-model="form.name"
                              class="text-input"
                              id="user-name"
                              name="UserName"
                              type="text"
                              required
                            />
                            <label class="input-label" for="user-name">{{ $t('contact.form.name') }} <span class="req">{{ $t('contact.form.required') }}</span></label>
                            <span class="b-border"></span><span class="error-msg"></span>
                          </div>
                        </div>
                        <div class="col-12 col-lg-6">
                          <div class="input-wrapper">
                            <input
                              v-model="form.email"
                              class="text-input"
                              id="user-email"
                              name="UserEmail"
                              type="email"
                              required
                            />
                            <label class="input-label" for="user-email">{{ $t('contact.form.email') }} <span class="req">{{ $t('contact.form.required') }}</span></label>
                            <span class="b-border"></span><span class="error-msg"></span>
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="input-wrapper">
                            <input
                              v-model="form.subject"
                              class="text-input"
                              id="msg-subject"
                              name="subject"
                              type="text"
                              required
                            />
                            <label class="input-label" for="msg-subject">{{ $t('contact.form.subject') }} <span class="req">{{ $t('contact.form.required') }}</span></label>
                            <span class="b-border"></span><span class="error-msg"></span>
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="input-wrapper">
                            <textarea
                              v-model="form.message"
                              class="text-input"
                              id="msg-text"
                              name="message"
                              rows="5"
                              required
                            ></textarea>
                            <label class="input-label" for="msg-text">{{ $t('contact.form.message') }} <span class="req">{{ $t('contact.form.required') }}</span></label>
                            <span class="b-border"></span><span class="error-msg"></span>
                          </div>
                        </div>
                        <div class="col-12 submit-wrapper">
                          <button class="btn-solid" type="submit" :disabled="sending">
                            {{ sending ? $t('contact.form.sending') : $t('contact.form.submit') }}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script>
import FlexItBreadcrumb from "@/components/FlexIt/FlexItBreadcrumb.vue";

// Carte Cotonou, Bénin (embed public)
const COTONOU_MAP_EMBED = "https://www.google.com/maps?q=Cotonou,Benin&output=embed";

export default {
  name: "FlexItContact",
  components: {
    FlexItBreadcrumb
  },
  data() {
    return {
      mapEmbedUrl: COTONOU_MAP_EMBED,
      form: {
        name: "",
        email: "",
        subject: "",
        message: ""
      },
      sending: false,
      formFeedback: null
    };
  },
  methods: {
    onSubmit() {
      this.formFeedback = null;
      if (!this.form.name.trim() || !this.form.email.trim() || !this.form.subject.trim() || !this.form.message.trim()) {
        this.formFeedback = { type: "error", message: this.$t("contact.form.error") };
        return;
      }
      this.sending = true;
      // Simuler envoi (à remplacer par un vrai appel API si backend disponible)
      setTimeout(() => {
        this.sending = false;
        this.formFeedback = { type: "success", message: this.$t("contact.form.success") };
        this.form = { name: "", email: "", subject: "", message: "" };
      }, 800);
    }
  }
};
</script>

<style scoped>
.form-feedback {
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  font-size: 0.95rem;
}
.form-feedback.success {
  background: rgba(9, 175, 244, 0.15);
  color: var(--clr-main, #09aff4);
  border: 1px solid rgba(9, 175, 244, 0.4);
}
.form-feedback.error {
  background: rgba(220, 53, 69, 0.1);
  color: #dc3545;
  border: 1px solid rgba(220, 53, 69, 0.3);
}
.subtitle {
  margin-top: 0.5rem;
  opacity: 0.9;
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
}
</style>

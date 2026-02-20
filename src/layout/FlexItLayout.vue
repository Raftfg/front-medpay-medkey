<template>
  <div class="flex-it-layout">
    <FlexItHeader :headerClass="headerClass" />
    <main>
      <router-view></router-view>
    </main>
    <FlexItFooter />
    <FlexItLoadingScreen :visible="loadingVisible" @done="loadingVisible = false" />
    <FlexItBackToTop />
  </div>
</template>

<script>
import FlexItHeader from "@/components/FlexIt/FlexItHeader.vue";
import FlexItFooter from "@/components/FlexIt/FlexItFooter.vue";
import FlexItLoadingScreen from "@/components/FlexIt/FlexItLoadingScreen.vue";
import FlexItBackToTop from "@/components/FlexIt/FlexItBackToTop.vue";

export default {
  name: "FlexItLayout",
  components: {
    FlexItHeader,
    FlexItFooter,
    FlexItLoadingScreen,
    FlexItBackToTop
  },
  data() {
    return {
      wowInstance: null,
      loadingVisible: true
    };
  },
  computed: {
    headerClass() {
      return this.$route.path === '/' ? 'content-always-light' : 'inner-page-header';
    }
  },
  mounted() {
    document.body.classList.add('flex-it-body');
    document.body.classList.add('dark-theme');
    this.initAnimations();
  },
  watch: {
    '$route'(to, from) {
      if (from && from.name) {
        this.loadingVisible = true;
      }
      this.initAnimations();
    }
  },
  methods: {
    initAnimations() {
      this.$nextTick(() => {
        // Délai pour que router-view et tous les composants FlexIt soient rendus
        setTimeout(() => {
          try {
            if (window.initFlexItTemplate) {
              window.initFlexItTemplate();
            }
            // Ré-init WOW pour les pages FlexIt (animations au scroll)
            if (window.WOW) {
              if (!this.wowInstance) {
                this.wowInstance = new window.WOW({
                  boxClass: 'wow',
                  animateClass: 'animated',
                  offset: 100,
                  mobile: true,
                  live: true
                });
                this.wowInstance.init();
              } else {
                this.wowInstance.sync();
              }
              // Resync après un court délai pour contenu chargé dynamiquement
              setTimeout(() => this.wowInstance && this.wowInstance.sync(), 200);
            }
          } catch (e) {
            console.error("[FLEX-IT] Initialization failed:", e);
          }
        }, 500);
      });
    }
  },
  beforeDestroy() {
    document.body.classList.remove('flex-it-body');
    document.body.classList.remove('dark-theme');
  }
};
</script>

<style>
/* Import Template CSS */
@import "~@/assets/flex-it/css/vendors/bootstrap.min.css";
@import "~@/assets/flex-it/css/vendors/animate.css";
@import "~@/assets/flex-it/css/vendors/swiper-bundle.min.css";
@import "~@/assets/flex-it/css/vendors/flaticon/flaticon.css";
@import "~@/assets/flex-it/css/vendors/all.min.css";
@import "~@/assets/flex-it/css/vendors/bootstrap-icons-1.9.1/bootstrap-icons.css";
@import "~@/assets/flex-it/css/vendors/jquery.fancybox.min.css";
@import "~@/assets/flex-it/css/main-LTR.css";

/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700;800&display=swap');

/* Scope potential conflicts and override global !important rules from index.html */
.flex-it-layout,
.flex-it-layout h1, 
.flex-it-layout h2, 
.flex-it-layout h3, 
.flex-it-layout h4, 
.flex-it-layout h5, 
.flex-it-layout h6, 
.flex-it-layout p, 
.flex-it-layout a, 
.flex-it-layout span, 
.flex-it-layout div,
.flex-it-layout li,
.flex-it-layout input,
.flex-it-layout select {
  font-family: 'Jost', sans-serif !important;
}

/* Ensure template colors use Akasi branding variables */
.flex-it-layout {
  --clr-main: #09aff4;
  --clr-accent: #0d1857;
}

/* Header fixe + fond bleu au défilement (comportement template) */
.flex-it-layout .page-header.header-basic {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  z-index: 1030 !important;
  transition: background 0.4s ease, box-shadow 0.4s ease;
}

</style>

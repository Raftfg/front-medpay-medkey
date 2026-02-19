<template>
  <div class="flex-it-layout">
    <FlexItHeader :headerClass="headerClass" />
    <main>
      <router-view></router-view>
    </main>
    <FlexItFooter />
    <FlexItLoadingScreen />
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
      wowInstance: null
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
    '$route'() {
      this.initAnimations();
    }
  },
  methods: {
    initAnimations() {
      console.log('[FLEX-IT] initAnimations called');
      this.$nextTick(() => {
        // Add delay to ensure Vue components are fully rendered
        setTimeout(() => {
          try {
            // Re-run template JS logic (Swiper, Splitting, etc.)
            if (window.initFlexItTemplate) {
              console.log('[FLEX-IT] Calling initFlexItTemplate');
              window.initFlexItTemplate();
            }

            console.log('[WOW] Checking for window.WOW:', !!window.WOW);
            if (window.WOW) {
              if (!this.wowInstance) {
                console.log('[WOW] Creating new WOW instance');
                this.wowInstance = new window.WOW({
                  boxClass: 'wow',
                  animateClass: 'animated',
                  offset: 100,
                  mobile: true,
                  live: true
                });
                this.wowInstance.init();
              } else {
                console.log('[WOW] Syncing existing WOW instance');
                this.wowInstance.sync();
              }
            }
          } catch (e) {
            console.error("[FLEX-IT] Initialization failed:", e);
          }
        }, 300); // 300ms delay to ensure all nested components are ready
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

/* 
   Note: Sticky header styles are now managed in FlexItHeader.vue 
   using Akasi branding colors. 
*/
</style>

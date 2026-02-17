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
      console.log('[WOW] initAnimations called');
      this.$nextTick(() => {
        // Add delay to ensure Vue components are fully rendered
        setTimeout(() => {
          try {
            console.log('[WOW] Checking for window.WOW:', !!window.WOW);
            if (window.WOW) {
              if (!this.wowInstance) {
                console.log('[WOW] Creating new WOW instance');
                // Create instance only once with original template configuration
                this.wowInstance = new window.WOW({
                  boxClass: 'wow',
                  animateClass: 'animated',
                  offset: 100,  // Match original template (was 0)
                  mobile: true,
                  live: true
                });
                this.wowInstance.init();
                console.log('[WOW] WOW instance initialized');
              } else {
                console.log('[WOW] Syncing existing WOW instance');
                // Sync existing instance on route change instead of re-initializing
                this.wowInstance.sync();
                console.log('[WOW] WOW instance synced');
              }
            } else {
              console.error('[WOW] window.WOW is not available!');
            }
          } catch (e) {
            console.error("[WOW] Initialization failed:", e);
          }
        }, 100); // 100ms delay for proper DOM rendering
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

/* Ensure template colors are preserved if they are also overridden elsewhere */
.flex-it-layout {
  --clr-main: #09aff4;
}

/* Ensure sticky header is bright blue and text is white in all themes */
.header-basic.is-sticky {
  background-color: #09aff4 !important;
}

.header-basic.is-sticky .menu-link,
.header-basic.is-sticky .controls-box .header-search-btn {
  color: #ffffff !important;
}

/* Ensure inner-page-header also has a background */
.header-basic.inner-page-header {
  background-color: #09aff4 !important;
}

.header-basic.inner-page-header .menu-link,
.header-basic.inner-page-header .controls-box .header-search-btn {
  color: #ffffff !important;
}

/* Mobile view - ensure header is always visible */
@media (max-width: 1199px) {
  .header-basic,
  body.dark-theme .header-basic,
  body.dark-theme .header-basic.is-sticky {
    background-color: #09aff4 !important;
  }
  
  .header-basic .menu-link,
  .header-basic .controls-box .header-search-btn {
    color: var(--clr-white) !important;
  }
}
</style>

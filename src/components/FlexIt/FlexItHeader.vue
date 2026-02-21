<template>
  <!--Start Page Header-->
  <header :class="['page-header', headerClass, 'header-basic', { 'is-sticky': isSticky }]" id="page-header">
    <div class="container-fluid px-lg-5">
      <nav class="menu-navbar">
        <div class="header-logo" style="flex-shrink: 0 !important; margin-right: 30px !important;">
          <router-link class="logo-link" to="/" style="text-decoration: none !important; display: flex; align-items: center;">
            <img :src="medkeyLogo" class="medkey-logo-img" alt="MedKey logo">
          </router-link>
        </div>
        
        <FlexItNavbar />

        <div class="controls-box">
          <!-- CTA Buttons -->
          <div class="cta-area">
            <router-link class="btn-solid" to="/onboarding">{{ $t('header.cta_register') }}</router-link>
            <router-link class="btn-outline" to="/auth-pages/login">{{ $t('header.cta_login') }}</router-link>
          </div>
          <!--Dark/Light mode button-->
          <div class="control mode-switcher dark-theme">
            <div class="switch-inner go-light" title="Switch To Light Mode"><i class="bi bi-sun icon"></i></div>
            <div class="switch-inner go-dark" title="Switch To Dark Mode"><i class="bi bi-moon icon"></i></div>
          </div>
          <!--Menu Toggler button-->
          <div class="control menu-toggler" id="menu-toggler-btn"><span></span><span></span><span></span></div>
        </div>
      </nav>
    </div>
  </header>
  <!--End Page Header-->
</template>

<script>
import FlexItNavbar from "./FlexItNavbar.vue";
import medkeyLogo from "@/assets/medkey-logo-dark.svg";

const STICKY_SCROLL_THRESHOLD = 50;

export default {
  props: {
    headerClass: { type: String, default: "content-always-light" }
  },
  components: {
    FlexItNavbar
  },
  data() {
    return {
      isSticky: false,
      medkeyLogo
    };
  },
  mounted() {
    this.updateSticky();
    window.addEventListener("scroll", this.onScroll, { passive: true });
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      this.updateSticky();
    },
    updateSticky() {
      const scrollY = window.scrollY ?? window.pageYOffset;
      this.isSticky = scrollY > STICKY_SCROLL_THRESHOLD;
    }
  }
};
</script>

<style scoped>
.menu-navbar {
  display: grid !important;
  /* Plus d'espace pour le bouton "Accéder gratuitement" qui est long et les icônes de contrôle */
  grid-template-columns: minmax(130px, auto) 1fr minmax(420px, auto) !important;
  align-items: center !important;
  width: 100% !important;
  height: 90px !important;
  gap: 100px !important; /* Gap global extrême */
}

.header-logo {
  grid-column: 1 !important;
  display: flex !important;
  align-items: center !important;
}

:deep(.menu-wrapper) {
  grid-column: 2 !important;
  display: flex !important;
  justify-content: flex-end !important; /* Aligne à droite pour que la marge de sécurité soit effective */
  overflow: visible !important;
}

.controls-box {
  grid-column: 3 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  gap: 12px !important;
}

.cta-area {
  display: flex !important;
  gap: 15px !important;
  align-items: center !important;
  margin-left: 80px !important; /* Espace forcé à gauche des boutons */
}

.cta-area .btn-solid,
.cta-area .btn-outline {
  white-space: nowrap !important;
  padding: 10px 15px !important; /* Réduit pour gagner de la place */
  font-size: 13px !important; /* Légèrement plus petit */
  font-weight: 600 !important;
  border-radius: 8px !important;
  transition: all 0.3s ease !important;
}

.cta-area .btn-solid {
  background-color: var(--clr-main) !important;
  border-color: var(--clr-main) !important;
  color: var(--clr-white) !important;
}

.cta-area .btn-solid:hover {
  background-color: var(--clr-accent) !important;
  border-color: var(--clr-accent) !important;
}

.cta-area .btn-outline {
  background-color: transparent !important;
  border: 2px solid var(--clr-main) !important;
  color: var(--clr-main) !important;
}

.cta-area .btn-outline:hover {
  background-color: var(--clr-main) !important;
  color: var(--clr-white) !important;
}

.content-always-light .cta-area .btn-outline,
.is-sticky .cta-area .btn-outline {
  border-color: var(--clr-white) !important;
  color: var(--clr-white) !important;
}

.content-always-light .cta-area .btn-outline:hover,
.is-sticky .cta-area .btn-outline:hover {
  background-color: var(--clr-white) !important;
  color: var(--clr-main) !important;
}

/* ---- is-sticky : fond bleu au défilement (style Flex-IT) ---- */
.is-sticky.header-basic {
  background: #2563eb !important; /* Bleu vif uniforme au scroll */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1) !important;
  transition: all 0.4s ease !important;
}

.is-sticky.header-basic .container-fluid,
.is-sticky.header-basic nav,
.is-sticky.header-basic .menu-navbar { position: relative; z-index: 1; }

/* Logo */
.medkey-logo-img {
  width: clamp(120px, 11vw, 170px) !important;
  max-width: 100% !important;
  height: auto !important;
  display: block !important;
}

@media (max-width: 1199px) {
  .medkey-logo-img {
    width: 145px !important;
  }
}

@media (max-width: 767px) {
  .medkey-logo-img {
    width: 125px !important;
  }
}

/* CTA buttons sur sticky (fond bleu) */
.is-sticky.header-basic .cta-area .btn-solid {
  background-color: var(--clr-white) !important;
  border-color: var(--clr-white) !important;
  color: #2563eb !important;
}
.is-sticky.header-basic .cta-area .btn-solid:hover {
  background-color: var(--clr-white) !important;
  color: #1d4ed8 !important;
  border-color: var(--clr-white) !important;
}

/* Icons sur sticky */
.is-sticky.header-basic .mode-switcher .icon { color: var(--clr-white) !important; }

@media (max-width: 1450px) {
  .menu-navbar {
     grid-template-columns: 130px 1fr 340px !important;
     gap: 40px !important; /* Augmenté de 20px à 40px */
  }
}

@media (max-width: 1250px) {
  /* Garder les icônes visibles comme demandé */
  .mode-switcher {
    display: flex !important;
  }
  .menu-navbar {
     grid-template-columns: 120px 1fr 350px !important;
     gap: 30px !important;
  }
  .cta-area .btn-solid,
  .cta-area .btn-outline {
    padding: 8px 12px !important;
    font-size: 12px !important;
  }
}

/* Force visibility and styling for controls on all screens */
.controls-box {
  display: flex !important;
  align-items: center !important;
  gap: 15px !important;
}

.mode-switcher {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  cursor: pointer !important;
  visibility: visible !important;
  opacity: 1 !important;
}

.mode-switcher {
  position: relative !important;
  width: 2.25rem !important;
  height: 2.25rem !important;
  background-color: #ffffff !important;
  border-radius: 4px !important;
}

.mode-switcher .icon {
  font-size: 1.25rem !important;
  color: var(--clr-accent) !important;
}

/* Internal icon alignment for switcher */
.mode-switcher .switch-inner {
  position: relative !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

/* Theme specific overrides */
.mode-switcher.dark-theme { background-color: #ffffff !important; }
.mode-switcher.dark-theme .icon { color: #0d1857 !important; }
.mode-switcher.light-theme { background-color: #0d1857 !important; }
.mode-switcher.light-theme .icon { color: #ffffff !important; }

@media (max-width: 1199px) {
  .menu-navbar {
    display: flex !important;
    justify-content: space-between !important;
    padding: 0 15px !important;
  }

  .cta-area {
    display: none !important;
  }

  .controls-box {
    flex-grow: 1 !important;
    justify-content: flex-end !important;
  }

  .menu-toggler {
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    width: 30px !important;
    height: 18px !important;
    cursor: pointer !important;
    margin-left: 20px !important;
    z-index: 1000 !important;
    padding: 0 !important;
    background: transparent !important;
    border: none !important;
  }

  .menu-toggler span {
    display: block !important;
    width: 100% !important;
    height: 2px !important;
    background-color: #ffffff !important;
    transition: all 0.3s ease !important;
    border-radius: 2px !important;
  }

  .menu-toggler.close-menu span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 6px) !important;
  }

  .menu-toggler.close-menu span:nth-child(2) {
    opacity: 0 !important;
  }

  .menu-toggler.close-menu span:nth-child(3) {
    transform: rotate(-45deg) translate(5px, -6px) !important;
  }
}
</style>

<style>
/* Styles globaux pour forcer l'alignement horizontal (sans scoped pour écraser les styles du template) */
/* FIX: On mobile, we need to let the links stack vertically */
@media (min-width: 1200px) {
  .menu-navbar .menu-link, 
  .menu-navbar .menu-item,
  .menu-navbar .word,
  .menu-navbar .char,
  .menu-navbar .whitespace,
  #nav-medkey-list .menu-link, #nav-medkey-list .menu-link *, #nav-medkey-list .word, #nav-medkey-list .char {
    white-space: nowrap !important;
    display: inline !important; /* Force inline pour empêcher le stacking vertical sur desktop */
    float: none !important;
    vertical-align: middle !important;
    align-items: center !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    width: auto !important;
    min-width: max-content !important;
    margin: 0 !important;
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }
}

/* FIX: Mode switcher visibility on dark backgrounds */
.content-always-light .mode-switcher .icon, 
.is-sticky .mode-switcher .icon {
  color: var(--clr-white) !important;
}

@media (min-width: 1200px) {
  .menu-navbar .links-list,
  #nav-medkey-list {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    justify-content: center !important;
    width: auto !important;
    overflow: visible !important;
    flex: 1 1 auto !important;
  }
}

/* Neutralisation totale de Splitting.js pour le menu */
.menu-navbar .word, 
.menu-navbar .char,
#nav-medkey-list .word,
#nav-medkey-list .char {
  position: static !important;
  transform: none !important;
  opacity: 1 !important;
  visibility: visible !important;
  display: inline !important; /* Force inline pour empêcher le wrap des lettres */
}

.menu-navbar .menu-item:last-child {
  margin-right: 120px !important; /* Espace de sécurité extrême avant les boutons CTA */
}

@media (max-width: 1400px) {
  .menu-navbar .menu-item:last-child {
    margin-right: 40px !important; /* Augmenté de 20px à 40px */
  }
}

/* ---- is-sticky : fond bleu au défilement ---- */
#page-header.is-sticky {
  background: #2563eb !important;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1) !important;
  transition: all 0.4s ease !important;
}

/* ---- Navigation Sticky Visibility ---- */
#page-header.is-sticky :deep(.menu-link) {
  color: var(--clr-white) !important;
}

#page-header.is-sticky :deep(.menu-link:hover),
#page-header.is-sticky :deep(.menu-link.active) {
  color: var(--clr-white) !important;
  opacity: 0.8;
}
</style>

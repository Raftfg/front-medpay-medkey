<template>
  <!--Start Page Header-->
  <header :class="['page-header', headerClass, 'header-basic']" id="page-header">
    <div class="header-search-box">
      <div class="close-search"></div>
      <form class="search-form" action="#" method="get">
        <input class="search-input" type="search" name="s" :placeholder="$t('header.search_placeholder')" autofocus="autofocus"/>

        <button class="search-btn" type="submit"><i class="bi bi-search icon"></i></button>
      </form>
    </div>
    <div class="container-fluid px-lg-5">
      <nav class="menu-navbar">
        <div class="header-logo" style="flex-shrink: 0 !important; margin-right: 30px !important;">
          <router-link class="logo-link" to="/" style="text-decoration: none !important; display: flex; align-items: center;">
            <svg width="180" height="60" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg" class="medkey-svg-logo">
              <!-- Med -->
              <text x="0" y="50" font-family="'ITC Avant Garde Gothic Std', sans-serif" font-weight="700" font-size="42" letter-spacing="-1.5" class="med">Med</text>
              <!-- Key -->
              <text x="88" y="50" font-family="'ITC Avant Garde Gothic Std', sans-serif" font-weight="700" font-size="42" letter-spacing="-1.5" class="key">Key</text>
              <!-- Signature -->
              <text x="90" y="68" font-family="'ITC Avant Garde Gothic Std', sans-serif" font-weight="300" font-size="12" class="signature">by Akasi Group</text>
            </svg>
          </router-link>
        </div>
        
        <FlexItNavbar />

        <div class="controls-box">
          <!-- CTA Buttons -->
          <div class="cta-area">
            <router-link class="btn-solid" to="/onboarding">{{ $t('header.cta_register') }}</router-link>
            <router-link class="btn-outline" to="/auth-pages/login">{{ $t('header.cta_login') }}</router-link>
          </div>
          <!--search Icon button-->
          <div class="control header-search-btn"><i class="bi bi-search icon"></i></div>
          <!--Dark/Light mode button-->
          <div class="mode-switcher">
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

export default {
  props: {
    headerClass: { type: String, default: "content-always-light" }
  },
  components: {
    FlexItNavbar
  }
};
</script>

<style scoped>
.menu-navbar {
  display: grid !important;
  /* Plus d'espace pour le bouton "Accéder gratuitement" qui est long */
  grid-template-columns: minmax(130px, auto) 1fr minmax(380px, auto) !important;
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

/* ---- is-sticky : header au défilement (Original Template Style) ---- */
.is-sticky.header-basic {
  background: var(--clr-main) !important;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1) !important;
  transition: all 0.4s ease !important;
}

.is-sticky.header-basic .container-fluid,
.is-sticky.header-basic nav,
.is-sticky.header-basic .menu-navbar { position: relative; z-index: 1; }

/* Logo sur sticky */
.is-sticky.header-basic .medkey-svg-logo .key { fill: var(--clr-white) !important; opacity: 1; }

/* CTA buttons sur sticky */
.is-sticky.header-basic .cta-area .btn-solid {
  background-color: var(--clr-white) !important;
  border-color: var(--clr-white) !important;
  color: var(--clr-main) !important;
}
.is-sticky.header-basic .cta-area .btn-solid:hover {
  background-color: var(--clr-main) !important;
  color: var(--clr-white) !important;
  border-color: var(--clr-white) !important;
}

/* Icons sur sticky */
.is-sticky.header-basic .mode-switcher .icon,
.is-sticky.header-basic .header-search-btn .icon { color: var(--clr-white) !important; }

@media (max-width: 1450px) {
  .menu-navbar {
     grid-template-columns: 130px 1fr 340px !important;
     gap: 40px !important; /* Augmenté de 20px à 40px */
  }
}

@media (max-width: 1250px) {
  /* Garder les icônes visibles comme demandé */
  .header-search-btn, .mode-switcher {
    display: flex !important;
  }
  .menu-navbar {
     grid-template-columns: 120px 1fr 350px !important;
     gap: 30px !important; /* Augmenté de 15px à 30px */
  }
  .cta-area .btn-solid,
  .cta-area .btn-outline {
    padding: 8px 12px !important;
    font-size: 12px !important;
  }
}

@media (max-width: 1199px) {
  /* En dessous de 1200px, on laisse le comportement standard du template pour le mobile */
  .menu-navbar {
    display: flex !important;
    justify-content: space-between !important;
  }
}
</style>

<style>
/* Styles globaux pour forcer l'alignement horizontal (sans scoped pour écraser les styles du template) */
.menu-navbar .menu-link, 
.menu-navbar .menu-item,
.menu-navbar .word,
.menu-navbar .char,
.menu-navbar .whitespace,
#nav-medkey-list .menu-link, #nav-medkey-list .menu-link *, #nav-medkey-list .word, #nav-medkey-list .char {
  white-space: nowrap !important;
  display: inline !important; /* Force inline pour empêcher le stacking vertical */
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

/* FIX: Mode switcher visibility on dark backgrounds */
.content-always-light .mode-switcher .icon, 
.is-sticky .mode-switcher .icon {
  color: var(--clr-white) !important;
}

/* Adaptive Logo Colors (SVG) */
.medkey-svg-logo .med { fill: var(--clr-main); }
.medkey-svg-logo .key { fill: var(--clr-accent); }
.medkey-svg-logo .signature { fill: var(--clr-main); }

.content-always-light .medkey-svg-logo .med,
.is-sticky .medkey-svg-logo .med,
.content-always-light .medkey-svg-logo .signature,
.is-sticky .medkey-svg-logo .signature { 
  fill: var(--clr-white) !important; 
}
.content-always-light .medkey-svg-logo .key,
.is-sticky .medkey-svg-logo .key {
  fill: var(--clr-accent) !important;
  opacity: 1;
}

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

/* ---- is-sticky : fond solide au défilement ---- */
#page-header.is-sticky {
  background: var(--clr-main) !important;
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

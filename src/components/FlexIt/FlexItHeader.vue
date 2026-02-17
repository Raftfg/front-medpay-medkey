<template>
  <!--Start Page Header-->
  <header :class="['page-header', headerClass, 'header-basic']" id="page-header">
    <div class="header-search-box">
      <div class="close-search"></div>
      <form class="search-form" action="#" method="get">
        <input class="search-input" type="search" name="s" placeholder="Search" autofocus="autofocus"/>
        <button class="search-btn" type="submit"><i class="bi bi-search icon"></i></button>
      </form>
    </div>
    <div class="container-fluid px-lg-5">
      <nav class="menu-navbar">
        <div class="header-logo" style="flex-shrink: 0 !important; margin-right: 20px !important;">
          <router-link class="logo-link" to="/">
            <img class="logo-img light-logo" src="@/assets/flex-it/assets/images/logo/logo-light.png" alt="logo" style="max-width: 150px !important;"/>
            <img class="logo-img dark-logo" src="@/assets/flex-it/assets/images/logo/logo-colored.png" alt="logo" style="max-width: 150px !important;"/>
          </router-link>
        </div>
        
        <FlexItNavbar />

        <div class="controls-box">
          <!--Menu Toggler button-->
          <div class="control menu-toggler" id="menu-toggler-btn"><span></span><span></span><span></span></div>
          <!--search Icon button-->
          <div class="control header-search-btn"><i class="bi bi-search icon"></i></div>
          <!--Dark/Light mode button-->
          <div class="mode-switcher">
            <div class="switch-inner go-light" title="Switch To Light Mode"><i class="bi bi-sun icon"></i></div>
            <div class="switch-inner go-dark" title="Switch To Dark Mode"><i class="bi bi-moon icon"></i></div>
          </div>
          <!-- CTA Buttons -->
          <div class="cta-area">
            <router-link class="btn-solid" to="/auth-pages/register">Accéder gratuitement</router-link>
            <router-link class="btn-outline" to="/auth-pages/login">Login</router-link>
          </div>
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
  /* Réduction de la marge des contrôles pour laisser plus de place au menu */
  grid-template-columns: minmax(120px, auto) 1fr minmax(220px, auto) !important;
  align-items: center !important;
  width: 100% !important;
  height: 90px !important;
  gap: 10px !important;
}

.header-logo {
  grid-column: 1 !important;
  display: flex !important;
  align-items: center !important;
}

:deep(.menu-wrapper) {
  grid-column: 2 !important;
  display: flex !important;
  justify-content: center !important;
  overflow: visible !important;
}

.controls-box {
  grid-column: 3 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  gap: 10px !important;
}

.cta-area {
  display: flex !important;
  gap: 5px !important;
  align-items: center !important;
}

.cta-area .btn-solid,
.cta-area .btn-outline {
  white-space: nowrap !important;
  padding: 6px 12px !important;
  font-size: 12px !important;
}

@media (max-width: 1450px) {
  .menu-navbar {
     grid-template-columns: 130px 1fr 250px !important;
  }
}

@media (max-width: 1250px) {
  .header-search-btn, .mode-switcher {
    display: none !important;
  }
  .menu-navbar {
     grid-template-columns: 120px 1fr 200px !important;
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

.menu-navbar .menu-item {
  margin-right: 15px !important;
}

@media (max-width: 1400px) {
  .menu-navbar .menu-item {
    margin-right: 8px !important;
  }
}
</style>

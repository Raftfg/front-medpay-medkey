<template>
  <div class="links menu-wrapper" id="nav-medkey-wrapper">
    <ul class="links-list" id="nav-medkey-list">
      <!-- Product Overview -->
      <li class="menu-item">
        <router-link class="menu-link" to="/">
          <span class="no-split">Product Overview</span>
        </router-link>
      </li>
      
      <!-- Features -->
      <li class="menu-item">
        <router-link class="menu-link" to="/services">
          <span class="no-split">Features</span>
        </router-link>
      </li>
      
      <!-- Pricing Plan -->
      <li class="menu-item">
        <router-link class="menu-link" to="/pricing">
          <span class="no-split">Pricing Plan</span>
        </router-link>
      </li>
      
      <!-- Resource Center -->
      <li class="menu-item has-sub-menu">
        <router-link class="menu-link" to="/faq">
          <span class="no-split">Resource Center</span>
          <i class="fas fa-plus plus-icon"></i>
        </router-link>
        <ul class="sub-menu" style="list-style: none !important;">
          <li class="menu-item sub-menu-item"><router-link class="menu-link sub-menu-link" to="/faq">Documentation</router-link></li>
          <li class="menu-item sub-menu-item"><router-link class="menu-link sub-menu-link" to="/contact-us">Assistance</router-link></li>
        </ul>
      </li>
      
      <!-- Support -->
      <li class="menu-item">
        <router-link class="menu-link" to="/faq">
          <span class="no-split">Support</span>
        </router-link>
      </li>
      
      <!-- Contact sales -->
      <li class="menu-item">
        <router-link class="menu-link" to="/contact-us">
          <span class="no-split">Contact sales</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FlexItNavbar"
};
</script>

<style>
#nav-medkey-list {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: nowrap !important;
  align-items: center !important;
  gap: 25px !important;
}

#nav-medkey-list .menu-item {
  position: relative !important;
  padding: 0 !important;
}

#nav-medkey-list .menu-link {
  height: 90px !important;
  display: flex !important;
  align-items: center !important;
  color: var(--clr-white) !important; /* Force blanc sur fond sombre */
  font-size: 15px !important;
  font-weight: 600 !important;
  text-decoration: none !important;
  transition: all 0.3s ease !important;
}

#nav-medkey-list .menu-link:hover,
#nav-medkey-list .menu-link.active {
  color: var(--clr-accent) !important; /* Rouge Akasi au survol/actif */
}

#nav-medkey-list .plus-icon {
  font-size: 10px !important;
  margin-left: 6px !important;
}

/* Sub-menu styling */
#nav-medkey-list .sub-menu {
  background-color: var(--clr-main) !important;
  border-top: 3px solid var(--clr-accent) !important;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3) !important;
}

#nav-medkey-list .sub-menu-link {
  color: var(--clr-white) !important;
}

#nav-medkey-list .sub-menu-link:hover {
  color: var(--clr-accent) !important;
  background-color: rgba(255,255,255,0.05) !important;
}
</style>

<style scoped>
.menu-wrapper {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: nowrap !important;
  align-items: center !important;
  width: auto !important;
  max-width: none !important;
}

.links-list {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: nowrap !important;
  align-items: center !important;
  margin: 0 !important;
  padding: 0 !important;
  list-style: none !important;
  gap: 12px !important; /* Espacement réduit pour éviter l'overflow */
  width: auto !important;
}

.menu-item {
  display: block !important;
  flex: 0 0 auto !important; /* Empêche tout redimensionnement */
  white-space: nowrap !important;
  min-width: max-content !important;
}

.menu-link {
  display: flex !important;
  flex-direction: row !important;
  flex-wrap: nowrap !important;
  align-items: center !important;
  white-space: nowrap !important;
  width: auto !important;
  min-width: max-content !important;
  padding: 0 4px !important;
  font-size: 14px !important; /* Réduit pour éviter l'overlap */
  line-height: 90px !important;
  text-decoration: none !important;
}

/* On s'assure que si Splitting.js a injecté des spans, ils ne wrappent pas non plus */
.menu-link :deep(*) {
  white-space: nowrap !important;
  display: inline-block !important;
}

@media (max-width: 1500px) {
  .links-list {
    gap: 10px !important;
  }
  .menu-link {
    font-size: 12px !important;
  }
}

@media (max-width: 1199px) {
  /* Forcer l'horizontalité même sur tablettes si l'espace le permet */
  .menu-wrapper {
    position: relative !important;
    left: auto !important;
    top: auto !important;
  }
}
</style>

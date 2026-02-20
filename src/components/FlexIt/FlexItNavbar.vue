<template>
  <div class="links menu-wrapper" id="nav-medkey-wrapper">
    <ul class="links-list" id="nav-medkey-list">
      <!-- Product Overview -->
      <li class="menu-item">
        <router-link class="menu-link" to="/">
          <span class="no-split">Présentation</span>
        </router-link>
      </li>
      
      <!-- Features #modules-->
      <li class="menu-item">
        <a class="menu-link" href="#modules">
          <span class="no-split">Fonctionnalités</span>
        </a>
      </li>
      
      <!-- Pricing Plan -->
      <li class="menu-item">
        <a class="menu-link" href="#pricing-1">
          <span class="no-split">Tarifs</span>
        </a>
      </li>
      
      <!-- Resource Center -->
      <li class="menu-item has-sub-menu">
        <router-link class="menu-link" to="/faq">
          <span class="no-split">Resource</span>
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
          <span class="no-split">Assistance</span>
        </router-link>
      </li>
      
      <!-- Contact sales -->
      <li class="menu-item">
        <router-link class="menu-link" to="/contact-us">
          <span class="no-split">Contact</span>
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
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 25px;
}

#nav-medkey-list .menu-item {
  position: relative;
  padding: 0;
}

#nav-medkey-list .menu-link {
  height: 90px;
  display: flex;
  align-items: center;
  color: var(--clr-white); /* Force blanc sur fond sombre */
  font-size: 15px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

@media (max-width: 1199px) {
  #nav-medkey-list {
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 0 !important;
    width: 100% !important;
  }
  
  #nav-medkey-list .menu-link {
    height: auto !important;
    line-height: normal !important;
    padding: 15px 0 !important;
    width: 100% !important;
  }
}

#nav-medkey-list .menu-link:hover,
#nav-medkey-list .menu-link.active {
  color: var(--clr-main) !important;
}

#nav-medkey-list .plus-icon {
  font-size: 10px !important;
  margin-left: 6px !important;
}

/* Sub-menu styling */
#nav-medkey-list .sub-menu {
  background-color: var(--clr-main) !important;
  border-top: 3px solid var(--clr-white) !important;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3) !important;
}

#nav-medkey-list .sub-menu-link {
  color: var(--clr-white) !important;
}

#nav-medkey-list .sub-menu-link:hover {
  color: var(--clr-white) !important;
  opacity: 0.8;
  background-color: rgba(255,255,255,0.05) !important;
}
</style>

<style scoped>
.menu-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  width: auto;
  max-width: none;
}

.links-list {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  gap: 12px; /* Espacement réduit pour éviter l'overflow */
  width: auto;
}

.menu-item {
  display: block;
  flex: 0 0 auto; /* Empêche tout redimensionnement */
  white-space: nowrap;
  min-width: max-content;
}

.menu-link {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  white-space: nowrap;
  width: auto;
  min-width: max-content;
  padding: 0 4px;
  font-size: 14px; /* Réduit pour éviter l'overlap */
  line-height: 90px;
  text-decoration: none;
}

/* On s'assure que si Splitting.js a injecté des spans, ils ne wrappent pas non plus */
.menu-link :deep(*) {
  white-space: nowrap !important;
  display: inline-block !important;
}

@media (max-width: 1500px) {
  .links-list {
    gap: 10px;
  }
  .menu-link {
    font-size: 12px;
  }
}

@media (max-width: 1199px) {
  .menu-wrapper {
    display: none; /* Cache par défaut si pas la classe .show (géré par le template JS) */
  }
  
  .menu-wrapper.show {
    display: flex !important;
  }

  /* Reset des styles desktop qui cassent le mobile menu */
  .links-list {
    flex-direction: column !important;
    gap: 0 !important;
    width: 100% !important;
  }

  .menu-item {
    width: 100% !important;
    border-bottom: 1px solid rgba(255,255,255,0.1) !important;
  }

  .menu-link {
    line-height: normal !important;
    padding: 12px 1.5rem !important;
    font-size: 16px !important;
  }
}
</style>

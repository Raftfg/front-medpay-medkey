<template>
  <div class="links menu-wrapper" id="nav-medkey-wrapper" style="overflow: visible !important; width: auto !important;">
    <ul class="links-list" id="nav-medkey-list" style="display: table !important; border-collapse: separate !important; border-spacing: 20px 0 !important; list-style: none !important; margin: 0 auto !important; padding: 0 !important; width: auto !important; table-layout: auto !important;">
      <!-- Product Overview -->
      <li class="menu-item" style="display: table-cell !important; white-space: nowrap !important; vertical-align: middle !important; padding: 0 !important; float: none !important; list-style-type: none !important;">
        <router-link class="menu-link" to="/" style="white-space: nowrap !important; display: inline-flex !important; align-items: center !important; padding: 0 !important; color: inherit; font-size: 15px; font-weight: 500; line-height: 1.2 !important; height: 90px; text-decoration: none !important;">
          <span class="no-split" style="display: inline !important; white-space: nowrap !important;">Product&nbsp;Overview</span>
        </router-link>
      </li>
      
      <!-- Features -->
      <li class="menu-item" style="display: table-cell !important; white-space: nowrap !important; vertical-align: middle !important; padding: 0 !important; float: none !important; list-style-type: none !important;">
        <router-link class="menu-link" to="/services" style="white-space: nowrap !important; display: inline-flex !important; align-items: center !important; padding: 0 !important; color: inherit; font-size: 15px; font-weight: 500; line-height: 1.2 !important; height: 90px; text-decoration: none !important;">
          <span class="no-split" style="display: inline !important; white-space: nowrap !important;">Features</span>
        </router-link>
      </li>
      
      <!-- Pricing Plan -->
      <li class="menu-item" style="display: table-cell !important; white-space: nowrap !important; vertical-align: middle !important; padding: 0 !important; float: none !important; list-style-type: none !important;">
        <router-link class="menu-link" to="/pricing" style="white-space: nowrap !important; display: inline-flex !important; align-items: center !important; padding: 0 !important; color: inherit; font-size: 15px; font-weight: 500; line-height: 1.2 !important; height: 90px; text-decoration: none !important;">
          <span class="no-split" style="display: inline !important; white-space: nowrap !important;">Pricing&nbsp;Plan</span>
        </router-link>
      </li>
      
      <!-- Resource Center -->
      <li class="menu-item has-sub-menu" style="display: table-cell !important; white-space: nowrap !important; vertical-align: middle !important; padding: 0 !important; float: none !important; list-style-type: none !important;">
        <router-link class="menu-link" to="/faq" style="white-space: nowrap !important; display: inline-flex !important; align-items: center !important; padding: 0 !important; color: inherit; font-size: 15px; font-weight: 500; line-height: 1.2 !important; height: 90px; text-decoration: none !important;">
          <span class="no-split" style="display: inline !important; white-space: nowrap !important;">Resource&nbsp;Center</span>
          <i class="fas fa-plus plus-icon" style="margin-left: 4px !important; font-size: 9px !important; display: inline-block !important;"></i>
        </router-link>
        <ul class="sub-menu" style="list-style: none !important;">
          <li class="menu-item sub-menu-item"><router-link class="menu-link sub-menu-link" to="/faq">Documentation</router-link></li>
          <li class="menu-item sub-menu-item"><router-link class="menu-link sub-menu-link" to="/contact-us">Assistance</router-link></li>
        </ul>
      </li>
      
      <!-- Support -->
      <li class="menu-item" style="display: table-cell !important; white-space: nowrap !important; vertical-align: middle !important; padding: 0 !important; float: none !important; list-style-type: none !important;">
        <router-link class="menu-link" to="/faq" style="white-space: nowrap !important; display: inline-flex !important; align-items: center !important; padding: 0 !important; color: inherit; font-size: 15px; font-weight: 500; line-height: 1.2 !important; height: 90px; text-decoration: none !important;">
          <span class="no-split" style="display: inline !important; white-space: nowrap !important;">Support</span>
        </router-link>
      </li>
      
      <!-- Contact sales -->
      <li class="menu-item" style="display: table-cell !important; white-space: nowrap !important; vertical-align: middle !important; padding: 0 !important; float: none !important; list-style-type: none !important;">
        <router-link class="menu-link" to="/contact-us" style="white-space: nowrap !important; display: inline-flex !important; align-items: center !important; padding: 0 !important; color: inherit; font-size: 15px; font-weight: 500; line-height: 1.2 !important; height: 90px; text-decoration: none !important;">
          <span class="no-split" style="display: inline !important; white-space: nowrap !important;">Contact&nbsp;sales</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FlexItNavbar",
  mounted() {
    this.forceSingleLine();
    window.addEventListener('load', this.forceSingleLine);
    window.addEventListener('resize', this.forceSingleLine);
    setInterval(this.forceSingleLine, 1000);
  },
  methods: {
    forceSingleLine() {
      const container = document.getElementById('nav-medkey-list');
      if (!container) return;
      
      const elements = container.querySelectorAll('.word, .char, .no-split, span');
      elements.forEach(el => {
        el.style.display = 'inline';
        el.style.whiteSpace = 'nowrap';
        el.style.float = 'none';
        el.style.position = 'static';
        el.style.transform = 'none';
      });
    }
  }
};
</script>

<style>
/* PROTECTION TRIDENT - NIVEAU 3 */
#nav-medkey-list, 
#nav-medkey-list * {
  list-style: none !important;
  list-style-type: none !important;
}

#nav-medkey-list .menu-link::before,
#nav-medkey-list .menu-link::after,
#nav-medkey-list .menu-item::before,
#nav-medkey-list .menu-item::after {
  display: none !important;
  content: none !important;
}

#nav-medkey-list .word, 
#nav-medkey-list .char {
  display: inline !important;
  white-space: nowrap !important;
  float: none !important;
  position: static !important;
  transform: none !important;
  opacity: 1 !important;
  visibility: visible !important;
}

#nav-medkey-list .menu-link {
  height: 90px !important;
  line-height: normal !important;
  display: inline-flex !important;
  align-items: center !important;
}

@media (max-width: 1400px) {
  #nav-medkey-list { border-spacing: 6px 0 !important; }
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
  gap: 20px !important; /* Espacement fixe */
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
  padding: 0 5px !important;
  font-size: 15px !important; /* Taille un peu plus grande pour la lisibilité */
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
    font-size: 13px !important;
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

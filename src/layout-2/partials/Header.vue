<template>
  <b-navbar id="template-header" class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row"
    toggleable="lg" style="background: #0b5d3f">

    <div class="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
      <router-link class="navbar-brand brand-logo" to="/">
        <img 
          src="/images/logo.png" 
          alt="MedKey Logo" 
          class="header-logo"
          fetchpriority="high"
          loading="eager"
          width="125"
          height="65"
        />
      </router-link>
    </div>
    
    <div class="navbar-menu-wrapper d-flex align-items-center ml-auto">
      <button 
        class="navbar-toggler d-lg-block d-none" 
        type="button" 
        @click="toggleSidebar()"
        aria-label="Toggle sidebar"
      >
        <span class="mdi mdi-menu"></span>
      </button>

      <button 
        class="navbar-toggler d-lg-none" 
        type="button" 
        @click="toggleMobileSidebar()"
        aria-label="Toggle mobile menu"
      >
        <span class="mdi mdi-menu"></span>
      </button>
      
      <div class="hospital-name d-none d-md-flex align-items-center text-white px-3">
        <span class="text-uppercase font-weight-bold">Système d'information hospitalier</span>
      </div>
      
      <b-navbar-nav class="navbar-nav-right ml-auto">
        <b-nav-item-dropdown 
          right 
          class="nav-profile"
          no-caret
        >
          <template slot="button-content">
            <div class="d-flex align-items-center">
              <div class="nav-profile-img position-relative">
                <img 
                  src="@/assets/images/user.png" 
                  :alt="userDisplayName || 'Avatar utilisateur'"
                  class="rounded-circle profile-avatar"
                  loading="lazy"
                  width="40"
                  height="40"
                />
                <span 
                  class="availability-status online position-absolute"
                  aria-label="Statut en ligne"
                ></span>
              </div>
              <div class="nav-profile-text ml-2 d-none d-md-block">
                <p class="mb-0 text-white font-weight-bold">
                  {{ userDisplayName || 'Mon profil' }}
                </p>
                <small class="text-white-50" v-if="userRole">
                  {{ userRole }}
                </small>
              </div>
            </div>
          </template>
          
          <b-dropdown-item 
            v-if="user"
            :to="'/profile/list'"
            class="nav-profile-dropdown-item"
          >
            <div class="d-flex align-items-center w-100">
              <i class="mdi mdi-account-circle mr-2 text-success" style="font-size: 1.5rem;"></i>
              <div class="flex-grow-1">
                <div class="font-weight-bold text-dark">{{ userFullName }}</div>
                <small class="text-muted d-block" v-if="userRole">{{ userRole }}</small>
              </div>
            </div>
          </b-dropdown-item>
          
          <b-dropdown-item 
            v-else
            disabled
            class="d-flex align-items-center"
          >
            <i class="mdi mdi-account-circle mr-2 text-muted" style="font-size: 1.2rem;"></i>
            <div class="flex-grow-1">
              <div class="font-weight-bold text-muted">Utilisateur non connecté</div>
            </div>
          </b-dropdown-item>
          
          <b-dropdown-divider></b-dropdown-divider>
          
          <b-dropdown-item 
            @click="logout"
            class="logout-item"
            variant="danger"
          >
            <div class="d-flex align-items-center text-danger">
              <i class="mdi mdi-logout mr-2" style="font-size: 1.2rem;"></i>
              <span class="font-weight-bold">Déconnexion</span>
            </div>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </div>
  </b-navbar>
</template>

<script>
import { LoginService, setLoggedIn } from "@/_services";
import { tenantStorage } from "@/_services/caller.services";

export default {
  name: "my-header",
  data() {
    const getUser = () => {
      try {
        const userStr = tenantStorage.getItem("user") || localStorage.getItem("user");
        return userStr ? JSON.parse(userStr) : null;
      } catch (e) {
        console.error("Erreur lors de la récupération de l'utilisateur:", e);
        return null;
      }
    };
    return {
      user: getUser(),
    };
  },

  computed: {
    /**
     * Retourne le nom complet de l'utilisateur
     */
    userFullName() {
      if (!this.user) return 'Utilisateur';
      
      const name = this.user.name || '';
      const prenom = this.user.prenom || '';
      
      return [name, prenom].filter(Boolean).join(' ').trim() || 'Utilisateur';
    },

    /**
     * Retourne le nom d'affichage (version courte pour le header)
     */
    userDisplayName() {
      if (!this.user) return 'Mon profil';
      
      const name = this.user.name || '';
      const prenom = this.user.prenom ? this.user.prenom.charAt(0) + '.' : '';
      
      return [name, prenom].filter(Boolean).join(' ').trim() || 'Mon profil';
    },

    /**
     * Retourne le rôle de l'utilisateur
     */
    userRole() {
      if (!this.user || !this.user.roles || !Array.isArray(this.user.roles) || this.user.roles.length === 0) {
        return null;
      }
      
      return this.user.roles[0]?.name || null;
    }
  },

  methods: {
    toggleSidebar: () => {
      document.querySelector("body").classList.toggle("sidebar-icon-only");
    },
    toggleMobileSidebar: () => {
      document.querySelector("#sidebar").classList.toggle("active");
    },

    logout() {
      // Fonction pour effectuer la déconnexion locale (même si la requête API échoue)
      const performLocalLogout = () => {
        // Nettoyer le stockage tenant
        tenantStorage.clear();
        
        // Nettoyer aussi le localStorage non préfixé (pour compatibilité)
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
        localStorage.removeItem("hospital_id");
        localStorage.removeItem("permissions");
        localStorage.removeItem("role");
        
        // Mettre à jour l'état de connexion
        setLoggedIn(false);
        
        // Rediriger vers la page de login
        window.location.href = "/auth-pages/login";
      };

      // Essayer de déconnecter via l'API, mais toujours effectuer la déconnexion locale
      LoginService.logout()
        .then((res) => {
          console.log("Déconnexion API réussie", res);
          performLocalLogout();
        })
        .catch((err) => {
          // Même si l'API échoue (CORS, réseau, etc.), effectuer la déconnexion locale
          console.warn("Erreur lors de la déconnexion API (déconnexion locale effectuée):", err);
          performLocalLogout();
        });
    }

  },
};
</script>

<style scoped>
.ml-lg-4 {
  margin-left: 32.5rem !important;
}

/* Logo responsive */
.header-logo {
  max-width: 100%;
  height: auto;
  transition: transform 0.3s ease;
  /* OPTIMISATION: Réduire le reflow en spécifiant les dimensions */
  aspect-ratio: 125 / 65;
  object-fit: contain;
  /* OPTIMISATION: Améliorer le rendu de l'image */
  image-rendering: -webkit-optimize-contrast;
  image-rendering: crisp-edges;
  /* OPTIMISATION: Accélération GPU pour les transitions */
  will-change: transform;
  transform: translateZ(0);
}

.navbar-brand-wrapper {
  min-width: 0;
  flex-shrink: 0;
  /* OPTIMISATION: Isolation de layout pour améliorer les performances */
  contain: layout style;
}

/* Logo sur mobile */
@media (max-width: 575.98px) {
  .header-logo {
    max-width: 120px;
    max-height: 50px;
  }
  
  .navbar-brand-wrapper {
    padding: 0.25rem;
  }
}

@media (min-width: 576px) and (max-width: 991.98px) {
  .header-logo {
    max-width: 150px;
    max-height: 60px;
  }
}

/* Nom de l'hôpital responsive */
.hospital-name {
  font-size: 0.9rem;
  white-space: nowrap;
  /* Supprimer overflow hidden pour éviter de couper le texte */
  overflow: visible;
  max-width: none;
}

@media (max-width: 991.98px) {
  .hospital-name {
    display: none !important;
  }
}

/* Profil utilisateur responsive */
.nav-profile-img {
  position: relative;
  display: inline-block;
  flex-shrink: 0;
}

.profile-avatar {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.profile-avatar:hover {
  border-color: rgba(255, 255, 255, 0.6);
  transform: scale(1.05);
}

.availability-status {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid #0b5d3f;
  bottom: 0;
  right: 0;
}

.availability-status.online {
  background-color: #28a745;
}

.nav-profile-text {
  min-width: 0;
  max-width: 150px;
}

.nav-profile-text p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Mobile - cacher le texte du profil, garder juste l'avatar */
@media (max-width: 767.98px) {
  .profile-avatar {
    width: 35px;
    height: 35px;
  }
  
  .availability-status {
    width: 8px;
    height: 8px;
    border-width: 1.5px;
  }
}

/* Amélioration du dropdown */
::v-deep .nav-profile .dropdown-menu {
  min-width: 200px;
  max-width: 280px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: none;
  margin-top: 10px;
  /* Assurer que le menu ne sort pas de l'écran à gauche */
  right: 0 !important;
  left: auto !important;
}

::v-deep .nav-profile .dropdown-item {
  padding: 12px 16px;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

::v-deep .nav-profile .dropdown-item:hover {
  background-color: #f8f9fa;
}

::v-deep .nav-profile .dropdown-item.text-danger:hover {
  background-color: #fff5f5;
}

::v-deep .nav-profile .dropdown-item:focus {
  outline: none;
  background-color: #f8f9fa;
}

::v-deep .nav-profile .dropdown-item.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

::v-deep .nav-profile .dropdown-item .router-link-active {
  color: inherit;
}

::v-deep .nav-profile .dropdown-item a {
  color: inherit;
  text-decoration: none;
}

::v-deep .nav-profile .dropdown-item a:hover {
  color: inherit;
  text-decoration: none;
}

::v-deep .nav-profile .dropdown-divider {
  margin: 8px 0;
}

/* Mobile - dropdown plus large */
@media (max-width: 575.98px) {
  ::v-deep .nav-profile .dropdown-menu {
    min-width: 200px;
    right: 0;
    left: auto;
  }
}

/* Navbar toggler amélioré */
.navbar-toggler {
  border: none;
  padding: 0.5rem;
  color: white;
  font-size: 1.5rem;
  transition: opacity 0.3s ease;
}

.navbar-toggler:hover {
  opacity: 0.8;
}

.navbar-toggler:focus {
  outline: none;
  box-shadow: none;
}

/* Espacement responsive */
.navbar-menu-wrapper {
  gap: 0.5rem;
}

@media (max-width: 575.98px) {
  .navbar-menu-wrapper {
    gap: 0.25rem;
  }
}
</style>

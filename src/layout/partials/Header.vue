<template>
  <b-navbar id="template-header" class="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row"
    toggleable="lg">
    <div class="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
      <router-link class="navbar-brand brand-logo" to="/home">
        <img src="@/assets/images/logo.png" alt="profile" style="width: 125px; height: 65px" />
      </router-link>

      <router-link class="navbar-brand brand-logo-mini" to="/">
        <img src="@/assets/images/logo.png" alt="logo" style="width: 125px; height: 65px" />
      </router-link>
    </div>
    <div class="navbar-menu-wrapper d-flex align-items-center ml-auto ml-lg-0">
      <button class="navbar-toggler navbar-toggler align-self-center d-lg-block font-weight-bold" type="button"
        @click="toggleSidebar()">
        <span class="mdi mdi-menu font-weight-bold"></span>
      </button>
      <div class="search-field d-none d-md-block">
        <div class="nav-profile-text">
          <router-link class="nav-link" to="/home">
            <span class="mb-0 text-black font-weight-bold">Accueil
              <i class="mdi mdi-home page-title-icon bg-gradient-success text-white mr-2 font-weight-bold"></i></span>
          </router-link>
        </div>
      </div>
      <b-navbar-nav class="navbar-nav-right ml-auto">
        <b-nav-item-dropdown right class="nav-profile">
          <template slot="button-content">
            <span class="nav-link dropdown-toggle" id="profileDropdown" href="javascript:void(0);" data-toggle="dropdown"
              aria-expanded="false">
              <div class="nav-profile-img">
                <router-link to="/profile/list">
                  <img src="@/assets/images/user.png" alt="image" />
                  <span class="availability-status online"></span>
                </router-link>
              </div>
              <div class="nav-profile-text">
                <p class="mb-1 text-black font-weight-bold">
                  Mon profile
                </p>
              </div>
            </span>
          </template>
          <b-dropdown-item>
            <router-link to="/profile/list">
              <i class="mdi mdi-account mr-2 text-success"></i>{{ user.name }} {{ user.prenom }} <br> ( {{
                user.roles[0].name }})
            </router-link>
          </b-dropdown-item>
          <b-dropdown-item @click="logout">
            <i class="mdi mdi-logout mr-5 text-danger"></i> Déconnexion
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <button class="navbar-toggler navbar-toggler-right align-self-center" type="button" @click="toggleMobileSidebar()">
        <span class="mdi mdi-menu"></span>
      </button>
    </div>
  </b-navbar>
</template>

<script>
import { LoginService, setLoggedIn } from "@/_services";
export default {
  name: "app-header",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
    };
  },

  methods: {
    toggleSidebar: () => {
      document.querySelector("body").classList.toggle("sidebar-icon-only");
    },
    toggleMobileSidebar: () => {
      document.querySelector("#sidebar").classList.toggle("active");
    },
    logout() {
      // Effectuer la déconnexion
      LoginService.logout()
        .then((res) => {
          console.log(res);
          localStorage.clear();
          window.location.replace("/auth-pages/login");
        });
    }
  },
};
</script>
<style scoped></style>

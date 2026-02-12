<template>
  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <li class="nav-item">
          <router-link
            class="nav-link"
            to="/movments/list"
            style="text-decoration: none"
            active-class="active"
          >
            <i class="mdi mdi-hospital-building menu-icon text-white"></i>
            <span class="menu-title">Venues en cours</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link
            class="nav-link"
            to="/movments/all"
            style="text-decoration: none"
            active-class="active"
          >
            <i class="mdi mdi-history menu-icon text-white"></i>
            <span class="menu-title">Toutes les venues</span>
          </router-link>
        </li>
        
        <li class="nav-item">
          <router-link
            class="nav-link"
            to="/movments/create"
            style="text-decoration: none"
            active-class="active"
          >
            <i class="mdi mdi-plus-circle menu-icon text-white"></i>
            <span class="menu-title">Nouvelle venue</span>
          </router-link>
        </li>


     <!--   <li class="nav-item" >
          <router-link
            class="nav-link"
            to="#"
            style="text-decoration: none"
          >
            <span class="menu-title">Messages</span>

          </router-link>
        </li>

        <li class="nav-item" >
          <router-link
            class="nav-link"
            to="#"
            style="text-decoration: none"
          >
            <span class="menu-title">Rapport des Venues</span>

          </router-link>
        </li>-->

       <!-- <li class="nav-item" >
          <router-link
            class="nav-link"
            to="#"
            style="text-decoration: none"
          >
            <span class="menu-title">Dossiers Patients</span>

          </router-link>
        </li>-->


        <li class="nav-item" style="border-top: 1px solid rgba(255, 255, 255, 0.1); margin-top: 10px; padding-top: 10px;">
          <span class="nav-link" v-b-toggle="'other-modules'">
            <i class="mdi mdi-apps menu-icon text-white"></i>
            <span class="menu-title">Autres modules</span>
            <i class="menu-arrow"></i>
          </span>

          <b-collapse accordion="sidebar-accordion" id="other-modules">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/patients/list">
                  <i class="mdi mdi-account-group menu-icon"></i>
                  <span class="menu-title">Patients</span>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link class="nav-link" to="/service/facturation">
                  <i class="mdi mdi-cash-multiple menu-icon"></i>
                  <span class="menu-title">Facturations</span>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link class="nav-link" to="/medical-services/urgences">
                  <i class="mdi mdi-hospital menu-icon"></i>
                  <span class="menu-title">Services Médicaux</span>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link class="nav-link" to="/hospitalization/bed/list">
                  <i class="mdi mdi-bed menu-icon"></i>
                  <span class="menu-title">Hospitalisations</span>
                </router-link>
              </li>

              <li class="nav-item">
                <router-link class="nav-link" to="/priseencharge/list">
                  <i class="mdi mdi-shield-account menu-icon"></i>
                  <span class="menu-title">Assurances</span>
                </router-link>
              </li>
            </ul>
          </b-collapse>
        </li>
      </ul>

    </nav>
  </section>
</template>

<script>
import { LoginService, setLoggedIn } from "@/_services";

export default {
  name: "sidebar",
  data() {
    return {
      // user: JSON.parse(localStorage.getItem("user")),
      // permission: JSON.parse(localStorage.getItem("permission")),
      collapses: [{ show: false }, { show: false }, { show: false }],
    };
  },
  methods: {
    collapseAll() {
      var exp_elm = document.getElementsByClassName("show");
      if (exp_elm.length > 0) {
        var elm_id = exp_elm[0].id;
        this.$root.$emit("bv::toggle::collapse", elm_id);
      }
    },
    // logout() {
    //   LoginService.logout();
    // },
  },
  mounted() {
    const body = document.querySelector("body");
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll(".sidebar .nav-item").forEach(function (el) {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  },
  watch: {
    $route() {
      document.querySelector("#sidebar").classList.toggle("active");
    },
  },
};
</script>

<style>
/* .bien{
  filter: brightness(100%);
  } */

.special-style-icon {
  color: white !important;
}

.nav-item,
.nav-link {
  font-family: "Montserrat";
  text-align: left !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
}

.menu-icon {
  margin-right: 10px;
  font-size: 20px;
}

.nav-link.active {
  background-color: rgba(255, 255, 255, 0.1);
  border-left: 3px solid #fff;
}

.sub-menu .nav-link {
  padding-left: 2rem;
}

.ok {
  font-weight: bold !important;
  color: black !important;
}
</style>

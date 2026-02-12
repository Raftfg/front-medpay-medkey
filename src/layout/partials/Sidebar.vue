<template>
  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <!-- <li class="nav-item nav-profile">
          <a href="javascript:void(0);" class="nav-link">
            <div
              class="navbar-brand brand-logo text-center navbar-brand-wrapper d-flex align-items-top justify-content-center"
            >
              <img src="@/assets/images/logopay.png" alt="profile" style="width: 100%; height: 100%" />
              
            </div>
          </a>
        </li> -->

        <!-- <li class="nav-item font-weight-500" v-on:click="collapseAll">
          <router-link class="nav-link" to="/dashboard">
            <span class="menu-title">Tableau de board</span>

            <i class="mdi mdi-home menu-icon text-white"></i>
          </router-link>
        </li> -->
        <!-- 
        <i class="mdi menu-icon special-style-icon"
          ><img
            src="@/assets/images/dashboard.png"
            alt="patient"
            style="width: 1rem; height: 1rem"
          />
        </i> -->


        

        <li class="nav-item">
          <!-- v-if="permission.includes('Voir_module_assurance_patient')" -->
          <!-- v-if="permission.includes('Voir_module_assurance_patient')" -->

          <router-link
            class="nav-link"
            to="/priseencharge/list"
            style="text-decoration: none"
          >
            <span class="menu-title"> Pack patient </span>

           
          </router-link>
        </li>

        <!-- <li class="nav-item">
         
          <router-link
            class="nav-link"
            to="/indigence-patient/list-indigence-patient"
            style="text-decoration: none"
          >
            <span class="menu-title">Indigence Patient</span>

          
          </router-link>
        </li> -->

        <!-- <li class="nav-item">


          <router-link
            class="nav-link"
            to="/payement/list"
            style="text-decoration: none"
          >
          
            <span class="menu-title">Paiement et Facturation</span>

         
          </router-link>
        </li> -->

        <!-- <li class="nav-item">
        
          <span class="nav-link" v-b-toggle="'tresorerie'">
            <span class="menu-title">Trésorerie</span>

            <i class="menu-arrow"></i>

           
          </span>

          <b-collapse accordion="sidebar-accordion" id="tresorerie">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/tresorerie/list-encaissement"
                  >Encaissement</router-link
                >
              </li>

              <li class="nav-item">
                <router-link
                  class="nav-link"
                  to="/tresorerie/list-decaissement"
                >
                  Décaissement</router-link
                >
              </li>
            </ul>
          </b-collapse>
        </li> -->

    
        <!-- <li class="nav-item">
         
          <span class="nav-link" v-b-toggle="'rapport'">
            <span class="menu-title">Rapports journaliers</span>

            <i class="menu-arrow"></i>

          </span>

          <b-collapse accordion="sidebar-accordion" id="rapport">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/rapport"
                  >Rapport Hôpital</router-link
                >
              </li>

              <li class="nav-item">
                <router-link class="nav-link" to="/rapport/caissier"
                  >Rapport Caissier</router-link
                >
              </li>

              <li class="nav-item">
                <router-link class="nav-link" to="/rapport/terminal"
                  >Rapport Terminal</router-link
                >
              </li>
            </ul>
          </b-collapse>
        </li> -->

        <li class="nav-item">
          <!-- v-if="permission.includes('Voir_module_rapport_general')" -->
          <!-- v-if="permission.includes('Voir_module_tresorier')" -->
          <!-- <span class="nav-link" v-b-toggle="'rapports'">
            <span class="menu-title">Rapport Général</span>

            <i class="menu-arrow"></i>

            
          </span> -->

          <b-collapse accordion="sidebar-accordion" id="rapports">
            <ul class="nav flex-column sub-menu">
              <!-- <li class="nav-item">
                <router-link class="nav-link" to="/rapport-general/hospital"
                  >Rapport Hôpital</router-link
                >
              </li> -->

              <!-- <li class="nav-item">
                <router-link class="nav-link" to="/rapport-general/geospatial"
                  >Rapport Géospatial
                </router-link>
              </li> -->
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
  /* font-weight: bold; */
  /* font-size: 18px !important;  */
  font-family: "Montserrat";
}

.ok {
  font-weight: bold !important;
  color: black !important;
}
</style>

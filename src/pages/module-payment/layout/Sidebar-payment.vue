<template>
  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <li class="nav-item">

          <router-link class="nav-link" to="/service/facturation" style="text-decoration: none">
            <span class="menu-title">Facturation </span>

          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/payement/list" style="text-decoration: none">
            <span class="menu-title">Liste des Factures </span>

          </router-link>
        </li>
        <!-- 
        <li class="nav-item font-weight-500" v-on:click="collapseAll">
          <router-link class="nav-link" to="/payement/dashboard">
            <span class="menu-title">Tableau de board</span>

            <i class="mdi mdi-home menu-icon text-white"></i>
        
          </router-link>
        </li> -->

        <!-- <li class="nav-item">

          <router-link class="nav-link" to="/payement/configuration" style="text-decoration: none">
            <span class="menu-title">Signataires </span>

          </router-link>
        </li> -->

        <!-- <li class="nav-item">

          <router-link class="nav-link" to="/payement/caisse" style="text-decoration: none">
            <span class="menu-title">Caisse </span>

          </router-link>
        </li> -->

        <!-- <li class="nav-item">
          <router-link class="nav-link" to="/payement/rapport" style="text-decoration: none">
            <span class="menu-title">Rapports </span>
          </router-link>
        </li> -->

        <li class="nav-item">

          <span class="nav-link" v-b-toggle="'rapport'">
            <span class="menu-title">Aller aux Modules</span>
            <i class="menu-arrow"></i>
          </span>

          <b-collapse accordion="sidebar-accordion" id="rapport">
            <ul class="nav flex-column sub-menu">

              <!-- <li class="nav-item">
                <router-link class="nav-link" to="/caisse/create">Caisses </router-link>
              </li> -->

              <!-- <li class="nav-item">
                <router-link class="nav-link" to="#">Pharmacie</router-link>
              </li> -->
              <li class="nav-item">
                <router-link class="nav-link" to="/medicaments/list">Médicaments</router-link>
              </li>

              <li class="nav-item">
                <router-link class="nav-link" to="/priseencharge/list">Pack patient</router-link>
              </li>

            </ul>
          </b-collapse>
        </li>
        <!-- 
        <li class="nav-item">
          <span class="nav-link" v-b-toggle="'ui-basic'">
            <span class="menu-title">Rapport</span>

            <i class="menu-arrow"></i>
          </span>

          <b-collapse accordion="sidebar-accordion" id="ui-basic">
            <ul class="nav flex-column sub-menu">

            </ul>
          </b-collapse>
        </li> -->




        <br>
        <!-- <li class="sidebar-actions mt-5">
          <span class="nav-link" v-on:click="logout">
            <button class="btn btn-block pt-3 mx-auto text-center" style="background-color: #eadb9a">
              <i class="mdi mdi-power ok"></i>
              <span style="color: rgb(12, 1, 1) !important; font-weight: bold">Déconnexion</span>
            </button>
          </span>
        </li> -->
      </ul>
    </nav>
  </section>
</template>

<script>
import { LoginService, setLoggedIn } from "@/_services";

export default {
  name: "sidebarPayment",
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
    logout() {
      LoginService.logout();
    },
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
.separator {
  width: 100%;
  border: none;
  border-top: 1px solid #767676;
  /* Exemple : ligne horizontale grise */
  margin: 6px 0;
  /* Espacement au-dessus et en dessous de la ligne */
}

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

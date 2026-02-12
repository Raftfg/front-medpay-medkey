<template>
  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/rapport_statistique/list" style="text-decoration: none">
            <span class="menu-title">Dashboard</span>
          </router-link>
        </li>

       <!-- <li class="nav-item">
          <router-link class="nav-link" to="/rapport_statistique/list" style="text-decoration: none">
            <span class="menu-title">Patient & Mouvement</span>
          </router-link>
        </li>-->
        <li class="nav-item">
          <router-link class="nav-link" to="/rapport_statistique/caisse" style="text-decoration: none">
            <span class="menu-title">Facturation & Caisse</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/rapport_statistique/stock" style="text-decoration: none">
            <span class="menu-title">Stock & Consommable</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/rapport_statistique/destock" style="text-decoration: none">
            <span class="menu-title">Pharmacie</span>
          </router-link>
        </li> 
        <li class="nav-item">
          <router-link class="nav-link" to="/rapport_statistique/recouvrement" style="text-decoration: none">
            <span class="menu-title">Recouvrement</span>
          </router-link>

        </li> 

        <!-- <li class="nav-item">
          <router-link class="nav-link" to="/patients/list" style="text-decoration: none">
            <span class="menu-title">Historiques</span>
          </router-link>
        </li> -->
        <br>

      </ul>
    </nav>
  </section>
</template>

<script>
import { LoginService, setLoggedIn } from "@/_services";

export default {
  name: "sidebarRapport_statistique",
  data() {
    return {
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
    // Affiche les données de l'utilisateur dans la console
    console.log("Données de l'utilisateur : ", this.user);
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

<template>
  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/patients/list" style="text-decoration: none">
            <i class="mdi mdi-account-group menu-icon text-white"></i>
            <span class="menu-title">Liste des patients</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/patients/dme-index" style="text-decoration: none">
            <i class="mdi mdi-folder-account menu-icon text-white"></i>
            <span class="menu-title">Dossier médical (DME)</span>
          </router-link>
        </li>

        <li class="nav-item">
          <router-link class="nav-link" to="/movments/list" style="text-decoration: none">
            <i class="mdi mdi-hospital-building menu-icon text-white"></i>
            <span class="menu-title">Admissions (ADT)</span>
          </router-link>
        </li>
        <br>

      </ul>
    </nav>
  </section>
</template>

<script>
import { LoginService, setLoggedIn } from "@/_services";

export default {
  name: "sidebarPatient",
  data() {
    return {
      user: null,
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
    // Récupération de l'utilisateur
    try {
      this.user = JSON.parse(localStorage.getItem("user"));
    } catch (e) {
      console.error("Erreur lors du parsing de l'utilisateur dans Sidebar:", e);
    }

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
  font-family: "Montserrat";
  text-align: left !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
}

.menu-icon {
  margin-right: 10px;
}
</style>

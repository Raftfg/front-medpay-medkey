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

        <li class="nav-item font-weight-500" v-on:click="collapseAll">
          <router-link class="nav-link" to="'#'">
            <span class="menu-title">Tableau de board</span>

            <i class="mdi mdi-home menu-icon text-white"></i>
            <!-- 
            <i class="mdi menu-icon special-style-icon"
              ><img
                src="@/assets/images/dashboard.png"
                alt="assurance"
                style="width: 1rem; height: 1rem"
              />
            </i> -->
          </router-link>
        </li>

       

        <li class="nav-item">
          <!-- v-if="permission.includes('Voir_module_assurance')" -->

          <router-link
            class="nav-link"
            to="/assurances/list"
            style="text-decoration: none"
          >
            <!-- <span class="menu-title">Gestion des assurances</span> -->

            <span class="menu-title">Gestion des assurances</span>
            <!-- 
            <i class="mdi menu-icon special-style-icon"
              ><img
                src="@/assets/images/assurances.png"
                alt="assurance"
                style="width: 1rem; height: 1rem"
              />
            </i> -->
          </router-link>
        </li>

        <!-- <li
          class="nav-item"
          v-if="permission.includes('Voir_module_assurance_assurance')"
        >
          <router-link
            class="nav-link"
            to="/priseencharge/list"
            style="text-decoration: none"
          >
            <span class="menu-title"> Assurance assurance </span>
          </router-link>
        </li> -->

        <!-- <li
          class="nav-item"
          v-if="permission.includes('Voir_module_indigence_assurance')"
        >
          <router-link
            class="nav-link"
            to="/indigence-assurance/list-indigence-assurance"
            style="text-decoration: none"
          >
            <span class="menu-title">Indigence Assurance</span>
          </router-link>
        </li> -->

        <!-- <li class="sidebar-actions">
          <span class="nav-link" v-on:click="logout">
            <button
              class="btn btn-block pt-3 mx-auto text-center"
              style="background-color: #eadb9a"
            >
              <i class="mdi mdi-power ok"></i>
              <span style="color: rgb(12, 1, 1) !important; font-weight: bold"
                >Déconnexion</span
              >
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
  name: "sidebarAssurance",
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

<template>
  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/hospitalization/bed/list" style="text-decoration: none" active-class="active">
            <i class="mdi mdi-bed menu-icon text-white"></i>
            <span class="menu-title">Lits</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/hospitalization/room/list" style="text-decoration: none" active-class="active">
            <i class="mdi mdi-door-open menu-icon text-white"></i>
            <span class="menu-title">Salles</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/hospitalization/history/list" style="text-decoration: none" active-class="active">
            <i class="mdi mdi-hospital-building menu-icon text-white"></i>
            <span class="menu-title">Hospitalisation</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
import { LoginService, setLoggedIn } from "@/_services";

export default {
  name: "sidebarHospitalization",
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

.ok {
  font-weight: bold !important;
  color: black !important;
}
</style>

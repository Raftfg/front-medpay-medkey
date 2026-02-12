<template>
  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <!--------------------------Start Stock Module Configuration-------------------------->
        <li class="nav-item">
          <span class="nav-link" v-b-toggle="'stocks'">
            <span class="menu-title" style="color: #fff;">Stocks</span>
            <i class="menu-arrow"></i>
          </span>

          <b-collapse accordion="sidebar-accordion" id="stocks">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/configuration/store/list">Magasins</router-link>
              </li>

              <li class="nav-item">
                <router-link class="nav-link" to="/configuration/stock/list">Stocks</router-link>
              </li>

              <li class="nav-item">
                <router-link class="nav-link" to="/configuration/category/list">Catégories</router-link>
              </li>

              <li class="nav-item">
                <router-link class="nav-link" to="/configuration/supplier/list">Fournisseurs</router-link>
              </li>
            </ul>
          </b-collapse>
        </li>
        <!--------------------------End Stock Module Configuration-------------------------->
       
        <!--------------------------Start Caisse Module Configuration-------------------------->
        <li class="nav-item">
          <span class="nav-link" v-b-toggle="'caisses'">
            <span class="menu-title" style="color: #fff;">Caisses</span>
            <i class="menu-arrow"></i>
          </span>

          <b-collapse accordion="sidebar-accordion" id="caisses">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/payement/configuration">Signataires</router-link>
              </li>

              <li class="nav-item">
                <router-link class="nav-link" to="/caisse/list">Caisses</router-link>
              </li>

              <li class="nav-item">
                <router-link class="nav-link" to="/caisse/planning-caisse">Planning des caisses</router-link>
              </li>

              <!-- <li class="nav-item">
                <router-link class="nav-link" to="/payement/configuration">Planning des caisses </router-link>
              </li> -->
            </ul>
          </b-collapse>
        </li>
        <!--------------------------End Caisse Module Configuration-------------------------->

        <!--------------------------Start User Module Configuration-------------------------->
        <li class="nav-item">
          <span class="nav-link" v-b-toggle="'users'">
            <span class="menu-title" style="color: #fff;">Utilisateurs</span>
            <i class="menu-arrow"></i>
          </span>

          <b-collapse accordion="sidebar-accordion" id="users">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/user/list">Utilisateurs</router-link>
              </li>

              <li class="nav-item">
                <router-link class="nav-link" to="/user/role/list">Rôles</router-link>
              </li>

              <li class="nav-item">
                <router-link class="nav-link" to="/user/role/permissions">Permissions</router-link>
              </li>
            </ul>
          </b-collapse>
        </li>
        <!--------------------------End User Module Configuration-------------------------->
        
         <!--------------------------Start Assurance Module Configuration-------------------------->
         <li class="nav-item">
          <router-link class="nav-link" to="/assurance/list" style="text-decoration: none">
            <span class="menu-title"> Assurance </span>
          </router-link>
        </li>
        <!-- <li class="nav-item">
          <router-link class="nav-link" to="/pack/list" style="text-decoration: none">
            <span class="menu-title"> Pack d'assurance </span>
          </router-link>
        </li> -->
        <!--------------------------End Assurance Module Configuration-------------------------->
      </ul>
    </nav>
  </section>
</template>

<script>
import { LoginService, setLoggedIn } from "@/_services";

export default {
  name: "sidebarConfiguration",
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

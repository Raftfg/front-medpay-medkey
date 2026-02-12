<template>
  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <!-- <li class="nav-item"> -->
          <!-- v-if="permission.includes('Voir_module_paramètre')" -->
          <!-- <span class="nav-link" v-b-toggle="'ui-basic'">
            <span class="menu-title">Configuration</span>

            <i class="menu-arrow"></i> -->
            <!-- 
            <img
              src="@/assets/images/setting.png"
              alt="patient"
              style="width: 1rem; height: 1rem"
            /> -->
          <!-- </span>

          <b-collapse accordion="sidebar-accordion" id="ui-basic">
            <ul class="nav flex-column sub-menu">
              <li class="nav-item">
                <router-link class="nav-link" to="/store/list">Magasins</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/stock/list">Stocks</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/type-product/list">Type Produits</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/category/list">Categories</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/supplier/list">Fournisseur</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/product/list">Article</router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/product-specification/list">Produits</router-link>
              </li>
            </ul>
          </b-collapse>
        </li> -->
        <!-- <li class="nav-item">
          <router-link class="nav-link" to="/product-specification/list" style="text-decoration: none">
            <span class="menu-title"> Tableau de bord </span>

            <i class="mdi menu-icon special-style-icon"
              ><img
                src="@/assets/images/patient.png"
                alt="patient"
                style="width: 1rem; height: 1rem"
              />
            </i> -->
          <!-- </router-link>
        </li> --> 
        <li class="nav-item">
          <router-link class="nav-link" to="/medicaments/list" style="text-decoration: none">
            <span class="menu-title"> Médicaments </span>

            <!-- <i class="mdi menu-icon special-style-icon"
              ><img
                src="@/assets/images/patient.png"
                alt="patient"
                style="width: 1rem; height: 1rem"
              />
            </i> -->
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/carnets-cartes/list" style="text-decoration: none">
            <span class="menu-title"> Carnets et cartes </span>

            <!-- <i class="mdi menu-icon special-style-icon"
              ><img
                src="@/assets/images/patient.png"
                alt="patient"
                style="width: 1rem; height: 1rem"
              />
            </i> -->
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/consommables/list" style="text-decoration: none">
            <span class="menu-title"> Consommables </span>

            <!-- <i class="mdi menu-icon special-style-icon"
              ><img
                src="@/assets/images/patient.png"
                alt="patient"
                style="width: 1rem; height: 1rem"
              />
            </i> -->
          </router-link>
        </li>


        <!-- <li class="nav-item"> -->
          <!-- v-if="permission.includes('Voir_module_patient')" -->
          <!-- v-if="permission.includes('Voir_module_patient')" -->

          <!-- <router-link class="nav-link" to="/consulter/produits/stock" style="text-decoration: none"> -->
            <!-- <span class="menu-title">Gestion des patients</span> -->

            <!-- <span class="menu-title">Stocks</span> -->
            
            <!-- <i class="mdi menu-icon special-style-icon"
              ><img
                src="@/assets/images/patients.png"
                alt="patient"
                style="width: 1rem; height: 1rem"
              />
            </i> -->
          <!-- </router-link>
        </li> -->

        <!-- <li class="nav-item"> -->
          <!-- v-if="permission.includes('Voir_module_assurance_patient')" -->
        <!-- 
          <router-link class="nav-link" to="/sale/create" style="text-decoration: none">
            <span class="menu-title"> Ventes </span> -->

            <!-- <i class="mdi menu-icon special-style-icon"
              ><img
                src="@/assets/images/patient.png"
                alt="patient"
                style="width: 1rem; height: 1rem"
              />
            </i> -->

            <!-- <i class="menu-arrow"></i> -->
          <!-- </router-link>
        </li> -->

        <li class="nav-item">
          <!-- v-if="permission.includes('Voir_module_assurance_patient')" -->

          <router-link class="nav-link" to="/supply/list" style="text-decoration: none">
            <span class="menu-title"> Approvisionnements </span>

            <!-- <i class="mdi menu-icon special-style-icon"
              ><img
                src="@/assets/images/patient.png"
                alt="patient"
                style="width: 1rem; height: 1rem"
              />
            </i> -->

            <!-- <i class="menu-arrow"></i> -->
          </router-link>
        </li>
        <li class="nav-item">
          <!-- v-if="permission.includes('Voir_module_assurance_patient')" -->

          <router-link class="nav-link" to="/transfert/list" style="text-decoration: none">
            <span class="menu-title"> Transferts </span>
          </router-link>
        </li>

        <li class="nav-item">
          <!-- v-if="permission.includes('Voir_module_assurance_patient')" -->

          <router-link class="nav-link" to="/magasin-stocks/list" style="text-decoration: none">
            <span class="menu-title"> Magasins / Stocks </span>

            <!-- <i class="mdi menu-icon special-style-icon"
              ><img
                src="@/assets/images/patient.png"
                alt="patient"
                style="width: 1rem; height: 1rem"
              />
            </i> -->

            <!-- <i class="menu-arrow"></i> -->
          </router-link>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
import { LoginService, setLoggedIn } from "@/_services";

export default {
  name: "sidebarStock",
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

<template>
  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">

       <li class="nav-item ">
         <span class="nav-link" v-b-toggle="'urgences'">
          <i class="mdi mdi-hospital-box menu-icon text-white"></i>
          <span class="menu-title">Service des urgences</span>
          <i class="menu-arrow"></i>
        </span>

        <b-collapse accordion="sidebar-accordion" id="urgences">
          <ul class="nav flex-column sub-menu">
            <li class="nav-item">
              <router-link class="nav-link" to="/medical-services/urgences"
              >Patients en traitement</router-link
              >
            </li>


            <li class="nav-item" >
              <a @click="toActes('urgence')"  class="nav-link"
              >Actes médicaux / prestations <div v-if="sideSpinner" class="spinner-border spinner-border-sm text-primary" style="font-size:5px" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </a>
          </li>
        </ul>
      </b-collapse>
    </li>

    <li class="nav-item ">
      <span class="nav-link" v-b-toggle="'infirmerie'">
        <i class="mdi mdi-hospital-building menu-icon text-white"></i>
        <span class="menu-title">Service d'Infirmerie</span>
        <i class="menu-arrow"></i>
      </span>

      <b-collapse accordion="sidebar-accordion" id="infirmerie">
        <ul class="nav flex-column sub-menu">
          <li class="nav-item">
            <router-link class="nav-link" to="/medical-services/infirmerie"
            >Patients en traitement</router-link
            >
          </li>

          <li class="nav-item">
            <span @click="toActes('infirmerie')" class="nav-link" to="#"
            >Actes médicaux / prestations
          </span>
        </li>
      </ul>
    </b-collapse>
  </li>

  <li class="nav-item ">
   <span class="nav-link" v-b-toggle="'maternite'">
    <i class="mdi mdi-baby-face-outline menu-icon text-white"></i>
    <span class="menu-title">Service de Maternité</span>
    <i class="menu-arrow"></i>
  </span>

  <b-collapse accordion="sidebar-accordion" id="maternite">
    <ul class="nav flex-column sub-menu">
      <li class="nav-item">
        <router-link class="nav-link" to="/medical-services/maternite"
        >Patients en traitement</router-link
        >
      </li>
      <li class="nav-item">
       <span @click="toActes('maternite')" class="nav-link" to="#"
       >Actes médicaux / prestations
     </span>
   </li>
 </ul>
</b-collapse>
</li>




<li class="nav-item ">
 <span class="nav-link" v-b-toggle="'chirurgie'">
  <i class="mdi mdi-scissors-cutting menu-icon text-white"></i>
  <span class="menu-title">Service de Chirurgie</span>
  <i class="menu-arrow"></i>
</span>

<b-collapse accordion="sidebar-accordion" id="chirurgie">
  <ul class="nav flex-column sub-menu">
    <li class="nav-item">
      <router-link class="nav-link" to="/medical-services/chirurgie"
      >Patients en traitement</router-link
      >
    </li>

    <li class="nav-item">
     <span @click="toActes('chirurgie')" class="nav-link" to="#"
     >Actes médicaux / prestations
   </span>
 </li>
</ul>
</b-collapse>
</li>

<li class="nav-item ">
 <span class="nav-link" v-b-toggle="'laboratoire'">
  <i class="mdi mdi-test-tube menu-icon text-white"></i>
  <span class="menu-title">Service de Laboratoire</span>
  <i class="menu-arrow"></i>
</span>

<b-collapse accordion="sidebar-accordion" id="laboratoire">
  <ul class="nav flex-column sub-menu">
    <li class="nav-item">
      <router-link class="nav-link" to="/medical-services/laboratoire"
      > Demandes d'examens en attente </router-link>
    </li>

    <!--<li class="nav-item">
      <span @click="toActes('laboratoire')" class="nav-link" to="#"
      >Examens réalisés
    </span>
  </li>-->


  <li class="nav-item">
    <span @click="toActes('laboratoire')" class="nav-link" to="#"
    >Actes médicaux / prestations
  </span>
</li>
</ul>
</b-collapse>
</li>





<li class="nav-item ">
 <span class="nav-link" v-b-toggle="'imagerie'">
  <i class="mdi mdi-x-ray menu-icon text-white"></i>
  <span class="menu-title">Service d'Imagerie</span>
  <i class="menu-arrow"></i>
</span>

<b-collapse accordion="sidebar-accordion" id="imagerie">
  <ul class="nav flex-column sub-menu">
    <li class="nav-item">
      <router-link class="nav-link" to="/medical-services/imagerie"
      >Patients en traitement</router-link
      >
    </li>



    <li class="nav-item">
      <span @click="toActes('imagerie')" class="nav-link" to="#"
      >Actes médicaux / prestations
    </span>
  </li>
</ul>
</b-collapse>
</li>




<li class="nav-item ">
 <span class="nav-link" v-b-toggle="'consultation'">
  <i class="mdi mdi-stethoscope menu-icon text-white"></i>
  <span class="menu-title">Consultation Générale</span>
  <i class="menu-arrow"></i>
</span>

<b-collapse accordion="sidebar-accordion" id="consultation">
  <ul class="nav flex-column sub-menu">
    <li class="nav-item">
      <router-link class="nav-link" to="/medical-services/consultation"
      >Patients en traitement</router-link
      >
    </li>



    <li class="nav-item">
     <span @click="toActes('consultation')" class="nav-link" to="#"
     >Actes médicaux / prestations
   </span>
 </li>
</ul>
</b-collapse>
</li>

<li class="nav-item ">
 <span class="nav-link" v-b-toggle="'pediatrie'">
  <i class="mdi mdi-baby menu-icon text-white"></i>
  <span class="menu-title">Service de Pédiatrie</span>
  <i class="menu-arrow"></i>
</span>

<b-collapse accordion="sidebar-accordion" id="pediatrie">
  <ul class="nav flex-column sub-menu">
    <li class="nav-item">
      <router-link class="nav-link" to="/medical-services/pediatrie"
      >Patients en traitement</router-link
      >
    </li>



    <li class="nav-item">
     <span @click="toActes('pediatrie')" class="nav-link" to="#"
     >Actes médicaux / prestations
   </span>
 </li>


</ul>
</b-collapse>
</li>

<li class="nav-item" style="border-top: 1px solid rgba(255, 255, 255, 0.1); margin-top: 10px; padding-top: 10px;">
   <span class="nav-link" v-b-toggle="'rapports'">
    <i class="mdi mdi-apps menu-icon text-white"></i>
    <span class="menu-title">Autres modules</span>
    <i class="menu-arrow"></i>
  </span>

  <b-collapse accordion="sidebar-accordion" id="rapports">
    <ul class="nav flex-column sub-menu">
      <li class="nav-item">
        <router-link class="nav-link" to="/patients/list"
        >Patients</router-link
        >
      </li>

       <li class="nav-item">
        <router-link class="nav-link" to="/movments/list"
        >Mouvements</router-link
        >
      </li>

      <li class="nav-item">
        <router-link class="nav-link" to="/service/facturation"
        >Facturations
      </router-link>
    </li>

    <li class="nav-item">
      <router-link class="nav-link" to="/hospitalization/bed/list"
      >Hosptalisations
    </router-link>
  </li>

  <li class="nav-item">
    <router-link class="nav-link" to="/priseencharge/list"
    >Assurances
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

import Axios from "@/_services/caller.services";
import { medicalServices_services } from "@/_services/medicalServices_services";


export default {
  name: "serviceSidebar",
  data() {
    return {

      selectedDepartment :1 ,
      services: [],
      sideSpinner:false,

      collapses: [
        { show: false }, { show: false }, { show: false }
        ],
    };
  },
  methods: {
    toActes(code){
      this.sideSpinner = true;
      medicalServices_services.getServiceByCode(code).then(
        (res) => {
         const service =  res.data.data;
         this.sideSpinner = false;
         this.$router.push("/actes-medicaux/create-list/" + service.id);
       })
      .catch((error) => {
        console.error(error);
      });
    },



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

.sub-menu .nav-link {
  padding-left: 2rem;
}

.ok {
  font-weight: bold !important;
  color: black !important;
}
</style>

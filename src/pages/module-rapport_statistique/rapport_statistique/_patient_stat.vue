<template>
  <div>
    <h3 class="card-title text-white rounded p-1 mb-5 text-center"

    style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    Patients & Mouvements
  </h3>

  <div class="row mt-3">
    <div class="col-lg-2 col-sm-6 grid-margin">
      <div class="card dashboard-card ">
        <div class="card-body">
          <p class="card-text mb-0">{{ patientStats.totalPatient }}</p>
          <small> Patients <br> ( {{ patientStats.totalPatient_F }} F - {{ patientStats.totalPatient_H }} H) </small>
        </div>
      </div>
    </div>

    <div class="col-lg-2 col-sm-6 grid-margin">
      <div class="card dashboard-card">
        <div class="card-body">
          <p class="card-text mb-0">{{ patientStats.totalVenue_Child }}</p>
          <small class="">Patients enfants </small>
        </div>
      </div>
    </div>
    <div class="col-lg-2 col-sm-6 grid-margin">
      <div class="card dashboard-card">
        <div class="card-body">
          <p class="card-text mb-0">{{ patientStats.totalVenue_Older }}</p>
          <small class="">Patient adultes </small>

        </div>
      </div>
    </div>


    <div class="col-lg-2 col-sm-6 grid-margin">
      <div class="card dashboard-card">
        <div class="card-body">
          <p class="card-text mb-0">{{ patientStats.totalVenue }}  </p>
          <br><small class="">Patients venus</small>
        </div>
      </div>
    </div>

    <div class="col-lg-2 col-sm-6 grid-margin">
      <div class="card dashboard-card bg-info text-white">
        <div class="card-body">
          <p class="card-text mb-0 text-white">{{ patientStats.totalVenue_In }}</p>
          <small class="">Patients en traitement</small>
        </div>
      </div>
    </div>


    <div class="col-lg-2 col-sm-6 grid-margin">
      <div class="card dashboard-card">
        <div class="card-body">
          <p class="card-text mb-0">{{ patientStats.totalVenue_Out }}</p>
          <small class="">Patients Libérés </small>
          </div>
        </div>
      </div>
    </div>



    <br>

    <div class="row mt-3">
      <div class="col-lg-6 col-sm-12 grid-margin">
        <div class="card dashboard-card ">
          <div class="card-body">
            <p class=""><b>Patients en cours traitement par services</b></p>
            <table class="table text-left">
              <tr> <td>Urgences</td> <td> <b> {{ servicesSats.urgencePatient }} </b> </td></tr>
              <tr> <td>Consultations Générale</td> <td> <b>{{ servicesSats.consultationPatient }} </b> </td></tr>
              <tr> <td>Infirmerie (Medecine)</td> <td> <b>{{ servicesSats.infirmeriePatient }} </b> </td></tr>
              <tr> <td>Chirurgie </td> <td> <b>{{ servicesSats.chirurgiePatient }} </b> </td></tr>
              <tr> <td>Laboratoire</td> <td> <b>{{ servicesSats.laboratoirePatient }} </b> </td></tr>
              <tr> <td>Imagerie </td> <td> <b>{{ servicesSats.imageriePatient }} </b> </td></tr>
            </table>

          </div>
        </div>
      </div>

      <div class="col-lg-6 col-sm-12 grid-margin">
        <div class="card dashboard-card">
          <div class="card-body">
            <p class=""><b>Durée moyenne de traitment par services (en jour)</b></p>
            <table class="table text-left">
              <tr> <td>Urgences</td> <td> <b> {{ dureeServicesSats.urgence }} </b> </td></tr>
              <tr> <td>Consultations Générale</td> <td> <b>{{ dureeServicesSats.consultation }} </b> </td></tr>
              <tr> <td>Infirmerie (Medecine)</td> <td> <b>{{ dureeServicesSats.infirmerie }} </b> </td></tr>
              <tr> <td>Chirurgie </td> <td> <b>{{ dureeServicesSats.chirurgie }} </b> </td></tr>
              <tr> <td>Laboratoire</td> <td> <b>{{ dureeServicesSats.laboratoire }} </b> </td></tr>
              <tr> <td>Imagerie </td> <td> <b>{{ dureeServicesSats.imagerie }} </b> </td></tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>


import $ from "jquery";
import { rapport_statistiqueService } from "@/_services/rapport_statistique_services.js";


export default {
  name: "patientStat",
  data() {
    return {

      patientStats: "",
      servicesSats: "",
      dureeServicesSats: "",

    };
  },

  mounted() {


   rapport_statistiqueService.getPatientSats().then(
    (res) => {
      this.patientStats = res.data.data;
      console.log(this.patientStats);
    })
   .catch((error) => {
    console.error(error);
  });


   rapport_statistiqueService.getServicesSats().then(
    (res) => {
      this.servicesSats = res.data.data;
      this.dureeServicesSats = res.data.duree;
      console.log(this.patientStats);
    })
   .catch((error) => {
    console.error(error);
  });

 }


};
</script>

<style scoped>
/* Style pour la section principale du tableau de bord */
.dashboard-section {
  margin-bottom: 20px;
}

/* Style pour les cartes du tableau de bord */
.dashboard-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  /* margin-bottom: 15px; */
  margin-bottom: -17px;
}

/* .grid-margin {
margin-bottom: 1.5rem;
} */

.mt-3,
.template-demo>.btn,
.template-demo>.btn-toolbar,
.my-3 {
  margin-top: -2rem !important;
}

.dashboard-card:hover {
  transform: scale(1.02);
}

/* Style pour le texte des cartes */
.card-body {
  text-align: center;
}

/* Style pour les titres des cartes */
.card-title {
  margin-bottom: 8px;
  color: #0b5d3f;
  font-size: 1.2rem;
}

/* Style pour les valeurs des cartes */
.card-text {
  font-weight: bold;
  color: #0b5d3f;
  font-size: 1.5rem;
}

/* Ajoutez d'autres styles personnalisés au besoin */
</style>
<!-- <style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-body {
  text-align: center;
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.card-text {
  font-size: 2rem;
  font-weight: bold;
  color: #0B5D3F;
}
</style>

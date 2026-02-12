<template >
  <section class="dashboard" >
    <div class="page-header">
      <h3 class="page-title font-weight-bold ">
        <span class="page-title-icon bg-gradient-white text-white mr-2  ">
          <i class="mdi "> <img src="@/assets/images/dashboard.png" alt="patient" class=""
              style="width: 1rem; height: 1rem;  "></i>

        </span> Tableau de board
      </h3>
      <nav aria-label="breadcrumb" >
        <ul class="breadcrumb">
          <li class="breadcrumb-item active" aria-current="page">
            <span></span>Overview <i class="mdi mdi-view-dashboard-outline icon-sm text-success align-middle"></i>
          </li>
        </ul>
      </nav>
    </div>
    <div class="row" style="font-family: 'Montserrat' !important;">
      <div class="col-md-4 stretch-card grid-margin" style=" font-family: 'Montserrat' !important;">
        <div class="card bg-gradient-success card-img-holder text-white">
          <div class="card-body">
            <img src="../../assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
            <h4 class=" mb-3" style="font-family: 'Montserrat' !important;">Recettes Totale / jour <i
                class="mdi mdi-diamond mdi-24px float-right"></i>
              <i class="mdi mdi-arrow-up mdi-24px float-right"></i>
            </h4>
            <h2 class="mb-5"> {{ montants }} FCFA</h2>
            <router-link to="/payement/list" class="nav-link text-white">
              <h6 class="card-text text-white font-weight-bold" >voir plus</h6>
            </router-link>

          </div>
        </div>
      </div>
      <div class="col-md-4 stretch-card grid-margin">
        <div class="card bg-gradient-danger card-img-holder text-white">
          <div class="card-body">
            <img src="../../assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
            <h4 class=" mb-3">Decaissement / jour <i
                class="mdi mdi-diamond-outline mdi-24px float-right"></i><i
                class="mdi mdi-arrow-down mdi-24px float-right"></i>
            </h4>
            <h2 class="mb-5">{{ decaisse }} FCFA</h2>
            <router-link to="/tresorerie/list-decaissement" class="nav-link text-white">
              <h6 class="card-text text-white font-weight-bold">voir plus</h6>
            </router-link>
          </div>
        </div>
      </div>
      <div class="col-md-4 stretch-card grid-margin">
        <div class="card bg-gradient-info card-img-holder text-white">
          <div class="card-body">
            <img src="../../assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
            <h4 class=" mb-3">Total Patient<i
                class="mdi mdi-account-multiple-plus mdi-24px float-right"></i>
            </h4>
            <h2 class="mb-5">{{ count }}</h2>
            <router-link to="/patients/list" class="nav-link text-white">
              <h6 class="card-text text-white font-weight-bold">voir plus</h6>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <div class="clearfix">
              <h4 class="card-title float-left font-weight-bold">Evolution annuelle des encaissements et decaissements <i
                  class="mdi mdi-arrow-up  text-success  "></i><i class="mdi mdi-arrow-down text-danger"></i></h4>
              <div id="visit-sale-chart-legend" class="rounded-legend legend-horizontal legend-top-right float-right">
                <ul>
                  <li class="font-weight-bold">
                    <span class="legend-dots bg-gradient-success font-weight-bold" style="font-weight: bold !important; color: black  !important;"></span>Encaissement
                  </li>
                  <li class="font-weight-bold">
                    <span class="legend-dots bg-gradient-danger font-weight-bold"></span>Décaissement
                  </li>
                </ul>
              </div>
            </div>
            <visitAndSalesStatitics class='mt-5' :height='100'></visitAndSalesStatitics>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-4 grid-margin stretch-card">
        <div class="card">
          <!-- <date-picker  :locale="fr" v-model="time1" valueType="format" inline></date-picker> -->
          <date-picker id="inline-datepicker"
            class="datepicker datepicker-custom vue-datepicker-body vue-datepicker-current" v-model="time1"
            valueType="format" inline style="border-radius: 50% !important; background-color: #1e8383 !important;"></date-picker>
          <!-- <datePicker :lang="lang"/> -->
          <div id="inline-datepicker" class="datepicker datepicker-custom"></div>
        </div>
      </div>
      <div class="col-lg-8 grid-margin">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title font-weight-bold">Liste des 05 dernieres ventes</h4>
            <div class="table-responsive">
              <table id="order-listing" class="table">
                <thead>
                  <tr>
                    <th> #</th>
                    <th>reference</th>
                    <th>Patients</th>
                    <th>Montant</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(vente, index) in ventes" :key="vente.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ vente.reference }}</td>
                    <td>{{ vente.nom }} {{ vente.prenom }} </td>
                    <td>{{ vente.total_montant }}</td>
                    <td>
                      <router-link class="" :to="`/facture/details/${vente.payement_id}`" target="_blank">
                        <b-button size="sm" v-b-tooltip.hover title="Détail" variant="success">
                          <i class="mdi   mdi-eye text-white menu-icon"></i>
                        </b-button>
                      </router-link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import visitAndSalesStatitics from '../../components/charts/widgets/visitAndSalesStatitics'
import trafficSourceChart from '../../components/charts/widgets/trafficSourceChart'
import DatePicker from 'vue2-datepicker'
import { recetteService } from "@/_services/recette_services.js";
import { countService } from "@/_services/count_services.js";
import { factureService } from "@/_services/facture_services.js";
import { DecaisseService } from "@/_services/decaissement_service.js";
import 'vue2-datepicker/locale/fr';
export default {
  name: 'dashboard',
  components: {
    DatePicker,
    trafficSourceChart,
    visitAndSalesStatitics,
  },

  data() {
    return {

      base: location.origin,
      montants: null,
      count: null,
      decaisse: null,
      ventes: [],
      user: JSON.parse(localStorage.getItem("user")),
      time1: "",



    };
  },

  mounted() {
    const currentUrl = window.location.href;
    this.base = currentUrl.substring(0, currentUrl.lastIndexOf('/'));
    recetteService
      .getMontant()
      .then((res) => {
        this.montants = res.data.data;
        console.log(this.montants);
      })
      .catch((error) => {
        console.log(error);
      });


    countService
      .getCount()
      .then((res) => {
        this.count = res.data.data;
        console.log(this.count);
      })
      .catch((error) => {
        console.log(error);
      });
    factureService
      .getRecent()
      .then((res) => {
        this.ventes = res.data.data;
        console.log(this.ventes);
      })
      .catch((error) => {
        console.log(error);
      });


    DecaisseService
      .getdecaisse()
      .then((res) => {
        this.decaisse = res.data.data;
        console.log(this.decaisse);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
</script>
<style>
th {
  font-weight: bold !important;
}
.vue-datepicker {

  height: 10em !important;
}
.vue-datepicker-body .vue-datepicker-current {
  border-radius: 50%;
  background-color: #007aff;
  color: #fff;
  padding: 5px;
}
</style>
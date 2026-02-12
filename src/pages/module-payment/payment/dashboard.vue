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
    <!-- <div class="row" style="font-family: 'Montserrat' !important;">
      <div class="col-md-4 stretch-card grid-margin" style=" font-family: 'Montserrat' !important;">
        <div class="card bg-gradient-success card-img-holder text-white">
          <div class="card-body">
            <img src="@/assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
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
            <img src="@/assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
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
            <img src="@/assets/images/dashboard/circle.svg" class="card-img-absolute" alt="circle-image" />
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
                  <!-- <li>
                    <span class="legend-dots bg-gradient-info"></span>UK
                  </li> -->
                </ul>
              </div>
            </div>
            <visitAndSalesStatitics class='mt-5' :height='100'></visitAndSalesStatitics>
          </div>
        </div>
      </div>
      <!-- <div class="col-md-4 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Evolution hebdomadaire des patients </h4>
            <trafficSourceChart :height='200'></trafficSourceChart>
            <div id="traffic-chart-legend" class="rounded-legend legend-vertical legend-bottom-left pt-0">
              <ul>
                <li>
                  <span class="legend-dots bg-gradient-info"></span>Lun
                  <span class="float-right">50%</span>
                </li>
                <li>
                  <span class="legend-dots bg-gradient-success"></span>Mar
                  <span class="float-right">60%</span>
                </li>
                <li>
                  <span class="legend-dots bg-gradient-danger"></span>Mer
                  <span class="float-right">40%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>-->

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
      <!-- <div class="col-lg-8 grid-margin">
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
      </div> -->

    </div> -->




    <!--<div class="row">
      <div class="col-lg-2 grid-margin stretch-card">
        <div class="card">
          <date-picker v-model="time1" valueType="format" inline></date-picker>
        </div>
      </div>

       <div class="col-lg-7 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Recent Updates</h4>
            <div class="d-flex">
              <div class="d-flex align-items-center mr-4 text-muted font-weight-light">
                <i class="mdi mdi-account-outline icon-sm mr-2"></i>
                <span>jack Menqu</span>
              </div>
              <div class="d-flex align-items-center text-muted font-weight-light">
                <i class="mdi mdi-clock icon-sm mr-2"></i>
                <span>October 3rd, 2018</span>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-6 pr-1">
                <img src="@/assets/images/dashboard/img_1.jpg" class="mb-2 mw-100 w-100 rounded" alt="image">
                <img src="@/assets/images/dashboard/img_4.jpg" class="mw-100 w-100 rounded" alt="image">
              </div>
              <div class="col-6 pl-1">
                <img src="@/assets/images/dashboard/img_2.jpg" class="mb-2 mw-100 w-100 rounded" alt="image">
                <img src="@/assets/images/dashboard/img_3.jpg" class="mw-100 w-100 rounded" alt="image">
              </div>
            </div>
            <div class="d-flex mt-5 align-items-top">
              <img src="@/assets/images/faces/face3.jpg" class="img-sm rounded-circle mr-3" alt="image">
              <div class="mb-0 flex-grow">
                <h5 class="mr-2 mb-2">School Website - Authentication Module.</h5>
                <p class="mb-0 font-weight-light">It is a long established fact that a reader will be distracted by the
                  readable content of a page.</p>
              </div>
              <div class="ml-auto">
                <i class="mdi mdi-heart-outline text-muted"></i>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>-->
    <!-- <div class="row">
      <div class="col-md-7 stretch-card grid-margin">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Project Status</h4>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th> # </th>
                    <th> Name </th>
                    <th> Due Date </th>
                    <th> Progress </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td> 1 </td>
                    <td> Herman Beck </td>
                    <td> May 15, 2015 </td>
                    <td>
                      <div class="progress">
                        <div class="progress-bar bg-gradient-success" role="progressbar" style="width: 25%"
                          aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td> 2 </td>
                    <td> Messsy Adam </td>
                    <td> Jul 01, 2015 </td>
                    <td>
                      <div class="progress">
                        <div class="progress-bar bg-gradient-danger" role="progressbar" style="width: 75%"
                          aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td> 3 </td>
                    <td> John Richards </td>
                    <td> Apr 12, 2015 </td>
                    <td>
                      <div class="progress">
                        <div class="progress-bar bg-gradient-warning" role="progressbar" style="width: 90%"
                          aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td> 4 </td>
                    <td> Peter Meggik </td>
                    <td> May 15, 2015 </td>
                    <td>
                      <div class="progress">
                        <div class="progress-bar bg-gradient-primary" role="progressbar" style="width: 50%"
                          aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td> 5 </td>
                    <td> Edward </td>
                    <td> May 03, 2015 </td>
                    <td>
                      <div class="progress">
                        <div class="progress-bar bg-gradient-danger" role="progressbar" style="width: 35%"
                          aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td> 5 </td>
                    <td> Ronald </td>
                    <td> Jun 05, 2015 </td>
                    <td>
                      <div class="progress">
                        <div class="progress-bar bg-gradient-info" role="progressbar" style="width: 65%"
                          aria-valuenow="65" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-5 stretch-card grid-margin">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title text-white">Todo</h4>
            <todo-list />
          </div>
        </div>
      </div>
    </div> -->


  </section>
</template>


<script>
import visitAndSalesStatitics from '@/components/charts/widgets/visitAndSalesStatitics'
import trafficSourceChart from '@/components/charts/widgets/trafficSourceChart'
//import todoList from '@/components/apps/todoList'
import DatePicker from 'vue2-datepicker'
import { recetteService } from "@/_services/recette_services.js";
import { countService } from "@/_services/count_services.js";
import { factureService } from "@/_services/facture_services.js";
import { DecaisseService } from "@/_services/decaissement_service.js";
//import { encaissementService } from "@/_services/encaissements_services.js";
import 'vue2-datepicker/locale/fr';

//Bootstrap and jQuery libraries



export default {
  name: 'dashboard',
  components: {
    DatePicker,
    trafficSourceChart,
    visitAndSalesStatitics,
    //todoList
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

    // this.base = location.origin;
    const currentUrl = window.location.href;

    // Obtenez le chemin de base de l'URL en retirant tout après le dernier /
    this.base = currentUrl.substring(0, currentUrl.lastIndexOf('/'));

    console.log(this.base);



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
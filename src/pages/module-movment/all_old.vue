<template>
  <section class="container-scroller">
   <div class="row">
    <div class="col-lg-12 grid-margin">
      <h3
      class="card-title text-white rounded p-1 mb-1 text-center"
      style="
      background-color: #0B5D3F;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      ">
      Liste de toutes les venues
    </h3>
    <div class="card" >
      <div class="card-body" >
        <div class="input-group input-group-sm mb-3 w-100">
          <router-link to="/movments/create">
            <button class="btn btn-success btn-sm btn-medpay-green-small  " type="button">Nouvelle venue</button> </router-link>
            &nbsp;&nbsp;
            <input v-on:keyup="fetchLastMovement()" type="text" v-model="q" class="form-control rounded-pill py-3" placeholder="Rechercher une venue ..."
            aria-label="">
          </div>

          <div class="table-responsive" style="min-height:200px" >
            <table
            id="order-listing"
            ref="myTable"
            class="table table-bordered table-hover"
            >
            <thead>
              <tr style="background-color: rgb(216, 218, 216)">
                <th>#</th>
                <!--<th>IEP</th>-->
                <th>IPP</th>
                <th>Patient</th>
                <th>Service</th>
                <th>Téléphone</th>
                <th>Arrivée le</th>
                <th>Sortie le</th>
                <th class="text-center action-th">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(movment, index) in movments" :key="movment.id"

               :style="movment.releasedate != null ? { 'background-color': '#f9efb3' } : { 'background-color': 'white' }"
               >
              <td>{{ index + 1 }}</td>
              <!-- <td>{{ movment.id }}</td>-->
              <td>{{ movment.ipp }}</td>
              <td>
                {{ movment.lastname }} {{ movment.firstname }}
              </td>
              <td> {{ movment.services_name }}</td>
              <td>{{ movment.phone }}</td>
              <td> {{ movment.human_arrival_date }} </td>
              <td> {{ movment.human_release_date }} </td>

              <td>

               <div class="btn-group btn-group-sm" role="group" >
                <button id="btnGroupDrop1" type="" style="padding: 0px 10px; width:100%" class=" btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <i class="fa fa-tasks" aria-hidden="true"></i>  </button>

                 <div class="dropdown-menu" aria-labelledby="btnGroupDrop1" style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%);" >

                   <a  @click="detail(movment.id)" class="dropdown-item" > <i class="mdi mdi-eye menu-icon"></i> Détail de la venue</a>

                    <!--<a  @click="folder(movment.patients_id)" class="dropdown-item" > <i class="mdi mdi-eye menu-icon"></i> Dossier patient</a>



                   <a v-if="movment.releasedate == null"  @click="treatement(movment.id)" class="dropdown-item" > <i class="fa fa-cog" aria-hidden="true"></i> Traiter le patient</a>-->

                   <!--<a   @click="movmentHistory(movment.patient_id)" class="dropdown-item" > <i class="fa fa-arrows-h" aria-hidden="true"></i> Historique des venues </a>-->

                  <!-- <a   @click="billing(movment.id)"  class="dropdown-item" > <i class="fa fa-usd" aria-hidden="true"></i> &nbsp;Factures & Paiements </a>-->

                   <!--<a  @click="switchTreatmentService(movment.id)" class="dropdown-item" > <i class="fa fa-share" aria-hidden="true"></i>&nbsp;Affecter à un service </a>-->

                   <a v-if="movment.releasedate == null"   @click="out(movment.id)" class="dropdown-item" > <i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;Enregister la sortie </a>
                 </div></div>
               </td>
             </tr>
             <!--<tr v-if="result"><td colspan="8"></td></tr>-->
           </tbody>
         </table>

       </div>
       <div v-if="indexSpinner" class="spinner-border spinner-border-sm text-primary" style="font-size:11px" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</div>
</div>
</section>

</template>
<script>


import $ from "jquery";
import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { movmentService }  from "@/_services/movment_services.js";
/*import { Bootstrap4Pagination } from 'laravel-vue-pagination';*/

export default {

  data() {
    return {
      indexSpinner:false,
      movments: [],
      table: null,
      id: "",
      q: "",
      result : "",

      deleteIndex: null,
      deleteName: "",
    };
  },

  mounted() {
    this.fetchLastMovement();
  },
  methods: {

    fetchLastMovement() {
      this.indexSpinner = true;
      movmentService.getAllMovments(this.q)
      .then(
        (res) => {
          this.movments = res.data.data.data;
          this.indexSpinner = false;
          console.log(this.movments);
        })
      .catch((error) => {
        console.error(error);
      });
    },

    treatement(id) {
      this.$router.push("/movments/treatement/" + id);
    },

    detail(id) {
      this.$router.push("/movments/show/" + id);
    },

    out(id) {
      this.$router.push("/movments/out/" + id);
    },

    billing(id) {
      this.$router.push("/payement/create/" + id);
    },

    movmentHistory(id) {
      this.$router.push("/movment/history/" + id);
    },

   switchTreatmentService(id){
     this.$router.push("/movment/s_switch/" + id);
   }


  }
};
</script>

<style scoped>
@import "../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
/* @import '../../../node_modules/datatables.net-dt/css/jquery.dataTables.css'; */

@import "../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";
select {
  cursor: pointer;
  height: 43px !important;
}

input[type="radio"].demo6 {
  display: none;
}

input[type="radio"].demo6 + label {
  position: relative;
  padding-left: 1.3rem;
}

input[type="radio"].demo6 + label::before,
input[type="radio"].demo6 + label::after {
  display: block;
  position: absolute;
  box-sizing: border-box;
  content: "";
  border-radius: 1rem;
}

input[type="radio"].demo6 + label::before {
  bottom: 0;
  left: 0;
  border: 1px solid #ccc;
  background-color: #eee;
  width: 1rem;
  height: 1rem;
}

input[type="radio"].demo6 + label::after {
  bottom: 3px;
  left: 3px;
  width: calc(1rem - 6px);
  height: calc(1rem - 6px);
}

input[type="radio"].demo6:checked + label::after {
  background-color: #45c28e;
}

input[type="checkbox"].demo2 {
  display: none;
}

input[type="checkbox"].demo2 + label::before {
  content: "";
  border: 1px solid #45c28e;
  padding: 0 0.6rem;
  margin-right: 0.3rem;
}

input[type="checkbox"].demo2:checked + label::before {
  background-color: #45c28e;
}
</style>

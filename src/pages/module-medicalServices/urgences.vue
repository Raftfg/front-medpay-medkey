<template>
  <section class="container-scroller">
   <div class="row">
    <div class="col-lg-12 grid-margin">
      <h3
      class="card-title text-white rounded p-1 mb-1 text-center"
      style="
      background-color: #0B5D3F;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      "
      >
      <b>Urgences</b> : Liste des patients en traitement
    </h3>
    <div class="card" >

      <div class="card-body" >
        <div class="input-group input-group-sm mb-3 w-100">


            <input v-on:keyup="page = 1; fetchLastMovement()" type="text" v-model="q" class="form-control rounded-pill py-3" placeholder="Rechercher une venue ..."
            aria-label="">

            <select style="width:100px; height:35px !important ; border-radius:20px !important ;" class="" v-model="pageSize" @change="handlePageSizeChange($event)">
              <option v-for="size in pageSizes" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
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
                <th class="text-center action-th">Actions</th>
              </tr>
            </thead>
            <tbody>
              <!-- OPTIMISATION: Skeleton loaders pour affichage progressif -->
              <tr v-if="indexSpinner" v-for="n in 5" :key="`skeleton-${n}`">
                <td><div class="skeleton-loader"></div></td>
                <td><div class="skeleton-loader"></div></td>
                <td><div class="skeleton-loader"></div></td>
                <td><div class="skeleton-loader"></div></td>
                <td><div class="skeleton-loader"></div></td>
                <td><div class="skeleton-loader"></div></td>
                <td><div class="skeleton-loader"></div></td>
              </tr>
              <tr v-else-if="movments.length === 0">
                <td colspan="7" class="text-center p-4">
                  <p class="text-muted">Aucun patient en traitement trouvé</p>
                </td>
              </tr>
              <tr
              v-else
              v-for="(movment, index) in movments"
              :key="movment.id"
              >
              <td>{{ (page - 1) * pageSize + index + 1 }}</td>
              <td>{{ movment.ipp || 'N/A' }}</td>
              <td> {{ movment.lastname || '' }} {{ movment.firstname || '' }}</td>
              <td> {{ movment.services_name || 'N/A' }}</td>
              <td>{{ movment.phone || 'N/A' }}</td>
              <td> {{ movment.human_arrival_date || 'N/A' }}</td>
              <td>

               <div class="btn-group btn-group-sm" role="group" >
                <button id="btnGroupDrop1" type="" style="padding: 0px 10px; width:100%" class=" btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <i class="fa fa-tasks" aria-hidden="true"></i>  </button>

                 <div class="dropdown-menu" aria-labelledby="btnGroupDrop1" style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%);" >

                   <a  @click="detail(movment.id)" class="dropdown-item" > <i class="mdi mdi-eye menu-icon"></i> Détail de la venue</a>


                   <a  @click="treatement(movment.id)" class="dropdown-item" > <i class="fa fa-cog" aria-hidden="true"></i> Traiter le patient</a>

                   <!-- <a   @click="movmentHistory(movment.patient_id)" class="dropdown-item" > <i class="fa fa-arrows-h" aria-hidden="true"></i> Historique des venues </a>-->

                   <!--<a  @click="switchTreatmentService(movment.id)" class="dropdown-item" > <i class="fa fa-share" aria-hidden="true"></i>&nbsp;Affecter à un service </a>


                     <a  @click="out(movment.id)" class="dropdown-item" > <i class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;Enregister la sortie </a>-->


                   </div></div>
                 </td>
               </tr>
               <!--<tr v-if="result"><td colspan="8"></td></tr>-->
             </tbody>
           </table>
         </div>

         Total : {{count}}

         <b-pagination v-model="page" :total-rows="count" :per-page="pageSize" @change="handlePageChange"
         > </b-pagination>



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



export default {


  data() {
    return {

      /**Pagination var**/
      q: "",
      currentTutorial: null,
      currentIndex: -1,
      page: 1,
      count: 0,
      pageSize: 50,
      pageSizes: [50, 250, 1000],

      indexSpinner:false,
      movments: [],
      service_code : 'urgence'

    };
  },

  mounted() {
    this.fetchLastMovement();
  },


  methods: {

    getRequestParams(q, page, pageSize,service_code) {
      let params = {};

      if (q) {
        params["q"] = q;
      }

      if (service_code) {
        params["service_code"] = service_code;
      }



      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },


    async fetchLastMovement() {
      this.indexSpinner = true;

      try {
        const params = this.getRequestParams(
          this.q,
          this.page,
          this.pageSize,
          this.service_code,
        );

        const res = await movmentService.getActiveConsultaionMovments(params);
        
        if (res && res.data && res.data.data) {
          this.movments = res.data.data.data || [];
          this.count = res.data.data.total || 0;
        } else {
          this.movments = [];
          this.count = 0;
        }
        
        this.indexSpinner = false;
      } catch (error) {
        console.error("Erreur lors du chargement des mouvements:", error);
        this.movments = [];
        this.count = 0;
        this.indexSpinner = false;
        
        // Afficher un message d'erreur à l'utilisateur
        if (this.$toast) {
          this.$toast.error("Erreur lors du chargement des données", {
            position: "top-right",
            timeout: 3000,
          });
        }
      }
    },

    handlePageChange(value) {
      this.page = value;
      this.fetchLastMovement();
    },

    handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.fetchLastMovement();
    }
    ,


    treatement(id) {
      this.$router.push("/medical-services/treatement/" + id);
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

.pagination{
  float: right !important;
}

/* OPTIMISATION: Styles pour skeleton loaders (affichage progressif) */
.skeleton-loader {
  height: 20px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
  border-radius: 4px;
  margin: 5px 0;
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>

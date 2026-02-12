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
      Les venues en cours
    </h3>
    <div class="card" >

      <div class="card-body" >
        <div class="input-group input-group-sm mb-3 w-100">
          <router-link to="/movments/create">
            <button class="btn btn-success btn-sm btn-medpay-green-small  " type="button">Nouvelle venue</button> </router-link>
            &nbsp;&nbsp;
            <input v-on:keyup="page = 1; fetchLastMovement()" type="text" v-model="q" class="form-control rounded-pill py-3" placeholder="Rechercher une venue ..."
            aria-label="">

            <select style="width:100px; height:35px !important ; border-radius:20px !important ;" class="" v-model="pageSize" @change="handlePageSizeChange($event)">
              <option v-for="size in pageSizes" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
          </div>


          <!-- OPTIMISATION: Skeleton loaders pour affichage progressif -->
          <div v-if="indexSpinner && movments.length === 0" class="table-responsive" style="min-height:200px">
            <table class="table table-bordered table-hover">
              <thead>
                <tr style="background-color: rgb(216, 218, 216)">
                  <th>#</th>
                  <th>IPP</th>
                  <th>Patient</th>
                  <th>Service</th>
                  <th>Type</th>
                  <th>Téléphone</th>
                  <th>Arrivée le</th>
                  <th class="text-center action-th">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="n in 10" :key="`skeleton-${n}`">
                  <td><div class="skeleton-loader"></div></td>
                  <td><div class="skeleton-loader"></div></td>
                  <td><div class="skeleton-loader"></div></td>
                  <td><div class="skeleton-loader"></div></td>
                  <td><div class="skeleton-loader"></div></td>
                  <td><div class="skeleton-loader"></div></td>
                  <td><div class="skeleton-loader"></div></td>
                  <td><div class="skeleton-loader"></div></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div v-else class="table-responsive" style="min-height:200px" >
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
                <th>Type</th>
                <th>Téléphone</th>
                <th>Arrivée le</th>
                <th class="text-center action-th">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="movments.length === 0 && !indexSpinner">
                <td colspan="8" class="text-center p-4">
                  <p class="text-muted">Aucune venue en cours</p>
                </td>
              </tr>
              <tr
              v-for="(movment, index) in movments"
              :key="movment.id || `movment-${index}`"
              >
              <td>{{ (page - 1) * pageSize + index + 1 }}</td>
              <td>{{ movment.ipp || 'N/A' }}</td>
              <td> {{ movment.lastname || '' }} {{ movment.firstname || '' }}</td>
              <td> {{ movment.services_name || 'Non assigné' }}</td>
              <td>
                <span v-if="movment.admission_type" 
                      :class="{
                        'badge badge-success': movment.admission_type === 'programmée',
                        'badge badge-danger': movment.admission_type === 'urgence'
                      }"
                      style="text-transform: capitalize;">
                  {{ movment.admission_type }}
                </span>
                <span v-else class="text-muted">-</span>
              </td>
              <td>{{ movment.phone || 'N/A' }}</td>
              <td> {{ formatDate(movment.arrivaldate || movment.created_at) }}</td>
              <td>

               <div class="btn-group btn-group-sm" role="group" >
                <button id="btnGroupDrop1" type="" style="padding: 0px 10px; width:100%" class=" btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <i class="fa fa-tasks" aria-hidden="true"></i>  </button>

                 <div class="dropdown-menu" aria-labelledby="btnGroupDrop1" style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%);" >

                   <a  @click="detail(movment.id)" class="dropdown-item" > <i class="mdi mdi-eye menu-icon"></i> Détail de la venue</a>

                   <a @click="dme(movment.patient_uuid)" class="dropdown-item" style="cursor: pointer;" v-b-tooltip.hover title="Voir le dossier clinique">
                      <i class="mdi mdi-folder-account"></i> Dossier médical (DME)
                   </a>
                   <a @click="transfer(movment.id)" class="dropdown-item" style="cursor: pointer;" v-b-tooltip.hover title="Transférer vers un autre service ou lit">
                      <i class="mdi mdi-swap-horizontal"></i> Effectuer un transfert
                   </a>
                   <a @click="release(movment.id)" class="dropdown-item" style="cursor: pointer;" v-b-tooltip.hover title="Clôturer le séjour du patient">
                      <i class="mdi mdi-sign-out"></i> Enregistrer la sortie
                   </a>
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
//import Axios from "@/_services/caller.services";
/*import { Bootstrap4Pagination } from 'laravel-vue-pagination';*/

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

    };
  },

  mounted() {
    this.fetchLastMovement();
  },
  methods: {

    getRequestParams(q, page, pageSize) {
      let params = {};

      if (q) {
        params["q"] = q;
      }

      // OPTIMISATION: Le backend Laravel utilise page (1-based) et perPage
      if (page) {
        params["page"] = page; // Laravel pagination est 1-based
      }

      if (pageSize) {
        params["perPage"] = pageSize; // Le backend attend perPage
      }

      return params;
    },


    fetchLastMovement() {
      this.indexSpinner = true;

      const params = this.getRequestParams(
        this.q,
        this.page,
        this.pageSize
        );

      movmentService.getActiveMovments(params)
      .then(
        (res) => {
          console.log("Réponse API mouvements:", res);
          if (res.data && res.data.data) {
            // Gérer la structure de réponse Laravel pagination
            const data = res.data.data;
            this.movments = Array.isArray(data.data) ? data.data : (Array.isArray(data) ? data : []);
            this.count = data.total || (Array.isArray(data) ? data.length : 0);
            
            console.log("Mouvements chargés:", this.movments.length);
            console.log("Total:", this.count);
            
            // Vérifier que chaque mouvement a bien un UUID
            this.movments.forEach((mov, idx) => {
              if (!mov.uuid) {
                console.warn(`Mouvement ${idx} (ID: ${mov.id}) n'a pas d'UUID`);
              }
              if (!mov.patient_uuid) {
                console.warn(`Mouvement ${idx} (ID: ${mov.id}) n'a pas de patient_uuid`);
              }
            });
          } else {
            this.movments = [];
            this.count = 0;
          }
          this.indexSpinner = false;
        })
      .catch((error) => {
        console.error("Erreur lors du chargement des venues:", error);
        console.error("Détails de l'erreur:", {
          message: error.message,
          response: error.response,
          status: error.response ? error.response.status : null,
          url: error.config ? error.config.url : null
        });
        
        this.movments = [];
        this.count = 0;
        this.indexSpinner = false;
        
        let errorMessage = "Erreur lors du chargement des venues. Veuillez réessayer.";
        if (error.response) {
          if (error.response.status === 404) {
            errorMessage = "Endpoint non trouvé. Veuillez vérifier votre connexion.";
          } else if (error.response.status === 401) {
            errorMessage = "Vous devez être connecté pour accéder à cette page.";
          } else if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
        }
        
        this.$toast.error(errorMessage, {
          position: "top-right",
          timeout: 5000,
        });
      });
    },

    handlePageChange(value) {
      this.page = value;
      this.fetchLastMovement();
    },

    handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.fetchLastMovement();
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

    transfer(movmentId) {
      // Pour les transferts V4, on utilise l'UUID du mouvement (si disponible dans l'objet)
      const movment = this.movments.find(m => m.id === movmentId);
      
      if (!movment) {
        this.$toast.error("Mouvement non trouvé", {
          position: "top-right",
          timeout: 3000,
        });
        return;
      }
      
      // Vérifier si l'UUID est disponible
      if (!movment.uuid) {
        this.$toast.error("UUID du mouvement non disponible. Veuillez rafraîchir la page.", {
          position: "top-right",
          timeout: 3000,
        });
        return;
      }
      
      this.$router.push({ name: "patients.transfer", params: { movment_uuid: movment.uuid } });
    },
    release(movmentId) {
      const movment = this.movments.find(m => m.id === movmentId);
      
      if (!movment) {
        this.$toast.error("Mouvement non trouvé", {
          position: "top-right",
          timeout: 3000,
        });
        return;
      }
      
      // Vérifier si l'UUID est disponible
      if (!movment.uuid) {
        this.$toast.error("UUID du mouvement non disponible. Veuillez rafraîchir la page.", {
          position: "top-right",
          timeout: 3000,
        });
        return;
      }
      
      this.$router.push({ name: "patients.release", params: { movment_uuid: movment.uuid } });
    },
    dme(patientUuid) {
      if (!patientUuid) {
        this.$toast.error("UUID du patient non disponible", {
          position: "top-right",
          timeout: 3000,
        });
        return;
      }
      this.$router.push({ name: "patients.dme", params: { uuid: patientUuid } });
    },
    switchTreatmentService(id){
      this.$router.push("/movment/s_switch/" + id);
    },

    formatDate(dateString) {
      if (!dateString) return 'N/A';
      try {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        });
      } catch (error) {
        return dateString;
      }
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

/* Amélioration de la performance du rendu */
.table tbody tr {
  transition: background-color 0.2s ease;
}

.table tbody tr:hover {
  background-color: #f8f9fa;
}
</style>

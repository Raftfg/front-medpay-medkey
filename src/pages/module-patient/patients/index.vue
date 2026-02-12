<template>
  <section class="container-scroller">

    <div class="row">
      <div class="col-lg-12 grid-margin">
        <!-- OPTIMISATION: v-once pour éviter les re-renders inutiles -->
        <h3 v-once class="card-title text-white rounded p-1 mb-1 text-center" style="background-color: #0B5D3F; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          Liste des Patients
        </h3>
        <div class="card">

          <div class="card-body">
            <div class="input-group input-group-sm mb-3 w-100">
          <router-link to="/patients/create">
            <button class="btn btn-success btn-sm btn-medpay-green-small  " type="button">Nouveau patient</button> </router-link>
            &nbsp;&nbsp;
            <input @input="debouncedSearch(q)" type="text" v-model="q" class="form-control rounded-pill py-3" placeholder="Rechercher un patient ..."
            aria-label="">
          </div>

            <!-- OPTIMISATION: Skeleton loaders pour affichage progressif -->
            <div v-if="loading || searchLoading" class="table-responsive" style="min-height:200px">
              <table class="table table-bordered table-hover">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>IPP</th>
                    <th>Nom</th>
                    <th>Prénom(s)</th>
                    <th>Age</th>
                    <th>Téléphone</th>
                    <th>Adresse</th>
                    <th>Sexe</th>
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
                    <td><div class="skeleton-loader"></div></td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- OPTIMISATION: Utiliser v-show au lieu de v-if pour meilleure performance -->
            <div v-show="!loading && !searchLoading" class="table-responsive" style="min-height:200px">
              <table id="order-listing" ref="myTable" class="table table-bordered table-hover">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>IPP</th>
                    <th>Nom</th>
                    <th>Prénom(s)</th>
                    <th>Age</th>
                    <th>Téléphone</th>
                    <th>Adresse</th>
                    <th>Sexe</th>
                    <th class="text-center action-th">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="patients.length === 0 && !loading && !searchLoading">
                    <td colspan="9" class="text-center p-4">
                      <p class="text-muted">Aucun patient trouvé</p>
                    </td>
                  </tr>
                  <!-- OPTIMISATION: Utiliser :key unique pour meilleure performance du rendu -->
                  <tr v-for="(patient, index) in patients" 
                      :key="`patient-${patient.uuid || index}`">
                    <td>{{ index + 1 }}</td>
                    <td>{{ patient.ipp }}</td>
                    <td style="text-transform: uppercase">
                      {{ patient.lastname }}
                    </td>
                    <td style="text-transform: capitalize">
                      {{ patient.firstname }}
                    </td>
                    <td>{{ patient.age }}</td>
                    <td>{{ patient.phone }}</td>
                    <td>{{ patient.maison }}</td>
                    <td>{{ patient.gender }}</td>

                    <td>
                      <div class="btn-group btn-group-sm" role="group">
                        <button
                          id="btnGroupDrop1"
                          type=""
                          style="padding: 0px 10px"
                          class="btn btn-light dropdown-toggle"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                          v-b-tooltip.hover title="Actions disponibles"
                        >
                          &nbsp;
                          <i class="fa fa-tasks text-dark" aria-hidden="true"></i> &nbsp;
                        </button>
                        <div class="dropdown-menu action-button-div" aria-labelledby="btnGroupDrop1" style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%)">
                          <a @click="detail(patient.uuid)" class="dropdown-item" style="cursor: pointer;">
                            <i class="mdi mdi-eye menu-icon text-primary"></i> Détail patient
                          </a>
                          <!-- <a class="dropdown-item" href="#">
                            <i class="fa fa-arrows-h" aria-hidden="true"></i> Historique des venues
                          </a> -->
                          <a class="dropdown-item" href="/payement/create">
                            <i class="fa fa-usd text-warning" aria-hidden="true"></i> &nbsp; Facture & Paiement
                          </a>

                          <hr class="m-1" />

                          <!-- <a class="dropdown-item" href="#">
                            <i class="fa fa-umbrella" aria-hidden="true"></i>Assurances
                          </a> -->
                          <a @click="dme(patient.uuid)" class="dropdown-item" style="cursor: pointer;" v-b-tooltip.hover title="Ouvrir le Dossier Médical Électronique">
                            <i class="mdi mdi-folder-account text-success"></i> Dossier médical (DME)
                          </a>
                          <a @click.prevent="admit(patient.uuid)" class="dropdown-item" style="cursor: pointer;" v-b-tooltip.hover title="Procéder à l'admission du patient">
                            <i class="mdi mdi-hospital-marker text-info"></i> Admission (ADT)
                          </a>
                          <hr class="m-1" />
                          <a @click="update(patient.uuid)" size="sm" v-b-tooltip.hover title="Modifier"                         
                            class="dropdown-item" style="cursor: pointer;">
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>Modifier                            
                          </a>                         
                        </div>
                      </div>                 
                    </td>
                  </tr>
                  <tr v-if="result"><td colspan="8"></td></tr>
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
import $ from "jquery";
import "../../../../node_modules/bootstrap/dist/js/bootstrap.js"; // tres important pour le modal
import "../../../../node_modules/bootstrap/dist/js/bootstrap.min.js"; // tres important pour le modal
import { patientService } from "@/_services";
import { debounceSearch } from "@/_services/debounce.service";
import cacheService from "@/_services/cache.service";
import axios from "axios";
  // import { paysService } from "@/_services";

  export default {
    name: "patients",
    data() {
      return {
        patients: [],
        deleteIndex: null,
        deleteName: "",
        table: null,
        q:"",
        loading: false,
        searchLoading: false,
        // OPTIMISATION: Contrôleurs pour annuler les requêtes obsolètes
        currentRequest: null,
        currentSearchRequest: null,
        debouncedSearch: null,
        result: false,
        lastname: "",
        firstname: "",
        age: "",
        date_birth: "",
        maison: "",
        // pays_id: "",
        // departement_id: "",
        // commune_id: "",
        // arrondissement_id: "",
        // quartier_id: "",
        phone: "",
        email: "",
        whatsapp: "",
        profession: "",
        gender: "",
        emergency_contac: "",
        autre: "",
        ipp: "",
        // id: "",
        uuid: "",
        // nom, prenom, age, adresse, telephone, email, whatsapp, profession, sexe, urgencecontact, autre,
      };
    },
    mounted() {
      // OPTIMISATION: Charger les patients avec loading state
      this.loadPatients();
      
      // OPTIMISATION: Debounce réduit à 300ms pour meilleure réactivité
      this.debouncedSearch = debounceSearch((query) => {
        this.fetchPatient(query);
      }, 300); // 300ms de délai (optimisé)
    },
    beforeUnmount() {
      // OPTIMISATION: Nettoyer les requêtes en cours lors du démontage
      if (this.currentRequest) {
        this.currentRequest.cancel && this.currentRequest.cancel();
      }
      if (this.currentSearchRequest) {
        this.currentSearchRequest.cancel && this.currentSearchRequest.cancel();
      }
    },
    methods: {
      // OPTIMISATION: Méthode séparée pour le chargement initial avec cache
      loadPatients() {
        // OPTIMISATION: Annuler la requête précédente si elle existe
        if (this.currentRequest) {
          this.currentRequest.cancel && this.currentRequest.cancel('Request cancelled');
        }
        
        // OPTIMISATION: Essayer de récupérer depuis le cache d'abord (AFFICHAGE IMMÉDIAT)
        const cached = cacheService.get('/patients', { per_page: 20 });
        if (cached !== null && cached.data && Array.isArray(cached.data)) {
          console.log('[Cache] Affichage immédiat des données en cache');
          this.patients = cached.data;
          this.loading = false; // Afficher immédiatement les données en cache
          
          // Charger en arrière-plan pour mettre à jour le cache (sans bloquer l'UI)
          this.loadPatientsInBackground();
          return; // Sortir ici pour afficher immédiatement
        }
        
        // Si pas de cache, charger normalement avec loading
        this.loading = true;
        
        // OPTIMISATION: Utiliser CancelToken d'Axios pour annuler les requêtes obsolètes
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        this.currentRequest = source;
        
        // OPTIMISATION : Timeout plus long pour la première requête (construction du cache)
        patientService.getAllPatients({ 
          cancelToken: source.token,
          timeout: 30000 // 30 secondes pour la première requête
        })
          .then((res) => {
            // OPTIMISATION : Gérer correctement la réponse paginée
            if (res.data && res.data.data) {
              this.patients = Array.isArray(res.data.data) ? res.data.data : [];
              // Stocker les métadonnées de pagination si disponibles
              if (res.data.pagination) {
                this.pagination = res.data.pagination;
              }
            } else {
              // Ne pas vider le tableau si on a des données en cache
              if (this.patients.length === 0) {
                this.patients = [];
              }
            }
          })
          .catch((err) => {
            // Ignorer les erreurs d'annulation
            if (axios.isCancel(err)) {
              return;
            }
            
            // Détecter spécifiquement ERR_CONNECTION_REFUSED
            const isConnectionRefused = 
                err.code === 'ERR_CONNECTION_REFUSED' ||
                err.code === 'ECONNREFUSED' ||
                (err.message && err.message.includes('Connection refused')) ||
                (err.message && err.message.includes('ECONNREFUSED'));
            
            // Si c'est une erreur réseau et qu'on a des données en cache, les garder
            const isNetworkError = err.code === 'ERR_NETWORK' || 
                                  err.code === 'ERR_CONNECTION_RESET' ||
                                  err.code === 'ERR_CONNECTION_REFUSED' ||
                                  (err.message && err.message.includes('Network Error'));
            
            if (isNetworkError && !isConnectionRefused) {
              // Essayer de récupérer depuis le cache (sauf pour ERR_CONNECTION_REFUSED)
              const cached = cacheService.get('/patients', { per_page: 20 });
              if (cached !== null && cached.data && Array.isArray(cached.data)) {
                console.log('[Cache Fallback] Utilisation du cache en cas d\'erreur réseau');
                this.patients = cached.data;
                // Afficher un message informatif (optionnel)
                if (this.$toast) {
                  this.$toast.warning('Données en cache affichées. Actualisation en cours...', {
                    timeout: 3000
                  });
                }
                return;
              }
            }
            
            console.error("Erreur lors du chargement des patients:", err);
            
            // Pour ERR_CONNECTION_REFUSED, ne pas utiliser le cache (serveur non démarré)
            if (isConnectionRefused) {
              // Le message d'erreur est déjà affiché par caller.services.js
              this.patients = [];
              return;
            }
            
            // Ne vider le tableau que si on n'a pas de données en cache
            if (this.patients.length === 0) {
              this.patients = [];
            }
          })
          .finally(() => {
            this.loading = false;
          });
      },
      
      // OPTIMISATION: Recherche avec debounce, loading state et annulation
      fetchPatient(request) {
        // Si la recherche est vide, recharger tous les patients
        // Sécurisation de request.trim()
        if (!request || typeof request !== 'string' || request.trim() === "") {
          this.loadPatients();
          return;
        }
        
        // OPTIMISATION: Annuler la recherche précédente si elle existe
        if (this.currentSearchRequest) {
          this.currentSearchRequest.cancel && this.currentSearchRequest.cancel('Search cancelled');
        }
        
        this.searchLoading = true;
        
        // OPTIMISATION: Utiliser CancelToken d'Axios pour annuler les requêtes obsolètes
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        this.currentSearchRequest = source;
        
        // OPTIMISATION : Timeout pour les recherches
        patientService.getSearchPatients(request, { 
          cancelToken: source.token,
          timeout: 20000 // 20 secondes pour les recherches
        })
          .then((res) => {
            this.patients = res.data.data || [];
          })
          .catch((err) => {
            // Ignorer les erreurs d'annulation
            if (axios.isCancel(err)) {
              return;
            }
            
            // Si c'est une erreur réseau, ne pas vider le tableau
            const isNetworkError = err.code === 'ERR_NETWORK' || 
                                  err.code === 'ERR_CONNECTION_RESET' ||
                                  (err.message && err.message.includes('Network Error'));
            
            if (isNetworkError) {
              console.warn("Erreur réseau lors de la recherche:", err);
              // Garder les données actuelles au lieu de vider
              if (this.patients.length === 0) {
                // Si on n'a pas de données, essayer de charger depuis le cache
                const cached = cacheService.get('/patients', { per_page: 20 });
                if (cached !== null && cached.data && Array.isArray(cached.data)) {
                  this.patients = cached.data;
                }
              }
            } else {
              console.error("Erreur lors de la recherche:", err);
              // Pour les autres erreurs, vider seulement si nécessaire
              if (this.patients.length === 0) {
                this.patients = [];
              }
            }
          })
          .finally(() => {
            this.searchLoading = false;
          });
      },
      
      // OPTIMISATION: Charger les patients en arrière-plan pour mettre à jour le cache
      loadPatientsInBackground() {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        this.currentRequest = source;
        
        // OPTIMISATION : Timeout pour la mise à jour en arrière-plan
        patientService.getAllPatients({ 
          cancelToken: source.token, 
          silent: true,
          timeout: 30000 // 30 secondes pour la mise à jour
        })
          .then((res) => {
            // Mettre à jour silencieusement sans changer l'UI si les données sont identiques
            if (res.data && res.data.data && Array.isArray(res.data.data)) {
              // Vérifier si les données ont changé
              const newData = res.data.data;
              const currentData = this.patients;
              
              // Comparer rapidement (vérifier le nombre et les premiers UUIDs)
              if (newData.length !== currentData.length || 
                  (newData.length > 0 && currentData.length > 0 && newData[0].uuid !== currentData[0].uuid)) {
                // Les données ont changé, mettre à jour
                this.patients = newData;
                console.log('[Cache] Données mises à jour en arrière-plan');
              } else {
                console.log('[Cache] Données à jour, pas de changement');
              }
              
              // Stocker les métadonnées de pagination si disponibles
              if (res.data.pagination) {
                this.pagination = res.data.pagination;
              }
            }
          })
          .catch((err) => {
            // Ignorer silencieusement les erreurs en arrière-plan
            if (!axios.isCancel(err)) {
              console.debug('[Cache] Erreur lors de la mise à jour en arrière-plan:', err.message);
            }
          });
      },
      
      detail(uuid) {
        this.$router.push("/patients/detail/" + uuid);
      },
      update(uuid) {
        this.$router.push("/patients/update/" + uuid);
      },
      admit(uuid) {
        if (!uuid) {
          this.$toast.error("UUID du patient manquant");
          return;
        }
        // Utiliser le nom de la route pour une navigation plus fiable
        this.$router.push({ 
          name: 'patients.admit', 
          params: { uuid: uuid } 
        }).catch(err => {
          // Ignorer les erreurs de navigation si on est déjà sur la route
          if (err.name !== 'NavigationDuplicated') {
            console.error("Erreur de navigation:", err);
            this.$toast.error("Erreur lors de la navigation vers la page d'admission");
          }
        });
      },
      dme(uuid) {
        this.$router.push("/patients/dme/" + uuid);
      },
  
      supprimer(index) {
        this.deleteIndex = index;
        this.deleteName =
          this.patients[index].lastname + " " + this.patients[index].firstname;
        $("#confirmDeleteModal").modal("show");
      },

      confirmDelete() {
        const index = this.deleteIndex;
        const name = this.deleteName;

        if (index !== null) {
          patientService
            .deletePatient(this.patients[index].uuid)
            .then((res) => {
              this.patients.splice(index, 1);
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => {
              this.deleteIndex = null;
              this.deleteName = "";
              $("#confirmDeleteModal").modal("hide");
              this.showSuccessMessage();
            });
        }
      },

      showSuccessMessage() {
        toast.success("Patient supprimé avec succès !", {
          position: POSITION.TOP_RIGHT,
          timeout: 3000,
          bodyStyle: {
            borderRadius: "10px",
            backgroundColor: "#f0f0f0",
            color: "#333",
            fontWeight: "bold",
          },
        });
      },
    },
  };
</script>

<style scoped>
@import "../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
@import "../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";
select {
  cursor: pointer;
  height: 43px !important;
}

input[type="radio"].demo6 {
  display: none;
}

input[type="radio"].demo6+label {
  position: relative;
  padding-left: 1.3rem;
}

input[type="radio"].demo6+label::before,
input[type="radio"].demo6+label::after {
  display: block;
  position: absolute;
  box-sizing: border-box;
  content: "";
  border-radius: 1rem;
}

input[type="radio"].demo6+label::before {
  bottom: 0;
  left: 0;
  border: 1px solid #ccc;
  background-color: #eee;
  width: 1rem;
  height: 1rem;
}

input[type="radio"].demo6+label::after {
  bottom: 3px;
  left: 3px;
  width: calc(1rem - 6px);
  height: calc(1rem - 6px);
}

input[type="radio"].demo6:checked+label::after {
  background-color: #45c28e;
}

input[type="checkbox"].demo2 {
  display: none;
}

input[type="checkbox"].demo2+label::before {
  content: "";
  border: 1px solid #45c28e;
  padding: 0 0.6rem;
  margin-right: 0.3rem;
}

input[type="checkbox"].demo2:checked+label::before {
  background-color: #45c28e;
}

/* OPTIMISATION: Styles pour skeleton loaders (affichage progressif) */
.skeleton-loader {
  height: 20px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s ease-in-out infinite;
  border-radius: 4px;
  margin: 5px 0;
  /* OPTIMISATION: Isolation de layout pour les animations */
  contain: layout style paint;
  /* OPTIMISATION: Accélération GPU */
  will-change: background-position;
  transform: translateZ(0);
}

@keyframes loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* OPTIMISATION: Amélioration de la performance du rendu */
.table tbody tr {
  transition: background-color 0.2s ease;
  /* OPTIMISATION: Isolation de layout pour éviter les reflows */
  contain: layout style;
  /* OPTIMISATION: Accélération GPU */
  will-change: background-color;
  transform: translateZ(0);
}

.table tbody tr:hover {
  background-color: #f8f9fa;
}

/* OPTIMISATION: Optimisation du rendu du tableau */
.table-responsive {
  /* OPTIMISATION: Isolation de layout */
  contain: layout style paint;
  /* OPTIMISATION: Réduire les reflows */
  will-change: scroll-position;
}

/* OPTIMISATION: Optimisation des skeleton loaders */
.skeleton-loader {
  /* OPTIMISATION: Isolation de layout pour les animations */
  contain: layout style paint;
  /* OPTIMISATION: Accélération GPU */
  will-change: background-position;
  transform: translateZ(0);
}
</style>
<template>
  <section class="tables">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <h3
          class="bg-success card-title text-white rounded p-2 mb-2 text-center"
          style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); ">
          Liste des lits
        </h3>
        <div class="card">
          <div class="card-body">
            <!-- Bouton Ajouter et Recherche -->
            <div class="row mb-3">
              <div class="col-md-3">
                <button
                  type="button"
                  class="btn btn-success btn-medpay-green"
                  @click="openAddModal">
                  <i class="mdi mdi-plus"></i> Ajouter un lit
                </button>
              </div>
              <div class="col-md-9">
                <input 
                  @input="debouncedSearch(q)" 
                  type="text" 
                  v-model="q" 
                  class="form-control rounded-pill py-2" 
                  placeholder="Rechercher un lit (code, nom, salle...)"
                  aria-label="">
              </div>
            </div>

            <!-- Tableau -->
            <div class="table-responsive">
              <table class="table table-hover table-bordered">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Code</th>
                    <th>Nom</th>
                    <th>Salle</th>
                    <th>Statut</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="isLoading || searchLoading">
                    <td colspan="6" class="text-center p-4">
                      <div class="spinner-border text-success" role="status">
                        <span class="sr-only">Chargement...</span>
                      </div>
                    </td>
                  </tr>
                  <tr v-else-if="paginatedBeds.length === 0">
                    <td colspan="6" class="text-center p-4">
                      <p class="text-muted">Aucun lit trouvé</p>
                    </td>
                  </tr>
                  <tr v-else v-for="(bed, index) in paginatedBeds" :key="`bed-${bed.uuid || index}`">
                    <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
                    <td>{{ bed.code || 'N/A' }}</td>
                    <td>{{ bed.name || 'N/A' }}</td>
                    <td>{{ bed.room ? bed.room.name : 'Non renseigné' }}</td>
                    <td>   
                      <span v-bind:class="{'badge badge-success font-weight-bold': bed.state === 'free', 'badge badge-danger font-weight-bold': bed.state !== 'free'}" style="border-radius: 50px;">
                        {{ bed.state === 'free' ? 'Libre' : bed.state === 'busy' ? 'Occupé' : 'N/A' }}
                      </span>
                    </td>
                    <td class="text-center">
                      <div class="btn-group btn-group-sm" role="group">
                        <button
                          id="btnGroupDrop1"
                          type=""
                          style="padding: 0px 10px"
                          class="btn btn-light dropdown-toggle"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          &nbsp;
                          <i class="fa fa-tasks" aria-hidden="true"></i> &nbsp;
                        </button>
                        <div class="dropdown-menu action-button-div" aria-labelledby="btnGroupDrop1" style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%)">
                          <button @click="openUpdateModal(bed.uuid)" 
                            class="dropdown-item font-weight-bold"
                            style="color: black; cursor: pointer;">
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                            Modifier
                          </button>
                          <hr class="m-1" />
                          <button @click="supprimer(getBedIndex(bed))" 
                            style="color: black; cursor: pointer;" 
                            class="dropdown-item font-weight-bold">
                            <i class="mdi mdi-delete menu-icon"></i>
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Pagination -->
            <div class="row mt-3" v-if="totalPages > 1">
              <div class="col-md-6">
                <p class="text-muted">
                  Affichage de {{ ((currentPage - 1) * pageSize) + 1 }} à {{ Math.min(currentPage * pageSize, filteredBeds.length) }} 
                  sur {{ filteredBeds.length }} lit(s)
                </p>
              </div>
              <div class="col-md-6">
                <nav aria-label="Pagination">
                  <ul class="pagination justify-content-end">
                    <li class="page-item" :class="{ disabled: currentPage === 1 }">
                      <a class="page-link" href="#" @click.prevent="goToPage(currentPage - 1)">Précédent</a>
                    </li>
                    <li 
                      v-for="page in visiblePages" 
                      :key="page"
                      class="page-item" 
                      :class="{ active: page === currentPage, disabled: page === '...' }">
                      <a class="page-link" href="#" @click.prevent="page !== '...' && goToPage(page)">{{ page }}</a>
                    </li>
                    <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                      <a class="page-link" href="#" @click.prevent="goToPage(currentPage + 1)">Suivant</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="addBedModal" ref="addBedModal">
      <div class="modal-dialog">
        <h4 class="card-title text-white  p-3 mt-4 text-center  col-12"
          style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top : -17px !important">
          Ajouter un lit
        </h4>
        <div class="modal-content" style="margin-top : -17px !important; background-color: white;">
          <div class="modal-body">
            <form class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="name">Désignation<span style="color: red">*</span></label>
                  <input
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.bed.name.haveError,
                    }"
                    id="name" 
                    type="text" 
                    minlength="3"
                    maxlength="125"
                    placeholder="Entrez la désignation du lit"
                    v-model="bed.name" 
                    required/>

                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.bed.name.haveError" style="font-size: 11px">
                    {{ formErrors.bed.name.message }}
                  </div>
                </div>

                <div class="form-group controls">
                  <label for="room">Salle correspondante<span style="color: red">*</span></label>
                  <select 
                    :class="{ 
                      'form-control': true,
                      'is-invalid': formErrors.bed.room_id.haveError,
                    }" 
                    v-model="bed.room_id"
                    id="room" 
                    required>
                    <option value="null" selected>Selectionner une salle correspondante</option>
                    <option v-for="room in rooms" :key="room.uuid" :value="room.uuid">
                      {{ room.name }}
                    </option>
                  </select>

                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.bed.room_id.haveError" style="font-size: 11px">
                    {{ formErrors.bed.room_id.message }}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="d-flex justify-content-between col-12 flex-row">
              <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal"
              @click="clearData">
                Annuler
              </button>

              <button type="submit"
                class="btn btn-success btn-medpay-green"
                @click="createBed"
                :disabled="isCreating">
                <span v-if="isCreating" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                <span v-if="isCreating">En cours...</span>
                <span v-else>Ajouter</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="updateBedModal">
      <div class="modal-dialog">
        <h4 class="card-title text-white  p-3 mt-4 text-center  col-12"
          style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top : -17px !important">
          Mettre à jour un lit
        </h4>
        <div class="modal-content" style="margin-top : -17px !important; background-color: white;">
          <div class="modal-body">
            <form class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="name">Désignation<span style="color: red">*</span></label>
                  <input
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.bed.name.haveError,
                    }"
                    id="name" 
                    type="text" 
                    minlength="3"
                    maxlength="125"
                    placeholder="Entrez la désignation du lit"
                    v-model="bed.name"
                    required/>

                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.bed.name.haveError" style="font-size: 11px">
                    {{ formErrors.bed.name.message }}
                  </div>
                </div>

                <div class="form-group controls">
                  <label for="room">Salle correspondante<span style="color: red">*</span></label>
                  <select 
                    :class="{ 
                      'form-control': true,
                      'is-invalid': formErrors.bed.room_id.haveError,
                    }" 
                    v-model="bed.room_id"
                    id="room" 
                    required>
                    <option value="" selected disabled>Selectionner une salle correspondante</option>
                    <option v-for="room in rooms" :key="room.uuid" :value="room.uuid">
                      {{ room.name }} (Capacité: {{ room.bed_capacity }} lit(s))
                    </option>
                  </select>

                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.bed.room_id.haveError" style="font-size: 11px">
                    {{ formErrors.bed.room_id.message }}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="d-flex justify-content-between col-12 flex-row">
              <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal"
              @click="clearData">
                Annuler
              </button>

              <button type="submit"
                class="btn btn-success btn-medpay-green"
                @click="updateBed"
                :disabled="isUpdating">
                <span v-if="isUpdating" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                <span v-if="isUpdating">En cours...</span>
                <span v-else>Enregistrer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="confirmDeleteModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="confirmDeleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmDeleteModalLabel">
              Confirmation de la suppression
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Êtes-vous sûr de vouloir supprimer le lit: {{ deleteName }} ?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary btn-rounded"
              data-dismiss="modal"
            >
              Annuler
            </button>
            <button
              type="button"
              class="btn btn-danger btn-medpay-gray"
              @click="confirmDelete"
            >
              Supprimer
            </button>
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
import { bedService } from "@/_services";
import { roomService } from "@/_services";
import { debounceSearch } from "@/_services/debounce.service";
import axios from "axios";
import { POSITION } from "vue-toastification";

export default {
  name: "list-bed",
  data() {
    return {
      isLoading: true,
      searchLoading: false,
      isCreating: false,
      isUpdating: false,
      q: "",
      patients: {},
      patient_id: null,
      rooms: [],
      beds: [],
      bed: {
        name: "",
        room_id: null,
      },
      deleteIndex: null,
      deleteName: "",
      formErrors: { 
        bed: {
          name: {
            haveError: false,
            message: "",
          },
          room_id: {
            haveError: false,
            message: "",
          },
        },
      },
      // OPTIMISATION: Contrôleurs pour annuler les requêtes obsolètes
      currentRequest: null,
      currentSearchRequest: null,
      debouncedSearch: null,
      // Pagination
      currentPage: 1,
      pageSize: 10,
    };
  },
  computed: {
    // OPTIMISATION: Filtrer les lits en fonction de la recherche
    filteredBeds() {
      if (!this.q || this.q.trim() === "") {
        return this.beds;
      }
      const query = this.q.toLowerCase().trim();
      return this.beds.filter(bed => {
        const code = (bed.code || '').toLowerCase();
        const name = (bed.name || '').toLowerCase();
        const roomName = (bed.room && bed.room.name ? bed.room.name : '').toLowerCase();
        return code.includes(query) || name.includes(query) || roomName.includes(query);
      });
    },
    totalPages() {
      return Math.ceil(this.filteredBeds.length / this.pageSize);
    },
    paginatedBeds() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredBeds.slice(start, end);
    },
    visiblePages() {
      const pages = [];
      const total = this.totalPages;
      const current = this.currentPage;
      
      if (total <= 7) {
        for (let i = 1; i <= total; i++) {
          pages.push(i);
        }
      } else {
        if (current <= 3) {
          for (let i = 1; i <= 5; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(total);
        } else if (current >= total - 2) {
          pages.push(1);
          pages.push('...');
          for (let i = total - 4; i <= total; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push('...');
          for (let i = current - 1; i <= current + 1; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(total);
        }
      }
      
      return pages;
    },
  },
  mounted() {
    // OPTIMISATION: Charger les lits avec loading state
    this.loadBeds();
    
    // OPTIMISATION: Debounce pour la recherche
    this.debouncedSearch = debounceSearch((query) => {
      this.searchBeds(query);
    }, 300);
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
    // OPTIMISATION: Méthode séparée pour le chargement initial
    async loadBeds() {
      // OPTIMISATION: Annuler la requête précédente si elle existe
      if (this.currentRequest) {
        this.currentRequest.cancel && this.currentRequest.cancel('Request cancelled');
      }
      
      this.isLoading = true;
      
      try {
        // Charger les salles et les lits en parallèle
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        this.currentRequest = source;
        
        const [roomsRes, bedsRes] = await Promise.all([
          roomService.getAllRooms().catch(err => {
            // Ignorer les erreurs d'annulation
            if (axios.isCancel(err)) {
              return null;
            }
            console.error("Erreur chargement salles:", err);
            // Ne pas afficher d'erreur pour les salles, juste logger
            return null;
          }),
          bedService.getAllBeds({ cancelToken: source.token }).catch(err => {
            // Ignorer les erreurs d'annulation
            if (axios.isCancel(err)) {
              return { data: { data: [] } };
            }
            
            // Logger toutes les erreurs pour débogage
            console.error("Erreur chargement lits - Détails:", {
              message: err.message,
              response: err.response ? {
                status: err.response.status,
                statusText: err.response.statusText,
                data: err.response.data
              } : 'Pas de réponse',
              request: err.request ? 'Requête envoyée' : 'Pas de requête'
            });
            
            // Ne pas afficher d'erreur toast automatiquement
            // Seulement pour les erreurs critiques
            if (err.response) {
              const status = err.response.status;
              const errorData = err.response.data;
              
              if (status >= 500) {
                // Erreur serveur - afficher un message plus détaillé
                const errorMessage = errorData && errorData.data && errorData.data.message 
                  ? errorData.data.message 
                  : errorData && errorData.message 
                    ? errorData.message 
                    : "Erreur serveur lors du chargement des lits";
                
                this.$toast.error(errorMessage, {
                  position: POSITION.TOP_RIGHT,
                  timeout: 5000,
                });
              } else if (status === 401 || status === 403) {
                this.$toast.error("Vous n'avez pas les permissions nécessaires", {
                  position: POSITION.TOP_RIGHT,
                  timeout: 3000,
                });
              } else if (status === 404) {
                // 404 peut être normal si aucun lit n'existe encore
                // Ne pas afficher d'erreur, juste retourner une liste vide
                return { data: { data: [] } };
              } else {
                // Autres erreurs (400, 422, etc.) - logger mais ne pas afficher
                console.warn("Erreur non critique lors du chargement des lits:", status, errorData);
                return { data: { data: [] } };
              }
              // Retourner une structure vide pour éviter les erreurs
              return { data: { data: [] } };
            } else if (!err.response) {
              // Erreur réseau - seulement si ce n'est pas une annulation
              this.$toast.error("Erreur de connexion. Vérifiez votre connexion internet.", {
                position: POSITION.TOP_RIGHT,
                timeout: 3000,
              });
              return { data: { data: [] } };
            }
            return { data: { data: [] } };
          })
        ]);

        // Vérifier que les réponses sont valides pour les salles
        if (roomsRes && roomsRes.data) {
          // Gérer différentes structures de réponse
          if (Array.isArray(roomsRes.data)) {
            this.rooms = roomsRes.data;
          } else if (roomsRes.data.data && Array.isArray(roomsRes.data.data)) {
            this.rooms = roomsRes.data.data;
          } else {
            this.rooms = [];
          }
        } else {
          this.rooms = [];
        }
        
        // Vérifier que les réponses sont valides pour les lits
        // DEBUG: Logger la structure complète de la réponse
        console.log("DEBUG - Structure complète de bedsRes:", bedsRes);
        console.log("DEBUG - bedsRes.data:", bedsRes && bedsRes.data);
        
        if (bedsRes && bedsRes.data) {
          // Structure Laravel ResourceCollection avec reponse_json_transform:
          // bedsRes = { data: { data: [...], current_page, ... } }
          // Donc bedsRes.data.data contient le tableau de lits
          
          let bedsArray = null;
          
          // Cas 1: bedsRes.data est directement un tableau
          if (Array.isArray(bedsRes.data)) {
            bedsArray = bedsRes.data;
            console.log("DEBUG - Cas 1: bedsRes.data est un tableau, longueur:", bedsArray.length);
          }
          // Cas 2: bedsRes.data.data existe et est un tableau (structure paginée)
          else if (bedsRes.data.data && Array.isArray(bedsRes.data.data)) {
            bedsArray = bedsRes.data.data;
            console.log("DEBUG - Cas 2: bedsRes.data.data est un tableau, longueur:", bedsArray.length);
          }
          // Cas 3: Structure triple imbriquée (peu probable mais possible)
          else if (bedsRes.data.data && bedsRes.data.data.data && Array.isArray(bedsRes.data.data.data)) {
            bedsArray = bedsRes.data.data.data;
            console.log("DEBUG - Cas 3: bedsRes.data.data.data est un tableau, longueur:", bedsArray.length);
          }
          
          if (bedsArray) {
            this.beds = bedsArray;
            console.log("DEBUG - Lits assignés avec succès, nombre:", this.beds.length);
          } else {
            console.warn("DEBUG - Aucun tableau de lits trouvé dans la structure de réponse");
            this.beds = [];
          }
        } else if (bedsRes === null) {
          // Si la requête a échoué mais qu'on a catch l'erreur, initialiser à vide
          console.warn("DEBUG - bedsRes est null");
          this.beds = [];
        } else {
          console.warn("DEBUG - bedsRes ou bedsRes.data est undefined");
          this.beds = [];
        }
        
      } catch (error) {
        // Ignorer les erreurs d'annulation
        if (axios.isCancel(error)) {
          return;
        }
        console.error("Erreur lors de l'initialisation:", error);
        this.beds = [];
        this.rooms = [];
        
        // Afficher un message d'erreur seulement pour les erreurs critiques
        if (error.response && error.response.status >= 500) {
          this.$toast.error("Erreur serveur lors du chargement des données", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
          });
        }
      } finally {
        this.isLoading = false;
      }
    },
    
    // OPTIMISATION: Recherche avec debounce et loading state
    async searchBeds(query) {
      // Si la recherche est vide, recharger tous les lits
      if (!query || typeof query !== 'string' || query.trim() === "") {
        this.loadBeds();
        return;
      }
      
      // OPTIMISATION: Annuler la requête de recherche précédente
      if (this.currentSearchRequest) {
        this.currentSearchRequest.cancel && this.currentSearchRequest.cancel('Search cancelled');
      }
      
      this.searchLoading = true;
      
      try {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        this.currentSearchRequest = source;
        
        // La recherche se fait côté client via computed filteredBeds
        // Pas besoin d'appel API supplémentaire
        await new Promise(resolve => setTimeout(resolve, 100)); // Petit délai pour UX
      } catch (error) {
        if (axios.isCancel(error)) {
          return;
        }
        console.error("Erreur lors de la recherche:", error);
      } finally {
        this.searchLoading = false;
      }
    },
    
    async refreshBeds(){
      await this.loadBeds();
    },
    clearBedData(){
      this.bed = {
        name: "",
        room_id: null,
      };
    },
    async preparingForBedUpdate(uuid){
      try {
        this.clearBedError();
        const res = await bedService.getBed(uuid);
        
        if (res && res.data && res.data.data) {
          this.bed = {
            name: res.data.data.name || "",
            room_id: res.data.data.room ? res.data.data.room.uuid : null,
            uuid: uuid
          };
        } else {
          this.$toast.error("Impossible de charger les données du lit", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
          });
        }
      } catch (error) {
        console.error("Erreur lors du chargement du lit:", error);
        const errorMessage = error.response && error.response.data && error.response.data.data && error.response.data.data.message
          ? error.response.data.data.message
          : "Erreur lors du chargement des données du lit";
        
        this.$toast.error(errorMessage, {
          position: POSITION.TOP_RIGHT,
          timeout: 3000,
        });
      }
    },
    clearBedError(){
      this.formErrors = { 
        bed: {
          name: {
            haveError: false,
            message: "",
          },
          room_id: {
            haveError: false,
            message: "",
          },
        },
      };
    },
    clearData(){
      this.clearBedData();
      this.clearBedError();
    },
    openAddModal(){
      // S'assurer que les salles sont chargées
      if (this.rooms.length === 0) {
        this.$toast.warning("Chargement des salles en cours...", {
          position: POSITION.TOP_RIGHT,
          timeout: 2000,
        });
        // Recharger les salles si nécessaire
        roomService.getAllRooms().then((res) => {
          if (res && res.data) {
            if (Array.isArray(res.data)) {
              this.rooms = res.data;
            } else if (res.data.data && Array.isArray(res.data.data)) {
              this.rooms = res.data.data;
            }
          }
          this.clearData();
          this.$nextTick(() => {
            $('#addBedModal').modal('show');
          });
        }).catch(() => {
          this.$toast.error("Erreur lors du chargement des salles", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
          });
        });
      } else {
        this.clearData();
        this.$nextTick(() => {
          $('#addBedModal').modal('show');
        });
      }
    },
    async openUpdateModal(uuid){
      await this.preparingForBedUpdate(uuid);
      this.$nextTick(() => {
        $('#updateBedModal').modal('show');
      });
    },
    createBed()
    {
      this.clearBedError();
      if (!this.bed.name || this.bed.name.trim() === "") {
        this.formErrors.bed.name.message = 'Veuillez entrer la désignation.';
        this.formErrors.bed.name.haveError = true;
        return;
      }
      if (!this.bed.room_id || this.bed.room_id === "" || this.bed.room_id === "null") {
        this.formErrors.bed.room_id.message = 'Veuillez sélectionner une salle.';
        this.formErrors.bed.room_id.haveError = true;
        return;
      }

      this.isCreating = true;

      bedService
      .addBed(this.bed)
      .then(async (response) => {
        //Reset form field and errors
        this.clearData();
        
        // Close the "Add Bed" modal first
        $('#addBedModal').modal('hide');
        
        // Attendre un peu pour que le modal se ferme complètement
        await this.$nextTick();
        
        // Rafraîchir la liste des lits après la création
        // Utiliser loadBeds directement pour forcer le rechargement
        await this.loadBeds();

        this.$toast.success("Enregistrement effectué avec succès !", {
          position: POSITION.TOP_RIGHT,
          timeout: 3000,
          bodyStyle: {
            borderRadius: "10px",
            backgroundColor: "#f0f0f0",
            color: "#333",
            fontWeight: "bold",
          },
        });
      })
      .catch((error) => {
        console.log(error);
        try {
          this.formErrors.bed.name.message = error.response.data.errors.name[0];
          this.formErrors.bed.name.haveError = true;
        } 
        catch (error) {}

        try {
          this.formErrors.bed.room_id.message = error.response.data.errors.room_id[0];
          this.formErrors.bed.room_id.haveError = true;
        } 
        catch (error) {}

        try {
          const errorMessage = error.response && error.response.data && error.response.data.data && error.response.data.data.message
            ? error.response.data.data.message
            : "Une erreur est survenue lors de l'ajout du lit.";
          
          this.$toast.error(errorMessage, {
            position: POSITION.TOP_RIGHT,
            timeout: 5000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#ff0000",
              color: "#fff",
              fontWeight: "bold",
            },
          });
        } 
        catch (error) {}
      })
      .finally(() => {
        this.isCreating = false;
      });
    },
    updateBed() {
      this.clearBedError();
      if (!this.bed.name || this.bed.name.trim() === "") {
        this.formErrors.bed.name.message = 'Veuillez entrer la désignation.';
        this.formErrors.bed.name.haveError = true;
        return;
      }
      if (!this.bed.room_id || this.bed.room_id === "" || this.bed.room_id === "null") {
        this.formErrors.bed.room_id.message = 'Veuillez sélectionner une salle.';
        this.formErrors.bed.room_id.haveError = true;
        return;
      }

      this.isUpdating = true;

      bedService
      .updateBed(this.bed)
      .then(async (response) => {
        //Reset form field and errors
        this.clearData();
        
        // Close the "Update Bed" modal first
        $('#updateBedModal').modal('hide');
        
        // Attendre un peu pour que le modal se ferme complètement
        await this.$nextTick();
        
        // Rafraîchir la liste des lits après la modification
        // Utiliser loadBeds directement pour forcer le rechargement
        await this.loadBeds();

        this.$toast.success("Modification effectuée avec succès !", {
          position: POSITION.TOP_RIGHT,
          timeout: 3000,
          bodyStyle: {
            borderRadius: "10px",
            backgroundColor: "#f0f0f0",
            color: "#333",
            fontWeight: "bold",
          },
        });
      })
      .catch((error) => {
        console.log(error)
        try {
          this.formErrors.bed.name.message = error.response.data.errors.name[0];
          this.formErrors.bed.name.haveError = true;
        } 
        catch (error) {}

        try {
          this.formErrors.bed.room_id.message = error.response.data.errors.room_id[0];
          this.formErrors.bed.room_id.haveError = true;
        } 
        catch (error) {}

        try {
          const errorMessage = error.response && error.response.data && error.response.data.data && error.response.data.data.message
            ? error.response.data.data.message
            : "Une erreur est survenue lors de la modification du lit.";
          
          this.$toast.error(errorMessage, {
            position: POSITION.TOP_RIGHT,
            timeout: 5000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#ff0000",
              color: "#fff",
              fontWeight: "bold",
            },
          });
        } 
        catch (error) {}
      })
      .finally(() => {
        this.isUpdating = false;
      });
    },
    getBedIndex(bed) {
      return this.filteredBeds.findIndex(b => b.uuid === bed.uuid);
    },
    supprimer(index) {
      const bed = this.filteredBeds[index];
      if (!bed) return;
      
      this.deleteIndex = this.beds.findIndex(b => b.uuid === bed.uuid);
      this.deleteName = bed.name || 'ce lit';
      $("#confirmDeleteModal").modal("show");
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.currentPage = page;
        const tableElement = document.querySelector('.table-responsive');
        if (tableElement) {
          tableElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    },

    async confirmDelete() {
      const index = this.deleteIndex;
      const name = this.deleteName;
      
      if (index !== null && index >= 0 && this.beds[index]) {
        try {
          const bedToDelete = this.beds[index];
          const res = await bedService.deleteBed(bedToDelete.uuid);
          
          // Retirer le lit de la liste
          this.beds.splice(index, 1);
          
          this.$toast.success(res.data && res.data.data && res.data.data.message ? res.data.data.message : "Lit supprimé avec succès", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
        } catch (err) {
          const errorMessage = (err.response && err.response.data && err.response.data.data && err.response.data.data.message) 
            ? err.response.data.data.message 
            : "Erreur lors de la suppression du lit";
          
          this.$toast.error(errorMessage, {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#ff0000",
              color: "#fff",
              fontWeight: "bold",
            },
          });
        } finally {
          this.deleteIndex = null;
          this.deleteName = "";
          $("#confirmDeleteModal").modal("hide");
        }
      }
    },
  },
};
</script>

<style scoped>
@import "../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";

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

#confirmDeleteModal .modal-dialog {
  max-width: 500px;
  border-radius: 10px;
}

#confirmDeleteModal .modal-content {
  border: none;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

#confirmDeleteModal .modal-header {
  background-color: #f8f9fa;
  border-radius: 10px 10px 0 0;
  border-bottom: none;
}

#confirmDeleteModal .close {
  font-size: 24px;
  color: #6c757d;
}

#confirmDeleteModal .alert {
  border-radius: 10px;
}

#confirmDeleteModal .alert p {
  margin-bottom: 0;
  font-weight: bold;
}

#confirmDeleteModal .modal-body {
  padding: 20px;
}

#confirmDeleteModal .modal-title {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

#confirmDeleteModal .modal-value {
  margin-bottom: 10px;
  font-size: 16px;
}

#confirmDeleteModal .modal-footer {
  border-top: none;
  background-color: #f8f9fa;
  border-radius: 0 0 10px 10px;
}

#confirmDeleteModal .btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

#confirmDeleteModal .btn-danger:hover,
#confirmDeleteModal .btn-danger:focus {
  background-color: #c82333;
  border-color: #bd2130;
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

.btn-medpay-green-small {
  background-color: #0B5D3F;
  border-color: #0B5D3F;
  color: white;
}

.btn-medpay-green-small:hover {
  background-color: #0a4d32;
  border-color: #0a4d32;
  color: white;
}

/* Styles pour les boutons avec spinner */
.btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
  border-width: 0.15em;
}

.mr-2 {
  margin-right: 0.5rem;
}
</style>

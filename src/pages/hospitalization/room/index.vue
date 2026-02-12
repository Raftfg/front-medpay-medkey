<template>
  <section class="tables">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <h3
          class="bg-success card-title text-white rounded p-2 mb-2 text-center"
          style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); ">
          Liste des salles
        </h3>
        <div class="card">
          <div class="card-body">
            <!-- Bouton Ajouter et Recherche -->
            <div class="row mb-3">
              <div class="col-md-3">
                <button
                  type="submit"
                  class="btn btn-success btn-medpay-green"
                  data-toggle="modal" data-target="#addRoomModal">
                  <i class="mdi mdi-plus"></i> Ajouter
                </button>
              </div>
              <div class="col-md-9">
                <input 
                  @input="debouncedSearch(q)" 
                  type="text" 
                  v-model="q" 
                  class="form-control rounded-pill py-2" 
                  placeholder="Rechercher une salle (code, nom, service...)"
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
                    <th>Désignation</th>
                    <th>Service</th>
                    <th>Capacité totale</th>
                    <th>Espace restant</th>
                    <th>Prix</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="isLoading">
                    <td colspan="8" class="text-center p-4">
                      <div class="spinner-border text-success" role="status">
                        <span class="sr-only">Chargement...</span>
                      </div>
                    </td>
                  </tr>
                  <tr v-else-if="paginatedRooms.length === 0">
                    <td colspan="8" class="text-center p-4">
                      <p class="text-muted">Aucune salle trouvée</p>
                    </td>
                  </tr>
                  <tr v-else v-for="(room, index) in paginatedRooms" :key="room.uuid">
                    <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
                    <td>{{ room.code || 'N/A' }}</td>
                    <td>{{ room.name || 'N/A' }}</td>
                    <td>{{ room.service ? room.service.name : (room.services_id ? 'Service #' + room.services_id : 'Non assigné') }}</td>
                    <td>{{ room.bed_capacity || 0 }}</td>
                    <td>{{ (room.bed_capacity || 0) - (room.bed_count || 0) }}</td>
                    <td>{{ room.price ? room.price.toLocaleString() : '0' }}</td>
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
                        <div
                          class="dropdown-menu action-button-div"
                          aria-labelledby="btnGroupDrop1"
                          style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%)"
                        >
                          <button @click="preparingForHospitalization(room.uuid)" 
                            class="dropdown-item font-weight-bold"
                            style="color: black; cursor: pointer;"
                            data-toggle="modal" data-target="#hospitalizePatient">
                            <i class="fa fa-bed" aria-hidden="true"></i>
                            Affecter Patient
                          </button>
                          <hr class="m-1" />
                          <button @click="preparingForRoomUpdate(room.uuid)" 
                            class="dropdown-item font-weight-bold"
                            style="color: black; cursor: pointer;"
                            data-toggle="modal" data-target="#updateRoomModal">
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                            Modifier
                          </button>
                          <hr class="m-1" />
                          <button @click="supprimer(getRoomIndex(room))" style="color: black; cursor: pointer;" class="dropdown-item font-weight-bold">
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
                  Affichage de {{ ((currentPage - 1) * pageSize) + 1 }} à {{ Math.min(currentPage * pageSize, filteredRooms.length) }} 
                  sur {{ filteredRooms.length }} salle(s)
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

    <div class="modal fade" id="addRoomModal" ref="addRoomModal">
      <div class="modal-dialog">
        <h4 class="card-title text-white  p-3 mt-4 text-center  col-12"
          style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top : -17px !important">
          Ajouter une salle
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
                      'is-invalid': formErrors.name.haveError,
                    }"
                    id="name" 
                    type="text" 
                    minlength="3"
                    maxlength="30"
                    placeholder="Entrez la désignation de la salle"
                    v-model="room.name" 
                    required/>
                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.name.haveError" style="font-size: 11px">
                    {{ formErrors.name.message }}
                  </div>
                </div>

                <div class="col-md-12 row mg-0 ml-0 pl-0 pr-0">
                  <div class="form-group col-md-6 pl-0">
                    <label for="bed_capacity">Capacité de lit<span style="color: red">*</span></label>
                    <input
                      :class="{
                        'form-control': true,
                        'is-invalid': formErrors.bed_capacity.haveError,
                      }"
                      id="bed_capacity" 
                      type="number" 
                      min="1"
                      max="255"
                      placeholder="Entrez la capacité de lit"
                      v-model="room.bed_capacity" 
                      required/>
                    <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.bed_capacity.haveError" style="font-size: 11px">
                      {{ formErrors.bed_capacity.message }}
                    </div>
                  </div>

                  <div class="form-group col-md-6 pr-0">
                    <label for="price">Coût</label>
                    <input
                      :class="{
                        'form-control': true,
                        'is-invalid': formErrors.price.haveError,
                      }"
                      id="price" 
                      type="number" 
                      min="1"
                      max="999999"
                      placeholder="Entrez le coût de la salle"
                      v-model="room.price" 
                      />
                    <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.price .haveError" style="font-size: 11px">
                      {{ formErrors.price.message }}
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="services_id">Service<span style="color: red">*</span></label>
                  <select
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.services_id && formErrors.services_id.haveError,
                    }"
                    id="services_id" 
                    v-model="room.services_id"
                    required>
                    <option value="">Sélectionner un service</option>
                    <option v-for="service in services" :key="service.id" :value="service.id">
                      {{ service.name }}
                    </option>
                  </select>
                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.services_id && formErrors.services_id.haveError" style="font-size: 11px">
                    {{ formErrors.services_id.message }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="description ">Description</label>
                  <input
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.description .haveError,
                    }"
                    id="description " 
                    type="text" 
                    minlength="5"
                    maxlength="255"
                    placeholder="Entrez la description de la salle"
                    v-model="room.description" 
                    />
                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.description .haveError" style="font-size: 11px">
                    {{ formErrors.description .message }}
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
                @click="createRoom">
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="updateRoomModal">
      <div class="modal-dialog">
        <h4 class="card-title text-white  p-3 mt-4 text-center  col-12"
          style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top : -17px !important">
          Mettre à jour une salle
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
                      'is-invalid': formErrors.name.haveError,
                    }"
                    id="name" 
                    type="text" 
                    minlength="3"
                    maxlength="30"
                    placeholder="Entrez la désignation de la salle"
                    v-model="room.name" 
                    required/>
                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.name.haveError" style="font-size: 11px">
                    {{ formErrors.name.message }}
                  </div>
                </div>

                <div class="col-md-12 row mg-0 ml-0 pl-0 pr-0">
                  <div class="form-group col-md-6 pl-0">
                    <label for="bed_capacity">Capacité de lit<span style="color: red">*</span></label>
                    <input
                      :class="{
                        'form-control': true,
                        'is-invalid': formErrors.bed_capacity.haveError,
                      }"
                      id="bed_capacity" 
                      type="number" 
                      min="1"
                      max="255"
                      placeholder="Entrez la capacité de lit"
                      v-model="room.bed_capacity" 
                      required/>
                    <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.bed_capacity.haveError" style="font-size: 11px">
                      {{ formErrors.bed_capacity.message }}
                    </div>
                  </div>

                  <div class="form-group col-md-6 pr-0">
                    <label for="price">Coût</label>
                    <input
                      :class="{
                        'form-control': true,
                        'is-invalid': formErrors.price.haveError,
                      }"
                      id="price" 
                      type="number" 
                      min="1"
                      max="999999"
                      placeholder="Entrez le coût de la salle"
                      v-model="room.price" 
                      />
                    <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.price .haveError" style="font-size: 11px">
                      {{ formErrors.price.message }}
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <label for="services_id_update">Service<span style="color: red">*</span></label>
                  <select
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.services_id && formErrors.services_id.haveError,
                    }"
                    id="services_id_update" 
                    v-model="room.services_id"
                    required>
                    <option value="">Sélectionner un service</option>
                    <option v-for="service in services" :key="service.id" :value="service.id">
                      {{ service.name }}
                    </option>
                  </select>
                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.services_id && formErrors.services_id.haveError" style="font-size: 11px">
                    {{ formErrors.services_id.message }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="description ">Description</label>
                  <input
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.description .haveError,
                    }"
                    id="description " 
                    type="text" 
                    minlength="5"
                    maxlength="255"
                    placeholder="Entrez la description de la salle"
                    v-model="room.description" 
                    />
                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.description .haveError" style="font-size: 11px">
                    {{ formErrors.description .message }}
                  </div>
                </div>
                
                
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="d-flex justify-content-between col-12 flex-row">
              <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal"
              @click="clearRoomData">
                Annuler
              </button>

              <button type="submit"
                class="btn btn-success btn-medpay-green"
                @click="updateRoom">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="hospitalizePatient">
      <div class="modal-dialog">
        <h4 class="card-title text-white  p-3 mt-4 text-center  col-12"
          style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top : -17px !important">
          Affecter un patient 
        </h4>
        <div class="modal-content" style="margin-top : -17px !important; background-color: white;">
          <div class="modal-body">
            <form class="forms-sample row">
              <div class="col-md-12">

                <div class="form-group controls">
                  <label for="room">Patient<span style="color: red">*</span></label>
                  <select 
                    :class="{ 
                      'form-control': true,
                    }" 
                    v-model="hospitalization.patient_id"
                    id="room" 
                    required>
                    <option value="null" selected>Selectionner un patient</option>
                    <option v-for="patient in movments" :key="patient.uuid" :value="patient.uuid">
                      {{patient.ipp + '  ' + patient.lastname + ' ' + patient.firstname}}
                    </option>
                  </select>

                  <!-- <div class="invalid-feedback" v-if="formErrors.bed.room_id.haveError">
                    {{ formErrors.bed.room_id.message }}
                  </div> -->
                </div>

                <div class="form-group controls">
                  <label for="room">Lit<span style="color: red">*</span></label>
                  <select 
                    :class="{ 
                      'form-control': true,
                      'mb-3': true,
                    }" 
                    v-model="hospitalization.bed_id"
                    id="room" 
                    required>
                    <option value="null" selected>Selectionner un lit</option>
                    <option v-for="bed in beds" :key="bed.uuid" :value="bed.uuid">
                      {{ bed.name }}
                    </option>
                  </select>

                  <!-- <div class="invalid-feedback" v-if="formErrors.bed.room_id.haveError">
                    {{ formErrors.bed.room_id.message }}
                  </div> -->
                </div>

                <div class="col-md-12 row ml-0 pl-0 pr-0">
                  <div class="form-group controls col-md-6 pl-0">
                    <label for="name">Date Début<span style="color: red">*</span></label>
                    <input
                      :class="{
                        'form-control': true,
                      }"
                      id="name" 
                      type="date" 
                      v-model="hospitalization.start_occupation_date"
                      required/>

                    <!-- <div class="invalid-feedback" v-if="formErrors.bed.name.haveError">
                      {{ formErrors.bed.name.message }}
                    </div> -->
                  </div>

                  <div class="form-group controls col-md-6 pr-0">
                    <label for="name">Nombre de jours<span style="color: red">*</span></label>
                    <input
                      :class="{
                        'form-control': true,
                      }"
                      id="number_of_days" 
                      type="number" 
                      min="1"
                      max="999999"
                      placeholder="Nombre de jours prévu"
                      v-model="hospitalization.number_of_days"
                      required/>

                    <!-- <div class="invalid-feedback" v-if="formErrors.bed.name.haveError">
                      {{ formErrors.bed.name.message }}
                    </div> -->
                  </div>
                </div>
                <div class="form-group controls">
                  <label for="comment">Commentaires</label>
                  <input
                    :class="{
                      'form-control': true,
                    }"
                    id="comment" 
                    type="text" 
                    minlength="3"
                    maxlength="255"
                    placeholder="Commentaires"
                    v-model="hospitalization.comment"
                  />

                  <!-- <div class="invalid-feedback" v-if="formErrors.bed.name.haveError">
                    {{ formErrors.bed.name.message }}
                  </div> -->
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="d-flex justify-content-between col-12 flex-row">
              <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal"
              >
                Annuler
              </button>

              <button type="submit"
                class="btn btn-success btn-medpay-green"
                @click="hospitalizePatient"
               >
                Affecter
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
            Êtes-vous sûr de vouloir supprimer la salle: {{ deleteName }} ?
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
import '../../../../node_modules/select2/dist/js/select2';

import { roomService } from "@/_services";
import { bedPatientService } from "@/_services";
import { patientService } from "@/_services";
import { movmentService }  from "@/_services/movment_services.js";
import { serviceService } from "@/_services";
import { debounceSearch } from "@/_services/debounce.service";

import { useToast, POSITION } from "vue-toastification";

export default {
  name: "list-room",

  data() {
    return {
       /**Pagination movement**/
      q: "",
      currentTutorial: null,
      currentIndex: -1,
      page: 1,
      count: 0,
      pageSize: 50,
      pageSizes: [50, 250, 1000],

      indexSpinner:false,
      movments: [],
      /**Pagination var**/


      rooms: [],
      beds: {},
      patients: {},
      services: [],
      isLoading: false,
      hospitalization:{
        bed_id: null,
        patient_id: null,
        start_occupation_date: '',
        number_of_days: 1,
        comment: '',
      },
      room: {
        name: "",
        bed_capacity: "",
        price: "",
        services_id: "",
        options: [],
        description: "",
      },
      bed: {
        name: "",
        room_id: null,
      },
      deleteIndex: null,
      deleteName: "",
      table: null,
      formErrors: { 
        name: {
          haveError: false,
          message: "",
        },
        bed_capacity: {
          haveError: false,
          message: "",
        },
        services_id: {
          haveError: false,
          message: "",
        },
        description: {
          haveError: false,
          message: "",
        },
        price: {
          haveError: false,
          message: "",
        },
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
    };
  },
  computed: {
    filteredRooms() {
      if (!this.q || this.q.trim() === "") {
        return this.rooms;
      }
      const query = this.q.toLowerCase().trim();
      return this.rooms.filter(room => {
        const code = (room.code || '').toLowerCase();
        const name = (room.name || '').toLowerCase();
        const serviceName = (room.service && room.service.name ? room.service.name : '').toLowerCase();
        return code.includes(query) || name.includes(query) || serviceName.includes(query);
      });
    },
    totalPages() {
      return Math.ceil(this.filteredRooms.length / this.pageSize);
    },
    paginatedRooms() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredRooms.slice(start, end);
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
    this.isLoading = true;
    this.initializeSelect2();

    $('#roomOptionsCreate').select2();
    
    // Debounce pour la recherche
    this.debouncedSearch = this.debounce((query) => {
      this.currentPage = 1; // Réinitialiser à la première page
    }, 300);

    // Charger les services et les chambres en parallèle
    Promise.all([
      serviceService.getAllServices().catch(err => {
        console.error("Erreur chargement services:", err);
        return { data: { data: [] } };
      }),
      patientService.getAllPatients().catch(err => {
        console.error("Erreur chargement patients:", err);
        return { data: { data: [] } };
      }),
      roomService.getAllRooms().catch(err => {
        console.error("Erreur chargement chambres:", err);
        return { data: { data: [] } };
      })
    ]).then(([servicesRes, patientsRes, roomsRes]) => {
      // Extraire les services
      if (servicesRes.data && servicesRes.data.data) {
        this.services = Array.isArray(servicesRes.data.data) ? servicesRes.data.data : [];
      }
      
      // Extraire les patients
      if (patientsRes.data && patientsRes.data.data) {
        this.patients = Array.isArray(patientsRes.data.data) ? patientsRes.data.data : [];
      }
      
      // Extraire les chambres
      if (roomsRes.data) {
        // RoomsResource retourne une structure paginée
        if (roomsRes.data.data && Array.isArray(roomsRes.data.data)) {
          this.rooms = roomsRes.data.data;
        } else if (Array.isArray(roomsRes.data)) {
          this.rooms = roomsRes.data;
        } else {
          this.rooms = [];
        }
      } else {
        this.rooms = [];
      }
      
      console.log("Chambres chargées:", this.rooms.length);
      
      this.currentPage = 1; // Réinitialiser à la première page
      this.isLoading = false;
    }).catch(error => {
      console.error("Erreur lors du chargement des données:", error);
      this.isLoading = false;
      this.$toast.error("Erreur lors du chargement des données", {
        position: POSITION.TOP_RIGHT,
        timeout: 3000,
      });
    });
  },
  methods: {
    initializeSelect2() {
      // Assuming you have added a ref attribute to your select field, for example, ref="roomOptions"
      this.$nextTick(() => {
        $(this.$refs.roomOptions).select2({
          placeholder: 'Select options',
          allowClear: true,
        });
      });

      $('.select2-container .select2-search--inline .select2-search__field').css({
        width: '99% !important', // Ajustez la largeur au besoin
        height: '40px !important', // Ajustez la hauteur au besoin
      });
    },
    hospitalizePatient()
    { 
      console.log(this.hospitalization);
      bedPatientService.addBedPatient(this.hospitalization)
      .then((res) => {
        console.log(res);
        // Close the "Add Room" modal
        $('#hospitalizePatient').modal('hide');
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
      .catch((err) => {
        console.log(err);
      });
    },
    getRequestParams(q, page, pageSize) {
      let params = {};

      if (q) {
        params["q"] = q;
      }

      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
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
          this.movments = res.data.data.data;
          this.count = res.data.data.total;
          this.indexSpinner = false;
          console.log(this.movments);
        })
      .catch((error) => {
        console.error(error);
      });
    },
    preparingForHospitalization(uuid){
      this.hospitalization.room_id = uuid;

      this.fetchLastMovement();
      roomService.getFreeBeds(uuid)
      .then((res) => {
        this.beds = res.data.data;
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    },
    refreshRooms(){
      this.isLoading = true;
      roomService.getAllRooms().then((res) => {
        // RoomsResource retourne une structure paginée
        if (res.data) {
          if (res.data.data && Array.isArray(res.data.data)) {
            this.rooms = res.data.data;
          } else if (Array.isArray(res.data)) {
            this.rooms = res.data;
          } else {
            this.rooms = [];
          }
        } else {
          this.rooms = [];
        }
        
        this.currentPage = 1; // Réinitialiser à la première page
        this.isLoading = false;
      }).catch(err => {
        console.error("Erreur lors du rechargement des chambres:", err);
        this.isLoading = false;
        this.$toast.error("Erreur lors du rechargement des chambres", {
          position: POSITION.TOP_RIGHT,
          timeout: 3000,
        });
      });
    },
    clearRoomData(){
      this.room =  {
        name: "",
        bed_capacity: "",
        price: "",
        services_id: "",
        options: [],
        description: "",
      };
    },
    preparingForRoomUpdate(uuid){
      roomService.getRoom(uuid).then((res) => {
        console.log(res);
        this.room = res.data.data;
        this.room.uuid = uuid;
      });
    },
    clearRoomError(){
      this.formErrors ={ 
        name: {
          haveError: false,
          message: "",
        },
        bed_capacity: {
          haveError: false,
          message: "",
        },
        services_id: {
          haveError: false,
          message: "",
        },
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
        description: {
          haveError: false,
          message: "",
        },
        price: {
          haveError: false,
          message: "",
        },
      };
    },
    clearData(){
      this.clearRoomData();
      this.clearRoomError();
    },
    createRoom()
    {
      this.clearRoomError();

      if (this.room.name === "" || this.room.name === null || this.room.name == "null") {
        this.formErrors.name.message = 'Veuillez entrez la désignation.';
        this.formErrors.name.haveError = true;
        return;
      }
      if (this.room.bed_capacity === "" || this.room.bed_capacity === null || this.room.bed_capacity == "null") {
        this.formErrors.bed_capacity.message = 'Veuillez entrez la capacité.';
        this.formErrors.bed_capacity.haveError = true;
        return;
      }

      roomService
      .addRoom(this.room)
      .then((response) => {
        //Reset form field and errors and refresh rooms tab
        this.clearData();
        this.refreshRooms();

        // Close the "Add Room" modal
        $('#addRoomModal').modal('hide');

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
          this.formErrors.name.message = error.response.data.errors.name[0];
          this.formErrors.name.haveError = true;} 
        catch (error) {}
        try {
          this.formErrors.bed_capacity.message = error.response.data.errors.bed_capacity[0];
          this.formErrors.bed_capacity.haveError = true;
        } 
        catch (error) {}
        try {
          this.formErrors.description.message = error.response.data.errors.description[0];
          this.formErrors.description.haveError = true;
        } 
        catch (error) {
        }
        try {
          this.formErrors.price.message = error.response.data.errors.price[0];
          this.formErrors.price.haveError = true;
        } 
        catch (error) {}
      });
    },
    updateRoom() {
      this.clearRoomError();

      if (this.room.name === "" || this.room.name === null || this.room.name == "null") {
        this.formErrors.name.message = 'Veuillez entrez la désignation.';
        this.formErrors.name.haveError = true;
        return;
      }
      if (this.room.bed_capacity === "" || this.room.bed_capacity === null || this.room.bed_capacity == "null") {
        this.formErrors.bed_capacity.message = 'Veuillez entrez la capacité.';
        this.formErrors.bed_capacity.haveError = true;
        return;
      }
      if (!this.room.services_id || this.room.services_id === "" || this.room.services_id == "null") {
        if (!this.formErrors.services_id) {
          this.formErrors.services_id = { haveError: false, message: "" };
        }
        this.formErrors.services_id.message = 'Veuillez sélectionner un service.';
        this.formErrors.services_id.haveError = true;
        return;
      }

      roomService
      .updateRoom(this.room)
      .then((response) => {
        //Reset form field and errors and refresh rooms tab
        this.clearData();
        this.refreshRooms();

        // Close the "Update Room" modal
        $('#updateRoomModal').modal('hide');

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
        console.log(error);
        // Traitement en cas d'erreur
        try {
          this.formErrors.name.message = error.response.data.errors.name[0];
          this.formErrors.name.haveError = true;} 
        catch (error) {}
        try {
          this.formErrors.bed_capacity.message = error.response.data.errors.bed_capacity[0];
          this.formErrors.bed_capacity.haveError = true;
        } 
        catch (error) {}
        try {
          this.formErrors.description.message = error.response.data.errors.description[0];
          this.formErrors.description.haveError = true;
        } 
        catch (error) {
        }
        try {
          this.formErrors.price.message = error.response.data.errors.price[0];
          this.formErrors.price.haveError = true;
        } 
        catch (error) {}
      });
    },
    debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
        const later = () => {
          clearTimeout(timeout);
          func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    },
    getRoomIndex(room) {
      return this.filteredRooms.findIndex(r => r.uuid === room.uuid);
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
    supprimer(index) {
      const room = this.filteredRooms[index];
      if (!room) return;
      
      this.deleteIndex = this.rooms.findIndex(r => r.uuid === room.uuid);
      this.deleteName = room.name;
      $("#confirmDeleteModal").modal("show");
    },

    confirmDelete() {
      const index = this.deleteIndex;
      const name = this.deleteName;
      if (index !== null) {
        roomService
        .deleteRoom(this.rooms[index].uuid)
        .then((res) => {
          this.rooms.splice(index, 1);
          this.$toast.success(res.data.data.message, {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "red",
              fontWeight: "bold",
            },
          });
        })
        .catch((err) => {
          this.$toast.error(err.response.data.data.message, {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#ff0000",
              color: "fff",
              fontWeight: "bold",
            },
          });
        })
        .finally(() => {
          this.deleteIndex = null;
          this.deleteName = "";
          $("#confirmDeleteModal").modal("hide");
        });
      }
    },
  },
};
</script>

<style scoped>
@import "../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
@import "../../../../node_modules/select2/dist/css/select2.css";

.pagination {
  margin-bottom: 0;
}

.page-link {
  cursor: pointer;
}

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
</style>

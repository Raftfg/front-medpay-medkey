<template>
  <section class="tables">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <h3
          class="bg-success card-title text-white rounded p-2 mb-2 text-center"
          style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); ">
          Historique des hospitalisations
        </h3>
        <div class="card">
          <div class="card-body">
            <!-- Filtres et recherche -->
            <div class="row mb-3">
              <div class="col-md-3">
                <input 
                  @input="debouncedSearch(q)" 
                  type="text" 
                  v-model="q" 
                  class="form-control rounded-pill py-2" 
                  placeholder="Rechercher (IPP, nom patient, salle...)"
                  aria-label="">
              </div>
              <div class="col-md-2">
                <select v-model="filterStatus" @change="applyFilters" class="form-control">
                  <option value="">Tous les statuts</option>
                  <option value="active">En cours</option>
                  <option value="completed">Terminées</option>
                </select>
              </div>
              <div class="col-md-2">
                <input 
                  type="date" 
                  v-model="filterDateFrom" 
                  @change="applyFilters"
                  class="form-control" 
                  placeholder="Date début">
              </div>
              <div class="col-md-2">
                <input 
                  type="date" 
                  v-model="filterDateTo" 
                  @change="applyFilters"
                  class="form-control" 
                  placeholder="Date fin">
              </div>
              <div class="col-md-3 text-right">
                <button 
                  @click="resetFilters" 
                  class="btn btn-secondary btn-sm">
                  <i class="mdi mdi-refresh"></i> Réinitialiser
                </button>
              </div>
            </div>

            <!-- Tableau -->
            <div class="table-responsive" id="fixingIssue">
              <table class="table table-hover table-bordered">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Patient</th>
                    <th>IPP</th>
                    <th>Lit</th>
                    <th>Salle</th>
                    <th>Service</th>
                    <th>Date d'entrée</th>
                    <th>Date de sortie</th>
                    <th>Durée (jours)</th>
                    <th>Statut</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="isLoading">
                    <td colspan="11" class="text-center p-4">
                      <div class="spinner-border text-success" role="status">
                        <span class="sr-only">Chargement...</span>
                      </div>
                    </td>
                  </tr>
                  <tr v-else-if="filteredBedPatients.length === 0">
                    <td colspan="11" class="text-center p-4">
                      <p class="text-muted">Aucune hospitalisation trouvée</p>
                    </td>
                  </tr>
                  <tr v-else v-for="(bed_patient, index) in paginatedBedPatients" :key="bed_patient.uuid">
                    <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
                    <td>
                      <strong>{{ getPatientName(bed_patient.patient) }}</strong>
                    </td>
                    <td>{{ bed_patient.patient ? bed_patient.patient.ipp : 'N/A' }}</td>
                    <td>{{ bed_patient.bed ? (bed_patient.bed.code || bed_patient.bed.name || 'N/A') : 'N/A' }}</td>
                    <td>{{ bed_patient.bed && bed_patient.bed.room ? bed_patient.bed.room.name : 'N/A' }}</td>
                    <td>{{ bed_patient.bed && bed_patient.bed.room && bed_patient.bed.room.service ? bed_patient.bed.room.service.name : 'N/A' }}</td>
                    <td>{{ formatDate(bed_patient.start_occupation_date) }}</td>
                    <td>{{ bed_patient.end_occupation_date ? formatDate(bed_patient.end_occupation_date) : 'En cours...' }}</td>
                    <td>
                      <span v-if="bed_patient.duration_days !== null && bed_patient.duration_days !== undefined">
                        {{ bed_patient.duration_days }} jour(s)
                      </span>
                      <span v-else-if="bed_patient.is_active">
                        {{ calculateDaysFromStart(bed_patient.start_occupation_date) }} jour(s)
                      </span>
                      <span v-else>N/A</span>
                    </td>
                    <td>
                      <span 
                        v-bind:class="{
                          'badge badge-success font-weight-bold': bed_patient.is_active,
                          'badge badge-secondary font-weight-bold': !bed_patient.is_active
                        }" 
                        style="border-radius: 50px;">
                        {{ bed_patient.is_active ? 'En cours' : 'Terminée' }}
                      </span>
                    </td>
                    <td class="text-center">
                      <button
                        @click="showDetails(bed_patient.uuid)"
                        class="btn btn-info btn-xs"
                        v-b-tooltip.hover title="Voir les détails">
                        <i class="mdi mdi-eye"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <!-- Pagination -->
            <div class="row mt-3" v-if="totalPages > 1">
              <div class="col-md-6">
                <p class="text-muted">
                  Affichage de {{ ((currentPage - 1) * pageSize) + 1 }} à {{ Math.min(currentPage * pageSize, filteredBedPatients.length) }} 
                  sur {{ filteredBedPatients.length }} hospitalisation(s)
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
  </section>
</template>


<script>

import { bedPatientService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "list-bed-patient",

  data() {
    return {
      bed_patients: [],
      filteredBedPatients: [],
      isLoading: false,
      q: "",
      filterStatus: "",
      filterDateFrom: "",
      filterDateTo: "",
      debouncedSearch: null,
      currentPage: 1,
      pageSize: 10,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.filteredBedPatients.length / this.pageSize);
    },
    paginatedBedPatients() {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      return this.filteredBedPatients.slice(start, end);
    },
    visiblePages() {
      const pages = [];
      const total = this.totalPages;
      const current = this.currentPage;
      
      if (total <= 7) {
        // Afficher toutes les pages si moins de 7
        for (let i = 1; i <= total; i++) {
          pages.push(i);
        }
      } else {
        // Afficher avec ellipses
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
    this.loadBedPatients();
    
    // Debounce pour la recherche
    this.debouncedSearch = this.debounce((query) => {
      this.applyFilters();
    }, 300);
  },
  methods: {
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
    loadBedPatients() {
      this.isLoading = true;
      
      // Construire les paramètres de requête
      const params = {};
      if (this.filterStatus) {
        params.status = this.filterStatus;
      }
      if (this.filterDateFrom) {
        params.date_from = this.filterDateFrom;
      }
      if (this.filterDateTo) {
        params.date_to = this.filterDateTo;
      }
      if (this.q && this.q.trim() !== "") {
        params.search = this.q.trim();
      }
      
      bedPatientService.getAllBedPatients(params)
        .then((res) => {
          // Gérer différentes structures de réponse
          if (res.data) {
            if (res.data.data && Array.isArray(res.data.data)) {
              this.bed_patients = res.data.data;
            } else if (Array.isArray(res.data)) {
              this.bed_patients = res.data;
            } else {
              this.bed_patients = [];
            }
          } else {
            this.bed_patients = [];
          }
          
          this.applyFilters();
          this.currentPage = 1; // Réinitialiser à la première page
          this.isLoading = false;
        })
        .catch((err) => {
          console.error("Erreur lors du chargement des hospitalisations:", err);
          this.isLoading = false;
          this.$toast.error("Erreur lors du chargement des hospitalisations", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
          });
        });
    },
    applyFilters() {
      let filtered = [...this.bed_patients];
      
      // Filtre par recherche
      if (this.q && this.q.trim() !== "") {
        const query = this.q.toLowerCase().trim();
        filtered = filtered.filter(bp => {
          const patientName = this.getPatientName(bp.patient).toLowerCase();
          const ipp = (bp.patient && bp.patient.ipp ? bp.patient.ipp : '').toLowerCase();
          const roomName = (bp.bed && bp.bed.room && bp.bed.room.name ? bp.bed.room.name : '').toLowerCase();
          const bedCode = (bp.bed && bp.bed.code ? bp.bed.code : '').toLowerCase();
          return patientName.includes(query) || 
                 ipp.includes(query) || 
                 roomName.includes(query) ||
                 bedCode.includes(query);
        });
      }
      
      // Filtre par statut
      if (this.filterStatus) {
        if (this.filterStatus === 'active') {
          filtered = filtered.filter(bp => bp.is_active === true);
        } else if (this.filterStatus === 'completed') {
          filtered = filtered.filter(bp => bp.is_active === false);
        }
      }
      
      // Filtre par date début
      if (this.filterDateFrom) {
        filtered = filtered.filter(bp => {
          if (!bp.start_occupation_date_raw) return false;
          return new Date(bp.start_occupation_date_raw) >= new Date(this.filterDateFrom);
        });
      }
      
      // Filtre par date fin
      if (this.filterDateTo) {
        filtered = filtered.filter(bp => {
          if (!bp.start_occupation_date_raw) return false;
          return new Date(bp.start_occupation_date_raw) <= new Date(this.filterDateTo + 'T23:59:59');
        });
      }
      
      this.filteredBedPatients = filtered;
      this.currentPage = 1; // Réinitialiser à la première page après filtrage
    },
    goToPage(page) {
      if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
        this.currentPage = page;
        // Scroll vers le haut du tableau
        const tableElement = document.getElementById('fixingIssue');
        if (tableElement) {
          tableElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    },
    resetFilters() {
      this.q = "";
      this.filterStatus = "";
      this.filterDateFrom = "";
      this.filterDateTo = "";
      this.applyFilters();
    },
    getPatientName(patient) {
      if (!patient) return 'N/A';
      const lastname = patient.lastname || '';
      const firstname = patient.firstname || '';
      return `${lastname} ${firstname}`.trim() || 'N/A';
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
      } catch (e) {
        return dateString;
      }
    },
    calculateDaysFromStart(startDate) {
      if (!startDate) return 0;
      try {
        const start = new Date(startDate);
        const now = new Date();
        const diffTime = Math.abs(now - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
      } catch (e) {
        return 0;
      }
    },
    showDetails(uuid) {
      this.$router.push("/hospitalization/history/" + uuid + "/details");
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

.pagination {
  margin-bottom: 0;
}

.page-link {
  cursor: pointer;
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

<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded px-3 py-1 mb-3 text-center"
              style=" background-color: #0B5D3F; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-transform: none;">
              Recherche de Dossier Médical (DME)
            </h3>

            <fieldset class="form-group border px-3 py-4 bg-light">
              <legend class="w-auto px-2"><b style="font-size: 12px;">Critères de recherche</b></legend>
              <div class="row justify-content-center">
                <div class="col-md-8">
                  <div class="input-group">
                    <input 
                      type="text" 
                      class="form-control py-4 rounded-pill border-success" 
                      placeholder="Identifiant IPP, Nom ou Prénom du patient..."
                      v-model="query"
                      @keyup.enter="search"
                      style="height: 45px;"
                    >
                    <div class="input-group-append">
                      <button 
                        class="btn btn-success btn-medpay-green px-4 rounded-pill ml-2" 
                        type="button" 
                        @click="search" 
                        :disabled="isLoading"
                        style="height: 45px; display: flex; align-items: center; justify-content: center;"
                      >
                        <span v-if="isLoading" class="spinner-border spinner-border-sm mr-2" role="status"></span>
                        <i v-else class="mdi mdi-magnify mr-1"></i> RECHERCHER
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>

            <!-- OPTIMISATION: Skeleton loaders pour affichage progressif -->
            <div v-if="isLoading" class="mt-4">
              <div class="table-responsive">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr style="background-color: rgb(216, 218, 216)">
                      <th>IPP</th>
                      <th>Nom du Patient</th>
                      <th>Prénoms</th>
                      <th>Sexe</th>
                      <th class="text-center">Dossier</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="n in 5" :key="`skeleton-${n}`">
                      <td><div class="skeleton-loader"></div></td>
                      <td><div class="skeleton-loader"></div></td>
                      <td><div class="skeleton-loader"></div></td>
                      <td><div class="skeleton-loader"></div></td>
                      <td><div class="skeleton-loader"></div></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div v-else-if="results.length > 0" class="mt-4">
              <div class="table-responsive">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr style="background-color: rgb(216, 218, 216)">
                      <th>IPP</th>
                      <th>Nom du Patient</th>
                      <th>Prénoms</th>
                      <th>Sexe</th>
                      <th class="text-center">Dossier</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="patient in results" :key="patient.uuid || patient.id">
                      <td class="font-weight-bold">{{ patient.ipp || 'N/A' }}</td>
                      <td class="text-uppercase">{{ patient.lastname || '' }}</td>
                      <td class="text-capitalize">{{ patient.firstname || '' }}</td>
                      <td>{{ patient.gender || 'N/A' }}</td>
                      <td class="text-center">
                        <button 
                          class="btn btn-success btn-sm px-3 py-2" 
                          @click="openDme(patient.uuid)"
                          :disabled="!patient.uuid"
                          style="font-weight: bold;"
                        >
                          <i class="mdi mdi-folder-open text-white mr-1"></i> Ouvrir le DME
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div v-else-if="hasSearched && !isLoading" class="mt-5 text-center text-muted p-5 border rounded bg-white">
               <i class="mdi mdi-account-search-outline display-3 opacity-25"></i>
               <p class="mt-3">Aucun patient trouvé pour cette recherche.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { patientService } from "@/_services";

export default {
  name: "DmeSearch",
  data() {
    return {
      query: "",
      results: [],
      isLoading: false,
      hasSearched: false
    };
  },
  methods: {
    async search() {
      if (!this.query || this.query.trim().length < 2) {
        this.$toast.warning("Veuillez saisir au moins 2 caractères.", {
          position: "top-right",
          timeout: 3000,
        });
        return;
      }
      this.isLoading = true;
      this.hasSearched = true;
      try {
        const res = await patientService.getSearchPatients(this.query.trim());
        if (res.data && res.data.data) {
          // Gérer la pagination si présente
          this.results = res.data.data.data || res.data.data || [];
        } else {
          this.results = [];
        }
      } catch (error) {
        console.error("Erreur recherche DME:", error);
        this.results = [];
        let errorMessage = "Erreur lors de la recherche.";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        this.$toast.error(errorMessage, {
          position: "top-right",
          timeout: 5000,
        });
      } finally {
        this.isLoading = false;
      }
    },
    openDme(uuid) {
      this.$router.push({ name: "patients.dme", params: { uuid: uuid } });
    }
  }
};
</script>

<style scoped>
fieldset {
  border-radius: 8px;
  background-color: #f8f9fa !important;
}
.btn-medpay-green {
    background-color: #0B5D3F !important;
    border-color: #0B5D3F !important;
    font-weight: bold;
}
.border-success {
    border-color: #0B5D3F !important;
}
.table thead th {
    font-weight: bold;
    color: #333;
}
.btn-medpay-green:hover:not(:disabled) {
    background-color: #094a31 !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    transition: all 0.2s ease;
}
.btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    transition: all 0.2s ease;
}
.btn-success:hover {
    background-color: #0a5c3e !important;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(11, 93, 63, 0.3);
    transition: all 0.2s ease;
}
.btn-success {
    background-color: #0B5D3F !important;
    border-color: #0B5D3F !important;
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

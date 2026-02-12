<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-5 text-center" style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-bottom: 15px !important;">
              Détails de l'hospitalisation
            </h3>
            
            <div v-if="isLoading" class="text-center p-5">
              <div class="spinner-border text-success" role="status">
                <span class="sr-only">Chargement...</span>
              </div>
            </div>
            
            <div v-else-if="bedPatient">
              <fieldset class="scheduler-border">
                <legend class="scheduler-border">Informations du patient</legend>
                <div class="row col-md-12">
                  <div class="col-md-5 vertical-line">
                    <div class="col-md-12">
                      <div class="d-flex flex-column justify-content-center align-items-start"> 
                        <p style="font-weight: bold;">Nom complet:</p> 
                        <p style="margin-top: -10px;">{{ getPatientName(bedPatient.patient) }}</p>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="d-flex flex-column justify-content-center align-items-start"> 
                        <p style="font-weight: bold;">IPP:</p> 
                        <p style="margin-top: -10px;">{{ bedPatient.patient ? bedPatient.patient.ipp : 'N/A' }}</p>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="d-flex flex-column justify-content-center align-items-start"> 
                        <p style="font-weight: bold;">Date de naissance:</p> 
                        <p style="margin-top: -10px;">{{ formatDate(bedPatient.patient ? bedPatient.patient.birthdate : null) }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-7">
                    <div class="col-md-12">
                      <div class="d-flex flex-column justify-content-center align-items-start"> 
                        <p style="font-weight: bold;">Sexe:</p> 
                        <p style="margin-top: -10px;">{{ bedPatient.patient ? (bedPatient.patient.sex === 'M' ? 'Masculin' : bedPatient.patient.sex === 'F' ? 'Féminin' : 'N/A') : 'N/A' }}</p>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="d-flex flex-column justify-content-center align-items-start"> 
                        <p style="font-weight: bold;">Téléphone:</p> 
                        <p style="margin-top: -10px;">{{ bedPatient.patient ? bedPatient.patient.phone : 'N/A' }}</p>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="d-flex flex-column justify-content-center align-items-start"> 
                        <p style="font-weight: bold;">Adresse:</p> 
                        <p style="margin-top: -10px;">{{ bedPatient.patient ? bedPatient.patient.address : 'N/A' }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset class="scheduler-border">
                <legend class="scheduler-border">Informations d'hospitalisation</legend>
                <div class="row col-md-12">
                  <div class="col-md-5 vertical-line">
                    <div class="col-md-12">
                      <div class="d-flex flex-column justify-content-center align-items-start"> 
                        <p style="font-weight: bold;">Lit:</p> 
                        <p style="margin-top: -10px;">{{ bedPatient.bed ? (bedPatient.bed.code || bedPatient.bed.name || 'N/A') : 'N/A' }}</p>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="d-flex flex-column justify-content-center align-items-start"> 
                        <p style="font-weight: bold;">Salle:</p> 
                        <p style="margin-top: -10px;">{{ bedPatient.bed && bedPatient.bed.room ? bedPatient.bed.room.name : 'N/A' }}</p>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="d-flex flex-column justify-content-center align-items-start"> 
                        <p style="font-weight: bold;">Service:</p> 
                        <p style="margin-top: -10px;">{{ bedPatient.bed && bedPatient.bed.room && bedPatient.bed.room.service ? bedPatient.bed.room.service.name : 'N/A' }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-7">
                    <div class="col-md-12">
                      <div class="d-flex flex-column justify-content-center align-items-start"> 
                        <p style="font-weight: bold;">Date d'entrée:</p> 
                        <p style="margin-top: -10px;">{{ formatDate(bedPatient.start_occupation_date_raw) }}</p>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="d-flex flex-column justify-content-center align-items-start"> 
                        <p style="font-weight: bold;">Date de sortie:</p> 
                        <p style="margin-top: -10px;">{{ bedPatient.end_occupation_date_raw ? formatDate(bedPatient.end_occupation_date_raw) : 'En cours...' }}</p>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="d-flex flex-column justify-content-center align-items-start"> 
                        <p style="font-weight: bold;">Durée (jours):</p> 
                        <p style="margin-top: -10px;">
                          <span v-if="bedPatient.duration_days !== null && bedPatient.duration_days !== undefined">
                            {{ bedPatient.duration_days }} jour(s)
                          </span>
                          <span v-else-if="bedPatient.is_active">
                            {{ calculateDaysFromStart(bedPatient.start_occupation_date_raw) }} jour(s)
                          </span>
                          <span v-else>N/A</span>
                        </p>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="d-flex flex-column justify-content-center align-items-start"> 
                        <p style="font-weight: bold;">Statut:</p> 
                        <p style="margin-top: -10px;">
                          <span 
                            v-bind:class="{
                              'badge badge-success font-weight-bold': bedPatient.is_active,
                              'badge badge-secondary font-weight-bold': !bedPatient.is_active
                            }" 
                            style="border-radius: 50px;">
                            {{ bedPatient.is_active ? 'En cours' : 'Terminée' }}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div class="col-md-12" v-if="bedPatient.comment">
                      <div class="d-flex flex-column justify-content-center align-items-start"> 
                        <p style="font-weight: bold;">Commentaires:</p> 
                        <p style="margin-top: -10px;">{{ bedPatient.comment }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset class="scheduler-border" v-if="bedPatient.movment">
                <legend class="scheduler-border">Informations du mouvement</legend>
                <div class="row col-md-12">
                  <div class="col-md-6">
                    <div class="col-md-12">
                      <div class="d-flex flex-column justify-content-center align-items-start"> 
                        <p style="font-weight: bold;">IEP:</p> 
                        <p style="margin-top: -10px;">{{ bedPatient.movment.iep || 'N/A' }}</p>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="d-flex flex-column justify-content-center align-items-start"> 
                        <p style="font-weight: bold;">Type d'admission:</p> 
                        <p style="margin-top: -10px;">{{ bedPatient.movment.admission_type || 'N/A' }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="col-md-12">
                      <div class="d-flex flex-column justify-content-center align-items-start"> 
                        <p style="font-weight: bold;">Date d'arrivée:</p> 
                        <p style="margin-top: -10px;">{{ formatDate(bedPatient.movment.arrivaldate) }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>

              <div class="d-flex justify-content-between col-12 flex-row mt-4">
                <button @click="cancel" class="btn btn-danger btn-medpay-gray">
                  <i class="mdi mdi-arrow-left"></i> Retour
                </button>
              </div>
            </div>
            
            <div v-else class="text-center p-5">
              <p class="text-muted">Hospitalisation non trouvée</p>
              <button @click="cancel" class="btn btn-secondary mt-3">
                <i class="mdi mdi-arrow-left"></i> Retour
              </button>
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
  name: "bed-patient-details",
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      bedPatient: null,
      isLoading: false,
    };
  },
  mounted() {
    const uuid = this.uuid || this.$route.params.uuid;
    if (uuid) {
      this.loadBedPatient(uuid);
    } else {
      this.$toast.error("UUID de l'hospitalisation manquant", {
        position: POSITION.TOP_RIGHT,
        timeout: 3000,
      });
      this.cancel();
    }
  },
  methods: {
    loadBedPatient(uuid) {
      this.isLoading = true;
      bedPatientService.getBedPatient(uuid)
        .then((res) => {
          if (res.data && res.data.data) {
            this.bedPatient = res.data.data;
          } else {
            this.bedPatient = null;
            this.$toast.error("Hospitalisation non trouvée", {
              position: POSITION.TOP_RIGHT,
              timeout: 3000,
            });
          }
          this.isLoading = false;
        })
        .catch((err) => {
          console.error("Erreur lors du chargement de l'hospitalisation:", err);
          this.isLoading = false;
          this.$toast.error("Erreur lors du chargement de l'hospitalisation", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
          });
          this.cancel();
        });
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
    cancel() {
      this.$router.push("/hospitalization/history/list");
    },
  },
};
</script>

<style scoped>
fieldset.scheduler-border {
  border: 1px groove #ddd !important;
  margin: 0 0 1.5em 0 !important;
  -webkit-box-shadow: 0px 0px 0px 0px #000;
  box-shadow: 0px 0px 0px 0px #000;
}

legend.scheduler-border {
  font-size: 1.2em !important;
  font-weight: bold !important;
  text-align: left !important;
  width: auto;
  padding: 0 10px;
  border-bottom: none;
}

.vertical-line {
  border-right: 1px solid #ddd;
  height: 100%;
}
</style>

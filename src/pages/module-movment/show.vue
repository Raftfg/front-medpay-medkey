<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded px-3 py-1 mt-0 text-center" 
                style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-transform: none;">
        Détail de la venue
      </h3>

            <!-- Skeleton loader pendant le chargement -->
            <div v-if="isLoading" class="text-center py-5">
              <div class="spinner-border text-success" role="status">
                <span class="sr-only">Chargement...</span>
              </div>
              <p class="mt-2">Chargement des détails de la venue...</p>
            </div>

            <!-- Message d'erreur -->
            <div v-else-if="error" class="alert alert-danger" role="alert">
              <strong>Erreur :</strong> {{ error }}
                </div>

            <!-- Contenu principal -->
            <div v-else-if="movment && Object.keys(movment).length > 0">
              <!-- Section : Informations de la venue -->
              <fieldset class="form-group border px-3 py-1 mt-3">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Informations de la venue</b></legend>
                <table class="table table-borderless">
                  <tr>
                    <td class="bg-stripped">
                      <div class="row">
                        <div class="col-md-6 middle vr">
                          <div class="form-group">
                            <strong>N° Venue (IEP) :</strong>
                            <span class="ml-2">{{ movment.iep || 'Non renseigné' }}</span>
                          </div>
                        </div>
                        <div class="col-md-6 middle">
                          <div class="form-group">
                            <strong>N° Patient (IPP) :</strong>
                            <span class="ml-2">{{ movment.ipp || 'Non renseigné' }}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="row">
                        <div class="col-md-4 middle vr">
                          <div class="form-group">
                            <strong>Date d'arrivée :</strong>
                            <span class="ml-2">{{ formatDate(movment.arrivaldate || movment.human_arrival_date) }}</span>
                          </div>
                        </div>
                        <div class="col-md-4 middle vr">
                          <div class="form-group">
                            <strong>Service de traitement :</strong>
                            <span class="ml-2">{{ movment.services_name || movment.service?.name || 'Non assigné' }}</span>
                          </div>
                        </div>
                        <div class="col-md-4 middle">
                          <div class="form-group">
                            <strong>Type d'admission :</strong>
                            <span class="ml-2">
                              <span v-if="movment.admission_type" 
                                    :class="{
                                      'badge badge-success': movment.admission_type === 'programmée',
                                      'badge badge-danger': movment.admission_type === 'urgence'
                                    }"
                                    style="text-transform: capitalize;">
                                {{ movment.admission_type }}
                              </span>
                              <span v-else class="text-muted">Non renseigné</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="movment.responsible_doctor || movment.doctor">
                    <td class="bg-stripped">
                      <div class="row">
                        <div class="col-md-12 middle">
                          <div class="form-group">
                            <strong>Médecin responsable :</strong>
                            <span class="ml-2">
                              <span v-if="movment.doctor">
                                Dr. {{ movment.doctor.name || '' }} {{ movment.doctor.prenom || movment.doctor.firstname || '' }}
                              </span>
                              <span v-else-if="movment.responsible_doctor">
                                Dr. {{ movment.responsible_doctor.name || '' }} {{ movment.responsible_doctor.prenom || movment.responsible_doctor.firstname || '' }}
                              </span>
                              <span v-else class="text-muted">Non assigné</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg-stripped">
                      <div class="row">
                        <div class="col-md-12 middle">
                          <div class="form-group">
                            <strong>Motif principal de la venue :</strong>
                            <span class="ml-2">{{ movment.incoming_reason || 'Non renseigné' }}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="movment.releasedate || movment.outgoing_reason">
                    <td>
                      <div class="row">
                        <div class="col-md-6 middle vr">
                          <div class="form-group">
                            <strong>Date de sortie :</strong>
                            <span class="ml-2">{{ formatDate(movment.releasedate) }}</span>
                          </div>
                        </div>
                        <div class="col-md-6 middle">
                          <div class="form-group">
                            <strong>Motif de sortie :</strong>
                            <span class="ml-2">{{ movment.outgoing_reason || 'Non renseigné' }}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </fieldset>

              <!-- Section : Identité du patient -->
              <fieldset class="form-group border px-3 py-1 mt-3">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Identité du patient</b></legend>
                <table class="table table-borderless">
                  <tr>
                    <td class="bg-stripped">
                      <div class="row">
                        <div class="col-md-6 middle vr">
                          <div class="form-group">
                            <strong>Nom :</strong>
                            <span class="ml-2" style="text-transform: uppercase">{{ movment.lastname || 'Non renseigné' }}</span>
                          </div>
                        </div>
                        <div class="col-md-6 middle">
                          <div class="form-group">
                            <strong>Prénom(s) :</strong>
                            <span class="ml-2" style="text-transform: capitalize">{{ movment.firstname || 'Non renseigné' }}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="row">
                        <div class="col-md-4 middle vr">
                          <div class="form-group">
                            <strong>Âge :</strong>
                            <span class="ml-2">{{ movment.age ? movment.age + ' ans' : 'Non renseigné' }}</span>
                          </div>
                        </div>
                        <div class="col-md-4 middle vr">
                          <div class="form-group">
                            <strong>Statut matrimonial :</strong>
                            <span class="ml-2" style="text-transform: capitalize">{{ movment.marital_status || 'Non renseigné' }}</span>
                          </div>
                        </div>
                        <div class="col-md-4 middle">
                          <div class="form-group">
                            <strong>Profession :</strong>
                            <span class="ml-2" style="text-transform: capitalize">{{ movment.profession || 'Non renseigné' }}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </fieldset>

              <!-- Section : Coordonnées et contacts -->
              <fieldset class="form-group border px-3 py-1 mt-3">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Coordonnées et contacts</b></legend>
                <table class="table table-borderless">
                  <tr>
                    <td class="bg-stripped">
                      <div class="row">
                        <div class="col-md-6 middle vr">
                          <div class="form-group">
                            <strong>Téléphone :</strong>
                            <span class="ml-2">{{ movment.phone || 'Non renseigné' }}</span>
                          </div>
                        </div>
                        <div class="col-md-6 middle">
                          <div class="form-group">
                            <strong>Email :</strong>
                            <span class="ml-2">{{ movment.email || 'Non renseigné' }}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="row">
                        <div class="col-md-12 middle">
                          <div class="form-group">
                            <strong>Numéro d'urgence :</strong>
                            <span class="ml-2">{{ movment.emergency_contac || 'Non renseigné' }}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </fieldset>

              <!-- Boutons d'action -->
              <div class="mx-auto text-center mt-4 mb-3">
                <router-link to="/movments/list">
                  <button type="button" class="btn btn-danger btn-medpay-green mr-2">
                    <i class="mdi mdi-arrow-left"></i> Retour à la liste
                  </button>
                </router-link>
                
                <button 
                  v-if="movment.patient_uuid || movment.patients_id" 
                  type="button" 
                  class="btn btn-info btn-medpay-green mr-2"
                  @click="goToDME">
                  <i class="mdi mdi-folder-account"></i> Dossier médical (DME)
                </button>
              </div>
            </div>

            <!-- Message si aucune donnée -->
            <div v-else class="text-center py-5">
              <p class="text-muted">Aucune donnée disponible pour cette venue.</p>
              <router-link to="/movments/list">
                <button type="button" class="btn btn-danger btn-medpay-green mt-3">
                  <i class="mdi mdi-arrow-left"></i> Retour à la liste
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
</section>
</template>

<script>
import Axios from "@/_services/caller.services";
import { POSITION } from "vue-toastification";

export default {
  name: "movment-show",
  props: {
    movment_id: {
      type: [String, Number],
      default: null
    },
    id: {
      type: [String, Number],
      default: null
    }
  },
  data() {
    return {
      movment: {},
      isLoading: true,
      error: null
    };
  },
  mounted() {
    // Récupérer l'ID depuis les props ou la route
    // La route utilise :id mais peut aussi être passé via props comme movment_id
    const id = this.id || this.movment_id || this.$route.params.id || this.$route.params.movment_id;
    
    if (!id) {
      this.error = "Identifiant de venue manquant";
      this.isLoading = false;
      if (this.$toast) {
        this.$toast.error("Identifiant de venue manquant", {
          position: POSITION.TOP_RIGHT,
          timeout: 3000,
        });
      }
      // Rediriger vers la liste après 2 secondes
      setTimeout(() => {
        this.$router.push("/movments/list");
      }, 2000);
      return;
    }
    
    this.movment_id = id;
    this.fetchMovment();
  },
  methods: {
    async fetchMovment() {
      this.isLoading = true;
      this.error = null;
      
      try {
        const res = await Axios.get("/movments/" + this.movment_id);
        
        // Gérer différentes structures de réponse
        console.log("Réponse API mouvement:", res);
        if (res.data) {
          if (res.data.data && res.data.success !== false) {
            // Structure: { success: true, data: {...}, message: '...' }
            this.movment = res.data.data;
            
            // Normaliser les données du patient si elles sont dans un objet séparé
            if (this.movment.patient) {
              this.movment.lastname = this.movment.patient.lastname || this.movment.lastname;
              this.movment.firstname = this.movment.patient.firstname || this.movment.firstname;
              this.movment.age = this.movment.patient.age || this.movment.age;
              this.movment.phone = this.movment.patient.phone || this.movment.phone;
              this.movment.email = this.movment.patient.email || this.movment.email;
              this.movment.gender = this.movment.patient.gender || this.movment.gender;
              this.movment.marital_status = this.movment.patient.marital_status || this.movment.marital_status;
              this.movment.profession = this.movment.patient.profession || this.movment.profession;
              this.movment.patient_uuid = this.movment.patient.uuid || this.movment.patient_uuid;
            }
            
            // Normaliser les données du service
            if (this.movment.service) {
              this.movment.services_name = this.movment.service.name || this.movment.services_name;
            }
            
            console.log("Mouvement normalisé:", this.movment);
          } else if (res.data.success === false) {
            this.error = res.data.message || "Erreur lors du chargement de la venue";
          } else if (Object.keys(res.data).length > 0 && !res.data.data) {
            // Structure directe: { ... }
            this.movment = res.data;
          } else {
            this.error = "Aucune donnée disponible pour cette venue";
          }
        } else {
          this.error = "Aucune donnée disponible pour cette venue";
        }
      } catch (error) {
        console.error("Erreur lors du chargement de la venue:", error);
        
        if (error.response) {
          if (error.response.status === 404) {
            this.error = "Venue non trouvée";
          } else if (error.response.status === 403) {
            this.error = "Vous n'avez pas les permissions nécessaires";
          } else if (error.response.status === 500) {
            this.error = "Erreur serveur. Veuillez contacter l'administrateur.";
          } else {
            this.error = error.response.data && error.response.data.message 
              ? error.response.data.message 
              : "Erreur lors du chargement de la venue";
          }
        } else if (error.request) {
          this.error = "Erreur de connexion. Vérifiez votre connexion internet.";
        } else {
          this.error = "Une erreur inattendue s'est produite";
        }
        
        if (this.$toast) {
          this.$toast.error(this.error, {
            position: POSITION.TOP_RIGHT,
            timeout: 5000,
          });
        }
      } finally {
        this.isLoading = false;
      }
    },
    
    formatDate(dateString) {
      if (!dateString) return 'Non renseigné';
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
    },
    
    goToDME() {
      // Utiliser patient_uuid si disponible, sinon utiliser patients_id
      const patientUuid = this.movment.patient_uuid || this.movment.patients_uuid;
      
      if (patientUuid) {
        this.$router.push({ 
          name: "patients.dme", 
          params: { uuid: patientUuid } 
        });
      } else if (this.movment.patients_id) {
        // Si seulement l'ID est disponible, on peut essayer de récupérer l'UUID
        // ou rediriger vers une page de recherche
        this.$toast.warning("UUID du patient non disponible. Veuillez accéder au DME depuis la liste des patients.", {
          position: POSITION.TOP_RIGHT,
          timeout: 5000,
        });
      }
    }
  }
};
</script>

<style scoped>
@import "../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
@import "../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";

.middle {
  display: flex !important;
  align-items: center !important;
}

.vr {
  border-right: 2px solid rgb(0, 0, 0) !important;
  height: 1.5rem !important;
}

.form-group {
  margin-bottom: 0 !important;
}

.bg-stripped {
  background-color: #0b5d3f1a;
}

.table th, .table td {
  padding: 0.4em 0.6em !important;
}

.btn-medpay-green {
  background-color: #0b5d3f;
  border-color: #0b5d3f;
  color: white;
}

.btn-medpay-green:hover {
  background-color: #094d32;
  border-color: #094d32;
  color: white;
}
</style>

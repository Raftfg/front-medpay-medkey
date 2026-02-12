<template>
  <section class="container-scroller rendezvous-module">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <h3
          class="card-title text-white rounded p-1 mb-3 text-center"
          style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)"
        >
          Planification des Rendez-vous
        </h3>

        <div class="card">
          <div class="card-body">
            <!-- Filtres -->
            <div class="row mb-3">
              <div class="col-12 col-md-4 mb-2">
                <label class="font-weight-bold">Service</label>
                <select v-model.number="filters.service_id" class="form-control" @change="onServiceChange">
                  <option :value="null">Tous les services</option>
                  <option
                    v-for="service in services"
                    :key="service.id || service.uuid"
                    :value="service.id"
                  >
                    {{ service.name }}
                  </option>
                </select>
                <small v-if="filters.service_id" class="form-text text-muted">
                  Médecins filtrés par service
                </small>
                <small v-else class="form-text text-muted">
                  Tous les médecins disponibles
                </small>
              </div>
              <div class="col-12 col-md-4 mb-2">
                <label class="font-weight-bold">Médecin</label>
                <select 
                  v-model="filters.doctor_id" 
                  class="form-control"
                  :disabled="loadingDoctors"
                >
                  <option value="">
                    {{ loadingDoctors ? 'Chargement...' : 'Sélectionner un médecin' }}
                  </option>
                  <option
                    v-for="doctor in filteredDoctors"
                    :key="doctor.id || doctor.uuid"
                    :value="doctor.id"
                  >
                    {{ doctor.name || doctor.lastname }} {{ doctor.prenom || doctor.firstname }}
                  </option>
                </select>
                <div v-if="!loadingDoctors && !doctors.length" class="mt-1">
                  <small class="text-warning d-block mb-1">
                    {{ filters.service_id ? 'Aucun médecin trouvé pour ce service.' : 'Aucun médecin trouvé pour ce centre.' }}
                  </small>
                </div>
                <div v-else-if="!loadingDoctors && doctors.length > 0" class="mt-1">
                  <small class="text-muted d-block mb-1">
                    {{ doctors.length }} médecin(s) disponible(s){{ filters.service_id ? ' pour ce service' : '' }}
                  </small>
                </div>
              </div>
              <div class="col-12 col-md-4 mb-2">
                <label class="font-weight-bold">Date</label>
                <input
                  type="date"
                  v-model="filters.date"
                  class="form-control"
                />
              </div>

              <div class="col-12 d-flex flex-column flex-md-row align-items-stretch align-items-md-end mt-2">
                <button
                  class="btn btn-success mb-2 mb-md-0 mr-md-2 w-100 w-md-auto d-flex justify-content-center align-items-center"
                  :disabled="planningLoading"
                  @click="loadPlanning"
                >
                  <span v-if="planningLoading" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                  <span>{{ planningLoading ? "Chargement..." : "Charger le planning" }}</span>
                </button>
                <button
                  class="btn btn-outline-secondary w-100 w-md-auto d-flex justify-content-center align-items-center"
                  :disabled="slotsLoading"
                  @click="loadSlots"
                >
                  <span v-if="slotsLoading" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                  <span>{{ slotsLoading ? "Chargement..." : "Voir les créneaux" }}</span>
                </button>
              </div>
            </div>

            <!-- Créneaux disponibles -->
            <div class="row" v-if="slots.length && filters.doctor_id">
              <div class="col-12">
                <h5 class="font-weight-bold mb-2">Créneaux disponibles</h5>
                <div class="slots-grid">
                  <button
                    v-for="slot in slots"
                    :key="slot.start"
                    class="btn btn-sm slot-button"
                    :class="slot.available ? 'btn-outline-success' : 'btn-outline-secondary'"
                    :disabled="!slot.available || booking.loading"
                    @click="openBooking(slot)"
                  >
                    {{ formatTime(slot.start) }} - {{ formatTime(slot.end) }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Planning du médecin -->
            <div class="row mt-4" v-if="planning.appointments.length">
              <div class="col-12">
                <h5 class="font-weight-bold mb-2">
                  Planning du médecin ({{ filters.date }})
                </h5>

                <div class="mb-2 d-flex flex-wrap">
                  <button
                    class="btn btn-outline-info btn-sm mr-2 mb-2"
                    :disabled="planningLoading || !planning.appointments.length"
                    @click="sendRemindersForDay"
                  >
                    Envoyer les rappels pour cette journée
                  </button>
                  <button
                    class="btn btn-outline-primary btn-sm mb-2"
                    :disabled="planningLoading || !filters.doctor_id"
                    @click="loadOptimizationSuggestions"
                  >
                    Voir les suggestions IA
                  </button>
                </div>

                <div class="table-responsive">
                  <table class="table table-sm table-striped">
                    <thead>
                      <tr>
                        <th>Heure</th>
                        <th>Patient</th>
                        <th>Service</th>
                        <th>Type</th>
                        <th>Statut</th>
                        <th class="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="appt in planning.appointments" :key="appt.id">
                        <td>{{ formatDateTime(appt.scheduled_at) }}</td>
                        <td>
                          <span v-if="appt.patient">
                            {{ appt.patient.lastname }} {{ appt.patient.firstname }}
                          </span>
                          <span v-else class="text-muted">Non renseigné</span>
                        </td>
                        <td>
                          <span v-if="appt.service">
                            {{ appt.service.name }}
                          </span>
                        </td>
                        <td>{{ appt.type }}</td>
                        <td>{{ appt.status }}</td>
                        <td class="text-right">
                          <button
                            v-if="appt.status !== 'cancelled'"
                            class="btn btn-xs btn-outline-danger"
                            @click="cancel(appt)"
                          >
                            Annuler
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Notifications in-app -->
            <div class="row mt-2" v-if="notifications.length">
              <div class="col-12">
                <div class="alert alert-secondary">
                  <h6 class="mb-2 font-weight-bold">Notifications</h6>
                  <ul class="mb-0">
                    <li v-for="(n, idx) in notifications" :key="idx">
                      <strong v-if="n.title">{{ n.title }}: </strong>{{ n.message }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Modal de prise de rendez-vous rapide -->
            <div
              class="modal fade"
              id="bookingModal"
              tabindex="-1"
              role="dialog"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">Prendre un rendez-vous</h5>
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
                    <div class="form-group">
              <label>Patient</label>
              <!-- Barre de recherche -->
              <input
                v-model="patientSearch"
                @input="onPatientSearch"
                type="text"
                class="form-control mb-2"
                placeholder="Rechercher un patient (nom, prénom, IPP)"
              />
              <!-- Sélecteur de patients existants -->
              <select
                v-model="booking.patient_id"
                class="form-control mb-2"
              >
                <option value="">Nouveau patient (saisie manuelle)</option>
                <option
                  v-for="patient in filteredPatients"
                  :key="patient.uuid || patient.id"
                  :value="patient.id"
                >
                  {{ patient.lastname }} {{ patient.firstname }} -
                  {{ patient.ipp || patient.uuid }}
                </option>
              </select>
              <!-- Champ libre pour saisie si le patient n'existe pas -->
              <input
                v-if="!booking.patient_id"
                v-model="booking.patient_free_text"
                type="text"
                class="form-control"
                placeholder="Nom et prénom du patient (si non enregistré)"
              />
                    </div>
                    <div class="form-group">
                      <label>Type de consultation</label>
                      <select v-model="booking.type" class="form-control">
                        <option value="consultation">Consultation</option>
                        <option value="controle">Contrôle</option>
                        <option value="teleconsultation">Téléconsultation</option>
                        <option value="urgence">Urgence</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label>Notes</label>
                      <textarea
                        v-model="booking.notes"
                        rows="3"
                        class="form-control"
                        placeholder="Motif, détails..."
                      ></textarea>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Fermer
                    </button>
                    <button
                      type="button"
                      class="btn btn-success"
                      :disabled="booking.loading"
                      @click="confirmBooking"
                    >
                      Confirmer le rendez-vous
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from "jquery";
import "../../../node_modules/bootstrap/dist/js/bootstrap.js"; // nécessaire pour les modals
import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js"; // nécessaire pour les modals
import { POSITION } from "vue-toastification";
import { appointmentService } from "@/_services/appointment_services";
import { userService } from "@/_services/user_service";
import { serviceService } from "@/_services/servicess_services";
import { patientService } from "@/_services";

export default {
  name: "rendezvous-index",
  data() {
    const today = new Date().toISOString().substring(0, 10);
    return {
      filters: {
        doctor_id: "",
        service_id: "",
        date: today,
      },
      doctors: [],
      services: [],
      patients: [],
      patientSearch: "",
      slots: [],
      planning: {
        date: today,
        appointments: [],
      },
      optimization: {
        optimal_slot_duration: null,
        peak_periods: {},
      },
      booking: {
        slot: null,
        patient_id: "",
        patient_free_text: "",
        type: "consultation",
        notes: "",
        loading: false,
      },
      planningLoading: false,
      slotsLoading: false,
      loadingDoctors: false,
      notifications: [],
    };
  },
  watch: {
    "filters.service_id": {
      immediate: false,
      async handler(newVal) {
        await this.loadDoctorsByService(newVal);
      },
    },
  },
  mounted() {
    this.loadDoctorsAndServices();
    this.loadPatients();
  },
  computed: {
    filteredPatients() {
      if (!this.patientSearch) {
        return this.patients;
      }
      const term = this.patientSearch.toLowerCase();
      return this.patients.filter((p) => {
        const lastname = (p.lastname || "").toLowerCase();
        const firstname = (p.firstname || "").toLowerCase();
        const ipp = (p.ipp ? String(p.ipp) : "").toLowerCase();
        const uuid = (p.uuid || "").toLowerCase();
        return (
          lastname.includes(term) ||
          firstname.includes(term) ||
          ipp.includes(term) ||
          uuid.includes(term)
        );
      });
    },
    filteredDoctors() {
      // Les médecins sont déjà filtrés par service via loadDoctorsByService
      // Retourner simplement la liste des médecins chargés pour le service sélectionné
      console.log("[RDV] filteredDoctors appelé - Nombre de médecins:", this.doctors.length);
      if (this.doctors.length > 0) {
        console.log("[RDV] filteredDoctors - Exemple:", this.doctors[0]);
      }
      return this.doctors;
    },
  },
  methods: {
    ensureDoctorSelected() {
      if (this.doctors.length && !this.filters.doctor_id) {
        const first = this.doctors[0];
        this.filters.doctor_id = first.id;
      }
    },
    pushNotification(notification) {
      this.notifications.unshift({
        title: notification.title || "",
        message: notification.message || "",
      });
      if (this.notifications.length > 5) {
        this.notifications.pop();
      }
    },
    async loadPatients(term = "") {
      try {
        // Si pas de terme, charger une première page de patients
        if (!term) {
          const res = await patientService.getAllPatients({ params: { per_page: 50 } });
          if (res.data && res.data.data && Array.isArray(res.data.data)) {
            this.patients = res.data.data;
          } else if (Array.isArray(res.data)) {
            this.patients = res.data;
          } else {
            this.patients = [];
          }
        } else {
          // Recherche dynamique côté backend
          const res = await patientService.getSearchPatients(term, { params: { per_page: 50 } });
          if (res.data && res.data.data && Array.isArray(res.data.data)) {
            this.patients = res.data.data;
          } else if (Array.isArray(res.data)) {
            this.patients = res.data;
          } else {
            this.patients = [];
          }
        }
      } catch (e) {
        console.error("[RDV] Erreur chargement patients:", e?.response?.data || e);
        this.patients = [];
      }
    },
    onPatientSearch() {
      const term = this.patientSearch.trim();
      if (term.length >= 2) {
        this.loadPatients(term);
      } else {
        this.loadPatients("");
      }
    },
    onServiceChange() {
      // Cette méthode est appelée lors du changement de service dans le select
      // Le watcher se chargera du chargement des médecins
      this.filters.doctor_id = "";
    },
    async loadDoctorsByService(serviceId) {
      try {
        this.loadingDoctors = true;
        
        // Réinitialiser le médecin sélectionné
        this.filters.doctor_id = "";

        // Aucun service sélectionné : charger tous les médecins
        if (!serviceId) {
          console.log("[RDV] Chargement de tous les médecins (service: Tous)");
          try {
            const doctorsRes = await userService.getDoctors();
            console.log("[RDV] Réponse brute des médecins (tous):", doctorsRes);
            console.log("[RDV] Structure réponse médecins:", {
              hasData: !!(doctorsRes && doctorsRes.data),
              dataKeys: doctorsRes?.data ? Object.keys(doctorsRes.data) : [],
              dataDataType: doctorsRes?.data?.data ? (Array.isArray(doctorsRes.data.data) ? 'array' : typeof doctorsRes.data.data) : 'undefined'
            });
            
            if (doctorsRes && doctorsRes.data) {
              const inner = doctorsRes.data.data;
              console.log("[RDV] inner (doctorsRes.data.data):", inner, "Type:", Array.isArray(inner) ? 'array' : typeof inner);
              
              if (Array.isArray(inner)) {
                // Cas 1: data.data est directement un tableau (structure attendue)
                this.doctors = inner;
                console.log("[RDV] ✅ Médecins extraits depuis data.data (array):", this.doctors.length);
              } else if (inner && Array.isArray(inner.data)) {
                // Cas 2: data.data.data est un tableau
                this.doctors = inner.data;
                console.log("[RDV] ✅ Médecins extraits depuis data.data.data:", this.doctors.length);
              } else if (Array.isArray(doctorsRes.data)) {
                // Cas 3: data est directement un tableau
                this.doctors = doctorsRes.data;
                console.log("[RDV] ✅ Médecins extraits depuis data (array direct):", this.doctors.length);
              } else {
                this.doctors = [];
                console.warn("[RDV] ⚠️ Structure de données inattendue pour les médecins:", {
                  doctorsRes: doctorsRes,
                  doctorsResData: doctorsRes.data,
                  inner: inner
                });
              }
            } else {
              this.doctors = [];
              console.warn("[RDV] ⚠️ Aucune donnée dans la réponse des médecins");
            }
            
            console.log("[RDV] ✅ Tous les médecins chargés:", this.doctors.length);
            if (this.doctors.length > 0) {
              console.log("[RDV] Exemple de médecin:", this.doctors[0]);
            }
            this.ensureDoctorSelected();
          } catch (err) {
            console.error("[RDV] Erreur chargement tous les médecins:", err);
            this.doctors = [];
          } finally {
            this.loadingDoctors = false;
          }
          return;
        }

        // Service sélectionné : charger les médecins ayant des disponibilités pour ce service
        const numericServiceId = !isNaN(Number(serviceId)) ? Number(serviceId) : null;
        if (!numericServiceId) {
          console.warn("[RDV] Service ID invalide:", serviceId);
          this.doctors = [];
          this.loadingDoctors = false;
          return;
        }

        console.log("[RDV] Chargement des médecins pour le service ID:", numericServiceId);
        console.log("[RDV] Paramètres à envoyer:", { service_id: numericServiceId });

        try {
          const doctorsRes = await appointmentService.getDoctorsByService({
            service_id: numericServiceId,
          });
          
          console.log("[RDV] Requête API effectuée avec service_id:", numericServiceId);
          
          console.log("[RDV] Réponse brute des médecins par service:", doctorsRes);
          console.log("[RDV] Structure complète de la réponse:", JSON.stringify(doctorsRes, null, 2));
          console.log("[RDV] Analyse de la structure:", {
            hasResponse: !!doctorsRes,
            hasData: !!(doctorsRes && doctorsRes.data),
            responseKeys: doctorsRes ? Object.keys(doctorsRes) : [],
            dataKeys: doctorsRes?.data ? Object.keys(doctorsRes.data) : [],
            dataDataType: doctorsRes?.data?.data ? (Array.isArray(doctorsRes.data.data) ? 'array' : typeof doctorsRes.data.data) : 'undefined',
            dataDataValue: doctorsRes?.data?.data
          });
          
          // Extraire les médecins de la réponse (même logique que dans Admission.vue et Transfer.vue)
          let extractedDoctors = [];
          
          if (doctorsRes && doctorsRes.data) {
            const inner = doctorsRes.data.data;
            console.log("[RDV] inner (doctorsRes.data.data):", inner, "Type:", Array.isArray(inner) ? 'array' : typeof inner);
            
            if (Array.isArray(inner)) {
              // Cas où data.data est directement un tableau (structure attendue)
              extractedDoctors = inner;
              console.log("[RDV] ✅ Médecins extraits depuis data.data (array direct):", extractedDoctors.length);
            } else if (inner && Array.isArray(inner.data)) {
              // Cas normal: { data: { data: [ ... ], message: ... } }
              extractedDoctors = inner.data;
              console.log("[RDV] ✅ Médecins extraits depuis data.data.data:", extractedDoctors.length);
            } else if (Array.isArray(doctorsRes.data)) {
              extractedDoctors = doctorsRes.data;
              console.log("[RDV] ✅ Médecins extraits depuis data (array):", extractedDoctors.length);
            } else if (inner && typeof inner === 'object' && inner !== null) {
              // Essayer de trouver un tableau dans l'objet
              console.log("[RDV] inner est un objet, recherche d'un tableau...");
              for (const key in inner) {
                console.log(`[RDV] Clé "${key}":`, inner[key], "Type:", Array.isArray(inner[key]) ? 'array' : typeof inner[key]);
                if (Array.isArray(inner[key])) {
                  extractedDoctors = inner[key];
                  console.log(`[RDV] ✅ Médecins extraits depuis data.data.${key}:`, extractedDoctors.length);
                  break;
                }
              }
            } else {
              console.warn("[RDV] ⚠️ Structure de données inattendue pour les médecins:", {
                doctorsRes: doctorsRes,
                doctorsResData: doctorsRes.data,
                inner: inner,
                innerType: typeof inner
              });
            }
          } else {
            console.warn("[RDV] ⚠️ Aucune donnée dans la réponse des médecins");
          }
          
          console.log("[RDV] Médecins extraits (avant fallback):", extractedDoctors.length);
          
          // Si aucun médecin n'est trouvé, essayer le fallback
          if (extractedDoctors.length === 0) {
            console.warn("[RDV] ⚠️  Aucun médecin trouvé pour le service ID:", numericServiceId, "- Tentative de fallback");
            // Fallback: charger tous les médecins et filtrer côté client (si possible)
            try {
              const allDoctorsRes = await userService.getDoctors();
              console.log("[RDV] 📥 Réponse fallback (tous les médecins):", allDoctorsRes);
              
              if (allDoctorsRes.data) {
                const inner = allDoctorsRes.data.data;
                let allDoctors = [];
                if (Array.isArray(inner)) {
                  allDoctors = inner;
                } else if (inner && Array.isArray(inner.data)) {
                  allDoctors = inner.data;
                } else if (Array.isArray(allDoctorsRes.data)) {
                  allDoctors = allDoctorsRes.data;
                }
                
                // Utiliser tous les médecins comme fallback
                this.doctors = allDoctors;
                console.log("[RDV] ✅ Fallback: Utilisation de tous les médecins (", this.doctors.length, ")");
                this.$toast.info(
                  `Aucun médecin spécifique trouvé pour ce service. Affichage de tous les médecins disponibles.`,
                  {
                    position: POSITION.TOP_RIGHT,
                    timeout: 4000,
                  }
                );
              } else {
                this.doctors = [];
              }
            } catch (fallbackErr) {
              console.error("[RDV] ❌ Erreur chargement médecins (fallback):", fallbackErr);
              this.doctors = [];
            }
          } else {
            this.doctors = extractedDoctors;
            console.log("[RDV] ✅ Médecins assignés à this.doctors:", this.doctors.length);
            console.log("[RDV] ✅ Médecins pour le service:", numericServiceId, "- Nombre:", this.doctors.length);
            if (this.doctors.length > 0) {
              console.log("[RDV] ✅ Exemple de médecin:", {
                id: this.doctors[0].id,
                name: this.doctors[0].name,
                prenom: this.doctors[0].prenom
              });
              console.log("[RDV] ✅ Liste complète des médecins:", this.doctors);
            } else {
              console.warn("[RDV] ⚠️ Aucun médecin dans extractedDoctors, this.doctors est vide");
            }
          }
          
          // Vérifier que this.doctors est bien mis à jour
          console.log("[RDV] État final de this.doctors:", this.doctors.length, "médecin(s)");
          
          // Forcer la mise à jour de Vue pour garantir la réactivité
          this.$nextTick(() => {
            console.log("[RDV] Après $nextTick - this.doctors:", this.doctors.length);
            console.log("[RDV] filteredDoctors devrait contenir:", this.doctors.length, "médecin(s)");
          });
          
          // Pré-sélectionner le premier médecin si disponible
          this.ensureDoctorSelected();
        } catch (doctorsError) {
          console.error("[RDV] ❌ Erreur lors du chargement des médecins par service:", doctorsError);
          console.error("[RDV] Détails complets de l'erreur:", {
            message: doctorsError.message,
            response: doctorsError.response,
            responseData: doctorsError.response?.data,
            responseStatus: doctorsError.response?.status,
            config: doctorsError.config,
            configUrl: doctorsError.config?.url,
            configParams: doctorsError.config?.params
          });
          
          // Si l'API retourne une réponse (même avec une erreur), vérifier si elle contient des données
          if (doctorsError.response && doctorsError.response.data) {
            console.log("[RDV] L'API a retourné une réponse (même avec erreur):", doctorsError.response.data);
            // Essayer d'extraire les médecins de la réponse d'erreur si possible
            const errorData = doctorsError.response.data;
            if (errorData.data && Array.isArray(errorData.data)) {
              this.doctors = errorData.data;
              console.log("[RDV] ✅ Médecins extraits depuis la réponse d'erreur:", this.doctors.length);
              this.ensureDoctorSelected();
              this.loadingDoctors = false;
              return;
            }
          }
          
          // Fallback: charger tous les médecins si l'endpoint spécifique n'existe pas (404)
          if (doctorsError.response && doctorsError.response.status === 404) {
            console.warn("[RDV] ⚠️ Endpoint /appointments/doctors-by-service non trouvé, chargement de tous les médecins");
            try {
              const doctorsRes = await userService.getDoctors();
              console.log("[RDV] 📥 Réponse fallback médecins:", doctorsRes);
              
              if (doctorsRes.data) {
                const inner = doctorsRes.data.data;
                if (Array.isArray(inner)) {
                  this.doctors = inner;
                } else if (inner && Array.isArray(inner.data)) {
                  this.doctors = inner.data;
                } else if (Array.isArray(doctorsRes.data)) {
                  this.doctors = doctorsRes.data;
                } else {
                  this.doctors = [];
                }
              } else {
                this.doctors = [];
              }
              
              this.ensureDoctorSelected();
            } catch (fallbackErr) {
              console.error("[RDV] ❌ Erreur chargement médecins (fallback):", fallbackErr);
              this.doctors = [];
            }
          } else {
            this.doctors = [];
            this.$toast.error(
              "Erreur lors du chargement des médecins pour ce service.",
              {
                position: POSITION.TOP_RIGHT,
              }
            );
          }
        }
      } catch (e) {
        console.error("[RDV] Erreur générale chargement médecins par service:", e?.response?.data || e);
        this.doctors = [];
        this.$toast.error(
          "Erreur lors du chargement des médecins pour ce service.",
          {
            position: POSITION.TOP_RIGHT,
          }
        );
      } finally {
        this.loadingDoctors = false;
      }
    },
    async loadDoctorsAndServices() {
      try {
        // Charger les services et tous les médecins en parallèle au départ
        // (puisque par défaut le service est vide = "Tous")
        console.log("[RDV] Début du chargement des services et médecins...");
        
        const [servicesRes, doctorsRes] = await Promise.all([
          serviceService.getAllServices().catch((err) => {
            console.error("[RDV] ❌ Erreur chargement services:", err);
            console.error("[RDV] Détails de l'erreur:", {
              message: err.message,
              response: err.response?.data,
              status: err.response?.status,
              url: err.config?.url
            });
            this.$toast.error("Erreur lors du chargement des services. Veuillez réessayer.", {
              position: POSITION.TOP_RIGHT,
              timeout: 5000,
            });
            return { data: { data: [] } };
          }),
          userService.getDoctors().catch((err) => {
            console.error("[RDV] ❌ Erreur chargement médecins:", err);
            console.error("[RDV] Détails de l'erreur:", {
              message: err.message,
              response: err.response?.data,
              status: err.response?.status,
              url: err.config?.url
            });
            return { data: { data: [] } };
          }),
        ]);
        
        console.log("[RDV] Réponses reçues:", {
          services: servicesRes,
          doctors: doctorsRes
        });

        // Extraire les services - gérer toutes les structures possibles (même logique que Admission.vue)
        let servicesData = [];
        
        console.log("[RDV] Analyse de la réponse services:", {
          hasResponse: !!servicesRes,
          hasData: !!(servicesRes && servicesRes.data),
          responseStructure: servicesRes ? Object.keys(servicesRes) : [],
          dataStructure: servicesRes?.data ? Object.keys(servicesRes.data) : []
        });
        
        if (servicesRes && servicesRes.data) {
          // Cas 1: data est directement un tableau
          if (Array.isArray(servicesRes.data)) {
            servicesData = servicesRes.data;
          } 
          // Cas 2: data.data est un tableau
          else if (servicesRes.data.data) {
            if (Array.isArray(servicesRes.data.data)) {
              servicesData = servicesRes.data.data;
            } 
            // Cas 3: data.data.data est un tableau (structure imbriquée)
            else if (servicesRes.data.data.data && Array.isArray(servicesRes.data.data.data)) {
              servicesData = servicesRes.data.data.data;
            }
            // Cas 4: data.data est un objet avec une propriété qui contient le tableau
            else if (typeof servicesRes.data.data === 'object') {
              // Chercher la première propriété qui est un tableau
              for (const key in servicesRes.data.data) {
                if (Array.isArray(servicesRes.data.data[key])) {
                  servicesData = servicesRes.data.data[key];
                  break;
                }
              }
            }
          }
        }
        
        // Normaliser les services - s'assurer qu'ils ont tous un ID numérique
        if (servicesData.length > 0) {
          this.services = servicesData
            .map((service, index) => {
              // Essayer de convertir l'id en nombre si possible
              let serviceId = null;
              
              if (service.id !== undefined && service.id !== null) {
                const numId = Number(service.id);
                serviceId = !isNaN(numId) && numId > 0 ? numId : service.id;
              }
              
              return {
                ...service,
                id: serviceId || service.id || (index + 1) // Garder l'id original ou utiliser l'index
              };
            })
            .filter(service => {
              // Accepter tous les services qui ont au moins un nom et un ID valide
              const hasName = service.name && service.name.trim() !== '';
              const hasId = service.id && (typeof service.id === 'number' || !isNaN(Number(service.id)));
              if (!hasName || !hasId) {
                console.warn("[RDV] Service filtré:", { name: service.name, id: service.id });
                return false;
              }
              return true;
            });
        } else {
          this.services = [];
          console.warn("[RDV] ⚠️ Aucun service trouvé dans la réponse");
          if (servicesRes) {
            console.warn("[RDV] Structure de la réponse services:", JSON.stringify(servicesRes, null, 2));
          }
        }
        
        console.log("[RDV] Services normalisés:", this.services.length);
        
        // Afficher un message si aucun service n'est disponible
        if (this.services.length === 0) {
          console.error("[RDV] ❌ Aucun service disponible!");
          this.$toast.warning("Aucun service disponible. Veuillez vérifier la configuration.", {
            position: POSITION.TOP_RIGHT,
            timeout: 5000,
          });
        }

        // Extraire les médecins (structure: { data: { data: [ ... ], message } })
        console.log("[RDV] Analyse de la réponse médecins:", {
          hasResponse: !!doctorsRes,
          hasData: !!(doctorsRes && doctorsRes.data),
          responseStructure: doctorsRes ? Object.keys(doctorsRes) : [],
          dataStructure: doctorsRes?.data ? Object.keys(doctorsRes.data) : [],
          dataDataType: doctorsRes?.data?.data ? (Array.isArray(doctorsRes.data.data) ? 'array' : typeof doctorsRes.data.data) : 'undefined'
        });
        
        if (doctorsRes && doctorsRes.data) {
          const inner = doctorsRes.data.data;
          console.log("[RDV] inner (doctorsRes.data.data):", inner, "Type:", Array.isArray(inner) ? 'array' : typeof inner);
          
          if (Array.isArray(inner)) {
            // Cas 1: data.data est directement un tableau (structure attendue)
            this.doctors = inner;
            console.log("[RDV] ✅ Médecins extraits depuis data.data (array):", this.doctors.length);
          } else if (inner && Array.isArray(inner.data)) {
            // Cas 2: data.data.data est un tableau
            this.doctors = inner.data;
            console.log("[RDV] ✅ Médecins extraits depuis data.data.data:", this.doctors.length);
          } else if (Array.isArray(doctorsRes.data)) {
            // Cas 3: data est directement un tableau
            this.doctors = doctorsRes.data;
            console.log("[RDV] ✅ Médecins extraits depuis data (array direct):", this.doctors.length);
          } else {
            this.doctors = [];
            console.warn("[RDV] ⚠️ Structure de données inattendue pour les médecins:", {
              doctorsRes: doctorsRes,
              doctorsResData: doctorsRes.data,
              inner: inner
            });
          }
        } else {
          this.doctors = [];
          console.warn("[RDV] ⚠️ Aucune donnée dans la réponse des médecins");
        }
        
        console.log("[RDV] Médecins finaux chargés:", this.doctors.length);
        if (this.doctors.length > 0) {
          console.log("[RDV] Exemple de médecin:", this.doctors[0]);
        }
        
        // OPTIONNEL: Vérifier les services qui ont des médecins (en arrière-plan, sans bloquer)
        // On garde tous les services dans la liste, mais on peut marquer ceux qui ont des médecins
        // Les médecins seront chargés dynamiquement lors de la sélection d'un service
        if (this.services.length > 0) {
          console.log("[RDV] Services chargés:", this.services.length);
          console.log("[RDV] Les médecins seront chargés dynamiquement lors de la sélection d'un service");
          
          // Vérification optionnelle en arrière-plan (non bloquante)
          // On garde tous les services, même ceux sans médecins, pour permettre à l'utilisateur de voir tous les services
          this.services.forEach(async (service) => {
            const serviceId = Number(service.id);
            if (!isNaN(serviceId) && serviceId > 0) {
              try {
                const doctorsRes = await appointmentService.getDoctorsByService({
                  service_id: serviceId,
                }).catch(() => null);
                
                if (doctorsRes && doctorsRes.data) {
                  const inner = doctorsRes.data.data;
                  let doctors = [];
                  
                  if (Array.isArray(inner)) {
                    doctors = inner;
                  } else if (inner && Array.isArray(inner.data)) {
                    doctors = inner.data;
                  } else if (Array.isArray(doctorsRes.data)) {
                    doctors = doctorsRes.data;
                  }
                  
                  if (doctors.length > 0) {
                    console.log(`[RDV] ✅ Service "${service.name}" (ID: ${serviceId}) a ${doctors.length} médecin(s)`);
                  } else {
                    console.log(`[RDV] ⚠️ Service "${service.name}" (ID: ${serviceId}) n'a aucun médecin`);
                  }
                }
              } catch (err) {
                // Erreur silencieuse - on garde le service quand même
                console.warn(`[RDV] Erreur vérification service "${service.name}":`, err);
              }
            }
          });
        }
        
        console.log("[RDV] Services chargés (avec médecins):", this.services.length);
        console.log("[RDV] Médecins chargés (tous):", this.doctors.length);
        
        // Pré-sélectionner le premier médecin si disponible
        this.ensureDoctorSelected();
      } catch (e) {
        console.error("[RDV] ❌ Erreur générale chargement services/médecins:", e);
        console.error("[RDV] Détails de l'erreur:", {
          message: e.message,
          response: e.response?.data,
          status: e.response?.status,
          stack: e.stack
        });
        this.services = [];
        this.doctors = [];
        this.$toast.error("Erreur lors du chargement des données. Veuillez rafraîchir la page.", {
          position: POSITION.TOP_RIGHT,
          timeout: 5000,
        });
      }
    },
    async loadSlots() {
      try {
        this.slotsLoading = true;
        // Auto-sélectionner un médecin si la liste est chargée mais le filtre est vide
        if (!this.filters.doctor_id && this.doctors.length) {
          const first = this.doctors[0];
          this.filters.doctor_id = first.id;
        }

        if (!this.filters.doctor_id) {
          this.$toast.error("Aucun médecin disponible pour ce centre.", {
            position: POSITION.TOP_RIGHT,
          });
          return;
        }

        if (!this.filters.date) {
          this.$toast.error("Sélectionnez une date.", {
            position: POSITION.TOP_RIGHT,
          });
          return;
        }

        // Normaliser le service_id : n'envoyer un entier que si la valeur est numérique
        const serviceIdParam =
          this.filters.service_id && !isNaN(Number(this.filters.service_id))
            ? Number(this.filters.service_id)
            : "";

        console.log("[RDV] loadSlots - params", {
          doctor_id: this.filters.doctor_id,
          service_id: serviceIdParam,
          date: this.filters.date,
        });

        const { data } = await appointmentService.getAvailableSlots({
          doctor_id: this.filters.doctor_id,
          service_id: serviceIdParam,
          date: this.filters.date,
        });
        console.log("[RDV] loadSlots - raw response", data);

        // Structure attendue: { data: { message, data: [slots] } }
        const slotsPayload =
          (data &&
            data.data &&
            (Array.isArray(data.data.data) ? data.data.data : data.data)) || [];

        this.slots = Array.isArray(slotsPayload) ? slotsPayload : [];
        console.log("[RDV] loadSlots - slots parsed", this.slots);
      } catch (e) {
        console.error("[RDV] Erreur loadSlots:", e?.response?.data || e);
        this.$toast.error("Erreur lors du chargement des créneaux.", {
          position: POSITION.TOP_RIGHT,
        });
      } finally {
        this.slotsLoading = false;
      }
    },
    async loadPlanning() {
      try {
        this.planningLoading = true;
        // Si aucun doctor_id dans le filtre mais qu'on a des médecins,
        // tenter de corriger automatiquement en prenant le premier
        if (!this.filters.doctor_id && this.doctors.length) {
          const first = this.doctors[0];
          this.filters.doctor_id = first.id;
        }

        // Si toujours rien, alors il n'y a réellement aucun médecin disponible
        if (!this.filters.doctor_id) {
          this.$toast.error("Aucun médecin disponible pour ce centre.", {
            position: POSITION.TOP_RIGHT,
          });
          return;
        }

        const selected = this.doctors.find(
          (d) => d.id === this.filters.doctor_id
        );
        console.log("[RDV] loadPlanning - params", {
          doctor_id: this.filters.doctor_id,
          date: this.filters.date,
        });
        console.log("[RDV] loadPlanning - selected doctor object", selected);

        const { data } = await appointmentService.getDoctorPlanning({
          doctor_id: this.filters.doctor_id,
          date: this.filters.date,
        });
        console.log("[RDV] loadPlanning - raw response", data);

        // Structure attendue côté backend :
        // { data: { message: "...", data: { date: ..., appointments: [...] } } }
        const planningPayload =
          (data &&
            data.data &&
            (data.data.data || data.data)) || {
            date: this.filters.date,
            appointments: [],
          };

        this.planning = planningPayload;
        console.log("[RDV] loadPlanning - planning parsed", this.planning);

        this.pushNotification({
          title: "Planning",
          message: "Planning chargé pour le " + this.filters.date,
        });
      } catch (e) {
        console.error("[RDV] Erreur loadPlanning:", e?.response?.data || e);
        this.$toast.error("Erreur lors du chargement du planning.", {
          position: POSITION.TOP_RIGHT,
        });
      } finally {
        this.planningLoading = false;
      }
    },
    openBooking(slot) {
      this.booking.slot = slot;
      this.booking.patient_id = "";
      this.booking.patient_free_text = "";
      this.patientSearch = "";
      this.booking.type = "consultation";
      this.booking.notes = "";
      $("#bookingModal").modal("show");
    },
    async confirmBooking() {
      if (!this.booking.slot || !this.filters.doctor_id) {
        return;
      }

      this.booking.loading = true;

      try {
        let patientId = this.booking.patient_id;

        // Si aucun patient sélectionné mais un nom libre est saisi,
        // créer rapidement un patient minimal avant le rendez-vous
        if (!patientId && this.booking.patient_free_text) {
          const parts = this.booking.patient_free_text.trim().split(/\s+/);
          const lastname = parts[0] || "Inconnu";
          const firstname = parts.slice(1).join(" ");

          const newPatientPayload = {
            // Champs minimums requis par le backend (PatienteStoreRequest)
            lastname,
            firstname: firstname || "Inconnu",
            date_birth: "2000-01-01",
            // Le contrôleur attend aussi une clé "age" même si elle est nullable
            age: null,
            phone: "00000000",
            emergency_contac: "00000000",
            gender: "Autre",
            // Champs additionnels facultatifs
            maison: "",
            email: null,
            whatsapp: null,
            profession: null,
          };

          try {
            const res = await patientService.addPatients(newPatientPayload);
            const created =
              res.data && res.data.data ? res.data.data : res.data;
            if (created && created.id) {
              patientId = created.id;
              // Ajouter le patient créé dans la liste locale pour les prochaines recherches
              this.patients.unshift(created);
            }
          } catch (e) {
            console.error(
              "[RDV] Erreur lors de la création rapide du patient:",
              e?.response?.data || e
            );
            const resp = e.response;
            // Gestion spécifique du cas doublons (409) : réutiliser le premier patient existant
            if (resp && resp.status === 409 && resp.data && resp.data.duplicates) {
              let duplicates = resp.data.duplicates;
              if (duplicates && duplicates.data && Array.isArray(duplicates.data)) {
                duplicates = duplicates.data;
              }
              if (Array.isArray(duplicates) && duplicates.length) {
                const dup = duplicates[0];
                if (dup && dup.id) {
                  patientId = dup.id;
                  this.patients.unshift(dup);
                }
              }
            } else {
              this.$toast.error(
                "Impossible de créer le patient. Veuillez vérifier les informations.",
                {
                  position: POSITION.TOP_RIGHT,
                }
              );
              // On arrête ici pour éviter de créer un rendez-vous sans patient lié
              this.booking.loading = false;
              return;
            }
          }
        }

        // Normaliser le service_id pour l'enregistrement du rendez-vous
        const numericServiceId =
          this.filters.service_id && !isNaN(Number(this.filters.service_id))
            ? Number(this.filters.service_id)
            : null;

        const payload = {
          doctor_id: this.filters.doctor_id,
          service_id: numericServiceId,
          scheduled_at: this.booking.slot.start,
          type: this.booking.type,
          notes: this.booking.notes,
          source: "on_site",
        };

        if (patientId) {
          payload.patient_id = patientId;
        }

        const { data } = await appointmentService.createAppointment(payload);

        this.$toast.success(data.message || "Rendez-vous créé avec succès.", {
          position: POSITION.TOP_RIGHT,
        });
        this.pushNotification({
          title: "Rendez-vous",
          message: "Rendez-vous créé avec succès.",
        });

        $("#bookingModal").modal("hide");
        this.booking.loading = false;

        // Rafraîchir planning & slots
        this.loadPlanning();
        this.loadSlots();
      } catch (e) {
        console.error(e);
        this.booking.loading = false;

        const message =
          (e.response && e.response.data && e.response.data.message) ||
          "Erreur lors de la création du rendez-vous.";
        this.$toast.error(message, {
          position: POSITION.TOP_RIGHT,
        });
      }
    },
    async cancel(appt) {
      try {
        await appointmentService.cancelAppointment(appt.id, "Annulation manuelle");
        this.$toast.success("Rendez-vous annulé.", {
          position: POSITION.TOP_RIGHT,
        });
        this.loadPlanning();
        this.loadSlots();
        this.pushNotification({
          title: "Rendez-vous",
          message: "Rendez-vous annulé.",
        });
      } catch (e) {
        console.error(e);
        this.$toast.error("Erreur lors de l'annulation.", {
          position: POSITION.TOP_RIGHT,
        });
      }
    },
    async sendRemindersForDay() {
      try {
        if (!this.planning.appointments.length) {
          return;
        }
        let success = 0;
        let failed = 0;
        for (const appt of this.planning.appointments) {
          try {
            await appointmentService.sendReminders(appt.id);
            success++;
          } catch (e) {
            console.error("[RDV] Erreur envoi rappel:", e?.response?.data || e);
            failed++;
          }
        }
        const msg =
          "Rappels envoyés: " +
          success +
          (failed ? " | Échecs: " + failed : "");
        this.$toast.success(msg, {
          position: POSITION.TOP_RIGHT,
        });
        this.pushNotification({
          title: "Rappels",
          message: msg,
        });
      } catch (e) {
        console.error("[RDV] Erreur sendRemindersForDay:", e?.response?.data || e);
        this.$toast.error("Erreur lors de l'envoi des rappels.", {
          position: POSITION.TOP_RIGHT,
        });
      }
    },
    async loadOptimizationSuggestions() {
      try {
        if (!this.filters.doctor_id) {
          return;
        }
        const params = {
          doctor_id: this.filters.doctor_id,
          start_date: this.filters.date,
          end_date: this.filters.date,
        };
        const { data } = await appointmentService.getOptimizationSuggestions(
          params
        );
        console.log("[RDV] Optimization suggestions:", data);
        const payload = data && data.data ? data.data : data;
        this.optimization = payload || {
          optimal_slot_duration: null,
          peak_periods: {},
        };

        // Construire un message détaillé pour les notifications in-app
        let messageIa = "Suggestions d'optimisation mises à jour.";
        if (this.optimization && this.optimization.optimal_slot_duration) {
          messageIa =
            "Durée optimale estimée : " +
            this.optimization.optimal_slot_duration +
            " minutes.";

          const peaks =
            this.optimization.peak_periods &&
            Object.keys(this.optimization.peak_periods);
          if (peaks && peaks.length) {
            const topPeaks = peaks.slice(0, 3).map((label) => {
              const count = this.optimization.peak_periods[label];
              return label + " (" + count + " RDV)";
            });
            messageIa += " Périodes de forte demande : " + topPeaks.join(", ");
          }
        }

        this.pushNotification({
          title: "Optimisation IA",
          message: messageIa,
        });
      } catch (e) {
        console.error(
          "[RDV] Erreur loadOptimizationSuggestions:",
          e?.response?.data || e
        );
        this.$toast.error("Erreur lors du chargement des suggestions IA.", {
          position: POSITION.TOP_RIGHT,
        });
      }
    },
    formatTime(datetime) {
      const d = new Date(datetime);
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    },
    formatDateTime(datetime) {
      const d = new Date(datetime);
      return d.toLocaleString();
    },
  },
};
</script>

<style scoped>
.slots-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.slot-button {
  min-width: 120px;
}

@media (max-width: 767.98px) {
  .slot-button {
    width: 100%;
    text-align: center;
  }
}
</style>


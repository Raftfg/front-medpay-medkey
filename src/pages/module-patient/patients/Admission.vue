<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded px-3 py-1 mb-3 text-center"
              style=" background-color: #0B5D3F; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-transform: none;">
              Admission du Patient
            </h3>

            <div v-if="isLoading" class="text-center p-5">
              <div class="spinner-border text-success" role="status">
                <span class="sr-only">Chargement...</span>
              </div>
            </div>

            <form v-else @submit.prevent="submitAdmission">
              <fieldset class="form-group border px-3 py-1">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Identité du patient (Lecture seule)</b></legend>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>IPP</label>
                      <input type="text" class="form-control" :value="patient.ipp" readonly>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="form-group">
                      <label>Nom Complet</label>
                      <input type="text" class="form-control" :value="patient.lastname + ' ' + patient.firstname" readonly>
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset class="form-group border px-3 py-1">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Paramètres de l'admission</b></legend>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Service d'admission <span class="text-danger">*</span></label>
                      <select 
                        v-model.number="form.service_id" 
                        class="form-control" 
                        required 
                        @change="onServiceChange"
                        :disabled="isSubmitting || services.length === 0"
                      >
                        <option :value="null" disabled>
                          {{ services.length === 0 ? 'Aucun service disponible' : 'Sélectionner' }}
                        </option>
                        <option
                          v-for="service in services"
                          :key="service.id || service.uuid || service.name"
                          :value="service.id"
                        >
                          {{ service.name || service.code || `Service #${service.id || service.uuid}` }}
                        </option>
                      </select>
                      <small v-if="form.service_id" class="form-text text-muted">
                        Service sélectionné: {{ getSelectedServiceName() }}
                      </small>
                      <small v-else-if="services.length === 0" class="form-text text-danger">
                        Aucun service disponible. Veuillez vérifier la configuration.
                      </small>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Type d'admission <span class="text-danger">*</span></label>
                      <select v-model="form.admission_type" class="form-control" required>
                        <option :value="null" disabled>Sélectionner un type</option>
                        <option value="programmée">Programmée</option>
                        <option value="urgence">Urgence</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Médecin responsable</label>
                      <select v-model="form.responsible_doctor_id" class="form-control">
                        <option value="">
                          {{ doctors.length ? "Sélectionner" : "Aucun médecin disponible" }}
                        </option>
                        <option
                          v-for="doc in doctors"
                          :key="doc.id || doc.uuid"
                          :value="doc.id"
                        >
                          Dr. {{ doc.name || doc.lastname }} {{ doc.prenom || doc.firstname }}
                        </option>
                      </select>
                      <small
                        class="form-text text-muted"
                        v-if="doctors.length === 0"
                      >
                        Aucun médecin trouvé dans la base de données
                      </small>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Affectation de lit</label>
                      <div class="form-control bg-light" style="padding: 12px; border: 1px solid #ced4da; border-radius: 0.25rem;">
                        <div class="d-flex align-items-center">
                          <i class="mdi mdi-bed mdi-24px text-success mr-2"></i>
                          <div>
                            <strong class="text-success">Affectation automatique</strong>
                            <p class="mb-0 text-muted small">
                              Le système assignera automatiquement un lit disponible dans le service sélectionné.
                            </p>
                            <small v-if="form.service_id && beds.length > 0" class="text-info">
                              <i class="mdi mdi-information-outline"></i> {{ beds.length }} lit(s) disponible(s) pour ce service
                            </small>
                            <small v-else-if="form.service_id && beds.length === 0" class="text-warning">
                              <i class="mdi mdi-alert-outline"></i> Aucun lit disponible actuellement. Le patient sera mis en liste d'attente.
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset class="form-group border px-3 py-1">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Notes cliniques</b></legend>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Motif d'admission</label>
                      <textarea v-model="form.incoming_reason" class="form-control" rows="4" placeholder="Saisissez le motif..."></textarea>
                    </div>
                  </div>
                </div>
              </fieldset>

              <div class="mx-auto text-center mt-3">
                <button type="button" class="btn btn-danger btn-medpay-green mr-2" @click="$router.go(-1)">Annuler</button>
                <button type="submit" class="btn btn-success btn-medpay-green" :disabled="isSubmitting">
                    <span v-if="isSubmitting" class="spinner-border spinner-border-sm mr-2" role="status"></span>
                    Confirmer l'admission
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal pour les actions post-admission -->
    <div class="modal fade" id="postAdmissionModal" tabindex="-1" role="dialog" aria-labelledby="postAdmissionModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header" style="background-color: #0B5D3F; color: white;">
            <h5 class="modal-title" id="postAdmissionModalLabel">
              <i class="mdi mdi-check-circle mr-2"></i> Admission réussie !
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="alert alert-success" role="alert">
              <i class="mdi mdi-information-outline mr-2"></i>
              <strong>Le patient a été admis avec succès.</strong>
              <div v-if="postAdmissionData.bedAssigned && postAdmissionData.bedInfo" class="mt-2">
                <small><i class="mdi mdi-bed mr-1"></i> Lit assigné : <strong>{{ postAdmissionData.bedInfo }}</strong></small>
              </div>
              <div v-else class="mt-2">
                <small><i class="mdi mdi-alert-outline mr-1"></i> Le patient est en liste d'attente pour un lit.</small>
              </div>
            </div>
            
            <p class="mb-3"><strong>Que souhaitez-vous faire maintenant ?</strong></p>
            
            <div class="d-grid gap-2">
              <button 
                type="button" 
                class="btn btn-outline-primary btn-block text-left"
                @click="goToPatientDetail"
              >
                <i class="mdi mdi-account-card-details mr-2"></i>
                Voir le détail du patient
              </button>
              
              <button 
                type="button" 
                class="btn btn-outline-success btn-block text-left"
                @click="goToDME"
              >
                <i class="mdi mdi-folder-account mr-2"></i>
                Accéder au Dossier Médical (DME)
              </button>
              
              <button 
                type="button" 
                class="btn btn-outline-info btn-block text-left"
                @click="goToMovmentList"
              >
                <i class="mdi mdi-format-list-bulleted mr-2"></i>
                Voir la liste des mouvements
              </button>
              
              <button 
                v-if="postAdmissionData.movmentUuid"
                type="button" 
                class="btn btn-outline-warning btn-block text-left"
                @click="goToTreatment"
              >
                <i class="mdi mdi-medical-bag mr-2"></i>
                Commencer le traitement médical
              </button>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { patientService, movmentService, serviceService, bedService, userService } from "@/_services";
import { appointmentService } from "@/_services/appointment_services";
import Axios from "@/_services/caller.services";
import $ from "jquery";

export default {
  name: "Admission",
  props: ["uuid"],
  data() {
    return {
      isLoading: true,
      isSubmitting: false,
      patient: {},
      services: [],
      doctors: [],
      beds: [],
      form: {
        patient_id: null,
        service_id: null,
        admission_type: null, // OPTIMISATION: Pas de valeur par défaut, forcer l'utilisateur à choisir
        responsible_doctor_id: null,
        bed_id: null,
        incoming_reason: ""
      },
      postAdmissionData: {
        movmentUuid: null,
        patientUuid: null,
        bedAssigned: false,
        bedInfo: null
      }
    };
  },
  mounted() {
    // Vérifier que l'UUID est bien présent
    // L'UUID peut venir des props ou des paramètres de route
    const uuid = this.uuid || (this.$route && this.$route.params && this.$route.params.uuid);
    
    if (!uuid) {
      console.error("UUID manquant dans les paramètres de route. Route:", this.$route);
      this.$toast.error("UUID du patient manquant. Redirection vers la liste des patients.");
      setTimeout(() => {
        this.$router.push("/patients/list");
      }, 2000);
      return;
    }
    
    // Si l'UUID vient de la route et pas des props, le définir
    if (!this.uuid && uuid) {
      this.$set(this, 'uuid', uuid);
    }
    
    console.log("Admission - UUID reçu:", uuid);
    this.initData();
  },
  methods: {
    async initData() {
      try {
        // Récupérer l'UUID depuis les props ou la route
        const uuid = this.uuid || (this.$route && this.$route.params && this.$route.params.uuid);
        
        // Vérifier à nouveau l'UUID
        if (!uuid) {
          throw new Error("UUID du patient non défini");
        }

        console.log("Chargement des données pour l'admission - UUID:", uuid);

        // Charger les données du patient
        const patientRes = await patientService.getPatient(uuid);
        
        if (!patientRes || !patientRes.data || !patientRes.data.data) {
          throw new Error("Données du patient non disponibles");
        }
        
        this.patient = patientRes.data.data;
        
        if (!this.patient.id) {
          throw new Error("ID du patient non trouvé dans les données");
        }
        
        this.form.patient_id = this.patient.id;

        // Charger les services, médecins et lits disponibles en parallèle
        // Les lits sont récupérés depuis le module Hospitalization via bedService
        const [servicesRes, doctorsRes, bedsRes] = await Promise.all([
          serviceService.getAllServices().catch(err => {
            console.error("Erreur chargement services:", err);
            console.error("Détails de l'erreur:", err.response);
            return { data: { data: [] } };
          }),
          userService.getDoctors().catch(err => {
            console.error("Erreur chargement médecins:", err);
            return { data: { data: [] } };
          }),
          // Récupération des lits depuis le module Hospitalization (route: /api/v1/beds/available)
          bedService.getAvailableBeds().catch(err => {
            console.error("Erreur chargement lits (module Hospitalization):", err);
            return { data: { data: [] } };
          })
        ]);

        // Extraire les services - gérer toutes les structures possibles
        console.log("Réponse brute des services:", servicesRes);
        console.log("Structure servicesRes.data:", servicesRes.data);
        
        let servicesData = [];
        
        // Essayer toutes les structures possibles
        if (servicesRes && servicesRes.data) {
          // Cas 1: data est directement un tableau
          if (Array.isArray(servicesRes.data)) {
            servicesData = servicesRes.data;
            console.log("✅ Services trouvés directement dans data (array)");
          } 
          // Cas 2: data.data est un tableau
          else if (servicesRes.data.data) {
            if (Array.isArray(servicesRes.data.data)) {
              servicesData = servicesRes.data.data;
              console.log("✅ Services trouvés dans data.data (array)");
            } 
            // Cas 3: data.data.data est un tableau (structure imbriquée)
            else if (servicesRes.data.data.data && Array.isArray(servicesRes.data.data.data)) {
              servicesData = servicesRes.data.data.data;
              console.log("✅ Services trouvés dans data.data.data (array)");
            }
            // Cas 4: data.data est un objet avec une propriété qui contient le tableau
            else if (typeof servicesRes.data.data === 'object') {
              // Chercher la première propriété qui est un tableau
              for (const key in servicesRes.data.data) {
                if (Array.isArray(servicesRes.data.data[key])) {
                  servicesData = servicesRes.data.data[key];
                  console.log(`✅ Services trouvés dans data.data.${key} (array)`);
                  break;
                }
              }
            }
          }
        }
        
        console.log("Services bruts extraits:", servicesData);
        console.log("Nombre de services bruts:", servicesData.length);
        if (servicesData.length > 0) {
          console.log("Premier service exemple:", servicesData[0]);
          console.log("Clés du premier service:", Object.keys(servicesData[0]));
        }
        
        // Normaliser les services - accepter tous les services qui ont au moins un nom
        if (servicesData.length > 0) {
          this.services = servicesData
            .map((service, index) => {
              // Essayer de convertir l'id en nombre si possible
              let serviceId = null;
              
              if (service.id !== undefined && service.id !== null) {
                const numId = Number(service.id);
                serviceId = !isNaN(numId) && numId > 0 ? numId : service.id;
              }
              
              // Si pas d'id valide mais qu'on a un uuid, on garde quand même le service
              // Le backend acceptera l'id même s'il est string
              if (!serviceId && service.uuid) {
                console.warn(`Service "${service.name}" a un uuid mais pas d'id numérique, on garde quand même`);
                // On va utiliser l'id original s'il existe, sinon on essaie de trouver un id ailleurs
                serviceId = service.id || index + 1; // Fallback temporaire
              }
              
              return {
                ...service,
                id: serviceId || service.id || (index + 1) // Garder l'id original ou utiliser l'index
              };
            })
            .filter(service => {
              // Accepter tous les services qui ont au moins un nom
              const hasName = service.name && service.name.trim() !== '';
              if (!hasName) {
                console.warn("Service filtré (pas de nom):", service);
                return false;
              }
              return true;
            });
          
          console.log("✅ Services normalisés:", this.services);
          console.log("✅ Nombre de services après normalisation:", this.services.length);
          
          if (this.services.length > 0) {
            console.log("✅ Exemple de service normalisé:", {
              id: this.services[0].id,
              name: this.services[0].name,
              type_id: typeof this.services[0].id
            });
          }
        } else {
          console.error("❌ Aucun service trouvé dans la réponse!");
          console.error("Structure complète de la réponse:", JSON.stringify(servicesRes, null, 2));
          this.services = [];
          this.$toast.warning("Aucun service disponible. Vérifiez la console pour plus de détails.");
        }

        // Extraire les médecins (structure similaire à celle utilisée dans le module Rendez-vous)
        if (doctorsRes.data) {
          const inner = doctorsRes.data.data;

          if (Array.isArray(inner)) {
            // Cas rare où data.data est directement un tableau
            this.doctors = inner;
          } else if (inner && Array.isArray(inner.data)) {
            // Cas normal: { data: { data: [ ... ], message: ... } }
            this.doctors = inner.data;
          } else if (Array.isArray(doctorsRes.data)) {
            this.doctors = doctorsRes.data;
          } else {
            this.doctors = [];
          }
        } else {
          this.doctors = [];
        }
        
        // Extraire les lits disponibles
        console.log("Réponse brute des lits:", bedsRes);
        if (bedsRes && bedsRes.data) {
          console.log("Structure bedsRes.data:", bedsRes.data);
          
          // reponse_json_transform retourne {data: ...}
          // Si c'est un tableau directement dans data
          if (Array.isArray(bedsRes.data)) {
            this.beds = bedsRes.data;
            console.log("Lits extraits depuis data (array direct):", this.beds);
          }
          // Si c'est un objet avec une propriété data
          else if (bedsRes.data.data && Array.isArray(bedsRes.data.data)) {
            this.beds = bedsRes.data.data;
            console.log("Lits extraits depuis data.data:", this.beds);
          }
          // Si c'est un objet unique (peut-être un ResourceCollection sérialisé)
          else if (bedsRes.data.data && typeof bedsRes.data.data === 'object' && !Array.isArray(bedsRes.data.data)) {
            // Vérifier si c'est un objet avec une propriété data qui contient un tableau
            if (bedsRes.data.data.data && Array.isArray(bedsRes.data.data.data)) {
              this.beds = bedsRes.data.data.data;
              console.log("Lits extraits depuis data.data.data:", this.beds);
            } else {
              // Sinon, convertir l'objet en tableau
              this.beds = [bedsRes.data.data];
              console.log("Lit unique converti en tableau:", this.beds);
            }
          }
          else {
            this.beds = [];
            console.warn("Structure de données inattendue pour les lits:", bedsRes.data);
          }
        } else {
          this.beds = [];
          console.warn("Aucune donnée dans la réponse des lits");
        }
        
        // Vérifier que chaque lit a bien un id et afficher les détails pour debug
        console.log("Lits avant filtrage:", this.beds);
        if (this.beds.length > 0) {
          console.log("Structure du premier lit:", this.beds[0]);
          console.log("Clés du premier lit:", Object.keys(this.beds[0]));
        }
        this.beds = this.beds.filter(bed => {
          const hasId = bed && (bed.id || bed.uuid);
          if (!hasId) {
            console.warn("Lit sans id/uuid filtré:", bed);
          }
          return hasId;
        });
        console.log("Lits après filtrage:", this.beds);
        
        console.log("Services chargés:", this.services.length);
        console.log("Médecins chargés:", this.doctors.length);
        console.log("Lits disponibles chargés:", this.beds.length);
        console.log("Détails des lits:", this.beds);

        this.isLoading = false;
      } catch (error) {
        console.error("Erreur d'initialisation:", error);
        const errorMessage = (error.response && error.response.data && error.response.data.message) || error.message || "Erreur lors du chargement des données.";
        this.$toast.error(errorMessage);
        
        // Ne rediriger que si c'est une erreur critique (patient non trouvé)
        if ((error.response && error.response.status === 404) || (error.message && error.message.includes("non trouvé"))) {
          this.$toast.error("Patient non trouvé. Redirection vers la liste des patients.");
          setTimeout(() => {
            this.$router.push("/patients/list");
          }, 2000);
        } else {
          // Pour les autres erreurs, garder la page mais afficher un message
          this.isLoading = false;
        }
      }
    },

    getBedDisplayName(bed) {
      if (!bed) return 'Lit inconnu';
      
      // Essayer code, puis name, puis id
      const bedName = bed.code || bed.name || (bed.id ? `Lit #${bed.id}` : 'Lit');
      
      // Ajouter la chambre si disponible
      let roomInfo = '';
      if (bed.room) {
        roomInfo = bed.room.name || bed.room.code || (bed.room.id ? `Chambre #${bed.room.id}` : '');
      } else if (bed.room_id) {
        roomInfo = `Chambre #${bed.room_id}`;
      }
      
      return roomInfo ? `${bedName} (${roomInfo})` : bedName;
    },

    getSelectedServiceName() {
      if (!this.form.service_id) return '';
      const service = this.services.find(s => s.id === Number(this.form.service_id));
      return service ? service.name : '';
    },

    async onServiceChange() {
      console.log("onServiceChange appelé - service_id:", this.form.service_id, "type:", typeof this.form.service_id);
      
      // Réinitialiser les sélections liées au service
      this.form.responsible_doctor_id = null;
      // bed_id reste null pour que le système gère automatiquement l'affectation

      if (!this.form.service_id) {
        this.beds = [];
        this.doctors = [];
        return;
      }

      try {
        // S'assurer que service_id est un nombre
        const serviceId = Number(this.form.service_id);
        
        if (isNaN(serviceId)) {
          console.error("service_id n'est pas un nombre valide:", this.form.service_id);
          this.$toast.error("Erreur: ID de service invalide");
          this.form.service_id = null;
          return;
        }
        
        console.log("Chargement des données pour le service ID:", serviceId);

        // Charger les lits disponibles uniquement pour afficher l'information (pas pour sélection)
        const bedsRes = await bedService.getAvailableBeds(serviceId).catch(err => {
          console.warn("Erreur lors du chargement des lits (non bloquant):", err);
          return { data: { data: [] } };
        });
        
        if (bedsRes && bedsRes.data) {
          if (bedsRes.data.data && Array.isArray(bedsRes.data.data)) {
            this.beds = bedsRes.data.data;
          } else if (Array.isArray(bedsRes.data)) {
            this.beds = bedsRes.data;
          } else {
            this.beds = [];
          }
        } else {
          this.beds = [];
        }
        console.log("Lits disponibles pour le service:", serviceId, this.beds.length);

        // 2) Recharger les médecins associés à ce service (logique commune avec le module Rendez-vous)
        try {
          const doctorsRes = await appointmentService.getDoctorsByService({
            service_id: serviceId,
          });
          
          console.log("Réponse brute des médecins:", doctorsRes);
          
          // Extraire les médecins de la réponse (structure: { data: { data: [...], message: ... } })
          if (doctorsRes && doctorsRes.data) {
            const inner = doctorsRes.data.data;
            
            if (Array.isArray(inner)) {
              // Cas où data.data est directement un tableau
              this.doctors = inner;
              console.log("Médecins extraits depuis data.data (array direct):", this.doctors.length);
            } else if (inner && Array.isArray(inner.data)) {
              // Cas normal: { data: { data: [ ... ], message: ... } }
              this.doctors = inner.data;
              console.log("Médecins extraits depuis data.data.data:", this.doctors.length);
            } else if (Array.isArray(doctorsRes.data)) {
              this.doctors = doctorsRes.data;
              console.log("Médecins extraits depuis data (array):", this.doctors.length);
            } else {
              this.doctors = [];
              console.warn("Structure de données inattendue pour les médecins:", doctorsRes.data);
            }
          } else {
            this.doctors = [];
            console.warn("Aucune donnée dans la réponse des médecins");
          }
          
          console.log("✅ Médecins pour le service:", serviceId, "- Nombre:", this.doctors.length);
          if (this.doctors.length > 0) {
            console.log("✅ Exemple de médecin:", {
              id: this.doctors[0].id,
              name: this.doctors[0].name,
              prenom: this.doctors[0].prenom
            });
          } else {
            console.warn("⚠️  Aucun médecin trouvé pour le service ID:", serviceId);
          }
        } catch (doctorsError) {
          console.error("Erreur lors du chargement des médecins par service:", doctorsError);
          console.error("Détails de l'erreur:", doctorsError.response?.data || doctorsError.message);
          this.doctors = [];
          // Ne pas bloquer le reste du processus, juste afficher un avertissement
          this.$toast.warning(
            `Aucun médecin disponible pour ce service (ID: ${serviceId})`,
            { duration: 3000 }
          );
        }
      } catch (error) {
        console.error("Erreur chargement lits/médecins par service:", error);
        this.$toast.warning(
          "Impossible de charger les lits ou les médecins pour ce service"
        );
        this.beds = [];
        this.doctors = [];
      }
    },

    async submitAdmission() {
      // Validation avant soumission
      if (!this.form.patient_id) {
        this.$toast.error("ID du patient manquant");
        return;
      }
      if (!this.form.service_id) {
        this.$toast.error("Veuillez sélectionner un service");
        return;
      }
      // Le médecin responsable est optionnel si aucun médecin n'est disponible

      this.isSubmitting = true;
      try {
        // Préparer les données en s'assurant que les IDs sont des nombres
        const formData = {
          patient_id: Number(this.form.patient_id),
          service_id: Number(this.form.service_id), // S'assurer que c'est un nombre
          admission_type: this.form.admission_type,
          incoming_reason: this.form.incoming_reason || null
        };
        
        // Ajouter responsible_doctor_id seulement s'il est valide (non null et non vide)
        if (this.form.responsible_doctor_id != null && this.form.responsible_doctor_id !== '') {
          formData.responsible_doctor_id = Number(this.form.responsible_doctor_id);
        }
        
        // Le système gère automatiquement l'affectation du lit
        // On ne passe pas bed_id pour laisser le backend choisir un lit disponible
        // formData.bed_id n'est pas inclus - le backend assignera automatiquement
        
        console.log("Données d'admission envoyées:", formData);
        console.log("Type de service_id:", typeof formData.service_id, "Valeur:", formData.service_id);
        
        const response = await movmentService.admitPatient(formData);
        
        // Extraire les données du mouvement depuis la réponse
        // Structure possible: { data: { data: {...}, bed_assigned: true } }
        const responseData = response?.data || {};
        const movmentData = responseData.data || responseData || {};
        const movmentUuid = movmentData.uuid || movmentData.data?.uuid;
        const patientUuid = this.uuid;
        const bedAssigned = responseData.bed_assigned !== undefined ? responseData.bed_assigned : false;
        
        console.log("Réponse admission complète:", response);
        console.log("Données mouvement extraites:", movmentData);
        console.log("UUID mouvement:", movmentUuid);
        console.log("Lit assigné:", bedAssigned);
        
        // Préparer les données pour le modal
        this.postAdmissionData = {
          movmentUuid: movmentUuid,
          patientUuid: patientUuid,
          bedAssigned: bedAssigned,
          bedInfo: null
        };
        
        // Extraire les informations du lit si assigné
        if (bedAssigned) {
          // Chercher les informations du lit dans différentes structures possibles
          let bed = null;
          if (movmentData.bedPatients && movmentData.bedPatients.length > 0) {
            bed = movmentData.bedPatients[0]?.bed;
          } else if (movmentData.bed_patients && movmentData.bed_patients.length > 0) {
            bed = movmentData.bed_patients[0]?.bed;
          }
          
          if (bed) {
            const bedCode = bed.code || bed.name || (bed.id ? `Lit #${bed.id}` : 'Lit');
            let roomInfo = '';
            
            if (bed.room) {
              roomInfo = bed.room.name || bed.room.code || '';
            }
            
            this.postAdmissionData.bedInfo = roomInfo ? `${bedCode} (${roomInfo})` : bedCode;
          }
        }
        
        // Message de succès avec informations
        let successMessage = "Admission enregistrée avec succès !";
        if (this.postAdmissionData.bedInfo) {
          successMessage += ` Lit assigné : ${this.postAdmissionData.bedInfo}`;
        } else if (!bedAssigned) {
          successMessage += " Le patient est en liste d'attente pour un lit.";
        }
        
        this.$toast.success(successMessage, { duration: 5000 });
        
        // Afficher le modal avec les actions après un court délai
        this.$nextTick(() => {
          setTimeout(() => {
            $('#postAdmissionModal').modal('show');
          }, 500);
        });
      } catch (error) {
        console.error("Erreur lors de l'admission:", error);
        const errorMessage = (error.response && error.response.data && error.response.data.message) || 
                            (error.response && error.response.data && error.response.data.data && error.response.data.data.message) ||
                            "Erreur lors de l'admission.";
        this.$toast.error(errorMessage);
      } finally {
        this.isSubmitting = false;
      }
    },

    goToPatientDetail() {
      $('#postAdmissionModal').modal('hide');
      this.$router.push(`/patients/detail/${this.postAdmissionData.patientUuid}`);
    },

    goToDME() {
      $('#postAdmissionModal').modal('hide');
      this.$router.push(`/patients/dme/${this.postAdmissionData.patientUuid}`);
    },

    goToMovmentList() {
      $('#postAdmissionModal').modal('hide');
      this.$router.push('/movments/list');
    },

    goToTreatment() {
      $('#postAdmissionModal').modal('hide');
      // La route de traitement nécessite l'ID numérique du mouvement
      // Pour l'instant, rediriger vers le DME qui permet de gérer le traitement
      // TODO: Récupérer l'ID numérique depuis l'UUID si nécessaire
      this.$toast.info("Redirection vers le DME pour commencer le traitement");
      this.$router.push(`/patients/dme/${this.postAdmissionData.patientUuid}`);
    }
  }
};
</script>

<style>
fieldset {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #f5f5f5;
  padding: 16px;
}
.btn-medpay-green {
    font-weight: bold;
}
</style>

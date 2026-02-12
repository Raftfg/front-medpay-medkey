<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded px-3 py-1 mb-3 text-center"
              style=" background-color: #0B5D3F; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-transform: none;">
              Transfert Inter-Services
            </h3>

            <div v-if="isLoading" class="text-center p-5">
              <div class="spinner-border text-success" role="status">
                <span class="sr-only">Chargement...</span>
              </div>
            </div>

            <form v-else @submit.prevent="submitTransfer">
              <fieldset class="form-group border px-3 py-1">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Situation Actuelle (Lecture seule)</b></legend>
                <div class="row">
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>Patient</label>
                      <input type="text" class="form-control" :value="patient.lastname + ' ' + patient.firstname" readonly>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>Service Actuel</label>
                      <input type="text" class="form-control" :value="currentMovment.service ? currentMovment.service.name : (currentMovment.services_name || 'N/A')" readonly>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>Lit Actuel</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        :value="getCurrentBedDisplay()" 
                        readonly
                        :title="currentBed ? `Lit: ${currentBed.code || currentBed.name || 'N/A'}${currentBed.room ? ' - Chambre: ' + (currentBed.room.name || currentBed.room.code || 'N/A') : ''}` : 'Aucun lit attribué'"
                      >
                      <small v-if="currentBed && currentBed.room" class="form-text text-muted">
                        Chambre: {{ currentBed.room.name || currentBed.room.code || 'N/A' }}
                      </small>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>Médecin Actuel</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        :value="getCurrentDoctorDisplay()" 
                        readonly
                      >
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset class="form-group border px-3 py-1">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Destination du transfert</b></legend>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Nouveau service <span class="text-danger">*</span></label>
                      <select 
                        v-model.number="form.new_service_id" 
                        class="form-control" 
                        required 
                        @change="onServiceChange"
                        :disabled="isLoading || services.length === 0"
                      >
                        <option :value="null" disabled>
                          {{ isLoading ? 'Chargement...' : (services.length === 0 ? 'Aucun service disponible' : 'Sélectionner un service') }}
                        </option>
                        <option 
                          v-for="service in services" 
                          :key="service.id || service.uuid || service.name"
                          :value="service.id"
                        >
                          {{ service.name || service.code || `Service #${service.id || service.uuid}` }}
                        </option>
                      </select>
                      <small v-if="form.new_service_id" class="form-text text-muted">
                        Service sélectionné: {{ getSelectedServiceName() }}
                      </small>
                      <small v-else-if="!isLoading && services.length === 0" class="form-text text-danger">
                        <i class="mdi mdi-alert-circle mr-1"></i>Aucun service disponible
                      </small>
                      <small v-else-if="services.length > 0" class="form-text text-muted">
                        {{ services.length }} service(s) disponible(s)
                      </small>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Nouveau lit</label>
                      <select 
                        v-model.number="form.new_bed_id" 
                        class="form-control"
                        :disabled="!form.new_service_id || isLoading || loadingBeds"
                      >
                        <option :value="null">
                          {{ !form.new_service_id ? 'Sélectionnez d\'abord un service' : (loadingBeds ? 'Chargement des lits...' : 'Laissez le système proposer') }}
                        </option>
                        <option v-for="bed in beds" :key="bed.id" :value="bed.id">
                          {{ bed.code || bed.name || 'Lit #' + bed.id }} 
                          ({{ bed.room ? (bed.room.name || bed.room.code || 'N/A') : 'N/A' }})
                        </option>
                      </select>
                      <div v-if="loadingBeds" class="mt-1">
                        <small class="text-info">
                          <i class="mdi mdi-loading mdi-spin mr-1"></i>Chargement des lits...
                        </small>
                      </div>
                      <small v-else-if="form.new_service_id && beds.length === 0 && !isLoading" class="text-info">
                        <i class="mdi mdi-information-outline mr-1"></i>Aucun lit disponible. Le système proposera automatiquement un lit.
                      </small>
                      <small v-else-if="form.new_service_id && beds.length > 0" class="text-muted">
                        <i class="mdi mdi-check-circle mr-1"></i>{{ beds.length }} lit(s) disponible(s)
                      </small>
                    </div>
                  </div>
                </div>
                <div class="row mt-2">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Médecin responsable (optionnel)</label>
                      <select 
                        v-model.number="form.responsible_doctor_id" 
                        class="form-control"
                        :disabled="isLoading || !form.new_service_id || loadingDoctors"
                      >
                        <option :value="null">
                          {{ !form.new_service_id ? 'Sélectionnez d\'abord un service' : (loadingDoctors ? 'Chargement des médecins...' : 'Conserver le médecin actuel') }}
                        </option>
                        <option v-for="doc in doctors" :key="doc.id" :value="doc.id">
                          Dr. {{ doc.name || doc.lastname || '' }} {{ doc.prenom || doc.firstname || '' }}
                        </option>
                      </select>
                      <div v-if="loadingDoctors" class="mt-1">
                        <small class="text-info">
                          <i class="mdi mdi-loading mdi-spin mr-1"></i>Chargement des médecins...
                        </small>
                      </div>
                      <small v-else-if="!form.new_service_id" class="text-info">
                        <i class="mdi mdi-information-outline mr-1"></i>Sélectionnez un service pour voir les médecins disponibles
                      </small>
                      <small v-else-if="!isLoading && doctors.length === 0" class="text-warning">
                        <i class="mdi mdi-alert-outline mr-1"></i>Aucun médecin disponible dans ce service
                      </small>
                      <small v-else-if="form.new_service_id && doctors.length > 0" class="text-muted">
                        <i class="mdi mdi-check-circle mr-1"></i>{{ doctors.length }} médecin(s) disponible(s) dans ce service
                      </small>
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset class="form-group border px-3 py-1">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Justification</b></legend>
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Motif du transfert <span class="text-danger">*</span></label>
                      <textarea v-model="form.transfer_reason" class="form-control" rows="4" placeholder="Raison médicale ou administrative..." required></textarea>
                    </div>
                  </div>
                </div>
              </fieldset>

              <div class="mx-auto text-center mt-3">
                <button type="button" class="btn btn-danger btn-medpay-green mr-2" @click="$router.go(-1)">Annuler</button>
                <button type="submit" class="btn btn-success btn-medpay-green" :disabled="isSubmitting">
                    <span v-if="isSubmitting" class="spinner-border spinner-border-sm mr-2" role="status"></span>
                    Confirmer le transfert
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal pour les actions post-transfert -->
    <div class="modal fade" id="postTransferModal" tabindex="-1" role="dialog" aria-labelledby="postTransferModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header" style="background-color: #0B5D3F; color: white;">
            <h5 class="modal-title" id="postTransferModalLabel">
              <i class="mdi mdi-check-circle mr-2"></i> Transfert réussi !
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="alert alert-success" role="alert">
              <i class="mdi mdi-information-outline mr-2"></i>
              <strong>Le patient a été transféré avec succès.</strong>
              <div v-if="postTransferData.newServiceName" class="mt-2">
                <small><i class="mdi mdi-hospital-building mr-1"></i> Nouveau service : <strong>{{ postTransferData.newServiceName }}</strong></small>
              </div>
              <div v-if="postTransferData.newBedInfo" class="mt-2">
                <small><i class="mdi mdi-bed mr-1"></i> Nouveau lit : <strong>{{ postTransferData.newBedInfo }}</strong></small>
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
                v-if="postTransferData.movmentUuid"
                type="button" 
                class="btn btn-outline-warning btn-block text-left"
                @click="goToMovmentDetail"
              >
                <i class="mdi mdi-file-document-outline mr-2"></i>
                Voir le détail du mouvement
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
import { movmentService, serviceService, bedService, userService } from "@/_services";
import { appointmentService } from "@/_services/appointment_services";
import Axios from "@/_services/caller.services";
import { useToast, POSITION } from "vue-toastification";
import $ from "jquery";

export default {
  name: "Transfer",
  props: ["movment_uuid"],
  data() {
    return {
      isLoading: true,
      isSubmitting: false,
      currentMovment: {},
      patient: {},
      currentBed: null,
      services: [],
      beds: [],
      doctors: [],
      loadingBeds: false,
      loadingDoctors: false,
      form: {
        movment_uuid: this.movment_uuid || this.$route.params.movment_uuid,
        new_service_id: null,
        new_bed_id: null,
        transfer_reason: "",
        responsible_doctor_id: null
      },
      postTransferData: {
        movmentUuid: null,
        patientUuid: null,
        newServiceName: null,
        newBedInfo: null
      }
    };
  },
  mounted() {
    // Récupérer l'UUID depuis les paramètres de route si pas dans props
    if (!this.form.movment_uuid) {
      this.form.movment_uuid = this.$route.params.movment_uuid;
    }
    
    if (!this.form.movment_uuid) {
      this.$toast.error("UUID du mouvement manquant", {
        position: POSITION.TOP_RIGHT,
        timeout: 3000,
      });
      this.$router.push("/movments/list");
      return;
    }
    
    this.initData();
  },
  methods: {
    async initData() {
      try {
        // Utiliser Axios qui préfixe automatiquement avec /api/v1
        // Le contrôleur show accepte maintenant soit un ID soit un UUID
        const res = await Axios.get(`/movments/${this.form.movment_uuid}`).catch(err => {
          console.error("Erreur chargement mouvement:", err);
          // Si 404, essayer avec l'UUID directement
          if (err.response && err.response.status === 404) {
            throw new Error("Mouvement non trouvé avec cet UUID");
          }
          throw err;
        });
        
        if (!res || !res.data) {
          throw new Error("Réponse du serveur invalide");
        }
        
        // Gérer différentes structures de réponse
        let movmentData = null;
        if (res.data.data) {
          movmentData = res.data.data;
        } else if (res.data.success && res.data.data) {
          movmentData = res.data.data;
        } else {
          throw new Error("Données du mouvement non disponibles");
        }
        
        if (!movmentData) {
          throw new Error("Mouvement non trouvé");
        }
        
        this.currentMovment = movmentData;
        
        // Normaliser les données du patient
        if (this.currentMovment.patient) {
          this.patient = this.currentMovment.patient;
        } else if (this.currentMovment.lastname && this.currentMovment.firstname) {
          // Si les données sont dans currentMovment directement (format legacy)
          this.patient = {
            lastname: this.currentMovment.lastname,
            firstname: this.currentMovment.firstname
          };
        } else {
          this.patient = {
            lastname: 'N/A',
            firstname: 'N/A'
          };
        }
        
        // Normaliser les données du service
        if (this.currentMovment.service) {
          this.currentMovment.services_name = this.currentMovment.service.name || this.currentMovment.services_name;
          if (!this.currentMovment.active_services_id) {
            // S'assurer que active_services_id est un nombre
            const serviceId = Number(this.currentMovment.service.id);
            this.currentMovment.active_services_id = !isNaN(serviceId) && serviceId > 0 ? serviceId : this.currentMovment.service.id;
          } else {
            // Normaliser active_services_id en nombre si ce n'est pas déjà le cas
            const serviceId = Number(this.currentMovment.active_services_id);
            if (!isNaN(serviceId) && serviceId > 0) {
              this.currentMovment.active_services_id = serviceId;
            }
          }
        } else if (this.currentMovment.active_services_id) {
          // Normaliser active_services_id en nombre même si service n'est pas présent
          const serviceId = Number(this.currentMovment.active_services_id);
          if (!isNaN(serviceId) && serviceId > 0) {
            this.currentMovment.active_services_id = serviceId;
          }
        }
        
        // OPTIMISATION: Récupérer le lit actuel depuis bed_patients
        // Le système attribue automatiquement un lit lors de l'admission, donc on doit le récupérer correctement
        if (this.currentMovment.bed_patients && Array.isArray(this.currentMovment.bed_patients) && this.currentMovment.bed_patients.length > 0) {
          // Chercher le séjour actif (sans date de fin OU avec state = 'busy')
          const activeStay = this.currentMovment.bed_patients.find(bp => {
            // Séjour actif = pas de date de fin OU state = 'busy'
            const isActive = !bp.end_occupation_date || bp.state === 'busy';
            // Vérifier que le lit est bien chargé
            return isActive && bp.bed && bp.bed.id;
          });
          
          if (activeStay && activeStay.bed) {
            this.currentBed = activeStay.bed;
            console.log("✅ Lit actuel trouvé:", this.currentBed);
          } else {
            // Si aucun séjour actif trouvé, essayer de trouver le dernier séjour (même terminé)
            const lastStay = this.currentMovment.bed_patients
              .filter(bp => bp.bed && bp.bed.id)
              .sort((a, b) => {
                const dateA = new Date(b.start_occupation_date || 0);
                const dateB = new Date(a.start_occupation_date || 0);
                return dateA - dateB;
              })[0];
            
            if (lastStay && lastStay.bed) {
              this.currentBed = lastStay.bed;
              console.log("⚠️ Lit trouvé (dernier séjour):", this.currentBed);
            } else {
              console.warn("⚠️ Aucun lit trouvé pour ce mouvement");
              this.currentBed = null;
            }
          }
        } else {
          console.warn("⚠️ Aucune donnée bed_patients disponible pour ce mouvement");
          this.currentBed = null;
        }
        
        console.log("Données du mouvement chargées:", {
          movment: this.currentMovment,
          patient: this.patient,
          currentBed: this.currentBed
        });

        // OPTIMISATION: Charger uniquement les services au début (même logique que Admission.vue)
        // Les médecins et lits seront chargés dynamiquement lors de la sélection d'un service
        const servicesRes = await serviceService.getAllServices().catch(err => {
          console.error("Erreur chargement services:", err);
          console.error("Détails de l'erreur:", err.response);
          return { data: { data: [] } };
        });

        // Extraire les services - gérer toutes les structures possibles (même logique que Admission.vue)
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
              // Essayer de convertir l'id en nombre si possible (comme dans Admission.vue)
              let serviceId = null;
              
              if (service.id !== undefined && service.id !== null) {
                const numId = Number(service.id);
                // L'API retourne maintenant l'id, donc on devrait toujours avoir un nombre valide
                if (!isNaN(numId) && numId > 0) {
                  serviceId = numId;
                } else {
                  console.warn(`Service "${service.name}" a un id invalide:`, service.id);
                  // Si l'id n'est pas valide, on ne peut pas l'utiliser pour le transfert
                  // Mais on le garde quand même pour l'affichage
                  serviceId = service.id;
                }
              }
              
              // Si pas d'id valide mais qu'on a un uuid, on garde quand même le service
              // Mais on ne pourra pas l'utiliser pour le transfert sans id numérique
              if (!serviceId && service.uuid) {
                console.warn(`Service "${service.name}" a un uuid mais pas d'id numérique. Ce service ne pourra pas être utilisé pour le transfert.`);
                // On ne peut pas créer un id artificiel car le backend a besoin du vrai id
                serviceId = null;
              }
              
              return {
                ...service,
                id: serviceId // Peut être null si pas d'id valide
              };
            })
            .filter(service => {
              // Accepter tous les services qui ont au moins un nom
              const hasName = service.name && service.name.trim() !== '';
              if (!hasName) {
                console.warn("Service filtré (pas de nom):", service);
                return false;
              }
              // Filtrer les services sans id valide (ils ne peuvent pas être utilisés pour le transfert)
              if (!service.id || (typeof service.id !== 'number' && isNaN(Number(service.id)))) {
                console.warn("Service filtré (pas d'id valide):", service);
                return false;
              }
              // Filtrer le service actuel (il ne doit pas être disponible pour le transfert)
              const currentServiceId = Number(this.currentMovment.active_services_id);
              const serviceId = Number(service.id);
              if (!isNaN(currentServiceId) && !isNaN(serviceId) && currentServiceId === serviceId) {
                console.log(`Service "${service.name}" filtré (service actuel - non disponible pour transfert)`);
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
          this.$toast.warning("Aucun service disponible. Vérifiez la console pour plus de détails.", {
            position: POSITION.TOP_RIGHT,
            timeout: 5000,
          });
        }

        // OPTIMISATION: Les médecins seront chargés dynamiquement lors de la sélection d'un service
        // Initialiser avec un tableau vide
        this.doctors = [];
        console.log("ℹ️ Les médecins seront chargés lors de la sélection d'un service");

        // Vérifier que les données essentielles sont chargées
        if (this.services.length === 0) {
          console.warn("⚠️ Aucun service disponible pour le transfert");
          this.$toast.warning("Aucun service disponible. Le transfert ne pourra pas être effectué.", {
            position: POSITION.TOP_RIGHT,
            timeout: 5000,
          });
        }

        this.isLoading = false;
      } catch (error) {
        console.error("Erreur d'initialisation:", error);
        let errorMessage = "Impossible de récupérer le séjour.";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.message) {
          errorMessage = error.message;
        }
        this.$toast.error(errorMessage, {
          position: POSITION.TOP_RIGHT,
          timeout: 5000,
        });
        this.$router.push("/movments/list");
      }
    },

    getCurrentBedDisplay() {
      if (!this.currentBed) {
        return 'Aucun lit attribué';
      }
      // Afficher le code du lit, ou le nom, ou l'ID
      const bedCode = this.currentBed.code || this.currentBed.name || `Lit #${this.currentBed.id}`;
      // Si on a une chambre, l'afficher aussi
      if (this.currentBed.room) {
        const roomName = this.currentBed.room.name || this.currentBed.room.code || '';
        return roomName ? `${bedCode} (${roomName})` : bedCode;
      }
      return bedCode;
    },

    getCurrentDoctorDisplay() {
      if (!this.currentMovment.doctor) {
        return 'Aucun médecin assigné';
      }
      const doctor = this.currentMovment.doctor;
      const name = doctor.name || doctor.lastname || '';
      const firstname = doctor.prenom || doctor.firstname || '';
      return name || firstname ? `Dr. ${name} ${firstname}`.trim() : 'Médecin non identifié';
    },

    getSelectedServiceName() {
      if (!this.form.new_service_id) return '';
      const service = this.services.find(s => Number(s.id) === Number(this.form.new_service_id));
      return service ? service.name : '';
    },

    async onServiceChange() {
      console.log("🔄 onServiceChange appelé:", {
        new_service_id: this.form.new_service_id,
        type: typeof this.form.new_service_id,
        services_available: this.services.length,
        services_ids: this.services.map(s => ({ id: s.id, type: typeof s.id, name: s.name }))
      });
      
      // Réinitialiser les sélections liées au service (comme dans Admission.vue)
      this.form.responsible_doctor_id = null;
      this.form.new_bed_id = null;
      
      if (!this.form.new_service_id) {
        // Réinitialiser les données si aucun service n'est sélectionné
        console.log("⚠️ Aucun service sélectionné, réinitialisation");
        this.beds = [];
        this.doctors = [];
        return;
      }
      
      // Réinitialiser les sélections
      this.beds = [];
      this.doctors = [];
      
      // S'assurer que service_id est un nombre (comme dans Admission.vue)
      const serviceId = Number(this.form.new_service_id);
      
      if (isNaN(serviceId) || serviceId <= 0) {
        console.error("❌ ID de service invalide:", {
          raw: this.form.new_service_id,
          converted: serviceId,
          isNaN: isNaN(serviceId)
        });
        this.$toast.error("ID de service invalide. Veuillez réessayer.", {
          position: POSITION.TOP_RIGHT,
          timeout: 3000,
        });
        // Réinitialiser le service si invalide
        this.form.new_service_id = null;
        return;
      }
      
      console.log("✅ Service ID valide:", serviceId);
      
      // Activer les indicateurs de chargement
      this.loadingBeds = true;
      this.loadingDoctors = true;
      
      try {
        // OPTIMISATION: Charger les lits et médecins en parallèle pour le service sélectionné (même logique que Admission.vue)
        console.log("Chargement des données pour le service ID:", serviceId);

        // Charger les lits disponibles uniquement pour afficher l'information (pas pour sélection)
        const bedsRes = await bedService.getAvailableBeds(serviceId).catch(err => {
          console.warn("Erreur lors du chargement des lits (non bloquant):", err);
          return { data: { data: [] } };
        });
        
        // 2) Recharger les médecins associés à ce service (logique commune avec le module Rendez-vous)
        let doctorsRes;
        try {
          doctorsRes = await appointmentService.getDoctorsByService({
            service_id: serviceId,
          });
          
          console.log("Réponse brute des médecins:", doctorsRes);
        } catch (doctorsError) {
          console.error("Erreur lors du chargement des médecins par service:", doctorsError);
          console.error("Détails de l'erreur:", doctorsError.response?.data || doctorsError.message);
          
          // Fallback: charger tous les médecins si l'endpoint spécifique n'existe pas (404)
          if (doctorsError.response && doctorsError.response.status === 404) {
            console.warn("⚠️ Endpoint /appointments/doctors-by-service non trouvé, chargement de tous les médecins");
            try {
              doctorsRes = await userService.getDoctors();
              console.log("📥 Réponse fallback médecins:", doctorsRes);
            } catch (fallbackErr) {
              console.error("❌ Erreur chargement médecins (fallback):", fallbackErr);
              doctorsRes = { data: { data: [] } };
            }
          } else {
            doctorsRes = { data: { data: [] } };
          }
        }
        
        // OPTIMISATION: Extraire et normaliser les lits de la réponse (même logique que Admission.vue)
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
        console.log("Lits disponibles pour le service:", serviceId, this.beds.length);

        // OPTIMISATION: Extraire et normaliser les médecins du service (même logique que Admission.vue)
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

        // Ne pas bloquer le reste du processus, juste afficher un avertissement si aucun médecin
        if (this.doctors.length === 0) {
          console.warn("⚠️  Aucun médecin trouvé pour le service ID:", serviceId);
          // Ne pas afficher de toast ici pour éviter de spammer l'utilisateur
          // Le message est déjà affiché dans le select
        }
      } catch (error) {
        console.error("Erreur chargement lits/médecins par service:", error);
        this.$toast.warning(
          "Impossible de charger les lits ou les médecins pour ce service",
          {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
          }
        );
        this.beds = [];
        this.doctors = [];
      } finally {
        // Désactiver les indicateurs de chargement
        this.loadingBeds = false;
        this.loadingDoctors = false;
      }
    },

    async submitTransfer() {
      // OPTIMISATION: Validation améliorée du service avec logs de débogage
      console.log("🔍 Validation du formulaire:", {
        new_service_id: this.form.new_service_id,
        type: typeof this.form.new_service_id,
        current_service_id: this.currentMovment.active_services_id,
        form: this.form
      });
      
      // Vérifier que le service est sélectionné
      if (!this.form.new_service_id) {
        console.error("❌ Aucun service sélectionné");
        this.$toast.error("Veuillez sélectionner un nouveau service", {
          position: POSITION.TOP_RIGHT,
          timeout: 3000,
        });
        return;
      }
      
      const newServiceId = Number(this.form.new_service_id);
      const currentServiceId = Number(this.currentMovment.active_services_id);
      
      // Vérifier que le service est valide
      if (isNaN(newServiceId) || newServiceId <= 0) {
        console.error("❌ ID de service invalide:", this.form.new_service_id);
        this.$toast.error("Le service sélectionné n'est pas valide. Veuillez en sélectionner un autre.", {
          position: POSITION.TOP_RIGHT,
          timeout: 3000,
        });
        return;
      }
      
      // Vérifier que le nouveau service est différent du service actuel
      if (newServiceId === currentServiceId) {
        console.warn("⚠️ Le nouveau service est identique au service actuel");
        this.$toast.error("Le nouveau service doit être différent du service actuel", {
          position: POSITION.TOP_RIGHT,
          timeout: 3000,
        });
        return;
      }
      
      console.log("✅ Validation du transfert réussie:", {
        currentServiceId,
        newServiceId,
        isValid: newServiceId !== currentServiceId
      });
      
      if (!this.form.transfer_reason || this.form.transfer_reason.trim() === "") {
        this.$toast.error("Veuillez indiquer le motif du transfert", {
          position: POSITION.TOP_RIGHT,
          timeout: 3000,
        });
        return;
      }
      
      this.isSubmitting = true;
      try {
        // Préparer les données pour l'API
        // OPTIMISATION: S'assurer que new_service_id est un nombre
        const transferData = {
          movment_uuid: this.form.movment_uuid,
          new_service_id: Number(this.form.new_service_id), // S'assurer que c'est un nombre
          transfer_reason: this.form.transfer_reason.trim(),
        };
        
        console.log("📤 Données du transfert à envoyer:", transferData);
        
        // Ajouter le lit si sélectionné
        if (this.form.new_bed_id) {
          transferData.new_bed_id = this.form.new_bed_id;
        }
        
        // Ajouter le médecin responsable si sélectionné
        if (this.form.responsible_doctor_id) {
          transferData.responsible_doctor_id = this.form.responsible_doctor_id;
        }
        
        const response = await movmentService.transferPatient(transferData);
        
        // Extraire les données du mouvement depuis la réponse
        const responseData = response?.data || {};
        const movmentData = responseData.data || responseData || {};
        const movmentUuid = movmentData.uuid || movmentData.data?.uuid || this.form.movment_uuid;
        const patientUuid = this.patient.uuid || this.currentMovment.patient?.uuid;
        
        // Récupérer le nom du nouveau service
        const selectedService = this.services.find(s => Number(s.id) === Number(this.form.new_service_id));
        const newServiceName = selectedService ? selectedService.name : null;
        
        // Récupérer les informations du nouveau lit si sélectionné
        let newBedInfo = null;
        if (this.form.new_bed_id) {
          const selectedBed = this.beds.find(b => Number(b.id) === Number(this.form.new_bed_id));
          if (selectedBed) {
            const bedCode = selectedBed.code || selectedBed.name || `Lit #${selectedBed.id}`;
            const roomInfo = selectedBed.room ? (selectedBed.room.name || selectedBed.room.code || '') : '';
            newBedInfo = roomInfo ? `${bedCode} (${roomInfo})` : bedCode;
          }
        }
        
        // Préparer les données pour le modal
        this.postTransferData = {
          movmentUuid: movmentUuid,
          patientUuid: patientUuid,
          newServiceName: newServiceName,
          newBedInfo: newBedInfo
        };
        
        // Message de succès
        this.$toast.success("Transfert effectué avec succès !", {
          position: POSITION.TOP_RIGHT,
          timeout: 3000,
        });
        
        // Afficher le modal avec les actions après un court délai
        this.$nextTick(() => {
          setTimeout(() => {
            $('#postTransferModal').modal('show');
          }, 500);
        });
      } catch (error) {
        console.error("Erreur lors du transfert:", error);
        let message = "Erreur lors du transfert.";
        if (error.response) {
          if (error.response.data) {
            if (error.response.data.message) {
              message = error.response.data.message;
            } else if (error.response.data.data && error.response.data.data.message) {
              message = error.response.data.data.message;
            }
          }
        } else if (error.message) {
          message = error.message;
        }
        this.$toast.error(message, {
          position: POSITION.TOP_RIGHT,
          timeout: 5000,
        });
      } finally {
        this.isSubmitting = false;
      }
    },

    goToPatientDetail() {
      $('#postTransferModal').modal('hide');
      if (this.postTransferData.patientUuid) {
        this.$router.push(`/patients/detail/${this.postTransferData.patientUuid}`);
      } else {
        this.$router.push("/patients/list");
      }
    },

    goToDME() {
      $('#postTransferModal').modal('hide');
      if (this.postTransferData.patientUuid) {
        this.$router.push(`/patients/dme/${this.postTransferData.patientUuid}`);
      } else {
        this.$router.push("/patients/list");
      }
    },

    goToMovmentList() {
      $('#postTransferModal').modal('hide');
      this.$router.push("/movments/list");
    },

    goToMovmentDetail() {
      $('#postTransferModal').modal('hide');
      if (this.postTransferData.movmentUuid) {
        this.$router.push(`/movments/show/${this.postTransferData.movmentUuid}`);
      } else {
        this.$router.push("/movments/list");
      }
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

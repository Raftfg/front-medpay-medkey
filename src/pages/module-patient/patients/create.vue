<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">

        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded px-3 py-1 mb-3 text-center"
              style=" background-color: #0B5D3F; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-transform: none;">Ajout d'un nouveau patient
            </h3>

            <form @submit.prevent="storePatient">
              <fieldset class="form-group border px-3 py-1">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Identité du patient</b></legend>
                <div class="row">

                  <div class="col-md-6">

                    <div class="form-group">
                      <label>Nom <span style="color: red">*</span></label>
                      <input type="text" maxlength="50" class="form-control" style="text-transform: uppercase"
                        placeholder="Nom" v-model="patient.lastname" @input="validateLastName"/>
                      <!-- Affichage de l'erreur pour le champ 'lastname' -->
                      <div class="error-message" v-show="errors.lastname">
                      {{ errors.lastname }}
                    </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Prénom(s) <span style="color: red">*</span></label>
                      <input type="text" maxlength="60" style="text-transform: capitalize" class="form-control"
                        placeholder="Prénom" v-model="patient.firstname" @input="validateFirstName"/>
                      <div class="error-message" v-show="errors.firstname" >
                        {{ errors.firstname }}
                      </div>
                    </div>
                    <!-- @blur="validateFirstName" -->
                  </div>

                </div>
                <div class="row">
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>Nom marital </label>
                      <input type="text" maxlength="40" class="form-control" style="text-transform: uppercase"
                        placeholder="Nom Marital" v-model="patient.nom_marital" @input="validateMaritalName"/>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>Profession </label>
                      <input type="text" maxlength="40" class="form-control" style="text-transform: capitalize"
                        placeholder="profession" v-model="patient.profession" @input="validateProfession"/>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group controls">
                      <label>Sexe<span style="color: red">*</span>
                      </label>
                      <select v-model="patient.gender" class="form-control mb-3">
                        <option value="">Sélectionner</option>
                        <option value="Masculin">Masculin</option>
                        <option value="Feminin">Feminin</option>
                      </select>
                      <div class="error-message" v-show="errors.gender" >
                        {{ errors.gender }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>Date de Naissance <span style="color: red">*</span></label>                      
                      <input type="date" class="form-control" :max="max_date" v-model="patient.date_birth" @input="calculateAge"/>
                      <div class="error-message" v-show="errors.date_birth">
                          {{ errors.date_birth }}
                        </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label>Âge</label>
                      <input type="text" class="form-control" v-model="patient.age" readonly />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group controls">
                      <label>Situation Matrimoniale</label>
                      <select v-model="patient.marital_status" class="form-control mb-3">
                        <option value="">Sélectionner</option>
                        <option value="Célibataire sans enfant">Célibataire sans enfant</option>
                        <option value="Célibataire avec enfant">Célibataire avec enfant</option>
                        <option value="Marié">Marié(e)</option>
                        <option value="Veuve">Veuf(ve)</option>
                        <option value="Concubinage">Concubinage</option>
                        <option value="Union libre">Union libre</option>
                        <option value="Divorcé">Divorcé(e)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset class="form-group border px-3 py-1">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Coordonnées et Contacts</b></legend>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group controls">
                      <label>Pays </label>
                      <input type="text" class="form-control" style="text-transform: uppercase" value="Bénin" readonly/>
                      <input type="hidden" value="1" v-model="patient.pays_id" />
                      <!-- <select v-model="patient.pays_id" class="form-control mb-3">
                        <option value="null">Sélectionner un Pays</option>
                        <option v-for="pays in pays" :key="pays.id" :value="pays.id">
                          {{ pays.nom }}
                        </option>
                      </select> -->
                    </div>
                  </div> <div class="col-md-4">
                    <div class="form-group controls">
                      <label>Département </label>
                      <select v-model="patient.departements_id" @change="onDepartementSelect(patient.departements_id)" class="form-control mb-3">
                        <option value="null">Sélectionner un département</option>
                        <option v-for="departement in departements" :key="departement.id" :value="departement.id">
                            {{ departement.nom }}
                          </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group controls">
                      <label>Commune </label>
                      <select v-model="patient.communes_id" @change="onCommuneSelect(patient.communes_id)" class="form-control mb-3">
                        <option value="null">Sélectionner un département</option>
                        <option v-for="commune in communes" :key="commune.id" :value="commune.id">
                          {{ commune.nom }}
                        </option>
                      </select>
                    </div>
                  </div>

                </div>

                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group controls">
                      <label>Arrondissement
                      </label>
                      <!-- <select v-model="patient.arrondissements_id" @change="onArrondissementSelect(patient.arrondissements_id)" class="form-control mb-3"> -->
                      <select v-model="patient.arrondissements_id" class="form-control mb-3">
                        <option value="null">
                          Sélectionner un Arrondissement
                        </option>

                        <option v-for="arrondissement in arrondissements" :key="arrondissement.id"
                          :value="arrondissement.id">
                          {{ arrondissement.nom }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Quartier</label>
                      <input type="text" maxlength="50" class="form-control" style="text-transform: capitalize"
                        placeholder="Entrez votre quartier" v-model="patient.quartier" />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Maison
                      </label>
                      <input type="text" maxlength="50" class="form-control" style="text-transform: capitalize" 
                        placeholder="Maison..." v-model="patient.maison" />
                    </div>
                  </div>
                 

                </div>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Cert. d'Identification Pers. (CIP)</label>
                      <input type="text" minlength="14" maxlength="14" class="form-control" placeholder="" v-model="patient.code_postal"/>
                    </div>
                  </div>
                  
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Téléphone mobile <span style="color: red">*</span>
                      </label>
                      <input type="text" maxlength="8" class="form-control" placeholder="99999999" v-model="patient.phone" @input="validatePhone"/>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Numéro d'Urgence<span style="color: red">*</span></label>
                      <input type="text" maxlength="8" class="form-control" placeholder="99999999" v-model="patient.emergency_contac" @input="validateEmergencyContact"/>
                      <div class="error-message" v-show="errors.emergency_contac">
                          {{ errors.emergency_contac }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Numéro Whatsapp
                      </label>
                      <input type="text" maxlength="8" class="form-control" placeholder="99999999" v-model="patient.whatsapp" @input="validateWhatsapp"/>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Email</label>
                      <input type="email" maxlength="40" class="form-control" placeholder="xyz@example.com" v-model="patient.email"/>
                    </div>
                  </div>
                 
                </div>
              </fieldset>

              <div class="row">
                <div class="col-md-6">

                  <fieldset class="form-group border px-3 py-1">
                    <legend class="w-auto px-2"><b style="font-size: 12px;">Père</b></legend>
                    <div class="form-group">
                      <label for="firstname">Nom et prénom(s)</label>
                      <input type="text" maxlength="60" class="form-control" id="firstname" placeholder="Nom et prénom..." style="text-transform: capitalize"
                        name="firstname" v-model="patient.nom_pere" @input="validateNomPere">
                    </div>
                    <div class="form-group">
                      <label for="lastname">Téléphone</label>
                      <input type="text" maxlength="8" class="form-control" id="lastname" placeholder="99999999..."
                        name="lastname" v-model="patient.phone_pere" @input="validatePhonePere">
                    </div>
                  </fieldset>
                </div>
                <div class="col-md-6">

                  <fieldset class="form-group border px-3 py-1">
                    <legend class="w-auto px-2"><b style="font-size: 12px;">Mère</b></legend>
                    <div class="form-group">
                      <label for="firstname">Nom et prénom(s)</label>
                      <input type="text" maxlength="60" class="form-control firstname" id="firstname" placeholder="Nom et prénom..." style="text-transform: capitalize"
                        name="firstname" v-model="patient.nom_mere" @input="validateNomMere">
                    </div>
                    <div class="form-group">
                      <label for="lastname">Téléphone</label>
                      <input type="text" maxlength="8" class="form-control lastname" id="lastname" placeholder="99999999.."
                        name="lastname" v-model="patient.phone_mere" @input="validatePhonePere">
                    </div>
                  </fieldset>
                </div>
              </div>
              
              <fieldset class="form-group border px-3 py-1">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Autres informations</b></legend>
                <!-- <div class="row">
                  <div class="col-md-6">
                    <div class="form-group controls">
                      <label>Assurance
                      </label>
                      <select @change="onInsuranceSelect(insuranceSelected)" v-model="insuranceSelected" class="form-control mb-3">
                        <option v-for="insurance in insurances" :key="insurance.uuid" :value="insurance.uuid">
                          {{ insurance.name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group controls">
                      <label>Pack </label>
                      <select v-model="patient.pack_id" class="form-control mb-3">
                        <option v-for="pack in packs" :key="pack.uuid" :value="pack.uuid">
                          {{ pack.designation }} - ({{ pack.percentage }}%)
                        </option>
                      </select>
                    </div>
                  </div>
                </div> -->
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>Informations additionnelles</label>
                      <textarea type="text" class="form-control" rows="6"  maxlength="120"
                        placeholder="Autres informations" v-model="patient.autre"></textarea>
                    </div>
                  </div>
                </div>
              </fieldset>
              <div class="mx-auto text-center">
                <router-link to="/patients/list">
                  <button type="button" class="btn btn-danger btn-medpay-green  mr-2" :disabled="isSubmitting">Annuler</button> </router-link>
                <button type="submit" class="btn btn-success btn-medpay-green  mr-2" :disabled="isSubmitting">
                  <span v-if="isSubmitting" class="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                  <span v-if="!isSubmitting">Ajouter</span>
                  <span v-if="isSubmitting">Enregistrement...</span>
                </button>
              </div>

            </form>

          </div>

        </div>
      </div>
    </div>

  </section>
</template>
<script>

import Vue from "vue";

import VueFormWizard from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";

import { patientService } from "@/_services";
import { paysService } from "@/_services";
import { departementService } from "@/_services";
import { communeService } from "@/_services";
import { arrondissementService } from "@/_services";
import { insuranceService } from "@/_services";
import { packService } from "@/_services";

import { useToast, POSITION } from "vue-toastification";

Vue.use(VueFormWizard);


export default {
  name: "create-patient",
  data() {
    return {
      isSubmitting: false,
      pays: [],
      pack: [],
      insuranceSelected: "",
      departements: [],
      communes: [],
      arrondissements: [],
      quartiers: [],
      insurances: [],
      packs: [],

      patient: {
        lastname: "",
        firstname: "",
        age: "",
        maison: "",
        phone: "",
        email: "",
        whatsapp: "",
        profession: "",
        marital_status: "",
        emergency_contac: "",
        date_birth: "",
        max_date: "",
        autre: "",
        nom_marital: "",
        code_postal: "",
        gender: "",
        pays_id: null,
        departements_id: null,
        communes_id: null,
        arrondissements_id: null,
        quartier: null,
        nom_pere: "",
        phone_pere: "",
        phone_mere: "",
        nom_mere: "",
        pack_id: "",
      },
      errors: {
        lastname: "", // Message d'erreur pour le champ 'lastname'
        firstname: "",
        date_birth: "",
        gender: "",
        nom_marital: "",
        profession: "",
        email: "",
        emergency_contac: "",
        phone: "",
        whatsapp: "",
        nom_pere: "",
        phone_pere: "",
        nom_mere: "",
        phone_mere: "",
      },
    };
  },
  mounted() {
    paysService
      .getAllpays()
      .then((res) => {
        this.pays = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    departementService
      .getAlldepartements()
      .then((res) => {
        this.departements = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
    insuranceService
      .getAllInsurances()
      .then((res) => {
        this.insurances = res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  },

  filters: {
    capitalizeFirstLetter(value) {
      if (value.length > 0) {
        return value.charAt(0).tocapitalize() + value.slice(1);
      }
      return value;
    },
  },
  methods: {
    calculateAge() {
      if (this.patient.date_birth) {
        const birthDate = new Date(this.patient.date_birth);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - birthDate.getFullYear();

        // Vérifie si l'anniversaire de cette année n'a pas encore eu lieu
        if (
          currentDate.getMonth() < birthDate.getMonth() ||
          (currentDate.getMonth() === birthDate.getMonth() &&
            currentDate.getDate() < birthDate.getDate())
        ) {
          this.patient.age = age - 1; // Diminue l'âge d'une année
        } else {
          this.patient.age = age;
        }
      } 
      // else {
      //   this.errors.date_birth = "La date de naissance est requise.";
      //   this.patient.age = null; // Réinitialise l'âge si la date de naissance est vide
      // }
    },

    validateLastName() {
      if (this.patient.lastname) {
        // Si le champ 'lastname' n'est pas vide et ne contient pas que des chiffres
        this.patient.lastname = this.patient.lastname.replace(/[0-9]/g, '');
        this.errors.lastname = "";
      } else {
        // Si le champ 'lastname' est vide ou contient des chiffres, affichez un message d'erreur
        this.errors.lastname = "Le nom ne doit pas être vide et ne doit pas contenir de chiffres.";
      }
    },

    validateFirstName() {
      // Validation du prénom
      if (this.patient.firstname) {
        this.patient.firstname = this.patient.firstname.replace(/[0-9]/g, '');
        this.errors.firstname = "";
      } else {
        this.errors.firstname = "Le prénom ne doit pas être vide et ne doit pas contenir de chiffres.";
      }
    },

    validateMaritalName() {
      // Validation du prénom
      if (this.patient.nom_marital) {
        this.patient.nom_marital = this.patient.nom_marital.replace(/[0-9]/g, '');
        this.errors.nom_marital = "";
      } else {
        this.errors.nom_marital = "Le nom marital ne doit pas être vide et ne doit pas contenir de chiffres.";
      }
    },
    
    validateProfession() {
      // Validation de la profession
      if (this.patient.profession) {
        this.errors.profession = "";
        this.patient.profession = this.patient.profession.replace(/[0-9]/g, '');
      } 
      // else {
      //   this.errors.profession = "La profession ne doit pas être vide et ne doit pas contenir de chiffres.";
      // }
    },

    validateDatebirth() {
      // Validation de la date de naissance
      if (this.patient.date_birth) {
        this.errors.date_birth = "";
      } 
      // else {
      //   this.errors.date_birth = "La date de naissance est requise.";
      // }
    },

    validateGender() {
      // Validation du genre
      if (this.patient.gender) {
        this.errors.gender = "";
      } else {
        this.errors.gender = "Le genre est requis.";
      }
    },

    validateEmergencyContact() {
      // Validation du contact d'urgence
      if (this.patient.emergency_contac) {
        this.errors.emergency_contac = "";
        this.patient.emergency_contac = this.patient.emergency_contac.replace(/[^0-9]/g, '');
      } else {
        this.errors.emergency_contac = "Le contact d'urgence ne doit contenir que des chiffres.";
      }
    },

    validatePhone() {
      // Validation du contact
      if (this.patient.phone) {
        this.errors.phone = "";
        this.patient.phone = this.patient.phone.replace(/[^0-9]/g, '');
      } 
      // else {
      //   this.errors.phone = "Le numéro de téléphone d'urgence est requis.";
      // }
    },

    validateWhatsapp() {
      // Validation du contact whatsapp
      if (this.patient.whatsapp) {
        this.errors.whatsapp = "";
        this.patient.whatsapp = this.patient.whatsapp.replace(/[^0-9]/g, '');
      } 
      // else {
      //   this.errors.whatsapp = "Le numéro WhatsApp d'urgence est requis.";
      // }
    },
    
    validateNomPere() {
      // Validation dunom du père
      if (this.patient.nom_pere) {
        this.errors.nom_pere = "";
        this.patient.nom_pere = this.patient.nom_pere.replace(/[0-9]/g, '');
      } 
      // else {
      //   this.errors.nom_pere = "Le nom du père ne doit pas être vide et ne doit pas contenir de chiffres.";
      // }
    },

    validatePhonePere() {
      // Validation du contact du père
      if (this.patient.phone_pere) {
        this.errors.phone_pere = "";
        this.patient.phone_pere = this.patient.phone_pere.replace(/[^0-9]/g, '');
      } 
      // else {
      //   this.errors.phone_pere = "Le numéro du père d'urgence est requis.";
      // }
    },
    
    validateNomMere() {
      // Validation du nom de la mère
      if (this.patient.nom_pere) {
        this.errors.nom_pere = "";
        this.patient.nom_pere = this.patient.nom_pere.replace(/[0-9]/g, '');
      } 
      // else {
      //   this.errors.nom_pere = "Le nom de la mère ne doit pas être vide et ne doit pas contenir de chiffres.";
      // }
    },

    validatePhoneMere() {
      // Validation du contact de la mère
      if (this.patient.phone_mere) {
        this.errors.phone_mere = "";
        this.patient.phone_mere = this.patient.phone_mere.replace(/[^0-9]/g, '');
      } 
      // else {
      //   this.errors.whatsapp = "Le numéro de la mère d'urgence est requis.";
      // }
    },
    
    cancel() {
      // this.$toast.error("Enregistrement annulé!", {
      //   position: "top-right",
      //   timeout: 3000,
      //   style: {
      //     background: "#ff0000", // Couleur de fond rouge pour l'erreur
      //     color: "#fff", // Couleur du texte
      //     fontWeight: "bold",
      //   },
      // });
      this.$router.push("/patients/list");
    },

    async storePatient() {
      // Empêcher la double soumission
      if (this.isSubmitting) {
        return;
      }
      
      let isValid = true;
      this.errors = {};

      // Validation des champs obligatoires
      if (!this.patient.lastname){
        this.errors.lastname = "Le nom ne doit pas être vide";
        isValid = false;
      }
      if (!this.patient.firstname){
        this.errors.firstname = "Le prénom ne doit pas être vide";
        isValid = false;
      }
      if (!this.patient.date_birth){
        this.errors.date_birth = "La date de naissance est requise";
        isValid = false;
      } else {
        // Validation : date de naissance ne doit pas être dans le futur
        const birthDate = new Date(this.patient.date_birth);
        const today = new Date();
        if (birthDate > today) {
          this.errors.date_birth = "La date de naissance ne peut pas être dans le futur";
          isValid = false;
        }
      }
      if (!this.patient.gender){
        this.errors.gender = "Le sexe est requis.";
        isValid = false;
      }
      if (!this.patient.emergency_contac){
        this.errors.emergency_contac = "Le contact d'urgence est requis.";
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      // Activer le spinner
      this.isSubmitting = true;

      try {
        // Enregistrez les données du patient dans la table "patients"
        const response = await patientService.addPatients(this.patient);
        
        // Vérifier si le backend a détecté des doublons (code 409)
        if (response.status === 409 && response.data.duplicates) {
          // Afficher les patients similaires et demander confirmation
          const duplicatesList = response.data.duplicates.map(d => 
            `- ${d.lastname} ${d.firstname} (IPP: ${d.ipp || 'N/A'})`
          ).join('\n');
          
          const confirmMessage = `Des patients similaires existent déjà :\n\n${duplicatesList}\n\nVoulez-vous quand même créer ce dossier ?`;
          
          if (confirm(confirmMessage)) {
            // Forcer la création avec force_create = true
            this.patient.force_create = true;
            const forceResponse = await patientService.addPatients(this.patient);
            this.handleSuccessResponse(forceResponse);
            this.isSubmitting = false;
          } else {
            this.isSubmitting = false;
          }
        } else {
          // Création réussie
          this.handleSuccessResponse(response);
          this.isSubmitting = false;
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout du patient:", error);
        
        // Gestion des erreurs de validation
        if (error.response && error.response.status === 422) {
          const errors = error.response.data.errors || {};
          Object.keys(errors).forEach(key => {
            this.errors[key] = Array.isArray(errors[key]) ? errors[key][0] : errors[key];
          });
          this.$toast.error("Veuillez corriger les erreurs dans le formulaire", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
          });
        } else if (error.response && error.response.status === 409) {
          // Doublons détectés
          const duplicates = error.response.data.duplicates || [];
          const duplicatesList = duplicates.map(d => 
            `- ${d.lastname} ${d.firstname} (IPP: ${d.ipp || 'N/A'})`
          ).join('\n');
          
          const confirmMessage = `Des patients similaires existent déjà :\n\n${duplicatesList}\n\nVoulez-vous quand même créer ce dossier ?`;
          
          if (confirm(confirmMessage)) {
            this.patient.force_create = true;
            try {
              const forceResponse = await patientService.addPatients(this.patient);
              this.handleSuccessResponse(forceResponse);
            } catch (forceError) {
              this.$toast.error("Erreur lors de la création forcée du patient", {
                position: POSITION.TOP_RIGHT,
                timeout: 3000,
              });
            } finally {
              this.isSubmitting = false;
            }
          } else {
            this.isSubmitting = false;
          }
        } else {
          this.$toast.error("Erreur lors de l'ajout du patient. Veuillez réessayer.", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
          });
        }
      } finally {
        // S'assurer que le spinner est désactivé dans tous les cas
        if (this.isSubmitting) {
          this.isSubmitting = false;
        }
      }
    },

    handleSuccessResponse(response) {
      const patientData = (response.data && response.data.data) ? response.data.data : response.data;
      const uuid = (patientData && patientData.uuid) ? patientData.uuid : ((patientData && patientData.data && patientData.data.uuid) ? patientData.data.uuid : null);
      const ipp = (patientData && patientData.ipp) ? patientData.ipp : ((patientData && patientData.data && patientData.data.ipp) ? patientData.data.ipp : null);
      
     const message = "Patient ajouté avec succès !";
;
      
      this.$toast.success(message, {
        position: POSITION.TOP_RIGHT,
        timeout: 5000,
        bodyStyle: {
          borderRadius: "10px",
          backgroundColor: "#f0f0f0",
          color: "#333",
          fontWeight: "bold",
        },
      });
      
      // Rediriger vers la liste après un court délai pour permettre la lecture du message
      setTimeout(() => {
        this.$router.push("/patients/list");
      }, 2000);
    },

    onDepartementSelect(departementId) {
      communeService
        .getCommunes(departementId)
        .then((res) => {
          this.communes = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    onCommuneSelect(communeId) {
      arrondissementService
        .getArrondissements(communeId)
        .then((res) => {
          this.arrondissements = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // onArrondissementSelect(arrondissementId) {
    //   quartierService
    //     .getQuartiers(arrondissementId)
    //     .then((res) => {
    //       this.quartiers = res.data;
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // },

    onInsuranceSelect(assuranceId) {
      this.packs = [];
      packService
        .getPackByAssurance(assuranceId)
        .then((res) => {
          console.log(res);
          this.packs = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getToday() {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // Les mois sont 0-indexés, donc on ajoute 1
      const dd = String(today.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    },
  },
  created() {
    // Appeler la méthode getToday pour initialiser max_date à "aujourd'hui" lors de la création du composant
    this.max_date = this.getToday();
  },
};
</script>

<style>
.form-control {
  padding: 1px 1px 1px 5px;

}

/* .form-group {
  margin-bottom: 0px;
} */

fieldset {
  /* border: 1px solid #ccc; */

  padding: 10px;

  margin-bottom: 2px;

  border-radius: 5px;

  background-color: #f5f5f5;
  padding:16px;	
}


input,
.select.form-control {
  padding: 1px 1px 1px 5px !important;
  
}


select {
  cursor: pointer;
  /* height: 43px !important; */
}


.error-message {
  color: red;
  font-size: 13px;
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
</style>

<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded px-3 py-1 mt-0 text-center" style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-transform: none;">
              Détails d'un patient
            </h3>
            <div v-if="isLoading" class="text-center py-5">
              <div class="spinner-border text-success" role="status">
                <span class="sr-only">Chargement...</span>
              </div>
              <p class="mt-2">Chargement des détails du patient...</p>
            </div>
            <div v-else>
              <fieldset class="form-group border px-3 py-1">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Identité du patient</b></legend>
                <table class="table table-borderless">
                  <tr>
                    <td class="bg-stripped">
                      <div class="row">
                        <div class="col-md-6 middle vr">
                          <div class="form-group">
                            <strong>Nom : </strong>
                            <span class="ml-2" style="text-transform: uppercase"> {{ patient.lastname }}</span>                      
                          </div>
                        </div>
                        <div class="col-md-6 middle">
                          <div class="form-group">
                            <strong>Prénom(s) : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ patient.firstname }}</span>                      
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
                            <strong>Nom marital : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ patient.nom_marital }}</span>                      
                          </div>
                        </div>
                        <div class="col-md-4 middle vr">
                          <div class="form-group">
                            <strong>Profession : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ patient.profession }}</span>                      
                          </div>
                        </div>
                        <div class="col-md-4 middle">
                          <div class="form-group">
                            <strong>Sexe : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ patient.gender }}</span>                      
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg-stripped">
                      <div class="row">
                        <div class="col-md-4 middle vr">
                          <div class="form-group">
                            <strong>Date de naissance : </strong>
                            <span class="ml-2" style="text-transform: lowercase"> {{ patient.date_birth }} soit <strong>{{ patient.age }}ans</strong></span>                      
                          </div>
                        </div>
                        <div class="col-md-4 middle vr">
                          <div class="form-group">
                            <strong>Date de décès : </strong>
                            <span class="ml-2" style="text-transform: lowercase"> {{ patient.date_deces }}</span>                      
                          </div>
                        </div>
                        <div class="col-md-4 middle">
                          <div class="form-group">
                            <strong>Sit. Matrimoniale : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ patient.marital_status }}</span>                      
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </fieldset>

              <fieldset class="form-group border px-3 py-1">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Coordonnées et Contacts</b></legend>
                <table class="table table-borderless">
                  <tr>
                    <td class="bg-stripped">
                      <div class="row">
                        <div class="col-md-4 middle vr">
                          <div class="form-group">
                            <strong>Pays : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> BENIN</span>                            
                          </div>
                        </div> 
                        <div class="col-md-4 middle vr">
                          <div class="form-group">
                            <strong>Département : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ patient.departement || 'Non renseigné' }}</span>                            
                          </div>
                        </div>
                        <div class="col-md-4 middle">
                          <div class="form-group">
                            <strong>Commune : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ patient.commune || 'Non renseigné' }}</span>                            
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
                            <strong>Arrondissement : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ patient.arrondissement || 'Non renseigné' }}</span>                            
                          </div>
                        </div>
                        <div class="col-md-4 middle vr">
                          <div class="form-group">
                            <strong>Quartier : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ patient.quartier }}</span>                            
                          </div>
                        </div>
                        <div class="col-md-4 middle">
                          <div class="form-group">
                            <strong>Maison : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ patient.maison }}</span>                            
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg-stripped">
                      <div class="row">
                        <div class="col-md-4 middle vr">
                          <div class="form-group">
                            <strong>Cert. d'Identification Pers. (CIP) : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ patient.code_postal }}</span>                            
                          </div>
                        </div>
                        <div class="col-md-4 middle vr">
                          <div class="form-group">
                            <strong>Téléphone mobile : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ patient.phone }}</span>                            
                          </div>
                        </div>
                        <div class="col-md-4 middle">
                          <div class="form-group">
                            <strong>Numéro d'Urgence : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ patient.emergency_contac }}</span>                            
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
                            <strong>Numéro Whatsapp : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ patient.whatsapp }}</span>                            
                          </div>
                        </div>
                        <div class="col-md-8 middle">
                          <div class="form-group">
                            <strong>Email : </strong>
                            <span class="ml-2" style="text-transform: lowercase"> {{ patient.email }}</span>                            
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </fieldset>

              <fieldset class="form-group border px-3 py-1">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Père</b></legend>
                  <table class="table table-borderless">
                    <tr>
                      <td class="bg-stripped">
                        <div class="row">
                          <div class="col-md-6 middle vr">
                            <div class="form-group">
                              <strong>Nom et Prénom(s) : </strong>
                              <span class="ml-2" style="text-transform: capitalize"> {{ patient.nom_pere }}</span>                            
                            </div>
                          </div>
                          <div class="col-md-6 middle">
                            <div class="form-group">
                              <strong>Téléphone : </strong>
                              <span class="ml-2" style="text-transform: capitalize"> {{ patient.phone_pere }}</span>                            
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
              </fieldset>

              <fieldset class="form-group border px-3 py-1">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Mère</b></legend>
                  <table class="table table-borderless">
                    <tr>
                      <td class="bg-stripped">
                        <div class="row">
                          <div class="col-md-6 middle vr">
                            <div class="form-group">
                              <strong>Nom et Prénom(s) : </strong>
                              <span class="ml-2" style="text-transform: capitalize"> {{ patient.nom_mere }}</span>                            
                            </div>
                          </div>
                          <div class="col-md-6 middle">
                            <div class="form-group">
                              <strong>Téléphone : </strong>
                              <span class="ml-2" style="text-transform: capitalize"> {{ patient.phone_mere }}</span>                            
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
              </fieldset>

              <fieldset class="form-group border px-3 py-1">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Autres informations</b></legend>
                <table class="table table-borderless">
                  <!-- <tr>
                    <td class="bg-stripped">
                      <div class="row">
                        <div class="col-md-6 middle vr">
                          <div class="form-group">
                            <strong>Assurance : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ patient.insurance }}</span>                            
                          </div>
                        </div>
                        <div class="col-md-6 middle">
                          <div class="form-group">
                            <strong>Pack : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ patient.pack }} - ({{ patient.percentage }}%)</span>                            
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr> -->
                  <tr>
                    <td class="bg-stripped">
                      <div class="row">
                        <div class="col-md-12 middle vr-no">
                          <div class="form-group">
                            <strong>Informations additionnelles : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ patient.autre }}</span>                            
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </fieldset>
            </div>
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
import { quartierService } from "@/_services";
import { insuranceService } from "@/_services";
import { packService } from "@/_services";

import { useToast, POSITION } from "vue-toastification";
Vue.use(VueFormWizard);
export default {
  name: "create-patient",
  props: ["uuid"],
  data() {
    return {
      isLoading: false,
      pays: [],
      filiations: [],
      departements: [],
      pack: [],
      insuranceSelected: null,
      communes: [],
      arrondissements: [],
      quartiers: [],
      insurances: [],
      packs: [],
      patient: {
        lastname: "",
        firstname: "",
        age: "",
        date_deces: "",
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
        pays: "BENIN",
        departement: "",
        commune: "",
        arrondissement: "",
        quartier: "",
        nom_pere: "",
        phone_pere: "",
        nom_mere: "",
        phone_mere: "",
        insurance: "",
        pack: "",
        percentage: "",
      },
    };
  },
  mounted() {
    // OPTIMISATION : Gestion du chargement et des erreurs
    this.isLoading = true;
    
    patientService.getPatient(this.uuid)
      .then((res) => {
        if (res.data && res.data.data) {
          this.patient = res.data.data;
          this.patient.uuid = this.uuid;
          
          // SÉCURISATION : Vérification de l'existence des relations avant accès
          if (res.data.data.departements && res.data.data.departements.nom) {
            this.patient.departement = res.data.data.departements.nom;
          } else {
            this.patient.departement = 'Non renseigné';
          }
          
          if (res.data.data.communes && res.data.data.communes.nom) {
            this.patient.commune = res.data.data.communes.nom;
          } else {
            this.patient.commune = 'Non renseigné';
          }
          
          if (res.data.data.arrondissements && res.data.data.arrondissements.nom) {
            this.patient.arrondissement = res.data.data.arrondissements.nom;
          } else {
            this.patient.arrondissement = 'Non renseigné';
          }
          
          // SÉCURISATION : Vérification de l'existence des assurances
          if (res.data.data.patient_insurances && 
              res.data.data.patient_insurances.data && 
              res.data.data.patient_insurances.data.length > 0 &&
              res.data.data.patient_insurances.data[0].pack) {
            const pack = res.data.data.patient_insurances.data[0].pack;
            if (pack.insurances && pack.insurances.name) {
              this.patient.insurance = pack.insurances.name;
            }
            if (pack.designation) {
              this.patient.pack = pack.designation;
            }
            if (pack.percentage) {
              this.patient.percentage = pack.percentage;
            }
          }
        }
      })
      .catch((error) => {
        console.error("Erreur lors du chargement du patient:", error);
        this.$toast.error("Erreur lors du chargement des détails du patient", {
          position: POSITION.TOP_RIGHT,
          timeout: 3000,
        });
        // Redirection vers la liste en cas d'erreur
        this.$router.push("/patients/list");
      })
      .finally(() => {
        this.isLoading = false;
      });

    insuranceService
      .getAllInsurances()
      .then((res) => {
        this.insurances = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });

    packService
      .getAllPacks()
      .then((res) => {
        this.packs = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });

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
        this.onDepartementSelect(this.patient.departements_id);
      })
      .catch((err) => {
        // this.oncommuneSelect(this.patient.commune_id);
        console.log(err);
      });

    communeService
      .getAllcommunes()
      .then((res) => {
        this.communes = res.data.data;
        this.onCommuneSelect(this.patient.communes_id);
      })
      .catch((err) => {
        console.log(err);
      });

    arrondissementService
      .getAllarrondissements()
      .then((res) => {
        this.arrondissements = res.data.data;
        // this.onArrondissementSelect(this.patient.arrondissements_id);
      })
      .catch((err) => {
        console.log(err);
      });

    // insuranceService
    //   .getAllInsurances()
    //   .then((res) => {
    //     this.insurances = res.data.data;
    //     this.onInsuranceSelect(insuranceSelected);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },

  filters: {
    capitalizeFirstLetter(value) {
      if (value.length > 0) {
        return value.charAt(0).toUpperCase() + value.slice(1);
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
      } else {
        this.errors.date_birth = "La date de naissance est requise.";
        this.patient.age = null; // Réinitialise l'âge si la date de naissance est vide
      }
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

    validatedate_birth() {
      // Validation de la date de naissance
      if (this.patient.date_birth) {
        this.errors.date_birth = "";
      } else {
        this.errors.date_birth = "La date de naissance est requise.";
      }
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
        this.errors.emergency_contac = "Le contact d'urgence est requis.";
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

    update() {
      // Enregistrez les données du patient dans la table "patients"
      patientService.updatePatient(this.patient).then((response) => {
        console.log("Résultat de l'ajout du patient :", response);
        this.$toast.success("Patient modifié avec succès !", {
          position: POSITION.TOP_RIGHT,
          timeout: 3000,
          bodyStyle: {
            borderRadius: "10px",
            backgroundColor: "#f0f0f0",
            color: "#333",
            fontWeight: "bold",
          },
        });
        this.$router.push("/patients/list");
      });
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

    onArrondissementSelect(arrondissementId) {
      quartierService
        .getQuartiers(arrondissementId)
        .then((res) => {
          this.quartiers = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    onInsuranceSelect(assuranceId) {
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

<style scoped>
@import "../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
@import "../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";

/* .table {
  margin-top: -1rem !important;
} */

.middle {
    display: flex !important;
    align-items: center !important;
}

.vr {
    border-right: 2px solid rgb(0, 0, 0) !important;
    height: 1.5rem !important;
}

.vr-no {
    height: 1.5rem !important;
}

.form-group {
  margin-bottom: 0 !important
}

.bg-stripped {
  background-color: #0b5d3f1a;
}

.table th, .table td {
    padding: 0.4em 0.6em !important;
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

.text-bold {
  font-weight: bold;
}

.btn-connexion-green {
  border: 3px solid rgb(11, 93, 63) !important;

  box-shadow: none !important;
  font-weight: 700 !important;
  /* font-size: 16px !important; */
  color: white !important;
  background-color: rgb(35, 101, 171);

  /* Ajustez la taille du texte selon vos préférences */
  /* padding: 0.685rem 0.49rem !important; */
}

.btn-connexion-green:hover {
  /* Changez la couleur de fond au survol */
  /* color: rgb(11, 93, 63) !important; */
  color: rgb(11, 93, 63) !important;
  background-color: #ffffff !important;
  /* Par exemple, une couleur de fond différente au survol */
}

</style>

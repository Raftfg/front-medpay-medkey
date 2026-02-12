<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-5 text-center"
              style="background-color: #0B5D3F; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              Ajouter un pack patient
            </h3>
            <form @submit.prevent="addPriseEnCharge" class="forms-sample">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="patient_id">Patient <span
                        style="color: red; font-weight: bold !important">*</span></label>
                    <select id="patient_id" v-model="patient_id" @change="getPourcentageIndigence()" class="form-control"
                      @input="clearError('patient_id')" :class="{
                        'form-control': true,
                        'is-invalid': formErrors.patient_id,
                      }">
                      <option value="">Sélectionnez un patient</option>
                      <option >
                       DOSSOU Paul
                      </option>
                      <option >
                      ASSOGBA Calvi
                      </option>
                      <option >
                      EDIKOU Arthur
                      </option>
                    </select>
                    <div v-if="formErrors.patient_id" class="error-message text-danger">
                      {{ formErrors.patient_id }}
                    </div>
                  </div>

                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="pack_id">Pack <span style="color: red">*</span></label>
                    <select id="pack_id" v-model="pack_id" @input="clearError('pack_id')" class="form-control" :class="{
                      'form-control': true,
                      'is-invalid': formErrors.pack_id,
                    }">
                      <option value="">Sélectionnez un pack</option>
                      <option >
                        PACK 10% DE l'IMAGERIE
                      </option>
                      <option >
                        PACK 86% DES MEDICAMENTS
                      </option>
                      <option >
                        MAPI_ROUTINE_100%
                      </option>
                      <option >
                        MAPI_COVID19_100%
                      </option>
                      <option >
                        CARTE_VALEUR_M100%
                      </option>
                    </select>
                    <div v-if="formErrors.pack_id" class="error-message text-danger">
                      {{ formErrors.pack_id }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="dateDebut">Date de début <span style="color: red">*</span></label>
                    <input type="date" v-model="dateDebut" @input="clearError('dateDebut')" class="form-control"
                      id="dateDebut" placeholder="date_debut" :class="{
                        'form-control': true,
                        'is-invalid': formErrors.dateDebut,
                      }" />
                    <div v-if="formErrors.dateDebut" class="error-message text-danger">
                      {{ formErrors.dateDebut }}
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="dateDebut">Date de début <span style="color: red">*</span></label>
                    <input type="date" v-model="dateDebut" @input="clearError('dateDebut')" class="form-control"
                      id="dateDebut" placeholder="date_debut" :class="{
                        'form-control': true,
                        'is-invalid': formErrors.dateDebut,
                      }" />
                    <div v-if="formErrors.dateDebut" class="error-message text-danger">
                      {{ formErrors.dateDebut }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label for="Observation">Observations</label>
                    <textarea id="observation" v-model="observation" class="form-control" type="text"
                      placeholder="Donnez une observation"></textarea>
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-between col-12 flex-row">
                <!-- <button @click="cancel" class="btn btn-secondary btn-medpay-gray">Annuler</button> -->
                <button class="btn btn-danger btn-medpay-gray" @click="cancel">
                  Annuler
                </button>
                <button type="submit" class="btn btn-success btn-medpay-green">Ajouter</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { PriseEnChargePatientService } from "@/_services/priseenchargepatient_services.js";
import { patientService } from "@/_services/patients_services.js";
import { AssuranceService } from "@/_services/assurances_services.js";
import { compagnieService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";
import { IndigencespatientService } from "@/_services";
export default {
  name: "create-priseencharge",

  data() {
    return {
      patient_id: "",
      pack_id: "",
      assurance_id: "",
      compagnie_d_assurance_id: "",
      pourcentage: "",
      numero_assurance: "",
      statut: "privé",
      dateDebut: "",
      compagnies: [],
      prisencharges: [],
      selectedCompagnie: "",
      selectedAssurance: "",
      dateFin: "",
      observation: "",
      assurances: [],
      patients: [],
      errorMessage: "",
      formErrors: {},
      pourcentageIndigence: "",
    };
  },
  mounted() {
    patientService
      .getAllPatients()
      .then((res) => {
        this.patients = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    compagnieService
      .getAllCompagnies()
      .then((res) => {
        this.compagnies = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    PriseEnChargePatientService.getAllPriseenchargePatient()
      .then((res) => {
        this.prisencharges = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    cancel() {
      this.$toast.error("Vous avez annulé l'opération en cours !", {
        position: "top-right",
        timeout: 3000,
        style: {
          background: "#ff0000", // Couleur de fond rouge pour l'erreur
          color: "#fff", // Couleur du texte
          fontWeight: "bold",
        },
      });
      this.$router.push("/priseencharge/list");
    },
    addPriseEnCharge(event) {
      let isValid = true;
      event.preventDefault();

      this.formErrors = {};
      if (!this.patient_id) {
        this.formErrors.patient_id = "Veuillez sélectionner un patient.";
      }
      if (!this.selectedCompagnie) {
        this.formErrors.selectedCompagnie =
          "Veuillez sélectionner une compagnie.";
      }
      if (!this.selectedAssurance) {
        this.formErrors.selectedAssurance =
          "Veuillez sélectionner une assurance.";
      }
      if (!this.dateDebut) {
        this.formErrors.dateDebut = "Veuillez sélectionner une date de début.";
      }
      if (!this.dateFin) {
        this.formErrors.dateFin = "Veuillez sélectionner une date de fin.";
      }

      if (Object.keys(this.formErrors).length > 0) {
        return;
      }
      const selectedDateDebut = new Date(this.dateDebut);
      const selectedDateFin = new Date(this.dateFin);

      if (selectedDateFin < selectedDateDebut) {
        this.errorMessage = "La date de fin est antérieure à la date de début.";
        return;
      }

      // console.log("Selected Patient ID:", this.patient_id);
      // console.log("Selected Assurance ID:", this.selectedAssurance);

      // // Vérification si une assurance similaire existe déjà pour le patient
      // const existingPriseEnCharge = this.prisencharges.find(
      //   (pc) =>
      //     pc.patient_id === this.patient_id &&
      //     pc.assurance_id === this.selectedAssurance
      // );

      // console.log("Existing Prise en charge:", existingPriseEnCharge);

      // if (existingPriseEnCharge) {
      //   this.errorMessage =
      //     "Une assurance similaire existe déjà pour ce patient.";
      //   return;
      // }
      console.log("Selected Patient ID:", this.patient_id);
      console.log("Selected Assurance ID:", this.selectedAssurance);

      // Vérification si une assurance similaire existe déjà pour le patient
      const existingPriseEnCharge = this.prisencharges.find(
        (pc) =>
          pc.patient_id === this.patient_id &&
          pc.assurance_id === this.selectedAssurance
      );

      console.log("Existing Prise en charge:", existingPriseEnCharge);

      if (existingPriseEnCharge) {
        // Show error message in a toast
        this.$toast.error(
          "Une assurance similaire existe déjà pour ce patient.",
          {
            position: "top-right",
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          }
        );
        return;
      }

      if (this.pourcentage + this.pourcentageIndigence > 100) {
        this.$toast.error(
          "Veuillez revoir le pourcentage du patient ! Ce patient a déjà une indigence de " +
          this.pourcentageIndigence +
          "%",
          {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          }
        );
        return;
      }

      const priseencharge = {
        patient_id: this.patient_id,
        assurance_id: this.selectedAssurance,
        compagnie_d_assurance_id: this.selectedCompagnie,
        pourcentage: this.pourcentage,
        numero_assurance: this.numero_assurance,
        statut: this.statut,
        datedebut: this.dateDebut,
        datefin: this.dateFin,
        observation: this.observation,
      };

      PriseEnChargePatientService.addPriseEnChargePatient(priseencharge)
        .then((response) => {
          console.log("Prise en charge ajoutée avec succès !");
          // Réinitialiser le formulaire ou effectuer d'autres actions nécessaires
          this.patient_id = "";
          this.selectedAssurance = "";
          numero_assurance;
          this.pourcentage = "";
          this.numero_assurance = "";
          this.selectedCompagnie = "";
          this.dateDebut = "";
          this.dateFin = "";
          this.statut = "privé";
          this.observation = "";
          this.$toast.success("Prise en charge ajoutée avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
          this.$router.push("/priseencharge/list");
        })
        .catch((error) => {
          console.error(
            "Erreur lors de l'ajout de la prise en charge :",
            error
          );
        });
    },
    getAss(compagnieId) {
      AssuranceService.getAssurancess(compagnieId)
        .then((response) => {
          this.assurances = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    getPourcentage(assuranceId) {
      if (assuranceId) {
        AssuranceService.getPourcentageByAssurance(assuranceId)
          .then((response) => {
            this.pourcentage = response.data.pourcentage;
            this.numero_assurance = response.data.numero_assurance;
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.pourcentage = null;
        this.numero_assurance = null;
      }
    },
    getPourcentageIndigence() {
      IndigencespatientService.getPourcentage(this.patient_id)
        .then((res) => {
          this.pourcentageIndigence = res.data.data;
          this.errorM = "";
          // console.log(res.data.success);
          if (this.pourcentageIndigence == 0) {
            this.errorM = "Impossible d'ajouter une indigence pour ce patient.";
          }
        })

        .catch((error) => {
          console.error(error);
        });
    },
    clearError(field) {
      this.formErrors[field] = "";
    },
  },
};
</script>

<style>
.error-message {
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

select {
  cursor: pointer;
  height: 43px !important;
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

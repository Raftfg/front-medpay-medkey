<template>
  <section class="container-scroller">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold">Paramétrage</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Assurance patiente
          </li>
          <li class="breadcrumb-item active text-success font-weight-bold" aria-current="page">
            Modifier
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <!-- <h4 class="card-title">Modifier une assurance patiente</h4> -->

            <h3
              class="card-title text-white rounded p-3 mb-5 text-center"
              style="
                background-color: #0B5D3F;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              "
            >
            Modifier une assurance patiente
            </h3>
            <form @submit="update" class="forms-sample row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="patient_id">Patient <span style="color:red; ">*</span></label>
                  <select id="patient_id" v-model="priseencharge.patient_id" class="form-control" required>
                    <option value="">Sélectionnez un patient</option>
                    <option v-for="patient in patients" :value="patient.id" :key="patient.id">
                      {{ patient.nom }} {{ patient.prenom }}
                    </option>
                  </select>
                </div>
                <div class="form-group controls">
                  <label for="compagnie">Compagnie <span style="color:red; ">*</span></label>
                  <select v-model="selectedCompagnie" @change="getAss(selectedCompagnie)" class="form-control mb-3"
                    id="compagnie">
                    <option value="">Selectionner une compagnie</option>
                    <option v-for="compagnie in compagnies" :key="compagnie.id" :value="compagnie.id">
                      {{ compagnie.nom }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="assurance_id">Assurance <span style="color:red; ">*</span></label>
                  <select id="assurance_id" v-model="selectedAssurance" @change="getPourcentage(selectedAssurance)"
                    class="form-control" required>
                    <option value="">Sélectionnez une assurance</option>
                    <option v-for="assurance in assurances" :value="assurance.id" :key="assurance.id">
                      {{ assurance.nom }}
                    </option>
                  </select>
                </div>

                <div class="form-group">
                  <label for="radio" class="">Statut <span style="color:red; ">*</span></label>
                  <div class="p-2">
                    <input type="radio" v-model="priseencharge.statut" value="privé"
                      class="demo6 mx-auto form-check-input" id="demo6-a" checked />
                    <label for="demo6-a" class="mx-auto" style="font-size: 1rem">Privé</label>
                    <input type="radio" v-model="priseencharge.statut" value="public"
                      class="demo6 mx-auto form-check-input" id="demo6-b" />
                    <label for="demo6-b" class="mx-3" style="font-size: 1rem">Public</label>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="dateDebut">Date de début <span style="color:red; ">*</span></label>
                  <input type="date" v-model="priseencharge.datedebut" class="form-control" id="dateDebut"
                    placeholder="date_debut" />
                </div>
                <div class="form-group">
                  <label for="dateFin">Date de fin <span style="color:red; ">*</span></label>
                  <input type="date" v-model="priseencharge.datefin" class="form-control" id="dateFin"
                    placeholder="date_fin" />
                  <div v-if="errorMessage" class="error-message text-danger">
                    {{ errorMessage }}
                  </div>
                </div>

                <div class="form-group">
                  <div class="row">
                      <div class="col-md-6">
                      <label for="pourcentage">Pourcentage en % </label>
                      <input v-model="priseencharge.pourcentage" type="number" class="form-control" id="pourcentage"
                        placeholder="Pourcentage de prise en charge" readonly />
                      </div>
                          <div class="col-md-6">
                          <label for="numero_assurance">Numéro d'assurance </label>
                        <input
                        v-model="priseencharge.numero_assurance"
                        type="text"
                        class="form-control"
                        id="numero_assurance"
                        placeholder="Numéro d'assurance" readonly/>
                          <div v-if="errorMessage" class="error-message text-danger">
                            {{ errorMessage }}
                          </div>
                      </div>
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <div class="form-group">
                  <label for="Observation">Observation</label>
                  <textarea id="observation" v-model="priseencharge.observation" class="form-control" type="text"
                    placeholder="Donnez une observation"></textarea>
                </div>
              </div>

               <div class="d-flex justify-content-between  col-12 flex-row">
        <button type="submit" class="btn btn-success btn-medpay-green  mr-2">
                  Modifier
                </button>
                <button  @click="cancel" class="btn btn-gradient-danger">Modifer</button>
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

export default {
  name: "create-priseencharge",
  props: ["id"],
  data() {
    return {
      selectedCompagnie: "",
      selectedAssurance: "",
      priseencharge: {
        patient_id: "",
        assurance_id: "",
        pourcentage: "",
        numero_assurance: "",
        statut: "privé",
        datedebut: "",
        datefin: "",
        observation: "",
        compagnie_d_assurance_id: "",
      },
      patients: [],
      compagnies: [],
      assurances: [],
      errorMessage: "",
    };
  },
  mounted() {
    PriseEnChargePatientService.getPriseecharges(this.id)
      .then((res) => {
        this.priseencharge = res.data.data;
        this.priseencharge.id = this.id;
        this.selectedCompagnie = this.priseencharge.compagnie_d_assurance_id;
        this.selectedAssurance = this.priseencharge.assurance_id;
        this.getAssurances(this.selectedCompagnie);
        this.getPourcentage(this.selectedAssurance);
      })
      .catch((error) => {
        console.log(error);
      });
    patientService.getAllPatients().then((res) => {
      this.patients = res.data.data;
    });
    compagnieService.getAllCompagnies().then((res) => {
      this.compagnies = res.data.data;
      this.getAss(this.selectedCompagnie);
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
    update(event) {
      event.preventDefault();
      const selectedDateDebut = new Date(this.priseencharge.datedebut);
      const selectedDateFin = new Date(this.priseencharge.datefin);

      if (selectedDateFin < selectedDateDebut) {
        this.errorMessage = "La date de fin est antérieure à la date de début.";
        return;
      }

      const priseencharge = {
        id: this.id,
        patient_id: this.priseencharge.patient_id,
        assurance_id: this.selectedAssurance,
        compagnie_d_assurance_id: this.selectedCompagnie,
        pourcentage: this.priseencharge.pourcentage, 
        numero_assurance: this.priseencharge.numero_assurance, 
        statut: this.priseencharge.statut,
        datedebut: this.priseencharge.datedebut,
        datefin: this.priseencharge.datefin,
        observation: this.priseencharge.observation,
      };

      PriseEnChargePatientService.updatePriseEnChargePatient(priseencharge)
        .then((response) => {
          console.log("Prise en charge modifiée avec succès !");
          this.$toast.success("Prise en charge modifiée avec succès !", {
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
            "Erreur lors de la modification de la prise en charge :",
            error
          );
        });
    },

    getAss(compagnieId) {
      if (!compagnieId) {
        this.assurances = [];
        return;
      }
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
            this.priseencharge.pourcentage = response.data.pourcentage;
            this.priseencharge.numero_assurance = response.data.numero_assurance;
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        this.priseencharge.pourcentage = null;
        this.priseencharge.numero_assurance = null;
      }
    },
  },
};
</script>

<style scoped>
.error-message {
  font-size: 0.8rem;
}
</style>

<style>
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

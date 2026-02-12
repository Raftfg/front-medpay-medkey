<template>
  <section class="container-scroller">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold"
              >Paramétrage</a
            >
          </li>
          <li class="breadcrumb-item active" aria-current="page">Assurance</li>
          <li
            class="breadcrumb-item active text-success font-weight-bold"
            aria-current="page"
          >
            Ajouter
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <!-- <h4 class="card-title">Ajouter une assurance</h4> -->
            <h3
              class="card-title text-white rounded p-3 mb-5 text-center"
              style="
                background-color: #0b5d3f;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              "
            >
              Ajouter une assurance
            </h3>

            <form @submit="addAssurance" class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="assuranceName"
                    >Nom <span style="color: red">*</span></label
                  >
                  <input
                    v-model="assuranceName"
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.assuranceName,
                    }"
                    type="text"
                    class="form-control"
                    id="assuranceName"
                    placeholder="Nom de l'assurance"
                    @input="clearError('assuranceName')"
                  />
                  <div class="invalid-feedback" v-if="formErrors.assuranceName">
                    {{ formErrors.assuranceName }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="assuranceNumero"
                    >Numéro de l'assurance
                    <span style="color: red">*</span></label
                  >
                  <input
                    v-model="assuranceNumero"
                    type="text"
                    class="form-control"
                    id="assuranceNumero"
                    placeholder="Numero de l'assurance"
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.assuranceNumero,
                    }"
                    @input="clearError('assuranceNumero')"
                  />
                  <div
                    class="invalid-feedback"
                    v-if="formErrors.assuranceNumero"
                  >
                    {{ formErrors.assuranceNumero }}
                  </div>
                  <div v-if="isNumeroTaken" class="error-message">
                    Ce numéro est déjà utilisé. Veuillez saisir un autre numéro.
                  </div>
                </div>
                <div class="form-group">
                  <label for="assurancePourcentage"
                    >Pourcentage <span style="color: red">*</span></label
                  >
                  <input
                    v-model="assurancePourcentage"
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.assurancePourcentage,
                    }"
                    type="number"
                    class="form-control"
                    id="assurancePourcentage"
                    placeholder="Pourcentage d'assurance"
                    min="0"
                    max="100"
                    @input="clearError('assurancePourcentage')"
                  />
                  <div
                    class="invalid-feedback"
                    v-if="formErrors.assurancePourcentage"
                  >
                    {{ formErrors.assurancePourcentage }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="compagnie_d_assurance_id"
                    >Compagnie d'assurance
                    <span style="color: red">*</span></label
                  >
                  <select
                    id="compagnie_d_assurance_id"
                    v-model="compagnie_d_assurance_id"
                    @input="clearError('compagnie_d_assurance_id')"
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.compagnie_d_assurance_id,
                    }"
                    class="form-control"
                  >
                    <option value="">Sélectionnez une compagnie</option>
                    <option
                      v-for="compagnie in compagnies"
                      :value="compagnie.id"
                      :key="compagnie.id"
                    >
                      {{ compagnie.nom }}
                    </option>
                  </select>
                  <div
                    class="invalid-feedback"
                    v-if="formErrors.compagnie_d_assurance_id"
                  >
                    {{ formErrors.compagnie_d_assurance_id }}
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-between col-12 flex-row">
                <button
                  @click="cancel"
                  class="btn btn-secondary btn-medpay-gray"
                >
                  Annuler
                </button>

                <button type="submit" class="btn btn-success btn-medpay-green">
                  Ajouter
                </button>
                <!-- <button @click="cancel"  class="btn btn-secondary btn-medpay-gray ">Annuler</button> -->
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { AssuranceService } from "@/_services/assurances_services.js";
import { compagnieService } from "@/_services/compagnie_services.js";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "create-assurance",

  data() {
    return {
      assuranceName: "",
      assuranceNumero: "",
      assurancePourcentage: "",
      compagnie_d_assurance_id: "",
      compagnies: [],

      formErrors: {
        assurancePourcentage: "",
        compagnie_d_assurance_id: "",
        assuranceName: "",
        assuranceNumero: "",
      },
      isNumeroTaken: false,
    };
  },
  mounted() {
    compagnieService
      .getAllCompagnies()
      .then((res) => {
        this.compagnies = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    // Planifier la tâche cron pour la synchronisation
    cron.schedule("* * * * *", () => {});
  },

  methods: {
    cancel() {
      this.$toast.error("Échec de l'enregistrement !", {
        position: "top-right",
        timeout: 3000,
        style: {
          background: "#ff0000", // Couleur de fond rouge pour l'erreur
          color: "#fff", // Couleur du texte
          fontWeight: "bold",
        },
      });
      this.$router.push("/assurance/list");
    },
    addAssurance(event) {
      this.isNumeroTaken = false;
      event.preventDefault();

      const assurance = {
        nom: this.assuranceName,
        numero_assurance: this.assuranceNumero,
        pourcentage: this.assurancePourcentage,
        compagnie_d_assurance_id: this.compagnie_d_assurance_id,
      };

      let isValid = true;
      this.formErrors = {};

      if (this.assurancePourcentage < 0 || this.assurancePourcentage > 100) {
        this.formErrors.pourcentage =
          "La valeur doit être comprise entre 0 et 100";
        isValid = false;
      }

      if (!this.assurancePourcentage) {
        this.formErrors.assurancePourcentage = "Le pourcentage est requis.";
        isValid = false;
      }
      if (!this.assuranceName) {
        this.formErrors.assuranceName = "Le nom d'assurance est requis.";
        isValid = false;
      }
      if (!this.assuranceNumero) {
        this.formErrors.assuranceNumero = "Le numéro d'assurance est requis.";
        isValid = false;
      }

      if (!this.compagnie_d_assurance_id) {
        this.formErrors.compagnie_d_assurance_id =
          "La compagnie d'assurance est requise.";
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      AssuranceService.addAssurances(assurance)
        .then((response) => {
          console.log("Assurance ajoutée avec succès !");
          console.log(response);
          this.assuranceName = "";
          this.assuranceNumero = "";
          this.assurancePourcentage = "";
          this.compagnie_d_assurance_id = "";
          this.$toast.success("Assurance ajoutée avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
          this.$router.push("/assurance/list");
        })
        .catch((error) => {
          console.error(
            "Erreur lors de l'ajout de l'assurance :",
            error.response.data
          );
          const errors = error.response.data.errors;
          if (errors && errors.numero_assurance) {
            this.isNumeroTaken = true;
          }
        });
    },

    clearError(field) {
      if (field in this.formErrors) {
        this.formErrors[field] = "";
      }
    },
  },
};
</script>

<style scoped>
.error-message {
  color: red;
  font-size: 14px;
  margin-top: 5px;
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

input[type="radio"].demo6 + label {
  position: relative;
  padding-left: 1.3rem;
}

input[type="radio"].demo6 + label::before,
input[type="radio"].demo6 + label::after {
  display: block;
  position: absolute;
  box-sizing: border-box;
  content: "";
  border-radius: 1rem;
}

input[type="radio"].demo6 + label::before {
  bottom: 0;
  left: 0;
  border: 1px solid #ccc;
  background-color: #eee;
  width: 1rem;
  height: 1rem;
}

input[type="radio"].demo6 + label::after {
  bottom: 3px;
  left: 3px;
  width: calc(1rem - 6px);
  height: calc(1rem - 6px);
}

input[type="radio"].demo6:checked + label::after {
  background-color: #45c28e;
}

input[type="checkbox"].demo2 {
  display: none;
}

input[type="checkbox"].demo2 + label::before {
  content: "";
  border: 1px solid #45c28e;
  padding: 0 0.6rem;
  margin-right: 0.3rem;
}

input[type="checkbox"].demo2:checked + label::before {
  background-color: #45c28e;
}
</style>

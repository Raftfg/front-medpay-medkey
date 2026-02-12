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
            <h4 class="card-title">Ajouter une assurance</h4>

            <form @submit="addAssurance" class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="assuranceName">Nom :</label>
                  <input
                    v-model="assuranceName"
                    type="text"
                    class="form-control"
                    id="assuranceName"
                    placeholder="Nom de l'assurance"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="assurancePercentage">Pourcentage:</label>
                  <input
                    v-model="assurancePourcentage"
                    type="number"
                    class="form-control"
                    id="assurancePercentage"
                    placeholder="Pourcentage d'assurance"  min="0" max="100"
                    required
                  />
                  <span v-if="numberError" class="error-message">{{ numberError }}</span>

                </div>
                <div class="form-group">
                  <label for="compagnie_d_assurance_id"
                    >Compagnie d'assurance :</label
                  >
                  <select
                    id="compagnie_d_assurance_id"
                    v-model="compagnie_d_assurance_id"
                    class="form-control"
                    required
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
                </div>
              </div>

               <div class="d-flex justify-content-between  col-12 flex-row">
        <button type="submit" class="btn btn-success btn-medpay-green  mr-2">
                  Ajouter
                </button>
                <button class="btn btn-gradient-danger">Cancel</button>
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
      assurancePourcentage: "",
      compagnie_d_assurance_id: "",
      compagnies: [],
      numberError: '',

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
  },

  methods: {
    addAssurance(event) {
      
      event.preventDefault();

      const assurance = {
        nom: this.assuranceName,
        pourcentage: this.assurancePourcentage,
        compagnie_d_assurance_id: this.compagnie_d_assurance_id,
      };
      console.log("Valeurs entrées par l'utilisateur :", assurance);

      let isValid = true;
      if (this.assurancePourcentage < 0 || this.assurancePourcentage > 100) {
        this.numberError = 'La valeur doit être comprise entre 0 et 100';
        isValid = false;
        return;
      } else {
        isValid = true;
      }

      if (!isValid) {
        return;
      }

      AssuranceService.addAssurances(assurance)
        .then((response) => {
          console.log("Assurance ajoutée avec succès !");
          // Réinitialiser le formulaire ou effectuer d'autres actions nécessaires
          this.assuranceName = "";
          this.assurancePercentage = "";
          this.compagnie_d_assurance_id = "";
          // alert("L'assurance a été ajoutée avec succès.");
          // Rediriger vers la page "compagnie/list"
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
          console.error("Erreur lors de l'ajout de l'assurance :", error);
          // Afficher un message d'erreur ou effectuer d'autres actions nécessaires
        });
    },
  },
};
</script>

<style>
/* Vos styles CSS personnalisés */
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

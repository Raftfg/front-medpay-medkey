<template>
  <section class="container-scroller">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold">Paramétrage</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Assurance</li>
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
            <!-- <h4 class="card-title">Modifier une assurance</h4> -->
            <h3 class="card-title text-white rounded p-3 mb-5 text-center" style="
                  background-color: #0b5d3f;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                ">
              Modifier une assurance
            </h3>
            <form class="forms-sample row" @submit.prevent="update">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="exampleInputUsername1">Nom <span style="color: red">*</span></label>
                  <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Nom"
                    v-model="assurance.nom" />
                </div>
                <div class="form-group">
                  <label for="exampleInputUsername1">Numero d'assurance <span style="color: red">*</span></label>
                  <input type="text" class="form-control" id="exampleInputUsername1" placeholder="Numero d'assurance"
                    v-model="assurance.numero_assurance" />
                  <div v-if="isNumeroTaken" class="error-message">
                    Ce numéro est déjà utilisé. Veuillez saisir un autre numéro.
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Pourcentage <span style="color: red">*</span></label>
                  <input type="numnber" class="form-control" id="exampleInputPassword1" placeholder="Pourcentage"
                    v-model="assurance.pourcentage" />
                </div>
                <div class="form-group">
                  <label for="compagnie_d_assurance_id">Compagnie d'assurance
                    <span style="color: red">*</span></label>
                  <select id="compagnie_d_assurance_id" class="form-control" v-model="assurance.compagnie_d_assurance_id">
                    <option value="">Sélectionnez une compagnie</option>
                    <option v-for="compagnie in compagnies" :value="compagnie.id" :key="compagnie.id">
                      {{ compagnie.nom }}
                    </option>
                  </select>
                </div>
                <div class="d-flex justify-content-between col-12 flex-row">
                  <button @click="cancel" class="btn btn-secondary btn-medpay-gray">
                    Annuler
                  </button>

                  <button type="submit" class="btn btn-success btn-medpay-green">
                    Modifier
                  </button>
                  <!-- <button @click="cancel"  class="btn btn-secondary btn-medpay-gray ">Annuler</button> -->
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { compagnieService, AssuranceService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "update-assurance",
  props: ["id"],
  data() {
    return {
      compagnies: [],
      assurance: {},
      formErrors: {
        numero_assurance: "",
      },
      isNumeroTaken: false,
    };
  },
  mounted() {
    AssuranceService.getAssurances(this.id)
      .then((res) => {
        this.assurance = res.data.data;
        this.assurance.id = this.id;
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
    update() {
      this.isNumeroTaken = false;
      AssuranceService.updateAssurance(this.assurance)
        .then((res) => {
          console.log(res);
          this.$toast.success("Modification effectuée avec succès !", {
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
            "Erreur lors de la modification de l'assurance :",
            error.response.data
          );
          const errors = error.response.data.errors;
          if (errors && errors.numero_assurance) {
            this.isNumeroTaken = true;
            this.formErrors.numero_assurance = errors.numero_assurance[0];
          }
        });
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

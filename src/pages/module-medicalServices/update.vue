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
          <li class="breadcrumb-item active" aria-current="page">
            Gestion des Actes médicaux
          </li>
          <li
            class="breadcrumb-item active text-success font-weight-bold"
            aria-current="page"
          >
            Modifier
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <!-- <h4 class="card-title">Modifier un acte médical</h4> -->
            <h3
              class="card-title text-white rounded p-3 mb-5 text-center"
              style="
                background-color: #0b5d3f;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              "
            >
              Modifier un acte médical
            </h3>
            <form class="forms-sample row" @submit.prevent="store">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="code"
                    >Code <span style="color: red">*</span></label
                  >
                  <input
                    v-model="act.code"
                    type="text"
                    class="form-control"
                    id="code"
                    placeholder="Code"
                    @input="clearError('act.code')"
                  />
                  <ul v-for="code in errorCode" :key="code">
                    <li class="text-danger">{{ code }}</li>
                  </ul>
                </div>
                <div class="form-group">
                  <label for="name"
                    >Libellé <span style="color: red">*</span></label
                  >
                  <input
                    v-model="act.name"
                    type="text"
                    class="form-control"
                    id="name"
                    placeholder="Consulation"
                    @input="clearError('act.name')"
                  />
                  <ul v-for="name in errorName" :key="name">
                    <li class="text-danger">{{ name }}</li>
                  </ul>
                </div>
                <div class="form-group">
                  <label for="description">Description</label>
                  <input
                    v-model="act.description"
                    type="text"
                    class="form-control"
                    id="description"
                    placeholder="Consulation de ......."
                    @input="clearError('act.description')"
                  />
                  <ul v-for="descri in errorDescription" :key="descri">
                    <li class="text-danger">{{ descri }}</li>
                  </ul>
                </div>
                <div class="form-group">
                  <label for="tarif"
                    >Prix <span style="color: red">*</span></label
                  >
                  <input
                    v-model="act.tarif"
                    type="text"
                    class="form-control"
                    id="tarif"
                    placeholder="25 000"
                    @input="clearError('act.tarif')"
                  />
                  <ul v-for="prix in errorTarif" :key="prix">
                    <li class="text-danger">{{ prix }}</li>
                  </ul>
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
                  Modifier
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
import { POSITION } from "vue-toastification";
import { actsService } from "@/_services";

export default {
  name: "create-actes-medicaux",
  props: ["id"],

  data() {
    return {
      selected: "",
      act: {
        code: "",
        name: "",
        description: "",
        tarif: "",
      },
      wrong: "",
      errorCode: [],
      errorName: [],
      errorDescription: [],
      errorTarif: [],
    };
  },
  mounted() {
    actsService.getActe(this.id).then((res) => {
      this.act = res.data.data;
      this.act.id = this.id;
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
      this.$router.push("/actes-medicaux/list");
    },

    clearError(field) {
      if (field === "act.code") {
        this.errorCode = [];
      } else if (field === "act.name") {
        this.errorName = [];
      } else if (field === "act.description") {
        this.errorDescription = [];
      } else if (field === "act.tarif") {
        this.errorTarif = [];
      }
    },

    store() {
      actsService
        .updateActe(this.act)
        .then((res) => {
          this.$toast.success("Modification effectué avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
          this.$router.push("/actes-medicaux/list");
        })
        .catch((error) => {
          this.$toast.warning("Veuillez remplir tous les champs requis !", {
            position: "top-right",
            timeout: 3000,
            style: {
              borderRadius: "10px",
              background: "#ffc107", // Couleur de fond jaune pour le warning
              color: "#333", // Couleur du texte
              fontWeight: "bold",
            },
          });
          let $faute = error.response.data.errors;
          let size = Object.keys($faute).length;
          this.wrong = size;
          console.log(error.response);

          if (this.wrong > 0) {
            this.errorCode = $faute.code;
            this.errorName = $faute.name;
            this.errorDescription = $faute.description;
            this.errorTarif = $faute.tarif;
            if (
              this.errorCode &&
              this.errorName &&
              this.errorDescription &&
              this.errorTarif
            ) {
              this.$router.push("/actes-medicaux/create");
            }
          }
        });
    },
  },
};
</script>

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

<!-- <template>
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
            Modifier
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Modifier une assurance</h4>
            <form class="forms-sample row" @submit.prevent="update">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="assuranceName">Nom :</label>
                  <input
                    type="text"
                    class="form-control"
                    id="assuranceName"
                    placeholder="Nom"
                    v-model="assurance.nom"
                  />
                </div>
                <div class="form-group">
                  <label for="assurancePourcentage">Pourcentage:</label>
                  <input
                    type="text"
                    class="form-control"
                    id="assurancePourcentage"
                    placeholder="Pourcentage d'assurance"
                    v-model="assurance.pourcentage"
                  />
                </div>
                <div class="form-group">
                  <label for="compagnie_d_assurance_id"
                    >Compagnie d'assurance :</label
                  >
                  <select
                    id="compagnie_d_assurance_id"
                    class="form-control"
                    v-model="assurance.compagnie_d_assurance_id"
                  >
                    <option value="">Sélectionnez une compagnie</option>
                    <option
                      v-for="compagnie in compagnies"
                      :value="compagnie.id"
                    >
                      {{ compagnie.nom }}
                    </option>
                  </select>
                </div>
                <div class="mx-auto">
                  <button type="submit" class="btn btn-success btn-medpay-green mr-2">
                    Modifier
                  </button>
                  <button  class="btn btn-secondary btn-medpay-gray">Cancel</button>
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
import { AssuranceService, compagnieService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "update-assurance",
  props: ["id"],
  data() {
    return {
      assurance: [],
      compagnies: [],
    };
  },
  mounted() {
    AssuranceService.getAssurance(this.id)
      .then((res) => {
        this.assurance = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });

    compagnieService.getAllCompagnies().then((res) => {
      this.compagnies = res.data.data;
    });
  },
  methods: {
    update() {
      AssuranceService.updateAssurance(this.assurance)
        .then((res) => {
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
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script> -->
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
            Modifier
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Modifier une assurance</h4>
            <form class="forms-sample row" @submit.prevent="update">
              <!-- <div class="col-md-12">
                <p v-if="wrong > 0">
                  <b>Merci de corriger vos données</b>
                </p>
              </div> -->
              <div class="col-md-12">
                <div class="form-group">
                  <label for="exampleInputUsername1">Nom</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputUsername1"
                    placeholder="Nom"
                    v-model="assurance.nom"
                  />
                  <!-- <ul v-for="nom in errorNom" :key="nom">
                    <li class="text-danger">{{ nom }}</li>
                  </ul> -->
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Pourcentage</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Cotonou Sainte Rita C/574 M/DeGaules"
                    v-model="assurance.pourcentage"
                  />
                </div>
                <div class="form-group">
                  <label for="compagnie_d_assurance_id"
                    >Compagnie d'assurance :</label
                  >
                  <select
                    id="compagnie_d_assurance_id"
                    class="form-control"
                    v-model="assurance.compagnie_d_assurance_id"
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
                <div class="mx-auto">
                  <button  class="btn btn-secondary btn-medpay-gray">Cancel</button>

                  <button type="submit" class="btn btn-success btn-medpay-green mr-2">
                    Modifier
                  </button>
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
// import "@/assets/vendors/mdi/css/materialdesignicons.min.css";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "update-compagnie",
  props: ["id"],
  data() {
    return {
      compagnies: [],
      // assurance: [],
      assurance: {},
    };
  },
  mounted() {
    AssuranceService.getAssurances(this.id).then((res) => {
      this.assurance = res.data.data;
      this.assurance.id = this.id;
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
    update() {
      AssuranceService.updateAssurance(this.assurance)
        .then((res) => {
          console.log(res);
          this.$toast.success("Modification effctuée avec succès !", {
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
        .catch((err) => {
          this.$toast.success("Attention, merci !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
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

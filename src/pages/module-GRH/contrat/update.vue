<template>
  <section class="container-scroller">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold"
              >Tableau de board
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Gestion des employers
          </li>
          <li
            class="breadcrumb-item active text-success font-weight-bold"
            aria-current="page"
          >
            Modification
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <!-- <h4 class="card-title">Modifier un employer</h4> -->

            <h3
              class="card-title text-white rounded p-3 mb-5 text-center"
              style="
                background-color: #0b5d3f;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              "
            >
              Modifier un employer
            </h3>

            <form class="forms-sample row" @submit.prevent="update">
              <div class="col-md-12">
                <p v-if="wrong > 0">
                  <b>Merci de corriger vos données</b>
                </p>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="exampleInputUsername1"
                    >Nom <span style="color: red">*</span></label
                  >
                  <input
                    :class="{ 'is-invalid': formErrors.errorLastname }"
                    @input="formErrors.errorLastname = false"
                    type="text"
                    class="form-control"
                    id="exampleInputUsername1"
                    style="text-transform: uppercase"
                    placeholder="Nom"
                    v-model="employer.last_name"
                  />
                  <div class="invalid-feedback" v-if="formErrors.errorLastname">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputUsername1"
                    >Prénom(s) <span style="color: red">*</span></label
                  >
                  <input
                    :class="{ 'is-invalid': formErrors.errorFistname }"
                    @input="formErrors.errorFistname = false"
                    type="text"
                    class="form-control"
                    style="text-transform: capitalize"
                    id="exampleInputUsername1"
                    placeholder="Prénom"
                    v-model="employer.first_name"
                  />
                  <div class="invalid-feedback" v-if="formErrors.errorFistname">
                    Ce champs est requis
                  </div>
                </div>
               
                <div class="form-group">
                  <label for="exampleInputConfirmPassword1"
                    >Téléphone <span style="color: red">*</span></label
                  >
                  <input
                    :class="{ 'is-invalid': formErrors.errorPhone }"
                    @input="formErrors.errorPhone = false"
                    type="text"
                    class="form-control"
                    id="exampleInputConfirmPassword1"
                    placeholder="90098989"
                    v-model="employer.phone_number"
                  />
                  <div class="invalid-feedback" v-if="formErrors.errorPhone">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1"
                    >Adresse <span style="color: red">*</span></label
                  >
                  <input
                    :class="{ 'is-invalid': formErrors.errorAddress }"
                    @input="formErrors.errorAddress = false"
                    type="text"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Cotonou Sainte Rita C/574 M/DeGaules"
                    v-model="employer.address"
                  />
                  <div class="invalid-feedback" v-if="formErrors.errorAddress">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1"
                    >Email <span style="color: red">*</span></label
                  >
                  <input
                    :class="{ 'is-invalid': formErrors.errorEmail }"
                    type="email"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="xyz@example.com"
                    v-model="employer.email"
                  />
                  <div class="invalid-feedback" v-if="formErrors.errorEmail">
                    {{ formErrors.errorEmail }}
                  </div>
                </div>
              </div>

              <div class="col-md-6">
               
                <div class="form-group">
                  <label for="exampleInputConfirmPassword1"
                    >Date de naissance <span style="color: red">*</span></label
                  >
                  <input
                    :class="{ 'is-invalid': formErrors.errorNaissance }"
                    @input="formErrors.errorNaissance = false"
                    type="date"
                    class="form-control"
                    id="exampleInputConfirmPassword1"
                    placeholder=""
                    v-model="employer.date_birth"
                  />
                  <div class="invalid-feedback" v-if="formErrors.errorNaissance">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputConfirmPassword1"
                    >Date d'embauche <span style="color: red">*</span></label
                  >
                  <input
                    :class="{ 'is-invalid': formErrors.errorEmbauche }"
                    @input="formErrors.errorEmbauche = false"
                    type="date"
                    class="form-control"
                    id="exampleInputConfirmPassword1"
                    placeholder=""
                    v-model="employer.hire_date"
                  />
                  <div class="invalid-feedback" v-if="formErrors.errorEmbauche">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputConfirmPassword1"
                    >Date de fin de contrat<span style="color: red">*</span></label
                  >
                  <input
                    :class="{ 'is-invalid': formErrors.errorFinContrat }"
                    @input="formErrors.errorFinContrat = false"
                    type="date"
                    class="form-control"
                    id="exampleInputConfirmPassword1"
                    placeholder=""
                    v-model="employer.termination_date"
                  />
                  <div class="invalid-feedback" v-if="formErrors.errorFinContrat">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputConfirmPassword1"
                    >Statut de l'employer <span style="color: red">*</span></label
                  >
                  <input
                    :class="{ 'is-invalid': formErrors.errorStatut }"
                    @input="formErrors.errorStatut = false"
                    type="text"
                    class="form-control"
                    id="exampleInputConfirmPassword1"
                    placeholder=""
                    v-model="employer.employment_status"
                  />
                  <div class="invalid-feedback" v-if="formErrors.errorStatut">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputConfirmPassword1"
                    >Numéro de Sécurité Social <span style="color: red">*</span></label
                  >
                  <input
                    :class="{ 'is-invalid': formErrors.errorSecurite }"
                    @input="formErrors.errorSecurite = false"
                    type="text"
                    class="form-control"
                    id="exampleInputConfirmPassword1"
                    placeholder=""
                    v-model="employer.social_security_number"
                  />
                  <div class="invalid-feedback" v-if="formErrors.errorSecurite">
                    Ce champs est requis
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

                <button
                  type="submit"
                  class="btn btn-success btn-medpay-green mr-2"
                >
                  Modifier
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
import { employerService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";
import "@/assets/vendors/mdi/css/materialdesignicons.min.css";

export default {
  name: "create-employer",
  props: ["uuid"],
  data() {
    return {
      selected: "",

      employer: {
        last_name: "",
        first_name: "",
        address: "",
        phone_number: "",
        email: "",
        employment_status:"",
        social_security_number: "",
        date_birth: "",
        termination_date: "",
        hire_date: "",
       
      },
      wrong: "",
      formErrors: {
        errorLastname: "",
        errorFistname: "",
        errorAddress: "",
        errorPhone: "",
        errorEmail: "",
        errorSecurite: "",
        errorNaissance: "",
        errorEmbauche: "",
        errorFinContrat: "",
        errorStatut: "",

      },
    };
  },
  mounted() {
    employerService.getEmployer(this.uuid).then((res) => {
      this.employer = res.data.data;
      this.employer.uuid = this.uuid;
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
      this.$router.push("/grh/list");
    },

    update() {
      let isValid = true;

      this.formErrors = {};
      this.formErrors.errorLastname = false;
      this.formErrors.errorFistname = false;
      this.formErrors.errorAge = false;
      this.formErrors.errorEmail = false;
      this.formErrors.errorAddress = false;
      this.formErrors.errorPhone = false;
      this.formErrors.errorNaissance = false;

      if (!this.employer.last_name) {
        this.formErrors.errorLastname = true;

        isValid = false;
      }

      if (!this.employer.first_name) {
        this.formErrors.errorFistname = true;
        isValid = false;
      }

      if (!this.employer.date_birth) {
        this.formErrors.errorNaissance = true;
        isValid = false;
      }

      if (!this.employer.email) {
        this.formErrors.errorEmail = true;
        isValid = false;
      }
      if (!this.employer.employment_status) {
        this.formErrors.errorStatut = true;
        isValid = false;
      }
      if (!this.employer.termination_date) {
        this.formErrors.errorFinContrat = true;
        isValid = false;
      }
      if (!this.employer.hire_date) {
        this.formErrors.errorEmbauche = true;
        isValid = false;
      }


      if (!this.employer.address) {
        this.formErrors.errorAddress = true;
        this.isValid = false;
      }

      if (!this.employer.phone_number) {
        this.formErrors.errorPhone = true;
        this.isValid = false;
      }

      if (!this.employer.social_security_number) {
        this.formErrors.errorSecurite = true;
        this.isValid = false;
      }

      if (!isValid) {
        return;
      }

      if (!/^\d{8,}$/.test(this.employer.phone_number)) {
        this.$toast.error(
          "Le Numéro de téléphone est invalide ! Veuillez entrer au moins 8 chiffre",
          {
            position: "top-right",
            timeout: 3000,
            style: {
              background: "#ff0000", // Couleur de fond rouge pour l'erreur
              color: "#fff", // Couleur du texte
              fontWeight: "bold",
            },
          }
        );
        this.formErrors.errorPhone = true;
        return;
      }

     
      if (
        this.employer.last_name.length > 100 ||
        !/^[a-zA-ZÀ-ÿ\s]{2,}$/.test(this.employer.last_name)
      ) {
        this.$toast.error(
          "Le nom est invalide ! Veuillez entrer au moins deux et au plus 50 caractères alphanumérique .",
          {
            position: "top-right",
            timeout: 3000,
            style: {
              background: "#ff0000", // Couleur de fond rouge pour l'erreur
              color: "#fff", // Couleur du texte
              fontWeight: "bold",
            },
          }
        );
        this.formErrors.errorLastname = true;
        return;
      }

      if (!/^[a-zA-ZÀ-ÿ\s]{2,}$/.test(this.employer.first_name)) {
        this.$toast.error(
          "Le prénom est invalide !  Veuillez entrer au moins deux et au plus 100 caractères alphanumérique.",
          {
            position: "top-right",
            timeout: 3000,
            style: {
              background: "#ff0000", // Couleur de fond rouge pour l'erreur
              color: "#fff", // Couleur du texte
              fontWeight: "bold",
            },
          }
        );
        this.formErrors.errorFistname = true;
        return;
      }

      employerService
        .updateEmployer(this.employer)
        .then((res) => {
          this.$toast.success("Modification effectuée avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#0000ff",
              color: "#333",
              fontWeight: "bold",
            },
          });
          this.$router.push("/grh/list");
        })
        .catch((err) => {
         
          let isValid = true;

          this.formErrors = {};

          if (!this.employer.last_name) {
            this.formErrors.errorLastname = "Le nom de l' employer est requis";
            isValid = false;
          }

          if (!this.employer.first_name) {
            this.formErrors.errorFistname = "Le prenom de l'employer est requis.";
            isValid = false;
          }

          if (!this.employer.email) {
            this.formErrors.errorEmail =
              "L'adresse mail de l'employer est requise.";
            isValid = false;
          }
          if (!this.employer.employment_status) {
            this.formErrors.errorStatut =
              "Le statut de l'employer est requise.";
            isValid = false;
          }
          if (!this.employer.termination_date) {
            this.formErrors.errorFinContrat =
              "La date de fin de contrat de l'employer est requise.";
            isValid = false;
          }
          if (!this.employer.address) {
            this.formErrors.errorAddress = "L'adresse de l'employer est requise.";
            this.isValid = false;
          }

          if (!this.employer.phone_number) {
            this.formErrors.errorPhone =
              "Le numéro de téléphone de l'employer est requis.";
            this.isValid = false;
          }

          if (!this.employer.social_security_number) {
            this.formErrors.errorSecurite =
              "Le numéro de sécurité social de l'employer est requis.";
            this.isValid = false;
          }

          if (!this.employer.date_birth) {
            this.formErrors.errorNaissance =
              "Veuillez renseigner la date de naissance de l'employer.";
            this.isValid = false;
          }

          if (!this.employer.hire_date) {
            this.formErrors.errorEmbauche =
              "Veuillez renseigner la date d'embauche de l'employer.";
            this.isValid = false;
          }

          if (!isValid) {
            return;
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

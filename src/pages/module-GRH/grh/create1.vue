<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-12 grid-margin">
        <div class="card"></div>
      </div>
    </div>
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold">Tableau de board
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Gestion des employers
          </li>
          <li class="breadcrumb-item active text-success font-weight-bold" aria-current="page">
            Ajouter
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <!-- <h4 class="card-title">Ajouter un employer</h4> -->
            <h3
              class="card-title text-white rounded p-3 mb-5 text-center"
              style="
                background-color: #0B5D3F;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              "
            >
            Ajouter un employer
            </h3>
            <form class="forms-sample row" @submit.prevent="store">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="exampleInputUsername1">Nom <span style="color: red">*</span></label>
                  <input :class="{ 'is-invalid': formErrors.errorNom }" @input="formErrors.errorNom = false" type="text"
                    class="form-control" id="exampleInputUsername1" style="text-transform: uppercase" placeholder="Nom"
                    v-model="employer.last_name" />
                  <div class="invalid-feedback" v-if="formErrors.errorNom">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputUsername1">Prénom(s) <span style="color: red">*</span></label>
                  <input :class="{ 'is-invalid': formErrors.errorPrenom }" type="text"
                    @input="formErrors.errorPrenom = false" style="text-transform: capitalize" class="form-control"
                    id="exampleInputUsername1" placeholder="Prénom" v-model="employer.first_name" />
                  <div class="invalid-feedback" v-if="formErrors.errorPrenom">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Telephone <span style="color: red">*</span></label>
                  <input :class="{ 'is-invalid': formErrors.errorTelephone }" @input="formErrors.errorTelephone = false" type="number"
                    min="1"  class="form-control" id="exampleInputPassword1" placeholder="+229 xxxxxx"
                    v-model="employer.phone_number" />
                  <div class="invalid-feedback" v-if="formErrors.errorTelephone">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Adresse <span style="color: red">*</span></label>
                  <input :class="{ 'is-invalid': formErrors.errorAdresse }" @input="formErrors.errorAdresse = false"
                    type="text" class="form-control" id="exampleInputPassword1"
                    placeholder="Cotonou Sainte Rita C/574 M/DeGaules" v-model="employer.address" />
                  <div class="invalid-feedback" v-if="formErrors.errorAdresse">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Email <span style="color: red">*</span></label>
                  <input :class="{ 'is-invalid': formErrors.errorEmail }" @input="formErrors.errorEmail = false"
                    type="email" class="form-control" id="exampleInputPassword1" placeholder="xyz@example.com"
                    v-model="employer.email" />
                  <div class="invalid-feedback" v-if="formErrors.errorEmail">
                    Ce champs est requis
                  </div>
                </div>
               
              </div>

              <div class="col-md-6">
              
               
                <div class="form-group">
                  <label for="exampleInputPassword1">Date de naissance <span style="color: red">*</span></label>
                  <input :class="{ 'is-invalid': formErrors.errorNaissance }" @input="formErrors.errorNaissance = false"
                    type="date" class="form-control" id="exampleInputPassword1"
                    placeholder="" v-model="employer.date_birth" />
                  <div class="invalid-feedback" v-if="formErrors.errorNaissance">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Date d'embauche <span style="color: red">*</span></label>
                  <input :class="{ 'is-invalid': formErrors.errorEmbauche }" @input="formErrors.errorEmbauche = false"
                    type="date" class="form-control" id="exampleInputPassword1"
                    placeholder="" v-model="employer.hire_date" />
                  <div class="invalid-feedback" v-if="formErrors.errorEmbauche">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Date de fin de contrat <span style="color: red">*</span></label>
                  <input :class="{ 'is-invalid': formErrors.errorFinContrat }" @input="formErrors.errorFinContrat = false"
                    type="date" class="form-control" id="exampleInputPassword1"
                    placeholder="" v-model="employer.termination_date" />
                  <div class="invalid-feedback" v-if="formErrors.errorFinContrat">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Statut de l'employer <span style="color: red">*</span></label>
                  <input :class="{ 'is-invalid': formErrors.errorStatut }" @input="formErrors.errorStatut = false"
                    type="text" class="form-control" id="exampleInputPassword1" placeholder=""
                    v-model="employer.employment_status" />
                  <div class="invalid-feedback" v-if="formErrors.errorStatut">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Numéro Sécurité Social <span style="color: red">*</span></label>
                  <input :class="{ 'is-invalid': formErrors.errorSecurite }" @input="formErrors.errorSecurite = false"
                    type="number" class="form-control" id="exampleInputPassword1" placeholder=""
                    v-model="employer.social_security_number" />
                  <div class="invalid-feedback" v-if="formErrors.errorSecurite">
                    Ce champs est requis
                  </div>
                </div>
              </div>

              <div class="d-flex justify-content-between  col-12 flex-row">
                <button @click="cancel" class="btn btn-danger btn-medpay-gray">Annuler</button>

                <button type="submit" class="btn btn-success btn-medpay-green mr-2">
                  Ajouter
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

export default {
  name: "create-employer",
  data() {
    return {
      selected: "",
      employer: {
        last_name: "",
        first_name: "",
        phone_number: "",
        address: "",
        hire_date: "",
        email: "",
        date_birth: "",
        social_security_number: "",
        employment_status: "",
        termination_date: "",
      },
      formErrors: {
        errorNom: "",
        errorPrenom: "",
        errorNaissance: "",
        errorTelephone: "",
        errorAdresse: "",
        errorEmbauche: "",
        errorEmail: "",
        errorSecurite: "",
        errorStatut: "",
        errorFinContrat: "",
      },
      wrong: "",
    };
  },

  mounted() {
    
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

    store() {
      let isValid = true;

      this.formErrors = {};
      this.formErrors.errorNom = false;
      this.formErrors.errorPrenom = false;
      this.formErrors.errorNaissance = false;
      this.formErrors.errorTelephone = false;
      this.formErrors.errorEmail = false;
      this.formErrors.errorSecurite = false;
      this.formErrors.errorStatut = false;
      this.formErrors.errorFinContrat = false;
      this.formErrors.errorAdresse = false;
      this.formErrors.errorEmbauche = false;

      if (!this.employer.last_name) {
        this.formErrors.errorNom = true;

        isValid = false;
      }

      if (!this.employer.first_name) {
        this.formErrors.errorPrenom = true;
        isValid = false;
      }
      if (!this.employer.date_birth) {
        this.formErrors.errorNaissance = true;
        isValid = false;
      }
      if (!this.employer.phone_number) {
        this.formErrors.errorTelephone = true;
        isValid = false;
      }

      if (!this.employer.email) {
        this.formErrors.errorEmail = true;
        isValid = false;
      }
      if (!this.employer.social_security_number) {
        this.formErrors.errorSecurite = true;
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

      if (!this.employer.address) {
        this.formErrors.errorAdresse = true;
        this.isValid = false;
      }
      if (!this.employer.hire_date) {
        this.formErrors.errorEmbauche = true;
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
        this.formErrors.errorTelephone = true;
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
        this.formErrors.errorNom = true;
        return;
      }

      // if (!/^[a-zA-Z]{2,}$/.test(this.employer.first_name)) {

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
        this.formErrors.errorPrenom = true;
        return;
      }

    

      employerService
        .addEmployers(this.employer)
        .then((res) => {
          this.$toast.success("Enregistrement effectué avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
          this.$router.push("/grh/list");
        })
        .catch((err) => {
          if (
            err.response &&
            err.response.status === 422 &&
            err.response.data.errors
          ) {
            const errors = err.response.data.errors;

            if (errors.phone_number) {
              this.$toast.error("Le numéro de téléphone est déjà pris.", {
                position: POSITION.TOP_RIGHT,
                timeout: 3000,
                bodyStyle: {
                  borderRadius: "10px",
                  backgroundColor: "#ff0000",
                  color: "#fff",
                  fontWeight: "bold",
                },
              });
              this.formErrors.errorTelephone = true;
            }

            if (errors.email) {
              this.$toast.error("Cette adresse email est déjà utilisée..", {
                position: POSITION.TOP_RIGHT,
                timeout: 3000,
                bodyStyle: {
                  borderRadius: "10px",
                  backgroundColor: "#ff0000",
                  color: "#fff",
                  fontWeight: "bold",
                },
              });
              this.formErrors.errorEmail = true;
            }

          } else {
            console.log(err);
          }
        });
    },
    

   

   
  },
};
</script>
<!-- <script src="@/assets/js/toastDemo.js"></script> -->

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

.btn-medpay-gray{
  border: 3px solid #a00808 !important; /* Rouge en utilisant le code hexadécimal #FF0000 */
  background-color:#a00808  ;
}
</style>

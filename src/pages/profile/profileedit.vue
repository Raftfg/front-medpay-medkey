<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-3 text-center"
              style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); ">
              Modification des informations de base
            </h3>
            <form @submit.prevent="update" class="forms-sample">
              <fieldset>
                <legend></legend>
                <div class="row">
                  <div class="col-md-3">
                    <div class="form-group">
                      <label for="name">Nom <span style="color: red">*</span></label>
                      <input type="text" v-model="user.name" class="form-control" id="name" placeholder="Nom"
                        @input="clearError('name')" />
                      <small class="text-danger" v-if="nameError">{{
                        nameError
                      }}</small>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label for="prenom">Prénom(s) <span style="color: red">*</span></label>
                      <input type="text" v-model="user.prenom" class="form-control" id="prenom" placeholder="Prénom"
                        @input="clearError('prenom')" />
                      <small class="text-danger" v-if="prenomError">{{
                        prenomError
                      }}</small>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label for="email">Email <span style="color: red">*</span></label>
                      <input type="email" v-model="user.email" class="form-control" id="email"
                        placeholder="xyz@example.com" @input="clearError('email')" />
                      <small class="text-danger" v-if="emailError">{{
                        emailError
                      }}</small>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group">
                      <label for="telephone">Téléphone</label>
                      <input type="text" v-model="user.telephone" class="form-control" id="telephone"
                        placeholder="98909776" />

                      <!-- <small class="text-danger" v-if="telephoneError">{{
                        telephoneError
                      }}</small> -->
                    </div>
                  </div>
                </div>
                <div class="row">

                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="adresse">Adresse </label>
                      <input type="text" v-model="user.adresse" class="form-control" id="adresse"
                        placeholder="Cotonou Sainte Rita C/574 M/DeGaules" />

                      <!-- <small class="text-danger" v-if="adresseError">{{
                        adresseError
                      }}</small> -->
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="idcentre">Sexe <span style="color: red">*</span></label>
                      <select id="idcentre" v-model="user.sexe" class="form-control" @input="clearError('sexe')">
                        <option value="">Sélectionnez votre sexe</option>
                        <option value="Masculin">Masculin</option>
                        <option value="Féminin">Féminin</option>
                      </select>
                      <small class="text-danger" v-if="sexeError">{{
                        sexeError
                      }}</small>
                    </div>
                  </div>
                </div>
              </fieldset>
              <div class="d-flex justify-content-between col-12 flex-row mt-3">
                <button @click="cancel" class="btn btn-danger btn-medpay-gray">
                  Annuler
                </button>
                <button type="submit" class="btn btn-success btn-medpay-green">
                  Enregistrer
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
import { LoginService } from "@/_services";
import { roleService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";
export default {
  name: "update",
  props: ["uuid"],
  data() {
    return {
      user: {
        name: "",
        sexe: "",
        adresse: "",
        email: "",
        telephone: "",
        password: "",
        prenom: "",
      },
      role_id: "",
      selectedRole: "",
      roles: [],
      role: {},
      nameError: "",
      prenomError: "",
      emailError: "",
      telephoneError: "",
      adresseError: "",
      role_idError: "",
      passwordError: "",
      sexeError: "",
      users: [],
    };
  },
  mounted() {
    LoginService.getUser(this.uuid)
      .then((res) => {
        this.user = res.data.data;
        this.user.uuid = this.uuid;
        // this.user = { ...this.user, ...res.data.data, uuid: this.uuid };
      })
      .catch((error) => {
        console.log(error);
      });
    LoginService.getAllUsers().then((res) => {
      this.users = res.data.data;
    });
    const uuid = this.uuid;
    // Utilisez la fonction getUserRoleUUID du service utilisateur
    LoginService.getUserRoleUUID(uuid)
      .then(response => {
        const roleUUID = response.data.role_uuid;
        // Affectez le rôle à la propriété role_id
        this.role_id = roleUUID;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du rôle:', error);
      });
  },
  methods: {
    cancel() {
      this.$router.push("/profile/list");
    },

    update() {
      // Validate form fields before submitting
      if (this.validateForm()) {
        this.user.role_id = this.role_id;
        console.log(this.user);

        // Enregistrez les données du patient dans la table "patients"
        LoginService.updateUser(this.user).then((response) => {
          console.log("Résultat de l'ajout du user :", response);

          // // Mise à jour du localStorage après la modification
          const updatedUser = response.data.data;
          console.log(updatedUser);
          localStorage.setItem("user", JSON.stringify(updatedUser));

          this.$toast.success("Utilisateur modifié avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });

          this.$router.push("/profile/list");

        });
      }
    },


    validateForm() {
      // Perform validation for each field
      let isValid = true;

      // if (!this.user.name || /\d/.test(this.user.name)) {
      //   this.nameError = "Le nom est obligatoire et ne doit pas contenir de chiffres.";
      //   isValid = false;
      // }
      const cleanedName = this.user.name.replace(/[0-9]/g, '');
      if (!cleanedName.trim()) {
        this.nameError = "Le nom est obligatoire et ne doit pas contenir de chiffres.";
        isValid = false;
      } else {
        this.nameError = "";
      }

      const cleanedPrenom = this.user.prenom.replace(/[0-9]/g, '');
      if (!cleanedPrenom.trim()) {
        this.prenomError = "Le prénom est obligatoire et ne doit pas contenir de chiffres.";
        isValid = false;
      } else {
        this.prenomError = "";
      }

      if (!this.user.email) {
        this.emailError = "Le mail est obligatoire.";
        isValid = false;
      } else {
        this.emailError = "";
      }
      if (!this.role_id) {
        this.role_idError = "Le rôle est obligatoire.";
        isValid = false;
      } else {
        this.role_idError = "";
      }
      if (!this.user.sexe) {
        this.sexeError = "Le sexe est obligatoire.";
        isValid = false;
      }
      else {
        this.sexeError = "";
      }
      return isValid;
    },
    clearError(field) {
      // For example, assuming your error variables are prefixed with the field name
      this[field + 'Error'] = '';
    },
  },
};
</script>


<style>
.logo-brand {
  display: flex;
  justify-content: space-between;
}


select,
input {
  text-transform: none;
}

.form-control {
  padding: 0px;
}

.card .card-title {
  text-transform: none;
}

.logo-brand img {
  margin-left: 0;
  margin-right: 10px;
}

@media screen and (max-height: 767px) {

  #rc-imageselect,
  .g-recaptcha {
    transform: scale(0.57);
    -webkit-transform: scale(0.67);
    transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
  }
}

.connect {
  font-size: 1.2rem;
  color: #fff;
}

.linked:hover {
  text-decoration: none;
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

<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-3 text-center" style="
                                                  background-color: #0b5d3f;
                                                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                                                ">
              Ajouter un utilisateur
            </h3>
            <form @submit.prevent="addUser" class="forms-sample">
              <fieldset>
                <legend></legend>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="name">Nom <span style="color: red">*</span></label>
                      <input type="text" v-model="name" class="form-control" id="name" placeholder="Nom"
                        @input="clearError('name')" />
                      <small class="text-danger" v-if="nameError">{{
                        nameError
                      }}</small>
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="prenom">Prénom(s) <span style="color: red">*</span></label>
                      <input type="text" v-model="prenom" class="form-control" id="prenom" placeholder="Prénom"  @input="clearError('prenom')" />
                  <small class="text-danger" v-if="prenomError">{{
                    prenomError
                  }}</small> 
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="email">Email</label>
                      <input type="email" v-model="email" class="form-control" id="email" placeholder="xyz@example.com" @input="clearError('email')" />
                  <small class="text-danger" v-if="emailError">{{
                    emailError
                  }}</small>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="telephone">Téléphone</label>
                      <input type="text" v-model="telephone" class="form-control" id="telephone" placeholder="98909776" @input="clearError('telephone')"/>                  
                  <small class="text-danger" v-if="telephoneError">{{
                    telephoneError
                  }}</small> 
                    </div>
                  </div>

                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="adresse">Adresse </label>
                      <input type="text" v-model="adresse" class="form-control" id="adresse"
                        placeholder="Cotonou Sainte Rita C/574 M/DeGaules" @input="clearError('adresse')" />
                  <small class="text-danger" v-if="adresseError">{{
                    adresseError
                  }}</small>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label for="idcentre">Sexe <span style="color: red">*</span></label>
                      <select id="idcentre" v-model="sexe" class="form-control">
                        <option value="">Sélectionnez votre sexe</option>
                        <option value="Masculin">Masculin</option>
                        <option value="Féminin">Féminin</option>
                      </select>
                      <!-- <small class="text-danger" v-if="idcentreError">{{
                    idcentreError
                     }}</small> -->
                    </div>
                  </div>

                </div>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="role">Rôle <span style="color: red">*</span></label>
                      <select v-model="selectedRole" class="form-control">
                        <option value="">Sélectionnez un rôle</option>
                        <option v-for="role in roles" :key="role.uuid" :value="role.uuid">{{ role.name }}</option>
                      </select>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group">
                      <label for="password">Mot de passe <span style="color: red">*</span></label>
                      <input type="password" v-model="password" @blur="validatePassword" class="form-control"
                        id="password" placeholder="........." />
                      <!-- @input="clearError('password')"
                  <small class="text-danger" v-if="passwordError">{{
                    passwordError
                  }}</small> -->
                    </div>
                  </div>
                </div>
              </fieldset>
              <div class="d-flex justify-content-between col-12 flex-row mt-3">
                <button @click="cancel" class="btn btn-danger btn-medpay-gray">
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
import { LoginService } from "@/_services";
import { roleService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";
export default {
  name: "create-patient",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      // permission: JSON.parse(localStorage.getItem("permission")),
      // role_id: "",
      name: "",
      sexe: "",
      adresse: "",
      email: "",
      telephone: "",
      password: "",
      prenom: "",
      selectedRole: "",
      roles: [],
      role: {},
      passwordError: "",
      nameError: "",
      prenomError: "",
      emailError: "",
      telephoneError: "",
      adresseError: "",
      role_idError: "",
      passwordError: "",
      sexeError: "",
      users: [],
      countUsers: "",
    };
  },
  mounted() {
    roleService
      .getAllRoles()
      .then((res) => {
        console.log(res);
        this.roles = res.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    cancel() {
      this.$toast.error("Enregistrement annulé!", {
        position: "top-right",
        timeout: 3000,
        style: {
          background: "#ff0000", // Couleur de fond rouge pour l'erreur
          color: "#fff", // Couleur du texte
          fontWeight: "bold",
        },
      });
      this.$router.push("/user/list");
    },
    validatePassword() {
      const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordPattern.test(this.password)) {
        this.passwordError =
          "Le mot de passe doit comporter au moins 8 caractères avec une majuscule, une minuscule, un chiffre et un caractère spécial.";
      } else {
        this.passwordError = "";
      }
    },

    handleRoleChange() {
      if (this.role_id === "1") {
        this.idcentre = ""; // Réinitialiser le centre sélectionné si le rôle est admin
        console.log("Role ID sélectionné:", this.role_id); // Affiche le role_id dans la console
      }
    },

    addUser(event) {
      event.preventDefault();
      // Vérification du numéro de téléphone
      const phonePattern = /^\d{8}$/; // Modifiez le motif selon votre format de numéro souhaité
      if (!phonePattern.test(this.telephone)) {
        this.telephoneError =
          "Le numéro de téléphone doit être au format valide (e.g. 62032158).";
        return; // Arrêter l'exécution si le numéro de téléphone est invalide
      } else {
        this.telephoneError = ""; // Réinitialiser l'erreur s'il est valide
      }
      if (this.role_id === 5) {
        const existingDirector = this.users.find(
          (user) => user.role_id === 5 && user.idcentre === this.idcentre
        );

        if (existingDirector) {
          this.$toast.error(
            "Un utilisateur avec le rôle de Directeur existe déjà dans ce centre.",
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
          return; // Stop execution if a director already exists
        }
      }

      const user = {

        role_id: this.role_id,
        name: this.name,
        sexe: this.sexe,
        adresse: this.adresse,
        prenom: this.prenom,
        telephone: this.telephone,
        email: this.email,
        password: this.password,
      };

      this.fetchUsers();

      LoginService.addUser(user)
        .then((response) => {

          if (this.countUsers >= 500) {
            this.$toast.error(
              "La limite d'utilisateurs est atteinte. Vous ne pouvez pas ajouter plus de 5 utilisateurs.",
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
            return; // Arrêter l'exécution de la fonction
          }
          console.log(response.data.data);
          console.log(response.data.data.userCountSameCentre);
          console.log(response.data.data.user);

          console.log("User ajouté avec succès !");
          this.idcentre = "";
          this.role_id = "";
          this.name = "";
          this.sexe = "";
          this.adresse = "";
          this.prenom = "";
          this.telephone = "";
          this.nom_utilisateur = "";
          this.email = "";
          this.password = "";

          this.$toast.success("Utilisateur ajouté avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
          this.$router.push("/user/list");
        })
        .catch((error) => {
          console.error("Erreur lors de l'ajout de l'utilisateur :", error);
          if (error.response && error.response.status === 422) {
            const errorData = error.response.data.errors;
            this.nameError = errorData.name ? errorData.name[0] : "";
            this.prenomError = errorData.prenom ? errorData.prenom[0] : "";
            this.emailError = errorData.email ? errorData.email[0] : "";
            this.nom_utilisateurError = errorData.nom_utilisateur
              ? errorData.nom_utilisateur[0]
              : "";
            this.telephoneError = errorData.telephone
              ? errorData.telephone[0]
              : "";
            this.adresseError = errorData.adresse ? errorData.adresse[0] : "";
            this.idcentreError = errorData.idcentre
              ? errorData.idcentre[0]
              : "";
            this.role_idError = errorData.role_id ? errorData.role_id[0] : "";
            this.passwordError = errorData.password
              ? errorData.password[0]
              : "";
            this.sexeError = errorData.sexe ? errorData.sexe[0] : "";
          } else {
            // Gestion des autres erreurs
          }
        });
    },
    clearError(fieldName) {
      this[fieldName + "Error"] = "";
    },

    fetchUsers() {
      // Appeler l'API pour récupérer la liste des utilisateurs
      LoginService.getAllUsers()
        .then((response) => {
          this.users = response.data.data.user;
          this.countUsers = response.data.data.userCountSameCentre;

          if (this.countUsers >= 500) {
            this.$toast.error(
              "La limite d'utilisateurs est atteinte. Vous ne pouvez pas ajouter plus de 10 utilisateurs.",
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
            return; // Arrêter l'exécution de la fonction
          }
          console.log(response.data.data);
          console.log(response.data.data.userCountSameCentre);
          console.log(response.data.data.user);
        })

        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des utilisateurs :",
            error
          );
        });
    },
  },
};
</script>
<style>
select {
  cursor: pointer;
  /* height: 43px !important; */
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

fieldset {
  /* border: 1px solid #ccc; */

  padding: 10px;

  margin-bottom: 2px;

  border-radius: 5px;

  background-color: #f5f5f5;
  padding: 16px;
}
</style>

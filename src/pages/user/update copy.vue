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
            Utilisateurs
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
            <!-- <h4 class="card-title">Modifier un utilisateur</h4> -->
            <h3
              class="card-title text-white rounded p-3 mb-5 text-center"
              style="
                background-color: #0b5d3f;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              "
            >
              Modifier un utilisateur
            </h3>
            <form @submit.prevent="update" class="forms-sample row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="name"
                    >Nom <span style="color: red">*</span></label
                  >
                  <input
                    type="text"
                    v-model="user.name"
                    class="form-control"
                    id="name"
                    placeholder="Nom"
                    @input="clearError('name')"
                  />
                  <small class="text-danger" v-if="nameError">{{
                    nameError
                  }}</small>
                </div>

                <div class="form-group">
                  <label for="prenom"
                    >Prénom(s) <span style="color: red">*</span></label
                  >
                  <input
                    type="text"
                    v-model="user.prenom"
                    class="form-control"
                    id="prenom"
                    placeholder="Prénom"
                    @input="clearError('prenom')"
                  />
                  <small class="text-danger" v-if="prenomError">{{
                    prenomError
                  }}</small>
                </div>

                <div class="form-group">
                  <label for="email"
                    >Email <span style="color: red">*</span></label
                  >
                  <input
                    type="email"
                    v-model="user.email"
                    class="form-control"
                    id="email"
                    placeholder="xyz@example.com"
                    @input="clearError('email')"
                  />
                  <small class="text-danger" v-if="emailError">{{
                    emailError
                  }}</small>
                </div>
                <div class="form-group">
                  <label for="nom_utilisateur"
                    >Nom d'utilisateur <span style="color: red">*</span></label
                  >
                  <input
                    type="text"
                    v-model="user.nom_utilisateur"
                    class="form-control"
                    id="nom_utilisateur"
                    placeholder="@caissier"
                    @input="clearError('nom_utilisateur')"
                  />
                  <small class="text-danger" v-if="nom_utilisateurError">{{
                    nom_utilisateurError
                  }}</small>
                </div>
                <div class="form-group">
                  <label for="telephone"
                    >Téléphone <span style="color: red">*</span></label
                  >
                  <input
                    type="text"
                    v-model="user.telephone"
                    class="form-control"
                    id="telephone"
                    placeholder="98909776"
                    @input="clearError('telephone')"
                  />
                  <small class="text-danger" v-if="telephoneError">{{
                    telephoneError
                  }}</small>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="adresse"
                    >Adresse <span style="color: red">*</span></label
                  >
                  <input
                    type="text"
                    v-model="user.adresse"
                    class="form-control"
                    id="adresse"
                    placeholder="Cotonou Sainte Rita C/574 M/DeGaules"
                    @input="clearError('adresse')"
                  />
                  <small class="text-danger" v-if="adresseError">{{
                    adresseError
                  }}</small>
                </div>
                <div class="form-group">
                  <label for="idcentre"
                    >Centre Sanitaire <span style="color: red">*</span></label
                  >
                  <select
                    id="idcentre"
                    v-model="user.idcentre"
                    class="form-control"
                    @input="clearError('idcentre')"
                  >
                    <option value="">Sélectionnez un centre sanitaire</option>
                    <option
                      v-for="centre in centres"
                      :value="centre.id"
                      :key="centre.id"
                    >
                      {{ centre.nom }}
                    </option>
                  </select>
                  <small class="text-danger" v-if="idcentreError">{{
                    idcentreError
                  }}</small>
                </div>
                <div class="form-group">
                  <label for="role_id"
                    >Rôle <span style="color: red">*</span></label
                  >
                  <select
                    id="role_id"
                    v-model="user.role_id"
                    class="form-control"
                    @input="clearError('role_id')"
                  >
                    <option value="">Sélectionnez un rôle</option>
                    <option
                      v-for="role in roles"
                      :value="role.id"
                      :key="role.id"
                    >
                      {{ role.name }}
                    </option>
                  </select>
                  <small class="text-danger" v-if="role_idError">{{
                    role_idError
                  }}</small>
                </div>
                <!-- <div class="form-group">
                  <label for="password">Mot de passe</label>
                  <input
                    type="password"
                    v-model="user.password"
                    class="form-control"
                    id="password"
                    placeholder="........."
                  />
                </div> -->
                <div class="form-group">
                  <label for="radio" class=""
                    >Sexe <span style="color: red">*</span></label
                  >
                  <div class="p-2">
                    <input
                      type="radio"
                      v-model="user.sexe"
                      class="demo6 mx-auto form-check-input"
                      id="demo6-a"
                      value="Féminin"
                    />
                    <label for="demo6-a" class="mx-auto" style="font-size: 1rem"
                      >Féminin</label
                    >
                    <input
                      type="radio"
                      v-model="user.sexe"
                      class="demo6 mx-auto form-check-input"
                      id="demo6-b"
                      value="Masculin"
                    />
                    <label for="demo6-b" class="mx-3" style="font-size: 1rem"
                      >Masculin</label
                    >
                    <!-- John12@a -->
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
import { LoginService } from "@/_services";
import { centreService } from "@/_services";
import { roleService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "update",
  props: ["id"],
  data() {
    return {
      centres: [],
      roles: [],
      user: {
        idcentre: "",
        role_id: "",
        adresse: "",
        sexe: "Féminin",
        name: "",
        telephone: "",
        email: "",
        password: "",
        nom_utilisateur: "",
        prenom: "",
      },
      nameError: "",
      prenomError: "",
      emailError: "",
      telephoneError: "",
      adresseError: "",
      nom_utilisateurError: "",
      idcentreError: "",
      role_idError: "",
      isEmailTaken: false,
      isTelephoneTaken: false,
    };
  },
  mounted() {
    this.fetchUserData();
    this.fetchCentres();
    this.fetchRoles();
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
      this.$router.push("/user/list");
    },

    fetchUserData() {
      LoginService.getUser(this.id)
        .then((res) => {
          this.user = res.data.data;
          this.user.id = this.id;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchCentres() {
      centreService
        .getAllcentres()
        .then((res) => {
          this.centres = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchRoles() {
      roleService
        .getAllRoles()
        .then((res) => {
          this.roles = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    update() {
      // Validation des champs avant la mise à jour
      if (!this.user.name) {
        this.nameError = "Le champ Nom est obligatoire.";
        return;
      } else {
        this.nameError = "";
      }

      if (!this.user.prenom) {
        this.prenomError = "Le champ Prénom est obligatoire.";
        return;
      } else {
        this.prenomError = "";
      }
      if (!this.user.email) {
        this.emailError = "Le champ email est obligatoire.";
        return;
      } else {
        this.emailError = "";
      }
      if (!this.user.telephone) {
        this.telephoneError = "Le champ telephone est obligatoire.";
        return;
      } else {
        this.telephoneError = "";
      }
      if (!this.user.nom_utilisateur) {
        this.nom_utilisateurError = "Le champ nomutilisateur est obligatoire.";
        return;
      } else {
        this.nom_utilisateurError = "";
      }
      if (!this.user.adresse) {
        this.adresseError = "Le champ adresse est obligatoire.";
        return;
      } else {
        this.adresseError = "";
      }
      if (!this.user.role_id) {
        this.role_idErrorError = "Le champ role est obligatoire.";
        return;
      } else {
        this.role_idError = "";
      }
      if (!this.user.idcentre) {
        this.idcentreError = "Le champ centre est obligatoire.";
        return;
      } else {
        this.idcentreError = "";
      }

      // Validation d'unicité et format pour le numéro de téléphone
      const phoneNumberPattern = /^[0-9]{8}$/;
      if (!phoneNumberPattern.test(this.user.telephone)) {
        this.telephoneError =
          "Le numéro de téléphone doit contenir exactement 8 chiffres.";
        return;
      } else {
        this.telephoneError = "";
      }

      LoginService.updateUser(this.user)
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
          this.$router.push("/user/list");
        })
        .catch((err) => {
          const errors = err.response.data.errors;
          if (errors) {
            if (errors.email) {
              this.isEmailTaken = true;
              this.emailError = "Le email est déjà pris.";
            }
            if (errors.telephone) {
              this.isTelephoneTaken = true;
              this.telephoneError = "Ce numéro de téléphone est déjà pris.";
            }
          } else {
            this.$toast.error(
              "Erreur lors de la modification. Veuillez réessayer !",
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
          }
        });
    },
    clearError(fieldName) {
      // Utiliser la méthode clearError pour réinitialiser les messages d'erreur du champ spécifié
      this[fieldName + "Error"] = "";
    },
  },
};
</script>
<!-- <template>
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
            Utilisateurs
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
            <h4 class="card-title">Modifier un utilisateur</h4>
            <form @submit.prevent="update" class="forms-sample row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="name">Nom</label>
                  <input
                    type="text"
                    v-model="user.name"
                    class="form-control"
                    id="name"
                    placeholder="Nom"
                  />
                </div>

                <div class="form-group">
                  <label for="prenom">Prénom(s)</label>
                  <input
                    type="text"
                    v-model="user.prenom"
                    class="form-control"
                    id="prenom"
                    placeholder="Prénom"
                  />
                </div>

                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    v-model="user.email"
                    class="form-control"
                    id="email"
                    placeholder="xyz@example.com"
                  />
                </div>
                <div class="form-group">
                  <label for="nom_utilisateur">Nom d'utilisateur</label>
                  <input
                    type="text"
                    v-model="user.nom_utilisateur"
                    class="form-control"
                    id="nom_utilisateur"
                    placeholder="@caissier"
                  />
                </div>
                <div class="form-group">
                  <label for="telephone">Téléphone</label>
                  <input
                    type="text"
                    v-model="user.telephone"
                    class="form-control"
                    id="telephone"
                    placeholder="98909776"
                  />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label for="adresse">Adresse</label>
                  <input
                    type="text"
                    v-model="user.adresse"
                    class="form-control"
                    id="adresse"
                    placeholder="Cotonou Sainte Rita C/574 M/DeGaules"
                  />
                </div>
                <div class="form-group">
                  <label for="idcentre">Centre Sanitaire:</label>
                  <select
                    id="idcentre"
                    v-model="user.idcentre"
                    class="form-control"
                  >
                    <option value="">Sélectionnez un centre sanitaire</option>
                    <option
                      v-for="centre in centres"
                      :value="centre.id"
                      :key="centre.id"
                    >
                      {{ centre.nom }}
                    </option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="role_id">Rôle:</label>
                  <select
                    id="role_id"
                    v-model="user.role_id"
                    class="form-control"
                  >
                    <option value="">Sélectionnez un rôle</option>
                    <option
                      v-for="role in roles"
                      :value="role.id"
                      :key="role.id"
                    >
                      {{ role.name }}
                    </option>
                  </select>
                </div>
            
                <div class="form-group">
                  <label for="radio" class="">Sexe</label>
                  <div class="p-2">
                    <input
                      type="radio"
                      v-model="user.sexe"
                      class="demo6 mx-auto form-check-input"
                      id="demo6-a"
                      value="Féminin"
                    />
                    <label for="demo6-a" class="mx-auto" style="font-size: 1rem"
                      >Féminin</label
                    >
                    <input
                      type="radio"
                      v-model="user.sexe"
                      class="demo6 mx-auto form-check-input"
                      id="demo6-b"
                      value="Masculin"
                    />
                    <label for="demo6-b" class="mx-3" style="font-size: 1rem"
                      >Masculin</label
                    >
                 
                  </div>
                </div>
              </div>

               <div class="d-flex justify-content-between  col-12 flex-row">
        <button type="submit" class="btn btn-success btn-medpay-green mr-2">
                  Modifier
                </button>
                <button  class="btn btn-secondary btn-medpay-gray">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template> -->

<!-- <script>
import { LoginService } from "@/_services";
import { centreService } from "@/_services";
import { roleService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "update",
  props: ["id"],
  data() {
    return {
      centres: [],
      roles: [],
      user: {
        idcentre: "",
        role_id: "",
        adresse: "",
        sexe: "Féminin",
        name: "",
        telephone: "",
        email: "",
        password: "",
        nom_utilisateur: "",
        prenom: "",
      },
    };
  },
  mounted() {
    this.fetchUserData();
    this.fetchCentres();
    this.fetchRoles();
  },
  methods: {
    fetchUserData() {
      LoginService.getUser(this.id)
        .then((res) => {
          this.user = res.data.data;
          this.user.id = this.id;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchCentres() {
      centreService
        .getAllcentres()
        .then((res) => {
          this.centres = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    fetchRoles() {
      roleService
        .getAllRoles()
        .then((res) => {
          this.roles = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    update() {
      LoginService.updateUser(this.user)
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
          this.$router.push("/user/list");
        })
        .catch((err) => {
          this.$toast.error(
            "Erreur lors de la modification. Veuillez réessayer !",
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
        });
    },
  },
  
};
</script> -->

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

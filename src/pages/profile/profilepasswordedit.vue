<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-3 text-center"
              style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); ">
              Modification de mot de passe
            </h3>
            <form @submit.prevent="changePassword" class="forms-sample">
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="terminalName">Ancien mot de passe<span style="color: red">*</span></label>
                    <input type="password" v-model="user.old_password" class="form-control form-control-lg"
                      placeholder="Ancien mot de passe" aria-label="password" id="exampleInputEmail1"
                      aria-describedby="basic-addon1" />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="terminalEmplacement">Nouveau mot de passe<span style="color: red">*</span></label>
                    <input type="password" v-model="user.new_password" class="form-control form-control-lg"
                      placeholder="Nouveau mot de passe" aria-label="password" id="exampleInputPassword1"
                      aria-describedby="basic-addon2" />
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label for="terminalEmplacement">Confirmer le nouveau mot de passe<span
                        style="color: red">*</span></label>
                    <input type="password" v-model="user.confirm_password" class="form-control form-control-lg"
                      placeholder="Confirmez le mot de passe" aria-label="password" id="exampleInputPassword2"
                      aria-describedby="basic-addon3" />
                  </div>
                </div>
                <div v-if="isPasswordsNotMatching" class="mt-n2 p-2" style="color: red">
                  Les mots de passe ne correspondent pas
                </div>
                <div v-if="isOldPasswordIncorrect" class="mt-n2 p-2" style="color: red">
                  Le mot de passe actuel ou ancien est incorrect
                </div>
                <div v-if="isNewPasswordInvalid" class="mt-n2 p-2" style="color: red">
                  Le mot de passe doit avoir au moins 8 caractères, au moins une
                  lettre majuscule, au moins une lettre minuscule et un
                  caractère spécial.
                </div>
                <div v-if="isSuccess" class="mt-n2 p-2" style="color: green">
                  Mot de passe mis à jour avec succès
                </div>
              </div>

              <div class="d-flex justify-content-between  col-12 flex-row">
                <button type="submit" class="btn btn-success btn-medpay-green mr-2">
                  Enregistrer
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

export default {
  name: "reset",
  data() {
    return {
      user: {
        old_password: "",
        new_password: "",
        confirm_password: "",
      },
      isPasswordsNotMatching: false,
      isOldPasswordIncorrect: false,
      isNewPasswordInvalid: false,
      isSuccess: false,
    };
  },
  methods: {
    changePassword() {
      // Reset error flags before performing validation
      this.isPasswordsNotMatching = false;
      this.isOldPasswordIncorrect = false;
      this.isNewPasswordInvalid = false;
      this.isSuccess = false;

      if (this.user.new_password !== this.user.confirm_password) {
        this.isPasswordsNotMatching = true;
      } else if (
        this.user.new_password.length < 8 ||
        !this.isPasswordValid(this.user.new_password)
      ) {
        this.isNewPasswordInvalid = true;
      } else {
        // Call the service to update the password
        LoginService.updateProfilPas(this.user)
          .then(() => {
            this.isSuccess = true;
          })
          .catch((error) => {
            this.isOldPasswordIncorrect = true;

            console.error(error);
          });
      }
    },
    isPasswordValid(password) {
      // Validate the password against the required criteria
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(password);
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
            <router-link to="/profile/edit"> Informations profil </router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Modifier le mot de passe
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Modifier mon mot de passe</h4>
            <form @submit.prevent="changePassword" class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="terminalName"
                    >Ancien mot de passe<span style="color: red">*</span></label
                  >
                  <input
                    type="password"
                    v-model="user.old_password"
                    class="form-control form-control-lg"
                    placeholder="Ancien mot de passe"
                    aria-label="password"
                    id="exampleInputEmail1"
                    aria-describedby="basic-addon1"
                  />
                </div>
                <div class="form-group">
                  <label for="terminalEmplacement"
                    >Nouveau mot de passe<span style="color: red"
                      >*</span
                    ></label
                  >
                  <input
                    type="password"
                    v-model="user.new_password"
                    class="form-control form-control-lg"
                    placeholder="Nouveau mot de passe"
                    aria-label="password"
                    id="exampleInputPassword1"
                    aria-describedby="basic-addon2"
                  />
                </div>
                <div class="form-group">
                  <label for="terminalEmplacement"
                    >Confirmer le nouveau mot de passe<span style="color: red"
                      >*</span
                    ></label
                  >
                  <input
                    type="password"
                    v-model="user.confirm_password"
                    class="form-control form-control-lg"
                    placeholder="Confirmez le mot de passe"
                    aria-label="password"
                    id="exampleInputPassword2"
                    aria-describedby="basic-addon3"
                  />
                </div>
                <div v-if="isChecked" class="mt-n2 p-2" style="color: red">
                  Les mots de passe ne correspondent pas
                </div>
                <div v-if="isSuccess" class="mt-n2 p-2" style="color: green">
                  Mot de passe mis à jour avec succès
                </div>
                <div v-if="isError" class="mt-n2 p-2" style="color: red">
                  {{ errorMessage }}
                </div>
              </div>

               <div class="d-flex justify-content-between  col-12 flex-row">
        <button type="submit" class="btn btn-success btn-medpay-green mr-2">
                  Enregistrer
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

export default {
  name: "reset",
  data() {
    return {
      user: {
        old_password: "",
        new_password: "",
        confirm_password: "",
      },
      isChecked: false,
      isSuccess: false,
      isError: false,
      errorMessage: "",
    };
  },
  methods: {
    changePassword() {
      if (this.user.new_password !== this.user.confirm_password) {
        this.isChecked = true;
        this.isSuccess = false;
        this.isError = false;
        this.errorMessage = "";
      } else {
        this.isChecked = false;
        this.isError = false;
        this.errorMessage = "";

        LoginService.updateProfilPas(this.user)
          .then(() => {
            this.isSuccess = true;
          })
          .catch((error) => {
            this.isSuccess = false;
            this.isError = true;
            this.errorMessage =
              "Une erreur s'est produite lors de la mise à jour du mot de passe.";
            console.error(error);
          });
      }
    },
  },
};
</script> -->

<style>
.logo-brand {
  display: flex;
  justify-content: space-between;
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
</style>

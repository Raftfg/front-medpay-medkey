<template>
  <section class="login">
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row w-100 flex-grow">
            <div class="col-xl-4 col-lg-6 mx-auto">
              <div class="auth-form-light text-left">
                <center>
                  <div class="brand-logo">
                    <img class="mt-4" src="../../../assets/images/logo.png" />
                  </div>
                </center>
                <form class="pt-3" @submit.prevent="resetPassword">
                  <div class="input-group mb-1 form-group p-3">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text"
                        id="basic-addon1"
                        style="border: 1px solid #afafaf !important"
                        ><i
                          class="mdi mdi-email icon-sm text-dark align-middle"
                        ></i
                      ></span>
                    </div>
                    <input
                      type="email"
                      v-model="user.email"
                      class="form-control form-control-lg"
                      placeholder="Email"
                      aria-label="email"
                      id="exampleInputEmail1"
                      aria-describedby="basic-addon1"
                    />
                  </div>

                  <div class="input-group mb-1 form-group p-3">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text"
                        id="basic-addon2"
                        style="border: 1px solid #afafaf !important"
                        ><i
                          class="mdi mdi-lock icon-sm text-dark align-middle"
                        ></i
                      ></span>
                    </div>
                    <input
                      type="password"
                      v-model="user.password"
                      class="form-control form-control-lg"
                      placeholder="Mot de passe"
                      aria-label="password"
                      id="exampleInputPassword1"
                      aria-describedby="basic-addon2"
                    />
                  </div>

                  <div class="input-group mb-0 form-group p-3">
                    <div class="input-group-prepend">
                      <span
                        class="input-group-text"
                        id="basic-addon3"
                        style="border: 1px solid #afafaf !important"
                        ><i
                          class="mdi mdi-lock icon-sm text-dark align-middle"
                        ></i
                      ></span>
                    </div>
                    <input
                      type="password"
                      v-model="user.password_confirmation"
                      class="form-control form-control-lg"
                      placeholder="Confirmez le mot de passe"
                      aria-label="password"
                      id="exampleInputPassword2"
                      aria-describedby="basic-addon3"
                    />
                  </div>

                  <div v-if="isChecked" class="mt-n2 p-2" style="color: red">
                    Les mots de passe ne sont pas conformes
                  </div>
                  <div v-if="isSuccess" class="mt-n2 p-2" style="color: green">
                    Mot de passe réinitialisé avec succès
                  </div>
                  <div v-if="isError" class="mt-n2 p-2" style="color: red">
                    {{ errorMessage }}
                  </div>

                  <div class="mt-0 mb-0 p-3">
                    <button
                      type="submit"
                      class="connect btn btn-block btn-connexion-green"
                      style="color: #2365ab"
                    >
                      Réinitialiser
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- content-wrapper ends -->
      </div>
      <!-- page-body-wrapper ends -->
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
        email: "",
        password: "",
        password_confirmation: "",
      },
      isChecked: false,
      isSuccess: false,
      isError: false,
      errorMessage: "",
    };
  },
  methods: {
    resetPassword() {
      this.isChecked = false;
      this.isSuccess = false;
      this.isError = false;
      this.errorMessage = "";

      if (this.user.password !== this.user.password_confirmation) {
        this.isChecked = true;
      } else if (!this.validatePassword(this.user.password)) {
        this.isError = true;
        this.errorMessage =
          "Le mot de passe doit avoir au moins 8 caractères, au moins une lettre majuscule, au moins une lettre minuscule et un caractère spécial.";
      } else {
        const requestData = {
          email: this.user.email,
          password: this.user.password,
          password_confirmation: this.user.password_confirmation,
        };

        LoginService.resetPassword(requestData)
          .then(() => {
            this.isSuccess = true;
            setTimeout(() => {
              this.$router.push("/auth-pages/login");
            }, 3000); // Redirection après 3 secondes
          })
          .catch((err) => {
            if (
              err.response.status === 400 &&
              err.response.data.message === "Utilisateur non trouvé"
            ) {
              this.isError = true;
              this.errorMessage = "Utilisateur non trouvé";
            } else {
              // Affichez le message d'erreur approprié
              console.log(err.response.data.message);
            }
          });
      }
    },
    validatePassword(password) {
      // Valider les contraintes du mot de passe
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      return passwordRegex.test(password);
    },
  },
};
</script>

<style>
.logo-brand {
  display: flex;
  justify-content: space-between;
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

.btn-connexion-green {
  border: 3px solid rgb(35, 101, 171) !important;

  box-shadow: none !important;
  font-weight: 700 !important;
  /* font-size: 16px !important; */
  color: white !important;
  background-color: rgb(35, 101, 171);

  /* Ajustez la taille du texte selon vos préférences */
  /* padding: 0.685rem 0.49rem !important; */
}

.btn-connexion-green:hover {
  /* Changez la couleur de fond au survol */
  color: rgb(35, 101, 171) !important;
  background-color: #ffffff !important;
  /* Par exemple, une couleur de fond différente au survol */
}
</style>

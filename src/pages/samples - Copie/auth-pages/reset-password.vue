<template>
  <div>
    <section class="login">
      <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
          <div class="content-wrapper d-flex align-items-center auth">
            <div class="row w-100 flex-grow">
              <div class="col-xl-4 col-lg-6 mx-auto text-center">


                <div class="auth-form-light text-left pb-4 px-3 rounded" style="box-shadow: 1px 2px 3px 2px #ccc">
                  <center>
                    <div class="logo text-center" style="">
                      <img src="@/assets/images/logo.png" style="max-width: 40%" />
                    </div>
                  </center>
                  <center> <small class="text-muted">Réinitialisation du mot de passe</small> </center>

                  <form class="" @submit.prevent="resetPassword">
                    <div class="input-group mb-1 form-group p-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1" style="border: 1px solid #afafaf !important"><i
                            class="mdi mdi-email icon-sm text-dark align-middle"></i></span>
                      </div>

                      <input type="email" v-model="user.email" class="form-control form-control-lg" placeholder="Email"
                        aria-label="email" id="exampleInputEmail1" aria-describedby="basic-addon1" />
                    </div>


                    <div class="input-group mb-1 form-group p-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon2" style="border: 1px solid #afafaf !important"><i
                            class="mdi mdi-lock icon-sm text-dark align-middle"></i></span>
                      </div>
                      <input type="password" v-model="user.password" class="form-control form-control-lg"
                        placeholder="Mot de passe" aria-label="password" id="exampleInputPassword1"
                        aria-describedby="basic-addon2" />
                    </div>

                    <div class="input-group mb-0 form-group p-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon3" style="border: 1px solid #afafaf !important"><i
                            class="mdi mdi-lock icon-sm text-dark align-middle"></i></span>
                      </div>
                      <input type="password" v-model="user.password_confirmation" class="form-control form-control-lg"
                        placeholder="Confirmez le mot de passe" aria-label="password" id="exampleInputPassword2"
                        aria-describedby="basic-addon3" />
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

                    <div class="mt-0 mb-0 p-2">
                      <div class="text-center">
                        <div v-if="resetSpinner" class="spinner-border text-success" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div>
                      <button type="submit" class="connect btn btn-block btn-connexion-green" style="color: #2365ab">
                        Réinitialiser
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
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
      resetSpinner:false,
      isChecked: false,
      isSuccess: false,
      isError: false,
      errorMessage: "",
    };
  },
  created() {
    // Extrayez l'e-mail du paramètre de l'URL et pré-remplissez la propriété user.email
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");

    if (email) {
      this.user.email = decodeURIComponent(email);
    }
  },
  methods: {
    resetPassword() {
      this.resetSpinner = true; // Activer le spinner au début
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
            localStorage.setItem('resetEmail', this.user.email);
            this.isSuccess = true;
            setTimeout(() => {
              this.resetSpinner = false;
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
              this.resetSpinner = false;
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

<style scoped>
.login {
  position: relative;
  min-height: 100vh;
  background-color: #dcdbe0;
}
</style>

<style>
.btn-connexion-green {
  border: 3px solid #07442d !important;

  box-shadow: none !important;
  font-weight: 700 !important;
  color: white !important;
  background-color: #07442d;
}

.btn-connexion-green:hover {
  color: #07442d !important;
  background-color: #ffffff !important;
}
.logo-brand {
  display: flex;
  justify-content: space-between;
}

.logo-brand img {
  margin-left: 0;
  margin-right: 10px;
}

.connect {
  font-size: 1rem;
  color: #fff;
}

.underline-none:hover {
  text-decoration: none !important;
}

@media screen and (max-height: 767px) {

  #rc-imageselect,
  .recaptcha-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
  }
}
</style>

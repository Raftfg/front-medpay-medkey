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
                  <center> <small class="text-muted">Réinitialisation de mot de passe</small> </center>
                  <form class="" @submit.prevent="requestPassword">
                    <div class="input-group mb-1 form-group p-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1" style="border: 1px solid #afafaf !important"><i
                            class="mdi mdi-email icon-sm text-dark align-middle"></i></span>
                      </div>
                      <input type="email" v-model="user.email" class="form-control form-control-lg" placeholder="Email"
                        aria-label="email" id="exampleInputEmail1" aria-describedby="basic-addon1" />
                    </div>
                    <div v-if="isChecked" class="mt-n2 p-2" style="color: green">
                      Nous avons envoyé un lien de rénitialisation de votre mot de passe par e-mail. Veuillez consulter
                      votre boîte e-mail.
                    </div>
                    <div v-if="isEmailInvalid" class="mt-n2 p-2" style="color: red">
                      {{ emailErrorMessage }}
                    </div>
                    <div class="mt-n2 p-2">
                      <div class="text-center">
                        <div v-if="forgetSpinner" class="spinner-border text-success" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div>
                      <button type="submit" class="connect text-center btn btn-block legend-dots btn-connexion-green"
                        style="color: #2365ab">
                        <i class="mdi"></i>Envoyer un lien de rénitialisation
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
  name: "forget-password",
  data() {
    return {
      user: {
        email: "",
      },
      forgetSpinner: false,
      isChecked: false,
      isEmailInvalid: false,
      emailErrorMessage: "",
    };
  },
  methods: {
    requestPassword() {
      this.isChecked = false;
      this.isEmailInvalid = false;
      this.emailErrorMessage = "";
      this.forgetSpinner = true;
      LoginService.requestPassword(this.user)
        .then((response) => {
          if (response.data.message === "Email envoyé avec succès") {
            this.isChecked = true;

            // Arrêter le spinner en cas de succès
            this.forgetSpinner = false;
          } else {
            this.isEmailInvalid = true;
            this.emailErrorMessage = response.data.message;

            // Arrêter le spinner en cas d'erreur
            this.forgetSpinner = false;
          }
        })
        .catch((err) => {
          // Affichez le message d'erreur approprié
          console.log(err.response.data.message);
          // Arrêter le spinner en cas d'erreur
          this.forgetSpinner = false;
        });
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

<template>
  <section class="login">
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row w-100 flex-grow">
            <div class="col-xl-4 col-lg-6 mx-auto">
              <div class="auth-form-light text-left">
                <center>
                  <div class="brand-logo mt-4">
                    <img class="mt-4" src="../../../assets/images/logo.png" />
                  </div>
                </center>

                <form class="pt-3" @submit.prevent="requestPassword">
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
                      placeholder="Votre email"
                      aria-label="email"
                      id="exampleInputEmail1"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                  <div v-if="isChecked" class="mt-n2 p-2" style="color: green">
                    Un mail vous a été envoyé
                  </div>
                  <div
                    v-if="isEmailInvalid"
                    class="mt-n2 p-2"
                    style="color: red"
                  >
                    {{ emailErrorMessage }}
                  </div>

                  <div class="mt-0 mb-0 p-3">
                    <button
                      type="submit"
                      class="connect text-center btn btn-block legend-dots btn-connexion-green"
                      style="color: #2365ab"
                    >
                      <i class="mdi"></i>M'envoyer les instructions
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
  name: "login",
  data() {
    return {
      user: {
        email: "",
      },
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

      LoginService.requestPassword(this.user)
        .then((response) => {
          if (response.data.message === "Email envoyé avec succès") {
            this.isChecked = true;
          } else {
            this.isEmailInvalid = true;
            this.emailErrorMessage = response.data.message;
          }
        })
        .catch((err) => {
          // Affichez le message d'erreur approprié
          console.log(err.response.data.message);
        });
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

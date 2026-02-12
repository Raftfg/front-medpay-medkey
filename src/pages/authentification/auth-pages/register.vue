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
                  <center> <small class="text-muted">Inscription Hôpital</small> </center>

                  <form class="" @submit.prevent="submit">
                    <div id="error" @click="dismissError()" hidden="true"
                      class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                      <strong class="font-bold">Erreur:</strong><br />
                      <span class="block sm:inline" id="info"></span>
                      <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20">
                          <title>Close</title>
                          <path
                            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                        </svg>
                      </span>
                    </div>

                    <!-- Nom de l'hôpital -->
                    <div class="input-group mb-1 form-group p-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1" style="border: 1px solid #afafaf !important">
                          <i class="mdi mdi-hospital-building icon-sm text-dark align-middle"></i>
                        </span>
                      </div>
                      <input type="text" v-model="form.hospital_name" class="form-control form-control-lg"
                        placeholder="Nom de l'hôpital" aria-label="hospital_name" id="hospitalName" required />
                    </div>

                    <!-- Email administrateur -->
                    <div class="input-group mb-1 form-group p-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1" style="border: 1px solid #afafaf !important">
                          <i class="mdi mdi-email icon-sm text-dark align-middle"></i>
                        </span>
                      </div>
                      <input type="email" v-model="form.admin_email" class="form-control form-control-lg"
                        placeholder="Email administrateur" aria-label="admin_email" id="adminEmail" required />
                    </div>

                    <!-- Téléphone administrateur -->
                    <div class="input-group mb-1 form-group p-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1" style="border: 1px solid #afafaf !important">
                          <i class="mdi mdi-phone icon-sm text-dark align-middle"></i>
                        </span>
                      </div>
                      <input type="text" v-model="form.admin_phone" class="form-control form-control-lg"
                        placeholder="Téléphone administrateur" aria-label="admin_phone" id="adminPhone" required />
                    </div>

                    <!-- Pays -->
                    <div class="input-group mb-1 form-group p-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1" style="border: 1px solid #afafaf !important">
                          <i class="mdi mdi-earth icon-sm text-dark align-middle"></i>
                        </span>
                      </div>
                      <input type="text" v-model="form.country" class="form-control form-control-lg" placeholder="Pays"
                        aria-label="country" id="country" required />
                    </div>

                    <!-- Ville -->
                    <div class="input-group mb-1 form-group p-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1" style="border: 1px solid #afafaf !important">
                          <i class="mdi mdi-city icon-sm text-dark align-middle"></i>
                        </span>
                      </div>
                      <input type="text" v-model="form.city" class="form-control form-control-lg" placeholder="Ville"
                        aria-label="city" id="city" required />
                    </div>

                    <!-- Langue principale -->
                    <div class="input-group mb-1 form-group p-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1" style="border: 1px solid #afafaf !important">
                          <i class="mdi mdi-translate icon-sm text-dark align-middle"></i>
                        </span>
                      </div>
                      <select v-model="form.main_language" class="form-control form-control-lg" id="mainLanguage"
                        required>
                        <option disabled value="">Langue principale</option>
                        <option value="fr">Français</option>
                        <option value="en">Anglais</option>
                      </select>
                    </div>

                    <!-- Plan -->
                    <div class="input-group mb-0 form-group p-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1" style="border: 1px solid #afafaf !important">
                          <i class="mdi mdi-star icon-sm text-dark align-middle"></i>
                        </span>
                      </div>
                      <select v-model="form.plan" class="form-control form-control-lg" id="plan" required>
                        <option disabled value="">Plan</option>
                        <option value="trial">Essai</option>
                        <option value="standard">Standard</option>
                        <option value="premium">Premium</option>
                      </select>
                    </div>

                    <!-- Message de statut -->
                    <div v-if="statusMessage" class="mt-2 p-2">
                      <div class="alert alert-info small mb-0" style="font-size: 0.85rem;">
                        {{ statusMessage }}
                        <div v-if="tenant.login_url" class="mt-2">
                          <strong>URL de connexion :</strong><br />
                          <a :href="tenant.login_url" target="_blank" class="text-primary">{{ tenant.login_url }}</a>
                        </div>
                      </div>
                    </div>

                    <div class="mt-n2 p-2">
                      <div class="text-center">
                        <div v-if="loading" class="spinner-border text-success" role="status">
                          <span class="sr-only">Loading...</span>
                        </div>
                      </div>
                      <button type="submit" class="connect text-center btn btn-block legend-dots btn-connexion-green"
                        style="color: #2365ab" :disabled="loading">
                        <i class="mdi"></i>
                        <span v-if="!loading">Créer mon espace</span>
                        <span v-else>Création en cours...</span>
                      </button>
                    </div>
                    <div class="text-right font-weight-light p-4">
                      <router-link to="/auth-pages/login" class="text-info">
                        <span class="font-weight-bold" style="font-family: Times New Roman; color: #07442d;">
                          Déjà un compte ? Se connecter
                        </span>
                      </router-link>
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
import { defineComponent } from "vue";
import { registerTenant, getTenantStatus } from "@/_services/tenant_onboarding.service";

export default defineComponent({
  name: "RegisterForm",
  data() {
    return {
      form: {
        hospital_name: "",
        admin_email: "",
        admin_phone: "",
        country: "",
        city: "",
        main_language: "fr",
        plan: "trial",
      },
      loading: false,
      statusMessage: "",
      tenant: {
        uuid: null,
        login_url: null,
      },
      pollInterval: null,
      errorMessage: "",
    };
  },
  beforeDestroy() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
    }
  },
  methods: {
    dismissError() {
      const errorElement = document.getElementById("error");
      if (errorElement) {
        errorElement.hidden = true;
      }
    },
    async submit() {
      this.loading = true;
      this.statusMessage = "";
      this.tenant = { uuid: null, login_url: null };
      this.dismissError();

      try {
        const res = await registerTenant(this.form);
        const data = res.data.data || res.data;
        this.tenant.uuid = data.uuid;
        this.statusMessage = "Votre hôpital est en cours de préparation...";
        this.startPolling();
      } catch (err) {
        console.error("Erreur lors de l'inscription tenant:", err);
        
        // Gestion des erreurs similaire à login.vue
        let errorMessage = "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
        
        if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.response?.data?.erreur) {
          errorMessage = err.response.data.erreur;
        } else if (err.response?.data?.errors) {
          // Erreurs de validation Laravel
          const errors = err.response.data.errors;
          const firstError = Object.values(errors)[0];
          errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
        } else if (err.response?.status === 422) {
          errorMessage = "Données invalides. Vérifiez vos informations.";
        } else if (err.message && err.message !== 'Network Error') {
          errorMessage = err.message;
        }
        
        // Afficher l'erreur dans l'interface
        const errorElement = document.getElementById("error");
        const infoElement = document.getElementById("info");
        if (errorElement && infoElement) {
          infoElement.innerHTML = errorMessage;
          errorElement.hidden = false;
        }
        
        this.errorMessage = errorMessage;
      } finally {
        this.loading = false;
      }
    },
    startPolling() {
      if (!this.tenant.uuid) return;

      this.pollInterval = setInterval(async () => {
        try {
          const res = await getTenantStatus(this.tenant.uuid);
          const data = res.data.data || res.data;
          this.tenant.login_url = data.login_url;
          const status = data.onboarding_status;

          if (status === "provisioned" || status === "completed") {
            this.statusMessage = "✅ Votre hôpital est prêt ! Vous pouvez vous connecter avec l'URL ci-dessous.";
            clearInterval(this.pollInterval);
          } else if (status === "failed") {
            this.statusMessage = "❌ Une erreur est survenue lors de la préparation de votre hôpital. Veuillez contacter le support.";
            clearInterval(this.pollInterval);
          }
        } catch (e) {
          console.error("Erreur lors de la récupération du statut tenant:", e);
          // Ne pas arrêter le polling en cas d'erreur temporaire
        }
      }, 5000);
    },
  },
});
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

.btn-connexion-green:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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
  font-size: 1.2rem;
  color: #fff;
}

.underline-none:hover {
  text-decoration: none !important;
}
</style>
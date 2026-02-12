<template>
  <section class="reset-first">
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row w-100 flex-grow">
            <div class="col-xl-4 col-lg-6 mx-auto">
              <div class="auth-form-light text-left p-5">
                <h4>Changement de mot de passe</h4>
                <h6 class="font-weight-light">
                  Pour des raisons de sécurité, veuillez définir un nouveau mot de passe.
                </h6>
                <form class="pt-3" @submit.prevent="submit">
                  <div class="form-group">
                    <input
                      v-model="form.password"
                      type="password"
                      class="form-control form-control-lg"
                      placeholder="Mot de passe actuel"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <input
                      v-model="form.new_password"
                      type="password"
                      class="form-control form-control-lg"
                      placeholder="Nouveau mot de passe"
                      required
                    />
                  </div>
                  <div class="form-group">
                    <input
                      v-model="form.new_password_confirmation"
                      type="password"
                      class="form-control form-control-lg"
                      placeholder="Confirmer le nouveau mot de passe"
                      required
                    />
                  </div>
                  <div v-if="errorMessage" class="alert alert-danger small">
                    {{ errorMessage }}
                  </div>
                  <div class="mt-3">
                    <button
                      class="btn btn-block btn-gradient-primary btn-lg font-weight-medium auth-form-btn"
                      type="submit"
                      :disabled="loading"
                    >
                      <span v-if="!loading">Valider</span>
                      <span v-else>Traitement...</span>
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
</template>

<script>
import { LoginService } from "@/_services";

export default {
  name: "FirstChangePassword",
  data() {
    return {
      form: {
        password: "",
        new_password: "",
        new_password_confirmation: "",
      },
      loading: false,
      errorMessage: "",
    };
  },
  methods: {
    async submit() {
      this.errorMessage = "";
      if (this.form.new_password !== this.form.new_password_confirmation) {
        this.errorMessage = "Les mots de passe ne correspondent pas.";
        return;
      }
      this.loading = true;
      try {
        // Réutilise l'endpoint de changement de mot de passe utilisateur
        await LoginService.updateProfilPas({
          password: this.form.password,
          new_password: this.form.new_password,
        });
        // Une fois le mot de passe changé, rediriger vers le wizard
        this.$router.push("/onboarding/wizard");
      } catch (e) {
        console.error("Erreur lors du changement de mot de passe:", e);
        this.errorMessage =
          e.response?.data?.message || "Une erreur est survenue.";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>


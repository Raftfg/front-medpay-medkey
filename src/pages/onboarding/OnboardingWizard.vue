<template>
  <section class="wizard container py-4">
    <h3>Assistant de configuration de l'hôpital</h3>
    <p v-if="loading">Chargement de l'état du wizard...</p>

    <div v-else>
      <div class="alert alert-success" v-if="state.completed">
        La configuration est terminée. Vous pouvez accéder au tableau de bord.
      </div>

      <div v-if="!state.completed">
        <!-- Étape 1 : Infos hôpital -->
        <div class="card mb-3">
          <div class="card-header">
            Étape 1/2 – Informations de l'hôpital
          </div>
          <div class="card-body">
            <form @submit.prevent="saveHospitalInfo">
              <div class="form-group">
                <label>Nom</label>
                <input v-model="hospitalForm.name" type="text" class="form-control" />
              </div>
              <div class="form-group">
                <label>Adresse</label>
                <input v-model="hospitalForm.address" type="text" class="form-control" />
              </div>
              <div class="form-group">
                <label>Pays</label>
                <input v-model="hospitalForm.country" type="text" class="form-control" />
              </div>
              <div class="form-group">
                <label>Ville</label>
                <input v-model="hospitalForm.city" type="text" class="form-control" />
              </div>
              <div class="form-group">
                <label>Téléphone</label>
                <input v-model="hospitalForm.phone" type="text" class="form-control" />
              </div>
              <button type="submit" class="btn btn-primary" :disabled="savingHospital">
                <span v-if="!savingHospital">Enregistrer</span>
                <span v-else>Sauvegarde...</span>
              </button>
            </form>
          </div>
        </div>

        <!-- Étape 2 : Langue principale -->
        <div class="card mb-3">
          <div class="card-header">
            Étape 2/2 – Langue principale
          </div>
          <div class="card-body">
            <form @submit.prevent="saveLanguage">
              <div class="form-group">
                <label>Langue principale</label>
                <select v-model="languageForm.main_language" class="form-control">
                  <option value="fr">Français</option>
                  <option value="en">Anglais</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary" :disabled="savingLanguage">
                <span v-if="!savingLanguage">Enregistrer</span>
                <span v-else>Sauvegarde...</span>
              </button>
            </form>
          </div>
        </div>

        <button class="btn btn-success" @click="complete" :disabled="completing">
          <span v-if="!completing">Terminer l'assistant</span>
          <span v-else>Finalisation...</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import {
  getWizardState,
  saveWizardHospitalInfo,
  saveWizardLanguage,
  completeWizard,
} from "@/_services/tenant_onboarding.service";

export default {
  name: "OnboardingWizard",
  data() {
    return {
      loading: true,
      state: {
        step: 1,
        completed_steps: [],
        completed: false,
      },
      hospitalForm: {
        name: "",
        address: "",
        country: "",
        city: "",
        phone: "",
      },
      languageForm: {
        main_language: "fr",
      },
      savingHospital: false,
      savingLanguage: false,
      completing: false,
    };
  },
  async created() {
    await this.loadState();
  },
  methods: {
    async loadState() {
      this.loading = true;
      try {
        const res = await getWizardState();
        const data = res.data.data;
        this.state = {
          ...(data.setup_wizard_state || {}),
          completed: !!data.setup_wizard_completed_at,
        };
      } catch (e) {
        console.error("Erreur lors du chargement de l'état du wizard:", e);
      } finally {
        this.loading = false;
      }
    },
    async saveHospitalInfo() {
      this.savingHospital = true;
      try {
        await saveWizardHospitalInfo(this.hospitalForm);
        await this.loadState();
      } catch (e) {
        console.error("Erreur lors de la sauvegarde des infos hôpital:", e);
      } finally {
        this.savingHospital = false;
      }
    },
    async saveLanguage() {
      this.savingLanguage = true;
      try {
        await saveWizardLanguage(this.languageForm);
        await this.loadState();
      } catch (e) {
        console.error("Erreur lors de la sauvegarde de la langue:", e);
      } finally {
        this.savingLanguage = false;
      }
    },
    async complete() {
      this.completing = true;
      try {
        await completeWizard();
        await this.loadState();
        this.$router.push("/home");
      } catch (e) {
        console.error("Erreur lors de la finalisation du wizard:", e);
      } finally {
        this.completing = false;
      }
    },
  },
};
</script>

<style scoped>
.wizard {
  max-width: 800px;
}
</style>


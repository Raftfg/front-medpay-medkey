<template>
  <div class="onboarding-page">
    <!-- Background Bokeh Effects -->
    <div class="bokeh-background">
      <div class="circle c1"></div>
      <div class="circle c2"></div>
      <div class="circle c3"></div>
    </div>

    <div class="container onboarding-container d-flex align-items-center justify-content-center">
      <div class="onboarding-card card shadow-lg p-0 overflow-hidden border-0">
        <div class="row g-0 h-100">
          <!-- Left Sidebar (Steps Progress) -->
          <div class="col-lg-4 steps-sidebar d-none d-lg-flex flex-column justify-content-between p-5 text-white">
            <div>
              <div class="logo-white mb-5">
                <svg width="150" height="50" viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
                  <text x="0" y="50" font-family="sans-serif" font-weight="700" font-size="42" fill="white">Med</text>
                  <text x="88" y="50" font-family="sans-serif" font-weight="700" font-size="42" fill="#fb0205">Key</text>
                </svg>
              </div>
              <ul class="steps-list list-unstyled">
                <li :class="{ active: currentStep === 1, completed: currentStep > 1 }">
                  <span class="step-num">1</span> Inscription
                </li>
                <li :class="{ active: currentStep === 2, completed: currentStep > 2 }">
                  <span class="step-num">2</span> Lancement
                </li>
              </ul>
            </div>
            <div class="sidebar-footer">
              <small>© 2026 Akasi Group. Tous droits réservés.</small>
            </div>
          </div>

          <!-- Right Content Area -->
          <div class="col-lg-8 content-area p-5 d-flex flex-column">
            <div class="d-lg-none text-center mb-4">
               <img src="@/assets/images/logo.png" style="max-width: 150px" />
            </div>

            <transition name="fade-slide" mode="out-in">
              <!-- STEP 1: Combined Account & Identity Info -->
              <div v-if="currentStep === 1" key="step1" class="step-content">
                <h2 class="mb-2 font-weight-bold">Bienvenue chez Akasi</h2>
                <p class="text-muted mb-4">Créez votre espace de travail sécurisé en quelques secondes.</p>
                <form @submit.prevent="finishOnboarding">
                  <div class="form-group mb-3">
                    <label class="font-weight-600">Email Professionnel</label>
                    <input type="email" v-model="form.admin_email" class="form-control akasi-input" placeholder="ex: jean.dupont@clinique.com" required />
                  </div>
                  <div class="form-group mb-4">
                    <label class="font-weight-600">Nom Organisation ou Personnel</label>
                    <input type="text" v-model="form.hospital_name" class="form-control akasi-input" placeholder="ex: Clinique Saint-Jean" required />
                  </div>
                  <button type="submit" class="btn btn-akasi-red btn-lg px-5 py-3 w-100">C'est parti ! <i class="fas fa-rocket ms-2"></i></button>
                </form>
              </div>

              <!-- STEP 2: Creating / Loading (Bitrix Style) -->
              <div v-else-if="currentStep === 2" key="step2" class="step-content text-center py-5">
                <div class="creation-loader mb-5 text-center">
                  <div class="spinner-akasi mx-auto"></div>
                  <div class="progress-logo">
                     <span class="text-main">Med</span><span class="text-accent">Key</span>
                  </div>
                </div>
                <h3 class="font-weight-bold mb-3">{{ loadingText }}</h3>
                <div class="progress mb-3" style="height: 10px; border-radius: 5px; max-width: 400px; margin: 0 auto;">
                  <div class="progress-bar progress-bar-animated bg-akasi-red" role="progressbar" :style="{ width: progressPercent + '%' }"></div>
                </div>
                <p v-if="!error" class="text-muted italic">{{ statusMessage }}</p>
                
                <!-- Final Ready State -->
                <div v-if="onboardingReady" class="ready-state mt-4">
                  <div class="alert alert-success border-0 shadow-sm p-4 text-center">
                    <h4 class="font-weight-bold">✅ Votre plateforme est prête !</h4>
                    <p class="mb-3">Votre espace sécurisé a été généré avec succès.<br>Vous pouvez y accéder dès maintenant.</p>
                    <a :href="tenant.login_url" class="btn btn-akasi-main btn-lg px-5 py-3">Explorer MedKey <i class="fas fa-rocket ms-2"></i></a>
                  </div>
                </div>
                
                <!-- Error State -->
                <div v-if="error" class="error-state mt-4">
                  <div class="alert alert-danger border-0">
                    <p>{{ error }}</p>
                    <button @click="currentStep = 1; error = null" class="btn btn-outline-danger">Réessayer</button>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { registerTenant, getTenantStatus } from "@/_services/tenant_onboarding.service";

export default {
  name: "AkasiOnboarding",
  data() {
    return {
      currentStep: 1,
      priority: 'patients',
      loading: false,
      progressPercent: 0,
      loadingText: "Création de votre espace en cours",
      statusMessage: "Préparation de l'infrastructure...",
      onboardingReady: false,
      error: null,
      form: {
        hospital_name: "",
        admin_email: "",
        admin_phone: "",
        country: "",
        city: "",
        main_language: "fr",
        plan: "trial",
      },
      tenant: {
        uuid: null,
        login_url: null,
      },
      pollInterval: null,
      loadingTexts: [
        "Allocation des ressources sécurisées...",
        "Configuration de votre base de données dédiée...",
        "Déploiement des modules MedKey...",
        "Calcul des paramètres d'optimisation...",
        "Finalisation de l'environnement..."
      ],
      textIndex: 0
    };
  },
  methods: {
    nextStep() {
      this.currentStep++;
    },
    prevStep() {
      this.currentStep--;
    },
    async finishOnboarding() {
      this.currentStep = 2;
      this.loading = true;
      this.startProgressAnimation();
      
      // Valeurs par défaut pour les champs simplifiés
      this.form.country = "Bénin"; // Valeur par défaut
      this.form.city = "Cotonou";  // Valeur par défaut
      this.form.admin_phone = "00000000"; // Fake phone as requested to be removed from UI

      try {
        const res = await registerTenant(this.form);
        const data = res.data.data || res.data;
        this.tenant.uuid = data.uuid;
        this.startPolling();
      } catch (err) {
        this.error = "Erreur lors de l'enregistrement. Veuillez vérifier vos informations.";
        this.loading = false;
        console.error(err);
      }
    },
    startProgressAnimation() {
      const interval = setInterval(() => {
        if (this.progressPercent < 90) {
          this.progressPercent += 0.5;
        }
        if (this.progressPercent % 15 === 0) {
           this.textIndex = (this.textIndex + 1) % this.loadingTexts.length;
           this.statusMessage = this.loadingTexts[this.textIndex];
        }
        if (this.onboardingReady) {
          this.progressPercent = 100;
          clearInterval(interval);
        }
      }, 100);
    },
    startPolling() {
      this.pollInterval = setInterval(async () => {
        try {
          const res = await getTenantStatus(this.tenant.uuid);
          const data = res.data.data || res.data;
          const status = data.onboarding_status;

          if (status === "provisioned" || status === "completed") {
            this.tenant.login_url = data.login_url;
            this.onboardingReady = true;
            this.loadingText = "Tout est prêt !";
            clearInterval(this.pollInterval);
          } else if (status === "failed") {
            this.error = "Échec du déploiement. Veuillez contacter le support.";
            clearInterval(this.pollInterval);
          }
        } catch (e) {
          console.error("Polling error", e);
        }
      }, 3000);
    }
  },
  beforeDestroy() {
    if (this.pollInterval) clearInterval(this.pollInterval);
  }
};
</script>

<style scoped>
.onboarding-page {
  min-height: 100vh;
  background-image: url("~@/assets/images/auth/register-bg.jpg"); /* Fix alias with ~ */
  background-size: cover;
  background-position: center;
  padding: 40px 20px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
}

/* Background Overlay for better readability */
.onboarding-page::before {
  content: "";
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(135deg, rgba(1, 28, 97, 0.85) 0%, rgba(251, 2, 5, 0.4) 100%);
  z-index: 0;
}

/* Bokeh Background */
.bokeh-background {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  z-index: 0;
  overflow: hidden;
}
.circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
}
.c1 { width: 400px; height: 400px; background: #011c61; top: -100px; right: -50px; }
.c2 { width: 300px; height: 300px; background: #fb0205; bottom: -50px; left: -50px; }
.c3 { width: 250px; height: 250px; background: #011c61; top: 40%; left: 10%; }

.onboarding-container {
  z-index: 1;
  width: 100%;
}

.onboarding-card {
  width: 1000px;
  max-width: 100%;
  min-height: 600px;
  border-radius: 20px !important;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(10px);
}

/* Steps Sidebar */
.steps-sidebar {
  background-color: #011c61;
  position: relative;
}
.steps-list li {
  font-size: 1.1rem;
  margin-bottom: 25px;
  opacity: 0.5;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
}
.steps-list li.active { opacity: 1; font-weight: 700; }
.steps-list li.completed { opacity: 0.8; }
.step-num {
  width: 32px; height: 32px;
  border: 2px solid white;
  border-radius: 50%;
  display: inline-flex;
  align-items: center; justify-content: center;
  margin-right: 15px;
  font-size: 0.9rem;
}
.completed .step-num { background: white; color: #011c61; }
.active .step-num { border-color: #fb0205; color: #fb0205; font-weight: bold; }

/* Form Styles */
.akasi-input {
  height: 50px;
  border-radius: 8px;
  border: 1px solid #e3e8f6;
  padding: 10px 15px;
  transition: all 0.3s;
}
.akasi-input:focus {
  border-color: #011c61;
  box-shadow: 0 0 0 0.2rem rgba(1, 28, 97, 0.1);
}

.btn-akasi-red {
  background-color: #fb0205;
  color: white;
  border: none;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s;
}
.btn-akasi-red:hover { background-color: #d00104; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(251, 2, 5, 0.3); }

.btn-akasi-main {
  background-color: #011c61;
  color: white;
  border: none;
  border-radius: 8px;
}

/* Priorities Selection */
.priorities-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}
.priority-item {
  border: 1px solid #e3e8f6;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.priority-item .icon { font-size: 1.8rem; color: #011c61; }
.priority-item:hover { transform: translateY(-3px); border-color: #011c61; background: #f8faff; }
.priority-item.selected { border-color: #fb0205; background: rgba(251, 2, 5, 0.05); color: #fb0205; }
.priority-item.selected .icon { color: #fb0205; }

/* Transitions */
.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.4s ease; }
.fade-slide-enter { opacity: 0; transform: translateX(20px); }
.fade-slide-leave-to { opacity: 0; transform: translateX(-20px); }

/* Custom Spinner Akasi */
.creation-loader { position: relative; width: 100px; height: 100px; margin: 0 auto; }
.spinner-akasi {
  width: 100%; height: 100%;
  border: 5px solid #011c61;
  border-top: 5px solid #fb0205;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
.progress-logo {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  font-weight: bold; font-size: 0.9rem;
}
.text-main { color: #011c61; }
.text-accent { color: #fb0205; }

@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

.bg-akasi-red { background-color: #fb0205 !important; }

/* Fonts */
.font-weight-600 { font-weight: 600; }
</style>

<template>
  <div class="onboarding-page">
    <div class="onboarding-backdrop" aria-hidden="true"></div>
    <div class="onboarding-content">
      <!-- Étape 1 : Collecte email + organisation -->
      <div v-if="step === 'form'" class="onboarding-step onboarding-form-step">
        <div class="onboarding-card card shadow-lg border-0">
          <div class="card-body p-4 p-md-5">
            <div class="text-center mb-4">
              <h1 class="onboarding-title">{{ $t('onboarding.title') }}</h1>
              <p class="onboarding-subtitle text-muted">{{ $t('onboarding.subtitle') }}</p>
            </div>
            <form @submit.prevent="submitForm" class="onboarding-form">
              <div v-if="errorMessage" class="alert alert-danger small" role="alert">
                {{ errorMessage }}
              </div>
              <div class="form-group mb-3">
                <label for="onboarding-email" class="form-label">{{ $t('onboarding.email_label') }}</label>
                <input
                  id="onboarding-email"
                  v-model="form.email"
                  type="email"
                  class="form-control form-control-lg"
                  :placeholder="$t('onboarding.email_placeholder')"
                  required
                  autocomplete="email"
                />
              </div>
              <div class="form-group mb-4">
                <label for="onboarding-organization" class="form-label">{{ $t('onboarding.organization_label') }}</label>
                <input
                  id="onboarding-organization"
                  v-model="form.organization_name"
                  type="text"
                  class="form-control form-control-lg"
                  :placeholder="$t('onboarding.organization_placeholder')"
                  required
                  autocomplete="organization"
                />
              </div>
              <button type="submit" class="btn btn-primary btn-lg w-100 py-3" :disabled="loading">
                <span v-if="loading" class="d-flex align-items-center justify-content-center gap-2">
                  <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  {{ $t('onboarding.continuer_loading') }}
                </span>
                <span v-else>{{ $t('onboarding.continuer') }}</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <!-- Étape 2 : Espace en cours de création -->
      <div v-if="step === 'creating'" class="onboarding-step onboarding-creating-step">
        <div class="onboarding-card card shadow-lg border-0">
          <div class="card-body p-4 p-md-5 text-center">
            <div class="creating-animation mb-4">
              <div class="spinner-wrapper">
                <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                  <span class="visually-hidden">{{ $t('onboarding.creating_loading') }}</span>
                </div>
              </div>
              <div class="progress-dots mt-3">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
            </div>
            <h2 class="h4 mb-2">{{ $t('onboarding.creating_title') }}</h2>
            <p class="text-muted mb-0">{{ $t('onboarding.creating_message') }}</p>
          </div>
        </div>
      </div>

      <!-- Étape 3 : E-mail envoyé -->
      <div v-if="step === 'email_sent'" class="onboarding-step onboarding-email-step">
        <div class="onboarding-card card shadow-lg border-0">
          <div class="card-body p-4 p-md-5 text-center">
            <div class="email-sent-icon mb-4">
              <span class="icon-circle bg-success text-white">
                <i class="fas fa-envelope-open-text fa-2x"></i>
              </span>
            </div>
            <h2 class="h4 mb-2">{{ $t('onboarding.email_sent_title') }}</h2>
            <p class="text-muted mb-4">{{ $t('onboarding.email_sent_message') }}</p>
            <p class="small text-muted mb-0">{{ $t('onboarding.email_sent_hint') }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { registerTenant } from "@/_services/tenant_onboarding.service";

const STEP_FORM = 'form';
const STEP_CREATING = 'creating';
const STEP_EMAIL_SENT = 'email_sent';

export default {
  name: "Onboarding",
  data() {
    return {
      step: STEP_FORM,
      form: {
        email: "",
        organization_name: "",
      },
      loading: false,
      errorMessage: "",
    };
  },
  methods: {
    async submitForm() {
      this.errorMessage = "";
      this.loading = true;
      try {
        const payload = {
          email: this.form.email,
          organization_name: this.form.organization_name,
          plan: "free",
          hospital_name: this.form.organization_name,
          admin_email: this.form.email,
        };
        await registerTenant(payload);
        this.step = STEP_CREATING;
        setTimeout(() => {
          this.step = STEP_EMAIL_SENT;
        }, 3500);
      } catch (err) {
        console.error("Onboarding register error:", err);
        this.errorMessage =
          err.response?.data?.message ||
          err.response?.data?.erreur ||
          (err.response?.data?.errors && Object.values(err.response.data.errors).flat()[0]) ||
          this.$t("onboarding.error_default");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.onboarding-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 1.5rem;
}
.onboarding-backdrop {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #0b5d3f 0%, #0d7d52 50%, #0a4d32 100%);
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  z-index: 0;
}
.onboarding-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 440px;
}
.onboarding-card {
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
}
.onboarding-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.25rem;
}
.onboarding-subtitle {
  font-size: 0.95rem;
}
.onboarding-form .form-label {
  font-weight: 500;
  color: #333;
}
.onboarding-form .form-control {
  border-radius: 10px;
  border: 1px solid #e0e0e0;
}
.onboarding-form .form-control:focus {
  border-color: #0b5d3f;
  box-shadow: 0 0 0 3px rgba(11, 93, 63, 0.15);
}
.btn-primary {
  background: #0b5d3f;
  border-color: #0b5d3f;
  border-radius: 10px;
  font-weight: 600;
}
.btn-primary:hover {
  background: #094d32;
  border-color: #094d32;
}
.creating-animation .spinner-wrapper {
  display: flex;
  justify-content: center;
}
.progress-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
}
.progress-dots .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #0b5d3f;
  animation: dot-pulse 1.2s ease-in-out infinite;
}
.progress-dots .dot:nth-child(2) { animation-delay: 0.2s; }
.progress-dots .dot:nth-child(3) { animation-delay: 0.4s; }
@keyframes dot-pulse {
  0%, 100% { opacity: 0.4; transform: scale(0.9); }
  50% { opacity: 1; transform: scale(1.1); }
}
.icon-circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #0b5d3f;
}
</style>

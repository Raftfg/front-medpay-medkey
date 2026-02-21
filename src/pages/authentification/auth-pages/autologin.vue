<template>
  <div class="autologin-page">
    <div class="autologin-card">
      <h2>Connexion automatique en cours...</h2>
      <p v-if="!errorMessage">
        Nous finalisons votre session MedKey et vous redirigeons vers le dashboard.
      </p>
      <p v-else class="error-message">{{ errorMessage }}</p>
      <router-link v-if="errorMessage" class="login-link" to="/auth-pages/login">
        Aller à la page de connexion
      </router-link>
    </div>
  </div>
</template>

<script>
import Axios, { tenantStorage } from "@/_services/caller.services";

export default {
  name: "AutoLoginPage",
  data() {
    return {
      errorMessage: "",
    };
  },
  async mounted() {
    const token = this.$route.query.token;
    if (!token || typeof token !== "string") {
      this.errorMessage = "Lien de connexion invalide.";
      return;
    }

    try {
      const response = await Axios.post("/public/tenants/autologin/consume", { token });
      const payload = response.data?.data || response.data || {};

      if (!payload.access_token || !payload.user) {
        throw new Error("Session invalide retournée par le serveur.");
      }

      const hospitalId = payload.hospital?.id || payload.user?.hospital_id;
      if (hospitalId) {
        localStorage.setItem("hospital_id", hospitalId);
      }

      localStorage.setItem("loggedIn", "true");
      tenantStorage.setItem("user", JSON.stringify(payload.user));
      tenantStorage.setItem("access_token", payload.access_token);

      const rawPermissions = payload.permissions || [];
      const normalizedPermissions = Array.isArray(rawPermissions)
        ? rawPermissions.map((p) => (typeof p === "string" ? p : p?.name)).filter(Boolean)
        : Object.values(rawPermissions);
      tenantStorage.setItem("permission", JSON.stringify(normalizedPermissions));

      this.$router.replace(payload.redirect_to || "/home");
    } catch (error) {
      this.errorMessage =
        error.response?.data?.message ||
        error.message ||
        "La connexion automatique a échoué.";
    }
  },
};
</script>

<style scoped>
.autologin-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, #0d5dbf 0%, #074191 100%);
}

.autologin-card {
  width: 100%;
  max-width: 520px;
  background: #fff;
  border-radius: 14px;
  padding: 1.4rem 1.2rem;
  text-align: center;
}

.autologin-card h2 {
  margin-bottom: 0.45rem;
}

.error-message {
  color: #b22929;
}

.login-link {
  color: #0a64c9;
  text-decoration: none;
  font-weight: 600;
}
</style>

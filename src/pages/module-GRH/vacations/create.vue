<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-4 text-center"
              style="background-color:#0B5D3F; box-shadow:0 4px 6px rgba(0,0,0,.1);">
              Nouvelle demande de congé / absence
            </h3>

            <form @submit.prevent="submit">
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Type <span style="color:red">*</span></label>
                    <select v-model="form.type_vacations_id" class="form-control" required>
                      <option value="" disabled>Sélectionner</option>
                      <option v-for="t in types" :key="t.uuid" :value="t.uuid">{{ t.name }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Statut</label>
                    <input v-model="form.status" class="form-control" readonly />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Date début <span style="color:red">*</span></label>
                    <input v-model="form.start_date" type="date" class="form-control" required :max="form.end_date || ''" />
                    <small class="form-text text-muted" v-if="form.start_date && form.end_date && form.start_date > form.end_date" style="color: red;">
                      ⚠️ La date de début doit être antérieure à la date de fin
                    </small>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Date fin <span style="color:red">*</span></label>
                    <input v-model="form.end_date" type="date" class="form-control" required :min="form.start_date || ''" />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label>Note</label>
                <textarea v-model="form.note" class="form-control" rows="3"></textarea>
              </div>

              <div class="d-flex gap-2">
                <button class="btn btn-success btn-medpay-green" type="submit" :disabled="loading">
                  {{ loading ? 'Envoi...' : 'Envoyer' }}
                </button>
                <router-link class="btn btn-light" to="/grh/vacations">Annuler</router-link>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { vacationService, typeVacationService } from "@/_services";

export default {
  name: "VacationCreate",
  data() {
    return {
      loading: false,
      types: [],
      form: {
        users_id: "",
        type_vacations_id: "",
        start_date: "",
        end_date: "",
        status: "pending",
        note: "",
      },
    };
  },
  mounted() {
    this.loadTypes();
    this.setCurrentUser();
  },
  methods: {
    async loadTypes() {
      try {
        const res = await typeVacationService.getAllTypeVacations();
        this.types = (res && res.data && res.data.data) ? res.data.data : [];
      } catch (e) {
        console.error(e);
      }
    },
    setCurrentUser() {
      try {
        const raw = localStorage.getItem("user");
        if (!raw) return;
        const user = JSON.parse(raw);
        // On suppose que l'UUID de l'utilisateur est stocké dans user.uuid
        if (user && user.uuid) {
          this.form.users_id = user.uuid;
        }
      } catch (e) {
        console.error("Impossible de récupérer l'utilisateur connecté pour la demande de congé", e);
      }
    },
    async submit() {
      // Validation des dates
      if (this.form.start_date && this.form.end_date && this.form.start_date > this.form.end_date) {
        this.$toast.error("La date de début doit être antérieure à la date de fin");
        return;
      }
      
      this.loading = true;
      try {
        await vacationService.createVacation(this.form);
        this.$toast.success("Demande envoyée");
        this.$router.push("/grh/vacations");
      } catch (e) {
        console.error(e);
        this.$toast.error("Erreur création demande");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>


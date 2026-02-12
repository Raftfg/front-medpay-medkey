<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-4 text-center"
              style="background-color:#0B5D3F; box-shadow:0 4px 6px rgba(0,0,0,.1);">
              Nouveau planning
            </h3>

            <form @submit.prevent="submit">
              <div class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Employé (optionnel)</label>
                    <select v-model.number="form.employer_id" class="form-control">
                      <option :value="null">Tous / Non spécifié</option>
                      <option v-for="e in employers" :key="e.uuid" :value="e.id">{{ e.last_name }} {{ e.first_name }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Service (optionnel)</label>
                    <select v-model.number="form.service_id" class="form-control">
                      <option :value="null">Non spécifié</option>
                      <option v-for="s in services" :key="s.id || s.uuid" :value="s.id">{{ s.name }}</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label>Type de période</label>
                    <select v-model="form.period_type" class="form-control">
                      <option value="weekly">Hebdomadaire</option>
                      <option value="monthly">Mensuel</option>
                      <option value="custom">Personnalisé</option>
                    </select>
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
                    <small class="form-text text-muted" v-if="form.start_date && form.end_date && getDaysDifference() > 90" style="color: orange;">
                      ⚠️ Période de planning supérieure à 3 mois ({{ getDaysDifference() }} jours)
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
                <label>Notes</label>
                <textarea v-model="form.notes" class="form-control" rows="3"></textarea>
              </div>

              <div class="d-flex gap-2">
                <button class="btn btn-success btn-medpay-green" type="submit" :disabled="loading">
                  {{ loading ? 'Enregistrement...' : 'Enregistrer' }}
                </button>
                <router-link class="btn btn-light" to="/grh/plannings">Annuler</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { planningService, employerService, serviceService } from "@/_services";

export default {
  name: "PlanningCreate",
  data() {
    return {
      loading: false,
      employers: [],
      services: [],
      form: {
        employer_id: null,
        service_id: null,
        start_date: "",
        end_date: "",
        period_type: "weekly",
        notes: "",
      },
    };
  },
  mounted() {
    this.loadRefs();
  },
  methods: {
    async loadRefs() {
      try {
        const [empRes, srvRes] = await Promise.all([
          employerService.getAllEmployers(),
          // serviceService existe déjà dans le projet (servicess_services.js)
          serviceService.getAllServices ? serviceService.getAllServices() : Promise.resolve({ data: { data: [] } }),
        ]);
        this.employers = (empRes && empRes.data && empRes.data.data) ? empRes.data.data : [];
        this.services = (srvRes && srvRes.data && srvRes.data.data) ? srvRes.data.data : [];
      } catch (e) {
        console.error(e);
      }
    },
    getDaysDifference() {
      if (!this.form.start_date || !this.form.end_date) return 0;
      const start = new Date(this.form.start_date);
      const end = new Date(this.form.end_date);
      const diffTime = Math.abs(end - start);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    },
    async submit() {
      // Validation des dates
      if (this.form.start_date && this.form.end_date && this.form.start_date > this.form.end_date) {
        this.$toast.error("La date de début doit être antérieure à la date de fin");
        return;
      }
      
      this.loading = true;
      try {
        const payload = {
          employer_id: this.form.employer_id,
          service_id: this.form.service_id,
          start_date: this.form.start_date,
          end_date: this.form.end_date,
          period_type: this.form.period_type,
          notes: this.form.notes,
          status: "draft",
        };
        const res = await planningService.createWorkSchedule(payload);
        const uuid = res && res.data && res.data.data && res.data.data.uuid ? res.data.data.uuid : null;
        this.$toast.success("Planning créé");
        this.$router.push(uuid ? `/grh/plannings/${uuid}` : "/grh/plannings");
      } catch (err) {
        console.error(err);
        this.$toast.error("Erreur lors de la création du planning");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>


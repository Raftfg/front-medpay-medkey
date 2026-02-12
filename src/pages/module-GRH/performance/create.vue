<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-4 text-center"
              style="background-color:#0B5D3F; box-shadow:0 4px 6px rgba(0,0,0,.1);">
              Nouvelle évaluation de performance
            </h3>

            <form @submit.prevent="submit">
              <fieldset class="form-group border px-3 py-2 mb-3">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Informations générales</b></legend>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Employé <span style="color:red">*</span></label>
                      <select v-model.number="form.employers_id" class="form-control" required>
                        <option value="" disabled>Sélectionner un employé</option>
                        <option v-for="e in employers" :key="e.uuid" :value="e.id">
                          {{ e.last_name }} {{ e.first_name }}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Service (optionnel)</label>
                      <select v-model.number="form.services_id" class="form-control">
                        <option :value="null">Non spécifié</option>
                        <option v-for="s in services" :key="s.id || s.uuid" :value="s.id">{{ s.name }}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset class="form-group border px-3 py-2 mb-3">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Période d'évaluation</b></legend>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Type de période <span style="color:red">*</span></label>
                      <select v-model="form.period_type" class="form-control" required @change="onPeriodTypeChange">
                        <option value="monthly">Mensuelle</option>
                        <option value="quarterly">Trimestrielle</option>
                        <option value="annual">Annuelle</option>
                        <option value="custom">Personnalisée</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Date début <span style="color:red">*</span></label>
                      <input v-model="form.start_date" type="date" class="form-control" required />
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Date fin <span style="color:red">*</span></label>
                      <input v-model="form.end_date" type="date" class="form-control" required />
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset class="form-group border px-3 py-2 mb-3">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Score global</b></legend>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Score global (0-100)</label>
                      <input v-model.number="form.overall_score" type="number" min="0" max="100" class="form-control" />
                      <small class="form-text text-muted">Ce score sera calculé automatiquement à partir des critères si non renseigné</small>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Score calculé</label>
                      <input :value="calculatedScore" type="number" class="form-control" readonly />
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset class="form-group border px-3 py-2 mb-3">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Critères d'évaluation hospitaliers</b></legend>
                <div class="row">
                  <div class="col-md-6" v-for="(criterion, key) in criteria" :key="key">
                    <div class="form-group">
                      <label>{{ criterion.label }} (0-100)</label>
                      <input 
                        v-model.number="criteria[key].score" 
                        type="number" 
                        min="0" 
                        max="100" 
                        class="form-control"
                        @input="updateCriteriaScores" />
                      <small class="form-text text-muted">{{ criterion.description }}</small>
                    </div>
                  </div>
                </div>
              </fieldset>

              <div class="form-group">
                <label>Commentaires</label>
                <textarea v-model="form.comments" class="form-control" rows="4" 
                  placeholder="Commentaires généraux sur la performance de l'employé..."></textarea>
              </div>

              <div class="d-flex gap-2">
                <button class="btn btn-success btn-medpay-green" type="submit" :disabled="loading">
                  {{ loading ? 'Enregistrement...' : 'Enregistrer' }}
                </button>
                <router-link class="btn btn-light" to="/grh/performance">Annuler</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { employerPerformanceService, employerService, serviceService } from "@/_services";

export default {
  name: "PerformanceCreate",
  data() {
    return {
      loading: false,
      employers: [],
      services: [],
      form: {
        employers_id: null,
        services_id: null,
        period_type: "monthly",
        start_date: "",
        end_date: "",
        overall_score: null,
        criteria_scores: {},
        comments: "",
      },
      criteria: {
        ponctualite: {
          label: "Ponctualité",
          description: "Respect des horaires de travail",
          score: null,
        },
        assiduite: {
          label: "Assiduité",
          description: "Présence et régularité",
          score: null,
        },
        qualite_soins: {
          label: "Qualité des soins",
          description: "Qualité de la prise en charge des patients",
          score: null,
        },
        collaboration: {
          label: "Collaboration",
          description: "Travail en équipe et communication",
          score: null,
        },
        respect_procedures: {
          label: "Respect des procédures",
          description: "Respect des protocoles hospitaliers",
          score: null,
        },
        gestion_urgence: {
          label: "Gestion des urgences",
          description: "Réactivité et efficacité en situation d'urgence",
          score: null,
        },
      },
    };
  },
  computed: {
    calculatedScore() {
      const scores = Object.values(this.criteria)
        .map(c => c.score)
        .filter(s => s !== null && s !== undefined);
      if (scores.length === 0) return null;
      const sum = scores.reduce((a, b) => a + b, 0);
      return Math.round(sum / scores.length);
    },
  },
  mounted() {
    this.loadRefs();
    this.setDefaultDates();
  },
  methods: {
    async loadRefs() {
      try {
        const [empRes, srvRes] = await Promise.all([
          employerService.getAllEmployers(),
          serviceService.getAllServices(),
        ]);
        this.employers = (empRes && empRes.data && empRes.data.data) ? empRes.data.data : [];
        this.services = (srvRes && srvRes.data && srvRes.data.data) ? srvRes.data.data : [];
      } catch (e) {
        console.error(e);
        this.$toast.error("Erreur chargement références");
      }
    },
    setDefaultDates() {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      
      // Par défaut: période mensuelle du mois en cours
      this.form.start_date = new Date(year, month, 1).toISOString().split('T')[0];
      this.form.end_date = new Date(year, month + 1, 0).toISOString().split('T')[0];
    },
    onPeriodTypeChange() {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      
      switch (this.form.period_type) {
        case 'monthly':
          this.form.start_date = new Date(year, month, 1).toISOString().split('T')[0];
          this.form.end_date = new Date(year, month + 1, 0).toISOString().split('T')[0];
          break;
        case 'quarterly':
          const quarter = Math.floor(month / 3);
          this.form.start_date = new Date(year, quarter * 3, 1).toISOString().split('T')[0];
          this.form.end_date = new Date(year, (quarter + 1) * 3, 0).toISOString().split('T')[0];
          break;
        case 'annual':
          this.form.start_date = new Date(year, 0, 1).toISOString().split('T')[0];
          this.form.end_date = new Date(year, 11, 31).toISOString().split('T')[0];
          break;
        case 'custom':
          // L'utilisateur saisit manuellement
          break;
      }
    },
    updateCriteriaScores() {
      const scores = {};
      Object.keys(this.criteria).forEach(key => {
        if (this.criteria[key].score !== null && this.criteria[key].score !== undefined) {
          scores[key] = this.criteria[key].score;
        }
      });
      this.form.criteria_scores = scores;
      
      // Mettre à jour le score global si calculé
      if (this.calculatedScore !== null) {
        this.form.overall_score = this.calculatedScore;
      }
    },
    async submit() {
      this.loading = true;
      try {
        // S'assurer que criteria_scores est à jour
        this.updateCriteriaScores();
        
        // Utiliser le score calculé si overall_score n'est pas renseigné
        if (!this.form.overall_score && this.calculatedScore !== null) {
          this.form.overall_score = this.calculatedScore;
        }
        
        const payload = {
          employers_id: this.form.employers_id,
          services_id: this.form.services_id,
          period_type: this.form.period_type,
          start_date: this.form.start_date,
          end_date: this.form.end_date,
          overall_score: this.form.overall_score,
          criteria_scores: this.form.criteria_scores,
          comments: this.form.comments,
        };
        
        const res = await employerPerformanceService.createEmployerPerformance(payload);
        const uuid = res && res.data && res.data.data && res.data.data.uuid ? res.data.data.uuid : null;
        this.$toast.success("Évaluation créée avec succès");
        this.$router.push(uuid ? `/grh/performance/${uuid}` : "/grh/performance");
      } catch (err) {
        console.error(err);
        this.$toast.error("Erreur lors de la création de l'évaluation");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
fieldset {
  border-radius: 4px;
}
legend {
  font-size: 14px;
  font-weight: bold;
}
</style>

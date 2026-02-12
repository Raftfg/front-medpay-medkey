<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <h3 class="card-title text-white rounded p-1 mb-1 text-center"
          style="background-color:#0B5D3F; box-shadow:0 4px 6px rgba(0,0,0,.1); text-transform:none;">
          Détail de l'évaluation de performance
        </h3>
        <div class="card">
          <div class="card-body">
            <div v-if="loading" class="text-center py-4">Chargement...</div>

            <div v-else>
              <div class="row mb-4">
                <div class="col-md-6">
                  <h5>Informations générales</h5>
                  <table class="table table-sm table-borderless">
                    <tr>
                      <td><b>Employé:</b></td>
                      <td>
                        <span v-if="performance.employer">
                          {{ performance.employer.last_name }} {{ performance.employer.first_name }}
                        </span>
                        <span v-else>-</span>
                      </td>
                    </tr>
                    <tr>
                      <td><b>Service:</b></td>
                      <td>
                        <span v-if="performance.service">{{ performance.service.name }}</span>
                        <span v-else>-</span>
                      </td>
                    </tr>
                    <tr>
                      <td><b>Type de période:</b></td>
                      <td>{{ periodTypeLabel(performance.period_type) }}</td>
                    </tr>
                    <tr>
                      <td><b>Période:</b></td>
                      <td>{{ formatDate(performance.start_date) }} - {{ formatDate(performance.end_date) }}</td>
                    </tr>
                    <tr>
                      <td><b>Évaluateur:</b></td>
                      <td>
                        <span v-if="performance.evaluator">
                          {{ performance.evaluator.name || performance.evaluator.email }}
                        </span>
                        <span v-else>-</span>
                      </td>
                    </tr>
                  </table>
                </div>
                <div class="col-md-6">
                  <h5>Score global</h5>
                  <div class="text-center p-4 border rounded">
                    <h2 class="mb-0" :class="scoreClass(performance.overall_score)">
                      {{ performance.overall_score !== null && performance.overall_score !== undefined ? performance.overall_score : 'N/A' }}
                    </h2>
                    <small class="text-muted">sur 100</small>
                  </div>
                </div>
              </div>

              <div class="mb-4" v-if="performance.comments">
                <h5>Commentaires</h5>
                <div class="p-3 border rounded bg-light">
                  {{ performance.comments }}
                </div>
              </div>

              <div class="mb-4" v-if="performance.criteria_scores && Object.keys(performance.criteria_scores).length > 0">
                <h5>Détail des critères d'évaluation</h5>
                <div class="table-responsive">
                  <table class="table table-bordered table-hover">
                    <thead>
                      <tr style="background-color: rgb(216, 218, 216)">
                        <th>Critère</th>
                        <th>Description</th>
                        <th class="text-center">Score</th>
                        <th class="text-center">Appréciation</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(score, key) in performance.criteria_scores" :key="key">
                        <td><b>{{ criterionLabel(key) }}</b></td>
                        <td>{{ criterionDescription(key) }}</td>
                        <td class="text-center">
                          <span :class="scoreClass(score)">{{ score }}</span> / 100
                        </td>
                        <td class="text-center">
                          <span :class="appreciationClass(score)">{{ appreciation(score) }}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div v-else class="alert alert-info">
                Aucun critère détaillé renseigné pour cette évaluation.
              </div>

              <div class="d-flex gap-2">
                <router-link class="btn btn-light" to="/grh/performance">Retour à la liste</router-link>
                <button class="btn btn-danger btn-sm" @click="confirmDelete" :disabled="actionLoading">
                  {{ actionLoading ? '...' : 'Supprimer' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { employerPerformanceService } from "@/_services";

export default {
  name: "PerformanceDetail",
  props: ["uuid"],
  data() {
    return {
      loading: false,
      actionLoading: false,
      performance: {},
      criteriaLabels: {
        ponctualite: "Ponctualité",
        assiduite: "Assiduité",
        qualite_soins: "Qualité des soins",
        collaboration: "Collaboration",
        respect_procedures: "Respect des procédures",
        gestion_urgence: "Gestion des urgences",
      },
      criteriaDescriptions: {
        ponctualite: "Respect des horaires de travail",
        assiduite: "Présence et régularité",
        qualite_soins: "Qualité de la prise en charge des patients",
        collaboration: "Travail en équipe et communication",
        respect_procedures: "Respect des protocoles hospitaliers",
        gestion_urgence: "Réactivité et efficacité en situation d'urgence",
      },
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      this.loading = true;
      try {
        const res = await employerPerformanceService.getEmployerPerformance(this.uuid);
        this.performance = (res && res.data && res.data.data) ? res.data.data : {};
      } catch (e) {
        console.error(e);
        this.$toast.error("Erreur chargement évaluation");
      } finally {
        this.loading = false;
      }
    },
    async confirmDelete() {
      if (!confirm("Supprimer cette évaluation ? Cette action est irréversible.")) return;
      this.actionLoading = true;
      try {
        await employerPerformanceService.deleteEmployerPerformance(this.uuid);
        this.$toast.success("Évaluation supprimée");
        this.$router.push("/grh/performance");
      } catch (e) {
        console.error(e);
        this.$toast.error("Erreur suppression");
      } finally {
        this.actionLoading = false;
      }
    },
    formatDate(d) {
      if (!d) return "-";
      return new Date(d).toLocaleDateString("fr-FR");
    },
    periodTypeLabel(type) {
      const map = {
        monthly: "Mensuelle",
        quarterly: "Trimestrielle",
        annual: "Annuelle",
        custom: "Personnalisée",
      };
      return map[type] || type;
    },
    criterionLabel(key) {
      return this.criteriaLabels[key] || key;
    },
    criterionDescription(key) {
      return this.criteriaDescriptions[key] || "";
    },
    scoreClass(score) {
      if (score === null || score === undefined) return "";
      if (score >= 80) return "text-success";
      if (score >= 60) return "text-warning";
      return "text-danger";
    },
    appreciation(score) {
      if (score === null || score === undefined) return "N/A";
      if (score >= 80) return "Excellent";
      if (score >= 60) return "Satisfaisant";
      return "À améliorer";
    },
    appreciationClass(score) {
      if (score === null || score === undefined) return "badge badge-secondary";
      if (score >= 80) return "badge badge-success";
      if (score >= 60) return "badge badge-warning";
      return "badge badge-danger";
    },
  },
};
</script>

<style scoped>
.table-borderless td {
  border: none;
  padding: 0.5rem 1rem 0.5rem 0;
}
</style>

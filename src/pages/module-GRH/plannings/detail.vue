<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <h3 class="card-title text-white rounded p-1 mb-1 text-center"
          style="background-color:#0B5D3F; box-shadow:0 4px 6px rgba(0,0,0,.1); text-transform:none;">
          Détail du planning
        </h3>
        <div class="card">
          <div class="card-body">
            <div v-if="loading" class="text-center py-4">Chargement...</div>

            <div v-else>
              <div class="row mb-3">
                <div class="col-md-6">
                  <p><b>Période:</b> {{ formatDate(planning.start_date) }} - {{ formatDate(planning.end_date) }}</p>
                  <p><b>Type:</b> {{ planning.period_type }}</p>
                  <p><b>Statut:</b> <span :class="statusClass(planning.status)">{{ planning.status }}</span></p>
                </div>
                <div class="col-md-6">
                  <p><b>Employé:</b> <span v-if="planning.employer">{{ planning.employer.last_name }} {{ planning.employer.first_name }}</span><span v-else>-</span></p>
                  <p><b>Service:</b> <span v-if="planning.service">{{ planning.service.name }}</span><span v-else>-</span></p>
                </div>
              </div>

              <div class="mb-3" v-if="planning.notes">
                <p><b>Notes:</b></p>
                <div class="p-2 border rounded">{{ planning.notes }}</div>
              </div>

              <div class="d-flex gap-2 mb-3">
                <button v-if="planning.status === 'draft'" class="btn btn-success btn-sm" @click="publish" :disabled="actionLoading">
                  {{ actionLoading ? '...' : 'Publier' }}
                </button>
                <router-link class="btn btn-light btn-sm" to="/grh/plannings">Retour</router-link>
              </div>

              <hr />

              <h5>Shifts</h5>
              <div class="table-responsive">
                <table class="table table-bordered table-hover">
                  <thead>
                    <tr style="background-color: rgb(216, 218, 216)">
                      <th>Date</th>
                      <th>Employé</th>
                      <th>Heures</th>
                      <th>Type</th>
                      <th>Service</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="s in (planning.shifts || [])" :key="s.uuid">
                      <td>{{ formatDate(s.shift_date) }}</td>
                      <td><span v-if="s.employer">{{ s.employer.last_name }} {{ s.employer.first_name }}</span><span v-else>-</span></td>
                      <td>{{ s.start_time }} - {{ s.end_time }}</td>
                      <td>{{ s.shift_type }}</td>
                      <td><span v-if="s.service">{{ s.service.name }}</span><span v-else>-</span></td>
                      <td>{{ s.status }}</td>
                    </tr>
                    <tr v-if="!planning.shifts || planning.shifts.length === 0">
                      <td colspan="6" class="text-center">Aucun shift pour ce planning (à implémenter ensuite)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { planningService } from "@/_services";

export default {
  name: "PlanningDetail",
  props: ["uuid"],
  data() {
    return {
      loading: false,
      actionLoading: false,
      planning: {},
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      this.loading = true;
      try {
        const res = await planningService.getWorkSchedule(this.uuid);
        this.planning = (res && res.data && res.data.data) ? res.data.data : {};
      } catch (e) {
        console.error(e);
        this.$toast.error("Erreur chargement planning");
      } finally {
        this.loading = false;
      }
    },
    async publish() {
      if (!confirm("Publier ce planning ?")) return;
      this.actionLoading = true;
      try {
        await planningService.publishWorkSchedule(this.uuid);
        this.$toast.success("Planning publié");
        await this.load();
      } catch (e) {
        console.error(e);
        this.$toast.error("Erreur publication");
      } finally {
        this.actionLoading = false;
      }
    },
    formatDate(d) {
      if (!d) return "-";
      return new Date(d).toLocaleDateString("fr-FR");
    },
    statusClass(status) {
      const map = {
        draft: "badge badge-warning",
        published: "badge badge-success",
        archived: "badge badge-secondary",
      };
      return map[status] || "badge badge-info";
    },
  },
};
</script>


<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <h3 class="card-title text-white rounded p-1 mb-1 text-center"
          style="background-color:#0B5D3F; box-shadow:0 4px 6px rgba(0,0,0,.1); text-transform:none;">
          Congés et absences
        </h3>

        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <router-link to="/grh/vacations/create" class="btn btn-success btn-sm">Nouvelle demande</router-link>
              <button class="btn btn-light btn-sm" @click="load" :disabled="loading">{{ loading ? '...' : 'Rafraîchir' }}</button>
            </div>

            <div class="table-responsive" style="min-height:200px">
              <table id="order-listing" ref="myTable" class="table table-bordered table-hover">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Utilisateur</th>
                    <th>Type</th>
                    <th>Période</th>
                    <th>Statut</th>
                    <th>Motif rejet</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(v, i) in vacations" :key="v.uuid">
                    <td>{{ i + 1 }}</td>
                    <td>
                      <span v-if="v.user">
                        {{ v.user.name || (v.user.prenom && v.user.nom_utilisateur ? `${v.user.prenom} ${v.user.nom_utilisateur}` : v.user.email) }}
                      </span>
                      <span v-else class="text-muted">{{ v.users_id || '-' }}</span>
                    </td>
                    <td>
                      <span v-if="v.type_vacation">{{ v.type_vacation.name }}</span>
                      <span v-else class="text-muted">{{ v.type_vacations_id || '-' }}</span>
                    </td>
                    <td>{{ formatDate(v.start_date) }} - {{ formatDate(v.end_date) }}</td>
                    <td><span :class="statusClass(v.status)">{{ statusLabel(v.status) }}</span></td>
                    <td>{{ v.reject_reason || '-' }}</td>
                    <td class="text-center">
                      <button class="btn btn-success btn-sm mr-1" v-if="(v.status || '').toLowerCase() !== 'approved'" @click="approve(v.uuid)" :disabled="actionLoading">
                        Approuver
                      </button>
                      <button class="btn btn-danger btn-sm" v-if="(v.status || '').toLowerCase() !== 'rejected'" @click="reject(v.uuid)" :disabled="actionLoading">
                        Rejeter
                      </button>
                    </td>
                  </tr>
                  <tr v-if="vacations.length === 0">
                    <td colspan="7" class="text-center">Aucune demande</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from "jquery";
import { vacationService } from "@/_services";

export default {
  name: "VacationIndex",
  data() {
    return {
      loading: false,
      actionLoading: false,
      vacations: [],
      table: null,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      this.loading = true;
      try {
        const res = await vacationService.getAllVacations();
        this.vacations = (res && res.data && res.data.data) ? res.data.data : [];
      } catch (e) {
        console.error(e);
        this.$toast.error("Erreur chargement congés");
      } finally {
        this.loading = false;
        this.$nextTick(() => {
          if (this.$refs.myTable) {
            if ($.fn.DataTable && $.fn.DataTable.isDataTable(this.$refs.myTable)) {
              $(this.$refs.myTable).DataTable().destroy();
            }
            if ($.fn.DataTable) {
              this.table = $(this.$refs.myTable).DataTable({
                pageLength: 10,
              });
            }
          }
        });
      }
    },
    async approve(uuid) {
      if (!confirm("Approuver cette demande ?")) return;
      this.actionLoading = true;
      try {
        await vacationService.approveVacation(uuid, {});
        this.$toast.success("Demande approuvée");
        await this.load();
      } catch (e) {
        console.error(e);
        this.$toast.error("Erreur approbation");
      } finally {
        this.actionLoading = false;
      }
    },
    async reject(uuid) {
      const reason = prompt("Motif du rejet ?");
      if (!reason) return;
      this.actionLoading = true;
      try {
        await vacationService.rejectVacation(uuid, { reject_reason: reason });
        this.$toast.success("Demande rejetée");
        await this.load();
      } catch (e) {
        console.error(e);
        this.$toast.error("Erreur rejet");
      } finally {
        this.actionLoading = false;
      }
    },
    formatDate(d) {
      if (!d) return "-";
      return new Date(d).toLocaleDateString("fr-FR");
    },
    statusClass(status) {
      const s = (status || "").toLowerCase();
      if (s === "approved") return "badge badge-success";
      if (s === "rejected") return "badge badge-danger";
      return "badge badge-warning";
    },
    statusLabel(status) {
      const s = (status || "").toLowerCase();
      const map = {
        pending: "En attente",
        approved: "Approuvé",
        rejected: "Rejeté",
      };
      return map[s] || status || "-";
    },
  },
};
</script>


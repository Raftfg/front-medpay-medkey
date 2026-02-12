<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <h3 class="card-title text-white rounded p-1 mb-1 text-center" style="background-color: #0B5D3F; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-transform: none;">
          Plannings de travail
        </h3>
        <div class="card">
          <div class="card-body">
            <div class="input-group input-group-sm mb-3 w-100">
              <router-link to="/grh/plannings/create">
                <button class="btn btn-success btn-sm btn-medpay-green-small" type="button">
                  Nouveau planning
                </button>
              </router-link>
              &nbsp;&nbsp;
              <input 
                @input="fetchPlannings(q)" 
                type="text" 
                v-model="q" 
                class="form-control rounded-pill py-3" 
                placeholder="Rechercher un planning ..."
                aria-label="">
            </div>

            <div class="table-responsive" style="min-height:200px">
              <table id="plannings-table" ref="myTable" class="table table-bordered table-hover">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Employé</th>
                    <th>Service</th>
                    <th>Période</th>
                    <th>Type</th>
                    <th>Statut</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(planning, index) in plannings" :key="planning.uuid">
                    <td>{{ index + 1 }}</td>
                    <td>
                      <span v-if="planning.employer">
                        {{ planning.employer.last_name }} {{ planning.employer.first_name }}
                      </span>
                      <span v-else>-</span>
                    </td>
                    <td>
                      <span v-if="planning.service">
                        {{ planning.service.name }}
                      </span>
                      <span v-else>-</span>
                    </td>
                    <td>
                      {{ formatDate(planning.start_date) }} - {{ formatDate(planning.end_date) }}
                    </td>
                    <td>{{ planning.period_type }}</td>
                    <td>
                      <span :class="getStatusClass(planning.status)">
                        {{ planning.status }}
                      </span>
                    </td>
                    <td class="text-center">
                      <div class="btn-group btn-group-sm" role="group">
                        <button
                          id="btnGroupDrop1"
                          type="button"
                          style="padding: 0px 10px"
                          class="btn btn-light dropdown-toggle"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          &nbsp;
                          <i class="fa fa-tasks" aria-hidden="true"></i> &nbsp;
                        </button>
                        <div class="dropdown-menu action-button-div" aria-labelledby="btnGroupDrop1" style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%)">
                          <a @click="viewDetail(planning.uuid)" class="dropdown-item" style="cursor: pointer;">
                            <i class="mdi mdi-eye menu-icon"></i>Détail
                          </a>
                          <hr class="m-1" />
                          <a @click="editPlanning(planning.uuid)" class="dropdown-item" style="cursor: pointer;">
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>Modifier
                          </a>
                          <a v-if="planning.status === 'draft'" @click="publishPlanning(planning.uuid)" class="dropdown-item" style="cursor: pointer;">
                            <i class="mdi mdi-check menu-icon"></i>Publier
                          </a>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="plannings.length === 0">
                    <td colspan="7" class="text-center">Aucun planning trouvé</td>
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
import { planningService } from "@/_services";

export default {
  name: "Plannings",
  data() {
    return {
      plannings: [],
      q: "",
      table: null,
    };
  },
  mounted() {
    this.loadPlannings();
  },
  methods: {
    loadPlannings() {
      planningService.getAllWorkSchedules().then((res) => {
        this.plannings = res.data.data || [];
        this.$nextTick(() => {
          if (this.$refs.myTable && !this.table) {
            this.table = $(this.$refs.myTable).DataTable({
              dom: '<"row mb-3"<"col-md-12"B>>' +
                   '<"row mb-0"<"col-md-6"l><"col-md-6"f>>' +
                   '<"row"<"col-md-12"tr>>' +
                   '<"row"<"col-md-6"i><"col-md-6"p>>',
              pageLength: 10,
              language: {
                url: "//cdn.datatables.net/plug-ins/1.10.24/i18n/French.json"
              },
              buttons: [
                { extend: "pdfHtml5", charset: 'utf-8', bom: true, className: 'btn btn-gray btn-sm' },
                { extend: "print", charset: 'utf-8', bom: true, className: 'btn btn-gray btn-sm' },
              ],
            });
          }
        });
      }).catch((err) => {
        console.error("Erreur lors du chargement des plannings:", err);
        this.$toast.error("Erreur lors du chargement des plannings");
      });
    },
    fetchPlannings(query) {
      if (query && query.length > 2) {
        planningService.getAllWorkSchedules({ q: query }).then((res) => {
          this.plannings = res.data.data || [];
        });
      } else if (!query) {
        this.loadPlannings();
      }
    },
    viewDetail(uuid) {
      this.$router.push("/grh/plannings/" + uuid);
    },
    editPlanning(uuid) {
      // TODO: Implémenter l'édition
      this.$toast.info("Fonctionnalité en cours de développement");
    },
    publishPlanning(uuid) {
      if (confirm("Voulez-vous publier ce planning ?")) {
        planningService.publishWorkSchedule(uuid).then(() => {
          this.$toast.success("Planning publié avec succès");
          this.loadPlannings();
        }).catch((err) => {
          console.error("Erreur lors de la publication:", err);
          this.$toast.error("Erreur lors de la publication");
        });
      }
    },
    formatDate(date) {
      if (!date) return "-";
      return new Date(date).toLocaleDateString('fr-FR');
    },
    getStatusClass(status) {
      const classes = {
        'draft': 'badge badge-warning',
        'published': 'badge badge-success',
        'archived': 'badge badge-secondary',
      };
      return classes[status] || 'badge badge-info';
    },
  },
};
</script>

<style scoped>
@import "../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
@import "../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";
</style>

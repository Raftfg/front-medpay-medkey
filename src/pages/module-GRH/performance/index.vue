<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <h3 class="card-title text-white rounded p-1 mb-1 text-center"
          style="background-color:#0B5D3F; box-shadow:0 4px 6px rgba(0,0,0,.1); text-transform:none;">
          Évaluation des performances
        </h3>
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <router-link to="/grh/performance/create" class="btn btn-success btn-sm">
                Nouvelle évaluation
              </router-link>
              <button class="btn btn-light btn-sm" @click="load" :disabled="loading">
                {{ loading ? 'Chargement...' : 'Rafraîchir' }}
              </button>
            </div>

            <div class="row mb-3">
              <div class="col-md-3">
                <div class="form-group">
                  <label>Service</label>
                  <select v-model.number="filters.services_id" class="form-control" @change="load">
                    <option :value="null">Tous</option>
                    <option v-for="s in services" :key="s.id || s.uuid" :value="s.id">
                      {{ s.name }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>Type de période</label>
                  <select v-model="filters.period_type" class="form-control" @change="load">
                    <option value="">Tous</option>
                    <option value="monthly">Mensuelle</option>
                    <option value="quarterly">Trimestrielle</option>
                    <option value="annual">Annuelle</option>
                    <option value="custom">Libre</option>
                  </select>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>Du</label>
                  <input type="date" v-model="filters.start_date" class="form-control" @change="load" />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label>Au</label>
                  <input type="date" v-model="filters.end_date" class="form-control" @change="load" />
                </div>
              </div>
            </div>

            <div class="table-responsive" style="min-height:200px">
              <table id="order-listing" ref="myTable" class="table table-bordered table-hover">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Employé</th>
                    <th>Service</th>
                    <th>Période</th>
                    <th>Type</th>
                    <th>Score</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(p, i) in performances" :key="p.uuid">
                    <td>{{ i + 1 }}</td>
                    <td>
                      <span v-if="p.employer">
                        {{ p.employer.last_name }} {{ p.employer.first_name }}
                      </span>
                      <span v-else>-</span>
                    </td>
                    <td>
                      <span v-if="p.service">{{ p.service.name }}</span>
                      <span v-else>-</span>
                    </td>
                    <td>{{ formatDate(p.start_date) }} - {{ formatDate(p.end_date) }}</td>
                    <td>{{ labelPeriodType(p.period_type) }}</td>
                    <td>{{ p.overall_score != null ? p.overall_score : '-' }}</td>
                    <td class="text-center">
                      <button class="btn btn-light btn-sm" @click="viewDetail(p.uuid)">
                        Détail
                      </button>
                    </td>
                  </tr>
                  <tr v-if="performances.length === 0">
                    <td colspan="7" class="text-center">Aucune évaluation</td>
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
import { employerPerformanceService, serviceService } from "@/_services";

export default {
  name: "PerformanceIndex",
  data() {
    return {
      loading: false,
      performances: [],
      services: [],
      table: null,
      filters: {
        services_id: null,
        period_type: "",
        start_date: "",
        end_date: "",
      },
    };
  },
  mounted() {
    this.loadRefs();
    this.load();
  },
  methods: {
    async loadRefs() {
      try {
        const res = await serviceService.getAllServices();
        this.services = (res && res.data && res.data.data) ? res.data.data : [];
      } catch (e) {
        console.error(e);
      }
    },
    async load() {
      this.loading = true;
      try {
        const params = {};
        if (this.filters.services_id) params.services_id = this.filters.services_id;
        if (this.filters.period_type) params.period_type = this.filters.period_type;
        if (this.filters.start_date) params.start_date = this.filters.start_date;
        if (this.filters.end_date) params.end_date = this.filters.end_date;

        const res = await employerPerformanceService.getAllEmployerPerformances(params);
        this.performances = (res && res.data && res.data.data) ? res.data.data : [];
      } catch (e) {
        console.error(e);
        this.$toast && this.$toast.error && this.$toast.error("Erreur chargement performances");
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
    viewDetail(uuid) {
      this.$router.push("/grh/performance/" + uuid);
    },
    formatDate(d) {
      if (!d) return "-";
      return new Date(d).toLocaleDateString("fr-FR");
    },
    labelPeriodType(t) {
      if (t === "monthly") return "Mensuelle";
      if (t === "quarterly") return "Trimestrielle";
      if (t === "annual") return "Annuelle";
      return "Libre";
    },
  },
};
</script>
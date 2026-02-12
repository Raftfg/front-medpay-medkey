<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <h3 class="card-title text-white rounded p-1 mb-1 text-center"
          style="background-color:#0B5D3F; box-shadow:0 4px 6px rgba(0,0,0,.1); text-transform:none;">
          Formations
        </h3>
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <router-link to="/grh/formations/create" class="btn btn-success btn-sm">Nouvelle formation</router-link>
              <button class="btn btn-light btn-sm" @click="load" :disabled="loading">{{ loading ? '...' : 'Rafraîchir' }}</button>
            </div>

            <div class="table-responsive" style="min-height:200px">
              <table id="order-listing" ref="myTable" class="table table-bordered table-hover">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Titre</th>
                    <th>Période</th>
                    <th>Lieu</th>
                    <th>Document</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(f, i) in formations" :key="f.uuid">
                    <td>{{ i + 1 }}</td>
                    <td>{{ f.title }}</td>
                    <td>{{ formatDate(f.start_date) }} - {{ formatDate(f.end_date) }}</td>
                    <td>{{ f.place }}</td>
                    <td>
                      <a v-if="f.document_link" :href="f.document_link" target="_blank" rel="noopener">Voir</a>
                      <span v-else>-</span>
                    </td>
                  </tr>
                  <tr v-if="formations.length === 0">
                    <td colspan="5" class="text-center">Aucune formation</td>
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
import { formationService } from "@/_services";

export default {
  name: "FormationsIndex",
  data() {
    return {
      loading: false,
      formations: [],
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
        const res = await formationService.getAllFormations();
        this.formations = (res && res.data && res.data.data) ? res.data.data : [];
      } catch (e) {
        console.error(e);
        this.$toast.error("Erreur chargement formations");
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
    formatDate(d) {
      if (!d) return "-";
      return new Date(d).toLocaleDateString("fr-FR");
    },
  },
};
</script>


<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-4 text-center"
              style="background-color:#0B5D3F; box-shadow:0 4px 6px rgba(0,0,0,.1);">
              Nouvelle formation
            </h3>

            <form @submit.prevent="submit">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Titre <span style="color:red">*</span></label>
                    <input v-model="form.title" class="form-control" required />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Lieu</label>
                    <input v-model="form.place" class="form-control" />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Date début <span style="color:red">*</span></label>
                    <input v-model="form.start_date" type="date" class="form-control" required />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Date fin <span style="color:red">*</span></label>
                    <input v-model="form.end_date" type="date" class="form-control" required />
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label>Lien document</label>
                <input v-model="form.document_link" class="form-control" placeholder="https://..." />
              </div>

              <div class="d-flex gap-2">
                <button class="btn btn-success btn-medpay-green" type="submit" :disabled="loading">
                  {{ loading ? 'Enregistrement...' : 'Enregistrer' }}
                </button>
                <router-link class="btn btn-light" to="/grh/formations">Annuler</router-link>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { formationService } from "@/_services";

export default {
  name: "FormationCreate",
  data() {
    return {
      loading: false,
      form: {
        title: "",
        start_date: "",
        end_date: "",
        place: "",
        document_link: "",
      },
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      try {
        await formationService.createFormation(this.form);
        this.$toast.success("Formation créée");
        this.$router.push("/grh/formations");
      } catch (e) {
        console.error(e);
        this.$toast.error("Erreur création formation");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>


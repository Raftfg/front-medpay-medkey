<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-3 text-center" style="
                            background-color: #0b5d3f;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                          ">
              Ajouter un pack d'assurance
            </h3>

            <form @submit.prevent="addAssurance" class="forms-sample">

              <div v-for="(pack, index) in selectedPacks" :key="index" class="row">
                <div class="col-md-4">
                  <div class="form-group">
                    <label :for="'insurancesId' + index">Assurance <span style="color: red">*</span></label>
                    <select v-model="pack.insurancesId"
                      :class="{ 'form-control': true, 'is-invalid': formErrors.insurancesId }"
                      :id="'insurancesId' + index" @change="clearError('insurancesId')">
                      <option value="" disabled selected>Sélectionnez une assurance</option>
                      <option value="1">Caisse mutuelle de prévoyance sociale</option>
                      <option value="2">Assurance indigents</option>
                      <option value="3">Manifestation post vaccinale</option>
                      <option value="4">Carte_valeur_personnel_HZ/LA</option>
                    </select>
                    <div class="invalid-feedback" v-if="formErrors.insurancesId">
                      {{ formErrors.insurancesId }}
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label :for="'packName' + index">Désignation <span style="color: red">*</span></label>
                    <input v-model="pack.packName" :class="{ 'form-control': true, 'is-invalid': formErrors.packName }"
                      type="text" :id="'packName' + index" :placeholder="'Désignation du pack ' + (index + 1)"
                      @input="clearError('packName')" />
                    <div class="invalid-feedback" v-if="formErrors.packName">
                      {{ formErrors.packName }}
                    </div>
                  </div>
                </div>


                <div class="col-md-4">
                  <div class="form-group">
                    <label :for="'packPercentage' + index">Pourcentage <span style="color: red">*</span></label>
                    <input v-model="pack.packPercentage"
                      :class="{ 'form-control': true, 'is-invalid': formErrors.packPercentage }" type="number"
                      :id="'packPercentage' + index" :placeholder="'Pourcentage du pack ' + (index + 1)" min="0" max="100"
                      @input="clearError('packPercentage')" />
                    <div class="invalid-feedback" v-if="formErrors.packPercentage">
                      {{ formErrors.packPercentage }}
                    </div>
                  </div>
                </div>
                <div class="col-md-2">
                  <span @click="ajouterLigne" v-if="index === selectedPacks.length - 1" class="btn btn-success btn-sm"
                    style="cursor: pointer;">+</span>
                  <span @click="supprimerLigne(index)" v-if="index !== 0" class="btn btn-danger btn-sm"
                    style="cursor: pointer;">-</span>
                </div>
              </div>

              <div class="d-flex justify-content-between col-12 flex-row mt-2">
                <button class="btn btn-danger btn-medpay-gray" @click="cancel">
                  Annuler
                </button>
                <button type="submit" class="btn btn-success btn-medpay-green">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      selectedPacks: [
        { packName: '', insurancesId: '', packPercentage: '' }
      ],
      formErrors: {},
      // ... autres données
    };
  },
  methods: {
    addAssurance() {
      // Logique pour ajouter l'assurance avec les packs sélectionnés
    },
    ajouterLigne() {
      this.selectedPacks.push({ packName: '', insurancesId: '', packPercentage: '' });
    },
    supprimerLigne(index) {
      if (this.selectedPacks.length > 1) {
        this.selectedPacks.splice(index, 1);
      }
    },
    cancel() {
      // Logique pour annuler l'opération
    },
    clearError(field) {
      this.formErrors[field] = null;
    }
  }
};
</script>
<style>
.form-control {
  padding: 0px;
}

.card .card-title {
  text-transform: none;
}
</style>
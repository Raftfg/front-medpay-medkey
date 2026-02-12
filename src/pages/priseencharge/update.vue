<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-3 text-center"
              style="background-color: #0B5D3F; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              Modifier packs pour patient
            </h3>
            <form @submit.prevent="updatePacks" class="forms-sample">
              <div v-for="(pack, index) in selectedPacks" :key="index" class="row">
                <div class="form-group col-md-3">
                  <label :for="'selectAssurance' + index">Sélectionnez une assurance<span
                      style="color: red">*</span></label>
                  <select v-model="pack.assuranceId" class="form-control" :id="'selectAssurance' + index">
                    <option value="" selected>
                      Sélectionnez une assurance
                    </option>
                    <option value="1">
                      Caisse mutuelle de prévoyance sociale
                    </option>
                    <option value="2">
                      Assurance indigents
                    </option>
                    <option value="3">
                      Manifestation post vaccinale
                    </option>
                    <option value="4">
                      Carte_valeur_personnel_HZ/LA
                    </option>
                    <option value="5">
                      CARTE_VALEUR_M100%
                    </option>
                  </select>
                </div>
                <div class="form-group col-md-3">
                  <label :for="'selectPack' + index">Sélectionnez un pack<span style="color: red">*</span></label>
                  <select v-model="pack.packId" class="form-control" :id="'selectPack' + index">
                    <option value="" selected>Sélectionnez un pack</option>
                    <option value="1">PACK 10% DE l'IMAGERIE </option>
                    <option value="2">PACK 86% DES MEDICAMENTS</option>
                    <option value="3"> MAPI_ROUTINE_100%</option>
                    <option value="4">MAPI_COVID19_100%</option>
                    <option value="5"> CARTE_VALEUR_M100%</option>
                  </select>
                </div>
                <div class="form-group col-md-3">
                  <label :for="'dateDebutPack' + index">Date de début<span style="color: red">*</span></label>
                  <input v-model="pack.dateDebut" type="date" class="form-control" :id="'dateDebutPack' + index">
                </div>
                <div class="form-group col-md-3">
                  <label :for="'dateFinPack' + index">Date de fin<span style="color: red">*</span></label>
                  <input v-model="pack.dateFin" type="date" class="form-control" :id="'dateFinPack' + index">
                </div>
                <div class="form-group col-md-12">
                  <label :for="'observation' + index">Observations</label>
                  <textarea v-model="pack.observation" type="text" placeholder="Observations..." class="form-control"
                    :id="'observation' + index" :rows="6"></textarea>
                </div>
                <div class="col-md-2">
                  <span @click="ajouterLigne" v-if="index === selectedPacks.length - 1" class="btn btn-success btn-sm"
                    style="cursor: pointer;">+</span>
                  <span @click="supprimerLigne(index)" v-if="index !== 0" class="btn btn-danger btn-sm"
                    style="cursor: pointer;">-</span>
                </div>
              </div>

              <div class="d-flex justify-content-between col-12 flex-row mt-2">
                <button class="btn btn-danger btn-medpay-gray" @click="cancel">Annuler</button>
                <button type="submit" class="btn btn-success btn-medpay-green">Modifier</button>
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
        {
          assuranceId: "2",
          packId: "2",
          dateDebut: new Date().toISOString().split("T")[0],  // Date de début par défaut
          dateFin: new Date().toISOString().split("T")[0],    // Date de fin par défaut
          observation: "Cool"
        }
      ],
      packs: []  // Assurez-vous de remplir cette liste avec vos packs disponibles
    };
  },
  methods: {
    updatePacks() {
      // Logique pour mettre à jour les packs du patient
    },
    ajouterLigne() {
      this.selectedPacks.push({ assuranceId: "", packId: "", dateDebut: null, dateFin: null, observation: null });
    },
    supprimerLigne(index) {
      if (this.selectedPacks.length > 1) {
        this.selectedPacks.splice(index, 1);
      }
    },
    cancel() {
      // Logique pour annuler l'opération de modification
    }
  }
};
</script>

<style>
select,
input {
  text-transform: none;
}

.form-control {
  padding: 0px;
}

.card .card-title {
  text-transform: none;
}
</style>

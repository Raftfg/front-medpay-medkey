<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-4 text-center"
              style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              Ajouter des packs à une assurance
            </h3>
            <form @submit.prevent="submitForm" class="forms-sample row">
              <div class="col-md-12">
                <div class="row">
                  <div class="form-group form-controls col-md-6">
                    <label for="store">Assurance<span style="color: red">*</span></label>
                    <select class="form-control" v-model="selectedAssurance" style="text-transform: uppercase">
                      <option value="" selected disabled>Sélectionner une assurance</option>
                      <option v-for="insurance in insurances" :value="insurance.uuid" :key="insurance.uuid"
                        style="text-transform: uppercase">
                        {{ insurance.name }}
                      </option>
                      <small v-if="errors && errors.insurances_id" class="text-danger">{{ errors.insurances_id[0]
                      }}</small>
                    </select>

                  </div>
                </div>
                <div class="">
                  <div class="d-flex flex-column mb-2" id="supplyProductList">
                    <div class="form-group row customize-row">
                      <div class="col-md-6 col-sm-12 mt-3 my-auto  "><label class="form-label text-white p-2"
                          style="background-color: #0b5d3f; width: 100%;  text-align: center; text-transform: uppercase;">
                          Nom du Pack<span class="text-danger">*</span></label>
                      </div>
                      <div class="col-md-5 mt-3 my-auto "><label class="form-label text-white p-2"
                          style="background-color: #0b5d3f; width: 100%;  text-align: center; text-transform: uppercase;">Pourcentage<span
                            class="text-danger">*</span></label></div>
                      <!-- <div class="col-md-2 mt-3"><button @click="addNewRow" class="btn btn-success btn-sm add  "
                          style="font-size: 10px; margin-top:-21px" type="button" name="add"><span
                            class="fa fa-plus"></span></button>
                      </div> -->
                      <div class="col-md-1 d-flex flex-row justify-content-end align-items-center pl-1 pr-0"
                        style="max-width: 40px;"><button @click="addNewRow" class="btn btn-success btn-sm add  "
                          style="margin-top: -7px;margin-right: -39px;" type="button" name="add"><span
                            class="fa fa-plus"></span></button>
                      </div>
                    </div>

                    <div v-for="(pack, index) in packs" :key="index" class="form-group row customize-row">
                      <div class="col-md-6">
                        <input v-model="pack.designation" type="text" class="form-control"
                          :placeholder="'Pack ' + (index + 1)">
                        <small v-if="errors && errors.packs && errors.packs[index] && errors.packs[index].designation"
                          class="text-danger">{{ errors.packs[index].designation[0] }}</small>
                      </div>
                      <div class="col-md-5">
                        <input v-model="pack.percentage" type="number" class="form-control"
                          :placeholder="'Pourcentage ' + (index + 1)" />
                        <small v-if="errors && errors.packs && errors.packs[index] && errors.packs[index].percentage"
                          class="text-danger">{{ errors.packs[index].percentage[0] }}</small>
                      </div>
                      <!-- <div class="col-md-2">
                        <button @click="removeRow(index)" class="btn btn-danger btn-sm remove" :id="'remove-' + index">
                          <span class="fa fa-minus"></span>
                        </button>
                      </div> -->
                      <div class="col-md-1 d-flex flex-row justify-content-end align-items-center pl-2 pr-0"
                        style="max-width: 40px;">
                        <button @click="removeRow(index)" class="btn btn-danger btn-sm remove" :id="'remove-' + index"
                          style="margin-top: -7px;margin-right: -39px;">
                          <span class="fa fa-minus"></span>
                        </button>
                      </div>
                    </div>

                    <!-- Affichez les erreurs liées aux packs -->
                    <!-- <div v-if="errors && errors.packs" class="text-danger mt-3">
                      <p v-for="(errorMessage, index) in errors.packs" :key="index">{{ errorMessage }}</p>
                    </div> -->
                    <!-- <div v-if="errors" class="alert alert-danger">
                      <ul>
                        <div v-if="errors && errors.message" class="text-danger mt-3">{{ errors.message }}</div>
                      </ul>
                    </div> -->
                    <div v-if="errors && (errors.message || errors.insurances_id)" class="alert alert-danger">
                      <ul>
                        <div v-if="errors.message" class="text-danger mt-3">{{ errors.message }}</div>
                        <div v-if="errors.insurances_id" class="text-danger mt-3">{{ errors.insurances_id[0] }}</div>
                      </ul>
                    </div>

                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-between col-12 flex-row">
                <button @click="cancelForm" class="btn btn-danger btn-medpay-gray">
                  Annuler
                </button>

                <button type="submit" class="btn btn-success btn-medpay-green">
                  Enregistrer
                </button>

                <!-- Affichez les erreurs générales du formulaire -->

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { packService } from "@/_services";
import { insuranceService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  data() {
    return {
      selectedAssurance: '',
      packs: [], // Ajout d'une ligne par défaut
      insurances: [],
      errors: null,
      insurances_id: "",
    };
  },
  mounted() {
    insuranceService
      .getAllInsurances()
      .then((res) => {
        this.insurances = res.data.data;
        // Ajout d'une ligne par défaut au chargement initial
        this.addNewRow();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    addNewRow() {
      this.packs.push({ designation: '', percentage: '' });
    },
    removeRow(index) {
      this.packs.splice(index, 1);
    },
    // Nouvelle méthode pour ajouter un pack
    addPack(pack) {
      this.packs.push(pack);
    },
    submitForm() {
      // Réinitialisez les erreurs avant la soumission du formulaire
      this.errors = null;
      // Afficher les données avant l'envoi
      console.log('Données avant l\'envoi:', {
        insurances_id: this.selectedAssurance,
        packs: this.packs,

      });
      if (!this.selectedAssurance) {
        // Affichez une erreur si l'assurance n'est pas sélectionnée
        this.errors = { message: 'Veuillez sélectionner une assurance' };
        return;
      }

      // Vérifiez que chaque pack a une désignation et un pourcentage
      const missingFields = this.packs.some((pack) => !pack.designation || !pack.percentage);

      if (missingFields) {
        this.errors = { message: 'Veuillez remplir tous les champs pour les packs (désignation et pourcentage)' };
        return;
      }
      const formData = {

        insurances_id: this.selectedAssurance,
        packs: this.packs,
      };

      // Utilisez votre service pour envoyer les données au backend
      packService
        .addPack(formData)
        .then(response => {
          // Traitez la réponse du backend si nécessaire
          console.log('Packs ajoutés avec succès !', response);

          // Ajoutez le pack à l'array après l'ajout réussi
          this.addPack(response.data); // Assurez-vous que votre backend renvoie les données du pack nouvellement ajouté
          // Rediriger vers "/pack/list"

          this.$router.push("/pack/list");
          this.$toast.success("Enregistement effectué avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
        })
        .catch(error => {
          // Affichez l'erreur dans la console pour déboguer
          console.error('Erreur lors de l\'ajout des packs :', error);

          // Mettez à jour les erreurs avec les détails de l'erreur si disponibles
          this.errors = error.response && error.response.data ? error.response.data.errors : { message: 'Une erreur s\'est produite lors de l\'ajout des packs' };
        });
    },
    cancelForm() {
      // Add logic to cancel the form if needed
      this.$router.push("/pack/list");
    },
    resetForm() {
      // Reset form data
      this.selectedAssurance = '';
      this.packs = [];
      // Ajout d'une ligne par défaut après la réinitialisation du formulaire
      this.addNewRow();
    },
  },
};
</script>
<style>
.card .card-title {
  text-transform: none;
}

.form-control {
  padding: 0px;
}
</style>
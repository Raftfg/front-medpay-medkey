<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-3 text-center"
              style="background-color: #0B5D3F; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              Ajouter de packs pour le patient <strong style="text-transform: uppercase;">
                {{ patient.lastname }} {{ patient.firstname }}
              </strong>
            </h3>
            <form @submit.prevent="submitForm" class="forms-sample">
              <div class="d-flex flex-column mb-2" id="supplyProductList">
                <div class="form-group row customize-row">
                  <div class="col-md-1 d-flex flex-row justify-content-end align-items-center pl-1 pr-0"
                    style="max-width: 40px;">
                    <button @click="addNewRow" class="btn btn-success btn-sm add" type="button" name="add"
                      style="margin-top: -14px; margin-right: -1142px;;">
                      <span class="fa fa-plus"></span>
                    </button>
                  </div>
                </div>
                <fieldset>
                  <!-- <legend>dds</legend> -->
                  <div v-for="(packpatient, index) in packpatients" :key="index" class="form-group row customize-row">
                    <div class="col-md-6">
                      <label class="form-label p-2">
                        Sélectionnez une assurance<span class="text-danger">*</span>
                      </label>
                      <select @change="onInsuranceSelect(insuranceSelected)" v-model="insuranceSelected"
                        class="form-control mb-3">
                        <option value="" selected disabled>Sélectionnez une assurance</option>
                        <option v-for="insurance in insurances" :key="insurance.uuid" :value="insurance.uuid">
                          {{ insurance.name }}

                        </option>
                        <small v-if="errors && errors.insuranceSelected" class="text-danger">{{
                          errors.insuranceSelected[0] }}</small>
                      </select>
                    </div>
                    <div class="col-md-5">
                      <label class="form-label p-2">
                        Sélectionnez un pack<span class="text-danger">*</span>
                      </label>
                      <select v-model="packpatient.pack_id" class="form-control mb-3">
                        <option value="" selected disabled>Sélectionnez un pack</option>
                        <option v-for="pack in packs" :key="pack.uuid" :value="pack.uuid">
                          {{ pack.designation }} - ({{ pack.percentage }}%)
                        </option>
                      </select>
                      <small v-if="errors && errors.pack_id" class="text-danger">{{ errors.pack_id[0] }}</small>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label p-2">
                        Date de début<span class="text-danger">*</span>
                      </label>
                      <input v-model="packpatient.date_debut" type="date" class="form-control"
                        :placeholder="'Date de début ' + (index + 1)">
                      <small
                        v-if="errors && errors.packpatients && errors.packpatients[index] && errors.packpatients[index].date_debut"
                        class="text-danger">{{ errors.packpatients[index].date_debut[0] }}</small>
                    </div>
                    <div class="col-md-4">
                      <label class="form-label p-2">
                        Date de fin<span class="text-danger">*</span>
                      </label>
                      <input v-model="packpatient.date_fin" type="date" class="form-control"
                        :placeholder="'Date de fin ' + (index + 1)" />
                      <small
                        v-if="errors && errors.packpatients && errors.packpatients[index] && errors.packpatients[index].date_fin"
                        class="text-danger">{{ errors.packpatients[index].date_fin[0] }}</small>
                    </div>
                    <div class="col-md-3">
                      <label class="form-label p-2">
                        Numéro de police<span class="text-danger">*</span>
                      </label>
                      <input v-model="packpatient.numero_police" type="text" class="form-control"
                        :placeholder="'Numéro de police ' + (index + 1)" />
                      <small
                        v-if="errors && errors.packpatients && errors.packpatients[index] && errors.packpatients[index].numero_police"
                        class="text-danger">{{ errors.packpatients[index].numero_police[0] }}</small>
                    </div>
                    <div class="col-md-1 d-flex flex-row justify-content-end align-items-center pl-2 pr-0"
                      style="max-width: 40px;">
                      <button @click="removeRow(index)" class="btn btn-danger btn-sm remove" :id="'remove-' + index"
                        style="    margin-top: -48px;;margin-right: -39px;">
                        <span class="fa fa-minus"></span>
                      </button>
                    </div>
                  </div>
                </fieldset>
                <div v-if="errors && (errors.message || errors.pack_id || errors.insuranceSelected || errors.dateError)"
                  class="alert alert-danger">
                  <ul>
                    <div v-if="errors.message" class="text-danger mt-3">{{ errors.message }}</div>
                    <div v-if="errors.pack_id" class="text-danger mt-3">{{ errors.pack_id[0] }}</div>
                    <div v-if="errors.insuranceSelected" class="text-danger mt-3">{{ errors.insuranceSelected[0] }}</div>
                  </ul>
                </div>
              </div>
              <div class="d-flex justify-content-between col-12 flex-row mt-2">
                <button class="btn btn-danger btn-medpay-gray" @click="annulerFormulaire">Annuler</button>

                <button type="submit" class="btn btn-success btn-medpay-green">Ajouter</button>
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
import { patientService } from "@/_services";
import { insuranceService } from "@/_services";
import { patientinsuranceService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";
export default {
  name: "create",
  props: ['uuid'],
  data() {
    return {
      packpatients: [],
      packpatient: {
      },
      insuranceSelected: "",
      insurances: [],
      insurance: {},
      packs: [],
      pack: {},
      errors: null,
      patient: {},
      patients_id: "",
      pack_id: "",
    };
  },
  mounted() {
    patientService.getPatient(this.uuid).then((res) => {
      this.patient = res.data.data;
      this.patient.uuid = this.uuid;
    });
    // packService.getPack(this.uuid).then((res) => {
    //   this.pack = res.data.data;
    //   console.log(this.pack),
    //     this.pack.uuid = this.uuid;
    // });
    patientinsuranceService.getPatientInsurance(this.uuid).then((res) => {
      this.packpatient = res.data.data;
      // console.log(this.patient.patients_id);
      this.packpatient.uuid = this.uuid;
    });

    insuranceService
      .getAllInsurances()
      .then((res) => {
        this.insurances = res.data.data;
        // Ajoutez une ligne vide par défaut
        this.addNewRow();
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    annulerFormulaire() {
      this.$router.push("/priseencharge/list");
      this.insuranceSelected = ""; // Réinitialisez la sélection d'assurance après la redirection
    },
    submitForm() {
      this.errors = null;
      this.errors = { ...this.errors, insuranceSelected: null };

      if (!this.insuranceSelected) {
        // Afficher une erreur si aucune assurance n'est sélectionnée
        this.errors = { ...this.errors, insuranceSelected: ['Veuillez sélectionner une assurance'] };
        return;
      }
      // if (!this.packpatient.pack_id) {
      //   // Affichez une erreur si le pack n'est pas sélectionnée
      //   this.errors = { message: 'Veuillez sélectionner un pack' };
      //   return;
      // }
      // Validation des dates
      const dateErrors = this.packpatients.filter((packpatient) => {
        const startDate = new Date(packpatient.date_debut);
        const endDate = new Date(packpatient.date_fin);
        return startDate >= endDate;
      });

      if (dateErrors.length > 0) {
        this.errors = { message: 'La date de fin est antérieure à la date de début pour ce pack patient.' };
        return;
      }

      // Vérifiez que chaque packpatient a une datedebut, datefin et un numero_police
      const missingFields = this.packpatients.some((packpatient) => !packpatient.date_debut || !packpatient.date_fin || !packpatient.numero_police);

      if (missingFields) {
        this.errors = { message: 'Veuillez remplir tous les champs pour les packs patient (Date de début, Date de fin et Numéro de police)' };
        return;
      }

      const formData = {
        patients_id: this.patient.uuid,
        // pack_id: this.packpatient.pack_id,
        packpatients: this.packpatients,
      };
      console.log(formData);
      // Utilisez votre service pour envoyer les données au backend
      patientinsuranceService
        .add(formData)
        .then(response => {
          // Traitez la réponse du backend si nécessaire
          console.log('Pack Patient ajoutés avec succès !', response);

          // Ajoutez le pack à l'array après l'ajout réussi
          // this.addPatientInsurances(response.data); // Assurez-vous que votre backend renvoie les données du pack nouvellement ajouté
          // Rediriger vers "/pack/list"

          this.$router.push("/priseencharge/list");
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
          console.error('Erreur lors de l\'ajout des packs patients :', error);

          // Mettez à jour les erreurs avec les détails de l'erreur si disponibles
          this.errors = error.response && error.response.data ? error.response.data.errors : { message: 'Une erreur s\'est produite lors de l\'ajout des packs patient' };
        });
    },
    addNewRow() {
      // Logique pour ajouter une nouvelle ligne de packpatient
      this.packpatients.push({
        date_debut: "",
        date_fin: "",
        numero_police: "",

      });
      
    },
    removeRow(index) {
      // Logique pour supprimer une ligne de packpatient
      this.packpatients.splice(index, 1);
    },
    cancel() {
      // Logique pour annuler l'opération
    },
    onInsuranceSelect() {

      // this.packs = [];
      packService
        .getPackByAssurance(this.insuranceSelected)
        .then((res) => {
          console.log(res);
          this.packs = res.data;
          console.log(this.packs);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
/* Ajoutez des styles si nécessaire */
</style>


<style scoped>
/* Ajoutez des styles si nécessaire */
</style>
<style>
select,
input {
  text-transform: none;
}

fieldset {
  /* border: 1px solid #ccc; */

  padding: 10px;

  margin-bottom: 2px;

  border-radius: 5px;

  background-color: #f5f5f5;
  padding: 16px;
}

.form-control {
  padding: 0px;
}

.card .card-title {
  text-transform: none;
}
</style>
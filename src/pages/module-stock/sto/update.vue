<template>
  <section class="container-scroller">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold">Tableau de board
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Gestion des patients
          </li>
          <li class="breadcrumb-item active text-success font-weight-bold" aria-current="page">
            Modification
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <!-- <h4 class="card-title">Modifier un patient</h4> -->

            
            <h3
              class="card-title text-white rounded p-3 mb-5 text-center"
              style="
                background-color: #0B5D3F;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              "
            >
            Modifier un patient
            </h3>


            <form class="forms-sample row" @submit.prevent="update">
              <div class="col-md-12">
                <p v-if="wrong > 0">
                  <b>Merci de corriger vos données</b>
                </p>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label for="exampleInputUsername1">Nom <span style="color:red; ">*</span></label>
                  <input :class="{ 'is-invalid': formErrors.errorNom }" @input="formErrors.errorNom = false" type="text"
                    class="form-control" id="exampleInputUsername1" style="text-transform: uppercase;" placeholder="Nom"
                    v-model="patient.nom" />
                  <div class="invalid-feedback" v-if="formErrors.errorNom">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputUsername1">Prénom(s) <span style="color:red;">*</span></label>
                  <input :class="{ 'is-invalid': formErrors.errorPrenom }" @input="formErrors.errorPrenom = false"
                    type="text" class="form-control" style="text-transform: capitalize;" id="exampleInputUsername1"
                    placeholder="Prénom" v-model="patient.prenom" />
                  <div class="invalid-feedback" v-if="formErrors.errorPrenom">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Age <span style="color:red; ">*</span></label>
                  <input :class="{ 'is-invalid': formErrors.errorAge }" @input="formErrors.errorAge = false" type="number"
                    class="form-control" id="exampleInputPassword1" placeholder="67" v-model="patient.age" />
                  <div class="invalid-feedback" v-if="formErrors.errorAge">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Adresse <span style="color:red; ">*</span></label>
                  <input :class="{ 'is-invalid': formErrors.errorAdresse }" @input="formErrors.errorAdresse = false"
                    type="text" class="form-control" id="exampleInputPassword1"
                    placeholder="Cotonou Sainte Rita C/574 M/DeGaules" v-model="patient.adresse" />
                  <div class="invalid-feedback" v-if="formErrors.errorAdresse">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Email <span style="color:red; ">*</span></label>
                  <input :class="{ 'is-invalid': formErrors.errorEmail }" type="email" class="form-control"
                    id="exampleInputPassword1" placeholder="xyz@example.com" v-model="patient.email" />
                  <div class="invalid-feedback" v-if="formErrors.errorEmail">
                    {{ formErrors.errorEmail }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputConfirmPassword1">Téléphone <span style="color:red; ">*</span></label>
                  <input :class="{ 'is-invalid': formErrors.errorTelephone }" @input="formErrors.errorTelephone = false"
                    type="text" class="form-control" id="exampleInputConfirmPassword1" placeholder="90098989"
                    v-model="patient.telephone" />
                  <div class="invalid-feedback" v-if="formErrors.errorEmail">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputConfirmPassword1">Numéro Whatsapp <span style="color:red; ">*</span></label>
                  <input :class="{ 'is-invalid': formErrors.errorWhatsapp }" @input="formErrors.errorWhatsapp = false"
                    type="text" class="form-control" id="exampleInputConfirmPassword1" placeholder="90098989"
                    v-model="patient.whatsapp" />
                  <div class="invalid-feedback" v-if="formErrors.errorWhatsapp">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputConfirmPassword1">Numéro d'Urgence <span style="color:red; ">*</span></label>
                  <input :class="{ 'is-invalid': formErrors.errorUrgenceContact }"
                    @input="formErrors.errorUrgenceContact = false" type="text" class="form-control"
                    id="exampleInputConfirmPassword1" placeholder="90098989" v-model="patient.urgencecontact" />
                  <div class="invalid-feedback" v-if="formErrors.errorUrgenceContact">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputEmail1">Profession <span style="color:red; ">*</span></label>
                  <input :class="{ 'is-invalid': formErrors.errorProfession }" @input="formErrors.errorProfession = false"
                    type="text" class="form-control" id="exampleInputEmail1" placeholder="Comptable"
                    v-model="patient.profession" />
                  <div class="invalid-feedback" v-if="formErrors.errorProfession">
                    Ce champs est requis ou invalide
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group controls">
                  <label for="exampleFormControlSelect1">Situation Matrimoniale <span style="color:red; ">*</span></label>
                  <select :class="{ 'is-invalid': formErrors.errorSituationMatrimoniale }"
                    @change="formErrors.errorSituationMatrimoniale = false" v-model="patient.situationmatrimoniale"
                    class="form-control mb-3" id="exampleFormControlSelect1">
                    <option value="">Selectionner</option>
                    <option value="Célibataire">Célibataire</option>
                    <option value="Marié">Marié</option>
                    <option value="Veuve">Veuve</option>
                    <option value="Concubinage">Concubinage</option>
                    <option value="Union libre">Union libre</option>
                    <option value="Divorcé">Divorcé</option>
                  </select>
                  <div class="invalid-feedback" v-if="formErrors.errorSituationMatrimoniale">
                    Ce champs est requis
                  </div>
                </div>

                <div class="form-group controls">
                  <label for="exampleFormControlSelect1">Pays </label>
                  <select :class="{ 'is-invalid': formErrors.errorPays }" @change="formErrors.errorPays = false"
                    v-model="patient.pays_id" class="form-control mb-3" id="exampleFormControlSelect1">
                    <option value="">Selectionner un Pays</option>
                    <option v-for="pays in pays" :key="pays.id" :value="pays.id">{{ pays.nom }}</option>
                  </select>
                  <div class="invalid-feedback" v-if="formErrors.errorPays">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group controls">
                  <label for="exampleFormControlSelect1">Département <span style="color:red; ">*</span></label>
                  <select :class="{ 'is-invalid': formErrors.errorDepartement }" v-model="patient.departement_id"
                    @change="onDepartementSelect(patient.departement_id)" class="form-control mb-3"
                    id="exampleFormControlSelect1">
                    <option value="">Selectionner un Département</option>
                    <option v-for="departement in departements" :key="departement.id" :value="departement.id">{{
                      departement.nom }}</option>
                  </select>
                  <div class="invalid-feedback" v-if="formErrors.errorDepartement">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group controls">
                  <label for="exampleFormControlSelect1">Commune <span style="color:red; ">*</span></label>
                  <select :class="{ 'is-invalid': formErrors.errorCommune }" v-model="patient.commune_id"
                    @change="onCommuneSelect(patient.commune_id)" class="form-control mb-3"
                    id="exampleFormControlSelect1">
                    <option value="null">Selectionner une Commune</option>
                    <option v-for="commune in communes" :key="commune.id" :value="commune.id">{{ commune.nom }}</option>
                  </select>
                  <div class="invalid-feedback" v-if="formErrors.errorCommune">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group controls">
                  <label for="exampleFormControlSelect1">Arrondissement <span style="color:red; ">*</span></label>
                  <select :class="{ 'is-invalid': formErrors.errorArrondissement }" v-model="patient.arrondissement_id"
                    @change="onArrondissementSelect(patient.arrondissement_id)" class="form-control mb-3"
                    id="exampleFormControlSelect1">
                    <option value="null">Selectionner un Arrondissement</option>

                    <option v-for="arrondissement in arrondissements" :key="arrondissement.id" :value="arrondissement.id">
                      {{ arrondissement.nom }}
                    </option>
                  </select>
                  <div class="invalid-feedback" v-if="formErrors.errorArrondissement">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group controls">
                  <label for="exampleFormControlSelect1">Quartier <span style="color:red; ">*</span></label>
                  <select :class="{ 'is-invalid': formErrors.errorQuartier }" @change="formErrors.errorQuartier = false"
                    v-model="patient.quartier_id" class="form-control mb-3" id="exampleFormControlSelect1">
                    <option value="null">Selectionner un Quartier</option>

                    <option v-for="quartier in quartiers" :key="quartier.id" :value="quartier.id">
                      {{ quartier.nom }}
                    </option>
                  </select>
                  <div class="invalid-feedback" v-if="formErrors.errorQuartier">
                    Ce champs est requis
                  </div>
                </div>
                <div class="form-group">
                  <label for="exampleInputConfirmPassword1">Autres informations</label>
                  <input type="text" class="form-control" id="exampleInputConfirmPassword1" placeholder=""
                    v-model="patient.autre" />
                </div>
                <div class="form-group form-check">
                  <label for="radio" class="">Sexe</label>
                  <!-- <ul v-for="sexe in errorSexe" :key="sexe">
                    <li class="text-danger">{{ sexe }}</li>
                  </ul> -->
                  <div class="p-2">
                    <input type="radio" name="demo6" class="demo6 mx-auto form-check-input" id="demo6-a" checked
                      value="Feminin" v-model="patient.sexe" />
                    <label for="demo6-a" class="mx-auto" style="font-size: 1rem">Féminin</label>
                    <input type="radio" name="demo6" class="demo6 mx-auto form-check-input" id="demo6-b" value="Masculin"
                      v-model="patient.sexe" />
                    <label for="demo6-b" class="mx-3" style="font-size: 1rem">Masculin</label>
                  </div>
                </div>
              </div>

               <div class="d-flex justify-content-between  col-12 flex-row">
                <button @click="cancel"  class="btn btn-secondary btn-medpay-gray">Annuler</button>

        <button type="submit" class="btn btn-success btn-medpay-green mr-2">
                  Modifier
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
import { patientService } from "@/_services";
import { paysService } from "@/_services";
import { departementService } from "@/_services";
import { communeService } from "@/_services";
import { arrondissementService } from "@/_services";
import { quartierService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";
import "@/assets/vendors/mdi/css/materialdesignicons.min.css";

export default {
  name: "create-patient",
  props: ["id"],
  data() {
    return {
      selected: "",
      pays: [],
      departements: [],
      communes: [],
      arrondissements: [],
      quartiers: [],

      patient: { pays_id: "null", departement_id: "null", commune_id: "null", arrondissement_id: "null", quartier_id: "null", },
      wrong: "",
      formErrors: {
        errorNom: "", errorPrenom: "", errorAge: "", errorAdresse: "", errorTelephone: "", errorEmail: "", errorWhatsapp: "",
        errorProfession: "", errorSexe: "", errorUrgenceContact: "", errorautre: "", errorPays: "", errorDepartement: "",
        errorCommune: "", errorArrondissement: "", errorSituationMatrimoniale: "", errorQuartier: "",
      },
    };
  },
  mounted() {
    patientService.getPatient(this.id).then((res) => {
      this.patient = res.data.data;
      this.patient.id = this.id;
    });

    paysService
      .getAllpays()
      .then((res) => {
        this.pays = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    // communeService
    //   .getCommunes(this.patient.departement_id)
    //   .then((res) => {
    //     this.communes = res.data;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    departementService
      .getAlldepartements()
      .then((res) => {
        this.departements = res.data.data;
        this.onDepartementSelect(this.patient.departement_id);
      })
      .catch((err) => {
        // this.oncommuneSelect(this.patient.commune_id);
        console.log(err);
      });
    communeService
      .getAllcommunes()
      .then((res) => {
        this.communes = res.data.data;
        this.onCommuneSelect(this.patient.commune_id);
      })
      .catch((err) => {
        console.log(err);
      });
    arrondissementService
      .getAllarrondissements()
      .then((res) => {
        this.arrondissements = res.data.data;
        this.onArrondissementSelect(this.patient.arrondissement_id);
      })
      .catch((err) => {
        console.log(err);
      });
    quartierService
      .getQuartiers(arrondissementId)
      .then((res) => {
        this.quartiers = res.data;
      })
      .catch((error) => {
        console.error(error);
      });
    quartierService
      .getAllquartiers()
      .then((res) => {
        this.quartiers = res.data.data;

      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    cancel() {
      this.$toast.error("Échec de l'enregistrement !", {
        position: "top-right",
        timeout: 3000,
        style: {
          background: "#ff0000", // Couleur de fond rouge pour l'erreur
          color: "#fff", // Couleur du texte
          fontWeight: "bold",
        },
      });
      this.$router.push("/patients/list");
    },

    update() {

      let isValid = true;

      this.formErrors = {};
      this.formErrors.errorNom = false;
      this.formErrors.errorPrenom = false;
      this.formErrors.errorAge = false;
      this.formErrors.errorNom = false;
      this.formErrors.errorEmail = false;
      this.formErrors.errorAdresse = false;
      this.formErrors.errorTelephone = false;
      this.formErrors.errorWhatsapp = false;
      this.formErrors.errorProfession = false;
      this.formErrors.errorSituationMatrimoniale = false;
      this.formErrors.errorUrgenceContact = false;
      this.formErrors.errorQuartier = false;
      this.formErrors.errorCommune = false;
      this.formErrors.errorArrondissement = false;
      this.formErrors.errorDepartement = false;
      this.formErrors.errorPays = false;
      this.formErrors.errorNom = false;
      this.formErrors.errorSexe = false;
      this.isSexeSelected = true;

      if (!this.patient.nom) {
        this.formErrors.errorNom = true;

        isValid = false;
      }

      if (!this.patient.sexe) {
        this.formErrors.errorSexe = true;
        this.isSexeSelected = false;
        isValid = false;
      }

      if (!this.patient.prenom) {
        this.formErrors.errorPrenom = true;
        isValid = false;
      }

      if (!this.patient.age) {
        this.formErrors.errorAge = true;
        isValid = false;
      }

      if (!this.patient.email) {
        this.formErrors.errorEmail = true;
        isValid = false;
      }

      if (!this.patient.adresse) {
        this.formErrors.errorAdresse = true;
        this.isValid = false;
      }

      if (!this.patient.telephone) {
        this.formErrors.errorTelephone = true;
        this.isValid = false;
      }

      if (!this.patient.whatsapp) {
        this.formErrors.errorWhatsapp = true;
        this.isValid = false;
      }

      if (!this.patient.profession || !/^[a-zA-Z]{2,}$/.test(this.patient.profession)) {
        this.formErrors.errorProfession = true;
        this.isValid = false;
      }

      if (!this.patient.situationmatrimoniale) {
        this.formErrors.errorSituationMatrimoniale = true;
        this.isValid = false;
      }

      if (!this.patient.urgencecontact) {
        this.formErrors.errorUrgenceContact = true;
        this.isValid = false;
      }

      if (!this.patient.quartier_id) {
        this.formErrors.errorQuartier = true;
        this.isValid = false;
      }

      if (!this.patient.commune_id) {
        this.formErrors.errorCommune = true;
        this.isValid = false;
      }

      if (!this.patient.arrondissement_id) {
        this.formErrors.errorArrondissement = true;
        this.isValid = false;
      }

      if (!this.patient.departement_id) {
        this.formErrors.errorDepartement = true;
        this.isValid = false;
      }

      if (!this.patient.pays_id) {
        this.formErrors.errorPays = true;
        this.isValid = false;
      }

      if (!isValid) {
        return;
      }

      if (!/^\d{8,}$/.test(this.patient.telephone)) {
        this.$toast.error(
          "Le Numéro de téléphone est invalide ! Veuillez entrer au moins 8 chiffre",
          {
            position: "top-right",
            timeout: 3000,
            style: {
              background: "#ff0000", // Couleur de fond rouge pour l'erreur
              color: "#fff", // Couleur du texte
              fontWeight: "bold",
            },
          }
        );
        this.formErrors.errorTelephone = true;
        return;
      }

      if (!/^\d{8,}$/.test(this.patient.whatsapp)) {
        this.$toast.error(
          "Le Numéro de whatsapp est invalide ! Veuillez entrer au moins 8 chiffre",
          {
            position: "top-right",
            timeout: 3000,
            style: {
              background: "#ff0000", // Couleur de fond rouge pour l'erreur
              color: "#fff", // Couleur du texte
              fontWeight: "bold",
            },
          }
        );
        this.formErrors.errorWhatsapp = true;
        return;
      }

      if (!/^\d{8,}$/.test(this.patient.urgencecontact)) {
        this.$toast.error(
          "Le Numéro de Contact Urgent  est invalide ! Veuillez entrer au moins 8 chiffre",
          {
            position: "top-right",
            timeout: 3000,
            style: {
              background: "#ff0000", // Couleur de fond rouge pour l'erreur
              color: "#fff", // Couleur du texte
              fontWeight: "bold",
            },
          }
        );
        this.formErrors.errorUrgenceContact = true;
        return;
      }

      if (this.patient.nom.length > 100 || !/^[a-zA-ZÀ-ÿ\s]{2,}$/.test(this.patient.nom)) {
        this.$toast.error(
          "Le nom est invalide ! Veuillez entrer au moins deux et au plus 50 caractères alphanumérique .",
          {
            position: "top-right",
            timeout: 3000,
            style: {
              background: "#ff0000", // Couleur de fond rouge pour l'erreur
              color: "#fff", // Couleur du texte
              fontWeight: "bold",
            },
          }
        );
        this.formErrors.errorNom = true;
        return;
      }

      if (!/^[a-zA-ZÀ-ÿ\s]{2,}$/.test(this.patient.prenom)) {
        this.$toast.error(
          "Le prénom est invalide !  Veuillez entrer au moins deux et au plus 100 caractères alphanumérique.",
          {
            position: "top-right",
            timeout: 3000,
            style: {
              background: "#ff0000", // Couleur de fond rouge pour l'erreur
              color: "#fff", // Couleur du texte
              fontWeight: "bold",
            },
          }
        );
        this.formErrors.errorPrenom = true;
        return;
      }


      patientService
        .updatePatient(this.patient)
        .then((res) => {
          this.$toast.success("Modification effectuée avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#0000ff",
              color: "#333",
              fontWeight: "bold",
            },
          });
          this.$router.push("/patients/list");
        })
        .catch((err) => {
          // this.$toast.error("Veuillez remplir les champs requis, merci !", {
          //   position: POSITION.TOP_RIGHT,
          //   timeout: 3000,
          //   bodyStyle: {
          //     borderRadius: "10px",
          //     backgroundColor: "#f0f0f0",
          //     color: "#333",
          //     fontWeight: "bold",
          //   },
          // });
          let isValid = true;

          this.formErrors = {}

          if (!this.patient.nom) {
            this.formErrors.errorNom = "Le nom du patient est requis";
            isValid = false;
          }

          if (!this.patient.prenom) {
            this.formErrors.errorPrenom = "Le nom du patient est requis.";
            isValid = false;
          }

          if (!this.patient.age) {
            this.formErrors.errorAge = "L'age du patient est requis.";
            isValid = false;
          }

          if (!this.patient.email) {
            this.formErrors.errorEmail = "L'adresse mail du patient est requise.";
            isValid = false;
          }

          if (!this.patient.adresse) {
            this.formErrors.errorAdresse = "L'adresse du patient est requise.";
            this.isValid = false;
          }

          if (!this.patient.telephone) {
            this.formErrors.errorTelephone = "Le numéro de téléphone du patient est requis.";
            this.isValid = false;
          }

          if (!this.patient.whatsapp) {
            this.formErrors.errorWhatsapp = "Le numéro de téléphone whatsapp du patient est requis.";
            this.isValid = false;
          }

          if (!this.patient.profession) {
            this.formErrors.errorProfession = "La profession du patient est requise.";
            this.isValid = false;
          }

          if (!this.patient.situationmatrimoniale) {
            this.formErrors.errorSituationMatrimoniale = "Veuillez renseigner l'état civil du patient.";
            this.isValid = false;
          }

          if (!this.patient.urgencecontact) {
            this.formErrors.errorUrgenceContact = "Le numéro d'urgence du patient est requis.";
            this.isValid = false;
          }

          if (!this.patient.quartier_id) {
            this.formErrors.errorQuartier = "Le quartier du patient est requis.";
            this.isValid = false;
          }

          if (!this.patient.commune_id) {
            this.formErrors.errorCommune = "La commune du patient est requise.";
            this.isValid = false;
          }

          if (!this.patient.arrondissement_id) {
            this.formErrors.errorArrondissement = "L'arrondissement du patient est requis.";
            this.isValid = false;
          }

          if (!this.patient.departement_id) {
            this.formErrors.errorDepartement = "Le département du patient est requis.";
            this.isValid = false;
          }

          if (!this.patient.pays_id) {
            this.formErrors.errorPays = "Le pays du patient est requie.";
            this.isValid = false;
          }

          if (!isValid) {
            return;
          }
        });
    },
    onDepartementSelect(departementId) {
      this.formErrors.errorDepartement = false;
      communeService
        .getCommunes(departementId)
        .then((res) => {
          this.communes = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onCommuneSelect(communeId) {
      this.formErrors.errorCommune = false;
      arrondissementService
        .getArrondissements(communeId)
        .then((res) => {
          this.arrondissements = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onArrondissementSelect(arrondissementId) {
      this.formErrors.errorArrondissement = false;
      quartierService
        .getQuartiers(arrondissementId)
        .then((res) => {
          this.quartiers = res.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};


</script>

<style>
select {
  cursor: pointer;
  height: 43px !important;
}

input[type="radio"].demo6 {
  display: none;
}

input[type="radio"].demo6+label {
  position: relative;
  padding-left: 1.3rem;
}

input[type="radio"].demo6+label::before,
input[type="radio"].demo6+label::after {
  display: block;
  position: absolute;
  box-sizing: border-box;
  content: "";
  border-radius: 1rem;
}

input[type="radio"].demo6+label::before {
  bottom: 0;
  left: 0;
  border: 1px solid #ccc;
  background-color: #eee;
  width: 1rem;
  height: 1rem;
}

input[type="radio"].demo6+label::after {
  bottom: 3px;
  left: 3px;
  width: calc(1rem - 6px);
  height: calc(1rem - 6px);
}

input[type="radio"].demo6:checked+label::after {
  background-color: #45c28e;
}

input[type="checkbox"].demo2 {
  display: none;
}

input[type="checkbox"].demo2+label::before {
  content: "";
  border: 1px solid #45c28e;
  padding: 0 0.6rem;
  margin-right: 0.3rem;
}

input[type="checkbox"].demo2:checked+label::before {
  background-color: #45c28e;
}
</style>

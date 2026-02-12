<template>
    <section class="container-scroller">
      <div class="">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a href="javascript:void(0);" class="text-dark font-weight-bold"
                >Tableau de board
              </a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Gestion des patients
            </li>
            <li
              class="breadcrumb-item active text-success font-weight-bold"
              aria-current="page"
            >
              Ajouter
            </li>
          </ol>
        </nav>
      </div>
      <div class="row">
        <div class="col-md-12 grid-margin stretch-card">
          <div class="card">
            <div class="card-body">
              <h3
                class="card-title text-white rounded p-3 mt-0 text-center"
                style="
                  background-color: #0b5d3f;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                "
              >
                Enregistrement d'un patient
              </h3>
              <form-wizard
                @on-complete="onComplete"
                color="#0b5d3f"
                ref="wizard"
                class="mt-1"
              >
                <!-- :start-index="0" -->
                <tab-content title="" icon="" :before-change="beforeChange">
                  <fieldset class="scheduler-border col-md-12">
                    <legend
                      class="scheduler-border"
                      style="font-size: 13px !important"
                    >
                      Informations personnelles
                    </legend>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="exampleInputUsername1"
                            >Nom <span style="color: red">*</span></label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputUsername1"
                            style="text-transform: uppercase"
                            placeholder="Nom"
                            v-model="patient.lastname"
                            @input="validateLastName"
                          />
                          <!-- Affichage de l'erreur pour le champ 'lastname' -->
                          <div class="error-message" v-show="errors.lastname">
                            {{ errors.lastname }}
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="exampleInputUsername1"
                            >Prénom(s) <span style="color: red">*</span></label
                          >
                          <input
                            type="text"
                            style="text-transform: capitalize"
                            class="form-control"
                            id="exampleInputUsername1"
                            placeholder="Prénom"
                            @input="validateFirstName"
                            v-model="patient.firstname"
                          />
                          <div class="error-message" v-show="errors.firstname">
                            {{ errors.firstname }}
                          </div>
                        </div>
                        <!-- @blur="validateFirstName" -->
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="exampleInputUsername1">Nom marital </label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputUsername1"
                            style="text-transform: uppercase"
                            placeholder="Nom Marital"
                            v-model="patient.nommarital"
                          />
                        </div>
                      </div>
                      <div class="col-md-6" style="top: 17px">
                        <div class="form-group form-check">
                          <div class="">
                            <label for="ff"
                              >Sexe <span style="color: red"> *</span>&nbsp;
                              &nbsp;&nbsp;
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <input
                                type="radio"
                                name="demo6"
                                class="demo6 mx-auto form-check-input"
                                id="demo6-a"
                                value="Feminin"
                                @change="validateGender"
                                v-model="patient.gender"
                              />
                              <label
                                for="demo6-a"
                                class="mx-auto"
                                style="font-size: 1rem"
                                >Masculin</label
                              >
                              <input
                                type="radio"
                                name="demo6"
                                class="demo6 mx-auto form-check-input"
                                id="demo6-b"
                                value="Masculin"
                                @change="validateGender"
                                v-model="patient.gender"
                              />
                              <label
                                for="demo6-b"
                                class="mx-3"
                                style="font-size: 1rem"
                                >Féminin</label
                              ></label
                            >
                            <div class="error-message" v-show="errors.gender">
                              {{ errors.gender }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
  
                    <div class="row">
                      <div class="col-md-3">
                        <div class="form-group">
                          <label for="exampleInputPassword1"
                            >Date de Naissance
                            <span style="color: red">*</span></label
                          >
                          <input
                            @input="calculateAge"
                            type="date"
                            class="form-control"
                            id="exampleInputPassword1"
                            @blur="validateDateBirth"
                            v-model="patient.datebirth"
                          />
                          <div class="error-message" v-show="errors.datebirth">
                            {{ errors.datebirth }}
                          </div>
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <label for="exampleInputUsername1">Âge</label>
                          <input
                            type="number"
                            class="form-control"
                            id="exampleInputUsername1"
                            v-model="patient.age"
                            readonly
                          />
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <label for="exampleInputEmail1">Profession </label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputEmail1"
                            placeholder="Comptable"
                            v-model="patient.profession"
                          />
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <label for="exampleInputPassword1">Adresse </label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                            placeholder="Cotonou Sainte Rita C/574 "
                            v-model="patient.address"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
                        <div class="form-group">
                          <label for="exampleInputPassword1"
                            >Date de décès
                          </label>
                          <input
                            type="date"
                            class="form-control"
                            id="exampleInputPassword1"
                            v-model="patient.datedeces"
                          />
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <label for="exampleInputUsername1"
                            >Rang de naissance</label
                          >
                          <input
                            type="number"
                            class="form-control"
                            id="exampleInputUsername1"
                            v-model="patient.rangnaissance"
                          />
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <label for="exampleInputEmail1">Code postal</label>
                          <input
                            type="numbder"
                            class="form-control"
                            id="exampleInputtEmail1"
                            placeholder="00229"
                            v-model="patient.codepostal"
                          />
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <label for="exampleInputPassword1"
                            >Type date de naissance
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                            placeholder="Cotonou Sainte Rita C/574"
                            v-model="patient.typenaissance"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group controls">
                          <label for="exampleFormControlSelect1"
                            >Situation Matrimoniale
                          </label>
                          <select
                            v-model="patient.maritalstatus"
                            class="form-control mb-3"
                            id="exampleFormControlSelect1"
                          >
                            <option value="">Sélectionner</option>
                            <option value="Célibataire">Célibataire</option>
                            <option value="Marié">Marié</option>
                            <option value="Veuve">Veuve</option>
                            <option value="Concubinage">Concubinage</option>
                            <option value="Union libre">Union libre</option>
                            <option value="Divorcé">Divorcé</option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group controls">
                          <label for="exampleFormControlSelect1">Civilité </label>
                          <select
                            v-model="patient.civilite"
                            class="form-control mb-3"
                            id="exampleFormControlSelect1"
                          >
                            <option value="">Sélectionner</option>
                            <option value="Marié">Monsieur</option>
                            <option value="Veuve">Madame</option>
                            <option value="Célibataire">Mademoiselle</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset class="scheduler-border col-md-12">
                    <legend
                      class="scheduler-border"
                      style="font-size: 13px !important"
                    >
                      Coordonnées
                    </legend>
                    <div class="row">
                      <div class="col-md-3">
                        <div class="form-group">
                          <label for="exampleInputPassword1">Email</label>
                          <input
                            type="email"
                            class="form-control"
                            id="exampleInputPassword1"
                            placeholder="xyz@example.com"
                            v-model="patient.email"
                          />
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <label for="exampleInputConfirmPassword1"
                            >Téléphone mobile
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputConfirmPassword1"
                            placeholder="90098989"
                            v-model="patient.phone"
                          />
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <label for="exampleInputConfirmPassword1"
                            >Numéro Whatsapp
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputConfirmPassword1"
                            placeholder="90098989"
                            v-model="patient.whatsapp"
                          />
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group">
                          <label for="exampleInputConfirmPassword1"
                            >Numéro d'Urgence
                            <span style="color: red">*</span></label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputConfirmPassword1"
                            @input="validateEmergencyContact"
                            placeholder="90098989"
                            v-model="patient.emergencycontac"
                          />
                          <div
                            class="error-message"
                            v-show="errors.emergencycontac"
                          >
                            {{ errors.emergencycontac }}
                          </div>
                        </div>
                      </div>
                    </div>
  
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group controls">
                          <label for="exampleFormControlSelect1">Pays </label>
                          <select
                            v-model="patient.pays_id"
                            class="form-control mb-3"
                            id="exampleFormControlSelect1"
                          >
                            <option value="null">Sélectionner un Pays</option>
                            <option
                              v-for="pays in pays"
                              :key="pays.id"
                              :value="pays.id"
                            >
                              {{ pays.nom }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group controls">
                          <label for="exampleFormControlSelect1"
                            >Département
                          </label>
                          <select
                            v-model="patient.departements_id"
                            @change="onDepartementSelect(patient.departements_id)"
                            class="form-control mb-3"
                            id="exampleFormControlSelect1"
                          >
                            <option value="null">
                              Sélectionner un Département
                            </option>
                            <option
                              v-for="departement in departements"
                              :key="departement.id"
                              :value="departement.id"
                            >
                              {{ departement.nom }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
  
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group controls">
                          <label for="exampleFormControlSelect1">Commune </label>
                          <select
                            v-model="patient.communes_id"
                            @change="onCommuneSelect(patient.communes_id)"
                            class="form-control mb-3"
                            id="exampleFormControlSelect1"
                          >
                            <option value="null">Sélectionner une Commune</option>
                            <option
                              v-for="commune in communes"
                              :key="commune.id"
                              :value="commune.id"
                            >
                              {{ commune.nom }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group controls">
                          <label for="exampleFormControlSelect1"
                            >Arrondissement
                          </label>
                          <select
                            v-model="patient.arrondissements_id"
                            @change="
                              onArrondissementSelect(patient.arrondissements_id)
                            "
                            class="form-control mb-3"
                            id="exampleFormControlSelect1"
                          >
                            <option value="null">
                              Sélectionner un Arrondissement
                            </option>
  
                            <option
                              v-for="arrondissement in arrondissements"
                              :key="arrondissement.id"
                              :value="arrondissement.id"
                            >
                              {{ arrondissement.nom }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group controls">
                          <label for="exampleFormControlSelect1">Quartier</label>
                          <select
                            v-model="patient.quartiers_id"
                            class="form-control mb-3"
                            id="exampleFormControlSelect1"
                          >
                            <option value="null">Sélectionner un Quartier</option>
  
                            <option
                              v-for="quartier in quartiers"
                              :key="quartier.id"
                              :value="quartier.id"
                            >
                              {{ quartier.nom }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset class="scheduler-border col-md-12">
                    <legend
                      class="scheduler-border"
                      style="font-size: 13px !important"
                    >
                      Autres informations
                    </legend>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group controls">
                          <label for="exampleFormControlSelect1"
                            >Assurance
                          </label>
                          <select
                            @change="onInsuranceSelect(insuranceSelected)"
                            v-model="insuranceSelected"
                            class="form-control mb-3"
                            id="exampleFormControlSelect1"
                          >
                            <option
                              v-for="insurance in insurances"
                              :key="insurance.uuid"
                              :value="insurance.uuid"
                            >
                              {{ insurance.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group controls">
                          <label for="exampleFormControlSelect1">Pack </label>
                          <select
                            v-model="patient.pack_id"
                            class="form-control mb-3"
                            id="exampleFormControlSelect1"
                          >
                            <option
                              v-for="pack in packs"
                              :key="pack.uuid"
                              :value="pack.uuid"
                            >
                              {{ pack.percentage }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label for="exampleInputConfirmPassword1">Divers</label>
                          <textarea
                            type="text"
                            class="form-control"
                            id="exampleInputConfirmPassword1"
                            rows="6"
                            placeholder="Autres informations"
                            v-model="patient.autre"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <!-- <button @click="nextStep">Suivant</button> -->
                </tab-content>
  
                <tab-content title="" icon="" :before-change="change">
                  <fieldset class="scheduler-border col-md-12">
                    <legend
                      class="scheduler-border"
                      style="font-size: 13px !important"
                    >
                      Filiation pour le père
                    </legend>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="exampleInputUsername1"
                            >Nom <span style="color: red">*</span></label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputUsername1"
                            style="text-transform: uppercase"
                            placeholder="Nom"
                            v-model="patient.nom_pere"
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="exampleInputPassword1"
                            >Téléphone mobile</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                            placeholder="62032158"
                            v-model="patient.phone_pere"
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="exampleInputPassword1"
                            >Date de naissance</label
                          >
                          <input
                            type="date"
                            class="form-control"
                            id="exampleInputPassword1"
                            v-model="patient.date_pere"
                          />
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset class="scheduler-border col-md-12">
                    <legend
                      class="scheduler-border"
                      style="font-size: 13px !important"
                    >
                      Filiation pour la mère
                    </legend>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="exampleInputUsername1"
                            >Nom <span style="color: red">*</span></label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputUsername1"
                            style="text-transform: uppercase"
                            placeholder="Nom"
                            v-model="patient.nom_mere"
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="exampleInputPassword1"
                            >Téléphone mobile</label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputPassword1"
                            placeholder="62032158"
                            v-model="patient.phone_mere"
                          />
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label for="exampleInputPassword1"
                            >Date de naissance</label
                          >
                          <input
                            type="date"
                            class="form-control"
                            id="exampleInputPassword1"
                            v-model="patient.date_mere"
                          />
                        </div>
                      </div>
                    </div>
                  </fieldset>
                  <fieldset class="scheduler-border col-md-12">
                    <legend
                      class="scheduler-border"
                      style="font-size: 13px !important"
                    >
                      Filiation pour l'enfant'
                    </legend>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="exampleInputUsername1"
                            >Nom <span style="color: red">*</span></label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="exampleInputUsername1"
                            style="text-transform: uppercase"
                            placeholder="Nom"
                            v-model="patient.nom_enfant"
                          />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="exampleInputPassword1"
                            >Date de naissance</label
                          >
                          <input
                            type="date"
                            class="form-control"
                            id="exampleInputPassword1"
                            v-model="patient.date_enfant"
                          />
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </tab-content>
              </form-wizard>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  <script>
  import Vue from "vue";
  import VueFormWizard from "vue-form-wizard";
  import "vue-form-wizard/dist/vue-form-wizard.min.css";
  import { patientService } from "@/_services";
  import { paysService } from "@/_services";
  import { departementService } from "@/_services";
  import { communeService } from "@/_services";
  import { arrondissementService } from "@/_services";
  import { quartierService } from "@/_services";
  import { insuranceService } from "@/_services";
  import { packService } from "@/_services";
  
  import { useToast, POSITION } from "vue-toastification";
  Vue.use(VueFormWizard);
  export default {
    name: "create-patient",
    data() {
      return {
        pays: [],
        pack: [],
        insuranceSelected: "",
        departements: [],
        communes: [],
        arrondissements: [],
        quartiers: [],
        insurances: [],
        packs: [],
  
        patient: {
          lastname: "",
          firstname: "",
          age: "",
          datedeces: "",
          rangnaissance: "",
          address: "",
          phone: "",
          email: "",
          whatsapp: "",
          profession: "",
          maritalstatus: "",
          emergencycontac: "",
          datebirth: "",
          autre: "",
          nommarital: "",
          codepostal: "",
          typenaissance: "",
          civilite: "",
          gender: "Feminin",
          pays_id: null,
          departements_id: null,
          communes_id: null,
          arrondissements_id: null,
          quartiers_id: null,
          nom_pere: "",
          phone_pere: "",
          phone_mere: "",
          nom_mere: "",
          date_enfant: "",
          date_mere: "",
          date_pere: "",
          nom_enfant: "",
          pack_id: "",
        },
        errors: {
          lastname: "", // Message d'erreur pour le champ 'lastname'
          firstname: "",
          datebirth: "",
          gender: "",
          emergencycontac: "",
          nom_mere: "",
          nom_mere: "",
          nom_enfant: "",
        },
      };
    },
    mounted() {
      paysService
        .getAllpays()
        .then((res) => {
          this.pays = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
      departementService
        .getAlldepartements()
        .then((res) => {
          this.departements = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
      insuranceService
        .getAllInsurances()
        .then((res) => {
          this.insurances = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  
    filters: {
      capitalizeFirstLetter(value) {
        if (value.length > 0) {
          return value.charAt(0).toUpperCase() + value.slice(1);
        }
        return value;
      },
    },
    methods: {
      calculateAge() {
        if (this.patient.datebirth) {
          const birthDate = new Date(this.patient.datebirth);
          const currentDate = new Date();
          const age = currentDate.getFullYear() - birthDate.getFullYear();
  
          // Vérifie si l'anniversaire de cette année n'a pas encore eu lieu
          if (
            currentDate.getMonth() < birthDate.getMonth() ||
            (currentDate.getMonth() === birthDate.getMonth() &&
              currentDate.getDate() < birthDate.getDate())
          ) {
            this.patient.age = age - 1; // Diminue l'âge d'une année
          } else {
            this.patient.age = age;
          }
        } else {
          this.patient.age = null; // Réinitialise l'âge si la date de naissance est vide
        }
      },
      validateLastName() {
        if (this.patient.lastname && !/^\d+$/.test(this.patient.lastname)) {
          // Si le champ 'lastname' n'est pas vide et ne contient pas que des chiffres
          this.errors.lastname = "";
        } else {
          // Si le champ 'lastname' est vide ou contient des chiffres, affichez un message d'erreur
          this.errors.lastname =
            "Le nom ne doit pas être vide et ne doit pas contenir de chiffres.";
        }
      },
      validateFirstName() {
        // Validation du prénom
        if (this.patient.firstname && !/^\d+$/.test(this.patient.firstname)) {
          this.errors.firstname = "";
        } else {
          this.errors.firstname =
            "Le prénom ne doit pas être vide et ne doit pas contenir de chiffres.";
        }
      },
  
      validateDateBirth() {
        // Validation de la date de naissance
        if (this.patient.datebirth) {
          this.errors.datebirth = "";
        } else {
          this.errors.datebirth = "La date de naissance est requise.";
        }
      },
  
      validateGender() {
        // Validation du genre
        if (this.patient.gender) {
          this.errors.gender = "";
        } else {
          this.errors.gender = "Le genre est requis.";
        }
      },
  
      validateEmergencyContact() {
        // Validation du contact d'urgence
        if (this.patient.emergencycontac) {
          this.errors.emergencycontac = "";
        } else {
          this.errors.emergencycontac = "Le contact d'urgence est requis.";
        }
      },
  
      beforeChange(toIndex, fromIndex) {
        // console.log("this.validateStep1", this.validateStep1);
        if (
          !this.patient.lastname ||
          !this.patient.firstname ||
          !this.patient.datebirth ||
          !this.patient.gender ||
          !this.patient.emergencycontac
        ) {
          this.$toast.error(
            "Veuillez remplir tous les champs obligatoires de l'étape 1.",
            {
              position: POSITION.TOP_RIGHT,
              timeout: 3000,
              bodyStyle: {
                borderRadius: "10px",
                backgroundColor: "#f0f0f0",
                color: "#333",
                fontWeight: "bold",
              },
            }
          );
          return false;
        } else {
          return true;
        }
      },
      change(toIndex, fromIndex) {
        // console.log("this.validateStep1", this.validateStep1);
        if (
          !this.patient.nom_mere ||
          !this.patient.nom_pere ||
          !this.patient.nom_enfant
        ) {
          this.$toast.error(
            "Veuillez remplir tous les champs obligatoires de l'étape 2 .",
            {
              position: POSITION.TOP_RIGHT,
              timeout: 3000,
              bodyStyle: {
                borderRadius: "10px",
                backgroundColor: "#f0f0f0",
                color: "#333",
                fontWeight: "bold",
              },
            }
          );
          return false;
        } else {
          return true;
        }
      },
      onComplete() {
        this.change();
        this.addPatient();
      },
      addPatient() {
        // Enregistrez les données du patient dans la table "patients"
        patientService.addPatients(this.patient).then((response) => {
          console.log("Résultat de l'ajout du patient :", response);
          this.$toast.success("Patient avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
          this.$router.push("/patients/list");
        });
      },
  
      onDepartementSelect(departementId) {
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
        quartierService
          .getQuartiers(arrondissementId)
          .then((res) => {
            this.quartiers = res.data;
          })
          .catch((error) => {
            console.error(error);
          });
      },
      onInsuranceSelect(assuranceId) {
        packService
          .getPackByAssurance(assuranceId)
          .then((res) => {
            console.log(res);
            this.packs = res.data;
          })
          .catch((error) => {
            console.error(error);
          });
      },
    },
  };
  </script>
  
  <style scoped></style>
  
  <style>
  .form-control {
    padding: 1px 1px 1px 5px;
  }
  input,
  .select.form-control {
    padding: 1px 1px 1px 5px !important;
  }
  
  .vue-form-wizard .wizard-header {
    padding: 0;
  }
  
  /* .vue-form-wizard .wizard-card-footer .wizard-footer-right {
    display: none;
  } */
  .content-wrapper {
    padding: 0.75rem 1.2rem;
  }
  
  .card .card-body {
    padding: 20px 11px 1px 11px;
  }
  .p-2 {
    margin-top: 29px;
  }
  
  .form-check {
    padding-left: 0px;
  }
  
  fieldset.scheduler-border {
    border: 1px groove #ddd !important;
    padding: 0 1.4em 1.4em 1.4em !important;
    margin: 0 0 1.5em 0 !important;
    -webkit-box-shadow: 0px 0px 0px 0px #000;
    box-shadow: 0px 0px 0px 0px #000;
  }
  
  legend.scheduler-border {
    font-size: 1.2em !important;
    font-weight: bold !important;
    text-align: left !important;
    width: auto;
    padding: 0 10px;
    border-bottom: none;
  }
  select {
    cursor: pointer;
    height: 43px !important;
  }
  
  input[type="radio"].demo6 {
    display: none;
  }
  
  input[type="radio"].demo6 + label {
    position: relative;
    padding-left: 1rem;
  }
  
  input[type="radio"].demo6 + label::before,
  input[type="radio"].demo6 + label::after {
    display: block;
    position: absolute;
    box-sizing: border-box;
    content: "";
    border-radius: 1rem;
  }
  .error-message {
    color: red;
    font-size: 13px;
  }
  input[type="radio"].demo6 + label::before {
    bottom: 0;
    left: 0;
    border: 1px solid #ccc;
    background-color: #eee;
    width: 1rem;
    height: 1rem;
  }
  
  input[type="radio"].demo6 + label::after {
    bottom: 3px;
    left: 3px;
    width: calc(1rem - 6px);
    height: calc(1rem - 6px);
  }
  
  input[type="radio"].demo6:checked + label::after {
    background-color: #45c28e;
  }
  
  input[type="checkbox"].demo2 {
    display: none;
  }
  
  input[type="checkbox"].demo2 + label::before {
    content: "";
    border: 1px solid #45c28e;
    padding: 0 0.6rem;
    margin-right: 0.3rem;
  }
  
  input[type="checkbox"].demo2:checked + label::before {
    background-color: #45c28e;
  }
  </style>
  
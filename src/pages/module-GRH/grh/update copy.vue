<template>
  <section class="container-scroller">
    <div class="">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold">Tableau de board
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Gestion des employés
          </li>
          <li class="breadcrumb-item active text-success font-weight-bold" aria-current="page">
            Modifier
          </li>
        </ol>
      </nav>
    </div>
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3 mt-0 text-center" style="
                background-color: #0b5d3f;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              ">
              Modifier un employé
            </h3>
            <form-wizard @on-complete="onComplete" color="#0b5d3f" ref="wizard" class="mt-1">
              <tab-content title="" icon="" :before-change="beforeChange" >
                <fieldset class="scheduler-border col-md-12">
                  <legend class="scheduler-border" style="font-size: 13px !important">
                    Informations personnelles
                  </legend>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputUsername1">Nom <span style="color: red">*</span></label>
                        <input :class="{ 'is-invalid': formErrors.errorNom }" @input="formErrors.errorNom = false"
                          type="text" class="form-control" id="exampleInputUsername1" style="text-transform: uppercase"
                          placeholder="Nom" v-model="employer.last_name" />
                        <div class="invalid-feedback" v-if="formErrors.errorNom">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputUsername1">Prénom(s) <span style="color: red">*</span></label>
                        <input :class="{ 'is-invalid': formErrors.errorPrenom }" type="text"
                          @input="formErrors.errorPrenom = false" style="text-transform: capitalize" class="form-control"
                          id="exampleInputUsername1" placeholder="Prénom" v-model="employer.first_name" />
                        <div class="invalid-feedback" v-if="formErrors.errorPrenom">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Adresse <span style="color: red">*</span></label>
                        <input :class="{ 'is-invalid': formErrors.errorAdresse }" @input="formErrors.errorAdresse = false"
                          type="text" class="form-control" id="exampleInputPassword1"
                          placeholder="Cotonou Sainte Rita C/574 M/DeGaules" v-model="employer.address" />
                        <div class="invalid-feedback" v-if="formErrors.errorAdresse">
                          Ce champs est requis
                        </div>
                      </div>

                    </div>
                    <div class="col-md-6" style="top: 17px">
                      <div class="form-group form-check">
                        <div class="">
                          <label for="ff">Sexe <span style="color: red"> *</span>&nbsp;
                            &nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input type="radio" name="demo6" class="demo6 mx-auto form-check-input" id="demo6-a"
                              value="Feminin" v-model="employer.sex" :class="{ 'is-invalid': formErrors.errorSexe }" />
                            <label for="demo6-a" class="mx-auto" style="font-size: 1rem">Masculin</label>
                            <input type="radio" name="demo6" class="demo6 mx-auto form-check-input" id="demo6-b"
                              value="Masculin" v-model="employer.sex" />
                            <label for="demo6-b" class="mx-3" style="font-size: 1rem">Féminin</label></label>
                        </div>

                        <div class="invalid-feedback" v-if="formErrors.errorSexe">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Date de naissance <span style="color: red">*</span></label>
                        <input :class="{ 'is-invalid': formErrors.errorNaissance }"
                          @input="formErrors.errorNaissance = false" type="date" class="form-control"
                          id="exampleInputPassword1" placeholder="" v-model="employer.date_birth" />
                        <div class="invalid-feedback" v-if="formErrors.errorNaissance">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Lieu de naissance <span style="color: red">*</span></label>
                        <input :class="{ 'is-invalid': formErrors.errorLieu }" @input="formErrors.errorLieu = false"
                          type="text" class="form-control" id="exampleInputPassword1" placeholder=""
                          v-model="employer.birthplace" />
                        <div class="invalid-feedback" v-if="formErrors.errorLieu">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group controls">
                        <label for="exampleFormControlSelect1">Situation Matrimoniale
                        </label>
                        <select v-model="employer.marital_status" class="form-control mb-3"
                          id="exampleFormControlSelect1">
                          <option value="">Sélectionner</option>
                          <option value="Célibataire sans enfant">Célibataire sans enfant</option>
                          <option value="Célibataire avec enfant">Célibataire avec enfant</option>
                          <option value="Marié">Marié</option>
                          <option value="Veuve">Veuve</option>
                          <option value="Concubinage">Concubinage</option>
                          <option value="Union libre">Union libre</option>
                          <option value="Divorcé">Divorcé</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Personne en charge <span style="color: red">*</span></label>
                        <input :class="{ 'is-invalid': formErrors.errorPersonne }"
                          @input="formErrors.errorPersonne = false" type="number" class="form-control"
                          id="exampleInputPassword1" placeholder="" v-model="employer.charge" />
                        <div class="invalid-feedback" v-if="formErrors.errorPersonne">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset class="scheduler-border col-md-12">
                  <legend class="scheduler-border" style="font-size: 13px !important">
                    Coordonnées
                  </legend>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Email <span style="color: red">*</span></label>
                        <input :class="{ 'is-invalid': formErrors.errorEmail }" @input="formErrors.errorEmail = false"
                          type="email" class="form-control" id="exampleInputPassword1" placeholder="xyz@example.com"
                          v-model="employer.email" />
                        <div class="invalid-feedback" v-if="formErrors.errorEmail">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Telephone <span style="color: red">*</span></label>
                        <input :class="{ 'is-invalid': formErrors.errorTelephone }"
                          @input="formErrors.errorTelephone = false" type="number" min="1" class="form-control"
                          id="exampleInputPassword1" placeholder="+229 xxxxxx" v-model="employer.phone_number" />
                        <div class="invalid-feedback" v-if="formErrors.errorTelephone">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Numéro IFU <span style="color: red">*</span></label>
                        <input :class="{ 'is-invalid': formErrors.errorIFU }" @input="formErrors.errorIFU = false"
                          type="text" class="form-control" id="exampleInputPassword1" placeholder=""
                          v-model="employer.ifu" />
                        <div class="invalid-feedback" v-if="formErrors.errorIFU">
                          Ce champs est requis
                        </div>
                      </div>

                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Numéro d'identification personnel <span
                            style="color: red">*</span></label>
                        <input :class="{ 'is-invalid': formErrors.errorIP }" @input="formErrors.errorIP = false"
                          type="text" class="form-control" id="exampleInputPassword1" placeholder=""
                          v-model="employer.npi" />
                        <div class="invalid-feedback" v-if="formErrors.errorIP">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Nationalité <span style="color: red">*</span></label>
                        <input :class="{ 'is-invalid': formErrors.errorNationality }"
                          @input="formErrors.errorNationality = false" type="text" class="form-control"
                          id="exampleInputPassword1" placeholder="" v-model="employer.nationality" />
                        <div class="invalid-feedback" v-if="formErrors.errorNationality">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Numéro Sécurité Social <span
                            style="color: red">*</span></label>
                        <input :class="{ 'is-invalid': formErrors.errorSecurite }"
                          @input="formErrors.errorSecurite = false" type="number" class="form-control"
                          id="exampleInputPassword1" placeholder="" v-model="employer.social_security_number" />
                        <div class="invalid-feedback" v-if="formErrors.errorSecurite">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Personne à contacter en cas d'urgence <span
                            style="color: red">*</span></label>
                        <input :class="{ 'is-invalid': formErrors.errorPUrgent }" @input="formErrors.errorPUrgent = false"
                          type="text" class="form-control" id="exampleInputPassword1" placeholder=""
                          v-model="employer.urgency_name" />
                        <div class="invalid-feedback" v-if="formErrors.errorPUrgent">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Numéro à contacter en cas d'urgence <span
                            style="color: red">*</span></label>
                        <input :class="{ 'is-invalid': formErrors.errorNUrgent }" @input="formErrors.errorNUrgent = false"
                          type="text" class="form-control" id="exampleInputPassword1" placeholder="+229xxxxxxx"
                          v-model="employer.urgency_phone" />
                        <div class="invalid-feedback" v-if="formErrors.errorNUrgent">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>
                  </div>

                </fieldset>

              </tab-content>

              <tab-content title="" icon="">
                <fieldset class="scheduler-border col-md-12">
                  <legend class="scheduler-border" style="font-size: 13px !important">
                    Information sur les parents
                  </legend>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Nom du père <span style="color: red">*</span></label>
                        <input :class="{ 'is-invalid': formErrors.errorPere }" @input="formErrors.errorPere = false"
                          type="text" class="form-control" id="exampleInputPassword1" placeholder=""
                          v-model="employer.father_name" />
                        <div class="invalid-feedback" v-if="formErrors.errorPere">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Nom de la mère <span style="color: red">*</span></label>
                        <input :class="{ 'is-invalid': formErrors.errorMere }" @input="formErrors.errorMere = false"
                          type="text" class="form-control" id="exampleInputPassword1" placeholder=""
                          v-model="employer.mother_name" />
                        <div class="invalid-feedback" v-if="formErrors.errorMere">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>

                     <!-- Deuxime formulaire -->

                <fieldset class="scheduler-border col-md-12">
                  <legend class="scheduler-border" style="font-size: 13px !important">
                    Contrat de travail
                  </legend>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Type de contrat <span style="color: red">*</span></label>
                        <input :class="{ 'is-invalid': formErrors.errorTypeContrat }"
                          @input="formErrors.errorTypeContrat = false" type="text" class="form-control"
                          id="exampleInputPassword1" placeholder="" v-model="employer.contract_type" />
                        <div class="invalid-feedback" v-if="formErrors.errorTypeContrat">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Date d'embauche <span style="color: red">*</span></label>
                        <input :class="{ 'is-invalid': formErrors.errorEmbauche }"
                          @input="formErrors.errorEmbauche = false" type="date" class="form-control"
                          id="exampleInputPassword1" placeholder="" v-model="employer.hire_date" />
                        <div class="invalid-feedback" v-if="formErrors.errorEmbauche">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Date de fin de contrat <span
                            style="color: red">*</span></label>
                        <input :class="{ 'is-invalid': formErrors.errorFinContrat }"
                          @input="formErrors.errorFinContrat = false" type="date" class="form-control"
                          id="exampleInputPassword1" placeholder="" v-model="employer.termination_date" />
                        <div class="invalid-feedback" v-if="formErrors.errorFinContrat">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Fonction<span style="color: red">*</span></label>
                        <input :class="{ 'is-invalid': formErrors.errorFonction }"
                          @input="formErrors.errorFonction = false" type="text" class="form-control"
                          id="exampleInputPassword1" placeholder="" v-model="employer.function" />
                        <div class="invalid-feedback" v-if="formErrors.errorFonction">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group controls">
                        <label for="department">
                          Département
                          <span style="color: red">*</span>
                        </label>

                        <select :class="{ 'is-invalid': formErrors.errorDepartement }" v-model="employer.departments_id"
                       
                          class="form-control mb-3" id="department">
                          <option value="null" selected>Sélectionner un departement</option>
                          <option v-for="department in departments" :key="department.uuid" :value="department.uuid">
                            {{ department.name }}
                          </option>
                        </select>
                        <div class="invalid-feedback" v-if="formErrors.errorDepartement">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group controls">
                        <label for="department">
                          Service
                          <span style="color: red">*</span>
                        </label>

                        <select :class="{ 'is-invalid': formErrors.errorService }" v-model="employer.services_id"
                           class="form-control mb-3" id="department">
                          <option value="null" selected>Sélectionner un service</option>
                          <option v-for="service in services" :key="service.uuid" :value="service.uuid">
                            {{ service.name }}
                          </option>
                        </select>
                        <div class="invalid-feedback" v-if="formErrors.errorService">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Statut de l'employer <span style="color: red">*</span></label>
                        <input :class="{ 'is-invalid': formErrors.errorStatut }" @input="formErrors.errorStatut = false"
                          type="text" class="form-control" id="exampleInputPassword1" placeholder=""
                          v-model="employer.employment_status" />
                        <div class="invalid-feedback" v-if="formErrors.errorStatut">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Salaire <span style="color: red">*</span></label>
                        <input :class="{ 'is-invalid': formErrors.errorSalaire }" @input="formErrors.errorSalaire = false"
                          type="number" class="form-control" id="exampleInputPassword1" placeholder=""
                          v-model="employer.salary" />
                        <div class="invalid-feedback" v-if="formErrors.errorSalaire">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>


                  </div>
                  <div class="row">
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Durée du contrat <span style="color: red">*</span></label>
                        <input :class="{ 'is-invalid': formErrors.errorDContrat }"
                          @input="formErrors.errorDContrat = false" type="text" class="form-control"
                          id="exampleInputPassword1" placeholder="" v-model="employer.contract_lenght" />
                        <div class="invalid-feedback" v-if="formErrors.errorDContrat">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Temps de travail <span style="color: red">*</span></label>
                        <input :class="{ 'is-invalid': formErrors.errorTravail }" @input="formErrors.errorTravail = false"
                          type="text" class="form-control" id="exampleInputPassword1" placeholder=""
                          v-model="employer.work_time" />
                        <div class="invalid-feedback" v-if="formErrors.errorTravail">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <label for="exampleInputPassword1">Motif <span style="color: red">*</span></label>
                        <input :class="{ 'is-invalid': formErrors.errorMotif }" @input="formErrors.errorMotif = false"
                          type="text" class="form-control" id="exampleInputPassword1" placeholder=""
                          v-model="employer.motif" />
                        <div class="invalid-feedback" v-if="formErrors.errorMotif">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group controls">
                        <label for="typeProduct">
                          Assurance
                          <span style="color: red">*</span>
                        </label>

                        <select :class="{ 'is-invalid': formErrors.errorAssurance }" v-model="employer.assurances_id"
                          class="form-control mb-3" id="typeProduct">
                          <option value="null" selected>Sélectionner un avantages</option>
                          <option v-for="assurance in assurances" :key="assurance.uuid" :value="assurance.uuid">
                            {{ assurance.name }}
                          </option>
                        </select>
                        <div class="invalid-feedback" v-if="formErrors.errorAssurance">
                          Ce champs est requis
                        </div>
                      </div>
                    </div>
                  </div>
                </fieldset>

                <!-- <button type="submit" class="btn btn-success rounded">
                  Valider
                </button> -->
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

Vue.use(VueFormWizard);
import { employerService } from "@/_services";
import { serviceService } from "@/_services";
import { departmentService } from "@/_services";
import { insuranceService } from "@/_services";

export default {
  name: "create-employer",
  props: ["uuid"],
  data() {
    return {
      selected: "",
      departments: [],
      services: [],
      assurances: [],

      employer: {
        services_id: null,
        departments_id: null,
        assurances_id: null,
        last_name: "",
        first_name: "",
        phone_number: "",
        address: "",
        hire_date: "",
        email: "",
        date_birth: "",
        social_security_number: "",
        employment_status: "",
        termination_date: "",
        ifu: "",
        nationality: "",
        birthplace: "",
        charge: "",
        npi: "",
        urgency_name: "",
        urgency_phone: "",
        father_name: "",
        mother_name: "",
        function: "",
        contract_type: "",
        salary: "",
        work_time: "",
        contract_lenght: "",
        motif: "",
        sex: "Féminin",
        marital_status: "",      
      },
      wrong: "",
      formErrors: {
        errorNom: "",
        errorPrenom: "",
        errorNaissance: "",
        errorTelephone: "",
        errorAdresse: "",
        errorEmbauche: "",
        errorEmail: "",
        errorSecurite: "",
        errorNationality: "",
        errorIFU: "",
        errorPersonne: "",
        errorIP: "",
        errorStatut: "",
        errorTravail: "",
        errorMotif: "",
        errorDContrat: "",
        errorSalaire: "",
        errorFonction: "",
        errorTypeContrat: "",
        errorNUrgent: "",
        errorFinContrat: "",
        errorLieu: "",
        errorPUrgent: "",
        errorDepartement: "",
        errorService: "",
        errorAssurance: "",

      },
    };
  },
  mounted() {
    employerService.getEmployer(this.uuid).then((res) => {
      this.employer = res.data.data;
      this.employer.uuid = this.uuid;
    });
    serviceService
      .getAllServices()
      .then((res) => {
        this.services = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });

    departmentService
      .getAllDepartments()
      .then((res) => {
        this.departments = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });

    insuranceService
      .getAllInsurances()
      .then((res) => {
        this.assurances = res.data.data;
      })
      .catch((error) => {
        console.log(error);
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
      this.$router.push("/grh/list");
    },
    beforeChange(toIndex, fromIndex) {
        if (
          !this.employer.last_name ||
          !this.employer.first_name ||
          !this.employer.date_birth ||
          !this.employer.sex ||
          !this.employer.address
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

      onComplete(){
        this.update();
      },
 
    update() {
      let isValid = true;

      this.formErrors = {};
      this.formErrors.errorNom = false;
      this.formErrors.errorPrenom = false;
      this.formErrors.errorNaissance = false;
      this.formErrors.errorTelephone = false;
      this.formErrors.errorEmail = false;
      this.formErrors.errorSecurite = false;
      this.formErrors.errorNationality = false;
      this.formErrors.errorIFU = false;
      this.formErrors.errorPersonne = false;
      this.formErrors.errorIP = false;
      this.formErrors.errorStatut = false;
      this.formErrors.errorTravail = false;
      this.formErrors.errorMotif = false;
      this.formErrors.errorDContrat = false;
      this.formErrors.errorSalaire = false;
      this.formErrors.errorFonction = false;
      this.formErrors.errorTypeContrat = false;
      this.formErrors.errorNUrgent = false;
      this.formErrors.errorPUrgent = false;
      this.formErrors.errorLieu = false;
      this.formErrors.errorFinContrat = false;
      this.formErrors.errorAdresse = false;
      this.formErrors.errorEmbauche = false;
      this.formErrors.errorDepartement = false;
      this.formErrors.errorService = false;
      this.formErrors.errorAssurance = false;

      if (!this.employer.last_name) {
        this.formErrors.errorNom = true;

        isValid = false;
      }

      if (!this.employer.first_name) {
        this.formErrors.errorPrenom = true;
        isValid = false;
      }
      if (!this.employer.date_birth) {
        this.formErrors.errorNaissance = true;
        isValid = false;
      }
      if (!this.employer.phone_number) {
        this.formErrors.errorTelephone = true;
        isValid = false;
      }

      if (!this.employer.email) {
        this.formErrors.errorEmail = true;
        isValid = false;
      }
      if (!this.employer.social_security_number) {
        this.formErrors.errorSecurite = true;
        isValid = false;
      }
      if (!this.employer.nationality) {
        this.formErrors.errorNationality = true;
        isValid = false;
      }
      if (!this.employer.ifu) {
        this.formErrors.errorIFU = true;
        isValid = false;
      }
      if (!this.employer.charge) {
        this.formErrors.errorPersonne = true;
        isValid = false;
      }
      if (!this.employer.npi) {
        this.formErrors.errorIP = true;
        isValid = false;
      }
      if (!this.employer.urgency_name) {
        this.formErrors.errorPUrgent = true;
        isValid = false;
      }

      if (!this.employer.employment_status) {
        this.formErrors.errorStatut = true;
        isValid = false;
      }
      if (!this.employer.work_time) {
        this.formErrors.errorTravail = true;
        isValid = false;
      }
      if (!this.employer.motif) {
        this.formErrors.errorMotif = true;
        isValid = false;
      }
      if (!this.employer.contract_lenght) {
        this.formErrors.errorDContrat = true;
        isValid = false;
      }
      if (!this.employer.salary) {
        this.formErrors.errorSalaire = true;
        isValid = false;
      }
      if (!this.employer.function) {
        this.formErrors.errorFonction = true;
        isValid = false;
      }
      if (!this.employer.contract_type) {
        this.formErrors.errorTypeContrat = true;
        isValid = false;
      }
      
      
      if (!this.employer.urgency_phone) {
        this.formErrors.errorNUrgent = true;
        isValid = false;
      }
      if (!this.employer.birthplace) {
        this.formErrors.errorLieu = true;
        isValid = false;
      }
      if (!this.employer.termination_date) {
        this.formErrors.errorFinContrat = true;
        isValid = false;
      }

      if (!this.employer.address) {
        this.formErrors.errorAdresse = true;
        this.isValid = false;
      }
      if (!this.employer.hire_date) {
        this.formErrors.errorEmbauche = true;
        this.isValid = false;
      }
      if (!this.employer.departments_id) {
        this.formErrors.errorDepartement = true;
        this.isValid = false;
      }
      if (!this.employer.services_id) {
        this.formErrors.errorService = true;
        this.isValid = false;
      }

      if (!this.employer.assurances_id) {
        this.formErrors.errorAssurance = true;
        this.isValid = false;
      }
      if (!isValid) {
        return;
      }

      if (!/^\d{8,}$/.test(this.employer.phone_number)) {
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


      if (
        this.employer.last_name.length > 100 ||
        !/^[a-zA-ZÀ-ÿ\s]{2,}$/.test(this.employer.last_name)
      ) {
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

      // if (!/^[a-zA-Z]{2,}$/.test(this.employer.first_name)) {

      if (!/^[a-zA-ZÀ-ÿ\s]{2,}$/.test(this.employer.first_name)) {
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


      employerService
        .updateEmployer(this.employer)
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
          this.$router.push("/grh/list");
        })
        .catch((err) => {
         
          let isValid = true;

          this.formErrors = {};

          if (!this.employer.last_name) {
            this.formErrors.errorLastname = "Le nom de l' employer est requis";
            isValid = false;
          }

          if (!this.employer.first_name) {
            this.formErrors.errorFistname = "Le prenom de l'employer est requis.";
            isValid = false;
          }

          if (!this.employer.email) {
            this.formErrors.errorEmail =
              "L'adresse mail de l'employer est requise.";
            isValid = false;
          }
          if (!this.employer.employment_status) {
            this.formErrors.errorStatut =
              "Le statut de l'employer est requise.";
            isValid = false;
          }
          if (!this.employer.termination_date) {
            this.formErrors.errorFinContrat =
              "La date de fin de contrat de l'employer est requise.";
            isValid = false;
          }
          if (!this.employer.address) {
            this.formErrors.errorAddress = "L'adresse de l'employer est requise.";
            this.isValid = false;
          }

          if (!this.employer.phone_number) {
            this.formErrors.errorPhone =
              "Le numéro de téléphone de l'employer est requis.";
            this.isValid = false;
          }

          if (!this.employer.social_security_number) {
            this.formErrors.errorSecurite =
              "Le numéro de sécurité social de l'employer est requis.";
            this.isValid = false;
          }

          if (!this.employer.date_birth) {
            this.formErrors.errorNaissance =
              "Veuillez renseigner la date de naissance de l'employer.";
            this.isValid = false;
          }

          if (!this.employer.hire_date) {
            this.formErrors.errorEmbauche =
              "Veuillez renseigner la date d'embauche de l'employer.";
            this.isValid = false;
          }

          if (!isValid) {
            return;
          }
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

input[type="radio"].demo6 + label {
  position: relative;
  padding-left: 1.3rem;
}

input[type="radio"].demo6 + label::before,
input[type="radio"].demo6 + label::after {
  display: block;
  position: absolute;
  box-sizing: border-box;
  content: "";
  border-radius: 1rem;
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

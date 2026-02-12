<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">

        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded px-3 py-1 mb-3 text-center"
              style=" background-color: #0B5D3F; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-transform: none;">Ajout d'un nouvel employé
            </h3>

            <form @submit.prevent="store">
              <fieldset class="form-group border px-3 py-1">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Identité du employé</b></legend>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Nom <span style="color: red">*</span></label>
                      <input type="text" maxlength="50" class="form-control" style="text-transform: uppercase"
                        placeholder="Nom" v-model="employer.last_name" @input="validateLastName"/>
                      <div class="error-message" v-show="errors.last_name">
                        {{ errors.last_name }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Prénom(s) <span style="color: red">*</span></label>
                      <input type="text" style="text-transform: capitalize" class="form-control" maxlength="60"
                        placeholder="Prénom" v-model="employer.first_name" @input="validateFirstName"/>
                      <div class="error-message" v-show="errors.first_name" >
                        {{ errors.first_name }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Date de Naissance
                        <span style="color: red">*</span></label>                      
                      <input type="date" class="form-control" :max="max_date" v-model="employer.date_birth"/>
                      <div class="error-message" v-show="errors.date_birth">
                          {{ errors.date_birth }}
                        </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Lieu de Naissance<span style="color: red">*</span></label>                      
                      <input type="text" maxlength="40" class="form-control" v-model="employer.birthplace"/>
                      <div class="error-message" v-show="errors.birthplace">
                          {{ errors.birthplace }}
                        </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group controls">
                      <label>Sexe<span style="color: red">*</span>
                      </label>
                      <select v-model="employer.sex" class="form-control mb-3">
                        <option value="">Sélectionner</option>
                        <option value="Masculin">Masculin</option>
                        <option value="Feminin">Féminin</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Nationalité
                        <span style="color: red">*</span></label>                      
                      <input type="text" maxlength="40" class="form-control" v-model="employer.nationality" @input="validateNationality"/>
                      <div class="error-message" v-show="errors.nationality">
                          {{ errors.nationality }}
                        </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group controls">
                      <label>Situation Matrimoniale<span style="color: red">*</span></label>
                      <select v-model="employer.marital_status" class="form-control mb-3">
                        <option value="">Sélectionner</option>
                        <option value="Célibataire sans enfant">Célibataire sans enfant</option>
                        <option value="Célibataire avec enfant">Célibataire avec enfant</option>
                        <option value="Marié">Marié(e)</option>
                        <option value="Veuve">Veuf(ve)</option>
                        <option value="Concubinage">Concubinage</option>
                        <option value="Union libre">Union libre</option>
                        <option value="Divorcé">Divorcé(e)</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Personne(s) en charge
                        <span style="color: red">*</span></label>                      
                      <input type="text" maxlength="2" class="form-control" v-model="employer.charge" @input="validateCharge"/>
                      <div class="error-message" v-show="errors.charge">
                        {{ errors.charge }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Numéro IFU</label>                      
                      <input type="text" maxlength="15" class="form-control" v-model="employer.ifu" @input="validateIfu"/>
                      <div class="error-message" v-show="errors.ifu">
                          {{ errors.ifu }}
                        </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Numéro d'Identification Personnelle
                        <span style="color: red">*</span></label>                      
                      <input type="text" maxlength="10" class="form-control" v-model="employer.npi" @input="validateNpi"/>
                      <div class="error-message" v-show="errors.npi">
                          {{ errors.npi }}
                        </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Numéro de sécurité sociale</label>                      
                      <input type="text" maxlength="15" class="form-control" v-model="employer.social_security_number" @input="validateSocialSecurityNumber"/>
                      <div class="error-message" v-show="errors.social_security_number">
                          {{ errors.social_security_number }}
                        </div>
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset class="form-group border px-3 py-1">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Coordonnées et Contacts</b></legend>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Email</label>
                      <input type="email" maxlength="40" class="form-control" placeholder="xyz@example.com" v-model="employer.email"/>
                    </div>
                  </div>   
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Adresse</label>
                      <input type="text"  maxlength="50" class="form-control" style="text-transform: capitalize"
                        placeholder="Entrez votre adresse" v-model="employer.address" />
                    </div>
                  </div>           
                </div>
                <div class="row">                  
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Téléphone
                      </label>
                      <input type="text" minlength="8" maxlength="8" class="form-control" placeholder="99999999" v-model="employer.phone_number" @input="validatePhoneNumber"/>
                    </div>
                  </div>   
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Personne à contacter en cas d'urgence<span style="color: red">*</span></label>
                      <input type="text" class="form-control" style="text-transform: capitalize" v-model="employer.urgency_name" @input="validateUrgencyName"/>
                        <div class="error-message" v-show="errors.urgency_name">
                          {{ errors.urgency_name }}
                      </div>
                    </div>
                  </div> 
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Numéro d'urgence<span style="color: red">*</span></label>
                      <input type="text" minlength="8" maxlength="8" class="form-control" placeholder="99999999" v-model="employer.urgency_phone" @input="validateUrgencyPhone"/>
                      <div class="error-message" v-show="errors.urgency_phone">
                          {{ errors.urgency_phone }}
                      </div>
                    </div>
                  </div>
                </div>
              </fieldset>
              
              <fieldset class="form-group border px-3 py-1">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Contrat de travail</b></legend>
                <div class="row"> 
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Département</label>
                      <select v-model="employer.departments_id" class="form-control mb-3" id="department">
                        <option>Sélectionner un departement</option>
                        <option v-for="department in departments" :key="department.uuid" :value="department.uuid">
                          {{ department.name }}
                        </option>
                      </select>
                    </div>
                  </div> 
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Service</label>
                      <select v-model="employer.services_id" class="form-control mb-3" id="department">
                        <option>Sélectionner un service</option>
                        <option v-for="service in services" :key="service.uuid" :value="service.uuid">
                          {{ service.name }}
                        </option>
                      </select>
                    </div>
                  </div> 
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Fonction<span style="color: red">*</span></label>
                      <input type="text" maxlength="50" class="form-control" style="text-transform: capitalize" v-model="employer.function" @input="validateFonction"/>
                      <div class="error-message" v-show="errors.function">
                        {{ errors.function }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group controls">
                      <label>Type de contrat<span style="color: red">*</span></label>
                      <select v-model="employer.contract_type" class="form-control">
                        <option>Sélectionner un service</option>
                        <option value="cdd">Contrat à Durée Déterminée</option>
                        <option value="cdi">Contrat à Durée Indéterminée</option>
                      </select>
                      <div class="error-message" v-show="errors.contract_type">
                          {{ errors.contract_type }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Date d'embauche<span style="color: red">*</span></label>                      
                      <input type="date" class="form-control" :max="max_date" v-model="employer.hire_date" />
                      <div class="error-message" v-show="errors.hire_date">
                          {{ errors.hire_date }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Date de fin de contrat</label>                      
                      <input type="date" class="form-control" :min="min_date" v-model="employer.termination_date" @input="validateTerminationDate"/>
                      <div class="error-message" v-show="errors.termination_date">
                          {{ errors.termination_date }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Durée du contrat (mois)</label>
                      <input type="text" class="form-control" maxlength="3" style="text-transform: capitalize" v-model="employer.contract_lenght" @input="validateContractLenght"/>
                      <div class="error-message" v-show="errors.contract_lenght">
                        {{ errors.contract_lenght }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Salaire</label>
                      <input type="text" class="form-control" maxlength="8" style="text-transform: capitalize" v-model="employer.salary" @input="validateSalary"/>
                      <div class="error-message" v-show="errors.salary">
                        {{ errors.salary }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group controls">
                      <label>Statut de l'employé</label>
                      <select v-model="employer.employment_status" class="form-control mb-3">
                        <option value="actif">Actif</option>
                        <option value="inactif">Inactif</option>
                      </select>
                    </div>
                  </div>
                </div>
              </fieldset>

              <div class="mx-auto text-center">
                <router-link to="/grh/list">
                  <button type="button" class="btn btn-danger btn-medpay-green mr-2">Annuler</button> </router-link>
                <button type="submit" class="btn btn-success btn-medpay-green mr-2"> Ajouter </button>
              </div>

            </form>

          </div>

        </div>
      </div>
    </div>

  </section>
</template>
<script>
import Vue from "vue";
import { employerService } from "@/_services";
import { serviceService } from "@/_services";
import { departmentService } from "@/_services";

import { useToast, POSITION } from "vue-toastification";

export default {
  name: "create-employer",
  data() {
    return {
      selected: "",
      departments: [],
      services: [],
      min_date: "",

      employer: {
        services_id: null,
        departments_id: null,
        last_name: "",
        first_name: "",
        phone_number: "",
        address: "",
        hire_date: "",
        email: "",
        date_birth: "",
        social_security_number: "",
        employment_status: "actif",
        termination_date: "",
        ifu: "",
        nationality: "Béninoise",
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
        sex: "Masculin",
        marital_status: "",
      },
      
      errors: {
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
        marital_status: "",
      },
      
    };
  },

  mounted() {
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
        console.log(this.departments);
      })
      .catch((error) => {
        console.log(error);
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
    validateLastName() {
      if (this.employer.last_name) {
        // Si le champ 'lastname' n'est pas vide et ne contient pas que des chiffres
        this.employer.last_name = this.employer.last_name.replace(/[0-9]/g, '');
        this.errors.last_name = "";
      } else {
        // Si le champ 'lastname' est vide ou contient des chiffres, affichez un message d'erreur
        this.errors.last_name = "Le nom ne doit pas être vide et ne doit pas contenir de chiffres.";
      }
    },

    validateFirstName() {
      // Validation du prénom
      if (this.employer.first_name) {
        this.employer.first_name = this.employer.first_name.replace(/[0-9]/g, '');
        this.errors.first_name = "";
      } else {
        this.errors.first_name = "Le prénom ne doit pas être vide et ne doit pas contenir de chiffres.";
      }
    }, 

    validateNationality() {
      // Validation du prénom
      if (this.employer.nationality) {
        this.employer.nationality = this.employer.nationality.replace(/[0-9]/g, '');
        this.errors.nationality = "";
      } else {
        this.errors.nationality = "La nationalité ne doit pas être vide et ne doit pas contenir de chiffres.";
      }
    }, 

    validateUrgencyName() {
      // Validation du nom de la mère
      if (this.employer.urgency_name) {
        this.errors.urgency_name = "";
        this.employer.urgency_name = this.employer.urgency_name.replace(/[0-9]/g, '');
      } 
      // else {
      //   this.errors.urgency_name = "Le nom de la personne à contacter en cas d'urgence ne doit pas être vide et ne doit pas contenir de chiffres.";
      // }
    },

    validateCharge() {
      // Validation du contact de la mère
      if (this.employer.charge) {
        this.errors.charge = "";
        this.employer.charge = this.employer.charge.replace(/[^0-9]/g, '');
      } 
      // else {
      //   this.errors.charge = "Le nombre de personne en charge est requis.";
      // }
    }, 

    validateIfu() {
      // Validation du contact de la mère
      if (this.employer.ifu) {
        this.errors.ifu = "";
        this.employer.ifu = this.employer.ifu.replace(/[^0-9]/g, '');
      } 
      // else {
      //   this.errors.ifu = "Le numéro IFU est requis et ne doit pas contenir de lettres.";
      // }
    }, 

    validateNpi() {
      // Validation du contact de la mère
      if (this.employer.npi) {
        this.errors.npi = "";
        this.employer.npi = this.employer.npi.replace(/[^0-9]/g, '');
      } 
      else {
        this.errors.npi = "Le numéro d'identification personnel est requis et ne doit pas contenir de lettres.";
      }
    }, 

    validateSocialSecurityNumber() {
      // Validation du contact de la mère
      if (this.employer.social_security_number) {
        this.errors.social_security_number = "";
        this.employer.social_security_number = this.employer.social_security_number.replace(/[^0-9]/g, '');
      } 
      // else {
      //   this.errors.social_security_number = "Le numéro de sécurité social est requis et ne doit pas contenir de lettres.";
      // }
    }, 

    validatePhoneNumber() {
      // Validation du contact de la mère
      if (this.employer.phone_number) {
        this.errors.phone_number = "";
        this.employer.phone_number = this.employer.phone_number.replace(/[^0-9]/g, '');
      } 
      else {
        this.errors.phone_number = "Le numéro de téléphone est requis.";
      }
    }, 

    validateUrgencyPhone() {
      // Validation du contact de la mère
      if (this.employer.urgency_phone) {
        this.errors.urgency_phone = "";
        this.employer.urgency_phone = this.employer.urgency_phone.replace(/[^0-9]/g, '');
      } 
      else {
        this.errors.urgency_phone = "Le numéro d'urgence est requis.";
      }
    },  

    validateFonction() {
      // Validation du nom de la mère
      if (this.employer.function) {
        this.errors.function = "";
        this.employer.function = this.employer.function.replace(/[0-9]/g, '');
      } 
      // else {
      //   this.errors.nom_pere = "Le nom de la mère ne doit pas être vide et ne doit pas contenir de chiffres.";
      // }
    },

    validateHireDate() {
      if (this.employer.hire_date) {
        this.min_date = this.employer.hire_date;
      } 
      else {
        this.errors.hire_date = "La date d'embauche est requise.";
      }
    },

    validateTerminationDate() {
      if (this.employer.termination_date) {
        const embaucheDate = new Date(this.employer.hire_date);
        const terminationDate = new Date(this.employer.termination_date);

        // Vérifie si l'anniversaire de cette année n'a pas encore eu lieu
        if (terminationDate.getMonth() === embaucheDate.getMonth() && terminationDate.getDate() < embaucheDate.getDate()) {
          this.errors.termination_date = "La date de fin de contrat ne peut pas être antérieure à la date d'embauche.";
          this.employer.termination_date = "";
        } else {
          this.errors.termination_date = "";
        }
      } 
      else {
        this.errors.termination_date = "La date de fin de contrat est requise.";
      }
    },

    validateContractLenght() {
      // Validation du contact de la mère
      if (this.employer.contract_lenght) {
        this.errors.contract_lenght = "";
        this.employer.contract_lenght = this.employer.contract_lenght.replace(/[^0-9]/g, '');
      } 
      // else {
      //   this.errors.contract_lenght = "Le numéro de la mère d'urgence est requis.";
      // }
    },

    validateSalary() {
      // Validation du contact de la mère
      if (this.employer.salary) {
        this.errors.salary = "";
        this.employer.salary = this.employer.salary.replace(/[^0-9]/g, '');
      } 
      // else {
      //   this.errors.salary = "Le numéro de la mère d'urgence est requis.";
      // }
    },

    store() {
      let isValid = true;
      this.errors = {};

      if (!this.employer.last_name){
        this.errors.last_name = "Le nom est requis";
        isValid = false;
      }
      if (!this.employer.first_name){
        this.errors.first_name = "Le prénom est requis";
        isValid = false;
      }
      if (!this.employer.nationality){
        this.errors.nationality = "La nationalité est requise";
      }
      if (!this.employer.urgency_name){
        this.errors.urgency_name = "Le nom de la personne à contacter en cas d'urgence est requis";
      }
      if (!this.employer.urgency_phone){
        this.errors.urgency_phone = "Le numéro de la personne à contacter en cas d'urgence est requis";
      }
      if (!this.employer.charge){
        this.errors.charge = "Le nombre de personne en charge est requis";
      }
      if (!this.employer.birthplace){
        this.errors.birthplace = "Le lieu de naissance est requis";
      }
      if (!this.employer.date_birth){
        this.errors.date_birth = "La date de naissance est requise";
      }
      if (!this.employer.sex){
        this.errors.sex = "Le sexe est requis.";
      }
      if (!this.employer.npi){
        this.errors.npi = "Le numéro d'identification personnel est requis";
      }
      if (!this.employer.hire_date){
        this.errors.hire_date = "La date d'embauche est requise.";
      }
      if (!this.employer.contract_type){
        this.errors.contract_type = "Le type de contrat est requis";
      }
      if (!this.employer.function){
        this.errors.function = "La fonction est requise";
      }

      if (!isValid) {
        return;
      }

      employerService
        .addEmployers(this.employer)
        .then((res) => {
          this.$toast.success("Enregistrement effectué avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
          this.$router.push("/grh/list");
        })
        .catch((err) => {
          if (
            err.response &&
            err.response.status === 422 &&
            err.response.data.errors
          ) {
            const errors = err.response.data.errors;

            if (errors.phone_number) {
              this.$toast.error("Ce numéro de téléphone est déjà utilisé.", {
                position: POSITION.TOP_RIGHT,
                timeout: 3000,
                bodyStyle: {
                  borderRadius: "10px",
                  backgroundColor: "#ff0000",
                  color: "#fff",
                  fontWeight: "bold",
                },
              });
              this.formErrors.errorTelephone = true;
            }

            if (errors.email) {
              this.$toast.error("Cette adresse email est déjà utilisée..", {
                position: POSITION.TOP_RIGHT,
                timeout: 3000,
                bodyStyle: {
                  borderRadius: "10px",
                  backgroundColor: "#ff0000",
                  color: "#fff",
                  fontWeight: "bold",
                },
              });
              this.formErrors.errorEmail = true;
            }

          } else {
            console.log(err);
          }
        });
    },    

    getToday() {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0'); // Les mois sont 0-indexés, donc on ajoute 1
      const dd = String(today.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    },
  },

  created() {
    // Appeler la méthode getToday pour initialiser max_date à "aujourd'hui" lors de la création du composant
    this.max_date = this.getToday();
  },
};
</script>

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

.error-message {
  color: red;
  font-size: 13px;
}

select {
  cursor: pointer;
  /* height: 43px !important; */
}

input[type="radio"].demo6 {
  display: none;
}

input[type="radio"].demo6+label {
  position: relative;
  padding-left: 1rem;
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

<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded px-3 py-1 mt-0 text-center" style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-transform: none;">
              Détails d'un employé
            </h3>
              <fieldset class="form-group border px-3 py-1">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Identité de l'employé</b></legend>
                <table class="table table-borderless">
                  <tr>
                    <td class="bg-stripped">
                      <div class="row">
                        <div class="col-md-6 middle vr">
                          <div class="form-group">
                            <strong>Nom : </strong>
                            <span class="ml-2" style="text-transform: uppercase"> {{ employer.last_name }}</span>                      
                          </div>
                        </div>
                        <div class="col-md-6 middle">
                          <div class="form-group">
                            <strong>Prénom(s) : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ employer.first_name }}</span>                      
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="row">
                        <div class="col-md-4 middle vr">
                          <div class="form-group">
                            <strong>Date de naissance : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ employer.date_birth }}</span>                      
                          </div>
                        </div>
                        <div class="col-md-4 middle vr">
                          <div class="form-group">
                            <strong>Lieu de naissance : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ employer.birthplace }}</span>                      
                          </div>
                        </div>
                        <div class="col-md-4 middle">
                          <div class="form-group">
                            <strong>Sexe : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ employer.sex }}</span>                      
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="bg-stripped">
                      <div class="row">
                        <div class="col-md-4 middle vr">
                          <div class="form-group">
                            <strong>Nationalité : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ employer.nationality }}</span>                      
                          </div>
                        </div>
                        <div class="col-md-4 middle vr">
                          <div class="form-group">
                            <strong>Sit. Matrimoniale : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ employer.marital_status }}</span>                      
                          </div>
                        </div>
                        <div class="col-md-4 middle">
                          <div class="form-group">
                            <strong>Personne(s) en charge  : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ employer.charge }}</span>                      
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="row">
                        <div class="col-md-3 middle vr">
                          <div class="form-group">
                            <strong>Numéro IFU : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ employer.ifu }}</span>                      
                          </div>
                        </div>
                        <div class="col-md-5 middle vr">
                          <div class="form-group">
                            <strong>Numéro d'identification personnelle : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ employer.npi }}</span>                      
                          </div>
                        </div>
                        <div class="col-md-4 middle">
                          <div class="form-group">
                            <strong>Numéro de sécurité sociale : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ employer.social_security_number }}</span>                      
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </fieldset>

              <fieldset class="form-group border px-3 py-1">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Coordonnées et Contacts</b></legend>
                <table class="table table-borderless">
                  <tr>
                    <td class="bg-stripped">
                      <div class="row">
                        <div class="col-md-4 middle vr">
                          <div class="form-group">
                            <strong>Email : </strong>
                            <span class="ml-2" style="text-transform: lowercase"> {{ employer.email }}</span>                            
                          </div>
                        </div> 
                        <div class="col-md-4 middle vr">
                          <div class="form-group">
                            <strong>Adresse : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ employer.address }}</span>                            
                          </div>
                        </div>
                        <div class="col-md-4 middle">
                          <div class="form-group">
                            <strong>Téléphone : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ employer.phone_number }}</span>                            
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div class="row">
                        <div class="col-md-6 middle vr">
                          <div class="form-group">
                            <strong>Personne à contacter : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ employer.urgency_name }}</span>                            
                          </div>
                        </div>
                        <div class="col-md-6 middle">
                          <div class="form-group">
                            <strong>Numéro d'urgence : </strong>
                            <span class="ml-2" style="text-transform: capitalize"> {{ employer.urgency_phone }}</span>                            
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </fieldset>

              <fieldset class="form-group border px-3 py-1">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Contrat de travail</b></legend>
                  <table class="table table-borderless">
                    <tr>
                      <td class="bg-stripped">
                        <div class="row">
                          <div class="col-md-5 middle vr">
                            <div class="form-group">
                              <strong>Département : </strong>
                              <span class="ml-2" style="text-transform: capitalize"> {{ employer.department }}</span>                            
                            </div>
                          </div>
                          <div class="col-md-4 middle vr">
                            <div class="form-group">
                              <strong>Service : </strong>
                              <span class="ml-2" style="text-transform: capitalize"> {{ employer.service }}</span>                            
                            </div>
                          </div>
                          <div class="col-md-3 middle">
                            <div class="form-group">
                              <strong>Fonction : </strong>
                              <span class="ml-2" style="text-transform: capitalize"> {{ employer.function }}</span>                            
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div class="row">
                          <div class="col-md-4 middle vr">
                            <div class="form-group">
                              <strong>Type de contrat : </strong>
                              <span class="ml-2" style="text-transform: uppercase"> {{ employer.contract_type }}</span>                            
                            </div>
                          </div>
                          <div class="col-md-4 middle vr">
                            <div class="form-group">
                              <strong>Date d'embauche : </strong>
                              <span class="ml-2" style="text-transform: capitalize"> {{ employer.hire_date }}</span>                            
                            </div>
                          </div>
                          <div class="col-md-4 middle">
                            <div class="form-group">
                              <strong>Date de fin : </strong>
                              <span class="ml-2" style="text-transform: capitalize"> {{ employer.termination_date }}</span>                            
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td class="bg-stripped">
                        <div class="row">
                          <div class="col-md-4 middle vr">
                            <div class="form-group">
                              <strong>Durée du contrat : </strong>
                              <span class="ml-2" style="text-transform: capitalize"> {{ employer.contract_lenght }} mois</span>                            
                            </div>
                          </div>
                          <div class="col-md-4 middle vr">
                            <div class="form-group">
                              <strong>Salaire : </strong>
                              <span class="ml-2" style="text-transform: capitalize"> {{ employer.salary }} FCFA</span>                            
                            </div>
                          </div>
                          <div class="col-md-4 middle">
                            <div class="form-group">
                              <strong>Statut de l'employé : </strong>
                              <span class="ml-2" style="text-transform: capitalize"> {{ employer.employment_status }}</span>                            
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
              </fieldset>
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
import { employerService } from "@/_services";

import { useToast, POSITION } from "vue-toastification";

Vue.use(VueFormWizard);
export default {
  name: "create-employer",
  props: ["uuid"],
  data() {
    return {
      selected: "",
      departments: [],
      services: [],
      assurances: [],
      min_date: "",

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
    };
  },
  mounted() {
    employerService.getEmployer(this.uuid).then((res) => {
      this.employer = res.data.data;
      this.employer.uuid = this.uuid;
      this.employer.service = res.data.data.services.name;
      this.employer.department = res.data.data.departments.name;
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
  }
};
</script>

<style scoped>
@import "../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
@import "../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";

/* .table {
  margin-top: -1rem !important;
} */

.middle {
    display: flex !important;
    align-items: center !important;
}

.vr {
    border-right: 2px solid rgb(0, 0, 0) !important;
    height: 1.5rem !important;
}

.vr-no {
    height: 1.5rem !important;
}

.form-group {
  margin-bottom: 0 !important
}

.bg-stripped {
  background-color: #0b5d3f1a;
}

.table th, .table td {
    padding: 0.4em 0.6em !important;
}

#confirmDeleteModal .modal-dialog {
  max-width: 500px;
  border-radius: 10px;
}

#confirmDeleteModal .modal-content {
  border: none;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

#confirmDeleteModal .modal-header {
  background-color: #f8f9fa;
  border-radius: 10px 10px 0 0;
  border-bottom: none;
}

#confirmDeleteModal .close {
  font-size: 24px;
  color: #6c757d;
}

#confirmDeleteModal .alert {
  border-radius: 10px;
}

#confirmDeleteModal .alert p {
  margin-bottom: 0;
  font-weight: bold;
}

#confirmDeleteModal .modal-body {
  padding: 20px;
}

#confirmDeleteModal .modal-title {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

#confirmDeleteModal .modal-value {
  margin-bottom: 10px;
  font-size: 16px;
}

#confirmDeleteModal .modal-footer {
  border-top: none;
  background-color: #f8f9fa;
  border-radius: 0 0 10px 10px;
}

#confirmDeleteModal .btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

#confirmDeleteModal .btn-danger:hover,
#confirmDeleteModal .btn-danger:focus {
  background-color: #c82333;
  border-color: #bd2130;
}

.text-bold {
  font-weight: bold;
}

.btn-connexion-green {
  border: 3px solid rgb(11, 93, 63) !important;

  box-shadow: none !important;
  font-weight: 700 !important;
  /* font-size: 16px !important; */
  color: white !important;
  background-color: rgb(35, 101, 171);

  /* Ajustez la taille du texte selon vos préférences */
  /* padding: 0.685rem 0.49rem !important; */
}

.btn-connexion-green:hover {
  /* Changez la couleur de fond au survol */
  /* color: rgb(11, 93, 63) !important; */
  color: rgb(11, 93, 63) !important;
  background-color: #ffffff !important;
  /* Par exemple, une couleur de fond différente au survol */
}

</style>

<template>
  <section class="container-scroller">
    <!-- <div class="page-header">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">
                        <a href="javascript:void(0);" class="text-dark font-weight-bold">Tableau de board
                        </a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                        Gestion des employers
                    </li>
                    <li class="breadcrumb-item active text-success font-weight-bold" aria-current="page">
                        Détails sur l'Employer
                    </li>
                </ol>
            </nav>
        </div> -->

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <!-- <h4 class="card-title">Modifier un employer</h4> -->

            <h3
              class="card-title text-white rounded p-3 mb-5 text-center"
              style="
                background-color: #0b5d3f;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              "
            >
              Informations concernant l'employer : &nbsp;&nbsp;{{
                employer.last_name
              }}
            </h3>

            <form class="forms-sample row" @submit.prevent="detail">
              <div class="col-md-12"></div>
              <div class="col-md-6">
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputUsername1">Nom :</label>&nbsp;&nbsp;
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.last_name }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputUsername1">Prénom(s) :</label
                  >&nbsp;&nbsp;
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.first_name }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputUsername1">Sexe :</label>&nbsp;&nbsp;
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.sex }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputConfirmPassword1"
                    >Date de naissance :</label
                  >
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.date_birth }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputConfirmPassword1"
                    >Lieu de naissance :</label
                  >
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.birthplace }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputConfirmPassword1"
                    >Situation Matrimoniale :</label
                  >
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.marital_status }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputConfirmPassword1"
                    >Nombre de personne en charge :</label
                  >
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.charge }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputConfirmPassword1">Téléphone :</label
                  >&nbsp;&nbsp;
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.phone_number }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputPassword1">Adresse :</label
                  >&nbsp;&nbsp;
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.address }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputPassword1">Email :</label>&nbsp;&nbsp;
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.email }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputPassword1">Nationnalité :</label
                  >&nbsp;&nbsp;
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.nationality }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputPassword1">Numero IFU :</label
                  >&nbsp;&nbsp;
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.ifu }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputPassword1"
                    >Numero d'Identification presonnel :</label
                  >&nbsp;&nbsp;
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.npi }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputPassword1"
                    >Numero de Sécurité Social :</label
                  >&nbsp;&nbsp;
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.social_security_number }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputPassword1">Nom du père :</label
                  >&nbsp;&nbsp;
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.father_name }}
                  </p>
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputConfirmPassword1"
                    >Nom de la mère :</label
                  >
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.mother_name }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputConfirmPassword1"
                    >Personne à contacter en cas d'urgence :</label
                  >
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.urgency_name }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputConfirmPassword1"
                    >Numéro à contacter en cas d'urgence :</label
                  >
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.urgency_phone }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputConfirmPassword1"
                    >Date d'embauche :</label
                  >
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.hire_date }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputConfirmPassword1"
                    >Date fin contrat :</label
                  >
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.termination_date }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputConfirmPassword1"
                    >Type de contrat :</label
                  >
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.contract_type }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputConfirmPassword1">Fonction :</label>
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.function }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputConfirmPassword1">Motif :</label>
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.motif }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputConfirmPassword1"
                    >Statut de l'employer :</label
                  >
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.employment_status }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputConfirmPassword1"
                    >Temps de travail :</label
                  >
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.work_time }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputConfirmPassword1"
                    >Durer du contrat :</label
                  >
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.contract_lenght }}
                  </p>
                </div>

                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputConfirmPassword1">Salaire :</label>
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.salary }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputConfirmPassword1"
                    >Departement de travail :</label
                  >
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.departments.name }}
                  </p>
                </div>
                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputConfirmPassword1">Service :</label>
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.services.name }}
                  </p>
                </div>

                <div class="form-group d-flex align-items-center">
                  <label for="exampleInputConfirmPassword1">Assurance :</label>
                  <p class="modal-title ml-2" style="font-weight: bold">
                    {{ employer.assurances.name }}
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { employerService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";
import "@/assets/vendors/mdi/css/materialdesignicons.min.css";

export default {
  name: "create-employer",
  props: ["uuid"],
  data() {
    return {
      selected: "",

      employer: {
        last_name: "",
        first_name: "",
        address: "",
        phone_number: "",
        email: "",
        employment_status: "",
        social_security_number: "",
        date_birth: "",
        termination_date: "",
        hire_date: "",
      },
    };
  },
  mounted() {
    employerService.getEmployer(this.uuid).then((res) => {
      this.employer = res.data.data;
      this.employer.uuid = this.uuid;
      console.log(this.employer);
    });
  },
  methods: {
    detail(employer) {
      this.uuid = employer.uuid;
      this.last_name = employer.last_name;
      this.first_name = employer.first_name;
      this.address = employer.address;
      this.phone_number = employer.phone_number;
      this.email = employer.email;
      this.hire_date = employer.hire_date;
      this.termination_date = employer.termination_date;
      this.date_birth = employer.date_birth;
      this.employment_status = employer.employment_status;
      this.social_security_number = employer.social_security_number;
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

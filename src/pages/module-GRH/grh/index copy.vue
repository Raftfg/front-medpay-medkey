<template>
  <section class="tables">
    <!-- <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold"
              >Tableau de board</a
            >
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            GRH
          </li>
          <li
            class="breadcrumb-item active text-success font-weight-bold"
            aria-current="page"
          >
            Liste du personnel
          </li>
        </ol>
      </nav>
    </div> -->

    <div class="row">
      <div class="col-lg-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <!-- <h4 class="card-title">Liste des employers</h4> -->
            <h3
              class="card-title text-white rounded p-3 mb-4 text-center"
              style="
                background-color: #0B5D3F;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              "
            >
            Liste du personnel
            </h3>
            <div class="mx-auto mt-5 mb-4">
              <router-link to="/grh/create">
                <button type="submit" class="btn btn-success btn-medpay-green mr-2">
                  Ajouter
                </button>
              </router-link>
            </div>
            <div class="table-responsive">
              <table id="order-listing" ref="myTable" class="table table-bordered">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Nom</th>
                    <th>Prénom(s)</th>
                    <th>Téléphone</th>
                    <th>Adresse</th>
                    <th>email</th>
                    <th>sexe</th>
                    <!-- <th>N° Sécurité social</th> -->
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(employer, index) in employers" :key="employer.uuid">
                    <td>{{ index + 1 }}</td>
                    <td style="text-transform: uppercase">{{ employer.last_name }}</td>
                    <td style="text-transform: capitalize">
                      {{ employer.first_name }}
                    </td>
                    <td>{{ employer.phone_number }}</td>
                    <td>{{ employer.address }}</td>
                    <td>{{ employer.email }}</td>
                    <td>{{ employer.sex }}</td>
                    <!-- <td>{{ employer.social_security_number }}</td> -->
                    <!-- <td class="text-right" width="50px"></td> -->
                    <td class="text-center">
                      <!-- <b-button
                        @click="detail(employer)"
                        size="sm"
                        v-b-tooltip.hover
                        title="Détail"
                        variant="success"
                      >
                        <i
                          class="mdi mdi-eye text-white menu-icon"
                        ></i>
                      </b-button>

                      <b-button
                        @click="update(employer.uuid)"
                        size="sm"
                        v-b-tooltip.hover
                        title="Modifier"
                        variant="warning"
                      >
                        <i
                          class="fa fa-pencil-square-o  text-dark" aria-hidden="true"
                        ></i>
                      </b-button>

                      <b-button
                        @click="supprimer(index)"
                        size="sm"
                        v-b-tooltip.hover
                        title="Supprimer"
                        variant="danger"
                      >
                        <i
                          class="mdi mdi mdi-delete text-white menu-icon"
                        ></i>
                      </b-button> -->
                      <div class="btn-group btn-group-sm" role="group">
                        <button
                          id="btnGroupDrop1"
                          type=""
                          style="padding: 0px 10px"
                          class="btn btn-light dropdown-toggle"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          &nbsp;
                          <i class="fa fa-tasks" aria-hidden="true"></i> &nbsp;
                        </button>
                        <div
                          class="dropdown-menu action-button-div"
                          aria-labelledby="btnGroupDrop1"
                          style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%)"
                        >
                          
                          <a
                          @click="details(employer.uuid)"
                            class="dropdown-item"
                            href="#"
                          >
                            <i class="mdi mdi-eye menu-icon"></i> Détail
                            </a
                          >
                          <hr class="m-1" />
                          <a
                            @click="update(employer.uuid)"
                            class="dropdown-item text-warning"
                            href="#"
                          >
                            <i
                              class="fa fa-pencil-square-o"
                              aria-hidden="true"
                            ></i>
                            Modififier
                          </a>
                          <a
                            @click="supprimer(index)"
                            class="dropdown-item text-danger"
                            href="#"
                          >
                            <i class="mdi mdi mdi-delete menu-icon"></i>
                            Supprimer</a
                          >
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="showDetail"
      tabindex="-1"
      role="dialog"
      aria-labelledby="showDetailLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="alert alert-success" role="alert">
            <p class="text-center">
              Informations concernant l'employer {{ this.last_name }}
            </p>
          </div>
          <div class="modal-body">
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Nom :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.last_name }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Prénom :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.first_name }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Address :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.address }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Télephone :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.phone_number }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Email :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.email }}</p>
                </div>
              </div>
            </div>
          
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Date d'embauche :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.hire_date }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Date fin de contrat :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.termination_date }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Statut :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.employment_status }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Date de naissance :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.date_birth }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">N° Sécurité Social :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.termination_date }}</p>
                </div>
              </div>
            </div>
  
          </div>

          <div class="modal-footer">
            <div class="mx-auto">
              <button
                type="button"
                class="btn btn-secondary btn-medpay-gray btn-connexion-green text-white"
                data-dismiss="modal"
                style="
                  background-color: #0b5d3f;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                "
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="confirmDeleteModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="confirmDeleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmDeleteModalLabel">
              Confirmation de la suppression
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Êtes-vous sûr de vouloir supprimer cet élément "{{ deleteName }}" ?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary btn-rounded mr-auto"
              data-dismiss="modal"
            >
              Annuler
            </button>
            <button type="button"  class="btn btn-secondary btn-medpay-gray btn btn-danger" @click="confirmDelete">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from "jquery";

import * as JSZip from "../../../../node_modules/jszip";
window.JSZip = JSZip;
import pdfMake from "../../../../node_modules/pdfmake/build/pdfmake";
import vfsFonts from "../../../../node_modules/pdfmake/build/vfs_fonts";
pdfMake.vfs = vfsFonts.pdfMake.vfs;
import "../../../../node_modules/datatables.net-dt";
import "../../../../node_modules/datatables.net-bs4/js/dataTables.bootstrap4";
import "../../../../node_modules/datatables.net-buttons/js/dataTables.buttons";
import "../../../../node_modules/datatables.net-buttons-bs4/js/buttons.bootstrap4";
import FrenchTranslation from "@/assets/datatable/French.json";
import "../../../../node_modules/datatables.net-buttons/js/buttons.html5.js";
import "../../../../node_modules/datatables.net-buttons/js/buttons.print.js";
import "../../../../node_modules/datatables.net-buttons/js/buttons.colVis.js";
import "../../../../node_modules/bootstrap/dist/js/bootstrap.js"; // tres important pour le modal
import "../../../../node_modules/bootstrap/dist/js/bootstrap.min.js"; // tres important pour le modal

require("datatables.net-dt");

import { employerService } from "@/_services";

export default {
  name: "employers",
  data() {
    return {
      employers: [],
      deleteIndex: null,
      deleteName: "",
      table: null,
      last_name: "",
      first_name: "",
      termination_date : "",
      address: "",
      date_birth: "",
      employment_status: "",
      social_security_number: "",
      hire_date: "",
      phone_number: "",
      email: "",
      uuid: "",
      // last_name, first_name, age, adresse, telephone, email, whatsapp, profession, sexe, urgencecontact, autre,
    };
  },
  mounted() {
    employerService.getEmployer(this.uuid).then((res) => {
      this.employer = res.data.data;
      this.employer.uuid = this.uuid;
    });

    employerService.getAllEmployers().then((res) => {
      this.employers = res.data.data;
      this.$nextTick(() => {
        const table = $(this.$refs.myTable).DataTable({
          // dom: '<"html5buttons"B>lTfgtip',
          dom:
            '<"row mb-3"<"col-md-12"B>>' +
            '<"row mb-0"<"col-md-6"l><"col-md-6"f>>' +
            '<"row"<"col-md-12"tr>>' +
            '<"row"<"col-md-6"i><"col-md-6"p>>',

          // dom: 'Bfrtip',
          pageLength: 10, // Définir le last_namebre de résultats par page
          language: FrenchTranslation,
        

          buttons: [
            // {
            //   extend: "csvHtml5", charset: 'utf-8', bom: true, className: 'btn btn-gray btn-sm',// Extend the excel button
            // },
            // {
            //   extend: "excelHtml5", charset: 'utf-8', bom: true, className: 'btn btn-gray btn-sm',
            // },

            {
              extend: "pdfHtml5", charset: 'utf-8', bom: true, className: 'btn btn-gray btn-sm',
              // className: 'btn btn-primary',
            },

            { extend: "print", charset: 'utf-8', bom: true, className: 'btn btn-gray btn-sm', },
            // { extend: "copy", charset: 'utf-8', bom: true, className: 'btn btn-gray btn-sm', },
          ],
        });
      });
      table.buttons().container().prependTo("#myTable_wrapper .col-md-6:eq(0)");
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
      $("#showDetail").modal("show");
    },
    update(uuid) {
      this.$router.push("/grh/update/" + uuid);
    },
    details(uuid) {
      this.$router.push("/grh/detail/" + uuid);
    },
    // supprimer(index) {
    //   console.log(index);
    //   employerService
    //     .deleteemployer(this.employers[index].uuid)
    //     .then((res) => {
    //       this.employers.splice(index, 1);
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    supprimer(index) {
      this.deleteIndex = index;
      this.deleteName =
        this.employers[index].last_name + " " + this.employers[index].first_name;
      $("#confirmDeleteModal").modal("show");
    },

    // confirmDelete() {
    //   const index = this.deleteIndex;
    //   const name = this.deleteName;

    //   if (index !== null) {
    //     employerService
    //       .deleteemployer(this.employers[index].uuid)
    //       .then((res) => {
    //         this.employers.splice(index, 1);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       })
    //       .finally(() => {
    //         this.deleteIndex = null;
    //         this.deleteName = "";
    //         $("#confirmDeleteModal").modal("huuide");
    //       });
    //   }

    // },
    confirmDelete() {
      const index = this.deleteIndex;
      const name = this.deleteName;
      if (index !== null) {
        employerService
          .deleteEmployer(this.employers[index].uuid)
          .then((res) => {
            this.employers.splice(index, 1);
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.deleteIndex = null;
            this.deleteName = "";
            $("#confirmDeleteModal").modal("hide");
          });
      }
    },
  },
};
</script>

<style scoped>
@import "../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
@import "../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";

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
.btn-red {
    color: red; /* Définit la couleur du texte en rouge */
    background-color: #fff; /* Définit la couleur de fond en blanc (si nécessaire) */
    /* Ajoutez d'autres styles CSS au besoin */
}
</style>

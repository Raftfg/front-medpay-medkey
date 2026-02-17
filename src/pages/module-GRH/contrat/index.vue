<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <h3
          class="card-title text-white rounded p-1 mb-1 text-center"
          style="background-color: #0B5D3F; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-transform: none;"
        >
          Liste des contrats
        </h3>
        <div class="card">
          <div class="card-body">
            <div class="input-group input-group-sm mb-3 w-100">
              <router-link to="/contrat/create">
                <button
                  type="button"
                  class="btn btn-success btn-sm btn-medpay-green"
                >
                  Nouveau contrat
                </button>
              </router-link>
              &nbsp;&nbsp;
              <input
                type="text"
                v-model="q"
                @input="onSearch"
                class="form-control rounded-pill py-3"
                placeholder="Rechercher un contrat ..."
              />
            </div>
            <div class="table-responsive" style="min-height: 200px">
              <table
                id="order-listing"
                ref="myTable"
                class="table table-bordered table-hover"
              >
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Type contrat</th>
                    <th>Date de debut </th>
                    <th>Date de fin</th>
                    
                    
                    <!-- <th>N° Sécurité social</th> -->
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(contrat, index) in contrats" :key="contrat.uuid">
                    <td>{{ index + 1 }}</td>
                    <td style="text-transform: uppercase">{{ contrat.employer.last_name}}</td>
                    <td style="text-transform: uppercase">{{ contrat.employer.first_name}}</td>
                    <td style="text-transform: capitalize">
                      {{ contrat.employment_type }}
                    </td>
                    <td>{{ contrat.employment_start_date }}</td>
                    <td>{{ contrat.employment_end_date }}</td>
                   

                    <!-- <td>{{ getEmployeeName(contrat.employee_id) }}</td> -->
                    <!-- <td>{{ contrat.social_security_number }}</td> -->
                    <td class="text-center">
                      <b-button
                        @click="detail(contrat)"
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
                        @click="update(contrat.uuid)"
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
                      </b-button>
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
              Informations concernant le de contrat {{this.employee }}
            </p>
          </div>
          <div class="modal-body">
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Nom :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.employee }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Prénom :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{this.employer }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Type de contrat :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.employment_type }}</p>
                </div>
              </div>
            </div>
           
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Date de debut :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.employment_start_date }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Date de fin :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.employment_end_date }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Salaire :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.salary }}</p>
                </div>
              </div>
            </div>
          
          </div>

          <div class="modal-footer">
            <div class="mx-auto">
              <button type="button"  class="btn btn-secondary btn-medpay-gray" data-dismiss="modal">
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
              class="btn btn-secondary btn-rounded"
              data-dismiss="modal"
            >
              Annuler
            </button>
            <button type="button"  class="btn btn-secondary btn-medpay-gray" @click="confirmDelete">
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
import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
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

import { contratService } from "@/_services";
import { employerService } from "@/_services"; 


export default {
  name: "contrats",
  data() {
    return {
      contrats: [],
      q: "",
      deleteIndex: null,
      deleteName: "",
      table: null,
      salary: "",
      employment_type: "",
      employment_end_date: "",
      employment_start_date: "",
      uuid: "",
    };
  },
  mounted() {
    
    contratService.getContrat(this.uuid).then((res) => {
      this.contrat = res.data.data;
      this.contrat.uuid = this.uuid;
    });
    

    contratService.getAllContrats().then((res) => {
      this.contrats = res.data.data;
      console.log(res);
      this.$nextTick(() => {
        if ($.fn.DataTable.isDataTable(this.$refs.myTable)) {
          $(this.$refs.myTable).DataTable().destroy();
        }
        this.table = $(this.$refs.myTable).DataTable({
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
            {
              extend: "csvHtml5", charset: 'utf-8', bom: true, className: 'btn btn-gray btn-sm',// Extend the excel button
            },
            {
              extend: "excelHtml5", charset: 'utf-8', bom: true, className: 'btn btn-gray btn-sm',
            },

            {
              extend: "pdfHtml5", charset: 'utf-8', bom: true, className: 'btn btn-gray btn-sm',
              // className: 'btn btn-primary',
            },

            { extend: "print", charset: 'utf-8', bom: true, className: 'btn btn-gray btn-sm', },
            { extend: "copy", charset: 'utf-8', bom: true, className: 'btn btn-gray btn-sm', },
          ],
        });
      });
      this.table && this.table.buttons().container().prependTo("#order-listing_wrapper .col-md-6:eq(0)");
    });
  },
  methods: {
    onSearch() {
      if (this.table) {
        this.table.search(this.q).draw();
      }
    },

    detail(contrat) {
      this.uuid = contrat.uuid;
      this.employment_type = contrat.employment_type;
      this.employment_end_date = contrat.employment_end_date;
      this.employment_start_date = contrat.employment_start_date;
      this.salary = contrat.salary;
      this.employee = contrat.employer.last_name;
      this.employer = contrat.employer.first_name;
      $("#showDetail").modal("show");
    },
    update(uuid) {
      this.$router.push("/grh/update/" + uuid);
    },
    // supprimer(index) {
    //   console.log(index);
    //   contratService
    //     .deletecontrat(this.contrats[index].uuid)
    //     .then((res) => {
    //       this.contrats.splice(index, 1);
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    supprimer(index) {
      this.deleteIndex = index;
      // this.deleteName =
      //   this.contrats[index].salary + " " + this.contrats[index].employment_type;
      $("#confirmDeleteModal").modal("show");
    },

    // confirmDelete() {
    //   const index = this.deleteIndex;
    //   const name = this.deleteName;

    //   if (index !== null) {
    //     contratService
    //       .deletecontrat(this.contrats[index].uuid)
    //       .then((res) => {
    //         this.contrats.splice(index, 1);
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
        contratService
          .deleteContrat(this.contrats[index].uuid)
          .then((res) => {
            this.contrats.splice(index, 1);
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
</style>

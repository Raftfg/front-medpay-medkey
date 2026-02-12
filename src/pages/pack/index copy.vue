<template>
  <section class="container-scroller">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold"
              >Paramétrage
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Assurance</li>
          <li
            class="breadcrumb-item active text-success font-weight-bold"
            aria-current="page"
          >
            Liste
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-lg-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <!-- <h4 class="card-title">Liste des assurances Compagnies</h4> -->
            <h3
              class="card-title text-white rounded p-3 mb-4 text-center"
              style="
                background-color: #0b5d3f;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              "
            >
              Liste des assurances Compagnies
            </h3>
            <div class="mx-auto mt-5 mb-4">
              <router-link to="/assurance/create">
                <button
                  type="submit"
                  class="btn btn-success btn-medpay-green mr-2"
                >
                  Ajouter
                </button>
              </router-link>
            </div>
            <div class="table-responsive mt-4">
              <table
                id="order-listing"
                ref="myTable"
                class="table table-bordered"
              >
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Nom</th>
                    <th>Numero Assurance</th>
                    <th>Pourcentage</th>
                    <th>Nom compagnie</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(assurance, index) in assurances"
                    :key="assurance.id"
                  >
                    <td>{{ index + 1 }}</td>
                    <td>{{ assurance.nom }}</td>
                    <td>{{ assurance.numero_assurance }}</td>
                    <td>{{ assurance.pourcentage }}</td>
                    <td>
                      {{ getNomCompagnie(assurance.compagnie_d_assurance_id) }}
                    </td>
                    <td class="text-center">
                      <b-button
                        @click="detail(assurance)"
                        size="sm"
                        v-b-tooltip.hover
                        title="Détail"
                        variant="success"
                      >
                        <i class="mdi mdi-eye text-white menu-icon"></i>
                      </b-button>
                      <b-button
                        @click="update(assurance.id)"
                        size="sm"
                        v-b-tooltip.hover
                        title="Modifier"
                        variant="warning"
                      >
                        <i
                          class="fa fa-pencil-square-o text-dark"
                          aria-hidden="true"
                        ></i>
                      </b-button>
                      <b-button
                        @click="supprimer(index)"
                        size="sm"
                        v-b-tooltip.hover
                        title="Supprimer"
                        variant="danger"
                      >
                        <i class="mdi mdi mdi-delete text-white menu-icon"></i>
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
              Informations concernant l'assurance {{ assurance.nom }}
            </p>
          </div>
          <div class="modal-body">
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Nom :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ assurance.nom }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Numero Assurance :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ assurance.numero_assurance }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Pourcentage :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ assurance.pourcentage }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Nom compagnie:</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">
                    {{ getNomCompagnie(assurance.compagnie_d_assurance_id) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <div class="mx-auto">
              <button
                type="button"
                class="btn btn-secondary btn-medpay-gray"
                data-dismiss="modal"
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
              class="btn btn-secondary btn-rounded"
              data-dismiss="modal"
            >
              Annuler
            </button>
            <button
              type="button"
              class="btn btn-secondary btn-medpay-gray"
              @click="confirmDelete"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// import "@/assets/vendors/mdi/css/materialdesignicons.min.css";

import $ from "jquery";

import * as JSZip from "../../../node_modules/jszip";
window.JSZip = JSZip;
import pdfMake from "../../../node_modules/pdfmake/build/pdfmake";
import vfsFonts from "../../../node_modules/pdfmake/build/vfs_fonts";
pdfMake.vfs = vfsFonts.pdfMake.vfs;
import "../../../node_modules/datatables.net-dt";
import "../../../node_modules/datatables.net-bs4/js/dataTables.bootstrap4";
import "../../../node_modules/datatables.net-buttons/js/dataTables.buttons";
import "../../../node_modules/datatables.net-buttons-bs4/js/buttons.bootstrap4";
import FrenchTranslation from "@/assets/datatable/French.json";
import "../../../node_modules/datatables.net-buttons/js/buttons.html5.js";
import "../../../node_modules/datatables.net-buttons/js/buttons.print.js";
import "../../../node_modules/datatables.net-buttons/js/buttons.colVis.js";
import "../../../node_modules/bootstrap/dist/js/bootstrap.js"; // tres important pour le modal
import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js"; // tres important pour le modal
import { AssuranceService } from "@/_services/assurances_services.js";
import { compagnieService } from "@/_services/compagnie_services.js";

require("datatables.net-dt");

export default {
  name: "list-assurance",

  data() {
    return {
      assurances: [],
      table: null,
      compagnies: [],
      compagnie_d_assurance_id: "",
      nom: "",
      numero_assurance: "",
      pourcentage: "",
      id: "",
      assurance: [],
      deleteIndex: null,
      deleteName: "",
    };
  },

  mounted() {
    AssuranceService.getAssurance(this.id).then((res) => {
      this.assurance = res.data.data;
      this.assurance.id = this.id;
    });
    compagnieService
      .getAllCompagnies()
      .then((res) => {
        this.compagnies = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });

    AssuranceService.getAllAssurances().then((res) => {
      this.assurances = res.data.data;
      this.$nextTick(() => {
        const table = $(this.$refs.myTable).DataTable({
          // dom: '<"html5buttons"B>lTfgtip',
          dom:
            '<"row mb-3"<"col-md-12"B>>' +
            '<"row mb-0"<"col-md-6"l><"col-md-6"f>>' +
            '<"row"<"col-md-12"tr>>' +
            '<"row"<"col-md-6"i><"col-md-6"p>>',
          //  dom: 'Bfrtip',
          //  dom: 'lBfrtip',

          pageLength: 10, // Définir le nombre de résultats par page
          language: FrenchTranslation,
          buttons: [
            {
              extend: "csvHtml5",
              charset: "utf-8",
              bom: true,
              className: "btn btn-gray btn-sm", // Extend the excel button
            },
            {
              extend: "excelHtml5",
              charset: "utf-8",
              bom: true,
              className: "btn btn-gray btn-sm",
            },

            {
              extend: "pdfHtml5",
              charset: "utf-8",
              bom: true,
              className: "btn btn-gray btn-sm",
              // className: 'btn btn-primary',
            },

            {
              extend: "print",
              charset: "utf-8",
              bom: true,
              className: "btn btn-gray btn-sm",
            },
            {
              extend: "copy",
              charset: "utf-8",
              bom: true,
              className: "btn btn-gray btn-sm",
            },
          ],
        });

        table
          .buttons()
          .container()
          .prependTo("#myTable_wrapper .col-md-6:eq(0)");
      });
    });
  },
  methods: {
    getNomCompagnie(compagnieId) {
      const compagnie = this.compagnies.find(
        (compagnie) => compagnie.id === compagnieId
      );
      return compagnie ? compagnie.nom : "";
    },
    detail(assurance) {
      this.assurance = assurance;
      $("#showDetail").modal("show");
    },

    update(id) {
      this.$router.push("/assurance/update/" + id);
    },
    supprimer(index) {
      this.deleteIndex = index;
      this.deleteName = this.assurances[index].nom;
      $("#confirmDeleteModal").modal("show");
    },

    confirmDelete() {
      const index = this.deleteIndex;
      const name = this.deleteName;
      if (index !== null) {
        AssuranceService.deleteAssurance(this.assurances[index].id)
          .then((res) => {
            this.assurances.splice(index, 1);
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
@import "../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
/* @import '../../../node_modules/datatables.net-dt/css/jquery.dataTables.css'; */

@import "../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";
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

/* modal suppression  */
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

<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <div class="card">
          <div class="card-body">

            <h3 class="card-title text-white rounded p-3 mb-2 text-center" style="
                            background-color: #0b5d3f;
                            box-shadow: 0 4px 6px rgba(0,  0, 0, 0.1);
                          ">
              Liste des packs d'assurance
            </h3>
            <div class="mx-auto   " id="fixingIssue">
              <router-link to="/pack/create">
                <button type="submit" class="btn btn-success btn-medpay-green ">
                  Ajouter

                </button>
              </router-link>
            </div>
            <div class="table-responsive mt-2 ">
              <table id="order-listing" ref="myTable" class="table table-bordered">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Pack</th>
                    <th>Pourcentage</th>
                    <th>Assurance</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(pack, index) in packs" :key="pack.uuid">
                    <td>{{ index + 1 }}</td>
                    <td style="text-transform: uppercase">{{ pack.designation }} </td>
                    <td>{{ pack.percentage }} %</td>
                    <td style="text-transform: uppercase">{{ pack.insurances.name }}</td>
                    <td class="text-right" width="50px">
                      <div class="btn-group btn-group-sm" role="group">
                        <button id="btnGroupDrop1" type="" style="padding: 0px 10px" class="btn btn-light dropdown-toggle"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          &nbsp;
                          <i class="fa fa-tasks" aria-hidden="true"></i> &nbsp;
                        </button>
                        <div class="dropdown-menu action-button-div" aria-labelledby="btnGroupDrop1"
                          style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%)">
                          <a @click="update(pack.uuid)">
                            <button class="dropdown-item font-weight-bold" style="color: black;" data-toggle="modal"
                              data-target="#updateCategoryModal">
                              <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                              Modifier
                            </button></a>

                          <hr class="m-1" />
                          <button @click="supprimer(index)" class="dropdown-item text-danger font-weight-bold">
                            <i class="mdi mdi mdi-delete menu-icon"></i>
                            Supprimer
                          </button>
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
import { packService } from "@/_services";
import { insuranceService } from "@/_services";

require("datatables.net-dt");

export default {
  name: "list-assurance",

  data() {
    return {

      table: null,
      packs: [], // Ajout d'une ligne par défaut
      insurance: [],
      errors: null,
      pack: "",
      insurances_id: "",
      name: "",
      packs: [], // Ajout d'une ligne par défaut
      insurances: [],
      errors: null,
      insurances_id: "",
    };
  },

  mounted() {
    packService.getPack(this.uuid).then((res) => {
      this.pack = res.data.data;
      this.pack.uuid = this.uuid;
    });


    packService.getAllPacks().then((res) => {
      this.packs = res.data.data;
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
            // {
            //   extend: "csvHtml5",
            //   charset: "utf-8",
            //   bom: true,
            //   className: "btn btn-gray btn-sm", // Extend the excel button
            // },
            // {
            //   extend: "excelHtml5",
            //   charset: "utf-8",
            //   bom: true,
            //   className: "btn btn-gray btn-sm",
            // },

            // {
            //   extend: "pdfHtml5",
            //   charset: "utf-8",
            //   bom: true,
            //   className: "btn btn-gray btn-sm",
            //   // className: 'btn btn-primary',
            // },

            // {
            //   extend: "print",
            //   charset: "utf-8",
            //   bom: true,
            //   className: "btn btn-gray btn-sm",
            // },
            // {
            //   extend: "copy",
            //   charset: "utf-8",
            //   bom: true,
            //   className: "btn btn-gray btn-sm",
            // },
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
    update(uuid) {
        this.$router.push("/pack/update/" + uuid);
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

.card .card-title {
  text-transform: none;
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

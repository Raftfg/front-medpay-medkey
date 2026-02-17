<template>
  <section class="tables">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <h3 class="bg-success card-title text-white rounded p-2 mb-2 text-center" style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); ">Liste des médicaments</h3>
        <div class="card">
          <div class="card-body">
            <div class="d-flex flew-row justify-content-between" id="fixingIssue" style="margin-bottom: 5px;">
              <router-link to="/medicaments/create" class="">
                <button
                  type="submit"
                  class="btn btn-success btn-medpay-green mr-2">
                  Ajouter
                </button>
              </router-link>
            </div>
            <div class="table-responsive">
              <table
                id="order-listing"
                ref="myTable"
                class="table table-hover table-bordered"
              >
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Code</th>
                    <th>Désignation</th>
                    <th>Catégorie</th>
                    <th>Marque</th>
                    <th>U. V.</th>
                    <th>U. C.</th>

                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(drug, index) in drugs" :key="drug.uuid">
                    <td>{{ index + 1 }}</td>
                    <td>{{ drug.code }}</td>
                    <td>{{ drug.name }}</td>
                    <td>{{ drug.category.name }}</td>
                    <td>{{ drug.brand }}</td>
                    <td>{{ drug.sale_unit.name }}</td>
                    <td>{{ drug.conditioning_unit.name }}</td>
                    <td class="text-right" width="50px">
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
                          <button
                            @click="detailsProduct(drug.uuid)" class="dropdown-item font-weight-bold"
                            style="color: black;">
                            <i class="mdi mdi-eye menu-icon"></i> 
                            Détails Médicament
                          </button>
                          <hr class="m-1" />
                          <!-- <button
                            @click="showEntries(drug.uuid)"
                            class="dropdown-item font-weight-bold"
                            style="color: black;">
                            <i
                              class="fa fa-arrow-right"
                              aria-hidden="true"
                            ></i>
                            Entrées
                          </button>
                          <hr class="m-1" /> -->
                          <!-- <button
                            class="dropdown-item font-weight-bold"
                            style="color: black;"
                            href="#"
                          >
                            <i
                              class="fa fa-arrow-left"
                              aria-hidden="true"
                            ></i>
                            Sorties
                          </button> -->
                          <!-- <hr class="m-1" />
                          <button
                          class="dropdown-item font-weight-bold"
                          style="color: black;"
                          href="#"
                        >
                          <i
                            class="fa fa-arrows-left-right-to-line"
                            aria-hidden="true"
                          ></i>
                          Transferts
                        </button>
                        <hr class="m-1" /> -->
                        <button
                          @click="update(drug.uuid)"
                          class="dropdown-item font-weight-bold"
                          style="color: black;"
                          href="#"
                        >
                          <i
                            class="fa fa-pencil-square-o"
                            aria-hidden="true"
                          ></i>
                          Modifier
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

import { productSpecificationService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "list-drugs",

  data() {
    return {
      drugs: [],
      table: null,
      uuid: "",
    };
  },
  mounted() {
    //get all drugs
    productSpecificationService
    .getAllDrugs()
    .then((res) => {
      this.drugs = res.data.data;
      this.$nextTick(() => {
        const table = $(this.$refs.myTable).DataTable({
          "initComplete": function (settings, json) {
            //When the data is fully loaded reduce the margin bottom
            $('#fixingIssue').css('margin-bottom', '-10px');
          },
          dom:
            '<"row mb-3"<"col-md-12"B>>' +
            '<"row mb-0"<"col-md-6"l><"col-md-6"f>>' +
            '<"row"<"col-md-12"tr>>' +
            '<"row"<"col-md-6"i><"col-md-6"p>>',
          pageLength: 10, // Définir le nombre de résultats par page
          language: FrenchTranslation,
          buttons: [
          ],
        });
      });
    }) .catch((err) => {
      console.log(err);
    });
  },
  methods: {
    detailsProduct(uuid)
    {
      this.$router.push("/medicaments/" + uuid + "/details");
    },
    update(uuid) {
        this.$router.push("/medicaments/update/" + uuid);
    },
    showEntries(uuid) {
        this.$router.push("/medicament/" + uuid + "/approvisionnements");
    },
  },
};
</script>

<style scoped>
@import "../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
@import "../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";
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

fieldset.scheduler-border {
  border: 1px groove #ddd !important;
  padding: 0 1.4em 1.4em 1.4em !important;
  margin: 0 0 1.5em 0 !important;
  -webkit-box-shadow: 0px 0px 0px 0px #000;
  box-shadow: 0px 0px 0px 0px #000;
}
</style>

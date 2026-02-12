<template>
  <section class="tables">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <h3 class="bg-success card-title text-white rounded p-2 mb-2 text-center" style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); ">Liste des consommables en rupture de stock</h3>
        <div class="card">
          <div class="card-body">
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
                    <th>Magasin</th>
                    <th>Stock</th>
                    <th>Désignation</th>
                    <th>Catégorie</th>
                    <th>Marque</th>
                    <th>U. V.</th>
                    <th>U. C.</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(consumable, index) in out_of_stock_consumables" :key="consumable.uuid">
                    <td>{{ index + 1 }}</td>
                    <td>{{ consumable.product.code }}</td>
                    <td>{{ consumable.stock.store.name }}</td>
                    <td>{{ consumable.stock.name }}</td>
                    <td>{{ consumable.product.name }}</td>
                    <td>{{ consumable.product.category.name }}</td>
                    <td>{{ consumable.product.brand }}</td>
                    <td>{{ consumable.product.sale_unit.name }}</td>
                    <td>{{ consumable.product.conditioning_unit.name }}</td>
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
import * as JSZip from "jszip";
window.JSZip = JSZip;
import pdfMake from "../../../../../node_modules/pdfmake/build/pdfmake";
import vfsFonts from "../../../../../node_modules/pdfmake/build/vfs_fonts";
pdfMake.vfs = vfsFonts.pdfMake.vfs;
import "datatables.net-dt";
import "../../../../../node_modules/datatables.net-bs4/js/dataTables.bootstrap4";
import "../../../../../node_modules/datatables.net-buttons/js/dataTables.buttons";
import "../../../../../node_modules/datatables.net-buttons-bs4/js/buttons.bootstrap4";
import FrenchTranslation from "@/assets/datatable/French.json";
import "../../../../../node_modules/datatables.net-buttons/js/buttons.html5.js";
import "../../../../../node_modules/datatables.net-buttons/js/buttons.print.js";
import "../../../../../node_modules/datatables.net-buttons/js/buttons.colVis.js";
import "../../../../../node_modules/bootstrap/dist/js/bootstrap.js"; // tres important pour le modal
import "../../../../../node_modules/bootstrap/dist/js/bootstrap.min.js"; // tres important pour le modal

require("datatables.net-dt");

import { useToast, POSITION } from "vue-toastification";
import { rapport_statistiqueService } from "@/_services";

export default {
  name: "list-out_of_stock_consumables",

  data() {
    return {
      out_of_stock_consumables: [],
      table: null,
      uuid: "",
    };
  },
  mounted() {
    //get all out of stock consumables
    rapport_statistiqueService
    .getCountConsumablesOutOfStock()
    .then((res) => {
      this.out_of_stock_consumables = res.data.out_of_stock_consumables;
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
    }).catch((err) => {
      console.log(err);
    });
  },
  methods: {
  },
};
</script>

<style scoped>
@import "../../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
@import "../../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";
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

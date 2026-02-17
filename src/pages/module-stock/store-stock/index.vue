<template>
  <section class="tables">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <h3 class="bg-success card-title text-white rounded p-2 mb-2 text-center" style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); ">Liste des produits</h3>
        <div class="card">
          <div class="card-body">
            <div class="d-flex flew-row justify-content-between" id="fixingIssue">    
              <div class="row">
                <div class="form-group form-controls col-6">
                  <select 
                    v-model="filter.store_id"
                    @change="getStocks(filter.store_id)"
                    class="form-control" id="store">
                    <option value="null" selected>Selectionner un magasin </option>
                    <option v-for="store in stores" :key="store.uuid" :value="store.uuid">
                      {{ store.name }}
                    </option>
                  </select>
                </div>

                <div class="form-group form-controls col-6">
                  <select 
                    v-model="filter.stock_id"
                    @change="setStock(filter.stock_id)"
                    class="form-control" id="stock">
                    <option value="null" selected>Selectionner un stock</option>
                    <option v-for="stock in stocks" :key="stock.uuid" :value="stock.uuid">
                      {{ stock.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <br />
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
                    <th>N. de lot</th>
                    <th>Désignation</th>
                    <th>Stock Disp.</th>
                    <th>Prix de vente</th>
                    <th>U.C.</th>
                    <th>Catégorie</th>

                    <!-- <th class="text-center">Actions</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(stockProduct, index) in stockProducts" :key="stockProduct.uuid">
                    <td>{{ index + 1 }}</td>
                    <td>{{ stockProduct.product.code }}</td>
                    <td>{{ stockProduct.lot_number }}</td>
                    <td>{{ stockProduct.product.name }}</td>
                    <td>{{ stockProduct.quantity }}</td>
                    <td>{{ stockProduct.selling_price }}</td>
                    <td>{{ stockProduct.product.conditioning_unit.name }}</td>
                    <td>{{ stockProduct.product.category.name }}</td>
                    <!-- <td class="text-right" width="50px">
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
                            @click="detailsProduct(stockProduct.product.uuid)" class="dropdown-item font-weight-bold"
                            style="color: black;">
                            <i class="mdi mdi-eye menu-icon"></i> 
                            Détails Produit
                          </button>
                          <hr class="m-1" />
                          <button
                            class="dropdown-item font-weight-bold"
                            style="color: black;">
                            <i
                              class="fa fa-arrow-right"
                              aria-hidden="true"
                            ></i>
                            Entrées
                          </button>
                          <hr class="m-1" />
                          <button
                            class="dropdown-item font-weight-bold"
                            style="color: black;"
                            href="#"
                          >
                            <i
                              class="fa fa-arrow-left"
                              aria-hidden="true"
                            ></i>
                            Sorties
                          </button>
                          <hr class="m-1" />
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
                          <button
                            @click="update(stockProduct.product.uuid)"
                            class="dropdown-item text-warning font-weight-bold"
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
                    </td> -->
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

import { stockService } from "@/_services";
import { storeService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "list-product",

  data() {
    return {
      stores: {},
      stocks: {},
      filter:{
        store_id: null,
        stock_id: null,
      },
      stockProducts: [],
      table: null,
      uuid: "",
    };
  },
  mounted() {
    //initialize the select2 feature on my select
    // $('#store').select2();
    // $('#stock').select2();

    $('#store').on('change', (e) => {
      this.getStocks(e.target.value);
    });

    //get all stores
    storeService
    .getAllStores()
    .then((res) => {
      this.stores = res.data.data;
      this.filter.store_id = this.stores[0].uuid;
      try {
        //get all stocks related to the first element in this.stores
        storeService
        .getStocks(res.data.data[0].uuid)
        .then((response) => {
          this.stocks = response.data.data;
          this.filter.stock_id = response.data.data[0].uuid;
          stockService
          .getAllProducts(this.filter.stock_id).then((res) => {
            this.stockProducts = res.data.data;
            this.$nextTick(() => {
              const table = $(this.$refs.myTable).DataTable({
                "initComplete": function (settings, json) {
                    //When the data is fully loaded reduce the margin bottom
                    $('#fixingIssue').css('margin-bottom', '-40px');
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
          });
        })
        .catch((error) => {
          console.log(error);
        });
      } 
      catch (error) {
        console.log(err);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  },
  methods: {
    //get the stocks related to a specific store
    getStocks(uuid)
    {
      storeService
      .getStocks(uuid)
      .then((response) => {
        this.stocks = response.data.data;
        this.filter.stock_id = null;
      })
      .catch((error) => {
        console.log(error);
      });
    },
    setStock(uuid)
    {
      stockService
      .getAllDrugs(this.filter.stock_id).then((res) => {
        this.stockProducts = res.data.data;

        const tableElement = $(this.$refs.myTable);
        if ($.fn.DataTable.isDataTable(tableElement)) {
          tableElement.DataTable().destroy();
        }

        this.$nextTick(() => {
          const table = $(this.$refs.myTable).DataTable({
            "initComplete": function (settings, json) {
                //When the data is fully loaded reduce the margin bottom
                $('#fixingIssue').css('margin-bottom', '-40px');
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
      })
      .catch((error) => {
        console.log(error);
      });
    },

    detailsProduct(uuid)
    {
      this.$router.push("/magasin-stocks/" + uuid + "/details");
    },
    update(uuid) {
        this.$router.push("/medicaments/update/" + uuid);
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

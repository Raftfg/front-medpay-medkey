<template>
  <section class="tables">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <h3
          class="bg-success card-title text-white rounded p-2 mb-2 text-center"
          style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); ">
          Liste des stocks
        </h3>
        <div class="card">
          <div class="card-body">
            <div class="mx-auto" id="fixingIssue" style="margin-bottom: 5px;">
              <button
                type="submit"
                class="btn btn-success btn-medpay-green mr-2"
                data-toggle="modal" data-target="#addStockModal">
                Ajouter
              </button>
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
                    <th>Nom</th>
                    <th>Magasin</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(stock, index) in stocks" :key="stock.uuid">
                    <td>{{ index + 1 }}</td>
                    <td>{{ stock.name }}</td>
                    <td>{{ stock.store.name }}</td>
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
                          <button @click="preparingForStockUpdate(stock.uuid)" 
                            class="dropdown-item font-weight-bold"
                            style="color: black;"
                            data-toggle="modal" data-target="#updateStockModal">
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                            Modifier
                          </button>
                          <hr class="m-1" />
                          <button @click="supprimer(index)" style="color: black;" class="dropdown-item font-weight-bold">
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

    <div class="modal fade" id="addStockModal" ref="addStockModal">
      <div class="modal-dialog">
        <h4 class="card-title text-white  p-3 mt-4 text-center  col-12"
          style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top : -17px !important">
          Ajouter un stock
        </h4>
        <div class="modal-content" style="margin-top : -17px !important; background-color: white;">
          <div class="modal-body">
            <form class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="name">Nom<span style="color: red">*</span></label>
                  <input
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.stock.name.haveError,
                    }"
                    id="name" 
                    type="text" 
                    minlength="5"
                    maxlength="125"
                    placeholder="Entrez le nom du stock"
                    v-model="stock.name" 
                    required/>

                  <div class="invalid-feedback" v-if="formErrors.stock.name.haveError">
                    {{ formErrors.stock.name.message }}
                  </div>
                </div>

                <div class="form-group controls">
                  <label for="store">Magasin correspondant<span style="color: red">*</span></label>

                  <select 
                    :class="{ 
                      'form-control': true,
                      'is-invalid': formErrors.stock.store_id.haveError,
                      'mb-3': true,
                    }" 
                    v-model="stock.store_id"
                    id="store" 
                    required>
                    <option value="null" selected>Selectionner un magasin correspondant</option>
                    <option v-for="store in stores" :key="store.uuid" :value="store.uuid">
                      {{ store.name }}
                    </option>
                  </select>

                  <div class="invalid-feedback" v-if="formErrors.stock.store_id.haveError">
                    {{ formErrors.stock.store_id.message }}
                  </div>
                </div>

              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="d-flex justify-content-between col-12 flex-row">
              <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal"
              @click="clearData">
                Annuler
              </button>

              <button type="submit"
                class="btn btn-success btn-medpay-green"
                @click="createStock">
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="updateStockModal">
      <div class="modal-dialog">
        <h4 class="card-title text-white  p-3 mt-4 text-center  col-12"
          style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top : -17px !important">
          Mettre à jour un stock
        </h4>
        <div class="modal-content" style="margin-top : -17px !important; background-color: white;">
          <div class="modal-body">
            <form class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="name">Nom<span style="color: red">*</span></label>
                  <input
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.stock.name.haveError,
                    }"
                    id="name" 
                    type="text" 
                    minlength="5"
                    maxlength="125"
                    placeholder="Entrez le nom du stock"
                    v-model="stock.name" 
                    required/>

                  <div class="invalid-feedback" v-if="formErrors.stock.name.haveError">
                    {{ formErrors.stock.name.message }}
                  </div>
                </div>

                <div class="form-group controls">
                  <label for="store">Magasin correspondant<span style="color: red">*</span></label>

                  <select 
                    :class="{ 
                      'form-control': true,
                      'is-invalid': formErrors.stock.store_id.haveError,
                      'mb-3': true,
                    }" 
                    v-model="stock.store_id"
                    id="store" 
                    required>
                    <option value="null" selected>Selectionner un magasin correspondant</option>
                    <option v-for="store in stores" :key="store.uuid" :value="store.uuid">
                      {{ store.name }}
                    </option>
                  </select>

                  <div class="invalid-feedback" v-if="formErrors.stock.store_id.haveError">
                    {{ formErrors.stock.store_id.message }}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="d-flex justify-content-between col-12 flex-row">
              <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal"
              @click="clearStockData">
                Annuler
              </button>

              <button type="submit"
                class="btn btn-success btn-medpay-green"
                @click="updateStock">
                Enregistrer
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
            Êtes-vous sûr de vouloir supprimer le stock: {{ deleteName }} ?
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
              class="btn btn-danger btn-medpay-gray"
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
import $ from "jquery";
import * as JSZip from "../../../../../node_modules/jszip";
window.JSZip = JSZip;
import pdfMake from "../../../../../node_modules/pdfmake/build/pdfmake";
import vfsFonts from "../../../../../node_modules/pdfmake/build/vfs_fonts";
pdfMake.vfs = vfsFonts.pdfMake.vfs;
import "../../../../../node_modules/datatables.net-dt";
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

import { stockService } from "@/_services";
import { storeService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "list-stock",

  data() {
    return {
      stores: {},
      stocks: {},
      stock: {
        name: "",
        store_id : null,
        store: {},
      },
      deleteIndex: null,
      deleteName: "",
      table: null,
      formErrors: { 
        stock: {
          name: {
            haveError: false,
            message: "",
          },
          store_id: {
            haveError: false,
            message: "",
          },
        },
      },
    };
  },
  mounted() {
    storeService
    .getAllStores()
    .then((res) => {
      this.stores = res.data.data
    })
    .catch((err) => {
      console.log(err);
    });
    
    stockService.getAllStocks().then((res) => {
      this.stocks = res.data.data;
      this.$nextTick(() => {
        const table = $(this.$refs.myTable).DataTable({
          "initComplete": function (settings, json) {
            //When the data is fully loaded reduce the margin bottom
            $('#fixingIssue').css('margin-bottom', '-10px');
          },
          // dom: '<"html5buttons"B>lTfgtip',
          dom:
            '<"row mb-3"<"col-md-12"B>>' +
            '<"row mb-0"<"col-md-6"l><"col-md-6"f>>' +
            '<"row"<"col-md-12"tr>>' +
            '<"row"<"col-md-6"i><"col-md-6"p>>',

          // dom: 'Bfrtip',
          pageLength: 10, // Définir le nombre de résultats par page
          language: FrenchTranslation,
          buttons: [
          ],
        });
      });
    });
  },
  methods: {
    refreshStocks(){
      stockService.getAllStocks().then((res) => {
        this.stocks = res.data.data;
      });
    },
    clearStockData(){
      this.stock = {
        name: "",
        stock_id: "",
        store: {},
      };
    },
    preparingForStockUpdate(uuid){
      stockService.getStock(uuid).then((res) => {
        this.stock = res.data.data;
        this.stock.uuid = uuid;
        this.stock.store_id = this.stock.store.uuid;
      });
    },
    clearStockError(){
      this.formErrors = { 
        stock: {
          name: {
            haveError: false,
            message: "",
          },
          store_id: {
            haveError: false,
            message: "",
          },
        },
      };
    },
    clearData(){
      this.clearStockData();
      this.clearStockError();
    },
    createStock()
    {
      this.clearStockError();

      stockService
      .addStock(this.stock)
      .then((response) => {
        //Reset form field and errors and refresh stocks tab
        this.clearData();
        this.refreshStocks();

        // Close the "Add Stock" modal
        $('#addStockModal').modal('hide');

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
      })
      .catch((error) => {
        // Traitement en cas d'erreur
        try {
          this.formErrors.stock.name.message = error.response.data.errors.name[0];
          this.formErrors.stock.name.haveError = true;
        } 
        catch (error) {
        }

        try {
          this.formErrors.stock.store_id.message = error.response.data.errors.location[0];
          this.formErrors.stock.store_id.haveError = true;
        } 
        catch (error) {
        }
      });
    },
    updateStock() {
      this.clearStockError();

      stockService
      .updateStock(this.stock)
      .then((response) => {
        //Reset form field and errors and refresh stocks tab
        this.clearData();
        this.refreshStocks();

        // Close the "Update Stock" modal
        $('#updateStockModal').modal('hide');

        this.$toast.success("Modification effectuée avec succès !", {
          position: POSITION.TOP_RIGHT,
          timeout: 3000,
          bodyStyle: {
            borderRadius: "10px",
            backgroundColor: "#f0f0f0",
            color: "#333",
            fontWeight: "bold",
          },
        });
      })
      .catch((error) => {
        // Traitement en cas d'erreur
        try {
          this.formErrors.stock.name.message = error.response.data.errors.name[0];
          this.formErrors.stock.name.haveError = true;
        } 
        catch (error) {
        }

        try {
          this.formErrors.stock.location.message = error.response.data.errors.location[0];
          this.formErrors.stock.location.haveError = true;
        } 
        catch (error) {
        }
      });
    },
    supprimer(index) {
      this.deleteIndex = index;
      this.deleteName = this.stocks[index].name;
      $("#confirmDeleteModal").modal("show");
    },

    confirmDelete() {
      const index = this.deleteIndex;
      const name = this.deleteName;
      if (index !== null) {
        stockService
        .deleteStock(this.stocks[index].uuid)
        .then((res) => {
          this.stocks.splice(index, 1);
          this.$toast.success(res.data.data.message, {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "red",
              fontWeight: "bold",
            },
          });
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error(err.response.data.data.message, {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#ff0000",
              color: "fff",
              fontWeight: "bold",
            },
          });
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

#order-listing  th:nth-child(4),
#order-listing  td:nth-child(5) {
    width: 50px !important; 
}
#order-listing  th:nth-child(2),
#order-listing  td:nth-child(2) {
    width: 70px !important; 
}
#order-listing  th:nth-child(1),
#order-listing  td:nth-child(1) {
    width: 35px !important; 
}
</style>

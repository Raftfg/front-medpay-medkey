<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <h3 class="bg-success card-title text-white rounded p-2 mb-2 text-center" style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); ">Liste des ventes</h3>
        <div class="card">
          <div class="card-body">
            <div class="d-flex flew-row justify-content-between" id="fixingIssue">
              <router-link to="/sale/create" class="">
                <button
                  type="submit"
                  class="btn btn-success btn-medpay-green mr-2">
                  Ajouter
                </button>
              </router-link>
              
              <div class="row">
                <div class="form-group form-controls col-12">
                  <select 
                    v-model="filter.store_id"
                    @change="getSales(filter.store_id)"
                    class="form-control" id="store">
                    <option value="null" selected>Selectionner un stock </option>
                    <option v-for="store in stores" :key="store.uuid" :value="store.uuid">
                      {{ store.name }}
                    </option>
                  </select>
                </div>
              </div>
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
                    <th>Date</th>
                    <th>Stock</th>
                    <th>Numéro de venue</th>
                    <th>Total</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(supply, index) in supplies" :key="supply.uuid">
                    <td>{{ index + 1 }}</td>
                    <td>{{ supply.created_at }}</td>
                    <td>{{ supply.stock.name }}</td>
                    <td>{{ supply.lot_number }}</td>
                    <td>{{ supply.total }}</td>
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
                          <button class="dropdown-item text-success font-weight-bold" @click="details(supply.uuid)">
                            <i class="fa fa-boxes-stacked"></i> Produits
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

import { storeService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "list-supply",

  data() {
    return {
      filter: {
        store_id: null,
      },
      supplies: [],
      stores: "",
      deleteIndex: null,
      deleteName: "",
      table: null,
      nom: "",
      uuid: "",
    };
  },
  mounted() {
    // $('#store').select2();

    storeService.getAllStores()
    .then((res) => {
      this.stores = res.data.data;
      this.filter.store_id = res.data.data[0].uuid;

      //get all supplies related to the first store
      storeService.
      getSales(this.filter.store_id)
      .then((res) => {
        this.supplies = res.data.data;
        this.$nextTick(() => {
          const table = $(this.$refs.myTable).DataTable({
            // dom: '<"html5buttons"B>lTfgtip',
            "initComplete": function (settings, json) {
                //When the data is fully loaded reduce the margin bottom
                $('#fixingIssue').css('margin-bottom', '-50px');
              },
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
      }).catch((error) => {
        console.log(error);
      });
    });
  },
  methods: {
    getSales(uuid)
    {
      storeService.getSales(uuid).then((res) => {
        this.supplies = res.data.data;
        console.log(res.data.data);
      }).catch((error) => {
        console.log(error);
      });
    },
    details(uuid) {
      this.$router.push("/supply/" + uuid + "/products");
    },
    supprimer(index) {
      this.deleteIndex = index;
      this.deleteName = this.supplies[index].name;
      $("#confirmDeleteModal").modal("show");
    },

    confirmDelete() {
      const index = this.deleteIndex; 
      const name = this.deleteName;
      if (index !== null) {
        supplyService
        .deleteSupply(this.supplies[index].uuid)
        .then((res) => {
          this.supplies.splice(index, 1);
          this.$toast.success("Magasin supprimé avec succès !", {
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

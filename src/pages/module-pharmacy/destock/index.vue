<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 col-md-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <h4 class=" text-white rounded p-3 text-center font-weight-bold"
              style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)">
              Liste des produits déstockés
            </h4>
            <div class="table-responsive py-1">
              <table id="order-listing" ref="myTableFactures" class="table table-bordered">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Date</th>
                    <th>Référence</th>
                    <th>Qté en stock</th>
                    <th style="text-align:center">Qté commandée</th>
                    <th  style="text-align:center">Qté destockée</th>
                    <th  style="text-align:center">Qté restante</th>
                    <th>N° lot</th>
                    <!-- <th>Patient</th> -->
                    <!-- <th class="text-center">Actions</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(destock, index) in destockages" :key="destock.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ formaterDate(destock.created_at) }}</td>
                    <td>{{ destock.reference_facture }}</td>
                    <td  style="text-align:center">{{ formatNumber(destock.stock_product.quantity) }}</td>
                    <td  style="text-align:center">{{ formatNumber(destock.quantity_ordered) }}</td>
                    <td  style="text-align:center">{{ formatNumber(destock.quantity_retrieved) }}</td>
                    <td  style="text-align:center">{{ formatNumber(destock.quantity_remaining_to_retrieve)
                    }}</td>
                      <td>{{ destock.stock_product.lot_number }}</td> 
                    <!-- <td>{{ item.firstname }} {{ item.lastname }}</td> -->
                    <!-- <td class="" width="50px">
                      <div class="btn-group btn-group-sm" role="group">
                        <button id="btnGroupDrop1" type="" style="padding: 0px 10px" class="btn btn-light dropdown-toggle"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          &nbsp;
                          <i class="fa fa-tasks" aria-hidden="true"></i> &nbsp;
                        </button>
                        <div class="dropdown-menu action-button-div" aria-labelledby="btnGroupDrop1"
                          style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%)">
                          <a :href="destock.pdfPath" target="_blank" class="dropdown-item text-info font-weight-bold">
                            <i class="mdi mdi-eye"></i> Visualiser Facture
                          </a>
                        </div>
                      </div>
                    </td> -->
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="indexSpinner" class="spinner-border spinner-border-sm text-secocndary" style="font-size: 11px"
              role="status">
              <span class="sr-only">Loading...</span>
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
import { factureService } from "@/_services/facture_services.js";
import { destockageService } from "@/_services";
require("datatables.net-dt");
export default {
  name: "list-facture",
  data() {
    return {
      destockages: [],
      destock: {},
      table: null,
      indexSpinner: false,
      id: "",
      date: "",
      today: null,
    };
  },

  mounted() {

    this.indexSpinner = true;
    destockageService.getDestock().then((res) => {
      this.indexSpinner = false;
      this.destockages = res.data.data;
      console.log(this.destockages);
      this.$nextTick(() => {
        const table = $(this.$refs.myTableFactures).DataTable({
          dom:
            '<"row d-flex justify-content-between"<"text-left"B><"text-right"f>>' +
            '<"row"<"col-md-12"tr>>' +
            '<"row d-flex"<"col-md-6"i><"col-md-6"p>>',
          pageLength: 10, // Définir le nombre de résultats par page
          language: FrenchTranslation, // Configuration de la langue
          buttons: [
            {
              extend: "pdfHtml5",
              charset: "utf-8",
              bom: true,
              className: "btn btn-gray btn-sm",
            },
            {
              extend: "excelHtml5",
              charset: "utf-8",
              bom: true,
              className: "btn btn-gray btn-sm",
            },
          ],
        });
      });
      // Stockez la nouvelle instance de la table dans la variable "this.table" pour une utilisation ultérieure
      this.tableFactures = table;
      if (table) {
        $(table).DataTable().clear().destroy(); // Détruire DataTables s'il est déjà initialisé
        $(table).DataTable(); // Réinitialiser DataTables
      }
    });
  },
  methods: {
    formatDate(date) {
      const options = {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      };
      const dateObj = new Date(date);
      const formattedDate = dateObj.toLocaleString("fr-FR", options);
      return formattedDate.replace(/\s(\d+):(\d+)$/, "  $1h $2");
    },

    
    formatNumber(value) {
      if (typeof value !== "number") {
        return value;
      }
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },

    
    formaterDate(date) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      const formattedDate = new Date(date).toLocaleDateString("fr-FR", options);

      const day = new Date(date).toLocaleDateString("fr-FR", { day: "2-digit" });
      const month = new Date(date).toLocaleDateString("fr-FR", { month: "2-digit" });
      const year = new Date(date).toLocaleDateString("fr-FR", { year: "numeric" });

      const formattedTime = new Date(date).toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return `${day}/${month}/${year} à ${formattedTime}`;
    },
  },
};
</script>

<style scoped>
@import "../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
/* @import '../../../../node_modules/datatables.net-dt/css/jquery.dataTables.css'; */
@import "../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";
@media screen {}

.custom-left-align {
  text-align: left !important;
}

table th,
td {
  text-align: left;
}

.table th {
  background-color: #d6dbd6 !important;
  border: 1px solid #dee2e6;
}

.col-sm-6 p {
  margin-bottom: 2px !important;
}

table td th {
  border-top: 2px solid #ffffff;
}

th,
td {
  text-align: left;
}

.table-bordered {
  border: 1px solid #dee2e6;
}

.table-bordered td {
  border: 1px solid #b6b9bb;
}

th {
  background-color: #caceca;
  border: 1px solid #b6b9bb;
}

select {
  cursor: pointer;
  height: 43px !important;
}
</style>

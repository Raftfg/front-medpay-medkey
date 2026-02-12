<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <h3 class="bg-success card-title text-white rounded p-2 mb-2 text-center" style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); ">Produits transférés</h3>
        <div class="card">
          <div class="card-body">
    
            <div class="table-responsive">
              <table
                id="order-listing"
                ref="myTable"
                class="table table-bordered"
              >
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Date de Transf.</th>
                    <th>N° de lot</th>
                    <th>Produit</th>
                    <th>Q. U. Transféré</th>
                    <th>Date d'Exp.</th>
                    <th>Prix de vente</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(stockTransferProduct, index) in stockTransferProducts" :key="stockTransferProduct.uuid">
                    <td>{{ index + 1 }}</td>
                    <td>{{ stockTransferProduct.created_at }}</td>
                    <td>{{ stockTransferProduct.stock_product.lot_number}}</td>
                    <td>{{ stockTransferProduct.stock_product.product.name + ' ' + stockTransferProduct.stock_product.product.conditioning_unit.name + ' ' +stockTransferProduct.stock_product.product.sale_unit.name}}</td>
                    <td>{{ stockTransferProduct.quantity_transfered }}</td>
                    <td>{{ stockTransferProduct.stock_product.expire_date }}</td>
                    <td>{{ stockTransferProduct.stock_product.selling_price }}</td>
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
import pdfMake from "../../../../node_modules/pdfmake/build/pdfmake";
import vfsFonts from "../../../../node_modules/pdfmake/build/vfs_fonts";
pdfMake.vfs = vfsFonts.pdfMake.vfs;
import "datatables.net-dt";
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

import { stockTransferService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "list-supply-products",
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      stockTransferProducts: [],
      stockTransferUuid: this.uuid || '',
      table: null,
      nom: "",
    };
  },
  mounted() {
    //get all stockTransferProducts related to as specified supply
    stockTransferService
    .getProducts(this.stockTransferUuid).then((res) => {
      console.log(res)
      this.stockTransferProducts = res.data.data;
      this.$nextTick(() => {
        const table = $(this.$refs.myTable).DataTable({
          "initComplete": function (settings, json) {
              //When the data is fully loaded reduce the margin bottom
              $('.table-responsive').css('margin-top', '-25px !important');
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
    .catch((err) => {
      console.log(err);
    });
  },
  methods: {
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
</style>

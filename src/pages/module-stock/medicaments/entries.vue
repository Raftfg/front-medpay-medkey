<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <h3 class="bg-success card-title text-white rounded p-2 mb-2 text-center" style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); ">Approvisionnement du produit: {{ productSpecification.name }} </h3>
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
                    <th>Code</th>
                    <th>Désignation</th>
                    <th>Date d'exp.</th>
                    <th>Prix</th>
                    <th>Quant.</th>
                    <th>U/B</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(supplyProduct, index) in supplyProducts" :key="supplyProduct.uuid">
                    <td>{{ index + 1 }}</td>
                    <td>{{ supplyProduct.product.code }}</td>
                    <td>{{ supplyProduct.product.name }}</td>
                    <td>{{ supplyProduct.expire_date }}</td>
                    <td>{{ supplyProduct.purchase_price }}</td>
                    <td>{{ supplyProduct.quantity }}</td>
                    <td>{{ supplyProduct.units_per_box }}</td>
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
import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
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

import { productSpecificationService } from "@/_services";
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
      supply: {},
      supplyProducts: [],
      productSpecification: {},
      productUuid: this.uuid || '',
      deleteIndex: null,
      deleteName: "",
      table: null,
      nom: "",
    };
  },
  mounted() {
    productSpecificationService
    .getProductSpecification(this.uuid).then((res) => {
      this.productSpecification = res.data.data;
      this.productSpecification.category_id = res.data.data.category.uuid;
      this.productSpecification.conditioning_unit_id = res.data.data.conditioning_unit.uuid;
      this.productSpecification.sale_unit_id = res.data.data.sale_unit.uuid;
      this.productSpecification.administration_route_id = res.data.data.administration_route.uuid;
    });

    //get all supplyProducts related to the current supply
    productSpecificationService
    .getSupplyProducts(this.uuid).then((res) => {
      console.log(res);
      this.supplyProducts = res.data.data;
      this.$nextTick(() => {
        const table = $(this.$refs.myTable).DataTable({
          // dom: '<"html5buttons"B>lTfgtip',
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
    });
  },
  methods: {
  }
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

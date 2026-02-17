<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-5 text-center" style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-bottom: 15px !important;">
              Médicament n° {{ product.product.code }}
            </h3>
            <fieldset class="scheduler-border">
              <legend class="scheduler-border">Détails </legend>
              <div class=" row col-md-12">
                <div class="col-md-5 vertical-line">
                  <div class="col-md-12">
                    <div class="d-flex flex-column justify-content-center align-items-start"> 
                      <p style="font-weight: bold;">Désignation:</p> 
                      <p style="margin-top: -10px;">{{ product.product.name }}</p>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="d-flex flex-column justify-content-center align-items-start"> 
                      <p style="font-weight: bold;">Catégorie</p> 
                      <p style="margin-top: -10px;">{{ product.product.category.name }}</p>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="d-flex flex-column justify-content-center align-items-start"> 
                      <p style="font-weight: bold;">Unité de conditionnement:</p> 
                      <p style="margin-top: -10px;">{{ product.product.conditioning_unit.name }}</p>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="d-flex flex-column justify-content-center align-items-start"> 
                      <p style="font-weight: bold;">Unité de vente:</p> 
                      <p style="margin-top: -10px;">{{ product.product.sale_unit.name }}</p>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="d-flex flex-column justify-content-center align-items-start"> 
                      <p style="font-weight: bold;">Marque:</p> 
                      <p style="margin-top: -10px;">{{ product.product.brand }}</p>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="d-flex flex-column justify-content-center align-items-start"> 
                      <p style="font-weight: bold;">Voie d'administration:</p> 
                      <p style="margin-top: -10px;">{{ product.product.administration_route.name }}</p>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="d-flex flex-column justify-content-center align-items-start"> 
                      <p style="font-weight: bold;">Dosage:</p> 
                      <p style="margin-top: -10px;">{{ product.product.dosage }}</p>
                    </div>
                  </div>
                </div>

                <div class="col-md-7">
                  <div class="col-md-12">
                    <div class="d-flex flex-column justify-content-center align-items-start"> 
                      <p style="font-weight: bold;">Magasin:</p> 
                      <p style="margin-top: -10px;">{{ product.stock.store.name }}</p>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="d-flex flex-column justify-content-center align-items-start"> 
                      <p style="font-weight: bold;">Stock:</p> 
                      <p style="margin-top: -10px;">{{ product.stock.name }}</p>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="d-flex flex-column justify-content-center align-items-start"> 
                      <p style="font-weight: bold;">Numéro de lot:</p> 
                      <p style="margin-top: -10px;">{{ product.lot_number }}</p>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="d-flex flex-column justify-content-center align-items-start"> 
                      <p style="font-weight: bold;">Date d'expiration</p> 
                      <p style="margin-top: -10px;">{{ product.expire_date }}</p>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="d-flex flex-column justify-content-center align-items-start"> 
                      <p style="font-weight: bold;">Quantité Unitaire Disponible:</p> 
                      <p style="margin-top: -10px;">{{ product.quantity }}</p>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="d-flex flex-column justify-content-center align-items-start"> 
                      <p style="font-weight: bold;">Nombre d'unités par boîte</p> 
                      <p style="margin-top: -10px;">{{ product.quantity }}</p>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="d-flex flex-column justify-content-center align-items-start"> 
                      <p style="font-weight: bold;">Prix de vente</p> 
                      <p style="margin-top: -10px;">{{ product.selling_price }}</p>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="d-flex flex-column justify-content-center align-items-start"> 
                      <p style="font-weight: bold;">Prix d'achat</p> 
                      <p style="margin-top: -10px;">{{ product.purchase_price }}</p>
                    </div>
                  </div>
                </div> 
              </div>    
            </fieldset>

            <div class="d-flex justify-content-between  col-12 flex-row">
              <button @click="cancel" class="btn btn-danger btn-medpay-gray">Retour</button>

            </div>
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
import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
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
import { rapport_statistiqueService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "detail-available-drug",
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      uuid: this.uuid || '',
      product: {
        product: {
          category: {},
          conditioning_unit: {},
          sale_unit: {},
          administration_route: {},
        }
      },
    };
  },
  mounted() {
    //get all products
    rapport_statistiqueService
    .showDrugInStock(this.uuid)
    .then((res) => {
      this.product = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  },
  methods: {
    cancel() {
      this.$router.push("/medicaments/disponible/en-stock");
    },
  },
};
</script>

<style>
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
fieldset.scheduler-border {
  border: 1px groove #ddd !important;
  margin: 0 0 1.5em 0 !important;
  -webkit-box-shadow: 0px 0px 0px 0px #000;
  box-shadow: 0px 0px 0px 0px #000;
}

legend.scheduler-border {
  font-size: 1.2em !important;
  font-weight: bold !important;
  text-align: left !important;
  width: auto;
  padding: 0 10px;
  border-bottom: none;
}
.vertical-line {
  border-right: 1px solid #ddd;
  height: 100%;
}
</style>

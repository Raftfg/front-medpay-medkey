<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-5 text-center" style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-bottom: 15px !important;">
              Médicament n° {{ product.code }}
            </h3>
            <fieldset class="scheduler-border">
              <legend class="scheduler-border">Détails </legend>
              <div class=" row col-md-12">
                <div class="col-md-5 vertical-line">
                  <div class="col-md-12">
                    <div class="d-flex flex-column justify-content-center align-items-start"> 
                      <p style="font-weight: bold;">Désignation:</p> 
                      <p style="margin-top: -10px;">{{ product.name }}</p>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="d-flex flex-column justify-content-center align-items-start"> 
                      <p style="font-weight: bold;">Catégorie</p> 
                      <p style="margin-top: -10px;">{{ product.category.name }}</p>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="d-flex flex-column justify-content-center align-items-start"> 
                      <p style="font-weight: bold;">Unité de conditionnement:</p> 
                      <p style="margin-top: -10px;">{{ product.conditioning_unit.name }}</p>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="d-flex flex-column justify-content-center align-items-start"> 
                      <p style="font-weight: bold;">Unité de vente:</p> 
                      <p style="margin-top: -10px;">{{ product.sale_unit.name }}</p>
                    </div>
                  </div>
                </div>

                <div class="col-md-7">
                  <div class="col-md-12">
                    <div class="d-flex flex-column justify-content-center align-items-start"> 
                      <p style="font-weight: bold;">Marque:</p> 
                      <p style="margin-top: -10px;">{{ product.brand }}</p>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="d-flex flex-column justify-content-center align-items-start"> 
                      <p style="font-weight: bold;">Voie d'administration:</p> 
                      <p style="margin-top: -10px;">{{ product.administration_route.name }}</p>
                    </div>
                  </div>
                  <div class="col-md-12">
                    <div class="d-flex flex-column justify-content-center align-items-start"> 
                      <p style="font-weight: bold;">Dosage:</p> 
                      <p style="margin-top: -10px;">{{ product.dosage }}</p>
                    </div>
                  </div>
                </div> 
              </div>    
            </fieldset>

            <!-- <fieldset class="scheduler-border col-md-12">
              <legend class="scheduler-border">Magasins Gros</legend> -->
                <fieldset class="scheduler-border" v-for="(stock, index) in productStocks" :key="index">
                  <legend class="scheduler-border">{{stock}}</legend>
                  <div class="table-responsive">
                    <table
                      id="order-listing"
                      ref="myTable"
                      class="table table-hover table-bordered"
                    >
                      <thead>
                        <tr style="background-color: rgb(216, 218, 216)">
                          <th>#</th>
                          <th>N. de lot</th>
                          <th>Désignation</th>
                          <th>Stock Disp.</th>
                          <th>Prix de vente</th>
                          <th>Date d'expiration</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(stockProduct, index) in sortedProductLocations[stock]" :key="stockProduct.uuid">
                          <td>{{ index + 1 }}</td>
                          <td>{{ stockProduct.lot_number }}</td>
                          <td>{{ stockProduct.product.name }}</td>
                          <td>{{ stockProduct.quantity }}</td>
                          <td>{{ stockProduct.selling_price }}</td>
                          <td>{{ stockProduct.expire_date }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                
                </fieldset>
            <!-- </fieldset> -->
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
import * as JSZip from "../../../../node_modules/jszip";
window.JSZip = JSZip;
import pdfMake from "../../../../node_modules/pdfmake/build/pdfmake";
import vfsFonts from "../../../../node_modules/pdfmake/build/vfs_fonts";
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
  name: "create-product",
  props: {
    uuid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      uuid: this.uuid || '',
      product: {},
      productLocations: {},
      sortedProductLocations: {},
      storeSortedProductLocations: {},
      productStocks: [],
      productStores: [],
    };
  },
  mounted() {
    //get all products
    productSpecificationService
    .getProductSpecification(this.uuid)
    .then((res) => {
      this.product = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });

    //get all products
    productSpecificationService
    .getProductLocations(this.uuid)
    .then((res) => {
      console.log(res);
      const groupedData = {};


      this.productLocations = res.data.data;

      let data = this.productLocations;
      
      data.forEach((item) => {
        const stockName = item.stock.name;
        if (!groupedData[stockName]) {
          groupedData[stockName] = [];
          this.productStocks.push(item.stock.name);
        }
        groupedData[stockName].push(item);
      });
      this.sortedProductLocations = groupedData;

      // const groupedData2 = {};

      // data = this.sortedProductLocations;

      // data.forEach((item) => {
      //   const storeName = item.stock.store.name;
      //   if (!groupedData2[storeName]) {
      //     groupedData2[storeName] = [];
      //     this.productStores.push(item.stock.store.name);
      //   }
      //   groupedData2[storeName].push(item);
      // });

      // this.storeSortedProductLocations = groupedData2;

      // console.log(groupedData2);

    })
    .catch((err) => {
      console.log(err);
    });
  },
  methods: {
    getCategories(uuid)
    {
      typeProductService
      .getCategories(uuid)
      .then((response) => {
        console.log(response);
        this.categories = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    },
    cancel() {
      this.$router.push("/medicaments/list");
    },
    addProductSpecification() {     
      console.log("User Input :", this.productSpecification);

      productSpecificationService
        .addProductSpecification(this.productSpecification)
        .then((response) => {
          // Traitement en cas de succès
          console.log("Request Response:", response.data);

          // Réinitialiser les champs du formulaire
          this.productSpecification = {
            category_id: null,
            product_id: null,
            conditioning_unit: {},
            administration_route: {},
            sale_unit: {},
            dosage: "",
            brand: "",
          };
          
          // Rediriger vers la page "/product-specification/list"
          this.$router.push("/product-specification/list");
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
          console.error("Erreur lors de l'ajout du produit :", error);
        });
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

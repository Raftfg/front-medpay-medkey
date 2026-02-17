<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-5 text-center" style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              Ajouter un médicament
            </h3>

            <form class="forms-sample row" @submit.prevent="addProductSpecification">
              <div class="form-row col-md-12">
                <!-- Deisgnation -->
                <div class="form-group controls col-md-4">
                  <label for="name">Désignation<span style="color: red">*</span></label>
                  <input type="text" maxlength="255"
                  v-model="productSpecification.name" 
                  class="form-control"
                  id="name"
                  placeholder="Entrez la désignation"
                  :class="{
                    'form-control': true,
                    'is-invalid': formErrors.name,
                  }"
                  @input="clearError('name')"
                    required>
                  <div class="invalid-feedback" v-if="formErrors.name">
                    {{ formErrors.name }}
                  </div>
                </div>
                <!-- Category -->
                <div class="form-group controls col-md-4">
                  <label for="category">Catégorie<span style="color: red">*</span></label>
                  <div class="form-group controls d-flex flex-row">

                    <select 
                      :class="{ 
                        'form-control': true,
                        'is-invalid': formErrors.category_id
                      }" 
                      v-model="productSpecification.category_id"
                      class="form-control mb-3 col-md-10" id="category" required>
                      <option value="null" selected>Selectionner une catégorie </option>
                      <option v-for="category in categories" :key="category.uuid" :value="category.uuid">
                        {{ category.name }}
                      </option>
                    </select>
                    <div class="col-md-1" style="margin-left: -10px;">
                      <button data-toggle="modal" data-target="#showAddCategorieModal" class="btn btn-success btn-sm add" style="font-size: 15px;height: 42px;" type="button" name="add"><span class="fa fa-plus"></span>
                      </button>
                    </div>
                  </div>
                  
                  <div class="invalid-feedback" v-if="formErrors.category_id">
                    {{ formErrors.category_id }}
                  </div>
                </div>
                <!-- Supplier -->
                <div class="form-group controls col-md-4">
                  <label for="supplier">Fournisseur<span style="color: red">*</span></label>
                  <select 
                    :class="{ 
                      'form-control': true,
                      'is-invalid': formErrors.supplier_id
                    }" 
                    v-model="productSpecification.supplier_id"
                    class="form-control mb-3" id="supplier" required>
                    <option value="null" selected>Selectionner un fournisseur </option>
                    <option v-for="supplier in suppliers" :key="supplier.uuid" :value="supplier.uuid">
                      {{ supplier.name }}
                    </option>
                  </select> 
    
                  <div class="invalid-feedback" v-if="formErrors.supplier_id">
                    {{ formErrors.supplier_id }}
                  </div>
                </div>
                
   
              </div>

              <div class="form-row col-md-12">
                <!-- Unit Of Conditionnement -->
                <div class="form-group controls col-md-4">
                  <label for="unitSale">Unité de conditionnement <span style="color: red">*</span></label>
                  <select 
                    :class="{ 
                      'form-control': true,
                      'is-invalid': formErrors.conditioning_unit
                    }" 
                    v-model="productSpecification.conditioning_unit"
                    class="form-control mb-3" id="unitConditionnement" required>
                    <option value="null" selected>Selectionner une unité de conditionnement </option>
                    <option v-for="unitOfConditionement in unitOfConditionements" :key="unitOfConditionement" :value="unitOfConditionement">
                      {{ unitOfConditionement }}
                    </option>
                  </select> 
    
                  <div class="invalid-feedback" v-if="formErrors.conditioning_unit">
                    {{ formErrors.conditioning_unit }}
                  </div>
                </div>
                <!-- Unit Of Sales -->
                <div class="form-group controls col-md-4">
                  <label for="unitSale">Unité de vente<span style="color: red">*</span></label>
                  <input type="text" maxlength="125"
                  v-model="productSpecification.sales_unit" 
                  class="form-control"
                  id="unitSale"
                  placeholder="100mg"
                  :class="{
                    'form-control': true,
                    'is-invalid': formErrors.sales_unit,
                  }"
                  @input="clearError('sales_unit')"
                  required>
                  
                  <div class="invalid-feedback" v-if="formErrors.sales_unit">
                    {{ formErrors.sales_unit }}
                  </div>
                </div>
                <!-- Brand -->
                <div class="form-group controls col-md-4">
                  <label for="brand">Marque<span style="color: red">*</span></label>
                  <input type="text" maxlength="255"
                  v-model="productSpecification.brand" 
                  class="form-control"
                  id="brand"
                  placeholder="Entrez la marque"
                  :class="{
                    'form-control': true,
                    'is-invalid': formErrors.brand,
                  }"
                  @input="clearError('brand')"
                    required>
                  <div class="invalid-feedback" v-if="formErrors.brand">
                    {{ formErrors.brand }}
                  </div>
                </div>
              </div>

              <div class="form-row col-md-12">
                <!-- Margin -->
                <div class="form-group controls col-md-4">
                  <label for="margin">Marge (%)<span style="color: red">*</span></label>
                  <input type="number" min="0" max="100"
                  v-model="productSpecification.margin" 
                  class="form-control"
                  id="margin"
                  placeholder="Entrez la marge"
                  :class="{
                    'form-control': true,
                    'is-invalid': formErrors.margin,
                  }"
                  @input="clearError('margin')"
                    required>
                  <div class="invalid-feedback" v-if="formErrors.margin">
                    {{ formErrors.margin }}
                  </div>
                </div>

                <!-- Administration channel -->
                <div class="form-group controls col-md-4">
                  <label for="administrationChannel">Voie d'administration<span style="color: red">*</span></label>
                  <input type="text" maxlength="255"
                  v-model="productSpecification.administration_channel" 
                  class="form-control"
                  id="administrationChannel"
                  placeholder="Entrez la voie d'administration"
                  :class="{
                    'form-control': true,
                    'is-invalid': formErrors.administration_channel,
                  }"
                  @input="clearError('administrationChannel')"
                    required>
                  <div class="invalid-feedback" v-if="formErrors.administration_channel">
                    {{ formErrors.administration_channel }}
                  </div>
                </div>
                <!-- Dosage -->
                <div class="form-group controls col-md-4">
                  <label for="dosage">Dosage<span style="color: red">*</span></label>
                  <input type="text" maxlength="255"
                  v-model="productSpecification.dosage" 
                  class="form-control"
                  id="dosage"
                  placeholder="Entrez le dosage"
                  :class="{
                    'form-control': true,
                    'is-invalid': formErrors.dosage,
                  }"
                  @input="clearError('unit')"
                    required>
                  <div class="invalid-feedback" v-if="formErrors.dosage">
                    {{ formErrors.dosage }}
                  </div>
                </div>
              </div>
             
              <div class="d-flex justify-content-between  col-12 flex-row">
                <button @click="cancel" class="btn btn-danger btn-medpay-gray">Annuler</button>

                <button type="submit" class="btn btn-success btn-medpay-green mr-2">
                  Ajouter
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="showAddCategorieModal">
      <div class="modal-dialog" >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Créer une catégorie</h5>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" class="form-control" id="name" v-model="category.name" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger btn-medpay-gray" data-dismiss="modal">Close</button>
            <button type="button" class="btn" data-dismiss="modal" style="background-color: rgb(11, 93, 63); color: white; border:3px solid rgb(11, 93, 63) !important; border-radius: 25px !important; width: 200px !important;
            -webkit-box-shadow: none !important;
            box-shadow: none !important;
            font-weight: 700 !important;
            font-size: 16px !important;
            padding: 0.685rem 0.49rem !important;" @click="saveCategorie">Save</button>
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

import { categoryService } from "@/_services";
import { supplierService } from "@/_services";
import { productSpecificationService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "create-product",

  data() {
    return {
      categories: {},
      category: {
        name: "",
      },
      suppliers: {},
      // unitOfSaleOptions: ['U', 'mg', 'mL', 'µg', 'g', 'mmol'],
      unitOfConditionements: ['Ampoule','Plaquette', 'Sachet', 'Carton', 'Autres'],
      productSpecification: {
        name: "",
        supplier_id: null,
        type_name: "Drugs",
        category_id: null,
        conditioning_unit: null,
        sales_unit: null,
        unit: "",
        dosage: "",
        administration_channel: "",
        margin: "",
        brand: "",
      },
      formErrors: { 
        name: "",
        supplier_id: "",
        category_id: "",
        conditioning_unit: "",
        sales_unit: "",
        unit: "",
        dosage: "",
        administration_channel: "",
        margin: "",
        brand: "",
      },
    };
  },
  mounted() {
    //get all categories
    categoryService
    .getAllCategories()
    .then((response) => {
      this.categories = response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });

    //get all suppliers
    supplierService
    .getAllSuppliers()
    .then((res) => {
      this.suppliers = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });
  },
  methods: {
    saveCategorie() {
      // You can perform actions with the 'name' value here
      categoryService
      .addCategory(this.category)
      .then((response) => {
        console.log(response);
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
        this.refreshCategories();
      })
      .catch((error) => {
        console.log(error);
      });
    },
    refreshCategories()
    {
      categoryService
      .getAllCategories()
      .then((response) => {
        console.log(response.data.data);
        this.categories = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    },
    cancel() {
      this.$toast.error("Enregistrement annulé!", {
        position: "top-right",
        timeout: 3000,
        style: {
          background: "#ff0000", // Couleur de fond rouge pour l'erreur
          color: "#fff", // Couleur du texte
          fontWeight: "bold",
        },
      });
      this.$router.push("/product-specification/list");
    },
    addProductSpecification() {     
      console.log("User Input :", this.productSpecification);
      this.formErrors = {};

      productSpecificationService
        .addProductSpecification(this.productSpecification)
        .then((response) => {
          // Traitement en cas de succès
          console.log("Request Response:", response.data);

          // Réinitialiser les champs du formulaire
         
          this.$router.push("/medicaments/list");
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
    clearError(field) {
      if (field in this.formErrors) {
        this.formErrors[field] = "";
      }
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
.modal-content
{
  background-color: white;
}
</style>

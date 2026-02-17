<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-4 text-center" style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-transform: none;">
              Modifier un consommable
            </h3>

            <form class="forms-sample row" @submit.prevent="updateDrug">
              <div class="form-row col-md-12 mb-3 ml-0 mr-0" style="max-height: 80px;">
                <!-- name -->
                <div class="form-group controls col-md-4 mb-0">
                  <label for="name">Désignation<span style="color: red">*</span></label>
                  <input type="text" minlength="3" maxlength="255"
                    v-model="productSpecification.name" 
                    class="form-control"
                    id="name"
                    placeholder="Entrez la désignation"
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.name.haveError,
                    }"
                    @input="clearError('name')"
                  >
                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.name.haveError" style="font-size: 11px">
                    {{ formErrors.name.message }}
                  </div>
                </div>

                <!-- Brand -->
                <div class="form-group controls col-md-4 mb-0">
                  <label for="brand">Marque<span style="color: red">*</span></label>
                  <input type="text" minlength="3" maxlength="255"
                    v-model="productSpecification.brand" 
                    class="form-control"
                    id="brand"
                    placeholder="Entrez la marque"
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.brand.haveError,
                    }"
                    @input="clearError('brand')"
                  >
                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.brand.haveError" style="font-size: 11px">
                    {{ formErrors.brand.message }}
                  </div>
                </div>

                <!-- Category -->
                <div class="form-group controls col-md-4 mb-0">
                  <label for="category">Catégorie<span style="color: red">*</span></label>
                  <div class="form-group controls d-flex flex-row justify-content-between mb-0">
                    <select 
                      :class="{ 
                        'form-control': true,
                        'is-invalid': formErrors.category_id.haveError
                      }" 
                      v-model="productSpecification.category_id"
                      @change="clearError('category_id')"
                      class="form-control col-md-10" id="category">
                      <option value="null" selected>Sélectionner une catégorie </option>
                      <!-- I renamed this key from category to eachCategory to avoid duplicate key error with the modal -->
                      <option v-for="category in categories" :key="category.uuid" :value="category.uuid">
                        {{ category.name }}
                      </option>
                    </select>
                    <button data-toggle="modal" data-target="#addCategoryModal" class="btn btn-success btn-sm add d-flex justify-content-center align-items-center" style="font-size: 15px; width: 30px; height: 30px; margin-top: 6px;" type="button" name="add"><span class="fa fa-plus"></span>
                    </button>
                  </div>
                  
                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.category_id.haveError" style="font-size: 11px">
                    {{ formErrors.category_id.message }}
                  </div>
                </div>
              </div>

              <div class="form-row col-md-12 mb-3 ml-0 mr-0" style="max-height: 80px;">
                <!-- Unit Of Conditionnement -->
                <div class="form-group controls col-md-4 mb-0">
                  <label for="conditioningUnit">Unité de conditionnement<span style="color: red">*</span></label>
                  <select 
                    :class="{ 
                      'form-control': true,
                      'is-invalid': formErrors.conditioning_unit_id.haveError
                    }" 
                    v-model="productSpecification.conditioning_unit_id"
                    @change="clearError('conditioning_unit_id')"
                    class="form-control" id="conditioningUnit">
                    <option value="null" selected>Sélectionner une unité de conditionnement </option>
                    <option v-for="conditioningUnit in conditioningUnits" :key="conditioningUnit.uuid" :value="conditioningUnit.uuid">
                      {{ conditioningUnit.name }}
                    </option>
                  </select> 
    
                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.conditioning_unit_id.haveError" style="font-size: 11px">
                    {{ formErrors.conditioning_unit_id.message }}
                  </div>
                </div>

                <!-- Unit Of Sales -->
                <div class="form-group controls col-md-4 mb-0">
                  <label for="saleUnit">Unité de vente<span style="color: red">*</span></label>
                  <select 
                    :class="{ 
                      'form-control': true,
                      'is-invalid': formErrors.sale_unit_id.haveError
                    }" 
                    v-model="productSpecification.sale_unit_id"
                    @change="clearError('sale_unit_id')"
                    class="form-control" id="saleUnit">
                    <option value="null" selected>Sélectionner une unité de vente </option>
                    <option v-for="saleUnit in saleUnits" :key="saleUnit.uuid" :value="saleUnit.uuid">
                      {{ saleUnit.name }}
                    </option>
                  </select> 
                  
                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.sale_unit_id.haveError" style="font-size: 11px">
                    {{ formErrors.sale_unit_id.message }}
                  </div>
                </div>

                <!-- Administration channel -->
                <div class="form-group controls col-md-4 mb-0">
                  <label for="administrationRoute">Voie d'administration<span style="color: red">*</span></label>
                  <select 
                    :class="{ 
                      'form-control': true,
                      'is-invalid': formErrors.administration_route_id.haveError
                    }" 
                    v-model="productSpecification.administration_route_id"
                    @change="clearError('administration_route_id')"
                    class="form-control" id="administrationRoute">
                    <option value="null" selected>Sélectionner une voie d'administration </option>
                    <option v-for="administrationRoute in administrationRoutes" :key="administrationRoute.uuid" :value="administrationRoute.uuid">
                      {{ administrationRoute.name }}
                    </option>
                  </select> 

                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.administration_route_id.haveError" style="font-size: 11px">
                    {{ formErrors.administration_route_id.message }}
                  </div>
                </div>  
              </div>

              <div class="form-row col-md-12 mb-3 ml-0 mr-0" style="max-height: 80px;">
                <!-- Dosage -->
                <div class="form-group controls col-md-4 mb-0">
                  <label for="dosage">Dosage<span style="color: red">*</span></label>
                  <input type="text" minlength="3" maxlength="255"
                  v-model="productSpecification.dosage" 
                  class="form-control"
                  id="dosage"
                  placeholder="Entrez le dosage"
                  :class="{
                    'form-control': true,
                    'is-invalid': formErrors.dosage.haveError,
                  }"
                  @input="clearError('unit')"
                  >
                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.dosage.haveError" style="font-size: 11px">
                    {{ formErrors.dosage.message }}
                  </div>
                </div>
              </div>
             
              <div class="d-flex justify-content-between  col-12 flex-row">
                <button @click="cancel" class="btn btn-danger btn-medpay-gray ml-1">Annuler</button>
                <button type="submit" class="btn btn-success btn-medpay-green mr-1">
                  Modifier
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="addCategoryModal">
      <div class="modal-dialog" >
        <div class="modal-content border-0">
          <div class="modal-header d-flex justify-content-center text-white text-center" style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h5 class="modal-title">Créer une catégorie</h5>
            <button type="button" class="close text-white" data-dismiss="modal">&times;</button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label>Nom</label>
              <input type="text" minlength="3" maxlength="125" class="form-control" placeholder="Entrez le nom de la nouvelle catégorie" v-model="category.name" @input="convertToUpperCase()" required/>
              <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.category.name.haveError" style="font-size: 11px">
                {{ formErrors.category.name.message }}
              </div>
            </div>
          </div>
          <div class="modal-footer d-flex justify-content-between">
            <button type="button" class="btn btn-danger btn-medpay-gray" data-dismiss="modal">Annuler</button>
            <button type="button" class="btn" style="background-color: rgb(11, 93, 63); color: white; border: none !important; border-radius: 25px !important; width: 200px !important; font-weight: 700 !important; font-size: 16px !important;" @click="saveCategory">Ajouter</button>
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

import { conditioningUnitService } from "@/_services";
import { administrationRouteService } from "@/_services";
import { saleUnitService } from "@/_services";
import { categoryService } from "@/_services";
import { productSpecificationService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "create-drug",
  props: ["uuid"],

  data() {
    return {
      conditioningUnits: {},
      administrationRoutes: {},
      saleUnits: {},
      categories: {},
      productSpecification: {},
      category: {
        name: "",
      },
      formErrors: { 
        name: {
          haveError: false,
          message: "",
        },
        category_id: {
          haveError: false,
          message: "",
        },
        conditioning_unit_id: {
          haveError: false,
          message: "",
        },
        administration_route_id: {
          haveError: false,
          message: "",
        },
        sale_unit_id: {
          haveError: false,
          message: "",
        },
        dosage: {
          haveError: false,
          message: "",
        },
        brand: {
          haveError: false,
          message: "",
        },
        category: {
          name: {
            haveError: false,
            message: "",
          },
        },
      },
    };
  },
  mounted() {
    productSpecificationService.getProductSpecification(this.uuid).then((res) => {
      this.productSpecification = res.data.data;
      this.productSpecification.category_id = res.data.data.category.uuid;
      this.productSpecification.conditioning_unit_id = res.data.data.conditioning_unit.uuid;
      this.productSpecification.sale_unit_id = res.data.data.sale_unit.uuid;
      this.productSpecification.administration_route_id = res.data.data.administration_route.uuid;
    });

    //get all conditioning units
    conditioningUnitService
    .getConditioningUnits()
    .then((res) => {
      this.conditioningUnits = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });

    //get all administration routes
    administrationRouteService
    .getAdministrationRoutes()
    .then((res) => {
      this.administrationRoutes = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });

    //get all sale units
    saleUnitService
    .getSaleUnits()
    .then((res) => {
      this.saleUnits = res.data.data;
    })
    .catch((err) => {
      console.log(err);
    });

    //get all categories
    categoryService
    .getAllCategories()
    .then((response) => {
      this.categories = response.data.data;
    })
    .catch((error) => {
      console.log(error);
    });
  },
  methods: {
    convertToUpperCase() {
      this.category.name = this.category.name.toUpperCase();
      this.clearCategoryError();
    },
    saveCategory() {
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
        $('#addCategoryModal').modal('hide');
      })
      .catch((error) => {
        console.log(error);
        this.clearCategoryError();

        if (error.response && error.response.data && error.response.data.message) {
          this.formErrors.category.name.haveError = true;
          this.formErrors.category.name.message = error.response.data.message;
        }
        else {
          this.$toast.error("Une erreur s'est produite lors de l'enregistrement de la catégorie.", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#fff",
              fontWeight: "bold",
            },
          });
        }
      });
    },
    clearCategoryError(){
      this.formErrors.category.name.haveError = false;
      this.formErrors.category.name.message  = "";
    },
    clearProductError(){
      this.formErrors.name.haveError = false;
      this.formErrors.name.message  = "";

      this.formErrors.brand.haveError = false;
      this.formErrors.brand.message  = "";

      this.formErrors.category_id.haveError = false;
      this.formErrors.category_id.message  = "";

      this.formErrors.conditioning_unit_id.haveError = false;
      this.formErrors.conditioning_unit_id.message  = "";

      this.formErrors.sale_unit_id.haveError = false;
      this.formErrors.sale_unit_id.message  = "";  

      this.formErrors.administration_route_id.haveError = false;
      this.formErrors.administration_route_id.message  = "";

      this.formErrors.dosage.haveError = false;
      this.formErrors.dosage.message  = "";
    },
    refreshCategories()
    {
      categoryService
      .getAllCategories()
      .then((response) => {
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
      this.$router.push("/consommables/list");
    },
    updateDrug() {  
      // Clear old errors
      this.clearProductError();
      // Check if the name field is empty
      if (this.productSpecification.name === "") {
        this.formErrors.name.message = 'Veuillez entrer le nom du produit.';
        this.formErrors.name.haveError = true;
        return;
      }
      // Check if the brand field is empty
      if (this.productSpecification.brand === "") {
        this.formErrors.brand.message = 'Veuillez entrer la marque du produit.';
        this.formErrors.brand.haveError = true;
        return;
      }   
      // Check if the category_id field is empty
      if (this.productSpecification.category_id === "" || this.productSpecification.category_id === null || this.productSpecification.category_id == "null") {
        this.formErrors.category_id.message = 'Veuillez sélectionner une catégorie.';
        this.formErrors.category_id.haveError = true;
        return;
      }
      // Check if the conditioning_unit_id field is empty
      if (this.productSpecification.conditioning_unit_id === "" || this.productSpecification.conditioning_unit_id === null || this.productSpecification.conditioning_unit_id == "null") {
        this.formErrors.conditioning_unit_id.message = 'Veuillez sélectionner une unité de conditionnement.';
        this.formErrors.conditioning_unit_id.haveError = true;
        return;
      }
      // Check if the sale_unit_id field is empty
      if (this.productSpecification.sale_unit_id === "" || this.productSpecification.sale_unit_id === null || this.productSpecification.sale_unit_id == "null") {
        this.formErrors.sale_unit_id.message = 'Veuillez sélectionner une unité de vente.';
        this.formErrors.sale_unit_id.haveError = true;
        return;
      }
      // Check if the administration_route_id field is empty
      if (this.productSpecification.administration_route_id === "" || this.productSpecification.administration_route_id === null || this.productSpecification.administration_route_id == "null") {
        this.formErrors.administration_route_id.message = 'Veuillez sélectionner une voie d\'administration.';
        this.formErrors.administration_route_id.haveError = true;
        return;
      }
      // Check if the dosage field is empty
      if (this.productSpecification.dosage === "" || this.productSpecification.dosage === null) {
        this.formErrors.dosage.message = 'Veuillez entrer un dosage.';
        this.formErrors.dosage.haveError = true;
        return;
      }

      productSpecificationService
      .updateProductSpecification(this.productSpecification)
      .then((response) => {
        this.$router.push("/consommables/list");
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
        console.log(error)
        try {
          this.formErrors.name.message = error.response.data.errors.name[0];
          this.formErrors.name.haveError = true;
        } 
        catch (error) {
        }

        try {
          this.formErrors.dosage.message = error.response.data.errors.dosage[0];
          this.formErrors.dosage.haveError = true;
        } 
        catch (error) {
        }

        try {
          this.formErrors.brand.message = error.response.data.errors.brand[0];
          this.formErrors.brand.haveError = true;
        } 
        catch (error) {
        }
      });
    },
    clearError(field) {
      if (field in this.formErrors) {
        this.formErrors[field] = {
          haveError: false,
          message: "",
        };
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

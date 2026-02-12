<template>
  <section class="container-scroller">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold"
              >Paramètre
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Produits
          </li>
          <li
            class="breadcrumb-item active text-success font-weight-bold"
            aria-current="page"
          >
            Modifier
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3
              class="card-title text-white rounded p-3 mb-5 text-center"
              style="
                background-color: #0b5d3f;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              "
            >
              Modifier un produit
            </h3>
            <form @submit.prevent="update" class="forms-sample row">
              <div class="form-row col-md-12">
                <!-- Type Product -->
                <div class="form-group controls col-md-4">
                  <label for="typeProduct">Type<span style="color: red">*</span></label>
                  <select 
                    :class="{ 
                      'form-control': true,
                      'is-invalid': formErrors.typeProductSelected
                    }" 
                    v-model="typeProductSelected"
                    @change="getCategories(typeProductSelected)"
                    class="form-control mb-3" id="typeProduct" required>
                    <option value="null" selected>Selectionner un type </option>
                    <option v-for="typeProduct in typeProducts" :key="typeProduct.uuid" :value="typeProduct.uuid">
                      {{ typeProduct.name }}
                    </option>
                  </select>
    
                  <div class="invalid-feedback" v-if="formErrors.typeProductSelected">
                    {{ formErrors.typeProductSelected }}
                  </div>
                </div>
                <!-- Category -->
                <div class="form-group controls col-md-4">
                  <label for="category">Categorie<span style="color: red">*</span></label>
                  <select 
                    :class="{ 
                      'form-control': true,
                      'is-invalid': formErrors.category_id
                    }" 
                    v-model="productSpecification.category_id"
                    class="form-control mb-3" id="category" required>
                    <option value="null" selected>Selectionner une catégorie </option>
                    <option v-for="category in categories" :key="category.uuid" :value="category.uuid">
                      {{ category.name }}
                    </option>
                  </select>
    
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
                <!-- Product -->
                <div class="form-group controls col-md-6">
                  <label for="product">Nom<span style="color: red">*</span></label>
                  <select 
                    :class="{ 
                      'form-control': true,
                      'is-invalid': formErrors.product_id
                    }" 
                    v-model="productSpecification.product_id"
                    class="form-control mb-3" id="product" required>
                    <option value="null" selected>Selectionner un produit </option>
                    <option v-for="product in products" :key="product.uuid" :value="product.uuid">
                      {{ product.name }}
                    </option>
                  </select> 
    
                  <div class="invalid-feedback" v-if="formErrors.product_id">
                    {{ formErrors.product_id }}
                  </div>
                </div>
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
                <div class="form-group controls col-md-2">
                  <label for="unitSale">Unité de vente<span style="color: red">*</span></label>
                  <select 
                    :class="{ 
                      'form-control': true,
                      'is-invalid': formErrors.sales_unit
                    }" 
                    v-model="productSpecification.sales_unit"
                    class="form-control mb-3" id="unitSale" required>
                    <option value="null" selected>Selectionner une unité de vente </option>
                    <option v-for="unitOfSaleOption in unitOfSaleOptions" :key="unitOfSaleOption" :value="unitOfSaleOption">
                      {{ unitOfSaleOption }}
                    </option>
                  </select> 
    
                  <div class="invalid-feedback" v-if="formErrors.sales_unit">
                    {{ formErrors.sales_unit }}
                  </div>
                </div>
              </div>

              <div class="form-row col-md-12">
                <!-- Brand -->
                <div class="form-group controls col-md-7">
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
                <!-- Unit -->
                <div class="form-group controls col-md-3">
                  <label for="unit">Unité<span style="color: red">*</span></label>
                  <input type="text" maxlength="125"
                  v-model="productSpecification.unit" 
                  class="form-control"
                  id="unit"
                  placeholder="Entrez l'unité"
                  :class="{
                    'form-control': true,
                    'is-invalid': formErrors.unit,
                  }"
                  @input="clearError('unit')"
                    required>
                  <div class="invalid-feedback" v-if="formErrors.unit">
                    {{ formErrors.unit }}
                  </div>
                </div>
                <!-- Margin -->
                <div class="form-group controls col-md-2">
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
              </div>
              <div class="form-row col-md-12">
                <!-- Administration channel -->
                <div class="form-group controls col-md-6">
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
                <div class="form-group controls col-md-6">
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
              <div class="d-flex justify-content-between col-12 flex-row">
                <button
                  @click="cancel"
                  class="btn btn-danger btn-medpay-gray"
                >
                  Annuler
                </button>

                <button
                  type="submit"
                  class="btn btn-success btn-medpay-green mr-2"
                >
                  Modifier
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { productService } from "@/_services";
import { typeProductService } from "@/_services";
import { categoryService } from "@/_services";
import { supplierService } from "@/_services";
import { productSpecificationService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "update-product",
  props: ["uuid"],
  data() {
    return {
      typeProducts: {},
      typeProductSelected : null,
      categories: {},
      products: {},
      suppliers: {},
      unitOfSaleOptions: ['U', 'mg', 'mL', 'µg', 'g', 'mmol'],
      unitOfConditionements: ['Ampoule','Plaquette', 'Sachet', 'Carton', 'Autres'],
      productSpecification: {
        uuid: "",
        supplier_id: null,
        category_id: null,
        product_id: null,
        product_id: null,
        conditioning_unit: null,
        sales_unit: null,
        unit: "",
        dosage: "",
        administration_channel: "",
        margin: "",
        brand: "",
      },
      formErrors: { 
        supplier_id: "",
        category_id: "",
        product_id: "",
        conditioning_unit: "",
        sales_unit: "",
        unit: "",
        dosage: "",
        administration_channel: "",
        margin: "",
        brand: "",
        typeProductSelected: "",
      },
    };
  },
  mounted() {
    productSpecificationService.getProductSpecification(this.uuid).then((res) => {
      this.productSpecification = res.data.data;
      this.productSpecification.category_id = res.data.data.category.uuid;
      this.productSpecification.supplier_id = res.data.data.supplier.uuid;
      this.productSpecification.product_id = res.data.data.product.uuid;
      this.typeProductSelected = res.data.data.category.type_product.uuid;
    });
    
    //get all type products
     typeProductService
    .getAllTypeProducts()
    .then((res) => {
      this.typeProducts = res.data.data;
      //get all categories related to the type of this product in the database
      try {
        let typeProductSelected = this.typeProductSelected;
        typeProductService
        .getCategories(typeProductSelected)
        .then((response) => {
          this.categories = response.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
      } 
      catch (error) {
      }
    })
    .catch((err) => {
      console.log(err);
    });

    //get all products
    productService
    .getAllProducts()
    .then((res) => {
      this.products = res.data.data;
    })
    .catch((err) => {
      console.log(err);
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
    cancel() {
      this.$toast.error("Échec de l'enregistrement !", {
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
    update() {
      productSpecificationService
      .updateProductSpecification(this.productSpecification)
      .then((res) => {
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
        this.$router.push("/product-specification/list");
      })
      .catch((err) => {
        this.$toast.error("Erreur lors de la modification du produit.", {
          position: POSITION.TOP_RIGHT,
          timeout: 3000,
          bodyStyle: {
            borderRadius: "10px",
            backgroundColor: "#f0f0f0",
            color: "#333",
            fontWeight: "bold",
          },
        });
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
</style>

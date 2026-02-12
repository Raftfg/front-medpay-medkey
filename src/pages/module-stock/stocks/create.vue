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
            Stock
          </li>
          <li
            class="breadcrumb-item active text-success font-weight-bold"
            aria-current="page"
          >
            Produits
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <id class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-5 text-center" style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              Produits en stock
            </h3>

            <form @submit.prevent="searchInStock" class="forms-sample row"> 
              <div class="col-md-12">
                <div class="row">
                  <fieldset class="scheduler-border col-md-12 row">
                    <legend
                      class="scheduler-border"
                      style="font-size: 13px !important"
                    >
                    Critères de Recherche
                    </legend>
                    <!-- Stores -->
                    <div class="form-group controls col-md-6">
                      <label for="store">Magasin<span style="color: red">*</span></label>
                      <select 
                        :class="{ 
                          'form-control': true,
                          'is-invalid': formErrors.store_id 
                        }" 
                        v-model="searchCriterias.store_id"
                        @change="getStocks(searchCriterias.store_id)"
                        class="form-control mb-3" id="store" required>
                        <option value="null" selected>Selectionner un magasin </option>
                        <option v-for="store in stores" :key="store.uuid" :value="store.uuid">
                          {{ store.name }}
                        </option>
                      </select>
  
                      <div class="invalid-feedback" v-if="formErrors.store_id">
                        {{ formErrors.store_id }}
                      </div>
                    </div>
                    <!-- Stocks -->
                    <div class="form-group controls col-md-6">
                      <label for="stock">Stock<span style="color: red">*</span></label>
                      <select 
                        :class="{ 
                          'form-control': true,
                          'is-invalid': formErrors.stock_id
                        }" 
                        v-model="searchCriterias.stock_id"
                        class="form-control mb-3" id="store" required>
                        <option value="null" selected>Selectionner un stock</option>
                        <option v-for="stock in stocks" :key="stock.uuid" :value="stock.uuid">
                          {{ stock.name }}
                        </option>
                      </select>
  
                      <div class="invalid-feedback" v-if="formErrors.stock_id">
                        {{ formErrors.stock_id }}
                      </div>
                    </div>
                    <!-- Type Product -->
                    <div class="form-group controls col-md-6">
                      <label for="typeProduct">Type Produit</label>
                      <select 
                        :class="{ 
                          'form-control': true,
                          'is-invalid': formErrors.type_product_id
                        }" 
                        v-model="searchCriterias.type_product_id"
                        @change="getCategories(searchCriterias.type_product_id)"
                        class="form-control mb-3" id="typeProduct" >
                        <option value="null">Selectionner un type de produit</option>
                        <option v-for="typeProduct in typeProducts" :key="typeProduct.uuid" :value="typeProduct.uuid">
                          {{ typeProduct.name }}
                        </option>
                      </select>
  
                      <div class="invalid-feedback" v-if="formErrors.type_product_id">
                        {{ formErrors.type_product_id }}
                      </div>
                    </div>
                    <!-- Category -->
                    <div class="form-group controls col-md-6">
                      <label for="category">Categorie</label>
                      <select 
                        :class="{ 
                          'form-control': true,
                          'is-invalid': formErrors.category_id
                        }" 
                        v-model="searchCriterias.category_id"
                        class="form-control mb-3" id="store">
                        <option value="null" selected>Selectionner une catégorie</option>
                        <option v-for="category in categories" :key="category.uuid" :value="category.uuid">
                          {{ category.name }}
                        </option>
                      </select>
  
                      <div class="invalid-feedback" v-if="formErrors.category_id">
                        {{ formErrors.category_id }}
                      </div>
                    </div>
                  </fieldset>

                  <div class="form-group controls col-md-12 d-flex justify-content-center">
                    <button type="button" class="btn btn-success">
                      Rechercher
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </id>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { storeService } from "@/_services";
import { typeProductService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "search-stock-product",

  data() {
    return {
      stores: {},
      stocks: {},
      typeProducts: {},
      categories: {},
      searchCriterias: {
        stock_id: null,
        store_id: null,
        type_product_id: null,
        category_id: null,
      },
      formErrors: { 
        stock_id: '',
        store_id: '',
        type_product_id: '',
        category_id: '',
        searchCriterias: {
          stock_id: '',
          store_id: '',
        },
      },
    };
  },
  mounted() {
    //get all stores
    storeService
    .getAllStores()
    .then((res) => {
      this.stores = res.data.data;
      //get all stocks related to the first store in the database
      try {
        let firstStoreUuid = this.stores[0].uuid;
        storeService
        .getStocks(firstStoreUuid)
        .then((response) => {
          this.stocks = response.data.data;
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

    //get all type products
    typeProductService
    .getAllTypeProducts()
    .then((res) => {
      this.typeProducts = res.data.data;
      //get all categories related to the first type of product in the database
      try {
        let firstTypeProductUuid = this.typeProducts[0].uuid;
        typeProductService
        .getCategories(firstTypeProductUuid)
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
  },
  methods: {
    getStocks(uuid)
    {
      storeService
      .getStocks(uuid)
      .then((response) => {
        this.stocks = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    },
    getCategories(uuid)
    {
      typeProductService
      .getCategories(uuid)
      .then((response) => {
        this.categories = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
    },

    // cancel() {
    //   this.$toast.error("Enregistrement annulé!", {
    //     position: "top-right",
    //     timeout: 3000,
    //     style: {
    //       background: "#ff0000", // Couleur de fond rouge pour l'erreur
    //       color: "#fff", // Couleur du texte
    //       fontWeight: "bold",
    //     },
    //   });
    //   // this.$router.push("/stock/list");
    // },
    // searchInStock() {
    //   console.log("User Input :", this.stock);
    //   this.formErrors = {
    //     stock: {
    //       name: '',
    //       store_id: '',
    //     },
    //   };

    //   stockService
    //   .searchInStock(this.stock)
    //   .then((response) => {
    //     // Traitement en cas de succès
    //     console.log("Request Response:", response.data);

    //     // Réinitialiser les champs du formulaire
    //     this.stock.name = "";

    //     // Rediriger vers la page "/stock/list"
    //     this.$router.push("/stock/list");
    //     this.$toast.success("Enregistrement effectué avec succès !", {
    //       position: POSITION.TOP_RIGHT,
    //       timeout: 3000,
    //       bodyStyle: {
    //         borderRadius: "10px",
    //         backgroundColor: "#f0f0f0",
    //         color: "#333",
    //         fontWeight: "bold",
    //       },
    //     });
    //   })
    //   .catch((error) => {
    //     // Traitement en cas d'erreur
    //     console.error("Erreur lors de l'ajout du stock :", error.response.data);
     
    //     try {
    //       this.formErrors.stock.name = error.response.data.errors.name[0];
    //     } 
    //     catch (error) {
    //     }

    //     try {
    //       this.formErrors.stock.store_id = error.response.data.errors.store_id[0];
    //     } 
    //     catch (error) {
    //     }
    //   });
    // },
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
  padding: 0 1.4em 1.4em 1.4em !important;
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
</style>

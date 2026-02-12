<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-4 text-center" style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-transform: none;">
              Ajouter un approvisionnement
            </h3>

            <form @submit.prevent="addSupply" class="forms-sample row"> 
              <div class="col-md-12">
                <div class="d-flex flex-row justify-content-between">
                  <div class="col-md-6 pl-2 pr-0 d-flex flex-row">
                    <div class="col-md-6 pl-0 pr-2">
                      <label for="store">Magasin<span style="color: red">*</span></label>
                      <select 
                        :class="{ 
                          'form-control': true,
                          'is-invalid': formErrors.store_id 
                        }" 
                        v-model="store_id"
                        class="form-control" id="store">
                        <option value="null" selected>Selectionner un magasin </option>
                        <option v-for="store in stores" :key="store.uuid" :value="store.uuid">
                          {{ store.name }}
                        </option>
                      </select>
  
                      <div class="invalid-feedback" v-if="formErrors.store_id">
                        {{ formErrors.store_id }}
                      </div>
                    </div>

                    <div class="col-md-6 pl-0 pr-2">
                      <label for="stock">Stock<span style="color: red">*</span></label>
                      <select 
                        :class="{ 
                          'form-control': true,
                          'is-invalid': formErrors.stock_id.haveError
                        }" 
                        v-model="supply.stock_id"
                        class="form-control" id="stock" required>
                        <option value="null" selected>Selectionner un stock</option>
                        <option v-for="stock in stocks" :key="stock.uuid" :value="stock.uuid">
                          {{ stock.name }}
                        </option>
                      </select>
 
                      <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.stock_id.haveError" style="font-size: 11px">
                        {{ formErrors.stock_id.message }}
                      </div>
                    </div>
                  </div>
                
                  <div class="col-md-1 d-flex flex-row justify-content-end align-items-center pl-0 pr-2"><button @click="addNewRow" id="addProductToSupply" class="btn btn-success btn-sm add" style="font-size: 10px; width: 35px; height: 35px; display: flex; justify-content: center; align-items: center;" type="button" name="add"><span class="fa fa-plus"></span></button></div>
                </div>
                
                <div v-for="(supplyProduct, index) in supply.supplyProducts" :key="index" class="d-flex flex-row mt-3 mb-1 pt-2 pb-2 pl-2 pr-2" style=" border: 0.5px solid #dbdbdb;">
                  <div class="d-flex flex-column pt-2 pb-2 pl-2 pr-2" style="background-color: #F4F4F4; border: 0.5px solid #dbdbdb;">
                    <div class="d-flex flex-column" id="suppllyProductList">
                      <div class="form-group row customize-row mb-0">
                        <div class="col-md-3 pl-0 pr-2"><label class="form-label mini-label">Produit<span class="text-danger">*</span></label></div>
                        <div class="col-md-3 pl-0 pr-2"><label class="form-label mini-label">PU<span class="text-danger">*</span></label></div>
                        <div class="col-md-3 pl-0 pr-2"><label class="form-label mini-label">Nb U/B<span class="text-danger">*</span></label></div>
                        <div class="col-md-3 pl-0 pr-2"><label class="form-label mini-label">Nb boîtes<span class="text-danger">*</span></label></div>
                      </div>
                      
                      <div class="form-group row customize-row mb-0">
                        <div class="col-md-3 pl-0 pr-2">
                          <select 
                            :class="{ 
                              'form-control': true,
                              'is-invalid': formErrors.supplyProduct.product_specifications_id
                            }" 
                            v-model="supply.supplyProducts[index].product_id"
                            class="form-control" id="productSpecification"
                            @change="ensureUniqueProductInSupply(index)"
                            required>
                            <option value="null" selected>Selectionner un Produit </option>
                            <option v-for="productSpecification in productSpecifications" :key="productSpecification.uuid" :value="productSpecification.uuid">
                              {{ productSpecification.name }}
                            </option>
                          </select> 
                        </div>

                        <div class="col-md-3 pl-0 pr-2">
                          <input type="number" v-model="supply.supplyProducts[index].purchase_price" @change="updateTotals" min="0" max="999999999999" class="form-control" required>
                        </div>    

                        <div class="col-md-3 pl-0 pr-2">
                          <input type="number" v-model="supply.supplyProducts[index].units_per_box" @change="updateTotals" min="1" max="999999" class="form-control" required/>
                        </div>   

                        <div class="col-md-3 pl-0 pr-0">
                          <input type="number" v-model="supply.supplyProducts[index].quantity" @change="updateTotals" min="1" max="999999999" class="form-control" required>
                        </div>                                     

                        <div class="col-md-12 d-flex flex-column mt-2" style="padding-left: 0px; padding-right: 0px; max-height: 75px;">
                          <div class="col-md-12 d-flex flex-row" style="padding-left: 0px; padding-right: 0px;  height: 30px; max-height: 22px;">
                            <div class="col-md-3 pl-0 pr-2"><label class="form-label mini-label">Fournisseur<span class="text-danger">*</span></label></div>
                            <div class="col-md-3 pl-0 pr-2"><label class="form-label mini-label">Marge (%)</label></div>
                            <div class="col-md-3 pl-0 pr-2"><label class="form-label mini-label">N° de lot<span style="color: red">*</span></label></div>
                            <div class="col-md-3 pl-0 pr-0"><label class="form-label mini-label">Date d'exp.<span class="text-danger">*</span></label></div>
                          </div>

                          <div class="col-md-12 d-flex flex-row" style="padding-left: 0px; padding-right: 0px; max-height: 45px;">
                            <div class="col-md-3 pl-0 pr-2">
                              <select 
                                :class="{ 
                                  'form-control': true,
                                  'is-invalid': formErrors.supplyProduct.supplier_id
                                }" 
                                v-model="supply.supplyProducts[index].supplier_id"
                                class="form-control" 
                                id="supplier" required>
                                <option value="null" selected>Selectionner un fournisseur </option>
                                <option v-for="supplier in suppliers" :key="supplier.uuid" :value="supplier.uuid">
                                  {{ supplier.name }}
                                </option>
                              </select> 
                            </div>

                            <div class="col-md-3 pl-0 pr-2">
                              <input type="number" v-model="supply.supplyProducts[index].profit_margin" @change="updateTotals" min="1" max="100" class="form-control">
                            </div>

                            <div class="col-md-3 pl-0 pr-2">
                              <input type="text" 
                                v-model="supply.supplyProducts[index].lot_number" 
                                @change="ensureUniqueLotNumberInSupply(index)"
                                minlength="3" maxlength="30" class="form-control" required>
                            </div>

                            <div class="col-md-3 pl-0 pr-0">
                              <input type="date" v-model="supply.supplyProducts[index].expire_date"  class="form-control" :min="formattedExpirationDate" required>
                            </div>    
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-1 d-flex flex-row justify-content-end align-items-center pl-5 pr-0" style="max-width: 40px;">
                    <button class="btn btn-danger btn-sm remove remove" id="remove-0" @click="removeProductFromSupply(index)" style="font-size: 10px; width: 32px; height: 32px; display: flex; justify-content: center; align-items: center;" type="button" name="remove">
                      <span class="fa fa-minus"></span>
                    </button>
                  </div>
                </div>

                <div class="d-flex flex-row mt-4 mb-4 p-2 align-items-center justify-content-between" style="background-color: rgb(248, 248, 248); border-radius: 3px;">
                  <label class="col-md-5 pl-0">Total:</label>
                  <input type="text" class="form-control col-md-5 pr-0" style="background-color: #F4F4F4; border: 0.5px solid #dbdbdb; border-radius: 3px;" v-model="supply.total" placeholder="0" disabled>
                </div>
              </div>
              <div class="d-flex justify-content-between col-12 flex-row">
                <button @click="cancel" class="btn btn-danger btn-medpay-gray">
                  Annuler
                </button>

                <button type="submit" class="btn btn-success btn-medpay-green">
                  Enregistrer
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
import { supplierService } from "@/_services";
import { storeService } from "@/_services";
import { productSpecificationService } from "@/_services";
import { supplyService } from "@/_services";
import { supplyProductService } from "@/_services";

import { useToast, POSITION } from "vue-toastification";

export default {
  name: "create-supply",
  data() {
    return {
      suppliers: {},
      stores: {},
      stocks: {},
      productSpecifications: {},
      store_id: null,
      supply: {
        stock_id: null,
        lot_number: "",
        total: 0,
        supplyProducts: [
          {
            product_id: null,
            supplier_id: null,
            units_per_box: null,
            expire_date: this.formattedExpirationDate,
            quantity: null,
            purchase_price: null,
            profit_margin: null,
            lot_number: "",
          }
        ],
      },
      formErrors: { 
        stock_id: {
          haveError: false,
          message: "",
        },
        supply: {
        store_id: '',
        lot_number: "",
        },
        supplyProduct: {
          type_id: "",
        },
        productSpecification: {
          type_id: "",
        },
      },
    };
  },
  computed: {
    formattedExpirationDate() {
      // Calculate tomorrow's date
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Format the date to "yyyy-MM-dd"
      return tomorrow.toISOString().substr(0, 10);
    },
  },
  mounted() {
    //initialize the select2 feature on my select
    // $('#store').select2();
    // $('#stock').select2();
    // $('#productSpecification').select2();
    // $('#supplier').select2();

    $('#stock').change((event) => {
      this.supply.stock_id = event.target.value;
      console.log(event.target.value);
    });

    $('#store').on('change', (e) => {
      this.store_id = e.target.value; 
      this.getStocks(e.target.value);
    });

    //get all suppliers
    supplierService
    .getAllSuppliers()
    .then((res) => {
      this.suppliers = res.data.data;
      this.supply.supplyProducts[0].supplier_id = this.suppliers[0].uuid;
    })
    .catch((err) => {
      console.log(err);
    });

    //get all stores
    storeService
    .getAllStores()
    .then((res) => {
      this.stores = res.data.data
      try {
        //get all stocks related to the first element in this.stores
        let firstStoreUuid = this.stores[0].uuid;
        this.store_id = firstStoreUuid;
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

    //get all productSpecifications
    productSpecificationService
    .getAllProductSpecifications()
    .then((res) => {
      this.productSpecifications = res.data.data;
      this.supply.supplyProducts[0].product_id = this.productSpecifications[0].uuid;
    })
    .catch((err) => {
      console.log(err);
    });
  },
  methods: {
    addNewRow() {
      if (this.supply.supplyProducts.length >= 20) {
        this.$toast.error('Vous ne pouvez approvisionner plus de vingt produits en même temps!', {
          duration: 5000, // Toast message duration in milliseconds
          position: POSITION.TOP_RIGHT, // Toast message position on the screen
        });
        return; // Exit the function to prevent further execution
      }
      this.supply.supplyProducts.push({
          product_id: null,
          supplier_id: null,
          units_per_box: null,
          expire_date: this.formattedExpirationDate,
          quantity: null,
          purchase_price: null,
          profit_margin: null,
          lot_number: "",
        });
    },
    removeProductFromSupply(index) {
      this.supply.supplyProducts.splice(index, 1);
    },

    ensureUniqueProductInSupply(index)
    {
      let productExistenceCount = 0;
      let productToBeChecked = this.supply.supplyProducts[index].product_id;

      this.supply.supplyProducts.forEach(product => {
          if (product.product_id == productToBeChecked) {
            productExistenceCount += 1;
          }
      });

      if (productExistenceCount > 1) {
        this.supply.supplyProducts.splice(index, 1);
        this.$toast.error('Vous ne pouvez sélectionner deux fois le même produit pour un approvisionnement', {
          duration: 5000, 
          position: POSITION.TOP_RIGHT, 
        });
        return; 
      }
    },
    ensureUniqueLotNumberInSupply(index) {
      let lotNumberExistenceCount = 0;
      let lotNumberToBeChecked = this.supply.supplyProducts[index].lot_number;

      this.supply.supplyProducts.forEach(product => {
        if (product.lot_number === lotNumberToBeChecked) {
          lotNumberExistenceCount += 1;
        }
      });

      if (lotNumberExistenceCount > 1) {
        this.supply.supplyProducts.splice(index, 1);
        this.$toast.error("Vous ne pouvez saisir le même numéro de lot deux fois pour un approvisionnement", {
          duration: 5000,
          position: POSITION.TOP_RIGHT,
        });
        return;
      }
    },
    updateTotals() {
      this.supply.total = 0;
      this.supply.supplyProducts.forEach((supplyProduct) => {
        // Assurez-vous que quantity et purchase_price sont des nombres valides
        if (!isNaN(supplyProduct.quantity) && !isNaN(supplyProduct.purchase_price) && !isNaN(supplyProduct.units_per_box)) {
          this.supply.total += supplyProduct.quantity * supplyProduct.purchase_price * supplyProduct.units_per_box;
        } else {
          // Gérez le cas où l'une des valeurs n'est pas un nombre valide
          this.supply.total += 0; // Ou une autre valeur par défaut
        }
      });
    },

    //get the stocks related to a specific store
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
    addSupply() {
      // Check if the stock_id field is empty
      if (this.supply.stock_id === "" || this.supply.stock_id === null || this.supply.stock_id == "null") {
        this.formErrors.stock_id.message = 'Veuillez sélectionner le stock.';
        this.formErrors.stock_id.haveError = true;
        return;
      }

      //Prevent the user to save a supply with no line of products      
      if (this.supply.supplyProducts.length == 0) {
        this.$toast.error('Vous devez ajouter au moins un produit à votre approvisionnement!', {
          duration: 5000, // Toast message duration in milliseconds
          position: POSITION.TOP_RIGHT, // Toast message position on the screen
        });
        return; // Exit the function to prevent further execution
      }

      
      console.log(this.supply);
      supplyService
      .addSupply(this.supply)
      .then((response) => {
        console.log(response)  
        this.$router.push("/supply/list");
        this.$toast.success("Approvisionnement ajouté avec succès !", {
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
        console.log(error);
        // try {
        //   this.formErrors.stock.name = error.response.data.errors.name[0];
        // } 
        // catch (error) {
        // }
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
      this.$router.push("/supply/list");
    },
  },
};
</script>

<style>
.form-group {
  margin-bottom: 0.5rem;
}
.select2-container--default .select2-selection--single {
  height: 45px;
}
.select2-container--default .select2-results__option--highlighted[aria-selected] {
  background-color: #0b5d3f;
}
.select2-container .select2-selection--single .select2-selection__rendered {
  padding-left: 10px;
  padding-top: 8px;
}
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
.product-list-container {
  max-height: 250px; 
  margin-bottom: 30px;
  overflow-y: auto;
  overflow-x: auto;
  border: 1px solid #ccc;
}
.modal .form-row
{
  margin-bottom: -5px;
}

.b-table-sticky-header, .table-responsive, [class*="table-responsive-"] {
  margin-bottom: 1rem;
  box-shadow: 0 2px 1px #e3e3e3;
}

.modal-content {
  background-color: white;
  border: none;
}

.customize-row
{
  margin-left: 0px;
  margin-right: 0px;
}
.customize-row .col-md-2,
.customize-row .col-md-1,
.customize-row .col-md-3
{
  padding-right: 4px;
  padding-left: 4px;
}

.customize-row button
{
  font-size: 10px;
}

.mini-label
{
  font-size: 13.5px !important;
}

</style>

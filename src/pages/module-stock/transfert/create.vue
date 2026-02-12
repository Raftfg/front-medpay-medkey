<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <id class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-4 text-center" style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              Transférer un stock
            </h3>

            <form @submit.prevent="addStockTransfer" class="forms-sample row"> 
              <div class="col-md-12">
                <div class="col-md-12 d-flex flex-row pl-2 pr-0">
                  <div class="form-group form-controls col-md-3 pl-0 pr-2">
                    <label for="stock">Stock source<span style="color: red">*</span></label>
                    <select 
                      :class="{ 
                        'form-control': true,
                        'is-invalid': formErrors.from_stock_id.haveError
                      }" 
                      v-model="stockTransfer.from_stock_id"
                      @change="setProduct(stockTransfer.from_stock_id)"
                      class="form-control" id="stockSource" 
                      required>
                      <option value="null" selected>Selectionner un stock</option>
                      <option v-for="stock in stocks" :key="stock.uuid" :value="stock.uuid">
                        {{ stock.name }}
                      </option>
                    </select>

                    <div class="invalid-feedback" v-if="formErrors.from_stock_id.haveError">
                      {{ formErrors.from_stock_id.message }}
                    </div>
                  </div>

                  <div class="form-group form-controls col-md-3 pl-0 pr-2">
                    <label for="stock">Stock Destination<span style="color: red">*</span></label>
                    <select 
                      :class="{ 
                        'form-control': true,
                        'is-invalid': formErrors.model_id.haveError
                      }" 
                      v-model="stockTransfer.model_id"
                      class="form-control" id="stockDestination" 
                      required>
                      <option value="null" selected>Selectionner un stock</option>
                      <option v-for="stock in stocks" :key="stock.uuid" :value="stock.uuid">
                        {{ stock.name }}
                      </option>
                    </select>

                    <div class="invalid-feedback" v-if="formErrors.model_id.haveError">
                      {{ formErrors.model_id.message }}
                    </div>
                  </div>
           
                </div>
                
                <div class="d-flex flex-column mt-3 mb-3 pt-2 pb-2 pl-2 pr-2 " style="background-color: #F4F4F4; border: 0.5px solid #dbdbdb;">
                  <div class="d-flex flex-column" id="suppllyProductList">
                    <div class="form-group row customize-row">
                      <div class="col-md-5 pl-0 pr-2"><label class="form-label">Produit<span class="text-danger">*</span></label></div>
                      <div class="col-md-3 pl-0 pr-2"><label class="form-label">Q.U. Disponible</label></div>
                      <div class="col-md-3 pr-0 pr-2"><label class="form-label">Q.U. à transférer<span class="text-danger">*</span></label></div>
                      <div class="col-md-1 d-flex flex-row justify-content-end align-items-center pl-5 pr-0" style="max-width: 40px;"><button @click="addNewRow" id="addProductToSupply" class="btn btn-success btn-sm add"  style="font-size: 10px; width: 32px; height: 32px; display: flex; justify-content: center; align-items: center;" type="button" name="add"><span class="fa fa-plus"></span></button></div>
                    </div>
                    
                    <div v-for="(stockTransferProduct, index) in stockTransfer.stockTransferProducts" :key="index" class="form-group row customize-row">
                      <div class="col-md-5 pl-0 pr-2">
                        <select 
                          @click="getProductQuantityInStock(stockTransfer.stockTransferProducts[index].product_id, stockTransfer.from_stock_id, index)"
                          @change="ensureUniqueProductInStockTransfer(index)"
                          v-model="stockTransfer.stockTransferProducts[index].product_id"
                          class="form-control product-specification" 
                          required>
                          <option value="null" selected>Selectionner un Produit </option>
                          <option v-for="product in products" :key="product.uuid" :value="product.uuid">
                            {{ product.name + " en " + product.conditioning_unit.name + " " + product.sale_unit.name}}
                          </option>
                        </select> 
                      </div>

                      <div class="col-md-3 pl-0 pr-2">
                        <input type="text" v-model="stockTransfer.stockTransferProducts[index].quantity_in_stock" class="form-control" disabled>
                      </div>    

                      <div class="col-md-3 pl-0 pr-2">
                        <input type="number" v-model="stockTransfer.stockTransferProducts[index].quantity_to_transfer" min="1" :max="stockTransfer.stockTransferProducts[index].quantity_in_stock" class="form-control" required/>
                      </div>   

                      <div class="col-md-1 d-flex flex-row justify-content-end align-items-center pl-5 pr-0" style="max-width: 40px;">
                        <button class="btn btn-danger btn-sm remove remove" id="remove-0" @click="removeProductFromStockTransfer(index)" min="formattedExpirationDate"  style="font-size: 10px; width: 32px; height: 32px; display: flex; justify-content: center; align-items: center;" type="button" name="remove">
                          <span class="fa fa-minus"></span>
                        </button>
                      </div>
                    </div>
                  </div>
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
          </id>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { stockService } from "@/_services";
import { stockTransferService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "create-supply",
  data() {
    return {
      stocks: {},
      products: {},
      stockTransfer: {
        model_name: "Stock",
        model_id: null,
        from_stock_id: null,
        stockTransferProducts: [
          {
            product_id: null,
            quantity_in_stock: 0,
            quantity_to_transfer: 1,
          },
        ]   
      },
      total: null,
      formErrors: { 
        model_id: {
          haveError: false,
          message: "",
        },
        from_stock_id: {
          haveError: false,
          message: "",
        },
      },
    };
  },
  mounted() {
    //initialize the select2 feature on my select
    // $('#stockSource').select2();
    // $('#stockDestination').select2();
    // $('.product-specification').select2();

    //get all stocks
    stockService
    .getAllStocks()
    .then((res) => {
      this.stockTransfer.from_stock_id = res.data.data[0].uuid;

      stockService.getAllProductsAvailable(res.data.data[0].uuid)
      .then((res) => {
        this.products = res.data.data;
        this.stockTransfer.stockTransferProducts[0].product_id = this.products[0].uuid;
        stockService
        .getProductQuantity(this.products[0].uuid, this.stocks[0].uuid)
        .then((res) => {
          this.stockTransfer.stockTransferProducts[0].quantity_in_stock = res.data.data.unit_quantity;
        })
        .catch((error) => {
          console.log(error);
        });
      })

      this.stocks = res.data.data;
      
      //set the default destination stock
      for (let i=0 ;i < res.data.data.length; i++){
        if (res.data.data[i].for_pharmacy_sale === 1) {
          this.stockTransfer.model_id = res.data.data[i].uuid;
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
  },
  methods: {
    addNewRow(){
      if (this.stockTransfer.stockTransferProducts.length >= 20) {
        this.$toast.error('Vous ne pouvez transférer plus de vingt produits en même temps!', {
          duration: 5000, // Toast message duration in milliseconds
          position: POSITION.TOP_RIGHT, // Toast message position on the screen
        });
        return; // Exit the function to prevent further execution
      }
      this.stockTransfer.stockTransferProducts.push({
        product_id: null,
        quantity_in_stock: 0,
        quantity_to_transfer: 1,
      });
    },
    removeProductFromStockTransfer(index){
      this.stockTransfer.stockTransferProducts.splice(index, 1);
    },
    resetStockTransfer(){
      this.stockTransfer.stockTransferProducts = [{
        product_id: null,
        quantity_in_stock: 0,
        quantity_to_transfer: 1,
      }];
    },
    getProductQuantityInStock(productIdentifier, stockIdentifier, index){
      stockService
      .getProductQuantity(productIdentifier, stockIdentifier).then((res) => {
        this.stockTransfer.stockTransferProducts[index].quantity_in_stock = res.data.data.unit_quantity;
      })
      .catch((error) => {
        console.log(error);
      });
    },
    ensureUniqueProductInStockTransfer (index) {
      let productExistenceCount = 0;
      let productToBeChecked = this.stockTransfer.stockTransferProducts[index].product_id;

      this.stockTransfer.stockTransferProducts.forEach(product => {
          if (product.product_id == productToBeChecked) {
            productExistenceCount += 1;
          }
      });

      if (productExistenceCount > 1) {
        this.stockTransfer.stockTransferProducts.splice(index, 1);
        this.$toast.error('Vous ne pouvez sélectionner deux fois le même produit pour un transfert de stock.', {
          duration: 5000, 
          position: POSITION.TOP_RIGHT, 
        });
        return; 
      }
    },
    setProduct(stockIdentifier) {
      this.resetStockTransfer();
      stockService.getAllProductsAvailable(stockIdentifier)
      .then((res) => {
        this.products = res.data.data;
        this.stockTransfer.stockTransferProducts[0].product_id = this.products[0].uuid;
        stockService
        .getProductQuantity(this.products[0].uuid, stockIdentifier)
        .then((res) => {
          this.stockTransfer.stockTransferProducts[0].quantity_in_stock = res.data.data.unit_quantity;
        })
        .catch((error) => {
          console.log(error);
        });
      })
    },
    addStockTransfer() {
      // Check if the stock_id field is empty
      if (this.stockTransfer.from_stock_id === "" || this.stockTransfer.from_stock_id === null || this.stockTransfer.from_stock_id == "null") {
        this.formErrors.from_stock_id.message = 'Veuillez sélectionner le stock source.';
        this.formErrors.from_stock_id.haveError = true;
        return;
      }

      if (this.stockTransfer.model_id === "" || this.stockTransfer.model_id === null || this.stockTransfer.model_id == "null") {
        this.formErrors.model_id.message = 'Veuillez sélectionner le stock destination.';
        this.formErrors.model_id.haveError = true;
        return;
      }

      if (this.stockTransfer.from_stock_id == this.stockTransfer.model_id) {
        this.$toast.error('Le stock source ne peut être le même que le stock destination.', {
          duration: 5000, 
          position: POSITION.TOP_RIGHT, 
        });
        return; 
      }

      // Check if there are no products in the list of stock transfer products
      if (this.stockTransfer.stockTransferProducts.length == 0) {
        this.$toast.error('Vous devez ajouter au moins un produit à votre transfert de stock!', {
          duration: 5000, // Toast message duration in milliseconds
          position: POSITION.TOP_RIGHT, // Toast message position on the screen
        });
        return; // Exit the function to prevent further execution
      }

      
      stockTransferService
      .addStockTransfer(this.stockTransfer)
      .then((response) => {
        console.log(response);

        this.$router.push("/transfert/list");
        this.$toast.success("Transfert effectué avec succès !", {
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
      this.$router.push("/transfert/list");
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

.card .card-title {
  text-transform: none !important;
}

</style>

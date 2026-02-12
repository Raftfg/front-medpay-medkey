<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-5 text-center"
              style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)">
              Effectuer une vente
            </h3>

            <form class="forms-sample p-2" style="margin-top: -40px;">
              <fieldset class="scheduler-border col-md-12" style="padding-left: 0px !important; padding-right: 0px !important;">
                <legend class="scheduler-border" style="font-size: medium !important">
                  Informations de vente
                </legend>
                <div class="col-md-12 d-flex flex-row justify-content-between">
                  <div class="form-group form-controls col-md-6 pl-0">
                    <label for="venueId">Numéro IEP</label>
                    <input 
                      type="number" 
                      id="numeroIep"
                      class="form-control" 
                      placeholder="Numéro de Venue"
                      min="0"
                      max="9999999"
                      required
                    />
                  </div>,

                  <div class="form-group form-controls col-md-6 pr-0 pl-0">
                    <label for="stock">Stock<span style="color: red">*</span></label>
                    <select 
                      :class="{ 
                        'form-control': true,
                        'is-invalid': formErrors.sale.stock_id 
                      }" 
                      v-model="sale.stock_id "
                      @change="getStocks(sale.stock_id)"
                      class="form-control" id="store">
                      <option value="null" selected>Selectionner un stock </option>
                      <option v-for="stock in stocks" :key="stock.uuid" :value="stock.uuid">
                        {{ stock.name }}
                      </option>
                    </select>
  
                    <div class="invalid-feedback" v-if="formErrors.sale.stock_id">
                      {{ formErrors.sale.stock_id }}
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset class="scheduler-border container-fluid col-md-12">
                <legend class="scheduler-border" style="font-size: medium !important">
                  Produits
                </legend>
                <div class="d-flex flex-column mt-3 mb-1 p-0">
                  <div class="d-flex flex-column mb-2" id="suppllyProductList">
                    <div class="form-group row customize-row">
                      <div class="col-md-4 pl-0"><label class="form-label">Produit<span class="text-danger">*</span></label></div>
                      <div class="col-md-3"><label class="form-label">Prix unitaire</label></div>
                      <div class="col-md-2"><label class="form-label">Quantité<span class="text-danger">*</span></label></div>
                      <div class="col-md-2 pr-0"><label class="form-label">Date d'expiration</label></div>
                      <div class="col-md-1 pr-0 d-flex justify-content-end"><button id="addProductToSale" class="btn btn-success btn-sm add" style="font-size: 10px;" type="button" name="add"><span class="fa fa-plus"></span></button></div>
                    </div>
                    
                    <div class="form-group row customize-row">
                      <div class="col-md-4 pl-0">
                        <select 
                          :class="{ 
                            'form-control': true,
                            'is-invalid': formErrors.saleProduct.product_specifications_id
                          }" 
                          v-model="saleProducts[0].saleProduct.product_id"
                          class="form-control" id="productSpecification" 
                          style="height: 45px;"
                          required>
                          <option value="null" selected>Selectionner un Produit </option>
                          <option v-for="productSpecification in productSpecifications" :key="productSpecification.uuid" :value="productSpecification.uuid">
                            {{ productSpecification.name }}
                          </option>
                        </select> 
                      </div>

                      <div class="col-md-3">
                        <input type="text" readonly v-model="saleProducts[0].saleProduct.purchase_price" @change="updateTotals" min="0" max="1000000000000" class="form-control" id="purchase_price-1"  required>
                      </div>    
           
                      <div class="col-md-2">
                        <input type="number" v-model="saleProducts[0].saleProduct.quantity" @change="updateTotals" min="1" max="1000000" class="form-control quantity" required>
                      </div>                  
                                    
                      <div class="col-md-2 pr-0">
                        <input type="date" readonly v-model="saleProducts[0].saleProduct.expire_date"  class="form-control" ref="expirationDateInput">
                      </div>                       
                                
                      <div class="col-md-1 pr-0 d-flex justify-content-end">
                        <button class="btn btn-danger btn-sm remove remove" id="remove-0" @click="removeProductFromSale($event, 0)" min="" style="font-size: 10px;  height: 30px;" type="button" name="remove">
                          <span class="fa fa-minus"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="d-flex flex-row mt-3 mb-4 p-2 pr-2 align-items-center justify-content-between" style="background-color: rgb(248, 248, 248); border-radius: 5px;">
                  <label class="col-md-5">Total:</label>
                  <input type="text" style="margin-right: 70px" class="form-control col-md-5" id="price" name="price" v-model="total" placeholder="0" disabled>
                </div>
              </fieldset>
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
import { storeService } from "@/_services";
import { stockService } from "@/_services";
import { productSpecificationService } from "@/_services";
import { saleService } from "@/_services";
import { saleProductService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "create-payement",

  data() {
    return {
      stores: {},
      stocks: {},
      typeProducts: {},
      categories: {},
      productSpecifications: {},
      sale: {
        stock_id: null,
        store_id: null,
        lot_number: "",
        total: null,
      },
      saleProducts: [
        {
          saleProduct: {
            product_id: null,
            units_per_box: 1,
            expire_date: "",
            quantity: 1,
            purchase_price: 0,
            sale_id: null,
          },   
        }
      ],
      total: null,
      formErrors: { 
        sale: {
        stock_id: '',
        store_id: '',
        lot_number: "",
        },
        saleProduct: {
          type_id: "",
        },
        productSpecification: {
          type_id: "",
        },
      },
    };
  },
  
  mounted() {
    //initialize the select2 feature on my select
    $('#store').select2();
    $('#stock').select2();
    $('#typeProduct').select2();
    $('#category').select2();
    $('#productSpecification').select2();

    $('.select2-container .select2-selection--single').height(43);
    $('.select2-container--default .select2-selection--single .select2-selection__rendered').css('line-height','43px');

    $('#stock').change((event) => {
      this.sale.stock_id = event.target.value;
      console.log(event.target.value);
    });

    stockService
    .getAllStocks()
    .then((res) => {
      this.stocks = res.data.data
    })
    .catch((err) => {
      console.log(err);
    });

    // Get a reference to the input element
    const expirationDateInput = this.$refs.expirationDateInput;

    //set the first product expiration date to tomorrow
    this.saleProducts[0].saleProduct.expire_date = this.formattedExpirationDate;

    // Set the minimum date to tomorrow
    expirationDateInput.min = this.formattedExpirationDate;

    // Add an event listener to prevent choosing dates less than tomorrow
    expirationDateInput.addEventListener('input', () => {
      if (expirationDateInput.value < this.formattedExpirationDate) {
        expirationDateInput.value = this.formattedExpirationDate;
      }
    });

    $('#store').on('change', (e) => {
      this.getStocks(e.target.value);
    });

    $('#typeProduct').on('change', (e) => {
      this.getCategories(e.target.value);
    });

    //get all stores
    storeService
    .getAllStores()
    .then((res) => {
      this.stores = res.data.data
      try {
        //get all stocks related to the first element in this.stores
        let firstStoreUuid = this.stores[0].uuid;
        this.sale.store_id = firstStoreUuid;
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
      this.saleProducts[0].saleProduct.product_id = this.productSpecifications[0].uuid;
    })
    .catch((err) => {
      console.log(err);
    });
  },
  methods: {
    addProductToSale(){
      if (this.saleProducts.length >= 50) {
        this.$toast.error('Vous ne pouvez approvisionner plus de cinquante produits en même temps!', {
          duration: 5000, // Toast message duration in milliseconds
          position: POSITION.TOP_RIGHT, // Toast message position on the screen
        });
        return; // Exit the function to prevent further execution
      }

      this.saleProducts.push({
        saleProduct: {
          product_id: null,
          units_per_box: null,
          expire_date: null,
          quantity: null,
          purchase_price: null,
          sale_id: null,
        },
      });

      let saleProductCount = this.saleProducts.length;

      var html = '';
      html += '<div class="form-group row customize-row" style="margin-right: 0px; margin-left: 0px;">';
      html += '<div class="col-md-4 pl-0">';
      html += '<select class="form-control fixed-height" id="product-'+saleProductCount+'" style="height: 45px !important;" required>';
      html += '<option value="null" selected>Selectionner un Produit </option>';
      for (let i=0 ;i < this.productSpecifications.length; i++){
        html += '<option key="'+this.productSpecifications[i].uuid+'" value="'+this.productSpecifications[i].uuid+'">'+ this.productSpecifications[i].name +'</option>';
      }
      html += '</select>';
      html += '</div>';
    
      html += '<div class="col-md-3" style="padding-right: 4px; padding-left: 4px;">'
      html += '<input type="text" disabled min="0" max="1000000000000" value="0" class="form-control" id="purchasePrice-'+saleProductCount+'" required>';
      html += '</div>' 

      html += '<div class="col-md-2" style="padding-right: 4px; padding-left: 4px;">'
      html += '<input type="number" min="1" max="1000000" value="1" class="form-control" id="quantity-'+saleProductCount+'" required>'
      html += '</div>'

      html += '<div class="col-md-2" style="padding-right: 0px; padding-left: 4px;">'
      html += '<input type="date" disabled  class="form-control" value="'+this.formattedExpirationDate+'" min="'+this.formattedExpirationDate+'" id="expire_date-'+saleProductCount+'" required>';
      html += '</div>'

      html += '<div class="col-md-1 pr-0 d-flex justify-content-end">';
      html += '<button class="btn btn-danger btn-sm remove remove" style="font-size: 10px;  height: 30px;" type="button" name="remove" id="remove-'+saleProductCount+'">';
      html += '<span class="fa fa-minus"></span>';
      html += '</button>';
      html += '</div>';

      html += '</div>';
    
      $('#suppllyProductList').append(html);
      
      $('#product-' + saleProductCount).change((event) => this.updateProductIdElement(saleProductCount - 1, event.target.value));
      $('#purchasePrice-' + saleProductCount).change((event) => this.updatePurchasePriceElement(saleProductCount - 1, event.target.value));
      $('#units_per_box-' + saleProductCount).change((event) => this.updateUnitPerBoxElement(saleProductCount - 1, event.target.value));
      $('#quantity-' + saleProductCount).change((event) => this.updateQuantityElement(saleProductCount - 1, event.target.value));
      $('#expire_date-' + saleProductCount).change((event) => this.updateExpireDateElement(saleProductCount - 1, event.target.value));
      $('#remove-' + saleProductCount).on('click', ((event) => this.removeProductFromSale(event, saleProductCount - 1)));
      
      $(document).ready(function () {
        $('#product-' + saleProductCount).select2({
        });
      });  

      $('.fixed-height').css('min-height', '45px !important');
    },

    removeProductFromSale(event, index) {  
      $(event.target).closest('.form-group').remove();
      this.saleProducts.splice(index, 1);
      console.log( this.saleProducts);
    },
    removeProductFromSaleTab(index) {  
      this.saleProducts.splice(index, 1);
    },
    updateProductIdElement(index, value)
    {
      //Before updating the new product added to my sale in my tab I want to prevent the same product from existing twice 
      const productExists = this.saleProducts.some(product => product.saleProduct.product_id === value);
      if (productExists) {
        // If the product_id already exists, remove the newly added tab and line
        this.saleProducts.pop(); // Remove the last item from the array
        $('#product-' + (index + 1)).closest('.form-group').remove();
        //raise an error
        this.$toast.error('Vous ne pouvez sélectionner deux fois le même produit pour un approvisionnement', {
          duration: 5000, // Toast message duration in milliseconds
          position: POSITION.TOP_RIGHT, // Toast message position on the screen
        });
        return; 
      }
      this.saleProducts[index].saleProduct.product_id = value;
    },
    updatePurchasePriceElement(index, value)
    {
      this.saleProducts[index].saleProduct.purchase_price = value;
      this.updateTotals();
    },
    updateUnitPerBoxElement(index, value)
    {
      this.saleProducts[index].saleProduct.units_per_box = value;
    },
    updateQuantityElement(index, value)
    {
      this.saleProducts[index].saleProduct.quantity = value;
      this.updateTotals();
    },
    updateExpireDateElement(index, value)
    {
      this.saleProducts[index].saleProduct.expire_date = value;
    },

    updateTotals() {
      this.total = 0;
      this.saleProducts.forEach((product) => {
        // Assurez-vous que quantity et purchase_price sont des nombres valides
        if (!isNaN(product.saleProduct.quantity) && !isNaN(product.saleProduct.purchase_price)) {
          this.total += product.saleProduct.quantity * product.saleProduct.purchase_price;
        } else {
          // Gérez le cas où l'une des valeurs n'est pas un nombre valide
          this.total += 0; // Ou une autre valeur par défaut
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
      this.$router.push("/sale/list");
    },
    addSale() {
      //Prevent the user to save a sale with no line of products      
      if (this.saleProducts.length == 0) {
        this.$toast.error('Vous devez ajouter au moins un produit à votre approvisionnement!', {
          duration: 5000, // Toast message duration in milliseconds
          position: POSITION.TOP_RIGHT, // Toast message position on the screen
        });
        return; // Exit the function to prevent further execution
      }
      
      this.sale.total = this.total;
      console.log(this.sale);
      saleService
      .addSale(this.sale)
      .then((response) => {
        //Put the value of the sale uuid in all elements of my array
        this.saleProducts.forEach((product) => {
          product.saleProduct.sale_id = response.data.data.uuid;
        });
        console.log(response);

        const promises = this.saleProducts.map((product) => {
          return saleProductService.addSaleProduct(product.saleProduct);
        });

        Promise.all(promises)
        .then((responses) => {
          console.log("All sale products added successfully:", responses);
          // After all products are registered, navigate to "/sale/list"
          this.$router.push("/sale/list");
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
          console.log("Error while adding sale products:", error);
        });
  
        //this.$router.push("/sale/list");
        
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
  },
};
</script>

<style scoped>
.fixed-height
{
  height: 45px;
}
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
.select2-container .select2-selection--single {
  box-sizing: border-box;
  cursor: pointer;
  display: block;
  height: 45px !important;
  user-select: none;
  -webkit-user-select: none;
}

select {
  cursor: pointer;
  height: 43px !important;
}
.text-red {
  color: red !important;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.modal--fullscreen {
  max-width: 90vw;
}

select {
  cursor: pointer;
  height: 43px !important;
}

input[type="radio"].demo6 {
  display: none;
}

input[type="radio"].demo6+label {
  position: relative;
  padding-left: 1.3rem;
}

input[type="radio"].demo6+label::before,
input[type="radio"].demo6+label::after {
  display: block;
  position: absolute;
  box-sizing: border-box;
  content: "";
  border-radius: 1rem;
}

input[type="radio"].demo6+label::before {
  bottom: 0;
  left: 0;
  border: 1px solid #ccc;
  background-color: #eee;
  width: 1rem;
  height: 1rem;
}

input[type="radio"].demo6+label::after {
  bottom: 3px;
  left: 3px;
  width: calc(1rem - 6px);
  height: calc(1rem - 6px);
}

input[type="radio"].demo6:checked+label::after {
  background-color: #45c28e;
}

input[type="checkbox"].demo2 {
  display: none;
}

input[type="checkbox"].demo2+label::before {
  content: "";
  border: 1px solid #45c28e;
  padding: 0 0.6rem;
  margin-right: 0.3rem;
}

input[type="checkbox"].demo2:checked+label::before {
  background-color: #45c28e;
}

fieldset.scheduler-border {
  border: 1px groove #ddd !important;
  padding: 0 1.4em 0.2em 1.4em !important;
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

th,
td {
  text-align: center;
}

th {
  background-color: #d6dbd6;
  border: 1px solid #dee2e6;
}

.container-fluid {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
}

h2,
h4 {
  font-weight: bold;
  margin: 0;
}

.mb-4 {
  margin-bottom: 2rem;
}

img {
  max-width: 100%;
}

table {
  margin-bottom: 1rem;
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
}

input,
select {
  font-weight: bold !important;
  color: rgb(78, 77, 77) !important;
}

select option {
  font-weight: bold !important;
  color: rgb(78, 77, 77) !important;
}

table td,
table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

table th {
  font-weight: bold;
}

table tbody+tbody {
  border-top: 2px solid #ffffff;
}

.table-bordered {
  border: 1px solid #dee2e6;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #dee2e6;
}

.table-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}

.text-right {
  text-align: right;
}

.mt-5 {
  margin-top: 3rem;
}

.text-danger {
  color: #dc3545;
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

</style>

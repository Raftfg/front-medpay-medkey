<template>
  <div class="card">
    <div class="card-body" style=" font-size:13px; ">
      <!-- Actes mésdicaux -->
      <div class="bg-light p-2" style="min-height:50px" >
        <div v-if="actSpinner" class="spinner-border spinner-border-sm text-primary" style="font-size:11px" role="status">
          <span class="sr-only">Loading...</span>
        </div>

        <b> Actes médicaux  </b>  <small class="float-right">
          <a  @click="fetchMedicals()" class="btn btn-sm btn-secondary rounded-pill addbtn" >  +  </a>
        </small>


        <hr class="p-0">

        <div v-if="showActeform"   style="font-size:11px;">
          <form @submit.prevent = "saveMovmentAct()" class="form-inline ">

            <table>
              <tr>
                <td>
                  <select required  class="form-control form-control-sm" id="" v-model="selectedAct" @input="clearError('selectedAct')">
                    <option value="">Actes medicaux</option>
                    <option v-for="act in medicalsacts" :value="act.id" :key="act.id"
                    > {{ act.designation }}
                  </option>
                </select>

              </td>

              <td>
                <input required style="width:80px" v-model ="medical_acts_qte" min="1"  type="number" class="form-control form-control-sm" id="inlineFormInputGroupUsername2" placeholder="Qte">
              </td>

              <td>  <button type="submit" class="btn btn-sm btn-secondary p-1"> <small><i class="fa fa-floppy-o" aria-hidden="true"></i> </small></button>


               <!--<button @click="showActeform=false" type="button" class="btn btn-xs btn-danger p-1"> <small><i class="fa fa-ban" aria-hidden="true"></i></small></button>-->

             </td>

           </td>
         </tr>
       </table>
     </form>
     <br>
   </div>

   <div>
     <ul>
      <li v-for="act in movment_actes" style="font-size:11px;">

        <div class="font-weight-bold"> {{ act.designation }}

          <small v-if="act.paid==0"  class="float-right pt-1">
           <i @click="deleteAct(act.id)" class="fa fa-trash" style="color:red" aria-hidden="true"></i>
         </small>

         <small v-else class="float-right  text-primary">
           <i class="fa fa-check" aria-hidden="true"></i> Payé
         </small>


       </div>

       <div style="margin-top:-7px">
        <small> Qte : <b>{{ act.medical_acts_qte}} </b> </small> &nbsp;  <small> P.U : <b>{{ act.medical_acts_price }} </b> </small> <small>{{ act.status }} </small> <small>{{ act.completd }} </small>
      </div>

    </li>
  </ul>
</div>

</div>

<div class="bg-light p-2 my-2" style="min-height:50px" >

  <div v-if="productSpinner" class="spinner-border spinner-border-sm text-primary" style="font-size:11px" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  <b> Médicaments prescrits  </b>  <small class="float-right">
    <a  @click="fetchProducts()" class="btn btn-sm btn-secondary rounded-pill addbtn" >  +  </a>
  </small>
  <hr class="p-0">

  <div v-if="showProductform"  style="border 1px solid #ccc; ">
    <form @submit.prevent = "saveMovmentProduct()" class="form-inline ">
      <table style="width:90%">
        <tr>
          <td>
            <select required class="form-control form-control-sm"  v-model="selectedProduct" @input="clearError('selectedProduct')">
              <option value=""> <small>Médicaments </small> </option>
              <option v-for="p in products" :value="p.uuid" :key="p.uuid"
              > {{ p.name }}
            </option>
          </select>

        </td>

        <td>
          <input required style="width:80px" v-model ="product_qte" min="1" type="number" class="form-control form-control-sm" id="inlineFormInputGroupUsername3" placeholder="Qte">

        </td>

        <td>

          <button type="submit" class="btn btn-xs btn-secondary p-1"> <small><i class="fa fa-floppy-o" aria-hidden="true"></i></small></button>

          <!-- <button @click="showProductform=false" type="button" class="btn btn-xs btn-danger p-1"> <small><i class="fa fa-ban" aria-hidden="true"></i></small></button>--></td>
        </tr>
      </table>
    </form>
    <br>
  </div>

  <div>
   <ul>
    <li v-for="product in movment_products" style="font-size:11px;" >
      <div class="font-weight-bold">{{ product.name }}
       <small v-if="product.paid==0" class="float-right pt-1"><i @click="deleteProduct(product.id)" class="fa fa-trash" style="color:red" aria-hidden="true"></i> </small>
       <small v-else class="float-right  text-primary">
         <i class="fa fa-check" aria-hidden="true"></i> Payé
       </small>
     </div>
     <div style="margin-top:-7px" >
      <small> Qte : <b>{{ product.medical_acts_qte}} </b> </small>  &nbsp;  <small> Prix Unitaire : <b>{{ product.medical_acts_price }} </b> </small>
    </div>

  </li>
</ul>
</div>
</div>

</div>

</div>
</template>

<script>

import Axios from "@/_services/caller.services";
import { productSpecificationService } from "@/_services";

export default {
  props : ["movment_id","services_id"],
  data() {
    return {

      addedAct: {},
      addedProduct: {},

      movment_actes: [],
      movment_products: [],

      medicalsacts: [],
      products: [],

      showActeform : false,
      showProductform : false,
      actSpinner : false,
      productSpinner : false,


      selectedAct : "",
      medical_acts_qte :"",

      selectedProduct :"",
      product_qte : "",

      formErrors :{}

    };
  },
  mounted() {
    this.getMovemtAttachedActes();
    this.getMovemtAttachedProducts();
  },

  methods: {

/** afficher les actes ajouter au fur et à mesusre  */
    getMovemtAttachedActes() {
      this.actSpinner =true;
      Axios.get("/movments/actes/"+ this.movment_id)
      .then(
        (res) => {
          this.movment_actes = res.data.data;
          this.actSpinner = false;
          console.log(this.movment_actes);
        })
      .catch((error) => {
        console.error(error);
      });
    },

    getMovemtAttachedProducts() {
      this.productSpinner =true;
      Axios.get("/movments/products/"+ this.movment_id)
      .then(
        (res) => {
          this.movment_products = res.data.data;
          this.productSpinner = false;
          console.log(this.movment_products);
        })
      .catch((error) => {
        console.error(error);
      });
    },


/*** poiur les l'enssmebre des cates et produit qu'on peut semlectionner **/
    fetchMedicals() {
      this.showActeform=true;
      Axios.get("/administration/services/actes/"+ this.services_id)
      .then(
        (res) => {
          this.medicalsacts = res.data.data;
          console.log(this.services);
        })
      .catch((error) => {
        console.error(error);
      });
    },

    fetchProducts() {
      this.showProductform=true;
      productSpecificationService.getAllAvailableDrugs()
      .then(
        (res) => {
          this.products = res.data.data;
          console.log(this.products);
        })
      .catch((error) => {
        console.error(error);
      });
    },


// enregitsrement  des les nouvelles actes et prduits à ajouter ///
    saveMovmentAct() {
     this.actSpinner =true;
     Axios.post("/movments/actes/store",{
      movments_id : this.movment_id,
      services_id : this.services_id,
      medical_acts_id : this.selectedAct,
      medical_acts_qte : this.medical_acts_qte,
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
     .then(
      (res) => {
       this.addedAct = res.data.data;
       this.medical_acts_id = "";
       this.medical_acts_qte = "";
       this.showActeform=false;
       this.getMovemtAttachedActes();
       console.log(this.addedAct);
     })
     .catch((error) => {
      console.error(error);
    });

   },

   saveMovmentProduct() {
     this.productSpinner =true;
     Axios.post("/movments/products/store",{
      movments_id : this.movment_id,
      services_id : this.services_id,
      product_id : this.selectedProduct,
      product_qte : this.product_qte,
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
     .then(
      (res) => {
       this.addedProduct = res.data.data;
       this.product_id = "";
       this.product_qte = "";
       this.showProductform=false;
       this.getMovemtAttachedProducts();
       console.log(this.addedAct);
     })
     .catch((error) => {
      console.error(error);
    });
   },

   deleteAct(act_id) {
     this.actSpinner =true;
     Axios.post("/movments/actes/delete",{
      act_id : act_id
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
     .then(
      (res) => {
       this.getMovemtAttachedActes();
       console.log(this.addedAct);
     })
     .catch((error) => {
      console.error(error);
    });
   },


   deleteProduct(act_id) {
     this.productSpinner =true;
     Axios.post("/movments/actes/delete",{
      act_id : act_id
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
     .then(
      (res) => {
       this.getMovemtAttachedProducts();
       console.log(this.addedAct);
     })
     .catch((error) => {
      console.error(error);
    });
   },


   clearError(field) {
    this.formErrors[field] = "";
  },


}

};



</script>

<style>
.addbtn { padding:0px 5px; }

</style>

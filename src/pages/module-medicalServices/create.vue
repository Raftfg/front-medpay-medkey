<template>
  <section class="container-scroller">

    <!-- <h4 class="card-title">Liste des actes médicaux</h4> -->


    <div class="row">
      <div class="col-lg-11 grid-margin">

       <div class="card">
         <div class="card-body">
          <b>Actes médicaux - {{service.name}}</b>

          <div v-if="servicesSpinner" class="spinner-border spinner-border-sm text-primary" style="font-size:11px" role="status">
            <span class="sr-only">Loading...</span>
          </div>

          <small class="float-right">
            <a @click="showform=true; getLasCodeActe();"  class="btn btn-sm btn-secondary rounded-pill addbtn" >  +  </a>
          </small>

          <br>

          <div  v-if="showform" class="p-3 mt-2 bg-light"  style="font-size:11px; ">
            <form @submit.prevent = "saveActe()" class="">

              <div class="row">

               <div class="col-md-2">
                 <input  readonly v-model ="acte.code"  type="text" class="form-control  form-control-sm"  required placeholder="Code *">
               </div>
               <div class="col-md-3">
                <input required v-model ="acte.designation"  type="text" class="form-control  form-control-sm"  required placeholder="designation *">
              </div>

              <div class="col-md-3">
               <input required v-model ="acte.price"  type="number" min="100" class="form-control  form-control-sm"  required placeholder="Prix. U *">
             </div>

             <div class="col-md-2">
               <select required class="form-control form-control-sm mb-3"  v-model="acte.type_medical_acts_id"  >
                <option disabled value="">Sélectionnez le type </option>
                <option v-for="typeacte in typeactes" :value="typeacte.id" :key="typeacte.id"
                > {{ typeacte.designation }}
              </option>
            </select>
          </div>

          <div class="col-md-2">
            <button type="submit" class="btn btn-sm btn-secondary p-1"> <small><i class="fa fa-floppy-o" aria-hidden="true"></i></small></button>
            <button @click="showform=false" type="button" class="btn btn-xs btn-danger p-1"> <small><i class="fa fa-ban" aria-hidden="true"></i></small></button>
          </div>

        </div>

      </form>
    </div>
    <br>

    <div class="p-3">
      <table class="table" width="100%">
        <tr class="bg-light">
          <th>Code</th>
          <th>Libellé</th>
          <th class="text-right">Prix</th>
          <th></th>
        </tr>
        <tr v-for="acte in actes" >
          <td class="p-2"> <b>{{ acte.code }} </b></td>
          <td class="p-2"> {{ acte.designation }} </b></td>
          <td align="right"> {{ acte.price }} </td>
          <td class="text-right">
           <small class="float-right pt-1"><i @click="deleteActes(acte.id)" class="fa fa-trash" style="color:red" aria-hidden="true"></i> </small>
         </td>
       </tr>
     </table>


   </div>
 </div>


</div>
</div>
</div>
<button @click="$router.go(-1)" type="button" class="btn btn-sm btn-danger btn-medpay-green-small  mr-2">
  Retour
</button>
</section>
</template>


<script>

import Axios from "@/_services/caller.services";
import serviceService from "@/_services";

export default {

  name: "Actes",
  props : ["services_id"],
  data() {
    return {
      showform: false,
      servicesSpinner: false,
      actes: [],
      lastCode : "",
      typeactes: [],
      formErrors : {},
      service : "",
      acte : {
        code:"",
        designation:"",
        price:"",
        services_id:"",
        type_medical_acts_id:""
      }

    };
  },

  mounted() {
    this.fetchMedicalsActsByService();
    this.fetchTypeActes();

  },


  methods: {

    fetchTypeActes() {
      Axios.get("/administration/typesactes")
      .then(
        (res) => {
          this.typeactes = res.data.data;
          console.log(this.typeactes);
        })

      .catch((error) => {
        console.error(error);
      });
    },

    fetchMedicalsActsByService() {
      this.servicesSpinner = true;
      Axios.get("/actes-by-services/"+ this.services_id)
      .then(
        (res) => {
          this.actes = res.data.data;
          this.service = res.data.service;
          this.servicesSpinner = false;
          console.log(this.actes);
        })
      .catch((error) => {
        console.error(this.formErrors);
      });
    },

    getLasCodeActe()
    {
      Axios.get("/administration/actes/lastcode/"+ this.services_id)
      .then(
        (res) => {
          this.acte.code = res.data.data;
        })
      .catch((error) => {
        console.error(this.formErrors);
      });
    },


    saveActe() {
      this.servicesSpinner = true;
      Axios.post("/administration/actes",{
        code: this.acte.code,
        designation: this.acte.designation,
        price: this.acte.price,
        services_id: this.services_id,
        type_medical_acts_id: this.acte.type_medical_acts_id
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(
        (res) => {
         this.newActe = res.data.data;
         this.actes.push(this.newActe)
         this.acte.code = "";
         this.acte.designation = "";
         this.acte.price = "";
         this.showform = false;
         this.servicesSpinner = false;
         console.log(this.newActe);
       })
      .catch((error) => {
        console.error(error);
      });

    },

    deleteActes(id) {
      this.servicesSpinner = true;
      Axios.post("/administration/actes/delete",{
        id : id
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(
        (res) => {
         this.fetchMedicalsActsByService();
         this.servicesSpinner = false;
       })
      .catch((error) => {
        console.error(error);
      });
    },
  }

};


</script>


<style>
.addbtn { padding:0px 5px; background-color:green }

</style>

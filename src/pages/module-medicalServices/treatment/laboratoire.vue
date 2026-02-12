
<template>
  <section class="container-scroller">

    <div class="row">
      <div class="col-lg-12 grid-margin">

       <div class="card">
         <div class="card-body">

          <div v-if="servicesSpinner" class="spinner-border spinner-border-sm text-primary" style="font-size:11px" role="status">
            <span class="sr-only">Loading...</span>
          </div>

          <small class="">
            <a @click="showform=true"  class="btn btn-sm btn-secondary btn-medpay-green-small addbtn  " >  Nouvel examen  </a>
          </small>

          <br>

          <div  v-if="showform" class="p-3 mt-2 bg-light"  style="font-size:11px; ">
            <form @submit.prevent = "saveOperation()" class="">
              <div class="row">
                <div class="col-md-6 mt-2">
                 <select class="form-control form-control-sm" v-model="operation.act_code">
                  <option disabled value="">Choisisez l'examen à réaliser  </option>
                  <option v-for="act in medicalsacts" :value="act.code" :key="act.code"
                  > {{ act.designation }}
                </option>
              </select>
            </div>

            <div class="col-md-6 mt-2">
              <select class="form-control form-control-sm" id="" v-model="operation.intrant">
                <option  value=""> Choisisez le type de  prélèvement </option>
                <option  value="Sérum">Sérum </option>
                <option  value="LCS">LCS</option>
                <option  value="Urine">Urine  </option>
              </option>
            </select>
          </div>

          <div class="col-md-6 mt-2">
           <input required v-model ="operation.param"  type="text" class="form-control  form-control-sm"  required placeholder="Les paramètres de réalisation *">
         </div>

         <div class="col-md-6 mt-2">
           <input required v-model ="operation.value"  type="text" class="form-control  form-control-sm"  required placeholder=" Résultat (valeur trouvée) *">
         </div>

         <div class="col-md-6 mt-2">
           <input required v-model ="operation.ref_value"  type="text" class="form-control  form-control-sm"  required placeholder="Valeur de référence pour de examen ">
         </div>

         <div class="col-md-6 mt-2">
           <input required v-model ="operation.unit"  type="text" class="form-control  form-control-sm"  required placeholder="Unité de mesure ">
         </div>

         <div class="col-md-6 mt-2">
           <textarea required v-model ="operation.summary"   class="form-control  form-control-sm"  required placeholder="Interpretation *"> </textarea>
         </div>

         <div class="col-md-6 mt-2">
                   <select class="form-control"  id="" v-model="operation.operator"  >
            <option value="" >Réalisé par</option>
            <option v-for="employer in employers" :value="employer.uuid" > {{ employer.last_name }} {{ employer.first_name }} </option>
          </select>
        </div>

        <div class="col-md-12 mt-2 text-right">
          <button type="submit" class="btn btn-sm btn-secondary p-1"> <small><i class="fa fa-floppy-o" aria-hidden="true"></i></small></button>
        </div>
      </div>

    </form>
  </div>

</div>
<br>

<div class="p-3">
  <p> <b>Examens du patient </b></p>
  <table class="table table-bordered table-striped">

    <thead>
     <tr>
      <th>#</th>
      <th>Examen</th>
      <th>Prélèvement</th>
      <th>Paramètres</th>
      <th>Val. Trouvée</th>
      <th>Val. de Reférence</th>
      <th>Unité</th>
      <th>Observation </th>
    </tr>

  </thead>
  <tbody>
    <tr v-for="(operation, index) in operations">
     <td> {{index +1}} </td>
     <td>{{operation.act_code}} {{operation.actname}}</td>
     <td>{{operation.intrant}}</td>
     <td>{{operation.param}}</td>
     <td>{{operation.value}}</td>
     <td>{{operation.ref_value}}</td>
     <td>{{operation.unit}}</td>
     <td>{{operation.summary}}</td>
   </tr>
 </tbody>

</table>



</div>
</div>


</div>
</div>
</div>

</section>
</template>


<script>

import Axios from "@/_services/caller.services";
import { medicalServices_services } from "@/_services/medicalServices_services";
import { employerService } from "@/_services";

export default {


  name: "Chirurgie",
  props : ["movment_id", "services_id"],

  data() {
    return {
      showform: false,
      servicesSpinner: false,

      operations: [],
      employers: [],

      medicalsacts: [],
      operator: "",

      operation: {
        act_code:"",
        intrant:"",
        param:"",
        value:"",
        ref_value:"",
        unit:"",
        summary:"",
        operator:"",
        "movments_id" : this.movment_id,
        "services_id" : this.services_id
      }

    };
  },

  mounted() {
    this.fetchOperations();
    this.fetchMedicals();
    employerService.getAllEmployers().then((res) => {
      this.employers = res.data.data;
    });

  },

  methods: {

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

    fetchOperations() {

      this.servicesSpinner = true;
      const params = {
        "movments_id" : this.movment_id,
        "services_id": this.services_id,
      }

      medicalServices_services.getLaboratoireRecords(params)
      .then(
        (res) => {
          this.operations = res.data.data;
          this.servicesSpinner = false;
          console.log(this.operations);
        })
      .catch((error) => {
        console.error(this.formErrors);
      });
    },

    saveOperation() {
      this.servicesSpinner = true;
      medicalServices_services.addLaboratoireRecords(this.operation)
      .then(
        (res) => {
         this.newOperation = res.data.data;
         this.operations.push(this.newOperation)
         this.showform = false;
         this.servicesSpinner = false;
         console.log(this.newOperation);
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






<template>
  <section class="container-scroller">

    <div class="row">
      <div class="col-lg-12 grid-margin">

       <div class="card">
         <div class="card-body">

          <div v-if="servicesSpinner" class="spinner-border spinner-border-sm text-primary" style="font-size:11px" role="status">
            <span class="sr-only">Loading...</span>
          </div>

          <small class="float-right">
            <a @click="showform=true"  class="btn btn-sm btn-secondary rounded-pill addbtn" >  Nouvelle Opération  </a>
          </small>

          <br>

          <div  v-if="showform" class="p-3 mt-2 bg-light"  style="font-size:11px; ">

            <form @submit.prevent = "saveOperation()" class="">

              <div class="row">

                <div class="col-md-6 mt-2">
                 <select class="form-control form-control-sm" id="" v-model="operation.act_code">
                  <option value="">Sélectionnez l'opération </option>
                  <option v-for="act in medicalsacts" :value="act.code" :key="act.code"
                  > {{ act.designation }}
                </option>
              </select>
            </div>

            <div class="col-md-6 mt-2">
              <input required v-model ="operation.reason"  type="text" class="form-control  form-control-sm"  required placeholder="Objet de l'opération *">
            </div>

            <div class="col-md-12 mt-2">
             <textarea required v-model ="operation.description"  type="text" class="form-control  form-control-sm"  required placeholder="decription de l'opération  *"> </textarea>
           </div>

           <div class="col-md-12 mt-1">
            <select class="form-control"  id="" v-model="operation.result"  >
              <option value="" >Resultat</option>
              <option value="SUCCESS" >SUCCES</option>
              <option value="COMPLICATION"> COMPLICATION</option>
              <option value="FAILED" >ECHEC </option>
            </select>


          </div>
          <div class="col-md-12 mt-2">
            <select class="form-control"  id="" v-model="operation.operator"  >
              <option value="" >Réalisé par</option>
              <option v-for="employer in employers" :value="employer.uuid" > {{ employer.last_name }} {{ employer.first_name }} </option>
            </select>
          </div>

          <div class="col-md-12 mt-2">
           <textarea required v-model ="operation.summary"   class="form-control  form-control-sm"  required placeholder="Observation *"> </textarea>
         </div>

         <div class="col-md-12 mt-1 text-right">
          <button type="submit" class="btn btn-sm btn-secondary p-1"> <small><i class="fa fa-floppy-o" aria-hidden="true"></i></small></button>

          <button @click="showform=false" type="button" class="btn btn-xs btn-danger p-1"> <small><i class="fa fa-ban" aria-hidden="true"></i></small></button>
        </div>
      </div>

    </form>
  </div>

</div>
<br>

<div class="p-3">
  <p> <b>Opérations chirurgicales réalisées ( {{ operations.length }} )</b></p>
  <table class="table" width="90% !important">
    <tr v-for="operation in operations">
      <td>
        <b> {{operation.act_code}} - {{operation.actname}} </b>
        <p> <small> {{operation.reason}} </small>  </p>
        <p> <small> {{operation.decription}} </small>  </p>
      </td>
      <td>


        <span v-if="operation.result == 'SUCCESS' " class="badge badge-success">SUCCES</span>
        <span v-if="operation.result == 'COMPLICATION' " class="badge badge-info">COMPLICATION</span>
        <span v-if="operation.result == 'FAILED' " class="badge badge-danger">ECHEC</span>


        <p><small>Opération effectué par  {{operation.operatorname}}</small></p>
      </td>

    </tr>


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

      medicalsacts: [],
      operator: "",

      operation: {
        act_code:"",
        reason:"",
        description:"",
        result:"",
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

      medicalServices_services.getChirurgieRecords(params)
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
      medicalServices_services.addChirurgieRecords(this.operation)
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



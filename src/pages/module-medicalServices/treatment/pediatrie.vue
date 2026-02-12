<template>
  <div class=" pt-1  rounded">
    <div class="card">
      <div class="card-body" >
        <form @submit.prevent = "savePediatrie()">
          <b>Motif * </b>
          <input required v-model="pediatrie.reason"  v-text="pediatrie.reason" size="255" class="form-control form-control-sm" >
          <br>

          <b> Plaintes * </b>

          <textarea class="form-control" v-model="pediatrie.complaint" v-html="pediatrie.complaint">
           {{pediatrie.complaint}}
         </textarea>

         <br>

         <b> Soins administrés *  </b>

         <textarea class="form-control" v-model="pediatrie.actions">
          {{pediatrie.actions}}
        </textarea>

        <br>

        <b> Traitement complémentaire  </b>

        <textarea class="form-control" v-model="pediatrie.observation">
          {{pediatrie.observation}}
        </textarea>


        <br>

        <b> Conclusions *  </b>

        <textarea class="form-control" v-model="pediatrie.summary">
          {{pediatrie.summary}}
        </textarea>

        <br>

        <b>Personnel soignant * </b>
        <select required class="form-control"  id="" v-model="operator"  >
          <option value=""></option>
          <option v-for="employer in employers" :value="employer.uuid" > {{ employer.last_name }} {{ employer.first_name }} </option>
        </select>
        <br>


        <!-- <button class="btn btn-sm addbtn text-white "> <small> <i class="fa fa-file-pdf-o" aria-hidden="true"></i>   Fiche de soins </small> </button>-->

        <button type="submit" class="btn btn-sm btn-secondary py-1 float-right"> <small>
          <div v-if="pediatrieSpinner" class="spinner-border spinner-border-sm text-white" style="font-size:11px" role="status">
            <span class="sr-only">Loading...</span>
          </div>

          <i class="fa fa-floppy-o" aria-hidden="true"></i> Enregistrer</small></button>

        </form>
      </div>
    </div>

  </div>

</div>




</template>

<script>

import Axios from "@/_services/caller.services";
import { useToast, POSITION } from "vue-toastification";
import { medicalServices_services } from "@/_services/medicalServices_services";
import { employerService } from "@/_services";

export default {

  name: "Pediatrie",

  props : ["movment_id", "services_id"],

  data() {
    return {
      showform: false,
      pediatrieSpinner: false,
      employers: [],
      operator:"",
      own_movment_id:  this.movment_id,
      own_services_id:  this.services_id,

      pediatrie: {
        services_id: this.own_services_id,
        movments_id: this.own_movment_id,
        reason:"",
        complaint:"",
        actions:"",
        observation:"",
        summary:"",
      },

    };
  },

  mounted() {
    employerService.getAllEmployers().then((res) => {
      this.employers = res.data.data;
    });

 this.getServiceMovemt();
  },

  methods: {

    getServiceMovemt() {
      const params = {
      "movments_id" : this.own_movment_id,
      "services_id" : this.own_services_id
    };

     medicalServices_services.getPediatrieRecord(params)
      .then(
        (res) => {
          this.pediatrie = res.data.data;
          console.log(this.pediatrie);

        })
      .catch((error) => {
        console.error(error);
      });
    },


    savePediatrie(){
     this.pediatrieSpinner = true;

     const params = {
      "reason" : this.pediatrie.reason,
      "complaint": this.pediatrie.complaint,
      "actions" :this.pediatrie.actions,
      "observation" : this.pediatrie.observation,
      "parent": this.pediatrie.parent,
      "summary" : this.pediatrie.summary,
      "operator" : this.operator,
      "movments_id" : this.own_movment_id,
      "services_id" : this.own_services_id
    };



    medicalServices_services.addPediatrieRecords(params)
    .then(
      (res) => {
        this.pediatrie = res.data.data;
        this.operator =  this.pediatrie.operator;
        this.pediatrieSpinner =  false;

        this.$toast.success("Enregitrement bien effectué !", {
          position: POSITION.TOP_RIGHT,
          timeout: 6000,
          bodyStyle: {
            borderRadius: "10px",
            backgroundColor: "#f0f0f0",
            color: "#333",
            fontWeight: "bold",
          },
        });

        console.log(this.pediatrie);
      })
    .catch((error) => {
      console.error(error);
    });

  },


},
};




</script>


<style>
.addbtn { padding:0px 5px; }

</style>

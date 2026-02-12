<template>

  <div class=" pt-1 rounded">
    <div class="card">
      <div class="card-body" >
        <form @submit.prevent="saveUrgences()">

          <b>Catégorie d'urgences *</b>
          <select class="form-control"  v-model="urgence.category" @change="getGravites()" >
            <option value=""></option>
            <option v-for="(item, index) in categories" :value="index" > {{ index }} </option>
          </select>
          <br>
          <b>Gravité * </b>

          <select class="form-control" v-model="urgence.level">
            <option v-for="(gravite, index) in gravites" :value="gravite" > {{ gravite }} </option>
          </select>


          <br>
          <b>Description du cas *</b>
          <textarea v-model="urgence.description" class="form-control">{{urgence.description}}</textarea>
          <br>

          <b>Mesures d'urgences (1er soins ) * </b>
          <textarea v-model="urgence.emergency_actions" class="form-control">{{urgence.emergency_actions}}</textarea>

          <br>
          <b>Personne de contact *    </b>
          <textarea v-model="urgence.parent" class="form-control">{{urgence.parent}}</textarea>

          <br>
          <b>Conclusion * </b>
          <textarea v-model="urgence.summary" class="form-control">{{urgence.summary}}</textarea>

          <br>
          <b>Personnel soignant *  </b>

          <select class="form-control"  v-model="urgence.operator" required >
            <option value=""></option>
            <option v-for="employer in employers" :value="employer.uuid" > {{ employer.last_name }} {{ employer.first_name }} </option>
          </select>
          <br>
          <div class="col-md-12 mt-1 text-right">

            <button type="submit" class="btn btn-sm btn-secondary p-1">
<div v-if="urgenceSpinner" class="spinner-border spinner-border-sm text-white" style="font-size:11px" role="status">
              <span class="sr-only">Loading...</span>
            </div> &nbsp;

              <small><i class="fa fa-floppy-o" aria-hidden="true"></i> Enregistrer</small>


            </button>
          </div>
        </form>
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

  name: "Urgences",

  props : ["movment_id", "services_id"],
  data() {
    return {
      employers: [],
      categories: [],
      selectCategory: "",
      selectLevel: "",
      gravites: [],

      own_movment_id:  this.movment_id,
      own_services_id:  this.services_id,

      urgenceSpinner:false,

      urgence:{
        category: "",
        level:"",
        description:"",
        emergency_actions:"",
        parent:"",
        summary:"",
        operator:""
      },

    };
  },

  mounted() {

   employerService.getAllEmployers().then((res) => {
    this.employers = res.data.data;
  });

   this.getServiceMovemt();

   medicalServices_services.getUrgencesCategories().then(
    (res) => {
      this.categories = res.data.data;
      console.log(this.categories);
    })
   .catch((error) => {
    console.error(error);
  });

 },

 methods: {

    getServiceMovemt() {
      const params = {
      "movments_id" : this.own_movment_id,
      "services_id" : this.own_services_id
    };

     medicalServices_services.getUrgenceRecord(params)
      .then(
        (res) => {
          this.urgence = res.data.data;
          console.log(this.urgence);

        })
      .catch((error) => {
        console.error(error);
      });
    },


  saveUrgences(){

    this.urgenceSpinner = true;


    const params = {
      "category" : this.urgence.category,
      "level": this.urgence.level,
      "emergency_actions" :this.urgence.emergency_actions,
      "description" : this.urgence.description,
      "parent": this.urgence.parent,
      "summary" : this.urgence.summary,
      "operator" : this.urgence.operator,
      "movments_id" : this.own_movment_id,
      "services_id" : this.own_services_id
    };


    medicalServices_services.addUrgencesRecords(params)
    .then(
      (res) => {
        this.urgence = res.data.data;
        console.log(this.urgence);

        this.urgenceSpinner =  false;

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
      })
    .catch((error) => {
      console.error(error);
    });

  },



  getGravites(){
    const params = { "code" : this.urgence.category};
    medicalServices_services
    .getUrgencesGravites(params)
    .then(
      (res) => {
        this.gravites = res.data.data;
        console.log(this.gravites);
      })
    .catch((error) => {
      console.error(error);
    });

  },




}


};




</script>


<style>
.addbtn { padding:0px 5px; }

</style>

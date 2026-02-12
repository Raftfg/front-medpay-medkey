<template>

  <div class="bg-light pt-1 px-2 rounded">
    <div class="pb-2" >
      Antécédents

      <div v-if="historySpinner" class="spinner-border spinner-border-sm text-primary" style="font-size:11px" role="status">
        <span class="sr-only">Loading...</span>
      </div>

      <small class="float-right">
        <a @click="showform=true"  class="btn btn-sm btn-secondary rounded-pill addbtn" >  +  </a>
      </small>
    </div>


    <div v-if="showform" class="pt-2"  style="font-size:11px;">
      <form @submit.prevent = "saveAntecedent()" class="">

        <input v-model ="name"  type="text" class="form-control form-control-sm"  required placeholder="Titre *">
        <!--<span style="color : red" v-if="error">{{error.errors.name}}</span>-->
        <br>
        <textarea  v-model ="description"  class="form-control pt-2" placeholder="Description"> </textarea>
        <br>
        <select class="form-control"  v-model="type">
          <option value="">Choisissez le type </option>
          <option value="Familial">Familial </option>
          <option value="Personnel"> Personnel</option>
        </select>

        <div class="pt-2 text-right">
          <button type="submit" class="btn btn-sm btn-secondary p-1"> <small><i class="fa fa-floppy-o" aria-hidden="true"></i></small></button>
          <button @click="showform=false" type="button" class="btn btn-xs btn-danger p-1"> <small><i class="fa fa-ban" aria-hidden="true"></i></small></button></td>
        </div>
      </form>
      <br>
    </div>

    <div>

     <ul>
      <li v-for="historie in histories" style="font-size:11px;">
        <div class="font-weight-bold"> {{ historie.name }}  <small class="float-right pt-1"><i @click="deleteHistory(historie.id)" class="fa fa-trash" style="color:red" aria-hidden="true"></i> </small> </div>
        <div style="margin-top:-7px">
          {{ historie.type }}
        </div>
      </li>
    </ul>
  </div>

</div>


</div>

</template>

<script>

import Axios from "@/_services/caller.services";

export default {

  name: "patientHistoy",
  props : ["movment_id", "services_id"],
  data() {
    return {
      showform: false,
      historySpinner: false,
      histories: [],
      description:"",
      type:"",
      movment :{},
      name:"",
    };
  },

  mounted() {
    this.getMovemt();
  },


  methods: {
   getMovemt() {
    Axios.get("/movments/"+ this.movment_id)
    .then(
      (res) => {
        this.movment = res.data.data;
        this.getHistories(this.movment.patients_id);
        console.log(this.movment);
      })
    .catch((error) => {
      console.error(error);
    });
  },

    getHistories(patients_id) {
      this.historySpinner=true;
      Axios.get("/antecedents?patients_id="+ patients_id)
      .then(
        (res) => {
          this.histories = res.data.data;
          this.historySpinner=false;
          console.log(this.histories);
        })
      .catch((error) => {
        console.error(error);
      });
    },

    saveAntecedent() {
       this.historySpinner=true;
      Axios.post("/antecedents",{
        name : this.name,
        type : this.type,
        patients_id : this.movment.patients_id,
        description : this.description,
        movments_id : this.movment_id,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(
        (res) => {
         this.newHistory = res.data.data;
         this.histories.push(this.newHistory)
          this.historySpinner=false;
         this.name = "";
         this.description = "";
         this.type = "";
         this.showform = false;
         console.log(this.newHistory);
       })
      .catch((error) => {
        console.error(error);
      });

    },


     deleteHistory(id) {
       this.historySpinner=true;
      Axios.post("/antecedents/delete",{
        id : id
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(
        (res) => {
          this.getHistories(this.movment.patients_id);
          this.historySpinner=false;
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

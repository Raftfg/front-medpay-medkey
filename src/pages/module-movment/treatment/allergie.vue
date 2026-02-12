<template>
  <div class="bg-light pt-1 px-2 rounded">
    <div class="pb-2" >
      Allergies

      <div v-if="allergiesSpinner" class="spinner-border spinner-border-sm text-primary" style="font-size:11px" role="status">
        <span class="sr-only">Loading...</span>
      </div>

      <small class="float-right">
        <a @click="showform=true"  class="btn btn-sm btn-secondary rounded-pill addbtn" >  +  </a>
      </small>
    </div>


    <div  v-if="showform" class="pt-2"  style="font-size:11px;">
      <form @submit.prevent = "saveAllergies()" class="">

        <input v-model ="name"  type="text" class="form-control form-control-sm"  required placeholder="Titre *">
        <!--<span style="color : red" v-if="error">{{error.errors.name}}</span>-->
        <br>
        <textarea   v-model ="description"  class="form-control pt-2" placeholder="Commentaire"> </textarea>

        <div class="pt-2 text-right">
          <button type="submit" class="btn btn-sm btn-secondary p-1"> <small><i class="fa fa-floppy-o" aria-hidden="true"></i></small></button>

          <button @click="showform=false" type="button" class="btn btn-xs btn-danger p-1"> <small><i class="fa fa-ban" aria-hidden="true"></i></small></button></td>
        </div>
      </form>
    </div>

    <div>

     <ul>
      <li v-for="allergie in allergies" style="font-size:11px;">
        <div class="font-weight-bold"> {{ allergie.name }}  <small class="float-right pt-1"><i @click="deleteAllergie(allergie.id)" class="fa fa-trash" style="color:red" aria-hidden="true"></i> </small>
         </div>
        <div style="margin-top:-7px">
          {{ allergie.description }}
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

  name: "Allergie",

  props : ["movment_id", "services_id"],
  data() {
    return {
      showform: false,
      allergiesSpinner: false,
      allergies: [],
      description:"",
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
        this.getAllergies(this.movment.patients_id);
        console.log(this.movment);

      })
    .catch((error) => {
      console.error(error);
    });
  },

  getAllergies(patients_id) {
    this.allergiesSpinner = true;
    Axios.get("/allergies?patients_id="+ patients_id)
    .then(
      (res) => {
        this.allergies = res.data.data;
         this.allergiesSpinner = false;
        console.log(this.allergies);
      })
    .catch((error) => {
      console.error(error);
    });
  },

  saveAllergies() {
    this.allergiesSpinner = true;
    Axios.post("/allergies",{
      name : this.name,
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
       this.newAllergie = res.data.data;
       this.allergies.push(this.newAllergie)
       this.name = "";
       this.description = "";
       this.showform = false;
       this.allergiesSpinner = false;
       console.log(this.newAllergie);
     })
    .catch((error) => {
      console.error(error);
    });

  },

  deleteAllergie(id) {
    this.allergiesSpinner = true;
    Axios.post("/allergies/delete",{
      id : id
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(
      (res) => {
        this.getAllergies(this.movment.patients_id);
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

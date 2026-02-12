<template>

  <div class="bg-light pt-1 px-2 rounded">
    <div class="pb-2" >
      Mode de vie

      <div v-if="livstyleSpinner" class="spinner-border spinner-border-sm text-primary" style="font-size:11px" role="status">
        <span class="sr-only">Loading...</span>
      </div>

      <small class="float-right">
        <a @click="showlfform=true"  class="btn btn-sm btn-secondary rounded-pill addbtn" >  +  </a>
      </small>
    </div>


    <div v-if="showlfform" class="pt-2"  style="font-size:11px;">
      <form @submit.prevent = "saveLivestyles()" class="">

        <select class="form-control" v-model ="livestyle.name">
          <option value="">Choisissez </option>
          <option value="Tabac">Tabac </option>
          <option value="Alcool"> Alcool</option>
          <option value="Cigarette"> Cigarette</option>
          <option value="Autre"> Autres addictions</option>
        </select>

        <br>
        <textarea   v-model ="livestyle.description"  class="form-control pt-2" placeholder="Commentaire"> </textarea>

        <div class="pt-2 text-right">
          <button type="submit" class="btn btn-sm btn-secondary p-1"> <small><i class="fa fa-floppy-o" aria-hidden="true"></i></small></button>

          <button @click="showlfform=false" type="button" class="btn btn-xs btn-danger p-1"> <small><i class="fa fa-ban" aria-hidden="true"></i></small></button></td>
        </div>

      </form>

    </div>

    <div>
     <ul>
      <li v-for="livestyle in livestyles" style="font-size:11px;">
        <div class="font-weight-bold"> {{ livestyle.name }}  <small class="float-right pt-1"><i @click="deleteLyfestyle(livestyle.id)" class="fa fa-trash" style="color:red" aria-hidden="true"></i> </small> </div>
        <div style="margin-top:-7px">
          {{ livestyle.description }}
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

  name: "Livestyle",
  props : ["movment_id", "services_id"],

  data() {
    return {
      showlfform: false,
      livstyleSpinner: false,
      livestyles: [],

      movment :{},

      livestyle: {
       name:"",
       description:""
     }

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
      this.getlivestyles(this.movment.patients_id);
      console.log(this.movment);
    })
  .catch((error) => {
    console.error(error);
  });
},

getlivestyles(patients_id) {
  this.livstyleSpinner=true;
  Axios.get("/livestyles?patients_id="+ patients_id)
  .then(
    (res) => {
      this.livestyles = res.data.data;
      this.livstyleSpinner=false;
      console.log(this.livestyles);
    })
  .catch((error) => {
    console.error(error);
  });
},

saveLivestyles() {
  this.livstyleSpinner=true;

  Axios.post("/livestyles",{
    name : this.livestyle.name,
    description : this.livestyle.description,
    patients_id : this.movment.patients_id,
    movments_id : this.movment_id,
  },
  {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(
    (res) => {
     this.newLivestyle = res.data.data;
     this.livestyles.push(this.newLivestyle)
     this.livstyleSpinner=false;
     this.name = "";
     this.description = "";
     this.showlfform = false;
     console.log(this.newLivestyle);
   })
  .catch((error) => {
    console.error(error);
  });

},

deleteLyfestyle(id) {
  this.livstyleSpinner=true;
  Axios.post("/livestyles/delete",{
    id : id
  },
  {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(
    (res) => {
      this.getlivestyles(this.movment.patients_id);
      this.livstyleSpinner=false;
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

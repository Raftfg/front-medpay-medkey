<template>
  <div class="bg-light pt-1 px-2 rounded">
    <div class="pb-2" >
      Données du suivi

      <div v-if="measurementSpinner" class="spinner-border spinner-border-sm text-primary" style="font-size:11px" role="status">
        <span class="sr-only">Loading...</span>
      </div>

      <small class="float-right">
        <a  @click="showlfform=true"  class="btn btn-sm btn-secondary rounded-pill addbtn" >  +  </a>
      </small>
    </div>


    <div v-if="showlfform" class="pt-2"  style="font-size:11px;">
      <form @submit.prevent = "saveMeasurements()" class="">

        <select class="form-control" v-model ="measurement.name">
          <option value="">Choisissez </option>
          <option value="Tension">Tension </option>
          <option value="Poids">Poids</option>
          <option value="Taille">Taille</option>
        </select>
        <br>
        <input v-model ="measurement.value" class="form-control form-control-sm" type="text" >
        <br>
        <select  class="form-control pt-1"  v-model ="measurement.code">
          <option value="">Choisissez </option>
          <option value="KG">KG </option>
          <option value="HTZ"> HTZ</option>
          <option value="P/T"> P/T </option>

        </select>

        <div class="py-1 text-right">
          <button style="padding: 0px 5px;" type="submit" class="btn btn-sm btn-secondary"> <small><i style="font-size:11px"  class="fa fa-floppy-o" aria-hidden="true"></i></small></button>

          <button style="padding: 1px 5px;" @click="showlfform=false" type="button" class="btn btn-xs btn-danger "> <small><i style="font-size:11px" class="fa fa-ban" aria-hidden="true"></i></small></button></td>
        </div>

      </form>

    </div>

    <div>
     <ul>
      <li v-for="measurement in measurements" style="font-size:11px;">
        <div class="">  {{ measurement.name }} : <b> {{ measurement.value }}  {{ measurement.code }}</b>

          <small style="font-size:9px; color:#ccc ; margin-top:-5px; font-style: italic;">
            le {{ measurement.human_arrival_date }}

        </small>

        <!--  <small class="float-right pt-1"><i @click="deleteMeasurement(measurement.id)" class="fa fa-trash" style="color:red" aria-hidden="true"></i> </small> --> </div>

      </li>
    </ul>
  </div>

</div>
</div>




</template>

<script>

import Axios from "@/_services/caller.services";

export default {

 name: "Measurement",
 props : ["movment_id","services_id"],

 data() {
  return {
    showlfform: false,
    measurementSpinner: false,

    measurements: [],
    movment :{},

    newmeasurement :{},

    measurement: {
     name:"",
     value:"",
     code:"",
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
      this.getmeasurements(this.movment.patients_id);
      console.log(this.movment);
    })
  .catch((error) => {
    console.error(error);
  });
},

getmeasurements(patients_id) {
  this.measurementSpinner=true;
  Axios.get("/measurements?patients_id="+ patients_id)
  .then(
    (res) => {
      this.measurements = res.data.data;
      this.measurementSpinner=false;
      console.log(this.measurements);
    })
  .catch((error) => {
    console.error(error);
  });
},

saveMeasurements() {
  this.measurementSpinner=true;

  Axios.post("/measurements",{
    name : this.measurement.name,
    code : this.measurement.code,
    value : this.measurement.value,
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
     this.newmeasurement = res.data.data;
     this.measurements.push(this.newmeasurement)
     this.measurementSpinner=false;
     this.name = "";
     this.value = "";
     this.code = "";
     this.showlfform = false;
     console.log(this.newmeasurement);
   })
  .catch((error) => {
    console.error(error);
  });

},

deleteMeasurement(id) {
  this.measurementSpinner=true;
  Axios.post("/measurements/delete",{
    id : id
  },
  {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(
    (res) => {
      this.getmeasurements(this.movment.patients_id);
      this.measurementSpinner=false;
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


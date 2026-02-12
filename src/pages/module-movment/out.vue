<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-6 grid-margin">
        <h3
        class="card-title text-white rounded p-1 mb-1 text-center"
        style="
        background-color: #0B5D3F;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        " >
        Sortie du Patient
      </h3>


      <div class="card">
        <div class="card-body">

          <div v-if="updatedSpinner" class="spinner-border spinner-border-sm text-primary" style="font-size:11px" role="status">
        <span class="sr-only">Loading...</span>
      </div>

          <div v-if="showResumediv" class="p-5">
            <div class="bg-light text-success p-3 ">Sortie du patient enregistrée ! <br><br>
             <i>Arrivée le  <b>{{updatedMovment.human_arrival_date}} </b> <br>
              Raison de la venue : <b>{{updatedMovment.incoming_reason}} </b> </i>
              <br>
              <br>

              <i>Sortie ce  <b>{{updatedMovment.human_release_date}} </b> <br>
                Note de la sortie : <b>{{updatedMovment.outgoing_reason}} </b> </i>

              </div>
              <br>
              <div class="mx-auto text-center">
                <router-link to="/movments/list">
                  <button type="button" class="btn btn-secondary btn-sm mr-2 btn-medpay-green-small ">
                   Allez aux venues
                 </button> </router-link>
                <!-- <button @click="billing()" class="btn btn-success btn-sm mr-2 btn-medpay-green-small">  Aller à la facturation </button>-->
               </div>
             </div>

             <div v-if="showCreateform">
              <h6 class="p-3 bg-light text-black"> Patient :  <b>{{ movment.ipp }} - {{ movment.lastname }} {{ movment.firstname }} </b>   <br> Arrivé le : <b>{{
                movment.human_arrival_date
              }}</b>

              <br>
              Raison de la venue : <b>{{movment.incoming_reason}} </b>
            </h6>


            <br>
            <form @submit.prevent = "UpadeMovment()" >
              <label > <b>Note de sortie </b></label>
              <textarea required v-model="outgoing_reason"  class="form-control" ></textarea>
              <br>
              <div class="mx-auto text-center pb-2">

                <button @click="$router.go(-1)" type="button" class="btn btn-sm btn-danger btn-medpay-green-small  mr-2">
                  Annuler
                </button>



                <button type="submit" class="btn btn-sm btn-success btn-medpay-green-small  mr-2">  Enregister </button>
              </div>
            </form>
          </div>

        </div>


      </div>
    </div></div>

  </section>
</template>
<script>


import { useToast, POSITION } from "vue-toastification";
import Axios from "@/_services/caller.services";

export default {

  props : ["movment_id"],
  data() {
    return {
      outgoing_reason: "",
      movment: {},
      updatedMovment: {},
      formErrors :{},
      showCreateform : true,
      showResumediv : false,
      updatedSpinner : false,
    };
  },
  mounted() {
    this.fetchMovemt();
  },

  methods: {
   fetchMovemt() {
    Axios.get("/movments/"+ this.movment_id)
    .then(
      (res) => {
        this.movment = res.data.data;
        console.log(this.movment);
      })
    .catch((error) => {
      console.error(error);
    });
  },

  UpadeMovment() {
    this.updatedSpinner =true;
    Axios.post("/movments/updateOut",{
      movments_id : this.movment_id,
      outgoing_reason : this.outgoing_reason,
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(
      (res) => {
       this.updatedMovment = res.data.data;
       this.updatedSpinner =false;
       this.showCreateform = false ;
       this.showResumediv = true ;
       console.log(this.showResumediv);
     })
    .catch((error) => {
      console.error(error);
    });

  },

  billing() {
    this.$router.push('/payement/create');
  },



  clearError(field) {
    this.formErrors[field] = "";
  },

}
};


</script>

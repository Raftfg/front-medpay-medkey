<template>
  <section class="container-scroller">

    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-body" >
            <div class="row">
              <div class="col-lg-12">
               <h6 class="text-black p-2" style="background-color: #d5e9ea" >
                <div v-if="treatmentSpinner" class="spinner-border spinner-border-sm text-primary" style="font-size:11px" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
                Patient  : <b> {{   movment.ipp }} ¤  {{ movment.lastname }} {{ movment.firstname }}    </b>   <br>   </b>
                <small> Venu le  <b>{{ movment.human_arrival_date}}</b> </small>&nbsp; <small>  Service de traitement   : <b>  {{ movment.services_name }} </b> </small>
              </h6>
            </div>

           <!-- <div class="col-lg-3">
             <button @click = "switshService(movment.id)" class="btn btn-success btn-medpay-green"> Ajouter un service </button>

           </div>-->

         </div>

       </div>
     </div>
   </div>
 </div>
 <br>

 <!--  Includes Urgences Composments -->
 <div class="row" v-if="subComponent.urgence">
  <div class="col-lg-8">
    <UrgenceComponent :movment_id ="movment_id" :services_id = "movment.services_id" ></UrgenceComponent>
  </div>

  <div class="col-lg-4">
    <div class="accordion" role="tablist">
      <b-card no-body class="mb-1">
        <b-card-header header-tag="header" class="p-0" role="tab">
          <b-button block v-b-toggle.accordion-2 variant="secondary">Historique patient</b-button>
        </b-card-header>
        <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
          <b-card-body>

           <MeasurementComponent
           :movment_id ="movment_id"
           :services_id = "movment.services_id">
         </MeasurementComponent>

         <PatientHistoy
         :movment_id ="movment_id"
         :services_id = "movment.services_id">
       </PatientHistoy>

       <AllergieComponent
       :movment_id ="movment_id"
       :services_id = "movment.services_id" >
     </AllergieComponent>

     <LivestyleComponent
     :movment_id ="movment_id"
     :services_id = "movment.services_id" >
   </LivestyleComponent>

 </b-card-body>
</b-collapse>
</b-card>

<b-card no-body class="mb-1">
  <b-card-header header-tag="header" class="p-0" role="tab">
    <b-button block v-b-toggle.accordion-1 variant="secondary">Ordonnances</b-button>
  </b-card-header>
  <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">

    <ActsComponent :movment_id ="movment_id" :services_id = "movment.services_id" ></ActsComponent>

  </b-collapse>
</b-card>
</div>
</div>
</div>

<!-- consultation -->

<div class="row" v-if="subComponent.consultation">

  <div class="col-lg-8">
    <div class="card p-0" style=" font-size:13px;  overflow:auto">
     <div class="card-body p-0 ">
      <ConsultationComponent :movment_id ="movment_id" :services_id = "movment.services_id" ></ConsultationComponent>
    </div>
  </div>
</div>

<div class="col-lg-4">

  <div class="accordion" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-0" role="tab">
        <b-button block v-b-toggle.accordion-2 variant="secondary">Historique patient</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body>

         <MeasurementComponent
         :movment_id ="movment_id"
         :services_id = "movment.services_id">
       </MeasurementComponent>

       <PatientHistoy
       :movment_id ="movment_id"
       :services_id = "movment.services_id">
     </PatientHistoy>

     <AllergieComponent
     :movment_id ="movment_id"
     :services_id = "movment.services_id" >
   </AllergieComponent>

   <LivestyleComponent
   :movment_id ="movment_id"
   :services_id = "movment.services_id" >
 </LivestyleComponent>

</b-card-body>
</b-collapse>
</b-card>

<b-card no-body class="mb-1">
  <b-card-header header-tag="header" class="p-0" role="tab">
    <b-button block v-b-toggle.accordion-1 variant="secondary">Ordonnances</b-button>
  </b-card-header>
  <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">

    <ActsComponent :movment_id ="movment_id" :services_id = "movment.services_id" ></ActsComponent>

  </b-collapse>
</b-card>
</div>


</div>


</div>

<!-- Inclusion des modules des services -->

<div class="row" v-if="subComponent.laboratoire">
 <div class="col-lg-12">
  <LaboratoireComponent :movment_id ="movment_id" :services_id = "movment.services_id" ></LaboratoireComponent>
</div>



</div>
</div>

<div class="row" v-if="subComponent.imagerie">
 <div class="col-lg-12">
  <ImagerieComponent :movment_id ="movment_id" :services_id = "movment.services_id" ></ImagerieComponent>
</div>
</div>


<!--- Pédiatire -->
<div class="row" v-if="subComponent.pediatrie">
 <div class="col-lg-8">
  <PediatrieComponent :movment_id ="movment_id" :services_id = "movment.services_id" ></PediatrieComponent>
</div>

<div class="col-lg-4">

  <div class="accordion" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-0" role="tab">
        <b-button block v-b-toggle.accordion-2 variant="secondary">Historique patient</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body>

         <MeasurementComponent
         :movment_id ="movment_id"
         :services_id = "movment.services_id">
       </MeasurementComponent>

       <PatientHistoy
       :movment_id ="movment_id"
       :services_id = "movment.services_id">
     </PatientHistoy>

     <AllergieComponent
     :movment_id ="movment_id"
     :services_id = "movment.services_id" >
   </AllergieComponent>

   <LivestyleComponent
   :movment_id ="movment_id"
   :services_id = "movment.services_id" >
 </LivestyleComponent>

</b-card-body>
</b-collapse>
</b-card>

<b-card no-body class="mb-1">
  <b-card-header header-tag="header" class="p-0" role="tab">
    <b-button block v-b-toggle.accordion-1 variant="secondary">Ordonnances</b-button>
  </b-card-header>
  <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">

    <ActsComponent :movment_id ="movment_id" :services_id = "movment.services_id" ></ActsComponent>

  </b-collapse>
</b-card>
</div>


</div>
</div>


<!-- Martinité -->
<div class="row" v-if="subComponent.maternite">
 <div class="col-lg-8">
   <MaterniteComponent :movment_id ="movment_id" :services_id = "movment.services_id" ></MaterniteComponent>
 </div>

 <div class="col-lg-4">

  <div class="accordion" role="tablist">
   <!-- <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-0" role="tab">
        <b-button block v-b-toggle.accordion-2 variant="secondary">Historique patient</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body>

         <MeasurementComponent
         :movment_id ="movment_id"
         :services_id = "movment.services_id">
       </MeasurementComponent>

       <PatientHistoy
       :movment_id ="movment_id"
       :services_id = "movment.services_id">
     </PatientHistoy>

     <AllergieComponent
     :movment_id ="movment_id"
     :services_id = "movment.services_id" >
   </AllergieComponent>

   <LivestyleComponent
   :movment_id ="movment_id"
   :services_id = "movment.services_id" >
 </LivestyleComponent>

</b-card-body>
</b-collapse>
</b-card>-->

<b-card no-body class="mb-1">
  <b-card-header header-tag="header" class="p-0" role="tab">
    <b-button block v-b-toggle.accordion-1 variant="secondary">Ordonnances</b-button>
  </b-card-header>
  <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">

    <ActsComponent :movment_id ="movment_id" :services_id = "movment.services_id" ></ActsComponent>

  </b-collapse>
</b-card>
</div>


</div>
</div>


<!--   Chiruregies -->
<div class="row" v-if="subComponent.chirurgie">
 <div class="col-lg-8">
  <ChirurgieComponent :movment_id ="movment_id" :services_id = "movment.services_id" ></ChirurgieComponent>
</div>

<div class="col-lg-4">

  <div class="accordion" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-0" role="tab">
        <b-button block v-b-toggle.accordion-2 variant="secondary">Historique patient</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body>

         <MeasurementComponent
         :movment_id ="movment_id"
         :services_id = "movment.services_id">
       </MeasurementComponent>

       <PatientHistoy
       :movment_id ="movment_id"
       :services_id = "movment.services_id">
     </PatientHistoy>

     <AllergieComponent
     :movment_id ="movment_id"
     :services_id = "movment.services_id" >
   </AllergieComponent>

   <LivestyleComponent
   :movment_id ="movment_id"
   :services_id = "movment.services_id" >
 </LivestyleComponent>

</b-card-body>
</b-collapse>
</b-card>

<b-card no-body class="mb-1">
  <b-card-header header-tag="header" class="p-0" role="tab">
    <b-button block v-b-toggle.accordion-1 variant="secondary">Ordonnances</b-button>
  </b-card-header>
  <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">

    <ActsComponent :movment_id ="movment_id" :services_id = "movment.services_id" ></ActsComponent>

  </b-collapse>
</b-card>
</div>


</div>
</div>


<!--- Infirmerie -->
<div class="row" v-if="subComponent.infirmerie">
 <div class="col-lg-8">
 <InfirmerieComponent :movment_id ="movment_id" :services_id = "movment.services_id" ></InfirmerieComponent>
</div>

<div class="col-lg-4">


  <div class="accordion" role="tablist">
    <b-card no-body class="mb-1">
      <b-card-header header-tag="header" class="p-0" role="tab">
        <b-button block v-b-toggle.accordion-2 variant="secondary">Historique patient</b-button>
      </b-card-header>
      <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel">
        <b-card-body>

         <MeasurementComponent
         :movment_id ="movment_id"
         :services_id = "movment.services_id">
       </MeasurementComponent>

       <PatientHistoy
       :movment_id ="movment_id"
       :services_id = "movment.services_id">
     </PatientHistoy>

     <AllergieComponent
     :movment_id ="movment_id"
     :services_id = "movment.services_id" >
   </AllergieComponent>

   <LivestyleComponent
   :movment_id ="movment_id"
   :services_id = "movment.services_id" >
 </LivestyleComponent>

</b-card-body>
</b-collapse>
</b-card>

<b-card no-body class="mb-1">
  <b-card-header header-tag="header" class="p-0" role="tab">
    <b-button block v-b-toggle.accordion-1 variant="secondary">Ordonnances</b-button>
  </b-card-header>
  <b-collapse id="accordion-1" visible accordion="my-accordion" role="tabpanel">

    <ActsComponent :movment_id ="movment_id" :services_id = "movment.services_id" ></ActsComponent>

  </b-collapse>
</b-card>
</div>


</div>

</div>




<div class="row mt-5" >
  <div class="col-lg-12">
    <div class="mx-auto" >

    <!-- <button @click="$router.go(-1)" type="button" class="btn btn-sm btn-danger btn-medpay-green-small  mr-2">
      Quitter
    </button>-->


    <!-- <button type="button" class="btn btn-secondary btn-medpay-green-small  mr-2 float-right"> Envoyer vers un autre services  </button>-->

  </div>
</div>
</div>

</section>
</template>


<script>

import AllergieComponent from "../module-movment/treatment/allergie";
import ActsComponent from "../module-movment/treatment/acts";
import PatientHistoy from "../module-movment/treatment/patientHistoy";
import LivestyleComponent from "../module-movment/treatment/livestyle";
import MeasurementComponent from "../module-movment/treatment/measurement";


import ConsultationComponent from "./treatment/consultation";
import ImagerieComponent from "./treatment/imagerie";
import PediatrieComponent from "./treatment/pediatrie";
import LaboratoireComponent from "./treatment/laboratoire";
import MaterniteComponent from "./treatment/maternite";
import ChirurgieComponent from "./treatment/chirurgie";
import InfirmerieComponent from "./treatment/infirmerie";
import UrgenceComponent from "./treatment/urgence";

import { useToast, POSITION } from "vue-toastification";
import Axios from "@/_services/caller.services";

export default {
  components : {
    ActsComponent,
    PatientHistoy,
    AllergieComponent,
    LivestyleComponent,
    MeasurementComponent,
    ConsultationComponent,
    ImagerieComponent,
    PediatrieComponent,
    LaboratoireComponent,
    MaterniteComponent,
    InfirmerieComponent,
    ChirurgieComponent,
    UrgenceComponent
  },

  props : ["movment_id", "selectedModule"],

  data() {
    return {

      own_selectedModule : this.selectedModule,

      subComponent: {
        consultation: "",
        laboratoire: "",
        imagerie: "",
        pediatrie: "",
        maternite: "",
        chirurgie: "",
        infirmerie: "",
        urgence: ""
      },

      movment: {},
      services_id: "",
      treatmentSpinner: false,
      showServiceSlector: false,
      formErrors :{}
    };
  },
  mounted() {
    this.getMovemt();

  },


 methods: {

  loadSubCompoment(){

    this.own_selectedModule === "consultation" ? this.subComponent.consultation=true : this.subComponent.consultation=false;
    this.own_selectedModule === "laboratoire" ? this.subComponent.laboratoire=true :this.subComponent.laboratoire=false;
    this.own_selectedModule === "imagerie" ? this.subComponent.imagerie=true : this.subComponent.imagerie=false;
    this.own_selectedModule === "pediatrie" ? this.subComponent.pediatrie=true : this.subComponent.pediatrie=false;
    this.own_selectedModule === "maternite" ? this.subComponent.maternite=true : this.subComponent.maternite=false;
    this.own_selectedModule === "chirurgie" ? this.subComponent.chirurgie=true : this.subComponent.chirurgie=false;
    this.own_selectedModule === "urgence" ? this.subComponent.urgence=true : this.subComponent.urgence=false;
    this.own_selectedModule === "infirmerie" ? this.subComponent.infirmerie=true : this.subComponent.infirmerie=false;
  },


  getMovemt() {
    this.treatmentSpinner = true ;
    Axios.get("/movments/"+ this.movment_id)
    .then(
      (res) => {
        this.movment = res.data.data;
        this.treatmentSpinner = false ;
        this.own_selectedModule = this.movment.services_code;
        this.loadSubCompoment();
        console.log(this.movment);
      })
    .catch((error) => {
      console.error(error);
    });
  },

  out(id) {
    this.$router.push("/movments/finish/" + id);
  },
  switshService(id){
    this.$router.push("/movments/switcher/" + id);
  }
}

};


</script>

<style>
.col-lg-4{

}
.addbtn { padding:0px 5px; background-color:green }
</style>




<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 grid-margin">
          <h3
      class="card-title text-white rounded p-1 mb-1 text-center"
      style="
      background-color: #0B5D3F;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      "
      >
     Détail de la venue
    </h3>

        <div class="card">
          <div class="card-body">
            <h6 class="p-3 bg-light text-black"> PATIENT :  <b>{{ movment.ipp }} - {{ movment.lastname }} {{ movment.firstname }} </b>   &nbsp;&nbsp;&nbsp;|  &nbsp;&nbsp;&nbsp;  SERVICE : <b>{{ movment.services_name }}  </b> &nbsp;&nbsp;&nbsp;  |  &nbsp;&nbsp;&nbsp;ARRIVEE LE : <b>{{
              movment.human_arrival_date
            }}</b>

          </h6>


          <br>
          <div class="row">
            <hr>

            <div class="col-lg-12 bg-light">

             A complèter...

        </div>



    </div>

    <div class="mx-auto text-center">
  <!--  <router-link to="/movments/list"><button type="button" class="btn btn-danger btn-medpay-green  mr-2">
      Annuler
    </button> </router-link>
    <button type="submit" class="btn btn-success btn-medpay-green  mr-2">  Enregister </button>

  --></div>
  <br>
</div>


</div>
</div>
</div>

</section>
</template>
<script>


/*import { movementServices } from "@/_services/movements_services";
import { movementServices } from "@/_services/departments_services";*/


//import MeasurementComponent from "./measurement";
import { useToast, POSITION } from "vue-toastification";
import Axios from "@/_services/caller.services";


export default {
 // components : {MeasurementComponent},
  props : ["movment_id"],
  data() {
    return {
      selectedService: "",
      conclusion: "",
      observation: "",
      measurement: "",
      complaint: "",
      exam: "",
      movment: {},
      addedAct: {},
      actes: [],
      medicalsacts: [],
      products: [],
      services_id: "",
      showacteform : false,

//Pöur l',registrement
      selectedAct : "",
      quantity :"",
      medical_acts_qte :"",
      formErrors :{}

    };
  },
  mounted() {
    this.fetchMovemt();
    this.fetchMovemtActes();
     //this.fetchMedicalsActsByService();
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

  fetchMovemtActes() {
    Axios.get("/movments/actes/"+ this.movment_id)
    .then(
      (res) => {
        this.actes = res.data.data;
        console.log(this.actes);
      })
    .catch((error) => {
      console.error(error);
    });
  },

  fetchMedicalsActsByService(services_id) {
    this.showacteform=true;

    Axios.get("/administration/services/actes/"+ services_id)
    .then(
      (res) => {
        this.medicalsacts = res.data.data;
        console.log(this.services);
      })
    .catch((error) => {
      console.error(error);
    });
  },

  fetchMedicalsProductsByService(services_id) {
    Axios.get("/administration/services/products/"+ services_id)
    .then(
      (res) => {
        this.products = res.data.data;
        console.log(this.services);
      })
    .catch((error) => {
      console.error(error);
    });
  },

  storeMovmentAct() {
      Axios.post("/movments/actes/store",{
        movments_id : this.movment_id,
        medical_acts_id : this.selectedAct,
        medical_acts_qte : this.medical_acts_qte,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(
        (res) => {
           this.addedAct = res.data.data;
           this.medical_acts_id = "";
           this.medical_acts_qte = "";
           this.showacteform =false;
           this.fetchMovemtActes();
          console.log(this.addedAct);
        })
      .catch((error) => {
        console.error(error);
      });

  },

 clearError(field) {
      this.formErrors[field] = "";
    },






}
};


</script>

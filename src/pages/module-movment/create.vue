<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-8 grid-margin stretch-card">

        <div  class="card" >
          <div class="card-body">

            <!-- si  -->
            <div v-if ="showResumediv" class="p-4">
              <div class="bg-light text-success p-3 ">

                <b>Venue ajoutée avec succes ! </b>

                <br><br>
                <table>
                  <tr><td width="40%">Arrivée ce </td> <td> : <b> {{movement.human_arrival_date}} </b> </td></tr>
                  <tr><td>Objet de la venue  &nbsp;</td> <td> : <b> {{movement.incoming_reason}} </b></td></tr>
                </table>

               </div>
              <br>
              <div class="mx-auto text-center">
                <router-link to="/movments/list">
                  <button type="button" class="btn btn-secondary btn-sm mr-2 btn-medpay-green-small">
                 Allez à liste des venues
               </button> </router-link>

           </div>
         </div>

           <div v-if="showCreateform" >

            <h3 class=" text-white rounded p-3 mb-3 text-center"
            style=" background-color: #0B5D3F; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); " >Ajout d'une nouvelle venue </h3>

            <form  @submit.prevent = "storeMovment()" >

             <div class="row">
               <div class="form-group form-group-sm  col-md-10">
                <label>Patient *</label>
                <select class="form-control mb-2" id="selectedPatient" v-model="selectedPatient">
                  <option disabled value="">Sélectionnez un patient </option>
                  <option v-for="patient in patients" :value="patient.id" :key="patient.id"
                  > {{ patient.firstname }} {{ patient.lastname }}
                </option>
              </select>
              <p v-if="formErrors.patients_id" class="error-message text-danger" >  {{ formErrors.patients_id[0] }} </p>
            </div>

            <div class="form-group controls col-md-2 text-right pt-1" >
              <br>
              <router-link to="/patients/create">
                <button
                type="submit"
                class="btn btn-success px-4"
                >
               <i class="fa fa-plus-square" aria-hidden="true"></i>
              </button>
            </router-link>

          </div>
        </div>

        <div class="row">
          <div class="form-group form-group-sm controls col-md-6">
            <label>Département *</label>
            <select required class="form-control form-control-sm mb-3" id="selectedDepartment" v-model="selectedDepartment"  @change="fetchServicesByDepartement">
              <option disabled value="">Sélectionnez un département</option>
              <option v-for="department in departments" :value="department.id" :key="department.id"
              > {{ department.name }}
            </option>
          </select>

          <div v-if="formErrors.selectedDepartment" class="error-message text-danger" >  {{ formErrors.selectedDepartment }} </div>
        </div>

        <div class="form-group controls col-md-6">
          <label>Services *</label>
          <select required class="form-control form-control-sm mb-3" id="" v-model="selectedService" @input="clearError('selectedService')" @change="fetchMedicalsActsByService" >

            <option disabled value="">Sélectionnez un service</option>
            <option v-for="service in services" :value="service.id" :key="service.id"
            > {{ service.name }}
          </option>
        </select>

        <div v-if="formErrors.selectedService" class="error-message text-danger" >  {{ formErrors.selectedService }} </div>
      </div>

      <div class="form-group controls col-md-6">
        <label>Actes Medicaux / Prestations *</label>

        <select required class="form-control mb-3" id="" v-model="selectedAct" @input="clearError('selectedAct')">
          <option disabled value="">Sélectionnez un acte medical</option>
          <option v-for="act in acts" :value="act.id" :key="act.id"
          > {{ act.designation }}
        </option>
      </select>
      <p v-if="formErrors.medical_acts_id" class="error-message text-danger" >  {{ formErrors.medical_acts_id[0] }} </p>
    </div>

    <div class="form-group controls col-md-6">
     <label for="datefin">Objet de la venue  ?</label>
     <input class="form-control " id="reason" v-model="reason"  @input="clearError('reason')" />
     <div v-if="errorMessage" class="error-message text-danger"> {{ errorMessage }} </div>
   </div>

 </div>

 <hr>

 <div class="mx-auto text-center">
  <router-link to="/movments/list">
    <button type="button" class="btn btn-danger  btn-medpay-green   mr-2">
    Annuler
  </button> </router-link>
  <button type="submit" class="btn btn-success btn-medpay-green  mr-2">

    <div v-if="btnSpinner" class="spinner-grow spinner-grow-sm" role="status">
      <span class="sr-only">Loading...</span>
    </div>

  Ajouter </button>
</div>



</form>
</div>
</div>

</div>





</div>
</div>
</div>
</section>
</template>
<script>
import $ from "jquery";
import { useToast, POSITION } from "vue-toastification";
import Axios from "@/_services/caller.services";
import '../../../node_modules/select2/dist/js/select2';

export default {
  data() {
    return {
      selectedPatient: "",
      selectedDepartment: "",
      selectedService: "",
      selectedAct: "",
      patients: [], // Remplir cette liste avec les patients disponibles
      departments: [], // Remplir cette liste avec les patients disponibles
      services: [], // Remplir cette liste avec les patients disponibles
      acts: [], // Remplir cette liste avec les patients disponibles
      patient: {},
      movement: {},
      patient_id: "",
      reason: "",
      errorMessage: "",
      showCreateform : true,
      showResumediv : false,
      formErrors: {},
      btnSpinner:false
    };
  },
  mounted() {
    this.fetchPatients();
    this.fetchDepartments();
   //$('#selectedPatient').select2();
  },

  methods: {

    storeMovment() {

      this.btnSpinner = true;
      Axios.post("/movments",{
        patient_id : this.selectedPatient,
        service_id : this.selectedService,
        reason : this.reason,
        medical_acts_id : this.selectedAct
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      )
      .then(
        (res) => {

         if(res.data.code == 302){

          this.$toast.info("Ce patient a déjà une venue en cours !", {
            position: POSITION.TOP_RIGHT,
            timeout: 6000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
          this.movement = res.data.data;
          this.btnSpinner = false;
        }else{

          this.movement = res.data.data;

          this.$toast.success("Mouvement ajouté avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 6000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });

          this.btnSpinner = false;
          this.showCreateform = false;
          this.showResumediv = true;
          console.log(this.movement);
        }


      })
      .catch((error) => {
        console.error(error);
        this.formErrors = error.response.data.errors;
        console.log(this.formErrors);
        this.showCreateform = true ;
        this.showResumediv = false;
        this.btnSpinner = false;
      });
      //this.$router.push("/movments/list");
    },

    fetchPatients() {
      Axios.get("/movments/patients")
      .then(
        (res) => {
          this.patients = res.data.data;
          console.log(this.patients);
        })
      .catch((error) => {
        console.error(error);
      });
    },


    fetchDepartments() {
      Axios.get("/administration/departments")
      .then(
        (res) => {
          this.departments = res.data.data;
          console.log(this.departments);
        })

      .catch((error) => {
        console.error(error);
      });
    },

    fetchServicesByDepartement(id) {
      Axios.get("/administration/departments/get/"+ this.selectedDepartment)
      .then(
        (res) => {
          this.services = res.data.data;
          console.log(this.services);
        })

      .catch((error) => {
        console.error(error);
      });
    },


    fetchMedicalsActsByService() {
      Axios.get("/administration/services/actes/"+ this.selectedService)
      .then(
        (res) => {
          this.acts = res.data.data;
          console.log(this.services);
        })
      .catch((error) => {
        console.error(this.formErrors);
      });
    },

    treatement(id) {
      this.$router.push("/movments/treatement/" + id);
    },


    clearError(field) {
      this.formErrors[field] = "";
    },

  }
};


</script>

<style>

.select2-container .select2-selection--single{
   height: 43px !important;
   padding-top:5px;

}
select {
  cursor: pointer;
  height: 43px !important;
}

input[type="radio"].demo6 {
  display: none;
}

input[type="radio"].demo6 + label {
  position: relative;
  padding-left: 1.3rem;
}

input[type="radio"].demo6 + label::before,
input[type="radio"].demo6 + label::after {
  display: block;
  position: absolute;
  box-sizing: border-box;
  content: "";
  border-radius: 1rem;
}

input[type="radio"].demo6 + label::before {
  bottom: 0;
  left: 0;
  border: 1px solid #ccc;
  background-color: #eee;
  width: 1rem;
  height: 1rem;
}

input[type="radio"].demo6 + label::after {
  bottom: 3px;
  left: 3px;
  width: calc(1rem - 6px);
  height: calc(1rem - 6px);
}

input[type="radio"].demo6:checked + label::after {
  background-color: #45c28e;
}

input[type="checkbox"].demo2 {
  display: none;
}

input[type="checkbox"].demo2 + label::before {
  content: "";
  border: 1px solid #45c28e;
  padding: 0 0.6rem;
  margin-right: 0.3rem;
}

input[type="checkbox"].demo2:checked + label::before {
  background-color: #45c28e;
}
</style>

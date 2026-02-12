<template>
  <div class="row">
    <div class="col-lg-4 grid-margin">

     <div class="card ml-5">
      <div class="card-body text-center">
        <form @submit.prevent = "switchService()" >
          <select required class="form-control form-control-sm mb-3"  v-model="selectedService" >
            <option disabled value="">Sélectionnez un service</option>
            <option v-for="service in services" :value="service.id" :key="service.id"
            > {{ service.name }}
          </option>
        </select>
        <br>
        <button type="submit" class="btn btn-success btn-medpay-green">
          Valider
        </button>


      </form>
    </div>
  </div>
</div>
</div>


</template>

<script>
import { useToast, POSITION } from "vue-toastification";
import Axios from "@/_services/caller.services";

export default {

  name: "Switcher",

  props : ["movment_id", "services_id"],
  data() {
    return {
      selectedService:"",
      selectedDepartment:1,
      services : []
    };
  },

  mounted() {
    this.fetchServicesByDepartement();
  },

  methods: {

   switchService() {

    Axios.post("/switch-services", {
      movments_id :  this.movment_id,
      selectedService_id :  this.selectedService,
    })
    .then(
      (res) => {
        this.movment = res.data.data;

          this.$toast.info("Ajout bien effectué !", {
            position: POSITION.TOP_RIGHT,
            timeout: 6000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });

        console.log(this.movment);
       /// this.$router.push("/movments/treatement/" + this.movment.id);

      })
    .catch((error) => {
      console.error(error);
    });
  },


  fetchServicesByDepartement() {
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

  selectModal() {
    $("#sModal").modal("show");

  },



}


};




</script>


<style>
.addbtn { padding:0px 5px; }

</style>

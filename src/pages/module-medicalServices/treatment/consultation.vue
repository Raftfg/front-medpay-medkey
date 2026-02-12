<template>
  <div class="p-2 rounded">

    <form @submit.prevent = "saveConsultation()">
      <b>Motif </b>
      <input required v-model="consultation.reason"  v-text="consultation.reason" size="255" class="form-control form-control-sm" >
      <br>

      <b> Interrogatoires </b>

      <textarea class="form-control" v-model="consultation.complaint" v-html="consultation.complaint"> </textarea>

      <br>

      <b> Résultats d'Examens  </b>

      <textarea class="form-control" v-model="consultation.exam">
        {{consultation.exam}}
      </textarea>

      <br>

      <b> Conclusions  </b>

      <textarea class="form-control" v-model="consultation.summary">
        {{consultation.summary}}
      </textarea>

      <br>

      <b>Personnel  soignant </b>
      <select required v-model="consultation.operator" id="" class="form-control form-control-sm">
        <option value=""></option>
        <option v-for="employer in employers" :value="employer.uuid" > {{ employer.last_name }} {{ employer.first_name }} </option>
      </select>

      <br>

      <!-- <button class="btn btn-sm addbtn text-white "> <small> <i class="fa fa-file-pdf-o" aria-hidden="true"></i>   Fiche de consultation </small> </button>-->

      <button type="submit" class="btn btn-sm btn-secondary py-1 float-right"> <small>
        <div v-if="consultationSpinner" class="spinner-border spinner-border-sm text-white" style="font-size:11px" role="status">
          <span class="sr-only">Loading...</span>
        </div>

        <i class="fa fa-floppy-o" aria-hidden="true"></i></small></button>

      </form>

      <br>
    </div>
  </template>

  <script>

  import Axios from "@/_services/caller.services";
  import { employerService } from "@/_services";

  import { useToast, POSITION } from "vue-toastification";


  export default {

  name: "Consultation",


  props : ["movment_id", "services_id"],
  data() {
    return {
      showform: false,
      consultationSpinner: false,
      employers: [],

      consultation : {
        complaint:"",
        exam:"",
        summary:"",
        observation:"",
        reason:"",
        operator:""
      },
      movment :{},
      name:"",
    };
  },

  mounted() {
    this.getServiceMovemt();

    employerService.getAllEmployers().then((res) => {
      this.employers = res.data.data;
    });
  },

  methods: {
    getServiceMovemt() {
      Axios.get("/get-records?movments_id="+ this.movment_id + "&services_id="+this.services_id)
      .then(
        (res) => {
          this.consultation = res.data.data;
          console.log(this.consultation);

        })
      .catch((error) => {
        console.error(error);
      });
    },


    saveConsultation() {
      this.consultationSpinner = true;
      Axios.post("/movments/records/consultation",{
        complaint : this.consultation.complaint,
        exam : this.consultation.exam,
        summary : this.consultation.summary,
        reason : this.consultation.reason,
        observation : this.consultation.observation,
        operator : this.consultation.operator,
        movments_id : this.movment_id,
        services_id : this.services_id
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(
        (res) => {
         this.consultation = res.data.data;
         this.consultationSpinner = false;
         console.log(this.consultation);

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


  }


};




</script>


<style scoped>
.addbtn { padding:0px 5px; background-color:green }
</style>

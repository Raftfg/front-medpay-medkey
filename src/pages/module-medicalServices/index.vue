<template>
  <section class="container-scroller">

    <!-- <h4 class="card-title">Liste des actes médicaux</h4> -->

    <div class="row">
      <div class="col-lg-8 grid-margin">
       <h3
       class="card-title text-white rounded p-2 mb-1 text-center"
       style="
       background-color: #0b5d3f;
       box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
       "
       >
       Liste des services médicaux
     </h3>
     <div class="card">


       <div class="card-body">
        <b>Services médicaux</b>

        <div v-if="servicesSpinner" class="spinner-border spinner-border-sm text-primary" style="font-size:11px" role="status">
          <span class="sr-only">Loading...</span>
        </div>

        <small class="float-right">
          <a @click="showform=true"  class="btn btn-sm btn-secondary rounded-pill addbtn" >  +  </a>
        </small>

        <br>

        <div  v-if="showform" class="p-3 mt-2 bg-light"  style="font-size:11px; ">
          <form @submit.prevent = "saveServices()" class="">

            <div class="row">
              <div class="col-md-4">
                <input v-model ="name"  type="text" class="form-control  form-control-sm"  required placeholder="Titre *">
              </div>

              <div class="col-md-3">
               <input v-model ="code"  type="text" class="form-control  form-control-sm"  required placeholder="Code *">
             </div>

             <div class="col-md-3">
               <select required class="form-control form-control-sm mb-3" id="selectedDepartment" v-model="selectedDepartment"  >
                <option disabled value="">Sélectionnez un département</option>
                <option v-for="department in departments" :value="department.id" :key="department.id"
                > {{ department.name }}
              </option>
            </select>
          </div>

          <div class="col-md-2">
            <button type="submit" class="btn btn-sm btn-secondary p-1"> <small><i class="fa fa-floppy-o" aria-hidden="true"></i></small></button>
            <button @click="showform=false" type="button" class="btn btn-xs btn-danger p-1"> <small><i class="fa fa-ban" aria-hidden="true"></i></small></button>
          </div>

        </div>

      </form>
    </div>
    <br>

    <div class="p-3">

      <table class="table" width="100%">
        <tr v-for="service in services"  >
          <td class="p-2"> <b>{{ service.name }} </b></td>
          <td> </td>
          <td class="text-right">
            <a class="btn btn-success btn-sm" @click="toActes(service.id)"  > Voir les  Actes</a>
          </td>
          <td class="text-right">
           <small class="float-right pt-1"><i @click="deleteService(service.id)" class="fa fa-trash" style="color:red" aria-hidden="true"></i> </small>
         </td>
       </tr>
     </table>


   </div>
 </div>
</div>
</div>
</div>

</section>
</template>


<script>

import Axios from "@/_services/caller.services";

export default {

  name: "service",

  props : ["movment_id", "services_id"],
  data() {
    return {
      showform: false,
      servicesSpinner: false,
      services: [],
      selectedDepartment :1 ,

      name:"",
      description:"",
      departments_id:"",
    };
  },

  mounted() {
    this.fetchDepartments();
    this.fetchServicesByDepartement();
  },

  methods: {

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

    fetchServicesByDepartement() {
      this.servicesSpinner = true;
      Axios.get("/administration/departments/get/"+ this.selectedDepartment)
      .then(
        (res) => {
          this.services = res.data.data;
          this.servicesSpinner = false;
          console.log(this.services);
        })

      .catch((error) => {
        console.error(error);
      });
    },


    saveServices() {
      this.servicesSpinner = true;
      Axios.post("/administration/services",{
        name : this.name,
        code : this.code,
        description : this.description,
        departments_id : this.selectedDepartment,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(
        (res) => {
         this.newservice = res.data.data;
         this.services.push(this.newservice)
         this.name = "";
         this.code = "";
         this.showform = false;
         this.servicesSpinner = false;
         this.fetchServicesByDepartement();
         console.log(this.newservice);
       })
      .catch((error) => {
        console.error(error);
      });

    },

    deleteService(id) {
      this.servicesSpinner = true;
      Axios.post("/administration/services/delete",{
        id : id
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(
        (res) => {
         this.fetchServicesByDepartement();
         this.servicesSpinner = false;
       })
      .catch((error) => {
        console.error(error);
      });
    },


    toActes(id){
      this.$router.push("/actes-medicaux/create-list/" + id);
    }


  }

};


</script>


<style>
.addbtn { padding:0px 5px; background-color:green }

</style>

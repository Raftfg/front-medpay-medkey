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
      <b>Laboratoire</b> : Demandes d'examens en attente
    </h3>
    <div class="card" >
      <div class="card-body" >
        <div class="input-group input-group-sm mb-3 w-100">


            <input v-on:keyup="page = 1; fetchLastMovement()" type="text" v-model="q" class="form-control rounded-pill py-3" placeholder="Rechercher un patient ..."
            aria-label="">

            <select style="width:100px; height:35px !important ; border-radius:20px !important ;" class="" v-model="pageSize" @change="handlePageSizeChange($event)">
              <option v-for="size in pageSizes" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
          </div>


          <div class="table-responsive" style="min-height:200px" >
            <table
            id="order-listing"
            ref="myTable"
            class="table table-bordered table-hover"
            >
            <thead>
              <tr style="background-color: rgb(216, 218, 216)">
                <th>#</th>
                <!--<th>IEP</th>-->
                <th>IPP</th>
                <th>Patient</th>
                <th>Service</th>
                <th>Téléphone</th>
                <th>Arrivée le</th>
                <th class="text-center action-th">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
              v-for="(movment, index) in movments"
              :key="movment.id"
              >
              <td>{{ index + 1 }}</td>
              <td>{{ movment.ipp }}</td>
              <td> {{ movment.lastname }} {{ movment.firstname }}</td>
              <td> {{ movment.services_name }}</td>
              <td>{{ movment.phone }}</td>
              <td> {{ movment.human_arrival_date }}</td>
              <td>

               <div class="btn-group btn-group-sm" role="group" >
                <button id="btnGroupDrop1" type="" style="padding: 0px 10px; width:100%" class=" btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 <i class="fa fa-tasks" aria-hidden="true"></i>  </button>

                 <div class="dropdown-menu" aria-labelledby="btnGroupDrop1" style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%);" >

                   <a  @click="treatement(movment.id)" class="dropdown-item" > <i class="fa fa-cog" aria-hidden="true"></i> Réaliser les examens </a>




                 </div></div>
               </td>
             </tr>
             <!--<tr v-if="result"><td colspan="8"></td></tr>-->
           </tbody>
         </table>
        </div>

Total : {{count}}

        <b-pagination v-model="page" :total-rows="count" :per-page="pageSize" @change="handlePageChange"
        > </b-pagination>



      <div v-if="indexSpinner" class="spinner-border spinner-border-sm text-primary" style="font-size:11px" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</div>
</div>
</section>

</template>
<script>
import $ from "jquery";
import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { movmentService }  from "@/_services/movment_services.js";
export default {

  data() {
    return {

      /**Pagination var**/
      q: "",
      currentTutorial: null,
      currentIndex: -1,
      page: 1,
      count: 0,
      pageSize: 50,
      pageSizes: [50, 250, 1000],

      indexSpinner:false,
      movments: [],
      service_code : 'laboratoire'

    };
  },

  mounted() {
    this.fetchLastMovement();
  },


  methods: {

    getRequestParams(q, page, pageSize,service_code) {
      let params = {};

      if (q) {
        params["q"] = q;
      }

      if (service_code) {
        params["service_code"] = service_code;
      }



      if (page) {
        params["page"] = page - 1;
      }

      if (pageSize) {
        params["size"] = pageSize;
      }

      return params;
    },


    fetchLastMovement() {
      this.indexSpinner = true;

      const params = this.getRequestParams(
        this.q,
        this.page,
        this.pageSize,
        this.service_code,
        );

      movmentService.getActiveConsultaionMovments(params)
      .then(
        (res) => {
          this.movments = res.data.data.data;
          this.count = res.data.data.total;
          this.indexSpinner = false;
          console.log(this.movments);
        })
      .catch((error) => {
        console.error(error);
      });
    },

    handlePageChange(value) {
      alert(value)
      this.page = value;
      this.fetchLastMovement();
    },

    handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.fetchLastMovement();
    }
    ,



    treatement(id) {
      this.$router.push("/medical-services/treatement/" + id);
    },

    detail(id) {
      this.$router.push("/movments/show/" + id);
    },

    out(id) {
      this.$router.push("/movments/out/" + id);
    },

    billing(id) {
      this.$router.push("/payement/create/" + id);
    },

    movmentHistory(id) {
      this.$router.push("/movment/history/" + id);
    },

    switchTreatmentService(id){
     this.$router.push("/movment/s_switch/" + id);
   }


 }
};
</script>

<style scoped>
@import "../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
/* @import '../../../node_modules/datatables.net-dt/css/jquery.dataTables.css'; */

@import "../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";


.pagination{
  float: right !important;
}
</style>

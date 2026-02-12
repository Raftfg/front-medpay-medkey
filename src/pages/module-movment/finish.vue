<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-4 grid-margin">
        <div class="card ml-5">
          <div class="card-body">
            <div class="row">
              <div class="col-lg-12 text-center">
               <router-link to="/movments/list">
                <button type="button" class="btn btn-sm btn-secondary btn-medpay-green-small  mr-2">
                  Aller aux venues
                </button> </router-link>

              </div>
            </div>

            <div class="row">

              <div style="margin-left:-5px" class="col-lg-12 text-center mt-2">  </div>

            </div>
              <div class="row">
                <div class="col-lg-12 text-center mt-2"><button @click="out(movment_id)" type="button" class="btn btn-sm btn-danger btn-medpay-green-small  mr-2">
                  Enregistrer la sortie
                </button> </div>

              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  </template>
  <script>


  import { useToast, POSITION } from "vue-toastification";
  import Axios from "@/_services/caller.services";


  export default {

   props : ["movment_id"],
   data() {
    return {
      movment: {},
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

  out(id) {
    this.$router.push("/movments/out/" + id);
  },

  switshService(id){
    this.$router.push("/movments/switcher/" + id);
  }

}
};


</script>

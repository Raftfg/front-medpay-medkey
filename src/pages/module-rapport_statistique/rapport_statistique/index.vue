<template>
  <section class="container-scroller">
    <!-- Section: Patients -->
    <section>
      <PatientStat></PatientStat>
    </section>
    <!-- Section: Facturation -->
    <section>
      <FacturationStat></FacturationStat>
    </section>

    <!-- Section: Stock -->
    <section>
      <StockStat></StockStat>
    </section>

 <!-- Pharmacie Stock -->
    <section>
  <PharmacieStat></PharmacieStat>
  </section>

</section>
</template>
<script>
import $ from "jquery";
import "../../../../node_modules/bootstrap/dist/js/bootstrap.js";
import "../../../../node_modules/bootstrap/dist/js/bootstrap.min.js";

///Stat comoements

import PatientStat from "./_patient_stat.vue";
import FacturationStat from "./_facturation_stat.vue";
import StockStat from "./_stock_stat.vue";
import PharmacieStat from "./_pharmacie_stat.vue";


export default {
  name: "Dashbord",
  components :{ PatientStat , FacturationStat, StockStat, PharmacieStat},
  data() {
    return {
      // Add more counts as needed
    };
  },
  mounted() {
  },
  methods: {

  },
};
</script>

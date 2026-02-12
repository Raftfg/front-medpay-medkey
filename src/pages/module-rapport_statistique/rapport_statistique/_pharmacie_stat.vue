<template>
  <div>
    <h3 class="card-title text-white rounded p-1 mb-5 text-center"
      style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      Pharmacie
    </h3>
    <div class="row mt-3">
      <div class="col-lg-4 grid-margin">
        <div class="card dashboard-card">
          <div class="card-body">
            <p class="card-text">{{ countProduct }}</p>
            <h2 class="card-title">Produits en stock de pharmacie</h2>
          </div>
        </div>
      </div>

      <div class="col-lg-4 grid-margin">
        <div class="card dashboard-card">
          <div class="card-body">
            <p class="card-text">{{ total_unique_products_sold }}</p>
            <h2 class="card-title">Produits vendus</h2>
          </div>
        </div>
      </div>

      <!-- <div class="col-lg-4 grid-margin">
    <div class="card dashboard-card">
      <div class="card-body">
        <p class="card-text">{{ 20 }}</p>
        <h2 class="card-title">Produits moin vendus</h2>
      </div>
    </div>
  </div> -->
    </div>
  </div>
</template>
<script>

// import $ from "jquery";
// import "../../../../node_modules/bootstrap/dist/js/bootstrap.js";
// import "../../../../node_modules/bootstrap/dist/js/bootstrap.min.js";

import { rapport_statistiqueService } from "@/_services/rapport_statistique_services.js";


export default {

  name: "pharmacieStat",

  data() {
    return {
   
      total_unique_products_sold: 0,
      countProduct: 0,
    };
  },
  mounted() {

    rapport_statistiqueService
      .countProducts()
      .then((res) => {
        this.countProduct = res.data.total_quantity_all_products;
        // console.log("this.countProduct");
        // console.log(this.countProduct);

      })
      .catch((error) => {
        console.error(error);
      });

      rapport_statistiqueService
      .getDailyStatistics()
      .then((res) => {
        this.dataFacture = res.data.data;
        this.total_unique_products_sold = this.dataFacture.total_unique_products_sold;
        //  console.log(this.dataFacture);

      })
      .catch((error) => {
        console.error(error);
      });


  


},
methods: {


}

};

</script>

<style scoped>
/* Style pour la section principale du tableau de bord */
.dashboard-section {
  margin-bottom: 20px;
}

/* Style pour les cartes du tableau de bord */
.dashboard-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  /* margin-bottom: 15px; */
  margin-bottom: -17px;
}

/* .grid-margin {
margin-bottom: 1.5rem;
} */

.mt-3,
.template-demo>.btn,
.template-demo>.btn-toolbar,
.my-3 {
  margin-top: -2rem !important;
}

.dashboard-card:hover {
  transform: scale(1.02);
}

/* Style pour le texte des cartes */
.card-body {
  text-align: center;
}

/* Style pour les titres des cartes */
.card-title {
  margin-bottom: 8px;
  color: #0b5d3f;
  font-size: 1.2rem;
}

/* Style pour les valeurs des cartes */
.card-text {
  font-weight: bold;
  color: #0b5d3f;
  font-size: 1.5rem;
}

/* Ajoutez d'autres styles personnalisés au besoin */
</style>
<!-- <style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-body {
  text-align: center;
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.card-text {
  font-size: 2rem;
  font-weight: bold;
  color: #0B5D3F;
}
</style>

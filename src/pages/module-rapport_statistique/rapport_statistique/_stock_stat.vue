<template>
  <div>
    <h3 class="card-title text-white rounded p-1 mb-5 text-center"
    style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    Stocks et consommables
  </h3>
  <div class="row mt-3">
    <div class="col-lg-4 grid-margin" @click="redirectToDrugsInStockPage">
      <div class="card dashboard-card">
        <div class="card-body">
          <p class="card-text">{{ countDrugsInStock }}</p>
          <h2 class="card-title">Médicament(s) en stock</h2>
        </div>
      </div>
    </div>

    <div class="col-lg-4 grid-margin" @click="redirectToConsumablesInStockPage">
      <div class="card dashboard-card">
        <div class="card-body">
          <p class="card-text">{{ countConsumablesInStock }}</p>
          <h2 class="card-title">Consommable(s) en stock</h2>
        </div>
      </div>
    </div>

    <div class="col-lg-4 grid-margin" @click="redirectToNotebooksInStockPage">
      <div class="card dashboard-card">
        <div class="card-body">
          <p class="card-text">{{ countNotebookAndCardsInStock }}</p>
          <h2 class="card-title">Carnet(s) en stock</h2>
        </div>
      </div>
    </div>

    <div class="col-lg-4 grid-margin" @click="redirectToDrugsOutOfStockPage">
      <div class="card dashboard-card">
        <div class="card-body">
          <p class="card-text">{{ countDrugsOutOfStock }}</p>
          <h2 class="card-title">Médicament(s) en rupture</h2>
        </div>
      </div>
    </div>

    <div class="col-lg-4 grid-margin" @click="redirectToConsumablesOutOfStockPage">
      <div class="card dashboard-card">
        <div class="card-body">
          <p class="card-text">{{ countNotebookAndCardsOutOfStock }}</p>
          <h2 class="card-title">Consommable(s) en rupture</h2>
        </div>
      </div>
    </div>

    <div class="col-lg-4 grid-margin" @click="redirectToNotebooksOutOfStockPage">
      <div class="card dashboard-card">
        <div class="card-body">
          <p class="card-text">{{ countConsumablesOutOfStock }}</p>
          <h2 class="card-title">Carnet(s) en rupture</h2>
        </div>
      </div>
    </div>

    <div class="col-lg-4 grid-margin" @click="redirectToExpiredDrugsPage">
      <div class="card dashboard-card">
        <div class="card-body">
          <p class="card-text">{{ countExpiredDrugsInStock }}</p>
          <h2 class="card-title">Médicament(s) périmés</h2>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>

import $ from "jquery";
import "../../../../node_modules/bootstrap/dist/js/bootstrap.js";
import "../../../../node_modules/bootstrap/dist/js/bootstrap.min.js";

import { rapport_statistiqueService } from "@/_services";

export default {

  name: "stockStat",

  data() {
    return {
     countDrugsInStock: 0,
     countConsumablesInStock: 0,
     countNotebookAndCardsInStock: 0,
     countDrugsOutOfStock : 0,
     countConsumablesOutOfStock: 0,
     countNotebookAndCardsOutOfStock: 0,
     countExpiredDrugsInStock: 0,
   };
 },
 mounted() {
  rapport_statistiqueService
    .getCountDrugsInStock()
    .then((res) => {
      let distinctDrugsInfo = res.data.distinct_drugs_info;

      // Calculate the sum of all values in distinct_drugs_info
      let sumOfQuantities = Object.values(distinctDrugsInfo).reduce((acc, quantity) => acc + quantity, 0);

      // Assign the total sum to countDrugsInStock
      this.countDrugsInStock = sumOfQuantities;

      // this.countDrugsInStock = res.data.total_distinct_drug_count;
    }) .catch((err) => {
      console.log(err);
    });

  rapport_statistiqueService
  .getCountConsumablesInStock()
  .then((res) => {
    let distinctDrugsInfo = res.data.distinct_drugs_info;

    // Calculate the sum of all values in distinct_drugs_info
    let sumOfQuantities = Object.values(distinctDrugsInfo).reduce((acc, quantity) => acc + quantity, 0);

    // Assign the total sum to countDrugsInStock
    this.countConsumablesInStock = sumOfQuantities;
    this.countConsumablesInStock = res.data.total_distinct_drug_count;
  }) .catch((err) => {
    console.log(err);
  });

  rapport_statistiqueService
  .getCountNotebookAndCardsInStock()
  .then((res) => {
    // this.countNotebookAndCardsInStock = res.data.total_distinct_drug_count;
    let distinctDrugsInfo = res.data.distinct_drugs_info;

    // Calculate the sum of all values in distinct_drugs_info
    let sumOfQuantities = Object.values(distinctDrugsInfo).reduce((acc, quantity) => acc + quantity, 0);

    // Assign the total sum to countDrugsInStock
    this.countNotebookAndCardsInStock = sumOfQuantities;
  }) .catch((err) => {
    console.log(err);
  });

  rapport_statistiqueService
  .getCountDrugsOutOfStock()
  .then((res) => {
    this.countDrugsOutOfStock = res.data.out_of_stock_drugs_count;
  }) .catch((err) => {
    console.log(err);
  });

  rapport_statistiqueService
  .getCountConsumablesOutOfStock()
  .then((res) => {
    this.countConsumablesOutOfStock = res.data.out_of_stock_consumables_count;
  }) .catch((err) => {
    console.log(err);
  });

  rapport_statistiqueService
  .getCountExpiredDrugsInStock()
  .then((res) => {
    this.countExpiredDrugsInStock = res.data.expired_drugs_count;
  }) .catch((err) => {
    console.log(err);
  });

  rapport_statistiqueService
  .getCountNotebookAndCardsOutOfStock()
  .then((res) => {
    this.countNotebookAndCardsOutOfStock = res.data.out_of_stock_notebooks_and_cards_count;
  }) .catch((err) => {
    console.log(err);
  });
 },
 methods: {
    redirectToDrugsInStockPage() {
      this.$router.push('/medicaments/disponible/en-stock');
    },
    redirectToDrugsOutOfStockPage() {
      this.$router.push('/medicaments/en-rupture-de-stock');
    },
    redirectToExpiredDrugsPage() {
      this.$router.push('/medicaments/perimes');
    },
    redirectToConsumablesInStockPage() {
      this.$router.push('/consommables/disponible/en-stock');
    },
    redirectToConsumablesOutOfStockPage() {
      this.$router.push('/consommables/en-rupture-de-stock');
    },
    redirectToNotebooksInStockPage() {
      this.$router.push('/carnets/disponible/en-stock');
    },
    redirectToNotebooksOutOfStockPage() {
      this.$router.push('/carnets/en-rupture-de-stock');
    },
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

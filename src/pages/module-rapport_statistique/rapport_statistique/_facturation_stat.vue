<template>
  <div>
    <h3 class="card-title text-white rounded p-1 mb-5 text-center"
      style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      Facturation et Caisses
    </h3>

    <div class="row mt-3">
      <div class="col-lg-4 grid-margin">
        <div class="card dashboard-card">
          <div class="card-body">
            <p class="card-text">{{formatNumber(montant_total_factures_type_a) }}</p>
            <h2 class="card-title">Caisse prestation</h2>
          </div>
        </div>
      </div>

      <div class="col-lg-4 grid-margin">
        <div class="card dashboard-card">
          <div class="card-body">
            <p class="card-text">{{  formatNumberDecimal(montant_total_factures_type_p) }}</p>
            <h2 class="card-title">Caisse pharmacie</h2>
          </div>
        </div>
      </div>

      <div class="col-lg-4 grid-margin">
        <div class="card dashboard-card">
          <div class="card-body">
            <p class="card-text">{{ total_factures_emises }}</p>
            <h2 class="card-title">Factures émises</h2>
          </div>
        </div>
      </div>

      <div class="col-lg-4 grid-margin ">
        <div class="card dashboard-card">
          <div class="card-body">
            <p class="card-text">{{ total_factures_payees }}</p>
            <h2 class="card-title">Factures payées</h2>
          </div>
        </div>
      </div>

      <div class="col-lg-4 grid-margin">
        <div class="card dashboard-card">
          <div class="card-body">
            <p class="card-text">{{ total_factures_impayees }}</p>
            <h2 class="card-title">Factures impayées</h2>
          </div>
        </div>
      </div>

      <div class="col-lg-4 grid-margin">
        <div class="card dashboard-card">
          <div class="card-body">
            <p class="card-text">{{ total_factures_partiellement_payees }}</p>
            <h2 class="card-title">Factures partiellement payées</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

// import $ from "jquery";
// import "../../../../node_modules/bootstrap/dist/js/bootstrap.js";
// import "../../../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { rapport_statistiqueService } from "@/_services/rapport_statistique_services.js";

export default {

  name: "facturationStat",

  data() {
    return {
      montant_total_factures_type_a: 0,
      montant_total_factures_type_p: 0.00,
      total_factures_emises: 0,
      total_factures_payees: 0,
      total_factures_impayees: 0,
      total_factures_partiellement_payees: 0,

    };

  },

  mounted() {

    rapport_statistiqueService
      .getDailyStatistics()
      .then((res) => {
        this.dataFacture = res.data.data;
        // console.log(this.dataFacture);
        this.montant_total_factures_type_a = this.dataFacture.montant_total_factures_type_a;
        this.montant_total_factures_type_p = parseFloat(this.dataFacture.montant_total_factures_type_p);
        this.total_factures_emises = this.dataFacture.total_factures_emises;
        this.total_factures_payees = this.dataFacture.total_factures_payees;
        this.total_factures_impayees = this.dataFacture.total_factures_impayees;
        this.total_factures_partiellement_payees = this.dataFacture.total_factures_partiellement_payees;

      })
      .catch((error) => {
        console.error(error);
      });


  },
  methods: {


     formatNumberDecimal(number) {
    const formattedNumber = number.toLocaleString('fr-FR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: true,  // Activer le séparateur des milliers
        groupingSeparator: ' ',  // Utiliser l'espace comme séparateur des milliers
    });

    // Remplacer la virgule par le point pour le séparateur décimal
    return formattedNumber.replace(',', '.');
},


    formatNumber(value) {
      if (typeof value !== "number") {
        return value;
      }

      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },


    // formatNumberDecimal(value) {
    //   if (typeof value !== "number") {
    //     return value;
    //   }
    // }


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

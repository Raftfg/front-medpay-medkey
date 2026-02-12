<template>
  <section class="container-scroller">

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <!-- <h4 class="card-title">Ajouter un paiement</h4> -->
            <h3 class="card-title text-white rounded p-3 mb-3 text-center"
              style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)">
              Caisse
            </h3>

            <div>
              <ul class="nav nav-tabs" role="tablist">

                <li>
                  <button class="nav-link active font-weight-bold custom-tab" data-bs-toggle="tab" href="#tab1">
                    Ouverture Caisse </button>
                </li>
                <li>
                  <button class="nav-link font-weight-bold custom-tab" data-bs-toggle="tab" href="#tab2"> Fermeture Caisse
                  </button>
                </li>
                <li>
                  <button class="nav-link font-weight-bold custom-tab" data-bs-toggle="tab" href="#tab2"> Transfert de caisses
                  </button>
                </li>
              </ul>
              <div class="tab-content">
                <div class="tab-pane fade show active" id="tab1">
                  <span class="d-block mt-3"></span>

                  <div class="mx-auto mt-0 mb-4">
                    <b-button class="btn btn-success btn-medpay-green mr-2" size="sm" @click="ajouterSignataire"
                      v-b-tooltip.hover title="Ajouter" variant="success">
                      Ouverture
                    </b-button>


                  </div>

                  <!-- <table style="width:100%" class="table table-striped table-bordered table-sm row-border hover" id="table5"> -->
                  <table id="order-listing" ref="myTable" class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                      <tr>

                        <th style="width: 10%;">N° d'ouverture</th>
                        <th style="width: 10%;">Date</th>
                        <th style="width: 35%;">Caissier</th>
                        <th style="width: 10%;">Caisse A</th>

                        <th style="width: 10%;">Montant</th>
                        <!-- <th style="width: 20%;">Validé</th> -->
                        <th style="text-align: center !important;width: 15%;">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>

                        <td>123557788</td>
                        <td>12/03/23</td>
                        <td>DOSSOU Paul</td>
                        <td>Caisse 1</td>
                        <td>5000</td>

                        <!-- <td><label style="font-size : 11px !important"
                            class="badge badge-gradient-danger font-weight-bold text-white text-center  border-rounded rounded-pill">NON</label>
                        </td> -->

                        <td class="text-center " size="sm">
                          <!-- <b-button size="sm" @click="ajouterSignataire" v-b-tooltip.hover title="Ajouter"
                            variant="success">
                            <i class="mdi mdi-plus text-white menu-icon "></i>
                          </b-button> -->
                          <b-button size="sm" v-b-tooltip.hover title="Modifier" variant="warning">
                            <i class="fa fa-pencil-square-o text-dark" aria-hidden="true"></i>
                          </b-button>
                          <b-button size="sm" v-b-tooltip.hover title="Supprimer" variant="danger">
                            <i class="mdi mdi mdi-delete text-white menu-icon"></i>
                          </b-button>

                        </td>
                      </tr>


                    </tbody>
                  </table>
                </div>

                <div class="tab-pane fade " id="tab2">
                  <span class="d-block mt-3"></span>


                  <div class="mx-auto mt-0 mb-4">
                    <b-button class="btn btn-success btn-medpay-green mr-2" size="sm" @click="ajouterSignataire"
                      v-b-tooltip.hover title="Ajouter" variant="success">
                      Fermeture
                    </b-button>


                  </div>
                  <table id="order-listing" ref="myTable" class="table table-bordered" width="100%" cellspacing="0">


                    <thead>
                      <tr>

                        <th style="width: 10%;">N° Fermeture</th>
                        <th style="width: 10%;">Date</th>
                        <th style="width: 35%;">Caissier</th>
                        <th style="width: 10%;">Caisse A</th>

                        <th style="width: 10%;">Montant</th>
                        <!-- <th style="width: 20%;">Validé</th> -->
                        <th style="text-align: center !important;width: 15%;">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>

                        <td>123557788</td>
                        <td>12/03/23</td>
                        <td>DOSSOU Paul</td>
                        <td>Caisse 1</td>
                        <td>5000</td>

                        <!-- <td><label style="font-size : 11px !important"
                            class="badge badge-gradient-danger font-weight-bold text-white text-center  border-rounded rounded-pill">NON</label>
                        </td> -->

                        <td class="text-center " size="sm">
                          <!-- <b-button size="sm" @click="ajouterSignataire" v-b-tooltip.hover title="Ajouter"
                            variant="success">
                            <i class="mdi mdi-plus text-white menu-icon "></i>
                          </b-button> -->
                          <b-button size="sm" v-b-tooltip.hover title="Modifier" variant="warning">
                            <i class="fa fa-pencil-square-o text-dark" aria-hidden="true"></i>
                          </b-button>
                          <b-button size="sm" v-b-tooltip.hover title="Supprimer" variant="danger">
                            <i class="mdi mdi mdi-delete text-white menu-icon"></i>
                          </b-button>

                        </td>
                      </tr>


                    </tbody>
                  </table>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>


    <!-- modal ajouter un sigantaitaire -->

    <div class="modal fade" id="facturePatient" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <h4 class="card-title text-white  p-3 mt-4 text-center  col-12"
          style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top : -17px !important">
          Ouverture
        </h4>

        <div class="modal-content">
          <div class="modal-body">
            <div class="form-group">
              <label for="inputField1" style="color:black !important">Caissier</label>
              <input type="text" class="form-control" id="inputField1" v-model="user" placeholder="Nom et prénom "
                disabled>
            </div>
            <div class="form-group">
              <label for="inputField2">Montant</label>
              <input type=" text" class="form-control" id="inputField2" v-model="titre" placeholder="Montant" disabled>
            </div>

          </div>
          <div class="modal-footer">
            <div class="d-flex justify-content-between col-12 flex-row">
              <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal">
                Annuler
              </button>

              <button type="submit" class="btn btn-success btn-medpay-green">
                Confirmer
              </button>
              <!-- <button @click="cancel"  class="btn btn-secondary btn-medpay-gray ">Annuler</button> -->
            </div>
          </div>
        </div>
      </div>
    </div>




  </section>
</template>

<script></script>

<script type="text/javascript">
import $ from "jquery";
import { format } from "date-fns";

import "../../../../node_modules/bootstrap/dist/js/bootstrap.js"; // tres important pour le modal
import "../../../../node_modules/bootstrap/dist/js/bootstrap.min.js"; // tres important pour le modal



// import "@/asset/js/kkiapay.js";

// import "../../../assets/js/alertify.js";

export default {
  name: "create-signataire",

  data() {
    return {

      fileName: "Parcourir...",
    }
  
  
  
  },

  methods: {
    
    ajouterSignataire(){

      $("#facturePatient").modal("show");
    },

    updateFile(event) {
      this.fileName = event.target.files[0].name;
      console.log( this.fileName);
    },
  
  },


    mounted() {}


};
</script>

<style scoped>
@import "../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";




.radio-label {
  color: white !important;
  /* Change la couleur du texte en blanc */
}

.custom-radio {
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-between !important;
}

.custom-file-input~.custom-file-label::after {
  content: "Telecharger";
}

.custom-file-label-purple {
  color: #000000;
  /* Couleur violette */
  background: linear-gradient(to bottom, #606264, #606264);
  /* background: linear-gradient(to bottom, #6ca597, #7ba89d); */


}

.custom-file-label::after {
  content: 'Télécharger';
  /* display: block; */
  background: linear-gradient(to bottom, #606264, #606264);
  /* Dégradé de bleu */
  /* color: #000000; */
  color: white !important;
  /* Couleur du texte du libellé */
  cursor: pointer;
  /* margin-left: 8px; */
}

table th {
  font-size: 16px !important;

}

tbody td {
  padding: 2.5px !important;
  /* Ajustez cette valeur selon vos besoins pour réduire la hauteur des cellules */
  color: black !important;
  font-size: 15px !important;
  vertical-align: middle !important;
  /* Centre le contenu verticalement dans les cellules */
}

.badge-rounded {
  border-radius: 50% !important;
  padding: 8px 15px !important;
  /* Ajustez la taille de padding selon vos besoins */
}


.nav-link.active.custom-tab {
  background-color: #0b5d3f !important;
  /* Couleur de fond sombre */
  color: #fff !important;
  /* Couleur du texte en surbrillance */
}

/* Style pour les onglets inactifs */
.nav-link.custom-tab {
  background-color: #e7ecef !important;
  /* Couleur de fond blanche par défaut */
  color: #000 !important;
  /* Couleur du texte par défaut */
}


.custom-tabset .nav-tabs .nav-link.active,
.custom-tabset .nav-tabs .nav-item.show .nav-link {
  color: #ffffff !important;
  /* Couleur du texte pour l'onglet actif */
  font-weight: bold !important;
  background-color: #0b5d3f !important;
  /* Couleur de fond pour l'onglet actif */
  /* border-color: #89c7fd #2b61ea #5f9ac1 !important; */
  /* Couleur de la bordure pour l'onglet actif */
}

.custom-tabset .nav-tabs .nav-link {
  color: #000000 !important;
  /* Couleur du texte pour les onglets non actifs */
  font-weight: bold !important;
  background-color: #e7ecef !important;
  /* Couleur de fond pour les onglets non actifs */
}

.text-red {
  color: red !important;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.modal--fullscreen {
  max-width: 90vw;
}

select {
  cursor: pointer;
  height: 43px !important;
}

input[type="radio"].demo6 {
  display: none;
}

input[type="radio"].demo6+label {
  position: relative;
  padding-left: 1.3rem;
}

input[type="radio"].demo6+label::before,
input[type="radio"].demo6+label::after {
  display: block;
  position: absolute;
  box-sizing: border-box;
  content: "";
  border-radius: 1rem;
}

input[type="radio"].demo6+label::before {
  bottom: 0;
  left: 0;
  border: 1px solid #ccc;
  background-color: #eee;
  width: 1rem;
  height: 1rem;
}

input[type="radio"].demo6+label::after {
  bottom: 3px;
  left: 3px;
  width: calc(1rem - 6px);
  height: calc(1rem - 6px);
}

input[type="radio"].demo6:checked+label::after {
  background-color: #45c28e;
}

input[type="checkbox"].demo2 {
  display: none;
}

input[type="checkbox"].demo2+label::before {
  content: "";
  border: 1px solid #45c28e;
  padding: 0 0.6rem;
  margin-right: 0.3rem;
}

input[type="checkbox"].demo2:checked+label::before {
  background-color: #45c28e;
}

fieldset.scheduler-border {
  border: 1px groove #ddd !important;
  padding: 0 1.4em 1.4em 1.4em !important;
  margin: 0 0 1.5em 0 !important;
  -webkit-box-shadow: 0px 0px 0px 0px #000;
  box-shadow: 0px 0px 0px 0px #000;
}

legend.scheduler-border {
  font-size: 1.2em !important;
  font-weight: bold !important;
  text-align: left !important;
  width: auto;
  padding: 0 10px;
  border-bottom: none;
}

th,
td {
  text-align: center;
}

th {
  background-color: #d6dbd6;
  border: 1px solid #dee2e6;
}

.container-fluid {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
}

h2,
h4 {
  font-weight: bold;
  margin: 0;
}

.mb-4 {
  margin-bottom: 2rem;
}

img {
  max-width: 100%;
}

table {
  margin-bottom: 1rem;
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
}

input,
select {
  font-weight: bold !important;
  color: rgb(78, 77, 77) !important;
}

select option {
  font-weight: bold !important;
  color: rgb(78, 77, 77) !important;
}

table td,
table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

table th {
  font-weight: bold;
}

table tbody+tbody {
  border-top: 2px solid #ffffff;
}

.table-bordered {
  border: 1px solid #dee2e6;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #dee2e6;
}

.table-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}

.text-right {
  text-align: right;
}

.mt-5 {
  margin-top: 3rem;
}

.text-danger {
  color: #dc3545;
}
</style>

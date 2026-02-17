<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 col-md-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <h4 class=" text-white rounded p-3 text-center font-weight-bold"
              style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)">
              Liste des patients éligibles pour un remboursement
            </h4>

            <div class="table-responsive py-1">
              <table id="order-listing" ref="myTableFactures" class="table table-bordered">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Ipp</th>
                    <th>Patient</th>
                    <th>Age</th>
                    <th>Téléphone </th>
                    <th>Maison</th>
                    <th>Sexe</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  <tr class="row-hover" v-for="(patient, index) in patients" :key="patient.uuid">
                    <td>{{ index + 1 }}</td>
                    <td>{{ patient.ipp }}</td>
                    <td style="text-transform: uppercase">
                      {{ patient.lastname }} {{ patient.firstname }}
                    </td>
                    <td>{{ patient.age }}</td>
                    <td>{{ patient.phone }}</td>
                    <td>{{ patient.maison }}</td>
                    <td>{{ patient.gender }}</td>
                    <td class="text-right" width="50px">
                      <div class="btn-group btn-group-sm" role="group">
                        <button id="btnGroupDrop1" type="" style="padding: 0px 10px" class="btn btn-light dropdown-toggle"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          &nbsp;
                          <i class="fa fa-tasks" aria-hidden="true"></i> &nbsp;
                        </button>
                        <div class="dropdown-menu action-button-div" aria-labelledby="btnGroupDrop1"
                          style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%)">
                          <a @click="detail(patient.id)">
                            <!-- @click="showPaymentDetails(patient)" -->
                            <button class="dropdown-item font-weight-bold" style="color: black;" data-toggle="modal"
                              data-target="">
                              <i class="fa fa-suitcase" aria-hidden="true"></i>
                              Voir les paiements
                            </button>
                          </a>
                          <!-- <a @click="openRefundInterface(patient)">
                            <button class="dropdown-item font-weight-bold" style="color: black;">
                              <i class="fa fa-plus" aria-hidden="true"></i>
                              Rembourser

                            </button>
                          </a> -->
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

            </div>
            <!-- <div v-if="indexSpinner" class="spinner-border spinner-border-sm text-secocndary" style="font-size: 11px"
              role="status">
              <span class="sr-only">Loading...</span>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="paymentDetailsModal" tabindex="-1" role="dialog"
      aria-labelledby="paymentDetailsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="paymentDetailsModalLabel">
              Détails des Paiements
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <b-container fluid>
              <!-- <b-row>
                <b-col md="6">Date du paiement :</b-col>
                <b-col md="6">{{ paymentDetails.date }}</b-col>
              </b-row> -->
              <b-row>
                <b-col md="6"><strong>Montant payé :</strong></b-col>
                <b-col md="6">{{ paymentDetails.amount ? paymentDetails.amount : 'NA' }}</b-col>
              </b-row>

              <!-- <b-row>
                <b-col md="6">Mode de paiement :</b-col>
                <b-col md="6">{{ paymentDetails.paymentMode }}</b-col>
              </b-row> -->
              <!-- Ajoutez d'autres détails de paiement si nécessaire -->
            </b-container>
          </div>
          <div class="modal-footer text-center">
            <button type="button" class="btn btn-danger mx-auto d-block" data-dismiss="modal"
              style="border-radius: 20px;">
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import $ from "jquery";

import * as JSZip from "../../../../node_modules/jszip";
window.JSZip = JSZip;
import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = vfsFonts.pdfMake.vfs;
import "../../../../node_modules/datatables.net-dt";
import "../../../../node_modules/datatables.net-bs4/js/dataTables.bootstrap4";
import "../../../../node_modules/datatables.net-buttons/js/dataTables.buttons";
import "../../../../node_modules/datatables.net-buttons-bs4/js/buttons.bootstrap4";
import FrenchTranslation from "@/assets/datatable/French.json";
import "../../../../node_modules/datatables.net-buttons/js/buttons.html5.js";
import "../../../../node_modules/datatables.net-buttons/js/buttons.print.js";
import "../../../../node_modules/datatables.net-buttons/js/buttons.colVis.js";
import "../../../../node_modules/bootstrap/dist/js/bootstrap.js"; // tres important pour le modal
import "../../../../node_modules/bootstrap/dist/js/bootstrap.min.js"; // tres important pour le modal
// import { recouvrementService } from "@/_services/facture_services.js";
import { remboursementService } from "@/_services";
import { patientService } from "@/_services";
require("datatables.net-dt");

export default {
  name: "list-patient-remboursement",

  data() {
    return {
      selectedPatient: null,
      paymentDetails: {
        amount: "",
      },
      patients: [],
      deleteIndex: null,
      deleteName: "",
      table: null,
      q: "",
      lastname: "",
      firstname: "",
      age: "",
      date_birth: "",
      maison: "",
      email: "",
      whatsapp: "",
      profession: "",
      gender: "",
      emergency_contac: "",
      autre: "",
      ipp: "",
      // id: "",
      uuid: "",
    };
  },

  mounted() {
    remboursementService.getShowEligiblePatients().then((res) => {
      this.patients = res.data.data;
      this.$nextTick(() => {
        const table = $(this.$refs.myTableFactures).DataTable({
          // Configuration de la table DataTable
          dom:
            '<"row d-flex justify-content-between"<"text-left"B><"text-right"f>>' +
            '<"row"<"col-md-12"tr>>' +
            '<"row d-flex"<"col-md-6"i><"col-md-6"p>>',
          pageLength: 10, // Définir le nombre de résultats par page
          language: FrenchTranslation, // Configuration de la langue
          buttons: [
            {
              extend: "pdfHtml5",
              charset: "utf-8",
              bom: true,
              className: "btn btn-gray btn-sm",
            },
            {
              extend: "excelHtml5",
              charset: "utf-8",
              bom: true,
              className: "btn btn-gray btn-sm",
            },
          ],
        });



        if (table) {
          $(table).DataTable().clear().destroy(); // Détruire DataTables s'il est déjà initialisé
          $(table).DataTable(); // Réinitialiser DataTables
        }
      });
    });
    // Attachez l'événement hidden.bs.modal au modal
    $('#paymentDetailsModal').on('hidden.bs.modal', this.resetModalData);
  },
  beforeDestroy() {
    // Détachez l'événement hidden.bs.modal pour éviter les fuites de mémoire
    $('#paymentDetailsModal').off('hidden.bs.modal', this.resetModalData);
  },
  methods: {
     detail(id) {
      this.$router.push("/rembourse_recouvre/detail/" + id);
    },
    // Ajoutez cette méthode pour afficher les détails du paiement
    showPaymentDetails(patient) {
      // Utilisez le service pour obtenir les détails du paiement
      this.selectedPatient = patient;
      remboursementService.getPaymentDetails(patient.id).then((res) => {
        if (res.data.success) {
          this.paymentDetails = res.data.data[0]; // Stockez les détails du paiement
          console.log("ok");
          console.log(this.paymentDetails);
          // console.log(this.paymentDetails[0].amount);
          // Affichez le modal
          $('#paymentDetailsModal').modal('show');
        } else {
          // Gérez l'erreur, par exemple, affichez un message d'erreur
          console.error('Erreur lors de la récupération des détails de paiement.');
        }
      });
    },
    // Ajoutez cette méthode pour réinitialiser les données du modal
    resetModalData() {
      this.paymentDetails = {
        amount: "",
      };
    },
  },
};
</script>

<style scoped>
@import "../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
/* @import '../../../../node_modules/datatables.net-dt/css/jquery.dataTables.css'; */

@import "../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";

/* Styles pour la page d'impression */

/* Styles spécifiques pour l'écran (non imprimé) */
@media screen {
  /* Vous pouvez définir ici les styles pour l'affichage à l'écran */
}

.custom-left-align {
  text-align: left !important;
}

table th,
td {
  text-align: left;
}

.table th {
  background-color: #d6dbd6 !important;
  border: 1px solid #dee2e6;
}

.col-sm-6 p {
  margin-bottom: 2px !important;
}

table td th {
  border-top: 2px solid #ffffff;
}

th,
td {
  text-align: left;
}

.table-bordered {
  border: 1px solid #dee2e6;
}

.table-bordered td {
  border: 1px solid #b6b9bb;
}

th {
  background-color: #caceca;
  border: 1px solid #b6b9bb;
}

select {
  cursor: pointer;
  height: 43px !important;
}


.row-hover:hover {
  cursor: pointer !important;
  background-color: hsl(159, 38%, 25%);
  color: white !important;

  /* Curseur pointeur au survol des lignes du tableau */
}

.bob {
  cursor: pointer !important;
  background-color: hsl(159, 38%, 25%);
  color: white;
  border-radius: 25px;

  /* Curseur pointeur au survol des lignes du tableau */
}

.row-hover:hover td {
  cursor: pointer !important;
  background-color: hsl(159, 38%, 25%);
  color: white !important;
}
</style>

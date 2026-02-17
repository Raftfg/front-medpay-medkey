<template>
  <section class="container-scroller">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold"
              >Paramétrage
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Paiement et Facturation
          </li>
          <li
            class="breadcrumb-item active text-success font-weight-bold"
            aria-current="page"
          >
            Liste
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-lg-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Liste des paiements</h4>
            <div class="mx-auto mt-5 mb-5">
              <router-link to="/payement/create">
                <button type="submit" class="btn btn-success btn-medpay-green mr-2">
                  Ajouter
                </button>
              </router-link>
            </div>
            <div class="table-responsive">
              <table
                id="order-listing"
                ref="myTable"
                class="table table-bordered"
              >
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Date</th>
                    <th>Référence Facture</th>
                    <th>Mode</th>
                    <th>Patient</th>
                    <th>Montant versé</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(facture, index) in factures" :key="facture.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ formatDate(facture.created_at) }}</td>
                    <td>{{ facture.reference }}</td>
                    <td>{{ facture.mode_payement }}</td>
                    <td>{{ facture.nom }} {{ facture.prenom }}</td>
                    <td>{{ facture.total_montant }}</td>
                    <td class="text-center">
                      <!-- <b-button @click="detail(assurance)" size="sm" v-b-tooltip.hover title="Détail" variant="success">
                        <i class="mdi   mdi-eye text-white menu-icon"></i>
                      </b-button> -->
                      <b-button
                        @click="detail(facture, index)"
                        size="sm"
                        v-b-tooltip.hover
                        title="Détail"
                        variant="success"
                      >
                        <i
                          class="mdi   mdi-eye text-white menu-icon"
                        ></i>
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

    <div
      class="modal fade"
      id="showDetail"
      tabindex="-1"
      role="dialog"
      aria-labelledby="showDetailLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content bg-white">
          <div class="modal-header">
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" id="print-section" ref="modalContent">
            <div class="container-fluid">
              <div class="row mb-2 mr-0 ml-0 col-sm-12">
                <div class="col-sm-4">
                  <div class="mx-auto text-center">
                    <img
                      src="@/assets/images/logo-ministere.png"
                      alt="logo"
                      style="margin-left: -70px; width: 65%"
                    />
                    <img
                      src="@/assets/images/oms.svg"
                      alt="logo"
                      class="w-50"
                    />
                  </div>
                </div>
                <div class="col-sm-4 text-center mt-auto mb-auto">
                  <img
                    src="@/assets/images/logopay.png"
                    alt="logo"
                    class="w-50"
                  />
                </div>
                <div class="col-sm-4 mr-0" style="display: flex">
                  <div
                    class="col-sm-12"
                    style="display: flex; margin-left: 5rem"
                  >
                    <div>
                      <h3
                        style="
                          margin-top: 5px;
                          text-transform: uppercase;
                          font-size: 0.7rem;
                          font-weight: bold;
                          text-align: right;
                        "
                      >
                        Direction gérérale du tresor et de la comptabilité
                        publique
                      </h3>

                      <h4
                        style="
                          font-size: 0.7em;
                          font-weight: bold;
                          text-align: right;
                        "
                      >
                        Tél: 21 30 19 37 - Fax: 21 30 07 58
                      </h4>
                      <h3
                        style="
                          text-transform: uppercase;
                          font-size: 0.6rem;
                          font-weight: bold;
                          text-align: right;
                        "
                      >
                        BP : 40 cotonou - route de l'aéroport
                      </h3>
                    </div>
                    <img src="@/assets/images/tresor.png" class="w-25 mt-n1" />
                  </div>
                </div>
              </div>

              <hr style="background-color: rgb(156, 151, 151)" class="mt-n2" />

              <div class="row mb-1">
                <div class="col-sm-6">
                  <h4>Partie versante</h4>
                  <p>
                    <strong> {{ nom }} {{ prenom }}</strong>
                  </p>
                  <p>{{ getPatientTelephone() }}</p>
                  <p>{{ getPatientAdresse() }}</p>
                </div>
                <div class="col-sm-6 text-right">
                  <!-- <h4>Facture N° {{ invoice.number }}</h4> -->
                  <p>
                    <strong
                      >Date :
                      {{
                        new Date(date).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "numeric",
                          year: "numeric",
                        })
                      }}</strong
                    >
                  </p>
                  <p>Hôpital de Zone de KETOU</p>
                  <p>Tél. 68 90 65 45</p>
                </div>
              </div>

              <div class="table-responsive">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>Mode</th>
                      <th>code</th>
                      <th>Désignation</th>
                      <th>Quantité</th>
                      <th>Prix unitaire</th>
                      <th>Montant</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(factureDetail, index) in factureDetails"
                      :key="index"
                    >
                      <td>{{ factureDetail.mode_payement }}</td>
                      <td>
                        <span v-if="factureDetail.code === null">AAAAA</span>
                        <span v-else> {{ factureDetail.code }}</span>
                      </td>

                      <td>
                        {{ getNomActe(factureDetail.acte_medical_id) }}
                      </td>
                      <!-- <td>{{  getNomActe(factureDetail.acte_medical_id) }}</td> -->
                      <td>{{ factureDetail.quantite }}</td>
                      <td>{{ factureDetail.prix }}</td>
                      <td>{{ factureDetail.prix * factureDetail.quantite }}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="5" class="text-right">
                        <strong>Montant Total (+) </strong>
                      </td>
                      <td>
                        <strong
                          >{{
                            formatNumber(calculerMontantTotal())
                          }}
                          FCFA</strong
                        >
                      </td>
                    </tr>
                    <tr>
                      <td colspan="5" class="text-right">
                        <strong> Total Prise en charge (-)</strong>
                      </td>
                      <td>
                        <strong
                          >{{ formatNumber(totalPriseEncharge) }} FCFA</strong
                        >
                      </td>
                    </tr>
                    <tr>
                      <td
                        colspan="5"
                        class="text-right"
                        style="background-color: rgb(213, 219, 218)"
                      >
                        <strong>Montant Total Versé</strong>
                      </td>
                      <td style="background-color: rgb(213, 219, 218)">
                        <strong>{{ formatNumber(difference) }} FCFA</strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div class="row mt-1">
                <div class="col-sm-6">
                  <p>
                    Arrête la présente facture à la somme de :
                    <strong
                      >{{ convertNumberToLetter(difference) }} FCFA
                    </strong>
                  </p>

                  <img
                    src="@/assets/images/codeQR.png"
                    alt="logo"
                    class="w-50"
                  />
                </div>
                <div class="col-sm-6 text-right">
                  <p><strong> Le Chef Caissier </strong></p>
                  <img
                    src="@/assets/images/signature.png"
                    alt="logo"
                    class="w-25"
                  />
                  <p><strong> Félicien DAGBOGBO </strong></p>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <router-link class="" to="">
              <b-button
                size="sm"
                v-b-tooltip.hover
                title="Whatsapp"
                variant="success"
              >
                <i class="mdi mdi mdi-whatsapp text-white menu-icon"></i>
              </b-button>
            </router-link>
            <router-link class="" to="">
              <b-button
                size="sm"
                v-b-tooltip.hover
                title="Email"
                variant="info"
              >
                <i class="mdi mdi mdi-email text-white menu-icon"></i>
              </b-button>
            </router-link>
            <router-link class="" to="">
              <b-button
                size="sm"
                v-b-tooltip.hover
                title="MMS"
                variant="primary"
              >
                <i class="mdi mdi-message-text text-white menu-icon"></i>
              </b-button>
            </router-link>
            <button
              type="button"
              class="btn btn-secondary btn-rounded"
              data-dismiss="modal"
            >
              Fermer
            </button>

            <button type="button" class="btn btn-info">Imprimer</button>
            <!-- <button type="button" class="btn btn-info" @click="printModal">Imprimer</button> -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import $ from "jquery";
// import QRCode from 'qrcode';

import * as JSZip from "jszip";
window.JSZip = JSZip;
import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = vfsFonts.pdfMake.vfs;
import "datatables.net-dt";
import "../../../node_modules/datatables.net-bs4/js/dataTables.bootstrap4";
import "../../../node_modules/datatables.net-buttons/js/dataTables.buttons";
import "../../../node_modules/datatables.net-buttons-bs4/js/buttons.bootstrap4";
import FrenchTranslation from "@/assets/datatable/French.json";
import "../../../node_modules/datatables.net-buttons/js/buttons.html5.js";
import "../../../node_modules/datatables.net-buttons/js/buttons.print.js";
import "../../../node_modules/datatables.net-buttons/js/buttons.colVis.js";
import "../../../node_modules/bootstrap/dist/js/bootstrap.js"; // tres important pour le modal
import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js"; // tres important pour le modal
import { AssuranceService } from "@/_services/assurances_services.js";
import { compagnieService } from "@/_services/compagnie_services.js";
import { factureService } from "@/_services/facture_services.js";
import { patientService } from "@/_services";
import { actsService } from "@/_services";
import { pourcentagePatient } from "@/_services/pourcentage_indigence_patient_services.js";
import { PriseEnChargePatientService } from "@/_services/priseenchargepatient_services.js";
import QRCode from "qrcode";

require("datatables.net-dt");

export default {
  name: "list-facture",

  props: {
    id: {
      type: Number,
    },
  },

  data() {
    return {
      factures: [],
      table: null,
      factureDetails: [],
      nom: "",
      patientId: "",
      patient: {},
      patients: [],
      pourcentage: "",
      id: "",
      assurance: [],
      date: "",
      nom: "",
      prenom: "",
      code: "",
      autre: "",
      prix: "",
      quantite: "",
      montant: "",
      mode_payement: "",
      total_montant: "",
      payement_id: "",
      nomActeResult: "",
      nomsActes: [],
      acts: [],
      assurancePourcentage: null,
      pourcentageIndigence: null,
      totalPriseEncharge: "",
      difference: "",
      qrCodeUrl: "",
    };
  },

  mounted() {
    this.generateQRCode();

    patientService.getAllPatients().then((res) => {
      this.patients = res.data.data;
      // console.log(this.patients);
    });

    actsService.getAllActes().then((res) => {
      this.acts = res.data.data;
    });

    factureService.getAllFatures().then((res) => {
      this.factures = res.data.data;

      this.$nextTick(() => {
        const table = $(this.$refs.myTable).DataTable({
          // dom: '<"html5buttons"B>lTfgtip',
          dom:
            '<"row mb-3"<"col-md-12"B>>' +
            '<"row mb-0"<"col-md-6"l><"col-md-6"f>>' +
            '<"row"<"col-md-12"tr>>' +
            '<"row"<"col-md-6"i><"col-md-6"p>>',
          //  dom: 'Bfrtip',
          //  dom: 'lBfrtip',

          pageLength: 10, // Définir le nombre de résultats par page
          language: FrenchTranslation,
          buttons: [
            {
              extend: "csvHtml5", // Extend the excel button
            },
            {
              extend: "excelHtml5",
            },

            {
              extend: "pdfHtml5",
              // className: 'btn btn-primary',
            },

            { extend: "print" },
            { extend: "copy" },
          ],
        });

        table
          .buttons()
          .container()
          .prependTo("#myTable_wrapper .col-md-6:eq(0)");
      });
    });
  },

  methods: {
    generateQRCode() {
      const data = {
        invoiceNumber: "123456",
        amount: 100.0,

        // Autres détails de la facture
      };

      const qrCodeData = JSON.stringify(data);

      QRCode.toDataURL(qrCodeData, (err, url) => {
        if (err) {
          console.error(err);
          return;
        }

        this.qrCodeUrl = url;
      });
    },

    detail(facture, index) {
      let assuranceMontant = 0;
      let indigenceMontant = 0;
      const payementId = facture.payement_id;
      this.patientId = facture.patient_id;
      factureService
        .getFacture(payementId)
        .then((res) => {
          const factureDetails = res.data.data;
          this.factureDetails = factureDetails;
          this.nom = this.factureDetails[0].nom;
          this.prenom = this.factureDetails[0].prenom;

          const montantTotalActe = this.calculerMontantTotal();

          PriseEnChargePatientService.getAssurancePatient(facture.patient_id)
            .then((res) => {
              this.assurancePourcentage = res.data.data.pourcentage_assurance;
              if (this.assurancePourcentage) {
                assuranceMontant =
                  (this.assurancePourcentage * montantTotalActe) / 100;
              } else {
                assuranceMontant = 0;
              }

              pourcentagePatient
                .getPourcentagePatient(facture.patient_id)
                .then((res) => {
                  this.pourcentageIndigence = res.data.data;
                  if (this.pourcentageIndigence) {
                    indigenceMontant =
                      (this.pourcentageIndigence * montantTotalActe) / 100;
                  } else {
                    indigenceMontant = 0;
                  }

                  this.totalPriseEncharge = assuranceMontant + indigenceMontant;
                  this.difference = montantTotalActe - this.totalPriseEncharge;
                  console.log(this.difference);

                  $("#showDetail").modal("show");
                })
                .catch((error) => {
                  console.error(error);
                });
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    },

    calculerMontantTotal() {
      let montantTotal = 0;
      for (const factureDetail of this.factureDetails) {
        montantTotal += factureDetail.prix * factureDetail.quantite;
      }
      return montantTotal;
    },

    getNomActe(idActe) {
      const acte = this.acts.find((acte) => acte.id === idActe);
      return acte ? acte.name : "Autre";
    },

    getPatientTelephone() {
      const patient = this.patients.find(
        (patient) => this.patientId === patient.id
      );
      return patient ? patient.telephone : "";
    },

    getPatientAdresse() {
      const patient = this.patients.find(
        (patient) => this.patientId === patient.id
      );
      return patient ? patient.adresse : "";
    },

    formatDate(date) {
      const options = { day: "numeric", month: "numeric", year: "numeric" };
      return new Date(date).toLocaleDateString("fr-FR", options);
    },

    formatNumber(value) {
      if (typeof value !== "number") {
        return value;
      }
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },

    Unite(nombre) {
      let unite;
      switch (nombre) {
        case 0:
          unite = "zéro";
          break;
        case 1:
          unite = "un";
          break;
        case 2:
          unite = "deux";
          break;
        case 3:
          unite = "trois";
          break;
        case 4:
          unite = "quatre";
          break;
        case 5:
          unite = "cinq";
          break;
        case 6:
          unite = "six";
          break;
        case 7:
          unite = "sept";
          break;
        case 8:
          unite = "huit";
          break;
        case 9:
          unite = "neuf";
          break;
      }
      return unite;
    },

    Dizaine(nombre) {
      let dizaine;
      switch (nombre) {
        case 10:
          dizaine = "dix";
          break;
        case 11:
          dizaine = "onze";
          break;
        case 12:
          dizaine = "douze";
          break;
        case 13:
          dizaine = "treize";
          break;
        case 14:
          dizaine = "quatorze";
          break;
        case 15:
          dizaine = "quinze";
          break;
        case 16:
          dizaine = "seize";
          break;
        case 17:
          dizaine = "dix-sept";
          break;
        case 18:
          dizaine = "dix-huit";
          break;
        case 19:
          dizaine = "dix-neuf";
          break;
        case 20:
          dizaine = "vingt";
          break;
        case 30:
          dizaine = "trente";
          break;
        case 40:
          dizaine = "quarante";
          break;
        case 50:
          dizaine = "cinquante";
          break;
        case 60:
          dizaine = "soixante";
          break;
        case 70:
          dizaine = "soixante-dix";
          break;
        case 80:
          dizaine = "quatre-vingt";
          break;
        case 90:
          dizaine = "quatre-vingt-dix";
          break;
      }
      return dizaine;
    },

    NumberToLetter(nombre) {
      let i, j, n, quotient, reste, nb;
      let ch;
      let numberToLetter = "";

      if (nombre.toString().replace(/ /gi, "").length > 15)
        return "dépassement de capacité";
      if (isNaN(nombre.toString().replace(/ /gi, "")))
        return "Nombre non valide";

      nb = parseFloat(nombre.toString().replace(/ /gi, ""));
      if (Math.ceil(nb) !== nb) return "Nombre avec virgule non géré.";

      n = nb.toString().length;
      switch (n) {
        case 1:
          numberToLetter = this.Unite(nb);
          break;
        case 2:
          if (nb > 19) {
            quotient = Math.floor(nb / 10);
            reste = nb % 10;
            if (nb < 71 || (nb > 79 && nb < 91)) {
              if (reste === 0) numberToLetter = this.Dizaine(quotient * 10);
              if (reste === 1)
                numberToLetter =
                  this.Dizaine(quotient * 10) + "-et-" + this.Unite(reste);
              if (reste > 1)
                numberToLetter =
                  this.Dizaine(quotient * 10) + "-" + this.Unite(reste);
            } else
              numberToLetter =
                this.Dizaine((quotient - 1) * 10) +
                "-" +
                this.Dizaine(10 + reste);
          } else numberToLetter = this.Dizaine(nb);
          break;
        case 3:
          quotient = Math.floor(nb / 100);
          reste = nb % 100;
          if (quotient === 1 && reste === 0) numberToLetter = "cent";
          if (quotient === 1 && reste !== 0)
            numberToLetter = "cent" + " " + this.NumberToLetter(reste);
          if (quotient > 1 && reste === 0)
            numberToLetter = this.Unite(quotient) + " cents";
          if (quotient > 1 && reste !== 0)
            numberToLetter =
              this.Unite(quotient) + " cent " + this.NumberToLetter(reste);
          break;
        case 4:
        case 5:
        case 6:
          quotient = Math.floor(nb / 1000);
          reste = nb - quotient * 1000;
          if (quotient === 1 && reste === 0) numberToLetter = "mille";
          if (quotient === 1 && reste !== 0)
            numberToLetter = "mille" + " " + this.NumberToLetter(reste);
          if (quotient > 1 && reste === 0)
            numberToLetter = this.NumberToLetter(quotient) + " mille";
          if (quotient > 1 && reste !== 0)
            numberToLetter =
              this.NumberToLetter(quotient) +
              " mille " +
              this.NumberToLetter(reste);
          break;
        case 7:
        case 8:
        case 9:
          quotient = Math.floor(nb / 1000000);
          reste = nb % 1000000;
          if (quotient === 1 && reste === 0) numberToLetter = "un million";
          if (quotient === 1 && reste !== 0)
            numberToLetter = "un million" + " " + this.NumberToLetter(reste);
          if (quotient > 1 && reste === 0)
            numberToLetter = this.NumberToLetter(quotient) + " millions";
          if (quotient > 1 && reste !== 0)
            numberToLetter =
              this.NumberToLetter(quotient) +
              " millions " +
              this.NumberToLetter(reste);
          break;
        case 10:
        case 11:
        case 12:
          quotient = Math.floor(nb / 1000000000);
          reste = nb - quotient * 1000000000;
          if (quotient === 1 && reste === 0) numberToLetter = "un milliard";
          if (quotient === 1 && reste !== 0)
            numberToLetter = "un milliard" + " " + this.NumberToLetter(reste);
          if (quotient > 1 && reste === 0)
            numberToLetter = this.NumberToLetter(quotient) + " milliards";
          if (quotient > 1 && reste !== 0)
            numberToLetter =
              this.NumberToLetter(quotient) +
              " milliards " +
              this.NumberToLetter(reste);
          break;
        case 13:
        case 14:
        case 15:
          quotient = Math.floor(nb / 1000000000000);
          reste = nb - quotient * 1000000000000;
          if (quotient === 1 && reste === 0) numberToLetter = "un billion";
          if (quotient === 1 && reste !== 0)
            numberToLetter = "un billion" + " " + this.NumberToLetter(reste);
          if (quotient > 1 && reste === 0)
            numberToLetter = this.NumberToLetter(quotient) + " billions";
          if (quotient > 1 && reste !== 0)
            numberToLetter =
              this.NumberToLetter(quotient) +
              " billions " +
              this.NumberToLetter(reste);
          break;
      }

      // Respect de l'accord de "quatre-vingt"
      if (
        numberToLetter.substr(
          numberToLetter.length - "quatre-vingt".length,
          "quatre-vingt".length
        ) === "quatre-vingt"
      ) {
        numberToLetter += "s";
      }

      return numberToLetter;
    },

    convertNumberToLetter(number) {
      let result = this.NumberToLetter(number);
      return result;
    },
  },
};
</script>

<style scoped>
@import "../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
/* @import '../../../node_modules/datatables.net-dt/css/jquery.dataTables.css'; */

@import "../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";

th {
  background-color: #d6dbd6;
  border: 1px solid #dee2e6;
}

select {
  cursor: pointer;
  height: 43px !important;
}
</style>

<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 col-md-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <h4 class=" text-white rounded p-3 text-center font-weight-bold"
              style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)">
              Liste des factures impayées
            </h4>
            <!-- <form class="forms-sample mt-3 mt-4">
              <div class="row">
                <div class="form-group col-lg-6 col-md-6 col-sm-12">
                  <label for="date_debut">Date début</label>
                  <input type="date" class="form-control" id="date_debut" :max="today" v-model="startDate"
                    name="date_debut" @input="getBillsImpaye" />
                </div>
                <div class="form-group col-lg-6 col-md-6 col-sm-12">
                  <label for="date_fin">Date fin</label>
                  <input type="date" :disabled="endDateDisabled" @input="getBillsImpaye" class="form-control"
                    id="date_fin" v-model="endDate" name="date_fin" :max="today" />
                </div>
              </div>
            </form> -->

            <div class="table-responsive py-1">
              <table id="order-listing" ref="myTableFactures" class="table table-bordered">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Date</th>
                    <th>IEP</th>
                    <th>Référence</th>
                    <th>Patient</th>
                    <th style="text-align: right">Montant brut</th>
                    <th style="text-align: right">Montant assuré</th>
                    <th style="text-align: right">Montant payé</th>
                    <th style="text-align: right">Montant restant</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="row-hover" v-for="(facture, index) in factures" :key="facture.id"
                    @click="selectRow(facture)">
                    <td>{{ index + 1 }}</td>
                    <td>{{ formaterDate(facture.created_at) }}</td>
                    <td>{{ facture.iep }}</td>
                    <td>{{ facture.reference }}</td>

                    <td>{{ facture.firstname }} {{ facture.lastname }}</td>
                    <td style="text-align: right">
                      {{ facture.type == 'P' ? formatNumberDecimal(parseFloat(facture.montant_total)) :
                        formatNumber(parseInt(facture.montant_total)) }}
                    </td>
                    <td style="text-align: right">
                      {{ facture.type == 'P' ? formatNumberDecimal(parseFloat(facture.montant_assurance)) :
                        formatNumber(parseInt(facture.montant_assurance)) }}
                    </td>
                    <td style="text-align: right">
                      {{ facture.type == 'P' ? formatNumberDecimal(parseFloat(facture.montant_paye)) :
                        formatNumber(parseInt(facture.montant_paye)) }}
                    </td>

                    <td style="text-align: right">
                      {{ facture.type == 'P' ? formatNumberDecimal(parseFloat(facture.montant_total) -
                        parseFloat(facture.montant_paye)) :
                        formatNumber(parseInt(facture.montant_total) - parseInt(facture.montant_paye)) }}
                    </td>
                    <!-- <td class="" width="50px">
                      <div class="btn-group btn-group-sm" role="group">
                        <button id="btnGroupDrop1" type="" style="padding: 0px 10px" class="btn btn-light dropdown-toggle"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click.stop>
                          &nbsp;
                          <i class="fa fa-tasks" aria-hidden="true"></i> &nbsp;
                        </button>
                        <div class="dropdown-menu action-button-div" aria-labelledby="btnGroupDrop1"
                          style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%)">
                        
                          <a href="#" @click.stop="viewInvoice(facture.pdfPath)"
                            class="dropdown-item text-info font-weight-bold">
                            <i class="mdi mdi-eye"></i> Visualiser Facture
                          </a>
                        </div>
                      </div>
                    </td> -->
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="indexSpinner" class="spinner-border spinner-border-sm text-secocndary" style="font-size: 11px"
              role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--------------------------------------------------------Détails Du Paiement - Prestation(s)---------------------------------------------------->


    <!-- Modal -->
    <div class="modal fade" id="paymentModal" tabindex="-1" aria-labelledby="paymentModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <!-- <h5 class="modal-title" id="paymentModalLabel">Recouvrer une facture {{ facture.lastname }} {{
                facture.firstname }}</h5> -->
            <h5 class="modal-title  text-white rounded p-3 text-center font-weight-bold" id="paymentModalLabel"
              v-if="selectedFacture" style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)">
              Recouvrer la facture du patient {{ selectedFacture.firstname }} {{ selectedFacture.lastname }}
            </h5>
          </div>
          <div v-if="payerSpinner" class="spinner-border spinner-border-sm text-secocndary" style="font-size: 11px"
            role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="modal-body">
            <form @submit.prevent="validerPayement">
              <div class="mb-3">
                <label for="montantAPayer" class="form-label">Montant à Payer</label>
                <input type="text"  disabled class="form-control" id="montantAPayer" placeholder="Entrez le montant à payer"
                  v-model="montantAPayer">
                <div v-if="errors.partial_amount" class="text-danger">
                  {{ errors.partial_amount[0] }}
                </div>
              </div>
              <div class="mb-3">
                <label for="modePaiement" class="form-label">Mode de Paiement</label>
                <select class="form-control" id="modePaiement" v-model="selectedOptionMode">
                  <option value="" selected disabled>Sélectionnez le mode de paiement</option>
                  <option value="1">ESPECE</option>
                  <option value="2">MTN MOBILE MONEY</option>
                  <option value="3">MOOV MONEY (FLOOZ)</option>
                  <option value="4">CELTIS</option>
                  <option value="5">CARTE BANCAIRE</option>
                  <option value="6">CARTE DE CRÉDIT</option>
                  <option value="7">PAIEMENT TRESORPAY</option>
                  <!-- <option value="8">PAIEMENT A CREDIT</option> -->
                </select>
                <div v-if="errors.mode_payements_id" class="text-danger">
                  {{ errors.mode_payements_id[0] }}
                </div>
              </div>

              <!-- <div class="mb-3"> -->
              <!-- <button type="button" class="btn btn-sucess bob"  @click="payerFacture">Payer</button> -->
              <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">x</button> -->
              <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal">
              x
            </button> -->
              <!-- </div> -->
              <div class="d-flex justify-content-between col-12 flex-row mt-3">

                <button type="submit" class="btn btn-success btn-medpay-green">
                  Payer
                </button>
                <button class="btn btn-danger btn-medpay-gray btn-close" type="button" data-bs-dismiss="modal"
                  aria-label="Close" @click="closeModal">
                  Annuler
                </button>
                <!-- <button @click="cancel"  class="btn btn-secondary btn-medpay-gray ">Annuler</button> -->
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="container"> -->
    <!-- </div> -->

  </section>
</template>
<script>
import $ from "jquery";

import * as JSZip from "../../../../node_modules/jszip";
window.JSZip = JSZip;
import pdfMake from "../../../../node_modules/pdfmake/build/pdfmake";
import vfsFonts from "../../../../node_modules/pdfmake/build/vfs_fonts";
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
import { factureService } from "@/_services/facture_services.js";
import { recouvrementService } from "@/_services/recouvrement_services.js";
import { momoService } from "@/_services/momos_services.js";
// import { acteMedicalService } from "@/_services/acte_medical_services.js";
import { actsService } from "@/_services/actsmedicals_services.js";
import { patientService } from "@/_services/patients_services.js";
import { pourcentagePatient } from "@/_services/pourcentage_indigence_patient_services.js";
import { PriseEnChargePatientService } from "@/_services/priseenchargepatient_services.js";
import { modePayementService } from "@/_services/mode_payement_services.js";
import { payementService } from "@/_services/payements_services.js";
import { especeService } from "@/_services/espece_services.js";
import { fedapayService } from "@/_services/fedapay_services.js";
import { useToast, POSITION } from "vue-toastification";
import QRCode from "qrcode";
import { affectterminalService } from "@/_services";
// import html2pdf from "html2pdf.js";

import "@/asset/js/fedapay_checkout.js?v=1.1.7";
import "@/asset/js/kkiapay.js";
import { openKkiapayWidget, addKkiapayListener, removeKkiapayListener } from "kkiapay";



require("datatables.net-dt");

export default {
  name: "list-facture",

  data() {
    return {
      factures: [],
      table: null,
      // statutFacture: "",
      factureDetails: [],
      nom: "",
      patientId: "",
      patient: {},
      patient: {},
      errors: {},
      pourcentage: "",
      indexSpinner: false,
      payerSpinner: false,
      id: "",
      assurance: [],
      date: "",
      nom: "",
      today: null,
      prenom: "",
      nomCentre: "",
      code: "",
      startDate: "",
      endDate: "",
      endDateDisabled: true,
      referenceFacture: null,
      autre: "",
      prix: "",
      quantite: "",
      montant: "",
      mode_payement: "",
      mode_payements_id: "",
      selectedOptionMode: "",
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
      fees: "",
      reference: "",
      montantPaye: "",
      tableFactures: null,
      patients: [],

      selectedFacture: null,
      selectedPatient: null,
      montantAPayer: null,
    };
  },

  mounted() {
    // grisé le reste des dates supérieures à la date today
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    const day = currentDate.getDate().toString().padStart(2, "0");
    this.today = `${year}-${month}-${day}`;


    //   .getAllPatients()
    //   .then((res) => {
    //     this.patients = res.data.data;
    //     // console.log(this.patients);
    //   })

    // actsService.getAllActes().then((res) => {
    //   this.acts = res.data.data;
    // });

    // this.getAllFactures();
    this.getBillsImpaye();


  },

  beforeDestroy() {
    removeKkiapayListener("success", this.successHandler);
  },

  methods: {

    kkiapay() {

   

      // const amountToUse = this.montantAPayer
      //   ? parseFloat(this.montantAPayer)
      //   : this.cashRegisterCashierCurrent.type === 'A'
      //     ? this.totalAmountActesA() - this.montantPrisenchargePourcentageA
      //     : this.totalAmountActesP() - this.montantPrisenchargePourcentageP;

      const amountToUse = this.montantAPayer

      const paymentMethodToUse =
        this.selectedOptionMode == "5" || this.selectedOptionMode == "6"
          ? "card"
          : "momo";

      const k = openKkiapayWidget({
        amount: amountToUse,
        position: "center",
        callback: "",
        data: "",

        url: "@/assets/images/logo.png",
        sandbox: "true",
        phone: this.patient.phone,
        name: this.selectedFacture.firstname + " " + this.selectedFacture.lastname,
        paymentmethod: paymentMethodToUse,
        source: "MOBILE_MONEY",

        // name: this.patient.firstname,
        email: this.patient.email,
        // sandbox: false,
        sandbox: true,
        theme: "green",
        // key: "a1d89eba52d05bf3629acc7836c8d602e72629a8",
        key: "d9da5d50d3a311edb532ad421d393c9e",

      });

      addSuccessListener((response) => {
        console.log(response);

        if (response.transactionId) {
          const transaction_id = response.transactionId;
          console.log(transaction_id);

          this.addRecouvrement();

          // setTimeout(function () {
          //   // Code à exécuter après l'attente de 3 secondes
          //   $("#exampleModal").modal("show"); // modal de facture
          // }, 3000);

          // factureService
          //   .gettransactionKikiapay(transaction_id)
          //   .then((res) => {
          //     const data = res.data.data;

          //     console.log("data addSuccessListener");
          //     console.log(data);

          //     if (data.status == "SUCCESS") {
          //       this.feesKikiapay = data.fees;
          //       this.montantKikiapay = data.amount + data.fees;

          //       // const credentials = {
          //       //   mode_payements_id: this.selectedOptionMode,
          //       //   payement_id: payementId,
          //       //   nom: data.client.fullname,
          //       //   prenom: data.client.fullname,
          //       //   telephone: data.client.phone,
          //       //   montant: data.amount + data.fees,
          //       //   transaction_id: transaction_id,
          //       //   statut: data.status,
          //       // };

          //       // console.log(credentials);

          //       // fedapayService
          //       //   .requestFedapay(credentials, payementId)
          //       //   .then((response) => {
          //       //     console.log(response.data.data.montant);
          //       //   })

          //       //   .catch((error) => {
          //       //     console.error(error);
          //       //   });

          //       // this.createFacture();

          //       // setTimeout(function () {

          //       //   $("#exampleModal").modal("show");
          //       // }, 3000);
          //     }
          //   })
          //   .catch((error) => {
          //     console.error(error);
          //   });
        }
      });
    },

    selectRow(facture) {
      this.selectedFacture = facture;
      console.log(this.selectedFacture);
      this.reference = facture.reference;
      this.montantAPayer = this.calculateMontantRestant(facture);
      factureService
          .getPatientInfo(facture.movments_id)
          .then((res) => {
            this.patient = res.data.data;

            console.log("this.patientSelected");
            console.log(this.patient);

            // return factureService.getInsuranceDetailsByIpp(this.patient.ipp);
          })

     
          .catch((error) => {
            console.error(error);
          });

      $("#paymentModal").modal("show");

    },
    closeModal() {
      this.selectedFacture = null;
      this.montantAPayer = null;
      $('#paymentModal').modal('hide');
    },

    calculateMontantRestant(facture) {
      const montantRestant = facture.type === 'P' ?
        parseFloat(facture.montant_total) - parseFloat(facture.montant_paye) :
        parseInt(facture.montant_total) - parseInt(facture.montant_paye);

      return montantRestant.toFixed(2); // Vous pouvez ajuster la logique de formatage selon vos besoins
    },

    payerFacture() {
      const montantAPayer = parseFloat(this.montantAPayer);
      const montantRestant = parseFloat(this.selectedFacture.montant_restant);
      const montantTotal = parseFloat(this.selectedFacture.montant_total);

      // Vérification si le montant à payer est inférieur ou égal au montant restant et au montant total
      if (montantAPayer < montantRestant && montantAPayer < montantTotal) {
        // Le paiement peut être effectué, implémentez votre logique de paiement ici
        console.log('Paiement effectué avec succès');
        // Réinitialiser les erreurs si le paiement est réussi
        this.erreur = null;
      } else {
        // Afficher une erreur car le montant à payer est supérieur au montant restant ou au montant total
        this.erreur = 'Erreur : Le montant à payer doit être inférieur ou égal au montant restant et au montant total.';
      }
    },

    // viewInvoice(pdfPath) {
    //   // Ajoutez cette ligne pour voir si la méthode est appelée correctement
    //   console.log("Méthode viewInvoice appelée avec le chemin :", pdfPath);

    //   // Assurez-vous que pdfPath n'est pas nul ou vide
    //   if (pdfPath) {
    //     // Ouvrir une nouvelle fenêtre avec le chemin du fichier PDF
    //     window.open(pdfPath, '_blank');
    //   } else {
    //     // Affichez un message d'erreur ou effectuez toute autre action nécessaire
    //     console.error("Le chemin du fichier PDF est invalide ou manquant.");
    //   }
    // },
    initializeDataTable() {
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

        // Stockez la nouvelle instance de la table dans la variable "this.table" pour une utilisation ultérieure
        this.tableFactures = table;

        if (table) {
          $(table).DataTable().clear().destroy(); // Détruire DataTables s'il est déjà initialisé
          $(table).DataTable(); // Réinitialiser DataTables
        }
      });
    },


    getBillsImpaye() {
      this.indexSpinner = true;
      this.endDateDisabled = !this.startDate;

      if (!this.startDate) {
        // La date de début n'est pas définie, désactiver la date de fin
        this.endDateDisabled = true;
        this.endDate = '';  // ou ajustez à la valeur que vous préférez
        // return;
      }

      if (this.startDate && this.endDate && this.startDate > this.endDate) {
        this.$toast.error("La date de début doit être inférieure ou égale à la date de fin !", {
          position: "top-right",
          timeout: 3000,
          style: {
            background: "#ff0000", // Couleur de fond rouge pour l'erreur
            color: "#fff", // Couleur du texte
            fontWeight: "bold",
          },
        });
        return;
      }

      factureService.getBillsImpaye({
        start_date: this.startDate,
        end_date: this.endDate,
        // status: this.statutFacture
      }).then((res) => {
        this.indexSpinner = false;
        this.factures = res.data.data;
        console.log("facture");
        console.log(this.factures);

        if (this.tableFactures) {
          this.tableFactures.destroy();
        }
        this.$nextTick(() => {
          this.initializeDataTable();
        });

        // console.log(res.data.user);

      });

    },

    refreshTable() {

      factureService.getBillsImpaye({
        start_date: this.startDate,
        end_date: this.endDate,
        // status: this.statutFacture
      }).then((res) => {
        this.indexSpinner = false;
        this.factures = res.data.data;
        // console.log("facture");
        // console.log(this.factures);

        if (this.tableFactures) {
          this.tableFactures.destroy();
        }
        this.$nextTick(() => {
          this.initializeDataTable();
        });

        // console.log(res.data.user);

      });
    },


    validerPayement() {

      if (this.selectedOptionMode == 1) {
        this.addRecouvrement();
        // this.ShowFacture();
      }

      if (this.selectedOptionMode == 2) {
        // this.validerMomo();
        this.kkiapay();
      }

      if (this.selectedOptionMode == 3) {
        this.kkiapay();
        // $("button#pay-btn").click(function (event) {
        //   event.stopPropagation();
        // });
        // $("button#pay-btn").click();
      }

      if (this.selectedOptionMode == 4) {
        this.kkiapay();
      }

      if (this.selectedOptionMode == 5) {
        this.kkiapay();
      }

      if (this.selectedOptionMode == 6) {
        this.kkiapay();
      }

      // if (this.selectedOptionMode == 7) {
      //   console.log("my tresopay");
      //   this.tresorPay();
      // }

      // if (this.selectedOptionMode == 7) {
      //   this.tresorPay();

      //   $("button#tresorpay-btn").click(function (event) {
      //     event.stopPropagation();
      //   });

      //   $("button#tresorpay-btn").click();
      // }

      // if (this.selectedOptionMode == 8) {
      //   this.payementFacture();
      //   // this.ShowFacture();
      // }


    },
  



  addRecouvrement() {

    this.payerSpinner = true;
    const requestBody = {
      partial_amount: this.montantAPayer,
      mode_payements_id: this.selectedOptionMode,
    };

    recouvrementService.addRecouvrement(requestBody, this.reference).then((res) => {
      this.payerSpinner = false;
      console.log(res);

      this.refreshTable();
      this.closeModal();
      this.showToast('Enregistrement effectué avec succès.', 'success');
    })
      .catch((error) => {
        console.log(error);
        if (error.response.status == 422) {
          this.payerSpinner = false;
          this.errors = error.response.data.errors;

          // if (error.response.data.message == 'Cette affectation du caissier existe déjà.') {
          //   // Display the error message using the showToast function
          //   this.showToast('Cette affectation du caissier existe déjà.', 'error');
          //   this.indexSpinner = false;
          // }
          return;
          // this.showToast(error.response.data.message, "error");
        }
      });

  },

  showToast(message, type) {
    const toastOptions = {
      position: POSITION.TOP_RIGHT,
      timeout: 2000,
      bodyStyle: {
        borderRadius: "10px",
        backgroundColor: "#f0f0f0",
        color: "#333",
        fontWeight: "bold",
      },
    };

    // Vérifiez le type de toast et ajustez la couleur en conséquence
    if (type == "success") {
      this.$toast.success(message, toastOptions);
    } else if (type == "error") {
      toastOptions.bodyStyle.backgroundColor = "red"; // Changez la couleur du fond en rouge
      this.$toast.error(message, toastOptions);
    } else {
      this.$toast(message, toastOptions);
    }
  },

  printModal() {
    // Ouvrez le modal
    $("#showDetail").modal("show");

    // Assurez-vous que la fenêtre de prévisualisation ne s'ouvre qu'une fois
    if (typeof this.printWindow === "undefined" || this.printWindow.closed) {
      // Sélectionnez l'élément que vous voulez imprimer (la partie spécifique avec l'ID "print-section")
      const printContent = document.getElementById("print-section");

      // Créez une fenêtre de prévisualisation pour l'impression
      this.printWindow = window.open("", "", "width=600,height=600");

      // Attendez un court délai pour que le modal soit entièrement affiché
      setTimeout(
        function () {
          // Insérez le contenu HTML de la page d'origine dans la fenêtre de prévisualisation
          this.printWindow.document.write("<html><head><title>Impression</title>");

          // Incluez les balises <link> pour les fichiers Bootstrap CDN
          this.printWindow.document.write(
            '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">'
          );
          this.printWindow.document.write(
            '<link rel="stylesheet" href="../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css">'
          );

          // Incluez une balise <link> pour votre fichier CSS externe
          this.printWindow.document.write(
            '<link rel="stylesheet" type="text/css" href="../../../../assets/scss/style.css">'
          );

          // Ajoutez des styles CSS personnalisés pour les en-têtes de tableau
          this.printWindow.document.write(
            "<style>.table th { background-color: rgb(213, 219, 218) !important; padding: 5px; }</style>"
          );

          // Ajoutez des styles CSS pour réduire les marges internes (padding) des cellules du tableau
          this.printWindow.document.write(
            "<style>.table th td { padding: 2px; }</style>"
          );

          this.printWindow.document.write("</head><body>");
          this.printWindow.document.write(printContent.innerHTML);
          this.printWindow.document.write("</body></html>");
          this.printWindow.document.close();

          // Attendez que le contenu soit chargé avant d'imprimer
          this.printWindow.onload = function () {
            this.printWindow.print();
            this.printWindow.close();
          }.bind(this);

          // Fermez le modal
          // $("#showDetail").modal("hide");
        }.bind(this),
        1000
      ); // Ajustez la durée en fonction de votre besoin
    }
  },

  detail(facture, index) {
    let assuranceMontant = 0;
    let indigenceMontant = 0;

    // this.payement_id = facture.reference;
    // this.mode_payements_id = facture.mode_payements_id;
    // this.patientId = facture.patient_id

    this.reference = facture.reference;

    factureService
      .getFacture(this.reference)
      .then((res) => {
        const factureDetails = res.data.data;

        console.log(factureDetails);

        this.factureDetails = factureDetails;
        this.nom = this.factureDetails[0].firstname;
        this.prenom = this.factureDetails[0].lastname;
        // this.telpa = this.factureDetails[0].lastname;
        // this.nomCentre = this.factureDetails[0].nom_centre;
        this.nomCentre = "Lokossa";

        this.mode_payements_id = facture.mode_payements_id;

        // this.montantPaye = facture.total_montant;
        this.date = facture.created_at;
        // this.generateQRCode();
        this.generateQRCode(this.reference);
        const montantTotalActe = this.calculerMontantTotal();

        this.montantPaye = montantTotalActe;

        this.assurancePourcentage =
          (this.factureDetails[0].percentageassurance * this.montantPaye) / 100;

        factureService
          .getPatientInfo(this.factureDetails[0].movments_id)
          .then((res) => {
            this.patient = res.data.data;

            // console.log(" this.patientSelected");
            // console.log(this.patient);
          })
          .catch((error) => {
            console.error(error);
          });

        $("#showDetail").modal("show");

        // this.difference = facture.total_montant;
        // PriseEnChargePatientService.getAssurancePatient(facture.patient_id)
        //   .then((res) => {
        //     this.assurancePourcentage = res.data.data.pourcentage_assurance;
        //     if (this.assurancePourcentage) {
        //       assuranceMontant = (this.assurancePourcentage * montantTotalActe) / 100;
        //     } else {
        //       assuranceMontant = 0;
        //     }

        //     pourcentagePatient.getPourcentagePatient(facture.patient_id)
        //       .then((res) => {
        //         this.pourcentageIndigence = res.data.data;
        //         if (this.pourcentageIndigence) {
        //           indigenceMontant = (this.pourcentageIndigence * montantTotalActe) / 100;
        //         } else {
        //           indigenceMontant = 0;
        //         }

        //         this.totalPriseEncharge = assuranceMontant + indigenceMontant;
        //         // this.difference = montantTotalActe - this.totalPriseEncharge;
        //         this.difference = facture.total_montant;

        //         console.log(this.difference);

        //         $("#showDetail").modal("show");
        //       })
        //       .catch(error => {
        //         console.error(error);
        //       });
        //   })
        //   .catch(error => {
        //     console.error(error);
        //   });
      })
      .catch((error) => {
        console.error(error);
      });
  },

  // generateQRCode(reference) {

  //   const invoiceDetailsUrl = `/facture/details/${reference}`;

  //   QRCode.toDataURL(invoiceDetailsUrl, { errorCorrectionLevel: "L" }, (err, url) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     this.qrCodeUrl = url;
  //   });
  // },

  generateQRCode(reference) {
    const base = location.origin;
    reference = this.reference;
    const invoiceDetailsUrl = `${base}/facture/details/${this.reference}`;

    QRCode.toDataURL(invoiceDetailsUrl, { errorCorrectionLevel: "L" }, (err, url) => {
      if (err) {
        console.error(err);
        return;
      }

      this.qrCodeUrl = url; //  genere le code QR
      console.log("this.qrCodeUrl");
      console.log(this.qrCodeUrl);
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
    const patient = this.patients.find((patient) => this.patientId === patient.id);
    return patient ? patient.telephone : "";
  },

  getPatientAdresse() {
    const patient = this.patients.find((patient) => this.patientId === patient.id);
    return patient ? patient.adresse : "";
  },

  formaterDate(date) {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = new Date(date).toLocaleDateString("fr-FR", options);

    const day = new Date(date).toLocaleDateString("fr-FR", { day: "2-digit" });
    const month = new Date(date).toLocaleDateString("fr-FR", { month: "2-digit" });
    const year = new Date(date).toLocaleDateString("fr-FR", { year: "numeric" });

    const formattedTime = new Date(date).toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${day}/${month}/${year} à ${formattedTime}`;
  },

  // formatDate(date) {
  //   const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
  //   return new Date(date).toLocaleDateString('fr-FR', options);
  // },

  formatDate(date) {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    const dateObj = new Date(date);

    // Extraire les parties nécessaires de la date et de l'heure
    const formattedDate = dateObj.toLocaleString("fr-FR", options);

    // Formater la chaîne résultante
    return formattedDate.replace(/\s(\d+):(\d+)$/, "  $1h $2");
  },

  formatNumber(value) {
    if (typeof value !== "number") {
      return value;
    }
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  },


  formatNumberDecimal(value) {
    if (typeof value !== "number") {
      return value;
    }

    // Utilisation de toFixed(2) pour formater le nombre avec deux chiffres après la virgule
    let formattedValue = value.toFixed(2);

    // Ajout d'un espace pour séparer les milliers
    formattedValue = formattedValue.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    return formattedValue;
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
    if (isNaN(nombre.toString().replace(/ /gi, ""))) return "Nombre non valide";

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
              numberToLetter = this.Dizaine(quotient * 10) + "-et-" + this.Unite(reste);
            if (reste > 1)
              numberToLetter = this.Dizaine(quotient * 10) + "-" + this.Unite(reste);
          } else
            numberToLetter =
              this.Dizaine((quotient - 1) * 10) + "-" + this.Dizaine(10 + reste);
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
          numberToLetter = this.Unite(quotient) + " cent " + this.NumberToLetter(reste);
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
            this.NumberToLetter(quotient) + " mille " + this.NumberToLetter(reste);
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
            this.NumberToLetter(quotient) + " millions " + this.NumberToLetter(reste);
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
            this.NumberToLetter(quotient) + " milliards " + this.NumberToLetter(reste);
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
            this.NumberToLetter(quotient) + " billions " + this.NumberToLetter(reste);
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

  // printModal() {
  //   const modalContent = this.$refs.modalContent;
  //   const originalContents = document.body.innerHTML;

  //   // Temporairement remplacer le contenu de la page par le contenu du modal
  //   document.body.innerHTML = modalContent.innerHTML;

  //   // Imprimer le contenu
  //   window.print();

  //   // Restaurer le contenu original de la page
  //   document.body.innerHTML = originalContents;

  //   $("#exampleModal").modal("hide");
  // },

  // printModal() {
  //   const modalContent = this.$refs.modalContent;

  //   // Créez une nouvelle fenêtre d'impression
  //   const printWindow = window.open('', '', 'width=800,height=600');

  //   // Injectez les styles CSS d'impression dans la fenêtre d'impression
  //   const styles = '<style>@media print{}</style>';
  //   printWindow.document.write(styles);

  //   // Injectez le contenu de votre modal dans la fenêtre d'impression
  //   printWindow.document.write('<html><head><title>PDF Export</title></head><body>');
  //   printWindow.document.write(modalContent.innerHTML);
  //   printWindow.document.write('</body></html>');
  //   printWindow.document.close();

  //   // Sélectionnez l'imprimante "Microsoft Print to PDF" si nécessaire
  //   // (vous pouvez omettre cette étape si vous ne souhaitez pas spécifier l'imprimante par défaut)
  //   printWindow.addEventListener('load', () => {
  //     if (printWindow.document.execCommand) {
  //       printWindow.document.execCommand('print', false, 'Microsoft Print to PDF');
  //     }
  //   });
  // }
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

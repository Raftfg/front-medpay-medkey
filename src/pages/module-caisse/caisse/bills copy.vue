<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 col-md-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <h4 class=" text-white rounded p-3 text-center "
              style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)">
              Liste des factures
              <span v-if="this.cashRegisterCashierCurrent.designation"> - {{ this.cashRegisterCashierCurrent.designation
              }}</span>

            </h4>

            <form class="forms-sample mt-3 mt-4">
              <div class="row">
                <div class="form-group col-lg-4 col-md-4 col-sm-12">
                  <label for="date_debut">Date début</label>
                  <input type="date" class="form-control" id="date_debut" :max="today" v-model="startDate"
                    name="date_debut" @input="getAllFactures" />
                </div>
                <div class="form-group col-lg-4 col-md-4 col-sm-12">
                  <label for="date_fin">Date fin</label>
                  <input type="date" :disabled="endDateDisabled" @input="getAllFactures" class="form-control"
                    id="date_fin" v-model="endDate" name="date_fin" :max="today" />
                </div>
                <div class="form-group col-lg-4 col-md-4 col-sm-12">
                  <label for="statut">Statut</label>
                  <select class="form-control" v-model="statutFacture" name="statut" @change="getAllFactures">
                    <option value="">Sélectionner</option>
                    <option value="1">Payé</option>
                    <option value="0">Impayé</option>
                  </select>
                </div>
              </div>
            </form>
            <div v-if="indexSpinnerPDF" class="spinner-border spinner-border-sm text-secocndary" style="font-size: 11px"
              role="status">
              <span class="sr-only">Loading...</span>
            </div>

            <div class="table-responsive py-1">
              <table id="order-listing" ref="myTableFactures" class="table table-bordered">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>IEP</th>
                    <th>Référence</th>
                    <th>Mode</th>
                    <th>Patient</th>
                    <th style="text-align: right">Montant brut</th>
                    <th style="text-align: right">Montant assuré</th>
                    <th style="text-align: right">Montant payé</th>
                    <!-- <th>Status</th> -->
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(facture, index) in factures" :key="facture.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ formaterDate(facture.created_at) }}</td>
                    <td>
                      <label v-if="facture.paid == 0" style="
                          font-size: 10px !important;
                          border-radius: 20px !important;
                          display: inline-block;
                          padding: 5px;
                        "
                        class="badge badge-gradient-danger font-weight-bold text-white text-center border-rounded rounded-pill">
                        Impayée

                      </label>
                      <label v-else-if="facture.paid == 1" style="
                          font-size: 10px !important;
                          border-radius: 20px !important;
                          padding: 5px;
                        "
                        class="badge badge-gradient-success font-weight-bold text-white text-center border-rounded rounded-pill">
                        Payée
                      </label>
                    </td>

                    <td>{{ facture.movments_id }}</td>
                    <td>{{ facture.reference }}</td>
                    <!-- <td>{{ facture.mode_payements_id }} </td> -->
                    <td>
                      <span v-if="facture.mode_payements_id == 1">ESPECE</span>
                      <span v-else-if="facture.mode_payements_id == 2">MTN MOBILE MONEY</span>
                      <span v-else-if="facture.mode_payements_id == 3">MOOV MONEY</span>
                      <span v-else-if="facture.mode_payements_id == 4">CELTIS</span>
                      <span v-else-if="facture.mode_payements_id == 5">CARTE BANCAIRE</span>
                      <span v-else-if="facture.mode_payements_id == 6">CARTE CREDIT</span>
                      <span v-else-if="facture.mode_payements_id == 7">TRESORPAY</span>
                      <span v-else-if="facture.mode_payements_id == 8">PAIEMENT A CREDIT</span>

                      <span v-else>-</span>
                    </td>

                    <td>{{ facture.firstname }} {{ facture.lastname }}</td>
                    <!-- <td style="text-align: right">{{ formatNumber(parseInt(facture.montant_total)) }}</td> -->
                    <!-- 
                    <td style="text-align: right">
                      {{ facture.type == 'P' ? formatNumberDecimal(parseFloat(facture.montant_total)) :
                        formatNumber(parseInt(facture.montant_total)) }}
                    </td> -->
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

                    <td class="" width="50px">
                      <div class="btn-group btn-group-sm" role="group">
                        <button id="btnGroupDrop1" type="" style="padding: 0px 10px" class="btn btn-light dropdown-toggle"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          &nbsp;
                          <i class="fa fa-tasks" aria-hidden="true"></i> &nbsp;
                        </button>
                        <div class="dropdown-menu action-button-div" aria-labelledby="btnGroupDrop1"
                          style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%)">
                          <!-- <button class="dropdown-item  font-weight-bold">
                            <i class="mdi mdi-file-check"></i> Facturer
                          </button> -->
                          <button @click="generateAndOpenPDF(facture)" class="dropdown-item text-info font-weight-bold">
                            <i class="mdi mdi-eye"></i> Visualiser Facture
                          </button>
                          <!-- <a :href="facture.pdfPath" target="_blank" class="dropdown-item text-info font-weight-bold">
                            <i class="mdi mdi-eye"></i> Visualiser Facture
                          </a> -->


                        </div>
                      </div>
                    </td>
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

    <div class="modal fade" id="showDetail" tabindex="-1" role="dialog" aria-labelledby="showDetailLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-xl" role="document">
        <div class="modal-content bg-white">
          <div class="modal-body" id="print-section" ref="modalContent" style="min-height: 100px !important">
            <div class="container-fluid">
              <div class="row mb-2 mr-0 ml-0 col-sm-12">
                <div class="col-sm-4"></div>
                <div class="col-sm-12 d-flex justify-content-between">
                  <img src="../../../assets/images/santee.png" alt="logo" class=""
                    style="width: 180px !important; height: 50px !important; order: 2" />
                  <img src="../../../assets/images/logo.png" alt="logo" class=""
                    style="width: 130px !important; height: 50px !important; order: 1" />
                </div>
              </div>

              <hr style="background-color: rgb(156, 151, 151)" class="mt-n2" />

              <div class="row mb-1">
                <div class="col-sm-6">
                  <h4><strong> PARTIE VERSANTE</strong></h4>
                  <p>
                    <strong> {{ patient.lastname }} {{ patient.firstname }}</strong>
                  </p>

                  <p>{{ patient.maison }}</p>
                  <p>{{ patient.phone }}</p>
                  <p>
                    <strong>IPP :</strong> {{ patient.ipp }} |
                    <strong> IEP : {{ patient.iep }} </strong>
                  </p>
                </div>
                <div class="col-sm-6 text-right">
                  <h4>
                    <strong> N° {{ reference }}</strong>
                  </h4>
                  <p>
                    <strong>Date : {{ formatDate(date) }}</strong>
                  </p>
                  <p><strong>LOKOSSA ATHIEME</strong></p>
                  <p>Code postal 09 6 51 03</p>
                  <p>En allant à LINK Hotel</p>
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
                    <tr v-for="(factureDetail, index) in factureDetails" :key="index">
                      <td>
                        <span v-if="factureDetail.mode_payements_id == 1">ESPECE</span>
                        <span v-else-if="factureDetail.mode_payements_id == 2">MOBILE MONEY</span>
                        <span v-else-if="factureDetail.mode_payements_id == 3">MOOV MONEY</span>
                        <span v-else-if="factureDetail.mode_payements_id == 4">CELTIS</span>
                        <span v-else-if="factureDetail.mode_payements_id == 5">CARTE BANCAIRE</span>
                        <span v-else-if="factureDetail.mode_payements_id == 6">CARTE DE CRÉDIT</span>
                        <span v-else-if="factureDetail.mode_payements_id == 7">PAIEMENT TRESORPAY</span>
                        <span v-else-if="factureDetail.mode_payements_id == 8">PAIEMENT A CREDIT</span>
                      </td>
                      <td>
                        <span v-if="factureDetail.code === null">AAAAA</span>
                        <span v-else> {{ factureDetail.code }}</span>
                      </td>

                      <td>
                        {{ factureDetail.designation }}
                      </td>
                      <td>{{ factureDetail.quantite }}</td>
                      <td>{{ factureDetail.prix }}</td>
                      <td>
                        {{ formatNumber(factureDetail.prix * factureDetail.quantite) }}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="5" class="text-right">
                        <strong>Montant Total (+) </strong>
                      </td>
                      <td>
                        <strong>{{ formatNumber(calculerMontantTotal()) }} FCFA</strong>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="5" class="text-right">
                        <strong> Total Prise en charge (-)</strong>
                      </td>
                      <td>
                        <strong>{{ formatNumber(this.assurancePourcentage) }} FCFA</strong>
                      </td>
                    </tr>

                    <!-- <tr v-if="mode_payements_id == 3">

                      <td colspan="5" class="text-right"><strong> Fedapay fees (+)</strong></td>

                      <td><strong>{{ formatNumber((montantPaye - (calculerMontantTotal() - 0))) }}
                          FCFA</strong></td>
                    </tr>


                    <tr v-if="mode_payements_id == 2">

                      <td colspan="5" class="text-right"><strong> Kkiapay fees (+)</strong></td>

                      <td><strong>{{ formatNumber((montantPaye - (calculerMontantTotal() - 0))) }}
                          FCFA</strong></td>
                    </tr> -->

                    <tr>
                      <td colspan="5" class="text-right" style="background-color: rgb(213, 219, 218)">
                        <strong>Montant Total Versé</strong>
                      </td>
                      <td style="background-color: rgb(213, 219, 218)">
                        <strong>{{
                          formatNumber(
                            calculerMontantTotal() - this.assurancePourcentage
                          )
                        }}
                          FCFA</strong>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div class="row mt-1">
                <div class="col-sm-6">
                  <p>
                    Arrête la présente facture à la somme de :
                    <strong>{{
                      convertNumberToLetter(
                        formatNumber(calculerMontantTotal() - this.assurancePourcentage)
                      )
                    }}
                      FCFA
                    </strong>
                  </p>

                  <div>
                    <router-link v-if="qrCodeUrl" :to="{
                      name: 'FactureDetails',
                      params: { reference: reference },
                      path: '/facture' + $route.path,
                    }" target="_blank">
                      <img :src="qrCodeUrl" alt="QR Code" style="height: 60px" />
                    </router-link>
                  </div>
                </div>
                <div class="col-sm-6 text-right">
                  <p><strong> Le Chef Caissier </strong></p>
                  <img src="@/assets/images/signature.png" style="width: 80px" />
                  <p><strong> Félicien DAGBOGBO </strong></p>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer d-flex justify-content-between col-12 flex-row">
            <button type="button" class="btn btn-danger btn-medpay-gray" data-dismiss="modal">
              Annuler
            </button>

            <button type="button" class="btn btn-success btn-medpay-green" @click="printModal">
              Imprimer
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
import { AssuranceService } from "@/_services/assurances_services.js";
import { compagnieService } from "@/_services/compagnie_services.js";
import { factureService } from "@/_services/facture_services.js";
import { patientService } from "@/_services";
import { actsService } from "@/_services";
import { pourcentagePatient } from "@/_services/pourcentage_indigence_patient_services.js";
import { PriseEnChargePatientService } from "@/_services/priseenchargepatient_services.js";
import QRCode from "qrcode";


import image1Src from "@/assets/images/logo.png";
import image2Src from "@/assets/images/santee.png";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { ToWords } from 'to-words';


require("datatables.net-dt");

export default {
  name: "list-facture",

  data() {
    return {
      factures: [],
      table: null,
      statutFacture: "",
      factureDetails: [],
      signataires_data: [],
      nom: "",
      patientId: "",
      patient: {},
      patients: [],
      pourcentage: "",
      indexSpinner: false,
      indexSpinnerPDF: false,
      id: "",
      assurance: [],
      date: "",
      nom: "",
      today: null,
      user: JSON.parse(localStorage.getItem("user")),
      prenom: "",
      nomCentre: "",
      code: "",
      cashRegisterCashierCurrent: {},
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
    };
  },

  mounted() {
    this.getCashRegisterCashierCurrent();
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

    this.getAllFactures();


  },

  methods: {

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


    getCashRegisterCashierCurrent() {
      // Si this.searchTerm est vide, obtenez les derniers mouvements par défaut.
      // Sinon, effectuez une recherche en utilisant this.searchTerm.
      const user_id = this.user.id;
      factureService
        .getCashRegisterCashierCurrent(user_id)
        .then((res) => {
          this.cashRegisterCashierCurrent = res.data.data;

          console.log("this.cashRegisterCashierCurrent");
          console.log(this.cashRegisterCashierCurrent);
        })
        .catch((error) => {
          console.error(error);
        });
    },


    generateAndOpenPDF(facture) {

      this.indexSpinnerPDF = true
      // Create a new jsPDF instance with portrait orientation

      factureService
        .getDetailFacture(facture.reference)
        .then((res) => {

          this.indexSpinnerPDF = false;
          this.facturesReference = res.data.data;
          this.signataires_data = res.data.signataires;

          console.log("this.facturesReference");
          console.log(this.facturesReference);
          if (this.facturesReference.length > 0) {

            this.generateQRCode(facture.reference);

            const pdfDoc = new jsPDF({
              orientation: "portrait",
            });

            // ... Votre code précédent ...

            const image1Width = pdfDoc.internal.pageSize.getWidth() * 0.1; // 10% de la largeur de la page
            const image1Height = pdfDoc.internal.pageSize.getHeight() * 0.06; // 6% de la hauteur de la page
            pdfDoc.addImage(image1Src, "PNG", 10, 10, image1Width, image1Height);

            // Ajoutez la deuxième image
            const image2Width = pdfDoc.internal.pageSize.getWidth() * 0.22; // 22% de la largeur de la page
            const image2Height = pdfDoc.internal.pageSize.getHeight() * 0.055; // 5.2% de la hauteur de la page
            const image2X = pdfDoc.internal.pageSize.getWidth() - 6 - image2Width; // Poussez vers la droite (ajustez selon vos besoins)
            const image2Y = 13; // Poussez légèrement vers le bas (ajustez selon vos besoins)
            pdfDoc.addImage(image2Src, "PNG", image2X, image2Y, image2Width, image2Height);

            // Ajoutez la ligne après les images
            const lineY = 10 + Math.max(image1Height, image2Height) + 2; // Ajustez la position verticale
            pdfDoc.setDrawColor(202, 205, 207); // Couleur de la ligne
            pdfDoc.setLineWidth(0.5); // Ajustez l'épaisseur de la ligne
            pdfDoc.line(10, lineY, pdfDoc.internal.pageSize.getWidth() - 10, lineY);

            //informations partie versante et hopital

            const partieVersanteText = [
              "PARTIE VERSANTE :",
              this.facturesReference[0].firstname + " " + this.facturesReference[0].lastname,
              "IPP : " + this.facturesReference[0].ipp,
              "IEP : " + this.facturesReference[0].iep,
              this.facturesReference[0].emergency_contac + (this.facturesReference[0].phone ? " / " + this.facturesReference[0].phone : ''),

            ];

            const partieVersanteX = 10; // Ajustez la position à gauche
            let partieVersanteY = lineY + 10; // Ajustez la position verticale

            // Assurez-vous que partieVersanteText est défini et est un tableau de chaînes de caractères valides
            if (partieVersanteText && Array.isArray(partieVersanteText)) {
              const lineHeight = 5; // Ajustez la hauteur de chaque ligne
              pdfDoc.setFontSize(12); // Ajustez la taille de police
              // Parcourez le tableau partieVersanteText
              for (let i = 0; i < partieVersanteText.length; i++) {
                const line = partieVersanteText[i];

                // Si c'est le troisième élément, séparez "IPP :" du nombre et dessinez-les individuellement
                if (i === 2 || i === 3) {
                  const keyword = i === 2 ? "IPP :" : "IEP :";
                  const keywordIndex = line.indexOf(keyword); // Trouvez l'index de "IPP :" ou "IEP :"
                  const keywordText = line.substring(0, keywordIndex + keyword.length); // Partie fixe "IPP :" ou "IEP :"
                  const keywordNumber = line.substring(keywordIndex + keyword.length); // Partie dynamique (le nombre)

                  pdfDoc.setFont("Helvetica", "bold"); // Mettez "IPP :" ou "IEP :" en gras
                  pdfDoc.text(keywordText, partieVersanteX, partieVersanteY, { lineHeight });

                  // Réinitialisez la police pour dessiner le nombre sans gras
                  pdfDoc.setFont("Helvetica", "normal");
                  pdfDoc.text(
                    keywordNumber,
                    partieVersanteX + pdfDoc.getTextWidth(keywordText) + 2,
                    partieVersanteY,
                    { lineHeight }
                  );
                } else {
                  // Utilisez setFont pour mettre la première et la deuxième valeur en gras
                  if (i === 0 || i === 1) {
                    pdfDoc.setFont("Helvetica", "bold");
                  } else {
                    pdfDoc.setFont("Helvetica", "normal");
                  }

                  pdfDoc.text(line, partieVersanteX, partieVersanteY, { lineHeight });
                }

                if (i === 0) {
                  partieVersanteY += lineHeight + 3; // Ajoutez un espace après la première ligne
                } else {
                  partieVersanteY += lineHeight + 1; // Incrémentez la position verticale pour la prochaine ligne
                }
              }
            }

            // Ajoutez les autres informations à droite
            const autresInformationsText = [
              "FACTURE N°" + facture.reference,
              "Date : " + this.formaterDate(facture.created_at),
              "HZ-LA | LOKOSSA ATHIEME",
              "LOKOSSA - AHOUME DEKAME",
              "Code postal 09 6 51 03",
              "En allant à LINK Hotel",
            ];

            const maxWidth = pdfDoc.internal.pageSize.getWidth() - 10; // Largeur maximale pour le texte
            const lineHeight = 5; // Ajustez la hauteur de chaque ligne
            const lineSpacing = 1; // Ajoutez un espacement vertical fixe

            let autresInformationsY = lineY + 10; // Ajustez la position verticale

            // Assurez-vous que autresInformationsText est défini et est un tableau de chaînes de caractères valides
            if (autresInformationsText && Array.isArray(autresInformationsText)) {
              pdfDoc.setFontSize(11); // Ajustez la taille de police

              for (let i = 0; i < autresInformationsText.length; i++) {
                const line = autresInformationsText[i];

                // Utilisez setFont pour mettre en gras le premier, deuxième et troisième élément
                if (i === 0 || i === 1 || i === 2 || i === 3 || i === 4) {
                  pdfDoc.setFont("Helvetica", "bold");
                } else {
                  pdfDoc.setFont("Helvetica", "normal");
                }
                const textWidth = pdfDoc.getTextWidth(line);
                const textX = maxWidth - textWidth; // Ajustez la position pour aligner à droite
                pdfDoc.text(line, textX, autresInformationsY, { lineHeight, align: "left" });
                autresInformationsY += lineHeight + lineSpacing; // Incrémentez la position verticale pour la prochaine ligne
              }
            }

            if (this.facturesReference && this.facturesReference.length > 0) {
              // ... Votre code existant

              const columns = [
                { content: "Code", styles: { halign: "left" } },
                {
                  content: facture.type === "A" ? "Description prestation(s)" : "Description produit(s)",
                  styles: { halign: "left" }
                },
                { content: "Quantité", styles: { halign: "center" } },
                { content: "Prix unitaire", styles: { halign: "right" } },
                { content: "Montant", styles: { halign: "right" } },
              ];

              const totalBlockHeight =
                10 +
                Math.max(image1Height, image2Height) +
                2 +
                10 +
                lineHeight * partieVersanteText.length +
                10 +
                lineHeight * autresInformationsText.length;
              const margin = { top: totalBlockHeight, right: 10, bottom: 0, left: 10 };

              var rows = [];
              var total = 0;
              for (var i = 0; i < this.facturesReference.length; i++) {
                var amount = facture.type === 'A'
                  ? parseInt(this.facturesReference[i].amount)
                  : parseFloat(this.facturesReference[i].amount);
                var row = [
                  this.facturesReference[i].code,
                  this.facturesReference[i].designation,
                  this.facturesReference[i].quantite,
                  this.facturesReference[i].prix,
                  amount,
                ];

                total += amount;
                rows.push(row);
              }
              const montantPriseEnCharge = total * (this.facturesReference[0]['percentageassurance'] || 0);
              const montantTotalVerse = this.facturesReference[0]['partial_amount'] !== null
                ? this.facturesReference[0]['partial_amount']
                : total - montantPriseEnCharge;

              rows.push([
                { content: 'Montant total (+)', colSpan: 4, styles: { fontStyle: 'bold', halign: 'left', textColor: [0, 0, 0] } },

                { content: facture.type === 'A' ? this.formatNumber(total) : this.formatNumberDecimal(total) + " FCFA", colSpan: 1, styles: { fontStyle: 'bold', halign: 'right', textColor: [0, 0, 0] } },
              ]);


              rows.push([
                { content: 'Montant de la prise en charge (-)', colSpan: 4, styles: { fontStyle: 'bold', halign: 'left', textColor: [0, 0, 0] } },

                { content: facture.type === 'A' ? this.formatNumber(montantPriseEnCharge) : this.formatNumberDecimal(montantPriseEnCharge) + " FCFA", colSpan: 1, styles: { fontStyle: 'bold', halign: 'right', textColor: [0, 0, 0] } },
              ]);
              rows.push([
                { content: 'Montant total versé', colSpan: 4, styles: { fontStyle: 'bold', halign: 'left', fillColor: [44, 65, 86], textColor: [255, 255, 255] } },

                { content: facture.type === 'A' ? this.formatNumber(montantTotalVerse) : this.formatNumberDecimal(montantTotalVerse) + " FCFA", colSpan: 1, styles: { fontStyle: 'bold', halign: 'right', fillColor: [44, 65, 86], textColor: [255, 255, 255] } },
              ]);

              // Créez la table avec autoTable
              pdfDoc.autoTable({
                head: [columns],
                body: rows,
                startY: 82,
                margin: margin,
                theme: "grid",
                styles: {
                  fontSize: 11,
                  lineWidth: 0.2,
                  lineColor: [169, 169, 169],
                  textColor: [0, 0, 0],
                },
                headStyles: {
                  fillColor: [44, 65, 86],
                  textColor: [255, 255, 255],
                  valign: "middle",
                },
                columnStyles: {
                  0: { halign: "left" }, // Colonne 'Date'
                  1: { halign: "left" }, // Colonne 'Référence'
                  2: { halign: "center" },
                  3: { halign: "right" },
                  4: { halign: "right" },
                },
                rowStyles: {
                  5: { fontStyle: 'bold' }, // Index 5 corresponds à la première ligne ajoutée
                  6: { fontStyle: 'bold' }, // Index 6 correspond à la deuxième ligne ajoutée
                  7: { fontStyle: 'bold' }, // Index 7 correspond à la troisième ligne ajoutée
                },
                didDrawPage: function (data) {
                  // ... Gestion de la page
                  // var pageNumber = data.pageNumber;
                  // var pageCount = pdfDoc.internal.getNumberOfPages();
                  // var pageHeight = pdfDoc.internal.pageSize.height;
                  // var pageWidth = pdfDoc.internal.pageSize.width;

                  // pdfDoc.setFont('Helvetica', 'normal');
                  // pdfDoc.setFontSize(10);
                  // pdfDoc.setDrawColor(0);

                  // pdfDoc.setLineWidth(0.2);
                  // pdfDoc.line(20, pageHeight - 15, pageWidth - 20, pageHeight - 15);
                  // pdfDoc.text(`Page ${pageNumber} / ${pageCount}`, 20, pageHeight - 10);

                },
              });



              const pageWidth = pdfDoc.internal.pageSize.getWidth();

              // Ajoutez la phrase au-dessus du tableau



              pdfDoc.setFont("helvetica", "bold");

              // Utilisez autoTable pour obtenir la largeur du texte
              const phraseAvecMontant = "Arrêté la présente facture à la somme de: " +
                (facture.type === 'A' ? this.convertNumberToLetter(montantTotalVerse) : this.convertToWords(montantTotalVerse)) +
                " FCFA";
              const marginLeft = 10; // Ajustez la marge à gauche selon vos besoins
              const lineHeight = 5; // Ajustez la hauteur de chaque ligne
              const qrCodeSize = 15; // Ajustez la taille du QR Code selon vos besoins
              const maxTextWidth = pdfDoc.internal.pageSize.getWidth() - marginLeft - qrCodeSize - 20; // Ajustez l'espace disponible

              // Largeur totale de la page
              const positionYAfterTable = pdfDoc.autoTable.previous.finalY + 10;
              let currentY = positionYAfterTable;

              if (this.qrCodeUrl) {
                const xPositionQR = pdfDoc.internal.pageSize.getWidth() - qrCodeSize - 10; // Positionnez le code QR à droite
                const yPositionQR = currentY - 5; // Utilisez la même hauteur que la première ligne de texte
                pdfDoc.link(xPositionQR, yPositionQR, qrCodeSize, qrCodeSize, {
                  url: '/facture' + facture.reference, // Ajoutez ici votre lien
                  target: '_blank',
                });
                pdfDoc.addImage(this.qrCodeUrl, "JPEG", xPositionQR, yPositionQR, qrCodeSize, qrCodeSize);
              }
              // Parcourez chaque ligne du texte
              const textLines = pdfDoc.splitTextToSize(phraseAvecMontant, maxTextWidth);
              for (let i = 0; i < textLines.length; i++) {
                const line = textLines[i];

                // Calculez la hauteur de chaque ligne de texte
                const lineHeight = pdfDoc.getTextDimensions(line, { maxWidth: maxTextWidth }).h;

                // Ajoutez la ligne de texte justifié en gras
                pdfDoc.text(line, marginLeft, currentY, { maxWidth: maxTextWidth, align: "justify", fontStyle: "bold" });

                // Ajustez la position Y pour la prochaine ligne en fonction de la hauteur de la ligne de texte
                currentY += lineHeight;

                // Si ce n'est pas la dernière ligne, ajoutez le code QR sur la même ligne

              }

              // Ajoutez les statuts

              pdfDoc.setFont("helvetica", "bold");

              // Bloc conditionnel pour afficher le statut de paiement
              if (this.facturesReference.length > 0) {
                const statusLabel = this.facturesReference[0].paid == 0 ? 'NON PAYÉE' : 'PAYÉE';
                const statusColor = this.facturesReference[0].paid == 0 ? 'red' : 'green';

                pdfDoc.setDrawColor(0, 255, 0); // Bordure verte
                pdfDoc.setLineWidth(2); // Épaisseur de la bordure

                pdfDoc.setTextColor(statusColor);
                pdfDoc.text(statusLabel, marginLeft, currentY + 5);
                currentY += lineHeight;

              }


              // Ajoutez les signataires

              pdfDoc.setFont("helvetica", "normal");
              pdfDoc.setDrawColor(0, 0, 0);


              const signataires = this.signataires_data;
              // const signataires = ["Signataire 1", "Signataire 2", "Signataire 3", "Signataire  4"]; // Remplacez ces valeurs par vos signataires réels

              // Ajoutez les signataires
              const numberOfSignataires = signataires.length;

              // Ajustez la position verticale pour les noms des signataires
              // Ajustez la hauteur de la ligne en fonction de votre police
              const positionYSignataires = currentY + 15; // Ajustez la valeur selon vos besoins

              // Ajustez la largeur totale occupée par les noms des signataires
              const totalWidth = pdfDoc.internal.pageSize.getWidth() - 10; // Largeur totale de la page, ajustez selon vos besoins

              // Dans votre code pour ajouter les noms des signataires
              for (let i = 0; i < numberOfSignataires; i++) {

                const signataire = signataires[i];

                // Calculez la position horizontale en fonction du numéro de signataire
                const columnWidth = totalWidth / numberOfSignataires;
                let positionX;


                if (numberOfSignataires === 1) {
                  positionX = totalWidth; // Si un seul signataire, positionX est la largeur totale de la page
                } else if (numberOfSignataires === 2) {
                  // Pour deux signataires, le premier a une marge de 10 à gauche, et le deuxième à droite
                  positionX = i === 0 ? 10 : totalWidth;
                } else if (numberOfSignataires === 3) {
                  // Pour trois signataires, alignez le premier à gauche, le deuxième au centre et le troisième à droite
                  if (i === 0) {
                    positionX = 10; // Marge de 10 à gauche pour le premier
                  } else if (i === 1) {
                    // Centre du totalWidth en soustrayant la moitié de la largeur allouée pour chaque signataire
                    positionX = totalWidth / 2;
                  } else {
                    positionX = totalWidth; // Alignez le troisième à droite
                  }
                } else if (numberOfSignataires === 4) {
                  // Pour quatre signataires, divisez la page en quatre colonnes égales avec des marges
                  const columnWidth = (totalWidth - 20) / (numberOfSignataires - 1);
                  positionX = i * columnWidth + 10; // Ajouter la marge de 10 à gauche
                } else {
                  // Pour plus de quatre signataires, répartissez-les uniformément sur la page
                  const columnWidth = totalWidth / (numberOfSignataires - 1);
                  positionX = i * columnWidth;
                }



                // Ajoutez le texte du signataire avec la position calculée
                pdfDoc.text(positionX, positionYSignataires, signataire.titre, {
                  align:
                    numberOfSignataires === 1
                      ? 'right'
                      : numberOfSignataires === 2
                        ? i === 0
                          ? 'left'
                          : 'right'
                        : numberOfSignataires === 3
                          ? i === 0
                            ? 'left'
                            : i === 1
                              ? 'center'
                              : 'right'
                          : i === 0
                            ? 'left'
                            : i === 1
                              ? 'left' // Ajustez la position pour le deuxième signataire
                              : i === 2
                                ? 'right' // Ajustez la position pour le troisième signataire
                                : 'right',
                });

                pdfDoc.text(positionX, positionYSignataires + 30, signataire.name + ' ' + signataire.prenom, {
                  align:
                    numberOfSignataires === 1
                      ? 'right'
                      : numberOfSignataires === 2
                        ? i === 0
                          ? 'left'
                          : 'right'
                        : numberOfSignataires === 3
                          ? i === 0
                            ? 'left'
                            : i === 1
                              ? 'center'
                              : 'right'
                          : i === 0
                            ? 'left'
                            : i === 1
                              ? 'left' // Ajustez la position pour le deuxième signataire
                              : i === 2
                                ? 'right' // Ajustez la position pour le troisième signataire
                                : 'right',
                });


              }

            }


            // Ajoutez le texte du signataire avec la position calculée


            // Create a Blob from the PDF content
            const pdfBlob = pdfDoc.output("blob");

            // Create a URL for the Blob
            const pdfUrl = URL.createObjectURL(pdfBlob);

            // Open the PDF in a new tab
            window.open(pdfUrl, "_blank");
          }

        })
        .catch((error) => {
          console.error(error);
        });


    },




    getAllFactures() {
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

      factureService.getAllFatures({
        start_date: this.startDate,
        end_date: this.endDate,
        status: this.statutFacture
      }).then((res) => {

        this.indexSpinner = false;
        const cashRegisterId = this.cashRegisterCashierCurrent.id;
        this.factures = res.data.data.filter(facture => facture.cash_registers_id == cashRegisterId);


        // this.factures = res.data.data;
        console.log(this.factures)

        if (this.tableFactures) {
          this.tableFactures.destroy();
        }
        this.$nextTick(() => {
          this.initializeDataTable();
        });

        // console.log(res.data.user);


      });


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
      // reference = this.reference;
      const invoiceDetailsUrl = `${base}/facture/details/${reference}`;

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

    convertToWords(number) {
      // Vérifiez si l'entrée est un nombre valide
      const parsedNumber = parseFloat(number);
      if (isNaN(parsedNumber)) {
        return 'Nombre non valide';
      }
      // Utilisez to-words avec l'option localeCode
      const toWords = new ToWords({
        localeCode: 'fr-FR',
      });
      // Convertissez le nombre en mots
      const numberInWords = toWords.convert(parsedNumber);
      // Convertir en lettres minuscules
      const lowercaseWords = numberInWords.toLowerCase();
      return lowercaseWords;
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
</style>

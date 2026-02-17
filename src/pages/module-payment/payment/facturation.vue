<template>
  <section class="">
    <div class="row">
      <div class="col-md-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <h4 class="text-white rounded p-3 mb-3 text-center"
              style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)">
              Facture d'une venue
            </h4>
            <div class="col-md-12 col-lg-12 ">
              <div class="row">
                <div class="col-md-6 mt-2 col-lg-6">
                  <h4>Liste des 10 dernières venues</h4>
                </div>
                <div class="search-bar col-md-6 col-lg-6">
                  <input @input="getListAndSearchMovments" type="text" v-model="searchTerm" placeholder="Rechercher..." />
                </div>
              </div>
            </div>

            <div v-if="indexSpinnerMovment" class="spinner-border spinner-border-sm text-secocndary"
              style="font-size: 11px" role="status">
              <span class="sr-only">Loading...</span>
            </div>
            <div class="table-responsive mt-4" v-if="displayedMovments.length > 0">
              <table id="order-listing" ref="myTableMovment" class="table table-bordered">
                <thead>
                  <tr style="background-color: rgb(203, 204, 203)">
                    <th style="width: 5%">#</th>
                    <th style="width: 15%">Date d'arrivé</th>
                    <th style="width: 15%">N° IEP</th>
                    <th style="width: 15%">N° IPP</th>
                    <th style="width: 30%">Nom et prénom</th>
                    <th style="width: 20%">Téléphone</th>
                  </tr>
                </thead>

                <tbody v-if="displayedMovments.length > 0">
                  <tr class="row-hover" v-for="(movment, index) in displayedMovments" :key="movment.id"
                    @click="selectRow(index, movment.id)" :class="{ selected: selectedRow == index }">
                    <td>{{ index + 1 }}</td>
                    <td>{{ movment.formatted_arrivaldate }}</td>
                    <td>{{ movment.iep }}</td>
                    <td>{{ movment.ipp }}</td>
                    <td>{{ movment.lastname }} {{ movment.firstname }}</td>
                    <td>{{ movment.phone ? movment.phone : "-" }}</td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td colspan="6" style="text-align: center">Aucune donnée trouvée</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div v-if="indexSpinner" class="spinner-border spinner-border-sm text-secocndary" style="font-size: 11px"
              role="status">
              <span class="sr-only">Loading...</span>
            </div>

            <div v-if="filteredMedicalActDetailsA.length > 0">
              <ul class="nav nav-tabs d-flex" role="tablist">
                <li>
                  <button class="nav-link active font-weight-bold custom-tab">
                    Détails des prestations
                  </button>
                </li>
              </ul>

              <div class="">
                <div class=" ">
                  <span class="d-block mt-2"></span>
                  <div>
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>CODE</th>
                          <th>DESIGNATION</th>
                          <th style="text-align: center !important">QTE</th>
                          <th style="text-align: right !important">PRIX</th>
                          <th style="text-align: right !important">MONTANT</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in filteredMedicalActDetailsA" :key="index">
                          <td>{{ index + 1 }}</td>
                          <td style="text-align: left !important">{{ item.code }}</td>
                          <td style="text-align: left !important">
                            {{ item.designation }}
                          </td>
                          <td style="text-align: center !important">
                            {{ item.medical_acts_qte }}
                          </td>
                          <td style="text-align: right !important">
                            {{ formatNumber(item.medical_acts_price) }}
                          </td>
                          <td style="text-align: right !important">
                            {{
                              formatNumber(
                                item.medical_acts_qte * item.medical_acts_price
                              )
                            }}
                          </td>
                        </tr>

                        <tr style="background-color: #d6dbd6 !important">
                          <td colspan="5" style="font-weight: bold !important">
                            Montant brut (+)
                          </td>
                          <td style="font-weight: bold !important; text-align: right">
                            {{ formatNumber(totalAmountActesA()) }}
                          </td>
                        </tr>
                        <tr>
                          <td colspan="5" style="font-weight: bold !important">
                            Montant de la prise en charge (-)
                          </td>
                          <td style="font-weight: bold !important; text-align: right">
                            {{ formatNumber(montantPrisenchargePourcentageA) }}
                          </td>
                        </tr>
                        <tr style="background-color: #d6dbd6 !important">
                          <td colspan="5" style="font-weight: bold !important">
                            Total à payer
                          </td>
                          <td style="font-weight: bold !important; text-align: right">
                            {{
                              formatNumber(
                                totalAmountActesA() - montantPrisenchargePourcentageA
                              )
                            }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <!-- ------------------------------------------details des medicaments ----------------------------------------------------------------------------------------------------->

            <div v-if="productList.length > 0">
              <ul class="nav nav-tabs d-flex justify-content-between" role="tablist">
                <li>
                  <button class="nav-link active font-weight-bold custom-tab" data-bs-toggle="tab">
                    Détails des produits
                  </button>
                </li>

                <li class="d-flex justify-content-center">
                  <!-- 
                  <button class="mt-0 custom-tab" size="sm" v-b-tooltip.hover title="Ajouter un acte" variant="success" @click="addForm">
                    <i class="mdi mdi mdi-plus-box text-white menu-icon"></i>
                  </button> -->
                  <div class="col-md-1" style="margin-top: 7px">
                    <button class="btn btn-success btn-sm add" style="
                        font-size: 10px;
                        width: 35px;
                        height: 35px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                      " type="button" name="add" @click="addForm">
                      <span class="mdi mdi mdi-plus-box text-white menu-icon"></span>
                    </button>
                  </div>
                </li>
              </ul>

              <div class="">
                <div class="table-responsive">
                  <span class="mt-2"></span>
                  <div>
                    <div v-for="(form, formIndex) in forms" :key="formIndex"
                      class="d-flex flex-row mt-3 mb-1 pt-2 pb-2 pl-2 pr-2" style="border: 0.5px solid #dbdbdb">
                      <div class="d-flex flex-column pt-2 pb-2 pl-2 pr-2"
                        style="background-color: #f4f4f4; border: 0.5px solid #dbdbdb">
                        <div class="d-flex flex-column" id="suppllyProductList">
                          <div class="form-group row customize-row mb-0">
                            <div class="col-md-3 pl-0 pr-2">
                              <label class="form-label mini-label">Produits<span class="text-danger">*</span></label>
                            </div>
                            <div class="col-md-3 pl-0 pr-2">
                              <label class="form-label mini-label">Lots<span class="text-danger">*</span></label>
                            </div>
                            <div class="col-md-3 pl-0 pr-2">
                              <label class="form-label mini-label">Code<span class="text-danger">*</span></label>
                            </div>

                            <div class="col-md-3 pl-0 pr-0">
                              <label class="form-label mini-label">Date d'exp.<span class="text-danger">*</span></label>
                            </div>
                          </div>

                          <div class="form-group row customize-row mb-0">
                            <div class="col-md-3 pl-0 pr-2">
                              <select v-model="form.product_uuid" @change="getLotsByProduct(form.product_uuid, formIndex)"
                                class="form-control" id="productSelect">
                                <option value="">Sélectionner</option>
                                <option v-for="item in productList" :key="item.uuid" :value="item.uuid">
                                  {{ item.designation }}
                                </option>
                              </select>
                            </div>

                            <div class="col-md-3 pl-0 pr-2">
                              <select v-model="form.lot_id" @change="onLotSelected(formIndex)" class="form-control">
                                <option value="">Sélectionner</option>
                                <option v-for="lot in lotList[formIndex]" :key="lot.uuid" :value="lot.uuid">
                                  {{ lot.lot_number }}
                                </option>
                              </select>
                            </div>

                            <div class="col-md-3 pl-0 pr-2">
                              <input v-model="form.code" type="text" value="" min="1" max="999999" class="form-control"
                                :disabled="true" required />
                            </div>
                            <div class="col-md-3 pl-0 pr-2">
                              <input v-model="form.expire_date" type="date" value="12/11/2025" class="form-control"
                                :disabled="true" required />
                            </div>
                            <div class="col-md-12 d-flex flex-column mt-2" style="
                                padding-left: 0px;
                                padding-right: 0px;
                                max-height: 75px;
                              ">
                              <div class="col-md-12 d-flex flex-row" style="
                                  padding-left: 0px;
                                  padding-right: 0px;
                                  height: 30px;
                                  max-height: 22px;
                                ">
                                <div class="col-md-3 pl-0 pr-2">
                                  <label class="form-label mini-label">Qté commandé (U)<span
                                      class="text-danger">*</span></label>
                                </div>
                                <div class="col-md-3 pl-0 pr-2">
                                  <label class="form-label mini-label">Qté Disponible (U)</label>
                                </div>
                                <div class="col-md-3 pl-0 pr-2">
                                  <label class="form-label mini-label">Prix (U) <span style="color: red">*</span></label>
                                </div>
                                <div class="col-md-3 pl-0 pr-2">
                                  <label class="form-label mini-label">Montant<span class="text-danger">*</span></label>
                                </div>
                              </div>

                              <div class="col-md-12 d-flex flex-row" style="
                                  padding-left: 0px;
                                  padding-right: 0px;
                                  max-height: 45px;
                                ">
                                <div class="col-md-3 pl-0 pr-2">
                                  <input v-model="form.order_qte" type="number" @input="updateAmountP(formIndex)"
                                    class="form-control" min="1" max="999999999" required />
                                </div>

                                <div class="col-md-3 pl-0 pr-2">
                                  <input v-model="form.available_qte" type="number" :disabled="true" class="form-control"
                                    required />
                                </div>

                                <div class="col-md-3 pl-0 pr-2">
                                  <input v-model="form.sell_price" type="text" min="1" :disabled="true"
                                    class="form-control" required />
                                </div>

                                <div class="col-md-3 pl-0 pr-2">
                                  <input v-model="form.amount_product" type="text" minlength="3" :disabled="true"
                                    class="form-control" required />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-1 d-flex flex-row justify-content-end align-items-center pl-5 pr-0"
                        style="max-width: 40px">
                        <button class="btn btn-danger btn-sm remove remove" id="remove-0" @click="removeForm(formIndex)"
                          style="
                            font-size: 10px;
                            width: 32px;
                            height: 32px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                          " type="button" name="remove">
                          <span class="fa fa-minus"></span>
                        </button>
                      </div>
                    </div>

                    <!-- 
                    <div class=" col-lg-12  ml-0 mt-n2 ">
                      <div class="form-group ">
                        <b-button size="sm" v-b-tooltip.hover title="Ajouter un acte" variant="success" @click="addForm">
                          <i class="mdi mdi mdi-plus-box text-white menu-icon"></i>
                        </b-button>
                      </div>
                    </div> -->

                    <div class="col-md-12 py-1">
                      <div class="row d-flex justify-content-between align-items-center border-dark" style="
                          background-color: rgb(203, 204, 203);
                          padding: 8px;
                          border-radius: 5px;
                          font-size: 14px !important;
                        ">
                        <label for="montant" class="pl-0 form-group col-md-6 mb-0 font-weight-bold"
                          style="font-size: 14px !important">
                          Montant brut (+)</label>
                        <span id="montant" class="text-right ml-2 font-weight-bold">{{ formatNumberDecimal(totalAmountP)
                        }} FCFA</span>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="row d-flex justify-content-between align-items-center border-dark" style="
                          padding: 8px;
                          border-radius: 5px;
                          font-size: 14px !important;
                        ">
                        <label for="montant" class="pl-0 form-group col-md-6 mb-0 font-weight-bold"
                          style="font-size: 14px !important">Montant de la prise en charge (-)</label>
                        <span id="montant" class="text-right ml-2 font-weight-bold">{{
                          formatNumberDecimal(montantPrisenchargePourcentageP)
                        }}
                          FCFA</span>
                      </div>
                    </div>

                    <div class="col-md-12">
                      <div class="row d-flex justify-content-between align-items-center border-dark" style="
                          background-color: rgb(203, 204, 203);
                          padding: 8px;
                          border-radius: 5px;
                          font-size: 14px !important;
                        ">
                        <label for="montant" class="pl-0 form-group col-md-6 mb-0 font-weight-bold"
                          style="font-size: 14px !important">
                          Total à payer</label>
                        <span id="montant" class="text-right ml-2 font-weight-bold">{{
                          formatNumberDecimal(
                            totalAmountP - montantPrisenchargePourcentageP
                          )
                        }}
                          FCFA</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="filteredMedicalActDetailsA.length > 0 ||
                filteredMedicalActDetailsP.length > 0
                " style="margin-top: -5px">
              <div class="d-flex justify-content-end mt-0">
                <button type="" @click="createFacture" class="btn btn-success btn-medpay-green"
                  style="padding: 8px !important; width: 150px !important">
                  Facturer
                </button>
              </div>
            </div>

            <div v-if="indexSpinnerFacturer" class="spinner-border spinner-border-sm text-secocndary"
              style="font-size: 11px" role="status">
              <span class="sr-only">Loading...</span>
            </div>

            <!-- ------------------------------------------details des medicaments ----------------------------------------------------------------------------------------------------->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script></script>

<script type="text/javascript">


import $ from "jquery";

import * as JSZip from "jszip";
window.JSZip = JSZip;
import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = vfsFonts.pdfMake.vfs;
import "datatables.net-dt";
import "../../../../node_modules/datatables.net-bs4/js/dataTables.bootstrap4";
import "../../../../node_modules/datatables.net-buttons/js/dataTables.buttons";
import "../../../../node_modules/datatables.net-buttons-bs4/js/buttons.bootstrap4";
import FrenchTranslation from "@/assets/datatable/French.json";
import "../../../../node_modules/datatables.net-buttons/js/buttons.html5.js";
import "../../../../node_modules/datatables.net-buttons/js/buttons.print.js";
import "../../../../node_modules/datatables.net-buttons/js/buttons.colVis.js";
import "../../../../node_modules/bootstrap/dist/js/bootstrap.js"; // tres important pour le modal
import "../../../../node_modules/bootstrap/dist/js/bootstrap.min.js"; // tres important pour le modal
import Vue from "vue";

import jsPDF from "jspdf";
import "jspdf-autotable";

require("datatables.net-dt");
// const toWords = require('to-words');
import { format } from "date-fns";

import { patientService } from "@/_services/patients_services.js";
import { pourcentagePatient } from "@/_services/pourcentage_indigence_patient_services.js";
import { PriseEnChargePatientService } from "@/_services/priseenchargepatient_services.js";

import { factureService } from "@/_services/facture_services.js";
import { especeService } from "@/_services/espece_services.js";
import { fedapayService } from "@/_services/fedapay_services.js";
import { useToast, POSITION } from "vue-toastification";
import QRCode from "qrcode";
import { affectterminalService } from "@/_services";


// import html2pdf from "html2pdf.js";
// import html2canvas from "html2canvas";
import image1Src from "@/assets/images/logo.png";
import image2Src from "@/assets/images/santee.png";

import { ToWords } from 'to-words';
import payerState from "@/assets/images/payer.png";
import nonPayerState from "@/assets/images/nonpayer.png";




export default {
  name: "create-payement",

  data() {
    return {
      selectedProductUuid: null,
      productSpecifications: {},

      /*********************/

      selectedPatient: "",
      isPrinting: false,
      modePayements: [],
      selectedCashRegister: "",
      displayedMovments: [], // Les mouvements à afficher dans le tableau
      searchTerm: "", // Terme de recherche
      // modePayement: {},
      //utilisateur connecté
      user: JSON.parse(localStorage.getItem("user")),

      modePayement: "",
      patients: [], // Remplir cette liste avec les patients disponibles
      patientsMove: [], // Remplir cette liste avec les patients disponibles
      patient: {},
      statutCashier: 0,

      items: [
        // Vos données ici
      ],

      assurance: "",
      indigence: "",
      assurancePourcentage: null,
      assuranceNumero: null,
      indigencePourcentage: "",
      totalPriseEncharge: "",
      indigencePatients: [],
      indigences: [],
      patientIndigence: null,
      pourcentageIndigence: null,
      prisenchargePourcentageA: 0,
      prisenchargePourcentageP: 0,
      montantPrisenchargePourcentageA: 0,
      montantPrisenchargePourcentageP: 0.0,
      assurancepatient: null,
      indigencepatient: "",
      payementId: "",
      montantTotalActes: null,
      montantFedapay: null,
      montantKikiapay: null,
      qrCodeUrl: "",
      invoiceUrl: "",
      feesKikiapay: "",
      feesFedapay: "",
      patientInsuranceDetails: [],
      selectedInsuranceIndex: null,
      selectedInsurancePercentage: null,
      affectterminals: [],
      listMovments: [],
      referenceFacture: null,
      tableInsurance: null,
      movmentId: null,

      lotList: [],
      productList: [],
      signataires_data: [],
      totalActe: "",
      selectedRow: -1, // Index de la ligne sélectionnée (aucune ligne sélectionnée initialement)
      medicalActDetails: [], // Tableau pour stocker les détails des actes médicaux
      medicalActDetailsFacture: [],
      showModal: false,

      // pourcentageindigence:"",
      searchQuery: "",
      ipeMovment:"",
      cashRegisterCashierCurrent: {},
      cashsHistoricalCurrent: {},
      searchQuery1: "",

      anotherParamSearch: "", // Ce paramètre sera utilisé pour la requête

      actesMedicals: [], // Tableau pour stocker l'acte medical en fonction de l'id de l'acte choisi par user
      listactes: [], // Tableau pour stocker l'acte medical en fonction de l'id de l'acte choisi par user
      actesSelectionnes: [],
      medicalActDetailsFactureA: [],
      montantEspece: null,
      statusFedapay: null,
      indexSpinner: false,
      indexSpinnerFacturer: false,
      indexSpinnerMovment: false,
      errorMessages: [],
      showErrorMessage: false,

      //  readonlyoption: 'autre',
      //  isreadonly: true,

      afficherModal: false,
      totalAmountP: 0.0,
      //selected: 'A',

      selectedOptionMode: "",

      selected: "",

      forms: [
        {
          product_uuid: "",
          lot_id: "",
          code: "",
          expire_date: "",
          order_qte: "",
          available_qte: "",
          sell_price: "",
          amount_product: "",

          readonly: true,
        },
      ],

      showModal: false,

      invoice: {
        number: "230510406-CS006",
        date: new Date(),
      },

      formErrors: {
        nom: false,
        prenom: false,
        telephone: false,
        patient: false,
        agePatient: false,
        acteMedical: false,
        autreActe: false,
        prix: false,
      },
    };
  },

  methods: {

    generateAndOpenPDFA(data) {
      // Create a new jsPDF instance with portrait orientation
      this.generateQRCodeA(data[0].reference);
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
        this.patient.lastname + " "+  this.patient.firstname, 
        "IPP : " + this.patient.ipp,
        "IEP : " + this.ipeMovment,
        this.patient.emergency_contac + ( this.patient.phone ? " / " +  this.patient.phone : ''),
       
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
        "FACTURE N°" +  data[0].reference,
        "Date : "   +  this.formaterDate(data[0].created_at) ,
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
          if (i === 0 || i === 1 || i === 2 || i === 3 || i === 4 ) {
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

      if (data && data.length > 0) {
        // ... Votre code existant

        const columns = [
          { content: "Code", styles: { halign: "left" } },
          { 
            content: data[0].type === "A" ? "Description prestation(s)" : "Description produit(s)",
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
        for (var i = 0; i < data.length; i++) {
          var row = [
            data[i].code,
            data[i].designation,
            data[i].quantite,
            data[i].prix,
            data[i].amount,
          ];

          total += parseInt(data[i].amount); 
          rows.push(row);
        }
        const montantPriseEnCharge = total * (data[0]['percentageassurance'] || 0);
        const montantTotalVerse = data[0]['partial_amount'] !== null
        ? data[0]['partial_amount']
        : total - montantPriseEnCharge;

        rows.push([
  { content: 'Montant total (+)', colSpan: 4, styles: { fontStyle: 'bold', halign: 'left', textColor: [0, 0, 0] } },

  { content: this.formatNumber(total) + " FCFA", colSpan: 1,  styles: { fontStyle: 'bold', halign: 'right', textColor: [0, 0, 0]  } },
]);

 
  rows.push([
    { content: 'Montant de la prise en charge (-)', colSpan: 4, styles: { fontStyle: 'bold', halign: 'left', textColor: [0, 0, 0] } },

    { content: this.formatNumber(montantPriseEnCharge) + " FCFA", colSpan: 1,  styles: { fontStyle: 'bold', halign: 'right', textColor: [0, 0, 0] } },
  ]);
  rows.push([
    { content: 'Total à payer', colSpan: 4, styles: { fontStyle: 'bold', halign: 'left', fillColor: [44, 65, 86],  textColor: [255, 255, 255] } },

    { content: this.formatNumber(montantTotalVerse) + " FCFA", colSpan: 1,  styles: { fontStyle: 'bold', halign: 'right', fillColor: [44, 65, 86],  textColor: [255, 255, 255] } },
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
const phraseAvecMontant = "Arrêté la présente facture à la somme de: " + this.convertNumberToLetter(montantTotalVerse) + " FCFA";
const marginLeft = 10; // Ajustez la marge à gauche selon vos besoins
const lineHeight = 5; // Ajustez la hauteur de chaque ligne
const qrCodeSize = 15; // Ajustez la taille du QR Code selon vos besoins
const maxTextWidth = pdfDoc.internal.pageSize.getWidth() - marginLeft - qrCodeSize - 20; // Ajustez l'espace disponible

// Largeur totale de la page
const positionYAfterTable = pdfDoc.autoTable.previous.finalY + 10;
let currentY = positionYAfterTable;

if ( this.qrCodeUrl) {
  const xPositionQR = pdfDoc.internal.pageSize.getWidth() - qrCodeSize - 10; // Positionnez le code QR à droite
  const yPositionQR = currentY - 5; // Utilisez la même hauteur que la première ligne de texte
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

// Ajoutez les signataires

  if (this.facturesReference.length > 0) {
                
    const isPaid = this.facturesReference[0].paid == 1;
    const statusImage = isPaid ? payerState : nonPayerState;

    // Ajoutez l'image à gauche
    const imageWidth = 26; // Ajustez la largeur de l'image selon vos besoins
    const imageHeight = 20; // Ajustez la hauteur de l'image selon vos besoins
    const imageXPosition = marginLeft; // Position x à gauche
    const imageYPosition = currentY + 8; // Ajustez la position y selon vos besoins

    pdfDoc.addImage(statusImage, 'JPEG', imageXPosition, imageYPosition, imageWidth, imageHeight);

    currentY += Math.max(imageHeight, lineHeight); // Ajustez la position Y pour le contenu suivant en fonction de la hauteur de l'image ou du texte
  }


pdfDoc.setFont("helvetica", "normal");


const signataires =  this.signataires_data;
// const signataires = ["Signataire 1", "Signataire 2", "Signataire 3", "Signataire  4"]; // Remplacez ces valeurs par vos signataires réels

// Ajoutez les signataires
const numberOfSignataires = signataires.length;

// Ajustez la position verticale pour les noms des signataires
 // Ajustez la hauteur de la ligne en fonction de votre police
const positionYSignataires = currentY  + 15  ; // Ajustez la valeur selon vos besoins

// Ajustez la largeur totale occupée par les noms des signataires
const totalWidth = pdfDoc.internal.pageSize.getWidth() - 10; // Largeur totale de la page, ajustez selon vos besoins

// Dans votre code pour ajouter les noms des signataires
for (let i = 0; i < numberOfSignataires; i++) {

  const signataire = signataires[i];

  // Calculez la position horizontale en fonction du numéro de signataire
  const columnWidth = totalWidth / numberOfSignataires;
  let positionX ;

 
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
  // pdfDoc.text(positionX, positionYSignataires, signataire.titre, {
  //   align:
  //     numberOfSignataires === 1
  //       ? 'right'
  //       : numberOfSignataires === 2
  //       ? i === 0
  //         ? 'left'
  //         : 'right'
  //       : numberOfSignataires === 3
  //       ? i === 0
  //         ? 'left'
  //         : i === 1
  //         ? 'center'
  //         : 'right'
  //       : i === 0
  //       ? 'left'
  //       : i === 1
  //       ? 'left' // Ajustez la position pour le deuxième signataire
  //       : i === 2
  //       ? 'right' // Ajustez la position pour le troisième signataire
  //       : 'right',
  // });

  // pdfDoc.text(positionX, positionYSignataires + 30,   signataire.user.name + ' ' + signataire.user.prenom, {
  //   align:
  //     numberOfSignataires === 1
  //       ? 'right'
  //       : numberOfSignataires === 2
  //       ? i === 0
  //         ? 'left'
  //         : 'right'
  //       : numberOfSignataires === 3
  //       ? i === 0
  //         ? 'left'
  //         : i === 1
  //         ? 'center'
  //         : 'right'
  //       : i === 0
  //       ? 'left'
  //       : i === 1
  //       ? 'left' // Ajustez la position pour le deuxième signataire
  //       : i === 2
  //       ? 'right' // Ajustez la position pour le troisième signataire
  //       : 'right',
  // });




}


 // Ajoutez le texte du signataire avec la position calculée



      }

      // Create a Blob from the PDF content
      const pdfBlob = pdfDoc.output("blob");

      // Create a URL for the Blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Open the PDF in a new tab
      window.open(pdfUrl, "_blank");
    },

    generateAndOpenPDFP(data) {
      // Create a new jsPDF instance with portrait orientation
      this.generateQRCodeA(data[0].reference);
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
        this.patient.lastname + " "+  this.patient.firstname, 
        "IPP : " + this.patient.ipp,
        "IEP : " + this.ipeMovment,
        this.patient.emergency_contac + ( this.patient.phone ? " / " +  this.patient.phone : ''),
       
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
        "FACTURE N°" +  data[0].reference,
        "Date : "   +  this.formaterDate(data[0].created_at) ,
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
          if (i === 0 || i === 1 || i === 2 || i === 3 || i === 4 ) {
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

      if (data && data.length > 0) {
        // ... Votre code existant

        const columns = [
          { content: "Code", styles: { halign: "left" } },
          { 
            content: data[0].type === "A" ? "Description prestation(s)" : "Description produit(s)",
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
        for (var i = 0; i < data.length; i++) {
          var row = [
            data[i].code,
            data[i].designation,
            data[i].quantite,
            data[i].prix,
            data[i].amount,
          ];

          total += parseFloat(data[i].amount); 
          rows.push(row);
        }
        const montantPriseEnCharge = total * (data[0]['percentageassurance'] || 0);

        const montantTotalVerse = data[0]['partial_amount'] !== null
        ? data[0]['partial_amount']
        : total - montantPriseEnCharge;

        rows.push([
  { content: 'Montant total (+)', colSpan: 4, styles: { fontStyle: 'bold', halign: 'left', textColor: [0, 0, 0] } },

  { content: this.formatNumberDecimal(total) + " FCFA", colSpan: 1,  styles: { fontStyle: 'bold', halign: 'right', textColor: [0, 0, 0]  } },
]);

  rows.push([
    { content: 'Montant de la prise en charge (-)', colSpan: 4, styles: { fontStyle: 'bold', halign: 'left', textColor: [0, 0, 0] } },

    { content: this.formatNumberDecimal(montantPriseEnCharge) + " FCFA", colSpan: 1,  styles: { fontStyle: 'bold', halign: 'right', textColor: [0, 0, 0] } },
  ]);
  rows.push([
    { content: 'Total à payer', colSpan: 4, styles: { fontStyle: 'bold', halign: 'left', fillColor: [44, 65, 86],  textColor: [255, 255, 255] } },

    { content: this.formatNumberDecimal(montantTotalVerse) + " FCFA", colSpan: 1,  styles: { fontStyle: 'bold', halign: 'right', fillColor: [44, 65, 86],  textColor: [255, 255, 255] } },
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



pdfDoc.setFont("helvetica", "bold");


// Position verticale après le tableau

// Ajoutez le texte avec retour automatique à la ligne en fonction de la largeur maximale
const phraseAvecMontant = "Arrêté la présente facture à la somme de: " + this.convertToWords(montantTotalVerse) + " FCFA";


const marginLeft = 10; // Ajustez la marge à gauche selon vos besoins
const lineHeight = 5; // Ajustez la hauteur de chaque ligne
const qrCodeSize = 15; // Ajustez la taille du QR Code selon vos besoins
const maxTextWidth = pdfDoc.internal.pageSize.getWidth() - marginLeft - qrCodeSize - 20; // Ajustez l'espace disponible

// Largeur totale de la page
const positionYAfterTable = pdfDoc.autoTable.previous.finalY + 10;
let currentY = positionYAfterTable;

if ( this.qrCodeUrl) {
  const xPositionQR = pdfDoc.internal.pageSize.getWidth() - qrCodeSize - 10; // Positionnez le code QR à droite
  const yPositionQR = currentY - 5; // Utilisez la même hauteur que la première ligne de texte
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



pdfDoc.setFont("helvetica", "normal");


const signataires =  this.signataires_data;
// const signataires = ["Signataire 1", "Signataire 2", "Signataire 3", "Signataire  4"]; // Remplacez ces valeurs par vos signataires réels

// Ajoutez les signataires
const numberOfSignataires = signataires.length;

// Ajustez la position verticale pour les noms des signataires
 // Ajustez la hauteur de la ligne en fonction de votre police
const positionYSignataires = currentY + 16 ; // Ajustez la valeur selon vos besoins

// Ajustez la largeur totale occupée par les noms des signataires
const totalWidth = pdfDoc.internal.pageSize.getWidth() - 10; // Largeur totale de la page, ajustez selon vos besoins

// Dans votre code pour ajouter les noms des signataires
for (let i = 0; i < numberOfSignataires; i++) {

  const signataire = signataires[i];

  // Calculez la position horizontale en fonction du numéro de signataire
  const columnWidth = totalWidth / numberOfSignataires;
  let positionX ;

 
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

  pdfDoc.text(positionX, positionYSignataires + 30,   signataire.user.name + ' ' + signataire.user.prenom, {
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


 // Ajoutez le texte du signataire avec la position calculée



      }

      // Create a Blob from the PDF content
      const pdfBlob = pdfDoc.output("blob");

      // Create a URL for the Blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Open the PDF in a new tab
      window.open(pdfUrl, "_blank");
    },

//   formatNumberDecimalLetter(price) {
//   const integerPart = Math.floor(price);
//   const decimalPart = Math.round((price - integerPart) * 100); // Arrondir à deux décimales

//   const integerPartInWords = numberToWords.toWords(integerPart, { language: 'fr' });
//   const decimalPartInWords = numberToWords.toWords(decimalPart, { language: 'fr' });

//   const priceInWords = `${integerPartInWords} virgule ${decimalPartInWords}`;

//   return priceInWords;
// },



//  formatNumberDecimalLetter(price) {
//   const integerPart = Math.floor(price);
//   const decimalPart = Math.round((price - integerPart) * 100); // Arrondir à deux décimales

//   const integerPartInWords = numberToWords.toWords(integerPart, { language: 'fr' });

//   let decimalPartInWords = '';
//   if (decimalPart > 0) {
//     decimalPartInWords = `virgule ${numberToWords.toWords(decimalPart, { language: 'fr' })}`;
//   }

//   const priceInWords = `${integerPartInWords} ${decimalPartInWords}`;

//   return priceInWords.trim(); // Supprimer les espaces inutiles
// },





    // async generateAndOpenPDF() {
    //   try {
    //     // Obtenez le chemin vers le fichier exemple.html
    //     const exampleHtmlPath = '/exemple.html';

    //     // Chargez le contenu du fichier exemple.html
    //     const response = await fetch(exampleHtmlPath);
    //     const htmlContent = await response.text();

    //     // Créez une instance de jsPDF
    //     const pdf = new jsPDF();

    //     // Ajoutez le HTML au PDF
    //     pdf.html(htmlContent, {
    //       callback: () => {
    //         // Obtenez le blob du PDF
    //         const pdfBlob = pdf.output('blob');

    //         // Créez une URL pour le blob
    //         const pdfUrl = URL.createObjectURL(pdfBlob);

    //         // Ouvrez le PDF dans un nouvel onglet du navigateur
    //         window.open(pdfUrl, '_blank');
    //       }
    //     });
    //   } catch (error) {
    //     console.error('Une erreur s\'est produite lors de la génération du PDF.', error);
    //   }
    // },

    supprimerLigne(item) {
      // Supprimer la ligne
      const index = this.medicalActDetailsFacture.indexOf(item);
      if (index !== -1) {
        this.medicalActDetailsFacture.splice(index, 1);
      }

      if (this.medicalActDetailsFacture.length == 0) {
        // Aucune ligne ne s'affiche plus, déselectionnez la ligne
        this.selectedRow = -1;
      }

      // Mettre à jour le montant total
      this.montantTotalActes = this.calculateTotalActes();
    },

    // getHistoricalCurrent() {
    //   factureService
    //     .getHistoricalCurrent(this.cashRegisterCashierCurrent.cash_registers_id)
    //     .then((res) => {
    //       this.cashsHistoricalCurrent = res.data.data;
    //       console.log("this.cashsHistoricalCurrent ");
    //       console.log(this.cashsHistoricalCurrent);
    //       // console.log("this.displayedMovments");
    //       // console.log(this.displayedMovments);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // },

    // getCashRegisterCashierCurrent() {
    //   // Si this.searchTerm est vide, obtenez les derniers mouvements par défaut.
    //   // Sinon, effectuez une recherche en utilisant this.searchTerm.
    //   const user_id = 1;
    //   factureService
    //     .getCashRegisterCashierCurrent(user_id)
    //     .then((res) => {
    //       this.cashRegisterCashierCurrent = res.data.data;
    //       this.getHistoricalCurrent();
    //       // console.log("this.cashRegisterCashierCurrent" );
    //       // console.log(this.cashRegisterCashierCurrent );
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // },

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

    selectRow(index, movmentId) {
      if (this.selectedRow == index) {
        // Si la ligne est déjà sélectionnée, désélectionnez-la
        this.selectedRow = -1;
        this.medicalActDetails = [];
        this.medicalActDetailsFactureA = [];

        this.medicalActDetailsFacture = [];
        this.productList = [];
        this.indexSpinner = false;
        this.indexSpinnerMovment = false;

        this.forms = [];
        // this.showModal = false;
      } else {
        this.forms = [
          {
            product_uuid: "",
            lot_id: "",
            code: "",
            expire_date: "",
            order_qte: "",
            available_qte: "",
            sell_price: "",
            amount_product: 0.0,
          },
        ];

        this.indexSpinner = true;
        // Sinon, sélectionnez la ligne
        this.selectedRow = index;
        // console.log("movmentId");
        this.movmentId = movmentId;
        console.log("this.movmentId");
        console.log(this.movmentId);

        // console.log(movmentId);

        factureService
          .getActMovment(movmentId)
          .then((response) => {
            this.indexSpinner = false;
            this.medicalActDetails = response.data.data;
            console.log("this.medicalActDetails");
            console.log(this.medicalActDetails);
            
            this.ipeMovment = this.displayedMovments
            .filter((item) => item.id == this.movmentId)
            .map((item) => item.iep);


            this.medicalActDetailsFacture = response.data.data;

            this.productList = this.medicalActDetailsFacture.filter(
              (item) => item.type == "P"
            );

            this.medicalActDetailsFactureA = this.medicalActDetailsFacture.filter(
              (item) => item.type === "A"
            );

            console.log("this.productList");
            console.log(this.productList);

            if (
              this.medicalActDetailsFactureA &&
              this.medicalActDetailsFactureA.length > 0
            ) {
              this.prisenchargePourcentageA = this.medicalActDetailsFactureA[0].percentage_patient_insurance;
              this.montantPrisenchargePourcentageA =
                (this.prisenchargePourcentageA * this.totalAmountActesA()) / 100;
            }

            console.log(
              "this.montantPrisenchargePourcentageA, this.montantPrisenchargePourcentageP"
            );
            console.log(
              this.montantPrisenchargePourcentageA,
              this.montantPrisenchargePourcentageP
            );

            console.log("this.productList");
            // console.log(this.medicalActDetailsFacture);
            // console.log("this.productList");
            // console.log(this.productList);

            if (this.medicalActDetails.length == 0) {
              this.$toast.error("Aucun acte médical trouvé!", {
                position: "top-right",
                timeout: 3000,
                style: {
                  background: "#ff0000", // Couleur de fond rouge pour l'erreur
                  color: "#fff", // Couleur du texte
                  fontWeight: "bold",
                },
              });
            } else {
            }
            // console.log(this.medicalActDetails);
          })
          .catch((error) => {
            console.error(error);
          });

       factureService
           .getPatientInfo(movmentId)
         .then((res) => {
            this.patient = res.data.data;

            console.log("this.patientSelected");
            console.log(this.patient);

            //  return factureService.getInsuranceDetailsByIpp(this.patient.ipp);
           })
           .catch((error) => {
             console.error(error);
           });
        // Appelez la méthode pour récupérer les détails des actes médicaux en utilisant movmentId
      }
      
    },

    getListMovment() {
      factureService.getListMovment().then((res) => {
        this.listMovments = res.data.data;

        // console.log(this.listMovments);
      });
    },

    getListAndSearchMovments() {
      this.indexSpinnerMovment = true;
      // Si this.searchTerm est vide, obtenez les derniers mouvements par défaut.
      // Sinon, effectuez une recherche en utilisant this.searchTerm.
      const formData = { search: this.searchTerm };
      factureService
        .searchMovments(formData)
        .then((res) => {
          this.indexSpinnerMovment = false;
          this.displayedMovments = res.data.data;
          // console.log("this.displayedMovments");
          // console.log(this.displayedMovments);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // fetchModePayements() {
    //   modePayementService
    //     .getAllModePayement()
    //     .then((res) => {
    //       this.modePayements = res.data.data;
    //       // console.log(this.modePayement); // $('button#pay-btn').click(); })
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // },

    fetchPatients() {
      patientService
        .getAllPatients()
        .then((res) => {
          this.patients = res.data.data;
          console.log("tous les patients");
          // console.log(this.patients);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    detail() {
      this.formErrors.patient = false;
      patientService.getPatient(this.selectedPatient).then((res) => {
        this.patient = res.data.data;

        // this.assurance = this.patient.assurance;
        // this.indigence = this.patient.indigence;
        // this.assurancePourcentage = this.patient.assurancePourcentage;  pk_live_pEpqCZWH8MzLlFG06SCzq3ZU
        // this.indigencePourcentage = this.patient.indigencePourcentage;
      });

      pourcentagePatient
        .getPourcentagePatient(this.selectedPatient)
        .then((res) => {
          this.pourcentageIndigence = res.data.data;
          // console.log(this.pourcentageIndigence);
        })

        .catch((error) => {
          console.error(error);
        });

      PriseEnChargePatientService.getAssurancePatient(this.selectedPatient)
        .then((res) => {
          console.log(res.data.data);
          this.assurancepatient = res.data.data.assurance_nom;
          this.assurancePourcentage = res.data.data.pourcentage_assurance;
          this.assuranceNumero = res.data.data.numero_assurance;
          console.log(this.assurancepatient, this.assurancePourcentage);
        })
        .catch((error) => {
          console.error(error);
        });

      // Recharger la liste des actes médicaux

      // factureService
      //   .getActMovment(this.searchQuery)
      //   .then((res) => {
      //     this.actesMedicals = res.data.data;
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    },

    // fetchActeMedicalDetails(id) {    // function pour recuperer un acte medical

    //   acteMedicalService.getacteMedical(id)
    //     .then(response => {
    //       const acteMedicalDetails = response.data.data; // recuperer un acte medical
    //       // Mettre à jour les détails de l'acte médical
    //       this.form.code = acteMedicalDetails.code;
    //       this.form.prix = acteMedicalDetails.prix;
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    // },

    // formatDate(date) {
    //   const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    //   return new Date(date).toLocaleString('fr-FR', options);
    // },

    // formaterDate(date) {
    //   const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    //   const formattedDate = new Date(date).toLocaleDateString("fr-FR", options);
    //   const formattedTime = new Date(date).toLocaleTimeString("fr-FR", {
    //     hour: "2-digit",
    //     minute: "2-digit",
    //   });
    //   return `${formattedDate} à ${formattedTime}`;
    // },

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

    generateQRCodeA(reference) {
      const base = location.origin;
      reference = this.referenceFacture;
      const invoiceDetailsUrl = `${base}/facture/details/${this.referenceFacture}`;

      QRCode.toDataURL(invoiceDetailsUrl, { errorCorrectionLevel: "L" }, (err, url) => {
        if (err) {
          console.error(err);
          return;
        }

        this.qrCodeUrl = url; //  genere le code QR
        // console.log("this.qrCodeUrl");
        // console.log(this.qrCodeUrl);
      });
    },

    calculateTotalMontantActe() {
      let total = 0;
      for (const form of this.forms) {
        total += form.amount_product;
      }
      return total;
    },

    calculateTotalActes() {
      let totalAmount = 0;

      for (const acte of this.medicalActDetailsFacture) {
        totalAmount += acte.medical_acts_qte * Math.round(acte.medical_acts_price);
      }

      return totalAmount;
    },

    calculateTotalAmount() {
      let totalAmount = 0;
      let assuranceMontant = 0;

      for (const acte of this.medicalActDetailsFacture) {
        totalAmount += acte.medical_acts_qte * Math.round(acte.medical_acts_price);
      }

      this.totalActe = totalAmount;

      if (this.selectedInsurancePercentage) {
        assuranceMontant = (this.selectedInsurancePercentage * this.totalActe) / 100;
        this.totalPriseEncharge = assuranceMontant;
        // console.log("assuranceMontant")
      } else {
        assuranceMontant = 0;
      }

      if (this.selectedOptionMode == 2) {
        this.totalActe = this.totalActe + this.feesKikiapay;
      }

      if (this.selectedOptionMode == 3) {
        this.totalActe = this.totalActe + this.feesFedapay;
      }

      this.totalActe = this.totalActe - assuranceMontant;
      // console.log( "this.totalActe")
      // console.log( this.totalActe)

      this.momoData.montant = this.totalActe;
      // console.log("Total Amount:", this.totalActe);
      return this.totalActe;
    },

    // formatNumberDecimal(nombre) {
    //   let options = {
    //     minimumFractionDigits: 2,
    //     maximumFractionDigits: 2,
    //   };
    //   return nombre.toLocaleString("fr-FR", options);
    // },

    calculateTotalMontant() {
      let total = 0;
      let assuranceMontant = 0;
      let indigenceMontant = 0;

      for (const form of this.forms) {
        total += form.amount_product;
      }

      if (this.assurancePourcentage) {
        assuranceMontant = (this.assurancePourcentage * total) / 100;
      } else {
        assuranceMontant = 0;
      }

      if (this.pourcentageIndigence) {
        indigenceMontant = (this.pourcentageIndigence * total) / 100;
      } else {
        indigenceMontant = 0;
      }

      // TotalPriseEncharge = assuranceMontant + indigenceMontant;
      this.totalPriseEncharge = assuranceMontant + indigenceMontant;
      total = total - this.totalPriseEncharge;

      if (this.selectedOptionMode == 4) {
        total = total + this.feesKikiapay;
      }

      if (this.selectedOptionMode == 3) {
        total = total + this.feesFedapay;
      }

      this.momoData.montant = total;

      return total;
    },

    calculateTotalMontantEspece() {
      // cette fonction calcule le montant total identique à calculateTotalMontant()
      let total = 0;
      let assuranceMontant = 0;
      let indigenceMontant = 0;

      for (const form of this.forms) {
        total += form.amount_product;
      }

      if (this.assurancePourcentage) {
        assuranceMontant = (this.assurancePourcentage * total) / 100;
      } else {
        assuranceMontant = 0;
      }

      if (this.pourcentageIndigence) {
        indigenceMontant = (this.pourcentageIndigence * total) / 100;
      } else {
        indigenceMontant = 0;
      }

      // TotalPriseEncharge = assuranceMontant + indigenceMontant;
      this.totalPriseEncharge = assuranceMontant + indigenceMontant;
      total = total - this.totalPriseEncharge;
      this.momoDataEspece.montant = total;
      return total;
    },

    formatNumber(value) {
      if (typeof value !== "number") {
        return value;
      }

      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },

    // formatNumberDecimal(value) {
    //   if (typeof value != "number") {
    //     return value;
    //   }

    //   // Utilisez toFixed(2) pour formater le nombre avec deux chiffres après la virgule
    //   return value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    // },

    formatNumberDecimal(number) {

if (!isNaN(number) && number !== null && number !== undefined) {
  const numericValue = parseFloat(number);
  const formattedNumber = numericValue.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return formattedNumber.replace(',', '.');
} else {
  return '';  // ou tout autre valeur par défaut que vous préférez
}

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


    NumberToLetterDecimal(nombre) {
  let i, j, n, quotient, reste, nb;
  let ch;
  let numberToLetter = "";

  if (nombre.toString().replace(/ /gi, "").length > 18) return "dépassement de capacité";
  if (isNaN(nombre.toString().replace(/ /gi, ""))) return "Nombre non valide";

  nb = parseFloat(nombre.toString().replace(/ /gi, ""));
  if (Math.ceil(nb) !== nb) return "Nombre avec virgule non géré.";

  n = nb.toString().length;
  switch (n) {
    // ... (votre code pour les cas déjà existants)

    case 16:
    case 17:
    case 18:
      quotient = Math.floor(nb / 1000000000000000);
      reste = nb - quotient * 1000000000000000;
      if (quotient === 1 && reste === 0) numberToLetter = "un billiard";
      if (quotient === 1 && reste !== 0)
        numberToLetter = "un billiard" + " " + this.NumberToLetter(reste);
      if (quotient > 1 && reste === 0)
        numberToLetter = this.NumberToLetter(quotient) + " billiards";
      if (quotient > 1 && reste !== 0)
        numberToLetter =
          this.NumberToLetter(quotient) + " billiards " + this.NumberToLetter(reste);
      break;
    case 19:
    case 20:
      quotient = Math.floor(nb / 1000000000000000000);
      reste = nb - quotient * 1000000000000000000;
      if (quotient === 1 && reste === 0) numberToLetter = "un trillion";
      if (quotient === 1 && reste !== 0)
        numberToLetter = "un trillion" + " " + this.NumberToLetter(reste);
      if (quotient > 1 && reste === 0)
        numberToLetter = this.NumberToLetter(quotient) + " trillions";
      if (quotient > 1 && reste !== 0)
        numberToLetter =
          this.NumberToLetter(quotient) + " trillions " + this.NumberToLetter(reste);
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

    // searchMedicalActs() {
    //   if (this.searchQuery1 && this.searchQuery) {
    //     // Les deux champs sont renseignés, choisissez l'IPP en premier
    //     this.anotherParamSearch = this.searchQuery;
    //   } else if (this.searchQuery && !this.searchQuery1) {
    //     // Le champ IPP/IEP est renseigné et le champ nom est vide
    //     this.anotherParamSearch = this.searchQuery;
    //   } else if (this.searchQuery1 && !this.searchQuery) {
    //     // Le champ nom est renseigné et le champ IPP est vide
    //     this.anotherParamSearch = this.searchQuery1;
    //   } else {
    //     // Aucun des champs n'est renseigné, utilisez une valeur par défaut (par exemple, une chaîne vide)
    //     this.anotherParamSearch = "";
    //     this.totalActe = 0;
    //     this.patientsMove = [];
    //   }

    //   const input = document.getElementById("exampleInputEmail1");
    //   const errorMessage = document.querySelector(
    //     ".form-group #exampleInputEmail1 + .error-message"
    //   );

    //   if (!input.checkValidity()) {
    //     errorMessage.style.display = "block";
    //     return;
    //   } else {
    //     errorMessage.style.display = "none";
    //   }

    //   // Nom prénom
    //   const inputname = document.getElementById("exampleInputName");
    //   const errorMessageName = document.querySelector(
    //     ".form-group #exampleInputName + .error-message"
    //   );

    //   if (this.searchQuery1.trim() == "") {
    //     errorMessageName.style.display = "none"; // Champ vide, le message d'erreur est masqué
    //   } else if (
    //     this.searchQuery1.length > 100 ||
    //     !/^[a-zA-ZÀ-ÿ\s]{2,}$/.test(this.searchQuery1)
    //   ) {
    //     errorMessageName.style.display = "block"; // Erreur détectée
    //   } else {
    //     errorMessageName.style.display = "none"; // La saisie est valide, le message d'erreur est masqué
    //   }

    //   // Effectuez d'abord la recherche en utilisant this.anotherParamSearch (IPP en priorité)
    //   factureService
    //     .getPatientInfo(this.anotherParamSearch)
    //     .then((res) => {
    //       this.patient = res.data.data;
    //       this.patientsMove = res.data.data;
    //       // console.log("Voici le patient qui correspond au mouvement :");
    //       // console.log(this.patientsMove);

    //       // Effectuez la recherche d'actes médicaux

    //       factureService
    //         .getActMovment(this.anotherParamSearch)
    //         .then((res) => {
    //           this.listactes = res.data.data;
    //           // console.log("Voici les actes médicaux correspondants à la saisie :");
    //           // console.log(this.listactes);
    //           this.calculateTotalAmount();
    //         })
    //         .catch((error) => {
    //           console.error(
    //             "Une erreur s'est produite lors de la recherche d'actes médicaux : " +
    //               error
    //           );
    //         });
    //     })
    //     .catch((error) => {
    //       console.error(
    //         "Une erreur s'est produite lors de la recherche du patient (IPP) : " + error
    //       );

    //       // Si aucune donnée n'a été trouvée avec IPP, testez ensuite avec le nom pour le patient
    //       if (this.searchQuery1) {
    //         factureService
    //           .getPatientInfo(this.searchQuery1)
    //           .then((res) => {
    //             this.patientsMove = res.data.data;
    //             console.log("Voici le patient qui correspond au mouvement :");
    //             console.log(res.data.data);

    //             // Effectuez la recherche d'actes médicaux si le patient est trouvé par le nom
    //             factureService
    //               .getActMovment(this.searchQuery1)
    //               .then((res) => {
    //                 this.listactes = res.data.data;
    //                 console.log("Voici les actes médicaux correspondants à la saisie :");
    //                 console.log(this.listactes);
    //               })
    //               .catch((error) => {
    //                 console.error(
    //                   "Une erreur s'est produite lors de la recherche d'actes médicaux : " +
    //                     error
    //                 );
    //               });
    //           })
    //           .catch((error) => {
    //             console.error(
    //               "Une erreur s'est produite lors de la recherche du patient (nom) : " +
    //                 error
    //             );
    //           });
    //       } else {
    //         // Aucun patient n'a été trouvé par le nom non plus
    //         this.listactes = [];
    //       }
    //     });
    // },

    // searchMedicalActs() {

    //   this.anotherParamSearch = this.searchQuery1 && this.searchQuery ? `${this.searchQuery1} ${this.searchQuery}` : this.searchQuery1 || this.searchQuery;

    //   if (this.searchQuery) {

    //     factureService
    //       .getPatientInfo(this.searchQuery)
    //       .then((res) => {
    //         this.patient = res.data.data;
    //         console.log("Voici le patient qui correspond au movement :");

    //         console.log(res.data.data);
    //       })
    //       .catch((error) => {
    //         console.error(
    //           "Une erreur s'est produite lors de la recherche du patient : " + error
    //         );

    //       });

    //     factureService
    //       .getActMovment(this.searchQuery)
    //       .then((res) => {
    //         this.actesMedicals = res.data.data;
    //         console.log("Voici les actes médicaux correspondants à la saisie :");
    //         console.log(this.actesMedicals);
    //       })
    //       .catch((error) => {
    //         console.error(
    //           "Une erreur s'est produite lors de la recherche d'actes médicaux : " + error
    //         );
    //       });
    //   } else {
    //     this.actesMedicals = [];
    //   }
    // },

    // fetchActesMedicals() {
    //   // actsService
    //   //   .getAllActes()
    //   //   .then((res) => {
    //   //     this.actesMedicals = res.data.data;
    //   //   })
    //   factureService
    //     .getActMovment(this.searchQuery)
    //     .then((res) => {
    //       this.actesMedicals = res.data.data;
    //       console.log("voici mes actes venue");
    //       console.log("voici mes actes venue");
    //       console.log("voici mes actes venue");
    //       console.log(this.actesMedicals);
    //     })

    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },

    getLotsByProduct(uuid, formIndex) {
      console.log("uuid", uuid);

      // Réinitialiser les champs
      this.$set(this.forms[formIndex], "lot_id", "");
      this.$set(this.forms[formIndex], "code", "");
      this.$set(this.forms[formIndex], "expire_date", "");
      this.$set(this.forms[formIndex], "sell_price", "");
      this.$set(this.forms[formIndex], "available_qte", "");
      this.$set(this.forms[formIndex], "order_qte", "");
      this.$set(this.forms[formIndex], "amount_product", "");

      // Réinitialiser la liste des lots
      this.$set(this.lotList, formIndex, []);

      // Vérifier si le produit a un UUID
      if (uuid) {
        factureService
          .getLotProductByUUID(uuid)
          .then((response) => {
            // Utiliser la propriété réactive directement
            this.$set(this.lotList, formIndex, response.data.data);
            console.log("Liste des lots mise à jour :", this.lotList[formIndex]);

            const selectedProduct = this.productList.find((item) => item.uuid === uuid);

            if (selectedProduct) {
              // Définir la quantité commandée dans le champ order_qte
              this.$set(
                this.forms[formIndex],
                "order_qte",
                selectedProduct.medical_acts_qte
              );

              // Calculer automatiquement le montant
              const orderQty = parseFloat(selectedProduct.order_qte) || 0;
              const sellPrice = parseFloat(this.forms[formIndex].sell_price) || 0;

              // Effectuer le calcul du montant
              const amount = orderQty * sellPrice;

              // Mettre à jour le champ de montant
              this.$set(this.forms[formIndex], "amount_product", amount.toFixed(2));
              this.updateTotalAmountP();
            }
            this.$set(this.forms[formIndex], "lot_id", ""); // pour mettre le select lot par défaut à vide.
          })

          .catch((error) => {
            this.$toast.error("Aucun lot disponible pour le produit  !", {
              position: "top-right",
              timeout: 3000,
              style: {
                background: "#ff0000", // Couleur de fond rouge pour l'erreur
                color: "#fff", // Couleur du texte
                fontWeight: "bold",
              },
            });
            console.error("Erreur lors de la récupération des lots :", error);
          });
      } else {
        // Si le produit n'a pas d'UUID, réinitialiser le champ lot_id à vide
        this.$set(this.forms[formIndex], "lot_id", "");

        this.updateTotalAmountP();
      }
    },

    onLotSelected(lotIndex) {
      const selectedLotId = this.forms[lotIndex].lot_id;

      // Réinitialiser les champs si l'option "Sélectionner" est choisie

      if (!selectedLotId) {
        this.$set(this.forms[lotIndex], "code", "");
        this.$set(this.forms[lotIndex], "expire_date", "");
        this.$set(this.forms[lotIndex], "sell_price", "");
        this.$set(this.forms[lotIndex], "available_qte", "");
        this.$set(this.forms[lotIndex], "order_qte", "");
        this.$set(this.forms[lotIndex], "amount_product", "");
        this.updateTotalAmountP();
      } else {
        const selectedLot = this.lotList[lotIndex].find(
          (lot) => lot.uuid === selectedLotId
        );

        if (selectedLot) {
          this.$set(this.forms[lotIndex], "code", selectedLot.code);
          this.$set(this.forms[lotIndex], "expire_date", selectedLot.expire_date);
          this.$set(this.forms[lotIndex], "sell_price", selectedLot.selling_price);
          this.$set(this.forms[lotIndex], "available_qte", selectedLot.quantity);

          const orderQty = parseFloat(this.forms[lotIndex].order_qte) || 0;
          const sellPrice = parseFloat(this.forms[lotIndex].sell_price) || 0;

          // Effectuer le calcul du montant
          const amount = orderQty * sellPrice;

          // Mettre à jour le champ de montant
          this.$set(this.forms[lotIndex], "amount_product", amount.toFixed(2));

          // Appeler la méthode pour mettre à jour le montant total
          this.updateTotalAmountP();
        } else {
          console.error("Lot sélectionné non trouvé");
        }
      }
    },

    updateAmountP(formIndex) {
      const orderQty = parseFloat(this.forms[formIndex].order_qte) || 0;
      const sellPrice = parseFloat(this.forms[formIndex].sell_price) || 0;

      const maxAvailableQuantity = parseFloat(this.forms[formIndex].available_qte) || 0;

      let amount;
      if (orderQty > maxAvailableQuantity) {
        // Supprimez automatiquement la quantité commandée si elle est excessive
        amount = maxAvailableQuantity * sellPrice;

        this.$set(this.forms[formIndex], "order_qte", maxAvailableQuantity);
      } else {
        amount = orderQty * sellPrice;
      }

      this.$set(this.forms[formIndex], "amount_product", amount.toFixed(2));

      this.updateTotalAmountP();
    },

    updateTotalAmountP() {
      // Utilisez la fonction reduce pour calculer la somme des montants
      const totalAmount = this.forms.reduce((total, form) => {
        const amount = parseFloat(form.amount_product);
        return !isNaN(amount) ? total + amount : total;
      }, 0);

      // Mettez à jour la variable qui stocke le montant total
      this.totalAmountP = totalAmount;
      if (this.productList && this.productList.length > 0) {
        this.prisenchargePourcentageP = this.productList[0].percentage_patient_insurance;
        this.montantPrisenchargePourcentageP = parseFloat(
          (this.prisenchargePourcentageP * this.totalAmountP) / 100
        );
      }
    },

    getDesignationProduct(uuid) {
      const product = this.productList.find((item) => item.uuid == uuid);
      return product ? product.designation : "";
    },

    // updateLots(productUUID, formIndex) {
    //   this.getLotsByProduct(productUUID, formIndex);
    //   console.log("productList[formIndex]:", this.productList[formIndex]);

    // },

    // updateMontantActe(index) {
    //   const form = this.forms[index];
    //   form.amount_product = form.quantite * form.prix;

    //   if (this.actesSelectionnes[index]) {

    //     this.actesSelectionnes[index].quantite = form.quantite;
    //     this.actesSelectionnes[index].montant = form.quantite * form.prix;
    //     console.log( this.forms[index], );

    //     const acteMedical = this.actesMedicals.find(acte => acte.id === form.acte);
    //     if (acteMedical) {
    //       this.actesSelectionnes[index].nom = acteMedical.designation;
    //       this.actesSelectionnes[index].prix = Math.round(acteMedical.price);
    //     } else {

    //     }

    //   } else {

    //     const acteMedical = this.actesMedicals.find(acte => acte.id === form.acte);
    //     if (acteMedical) {
    //       this.actesSelectionnes.push({
    //         code: form.code,
    //         nom: acteMedical.designation,
    //         prix: Math.round(acteMedical.price),
    //         quantite: form.quantite,
    //         montant: form.quantite * form.prix,
    //         // Ajoutez d'autres propriétés si nécessaire
    //       });
    //     } else {

    //     }

    //   }

    //   this.calculateTotalMontantActe();
    //   this.calculateTotalMontant();
    // },

    addForm() {
      // Créer un nouvel objet formulaire avec des valeurs par défaut
      const newForm = {
        product_uuid: "",
        lot_id: "",
        code: "",
        expire_date: "",
        order_qte: "", // Valeur par défaut, vous pouvez ajuster selon vos besoins
        available_qte: "", // Valeur par défaut
        sell_price: "", // Valeur par défaut
        amount_product: "", // Valeur par défaut
      };

      // Ajouter le nouveau formulaire à votre tableau de formulaires
      this.forms.push(newForm);
    },

    removeForm(index) {
      if (this.forms[index].order_qte === this.forms[index].available_qte) {
        this.$set(this.forms[index], "order_qte", 0);
        this.$set(this.forms[index], "amount_product", 0);
      }

      this.forms.splice(index, 1);

      this.indexSpinnerFacturer = false;

      if (this.forms.length == 0) {
        this.montantPrisenchargePourcentageP = 0;
        this.updateTotalAmountP();
        this.productList = [];
      }

      if (this.forms.length == 0 && this.medicalActDetailsFactureA.length == 0) {
        console.log("this.medicalActDetailsFactureA.length");
        console.log(this.medicalActDetailsFactureA.length);
        this.selectedRow = -1;
      }

      this.updateTotalAmountP();
    },

    calculateAmount(orderQty, sellPrice) {
      // Effectuez le calcul du montant
      return (orderQty * sellPrice).toFixed(2);
    },

    initializeDataTableRapport() {
      this.$nextTick(() => {
        const table = $(this.$refs.myTablerapport).DataTable({
          // Configuration de la table DataTable
          dom:
            '<"row mb-3"<"col-md-12"B>>' +
            '<"row mb-0"<"col-md-6"l><"col-md-6"f>>' +
            '<"row"<"col-md-12"tr>>' +
            '<"row"<"col-md-6"i><"col-md-6"p>>',
          pageLength: 10, // Définir le nombre de résultats par page
          language: FrenchTranslation, // Configuration de la langue
          buttons: [
            // Configuration des boutons (si nécessaire)
          ],
        });

        // Stockez la nouvelle instance de la table dans la variable "this.table" pour une utilisation ultérieure
        this.tableInsurance = table;

        if (table) {
          $(table).DataTable().clear().destroy(); // Détruire DataTables s'il est déjà initialisé
          $(table).DataTable(); // Réinitialiser DataTables
        }
      });
    },

    getPostPdf() {
      factureService
        .getPostPdf()
        .then((response) => {
          const blob = new Blob([response.data], { type: "application/pdf" });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "facture.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    createFacture() {
      this.indexSpinnerFacturer = true;
      let facturesA = [];
      let facturesP = [];
      console.log(this.medicalActDetailsFacture);

      facturesA =
        this.medicalActDetailsFactureA.length > 0
          ? this.medicalActDetailsFactureA.map((acte) => ({
              cash_registers_id: null,
              movments_id: acte.movments_id,
              mode_payements_id: this.selectedOptionMode,
              is_synced: 0,
              acte_medical_id: acte.medical_acts_uuid,
              lots_uuid: null,
              user_id: null,
              centre_id: null,
              code: acte.code,
              designation: acte.designation,
              type: acte.type,
              partial_amount: null,
              prix: parseInt(acte.medical_acts_price),
              quantite: acte.medical_acts_qte,
              amount: acte.medical_acts_qte * parseInt(acte.medical_acts_price),
              percentageassurance: parseInt(this.prisenchargePourcentageA),
            }))
          : [];

      facturesP =
        this.productList.length > 0
          ? this.forms.map((form) => ({
              cash_registers_id: null,
              movments_id: this.movmentId,
              mode_payements_id: this.selectedOptionMode,
              is_synced: 0,
              acte_medical_id: form.product_uuid,
              lots_uuid: form.lot_id,
              user_id: null,
              centre_id: null,
              code: form.code,
              designation: this.getDesignationProduct(form.product_uuid),
              type: "P",
              partial_amount: null,
              prix: form.sell_price || 0,
              quantite: form.order_qte || 0,
              amount: form.amount_product,
              percentageassurance: parseInt(this.prisenchargePourcentageP),
            }))
          : [];

      console.log("facturesP");
      console.log(facturesP);

      factureService
        .requestFacture({ factures: [...facturesA, ...facturesP] })
        .then((response) => {
          this.indexSpinnerFacturer = false;
          // Traitement de la réponse
          console.log("response.data");
          console.log(response.data);
          console.log("dataResponseFactureA");

          // console.log("facturesdata");
          const facturesTypeA = response.data.data_type_a;
          console.log(facturesTypeA);
          const facturesTypeP = response.data.data_type_p;
          console.log("dataResponseFactureP");
          console.log(facturesTypeP);
          const referenceTypeA = response.data.reference_type_a;
          console.log("referenceFactureA");
          console.log(referenceTypeA);
          const referenceTypeP = response.data.reference_type_p;
          console.log("referenceFactureP");
          console.log(referenceTypeP);

          this.signataires_data = response.data.signataires_data;
          console.log("response.data.signataires_data");
          console.log(response.data.signataires_data);
          this.statutCashier = response.data.statutCash;
          console.log(this.statutCashier);

          // this.generateQRCodeA(this.referenceTypeA);
          this.selectedRow = -1;
          this.medicalActDetailsFacture = [];
          this.productList = [];
          this.forms = [];

          // this.validateData();
          // window.open(response.data.pdf_url, '_blank');
          this.$toast.success("Facture(s) générée(s) avec succès", {
            position: POSITION.TOP_RIGHT,
            timeout: 2000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });

          if (facturesTypeA.length > 0) {
            // Générer et ouvrir la facture de prestation
            this.generateAndOpenPDFA(facturesTypeA);
          }

          if (facturesTypeP.length > 0) {
            // Générer et ouvrir la facture de médicaments
            this.generateAndOpenPDFP(facturesTypeP);

          }
        })
        .catch((error) => {
          this.indexSpinnerFacturer = false;

          console.log(error);
        });
    },

    totalAmountActesA() {
      const montantBrut = this.filteredMedicalActDetailsA.reduce((total, item) => {
        return total + item.medical_acts_qte * item.medical_acts_price;
      }, 0);

      return montantBrut;
    },

    totalAmountActesP() {
      const montantBrut = this.filteredMedicalActDetailsP.reduce((total, item) => {
        return total + item.medical_acts_qte * item.medical_acts_price;
      }, 0);

      return montantBrut;
    },
    validerEspece(payementId) {
      const credentials = {
        mode_payements_id: this.selectedOptionMode,
        payement_id: payementId,
        montant: this.momoDataEspece.montant,
      };

      especeService
        .requestEspece(credentials, payementId)
        .then((response) => {
          const montant = response.data.data.montant;
          console.log(montant);
        })

        .catch((error) => {
          console.error(error);
        });
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
              '<link rel="stylesheet" href="../../../../node_modules/bootstrapcss-vue/dist/bootstrap-vue.">'
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

    //     html2pdf()
    //       .from(modalContent)
    //       .set(pdfOptions)
    //       .outputPdf(pdf => {
    //         pdf.output('datauristring'); // Pour afficher le PDF dans un nouvel onglet
    //       });
    // },
  },

  computed: {
    // ...
    filteredMedicalActDetailsA() {
      // this.productList = this.medicalActDetailsFacture.filter((item) => item.type == "P");
      return this.medicalActDetailsFacture.filter((item) => item.type === "A");
    },

    filteredMedicalActDetailsP() {
      console.log("this.filteredMedicalActDetailsP");
      console.log(this.medicalActDetailsFacture.filter((item) => item.type === "P"));
      return this.medicalActDetailsFacture.filter((item) => item.type === "P");
    },

    // totalAmountActesB() {
    //   return this.filteredMedicalActDetailsP.reduce((total, item) => {
    //     return total + item.medical_acts_qte * item.medical_acts_price;
    //   }, 0);
    // },
  },

  filters: {
    formatDate(value) {
      return format(value, "dd/MM/yyyy HH:mm:ss");
    },
  },

  watch: {
    searchTerm: function (newSearchTerm, oldSearchTerm) {
      // Si le champ de recherche est vide, appelez getListAndSearchMovments
      if (newSearchTerm === "") {
        this.getListAndSearchMovments();
      }
    },
  },

  mounted() {
   
    // this.getCashRegisterCashierCurrent(); // la caisse de l'utilisateur actuellement connecté

    this.getListAndSearchMovments();
    this.getListMovment();

    // this.fetchActesMedicals();

    this.fetchPatients();
    // this.fetchModePayements();
  },
};
</script>

<style scoped>
@import "../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
@import "../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";

.col-sm-6 p {
  margin-top: 0;
  /* Supprime la marge supérieure des paragraphes */
  margin-bottom: 2px !important;
  /* Réduit la marge inférieure des paragraphes */
}

.custom-width {
  width: 200px !important;
  /* Ajustez la largeur selon vos besoins */
}

.custom-margin-bottom {
  margin-bottom: -30px !important;
  /* Ajustez la valeur de la marge inférieure selon vos besoins */
}

.custom-padding {
  padding: 5px !important;
  /* Ajustez la valeur du padding selon vos besoins */
}

/* .custom-border-height {
  border: 1px solid #000 !important;
} */

.search-bar {
  display: flex;
  background-color: #fff;
  /* Couleur de fond de la barre de recherche */
  padding: 10px;
  /* Espacement interne */
  border: 1px solid #ccc;
  /* Bordure */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* Effet d'ombre */
  border-radius: 6px !important;
  align-items: center;
  /* Alignement vertical au centre */
  height: 50px !important;
  /* Hauteur réduite */
}

.search-bar {
  display: flex;
  background-color: #fff;
  /* Couleur de fond de la barre de recherche */
  padding: 10px;
  /* Espacement interne */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* Effet d'ombre */
  border-radius: 5px;
  /* Coins arrondis */
  align-items: center;
  /* Alignement vertical au centre */
}

.zebra-table tbody tr:nth-child(odd) {
  background-color: white;
}

.nav-link.active.custom-tab {
  background-color: #606162;
  /* Couleur de fond sombre */
  color: #fff !important;
  /* Couleur du texte en surbrillance */
}

/* Style pour les onglets inactifs */
.nav-link.custom-tab {
  background-color: #717d78 !important;
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

.search-bar input {
  flex: 1 !important;
  /* Largeur flexible */
  outline: none !important;
  font-size: 16px !important;
  height: 40px !important;
  /* Hauteur ajustée pour correspondre à la hauteur du bouton */
  border: none !important;
  /* Supprimer la bordure */
}

.search-bar button {
  background-color: #0b5d3f;
  /* Couleur verte */
  color: #fff;
  border: none !important;
  padding: 0 !important;
  /* Pas de padding sur le bouton */
  width: 40px !important;
  /* Largeur ajustée pour correspondre à la hauteur du champ de recherche */
  height: 40px !important;
  /* Hauteur ajustée pour correspondre à la hauteur du champ de recherche */
  border-radius: 0 5px 5px 0 !important;
  /* Coins arrondis à gauche */
  cursor: pointer !important;
  transition: background-color 0.3s;
}

.customize-row {
  margin-left: 0px;
  margin-right: 0px;
}

.customize-row .col-md-2,
.customize-row .col-md-1,
.customize-row .col-md-3 {
  padding-right: 4px;
  padding-left: 4px;
}

.customize-row button {
  font-size: 10px;
}

.search-bar button:hover {
  background-color: #5c695d;
  /* Couleur verte plus foncée au survol */
}

.patient-info {
  margin-right: 20px !important;
  font-weight: 500 !important;
  font-family: "Montserrat" !important;
  /* Ajustez la marge selon vos besoins */
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

table th,
td {
  text-align: left;
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
  text-align: left;
}

th {
  background-color: #d6dbd6;
  border: 1px solid #dee2e6;
  font-family: Montserrat !important;
}

.container-fluid {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
}

h2,
h4 {
  font-weight: bold;
  margin: 0;
  font-family: Montserrat !important;
}

.mb-4 {
  margin-bottom: 2rem;
}

img {
  max-width: 100%;
}

.selected {
  color: white !important;
  background-color: hsl(159, 38%, 25%);
  /* Couleur de fond rouge pour la ligne sélectionnée */
  cursor: pointer;
  /* Curseur pointeur */
}

.row-hover:hover {
  cursor: pointer !important;
  background-color: hsl(159, 38%, 25%);
  color: white !important;

  /* Curseur pointeur au survol des lignes du tableau */
}

.row-hover:hover td {
  cursor: pointer !important;
  background-color: hsl(159, 38%, 25%);
  color: white !important;
}

.selected td {
  background-color: hsl(159, 38%, 25%);
  color: white !important;
}

table {
  margin-bottom: 1rem;
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  font-family: Montserrat !important;
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
  padding: 0.4rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
  font-family: "Montserrat" !important;
}

table thead,
table th {
  padding: 0.4rem !important;
}

table td {
  font-weight: 500 !important;
}

table th {
  font-weight: bold;
  font-family: "Montserrat" !important;
}

table tbody+tbody {
  border-top: 2px solid #e4eaea;
}

.table-bordered {
  border: 1px solid #b6b9bb;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #b6b9bb;
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

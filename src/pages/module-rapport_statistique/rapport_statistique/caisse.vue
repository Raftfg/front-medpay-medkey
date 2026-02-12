<template>
   <div>
      <h3 class="card-title text-white rounded p-1 mb-5 text-center"
         style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
         Rapport journalier de caisse
      </h3>
      <div class="mt-3">
         <div class="card grid-margin">
            <div class="card-body">


               <div class="row ">
                  <div class="form-group col-lg-5 col-md-5 col-sm-12">
                     <label for="exampleFormControlSelect1">Caisses <span style="color: red">*</span></label>
                     <select v-model="selectedCasRegister" class="form-control" @change="updateCaisseDesignation">
                        <option value="">Sélectionner</option>
                        <option v-for="caisse in caisses" :key="caisse.id" :value="caisse.id">
                           {{ caisse.designation }}
                        </option>
                     </select>
                     <div v-if="errorMessageCasRegister && !selectedCasRegister" class="text-danger"
                        style="font-size: 11;">
                        Ce champs est requis.
                     </div>
                  </div>
                  <div class="col-lg-5 col-md-5 col-sm-12 form-group" style="font-size: 11;">
                     <label for="exampleFormControlInput1">Date <span style="color: red">*</span></label>
                     <input type="date" class="form-control" v-model="selectedDate" />
                     <div v-if="errorMessageDate && !selectedDate" class="text-danger">
                        Ce champs est requis.
                     </div>
                  </div>
                  <div class="col-lg-2 col-md-2 col-sm-12 pl-3 mt-4">
                     <button @click="generatePDF" class="btn btn-success btn-medpay-green"
                        style="width: 120px !important; font-size: 13px !important;">
                        Générer
                     </button>
                  </div>
               </div>

               <div v-if="indexSpinner" class="spinner-border spinner-border-sm text-secocndary" style="font-size: 11px"
                  role="status">
                  <span class="sr-only">Loading...</span>
               </div>

            </div>
         </div>

      </div>


      <h3 class="card-title text-white rounded p-1 mb-5 text-center"
         style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
         Rapport journalier par caissier
      </h3>
      <div class="mt-3">
         <div class="card grid-margin">
            <div class="card-body">

               <div class="row ">
                  <div class="form-group col-lg-4 col-md-4 col-sm-12">
                     <label for="exampleFormControlSelect1">Caisses <span style="color: red">*</span></label>
                     <select v-model="selectedCashRegister1" class="form-control" @change="updateCaisseDesignation1">
                        <option value="">Sélectionner</option>
                        <option v-for="caisse in caisses" :key="caisse.id" :value="caisse.id">
                           {{ caisse.designation }}
                        </option>
                     </select>
                     <div v-if="errors.cash_registers_id && !selectedCashRegister1" class="text-danger"
                        style="font-size: 11;">
                        Ce champs est requis.
                     </div>
                  </div>
                  <div class="form-group col-lg-4 col-md-4 col-sm-12">
                     <label for="exampleFormControlSelect1">Caissiers <span style="color: red">*</span></label>
                     <select v-model="selectedCashier" class="form-control" @change="updateSelectedCashier">
                        <option value="">Sélectionner</option>
                        <option v-for="caissier in caissiers" :key="caissier.id" :value="caissier.id">
                           {{ caissier.name }} {{ caissier.prenom }}
                        </option>
                     </select>
                     <div v-if="errors.user_id && !selectedCashier" class="text-danger" style="font-size: 11;">
                        Ce champs est requis.
                     </div>
                  </div>
                  <div class="col-lg-2 col-md-2 col-sm-12 form-group" style="font-size: 11;">
                     <label for="exampleFormControlInput1">Date <span style="color: red">*</span></label>
                     <input type="date" class="form-control" v-model="selectedDateRC" />
                     <div v-if="errors.date && !selectedDateRC" class="text-danger">
                        Ce champs est requis.
                     </div>
                  </div>
                  <div class="col-lg-2 col-md-2 col-sm-12 pl-3 mt-4">
                     <button @click="generateRCashier" class="btn btn-success btn-medpay-green"
                        style="width: 120px !important; font-size: 13px !important;">
                        Générer
                     </button>
                  </div>
               </div>

               <div v-if="indexSpinnerRCashier" class="spinner-border spinner-border-sm text-secocndary"
                  style="font-size: 11px" role="status">
                  <span class="sr-only">Loading...</span>
               </div>


            </div>
         </div>

      </div>


      <h3 class="card-title text-white rounded p-1 mb-5 text-center"
         style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
         Rapport périodique des factures
      </h3>
      <div class="mt-3">
         <div class="card grid-margin">
            <div class="card-body">

               <div class="row ">
                  <div class="form-group col-lg-3 col-md-12 col-sm-12">
                     <label for="exampleFormControlSelect1">Caisses <span style="color: red">*</span></label>
                     <select v-model="rpCachRegister" class="form-control" @change="updateCaisseDesignationRP">
                        <option value="">Sélectionner</option>
                        <option v-for="caisse in caisses" :key="caisse.id" :value="caisse.id">
                           {{ caisse.designation }}
                        </option>
                     </select>
                     <div v-if="formErrors.cash_registers_id && !rpCachRegister" class="text-danger"
                        style="font-size: 11;">
                        Ce champs est requis.
                     </div>
                  </div>

                  <div class="col-lg-3 col-md-12 col-sm-12 form-group" style="font-size: 11;">
                     <label for="exampleFormControlInput1">Date de début <span style="color: red">*</span></label>
                     <input type="date" class="form-control" v-model="rpStartDate" />
                     <div v-if="formErrors.start_date && !rpStartDate" class="text-danger">
                        Ce champs est requis.
                     </div>
                  </div>
                  <div class="col-lg-2 col-md-12 col-sm-12 form-group" style="font-size: 11;">
                     <label for="exampleFormControlInput1">Date de fin <span style="color: red">*</span></label>
                     <input type="date" class="form-control" v-model="rpEndDate" />
                     <div v-if="formErrors.end_date && !rpEndDate" class="text-danger">
                        Ce champs est requis.
                     </div>
                  </div>
                  <div class="form-group col-lg-2 col-md-12 col-sm-12">
                     <label for="exampleFormControlSelect1">Statut </label>
                     <select v-model="rpStatut" class="form-control">
                        <option value="">Sélectionner</option>
                        <option value="1">Payée</option>
                        <option value="0">Impayé</option>
                     </select>

                  </div>

                  <div class="col-lg-2 col-md-2 col-sm-12 pl-3 mt-4">
                     <button @click="generateReportPBills" class="btn btn-success btn-medpay-green"
                        style="width: 120px !important; font-size: 13px !important;">
                        Générer
                     </button>
                  </div>
               </div>

               <div v-if="spinnerRP" class="spinner-border spinner-border-sm text-secocndary" style="font-size: 11px"
                  role="status">
                  <span class="sr-only">Loading...</span>
               </div>
            </div>
         </div>
      </div>


      <!-- <h3 class="card-title text-white rounded p-1 mb-5 text-center"
         style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
         Rapport des factures partiellement payé
      </h3>
      <div class="mt-3">
         <div class="card grid-margin">
            <div class="card-body">

               <div class="row ">
                  <div class="form-group col-lg-4 col-md-4 col-sm-12">
                     <label for="exampleFormControlSelect1">Caisses <span style="color: red">*</span></label>
                     <select v-model="selectedCashRegister1" class="form-control" @change="updateCaisseDesignation1">
                        <option value="">Sélectionner</option>
                        <option v-for="caisse in caisses" :key="caisse.id" :value="caisse.id">
                           {{ caisse.designation }}
                        </option>
                     </select>
                     <div v-if="errors.cash_registers_id && !selectedCashRegister1" class="text-danger"
                        style="font-size: 11;">
                        Ce champs est requis.
                     </div>
                  </div>
                  <div class="col-lg-2 col-md-2 col-sm-12 form-group" style="font-size: 11;">
                     <label for="exampleFormControlInput1">Date <span style="color: red">*</span></label>
                     <input type="date" class="form-control" v-model="selectedDateRC" />
                     <div v-if="errors.date && !selectedDateRC" class="text-danger">
                        Ce champs est requis.
                     </div>
                  </div>
                  <div class="col-lg-2 col-md-2 col-sm-12 form-group" style="font-size: 11;">
                     <label for="exampleFormControlInput1">Date <span style="color: red">*</span></label>
                     <input type="date" class="form-control" v-model="selectedDateRC" />
                     <div v-if="errors.date && !selectedDateRC" class="text-danger">
                        Ce champs est requis.
                     </div>
                  </div>
                  <div class="col-lg-2 col-md-2 col-sm-12 pl-3 mt-4">
                     <button @click="generateRCashier" class="btn btn-success btn-medpay-green"
                        style="width: 120px !important; font-size: 13px !important;">
                        Générer
                     </button>
                  </div>
               </div>

               <div v-if="indexSpinnerRCashier" class="spinner-border spinner-border-sm text-secocndary"
                  style="font-size: 11px" role="status">
                  <span class="sr-only">Loading...</span>
               </div>

            </div>
         </div>

      </div> -->


   </div>
</template>
<script>

import { caisseService } from "@/_services";
import $ from "jquery";
import "../../../../node_modules/bootstrap/dist/js/bootstrap.js";
import "../../../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { rapport_statistiqueService } from "@/_services/rapport_statistique_services.js";

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { ToWords } from 'to-words';

export default {

   name: "caisseStat",

   data() {
      return {
         caisses: [],
         caissiers: [],
         reportCashierDaily: [],
         reportCashRegister: [],
         reportPeriodStatus: [],
         selectedCasRegister: "",
         selectedCashRCDesignation: "",
         selectedCashier: "",
         selectedCashRegister1: "",
         rpCachRegister: "",
         rpCachRegisterDesignation: "",
         typeCaisse: "",
         indexSpinner: false,
         indexSpinnerRCashier: false,
         selectedDate: "",
         nomCaissier: "",
         rpEndDate: "",
         rpStartDate: "",
         rpStatut: "",
         spinnerRP: false,
         selectedDateRC: "",
         caisseDesignation: "",
         errors: {},
         formErrors: {},
         errorMessageCasRegister: false,
         errorMessageDate: false,
         report: [
            { reference: 'A001', prix: 10, qte: 5, montant: 50 },
            { reference: 'B002', prix: 15, qte: 3, montant: 45 },
            // ... vos données
         ],
         tableStyle: {
            fillColorHeader: [44, 65, 86],
            textColorHeader: [255, 255, 255],
         },

      };

   },

   mounted() {

      caisseService
         .getCashiers()
         .then((response) => {
            this.caissiers = response.data;
         })
         .catch((error) => {
            console.log(error);
         });

      caisseService
         .getAllCaisse()
         .then((response) => {
            this.caisses = response.data.data;
            console.log("Résultat des caisses  :");
            console.log(response.data.data)
         })
         .catch((error) => {
            console.log(error);
         });
   },

   methods: {

      updateCaisseDesignation() {
         const selectedCaisse = this.caisses.find((caisse) => caisse.id === this.selectedCasRegister);
         if (selectedCaisse) {
            this.caisseDesignation = selectedCaisse.designation;
            this.typeCaisse = selectedCaisse.type;
            console.log("this.typeCaisse")
            console.log(this.typeCaisse)
         } else {
            this.caisseDesignation = '';
            this.selectedCashRCDesignation = '';
         }
      },

      updateCaisseDesignation1() {
         const selectedCaisse = this.caisses.find((caisse) => caisse.id === this.selectedCashRegister1);
         if (selectedCaisse) {
            this.selectedCashRCDesignation = selectedCaisse.designation;
            this.typeCaisse = selectedCaisse.type;
            console.log("this.selectedCashRCDesignation")
            console.log(this.selectedCashRCDesignation)
         } else {
            this.selectedCashRCDesignation = '';
         }
      },

      updateCaisseDesignationRP() {

         const selectedCaisse = this.caisses.find((caisse) => caisse.id == this.rpCachRegister);
         if (selectedCaisse) {
            this.rpCachRegisterDesignation = selectedCaisse.designation;
            this.typeCaisse = selectedCaisse.type;
            console.log("this.rpCachRegisterDesignation")
            console.log(this.rpCachRegisterDesignation)
         } else {
            this.rpCachRegisterDesignation = '';
         }
      },


      updateSelectedCashier() {

         const selectedCaissier = this.caissiers.find((caissier) => caissier.id == this.selectedCashier);
         if (selectedCaissier) {
            this.nomCaissier = selectedCaissier.name + " " + selectedCaissier.prenom

         } else {
            this.nomCaissier = '';
         }
      },

      formatNumberDecimal(number) {

         if (!isNaN(number) && number !== null && number !== undefined) {
            const numericValue = parseFloat(number);
            const formattedNumber = numericValue.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

            return formattedNumber.replace(',', '.');
         } else {
            return '';  // ou tout autre valeur par défaut que vous préférez
         }

      },


      formatNumber(value) {
         if (typeof value !== "number") {
            return value;
         }

         return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      },



      generateReportPBills() {

         // Create a new jsPDF instance

         this.spinnerRP = true;

         const pdfDoc = new jsPDF();

         const titleTextHeight = pdfDoc.getTextDimensions('Rapport périodique de caisse').h;

         pdfDoc.setFillColor(44, 65, 86); // RGB color
         const backgroundHeight = titleTextHeight + 5; // Adjust as needed
         pdfDoc.rect(0, 10, pdfDoc.internal.pageSize.width, backgroundHeight, 'F');

         // Add title to the PDF with underline and bold
         pdfDoc.setTextColor(255, 255, 255); // White text color
         pdfDoc.setFont('Helvetica', 'bold');
         const titleX = pdfDoc.internal.pageSize.width / 2;
         const titleY = 15 + (backgroundHeight - titleTextHeight) / 2; // Center vertically
         pdfDoc.textWithLink('Rapport périodique de caisse', titleX, titleY, { url: '', underline: true, fontSize: 16, align: 'center' });

         // Reset text color for the date
         pdfDoc.setTextColor(0, 0, 0); // Black text color

         // Section de date 
         const currentDate = new Date().toLocaleDateString();

         // Afficher "Date du jour :" à gauche
         pdfDoc.setFont('Helvetica', 'bold');
         const textX = 13;
         const textY = 35;
         const text = 'Date du jour :';
         pdfDoc.setFontSize(13);
         pdfDoc.text(text, textX, textY);

         // Get the width of the text
         const textWidth = pdfDoc.getTextWidth(text);
         const lineHeight = 1;
         pdfDoc.moveTo(textX, textY + lineHeight).lineTo(textX + textWidth, textY + lineHeight).stroke();
         const dateXLeft = 10 + textWidth + 5; // Ajouter un espacement entre le texte et la date
         pdfDoc.setFont('Helvetica', 'normal'); // Réinitialiser la police à la normale si elle était en gras ou soulignée
         pdfDoc.text(currentDate, dateXLeft, textY);

         // Afficher Designation de la caisse
         const caisseDesignation = this.rpCachRegisterDesignation || 'N/A';
         pdfDoc.setFont('Helvetica', 'bold');
         const designationXLeft = 13;
         const designationY = 45; // Ajuster la position y pour afficher en dessous de la date
         pdfDoc.setFontSize(13);
         pdfDoc.text("Caisse :", designationXLeft, designationY);

         // Get the width of the text
         const designationWidth = pdfDoc.getTextWidth("Caisse");
         const designationHeight = 1;
         pdfDoc.moveTo(designationXLeft, designationY + designationHeight).lineTo(designationXLeft + designationWidth, designationY + designationHeight).stroke();

         // Afficher la designation de la caisse
         const varDesignationXLeft = 14 + designationWidth + 5;
         pdfDoc.setFont('Helvetica', 'normal');
         pdfDoc.text(caisseDesignation, varDesignationXLeft, designationY);

         // Affichage de la table

         const formatDate = (date) => {
            return new Date(date).toLocaleDateString();
         };

         const formatModePaiement = (modePaiementId) => {
            switch (modePaiementId) {
               case 1: return 'ESPECE';
               case 2: return 'MTN MOBILE MONEY';
               case 3: return 'MOOV MONEY';
               case 4: return 'CELTIS';
               case 5: return 'CARTE BANCAIRE';
               case 6: return 'CARTE CREDIT';
               case 7: return 'TRESORPAY';
               case 8: return 'PAIEMENT A CREDIT';
               default: return '-';
            }
         };

         rapport_statistiqueService.getRreportbillsPeriod({

            cash_registers_id: this.rpCachRegister,
            start_date: this.rpStartDate,
            end_date: this.rpEndDate,
            status: this.rpStatut,

         }).then((res) => {

            this.spinnerRP = false;
            this.reportPeriodStatus = res.data.data;

            console.log("this.reportPeriodStatus", this.reportPeriodStatus);

            if (this.reportPeriodStatus.length == 0) {
               this.$toast.error("Aucune information trouvée!", {
                  position: "top-right",
                  timeout: 3000,
                  style: {
                     background: "#ff0000", // Couleur de fond rouge pour l'erreur
                     color: "#fff", // Couleur du texte
                     fontWeight: "bold",
                  },
               });

               return;

            } else {

               // this.spinnerReportCashierDaily = false;

               var data = this.reportPeriodStatus;

               /*****************************************************Premier tableau******************************************** */

               //Créez un tableau pour stocker les données du tableau
               let tableData = [];
               const totalTitles = [
                  'Total des factures payé',
                  'Total des factures impayé',
               ];
               const totalValues = [
                  res.data.montant_paye_total,
                  res.data.montant_impaye_total,
               ];

               // Now, you can use totalRow to display the total values in the specified order

               // totalTitles.forEach((title, index) => {
               //    tableData.push([
               //       title,
               //       this.NumberToLetter(totalValues[index]) + ' (' + totalValues[index] + ') FCFA' || "N/A",
               //    ]);
               // });

               totalTitles.forEach((title, index) => {
                  let dynamicValueTotal;

                  // Obtenez la valeur dynamique en fonction du typeCaisse
                  if (this.typeCaisse === 'A') {
                     dynamicValueTotal = this.NumberToLetter(totalValues[index]);
                  } else {
                     dynamicValueTotal = this.convertToWords(totalValues[index]);
                  }

                  tableData.push([
                     title,
                     dynamicValueTotal + ' (' + totalValues[index] + ') FCFA' || "N/A",
                  ]);
               });

               // const lineSeparator = [
               //    [
               //       { content: '', styles: { fillColor: [44, 65, 86], lineWidth: 0.2, cellHeight: 1 } },
               //       { content: '', styles: { fillColor: [44, 65, 86], lineWidth: 0.2, cellHeight: 1 } },
               //    ],
               // ];

               // Add the line separator to the tableData array
               // const tableData = [...rows1];

               // Calculate the total sum of the values for the "Total Vente" row
               // const totalVente = totalValues.reduce((sum, value) => sum + parseFloat(value), 0);

               // // Create the "Total Vente" row
               // const totalVenteRow = [
               //    'Total des ventes',
               //    this.NumberToLetter(totalVente) + ' (' + totalVente + ') FCFA' || "N/A",
               // ];

               // Add the "Total Vente" row to the tableData array
               // tableData.push(rows1);

               const startedY = 60;
               pdfDoc.autoTable({
                  body: tableData,
                  startY: startedY,
                  theme: 'grid',
                  styles: {
                     lineColor: [0, 0, 0], // Set line color to black
                     fontSize: 11,
                     lineWidth: 0.2, // Set line width
                     textColor: [0, 0, 0], // Couleur du texte noir
                  },

               });

               /***************************************************************************second tableau **************************************************** */

               //Afficher Liste des factures

               const libelle = 'Liste des factures :';
               pdfDoc.setFont('Helvetica', 'bold');
               pdfDoc.setFontSize(13);

               const textX = 13;
               const textY = 95; // Ajustez la position Y en fonction de votre mise en page
               pdfDoc.text(libelle, textX, textY);

               // Obtenez les dimensions du texte
               const textDimensions = pdfDoc.getTextDimensions(libelle);

               // Dessinez une ligne sous le texte pour simuler un soulignement
               const underlineY = textY + textDimensions.h - 2; // Ajustez selon votre besoin
               pdfDoc.setDrawColor(0); // Couleur de la ligne
               pdfDoc.setLineWidth(0.5); // Épaisseur de la ligne
               pdfDoc.line(textX, underlineY, textX + textDimensions.w, underlineY)



               // les  colonnes du seocnd tableau
               console.log(data);
               // var columns = ["Date", "status", "IEP", "Référence", "Patient", "Mode","Total brut", "Total assuré",  "Total Payé"]; //vous pouvez le donner à head pour former le tableau
               var columns = ["Date", "status", "IEP", "Référence", "Patient", "Total brut", "Total assuré", "Total Payé"]; //vous pouvez le donner à head pour former le tableau
               var rows = [];
               for (var i = 0; i < data.length; i++) {
                  var row = [
                     formatDate(data[i].created_at),
                     data[i].paid == 1 ? 'Payée' : 'Impayée',
                     data[i].movments_id,
                     data[i].reference,
                     data[i].lastname + " " + data[i].firstname,
                     // formatModePaiement(data[i].mode_payements_id),
                     this.formatNumberDecimal(data[i].montant_total),
                     this.formatNumberDecimal(data[i].montant_assurance),
                     this.formatNumberDecimal(data[i].montant_paye),
                  ];
                  rows.push(row);
               }
               // const tableData = [columns].concat(rows); // vous pouvez le donner à body

               const startY = 105;

               const pageHeight = pdfDoc.internal.pageSize.height;
               const pageWidth = pdfDoc.internal.pageSize.width;

               pdfDoc.autoTable({
                  // head: [columns],
                  head: [
                     [
                        { content: 'Date', styles: { halign: 'left' } },
                        { content: 'status', styles: { halign: 'left' } },
                        { content: 'IEP', styles: { halign: 'left' } },
                        { content: 'Référence', styles: { halign: 'left' } },
                        { content: 'Patient', styles: { halign: 'left' } },
                        // { content: 'Mode', styles: { halign: 'left' } },
                        { content: 'Total brut', styles: { halign: 'right' } },
                        { content: 'Total assuré', styles: { halign: 'right' } },
                        { content: 'Total Payé', styles: { halign: 'right' } },
                     ]
                  ],
                  body: rows,

                  startY: startY,
                  theme: 'grid',
                  styles: {
                     fontSize: 11,
                     lineWidth: 0.2, // Épaisseur de la ligne de séparation
                     lineColor: [0, 0, 0] // Couleur des bordures en noir (RGB)
                  },
                  headStyles: {
                     fillColor: [44, 65, 86],
                     textColor: [255, 255, 255],
                     valign: 'middle',
                  },

                  columnStyles: {

                     5: { // Index de la colonne "Montant Payé"
                        halign: 'right', // Aligner à droite
                     },
                     6: { // Index de la colonne "Montant Payé"
                        halign: 'right', // Aligner à droite
                     },
                     7: { // Index de la colonne "Montant Payé"
                        halign: 'right', // Aligner à droite
                     },
                  },

                  didDrawPage: function (data) {
                     var pageNumber = data.pageNumber;
                     var pageCount = pdfDoc.internal.getNumberOfPages();
                     var pageHeight = pdfDoc.internal.pageSize.height;
                     var pageWidth = pdfDoc.internal.pageSize.width;

                     pdfDoc.setFont('Helvetica', 'normal');
                     pdfDoc.setFontSize(10);
                     pdfDoc.setDrawColor(0);

                     pdfDoc.setLineWidth(0.2);
                     pdfDoc.line(20, pageHeight - 15, pageWidth - 20, pageHeight - 15);
                     pdfDoc.text(`Page ${pageNumber} / ${pageCount}`, 20, pageHeight - 10);
                  },
               });

               // Create a Blob from the PDF content
               const pdfBlob = pdfDoc.output('blob');

               // Create a URL for the Blob
               const pdfUrl = URL.createObjectURL(pdfBlob);

               // Open the PDF in a new tab
               window.open(pdfUrl, '_blank');
            }

         }).catch((error) => {
            console.error(error);
            if (error.response && error.response.status == 422) {
               this.formErrors = error.response.data.errors;
               this.spinnerRP = false;
            }
         });
      },


      generateRCashier() {
         // Create a new jsPDF instance

         this.indexSpinnerRCashier = true;

         const pdfDoc = new jsPDF();

         const titleTextHeight = pdfDoc.getTextDimensions('Rapport du caissier').h;

         pdfDoc.setFillColor(44, 65, 86); // RGB color
         const backgroundHeight = titleTextHeight + 5; // Adjust as needed
         pdfDoc.rect(0, 10, pdfDoc.internal.pageSize.width, backgroundHeight, 'F');

         // Add title to the PDF with underline and bold
         pdfDoc.setTextColor(255, 255, 255); // White text color
         pdfDoc.setFont('Helvetica', 'bold');
         const titleX = pdfDoc.internal.pageSize.width / 2;
         const titleY = 15 + (backgroundHeight - titleTextHeight) / 2; // Center vertically
         pdfDoc.textWithLink('Rapport du caissier', titleX, titleY, { url: '', underline: true, fontSize: 16, align: 'center' });

         // Reset text color for the date
         pdfDoc.setTextColor(0, 0, 0); // Black text color

         // Section de date 
         const currentDate = new Date().toLocaleDateString();

         // Afficher "Date du jour :" à gauche
         pdfDoc.setFont('Helvetica', 'bold');
         const textX = 13;
         const textY = 35;
         const text = 'Date du jour :';
         pdfDoc.setFontSize(13);
         pdfDoc.text(text, textX, textY);

         // Get the width of the text
         const textWidth = pdfDoc.getTextWidth(text);
         const lineHeight = 1;
         pdfDoc.moveTo(textX, textY + lineHeight).lineTo(textX + textWidth, textY + lineHeight).stroke();
         const dateXLeft = 10 + textWidth + 5; // Ajouter un espacement entre le texte et la date
         pdfDoc.setFont('Helvetica', 'normal'); // Réinitialiser la police à la normale si elle était en gras ou soulignée
         pdfDoc.text(currentDate, dateXLeft, textY);

         // Afficher Designation de la caisse
         const caisseDesignation = this.selectedCashRCDesignation || 'N/A';
         pdfDoc.setFont('Helvetica', 'bold');
         const designationXLeft = 13;
         const designationY = 45; // Ajuster la position y pour afficher en dessous de la date
         pdfDoc.setFontSize(13);
         pdfDoc.text("Caisse :", designationXLeft, designationY);

         // Get the width of the text
         const designationWidth = pdfDoc.getTextWidth("Caisse");
         const designationHeight = 1;
         pdfDoc.moveTo(designationXLeft, designationY + designationHeight).lineTo(designationXLeft + designationWidth, designationY + designationHeight).stroke();

         // Afficher la designation de la caisse
         const varDesignationXLeft = 14 + designationWidth + 5;
         pdfDoc.setFont('Helvetica', 'normal');
         pdfDoc.text(caisseDesignation, varDesignationXLeft, designationY);

         // Afficher caissier 
         const cashierCashRegister = this.nomCaissier || 'N/A';
         pdfDoc.setFont('Helvetica', 'bold');
         const cashierCashXLeft = 13;
         const cashierCashY = 55; // Ajuster la position y pour afficher en dessous de la date
         pdfDoc.setFontSize(13);
         pdfDoc.text("Caissier :", designationXLeft, cashierCashY);

         // Get the width of the text
         const cashierCashWidth = pdfDoc.getTextWidth("Caissier");
         const cashierCashHeight = 1;
         pdfDoc.moveTo(cashierCashXLeft, cashierCashY + cashierCashHeight).lineTo(cashierCashXLeft + cashierCashWidth, cashierCashY + cashierCashHeight).stroke();

         // Afficher la designation de la caisse
         const varcashierCashXLeft = 14 + cashierCashWidth + 5;
         pdfDoc.setFont('Helvetica', 'normal');
         pdfDoc.text(cashierCashRegister, varcashierCashXLeft, cashierCashY);

         const formatDate = (date) => {
            return new Date(date).toLocaleDateString();
         };

         const formatModePaiement = (modePaiementId) => {
            switch (modePaiementId) {
               case 1: return 'ESPECE';
               case 2: return 'MTN MOBILE MONEY';
               case 3: return 'MOOV MONEY';
               case 4: return 'CELTIS';
               case 5: return 'CARTE BANCAIRE';
               case 6: return 'CARTE CREDIT';
               case 7: return 'TRESORPAY';
               case 8: return 'PAIEMENT A CREDIT';
               default: return '-';
            }
         };

         rapport_statistiqueService.getBillsByCashier({
            cash_registers_id: this.selectedCashRegister1,
            user_id: this.selectedCashier,
            date: this.selectedDateRC
         }).then((res) => {
            this.indexSpinnerRCashier = false;
            this.reportCashierDaily = res.data.data;

            console.log("this.reportCashierDaily", this.reportCashierDaily);

            if (this.reportCashierDaily.length == 0) {
               this.$toast.error("Aucune information trouvée!", {
                  position: "top-right",
                  timeout: 3000,
                  style: {
                     background: "#ff0000", // Couleur de fond rouge pour l'erreur
                     color: "#fff", // Couleur du texte
                     fontWeight: "bold",
                  },
               });

               return;

            } else {

               // this.spinnerReportCashierDaily = false;
               var data = this.reportCashierDaily;
               /*****************************************************Premier tableau******************************************** */

               //Créez un tableau pour stocker les données du tableau
               const totalTitles = [
                  'Total encaissé',
                  'Total partiel encaissé',
                  'Total des ventes à crédits',
               ];
               const totalValues = [
                  res.data.total_montant_encaisse,
                  res.data.total_montant_partiel,
                  res.data.total_montant_a_credit,
               ];

               // Now, you can use totalRow to display the total values in the specified order

               // const rows1 = totalTitles.map((title, index) => [
               //    title,
               //    this.NumberToLetter(totalValues[index]) + ' (' + totalValues[index] + ') FCFA' || "N/A",
               // ]);

               const rows1 = totalTitles.map((title, index) => {
                  let dynamicValueTotal;

                  // Obtenez la valeur dynamique en fonction du typeCaisse
                  if (this.typeCaisse === 'A') {
                     dynamicValueTotal = this.NumberToLetter(totalValues[index]);
                  } else {
                     dynamicValueTotal = this.convertToWords(totalValues[index]);
                  }

                  // Créez la ligne avec la valeur dynamique
                  return [
                     title,
                     dynamicValueTotal + ' (' + totalValues[index] + ') FCFA' || "N/A",
                  ];
               });


               // const lineSeparator = [
               //    [
               //       { content: '', styles: { fillColor: [44, 65, 86], lineWidth: 0.2, cellHeight: 2 } },
               //       { content: '', styles: { fillColor: [44, 65, 86], lineWidth: 0.2, cellHeight: 2 } },
               //    ],
               // ];

               // Add the line separator to the tableData array
               const tableData = [...rows1,];

               // Calculate the total sum of the values for the "Total Vente" row
               const totalVente = totalValues.reduce((sum, value) => sum + parseFloat(value), 0);

               // Create the "Total Vente" row
               // const totalVenteRow = [
               //    'Total des ventes',
               //    this.NumberToLetter(totalVente) + ' (' + totalVente + ') FCFA' || "N/A",
               // ];

               let dynamicValueTotalVente;

               // Obtenez la valeur dynamique en fonction du typeCaisse
               if (this.typeCaisse === 'A') {
                  dynamicValueTotalVente = this.NumberToLetter(totalVente);
               } else {
                  dynamicValueTotalVente = this.convertToWords(totalVente);
               }
        

               // const totalVenteRow = [
               //    'Total des ventes',
               //    dynamicValueTotalVente + ' (' + totalVente + ') FCFA' || "N/A",
               // ];

               const totalVenteRow = [
                  { content: 'Total des ventes', styles: { fillColor: [44, 65, 86], textColor: [255, 255, 255], fontStyle: 'bold',  } },
                  { content: dynamicValueTotalVente + ' (' + totalVente + ') FCFA ' || "N/A", styles: { fillColor: [44, 65, 86], textColor: [255, 255, 255], fontStyle: 'bold',  cellWidth: 'auto',  } },
               ];



               // Add the "Total Vente" row to the tableData array
               tableData.push(totalVenteRow);

               const startedY = 65;
               pdfDoc.autoTable({
                  body: tableData,
                  startY: startedY,
                  theme: 'grid',
                  styles: {
                     lineColor: [0, 0, 0], // Set line color to black
                     fontSize: 11,
                     lineWidth: 0.2, // Set line width
                     textColor: [0, 0, 0], // Couleur du texte noir
                  },

               });

               /***************************************************************************second tableau **************************************************** */

               //Afficher Liste des factures

               const libelle = 'Liste des factures :';
               pdfDoc.setFont('Helvetica', 'bold');
               pdfDoc.setFontSize(13);

               const textX = 13;
               const textY = 125; // Ajustez la position Y en fonction de votre mise en page
               pdfDoc.text(libelle, textX, textY);

               // Obtenez les dimensions du texte
               const textDimensions = pdfDoc.getTextDimensions(libelle);

               // Dessinez une ligne sous le texte pour simuler un soulignement
               const underlineY = textY + textDimensions.h - 2; // Ajustez selon votre besoin
               pdfDoc.setDrawColor(0); // Couleur de la ligne
               pdfDoc.setLineWidth(0.5); // Épaisseur de la ligne
               pdfDoc.line(textX, underlineY, textX + textDimensions.w, underlineY)



               // les  colonnes du seocnd tableau
               console.log(data);
               var columns = ["Date", "status", "IEP", "Référence", "Patient", "Mode", "Total Payé"]; //vous pouvez le donner à head pour former le tableau
               var rows = [];
               for (var i = 0; i < data.length; i++) {
                  var row = [
                     formatDate(data[i].created_at),
                     data[i].paid == 1 ? 'Payée' : 'Impayée',
                     data[i].movments_id,
                     data[i].reference,
                     data[i].lastname + " " + data[i].firstname,
                     formatModePaiement(data[i].mode_payements_id),
                     this.formatNumberDecimal(data[i].montant_paye),
                  ];
                  rows.push(row);
               }
               // const tableData = [columns].concat(rows); // vous pouvez le donner à body

               const startY = 135;

               const pageHeight = pdfDoc.internal.pageSize.height;
               const pageWidth = pdfDoc.internal.pageSize.width;

               pdfDoc.autoTable({
                  // head: [columns],
                  head: [
                     [
                        { content: 'Date', styles: { halign: 'left' } },
                        { content: 'status', styles: { halign: 'left' } },
                        { content: 'IEP', styles: { halign: 'left' } },
                        { content: 'Référence', styles: { halign: 'left' } },
                        { content: 'Patient', styles: { halign: 'left' } },
                        { content: 'Mode', styles: { halign: 'left' } },
                        { content: 'Total Payé', styles: { halign: 'right' } }
                     ]
                  ],
                  body: rows,

                  startY: startY,
                  theme: 'grid',
                  styles: {
                     fontSize: 11,
                     lineWidth: 0.2, // Épaisseur de la ligne de séparation
                     lineColor: [0, 0, 0] // Couleur des bordures en noir (RGB)
                  },
                  headStyles: {
                     fillColor: [44, 65, 86],
                     textColor: [255, 255, 255],
                     valign: 'middle',
                  },

                  columnStyles: {

                     6: { // Index de la colonne "Montant Payé"
                        halign: 'right', // Aligner à droite
                     },
                  },

                  didDrawPage: function (data) {
                     var pageNumber = data.pageNumber;
                     var pageCount = pdfDoc.internal.getNumberOfPages();
                     var pageHeight = pdfDoc.internal.pageSize.height;
                     var pageWidth = pdfDoc.internal.pageSize.width;

                     pdfDoc.setFont('Helvetica', 'normal');
                     pdfDoc.setFontSize(10);
                     pdfDoc.setDrawColor(0);

                     pdfDoc.setLineWidth(0.2);
                     pdfDoc.line(20, pageHeight - 15, pageWidth - 20, pageHeight - 15);
                     pdfDoc.text(`Page ${pageNumber} / ${pageCount}`, 20, pageHeight - 10);
                  },
               });

               // Create a Blob from the PDF content
               const pdfBlob = pdfDoc.output('blob');

               // Create a URL for the Blob
               const pdfUrl = URL.createObjectURL(pdfBlob);

               // Open the PDF in a new tab
               window.open(pdfUrl, '_blank');
            }


         }).catch((error) => {
            console.error(error);
            if (error.response && error.response.status === 422) {
               this.errors = error.response.data.errors;

               this.indexSpinnerRCashier = false;
            }
         });
      },



      generatePDF() {
         // Create a new jsPDF instance
         this.indexSpinner = true;

         if (!this.selectedCasRegister) {
            this.errorMessageCasRegister = true;
            this.errorMessageDate = false; // Réinitialisez l'autre message d'erreur
            this.indexSpinner = false;
            return; // Arrêtez la génération du PDF si une erreur est détectée
         } else {
            this.errorMessageCasRegister = false;
            this.indexSpinner = true;
         }

         if (!this.selectedDate) {
            this.errorMessageDate = true;
            this.errorMessageCasRegister = false; // Réinitialisez l'autre message d'erreur
            this.indexSpinner = false;
            return; // Arrêtez la génération du PDF si une erreur est détectée
         } else {
            this.errorMessageDate = false;
            this.indexSpinner = true;
         }

         const pdfDoc = new jsPDF();


         const titleTextHeight = pdfDoc.getTextDimensions('Rapport de caisse').h;

         pdfDoc.setFillColor(44, 65, 86); // RGB color
         const backgroundHeight = titleTextHeight + 5; // Adjust as needed
         pdfDoc.rect(0, 10, pdfDoc.internal.pageSize.width, backgroundHeight, 'F');


         // Add title to the PDF with underline and bold
         pdfDoc.setTextColor(255, 255, 255); // White text color
         pdfDoc.setFont('Helvetica', 'bold');
         const titleX = pdfDoc.internal.pageSize.width / 2;
         const titleY = 15 + (backgroundHeight - titleTextHeight) / 2; // Center vertically
         pdfDoc.textWithLink('Rapport de caisse', titleX, titleY, { url: '', underline: true, fontSize: 16, align: 'center' });
         // Reset text color for the date
         pdfDoc.setTextColor(0, 0, 0); // Black text color


         // Section de date 
         const currentDate = new Date().toLocaleDateString();

         // Afficher "Date du jour :" à gauche
         pdfDoc.setFont('Helvetica', 'bold');
         const textX = 13;
         const textY = 35;
         const text = 'Date du jour :';
         pdfDoc.setFontSize(13);
         pdfDoc.text(text, textX, textY);

         // Get the width of the text
         const textWidth = pdfDoc.getTextWidth(text);
         const lineHeight = 1;
         pdfDoc.moveTo(textX, textY + lineHeight).lineTo(textX + textWidth, textY + lineHeight).stroke();

         // // Afficher la date à droite avec un lien
         // const dateX = pdfDoc.internal.pageSize.width - pdfDoc.getStringUnitWidth(currentDate) * pdfDoc.internal.getFontSize();
         // pdfDoc.textWithLink(currentDate, dateX, 30, { url: '', underline: false, fontSize: 14 });
         const dateXLeft = 10 + textWidth + 5; // Ajouter un espacement entre le texte et la date
         pdfDoc.setFont('Helvetica', 'normal'); // Réinitialiser la police à la normale si elle était en gras ou soulignée
         pdfDoc.text(currentDate, dateXLeft, textY);


         //Afficher Designation de la caisse
         const caisseDesignation = this.caisseDesignation || 'N/A';
         pdfDoc.setFont('Helvetica', 'bold');
         const designationXLeft = 13;
         const designationY = 45; // Ajuster la position y pour afficher en dessous de la date
         pdfDoc.setFontSize(13);
         pdfDoc.text("Caisse :", designationXLeft, designationY);
         // Get the width of the text
         const designationWidth = pdfDoc.getTextWidth("Caisse");
         const designationHeight = 1;
         pdfDoc.moveTo(designationXLeft, designationY + designationHeight).lineTo(designationXLeft + designationWidth, designationY + designationHeight).stroke();

         // Afficher la designation de la caisse
         const varDesignationXLeft = 14 + designationWidth + 5;
         pdfDoc.setFont('Helvetica', 'normal');
         pdfDoc.text(caisseDesignation, varDesignationXLeft, designationY);


         rapport_statistiqueService
            .generateCashReport(this.selectedCasRegister, this.selectedDate)
            .then((res) => {
               this.reportCashRegister = res.data.data;
               this.indexSpinner = false;
               console.log("this.reportCashRegister.length")
               console.log(this.reportCashRegister)

               if (this.reportCashRegister.length === 0) {
                  this.$toast.error("Aucune information trouvée!", {
                     position: "top-right",
                     timeout: 3000,
                     style: {
                        background: "#ff0000", // Couleur de fond rouge pour l'erreur
                        color: "#fff", // Couleur du texte
                        fontWeight: "bold",
                     },
                  });

                  return;

               } else {
                  // Check if this.reportCashRegister is not null or undefined


                  const excludedKeys = ['totalByMode'];

                  // Créez un tableau pour stocker les données du tableau
                  const staticColumnTitles = {
                     customTitle1: "Total encaissé",
                     customTitle2: "Total partiel encaissé",
                     customTitle3: "Total des ventes à crédits",
                     // Ajoutez autant de mappages que nécessaire
                  };

                  const tableData = [];


                  const staticColumnValues = Object.values(staticColumnTitles);

                  // Ajoutez les valeurs depuis this.reportCashRegister à la deuxième colonne
                  const dynamicColumnValues = Object.values(this.reportCashRegister).map((value) => {
                     // return value.toString();
                     return this.formatNumberDecimal(value);

                  });

                  // Créez des lignes pour le tableau en fusionnant les valeurs statiques et dynamiques

                  // const rows = staticColumnValues.map((staticValue, index) => [
                  //    staticValue,
                  //    // dynamicColumnValues[index] || "N/A", // Utilisez "N/A" si la valeur dynamique est undefined
                  //    dynamicColumnValues[index] + ' (' + this.NumberToLetter(dynamicColumnValues[index]) + ') FCFA' || "N/A",

                  // ]);

                  const rows = staticColumnValues.map((staticValue, index) => {
                     let dynamicValue;

                     // Obtenez la valeur dynamique en fonction du typeCaisse
                     if (this.typeCaisse === 'A') {
                        dynamicValue = this.NumberToLetter(dynamicColumnValues[index]);
                     } else {
                        dynamicValue = this.convertToWords(dynamicColumnValues[index]);
                     }

                     // Créez la ligne avec la valeur dynamique
                     return [
                        staticValue,
                        dynamicColumnValues[index] + ' (' + dynamicValue + ') FCFA' || "N/A",
                     ];
                  });




                  // Ajoutez les lignes au tableau de données
                  tableData.push(...rows);

                  const startY = 55;

                  pdfDoc.autoTable({
                     body: tableData,
                     startY: startY,
                     theme: 'grid',
                     styles: {
                        lineColor: [0, 0, 0], // Set line color to black
                        fontSize: 11,
                        lineWidth: 0.2, // Set line width
                        textColor: [0, 0, 0], // Couleur du texte noir
                     },
                     columnStyles: {
                        0: { align: 'left' }, // Align content in the first column to the left
                        1: { align: 'right' }, // Align content in the second column to the right
                        0: { cellWidth: 70 },
                     },
                  });

                  pdfDoc.setFontSize(16);
                  pdfDoc.setTextColor(0, 0, 255); // Set text color to blue
                  // Créez un tableau pour stocker les colonnes statiques
                  const staticModeColumns = [
                     "Espèce",
                     "Mtn Mobile Money",
                     "Moov Monney",
                     "Celtis",
                     "Carte Bancaire",
                     "Carte de Crédit",
                     "TrésorPay",
                     // Ajoutez autant de modes que nécessaire
                  ];

                  const tableModeData = [];
                  const staticColumnModeValues = Object.values(staticModeColumns);


                  const dynamicColumnModeValues = Object.values(this.reportCashRegister.totalByMode).map(value => this.formatNumberDecimal(value));

                  // const rowsMode = staticColumnModeValues.map((staticValue, index) => [
                  //    staticValue,
                  //    // dynamicColumnModeValues[index] || "N/A", // Utilisez "N/A" si la valeur dynamique est undefined:
                  //    dynamicColumnModeValues[index] + ' (' + this.NumberToLetter(dynamicColumnModeValues[index]) + ') FCFA' || "N/A",

                  // ]);

                  const rowsMode = staticColumnModeValues.map((staticValue, index) => {
                     let dynamicValueMode;

                     // Obtenez la valeur dynamique en fonction du typeCaisse
                     if (this.typeCaisse === 'A') {
                        dynamicValueMode = this.NumberToLetter(dynamicColumnModeValues[index]);
                     } else {
                        dynamicValueMode = this.convertToWords(dynamicColumnModeValues[index]);
                     }

                     // Créez la ligne avec la valeur dynamique
                     return [
                        staticValue,
                        dynamicColumnModeValues[index] + ' (' + dynamicValueMode + ') FCFA' || "N/A",
                     ];
                  });


                  // Ajoutez les lignes au tableau de données
                  tableModeData.push(...rowsMode);


                  // Set font size for the modes table
                  pdfDoc.setFontSize(14);

                  // Create the modes table with pure borders
                  pdfDoc.setLineWidth(0.5); // Set line width for external borders
                  pdfDoc.setDrawColor(0, 0, 0); // Set line color to black for external borders
                  pdfDoc.autoTable({
                     body: tableModeData,
                     secondTableY: 110,
                     theme: 'grid', // You can change the theme to 'striped', 'grid', etc.
                     tableLineWidth: 0.2, // Set table line width
                     margin: { top: 10 }, // Adjust the top margin if needed
                     styles: {
                        lineColor: [0, 0, 0], // Set line color to black
                        fontSize: 11,
                        lineWidth: 0.2, // Set line width
                        textColor: [0, 0, 0], // Couleur du texte noir
                     },
                     columnStyles: {
                        0: { align: 'left' }, // Align content in the first column to the left
                        1: { align: 'right' }, // Align content in the second column to the right
                        0: { cellWidth: 70 },
                     },

                     drawCell: (cell, data) => {
                        if (data.column.index === 1 && data.row.index === data.table.body.length - 1) {
                           // Si c'est la dernière cellule de la page, ajoutez une nouvelle page
                           if (cell.section === 'body' && startY + pdfDoc.previousAutoTable.finalY + 10 > pdfDoc.internal.pageSize.height) {
                              addPageAndTable();
                           }
                        }
                     },

                  });

                  // Create a Blob from the PDF content
                  const pdfBlob = pdfDoc.output('blob');

                  // Create a URL for the Blob
                  const pdfUrl = URL.createObjectURL(pdfBlob);

                  // Open the PDF in a new tab
                  window.open(pdfUrl, '_blank');

               }
            })
            .catch((error) => {
               console.error(error);
            });

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


   }


}

</script>
  
<style scoped>
/* Style pour la section principale du tableau de bord */
.dashboard-section {
   margin-bottom: 20px;
}

select {
   cursor: pointer;
   height: 43px !important;
}

/* Style pour les cartes du tableau de bord */

/* .grid-margin {
  margin-bottom: 1.5rem;
  } */

.mt-3,
.template-demo>.btn,
.template-demo>.btn-toolbar,
.my-3 {
   margin-top: -2rem !important;
}



/* Style pour le texte des cartes */


/* Style pour les titres des cartes */
.card-title {
   margin-bottom: 8px;
   color: #0b5d3f;
   font-size: 1.2rem;
}

/* Style pour les valeurs des cartes */

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
  
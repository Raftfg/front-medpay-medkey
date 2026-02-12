<template>
  <div>
    <h3 class="card-title text-white rounded p-1 mb-5 text-center"
      style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
      Rapport périodique des recouvrements
    </h3>
    <div class="mt-3">
      <div class="card grid-margin">
        <div class="card-body">
          <div class="row ">
            <div class="form-group col-lg-5 col-md-5 col-sm-12">
              <label for="exampleFormControlSelect1">Utilisateurs <span style="color: red">*</span></label>
              <select v-model="selectedUserDestock" class="form-control" @change="updateSelectedUserDestock">
                <option value="">Sélectionner</option>
                <option v-for="userDestock in userDestocks" :key="userDestock.uuid" :value="userDestock.uuid">
                  {{ userDestock.name }} {{ userDestock.prenom }}
                </option>
              </select>
              <div v-if="errors.user_id && !selectedUserDestock" class="text-danger" style="font-size: 11;">
                Ce champs est requis.
              </div>
            </div>
            <div class="col-lg-5 col-md-5 col-sm-12 form-group" style="font-size: 11;">
              <label for="exampleFormControlInput1">Date <span style="color: red">*</span></label>
              <input type="date" class="form-control" v-model="rpDestockDate" />
              <div v-if="errors.date && !rpDestockDate" class="text-danger">
                Ce champs est requis.
              </div>
            </div>
            <div class="col-lg-2 col-md-2 col-sm-12 pl-3 mt-4">
              <button @click="generateReportPBillsDestock" class="btn btn-success btn-medpay-green"
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
 

  </div>
</template>
<script>

import { caisseService } from "@/_services";
import $ from "jquery";
import "../../../../node_modules/bootstrap/dist/js/bootstrap.js";
import "../../../../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { rapport_statistiqueService } from "@/_services/rapport_statistique_services.js";
import { destockageService } from "@/_services";

import jsPDF from 'jspdf';
import 'jspdf-autotable';

export default {

  name: "destockStat",

  data() {
    return {
      caisses: [],
      caissiers: [],
      reportCashierDaily: [],
      reportCashRegister: [],
      reportProductDestock: [],
      reportProductDestock: [],
      selectedCasRegister: "",
      selectedCashRCDesignation: "",
      rpDestock: "",
      rpDestockDate: "",
      selectedCashier: "",
      selectedCashRegister1: "",
      rpCachRegister: "",
      rpCachRegisterDesignation: "",
      indexSpinner: false,
      indexSpinnerRCashier: false,
      selectedDate: "",
      userDestocks: [],
      selectedUserDestock: "",
      nomUserDestock: "",
      nomCaissier: "",
      rpEndDate: "",
      rpStartDate: "",
      rpStatut: "",
      indexSpinner: false,
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

    destockageService
      .getAllusersDestock()
      .then((response) => {
        this.userDestocks = response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });

    caisseService
      .getAllCaisse()
      .then((response) => {
        this.caisses = response.data.data;
        // console.log("Résultat des caisses  :");
        // console.log(response.data.data)
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
        console.log("this.caisseDesignation")
        console.log(this.caisseDesignation)
      } else {
        this.caisseDesignation = '';
        this.selectedCashRCDesignation = '';
      }
    },

    updateCaisseDesignation1() {
      const selectedCaisse = this.caisses.find((caisse) => caisse.id === this.selectedCashRegister1);
      if (selectedCaisse) {
        this.selectedCashRCDesignation = selectedCaisse.designation;
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
        console.log("this.rpCachRegisterDesignation")
        console.log(this.rpCachRegisterDesignation)
      } else {
        this.rpCachRegisterDesignation = '';
      }
    },



    updateSelectedUserDestock() {

      const selectedUser = this.userDestocks.find((user) => user.uuid == this.selectedUserDestock);
      if (selectedUser) {
        this.nomUserDestock = selectedUser.name + " " + selectedUser.prenom

      } else {
        this.nomUserDestock = '';
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



    generateReportPBillsDestock() {

      // Create a new jsPDF instance

      this.indexSpinner = true;

      const pdfDoc = new jsPDF({
        orientation: 'landscape', // Définir l'orientation sur le mode paysage
      });

      const titleTextHeight = pdfDoc.getTextDimensions('Rapport journalier des produits déstockés').h;

      pdfDoc.setFillColor(44, 65, 86); // RGB color
      const backgroundHeight = titleTextHeight + 5; // Adjust as needed
      pdfDoc.rect(0, 10, pdfDoc.internal.pageSize.width, backgroundHeight, 'F');

      // Add title to the PDF with underline and bold
      pdfDoc.setTextColor(255, 255, 255); // White text color
      pdfDoc.setFont('Helvetica', 'bold');
      const titleX = pdfDoc.internal.pageSize.width / 2;
      const titleY = 15 + (backgroundHeight - titleTextHeight) / 2; // Center vertically
      pdfDoc.textWithLink('Rapport journalier des produits déstockés', titleX, titleY, { url: '', underline: true, fontSize: 16, align: 'center' });

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
      const userDestock = this.nomUserDestock || 'N/A';
      pdfDoc.setFont('Helvetica', 'bold');
      const designationXLeft = 13;
      const designationY = 45; // Ajuster la position y pour afficher en dessous de la date
      pdfDoc.setFontSize(13);
      pdfDoc.text("Utilisateur :", designationXLeft, designationY);

      // Get the width of the text
      const designationWidth = pdfDoc.getTextWidth("Utilisateur");
      const designationHeight = 1;
      pdfDoc.moveTo(designationXLeft, designationY + designationHeight).lineTo(designationXLeft + designationWidth, designationY + designationHeight).stroke();

      // Afficher la designation de la caisse
      const varDesignationXLeft = 14 + designationWidth + 5;
      pdfDoc.setFont('Helvetica', 'normal');
      pdfDoc.text(userDestock, varDesignationXLeft, designationY);

      // Affichage de la table

      const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
      };

      console.log("this.selectedUserDestock");
      console.log(this.selectedUserDestock);

      rapport_statistiqueService.getRreportProdcutDestock({

        user_id: this.selectedUserDestock,
        date: this.rpDestockDate,

      }).then((res) => {

        this.indexSpinner = false;
        this.reportProductDestock = res.data.data;

        console.log("this.reportProductDestock", this.reportProductDestock);

        if (this.reportProductDestock.length === 0) {
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

          this.indexSpinner = false;

          var data = this.reportProductDestock;

          /*****************************************************Premier tableau******************************************** */

          //Créez un tableau pour stocker les données du tableau
          // const totalTitles = [
          //    'Total payé',
          //    'Total impayé',
          // ];
          // const totalValues = [
          //    res.data.total_montant_encaisse,
          //    res.data.total_montant_partiel,
          //    res.data.total_montant_a_credit,
          // ];

          // Now, you can use totalRow to display the total values in the specified order

          // const rows1 = totalTitles.map((title, index) => [
          //    title,
          //    this.NumberToLetter(totalValues[index]) + ' (' + totalValues[index] + ') FCFA' || "N/A",
          // ]);

          // const lineSeparator = [
          //    [
          //       { content: '', styles: { fillColor: [44, 65, 86], lineWidth: 0.2, cellHeight: 2 } },
          //       { content: '', styles: { fillColor: [44, 65, 86], lineWidth: 0.2, cellHeight: 2 } },
          //    ],
          // ];

          // Add the line separator to the tableData array
          // const tableData = [...rows1, ...lineSeparator];

          // Calculate the total sum of the values for the "Total Vente" row
          // const totalVente = totalValues.reduce((sum, value) => sum + parseFloat(value), 0);

          // // Create the "Total Vente" row
          // const totalVenteRow = [
          //    'Total des ventes',
          //    this.NumberToLetter(totalVente) + ' (' + totalVente + ') FCFA' || "N/A",
          // ];

          // Add the "Total Vente" row to the tableData array
          // tableData.push(totalVenteRow);

          // const startedY = 65;
          // pdfDoc.autoTable({
          //    body: tableData,
          //    startY: startedY,
          //    theme: 'grid',
          //    styles: {
          //       lineColor: [0, 0, 0], // Set line color to black
          //       fontSize: 11,
          //       lineWidth: 0.2, // Set line width
          //       textColor: [0, 0, 0], // Couleur du texte noir
          //    },

          // });

          /***************************************************************************second tableau **************************************************** */

          //Afficher Liste des factures

          const libelle = 'Liste des produits déstockés :';
          pdfDoc.setFont('Helvetica', 'bold');
          pdfDoc.setFontSize(13);

          const textX = 13;
          const textY = 55; // Ajustez la position Y en fonction de votre mise en page
          pdfDoc.text(libelle, textX, textY);

          // Obtenez les dimensions du texte
          const textDimensions = pdfDoc.getTextDimensions(libelle);

          // Dessinez une ligne sous le texte pour simuler un soulignement
          // const underlineY = textY + textDimensions.h - 2; // Ajustez selon votre besoin
          // pdfDoc.setDrawColor(0); // Couleur de la ligne
          // pdfDoc.setLineWidth(0.5); // Épaisseur de la ligne
          // pdfDoc.line(textX, underlineY, textX + textDimensions.w, underlineY)



          // les  colonnes du seocnd tableau
          console.log(data);
          var columns = ["Date", "Référence", "Code", "Produit", "Prix(U)", "N° lot", "Qté commandée", "Qté déstockée", "Qté à détocker"]; //vous pouvez le donner à head pour former le tableau
          var rows = [];
          for (var i = 0; i < data.length; i++) {
            var row = [
              formatDate(data[i].created_at),
              data[i].reference_facture,
              data[i].stock_product.product.code,
              data[i].stock_product.product.name,
              data[i].stock_product.selling_price,
              data[i].stock_product.lot_number,
              data[i].quantity_ordered,
              data[i].quantity_retrieved,
              data[i].quantity_remaining_to_retrieve,
            ];
            rows.push(row);
          }
          // const tableData = [columns].concat(rows); // vous pouvez le donner à body

          const startY = 65;

          const pageHeight = pdfDoc.internal.pageSize.height;
          const pageWidth = pdfDoc.internal.pageSize.width;

          pdfDoc.autoTable({
            // head: [columns],
            head: [
              [
                { content: 'Date', styles: { halign: 'left' } },
                { content: 'Référence', styles: { halign: 'left' } },
                { content: 'Code', styles: { halign: 'left' } },
                { content: 'Produit', styles: { halign: 'left' } },
                { content: 'Prix(U)', styles: { halign: 'right' } },
                { content: 'N° lot', styles: { halign: 'left' } },
                { content: 'Qté commandée', styles: { halign: 'center' } },
                { content: 'Qté déstockée', styles: { halign: 'center' } },
                { content: 'Qté à détocker', styles: { halign: 'center' } },
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

              4: { // Index de la colonne "Montant Payé"
                halign: 'right', // Aligner à droite
              },
              6: { // Index de la colonne "Montant Payé"
                halign: 'center', // Aligner à droite
              },
              7: { // Index de la colonne "Montant Payé"
                halign: 'center', // Aligner à droite
              },
              8: { // Index de la colonne "Montant Payé"
                halign: 'center', // Aligner à droite
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
          this.errors = error.response.data.errors;
          this.indexSpinner = false;
        }
      });
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
   
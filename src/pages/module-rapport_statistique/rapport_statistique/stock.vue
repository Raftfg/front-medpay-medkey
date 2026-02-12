<template>
   <div>
      <h3 class="card-title text-white rounded p-2 mb-5 text-center"
         style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
         Rapport par Stock
      </h3>
      <div class="mt-3">
         <div class="card grid-margin">
            <div class="card-body">
               <div class="row ">
                  <div class="form-group col-lg-5 col-md-5 col-sm-12">
                     <label>Type de produit <span style="color: red">*</span></label>
                     <select v-model="filter.typeProduct" class="form-control">
                        <option value="">Sélectionner</option>
                        <option v-for="typeProduct in typeProducts" :key="typeProduct.uuid" :value="typeProduct.name">
                           <span v-if="typeProduct.name == 'Drugs'">
                              Médicaments
                           </span>
                           <span v-if="typeProduct.name == 'Consumables'">
                              Consommables
                           </span>
                           <span v-if="typeProduct.name == 'Notebooks and cards'">
                              Carnets et cartes
                           </span>
                        </option>
                     </select>

                     <div v-if="errorMessageCasRegister && !selectedCasRegister" class="text-danger"
                        style="font-size: 11;">
                        Ce champs est requis.
                     </div>
                  </div>

                  <div class="form-group col-lg-5 col-md-5 col-sm-12">
                     <label>Stock <span style="color: red">*</span></label>
                     <select v-model="filter.stock" class="form-control" @change="updateSelectedStock">
                        <option value="">Sélectionner</option>
                        <option v-for="stock in stocks" :key="stock.uuid" :value="stock.uuid">
                           {{ stock.name }}
                        </option>
                     </select>

                     <div v-if="errorMessageCasRegister && !selectedCasRegister" class="text-danger"
                        style="font-size: 11;">
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
 
 

   </div>
 </template>
 <script>
 
 import { caisseService } from "@/_services";
 import $ from "jquery";
 import "../../../../node_modules/bootstrap/dist/js/bootstrap.js";
 import "../../../../node_modules/bootstrap/dist/js/bootstrap.min.js";
 import { rapport_statistiqueService } from "@/_services";
 import { typeProductService } from "@/_services";
 import { stockService } from "@/_services";
 import logoImage from '@/assets/images/logo_ministere_sante.png';
 
 
 import jsPDF from 'jspdf';
 import 'jspdf-autotable';
 
 export default {
 
   name: "stock-report",
 
   data() {
      return {
         typeProducts: {},
         stocks: {},
         filter: {
            typeProduct: "",
            stock: "",
         },
         reportProductsByStock: "",
         selectedStockName: "",

         caisses: [],
         caissiers: [],
         reportCashierDaily: [],
         reportCashRegister: [],
         selectedCasRegister: "",
         selectedCashRCDesignation: "",
         selectedCashier: "",
         selectedCashRegister1: "",
         rpCachRegister: "",
         rpCachRegisterDesignation: "",
         indexSpinner: false,
         indexSpinnerRCashier: false,
         selectedDate: "",
         nomCaissier: "",
         rpEndDate: "",
         rpStartDate: "",
         rpStatut: "",
         spinnerRP: "",
         selectedDateRC: "",
         caisseDesignation: "",
         errors: {},
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
      typeProductService
      .getAllTypeProducts()
      .then((response) => {
         this.typeProducts = response.data.data; 
      })
      .catch((error) => {
         console.log(error);
      });

      stockService
      .getAllStocks()
      .then((response) => {
         console.log(response)
         this.stocks = response.data.data; 
      })
      .catch((error) => {
         console.log(error);
      });
   },
 
   methods: {
      updateSelectedStock() {
         const selectedStock = this.stocks.find((stock) => stock.uuid == this.filter.stock);

         if (selectedStock) {
            this.selectedStockName = selectedStock.name;
         } else {
            this.selectedStockName = '';
         }
      },
      generatePDF() {
         // Create a new jsPDF instance
         this.indexSpinner = true;
 
         if (!this.filter.typeProduct) {
            this.errorMessageCasRegister = true;
            this.errorMessageDate = false;
            this.indexSpinner = false;
            return; 
         } else {
            this.errorMessageCasRegister = false;
            this.indexSpinner = true;
         }
 
         if (!this.filter.stock) {
            this.errorMessageDate = true;
            this.errorMessageCasRegister = false; 
            this.indexSpinner = false;
            return;
         } else {
            this.errorMessageDate = false;
            this.indexSpinner = true;
         }
 
         const pdfDoc = new jsPDF();

         pdfDoc.setFontSize(10);
         pdfDoc.setFont('Helvetica', 'bold'); // Définir la police en gras
         pdfDoc.textWithLink(
            'HZ-LA\nLOKOSSA ATHIEME',
            15,
            15,
            {
               url: '',
               underline: false,
               fontSize: 8,
               lineHeight: lineHeight / pdfDoc.internal.scaleFactor,
            }
         );

         pdfDoc.setFont('Helvetica', 'normal');
         const lineHeight = 8;
         pdfDoc.textWithLink(
            'MONO - LOKOSSA\nLOKOSSA - AHOUME DEKAME\nCode postal 09 6 51 03\nEn Allant à LINK Hotel\nBenin',
            15,
            23,
            {
               url: '',
               underline: false,
               fontSize: 8,
               lineHeight: lineHeight / pdfDoc.internal.scaleFactor, 
            }
         );

         // Example usage in your Vue component
         const localImageFile = require('@/assets/images/logo_ministere_sante.png'); // Adjust the path based on your project structure

         const base64Image = localImageFile;

         // Get the dimensions of the image
         const img = new Image();
         img.src = base64Image;
         const originalWidth = img.width;
         const originalHeight = img.height;

         // Calculate the aspect ratio
         const aspectRatio = originalWidth / originalHeight;

         // Set the desired width and height for display in the PDF
         const desiredWidth = 80;
         const desiredHeight = desiredWidth / 3.11284046692607;
         console.log(desiredHeight);

         // aspectRatio for this image == 3.11284046692607

         // Add the image to the PDF
         pdfDoc.setPage(1);
         pdfDoc.addImage(base64Image, 'PNG', pdfDoc.internal.pageSize.width - 85, 10, desiredWidth, desiredHeight);


         // Put a line space
         pdfDoc.text('', 10, pdfDoc.internal.pageSize.height - 10);

         // Title
         pdfDoc.setFont('Helvetica', 'bold');
         pdfDoc.setFontSize(12);

         var headerText = 'Médicaments disponibles dans le stock ' + this.selectedStockName.toUpperCase();

         if (this.filter.typeProduct == 'Drugs') {
            headerText = 'Médicaments disponibles dans le stock ' + this.selectedStockName.toUpperCase();
         }
         else if(this.filter.typeProduct == 'Consumables') {
            headerText = 'Consommables disponibles dans le stock ' + this.selectedStockName.toUpperCase();
         }
         else {
            headerText = 'Carnets et cartes disponibles dans le stock ' + this.selectedStockName.toUpperCase();
         }
         const textWidth = pdfDoc.getTextWidth(headerText);
         pdfDoc.text('', 10, pdfDoc.internal.pageSize.height - 10);
         pdfDoc.text('', 10, pdfDoc.internal.pageSize.height - 10);
         
         // Calculer la position X pour centrer le texte horizontalement
         const headerPositionX = (pdfDoc.internal.pageSize.width - textWidth) / 2;

         pdfDoc.textWithLink(headerText, headerPositionX, 50, {
            underline: false,
         });

         // Put a line space
         pdfDoc.text('', 10, pdfDoc.internal.pageSize.height - 10);
         pdfDoc.text('', 10, pdfDoc.internal.pageSize.height - 10);
         pdfDoc.text('', 10, pdfDoc.internal.pageSize.height - 10);
         
         if (this.filter.typeProduct == 'Drugs') {
            rapport_statistiqueService
            .getDrugsInASpecificStock(this.filter.stock)
            .then((res) => {
               console.log(res);
               this.reportProductsByStock = res.data.data;
               this.indexSpinner = false;
 
               if (this.reportProductsByStock.length === 0) {
                  this.$toast.error("Aucune donnée trouvée!", {
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
                  pdfDoc.setFontSize(12);
                  const staticProductColumns = ["Nom commercial", "Lot", "Date d'exp.", "Packaging", "Quantité", "Nb unités par boîtes", "Prix de vente"];
                  const tableProductData = [];

                  const staticProductColumnValues = Object.values(staticProductColumns);
                  const dynamicProductColumnValues = this.reportProductsByStock.map(product => [
                     product.product.name,
                     product.lot_number,
                     product.expire_date,
                     product.product.conditioning_unit.name,
                     product.quantity,
                     product.units_per_box,
                     product.selling_price,
                  ]);

                  const rowsProduct = dynamicProductColumnValues.map((values) => [...values]);
                  // Header settings
                  const headStyles = {
                     fillColor: [192, 192, 192],
                     textColor: [0, 0, 0],
                     fontSize: 10,
                  };

                  // Fill up the content
                  tableProductData.push(...rowsProduct);
                  // Fill the tab with data
                  pdfDoc.autoTable({
                     head: [staticProductColumnValues],
                     body: tableProductData,
                     startY: 60, 
                     theme: 'grid',
                     tableLineWidth: 0.2,
                     margin: { top: 10 },
                     styles: {
                        lineColor: [0, 0, 0],
                        fontSize: 10,
                        lineWidth: 0.2,
                        textColor: [0, 0, 0],
                     },
                     columnStyles: {
                        // 0: { align: 'left' },
                        // 1: { align: 'right' },
                        // 2: { align: 'right' },
                     },
                     headStyles: headStyles,
                  });
 
                  const pageCount = pdfDoc.internal.getNumberOfPages();

                  for (let i = 1; i <= pageCount; i++) {
                     // separate the existing content from the footer
                     pdfDoc.text('', 10, pdfDoc.internal.pageSize.height - 10);

                     pdfDoc.setPage(i);
                     // Set font size and position for the date and time
                     pdfDoc.setFont('Helvetica', 'normal');
                     pdfDoc.setFontSize(8);

                     // Get the current date and time
                     const currentDate = new Date();
                     const dateText = currentDate.toLocaleDateString();
                     const timeText = currentDate.toLocaleTimeString('en-US', { hour12: false });
                     const dateTimeText = `${dateText}\n${timeText} WAT`;

                     // Adjust the coordinates based on your preference
                     const dateX = 15;
                     const dateY = pdfDoc.internal.pageSize.height - 15; // Adjust as needed

                     // Add the date and time text to the page
                     pdfDoc.text(dateTimeText, dateX, dateY);

                     const text = 'MEDKEY version : 1.1';
                     const textWidth = pdfDoc.getTextWidth(text);
                     pdfDoc.setFont('Helvetica', 'bold');


                     // Calculate the position to center the text at the bottom
                     const textX = (pdfDoc.internal.pageSize.width - textWidth) / 2;
                     const textY = pdfDoc.internal.pageSize.height - 5;

                     // Add the footer text
                     pdfDoc.text(text, textX, textY);
                     pdfDoc.setFont('Helvetica', 'normal');

                     // Ajouter le numéro de page formaté en bas à droite
                     const pageText = `Page ${i} / ${pageCount}`;
                     const pageTextWidth = pdfDoc.getTextWidth(pageText);

                     // Calculer la position pour aligner le texte en bas à droite
                     const pageTextX = pdfDoc.internal.pageSize.width - pageTextWidth - 15;
                     const pageTextY = pdfDoc.internal.pageSize.height - 15;

                     // Ajouter le texte du numéro de page
                     pdfDoc.text(pageText, pageTextX, pageTextY);                                
                  }

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
         }
         else if (this.filter.typeProduct == 'Consumables') {
            rapport_statistiqueService
            .getConsumablesInASpecificStock(this.filter.stock)
            .then((res) => {
               console.log(res);
               this.reportProductsByStock = res.data.data;
               this.indexSpinner = false;
 
               if (this.reportProductsByStock.length === 0) {
                  this.$toast.error("Aucune donnée trouvée!", {
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
                  pdfDoc.setFontSize(12);
                  const staticProductColumns = ["Nom commercial", "Lot", "Date d'exp.", "Packaging", "Quantité", "Nb unités par boîtes", "Prix de vente"];
                  const tableProductData = [];

                  const staticProductColumnValues = Object.values(staticProductColumns);
                  const dynamicProductColumnValues = this.reportProductsByStock.map(product => [
                     product.product.name,
                     product.lot_number,
                     product.expire_date,
                     product.product.conditioning_unit.name,
                     product.quantity,
                     product.units_per_box,
                     product.selling_price,
                  ]);

                  const rowsProduct = dynamicProductColumnValues.map((values) => [...values]);
                  // Header settings
                  const headStyles = {
                     fillColor: [192, 192, 192],
                     textColor: [0, 0, 0],
                     fontSize: 10,
                  };

                  // Fill up the content
                  tableProductData.push(...rowsProduct);
                  // Fill the tab with data
                  pdfDoc.autoTable({
                     head: [staticProductColumnValues],
                     body: tableProductData,
                     startY: 60, 
                     theme: 'grid',
                     tableLineWidth: 0.2,
                     margin: { top: 10 },
                     styles: {
                        lineColor: [0, 0, 0],
                        fontSize: 10,
                        lineWidth: 0.2,
                        textColor: [0, 0, 0],
                     },
                     columnStyles: {
                        // 0: { align: 'left' },
                        // 1: { align: 'right' },
                        // 2: { align: 'right' },
                     },
                     headStyles: headStyles,
                  });
 
                  const pageCount = pdfDoc.internal.getNumberOfPages();

                  for (let i = 1; i <= pageCount; i++) {
                     // separate the existing content from the footer
                     pdfDoc.text('', 10, pdfDoc.internal.pageSize.height - 10);

                     pdfDoc.setPage(i);
                     // Set font size and position for the date and time
                     pdfDoc.setFont('Helvetica', 'normal');
                     pdfDoc.setFontSize(8);

                     // Get the current date and time
                     const currentDate = new Date();
                     const dateText = currentDate.toLocaleDateString();
                     const timeText = currentDate.toLocaleTimeString('en-US', { hour12: false });
                     const dateTimeText = `${dateText}\n${timeText} WAT`;

                     // Adjust the coordinates based on your preference
                     const dateX = 15;
                     const dateY = pdfDoc.internal.pageSize.height - 15; // Adjust as needed

                     // Add the date and time text to the page
                     pdfDoc.text(dateTimeText, dateX, dateY);

                     const text = 'MEDKEY version : 1.1';
                     const textWidth = pdfDoc.getTextWidth(text);
                     pdfDoc.setFont('Helvetica', 'bold');


                     // Calculate the position to center the text at the bottom
                     const textX = (pdfDoc.internal.pageSize.width - textWidth) / 2;
                     const textY = pdfDoc.internal.pageSize.height - 5;

                     // Add the footer text
                     pdfDoc.text(text, textX, textY);
                     pdfDoc.setFont('Helvetica', 'normal');

                     // Ajouter le numéro de page formaté en bas à droite
                     const pageText = `Page ${i} / ${pageCount}`;
                     const pageTextWidth = pdfDoc.getTextWidth(pageText);

                     // Calculer la position pour aligner le texte en bas à droite
                     const pageTextX = pdfDoc.internal.pageSize.width - pageTextWidth - 15;
                     const pageTextY = pdfDoc.internal.pageSize.height - 15;

                     // Ajouter le texte du numéro de page
                     pdfDoc.text(pageText, pageTextX, pageTextY);                                
                  }

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
         }
         else {
            rapport_statistiqueService
            .getNotebooksInASpecificStock(this.filter.stock)
            .then((res) => {
               console.log(res);
               this.reportProductsByStock = res.data.data;
               this.indexSpinner = false;
 
               if (this.reportProductsByStock.length === 0) {
                  this.$toast.error("Aucune donnée trouvée!", {
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
                  pdfDoc.setFontSize(12);
                  const staticProductColumns = ["Nom commercial", "Lot", "Packaging", "Quantité", "Nb unités par boîtes", "Prix de vente"];
                  const tableProductData = [];

                  const staticProductColumnValues = Object.values(staticProductColumns);
                  const dynamicProductColumnValues = this.reportProductsByStock.map(product => [
                     product.product.name,
                     product.lot_number,
                     product.product.conditioning_unit.name,
                     product.quantity,
                     product.units_per_box,
                     product.selling_price,
                  ]);

                  const rowsProduct = dynamicProductColumnValues.map((values) => [...values]);
                  // Header settings
                  const headStyles = {
                     fillColor: [192, 192, 192],
                     textColor: [0, 0, 0],
                     fontSize: 10,
                  };

                  // Fill up the content
                  tableProductData.push(...rowsProduct);
                  // Fill the tab with data
                  pdfDoc.autoTable({
                     head: [staticProductColumnValues],
                     body: tableProductData,
                     startY: 60, 
                     theme: 'grid',
                     tableLineWidth: 0.2,
                     margin: { top: 10 },
                     styles: {
                        lineColor: [0, 0, 0],
                        fontSize: 10,
                        lineWidth: 0.2,
                        textColor: [0, 0, 0],
                     },
                     columnStyles: {
                        // 0: { align: 'left' },
                        // 1: { align: 'right' },
                        // 2: { align: 'right' },
                     },
                     headStyles: headStyles,
                  });
 
                  const pageCount = pdfDoc.internal.getNumberOfPages();

                  for (let i = 1; i <= pageCount; i++) {
                     // separate the existing content from the footer
                     pdfDoc.text('', 10, pdfDoc.internal.pageSize.height - 10);

                     pdfDoc.setPage(i);
                     // Set font size and position for the date and time
                     pdfDoc.setFont('Helvetica', 'normal');
                     pdfDoc.setFontSize(8);

                     // Get the current date and time
                     const currentDate = new Date();
                     const dateText = currentDate.toLocaleDateString();
                     const timeText = currentDate.toLocaleTimeString('en-US', { hour12: false });
                     const dateTimeText = `${dateText}\n${timeText} WAT`;

                     // Adjust the coordinates based on your preference
                     const dateX = 15;
                     const dateY = pdfDoc.internal.pageSize.height - 15; // Adjust as needed

                     // Add the date and time text to the page
                     pdfDoc.text(dateTimeText, dateX, dateY);

                     const text = 'MEDKEY version : 1.1';
                     const textWidth = pdfDoc.getTextWidth(text);
                     pdfDoc.setFont('Helvetica', 'bold');


                     // Calculate the position to center the text at the bottom
                     const textX = (pdfDoc.internal.pageSize.width - textWidth) / 2;
                     const textY = pdfDoc.internal.pageSize.height - 5;

                     // Add the footer text
                     pdfDoc.text(text, textX, textY);
                     pdfDoc.setFont('Helvetica', 'normal');

                     // Ajouter le numéro de page formaté en bas à droite
                     const pageText = `Page ${i} / ${pageCount}`;
                     const pageTextWidth = pdfDoc.getTextWidth(pageText);

                     // Calculer la position pour aligner le texte en bas à droite
                     const pageTextX = pdfDoc.internal.pageSize.width - pageTextWidth - 15;
                     const pageTextY = pdfDoc.internal.pageSize.height - 15;

                     // Ajouter le texte du numéro de page
                     pdfDoc.text(pageText, pageTextX, pageTextY);                                
                  }

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
         }
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
 .mt-3,
 .template-demo>.btn,
 .template-demo>.btn-toolbar,
 .my-3 {
   margin-top: -2rem !important;
 }
 .card-title {
   margin-bottom: 8px;
   color: #0b5d3f;
   font-size: 1.2rem;
 }
 </style>
 
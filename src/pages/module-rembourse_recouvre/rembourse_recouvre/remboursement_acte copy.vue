<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 col-md-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <h4 class=" text-white rounded p-3 text-center font-weight-bold"
              style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)">
              Interface de remboursement
            </h4>

            <!-- Dropdown pour le type de remboursement -->
            <div class="form-group">
              <label for="typeRemboursement">Type de Remboursement :</label>
              <select class="form-control" id="typeRemboursement" v-model="selectedTypeRemboursement">
                <option value="assurance">Remboursement par Assurance</option>
                <option value="medicament">Remboursement Médicament</option>
              </select>
            </div>

            <!-- Affichage conditionnel du formulaire en fonction du type de remboursement -->
            <form v-if="selectedTypeRemboursement === 'assurance'" class="forms-sample mt-3 mt-4">
              <!-- Ajout des champs demandés -->
              <div class="row">
                <div class="form-group col-lg-4 col-md-4 col-sm-12">
                  <label for="ref">Référence facture</label>
                  <input type="text" class="form-control" id="ref" name="ref" :max="today" v-model="selectedRef"
                    @input="getRefundedInvoices" />
                
                </div>
                <div class="form-group col-lg-4 col-md-4 col-sm-12">
                  <label for="date_debut_assurance">Date début assurance</label>
                  <input type="date" class="form-control" id="date_debut_assurance" name="date_debut_assurance"
                    :max="today" v-model="selectedStartDate" @input="getRefundedInvoices" />
                </div>
                <div class="form-group col-lg-4 col-md-4 col-sm-12">
                  <label for="date_fin_assurance">Date fin assurance</label>
                  <input type="date" class="form-control" id="date_fin_assurance" name="date_fin_assurance"
                    v-model="selectedEndDate" @input="getRefundedInvoices" />
                </div>
              </div>

              <!-- Champ pour le pourcentage de remboursement (affiché dynamiquement) -->
              <div v-if="selectedFacture">
                <div class="form-group">
                  <label for="pourcentageRemboursement">Pourcentage de Remboursement par l'Assurance :</label>
                  <input type="number" class="form-control" id="pourcentageRemboursement"
                    v-model="pourcentageRemboursement" />
                </div>
                <div v-if="pourcentageError" class="text-danger">Le champ pourcentage est requis.</div>
              </div>

              <!-- Tableau de résultats -->
              <div class="table-responsive py-1">
                <table id="order-listing" ref="myTableFactures" class="table table-bordered">
                  <thead>
                    <tr style="background-color: rgb(216, 218, 216)">
                      <th>#</th>
                      <th>Date</th>
                      <th>Patient</th>
                      <th>Mode paiement</th>
                      <th>Désignation</th>
                      <th style="text-align: right">Prix</th>
                      <th style="text-align: right">Qté</th>
                      <th style="text-align: right">%</th>
                      <th style="text-align: right">Mont payé</th>
                      <th style="text-align: right">Mont à rembourser</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="refundedInvoices.length === 0">
                      <td colspan="10" class="text-center">Aucune donnée correspondante trouvée.</td>
                    </tr>
                    <tr class="row-hover" v-else v-for="(refundedInvoice, index) in refundedInvoices" :key="index"
                      @click="selectFacture(refundedInvoice)">
                      <td>{{ index + 1 }}</td>
                      <td>{{ refundedInvoice.created_at }}</td>
                      <td>{{ refundedInvoice.patient_firstname }} {{ refundedInvoice.patient_lastname }}</td>
                      <td>
                        <span v-if="refundedInvoice.mode_payements_id == 1">ESPECE</span>
                        <span v-else-if="refundedInvoice.mode_payements_id == 2">MTN MOBILE MONEY</span>
                        <span v-else-if="refundedInvoice.mode_payements_id == 3">MOOV MONEY</span>
                        <span v-else-if="refundedInvoice.mode_payements_id == 4">CELTIS</span>
                        <span v-else-if="refundedInvoice.mode_payements_id == 5">CARTE BANCAIRE</span>
                        <span v-else-if="refundedInvoice.mode_payements_id == 6">CARTE CREDIT</span>
                        <span v-else-if="refundedInvoice.mode_payements_id == 7">TRESORPAY</span>
                        <span v-else-if="refundedInvoice.mode_payements_id == 8">A CREDIT</span>
                        <span v-else>-</span>
                      </td>
                      <td>{{ refundedInvoice.designation }}</td>
                      <td style="text-align: right">{{ refundedInvoice.prix }}</td>
                      <td style="text-align: right">{{ refundedInvoice.quantite }}</td>
                      <td style="text-align: right">{{ refundedInvoice.percentageassurance }}</td>
                      <td style="text-align: right">{{ refundedInvoice.amount }}</td>
                      <td style="text-align: right">{{ calculateRemboursementAmount(refundedInvoice) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Bouton "Générer Facture de Remboursement" -->
              <button class="btn btn-success" @click="genererFactureRemboursement"
                :disabled="!pourcentageRemboursement || !selectedFacture">Générer
                Facture de Remboursement</button>
            </form>
            <!-- Formuaire pour le remboursement par médicament -->
            <form v-else-if="selectedTypeRemboursement === 'medicament'" class="forms-sample mt-3 mt-4">
              <!-- Ajout des champs demandés pour le remboursement par médicament -->
              <div class="row">
                <div class="form-group col-lg-4 col-md-4 col-sm-12">
                  <label for="refMedicament">Référence facture</label>
                  <input type="text" class="form-control" id="refMedicament" name="refMedicament"
                    v-model="selectedRefMedicament" @input="getFacturesPayeesNonDestockees" />
                  <!-- Afficher le message d'erreur si la référence n'existe pas -->
                  <small v-if="showReferenceError" class="text-danger">Aucune donnée correspondante trouvée pour cette
                    référence.</small>
                </div>
              </div>


              <!-- Tableau de résultats pour le remboursement par médicament -->
              <div class="table-responsive py-1">
                <table id="order-listing" ref="myTableFactures" class="table table-bordered">
                  <thead>
                    <tr style="background-color: rgb(216, 218, 216)">
                      <th>#</th>
                      <th>Date</th>
                      <th>Patient</th>
                      <th>Mode paiement</th>
                      <th>Désignation</th>
                      <th style="text-align: right">Prix</th>
                      <th style="text-align: right">Qté</th>
                      <th style="text-align: right">Mont payé</th>
                      <th style="text-align: right">Mont à rembourser</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-if="fetchFacturesPayeesNonDestockees.length === 0">
                      <td colspan="10" class="text-center">Aucune donnée correspondante trouvée.</td>
                    </tr>
                    <tr class="row-hover" v-else
                      v-for="(fetchFacturesPayeesNonDestockee, index) in fetchFacturesPayeesNonDestockees" :key="index"
                      @click="selectFacturee(fetchFacturesPayeesNonDestockee)">
                      <td>{{ index + 1 }}</td>
                      <td>{{ fetchFacturesPayeesNonDestockee.created_at }}</td>
                      <td>{{ fetchFacturesPayeesNonDestockee.patient_firstname }}
                        {{ fetchFacturesPayeesNonDestockee.patient_lastname }}</td>
                      <td>
                        <span v-if="fetchFacturesPayeesNonDestockee.mode_payements_id == 1">ESPECE</span>
                        <span v-else-if="fetchFacturesPayeesNonDestockee.mode_payements_id == 2">MTN MOBILE MONEY</span>
                        <span v-else-if="fetchFacturesPayeesNonDestockee.mode_payements_id == 3">MOOV MONEY</span>
                        <span v-else-if="fetchFacturesPayeesNonDestockee.mode_payements_id == 4">CELTIS</span>
                        <span v-else-if="fetchFacturesPayeesNonDestockee.mode_payements_id == 5">CARTE BANCAIRE</span>
                        <span v-else-if="fetchFacturesPayeesNonDestockee.mode_payements_id == 6">CARTE CREDIT</span>
                        <span v-else-if="fetchFacturesPayeesNonDestockee.mode_payements_id == 7">TRESORPAY</span>
                        <span v-else-if="fetchFacturesPayeesNonDestockee.mode_payements_id == 8">A CREDIT</span>
                        <span v-else>-</span>
                      </td>
                      <td>{{ fetchFacturesPayeesNonDestockee.designation }}</td>
                      <td style="text-align: right">{{ fetchFacturesPayeesNonDestockee.prix }}</td>
                      <td style="text-align: right">{{ fetchFacturesPayeesNonDestockee.quantite }}</td>
                      <td style="text-align: right">{{ fetchFacturesPayeesNonDestockee.amount }}</td>
                      <td style="text-align: right">{{ fetchFacturesPayeesNonDestockee.amount_to_reimburse }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Bouton "Générer Facture de Remboursement" pour le remboursement par médicament -->
              <button class="btn btn-success" @click="genererFactureRemboursementMedicament"
                :disabled="!selectedFactureMedicament">Générer Facture de Remboursement</button>
            </form>
          </div>
          <!-- <div v-if="indexSpinner" class="spinner-border spinner-border-sm text-secocndary" style="font-size: 11px"
            role="status">
            <span class="sr-only">Loading...</span>
          </div>  -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import jsPDF from 'jspdf';
// import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { remboursementService } from "@/_services";
import logoImage from '@/assets/images/logo_ministere_sante.png';

export default {
  data() {
    return {
      selectedTypeRemboursement: 'assurance',
      selectedRefMedicament: '',
      selectedFactureMedicament: null,
      factures: [], // Assuming you have a list of invoices
      selectedRef: '',
      selectedStartDate: '',
      selectedEndDate: '',
      pourcentageRemboursement: null,
      selectedFacture: null,
      refundedInvoices: [],
      fetchFacturesPayeesNonDestockees: [],
      today: null,
      patientNames: {},
      pourcentageError: false,
      showReferenceError: false,

      // indexSpinner: false,
    };
  },
  mounted() {
    this.getRefundedInvoices(); // Fetch refunded invoices on component mount
  },
  methods: {

    calculateRemboursementAmount(refundedInvoice) {
      // Implement your logic to calculate the remboursement amount
      // For now, return 0 (you can update this part based on your requirements)
      return (this.pourcentageRemboursement / 100) * refundedInvoice.amount;
    },
    calculateTotalRemboursementAmount() {
      // Implement your logic to calculate the total remboursement amount
      // For now, return 0 (you can update this part based on your requirements)
      return this.refundedInvoices.reduce((total, product) => total + this.calculateRemboursementAmount(product), 0);
    },



    async genererFactureRemboursement() {
      event.preventDefault();

      if (this.pourcentageRemboursement !== null && this.selectedFacture !== null) {
        try {
          const pdf = new jsPDF();

          pdf.setFontSize(10);
          pdf.setFont('Helvetica', 'bold'); // Définir la police en gras
          pdf.textWithLink(
            'HZ-LA\nLOKOSSA ATHIEME',
            15,
            15,
            {
              url: '',
              underline: false,
              fontSize: 8,
              lineHeight: lineHeight / pdf.internal.scaleFactor,
            }
          );

          pdf.setFont('Helvetica', 'normal');
          const lineHeight = 8;
          pdf.textWithLink(
            'MONO - LOKOSSA\nLOKOSSA - AHOUME DEKAME\nCode postal 09 6 51 03\nEn Allant à LINK Hotel\nBenin',
            15,
            23,
            {
              url: '',
              underline: false,
              fontSize: 8,
              lineHeight: lineHeight / pdf.internal.scaleFactor,
            }
          );

          // Ajouter l'image
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
          pdf.setPage(1);
          pdf.addImage(base64Image, 'PNG', pdf.internal.pageSize.width - 85, 10, desiredWidth, desiredHeight);

          pdf.text('', 10, pdf.internal.pageSize.height - 10);

          pdf.setFont('Helvetica', 'bold');
          const title = "Ordre de remboursement";
          const titleFontSize = 22;
          const pageWidth = pdf.internal.pageSize.width;

          // Calculer la longueur du titre en unités PDF (pour la police et la taille de police spécifiées)
          const titleWidth = pdf.getStringUnitWidth(title) * titleFontSize / pdf.internal.scaleFactor;

          // Calculer la position X pour centrer le titre
          const titleX = (pageWidth - titleWidth) / 2;

          // Positionner le titre
          pdf.setFontSize(titleFontSize);
          pdf.text(title, titleX, 60);

          // Dessiner une ligne sous le titre pour le souligner
          pdf.line(titleX, 62, titleX + titleWidth, 62);
          pdf.setFontSize(12);
          // Ajouter les détails de la facture
          const patientName = `${this.selectedFacture.patient_firstname} ${this.selectedFacture.patient_lastname}`;
          const date = this.selectedFacture.created_at;
          const reference = this.selectedFacture.reference;

          pdf.text(`Patient: ${patientName}`, 15, 80);
          // pdf.text(`Date: ${date}`, 15, 87);
          pdf.text(`Référence: ${reference}`, 15, 87);

          // Ajouter le tableau de résultats
          const staticProductColumns = ["Date", "Patient", "Designation", "Prix", "Quantité", "Montant payé", "Montant à rembourser", "Pourcentage appliqué"];
          const tableProductData = [];

          const staticProductColumnValues = Object.values(staticProductColumns);
          const dynamicProductColumnValues = this.refundedInvoices.map(product => [
            product.created_at,
            `${product.patient_firstname} ${product.patient_lastname}`,
            product.designation,
            product.prix,
            product.quantite,
            product.amount,
            this.calculateRemboursementAmount(product),
            this.pourcentageRemboursement,
          ]);

          const rowsProduct = dynamicProductColumnValues.map((values) => [...values]);

          tableProductData.push(...rowsProduct);

          pdf.autoTable({
            head: [staticProductColumns],
            body: tableProductData,
            startY: 100,
            theme: 'grid',
            tableLineWidth: 0.2,
            margin: { top: 10 },
            styles: {
              lineColor: [0, 0, 0],
              fontSize: 10,
              lineWidth: 0.2,
              textColor: [0, 0, 0],
            },
          });

          // Ajouter le montant à rembourser dynamiquement
          const montantRembourser = `Montant à rembourser: ${this.calculateTotalRemboursementAmount()} FCFA`;
          pdf.text(montantRembourser, 15, pdf.autoTable.previous.finalY + 10);

          // Calculer la position pour aligner les signatures
          const signaturesY = pdf.autoTable.previous.finalY + 30;

          // // Ajouter les zones de signature
          // const caissierSignature = "Caissier : ......................................";
          // const patientSignature = "Patient : ...................................";

          // // Positionner le caissier à gauche et le patient à droite
          // const caissierSignatureX = 15;
          // pdf.text(caissierSignature, caissierSignatureX, signaturesY);

          // const patientSignatureX = pdf.internal.pageSize.width - pdf.getStringUnitWidth(patientSignature) - 60;
          // pdf.text(patientSignature, patientSignatureX, signaturesY);

          const pageCount = pdf.internal.getNumberOfPages();

          for (let i = 1; i <= pageCount; i++) {
            // separate the existing content from the footer
            pdf.text('', 10, pdf.internal.pageSize.height - 10);

            pdf.setPage(i);
            // Set font size and position for the date and time
            pdf.setFont('Helvetica', 'normal');
            pdf.setFontSize(8);

            // Get the current date and time
            const currentDate = new Date();
            const dateText = currentDate.toLocaleDateString();
            const timeText = currentDate.toLocaleTimeString('en-US', { hour12: false });
            const dateTimeText = `${dateText}\n${timeText} WAT`;

            // Adjust the coordinates based on your preference
            const dateX = 15;
            const dateY = pdf.internal.pageSize.height - 15; // Adjust as needed

            // Add the date and time text to the page
            pdf.text(dateTimeText, dateX, dateY);

            const text = 'MEDKEY version : 1.1';
            const textWidth = pdf.getTextWidth(text);
            pdf.setFont('Helvetica', 'bold');

            // Calculate the position to center the text at the bottom
            const textX = (pdf.internal.pageSize.width - textWidth) / 2;
            const textY = pdf.internal.pageSize.height - 5;

            // Add the footer text
            pdf.text(text, textX, textY);
            pdf.setFont('Helvetica', 'normal');

            // Ajouter le numéro de page formaté en bas à droite
            const pageText = `Page ${i} / ${pageCount}`;
            const pageTextWidth = pdf.getTextWidth(pageText);

            // Calculer la position pour aligner le texte en bas à droite
            const pageTextX = pdf.internal.pageSize.width - pageTextWidth - 15;
            const pageTextY = pdf.internal.pageSize.height - 15;

            // Ajouter le texte du numéro de page
            pdf.text(pageText, pageTextX, pageTextY);
          }

          // Générer le PDF
          pdf.save("facture_remboursement.pdf");

          // Mettre à jour le pourcentage après la génération réussie du PDF
          await remboursementService.updatePercentage(this.selectedFacture.id, this.pourcentageRemboursement);

          // Mettre à jour le pourcentage dans votre état local
          this.selectedFacture.pourcentageApplique = this.pourcentageRemboursement;

          // Console log pour indiquer que la mise à jour a réussi
          console.log('Pourcentage mis à jour avec succès !');
          // Réinitialiser l'état de l'erreur
          this.pourcentageError = false;

          // Réinitialiser les champs et valeurs nécessaires
          this.pourcentageRemboursement = null; // Réinitialisez à la valeur par défaut
          this.selectedFacture = null; // Réinitialisez à la valeur par défaut
          // Ajoutez d'autres réinitialisations au besoin

          // Console pour la mise à jour réussie
          console.log('Mise à jour réussie.');

        } catch (error) {
          console.error('Erreur lors de la génération du PDF :', error);
          // Afficher un message d'erreur et activer l'état de l'erreur
          this.pourcentageError = true;
        }
      } else {
        // Afficher un message d'erreur et activer l'état de l'erreur
        this.pourcentageError = true;
      }
    },

    async genererFactureRemboursementMedicament() {
      event.preventDefault();

      if (this.selectedFactureMedicament !== null) {
        try {
          const pdf = new jsPDF();

          pdf.setFontSize(10);
          pdf.setFont('Helvetica', 'bold'); // Définir la police en gras
          pdf.textWithLink(
            'HZ-LA\nLOKOSSA ATHIEME',
            15,
            15,
            {
              url: '',
              underline: false,
              fontSize: 8,
              lineHeight: lineHeight / pdf.internal.scaleFactor,
            }
          );

          pdf.setFont('Helvetica', 'normal');
          const lineHeight = 8;
          pdf.textWithLink(
            'MONO - LOKOSSA\nLOKOSSA - AHOUME DEKAME\nCode postal 09 6 51 03\nEn Allant à LINK Hotel\nBenin',
            15,
            23,
            {
              url: '',
              underline: false,
              fontSize: 8,
              lineHeight: lineHeight / pdf.internal.scaleFactor,
            }
          );

          // Ajouter l'image
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
          pdf.setPage(1);
          pdf.addImage(base64Image, 'PNG', pdf.internal.pageSize.width - 85, 10, desiredWidth, desiredHeight);

          pdf.text('', 10, pdf.internal.pageSize.height - 10);

          pdf.setFont('Helvetica', 'bold');
          const title = "Ordre de remboursement";
          const titleFontSize = 22;
          const pageWidth = pdf.internal.pageSize.width;

          // Calculer la longueur du titre en unités PDF (pour la police et la taille de police spécifiées)
          const titleWidth = pdf.getStringUnitWidth(title) * titleFontSize / pdf.internal.scaleFactor;

          // Calculer la position X pour centrer le titre
          const titleX = (pageWidth - titleWidth) / 2;

          // Positionner le titre
          pdf.setFontSize(titleFontSize);
          pdf.text(title, titleX, 60);

          // Dessiner une ligne sous le titre pour le souligner
          pdf.line(titleX, 62, titleX + titleWidth, 62);
          pdf.setFontSize(12);
          // ... (le reste du code de configuration du PDF reste inchangé)

          // Ajouter les détails spécifiques aux médicaments
          const patientName = `${this.selectedFactureMedicament.patient_firstname} ${this.selectedFactureMedicament.patient_lastname}`;
          const reference = this.selectedFactureMedicament.reference;

          pdf.text(`Patient: ${patientName}`, 15, 80);
          // pdf.text(`Date: ${date}`, 15, 87);
          pdf.text(`Référence: ${reference}`, 15, 87);
          // const medicamentDetails = `Médicament: ${this.selectedFactureMedicament.designation}`;
          // pdf.text(medicamentDetails, 15, 95);

          // Ajouter le tableau de résultats spécifique aux médicaments
          const staticMedicamentColumns = ["Date", "Patient", "Designation", "Prix", "Quantité", "Montant payé", "Montant à rembourser"];
          const tableMedicamentData = [];

          const dynamicMedicamentColumnValues = [
            this.selectedFactureMedicament.created_at,
            `${this.selectedFactureMedicament.patient_firstname} ${this.selectedFactureMedicament.patient_lastname}`,
            this.selectedFactureMedicament.designation,
            this.selectedFactureMedicament.prix,
            this.selectedFactureMedicament.quantite,
            this.selectedFactureMedicament.amount,
            this.selectedFactureMedicament.amount_to_reimburse,
          ];

          const rowsMedicament = [dynamicMedicamentColumnValues];

          tableMedicamentData.push(...rowsMedicament);

          pdf.autoTable({
            head: [staticMedicamentColumns],
            body: tableMedicamentData,
            startY: 110,
            theme: 'grid',
            tableLineWidth: 0.2,
            margin: { top: 10 },
            styles: {
              lineColor: [0, 0, 0],
              fontSize: 10,
              lineWidth: 0.2,
              textColor: [0, 0, 0],
            },
          });

          // Ajouter le montant à rembourser dynamiquement
          const montantRembourser = `Montant à rembourser: ${this.selectedFactureMedicament.amount_to_reimburse} FCFA`;
          pdf.text(montantRembourser, 15, pdf.autoTable.previous.finalY + 10);

          // Calculer la position pour aligner les signatures
          const signaturesY = pdf.autoTable.previous.finalY + 30;

          // // Ajouter les zones de signature
          // const caissierSignature = "Caissier : ......................................";
          // const patientSignature = "Patient : ...................................";

          // // Positionner le caissier à gauche et le patient à droite
          // const caissierSignatureX = 15;
          // pdf.text(caissierSignature, caissierSignatureX, signaturesY);

          // const patientSignatureX = pdf.internal.pageSize.width - pdf.getStringUnitWidth(patientSignature) - 60;
          // pdf.text(patientSignature, patientSignatureX, signaturesY);


          const pageCount = pdf.internal.getNumberOfPages();

          for (let i = 1; i <= pageCount; i++) {
            // separate the existing content from the footer
            pdf.text('', 10, pdf.internal.pageSize.height - 10);

            pdf.setPage(i);
            // Set font size and position for the date and time
            pdf.setFont('Helvetica', 'normal');
            pdf.setFontSize(8);

            // Get the current date and time
            const currentDate = new Date();
            const dateText = currentDate.toLocaleDateString();
            const timeText = currentDate.toLocaleTimeString('en-US', { hour12: false });
            const dateTimeText = `${dateText}\n${timeText} WAT`;

            // Adjust the coordinates based on your preference
            const dateX = 15;
            const dateY = pdf.internal.pageSize.height - 15; // Adjust as needed

            // Add the date and time text to the page
            pdf.text(dateTimeText, dateX, dateY);

            const text = 'MEDKEY version : 1.1';
            const textWidth = pdf.getTextWidth(text);
            pdf.setFont('Helvetica', 'bold');

            // Calculate the position to center the text at the bottom
            const textX = (pdf.internal.pageSize.width - textWidth) / 2;
            const textY = pdf.internal.pageSize.height - 5;

            // Add the footer text
            pdf.text(text, textX, textY);
            pdf.setFont('Helvetica', 'normal');

            // Ajouter le numéro de page formaté en bas à droite
            const pageText = `Page ${i} / ${pageCount}`;
            const pageTextWidth = pdf.getTextWidth(pageText);

            // Calculer la position pour aligner le texte en bas à droite
            const pageTextX = pdf.internal.pageSize.width - pageTextWidth - 15;
            const pageTextY = pdf.internal.pageSize.height - 15;

            // Ajouter le texte du numéro de page
            pdf.text(pageText, pageTextX, pageTextY);
          }
          // ... (le reste du code pour la facture reste inchangé)

          // Générer le PDF
          pdf.save("facture_remboursement_medicament.pdf");

          // Mettre à jour la facture après la génération réussie du PDF
          await remboursementService.updateFactureRemboursement(this.selectedFactureMedicament.id);

          // Mettre à jour le rembourse_effectue dans votre état local
          this.selectedFactureMedicament.rembourse_effectue = true;
          // Réinitialiser les champs et valeurs nécessaires
          this.selectedFactureMedicament = null; // Réinitialisez à la valeur par défaut
          // this.selectedRefMedicament = ""; // Vider le champ référence

          // Console pour la génération réussie
          console.log('Génération réussie.');

        } catch (error) {
          console.error('Erreur lors de la génération du PDF :', error);
          // Afficher un message d'erreur en cas d'échec
          // Vous pouvez activer l'état de l'erreur si nécessaire
        }
      } else {
        // Afficher un message d'erreur si la facture n'est pas sélectionnée
      }
    },

    selectFacture(refundedInvoice) {
      // Update the selectedFacture when a row is clicked
      this.selectedFacture = refundedInvoice;
      // Reset the pourcentageRemboursement when a new facture is selected
      this.pourcentageRemboursement = null;
    },
    getRefundedInvoices() {
      // this.indexSpinner = true;
      // Implement your logic to fetch refunded invoices based on selectedRef, selectedStartDate, and selectedEndDate
      remboursementService.getRefundedInvoices(this.selectedRef, this.selectedStartDate, this.selectedEndDate)
        .then((res) => {
          this.refundedInvoices = res.data.data;
          // this.showRefError = this.refundedInvoices.length === 0;
        }).catch((error) => {
          // Assurez-vous également de mettre à jour indexSpinner en cas d'erreur
          console.error('Erreur lors de la récupération des factures remboursées :', error);
        });
    },
    // Utilisez cette méthode pour appeler le service et mettre à jour les factures
    getFacturesPayeesNonDestockees() {
      // Appeler la méthode du service Axios avec la référence de médicament actuelle
      remboursementService.getFacturesPayeesNonDestockees(this.selectedRefMedicament)
        .then(response => {
          // Mettre à jour le tableau factures avec les données récupérées
          this.fetchFacturesPayeesNonDestockees = response.data.data;
          // Mettre à jour showReferenceError en fonction du résultat de la recherche
          this.showReferenceError = this.fetchFacturesPayeesNonDestockees.length === 0;
        })
        .catch(error => {
          // Gérer les erreurs, par exemple, afficher un message d'erreur
          console.error('Erreur lors de la récupération des factures :', error);

        });
    },
    selectFacturee(fetchFacturesPayeesNonDestockee) {
      // Update the selectedFactureMedicament when a row is clicked
      this.selectedFactureMedicament = fetchFacturesPayeesNonDestockee;
    },
  },
};
</script>

<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script> -->

<style>
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
</style>
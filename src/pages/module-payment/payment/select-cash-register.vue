<template>
  <section class="main-view">
    <div class="container-scroller">
      <Header />
      <div class="container-fluid page-body-wrapper">



        <div class="container-fluid" >
          <div class="content-wrapper">


            <div class="row ">
              <div class="col-lg-12 col-md-12 grid-margin">
                <div class="card">
                  <div class="card-body">

                    <h3 class="card-title text-white rounded p-3  text-center  "
                      style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)">
                      Liste des Factures
                    </h3>

                    <router-link to="/payement/create" class="mt-2 py-2">
                      <button type="submit" class="btn btn-success btn-medpay-green ">
                        Facturer
                      </button>
                    </router-link>

                  </div>
                </div>
              </div>
            </div>



          </div>
          <footer class="footer" style="background-color: rgb(219, 222, 225) ">
            <div class="container-fluid clearfix">
              <span class="text-dark d-block text-center text-sm-left d-sm-inline-block font-weight-bold">
                Akasi Group SARL
                <span style="color: rgb(11, 93, 63)">@{{ currentYear }}</span> all
                right reserved
              </span>
              <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-right">
                <a href="/" target="_blank" style="text-decoration: none !important">
                  <span style="text-color: rgb(11, 93, 63) !important" class="font-weight-bold">MED</span>
                  <span class="font-weight-bold" style="color: rgb(201, 31, 59)">
                    + </span><span class="font-weight-bold" style="color: rgb(255, 13, 33)">KEY</span>
                </a>
              </span>
            </div>
          </footer>
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
import { actsService } from '@/_services';
import { pourcentagePatient } from "@/_services/pourcentage_indigence_patient_services.js";
import { PriseEnChargePatientService } from "@/_services/priseenchargepatient_services.js";
import QRCode from 'qrcode';

require("datatables.net-dt");

import Header from "@/layout/partials/Header";
import Footer from "@/layout/partials/Footer";

export default {
  name: "cashRegister",
  components: {
    Header,
    Footer
  },


  data() {
    return {


    };
  },

  mounted() {



    patientService
      .getAllPatients()
      .then((res) => {
        this.patients = res.data.data;
        // console.log(this.patients);
      })



    actsService.getAllActes().then((res) => {
      this.acts = res.data.data;
    });


    factureService.getAllFatures().then((res) => {
      this.factures = res.data.data;

      console.log(res.data.user);

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
            // {
            //   extend: "csvHtml5", charset: 'utf-8', bom: true, className: 'btn btn-gray btn-sm',// Extend the excel button
            // },
            // {
            //   extend: "excelHtml5", charset: 'utf-8', bom: true, className: 'btn btn-gray btn-sm',
            // },

            // {
            //   extend: "pdfHtml5", charset: 'utf-8', bom: true, className: 'btn btn-gray btn-sm',
            //   // className: 'btn btn-primary',
            // },

            // { extend: "print", charset: 'utf-8', bom: true, className: 'btn btn-gray btn-sm', },
            // { extend: "copy", charset: 'utf-8', bom: true, className: 'btn btn-gray btn-sm', },
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


    detail(facture, index) {

      let assuranceMontant = 0;
      let indigenceMontant = 0;



      // this.payement_id = facture.reference;
      // this.mode_payements_id = facture.mode_payements_id;
      // this.patientId = facture.patient_id

      this.reference = facture.reference;

      factureService.getFacture(this.reference)
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
          this.generateQRCode(this.reference)
          const montantTotalActe = this.calculerMontantTotal();
          this.montantPaye = montantTotalActe;

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
        .catch(error => {
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




  }

};
</script>

<style scoped>
@import "../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
/* @import '../../../../node_modules/datatables.net-dt/css/jquery.dataTables.css'; */

@import "../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";

th {
  background-color: #d6dbd6;
  border: 1px solid #dee2e6;
}

.col-sm-6 p {
  margin-bottom: 2px !important;
}

table td th {
  border-top: 2px solid #ffffff;
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

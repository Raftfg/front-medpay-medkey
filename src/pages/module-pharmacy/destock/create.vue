<template>
  <section class="">

    <div class="row">

      <div class="col-md-12 grid-margin">

        <div class="card">

          <div class="card-body">

            <h4 class=" text-white rounded p-3 mb-3 text-center"
              style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)">
              Déstockage de produit
            </h4>
            <div class="col-md-12 col-lg-12 ">

              <div class="row">

                <div class="col-md-6 mt-2 col-lg-6">

                  <h4>Liste des 10 dernières factures </h4>

                </div>

                <div class="search-bar col-md-6 col-lg-6">

                  <input @input="getListBillsForsaleProduct" type="text" v-model="searchTerm"
                    placeholder="Rechercher..." />

                </div>

              </div>

            </div>



            <div class="table-responsive mt-4">

              <table id="order-listing" ref="myTableMovment" class="table table-bordered">

                <thead>

                  <tr style="background-color: rgb(203, 204, 203)">

                    <th style="width: 5%">#</th>

                    <th style="width: 15%">Date</th>

                    <th style="width: 15%">Référence</th>

                    <th>Mode</th>

                    <th style="width: 15%">N° IEP</th>

                    <th style="width: 15%">N° IPP</th>

                    <th style="width: 30%">Nom et prénom</th>

                    <th style="width: 20%">Téléphone</th>

                    <th style="text-align: right">Montant</th>

                    <th style="text-align: left">Status</th>

                  </tr>

                </thead>

                <tbody v-if="displayedMovments.length > 0">

                  <tr class="row-hover" v-for="(bill, index) in displayedMovments" :key="bill.id"
                    @click="selectRow(index, bill.reference)" :class="{ selected: selectedRow == index }">

                    <td>{{ index + 1 }}</td>

                    <td>{{ bill.created_at }}</td>

                    <td>{{ bill.reference }}</td>

                    <td>

                      <span v-if="bill.mode_payements_id == 1">ESPECE</span>

                      <span v-else-if="bill.mode_payements_id == 2">MTN MOBILE MONEY</span>

                      <span v-else-if="bill.mode_payements_id == 3">MOOV MONEY</span>

                      <span v-else-if="bill.mode_payements_id == 4">CELTIS</span>

                      <span v-else-if="bill.mode_payements_id == 5">CARTE BANCAIRE</span>

                      <span v-else-if="bill.mode_payements_id == 6">CARTE CREDIT</span>

                      <span v-else-if="bill.mode_payements_id == 7">TRESORPAY</span>

                      <span v-else>-</span>

                    </td>

                    <td>{{ bill.iep }}</td>

                    <td>{{ bill.ipp }}</td>

                    <td>{{ bill.lastname }} {{ bill.firstname }}</td>

                    <td>{{ bill.phone }}</td>

                    <td style="text-align: right">{{ formatNumberDecimal(bill.montant_total) }}</td>

                    <td>

                      <label v-if="bill.paid == 0" style="
    
                              font-size: 10px !important;
    
                              border-radius: 20px !important;
    
                              display: inline-block;
    
                              padding: 5px;
    
                            "
                        class="badge badge-gradient-danger font-weight-bold text-white text-center border-rounded ">

                        Impayée



                      </label>

                      <label v-else-if="bill.paid == 1" style="
    
                              font-size: 10px !important;
    
                              border-radius: 20px !important;
    
                              padding: 5px;
    
                            "
                        class="badge badge-gradient-success font-weight-bold text-white text-center border-rounded ">

                        Payée

                      </label>

                    </td>



                  </tr>

                </tbody>

                <tbody v-else>

                  <tr>

                    <td colspan="10" style="text-align: center">Aucune donnée trouvée</td>

                  </tr>

                </tbody>

              </table>

            </div>



            <div v-if="indexSpinner" class="spinner-border spinner-border-sm text-secocndary" style="font-size: 11px"
              role="status">

              <span class="sr-only">Loading...</span>

            </div>



            <div v-if="indexSpinnerSelecteRow" class="spinner-border spinner-border-sm text-secocndary"
              style="font-size: 11px" role="status">

              <span class="sr-only">Loading...</span>

            </div>

            <!-- ------------------------------------------details des medicaments ----------------------------------------------------------------------------------------------------->



            <div v-if="productList.length > 0 && selectedRow != -1">



              <ul class="nav nav-tabs d-flex justify-content-between" role="tablist">

                <li>

                  <button class="nav-link active font-weight-bold custom-tab" data-bs-toggle="tab" href="#tab1">

                    Détails des produits

                  </button>

                </li>

              </ul>


              <div class="tab-content">

                <div class="table-responsive tab-pane fade show active" id="tab1">

                  <span class="d-block mt-2"></span>

                  <div>

                    <div v-for="(product, index) in productList" :key="index"
                      class="d-flex flex-row mt-3 mb-1 pt-2 pb-2 pl-2 pr-2" style=" border: 0.5px solid #dbdbdb;">

                      <div class="d-flex flex-column pt-2 pb-2 pl-2 pr-2"
                        style="background-color: #F4F4F4; border: 0.5px solid #dbdbdb;">

                        <div class="d-flex flex-column" id="suppllyProductList">

                          <div class="form-group row customize-row mb-0">

                            <div class="col-md-3 pl-0 pr-2"><label class="form-label mini-label">Produits<span
                                  class="text-danger">*</span></label></div>

                            <div class="col-md-3 pl-0 pr-2"><label class="form-label mini-label">Lots<span
                                  class="text-danger">*</span></label></div>

                            <div class="col-md-3 pl-0 pr-2"><label class="form-label mini-label">Code<span
                                  class="text-danger">*</span></label></div>

                            <div class="col-md-3 pl-0 pr-2"><label class="form-label mini-label">Qté Commandée (U)<span
                                  class="text-danger">*</span></label></div>

                          </div>



                          <div class="form-group row customize-row mb-0">



                            <div class="col-md-3 pl-0 pr-2">

                              <input v-model="product.designation" type="text" class="form-control" :disabled="true"
                                required />

                            </div>



                            <div class="col-md-3 pl-0 pr-2">

                              <input v-model="product.lot_number" type="text" class="form-control" :disabled="true"
                                required />

                            </div>



                            <div class="col-md-3 pl-0 pr-2">

                              <input v-model="product.code" type="text" class="form-control" :disabled="true" required />

                            </div>



                            <div class="col-md-3 pl-0 pr-2">

                              <input v-model="product.quantite" type="number" min="1" max="100" :disabled="true"
                                class="form-control" required>

                            </div>





                            <div class="col-md-12 d-flex flex-column mt-2"
                              style="padding-left: 0px; padding-right: 0px; max-height: 75px;">

                              <div class="col-md-12 d-flex flex-row"
                                style="padding-left: 0px; padding-right: 0px;  height: 30px; max-height: 22px;">

                                <div class="col-md-3 pl-0 pr-2"><label class="form-label mini-label">Qté déstockée
                                    (U)<span class="text-danger">*</span></label></div>

                                <div class="col-md-3 pl-0 pr-2"><label class="form-label mini-label">Qté

                                    Disponible (U)</label>

                                </div>

                                <div class="col-md-3 pl-0 pr-2"><label class="form-label mini-label">Qté

                                    à déstockée (U)</label>

                                </div>

                                <div class="col-md-3 pl-0 pr-2"><label class="form-label mini-label"> Date d'exp. <span
                                      style="color: red">*</span></label></div>

                              </div>



                              <div class="col-md-12 d-flex flex-row"
                                style="padding-left: 0px; padding-right: 0px; max-height: 45px;">





                                <div class="col-md-3 pl-0 pr-2">

                                  <input v-model="product.quantity_retrieved" type="number" :disabled="true"
                                    class="form-control" required>

                                </div>



                                <div class="col-md-3 pl-0 pr-2">

                                  <input v-model="product.available_quantity" type="number" :disabled="true"
                                    class="form-control" required>

                                </div>



                                <div class="col-md-3 pl-0 pr-2">

                                  <input v-model="productList[index].quantity_to_retrieve"
                                    @input="updateFilteredProductList(index)" type="number" class="form-control" required>

                                  <span v-if="productList[index].error" class="text-danger">{{ productList[index].error

                                  }}</span>

                                </div>





                                <div class="col-md-3 pl-0 pr-2">

                                  <input v-model="product.expire_date" type="date" value="12/11/2025" class="form-control"
                                    :disabled="true" required>

                                </div>



                              </div>

                            </div>

                          </div>

                        </div>

                      </div>



                      <div class="col-md-1 d-flex flex-row justify-content-end align-items-center pl-5 pr-0"
                        style="max-width: 40px;">

                        <button class="btn btn-danger btn-sm remove remove" id="remove-0" @click="removeForm(index)"
                          style="font-size: 10px; width: 32px; height: 32px; display: flex; justify-content: center; align-items: center;"
                          type="button" name="remove">

                          <span class="fa fa-minus"></span>

                        </button>

                      </div>

                    </div>



                  </div>

                </div>

              </div>

            </div>



            <div v-if="productList.length > 0" style="margin-top: -5px">

              <div class="d-flex justify-content-end mt-0">

                <button @click="destockProduct" type="" class="btn btn-success btn-medpay-green"
                  style="padding: 8px !important; width: 150px !important">

                  Déstoker

                </button>

              </div>

            </div>



          </div>

        </div>

      </div>

    </div>

  </section>
</template>

<script>

</script>

<script type="text/javascript">
import $ from "jquery";

import * as JSZip from "jszip";
window.JSZip = JSZip;
import pdfMake from "../../../../node_modules/pdfmake/build/pdfmake";
import vfsFonts from "../../../../node_modules/pdfmake/build/vfs_fonts";
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
import Vue from 'vue';



require("datatables.net-dt");
import { format } from "date-fns";

import { momoService } from "@/_services/momos_services.js";
// import { acteMedicalService } from "@/_services/acte_medical_services.js";
import { actsService } from "@/_services/actsmedicals_services.js";
import { patientService } from "@/_services/patients_services.js";
import { pourcentagePatient } from "@/_services/pourcentage_indigence_patient_services.js";
import { PriseEnChargePatientService } from "@/_services/priseenchargepatient_services.js";

import { modePayementService } from "@/_services/mode_payement_services.js";
import { payementService } from "@/_services/payements_services.js";
import { factureService } from "@/_services/facture_services.js";
import { especeService } from "@/_services/espece_services.js";
import { fedapayService } from "@/_services/fedapay_services.js";
import { useToast, POSITION } from "vue-toastification";
import QRCode from "qrcode";
import { affectterminalService } from "@/_services";
// import html2pdf from "html2pdf.js";

import "@/asset/js/fedapay_checkout.js?v=1.1.7";
// import "@/asset/js/kkiapay.js";
import { openKkiapayWidget, addKkiapayListener, removeKkiapayListener } from "kkiapay";

// import "../../../assets/js/alertify.js";

export default {
    name: "create-payement",

    data() {
        return {
            selectedProductUuid: null,
            amount_product: 0,
            productSpecifications: {},


            /*********************/

            selectedPatient: "",
            isPrinting: false,
            modePayements: [],
            selectedCashRegister: "",
            displayedMovments: [],
            listBillsForsaleProduct: [],
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
            prisenchargePourcentage: null,
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
            totalActe: "",
            selectedRow: -1, // Index de la ligne sélectionnée (aucune ligne sélectionnée initialement)
            medicalActDetails: [], // Tableau pour stocker les détails des actes médicaux
            medicalActDetailsFacture: [],
            showModal: false,

            // pourcentageindigence:"",
            searchQuery: "",
            cashRegisterCashierCurrent: {},
            cashsHistoricalCurrent: {},
            searchQuery1: "",
            filteredProductList: [],
            user: JSON.parse(localStorage.getItem("user")),
            indexSpinner: false,
            indexSpinnerSelecteRow: false,

            anotherParamSearch: "", // Ce paramètre sera utilisé pour la requête

            actesMedicals: [], // Tableau pour stocker l'acte medical en fonction de l'id de l'acte choisi par user
            listactes: [], // Tableau pour stocker l'acte medical en fonction de l'id de l'acte choisi par user
            actesSelectionnes: [],
            medicalActDetailsFactureA: [],
            montantEspece: null,
            statusFedapay: null,

            momoData: {
                selectedOptionMode: "",
                nom: "",
                statut: "PENDING",
                prenom: "",
                telephone: "",
                montant: "",
                transaction: null,
            },

            momoDataEspece: {
                montant: "",
            },

            //  readonlyoption: 'autre',
            //  isreadonly: true,

            afficherModal: false,
            totalAmountP: 0.00,
            //selected: 'A',
            selectedOptionMode: "",

            selected: "",
            options: [
                { item: "F", name: " Feminin" },
                { item: "M", name: " Masculin" },
                //{ item: 'D', name: 'Option C', notEnabled: true },
                // { item: { d: 1 }, name: 'Option D' } this.productList.push({ mode: '', code: '', prix: '', quantite: '', montant: '' });
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

        // cette fonction est utile pour mettre à jour la quantite de chaque en fonction de l'index pour 
        // pour mettre à jour la vraiable tableau à envoyé à l'api pour le destockage.

        updateFilteredProductList(index) {

            const quantityQte = this.productList[index].quantity_to_retrieve || 0;

            const maxAvailableQuantity = this.productList[index].available_quantity || 0;

            if (quantityQte > maxAvailableQuantity) {
                // Supprimez automatiquement la quantité commandée si elle est excessive

                // this.$set(this.productList[index], 'quantity_to_retrieve', maxAvailableQuantity);

                this.$set(this.productList, index, { ...this.productList[index], quantity_to_retrieve: maxAvailableQuantity });

            } else {

                this.filteredProductList[index].quantity_to_retrieve = quantityQte;

            }

            console.log(this.filteredProductList);

        },

        getHistoricalCurrent() {
            factureService
                .getHistoricalCurrent(this.cashRegisterCashierCurrent.cash_registers_id)
                .then((res) => {
                    this.cashsHistoricalCurrent = res.data.data;
                    console.log("this.cashsHistoricalCurrent ");
                    console.log(this.cashsHistoricalCurrent);

                })
                .catch((error) => {
                    console.error(error);
                });
        },

        destockProduct() {

            const data = {

                reference_facture: this.referenceFacture,
                products: this.filteredProductList
            };

            factureService
                .destockProduct(data)
                .then((res) => {
                    this.selectedRow = -1;
                    console.log("res.data.data ");
                    console.log(res)

                    this.$toast.success("Déstockage éffectué avec succès!", {
                        position: POSITION.TOP_RIGHT,
                        timeout: 2000,
                        bodyStyle: {
                            borderRadius: "10px",
                            backgroundColor: "#f0f0f0",
                            color: "#333",
                            fontWeight: "bold",
                        },
                    });

                })
                .catch((error) => {
                    console.error(error);
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
                    this.getHistoricalCurrent();
                    // console.log("this.cashRegisterCashierCurrent" );
                    // console.log(this.cashRegisterCashierCurrent );
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        async selectRow(index, reference) {


            if (this.selectedRow === index) {
                // Si la ligne est déjà sélectionnée, désélectionnez-la
                this.selectedRow = -1;
                this.medicalActDetailsFactureP = [];
                this.productList = [];
                // this.showModal = false;
            } else {
                // Sinon, sélectionnez la ligne
                this.indexSpinnerSelecteRow = true;
                this.selectedRow = index;

                // console.log("movmentId");
                this.referenceFacture = reference;
                console.log("this.referenceFacture");
                console.log(this.referenceFacture);

                // console.log(movmentId);

                factureService
                    .getListProductByreference(this.referenceFacture)
                    .then((response) => {
                        this.indexSpinnerSelecteRow = false;

                        //liste des produits commandés et payés totalement ou partiellement
                        this.productList = response.data.data;
                        console.log("this.productList");
                        console.log(this.productList);

                        // variable à transmettre pour le destockage raison pour laquelle c'est formaté ainsi.
                        //car l\'api de stockage en a besoin
                        this.filteredProductList = this.productList.map(product => ({
                            lot_uuid: product.lots_uuid,
                            quantity_to_retrieve: product.quantity_to_retrieve,
                            quantity_ordered: product.quantite,

                        }));

                        this.movmentId = this.productList[0].movments_id

                        console.log("this.filteredProductList");
                        console.log(this.filteredProductList);

                        if (this.productList.length == 0) {
                            this.$toast.error("Aucun produit trouvé!", {
                                position: "top-right",
                                timeout: 3000,
                                style: {
                                    background: "#ff0000", // Couleur de fond rouge pour l'erreur
                                    color: "#fff", // Couleur du texte
                                    fontWeight: "bold",
                                },
                            });
                        } else {}
                        console.log(this.medicalActDetails);
                    })
                    .catch((error) => {
                        console.error(error);
                    });


            }
        },


        getListMovment() {
            factureService.getListMovment().then((res) => {
                this.listMovments = res.data.data;

                // console.log(this.listMovments);
            });
        },

        getListBillsForsaleProduct() {
            this.indexSpinner = true;
            // Si this.searchTerm est vide, obtenez les derniers mouvements par défaut.
            // Sinon, effectuez une recherche en utilisant this.searchTerm.
            const formData = { search: this.searchTerm };
            factureService
                .listBillsForsaleProduct(formData)
                .then((res) => {
                    this.indexSpinner = false;
                    this.displayedMovments = res.data.data;
                    console.log("this.displayedMovments");
                    console.log(this.displayedMovments);

                })
                .catch((error) => {
                    console.error(error);
                });
        },

        fetchModePayementDetails() {
            console.log(this.selectedOptionMode);
            if (this.selectedOptionMode == 2) {
                this.momoData.nom = this.patient.firstname;
                this.momoData.prenom = this.patient.lastname;
                this.momoData.telephone = this.patient.phone;
            }
        },

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


        },

        formaterDate(date) {
            const options = { day: "2-digit", month: "2-digit", year: "numeric" };
            const formattedDate = new Date(date).toLocaleDateString("fr-FR", options);
            const formattedTime = new Date(date).toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
            });
            return `${formattedDate} à ${formattedTime}`;
        },
        generateQRCode(reference) {
            const base = location.origin;
            reference = this.referenceFacture;
            const invoiceDetailsUrl = `${base}/facture/details/${this.referenceFacture}`;

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

        // initializeFilteredProductList() {
        //     // Initialise filteredProductList avec les données initiales
        //     this.filteredProductList = this.productList.map(product => ({

        //         lot_uuid: product.lots_uuid,
        //         quantity_to_retrieve: product.retrieve,
        //         quantity_ordered: product.quantite,
        //     }));
            
        // },

        calculateTotalMontantActe() {
            let total = 0;
            for (const form of this.productList) {
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

        calculateTotalMontant() {
            let total = 0;
            let assuranceMontant = 0;
            let indigenceMontant = 0;

            for (const form of this.productList) {
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

            for (const form of this.productList) {
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

        convertNumberToLetter(number) {
            let result = this.NumberToLetter(number);
            return result;
        },




        removeForm(index) {

            // Utiliser splice pour supprimer le formulaire à l'index spécifié

            this.productList.splice(index, 1);
            if (this.productList.length == 0) {
                this.selectedRow = -1;
            }

        },

        checkreadonly(form) {
            // console.log(form.acte);
            if (form.acte === "0") {
                // if (this.productList.some((form) => form.acte === "autre")) {
                form.readonly = false;
            } else {
                form.readonly = true;
            }
        },


    },

    computed: {
        // ...

        totalAmountActesA() {
            return this.filteredMedicalActDetailsA.reduce((total, item) => {
                return total + item.medical_acts_qte * item.medical_acts_price;
            }, 0);
        },

        totalAmountActesB() {
            return this.productList.reduce((total, item) => {
                return total + item.medical_acts_qte * item.medical_acts_price;
            }, 0);
        },
    },

    filters: {
        formatDate(value) {
            return format(value, "dd/MM/yyyy HH:mm:ss");
        },
    },

    watch: {
    //   productList: {
    //     handler: 'initializeFilteredProductList',
     
    // },

        searchTerm: function(newSearchTerm, oldSearchTerm) {
            // Si le champ de recherche est vide, appelez getListBillsForsaleProduct
            if (newSearchTerm === "") {
                this.getListBillsForsaleProduct();
            }
        },
    },



    mounted() {
        // addKkiapayListener("success", this.successHandler);
        this.getCashRegisterCashierCurrent(); // la caisse de l'utilisateur actuellement connecté
        // this.initializeFilteredProductList();


        this.getListBillsForsaleProduct();
        this.getListMovment();

        // this.fetchActesMedicals();
        $("#confirmationMOMO").on("hidden.bs.modal", () => {
            this.momoData.statut = "PENDING";
        });

        this.fetchPatients();
        // this.fetchModePayements();
    },

    beforeDestroy() {
        removeKkiapayListener("success", this.successHandler);
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

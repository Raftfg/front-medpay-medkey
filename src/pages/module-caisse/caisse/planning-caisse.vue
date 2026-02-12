<template>
  <section class="">
    <div class="row">
      <div class="col-lg-12 grid-margin tables">
        <div class="card">
          <div class="card-body">

            <h4 class=" text-white rounded p-3 mb-3 text-center"
              style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)">
              Liste des caisses planifiée
            </h4>

            <div class="mx-auto  mb-4">
              <button class="btn btn-success btn-medpay-green mr-2" data-toggle="modal" data-target="#affectCashier">
                Ajouter
              </button>
            </div>

            <div class="table-responsive mt-n3">
              <table id="myTable" ref="myTable" class=" table table-bordered zebra-table" width="100%" cellspacing="0">
                <!-- <table id="myTable2" class="table table-bordered zebra-table"> -->
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th style="width: 5%">#</th>
                    <th style="width: 25%">Date service</th>
                    <th style="width: 25%">Caisse</th>
                    <th style="width: 25%">Heure d'ouverture</th>
                    <th style="width: 25%">Heure de fermeture</th>
                    <th style="width: 45%">Caissier(e)</th>
                    <th style="width: 45%">statut</th>
                    <!-- <th style="width: 20%">Statut</th> -->
                     <th style="width: 5%" class="text-center">Actions</th> 
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(cashierCashRegister, index) in cashiersCashRegister" :key="cashierCashRegister.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ formatSimpleDate(cashierCashRegister.selected_date) }}</td>
                    <td>{{ getDetailCashregister(cashierCashRegister.cash_registers_id).designation }}</td>
                    <td>{{ formatTime(cashierCashRegister.opening_time) }}</td>
                    <td>{{ formatTime(cashierCashRegister.closing_time) }}</td>
                    <td>
                      {{ getUserInfoById(cashierCashRegister.cashier_id).name }}
                      {{ getUserInfoById(cashierCashRegister.cashier_id).prenom }}
                    </td>
                    <td>
                      <label style="font-size: 11px !important; border-radius: 20px !important"
                        class="badge font-weight-bold text-white text-center" :class="cashierCashRegister.statut == '1'
                          ? 'badge-gradient-danger'
                          : 'badge-gradient-success'
                          ">
                        {{ cashierCashRegister.statut == "1" ? "Inactif" : "Actif" }}
                      </label>
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

                          <button @click="openUpdateAffectCashier(cashierCashRegister)"
                            class="dropdown-item text-dark font-weight-bold">
                            <i class="fa fa-pencil-square-o"></i>Modifier
                          </button>
                          <hr class="m-1" />
                          <button class="dropdown-item text-danger font-weight-bold">
                            <i class="mdi mdi-delete menu-icon"></i> Supprimer
                          </button>
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


    <div class="modal fade " id="affectCashier" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog custom-modal modal-xl" role="document" style=" max-width: 800px;">

        <h4 class="card-title text-white p-3 mt-4 text-center " style="
            background-color: #0b5d3f;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-top: -17px !important;
          ">

          Planifier une caisse.
        </h4>
        <div class="modal-content" style="margin-top: -17px !important;">
          <div class="modal-body">
            <div class="col-md-12 col-lg-12">
              <form class="forms-sample" @submit.prevent="addCashCashier">
                <div class="row">
                  <div class="col-md-6 col-12">
                    <div class="form-group controls">
                      <label for="exampleFormControlSelect1">Caisses <span style="color: red">*</span></label>
                      <select v-model="selectedCasRegister" class="form-control mb-3">
                        <option value="">Sélectionner</option>
                        <option v-for="caisse in caisses" :key="caisse.id" :value="caisse.id">
                          {{ caisse.designation }}
                        </option>
                      </select>
                      <div v-if="errors.cash_registers_id && !selectedCasRegister" class="text-danger  mt-n3 mb-2">
                        {{ errors.cash_registers_id[0] }} a
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-12">
                    <div class="form-group controls">
                      <label for="exampleFormControlSelect1">Caissiers <span style="color: red">*</span></label>
                      <select v-model="selectedCashier" class="form-control mb-3">
                        <option value="" >Sélectionner</option>
                        <option v-for="cashier in cashiers" :key="cashier.id" :value="cashier.id">
                          {{ cashier.name }} {{ cashier.prenom }}
                        </option>
                      </select>
                      <div v-if="errors.cashier_id && !selectedCashier" class="text-danger  mt-n3 mb-2">
                        {{ errors.cashier_id[0] }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 col-12">
                    <div class="form-group controls">
                      <label for="openingTime">Heure d'ouverture <span style="color: red">*</span></label>
                      <input type="time" class="form-control" v-model="openingTime" id="openingTime" />
                      <div v-if="errors.opening_time && !openingTime" class="text-danger">
                        {{ errors.opening_time[0] }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-12">
                    <div class="form-group controls">
                      <label for="closingTime">Heure de fermeture <span style="color: red">*</span></label>
                      <input type="time" class="form-control" v-model="closingTime" id="closingTime" />
                      <div v-if="errors.closing_time && (closingTime == '' || closingTime === openingTime)"
                        class="text-danger">
                        {{ errors.closing_time[0] }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-6 col-12">
                    <div class="form-group controls">
                      <label for="exampleFormControlInput1">Date <span style="color: red">*</span></label>
                      <input type="date" class="form-control" v-model="selectedDate" />
                      <div v-if="errors.selected_date && !selectedDate" class="text-danger mb-2">
                        {{ errors.selected_date[0] }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-12">
                    <div class="form-group controls">
                      <label for="selectedCashier">Status <span style="color: red">*</span></label>
                      <select v-model="status" class="form-control mb-3">
                        <option value="">Sélectionner</option>
                        <option value="0">Actif</option>
                        <option value="1">Inactif</option>
                      </select>
                      <div v-if="errors.statut && !status" class="text-danger  mt-n3 mb-2">
                        {{ errors.statut[0] }}
                      </div>
                    </div>
                  </div>
                  <div v-if="indexSpinnerModal" class="spinner-border spinner-border-sm text-secocndary"
                    style="font-size: 11px" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
                <div class="d-flex justify-content-between flex-row">
                  <div>
                    <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal">
                      Fermer
                    </button>
                  </div>
                  <div class=" justify-content-end">
                    <button type="submit" class="btn btn-success btn-medpay-green">
                      Enregistrer
                    </button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="modal fade " id="updateAffectCashier" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog custom-modal modal-xl" role="document" style=" max-width: 800px;  ">

        <h4 class="card-title text-white p-3 mt-4 text-center " style="
            background-color: #0b5d3f;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-top: -17px !important;
          ">
          Modifier une plannification de caisse.
        </h4>
        <div class="modal-content" style="margin-top: -17px !important;">
          <div class="modal-body">
            <div class="col-md-12 col-lg-12">
              <form class="forms-sample" @submit.prevent="updateAffectCashier">
                <div class="row">
                  <div class="col-md-6 col-12">
                    <div class="form-group controls">
                      <label for="exampleFormControlSelect1">Caisses <span style="color: red">*</span></label>
                      <select v-model="selectedCasRegister" class="form-control mb-3">
                        <option value="">Sélectionner</option>
                        <option v-for="caisse in caisses" :key="caisse.id" :value="caisse.id">
                          {{ caisse.designation }}
                        </option>
                      </select>
                      <div v-if="errors.cash_registers_id && !selectedCasRegister" class="text-danger  mt-n3 mb-2">
                        {{ errors.cash_registers_id[0] }} a
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-12">
                    <div class="form-group controls">
                      <label for="exampleFormControlSelect1">Caissiers <span style="color: red">*</span></label>
                      <select v-model="selectedCashier" class="form-control mb-3">
                        <option value="">Sélectionner</option>
                        <option v-for="cashier in cashiers" :key="cashier.id" :value="cashier.id">
                          {{ cashier.name }} {{ cashier.prenom }}
                        </option>
                      </select>
                      <div v-if="errors.cashier_id && !selectedCashier" class="text-danger  mt-n3 mb-2">
                        {{ errors.cashier_id[0] }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6 col-12">
                    <div class="form-group controls">
                      <label for="openingTime">Heure d'ouverture <span style="color: red">*</span></label>
                      <input type="time" class="form-control" v-model="openingTime" id="openingTime" />
                      <div v-if="errors.opening_time && !openingTime" class="text-danger">
                        {{ errors.opening_time[0] }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-12">
                    <div class="form-group controls">
                      <label for="closingTime">Heure de fermeture <span style="color: red">*</span></label>
                      <input type="time" class="form-control" v-model="closingTime" id="closingTime" />
                      <div v-if="errors.closing_time && (closingTime == '' || closingTime === openingTime)"
                        class="text-danger">
                        {{ errors.closing_time[0] }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-6 col-12">
                    <div class="form-group controls">
                      <label for="exampleFormControlInput1">Date <span style="color: red">*</span></label>
                      <input type="date" class="form-control" v-model="selectedDate" />
                      <div v-if="errors.selected_date && !selectedDate" class="text-danger mb-2">
                        {{ errors.selected_date[0] }}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6 col-12">
                    <div class="form-group controls">
                      <label for="selectedCashier">Status <span style="color: red">*</span></label>
                      <select v-model="status" class="form-control mb-3">
                        <option value="">Sélectionner</option>
                        <option value="0">Actif</option>
                        <option value="1">Inactif</option>
                      </select>
                      <div v-if="errors.statut && !status" class="text-danger  mt-n3 mb-2">
                        {{ errors.statut[0] }}
                      </div>
                    </div>
                  </div>
                  <div v-if="indexSpinnerModal" class="spinner-border spinner-border-sm text-secocndary"
                    style="font-size: 11px" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
                <div class="d-flex justify-content-between flex-row">
                  <div>
                    <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal">
                      Fermer
                    </button>
                  </div>
                  <div class=" justify-content-end">
                    <button type="submit" class="btn btn-success btn-medpay-green">
                      Modifier
                    </button>
                  </div>
                </div>

              </form>
            </div>

          </div>

        </div>
      </div>
    </div>


  </section>
</template>

<script>
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

require("datatables.net-dt");
// import jsPDF from 'jspdf';
// import * as jsPDF from 'jspdf';


// import pdfdocument from "./pdfdocument.vue";



import { caisseService } from "@/_services";
import { terminalService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";
// import { paysService } from "@/_services";

export default {
  name: "caisseCreate",


  data() {
    return {

      cashiers: [],
      selectedCasRegister: "",
      status: "",
      cashiersCashRegister: [],
      indexSpinner: false,
      typeCashRegister: "",
      selectedDate: "",
      selectedCashier: "",
      uuidAllocateCashier: "",
      openingTime: "",
      closingTime: "",
      designationCaisse: "",
      descriptionCaisse: "",
      totalCash: "",
      totalCredits: "",
      caisseToOpen: null,
      caisseName: "",
      caisseID: "",
      currentDate: "",
      dynamicUserName: "KOCOU Paul",
      errors: {},
      caisses: [],
      cashiersMain: [],
      deleteIndex: null,
      deleteName: "",
      selectedCashiersMain: "",
      funds: "",
      indexSpinnerModal: false,
      user: JSON.parse(localStorage.getItem("user")),
      lastname: "",
      firstname: "",
      age: "",
      datebirth: "",
      address: "",
      terminals: [],
      deleteIndex: null,
      deleteName: "",
      table: null,
      table2: null,
      nom: "",
      Description: "",
      id: "",
      sold: "",
      phone: "",
      email: "",
      whatsapp: "",
      profession: "",
      gender: "",
      emergencycontac: "",
      autre: "",
      ipp: "",
      isUsedInInvoices: [],
      // id: "",
      uuid: "",
      // nom, prenom, age, adresse, telephone, email, whatsapp, profession, sexe, urgencecontact, autre,
    };
  },

  mounted() {

    caisseService
      .getAllCaisse()
      .then((response) => {
        // console.log(response.data.data)
        this.caisses = response.data.data;
        // console.log("Résultat des caisses de la  :");

      })

      .catch((error) => {
        console.log(error);
      });


    //liste des caissiers affectés
    this.getCashiersCashRegister();

    caisseService
      .getApprover()
      .then((response) => {
        this.cashiersMain = response.data.data;
        // console.log("user affichée");
        // console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
      });



    caisseService
      .getCashiers()
      .then((response) => {
        this.cashiers = response.data;
        // console.log("getCashiers");
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
      });
  },

  methods: {

    initializeDataTable() {
      this.$nextTick(() => {
        const table = $(this.$refs.myTable).DataTable({
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
        this.table = table;
        if (table) {
          $(table).DataTable().clear().destroy(); // Détruire DataTables s'il est déjà initialisé
          $(table).DataTable(); // Réinitialiser DataTables
        }
      });
    },


    addCashCashier() {

      this.indexSpinnerModal = true;
      const requestBody = {
        user_id: 1, // ID de l'utilisateur (valeur par défaut, à ajuster si nécessaire)
        cashier_id: this.selectedCashier, // ID du caissier (valeur par défaut, à ajuster si nécessaire)
        cash_registers_id: this.selectedCasRegister, // ID de la caisse
        selected_date: this.selectedDate,
        opening_time: this.openingTime,
        closing_time: this.closingTime,
        statut: this.status,
        is_choose: 0,

      };

      // console.log("this.selectedCashier");
      // console.log(this.selectedCashier);

      caisseService
        .affectCashier(requestBody)
        .then((response) => {
          this.indexSpinnerModal = false;

          // console.log("ajout du caissier effectué avec succes");
          // console.log(response.data.data);

          // console.log(this.cashiersCashRegister);

          this.showToast("caissier(e) affecté(e) avec succès !", "success");
          this.selectedCashier = "";
          this.selectedCasRegister = "";
          this.selectedDate = "";
          this.openingTime = "";
          this.closingTime = "";
          this.status = "";

          // $("#affectCashier").modal("hide");

          //rechargement des données
          if (this.table) {
            this.table.destroy();
          }

          this.cashiersCashRegister.push(response.data.data);
          this.$nextTick(() => {
            this.initializeDataTable();
          });

        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 422) {
            this.indexSpinnerModal = false;
            this.errors = error.response.data.errors;
            if (error.response.data.message === 'Cette affectation du caissier existe déjà.') {
              // Display the error message using the showToast function
              this.showToast('Cette affectation du caissier existe déjà.', 'error');
              this.indexSpinnerModal = false;
            }
            return;
            // this.showToast(error.response.data.message, "error");

          }
        });
    },

    // refreshTable() {

    //   this.indexSpinner = true;

    //   caisseService
    //     .getAllCashiersCashRegister()
    //     .then((response) => {
    //       this.indexSpinner = false;
    //       this.cashiersCashRegister = response.data.data;
    //       if (this.table) {
    //         this.table.destroy();
    //       }
    //       this.$nextTick(() => {
    //         this.initializeDataTable();
    //       });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       if (error.response.status == 422) {
    //         this.errors = error.response.data.errors;
    //       }
    //     });
    // },


    getCashiersCashRegister() {

      this.indexSpinner = true;

      caisseService
        .getAllCashiersCashRegister()
        .then((response) => {
          this.indexSpinner = false;
          // console.log("getAllCashiersCashRegister data");
          // console.log(response.data.data);

          this.cashiersCashRegister = response.data.data;

          // console.log("Résultat des caissiers affectés :");

          if (this.table) {
            this.table.destroy();
          }
          this.$nextTick(() => {
            this.initializeDataTable();
          });
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
        });
      // this.getCashiersCashRegister(this.caisseID);

      // $("#affectCashier").modal("show");
      // this.initializeDataTable2();
    },


    openUpdateAffectCashier(caisse) {

      // console.log("update caisse")
      // console.log(caisse)
      this.indexSpinnerModal = false;

      $("#updateAffectCashier").modal("show");
      this.selectedCashier = caisse.cashier_id;
      this.selectedCasRegister = caisse.cash_registers_id;
      this.selectedDate = caisse.selected_date;
      this.openingTime = caisse.opening_time;
      this.closingTime = caisse.closing_time;
      this.status = caisse.statut;
      this.uuidAllocateCashier = caisse.uuid;
    },

    updateAffectCashier() {

      this.indexSpinnerModal = true;
      const requestBody = {
        user_id: this.user.id,
        cashier_id: this.selectedCashier, 
        cash_registers_id: this.selectedCasRegister, // ID de la caisse
        selected_date: this.selectedDate,
        opening_time: this.formatTime(this.openingTime),
        closing_time: this.formatTime(this.closingTime),
        statut: this.status,
      };

      console.log("requestBody, this.user")
      console.log(requestBody, this.user);

      // console.log("this.selectedCashier");
      // console.log(this.selectedCashier);

      caisseService
        .updateAffectCashier(requestBody, this.uuidAllocateCashier)
        .then((response) => {
          
          
          console.log(response)
          console.log(response)

          this.indexSpinnerModal = false;
          this.showToast("Mise à jour effectuée avec succès !", "success");
          this.selectedCashier = "";
          this.selectedCasRegister = "";
          this.selectedDate = "";
          this.openingTime = "";
          this.closingTime = "";
          this.status = "";

          // $("#affectCashier").modal("hide");
          //rechargement des données

          this.getCashiersCashRegister();
          
          $("#updateAffectCashier").modal("hide");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 422) {
            this.indexSpinnerModal = false;
            this.errors = error.response.data.errors;

            // return;
            // this.showToast(error.response.data.message, "error");
          }

          if (error.response.status == 422 && error.response.data.message) {
            this.indexSpinnerModal = false;
            this.showToast(error.response.data.message, "error");
            // return;
          }

        });
    },


    getUserInfoById(id) {
      const cashier = this.cashiers.find((cashier) => cashier.id === id);

      if (cashier) {
        return {
          name: cashier.name,
          prenom: cashier.prenom,
        };
      } else {
        // Si l'id n'est pas trouvé, retournez des valeurs par défaut ou null, selon votre préférence.
        return {
          name: "Utilisateur introuvable",
          prenom: "",
        };
      }
    },

    getDetailCashregister(id) {
      const cashRegister = this.caisses.find((caisse) => caisse.id == id);

      if (cashRegister) {
        return {
          designation: cashRegister.designation,
        };
      } else {
        // Si l'id n'est pas trouvé, retournez des valeurs par défaut ou null, selon votre préférence.
        return {
          designation: "Caisse introuvable",

        };
      }
    },





    // getCurrentFormattedDate() {
    //   const now = new Date();
    //   const formattedDate = `${now.getDate()}/${now.getMonth() + 1
    //     }/${now.getFullYear()} à ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    //   return formattedDate;
    // },
    getCurrentFormattedDate() {
      const now = new Date();
      const day = now.getDate().toString().padStart(2, "0"); // Jour avec 2 chiffres
      const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Mois avec 2 chiffres
      const year = now.getFullYear();
      const hours = now.getHours().toString().padStart(2, "0"); // Heures avec 2 chiffres
      const minutes = now.getMinutes().toString().padStart(2, "0"); // Minutes avec 2 chiffres
      const seconds = now.getSeconds().toString().padStart(2, "0"); // Secondes avec 2 chiffres
      const formattedDate = `${day}/${month}/${year} à ${hours}:${minutes}:${seconds}`;
      return formattedDate;
    },


    updateCurrentDate() {
      const now = new Date();
      const day = now.getDate().toString().padStart(2, "0"); // Jour avec 2 chiffres
      const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Mois avec 2 chiffres
      const year = now.getFullYear();
      const hours = now.getHours().toString().padStart(2, "0"); // Heures avec 2 chiffres
      const minutes = now.getMinutes().toString().padStart(2, "0"); // Minutes avec 2 chiffres
      const seconds = now.getSeconds().toString().padStart(2, "0"); // Secondes avec 2 chiffres
      const formattedDate = `${day}/${month}/${year} à ${hours}:${minutes}:${seconds}`;
      this.currentDate = formattedDate;
    },




    formatDate(date) {
      const options = {
        day: "numeric",
        month: "numeric", // Utilisez 'numeric' au lieu de 'long'
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric", // Ajoutez 'second' pour afficher les secondes
      };
      return new Date(date).toLocaleString("fr-FR", options);
    },

    formatSimpleDate(date) {
      // Attempt to create a Date object
      const validDate = new Date(date);

      // Check if the newly created date is a valid date
      if (!(validDate instanceof Date) || isNaN(validDate.getTime())) {
        return 'Invalid Date';
      }
      // Get the day, month, and year
      const day = validDate.getDate();
      const month = validDate.getMonth() + 1; // Months are zero-based
      const year = validDate.getFullYear();

      // Format the date as "dd-mm-yyyy"
      const formattedDate = `${day}/${month}/${year}`;

      return formattedDate;
    },

    formatTime(time) {
      // Split the time into hours, minutes, and seconds
      const [hours, minutes] = time.split(":");

      // Format the time as "HH:mm"
      const formattedTime = `${hours}:${minutes}`;

      return formattedTime;
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
      if (type === "success") {
        this.$toast.success(message, toastOptions);
      } else if (type === "error") {
        toastOptions.bodyStyle.backgroundColor = "red"; // Changez la couleur du fond en rouge
        this.$toast.error(message, toastOptions);
      } else {
        this.$toast(message, toastOptions);
      }
    },
  },

  beforeDestroy() {
    // Arrêter de rafraîchir l'heure lorsque le composant est détruit (par exemple, lorsque le modal est fermé)
    clearInterval(this.intervalId);
  },

};
</script>

<style scoped>
@import "../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
@import "../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";

.zebra-table tbody tr:nth-child(odd) {
  background-color: white;
}

.custom-modal {
  max-width: 100%;
  width: 100%;
}

.scheduler-border {
  border: 1px solid #ddd;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  padding: 15px;
  border-radius: 5px;
}

.field-container {
  border: 1px solid #ddd;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

fieldset.scheduler-border {
  border: 1px groove #c4c3c3 !important;
  padding: 0 1.4em 1.4em 1.4em !important;
  margin: 0 0 1.5em 0 !important;
  -webkit-box-shadow: 0px 0px 0px 0px #000;
  box-shadow: 3px 4px 4px 1px #bcbcbc;
}

legend.scheduler-border {
  font-size: 1.2em !important;
  font-weight: bold !important;
  text-align: left !important;
  width: auto;
  padding: 0 10px;
  border-bottom: none;
}

div.dataTables_wrapper div.dataTables_info {
  padding-top: 0.85em !important;
  font-size: 7px !important;
}

#confirmDeleteModal .modal-dialog {
  max-width: 500px;
  border-radius: 10px;
}

#confirmDeleteModal .modal-content {
  border: none;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

#confirmDeleteModal .modal-header {
  background-color: #f8f9fa;
  border-radius: 10px 10px 0 0;
  border-bottom: none;
}

#confirmDeleteModal .close {
  font-size: 24px;
  color: #6c757d;
}

#confirmDeleteModal .alert {
  border-radius: 10px;
}

#confirmDeleteModal .alert p {
  margin-bottom: 0;
  font-weight: bold;
}

#confirmDeleteModal .modal-body {
  padding: 20px;
}

#confirmDeleteModal .modal-title {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

#confirmDeleteModal .modal-value {
  margin-bottom: 10px;
  font-size: 16px;
}

#confirmDeleteModal .modal-footer {
  border-top: none;
  background-color: #f8f9fa;
  border-radius: 0 0 10px 10px;
}

#confirmDeleteModal .btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

#confirmDeleteModal .btn-danger:hover,
#confirmDeleteModal .btn-danger:focus {
  background-color: #c82333;
  border-color: #bd2130;
}


table th,
td {
  text-align: left;
}

.text-bold {
  font-weight: bold;
}

.table-bordered {
  border: 1px solid #b6b9bb;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #b6b9bb;
}

.btn-connexion-green {
  border: 3px solid rgb(11, 93, 63) !important;

  box-shadow: none !important;
  font-weight: 700 !important;
  /* font-size: 16px !important; */
  color: white !important;
  background-color: rgb(35, 101, 171);

  /* Ajustez la taille du texte selon vos préférences */
  /* padding: 0.685rem 0.49rem !important; */
}

.btn-connexion-green:hover {
  /* Changez la couleur de fond au survol */
  /* color: rgb(11, 93, 63) !important; */
  color: rgb(11, 93, 63) !important;
  background-color: #ffffff !important;
  /* Par exemple, une couleur de fond différente au survol */
}

select {
  height: 45px !important;
}

.form-group {
  margin-bottom: -2%;
}

/* .modal-body {
  display: flex;
  flex-direction: column;
}
.row {
  display: flex;
  justify-content: space-between;
}
.col-sm-6 {
  display: flex;
  justify-content: flex-end;
}
.col-md-6 {
  flex: 0;
} */
</style>

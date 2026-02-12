<template>
  <section class="">
    <div class="row">
      <div class="col-lg-12 grid-margin tables">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-3 text-center"
              style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)">
              Liste des caisses
            </h3>
      
            <fieldset class="scheduler-border">
              <legend class="scheduler-border" style="font-size: medium !important">
                Ajouter une caisse
              </legend>

              <form class="forms-sample mt-2" @submit.prevent="addCashRegister">
                <div class="row col-md-12 col-lg-12">
                  <div class="col-lg-5 col-md-6 col-sm-12">
                    <div class="form-group">
                      <label for="designation">Désignation <span style="color: red">*</span>
                      </label>
                      <input v-model="designationCaisse" type="text" class="form-control" id="designation"
                        name="designation" placeholder="Désignation" />

                      <div v-if="errors.designation" class="text-danger">
                        {{ errors.designation[0] }}
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-5 col-md-6 col-sm-12">
                    <div class="form-group">
                      <label for="description">Description <span style="color: red">*</span></label>
                      <input v-model="descriptionCaisse" type="text" class="form-control" id="description"
                        placeholder="Description" name="date_fin" />
                      <div v-if="errors.description" class="text-danger">
                        {{ errors.description[0] }}
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-2 col-md-2 col-sm-12">
                    <div class="form-group mt-4">
                      <button type="submit" class="btn btn-success btn-medpay-green btn-block">
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </fieldset>

            <!-- <div class="table-responsive mt-n3  col-md-12 col-lg-12"> -->
            <div class="table-responsive mt-n3">
              <table id="myTable" ref="myTable" class="table table-bordered" width="100%" cellspacing="0">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th style="width: 5%">#</th>
                    <th style="width: 25%">Caisse</th>
                    <th style="width: 30%">Description</th>
                    <!-- <th style="width: 25%;">Caissier(e) Affecté(e)</th> -->
                    <th style="width: 10%">Fonds de Caisse</th>
                    <th style="width: 10%">Solde Caisse</th>
                    <th style="width: 10%">Total crédits</th>
                    <th style="width: 5%">Statut</th>
                    <th style="width: 5%" class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(caisse, index) in caisses" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ caisse.designation }}</td>
                    <td>{{ caisse.description }}</td>
                    <td>{{ caisse.fonds }}</td>
                    <td> {{ caisse.solde }} </td>
                    <td>{{ caisse.credits }}</td>
                    <td>
                      <label style="font-size: 11px !important; border-radius: 20px !important"
                        class="badge font-weight-bold text-white text-center" :class="caisse.statut == '1'
                          ? 'badge-gradient-danger'
                          : 'badge-gradient-success'
                          ">
                        {{ caisse.statut == "1" ? "Fermée" : "Ouverte" }}
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
                          <button v-if="caisse.statut == '1'" class="dropdown-item text-success font-weight-bold"
                            @click="openCashier(caisse)">
                            <i class="mdi mdi-open-in-new"></i> Ouverture
                          </button>

                          <button class="dropdown-item font-weight-bold" @click="affectCashier(caisse)">
                            <i class="mdi mdi-account-check"></i> Attribuer utilisateur
                          </button>

                          <button v-if="caisse.statut == '0'" class="dropdown-item text-danger font-weight-bold"
                            @click="closeCashier(caisse)">
                            <i class="mdi mdi-close-circle"></i> Fermeture
                          </button>

                          <button class="dropdown-item font-weight-bold" @click="allocateFunds(caisse)">
                            <i class="mdi mdi-database-plus"></i> Attribuer fonds
                          </button>
                          <button v-if="caisse.statut == '1'" class="dropdown-item text-info font-weight-bold"
                            @click="transfertCashier(caisse)">
                            <i class="mdi mdi-transfer"></i> Transfert de caisse
                          </button>

                          <hr class="m-1" />
                    
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="openCashier" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <h4 class="card-title text-white p-3 text-center col-12"
          style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)">
          Ouverture de caisse
        </h4>

        <div class="modal-content" style="margin-top: -17px !important">
          <div class="modal-body">
            <p class="font-weight-bold">Confirmer l'ouverture de cette caisse.</p>
            <hr class="m-2" style="border: 1px solid rgb(207, 207, 207)" />
            <p class="font-weight-bold" style="text-transform: uppercase">
              {{ caisseName }}
            </p>
            <p class="font-weight-bold">Ouverture : {{ currentDate }}</p>
            <p class="font-weight-bold">Utilisateur : DOSSOU Paul.</p>
          </div>

          <div class="modal-footer">
            <div class="d-flex justify-content-between col-12 flex-row">
              <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal">
                Annuler
              </button>

              <button @click="confirmOpenCashier" class="btn btn-success btn-medpay-green">
                Confirmer
              </button>
              <!-- <button @click="cancel"  class="btn btn-secondary btn-medpay-gray ">Annuler</button> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="closeCashier" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <h4 class="card-title text-white p-3 mt-4 text-center col-12" style="
            background-color: #0b5d3f;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-top: -17px !important;
          ">
          Fermeture de caisse
        </h4>

        <div class="modal-content" style="margin-top: -17px !important">
          <div class="modal-body">
            <p class="font-weight-bold">Confirmer la fermeture de cette caisse.</p>
            <hr class="m-2" style="border: 1px solid rgb(207, 207, 207)" />
            <p class="font-weight-bold" style="text-transform: uppercase">
              {{ caisseName }}
            </p>
            <p class="font-weight-bold">Ouverture : {{ currentDate }}</p>
            <p class="font-weight-bold">Utilisateur : ABADA jean.</p>
          </div>
          <div class="modal-footer">
            <div class="d-flex justify-content-between col-12 flex-row">
              <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal">
                Annuler
              </button>

              <button @click="confirmCloseCashier" class="btn btn-success btn-medpay-green">
                Confirmer
              </button>
              <!-- <button @click="cancel"  class="btn btn-secondary btn-medpay-gray ">Annuler</button> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="affectCashier" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog custom-modal" role="document">
        <h4 class="card-title text-white p-3 mt-4 text-center col-12" style="
            background-color: #0b5d3f;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-top: -17px !important;
          ">
          Attribuer un caissier(e).
        </h4>
        <div class="modal-content" style="margin-top: -17px !important">
          <div class="modal-body">
            <div class="col-md-12 col-lg-12">
              <form class="forms-sample row" @submit.prevent="addCashCashier">
                <div class="col-md-9 col-9">
                  <div class="form-group controls">
                    <label for="exampleFormControlSelect1">Caissiers <span style="color: red">*</span></label>
                    <select v-model="selectedCashier" class="form-control mb-3" id="exampleFormControlSelect1">
                      <option value="">Sélectionner</option>
                      <option v-for="cashier in cashiers" :key="cashier.id" :value="cashier.id">
                        {{ cashier.name }} {{ cashier.prenom }}
                      </option>
                    </select>
                    <div v-if="errors.selectedCashier" class="text-danger">
                      {{ errors.selectedCashier[0] }}
                    </div>
                  </div>
                </div>
                <div class="col-lg-3 col-md-3 col-sm-12">
                  <div class="form-group mt-4" style="margin-left: -20px !important">
                    <button type="submit" class="btn btn-success btn-medpay-green btn-bloc"
                      style="width: 170px !important">
                      Enregistrer
                    </button>
                  </div>
                </div>
              </form>
            </div>

            <div class="table-responsive col-md-12 col-lg-12">
              <table id="myTable2" ref="myTable2" class=" table table-bordered zebra-table" width="100%" cellspacing="0">
                <!-- <table id="myTable2" class="table table-bordered zebra-table"> -->
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th style="width: 5%">#</th>
                    <th style="width: 25%">Date</th>
                    <th style="width: 45%">Caissier(e) Affecté(e)</th>

                    <!-- <th style="width: 20%">Statut</th> -->
                    <th style="width: 5%" class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="caissier in cashiersCashRegister" :key="caissier.id">
                    <td>{{ caissier.id }}</td>
                    <td>{{ formatDate(caissier.created_at) }}</td>
                    <td>
                      {{ getUserInfoById(caissier.cashier_id).name }}
                      {{ getUserInfoById(caissier.cashier_id).prenom }}
                    </td>

                    <!-- <td>
                      <label style="font-size: 11px !important; border-radius: 20px !important"
                        class="badge font-weight-bold text-white text-center" :class="caissier.statut == '1'
                          ? 'badge-gradient-danger'
                          : 'badge-gradient-success'
                          ">
                        {{ caissier.statut == "1" ? "Inactif" : "Actif" }}
                      </label>
                    </td> -->

                    <td class="" width="50px">
                      <div class="btn-group btn-group-sm" role="group">
                        <button id="btnGroupDrop1" type="" style="padding: 0px 10px" class="btn btn-light dropdown-toggle"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          &nbsp;
                          <i class="fa fa-tasks" aria-hidden="true"></i> &nbsp;
                        </button>
                        <div class="dropdown-menu action-button-div" aria-labelledby="btnGroupDrop1"
                          style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%)">
                          <button class="dropdown-item font-weight-bold" @click="openCashier(caissier)">
                            <i class="mdi mdi-eye menu-icon"></i> Détail Uitlisateur
                          </button>

                          <button class="dropdown-item font-weight-bold" @click="closeCashier">
                            <i class="mdi mdi-account-multiple-plus"></i> Patients
                            facturés
                          </button>

                          <!-- <button class="dropdown-item font-weight-bold">
                            <i class="mdi mdi-database-plus"></i> Statut (<span class="text-danger">Inactif</span>)
                          </button> -->

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
          </div>
          <div class="modal-footer">
            <div class="d-flex justify-content-between col-md-12 col-lg-12 flex-row mt-n3">
              <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal" style="width: 170px !important">
                Fermer
              </button>

              <!-- <button type="submit" class="btn btn-success btn-medpay-green">
                Affecter
              </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="allocateFunds" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <h4 class="card-title text-white p-3 mt-4 text-center col-12" style="
            background-color: #0b5d3f;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-top: -17px !important;
          ">
          Attribuer un fonds de caisse.
        </h4>
        <div class="modal-content" style="margin-top: -17px !important">
          <div class="modal-body">
            <form class="forms-sample row" @submit.prevent="addFundCashRegister">
              <div class="col-md-12 ">
                <!-- 
                <div class="form-group controls">
                  <label for="exampleFormControlSelect1">Caisses
                  </label>
                  <select class="form-control mb-3" id="exampleFormControlSelect1">
                    <option value="">Selectionner</option>
                    <option value="1">Caisse Prestation </option>
                    <option value="2">Caisse Pharmacie </option>
                  </select>
                </div> -->

                <div class="form-group">
                  <label for="inputField1" style="color: black !important">Montant</label>
                  <input v-model="funds" type="text" class="form-control" id="inputField1"
                    placeholder="Fonds de caisse" />
                  <div v-if="errors.funds" class="text-danger">
                    {{ errors.funds[0] }}
                  </div>
                </div>

                <div class=" modal-footer form-group mt-2 d-flex justify-content-between col-12 flex-row">
                  <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal">
                    Annuler
                  </button>

                  <button type="submit" class="btn btn-success btn-medpay-green">
                    Enregistrer
                  </button>
                </div>
              </div>
              <!-- 
              <div class="mx-auto">
                <b-button class="btn btn-success btn-medpay-green " size="sm" @click="ajouterSignataire" v-b-tooltip.hover
                  title="Ajouter" variant="success">
                  Affecter
                </b-button>
              </div> -->
              <!-- <div class=" mx-auto d-flex justify-content-between col-12 flex-row">
                <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal">
                  Annuler
                </button>

                <button type="submit" class="btn btn-success btn-medpay-green">
                  Ajouter
                </button>
              </div> -->
            </form>
          </div>
          <!-- <div class="modal-footer">

          </div> -->
        </div>
      </div>
    </div>

    <div class="modal fade" id="transfertCashier" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <h4 class="card-title text-white p-3 mt-4 text-center col-12" style="
            background-color: #0b5d3f;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-top: -17px !important;
          ">
          Effectuer un transfert de caisse.
        </h4>
        <div class="modal-content" style="margin-top: -17px !important">
          <div class="modal-body">
            <form class="forms-sample row" @submit.prevent="addCashRegisterTransfert">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="inputField1" style="color: black !important">Caisse :</label>
                  <input type="text" class="form-control" :value="caisseName" id="inputField1" disabled
                    placeholder="Caisse Prestation" />
                </div>

                <div class="form-group mt-4">
                  <label for="inputField1" style="color: black !important">Total cash :</label>
                  <input type="text" :value="totalCash" class="form-control" id="inputField1" disabled
                    placeholder="Total cash à transférer" />
                </div>

                <div class="form-group mt-4">
                  <label for="inputField1" style="color: black !important">Total crédits :</label>
                  <input type="text" :value="totalCredits" class="form-control" id="inputField1" disabled
                    placeholder="Total crédits à transférer" />
                </div>

                <!-- <div class="form-group">
                  <label for="inputField1" style="color: black !important">Total :</label>
                  <input type="text" class="form-control" id="inputField1" disabled placeholder="Total " />
                </div> -->

                <div class="form-group controls mt-4 ">
                  <label for="exampleFormControlSelect1">Approbateur <span style="color: red">*</span></label>
                  <select v-model="selectedCashiersMain" class="form-control mb-3">
                    <option value="">Sélectionner</option>
                    <option v-for="cashier in cashiersMain" :key="cashier.id" :value="cashier.id">
                      {{ cashier.name }} {{ cashier.prenom }}
                    </option>
                  </select>
                  <!-- <p>{{ cashiersMain[0].name }}</p> -->
                  <!-- <div v-if="errors.selectedCashier" class="text-danger">
                      {{ errors.selectedCashier[0] }}
                    </div> -->
                </div>

                <div class="modal-footer">
                  <div class=" modal-footer form-group   d-flex justify-content-between col-12 flex-row">
                    <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal">
                      Annuler
                    </button>

                    <button type="submit" class="btn btn-success btn-medpay-green">
                      Transferer
                    </button>
                  </div>

                </div>
              </div>

            </form>
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

require("datatables.net-dt");


import { caisseService } from "@/_services";
import { terminalService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";
// import { paysService } from "@/_services";

export default {
  name: "caisseCreate",
  data() {
    return {

      cashiers: [],
      cashiersCashRegister: [],
      selectedCashier: "",
      uuidCashRegister: "",
      designationCaisse: "",
      descriptionCaisse: "",
      totalCash: "",
      totalCredits: "",
      caisseToOpen: null, // Pour stocker les informations de la caisse à ouvrir
      caisseName: "", // Initialisation avec la valeur par défaut
      caisseID: "", // Initialisation avec la valeur par défaut
      currentDate: "", // Initialisation avec la valeur par défaut
      dynamicUserName: "KOCOU Paul", // Initialisation avec la valeur par défaut

      errors: {},

      caisses: [],
      cashiersMain: [],
      deleteIndex: null,
      deleteName: "",
      selectedCashiersMain: "",
      funds: "",

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
      // id: "",
      uuid: "",
      // nom, prenom, age, adresse, telephone, email, whatsapp, profession, sexe, urgencecontact, autre,
    };
  },

  mounted() {

    caisseService
      .getApprover()
      .then((response) => {
        this.cashiersMain = response.data.data;
        console.log("user affichée");
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
      });

    this.loadMyTable();

    caisseService
      .getCashiers()
      .then((response) => {
        this.cashiers = response.data.data;
        console.log(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
      });


  },

  methods: {


    // getSolde(caisseID) {
    //   caisseID = 1
    //   caisseService.getSolde(caisseID)
    //     .then((response) => {
    //       console.log("le solde est :")
    //       console.log(response.data.data)

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

    getSoldeForCaisse(caisseID) {
      return caisseService.getSolde(caisseID)
        .then((response) => {
          return response.data.data;
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
          return 0; // En cas d'erreur, retournez 0 ou une valeur par défaut
        });
    },


    affectCashier(caisse) {
      // this.caisseToOpen = caisse;
      this.caisseID = caisse.id;

      caisseService
        .getCashiersCashRegister(this.caisseID)
        .then((response) => {
          console.log(response.data.data);
          this.cashiersCashRegister = response.data.data;
          console.log("Résultat des caissiers de la  :", this.cashiersCashRegister);

          if (this.table2) {
            this.table2.destroy();
          }
          this.$nextTick(() => {
            this.initializeDataTable2();
          });
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
        });
      // this.getCashiersCashRegister(this.caisseID);

      $("#affectCashier").modal("show");
      // this.initializeDataTable2();
    },

    initializeDataTable2() {
      this.$nextTick(() => {
        const table = $(this.$refs.myTable2).DataTable({
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
        this.table2 = table;

        if (table) {
          $(table).DataTable().clear().destroy(); // Détruire DataTables s'il est déjà initialisé
          $(table).DataTable(); // Réinitialiser DataTables
        }
      });
    },

    addFundCashRegister() {

      caisseService
        .addFund(this.uuidCashRegister, this.funds)
        .then((response) => {
          console.log("Fonds attribué");
          console.log(response.data.data);

          this.showToast("Fonds de caisse ajouté avec succès !", "success");
          $("#allocateFunds").modal("hide");

          if (this.table) {
            this.table.destroy();
          }
          this.loadMyTable();
        })

        .catch((error) => {
          console.log(error);
          if (this.funds == "") {

            this.$toast.error(
              "Veuillez saisir un fonds de caisse!",
              {
                position: "top-right",
                timeout: 3000,
                style: {
                  background: "#ff0000", // Couleur de fond rouge pour l'erreur
                  color: "#fff", // Couleur du texte
                  fontWeight: "bold",
                },
              }
            );
          }
          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
            this.showToast(error.response.data.message, "error");
          }

        });
    },


    addCashCashier() {
      const requestBody = {
        user_id: 1, // ID de l'utilisateur (valeur par défaut, à ajuster si nécessaire)
        cashier_id: this.selectedCashier, // ID du caissier (valeur par défaut, à ajuster si nécessaire)
        cash_registers_id: this.caisseID, // ID de la caisse
        statut: 1, // Statut (0 pour activé, 1 pour desactivé)
      };

      caisseService
        .affectCashier(requestBody)
        .then((response) => {
          console.log("ajout du caissier effectué avec succes");
          console.log(response.data.data);

          console.log(this.cashiersCashRegister);

          this.showToast("caissier(e) affecté(e) avec succès !", "success");
          // $("#affectCashier").modal("hide");
          if (this.table2) {
            this.table2.destroy();
          }

          this.cashiersCashRegister.push(response.data.data);
          this.$nextTick(() => {
            this.initializeDataTable2();
          });

        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
            this.showToast(error.response.data.message, "error");
          }
        });
    },


    getCashiersCashRegister() {
      caisseService
        .getCashiersCashRegister(this.caisseID)
        .then((response) => {
          console.log(response.data.data);
          this.cashiersCashRegister = response.data.data;
          console.log("Résultat des caissiers de la  :", this.cashiersCashRegister);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
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


    // loadMyTable() {
    //   caisseService.getAllCaisse().then((res) => {
    //     this.caisses = res.data.data;

    //     // console.log(this.caisses);
    //     this.$nextTick(() => {
    //       const table = $(this.$refs.myTable).DataTable({
    //         // dom: '<"html5buttons"B>lTfgtip',
    //         dom:
    //           '<"row mb-3"<"col-md-12"B>>' +
    //           '<"row mb-0"<"col-md-6"l><"col-md-6"f>>' +
    //           '<"row"<"col-md-12"tr>>' +
    //           '<"row"<"col-md-6"i><"col-md-6"p>>',

    //         // dom: 'Bfrtip',
    //         pageLength: 10, // Définir le nombre de résultats par page
    //         language: FrenchTranslation,
    //         buttons :[

    //         ],

    //       });
    //     });
    //     table.buttons().container().prependTo("#myTable_wrapper .col-md-6:eq(0)");
    //   })

    //     .catch((error) => {
    //       console.log(error);
    //       console.log(error.response);

    //     });

    // },

    loadMyTable() {
      caisseService
        .getAllCaisse()
        .then((res) => {
          this.caisses = res.data.data;
          this.$nextTick(() => {
            this.initializeDataTable();
          });
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response);
        });
    },


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

    openCashier(caisse) {
      this.caisseToOpen = caisse; // Stockez les informations de la caisse sélectionnée
      this.caisseName = caisse.designation;
      // this.currentDate = this.getCurrentFormattedDate();
      this.updateCurrentDate(); // Appel initial pour afficher l'heure actuelle

      $("#openCashier").modal("show");
      // Rafraîchir l'heure chaque seconde
      this.intervalId = setInterval(() => {
        this.updateCurrentDate();
      }, 1000);
      // const table = $(this.$refs.myTable).DataTable();
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

    confirmOpenCashier() {

      if (this.caisseToOpen) {
        const requestBody = {
          user_id: 1, // ID de l'utilisateur (valeur par défaut, à ajuster si nécessaire)
          cashier_id: 1, // ID du caissier (valeur par défaut, à ajuster si nécessaire)
          cash_registers_id: this.caisseToOpen.id, // ID de la caisse
          fonds: this.caisseToOpen.fonds,
          solde: this.caisseToOpen.solde,
          credits: this.caisseToOpen.credits,
          statut: 0, // Statut (0 pour ouvert, 1 pour fermé)
        };

        caisseService
          .openCloseCashRegister(requestBody)
          .then((response) => {
            console.log(response.data.data);

            // $('#openCashier').modal('hide');

            $("#openCashier").modal("hide");

            this.showToast("Ouverture de la caisse effectuée avec succès !", "success");

            if (this.table) {
              this.table.destroy();
            }

            this.loadMyTable();
          })
          .catch((error) => {
            console.log(error);
            console.log(error.response);
            console.error("Erreur lors de l'ouverture  de la caisse", error);
          });
      }
    },

    confirmCloseCashier() {
      if (this.caisseToOpen) {
        const requestBody = {
          user_id: 1, // ID de l'utilisateur (valeur par défaut, à ajuster si nécessaire)
          cashier_id: 1, // ID du caissier (valeur par défaut, à ajuster si nécessaire)
          cash_registers_id: this.caisseToOpen.id, // ID de la caisse
          fonds: this.caisseToOpen.fonds,
          solde: this.caisseToOpen.solde,
          credits: this.caisseToOpen.credits,
          statut: 1, // Statut (0 pour ouvert, 1 pour fermé)
        };

        caisseService
          .openCloseCashRegister(requestBody)
          .then((response) => {
            console.log(response.data.data);

            // $('#openCashier').modal('hide');

            $("#closeCashier").modal("hide");

            this.showToast("Fermeture de la caisse effectuée avec succès !", "success");

            if (this.table) {
              this.table.destroy();
            }
            this.loadMyTable();
          })
          .catch((error) => {
            console.log(error.response);
            console.error("Erreur lors de l'fermeture  de la caisse", error);
          });

        // Faites une requête Axios pour ouvrir la caisse en utilisant this.caisseToOpen
        // Assurez-vous d'inclure l'ID de la caisse et d'autres données nécessaires
        // Une fois la requête terminée avec succès, fermez le modal
      }
    },

    closeCashier(caisse) {
      this.caisseToOpen = caisse; // Stockez les informations de la caisse sélectionnée
      this.caisseName = caisse.designation;
      // this.currentDate = this.getCurrentFormattedDate();
      this.updateCurrentDate(); // Appel initial pour afficher l'heure actuelle

      $("#closeCashier").modal("show");
      // Rafraîchir l'heure chaque seconde
      this.intervalId = setInterval(() => {
        this.updateCurrentDate();
      }, 1000);
    },



    allocateFunds(caisse) {
      this.uuidCashRegister = caisse.uuid;

      console.log("caisse uuid");
      console.log(this.uuidCashRegister);
      $("#allocateFunds").modal("show");
    },
    // forceCloseCashier() {
    //   $("#forceCloseCashier").modal("show");
    // },

    transfertCashier(caisse) {

      this.caisseToOpen = caisse;
      this.totalCash = parseInt(this.caisseToOpen.solde) + parseInt(this.caisseToOpen.fonds);
      this.totalCredits = this.caisseToOpen.credits;
      this.caisseName = caisse.designation;

      $("#transfertCashier").modal("show");
    },

    openCloseCashRegister() {
      const cashRegister = {
        designation: this.designationCaisse,
        description: this.descriptionCaisse,
      };

      caisseService
        .addCashRegister(cashRegister)
        .then((response) => {
          console.log(response.data.data);
          console.log("Résultat de l'ajout de la  :", response.data.data);

          this.errors = {};
          this.showToast("Caisse ajoutée avec succès !", "success");
          this.designationCaisse = "";
          this.descriptionCaisse = "";

          if (this.table) {
            this.table.destroy();
          }

          this.caisses.push(response.data.data); // Suppose que la réponse contient la nouvelle caisse
          this.$nextTick(() => {
            this.initializeDataTable();
          });
          // Réinitialisez les champs du formulaire


          // this.resetForm();

          // this.$router.push("/compagnie/list");
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 422) {
            // La validation a échoué, mettez à jour this.errors avec les erreurs appropriées.
            this.errors = error.response.data.errors;
          }
        });
    },

    // addCashRegister() { // fonction pour ajouter une caisse
    //   const cashRegister = {
    //     designation: this.designationCaisse,
    //     description: this.descriptionCaisse,
    //   };

    //   caisseService
    //     .addCashRegister(cashRegister)
    //     .then((response) => {
    //       console.log(response.data.data);
    //       console.log("Résultat de l'ajout de la  :", response.data.data);

    //       this.caisses.push(response.data.data); // Suppose que la réponse contient la nouvelle caisse
    //       // Réinitialisez les champs du formulaire
    //       this.designationCaisse = "";
    //       this.descriptionCaisse = "";

    //       // this.resetForm();
    //       this.errors = {};
    //       this.showToast("Caisse ajoutée avec succès !", "success");
    //       // this.$router.push("/compagnie/list");

    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       if (error.response.status == 422) {
    //         // La validation a échoué, mettez à jour this.errors avec les erreurs appropriées.
    //         this.errors = error.response.data.errors;
    //       }
    //     });
    // },

    addCashRegister() {
      const cashRegister = {
        designation: this.designationCaisse,
        description: this.descriptionCaisse,
      };

      caisseService
        .addCashRegister(cashRegister)
        .then((response) => {
          console.log(response.data.data);
          console.log("Résultat de l'ajout de la  :", response.data.data);

          // Mise à jour du tableau de données avec la nouvelle caisse
          if (this.table) {
            this.table.destroy();
          }

          this.caisses.push(response.data.data);

          this.$nextTick(() => {
            this.initializeDataTable();
          });


          // Réinitialisez les champs du formulaire
          this.designationCaisse = "";
          this.descriptionCaisse = "";
          this.errors = {};
          this.showToast("Caisse ajoutée avec succès !", "success");

          // Rafraîchissez la table DataTable pour refléter les nouvelles données
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
        });
    },

    addCashRegisterTransfert() {

      console.log(" this.selectedCashiersMain");
      console.log(this.selectedCashiersMain);
      const requestBody = {
        user_id: 1,
        cashier_id: 1,
        cash_registers_id: this.caisseToOpen.id,
        approver_id: this.selectedCashiersMain,
        fonds: this.caisseToOpen.fonds,
        solde: this.caisseToOpen.solde,
        credits: this.caisseToOpen.credits,
        statut: 0,
        is_synced: 0,

      };

      caisseService
        .cashRegisterTransfert(requestBody)
        .then((response) => {
          console.log(response.data.data);
          console.log("Résultat de l'ajout de la  :", response.data.data);

          // Mise à jour du tableau de données avec la nouvelle caisse
          if (this.table) {
            this.table.destroy();
          }

          this.caisses.push(response.data.data);

          this.$nextTick(() => {
            this.initializeDataTable();
          });


          // Réinitialisez les champs du formulaire
          this.errors = {};
          this.showToast("Transfert éffectué avec succès !", "success");

          // Rafraîchissez la table DataTable pour refléter les nouvelles données
        })
        .catch((error) => {
          console.log(error);
          if (this.selectedCashiersMain == "") {

            this.showToast("Veuillez sélectionner un approbateur", "error");
          }
          if (error.response.status == 422) {
            this.errors = error.response.data.errors;
          }
        });
    },


    // getCashiersCashRegister() {
    //   caisseService
    //     .getCashiersCashRegister(this.caisseID)
    //     .then((response) => {
    //       console.log(response.data.data);
    //       this.cashiersCashRegister = response.data.data;
    //       console.log("Résultat des caissiers de la  :", this.cashiersCashRegister);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       if (error.response.status == 422) {
    //         this.errors = error.response.data.errors;
    //       }
    //     });
    // },



    // initDataTable() {
    //   if ($.fn.DataTable.isDataTable("#myTable2")) {
    //     $("#myTable2").DataTable().destroy();
    //   }
    //   $("#myTable2").DataTable({
    //     // Configuration de DataTables

    //     dom:
    //       '<"row mb-3"<"col-md-12"B>>' +
    //       '<"row mb-0"<"col-md-6"l><"col-md-6"f>>' +
    //       '<"row"<"col-md-12"tr>>' +
    //       '<"row"<"col-md-6"i><"col-md-6"p>>',

    //     language: FrenchTranslation, // Utilisez la configuration de traduction en français
    //     buttons: [],
    //   });
    // },

    // formatDate(date) {
    //   const options = { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    //   return new Date(date).toLocaleString('fr-FR', options);
    // },

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

    // showToast(message, type) {
    //   this.$toast.success(message, {
    //     position: POSITION.TOP_RIGHT,
    //     timeout: 2000,
    //     bodyStyle: {
    //       borderRadius: "10px",
    //       backgroundColor: "#f0f0f0",
    //       color: "#333",
    //       fontWeight: "bold",
    //     },
    //   });
    // },

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
  max-width: 50%;
  width: 50%;
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


table th, td {
  text-align:left;
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

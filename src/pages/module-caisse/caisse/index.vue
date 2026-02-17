<template>
  <section class="">
    <div class="row">
      <div class="col-lg-12 grid-margin tables">
        <div class="card">
          <div class="card-body">

            <h4 class=" text-white rounded p-3 mb-3 text-center"
              style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)">
              Liste des caisses
            </h4>

            <div class="mx-auto  mb-4">
              <button class="btn btn-success btn-medpay-green mr-2" data-toggle="modal" data-target="#addRegisterMoney">
                Ajouter
              </button>
            </div>

            <div class="table-responsive mt-n3">
              <table id="myTable" ref="myTable" class="table table-bordered" width="100%" cellspacing="0">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th style="width: 5%; text-align:center">#</th>
                    <th style="width: 25%">Caisse</th>
                    <th style="width: 30%">Description</th>
                    <th style="width: 10%; text-align:right">Total encaissé</th>
                    <th style="width: 10%; text-align:right">Total partiel </th>
                    <th style="width: 10%; text-align:right">Total crédits</th>
                    <th style="width: 5%">Statut</th>
                    <th style="width: 5%" class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(caisse, index) in caisses" :key="index">
                    <td class="text-center">{{ index + 1 }}</td>
                    <td>{{ caisse.designation }}</td>
                    <td>{{ caisse.description }}</td>
                    <!-- <td>{{ caisse.fonds }}</td> -->
                    <td class="text-right"> {{ formatNumberDecimal(caisse.solde) }} </td>
                    <td class="text-right"> {{ formatNumberDecimal(caisse.total_partial) }} </td>
                    <td class="text-right">{{ formatNumberDecimal(caisse.credits) }}</td>
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
                          <!-- 
                          <button class="dropdown-item font-weight-bold" @click="affectCashier(caisse)">
                            <i class="mdi mdi-account-check"></i> Planifier une caisse
                          </button> -->

                          <button v-if="caisse.statut == '0'" class="dropdown-item text-danger font-weight-bold"
                            @click="closeCashier(caisse)">
                            <i class="mdi mdi-close-circle"></i> Fermeture
                          </button>

                          <!-- <button v-if="caisse.statut == '1'" class="dropdown-item text-dark font-weight-bold"
                            @click="transfertCashier(caisse)">
                            <i class="mdi mdi-transfer"></i> Planifier une caisse
                          </button> -->
                          <button v-if="caisse.statut == '1'" class="dropdown-item text-info font-weight-bold"
                            @click="transfertCashier(caisse)">
                            <i class="mdi mdi-transfer"></i> Transfert de caisse
                          </button>

                          <hr class="m-1" />

                          <button @click="updateCashRegister(caisse)" class="dropdown-item text-dark font-weight-bold">
                            <i class="fa fa-pencil-square-o"></i>Modifier
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
            <p class="font-weight-bold">Utilisateur : {{ user.name }} {{ user.prenom }}.</p>
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
            <p class="font-weight-bold">Utilisateur : {{ user.name }} {{ user.prenom }}.</p>
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

          Planifier la caisse.

        </h4>
        <div class="modal-content" style="margin-top: -17px !important">
          <div class="modal-body">
            <div class="col-md-12 col-lg-12">
              <form class="forms-sample" @submit.prevent="addCashCashier">
                <div class="row">
                  <!-- Caissiers et Date -->
                  <div class="col-md-6 col-12">
                    <div class="form-group controls">
                      <label for="exampleFormControlSelect1">Caissiers <span style="color: red">*</span></label>
                      <select v-model="selectedCashier" class="form-control mb-3" id="exampleFormControlSelect1">
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

                  <div class="col-md-6 col-12">
                    <div class="form-group controls">
                      <label for="exampleFormControlInput1">Date <span style="color: red">*</span></label>
                      <input type="date" class="form-control" v-model="selectedDate" id="exampleFormControlInput1" />
                      <div v-if="errors.selected_date && !selectedDate" class="text-danger mb-2">
                        {{ errors.selected_date[0] }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <!-- Heure d'Ouverture -->
                  <div class="col-md-6">
                    <div class="form-group controls">
                      <label for="openingTime">Heure d'Ouverture <span style="color: red">*</span></label>
                      <input type="time" class="form-control" v-model="openingTime" id="openingTime" />
                      <div v-if="errors.opening_time && !openingTime" class="text-danger">
                        {{ errors.opening_time[0] }}
                      </div>
                    </div>
                  </div>

                  <!-- Heure de Fermeture -->
                  <div class="col-md-6">
                    <div class="form-group controls">
                      <label for="closingTime">Heure de Fermeture <span style="color: red">*</span></label>
                      <input type="time" class="form-control" v-model="closingTime" id="closingTime" />
                      <div v-if="errors.closing_time && (closingTime == '' || closingTime === openingTime)"
                        class="text-danger">
                        {{ errors.closing_time[0] }}
                      </div>
                    </div>
                  </div>
                </div>

                <div class="d-flex justify-content-start">
                  <!-- Bouton Enregistrer (centré) -->
                  <div class=" text-center">
                    <div class="form-group mt-4">
                      <button type="submit" class="btn btn-success btn-medpay-green">
                        Enregistrer
                      </button>
                    </div>
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
                    <th style="width: 25%">Heure d'ouverture</th>
                    <th style="width: 25%">Heure de Fermeture</th>
                    <th style="width: 45%">Caissier(e)</th>

                    <!-- <th style="width: 20%">Statut</th> -->
                    <th style="width: 5%" class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(caissier, index) in cashiersCashRegister" :key="caissier.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ formatDate(caissier.created_at) }}</td>
                    <td>08h: 00</td>
                    <td>12h: 00</td>
                    <td>
                      {{ getUserInfoById(caissier.cashier_id).name }}
                      {{ getUserInfoById(caissier.cashier_id).prenom }}
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
                          <button class="dropdown-item font-weight-bold" @click="openCashier(caissier)">
                            <i class="mdi mdi-eye menu-icon"></i> Détail Uitlisateur
                          </button>

                          <button class="dropdown-item font-weight-bold" @click="closeCashier">
                            <i class="mdi mdi-account-multiple-plus"></i> Patients
                            facturés
                          </button>

                          <button class="dropdown-item font-weight-bold">
                            <i class="mdi mdi-database-plus"></i> Statut (<span class="text-danger">Inactif</span>)
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
          </div>
          <div class="modal-footer">
            <div class="d-flex justify-content-between col-md-12 col-lg-12 flex-row mt-n3">
              <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal" style="width: 170px !important">
                Fermer
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="modal fade" id="addRegisterMoney" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <h4 class="card-title text-white p-3 mt-4 text-center col-12" style="
            background-color: #0b5d3f;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-top: -17px !important;
          ">
          Ajouter une caisse
        </h4>
        <div class="modal-content" style="margin-top: -17px !important">
          <div class="modal-body">

            <form class="forms-sample mt-2" @submit.prevent="addCashRegister">
              <div class="">
                <div class="">
                  <div class="form-group">
                    <label for="typeCashRegister">Type<span style="color: red">*</span>
                    </label>
                    <select v-model="typeCashRegister" class="form-control mb-3" id="typeCashRegister"
                      name="typeCashRegister">
                      <option value=''>Sélectionner</option>
                      <option value="A">Prestation</option>
                      <option value="P">Pharmacie</option>
                    </select>
                    <div v-if="errors.type" class="text-danger mt-n3">
                      {{ errors.type[0] }}
                    </div>
                  </div>
                </div>
                <div class="mt-3">
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
                <div class="mt-3">
                  <div class="form-group">
                    <label for="description">Description <span style="color: red">*</span></label>
                    <input v-model="descriptionCaisse" type="text" class="form-control" id="description"
                      placeholder="Description" name="date_fin" />
                    <div v-if="errors.description" class="text-danger">
                      {{ errors.description[0] }}
                    </div>
                  </div>
                </div>


                <div class="modal-footer form-group mt-2 d-flex justify-content-between  flex-row">
                  <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal">
                    Fermer
                  </button>

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

    <div class="modal fade" id="updateRegisterMoney" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <h4 class="card-title text-white p-3 mt-4 text-center col-12" style="
            background-color: #0b5d3f;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-top: -17px !important;
          ">
          Modifier une caisse
        </h4>
        <div class="modal-content" style="margin-top: -17px !important">
          <div class="modal-body">

            <form class="forms-sample mt-2" @submit.prevent="updateSaveCashRegister">
              <div class="">
                <div class="">
                  <div class="form-group">
                    <label for="typeCashRegister">Type<span style="color: red">*</span>
                    </label>
                    <select v-model="typeCashRegister" class="form-control mb-3" id="typeCashRegister"
                      name="typeCashRegister">
                      <option value=''>Sélectionner</option>
                      <option value="A">Prestation</option>
                      <option value="P">Pharmacie</option>
                    </select>
                    <div v-if="errors.type" class="text-danger mt-n3">
                      {{ errors.type[0] }}
                    </div>
                  </div>
                </div>
                <div class="mt-3">
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
                <div class="mt-3">
                  <div class="form-group">
                    <label for="description">Description <span style="color: red">*</span></label>
                    <input v-model="descriptionCaisse" type="text" class="form-control" id="description"
                      placeholder="Description" name="date_fin" />
                    <div v-if="errors.description" class="text-danger">
                      {{ errors.description[0] }}
                    </div>
                  </div>
                </div>


                <div class="modal-footer form-group mt-2 d-flex justify-content-between  flex-row">
                  <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal">
                    Fermer
                  </button>

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
      indexSpinner: false,
      typeCashRegister: "",
      selectedDate: "",
      selectedCashier: "",
      uuidCashRegister: "",
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

    addRegisterMoney() {
      $("#addRegisterMoney").modal("show");
    },


    affectCashier(caisse) {

      // this.caisseToOpen = caisse ;

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

        user_id: this.user.id, // ID de l'utilisateur (valeur par défaut, à ajuster si nécessaire)
        cashier_id: this.selectedCashier, // ID du caissier (valeur par défaut, à ajuster si nécessaire)
        cash_registers_id: this.caisseID, // ID de la caisse
        selected_date: this.selectedDate,
        opening_time: this.openingTime,
        closing_time: this.closingTime,
        closing_time: this.closingTime,
        statut: 0,

      };
      console.log("this.selectedCashier");
      console.log(this.selectedCashier);

      caisseService
        .affectCashier(requestBody)
        .then((response) => {
          console.log("ajout du caissier effectué avec succes");
          console.log(response.data.data);

          console.log(this.cashiersCashRegister);

          this.showToast("caissier(e) affecté(e) avec succès !", "success");
          // $("#affectCashier").modal("hide");

          //rechargement des données
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
            if (error.response.data.message == 'Cette affectation du caissier existe déjà.') {
              // Display the error message using the showToast function
              this.showToast('Cette affectation du caissier existe déjà.', 'error');
            }
            // this.showToast(error.response.data.message, "error");
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
      this.indexSpinner = true;
      caisseService
        .getAllCaisse()
        .then((res) => {
          this.indexSpinner = false;
          this.caisses = res.data.data;
          console.log("this.caisses");
          console.log(this.caisses);

          this.$nextTick(() => {
            this.initializeDataTable();
          });
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response);
        });
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
          user_id:  this.user.id,
          cashier_id: this.user.id,
          cash_registers_id: this.caisseToOpen.id,
          solde: this.caisseToOpen.solde,
          credits: this.caisseToOpen.credits,
          statut: 0,
        };

        caisseService
          .openCloseCashRegister(requestBody)
          .then((response) => {
            console.log("openCloseCashRegister");
            console.log(response.data.data);


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
          user_id:  this.user.id, // ID de l'utilisateur (valeur par défaut, à ajuster si nécessaire)
          cashier_id: this.user.id, // ID du caissier (valeur par défaut, à ajuster si nécessaire)
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
        type: this.typeCashRegister,
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
          this.typeCashRegister = "";
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
        type: this.typeCashRegister,
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
          this.typeCashRegister = "";
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


    updateCashRegister(caisse) {

      $("#updateRegisterMoney").modal("show");
      // console.log("caisse à modifier")
      // console.log(caisse)
      this.uuidCashRegister = caisse.uuid;
      this.typeCashRegister = caisse.type;
      this.designationCaisse = caisse.designation;
      this.descriptionCaisse = caisse.description;

    },

    updateSaveCashRegister() {

      const cashRegister = {

        type: this.typeCashRegister,
        designation: this.designationCaisse,
        description: this.descriptionCaisse,

      };

      caisseService
        .updateCashRegister(cashRegister, this.uuidCashRegister)
        .then((response) => {
          $("#updateRegisterMoney").modal("hide");

          console.log(response.data.data);
          console.log("Résultat de l'ajout de la  :", response.data.data);

          // Mise à jour du tableau de données avec la nouvelle caisse
          if (this.table) {
            this.table.destroy();
          }

          this.loadMyTable();
          // this.caisses.push(response.data.data);

          // this.$nextTick(() => {
          //   this.initializeDataTable();
          // });

          // Réinitialisez les champs du formulaire
          this.typeCashRegister = "";
          this.designationCaisse = "";
          this.descriptionCaisse = "";
          this.errors = {};
          this.showToast("Caisse modifié avec succès !", "success");

          // Rafraîchissez la table DataTable pour refléter les nouvelles données
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 422) {
            this.errors = error.response.data.errors;

          }
          if (error.response.data.message == 'Impossible de modifier la caisse car elle est déjà utilisée pour un payement') {
            this.errors = error.response.data.errors;
            this.showToast(error.response.data.message, 'error');
            return;
          }
        });
    },



    addCashRegisterTransfert() {

      console.log(" this.selectedCashiersMain");
      console.log(this.selectedCashiersMain);
      const requestBody = {
        user_id:  this.user.id,
        cashier_id:  this.user.id,
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
        timeout: 3000,
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

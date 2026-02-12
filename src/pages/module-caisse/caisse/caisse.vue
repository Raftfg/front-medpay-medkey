<template>
  <section class="">
    <div class="row">
      <div class="col-lg-12 grid-margin" style="margin-left: -10px">
        <div class="card">
          <div class="card-body">
            <h4 class=" text-white rounded p-3 mb-3 text-center"
              style="background-color: hsl(158, 79%, 20%); box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)">
              Actions sur les caisses
            </h4>

            <div>
              <ul class="nav nav-tabs" role="tablist">
                <li>
                  <button class="nav-link active font-weight-bold custom-tab" data-bs-toggle="tab" href="#tab1">
                    Ouverture
                  </button>
                </li>
                <li>
                  <button class="nav-link font-weight-bold custom-tab" data-bs-toggle="tab" href="#tab2">
                    Fermeture
                  </button>
                </li>
                <li>
                  <button class="nav-link font-weight-bold custom-tab" data-bs-toggle="tab" href="#tab3">
                    Transfert de caisses
                  </button>
                </li>
              </ul>

              <div class="tab-content">


                <div class="table-responsive tab-pane fade show active tables" id="tab1">
                  <span class="d-block mt-2"></span>
                  <table id="order-listing" ref="myTable" class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                      <tr style="background-color: rgb(216, 218, 216)">
                        <th style="width: 5%">#</th>
                        <th style="width: 5%">Date</th>
                        <th style="width: 25%">Caisse</th>
                        <th style="width: 25%">Caissier</th>
                        <!-- <th style="width: 10%">Fonds de Caisse</th> -->
                        <th style="width: 10%">Solde</th>
                        <th style="width: 10%">Credits</th>
                        <th style="width: 5%">Statut</th>
                        <th style="width: 5%" class="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(historique, index) in historiqueOpen" :key="historique.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ formatDate(historique.created_at) }}</td>
                        <td>{{ historique.designation }}</td>
                        <td>{{ historique.name }} {{ historique.prenom }}</td>
                        <!-- <td>{{ historique.fonds }}</td> -->
                        <td>{{ historique.solde }}</td>
                        <td>{{ historique.credits }}</td>
                        <td>
                          <label style="font-size: 11px !important; border-radius: 20px !important"
                            class="badge badge-gradient-success font-weight-bold text-white text-center">{{
                              historique.statut === 0 ? 'Ouverte' : 'Fermée' }}</label>
                        </td>

                        <td class="" width="50px">
                          <div class="btn-group btn-group-sm" role="group">
                            <button id="btnGroupDrop1" type="" style="padding: 0px 10px"
                              class="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                              aria-expanded="false">
                              &nbsp;
                              <i class="fa fa-tasks" aria-hidden="true"></i> &nbsp;
                            </button>
                            <!-- <div class="dropdown-menu action-button-div" aria-labelledby="btnGroupDrop1"
                              style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%)">
                              <button class="dropdown-item text-success font-weight-bold" @click="filterOpenCashier">
                                <i class="mdi mdi-open-in-new"></i> Filtrer
                              </button>
                            </div> -->
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="table-responsive tab-pane fade" id="tab2">
                  <span class="d-block mt-2"></span>
                  <table id="order-listing" ref="myTable1" class="table table-bordered" width="100%" cellspacing="0">
                    <thead>
                      <tr style="background-color: rgb(216, 218, 216)">
                        <th style="width: 5%">#</th>
                        <th style="width: 5%">Date</th>
                        <th style="width: 25%">Caisse</th>
                        <th style="width: 25%">Caissier</th>
                        <!-- <th style="width: 10%">Fonds de Caisse</th> -->
                        <th style="width: 10%">Solde</th>
                        <th style="width: 10%">Credits</th>
                        <th style="width: 5%">Statut</th>
                        <th style="width: 5%" class="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(historique, index) in historiqueClose" :key="historique.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ formatDate(historique.created_at) }}</td>
                        <td>{{ historique.designation }}</td>
                        <td>{{ historique.name }} {{ historique.prenom }}</td>
                        <!-- <td>{{ historique.fonds }}</td> -->
                        <td>{{ historique.solde }}</td>
                        <td>{{ historique.credits }}</td>
                        <td>
                          <label style="font-size: 11px !important; border-radius: 20px !important"
                            class="badge badge-gradient-danger font-weight-bold text-white text-center">{{
                              historique.statut === 0 ? 'Ouverte' : 'Fermée' }}</label>
                        </td>

                        <td class="" width="50px">
                          <div class="btn-group btn-group-sm" role="group">
                            <button id="btnGroupDrop1" type="" style="padding: 0px 10px"
                              class="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                              aria-expanded="false">
                              &nbsp;
                              <i class="fa fa-tasks" aria-hidden="true"></i> &nbsp;
                            </button>
                            <!-- <div class="dropdown-menu action-button-div" aria-labelledby="btnGroupDrop1"
                              style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%)">
                              <button class="dropdown-item text-success font-weight-bold" @click="filterOpenCashier">
                                <i class="mdi mdi-open-in-new"></i> Filtrer
                              </button>
                            </div> -->
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="table-responsive tab-pane fade" id="tab3">
                  <span class="d-block mt-2"></span>
                  <table id="order-listing" ref="myTable3" class="table table-responsive table-bordered" width="100%"
                    cellspacing="0">
                    <thead>
                      <tr style="background-color: rgb(216, 218, 216)">
                        <th style="width: 5%">#</th>
                        <th style="width: 10%">N° Tranfert</th>
                        <th style="width: 10%">Date</th>
                        <th style="width: 20%">Caisse</th>
                        <th style="width: 20%">Caissier</th>
                        <th style="width: 10%">Total cash</th>
                        <th style="width: 10%">Total crédits</th>
                        <!-- <th style="width: 10%">Total</th> -->
                        <th style="width: 2%">Validé</th>
                        <th style="width: 23%">Approbateur</th>
                        <th style="width: 2%" class="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(transfert, index) in cashRegisterTransfertList" :key="transfert.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ transfert.number }}</td>
                        <td>{{ formatDate(transfert.created_at) }}</td>
                        <td>{{ transfert.designation }}</td>
                        <td>{{ transfert.cashier_name }} {{ transfert.cashier_prenom }}</td>
                        <td>{{ parseInt(transfert.fonds) + parseInt(transfert.solde)}}</td>
                        <td>{{ transfert.credits }}</td>
                        <!-- <td>{{ transfert.valide ? 'Oui' : 'Non' }}</td> -->

                        <!-- <td>20 000</td> -->
                        <td>
                          <label style="font-size: 11px !important; border-radius: 20px !important"
                            class="badge font-weight-bold text-white text-center" :class="transfert.statut == '1'
                              ? 'badge-gradient-success'
                              : 'badge-gradient-danger'
                              ">
                            {{ transfert.statut == "1" ? "OUI" : "NON" }}
                          </label>
                        </td>

                        <td>{{ transfert.approver_name }} {{ transfert.approver_prenom }}</td>

                        <td class="" width="50px">
                          <div class="btn-group btn-group-sm" role="group">
                            <button id="btnGroupDrop1" type="" style="padding: 0px 10px"
                              class="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true"
                              aria-expanded="false">
                              &nbsp;
                              <i class="fa fa-tasks" aria-hidden="true"></i> &nbsp;
                            </button>
                            <div class="dropdown-menu action-button-div" aria-labelledby="btnGroupDrop1"
                              style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%)">
                              <!-- <button class="dropdown-item text-success font-weight-bold" @click="filterTransfert">
                                <i class="mdi mdi-open-in-new"></i> Filtrer
                              </button> -->
                              <button v-if="transfert.statut == '0'" class="dropdown-item font-weight-bold" >
                                <i class="mdi mdi-transfer"></i> Validé
                              </button>
                              <button class="dropdown-item font-weight-bold" @click="transfertOrder">
                                <i class="mdi mdi-transfer"></i> Bon de transfert
                              </button>
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
      </div>
    </div>

    <div class="modal fade" id="filterOpenCashier" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <h4 class="card-title text-white p-3 mt-4 text-center col-12" style="
            background-color: #0b5d3f;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-top: -17px !important;
          ">
          Filtrer l'historique d'ouverture de caisse
        </h4>
        <div class="modal-content" style="margin-top: -17px !important">
          <div class="modal-body">
            <form class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="inputField1" style="color: black !important">Date Début</label>
                  <input type="date" class="form-control" id="inputField1" v-model="startOpenDate" placeholder="" />
                </div>

                <div class="form-group">
                  <label for="inputField1" style="color: black !important">Date Fin</label>
                  <input type="date" class="form-control" id="inputField1" v-model="endOpenDate" placeholder="" />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="d-flex justify-content-between col-12 flex-row">
              <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal">
                Annuler
              </button>

              <!-- <button type="submit" class="btn btn-success btn-medpay-green">
                Filtrer
              </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="filterCloseCashier" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <h4 class="card-title text-white p-3 mt-4 text-center col-12" style="
            background-color: #0b5d3f;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-top: -17px !important;
          ">
          Filtrer l'historique de fermeture de caisse
        </h4>
        <div class="modal-content" style="margin-top: -17px !important">
          <div class="modal-body">
            <form class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="inputField1" style="color: black !important">Date Début</label>
                  <input type="date" class="form-control" id="inputField1" v-model="startCloseDate" placeholder="" />
                </div>

                <div class="form-group">
                  <label for="inputField1" style="color: black !important">Date Fin</label>
                  <input type="date" class="form-control" id="inputField1" v-model="endCloseDate" placeholder="" />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="d-flex justify-content-between col-12 flex-row">
              <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal">
                Annuler
              </button>

              <!-- <button type="submit" class="btn btn-success btn-medpay-green">
                Filtrer
              </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="filtertransfertCashier" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <h4 class="card-title text-white p-3 mt-4 text-center col-12" style="
            background-color: #0b5d3f;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-top: -17px !important;
          ">
          Filtrer l'historique de transfert de caisse
        </h4>
        <div class="modal-content" style="margin-top: -17px !important">
          <div class="modal-body">
            <form class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="inputField1" style="color: black !important">Date Début</label>
                  <input type="date" class="form-control" id="inputField1" v-model="startTransfertDate" placeholder="" />
                </div>

                <div class="form-group">
                  <label for="inputField1" style="color: black !important">Date Fin</label>
                  <input type="date" class="form-control" id="inputField1" v-model="endTransfertDate" placeholder="" />
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="d-flex justify-content-between col-12 flex-row">
              <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal">
                Annuler
              </button>

              <!-- <button type="submit" class="btn btn-success btn-medpay-green">
                Filtrer
              </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="approvedTransfert" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <h4 class="card-title text-white p-3 mt-4 text-center col-12" style="
            background-color: #0b5d3f;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-top: -17px !important;
          ">
          Valider le transfert de caisse
        </h4>
        <div class="modal-content" style="margin-top: -17px !important">
          <div class="modal-body">
            <p class="font-weight-bold">
              Voulez-vous vraiment valider ce transfert de caisse ?
            </p>
            <hr class="m-2" style="border: 1px solid rgb(207, 207, 207)" />
            <p class="font-weight-bold">CAISSE PHARMACIE</p>
            <p class="font-weight-bold">Date de transfert : 29/10/2023 à 08:00:00</p>
            <p class="font-weight-bold">Effectué par : BOBA Claude.</p>
          </div>
          <div class="modal-footer">
            <div class="d-flex justify-content-between col-12 flex-row">
              <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal">
                Annuler
              </button>

              <button type="submit" class="btn btn-success btn-medpay-green">
                Vaider
              </button>
            </div>
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

import { terminalService } from "@/_services";
import { caisseService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";
// import { paysService } from "@/_services";

export default {
  name: "caisse",
  data() {
    return {
      startTransfertDate: "",
      endTransfertDate: "",
      startOpenDate: "",
      endOpenDate: "",
      startCloseDate: "",
      endCloseDate: "",
      deleteIndex: null,
      deleteName: "",
      table: null,
      lastname: "",
      firstname: "",
      historiqueOpen: [],
      historiqueClose: [],
      cashRegisterTransfertList: [],
      deleteIndex: null,
      deleteName: "",
      table: null,
      ipp: "",
      uuid: "",
    };
  },

  mounted() {

    caisseService.getHistoriqueOpen().then((res) => {
      this.historiqueOpen = res.data.data;
      this.$nextTick(() => {
        const table = $(this.$refs.myTable).DataTable({
          // dom: '<"html5buttons"B>lTfgtip',
          dom:
            '<"row mb-3"<"col-md-12"B>>' +
            '<"row mb-0"<"col-md-6"l><"col-md-6"f>>' +
            '<"row"<"col-md-12"tr>>' +
            '<"row"<"col-md-6"i><"col-md-6"p>>',

          // dom: 'Bfrtip',
          pageLength: 10, // Définir le nombre de résultats par page
          language: FrenchTranslation,

          buttons: [
            /*{
            extend: "csvHtml5",
            charset: "utf-8",
            bom: true,
              className: "btn btn-gray btn-sm", // Extend the excel button
            },*/
            // {
            //   extend: "excelHtml5",
            //   charset: "utf-8",
            //   bom: true,
            //   className: "btn btn-gray btn-sm",
            // },
            // {
            //   extend: "pdfHtml5",
            //   charset: "utf-8",
            //   bom: true,
            //   className: "btn btn-gray btn-sm",
            //   // className: 'btn btn-primary',
            // },
            /*{
              extend: "print",
              charset: "utf-8",
              bom: true,
              className: "btn btn-gray btn-sm",
            },
            {
              extend: "copy",
              charset: "utf-8",
              bom: true,
              className: "btn btn-gray btn-sm",
            },*/
          ],
        });
      });
      table.buttons().container().prependTo("#myTable_wrapper .col-md-6:eq(0)");
    });

    caisseService.getHistoriqueClose().then((res) => {
      this.historiqueClose = res.data.data;
      this.$nextTick(() => {
        const table = $(this.$refs.myTable1).DataTable({
          // dom: '<"html5buttons"B>lTfgtip',
          dom:
            '<"row mb-3"<"col-md-12"B>>' +
            '<"row mb-0"<"col-md-6"l><"col-md-6"f>>' +
            '<"row"<"col-md-12"tr>>' +
            '<"row"<"col-md-6"i><"col-md-6"p>>',

          // dom: 'Bfrtip',
          pageLength: 10, // Définir le nombre de résultats par page
          language: FrenchTranslation,

          buttons: [
            /*{
            extend: "csvHtml5",
            charset: "utf-8",
            bom: true,
              className: "btn btn-gray btn-sm", // Extend the excel button
            },*/
            // {
            //   extend: "excelHtml5",
            //   charset: "utf-8",
            //   bom: true,
            //   className: "btn btn-gray btn-sm",
            // },
            // {
            //   extend: "pdfHtml5",
            //   charset: "utf-8",
            //   bom: true,
            //   className: "btn btn-gray btn-sm",
            //   // className: 'btn btn-primary',
            // },
            /*{
              extend: "print",
              charset: "utf-8",
              bom: true,
              className: "btn btn-gray btn-sm",
            },
            {
              extend: "copy",
              charset: "utf-8",
              bom: true,
              className: "btn btn-gray btn-sm",
            },*/
          ],
        });
      });
      table.buttons().container().prependTo("#myTable_wrapper .col-md-6:eq(0)");
    });


    caisseService.getCashRegisterTransfert().then((res) => {
      this.cashRegisterTransfertList = res.data.data;
      this.$nextTick(() => {
        const table = $(this.$refs.myTable3).DataTable({
          // dom: '<"html5buttons"B>lTfgtip',
          dom:
            '<"row mb-3"<"col-md-12"B>>' +
            '<"row mb-0"<"col-md-6"l><"col-md-6"f>>' +
            '<"row"<"col-md-12"tr>>' +
            '<"row"<"col-md-6"i><"col-md-6"p>>',

          // dom: 'Bfrtip',
          pageLength: 10, // Définir le nombre de résultats par page
          language: FrenchTranslation,

          buttons: [
            /*{
            extend: "csvHtml5",
            charset: "utf-8",
            bom: true,
              className: "btn btn-gray btn-sm", // Extend the excel button
            },*/
            // {
            //   extend: "excelHtml5",
            //   charset: "utf-8",
            //   bom: true,
            //   className: "btn btn-gray btn-sm",
            // },
            // {
            //   extend: "pdfHtml5",
            //   charset: "utf-8",
            //   bom: true,
            //   className: "btn btn-gray btn-sm",
            //   // className: 'btn btn-primary',
            // },
            /*{
              extend: "print",
              charset: "utf-8",
              bom: true,
              className: "btn btn-gray btn-sm",
            },
            {
              extend: "copy",
              charset: "utf-8",
              bom: true,
              className: "btn btn-gray btn-sm",
            },*/
          ],
        });
      });
      table.buttons().container().prependTo("#myTable_wrapper .col-md-6:eq(0)");
    });


  },
  methods: {

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
    filterOpenCashier() {
      $("#filterOpenCashier").modal("show");
    },
    filterCloseCashier() {
      $("#filterCloseCashier").modal("show");
    },

    filtertransfertCashier() {
      $("#filtertransfertCashier").modal("show");
    },

    approvedTransfert() {
      $("#approvedTransfert").modal("show");
    },
    transfertOrder() {
      $("#transfertOrder").modal("show");
    },

    update(id) {
      this.$router.push("/terminal/update/" + id);
    },
    supprimer(index) {
      this.deleteIndex = index;
      this.deleteName = this.terminals[index].nom;
      $("#confirmDeleteModal").modal("show");
    },

    confirmDelete() {
      const index = this.deleteIndex;
      const nom = this.deleteName;
      if (index !== null) {
        terminalService
          .deleteTerminal(this.terminals[index].id)
          .then((res) => {
            this.terminals.splice(index, 1);
            this.$toast.success("Terminal supprimé avec succès !", {
              position: POSITION.TOP_RIGHT,
              timeout: 3000,
              bodyStyle: {
                borderRadius: "10px",
                backgroundColor: "#f0f0f0",

                // color: "#333",
                color: "red",
                fontWeight: "bold",
              },
            });
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.deleteIndex = null;
            this.deleteName = "";
            $("#confirmDeleteModal").modal("hide");
          });
      }
    },
  },
};
</script>

<style scoped>
@import "../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
@import "../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";

.badge-rounded {
  border-radius: 50% !important;
  padding: 8px 15px !important;
  /* Ajustez la taille de padding selon vos besoins */
}

.nav-link.active.custom-tab {
  background-color: #0b5d3f !important;
  /* Couleur de fond sombre */
  color: #fff !important;
  /* Couleur du texte en surbrillance */
}

/* Style pour les onglets inactifs */
.nav-link.custom-tab {
  background-color: #e7ecef !important;
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

table th, td {
  text-align:left;
}

th {
  background-color: #d6dbd6;
  border: 1px solid #dee2e6;
}

table {
  margin-bottom: 1rem;
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
}

.custom-tabset .nav-tabs .nav-link {
  color: #000000 !important;
  /* Couleur du texte pour les onglets non actifs */
  font-weight: bold !important;
  background-color: #e7ecef !important;
  /* Couleur de fond pour les onglets non actifs */
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

.text-bold {
  font-weight: bold;
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

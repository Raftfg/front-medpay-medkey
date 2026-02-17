<template>
  <section class="">
    <div class="row">

      <div class="col-lg-5 grid-margin  " style=" margin-right: -10px;">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-3 text-center"
              style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)">
              Ajouter une caisse
            </h3>
            <form class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="terminalName">Désignation</label>
                  <input type="text" v-model="terminalName" class="form-control" id="terminalName"
                    placeholder="Nom terminal" />
                  <!-- <ul v-if="errorTerminalName.length" class="text-danger">
                    <li v-for="error in errorTerminalName" :key="error">
                      {{ error }}
                    </li>
                  </ul> -->
                </div>
                <div class="form-group">
                  <label for="terminalEmplacement">Description</label>
                  <input type="text" v-model="terminalEmplacement" class="form-control" id="terminalEmplacement"
                    placeholder="Emplacement terminal" />
                  <!-- <ul v-if="errorTerminalEmplacement.length" class="text-danger">
                    <li v-for="error in errorTerminalEmplacement" :key="error">
                      {{ error }}
                    </li>
                  </ul> -->
                </div>
              </div>

              <div class="mx-auto">
                <b-button class="btn btn-success btn-medpay-green " size="sm" @click="ajouterSignataire" v-b-tooltip.hover
                  title="Ajouter" variant="success">
                  Ajouter
                </b-button>
              </div>
            </form>
          </div>
        </div>
      </div>



      <div class="col-lg-7 grid-margin  tables" style="margin-left: -10px;">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-3 text-center"
              style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)">
              Liste des caisses
            </h3>
            <div class="table-responsive">
              <table id="order-listing" ref="myTable" class="table table-bordered">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Nom</th>
                    <th>Description</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td> Pharmacie</td>
                    <td>Caisse Pharmacie</td>
                    <td class="text-right" width="50px">

                      <div class="btn-group btn-group-sm" role="group">
                        <button id="btnGroupDrop1" type="" style="padding: 0px 10px" class="btn btn-light dropdown-toggle"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          &nbsp;
                          <i class="fa fa-tasks" aria-hidden="true"></i> &nbsp;
                        </button>
                        <div class="dropdown-menu action-button-div" aria-labelledby="btnGroupDrop1"
                          style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%)">
                          <a class="dropdown-item" href="#">
                            <i class="mdi mdi-eye menu-icon"></i> Détail
                          </a>
                          <a class="dropdown-item" href="#">
                            <i class="mdi mdi-eye menu-icon"></i> Ajouter caissier
                          </a>
                          <!-- <a class="dropdown-item" href="#">
                            <i class="fa fa-arrows-h" aria-hidden="true"></i>
                            Historique des venues
                          </a> -->
                          <!-- <a class="dropdown-item" href="#">
                            <i class="fa fa-usd" aria-hidden="true"></i> &nbsp;
                            Facture & Paiement
                          </a>

                          <hr class="m-1" />

                          <a class="dropdown-item" href="#">
                            <i class="fa fa-umbrella" aria-hidden="true"></i>
                            Assurances
                          </a>
                          <a class="dropdown-item" href="#">
                            <i class="fa fa-folder-o" aria-hidden="true"></i>
                            Dossier médical
                          </a> -->
                          <hr class="m-1" />
                          <a class="dropdown-item text-warning" href="#">
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                            Modififier
                          </a>
                          <!-- <a
                            @click="supprimer(index)"
                            class="dropdown-item text-danger"
                            href="#"
                          >
                            <i class="mdi mdi mdi-delete menu-icon"></i>
                            Supprimer</a
                          > -->
                        </div>
                      </div>
                    </td>
                    <!-- <td class="text-center">
                      <b-button  size="sm" v-b-tooltip.hover title="Modifier"
                        variant="warning">
                        <i class="mdi mdi mdi-table-edit text-white menu-icon"></i>
                      </b-button>

                      <b-button  size="sm" v-b-tooltip.hover title="Supprimer" variant="danger">
                        <i class="mdi mdi mdi-delete-forever text-white menu-icon"></i>
                      </b-button>
                    </td> -->
                  </tr>
                  <tr>
                    <td>1</td>
                    <td> Pharmacie</td>
                    <td>Caisse Pharmacie</td>
                    <td class="text-right" width="50px">

                      <div class="btn-group btn-group-sm" role="group">
                        <button id="btnGroupDrop1" type="" style="padding: 0px 10px" class="btn btn-light dropdown-toggle"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          &nbsp;
                          <i class="fa fa-tasks" aria-hidden="true"></i> &nbsp;
                        </button>
                        <div class="dropdown-menu action-button-div" aria-labelledby="btnGroupDrop1"
                          style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%)">
                          <a class="dropdown-item" href="#">
                            <i class="mdi mdi-eye menu-icon"></i> Détail
                          </a>
                          <a class="dropdown-item" href="#">
                            <i class="mdi mdi-eye menu-icon"></i> Ajouter caissier
                          </a>
                          <!-- <a class="dropdown-item" href="#">
                            <i class="fa fa-arrows-h" aria-hidden="true"></i>
                            Historique des venues
                          </a> -->
                          <!-- <a class="dropdown-item" href="#">
                            <i class="fa fa-usd" aria-hidden="true"></i> &nbsp;
                            Facture & Paiement
                          </a>

                          <hr class="m-1" />

                          <a class="dropdown-item" href="#">
                            <i class="fa fa-umbrella" aria-hidden="true"></i>
                            Assurances
                          </a>
                          <a class="dropdown-item" href="#">
                            <i class="fa fa-folder-o" aria-hidden="true"></i>
                            Dossier médical
                          </a> -->
                          <hr class="m-1" />
                          <a class="dropdown-item text-warning" href="#">
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                            Modififier
                          </a>
                          <!-- <a
                            @click="supprimer(index)"
                            class="dropdown-item text-danger"
                            href="#"
                          >
                            <i class="mdi mdi mdi-delete menu-icon"></i>
                            Supprimer</a
                          > -->
                        </div>
                      </div>
                    </td>
                    <!-- <td class="text-center">
                      <b-button  size="sm" v-b-tooltip.hover title="Modifier"
                        variant="warning">
                        <i class="mdi mdi mdi-table-edit text-white menu-icon"></i>
                      </b-button>

                      <b-button  size="sm" v-b-tooltip.hover title="Supprimer" variant="danger">
                        <i class="mdi mdi mdi-delete-forever text-white menu-icon"></i>
                      </b-button>
                    </td> -->
                  </tr>
                  <tr>
                    <td>1</td>
                    <td> Pharmacie</td>
                    <td>Caisse Pharmacie</td>
                    <td class="text-right" width="50px">

                      <div class="btn-group btn-group-sm" role="group">
                        <button id="btnGroupDrop1" type="" style="padding: 0px 10px" class="btn btn-light dropdown-toggle"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          &nbsp;
                          <i class="fa fa-tasks" aria-hidden="true"></i> &nbsp;
                        </button>
                        <div class="dropdown-menu action-button-div" aria-labelledby="btnGroupDrop1"
                          style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%)">
                          <a class="dropdown-item" href="#">
                            <i class="mdi mdi-eye menu-icon"></i> Détail
                          </a>
                          <a class="dropdown-item" href="#">
                            <i class="mdi mdi-eye menu-icon"></i> Ajouter caissier
                          </a>
                          <!-- <a class="dropdown-item" href="#">
                            <i class="fa fa-arrows-h" aria-hidden="true"></i>
                            Historique des venues
                          </a> -->
                          <!-- <a class="dropdown-item" href="#">
                            <i class="fa fa-usd" aria-hidden="true"></i> &nbsp;
                            Facture & Paiement
                          </a>

                          <hr class="m-1" />

                          <a class="dropdown-item" href="#">
                            <i class="fa fa-umbrella" aria-hidden="true"></i>
                            Assurances
                          </a>
                          <a class="dropdown-item" href="#">
                            <i class="fa fa-folder-o" aria-hidden="true"></i>
                            Dossier médical
                          </a> -->
                          <hr class="m-1" />
                          <a class="dropdown-item text-warning" href="#">
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                            Modififier
                          </a>
                          <!-- <a
                            @click="supprimer(index)"
                            class="dropdown-item text-danger"
                            href="#"
                          >
                            <i class="mdi mdi mdi-delete menu-icon"></i>
                            Supprimer</a
                          > -->
                        </div>
                      </div>
                    </td>
                    <!-- <td class="text-center">
                      <b-button  size="sm" v-b-tooltip.hover title="Modifier"
                        variant="warning">
                        <i class="mdi mdi mdi-table-edit text-white menu-icon"></i>
                      </b-button>

                      <b-button  size="sm" v-b-tooltip.hover title="Supprimer" variant="danger">
                        <i class="mdi mdi mdi-delete-forever text-white menu-icon"></i>
                      </b-button>
                    </td> -->
                  </tr>
                  <tr>
                    <td>1</td>
                    <td> Pharmacie</td>
                    <td>Caisse Pharmacie</td>
                    <td class="text-right" width="50px">

                      <div class="btn-group btn-group-sm" role="group">
                        <button id="btnGroupDrop1" type="" style="padding: 0px 10px" class="btn btn-light dropdown-toggle"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          &nbsp;
                          <i class="fa fa-tasks" aria-hidden="true"></i> &nbsp;
                        </button>
                        <div class="dropdown-menu action-button-div" aria-labelledby="btnGroupDrop1"
                          style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%)">
                          <a class="dropdown-item" href="#">
                            <i class="mdi mdi-eye menu-icon"></i> Détail
                          </a>
                          <a class="dropdown-item" href="#">
                            <i class="mdi mdi-eye menu-icon"></i> Ajouter caissier
                          </a>
                          <!-- <a class="dropdown-item" href="#">
                            <i class="fa fa-arrows-h" aria-hidden="true"></i>
                            Historique des venues
                          </a> -->
                          <!-- <a class="dropdown-item" href="#">
                            <i class="fa fa-usd" aria-hidden="true"></i> &nbsp;
                            Facture & Paiement
                          </a>

                          <hr class="m-1" />

                          <a class="dropdown-item" href="#">
                            <i class="fa fa-umbrella" aria-hidden="true"></i>
                            Assurances
                          </a>
                          <a class="dropdown-item" href="#">
                            <i class="fa fa-folder-o" aria-hidden="true"></i>
                            Dossier médical
                          </a> -->
                          <hr class="m-1" />
                          <a class="dropdown-item text-warning" href="#">
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                            Modififier
                          </a>
                          <!-- <a
                            @click="supprimer(index)"
                            class="dropdown-item text-danger"
                            href="#"
                          >
                            <i class="mdi mdi mdi-delete menu-icon"></i>
                            Supprimer</a
                          > -->
                        </div>
                      </div>
                    </td>
                    <!-- <td class="text-center">
                      <b-button  size="sm" v-b-tooltip.hover title="Modifier"
                        variant="warning">
                        <i class="mdi mdi mdi-table-edit text-white menu-icon"></i>
                      </b-button>

                      <b-button  size="sm" v-b-tooltip.hover title="Supprimer" variant="danger">
                        <i class="mdi mdi mdi-delete-forever text-white menu-icon"></i>
                      </b-button>
                    </td> -->
                  </tr>
                </tbody>
              </table>
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
import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
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

import { patientService } from "@/_services";
import { terminalService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";
// import { paysService } from "@/_services";

export default {
  name: "patients",
  data() {
    return {
      patients: [],
      deleteIndex: null,
      deleteName: "",
      table: null,
      lastname: "",
      firstname: "",
      age: "",
      datebirth: "",
      address: "",
      terminals: [],
      deleteIndex: null,
      deleteName: "",
      table: null,
      nom: "",
      Description: "",
      id: "",
      // pays_id: "",
      // departement_id: "",
      // commune_id: "",
      // arrondissement_id: "",
      // quartier_id: "",
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
    patientService.getPatient(this.uuid).then((res) => {
      this.patient = res.data.data;
      this.patient.uuid = this.uuid;
    });


    terminalService.getTerminal(this.id).then((res) => {
      this.terminal = res.data.data;
      this.terminal.id = this.id;
    });


    patientService.getAllPatients().then((res) => {
      this.terminal = res.data.data;
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
  },
  methods: {
    // detail(act) {
    //   this.id = act.id;
    //   this.code = act.code;
    //   this.name = act.name;
    //   this.description = act.description;
    //   this.tarif = act.tarif;
    //   $("#showDetail").modal("show");
    // },
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

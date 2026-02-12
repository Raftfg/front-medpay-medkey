<template>
  <section class="container-scroller">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold"
              >Tableau de board</a
            >
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Utilisateurs
          </li>
          <li
            class="breadcrumb-item active text-success font-weight-bold"
            aria-current="page"
          >
            Liste
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-lg-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <!-- <h4 class="card-title,">Liste des Utilisateurs</h4> -->
            <h3
              class="card-title text-white rounded p-3 mb-4 text-center"
              style="
                background-color: #0b5d3f;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              "
            >
              Liste des Utilisateurs
            </h3>
            <div class="mx-auto mt-5 mb-4">
              <router-link to="/user/create">
                <button
                  type="submit"
                  class="btn btn-success btn-medpay-green mr-2"
                >
                  Ajouter
                </button>
              </router-link>
            </div>

            <div class="table-responsive mt-4">
              <table
                id="order-listing"
                ref="myTable"
                class="table table-bordered"
              >
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Nom</th>
                    <th>Prénom(s)</th>
                    <!-- <th>Rôle ou poste</th> -->
                    <th>Email</th>
                    <th>Centre</th>
                    <!-- <th>Téléphone</th> -->
                    <!-- <th>Sexe</th> -->
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in users" :key="user.id">
                    <td>{{ index + 1 }}</td>
                    <td style="text-transform: uppercase">{{ user.name }}</td>
                    <td style="text-transform: capitalize">
                      {{ user.prenom }}
                    </td>
                    <!-- <td>{{ user.role_id.name }}</td> -->
                    <!-- <td>{{ getNomRole(user.role_id) }}</td> -->
                    <td>{{ user.email }}</td>
                    <td>{{ getNomCenter(user.idcentre) }}</td>
                    <!-- <td>{{ user.telephone }}</td> -->
                    <!-- <td>{{ user.sexe }}</td> -->
                    <td class="text-center">
                      <!-- <b-button
                        size="sm"
                        v-b-tooltip.hover
                        title="Détail"
                        variant="success"
                        @click="showDetail"
                      >
                        <i
                          class="mdi   mdi-eye text-white menu-icon"
                        ></i>
                      </b-button> -->
                      <b-button
                        @click="detail(user)"
                        size="sm"
                        v-b-tooltip.hover
                        title="Détail"
                        variant="success"
                      >
                        <i class="mdi mdi-eye text-white menu-icon"></i>
                      </b-button>

                      <b-button
                        size="sm"
                        @click="update(user.id)"
                        v-b-tooltip.hover
                        title="Modifier"
                        variant="warning"
                      >
                        <!-- <i
                          class="fa fa-pencil-square-o  text-dark" aria-hidden="true"
                        ></i> -->
                        <i
                          class="fa fa-pencil-square-o text-dark"
                          aria-hidden="true"
                        ></i>
                      </b-button>
                      <b-button
                        @click="supprimer(index)"
                        size="sm"
                        v-b-tooltip.hover
                        title="Supprimer"
                        variant="danger"
                      >
                        <i class="mdi mdi mdi-delete text-white menu-icon"></i>
                      </b-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- modal pour les detailsde chaque ligne -->
    <div
      class="modal fade"
      id="showDetail"
      tabindex="-1"
      role="dialog"
      aria-labelledby="showDetailLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="showDetailLabel">Détail :</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="alert alert-success" role="alert">
            <p class="text-center">
              Informations concernant l'utilisateur {{ user.name }}
              {{ user.prenom }}
            </p>
          </div>

          <div class="modal-body">
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="text-right">
                  <h5 class="modal-title">Nom :</h5>
                </div>
                <div class="text-left">
                  <p class="modal-title">{{ user.name }}</p>
                </div>
              </div>
            </div>

            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="text-right">
                  <h5 class="modal-title">Prénom :</h5>
                </div>
                <div class="text-left">
                  <p class="modal-title">{{ user.prenom }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="text-right">
                  <h5 class="modal-title">Nom d'utilisateur :</h5>
                </div>
                <div class="text-left">
                  <p class="modal-title">{{ user.nom_utilisateur }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="text-right">
                  <h5 class="modal-title text-bold">Rôle :</h5>
                </div>
                <div class="text-left">
                  <p class="modal-title">
                    <!-- {{ getNomRole(user.role_id) }} -->
                    <!-- <td>{{ user.role.name }}</td> -->
                    <!-- {{ user.role.name }} -->
                    {{ user.role ? user.role.name : "Rôle non disponible" }}
                  </p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="text-right">
                  <h5 class="modal-title">Centre:</h5>
                </div>
                <div class="text-left">
                  <p class="modal-title">
                    {{ getNomCenter(user.idcentre) }}
                  </p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="text-right">
                  <h5 class="modal-title">Email :</h5>
                </div>
                <div class="text-left">
                  <p class="modal-title">{{ user.email }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="text-right">
                  <h5 class="modal-title">Téléphone :</h5>
                </div>
                <div class="text-left">
                  <p class="modal-title">{{ user.telephone }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="text-right">
                  <h5 class="modal-title">Sexe :</h5>
                </div>
                <div class="text-left">
                  <p class="modal-title">{{ user.sexe }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="text-right">
                  <h5 class="modal-title">Adresse :</h5>
                </div>
                <div class="text-left">
                  <p class="modal-title">{{ user.adresse }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <div class="mx-auto">
              <button
                type="button"
                class="btn btn-secondary btn-rounded"
                data-dismiss="modal"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- modal pour les detailsde chaque ligne -->
    <div
      class="modal fade"
      id="confirmDeleteModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="confirmDeleteModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmDeleteModalLabel">
              Confirmation de la suppression
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Êtes-vous sûr de vouloir supprimer cet élément "{{ deleteName }}" ?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary btn-rounded"
              data-dismiss="modal"
            >
              Annuler
            </button>
            <button
              type="button"
              class="btn btn-secondary btn-medpay-gray"
              @click="confirmDelete"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from "jquery";
import * as JSZip from "../../../node_modules/jszip";
window.JSZip = JSZip;
import pdfMake from "../../../node_modules/pdfmake/build/pdfmake";
import vfsFonts from "../../../node_modules/pdfmake/build/vfs_fonts";
pdfMake.vfs = vfsFonts.pdfMake.vfs;
import "../../../node_modules/datatables.net-dt";
import "../../../node_modules/datatables.net-bs4/js/dataTables.bootstrap4";
import "../../../node_modules/datatables.net-buttons/js/dataTables.buttons";
import "../../../node_modules/datatables.net-buttons-bs4/js/buttons.bootstrap4";
import FrenchTranslation from "@/assets/datatable/French.json";
import "../../../node_modules/datatables.net-buttons/js/buttons.html5.js";
import "../../../node_modules/datatables.net-buttons/js/buttons.print.js";
import "../../../node_modules/datatables.net-buttons/js/buttons.colVis.js";
import "../../../node_modules/bootstrap/dist/js/bootstrap.js"; // tres important pour le modal
import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js"; // tres important pour le modal
import { LoginService } from "@/_services";
import { centreService } from "@/_services";
import { roleService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";
require("datatables.net-dt");
export default {
  name: "create-actes-medicaux",

  data() {
    return {
      today: new Date().toISOString().split("T")[0],
      // user: JSON.parse(localStorage.getItem("user")),
      // selected: "",
      // options: [
      //   { item: "F", name: " Feminin" },
      //   { item: "M", name: " Masculin" },
      // ],
      users: [],
      table: null,
      roles: [],
      role_id: "",
      idcentre: "",
      telephone: "",
      centres: [],
      email: "",
      name: "",
      deleteIndex: null,
      user: "",
      deleteName: "",
      id: "",
      prenom: "",
      sexe: "",
      centre: "",
      nom: "",
      user: [],
      nom_utilisateur: "",
      adresse: "",
    };
  },

  mounted() {
    // LoginService.getUser(this.id).then((res) => {
    //   this.user = res.data.data;
    //   this.user.id = this.id;
    // });
    // centreService
    //   .getAllcentres()
    //   .then((res) => {
    //     this.centres = res.data.data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // roleService
    //   .getAllRoles()
    //   .then((res) => {
    //     console.log("Role Data:", res.data.data);
    //     this.roles = res.data.data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    LoginService.getAllUsers().then((res) => {
      this.users = res.data.data;
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
            {
              extend: "csvHtml5",
              charset: "utf-8",
              bom: true,
              className: "btn btn-gray btn-sm", // Extend the excel button
            },
            {
              extend: "excelHtml5",
              charset: "utf-8",
              bom: true,
              className: "btn btn-gray btn-sm",
            },
            {
              extend: "pdfHtml5",
              charset: "utf-8",
              bom: true,
              className: "btn btn-gray btn-sm",
              // className: 'btn btn-primary',
            },

            // {
            //   extend: "pdfHtml5",
            //   charset: "utf-8",
            //     bom: true,

            //   // className: 'btn btn-primary',
            //   exportOptions: {
            //     columns: [0, 1, 2, 3, 4, 5, 6], // Inclut les colonnes d'index 0, 2 et 3

            //     styles: {
            //       table: {
            //         alignment: "center",
            //       },
            //     },
            //   },
            // },

            {
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
            },
          ],
        });
      });
    });

    table.buttons().container().prependTo("#myTable_wrapper .col-md-6:eq(0)");
  },

  // methods: {
  //   showDetail() {
  //     $("#showDetail").modal("show");
  //   },
  // },
  methods: {
    // getNomRole(roleId) {
    //   const role = this.roles.find((role) => role.id === roleId);
    //   return role ? role.name : "";
    // },
    getNomRole(roleId) {
      if (Array.isArray(this.roles)) {
        console.log("Roles:", JSON.parse(JSON.stringify(this.roles)));
        const role = this.roles.find((role) => role.id === roleId);
        return role ? role.name : "";
      }
      return "";
    },

    getNomCenter(centreId) {
      const centre = this.centres.find((centre) => centre.id === centreId);
      return centre ? centre.nom : "";
    },
    detail(user) {
      this.user = user;
      $("#showDetail").modal("show");
    },

    update(id) {
      this.$router.push("/user/update/" + id);
    },
    supprimer(index) {
      this.deleteIndex = index;
      this.deleteName = this.users[index].name;
      $("#confirmDeleteModal").modal("show");
    },

    confirmDelete() {
      const index = this.deleteIndex;
      const name = this.deleteName;
      if (index !== null) {
        LoginService.deleteUser(this.users[index].id)
          .then((res) => {
            this.users.splice(index, 1);
            console.log(res);
            // Afficher le toast de succès
            this.$toast.success("Utilisateur supprimé avec succès !", {
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
@import "../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
/* @import '../../../node_modules/datatables.net-dt/css/jquery.dataTables.css'; */

@import "../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";
/* @import '../../../node_modules/datatables.net-buttons-bs4/css/buttons.bootstrap4.css'; */

/* 
@import '../../assets/datatable/dataTables.bootstrap4.css';
@import '../../assets/datatable/vendor.bundle.base.css'; */
/* @import '../../assets/datatable/dataTables.bootstrap4.css'; */

table {
  /* border-collapse: collapse; */
  width: 100%;
}

th {
  background-color: #d4d4d4;
  font-weight: bold;
}

th,
td {
  /* border: 1px solid rgb(139, 139, 139); */
  padding: 8px;
  text-align: left;
}

select {
  cursor: pointer;
  height: 43px !important;
}

input[type="radio"].demo6 {
  display: none;
}

input[type="radio"].demo6 + label {
  position: relative;
  padding-left: 1.3rem;
}

input[type="radio"].demo6 + label::before,
input[type="radio"].demo6 + label::after {
  display: block;
  position: absolute;
  box-sizing: border-box;
  content: "";
  border-radius: 1rem;
}

input[type="radio"].demo6 + label::before {
  bottom: 0;
  left: 0;
  border: 1px solid #ccc;
  background-color: #eee;
  width: 1rem;
  height: 1rem;
}

input[type="radio"].demo6 + label::after {
  bottom: 3px;
  left: 3px;
  width: calc(1rem - 6px);
  height: calc(1rem - 6px);
}

input[type="radio"].demo6:checked + label::after {
  background-color: #45c28e;
}

input[type="checkbox"].demo2 {
  display: none;
}

input[type="checkbox"].demo2 + label::before {
  content: "";
  border: 1px solid #45c28e;
  padding: 0 0.6rem;
  margin-right: 0.3rem;
}

input[type="checkbox"].demo2:checked + label::before {
  background-color: #45c28e;
}

/* modal */
/* CSS pour le modal */
.modal {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-dialog {
  margin-top: 10vh;
}

.modal-content {
  background-color: #fff;
  border-radius: 5px;
  padding: 20px;
}

.modal-header {
  border-bottom: none;
}

.modal-title {
  margin-bottom: 10px;
  font-size: 20px;
  font-weight: bold;
}

.close {
  font-size: 24px;
  font-weight: bold;
  color: #000;
}

.alert {
  margin-bottom: 20px;
  background-color: #d4edda;
  color: #155724;
  border-color: #c3e6cb;
  border-radius: 0.25rem;
  padding: 0.75rem 1.25rem;
}

.alert p {
  margin: 0;
}

.modal-body {
  margin-bottom: 20px;
}

.row {
  margin-bottom: 10px;
}

.text-right {
  text-align: right;
}

.text-left {
  text-align: left;
}

/* .text-bold {
  font-weight: bold;
} */

.modal-footer {
  border-top: none;
  text-align: center;
}

.btn-secondary {
  background-color: #6c757d;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: #5a6268;
}
</style>

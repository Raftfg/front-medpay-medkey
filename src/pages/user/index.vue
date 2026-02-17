<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-2 text-center" style="
                                              background-color: #0b5d3f;
                                              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                                            ">
              Liste des utilisateurs
            </h3>
            <div class="mx-auto ">
              <router-link to="/user/create">
                <button type="submit" class="btn btn-success btn-medpay-green mr-2">
                  Ajouter
                </button>
              </router-link>
            </div>
            <div class="table-responsive mt-2">
              <table id="order-listing" ref="myTable" class="table table-bordered">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Nom</th>
                    <th>Prénom(s)</th>
                    <th>Email</th>
                    <th>Téléphone</th>
                    <th>Adresse</th>
                    <th>Sexe</th>
                    <th>Rôle</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in users" :key="user.uuid">
                    <td>{{ index + 1 }}</td>
                    <td style="text-transform: uppercase">{{ user.name }}</td>
                    <td style="text-transform: capitalize">
                      {{ user.prenom }}
                    </td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.telephone }}</td>
                    <td>{{ user.adresse }}</td>
                    <td>{{ user.sexe }}</td>
                    <td>{{ getUserRole(user) }}</td>
                    <td class="text-right" width="50px">
                      <div class="btn-group btn-group-sm" role="group">
                        <button id="btnGroupDrop1" type="" style="padding: 0px 10px" class="btn btn-light dropdown-toggle"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          &nbsp;
                          <i class="fa fa-tasks" aria-hidden="true"></i> &nbsp;
                        </button>
                        <div class="dropdown-menu action-button-div" aria-labelledby="btnGroupDrop1"
                          style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%)">
                          <button @click="update(user.uuid)" class="dropdown-item font-weight-bold" style="color: black;"
                            data-toggle="modal" data-target="#updateInsuranceModal">
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                            Modifier
                          </button>
                          <hr class="m-1" />
                          <button @click="supprimer(index)" class="dropdown-item text-danger font-weight-bold"
                            data-toggle="modal" data-target="#confirmDeleteModal">
                            <i class="ma  s²di mdi mdi-delete menu-icon"></i>
                            Supprimer
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
    <!-- Modal  -->
    <div class="modal fade" id="confirmDeleteModal" tabindex="-1" role="dialog" aria-labelledby="confirmDeleteModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="confirmDeleteModalLabel">
              Confirmation de la suppression
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            Vous êtes sur le point de supprimer l'utilisateur
            <strong>{{ deleteName }}</strong> . Confirmez-vous cette action ?
          </div>
          <!-- <div class="modal-footer ">
            <button type="button" class="btn btn-secondary  btn-rounded" data-dismiss="modal">
              Annuler
            </button>
            <button type="button" class="btn btn-danger btn-medpay-gray" @click="confirmDelete">
              Supprimer
            </button>
          </div> -->
          <div class="modal-footer text-center">
            <button type="button" class="btn btn-danger btn-medpay-gray mx-auto d-block" @click="confirmDelete">
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
import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
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
import { roleService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";
require("datatables.net-dt");
export default {
  name: "create-actes-medicaux",
  data() {
    return {
      today: new Date().toISOString().split("T")[0],
      // userr: JSON.parse(localStorage.getItem("user")),
      // permission: JSON.parse(localStorage.getItem("permission")) || [],
      users: [],
      table: null,
      deleteIndex: null,
      deleteName: "",
      email: "",
      name: "",
      prenom: "",
      telephone: "",
      roles: [],
      adresse: "",
      sexe: "",
      user: {},
    };
  },
  mounted() {

    LoginService.getUser(this.uuid).then((res) => {
      this.user = res.data.data;
      this.user.uuid = this.uuid;
    });


    roleService.getAllRoles().then((res) => {
      this.roles = res.data.data;
      console.log(this.roles);
    });
    LoginService.getAllUsers().then((res) => {
      this.users = res.data.data;
      this.$nextTick(() => {
        this.table = $(this.$refs.myTable).DataTable({
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
            //   extend: "csvHtml5",
            //   charset: "utf-8",
            //   bom: true,
            //   className: "btn btn-gray btn-sm", // Extend the excel button
            // },
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
            // {
            //   extend: "print",
            //   charset: "utf-8",
            //   bom: true,
            //   className: "btn btn-gray btn-sm",
            // },
            // {
            //   extend: "copy",
            //   charset: "utf-8",
            //   bom: true,
            //   className: "btn btn-gray btn-sm",
            // },
          ],
        });
        this.table.buttons().container().prependTo("#myTable_wrapper .col-md-6:eq(0)");
      });
    });

  },
  methods: {
    detail(user) {
      this.user = user;
      $("#showDetail").modal("show");
    },

    update(uuid) {
      this.$router.push("/user/update/" + uuid);
    },
    supprimer(index) {
      this.deleteIndex = index;
      this.deleteName = this.users[index].name + " " + this.users[index].prenom;
      $("#confirmDeleteModal").modal("show");
    },

    getUserRole(user) {
      return user && user.roles && user.roles.length > 0
        ? user.roles[0].name
        : "Aucun rôle";
    },



    confirmDelete() {
      const index = this.deleteIndex;
      const name = this.deleteName;
      if (index !== null) {
        LoginService.deleteUser(this.users[index].uuid)
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

.card .card-title {
  text-transform: none;
}
</style>

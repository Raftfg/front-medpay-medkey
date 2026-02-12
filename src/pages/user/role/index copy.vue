<template>
  <section class="container-scroller">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold"
              >Paramètre</a
            >
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Rôle Utilisateurs
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
            <h4 class="card-title">Liste des Rôles Utilisateurs</h4>
            <div class="mx-auto mt-5 mb-5">
              <router-link to="/user/role/create">
                <button type="submit" class="btn btn-success btn-medpay-green mr-2">
                  Ajouter
                </button>
              </router-link>
            </div>
            <div class="table-responsive mt-3">
              <table
                id="order-listing"
                ref="myTable"
                class="table table-bordered"
              >
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Rôle</th>
                    <th>Description</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(role, index) in roles" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td>{{ role.name }}</td>
                    <td>{{ role.description }}</td>

                    <td class="text-center">
                      <b-button
                        @click="update(role.id)"
                        size="sm"
                        v-b-tooltip.hover
                        title="Modifier"
                        variant="warning"
                      >
                        <i
                          class="fa fa-pencil-square-o  text-dark" aria-hidden="true"
                        ></i>
                      </b-button>
                      <b-button
                        @click="supprimer(index)"
                        size="sm"
                        v-b-tooltip.hover
                        title="Supprimer"
                        variant="danger"
                      >
                        <i
                          class="mdi mdi mdi-delete text-white menu-icon"
                        ></i>
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
            Êtes-vous sûr de vouloir supprimer le rôle "{{ deleteName }}" ?
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary btn-rounded"
              data-dismiss="modal"
            >
              Annuler
            </button>
            <button type="button"  class="btn btn-secondary btn-medpay-gray" @click="confirmDelete">
              Supprimer
            </button>
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
          <div class="modal-body">
            <form class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="exampleInputUsername1">Rôle</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputUsername1"
                    placeholder="Rôle"
                  />
                </div>
                <div class="form-group">
                  <label for="exampleInputUsername1">Description</label>
                  <textarea
                    class="form-control"
                    id="exampleTextarea1"
                    rows="4"
                  ></textarea>
                </div>
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <div class="mx-auto">
              <button type="submit" class="btn btn-success btn-medpay-green mr-2">
                Ajouter
              </button>

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
  </section>
</template>

<script>
// import "@/assets/vendors/mdi/css/materialdesignicons.min.css";

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
import { roleService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

require("datatables.net-dt");

export default {
  name: "list-role",

  data() {
    return {
      today: new Date().toISOString().split("T")[0],
      selected: "",
      roles: [],
      name: "",
      description: "",
      table: null,
      deleteIndex: null,
      deleteName: "",
    };
  },

  // methods: {
  //   showDetail() {
  //     $("#showDetail").modal("show");
  //   },
  // },

  mounted() {
    roleService.getRole(this.id).then((res) => {
      this.role = res.data.data;
      this.role.id = this.id;
    });
    roleService.getAllRoles().then((res) => {
      this.roles = res.data.data;
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
              extend: "csvHtml5", className: 'btn btn-gray btn-sm', // Extend the excel button
            },
            {
              extend: "excelHtml5",className: 'btn btn-gray btn-sm', 
            },

            {
              extend: "pdfHtml5",className: 'btn btn-gray btn-sm', 
              // className: 'btn btn-primary',
            },

            { extend: "print", className: 'btn btn-gray btn-sm',  },
            { extend: "copy", className: 'btn btn-gray btn-sm',  },
          ],
        });
      });
    });

    table.buttons().container().prependTo("#myTable_wrapper .col-md-6:eq(0)");
  },
  methods: {
    // detail(compagnie) {
    //   this.nom = compagnie.nom;
    //   this.adresse = compagnie.adresse;
    //   this.telephone = compagnie.telephone;
    //   this.email = compagnie.email;
    //   $("#showDetail").modal("show");
    // },
    update(id) {
      this.$router.push("/user/role/update/" + id);
    },

    supprimer(index) {
      this.deleteIndex = index;
      this.deleteName = this.roles[index].name;
      $("#confirmDeleteModal").modal("show");
    },

    confirmDelete() {
      const index = this.deleteIndex;
      const name = this.deleteName;
      if (index !== null) {
        roleService
          .deleteRole(this.roles[index].id)
          .then((res) => {
            this.roles.splice(index, 1);
            console.log(res);
            this.$toast.success("Rôle supprimé avec succès !", {
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
/* @import '../../../node_modules/datatables.net-dt/css/jquery.dataTables.css'; */

@import "../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";

table {
  border-collapse: collapse;
  width: 100%;
}

th {
  background-color: #d4d4d4;
  font-weight: bold;
}

th,
td {
  border: 1px solid rgb(139, 139, 139);
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
</style>

<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <!-- <h4 class="card-title">Liste des assurances Compagnies</h4> -->
            <h3 class="card-title text-white rounded p-3 mb-2 text-center"
              style="background-color: #0b5d3f;box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              Liste des rôles
            </h3>
            <div class="mx-auto ">
              <button type="submit" class="btn btn-success btn-medpay-green mr-2" data-toggle="modal"
                data-target="#addRoleModal">
                Ajouter
              </button>
            </div>
            <div class="table-responsive mt-2">
              <table id="order-listing" ref="myTable" class="table table-bordered">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Nom</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(role, index) in roles" :key="role.uuid">
                    <td>{{ index + 1 }}</td>
                    <td style="text-transform: uppercase">{{ role.name }}</td>
                    <td class="text-right" width="50px">
                      <div class="btn-group btn-group-sm" role="group">
                        <button id="btnGroupDrop1" type="" style="padding: 0px 10px" class="btn btn-light dropdown-toggle"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          &nbsp;
                          <i class="fa fa-tasks" aria-hidden="true"></i> &nbsp;
                        </button>
                        <div class="dropdown-menu action-button-div" aria-labelledby="btnGroupDrop1"
                          style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%)">
                          <!-- <a @click="create(role.uuid)" class="dropdown-item" style="cursor: pointer;">
                            <button class="dropdown-item font-weight-bold" style="color: black; margin-left: -24px;"
                              data-toggle="modal" data-target="#ajouterPackModal">
                              <i class="fa fa-plus" aria-hidden="true"></i>
                              Ajouter pack
                            </button>
                          </a> -->
                          <button @click="preparingForRoleUpdate(role.uuid)" class="dropdown-item font-weight-bold"
                            style="color: black;" data-toggle="modal" data-target="#updateRoleModal">
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                            Modifier
                          </button>
                          <hr class="m-1" />
                          <button @click="supprimer(index)" class="dropdown-item text-danger font-weight-bold"
                            data-toggle="modal" data-target="#confirmDeleteModal">
                            <i class="mdi mdi mdi-delete menu-icon"></i>
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
    <!-- Modal -->
    <div class="modal fade" id="addRoleModal" ref="addRoleModal">
      <div class="modal-dialog">
        <h4 class="card-title text-white p-3 mt-4 text-center col-12"
          style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top: -17px !important">
          Ajouter un rôle
        </h4>
        <div class="modal-content" style="margin-top: -17px !important; background-color: white;">
          <div class="modal-body">
            <form class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="name">Nom<span style="color: red">*</span></label>
                  <input :class="{
                    'form-control': true,
                    'is-invalid': formErrors.role.name.haveError,
                  }" id="name" type="text" minlength="5" maxlength="125" v-model="role.name"
                    placeholder="Entrez le rôle" required />
                  <div class="invalid-feedback" v-if="formErrors.role.name.haveError">
                    {{ formErrors.role.name.message }}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="d-flex justify-content-between col-12 flex-row">
              <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal" @click="clearData">
                Annuler
              </button>
              <button type="submit" class="btn btn-success btn-medpay-green" @click="createRole">
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="updateRoleModal">
      <div class="modal-dialog">
        <h4 class="card-title text-white p-3 mt-4 text-center col-12"
          style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top: -17px !important">
          Mettre à jour un rôle
        </h4>
        <div class="modal-content" style="margin-top: -17px !important; background-color: white;">
          <div class="modal-body">
            <form class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="name">Nom<span style="color: red">*</span></label>
                  <input :class="{
                    'form-control': true,
                    'is-invalid': formErrors.role.name.haveError,
                  }" id="name" type="text" minlength="5" maxlength="125" v-model="role.name"
                    placeholder="Mettez à jour le rôle" required />
                  <div class="invalid-feedback" v-if="formErrors.role.name.haveError">
                    {{ formErrors.role.name.message }}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="d-flex justify-content-between col-12 flex-row">
              <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal" @click="clearRoleData">
                Annuler
              </button>

              <button type="submit" class="btn btn-success btn-medpay-green" @click="updateRole">
                Enregistrer
              </button>
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
            Vous êtes sur le point de supprimer le rôle
            <strong>{{ deleteName }}</strong> . Confirmez-vous cette action ?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-rounded" data-dismiss="modal">
              Annuler
            </button>
            <button type="button" class="btn btn-danger btn-medpay-gray" @click="confirmDelete">
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>




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
      role: {
        name: ""
      },
      name: "",
      table: null,
      deleteIndex: null,
      deleteName: "",
      formErrors: {
        role: {
          name: {
            haveError: false,
            message: "",
          },
        },
      },
    };
  },

  // methods: {
  //   showDetail() {
  //     $("#showDetail").modal("show");
  //   },
  // },

  mounted() {
    // roleService.getRole(this.uuid).then((res) => {
    //   this.role = res.data.data;
    //   this.role.uuid = this.uuid;
    // });
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
            // {
            //   extend: "csvHtml5", className: 'btn btn-gray btn-sm', // Extend the excel button
            // },
            // {
            //   extend: "excelHtml5",className: 'btn btn-gray btn-sm', 
            // },

            // {
            //   extend: "pdfHtml5",className: 'btn btn-gray btn-sm', 
            //   // className: 'btn btn-primary',
            // },

            // { extend: "print", className: 'btn btn-gray btn-sm',  },
            // { extend: "copy", className: 'btn btn-gray btn-sm',  },
          ],
        });
      });
    });

    table.buttons().container().prependTo("#myTable_wrapper .col-md-6:eq(0)");
  },
  methods: {
    // update(uuid) {
    //   this.$router.push("/user/role/update/" + uuid);
    // },
    refreshRoles() {
      roleService.getAllRoles().then((res) => {
        this.roles = res.data.data;
      });
    },
    clearRoleData() {
      this.role = {
        name: "",
      };
    },
    preparingForRoleUpdate(uuid) {
      roleService.getRole(uuid).then((res) => {
        this.role = res.data.data;
        this.role.uuid = uuid;
      });
    },
    clearRoleError() {
      this.formErrors = {
        role: {
          name: {
            haveError: false,
            message: "",
          },
        },
      };
    },
    clearData() {
      this.clearRoleData();
      this.clearRoleError();
    },

    createRole() {
      this.clearRoleError();

      roleService
        .addRole(this.role)
        .then((response) => {
          //Reset form field and errors and refresh categories tab
          this.clearData();
          this.refreshRoles();

          // Close the "Add Category" modal
          $('#addRoleModal').modal('hide');

          this.$toast.success("Enregistrement effectué avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
        })
        .catch((error) => {
          // Traitement en cas d'erreur
          try {
            this.formErrors.role.name.message = error.response.data.errors.name[0];
            this.formErrors.role.name.haveError = true;
          }
          catch (error) {
          }
        });
    },
    updateRole() {
      this.clearRoleError();

      roleService
        .updateRole(this.role)
        .then((response) => {
          //Reset form field and errors and refresh categories tab
          this.clearData();
          this.refreshRoles();

          // Close the "Update Category" modal
          $('#updateRoleModal').modal('hide');

          this.$toast.success("Modification effectuée avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
        })
        .catch((error) => {
          // Traitement en cas d'erreur
          try {
            this.formErrors.role.name.message = error.response.data.errors.name[0];
            this.formErrors.role.name.haveError = true;
          }
          catch (error) {
          }
        });
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
          .deleteRole(this.roles[index].uuid)
          .then((res) => {
            this.roles.splice(index, 1);
            this.$toast.success(res.data.data.message, {
              position: POSITION.TOP_RIGHT,
              timeout: 3000,
              bodyStyle: {
                borderRadius: "10px",
                backgroundColor: "#f0f0f0",
                color: "red",
                fontWeight: "bold",
              },
            });
          })
          .catch((err) => {
            this.$toast.error(err.response.data.data.message, {
              position: POSITION.TOP_RIGHT,
              timeout: 3000,
              bodyStyle: {
                borderRadius: "10px",
                backgroundColor: "#ff0000",
                color: "fff",
                fontWeight: "bold",
              },
            });
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

/* modal suppression  */
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

.card .card-title {
  text-transform: none;
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
</style>

<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3 mb-3 text-center" style="
                          background-color: #0b5d3f;
                          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              Assignation de permission(s) à un rôle utilisateur
            </h3>
          <form class="forms-sample" @submit.prevent="addDroitUser">
              <div class="mx-auto row">
                <div class="col-md-4">
                    <select id="role_id" v-model="uuid" class="form-control" @change="roleSelected">
                      <option value="">Sélectionnez un rôle</option>
                      <option v-for="role in roles" :value="role.uuid" :key="role.uuid">
                        {{ role.name }}
                      </option>
                    </select>
                </div>
              </div>
              <div class="table-responsive col-md-12 mx-auto mt-1">
                <table id="order-listing" ref="myTable" class="table table-bordered">
                  <thead>
                    <tr style="background-color: rgb(216, 218, 216)">
                      <th>Tout</th>
                      <th>Permissions</th>
                      <th class="text-center mx-auto pb-4 pl-4 pr-0">
                        <input type="checkbox" class="form-check-input checkbox" id="checkAll" v-model="allChecked"
                          @change="checkAllPermissions" />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(perm, index) in permissions" :value="perm.uuid" :key="perm.uuid">
                      <td>{{ index + 1 }}</td>
                      <td>{{ perm.name }}</td>
                      <td class="text-center mx-auto pb-4 pl-4 pr-0">
                        <input :id="'perm' + index" type="checkbox" class="form-check-input checkbox"
                          v-model="perm.checked" :checked="perm.checked" @change="canSubmitForm" />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="form-group text-right mx-auto p-1 mt-3">
                  <b-button type="submit" class="" v-b-tooltip.hover title="Valider" variant="success"
                    :disabled="!canSubmit">
                    Valider
                  </b-button>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="successModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="successModalLabel">Résultat</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p v-if="successMessage">{{ successMessage }}</p>

            <p v-if="errorMessage">{{ errorMessage }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-dismiss="modal">
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="resultModal" tabindex="-1" role="dialog" aria-labelledby="resultModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="resultModalLabel">Résultat</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p v-if="detachSuccessMessage">{{ detachSuccessMessage }}</p>
            <p v-if="errorMessage">{{ errorMessage }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Fermer
            </button>
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
import { roleService } from "@/_services";
import { permissionService } from "@/_services";
export default {
  name: "permissions-role",
  data() {
    return {
      today: new Date().toISOString().split("T")[0],
      uuid: "",
      detachSuccessMessage: "",
      roles: [],
      permissions: [],
      permission: "",
      role: "",
      allChecked: false,
      checkedKeys: [],
      successMessage: "",
      errorMessage: "",
      canSubmit: false,
      // roles: {},
    };
  },
  computed: {
  },
  mounted() {
    this.loadRoles();
    this.loadPermissions();
  },
  methods: {
    checkAllPermissions: function () {
      let localPermissions = this.permissions;
      this.permissions = [];
      localPermissions.forEach((perm) => {
        perm.checked = this.allChecked;
      });
      this.permissions = localPermissions;
    },
    canSubmitForm() {
      // Vérifier si un rôle est sélectionné et au moins une permission est cochée
      this.canSubmit =
        this.uuid !== "" && this.permissions.some((p) => p.checked);
    },
    loadRoles() {
      roleService
        .getAllRoles()
        .then((response) => {
          this.roles = response.data.data;

        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadPermissions() {
      permissionService
        .getAllPermissions()
        .then((response) => {
          this.permissions = response.data.data;

          this.permissions.forEach(
            (permission) => (permission.checked = false)
          );
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
              ],
            });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    roleSelected() {
      if (this.uuid != "") {
        console.log("Role selected:", this.uuid); // Afficher le rôle sélectionné
        this.getPermissionsForRole(this.uuid);
      }
    },

    getPermissionsForRole(roleUuid) {
      roleService
        .getPermissionsForRole(roleUuid)
        .then((response) => {
          const permissionsForRole = response.data;
          console.log("Permissions for role:", permissionsForRole); // Afficher les permissions associées au rôle
          let localPermissions = this.permissions;
          this.permissions = [];

          localPermissions.forEach((perm) => {
            perm.checked = permissionsForRole.some((p) => p.uuid === perm.uuid);
          });
          this.permissions = localPermissions;
          this.canSubmitForm();
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des permissions:",
            error
          );
        });
    },
    addDroitUser() {
      if (!this.uuid) {
        this.successMessage = "";
        this.errorMessage = "Veuillez sélectionner un rôle.";
        $("#resultModal").modal("show");
        return;
      }
      const selectedPermissions = this.permissions
        .filter((permission) => permission.checked)
        .map((permission) => permission.uuid);

      if (selectedPermissions.length === 0) {
        this.successMessage = "";
        this.errorMessage = "Veuillez cocher au moins une permission.";
        $("#resultModal").modal("show");
        return;
      }
      const uncheckedPermissions = this.permissions
        .filter((permission) => !permission.checked)
        .map((permission) => permission.uuid);

      let updateMessage = "Modifications ont été enregistrées au rôle.";

      if (uncheckedPermissions.length > 0) {
        // Détacher les permissions seulement si des permissions sont décochées
        roleService
          .detachPermissionsFromRole(this.uuid, uncheckedPermissions)
          .then((response) => {
            console.log(response);
            // this.detachSuccessMessage = "Les permissions ont été détachées avec succès.";
            this.detachSuccessMessage = "Les modifications ont été enregistrées au rôle avec succès.";
            this.permissions.forEach((permission) => {
              permission.checked = false;
            });
            this.getPermissionsForRole(this.uuid);
          })
          .catch((error) => {
            console.log(error);
            this.detachSuccessMessage = "";
            this.errorMessage = "Une erreur s'est produite lors du détachement des permissions.";
            updateMessage = "Une erreur s'est produite lors du détachement des permissions.";
          });
      }

      // Assigner les permissions seulement si des permissions sont cochées
      if (
        this.roles &&
        this.permissions &&
        this.roles.length > 0 &&
        this.permissions.length > 0
      ) {
        const alreadyAssigned = this.roles.some((role) => {
          if (role.permissions && role.permissions.length > 0) {
            return role.permissions.every((assignedPermission) =>
              selectedPermissions.includes(assignedPermission)
            );
          }
          return false;
        });

        if (alreadyAssigned) {
          this.successMessage = "";
          this.errorMessage = "Les permission(s) sont/est déjà assignée(s) au rôle.";
          $("#resultModal").modal("show");
          return;
        }
      }

      roleService
        .droitUsers({
          uuid: this.uuid,
          permissions: selectedPermissions,
        })
        .then((response) => {
          console.log(response);
          this.successMessage = updateMessage;
          this.permissions.forEach((permission) => {
            permission.checked = false;
          });
          this.getPermissionsForRole(this.uuid);
        })
        .catch((error) => {
          console.log(error);
          this.successMessage = "";
          this.errorMessage = "Une erreur s'est produite lors de l'assignation de la permission au rôle.";
          updateMessage = "Une erreur s'est produite lors de l'assignation de la permission au rôle.";
        })
        .finally(() => {
          // Afficher le message, que ce soit une réussite ou une erreur
          $("#resultModal").modal("show");
        });
    },
    showDetail() {
      $("#showDetail").modal("show");
    },
  },
};
</script>
<style scoped>
@import "../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
/* @import "../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css"; */
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

/* style pour le modal  */
#successModal .modal-dialog {
  max-width: 500px;
  border-radius: 10px;
}

#successModal .modal-content {
  border: none;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

#successModal .modal-header {
  background-color: #f8f9fa;
  border-radius: 10px 10px 0 0;
  border-bottom: none;
}

#successModal .close {
  font-size: 24px;
  color: #6c757d;
}

#successModal .modal-body {
  padding: 20px;
}

#successModal .modal-title {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

#successModal .modal-footer {
  border-top: none;
  background-color: #f8f9fa;
  border-radius: 0 0 10px 10px;
}

#successModal .btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

#successModal .btn-primary:hover,
#successModal .btn-primary:focus {
  background-color: #0069d9;
  border-color: #0062cc;
}

.card .card-title {
  text-transform: none;
}
</style>

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
            Droits Utilisateurs
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
            <h4 class="card-title">Droits des Utilisateurs</h4>

            <form class="forms-sample" @submit.prevent="addDroitUser">
              <div class="col-md-10 mx-auto row mt-4">
                <div class="form-group col-md-12">
                  <label for="exampleFormControlSelect1"
                    >Sélectionner un Rôle</label
                  >
                  <select id="patient_id" v-model="id" class="form-control">
                    <option value="">Sélectionnez un rôle</option>
                    <option
                      v-for="role in roles"
                      :value="role.id"
                      :key="role.id"
                    >
                      {{ role.name }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="table-responsive col-md-10 mx-auto mt-1">
                <table id="order-listing" class="table">
                  <thead>
                    <tr style="background-color: rgb(216, 218, 216)">
                      <th>Tout</th>
                      <th>Permissions</th>
                      <th class="text-center mx-auto pb-4 pl-4 pr-0">
                        <input
                          type="checkbox"
                          class="form-check-input checkbox"
                          id="checkAll"
                          v-model="allChecked"
                        />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(permission, index) in permissions"
                      :value="permission.id"
                      :key="permission.id"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>{{ permission.name }}</td>
                      <td class="text-center mx-auto pb-4 pl-4 pr-0">
                        <input
                          type="checkbox"
                          class="form-check-input checkbox"
                          v-model="permission.checked"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="form-group text-right mx-auto p-1 mt-3">
                  <b-button
                    type="submit"
                    class=""
                    v-b-tooltip.hover
                    title="Valider"
                    variant="success"
                    :disabled="!canSubmitForm"
                  >
                    Valider
                  </b-button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="successModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="successModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="successModalLabel">Résultat</h5>
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
  </section>
</template>

<script>
import $ from "jquery";
// import $ from 'jquery';
import "../../../../node_modules/bootstrap/dist/js/bootstrap.js"; // tres important pour le modal
import "../../../../node_modules/bootstrap/dist/js/bootstrap.min.js"; // tres important pour le modal
import { roleService } from "@/_services";
import { permissionService } from "@/_services";

export default {
  name: "permissions-role",

  data() {
    return {
      today: new Date().toISOString().split("T")[0],
      id: "",
      roles: [],
      permissions: [],
      permission: "",
      role: "",
      allChecked: false,
      checkedKeys: [],
      successMessage: "",
      errorMessage: "",

      // roles: {},
    };
  },

  computed: {
    canSubmitForm() {
      // Vérifier si un rôle est sélectionné et au moins une permission est cochée
      return this.id !== "" && this.permissions.some((p) => p.checked);
    },
  },

  mounted() {
    $("#checkAll").on("change", () => {
      const checked = $("#checkAll").is(":checked");
      this.permissions.forEach((permission) => {
        permission.checked = checked;
      });
      // sffv;
    });

    this.loadRoles();
    this.loadPermissions();
  },

  methods: {
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
        })
        .catch((error) => {
          console.log(error);
        });
    },

    addDroitUser() {
      if (!this.id) {
        this.successMessage = "";
        this.errorMessage = "Veuillez sélectionner un rôle.";

        // Ouvrir le modal d'erreur
        $("#successModal").modal("show");
        return; // Arrêter l'exécution de la méthode
      }

      // Vérifier si aucune case à cocher n'est sélectionnée
      const selectedPermissions = this.permissions
        .filter((permission) => permission.checked)
        .map((permission) => permission.id);

      if (selectedPermissions.length === 0) {
        this.successMessage = "";
        this.errorMessage = "Veuillez cocher au moins une permission.";

        // Ouvrir le modal d'erreur
        $("#successModal").modal("show");
        return; // Arrêter l'exécution de la méthode
      }

      console.log("Données du formulaire :", {
        id: this.id,
        checkedKeys: selectedPermissions,
      });

      if (
        this.roles &&
        this.permissions &&
        this.roles.length > 0 &&
        this.permissions.length > 0
      ) {
        // Vérifier si la permission est déjà assignée au rôle
        const alreadyAssigned = this.roles.some((role) => {
          if (role.permissions && role.permissions.length > 0) {
            return role.permissions.every((assignedPermission) =>
              selectedPermissions.includes(assignedPermission)
            );
          }
          return false;
        });

        if (alreadyAssigned) {
          // Afficher l'erreur dans le modal
          this.successMessage = "";
          this.errorMessage = "La permission est déjà assignée au rôle.";

          // Ouvrir le modal d'erreur
          $("#successModal").modal("show");
          return; // Arrêter l'exécution de la méthode
        }
      }

      roleService
        .droitUsers({
          id: this.id,
          permissions: selectedPermissions,
        })
        .then((response) => {
          // Gérer la réponse de la requête
          console.log(response);
          // Afficher le message de succès dans le modal
          this.successMessage =
            "La permission a été assignée au rôle avec succès.";
          this.errorMessage = "";
          // // Réinitialiser les cases à cocher
          this.permissions.forEach((permission) => {
            permission.checked = false;
          });

          // Réinitialiser le rôle sélectionné
          this.id = "";

          // $("#successModal").modal("show");

          // Ouvrir le modal de succès
          $("#successModal").modal("show");
        })
        .catch((error) => {
          // Gérer les erreurs de la requête
          console.log(error);
          // Afficher le message d'erreur dans le modal
          this.successMessage =
            "Une erreur s'est produite lors de l'assignation de la permission au rôle.";
          this.errorMessage = "";

          // Ouvrir le modal d'erreur
          $("#successModal").modal("show");
        });
    },

    showDetail() {
      $("#showDetail").modal("show");
    },
  },
};
</script>

<style scoped>
/* @import "@/assets/css/demo_1/style.css";
@import "@/assets/vendors/css/vendor.bundle.base.css"; */

@import "../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";

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
</style>

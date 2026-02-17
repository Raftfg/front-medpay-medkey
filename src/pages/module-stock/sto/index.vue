<template>
  <section class="tables">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold"
              >Tableau de board</a
            >
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Gestion de stock
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
            <!-- <h4 class="card-title">Liste des Patients</h4> -->
            <h3
              class="card-title text-white rounded p-3 mb-4 text-center"
              style="
                background-color: #0B5D3F;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              "
            >
            Liste des articles
            </h3>
            <div class="mx-auto mt-5 mb-4">
              <router-link to="'#'">
                <button type="submit" class="btn btn-success btn-medpay-green mr-2">
                  Ajouter
                </button>
              </router-link>
            </div>
            <div class="table-responsive">
              <table id="order-listing" ref="myTable" class="table table-bordered">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Nom</th>
                    <th>Prénom(s)</th>
                    <th>Age</th>
                    <th>Téléphone</th>
                    <th>Adresse</th>
                    <th>Sexe</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(patient, index) in patients" :key="patient.id">
                    <td>{{ index + 1 }}</td>
                    <td style="text-transform: uppercase">{{ patient.nom }}</td>
                    <td style="text-transform: capitalize">
                      {{ patient.prenom }}
                    </td>
                    <td>{{ patient.age }}</td>
                    <td>{{ patient.telephone }}</td>
                    <td>{{ patient.adresse }}</td>
                    <td>{{ patient.sexe }}</td>
                    <td class="text-center">
                      <b-button
                        @click="detail(patient)"
                        size="sm"
                        v-b-tooltip.hover
                        title="Détail"
                        variant="success"
                      >
                        <i
                          class="mdi mdi-eye text-white menu-icon"
                        ></i>
                      </b-button>

                      <b-button
                        @click="update(patient.id)"
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
      id="showDetail"
      tabindex="-1"
      role="dialog"
      aria-labelledby="showDetailLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
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
              Informations concernant le patient {{ this.id }}
            </p>
          </div>
          <div class="modal-body">
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Nom :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.nom }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Prénom :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.prenom }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Age :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.age }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Adresse :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.adresse }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Email :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.email }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Téléphone :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.telephone }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Numéro Whatsapp :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.whatsapp }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Numéro d'Urgence :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.urgencecontact }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Profession :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.profession }}</p>
                </div>
              </div>
            </div>
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Sexe :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">{{ this.sexe }}</p>
                </div>
              </div>
            </div>
            <!-- <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Centre Sanitaire :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title">
                    {{ this.centresanitaires_id }}
                  </p>
                </div>
              </div>
            </div> -->
            <div class="row text-center mx-auto">
              <div class="col-sm-12 d-flex">
                <div class="col-sm-6 text-right">
                  <h5 class="modal-title">Autres Informations :</h5>
                </div>
                <div class="col-sm-6 col-md-6 text-left">
                  <p class="modal-title mx-auto">{{ this.autre }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <div class="mx-auto">
              <button type="button"  class="btn btn-secondary btn-medpay-gray" data-dismiss="modal">
                Fermer
              </button>
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
            <button type="button"  class="btn btn-secondary btn-medpay-gray" @click="confirmDelete">
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
import { paysService } from "@/_services";

export default {
  name: "patients",
  data() {
    return {
      patients: [],
      deleteIndex: null,
      deleteName: "",
      table: null,
      nom: "",
      prenom: "",
      age: "",
      adresse: "",
      pays_id: "",
      departement_id: "",
      commune_id: "",
      arrondissement_id: "",
      quartier_id: "",
      telephone: "",
      email: "",
      whatsapp: "",
      profession: "",
      sexe: "",
      urgencecontact: "",
      autre: "",
      id: "",
      // nom, prenom, age, adresse, telephone, email, whatsapp, profession, sexe, urgencecontact, autre,
    };
  },
  mounted() {
    patientService.getPatient(this.id).then((res) => {
      this.patient = res.data.data;
      this.patient.id = this.id;
    });

    patientService.getAllPatients().then((res) => {
      this.patients = res.data.data;
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
            {
              extend: "csvHtml5", charset: 'utf-8', bom: true, className: 'btn btn-gray btn-sm',// Extend the excel button
            },
            {
              extend: "excelHtml5", charset: 'utf-8', bom: true, className: 'btn btn-gray btn-sm',
            },

            {
              extend: "pdfHtml5", charset: 'utf-8', bom: true, className: 'btn btn-gray btn-sm',
              // className: 'btn btn-primary',
            },

            { extend: "print", charset: 'utf-8', bom: true, className: 'btn btn-gray btn-sm', },
            { extend: "copy", charset: 'utf-8', bom: true, className: 'btn btn-gray btn-sm', },
          ],
        });
      });
      table.buttons().container().prependTo("#myTable_wrapper .col-md-6:eq(0)");
    });
  },
  methods: {
    detail(patient) {
      this.id = patient.id;
      this.nom = patient.nom;
      this.prenom = patient.prenom;
      this.age = patient.age;
      this.adresse = patient.adresse;
      this.telephone = patient.telephone;
      this.email = patient.email;
      this.whatsapp = patient.whatsapp;
      this.profession = patient.profession;
      this.sexe = patient.sexe;
      this.pays_id = patient.pays_id;
      this.departement_id = patient.departement_id;
      this.commune_id = patient.commune_id;
      this.arrondissement_id = patient.arrondissement_id;
      this.quartier_id = patient.quartier_id;
      this.urgencecontact = patient.urgencecontact;
      this.autre = patient.autre;
      $("#showDetail").modal("show");
    },
    update(id) {
      this.$router.push("/patients/update/" + id);
    },
    // supprimer(index) {
    //   console.log(index);
    //   patientService
    //     .deletePatient(this.patients[index].id)
    //     .then((res) => {
    //       this.patients.splice(index, 1);
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    supprimer(index) {
      this.deleteIndex = index;
      this.deleteName =
        this.patients[index].nom + " " + this.patients[index].prenom;
      $("#confirmDeleteModal").modal("show");
    },

    // confirmDelete() {
    //   const index = this.deleteIndex;
    //   const name = this.deleteName;

    //   if (index !== null) {
    //     patientService
    //       .deletePatient(this.patients[index].id)
    //       .then((res) => {
    //         this.patients.splice(index, 1);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       })
    //       .finally(() => {
    //         this.deleteIndex = null;
    //         this.deleteName = "";
    //         $("#confirmDeleteModal").modal("hide");
    //       });
    //   }

    // },
    confirmDelete() {
      const index = this.deleteIndex;
      const name = this.deleteName;

      if (index !== null) {
        const patientId = this.patients[index].id;

        // Vérifiez si le patient a des paiements associés
        patientService
          .getPaymentsByPatient(patientId)
          .then((response) => {
            const payments = response.data.data;

            if (payments.length > 0) {
              this.$toast.error(
                `Impossible de supprimer ${name} car des paiements ont été effectués.`,
                {
                  position: "top-right",
                  timeout: 3000,
                  bodyStyle: {
                    borderRadius: "10px",
                    backgroundColor: "#f0f0f0",
                    color: "#333",
                    fontWeight: "bold",
                  },
                }
              );
            } else {
              // Supprimez le patient s'il n'y a pas de paiements associés
              patientService
                .deletePatient(patientId)
                .then(() => {
                  this.patients.splice(index, 1);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((error) => {
            console.log(error);
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
</style>

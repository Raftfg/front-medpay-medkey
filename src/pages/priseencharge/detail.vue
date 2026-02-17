<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <!-- <h4 class="card-title">Liste des assurances Compagnies</h4> -->
            <h3 class="card-title text-white rounded p-3 mb-2 text-center"
              style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              Liste des Packs du patient <span style="text-transform: uppercase"> {{ patient.lastname }} {{
                patient.firstname }}</span>
            </h3>
            <div class="table-responsive mt-2">
              <table id="order-listing" ref="myTable" class="table table-bordered">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Assurance</th>
                    <th>Pack</th>
                    <th>Date de début</th>
                    <th>Date de fin</th>
                    <th>Numéro de police</th>
                    <th class="text-center">Statut</th>
                    <!-- <th>Actions</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(packpatient, index) in packpatients" :key="packpatient.uuid">
                    <td>{{ index + 1 }}</td>
                    <td>{{ packpatient.insurance }}</td>
                    <!-- <td>{{ getPackDesignation(packpatient.pack_id) }}</td> -->
                    <td>{{ packpatient.designation }}-({{ packpatient.percentage }})%</td>
                    <td>{{ packpatient.date_debut }}</td>
                    <td>{{ packpatient.date_fin }}</td>
                    <td>{{ packpatient.numero_police }}</td>
                    <td class="text-center"
                      :class="{ 'text-success': getStatus(packpatient.date_debut, packpatient.date_fin) == 'Actif', 'text-danger': getStatus(packpatient.date_debut, packpatient.date_fin) == 'Expiré' }">
                      {{ getStatus(packpatient.date_debut, packpatient.date_fin) }}
                    </td>
                    <!-- <td class="text-right" width="50px">
                      <div class="btn-group btn-group-sm" role="group">
                        <button id="btnGroupDrop1" type="" style="padding: 0px 10px" class="btn btn-light dropdown-toggle"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          &nbsp;
                          <i class="fa fa-tasks" aria-hidden="true"></i> &nbsp;
                        </button>
                        <div class="dropdown-menu action-button-div" aria-labelledby="btnGroupDrop1"
                          style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%)">
                          <button @click="preparingForPackPatientUpdate(packpatient.uuid)"
                            class="dropdown-item font-weight-bold" style="color: black;" data-toggle="modal"
                            data-target="#updatePackPatientModal">
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                        
                            Modifier
                          </button>
                        </div>
                      </div>
                    </td> -->
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="modal fade" id="updatePackModal">
      <div class="modal-dialog">
        <h4 class="card-title text-white p-3 mt-4 text-center col-12"
          style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top: -17px !important">
          Mettre à jour un un pack patient
        </h4>
        <div class="modal-content" style="margin-top: -17px !important; background-color: white;">
          <div class="modal-body">
            <form class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="designation">Date de début<span style="color: red">*</span></label>
                  <input :class="{
                    'form-control': true,
                    'is-invalid': formErrors.packpatient.date_debut.haveError,
                  }" id="designation" type="text" minlength="5" maxlength="125" v-model="packpatient.date_debut"
                    placeholder="Mettez à jour le pack" required />
                  <div class="invalid-feedback" v-if="formErrors.packpatient.date_debut.haveError">
                    {{ formErrors.packpatient.date_debut.message }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="percentage">Date de fin<span style="color: red">*</span></label>
                  <input :class="{
                    'form-control': true,
                    'is-invalid': formErrors.packpatient.date_fin.haveError,
                  }" id="percentage" type="text" minlength="5" maxlength="125" v-model="packpatient.date_fin"
                    placeholder="Mettez à jour l'assurance" required />
                  <div class="invalid-feedback" v-if="formErrors.packpatient.date_fin.haveError">
                    {{ formErrors.packpatient.date_fin.message }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="percentage">Numéro de police<span style="color: red">*</span></label>
                  <input :clasts="{
                    'form-control': true,
                    'is-invalid': formErrors.packpatient.numero_police.haveError,
                  }" id="percentage" type="text" minlength="5" maxlength="125" v-model="packpatient.numero_police"
                    placeholder="Mettez à jour l'assurance" required />
                  <div class="invalid-feedback" v-if="formErrors.packpatient.numero_police.haveError">
                    {{ formErrors.packpatient.numero_police.message }}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="d-flex justify-content-between col-12 flex-row">
              <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal" @click="clearPackPatientData">
                Annuler
              </button>

              <button type="submit" class="btn btn-success btn-medpay-green" @click="updatePackPatient">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div> -->
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
require("datatables.net-dt");
import { packService } from "@/_services";
import { patientService } from "@/_services";
import { insuranceService } from "@/_services";
import { patientinsuranceService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";
export default {
  name: "detail",
  props: ["uuid"],
  data() {
    return {
      packpatient: {},
      packpatients: [],
      insuranceSelected: "",
      insurances: [],
      insurance: {},
      packs: [],
      pack: {},
      errors: null,
      patients: [],
      patients_id: "",
      pack_id: "",
      designation: "",
      pack: [],
      insuranceSelected: null,
      patient: {
        lastname: "",
        firstname: "",
        age: "",
        maison: "",
        emergency_contac: "",
        gender: "",
        insurance: "",
        pack: "",
        percentage: "",
      },
      formErrors: {
        packpatient: {
          date_debut: {
            haveError: false,
            message: "",
          },
          date_fin: {
            haveError: false,
            message: "",
          },
          numero_police: {
            haveError: false,
            message: "",
          },
        },
      },
    };
  },

  mounted() {
    // packService
    //   .getAllPacks()
    //   .then((res) => {
    //     this.packs = res.data.data;
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // Récupérer les détails de l'assurance
    insuranceService.getInsurance(this.uuid).then((res) => {
      this.insurance = res.data.data;
      this.insurance_id = this.uuid;
    });
    // patientinsuranceService.getPatientInsurance(this.uuid).then((res) => {
    //   console.log(res);
    //   console.log("res");
    //   this.packpatient = res.data.data;
    //   this.packpatient.uuid = this.uuid;

    // });

    patientService.getPatient(this.uuid).then((res) => {
      this.patient = res.data.data;
      this.patient.uuid = this.uuid;
    });
    insuranceService
      .getAllInsurances()
      .then((res) => {
        this.insurances = res.data.data;
      })
      .catch((error) => {
        console.log(error);
      });

    packService.getPackByAssurance(this.uuid).then((res) => {
      this.packs = res.data;
    });




    // Récupérer les packs associés à l'assurance
    patientinsuranceService.getPackDetailsByPatient(this.uuid).then((res) => {
      this.packpatients = res.data;
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
        table
          .buttons()
          .container()
          .prependTo("#myTable_wrapper .col-md-6:eq(0)");
      });
    }).catch((error) => {
      console.error(error);
    });
  },
  methods: {
    // refreshPackPatients() {
    //   patientinsuranceService.getPackDetailsByPatient(this.uuid).then((res) => {
    //     this.packpatients = res.data;
    //   });
    // },
    // clearPackPatientData() {
    //   this.packpatient = {
    //     date_debut: "",
    //     date_fin: "",
    //     numero_police: "",
    //   };
    // },
    // preparingForPackPatientUpdate(uuid) {
    //   patientinsuranceService.getPatientInsurance(uuid).then((res) => {
    //     this.packpatient = res.data.data;
    //     console.log(this.packpatient);
    //     this.packpatient.uuid = uuid;
    //   });
    // },
    // clearPackPatientError() {
    //   this.formErrors = {
    //     packpatient: {
    //       date_debut: {
    //         haveError: false,
    //         message: "",
    //       },
    //       date_fin: {
    //         haveError: false,
    //         message: "",
    //       },
    //       numero_police: {
    //         haveError: false,
    //         message: "",
    //       },
    //     },
    //   };
    // },
    // clearData() {
    //   this.clearPackPatientData();
    //   this.clearPackPatientError();
    // },
    // updatePackPatient() {
    //   this.clearPackPatientError();
    //   // this.pack.insurances_id = this.insurance_id;
    //   // if (this.pack.insurances) {
    //   //   delete this.pack.insurances;
    //   //   delete this.pack.users;

    //   // }
    //   const packPatientInsurance = {
    //     date_debut: this.packpatient.date_debut,
    //     date_fin: this.packpatient.date_fin,
    //     numero_police: this.packpatient.numero_police,
    //     uuid: this.packpatient.uuid,
    //   };

    //   // console.log(packInsurance);

    //   patientinsuranceService
    //     .updatePatientInsurances(packPatientInsurance)
    //     .then((response) => {
    //       //Reset form field and errors and refresh categories tab
    //       this.clearData();
    //       this.refreshPackPatients();

    //       // Close the "Update Category" modal
    //       $('#updatePackPatientModal').modal('hide');

    //       this.$toast.success("Modification effectuée avec succès !", {
    //         position: POSITION.TOP_RIGHT,
    //         timeout: 3000,
    //         bodyStyle: {
    //           borderRadius: "10px",
    //           backgroundColor: "#f0f0f0",
    //           color: "#333",
    //           fontWeight: "bold",
    //         },
    //       });
    //     })
    //     .catch((error) => {
    //       // Traitement en cas d'erreur
    //       try {
    //         this.formErrors.packpatient.date_debut.message = error.response.data.errors.date_debut[0];
    //         this.formErrors.packpatient.date_debut.haveError = true;
    //         this.formErrors.packpatient.date_fin.message = error.response.data.errors.date_fin[0];
    //         this.formErrors.packpatient.date_fin.haveError = true;
    //         this.formErrors.packpatient.numero_police.message = error.response.data.errors.numero_police[0];
    //         this.formErrors.packpatient.numero_police.haveError = true;
    //       }
    //       catch (error) {
    //       }
    //     });
    // },
    getStatus(dateDebut, dateFin) {
      const now = new Date();
      const debut = new Date(dateDebut);
      const fin = new Date(dateFin);

      if (now < fin) {
        return "Actif"; // Si la date actuelle est inférieure à la date de fin
      } else {
        return "Expiré"; // Si la date actuelle est supérieure à la date de fin
      }
    },

    // getPackDesignation(uuid) {
    //   // Fonction pour obtenir la désignation du pack par son ID
    //   const pack = this.packs.find((pack) => pack.uuid === uuid);
    //   return pack ? pack.designation : "N/A";
    // },
  },
};
</script>
<style scoped>
@import "../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
/* @import '../../../node_modules/datatables.net-dt/css/jquery.dataTables.css'; */

@import "../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";

fieldset {
  /* border: 1px solid #ccc; */

  padding: 10px;
  margin-bottom: 2px;
  border-radius: 5px;
  box-shadow: #f5f5f5;
  background-color: #f5f5f5;
  padding: 16px;
}

legend {
  font-size: 12px;
}

.card .card-title {
  text-transform: none;
}
.text-success {
  color: green;
  /* Texte en vert pour "En cours" */
}

.text-danger {
  color: red;
  /* Texte en rouge pour "Expiré" */
}
</style>
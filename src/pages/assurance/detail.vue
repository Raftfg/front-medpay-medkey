<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <div class="card">
          <div class="card-body">
            <!-- <h4 class="card-title">Liste des assurances Compagnies</h4> -->
            <h3 class="card-title text-white rounded p-3 mb-2 text-center" style="
                                                          background-color: #0b5d3f;                 
                                                          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
              Liste des Packs de l'assurance <span style="text-transform: uppercase">{{ insurance.name }}</span>
            </h3>
            <div class="table-responsive mt-2">
              <table id="order-listing" ref="myTable" class="table table-bordered">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Nom du pack</th>
                    <th>Pourcentage</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(pack, index) in packs" :key="index">
                    <td>{{ index + 1 }}</td>
                    <td style="text-transform: uppercase">{{ pack.designation }}</td>
                    <td style="text-transform: uppercase">{{ pack.percentage }}%</td>
                    <td class="text-right" width="50px">
                      <div class="btn-group btn-group-sm" role="group">
                        <button id="btnGroupDrop1" type="" style="padding: 0px 10px" class="btn btn-light dropdown-toggle"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          &nbsp;
                          <i class="fa fa-tasks" aria-hidden="true"></i> &nbsp;
                        </button>
                        <div class="dropdown-menu action-button-div" aria-labelledby="btnGroupDrop1"
                          style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%)">
                          <button @click="preparingForPackUpdate(pack.uuid)" class="dropdown-item font-weight-bold"
                            style="color: black;" data-toggle="modal" data-target="#updatePackModal">
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                            <!-- @click="preparingForInsuranceUpdate(insurance.uuid)" -->
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
    <div class="modal fade" id="updatePackModal">
      <div class="modal-dialog">
        <h4 class="card-title text-white p-3 mt-4 text-center col-12"
          style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top: -17px !important">
          Mettre à jour un pack
        </h4>
        <div class="modal-content" style="margin-top: -17px !important; background-color: white;">
          <div class="modal-body">
            <form class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="designation">Nom du pack<span style="color: red">*</span></label>
                  <input :class="{
                    'form-control': true,
                    'is-invalid': formErrors.pack.designation.haveError,
                  }" id="designation" type="text" minlength="5" maxlength="125" v-model="pack.designation"
                    placeholder="Mettez à jour le pack" required />
                  <div class="invalid-feedback" v-if="formErrors.pack.designation.haveError">
                    {{ formErrors.pack.designation.message }}
                  </div>
                </div>
                <div class="form-group">
                  <label for="percentage">Pourcentage<span style="color: red">*</span></label>
                  <input :class="{
                    'form-control': true,
                    'is-invalid': formErrors.pack.percentage.haveError,
                  }" id="percentage" type="text" minlength="5" maxlength="125" v-model="pack.percentage"
                    placeholder="Mettez à jour l'assurance" required />
                  <div class="invalid-feedback" v-if="formErrors.pack.percentage.haveError">
                    {{ formErrors.pack.percentage.message }}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="d-flex justify-content-between col-12 flex-row">
              <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal" @click="clearPackData">
                Annuler
              </button>

              <button type="submit" class="btn btn-success btn-medpay-green" @click="updatePack">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>


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

            Êtes-vous sûr de vouloir supprimer cette assurance "{{ deleteName }}" ?
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
import { insuranceService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";
export default {
  name: "detail",
  props: ["uuid"],
  data() {
    return {
      packs: [],
      insurance: {},
      insurance_id: "",
      pack: {},
      deleteIndex: null,
      deleteName: "",
      table: null,
      formErrors: {
        pack: {
          designation: {
            haveError: false,
            message: "",
          },
          percentage: {
            haveError: false,
            message: "",
          },
        },
      },
    };
  },

  mounted() {
    // Récupérer les détails de l'assurance
    insuranceService.getInsurance(this.uuid).then((res) => {
      this.insurance = res.data.data;
      this.insurance_id = this.uuid;


    });

    // Récupérer les packs associés à l'assurance
    packService.getPackByAssurance(this.uuid).then((res) => {
      this.packs = res.data;
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
    // update(uuid) {
    //   this.$router.push("/assurance/detail/" + uuid);
    // },
    // create(uuid) {
    //   this.$router.push("/assurance/create/" + uuid);
    // },
    refreshPacks() {
      packService.getPackByAssurance(this.insurance_id).then((res) => {
        this.packs = res.data;
      });
    },
    clearPackData() {
      this.pack = {
        designation: "",
        percentage: "",
      };
    },
    preparingForPackUpdate(uuid) {
      packService.getPack(uuid).then((res) => {
        this.pack = res.data.data;
        this.pack.uuid = uuid;
      });
    },
    clearPackError() {
      this.formErrors = {
        pack: {
          designation: {
            haveError: false,
            message: "",
          },
          percentage: {
            haveError: false,
            message: "",
          },
        },
      };
    },
    clearData() {
      this.clearPackData();
      this.clearPackError();
    },
    updatePack() {
      this.clearPackError();
      // this.pack.insurances_id = this.insurance_id;
      // if (this.pack.insurances) {
      //   delete this.pack.insurances;
      //   delete this.pack.users;

      // }
      const packInsurance = {
        designation: this.pack.designation,
        percentage: this.pack.percentage,
        insurances_id: this.insurance_id,
        uuid: this.pack.uuid,
      };

      // console.log(packInsurance);
     
      packService
        .updatePack(packInsurance)
        .then((response) => {
          //Reset form field and errors and refresh categories tab
          this.clearData();
          this.refreshPacks();

          // Close the "Update Category" modal
          $('#updatePackModal').modal('hide');

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
            this.formErrors.pack.designation.message = error.response.data.errors.designation[0];
            this.formErrors.pack.designation.haveError = true;
            this.formErrors.pack.percentage.message = error.response.data.errors.percentage[0];
            this.formErrors.pack.percentage.haveError = true;
          }
          catch (error) {
          }
        });
    },

    supprimer(index) {
      this.deleteIndex = index;
      this.deleteName = this.packs[index].designation;
      $("#confirmDeleteModal").modal("show");
    },

    confirmDelete() {
      const index = this.deleteIndex;
      const name = this.deleteName;
      if (index !== null) {
        packService
          .deletePack(this.packs[index].uuid)
          .then((res) => {
            this.packs.splice(index, 1);
            this.$toast.success('Pack supprimé avec succès!', {  // Ajout du message de succès
              position: POSITION.TOP_RIGHT,
              timeout: 3000,
              bodyStyle: {
                borderRadius: "10px",
                backgroundColor: "#f0f0f0",
                color: "green",
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
</style>
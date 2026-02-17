<template>
  <section class="tables">
    <div class="row">
      <div class="col-lg-12 grid-margin">
        <h3
          class="bg-success card-title text-white rounded p-2 mb-2 text-center"
          style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); ">
          Liste des fournisseurs
        </h3>
        <div class="card">
          <div class="card-body">
            <div class="mx-auto" id="fixingIssue" style="margin-bottom: 5px;">
              <button
                type="submit"
                class="btn btn-success btn-medpay-green mr-2"
                data-toggle="modal" data-target="#addSupplierModal">
                Ajouter
              </button>
            </div>
            <div class="table-responsive">
              <table
                id="order-listing"
                ref="myTable"
                class="table table-hover table-bordered"
              >
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Nom</th>
                    <th>Téléphone</th>
                    <th>Marge</th>
                    <th>Adresse</th>
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(supplier, index) in suppliers" :key="supplier.uuid">
                    <td>{{ index + 1 }}</td>
                    <td>{{ supplier.name }}</td>
                    <td>{{"+"}}{{ supplier.dial_code }} {{" "}} {{ supplier.phone_number }}</td>
                    <td>{{ supplier.profit_margin }} {{" %"}}</td>
                    <td>{{ supplier.address }}</td>
                    <td class="text-right" width="50px">
                      <div class="btn-group btn-group-sm" role="group">
                        <button
                          id="btnGroupDrop1"
                          type=""
                          style="padding: 0px 10px"
                          class="btn btn-light dropdown-toggle"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          &nbsp;
                          <i class="fa fa-tasks" aria-hidden="true"></i> &nbsp;
                        </button>
                        <div
                          class="dropdown-menu action-button-div"
                          aria-labelledby="btnGroupDrop1"
                          style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%)"
                        >
                          <button @click="preparingForSupplierUpdate(supplier.uuid)" 
                            class="dropdown-item font-weight-bold"
                            style="color: black;"
                            data-toggle="modal" data-target="#updateSupplierModal">
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                            Modifier
                          </button>
                          <hr class="m-1" />
                          <button @click="supprimer(index)" style="color: black;" class="dropdown-item font-weight-bold">
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

    <div class="modal fade" id="addSupplierModal" ref="addSupplierModal">
      <div class="modal-dialog">
        <h4 class="card-title text-white  p-3 mt-4 text-center  col-12"
          style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top : -17px !important">
          Ajouter un fournisseur
        </h4>
        <div class="modal-content" style="margin-top : -17px !important; background-color: white;">
          <div class="modal-body">
            <form class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group controls">
                  <label for="name">Nom<span style="color: red">*</span></label>
                  <input
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.name.haveError,
                    }"
                    id="name" 
                    type="text" 
                    minlength="3"
                    maxlength="125"
                    placeholder="Entrez le nom du fournisseur"
                    v-model="supplier.name" 
                  required/>

                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.name.haveError" style="font-size: 11px">
                    {{ formErrors.name.message }}
                  </div>
                </div>

                <div class="form-group controls">
                  <label for="phone_number">Téléphone<span style="color: red">*</span></label>
                  <vue-tel-input 
                    v-model="supplier.phone_number"
                    :input-options="{
                      placeholder: '',
                      styleClasses: ['border-0', 'rounded-0', 'customized-phone-input'],
                      required: true,
                      type: 'tel',  // Use 'tel' type for telephone input
                    }"
                    :defaultCountry="supplier.dial_code"
                    @country-changed="countryChanged"
                    @input="handlePhoneNumberInput"
                  >
                  </vue-tel-input>

                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.phone_number.haveError" style="font-size: 11px">
                    {{ formErrors.phone_number.message }}
                  </div>
                </div>

                <div class="form-group controls">
                  <label for="email">Email</label>
                  <input
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.email.haveError,
                    }"
                    id="email" 
                    type="email" 
                    minlength="5"
                    maxlength="255"
                    placeholder="Entrez l'email du fournisseur"
                    v-model="supplier.email" 
                    />

                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.email.haveError" style="font-size: 11px">
                    {{ formErrors.email.message }}
                  </div>
                </div>

                <div class="form-group">
                  <label for="address">Adresse</label>
                  <input
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.address.haveError,
                    }"
                    id="address" 
                    type="text" 
                    minlength="5"
                    maxlength="255"
                    placeholder="Entrez l'adresse du fournisseur"
                    v-model="supplier.address" 
                    />

                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.address.haveError" style="font-size: 11px">
                    {{ formErrors.address.message }}
                  </div>
                </div>

                <div class="form-group">
                  <label for="profitMargin">Marge bénéficiaire<span style="color: red">*</span></label>
                  <input
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.profit_margin.haveError,
                    }"
                    id="profitMargin" 
                    type="number" 
                    min="0"
                    max="100"
                    placeholder="Entrez la marge bénéficiaire"
                    v-model="supplier.profit_margin" 
                    required/>

                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.profit_margin.haveError" style="font-size: 11px">
                    {{ formErrors.profit_margin.message }}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="d-flex justify-content-between col-12 flex-row">
              <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal"
              @click="clearData">
                Annuler
              </button>

              <button type="submit"
                class="btn btn-success btn-medpay-green"
                @click="createSupplier">
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="updateSupplierModal">
      <div class="modal-dialog">
        <h4 class="card-title text-white  p-3 mt-4 text-center  col-12"
          style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top : -17px !important">
          Mettre à jour un fournisseur
        </h4>
        <div class="modal-content" style="margin-top : -17px !important; background-color: white;">
          <div class="modal-body">
            <form class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group controls">
                  <label for="name">Nom<span style="color: red">*</span></label>
                  <input
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.name.haveError,
                    }"
                    id="name" 
                    type="text" 
                    minlength="3"
                    maxlength="125"
                    placeholder="Entrez le nom du fournisseur"
                    v-model="supplier.name" 
                  required/>

                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.name.haveError" style="font-size: 11px">
                    {{ formErrors.name.message }}
                  </div>
                </div>

                <div class="form-group controls">
                  <label for="phone_number">Téléphone<span style="color: red">*</span></label>
                  <vue-tel-input 
                    v-model="supplier.phone_number"
                    :input-options="{
                      placeholder: '',
                      styleClasses: ['border-0', 'rounded-0', 'customized-phone-input'],
                      required: true,
                      type: 'tel',  // Use 'tel' type for telephone input
                    }"
                    :defaultCountry="supplier.dial_code"
                    @country-changed="countryChanged"
                    @input="handlePhoneNumberInput"
                  >
                  </vue-tel-input>

                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.phone_number.haveError" style="font-size: 11px">
                    {{ formErrors.phone_number.message }}
                  </div>
                </div>

                <div class="form-group controls">
                  <label for="email">Email</label>
                  <input
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.email.haveError,
                    }"
                    id="email" 
                    type="email" 
                    minlength="5"
                    maxlength="255"
                    placeholder="Entrez l'email du fournisseur"
                    v-model="supplier.email" 
                    />

                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.email.haveError" style="font-size: 11px">
                    {{ formErrors.email.message }}
                  </div>
                </div>

                <div class="form-group">
                  <label for="address">Adresse</label>
                  <input
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.address.haveError,
                    }"
                    id="address" 
                    type="text" 
                    minlength="5"
                    maxlength="255"
                    placeholder="Entrez l'adresse du fournisseur"
                    v-model="supplier.address" 
                    />

                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.address.haveError" style="font-size: 11px">
                    {{ formErrors.address.message }}
                  </div>
                </div>

                <div class="form-group">
                  <label for="profitMargin">Marge bénéficiaire<span style="color: red">*</span></label>
                  <input
                    :class="{
                      'form-control': true,
                      'is-invalid': formErrors.profit_margin.haveError,
                    }"
                    id="profitMargin" 
                    type="number" 
                    min="0"
                    max="100"
                    placeholder="Entrez la marge bénéficiaire"
                    v-model="supplier.profit_margin" 
                    required/>

                  <div class="col-sm-6 p-1 invalid-feedback d-inline" v-if="formErrors.profit_margin.haveError" style="font-size: 11px">
                    {{ formErrors.profit_margin.message }}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="d-flex justify-content-between col-12 flex-row">
              <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal"
              @click="clearSupplierData">
                Annuler
              </button>

              <button type="submit"
                class="btn btn-success btn-medpay-green"
                @click="updateSupplier">
                Enregistrer
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
            Êtes-vous sûr de vouloir supprimer le fournisseur: {{ deleteName }} ?
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
              class="btn btn-danger btn-medpay-gray"
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
import * as JSZip from "../../../../../node_modules/jszip";
window.JSZip = JSZip;
import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = vfsFonts.pdfMake.vfs;
import "../../../../../node_modules/datatables.net-dt";
import "../../../../../node_modules/datatables.net-bs4/js/dataTables.bootstrap4";
import "../../../../../node_modules/datatables.net-buttons/js/dataTables.buttons";
import "../../../../../node_modules/datatables.net-buttons-bs4/js/buttons.bootstrap4";
import FrenchTranslation from "@/assets/datatable/French.json";
import "../../../../../node_modules/datatables.net-buttons/js/buttons.html5.js";
import "../../../../../node_modules/datatables.net-buttons/js/buttons.print.js";
import "../../../../../node_modules/datatables.net-buttons/js/buttons.colVis.js";
import "../../../../../node_modules/bootstrap/dist/js/bootstrap.js"; // tres important pour le modal
import "../../../../../node_modules/bootstrap/dist/js/bootstrap.min.js"; // tres important pour le modal
require("datatables.net-dt");

import { VueTelInput } from 'vue-tel-input';
import { supplierService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "list-product",
  components: {
    VueTelInput,
  },
  data() {
    return {
      suppliers: {},
      supplier: {
        name: "",
        dial_code: 229,
        phone_number: "",
        email: "",
        address: "",
        profit_margin: "",
      },
      deleteIndex: null,
      deleteName: "",
      table: null,
      formErrors: { 
        name: {
          haveError: false,
          message: "",
        },
        phone_number: {
          haveError: false,
          message: "",
        },
        email: {
          haveError: false,
          message: "",
        },
        address: {
          haveError: false,
          message: "",
        },
        profit_margin: {
          haveError: false,
          message: "",
        },
      },
    };
  },
  mounted() {
    supplierService.getAllSuppliers().then((res) => {
      this.suppliers = res.data.data;
      this.$nextTick(() => {
        const table = $(this.$refs.myTable).DataTable({
          "initComplete": function (settings, json) {
            //When the data is fully loaded reduce the margin bottom
            $('#fixingIssue').css('margin-bottom', '-10px');
          },
          dom:
            '<"row mb-3"<"col-md-12"B>>' +
            '<"row mb-0"<"col-md-6"l><"col-md-6"f>>' +
            '<"row"<"col-md-12"tr>>' +
            '<"row"<"col-md-6"i><"col-md-6"p>>',

          // dom: 'Bfrtip',
          pageLength: 10, // Définir le nombre de résultats par page
          language: FrenchTranslation,
          buttons: [
          ],
        });
      });
    });
  },
  methods: {
    countryChanged(country) {
      this.supplier.dial_code = country.dialCode;
    },
    refreshSuppliers(){
      supplierService.getAllSuppliers().then((res) => {
        this.suppliers = res.data.data;
      });
    },
    clearSupplierData(){
      this.supplier =  {
        name: "",
        dial_code: 229,
        phone_number: "",
        email: "",
        address: "",
        profit_margin: "",
      };
    },
    preparingForSupplierUpdate(uuid){
      supplierService.getSupplier(uuid).then((res) => {
        this.supplier = res.data.data;
        this.supplier.uuid = uuid;
      });
    },
    clearSupplierError(){
      this.formErrors ={ 
        name: {
          haveError: false,
          message: "",
        },
        phone_number: {
          haveError: false,
          message: "",
        },
        email: {
          haveError: false,
          message: "",
        },
        address: {
          haveError: false,
          message: "",
        },
        profit_margin: {
          haveError: false,
          message: "",
        },
      };
    },
    clearData(){
      this.clearSupplierData();
      this.clearSupplierError();
    },
    handlePhoneNumberInput(number, phoneObject) {
      if(phoneObject.valid) {
        if (phoneObject.valid == false) {
          this.formErrors.phone_number.haveError = true;
        }
        else {
          this.formErrors.phone_number.haveError = false;
          this.supplier.phone_number = phoneObject.nationalNumber;
          this.supplier.dial_code = phoneObject.countryCallingCode;
        }
      }
      else
      {
        const isFormattedNotEmpty = phoneObject && phoneObject.formatted !== undefined && phoneObject.formatted !== '';
        if (isFormattedNotEmpty) {
          this.formErrors.phone_number.haveError = true;
        }
      }

      this.formErrors.phone_number.message = "Veuillez entrez un numéro de téléphone valide";
    },
    createSupplier()
    {      
      if (this.formErrors.phone_number.haveError){
        return
      }
      this.clearSupplierError();
      if (this.supplier.name === ""){
        this.formErrors.name.message = "Veuillez entrez le nom du fournisseur";
        this.formErrors.name.haveError = true;
        return;
      }
      if (this.supplier.phone_number === ""){
        this.formErrors.phone_number.message = "Veuillez entrez un numéro de téléphone";
        this.formErrors.phone_number.haveError = true;
        return;
      }
      if (this.supplier.profit_margin === ""){
        this.formErrors.profit_margin.message = "Veuillez entrez la marge bénéficiaire";
        this.formErrors.profit_margin.haveError = true;
        return;
      }

      supplierService
      .addSupplier(this.supplier)
      .then((response) => {
        //Reset form field and errors and refresh suppliers tab
        this.clearData();
        this.refreshSuppliers();

        // Close the "Add Supplier" modal
        $('#addSupplierModal').modal('hide');

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
        console.log(error);
        // Traitement en cas d'erreur
        try {
          this.formErrors.name.message = error.response.data.errors.name[0];
          this.formErrors.name.haveError = true;
        } 
        catch (error) {
        }

        try {
          this.formErrors.phone_number.message = error.response.data.errors.phone_number[0];
          this.formErrors.phone_number.haveError = true;
        } 
        catch (error) {
        }

        try {
          this.formErrors.email.message = error.response.data.errors.email[0];
          this.formErrors.email.haveError = true;
        } 
        catch (error) {
        }

        try {
          this.formErrors.address.message = error.response.data.errors.address[0];
          this.formErrors.address.haveError = true;
        } 
        catch (error) {
        }

        try {
          this.formErrors.profit_margin.message = error.response.data.errors.profit_margin[0];
          this.formErrors.profit_margin.haveError = true;
        } 
        catch (error) {
        }
      });
    },
    updateSupplier() {
      if (this.formErrors.phone_number.haveError){
        return
      }
      this.clearSupplierError();
      if (this.supplier.name === ""){
        this.formErrors.name.message = "Veuillez entrez le nom du fournisseur";
        this.formErrors.name.haveError = true;
        return;
      }
      if (this.supplier.phone_number === ""){
        this.formErrors.phone_number.message = "Veuillez entrez un numéro de téléphone";
        this.formErrors.phone_number.haveError = true;
        return;
      }
      if (this.supplier.profit_margin === ""){
        this.formErrors.profit_margin.message = "Veuillez entrez la marge bénéficiaire";
        this.formErrors.profit_margin.haveError = true;
        return;
      }

      supplierService
      .updateSupplier(this.supplier)
      .then((response) => {
        //Reset form field and errors and refresh suppliers tab
        this.clearData();
        this.refreshSuppliers();

        // Close the "Update Supplier" modal
        $('#updateSupplierModal').modal('hide');

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
          this.formErrors.name.message = error.response.data.errors.name[0];
          this.formErrors.name.haveError = true;
        } 
        catch (error) {
        }

        try {
          this.formErrors.phone_number.message = error.response.data.errors.phone_number[0];
          this.formErrors.phone_number.haveError = true;
        } 
        catch (error) {
        }

        try {
          this.formErrors.email.message = error.response.data.errors.email[0];
          this.formErrors.email.haveError = true;
        } 
        catch (error) {
        }

        try {
          this.formErrors.address.message = error.response.data.errors.address[0];
          this.formErrors.address.haveError = true;
        } 
        catch (error) {
        }

        try {
          this.formErrors.profit_margin.message = error.response.data.errors.profit_margin[0];
          this.formErrors.profit_margin.haveError = true;
        } 
        catch (error) {
        }
      });
    },
    
    supprimer(index) {
      this.deleteIndex = index;
      this.deleteName = this.suppliers[index].name;
      $("#confirmDeleteModal").modal("show");
    },
    confirmDelete() {
      const index = this.deleteIndex;
      const name = this.deleteName;
      if (index !== null) {
        supplierService
        .deleteSupplier(this.suppliers[index].uuid)
        .then((res) => {
          this.productSpecifications.splice(index, 1);
          this.$toast.success("Fournisseur supprimé avec succès !", {
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
@import "../../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
@import "../../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";
@import '../../../../../node_modules/vue-tel-input/dist/vue-tel-input.css';
.vue-tel-input input
{
  font-size: 14px;
  display: none;
}


.vue-tel-input:focus-within {
    box-shadow: none;
    border-color: #bbb
} 
.vue-tel-input {
  height: 45px;
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

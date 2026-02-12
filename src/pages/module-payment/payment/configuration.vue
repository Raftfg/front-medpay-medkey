<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 col-md-12 grid-margin">
        <div class="card">
          <div class="card-body">

            <h4 class=" text-white rounded p-3 mb-3 text-center font-weight-bold"
              style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)">
              Liste des signataires
            </h4>

            <div class="mx-auto ">
              <button type="submit" class="btn btn-success btn-medpay-green mr-2 mb-1" data-toggle="modal"
                data-target="#facturePatient">
                Ajouter un signataire
              </button>
            </div>


            <div class="table-responsive py-1">
              <table id="order-listing" ref="myTableSignataire" class="table table-bordered">
                <thead>
                  <tr>
                    <th style="width: 1%; text-align:left">#</th>
                    <th style="width: 30%;">Type de document</th>
                    <th style="width: 30%;">Utilisateur</th>
                    <th style="width: 20%;">titre</th>
                    <th style="width: 9%;">Statut</th>
                    <!-- <th style="text-align: center !important;width: 10%;">Action</th> -->
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(signataire, index) in signataires" :key="signataire.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ signataire.type_document }}</td>
                    <!-- <td> {{ getNomUser(signataire.user_id) }}</td> -->
                    <td>{{ signataire.name }} {{ signataire.prenom }}</td>

                    <td>{{ signataire.titre }}</td>
                    <!-- <td>{{ signataire.statut }}</td> -->


                    <td>
                      <label v-if="signataire.statut == 'Actif'" style="
                          font-size: 10px !important;
                          border-radius: 20px !important;
                          display: inline-block;
                          padding: 5px;
                        " class="badge badge-gradient-success font-weight-bold text-white text-center border-rounded">
                        Actif

                      </label>
                      <label v-else-if="signataire.statut == 'Inactif'" style="
                          font-size: 10px !important;
                          border-radius: 20px !important;
                          padding: 5px;
                        " class="badge badge-gradient-danger font-weight-bold text-white text-center border-rounded ">
                        Inactif
                      </label>
                    </td>

                    <!-- <td><label style="font-size : 11px !important"
                            class="badge badge-gradient-danger font-weight-bold text-white text-center  border-rounded rounded-pill">NON</label>
                        </td> -->

                    <!-- <td class="" width="50px">

                      <div class="btn-group btn-group-sm" role="group">
                        <button id="btnGroupDrop1" type="" style="padding: 0px 10px" class="btn btn-light dropdown-toggle"
                          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          &nbsp;
                          <i class="fa fa-tasks" aria-hidden="true"></i> &nbsp;
                        </button>
                        <div class="dropdown-menu action-button-div" aria-labelledby="btnGroupDrop1"
                          style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%)">

                          <button @click="preparingForSignataireUpdate(signataire.id)"
                            class="dropdown-item text-dark  font-weight-bold" data-toggle="modal"
                            data-target="#updateSignataireModal">
                            <i class="fa fa-pencil-square-o text-dark"></i> Modifier
                          </button>
                       
                        </div>
                      </div>
                    </td> -->
                  </tr>
                </tbody>
              </table>

            </div>
            <div v-if="indexSpinner" class="spinner-border spinner-border-sm text-secocndary" style="font-size: 11px"
              role="status">
              <span class="sr-only">Loading...</span>
            </div>

          </div>
        </div>
      </div>
    </div>



    <!-- modal ajouter un sigantaitaire -->

    <div class="modal fade" id="facturePatient" tabindex="-1" role="dialog" aria-labelledby="facturePatient"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <h4 class="card-title text-white  p-3 mt-4 text-center  col-12"
          style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top : -17px !important">
          Ajouter un signataire
        </h4>
        <div class="modal-content">
          <div class="modal-body">
            <form class="forms-sample" @submit.prevent="ajouterSignataire">
              <div class="form-group">
                <label for="inputField1" style="color:black !important">Type de document<span
                    style="color: red">*</span></label>
                <select type="text" class="form-control" id="inputField1" v-model="signataire.type_document"
                  @input="clearError('type_document')" placeholder="Nom et prénom du Signataire">
                  <option value="">Sélectionnez un type de document</option>
                  <option value="Facture Patient">Facture Patient</option>
                  <option value="Borderau de transfert">Borderau de transfert</option>
                </select>
                <small class="text-danger" v-if="type_documentError">{{
                  type_documentError
                }}</small>
              </div>
              <!-- <div class="form-group">
                <label for="user" style="color:black !important">Utilisateur<span style="color: red">*</span></label>
                <select class="form-control" id="user" v-model="signataire.user_id" @change="onUserChange"
                  @input="clearError('user_id')" placeholder="Nom et prénom du Signataire">
                  <option value="null">Sélectionnez un utilisateur</option>
                  <option v-for="user in users" :key="user.uuid" :value="user.uuid">{{ user.name }} {{ user.prenom }}
                  </option>
                </select>
                <small class="text-danger" v-if="user_idError">{{
                  user_idError
                }}</small>
              </div> -->
              <div class="form-group">
                <label for="user" style="color:black !important">Utilisateur<span style="color: red">*</span></label>
                <!-- Utilisation de Select2 -->
                <select class="form-control" id="user" v-model="signataire.user_id" @change="onUserChange"
                  @input="clearError('user_id')" placeholder="Nom et prénom du Signataire" ref="selectUser">
                  <option value="">Sélectionnez un utilisateur</option>
                  <option v-for="user in users" :key="user.uuid" :value="user.uuid">{{ user.name }} {{ user.prenom }}
                  </option>
                </select>
                <small class="text-danger" v-if="user_idError">{{ user_idError }}</small>
              </div>
              <div class="form-group">
                <label for="inputField2">Titre<span style="color: red">*</span></label>
                <input type=" text" class="form-control" id="inputField2" placeholder="Titre" v-model="signataire.titre"
                  readonly>
              </div>
              <div class="form-group">
                <label for="inputF" style="color:black !important">Statut<span style="color: red">*</span></label>
                <select type="text" class="form-control" id="inputF" v-model="signataire.statut"
                  @input="clearError('statut')" placeholder="Nom et prénom du Signataire">
                  <option value="">Statut</option>
                  <option value="Actif">Actif</option>
                  <option value="Inactif">Inactif</option>
                </select>
                <small class="text-danger" v-if="statutError">{{
                  statutError
                }}</small>
              </div>
              <!-- <div class="form-group">
                <label for="customFile">Choisir une Signature</label>
                <div class="custom-file">
                  <input type="file" class="custom-file-input" id="customFile" accept="image/*" @change="updateFile"
                    ref="fileInput">
                  <label class="custom-file-label" for="customFile">
                    {{ fileName }}

                  </label>
                </div>
              </div> -->

              <div class="modal-footer">
                <div class="d-flex justify-content-between col-12 flex-row">
                  <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal">
                    Annuler
                  </button>

                  <button type="submit" class="btn btn-success btn-medpay-green">
                    Ajouter
                  </button>
                </div>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="updateSignataireModal">
      <div class="modal-dialog">

        <h4 class="card-title text-white  p-3 mt-4 text-center  col-12"
          style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); margin-top : -17px !important">
          Modifier un signataire
        </h4>
        <div class="modal-content" style="margin-top: -17px !important; background-color: white;">
          <div class="modal-body">
            <form class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="type_document">Type de document<span style="color: red">*</span></label>
                  <select :class="{
                        'form-control': true,
                    
                      }" id="type_document" type="text" minlength="5" maxlength="125"
                    v-model="signataire.type_document" placeholder="Mettez à jour l'assurance" required>
                    <option value="">Sélectionnez un type de document</option>
                    <option value="Facture Patient">Facture Patient</option>
                    <option value="Borderau de transfert">Borderau de transfert</option>
                  </select>
                  <!-- <div class="invalid-feedback" v-if="formErrors.signataire.type_document.haveError">
                    {{ formErrors.signataire.type_document.message }}
                  </div> -->
                </div>
                <div class="form-group">
                  <label for="use">Utilisateur<span style="color: red">*</span></label>
                  <select :class="{
                    'form-control': true,
                    
                  }" id="use" type="text" minlength="5" maxlength="125" v-model="signataire.user_id"
                    placeholder="Mettez à jour l'assurance" required>
                    <option value="null">Sélectionnez un utilisateur</option>
                    <option v-for="user in users" :key="user.uuid" :value="user.uuid">{{ user.name }} {{ user.uuid }}
                    </option>
                  </select>
                  <!-- <div class="invalid-feedback" v-if="formErrors.signataire.user_id.haveError">
                    {{ formErrors.signataire.user_id.message }}
                  </div> -->
                </div>


                <div class="form-group">
                  <label for="inputField2">Titre<span style="color: red">*</span></label>
                  <input :class="{
                    'form-control': true,
                  
                  }" id="inputField2" type="text" minlength="5" maxlength="125" v-model="signataire.titre"
                    placeholder="Mettez à jour le titre" required />
                  
                </div>
                <div class="form-group">
                  <label for="inputF" style="color:black !important">Statut<span style="color: red">*</span></label>
                  <select :class="{
                    'form-control': true,

                  }" id="inputF" type="text" minlength="5" maxlength="125" v-model="signataire.statut"
                    placeholder="Mettez à jour le statut" required>
                    <option value="">Statut</option>
                    <option value="Actif">Actif</option>
                    <option value="Inactif">Inactif</option>
                  </select>
                  
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <div class="d-flex justify-content-between col-12 flex-row">
              <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal" @click="clearSignataireData">
                Annuler
              </button>

              <button type="submit" class="btn btn-success btn-medpay-green" @click="updateSignataire">
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal  -->
  </section>
</template>
<script >
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
// import "select2";
// import 'select2/dist/js/select2.full.min.js';
// import 'select2/dist/css/select2.min.css';


import { SignataireService } from "@/_services";
import { LoginService } from "@/_services";
import { useToast, POSITION } from "vue-toastification";


// import "@/asset/js/kkiapay.js";

// import "../../../assets/js/alertify.js";

export default {
  name: "create-signataire",

  data() {
    return {
      // user:null,
      fileName: "Parcourir...",

      indexSpinner: false,
      signataires: [],
      signataire: {
        titre: "",
        type_document: "",
        indexSpinner: false,
        statut: "",
        signature: "",
        tableSignataire: null,
        user_id: "",
        selectedUser: null,
      },
      type_documentError: "",
      user_idError: "",
      statutError: "",
      users: [],
      table: null,
      id: "",
      user: {},

    }
  },

  mounted() {

    LoginService.getAllUsers()
      .then((res) => {
        this.users = res.data.data;
        console.log(this.users);
      })
      .catch((error) => {
        console.log(error);
      });

    this.getAllSignataires();


  },
  methods: {
    initializeDataTable() {

      this.$nextTick(() => {
        const table = $(this.$refs.myTableSignataire).DataTable({
          // Configuration de la table DataTable
          dom:
            '<"row d-flex justify-content-between"<"text-left"B><"text-right"f>>' +
            '<"row"<"col-md-12"tr>>' +
            '<"row d-flex"<"col-md-6"i><"col-md-6"p>>',
          pageLength: 10, // Définir le nombre de résultats par page
          language: FrenchTranslation, // Configuration de la langue
          buttons: [
            {
              extend: "pdfHtml5",
              charset: "utf-8",
              bom: true,
              className: "btn btn-gray btn-sm",
            },
            {
              extend: "excelHtml5",
              charset: "utf-8",
              bom: true,
              className: "btn btn-gray btn-sm",
            },
          ],
        });


        // Stockez la nouvelle instance de la table dans la variable "this.table" pour une utilisation ultérieure
        this.tableSignataire = table;

        if (table) {
          $(table).DataTable().clear().destroy(); // Détruire DataTables s'il est déjà initialisé
          $(table).DataTable(); // Réinitialiser DataTables
        }
      });
    },

    refreshSignataires() {
      SignataireService.getAllSignataires().then((res) => {
        this.signataires = res.data.data;
      });
    },
    clearSignataireData() {
      this.signataire = {
        type_document: "",
      };
    },
    preparingForSignataireUpdate(id) {
      SignataireService.getSignataire(id).then((res) => {
          this.signataire = res.data.data;
          console.log(this.signataire);
          this.signataire.id = this.id;
          this.signataire.user_id=res.data.data.uuid;
          console.log(this.signataire.user_id);
         });
       
    },
    clearSignataireError() {
      this.formErrors = {
        signataire: {
          type_document: {
            haveError: false,
            message: "",
          },
        },
      };
    },
    clearData() {
      this.clearSignataireData();
      this.clearSignataireError();
    },

    getAllSignataires() {
      this.indexSpinner = true;

      SignataireService.getAllSignataires().then((res) => {
        this.signataires = res.data.data;
        this.indexSpinner = false;

        if (this.tableSignataire) {
          this.tableSignataire.destroy();
        }

        this.$nextTick(() => {
          this.initializeDataTable();
        });
        this.refreshTable()

      });


    },

    refreshTable() {
      SignataireService.getAllSignataires().then((res) => {
        this.signataires = res.data.data;
      });
    },


    ajouterSignataire() {
      if (this.validateForm()) {
        const formData = new FormData();
        formData.append('titre', this.signataire.titre);
        formData.append('type_document', this.signataire.type_document);
        formData.append('statut', this.signataire.statut);
        formData.append('user_id', this.signataire.user_id);

        SignataireService.addSignataire(formData)
          .then(response => {
            this. getAllSignataires();
            this.$toast.success("Signataire ajouté avec succès !", {
              position: POSITION.TOP_RIGHT,
              timeout: 3000,
              bodyStyle: {
                borderRadius: "10px",
                backgroundColor: "#f0f0f0",
                color: "#333",
                fontWeight: "bold",
              },
            });
          
            console.log("Réponse de l'ajout du signataire :", response.data);
            // this.refreshTable();
            if (this.tableSignataire) {
              this.tableSignataire.destroy();
            }
            this.$nextTick(() => {
              this.initializeDataTable();
            });

            $("#facturePatient").modal("hide");
            // Reste du code...
          })
          .catch(error => {

            if (error.response && error.response.status == 400) {
              // Si une erreur avec un message existe dans la réponse, afficher un toast d'erreur

              const errorMessage = error.response.data.error;
              console.log("Erreur détectée:", errorMessage);

              this.$toast.error("Un signataire avec les mêmes informations existe déjà", {
                position: "top-right",
                timeout: 3000,
                style: {
                  background: "#ff0000",
                  color: "#fff",
                  fontWeight: "bold",
                },
              });
            } else {
              console.error("Une erreur inattendue s'est produite", error);
            }

            console.error("Erreur lors de l'ajout du signataire :", error);
          });

        // Si un utilisateur est sélectionné, récupérer son rôle ou titre
        if (this.signataire.user_id !== "null") {
          this.getRoleUser(this.signataire.user_id);
        }

      }
    },

    // Nouvelle méthode pour récupérer le rôle ou le titre de l'utilisateur
    getRoleUser(userId) {
      SignataireService.getRoleUser(userId)
        .then((response) => {
          console.log("Fait de meme");
          console.log(response);
          this.signataire.titre = response.data.user_roles;
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération du rôle ou du titre de l'utilisateur :", error);
        });
    },

    onUserChange() {
      if (this.signataire.user_id !== "null") {
        this.getRoleUser(this.signataire.user_id);
      }
    },
    validateForm() {
      // Perform validation for each field
      let isValid = true;
      if (!this.signataire.type_document) {
        this.type_documentError = "Le type de document est obligatoire.";
        isValid = false;
      } else {
        this.type_documentError = "";
      }

      if (!this.signataire.user_id) {
        this.user_idError = "L'utilisateur est obligatoire.";
        isValid = false;
      } else {
        this.user_idError = "";
      }

      if (!this.signataire.statut) {
        this.statutError = "Le statut est obligatoire.";
        isValid = false;
      } else {
        this.statutError = "";
      }

      return isValid;
    },


    clearError(field) {
      // For example, assuming your error variables are prefixed with the field name
      this[field + 'Error'] = '';
    },
    updateSignataire() {
      this.clearSignataireError();

      SignataireService
        .updateSignataire(this.signataire)
        .then((response) => {
          //Reset form field and errors and refresh categories tab
          this.clearData();
          this.refreshSignataires();

          // Close the "Update Category" modal
          $('#updateSignataireModal').modal('hide');

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
            this.signataire.type_document= error.response.data.errors.type_document[0];
            this.signataire.type_document = true;
          }
          catch (error) {
          }
        });
    },



    updateFile(event) {
      this.signataire.signature = event.target.files[0];

      this.fileName = event.target.files[0].name;
      console.log(event.target.files[0]);
    },


  },

};
</script>

<style scoped>
@import "../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
/* @import '../../../../node_modules/datatables.net-dt/css/jquery.dataTables.css'; */

@import "../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";


.radio-label {
  color: white !important;
  /* Change la couleur du texte en blanc */
}

.custom-radio {
  display: flex !important;
  flex-direction: row !important;
  justify-content: space-between !important;
}

.custom-file-input~.custom-file-label::after {
  content: "Telecharger";
}

.custom-file-label-purple {
  color: #000000;
  /* Couleur violette */
  background: linear-gradient(to bottom, #606264, #606264);
  /* background: linear-gradient(to bottom, #6ca597, #7ba89d); */


}

.custom-file-label::after {
  content: 'Télécharger';
  /* display: block; */
  background: linear-gradient(to bottom, #606264, #606264);
  /* Dégradé de bleu */
  /* color: #000000; */
  color: white !important;
  /* Couleur du texte du libellé */
  cursor: pointer;
  /* margin-left: 8px; */
}

table th {
  font-size: 16px !important;

}

tbody td {
  padding: 2.5px !important;
  /* Ajustez cette valeur selon vos besoins pour réduire la hauteur des cellules */
  color: black !important;
  font-size: 15px !important;
  vertical-align: middle !important;
  /* Centre le contenu verticalement dans les cellules */
}

.badge-rounded {
  border-radius: 50% !important;
  padding: 8px 15px !important;
  /* Ajustez la taille de padding selon vos besoins */
}


.nav-link.active.custom-tab {
  background-color: #0b5d3f !important;
  /* Couleur de fond sombre */
  color: #fff !important;
  /* Couleur du texte en surbrillance */
}

/* Style pour les onglets inactifs */
.nav-link.custom-tab {
  background-color: #e7ecef !important;
  /* Couleur de fond blanche par défaut */
  color: #000 !important;
  /* Couleur du texte par défaut */
}


.custom-tabset .nav-tabs .nav-link.active,
.custom-tabset .nav-tabs .nav-item.show .nav-link {
  color: #ffffff !important;
  /* Couleur du texte pour l'onglet actif */
  font-weight: bold !important;
  background-color: #0b5d3f !important;
  /* Couleur de fond pour l'onglet actif */
  /* border-color: #89c7fd #2b61ea #5f9ac1 !important; */
  /* Couleur de la bordure pour l'onglet actif */
}

.custom-tabset .nav-tabs .nav-link {
  color: #000000 !important;
  /* Couleur du texte pour les onglets non actifs */
  font-weight: bold !important;
  background-color: #e7ecef !important;
  /* Couleur de fond pour les onglets non actifs */
}

.text-red {
  color: red !important;
}

.error-message {
  color: red;
  font-size: 12px;
  margin-top: 5px;
}

.modal--fullscreen {
  max-width: 90vw;
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

fieldset.scheduler-border {
  border: 1px groove #ddd !important;
  padding: 0 1.4em 1.4em 1.4em !important;
  margin: 0 0 1.5em 0 !important;
  -webkit-box-shadow: 0px 0px 0px 0px #000;
  box-shadow: 0px 0px 0px 0px #000;
}

legend.scheduler-border {
  font-size: 1.2em !important;
  font-weight: bold !important;
  text-align: left !important;
  width: auto;
  padding: 0 10px;
  border-bottom: none;
}

th,
td {
  text-align: center;
}

th {
  background-color: #d6dbd6;
  border: 1px solid #dee2e6;
}

.container-fluid {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
}

h2,
h4 {
  font-weight: bold;
  margin: 0;
}

.mb-4 {
  margin-bottom: 2rem;
}

img {
  max-width: 100%;
}

table {
  margin-bottom: 1rem;
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
}

input,
select {
  font-weight: bold !important;
  color: rgb(78, 77, 77) !important;
}

select option {
  font-weight: bold !important;
  color: rgb(78, 77, 77) !important;
}

table td,
table th {
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid #dee2e6;
}

table th {
  font-weight: bold;
}

table th,
td {
  text-align: left;
}

table tbody+tbody {
  border-top: 2px solid #ffffff;
}

.table-bordered {
  border: 1px solid #dee2e6;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #dee2e6;
}

.table-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: -ms-autohiding-scrollbar;
}

.text-right {
  text-align: right;
}

.mt-5 {
  margin-top: 3rem;
}

.text-danger {
  color: #dc3545;
}
</style>

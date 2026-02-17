<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <!-- <h4 class="card-title">Ajouter un paiement</h4> -->

            <h3 class="card-title text-white rounded p-3 mb-5 text-center"
              style="background-color: #0b5d3f; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)">
              Paiement de facture
            </h3>

            <div class="row col-md-12 mt-n4">
              <div class="col-md-4" v-if="cashRegisterCashierCurrent.statut !== undefined">
                <h5>
                  <strong>Caisse : </strong>
                  <strong>
                    {{ cashRegisterCashierCurrent.designation }}
                    (<span :style="cashRegisterCashierCurrent.statut == 1
                      ? 'color: red;'
                      : 'color: green;'
                      ">
                      {{
                        cashRegisterCashierCurrent.statut == 0 ? "Ouverte" : "Fermée"
                      }} </span>)
                  </strong>
                </h5>
              </div>
              <div class="col-md-4" v-if="cashsHistoricalCurrent.created_at">
                <h5>
                  <strong style="color: green">Date : </strong>
                  <strong>{{ formaterDate(cashsHistoricalCurrent.created_at) }}</strong>
                </h5>
              </div>

              <div class="col-md-4" v-if="cashsHistoricalCurrent.statut == 1">
                <h5>
                  <strong style="color: red">Fermer par : </strong>
                  <strong>
                    {{ cashsHistoricalCurrent.cashier.name }}
                    {{ cashsHistoricalCurrent.cashier.prenom }}
                  </strong>
                </h5>
              </div>

              <div class="col-md-4" v-if="cashsHistoricalCurrent.statut == 0">
                <h5>
                  <strong style="color: green">Ouvrir par : </strong>
                  <strong>
                    {{ cashsHistoricalCurrent.cashier.name }}
                    {{ cashsHistoricalCurrent.cashier.prenom }}
                  </strong>
                </h5>
              </div>
            </div>

            <hr style="background-color: rgb(226, 225, 225) !important" />

            <div class="col-md-12 col-lg-12 mt-3">
              <div class="row">
                <div class="col-md-6 mt-2 col-lg-6">
                  <h4>Liste Des 10 Dernières Venues</h4>
                </div>
                <div class="search-bar col-md-6 col-lg-6">
                  <input @input="getListAndSearchMovments" type="text" v-model="searchTerm" placeholder="Rechercher..." />
                </div>
              </div>
            </div>

            <div v-if="displayedMovments.length > 0" class="table-responsive mt-4 tables">
              <table id="order-listing" ref="myTableMovment" class="table table-bordered">
                <thead>
                  <tr style="background-color: rgb(203, 204, 203)">
                    <th style="width: 5%">#</th>
                    <th style="width: 15%">Date d'arrivé</th>
                    <th style="width: 15%">N° IEP</th>
                    <th style="width: 15%">N° IPP</th>
                    <th style="width: 30%">Nom et Prénom</th>
                    <th style="width: 20%">Téléphone</th>
                  </tr>
                </thead>

                <tr class="row-hover" v-for="(movment, index) in displayedMovments" :key="movment.id"
                  @click="selectRow(index, movment.id)" :class="{ selected: selectedRow == index }">
                  <td>{{ index + 1 }}</td>
                  <td>{{ movment.formatted_arrivaldate }}</td>
                  <td>{{ movment.iep }}</td>
                  <td>{{ movment.ipp }}</td>
                  <td>{{ movment.lastname }} {{ movment.firstname }}</td>
                  <td>{{ movment.phone }}</td>
                </tr>

                <!-- <tr v-for="(movment, index) in displayedMovments" :key="movment.id"> -->
              </table>
            </div>

            <div v-else class="table-responsive mt-4">
              <table id="order-listing" ref="myTable" class="table table-bordered">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th style="width: 5%">#</th>
                    <th style="width: 15%">Date d'arrivé</th>
                    <th style="width: 15%">N° IEP</th>
                    <th style="width: 15%">N° IPP</th>
                    <th style="width: 30%">Nom et Prénom</th>
                    <th style="width: 20%">Téléphone</th>
                  </tr>
                </thead>
                <tr>
                  <td colspan="6" style="text-align: center">Aucune donnée trouvée</td>
                </tr>
              </table>
            </div>
            <!-- 
            <div class="modal fade" id="insurancePatient" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog custom-modal" role="document" style="max-width: 800px !important">
                <h4 class="card-title text-white p-3 mt-4 text-center col-12" style="
                    background-color: #0b5d3f;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    margin-top: -17px !important;
                  ">
                  Liste des Assurances du Patient
                </h4>
                <div class="modal-content" style="margin-top: -17px !important">
                  <div class="modal-body">
                    <div class="table-responsive col-md-12 col-lg-12">
                      <table id="myTableInsurance" ref="myTableInsurance" class="table table-bordered" width="100%"
                        cellspacing="0">
                        <thead>
                          <tr style="background-color: rgb(216, 218, 216)">
                            <th style="width: 5%">#</th>
                            <th style="width: 25%">N° Assurance</th>
                            <th style="width: 25%">Assurance</th>
                            <th style="width: 45%">Pack</th>
                            <th style="width: 45%">Pourcentage(en%)</th>
                            <th style="width: 45%">Date Début</th>
                            <th style="width: 45%">Date Fin</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style="color: white !important" class="row-hover"
                            v-for="(insurance, index) in patientInsuranceDetails" :key="insurance.id"
                            @click="selectInsuranceRow(index)" :class="{ selected: selectedInsuranceIndex === index }">
                            <td>{{ index + 1 }}</td>
                            <td>{{ insurance.number }}</td>
                            <td>{{ insurance.insurance_name }}</td>
                            <td>{{ insurance.designation }}</td>
                            <td>{{ parseInt(insurance.percentage) }}</td>
                            <td>{{ insurance.date_debut }}</td>
                            <td>{{ insurance.date_fin }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <div class="d-flex justify-content-between col-md-12 col-lg-12 flex-row mt-n3">
                      <button class="btn btn-danger btn-medpay-gray" data-dismiss="modal" style="width: 170px !important">
                        Fermer
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div> -->

            <div v-if="filteredMedicalActDetailsA.length > 0">

              <!-- <ul class="nav nav-tabs d-flex" role="tablist">
                <li>
                  <button class="nav-link active font-weight-bold custom-tab" data-bs-toggle="tab" href="#tab1">
                    Détails Du Paiement - Prestation(s)
                  </button>
                </li>
              </ul> -->

              <ul class="nav nav-tabs d-flex justify-content-between" role="tablist">
                <li>
                  <button class="nav-link active font-weight-bold custom-tab" data-bs-toggle="tab" href="#tab1">
                    Détails Du Paiement - Prestation(s)
                  </button>
                </li>
                <li class="d-flex">
                  <select class="form-control mb-0 " style="width: 300px; background-color: #e0faf3; "
                    id="exampleFormControlSelect1" v-model="selectedOptionMode" @change="fetchModePayementDetails">
                    <option value="" style="margin-top: 10px">MODES DE PAIEMENT</option>

                    <option value="1">ESPECE</option>
                    <option value="2">MTN MOBILE MONEY</option>
                    <option value="3">MOOV MONEY (FLOOZ)</option>
                    <option value="4">CELTIS</option>
                    <option value="5">CARTE BANCAIRE</option>
                    <option value="6">CARTE DE CRÉDIT</option>
                    <option value="7">PAIEMENT TRESORPAY</option>
                    <!-- <hr class="m-0" style="background-color: rgb(249, 249, 249) !important">  -->

                    <option value="8" style="background-color: hsl(0, 100%, 92%)">
                      PAIEMENT A CREDIT
                    </option>
                  </select>
                </li>
              </ul>


              <div class="tab-content">
                <div class="table-responsive tab-pane fade show active" id="tab1">
                  <span class="d-block mt-2"></span>
                  <div>
                    <table class="table table-bordered">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>CODE</th>
                          <th>DESIGNATION</th>
                          <th style="text-align: center !important">QTE</th>
                          <th style="text-align: right !important">PRIX</th>
                          <th style="text-align: right !important">MONTANT</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in filteredMedicalActDetailsA" :key="index">
                          <td>{{ index + 1 }}</td>
                          <td style="text-align: left !important">{{ item.code }}</td>
                          <td style="text-align: left !important">
                            {{ item.designation }}
                          </td>
                          <td style="text-align: center !important">
                            {{ item.quantite }}
                          </td>
                          <td style="text-align: right !important">
                            {{ formatNumber(item.prix) }}
                          </td>
                          <td style="text-align: right !important">
                            {{
                              formatNumber(
                                item.quantite * item.prix
                              )
                            }}
                          </td>
                        </tr>

                        <tr style="background-color: #d6dbd6 !important">
                          <td colspan="5" style="font-weight: bold !important">
                            Montant Brut (+)
                          </td>
                          <td style="font-weight: bold !important; text-align: right">
                            {{ formatNumber(totalAmountActesA) }}
                          </td>
                        </tr>
                        <tr>
                          <td colspan="5" style="font-weight: bold !important">
                            Prise en charge (-)
                          </td>
                          <td style="font-weight: bold !important; text-align: right">
                            {{ 0 }}
                          </td>
                        </tr>
                        <tr style="background-color: #d6dbd6 !important">
                          <td colspan="5" style="font-weight: bold !important">
                            Total A payer
                          </td>
                          <td style="font-weight: bold !important; text-align: right">
                            {{ formatNumber(totalAmountActesA) }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <!-- <div class="text-align:left !important">
                  <button type="" class="btn btn-success btn-medpay-green"
                    style="padding: 8px !important; width: 150px !important">
                    PROCEDER AU PAIEMENT
                  </button>
                </div> -->

                <!-- <div class="form-group col-md-2 mt-4 ">
                  <button @click="validerPayement" type="button"
                    class="btn-medpay-green btn btn-success btn-sm text-center mt-n1"
                    style="white-space: nowrap; overflow: hidden">
                    <span class="text-center ml-1" style="font-size: 90%">Procéder au paiement</span>
                  </button>
                </div> -->

                <!-- <div class="d-flex justify-content-end mt-0">
                  <button @click="validerPayement" type="button"
                    class="btn-medpay-green btn btn-success btn-sm text-center mt-n1"
                    style="white-space: nowrap; overflow: hidden">
                    <span class="text-center ml-1" style="font-size: 90%">Procéder au paiement</span>
                  </button>
                </div> -->
              </div>

              <div class="">
                <div v-if="selectedOptionMode == 1" class="control-group">
                  <!-- <img src="@/assets/images/mode-espece.png" alt="patient" class="row mb-1 col-md-12 mx-auto h-25"
                    style="width: 180px" /> -->

                  <div class="d-flex justify-content-end mt-0">
                    <button @click="validerPayement" type="button"
                      class="btn-medpay-green btn btn-success btn-sm text-center mt-n1"
                      style="white-space: nowrap; overflow: hidden; width: 10% !important">
                      <span class="text-center ml-1" style="font-size: 90%">Payer</span>
                    </button>
                  </div>

                </div>


                <div v-if="selectedOptionMode == 2" class="">
                  <img src="@/assets/images/mtn.jpg" alt="patient" class="row col-md-12 mx-auto mt-1 h-25"
                    style="width: 170px" />

                  <div class="row col-md-12 col-lg-12 mt-1">

                    <div class="form-group col-md-4 col-lg-4">
                      <!-- <label for="exampleInputEmail1">Nom {{ momoData.statut }}</label> -->
                      <label for="exampleInputEmail1">Nom <span style="color: red">*</span>
                      </label>
                      <input v-model="momoData.nom" type="text" class="form-control" id="exampleInputEmail1"
                        placeholder="Nom" required :class="{ 'is-invalid': formErrors.nom }"
                        @input="formErrors.nom = false" />
                      <div v-if="formErrors.nom" class="error-message">
                        Le champ Nom est requis.
                      </div>
                    </div>
                    <div class="form-group col-md-4 col-lg-4">
                      <label for="exampleInputEmail1">Prénom(s) <span style="color: red">*</span>
                      </label>
                      <input v-model="momoData.prenom" type="text" class="form-control" id="exampleInputEmail1"
                        placeholder="Prénom(s)" required :class="{ 'is-invalid': formErrors.prenom }"
                        @input="formErrors.prenom = false" />
                      <div v-if="formErrors.prenom" class="error-message">
                        Le champ Prénom est requis.
                      </div>
                    </div>

                    <div class="form-group col-md-2 col-lg-2">
                      <label for="exampleInputEmail1">Téléphone <span style="color: red">*</span>
                      </label>
                      <input v-model="momoData.telephone" type="text" class="form-control" id="exampleInputEmail1"
                        placeholder="Téléphone" required :class="{ 'is-invalid': formErrors.telephone }"
                        @input="formErrors.telephone = false" />
                      <div v-if="formErrors.telephone" class="error-message">
                        Ce champs est requis ou invalid.
                      </div>
                    </div>

                    <!-- <div class="form-group col-md-2">
                      <label for="exampleInputUsername1">Montant A Payer</label>
                      <input v-model="momoData.montant" readonly type="text" class="form-control"
                        id="exampleInputUsername1" placeholder="Montant total" required />
                    </div> -->
                    <div class="form-group col-md-2 col-lg-2 mt-4">
                      <button @click="validerPayement" type="button"
                        class="btn-medpay-green btn btn-success btn-sm text-center mt-n1"
                        style="white-space: nowrap; overflow: hidden">
                        <span class="text-center ml-1" style="font-size: 90%">Procéder au paiement</span>
                      </button>
                    </div>

                  </div>
                </div>

                <!-- <div v-if="selectedOptionMode == 3" class="control-group mt-3">
                  <img src="@/assets/images/moov.png" alt="patient" class="row col-md-12 mx-auto h-50"
                    style="width: 200px" />

                  <div class="p-1 row">
                    <div class="form-group p-4 mx-auto" @click="validerPayement">
                      <button id="pay-moov" type="button" class="btn btn-success btn-medpay-green text-center"
                        style="white-space: nowrap; overflow: hidden">
                        <span class="text-center ml-1" style="font-size: 90%">Procéder au paiement</span>
                      </button>
                    </div>
                  </div>
                </div> -->

                <div v-if="selectedOptionMode == 3" class="">
                  <img src="@/assets/images/moov.png" alt="patient" class="row col-md-12 mx-auto mt-1 h-25"
                    style="width: 170px" />

                  <div class="row col-md-12 col-lg-12 mt-1">

                    <div class="form-group col-md-4 col-lg-4">
                      <!-- <label for="exampleInputEmail1">Nom {{ momoData.statut }}</label> -->
                      <label for="exampleInputEmail1">Nom <span style="color: red">*</span>
                      </label>
                      <input v-model="momoData.nom" type="text" class="form-control" id="exampleInputEmail1"
                        placeholder="Nom" required :class="{ 'is-invalid': formErrors.nom }"
                        @input="formErrors.nom = false" />
                      <div v-if="formErrors.nom" class="error-message">
                        Le champ Nom est requis.
                      </div>
                    </div>
                    <div class="form-group col-md-4 col-lg-4">
                      <label for="exampleInputEmail1">Prénom(s) <span style="color: red">*</span>
                      </label>
                      <input v-model="momoData.prenom" type="text" class="form-control" id="exampleInputEmail1"
                        placeholder="Prénom(s)" required :class="{ 'is-invalid': formErrors.prenom }"
                        @input="formErrors.prenom = false" />
                      <div v-if="formErrors.prenom" class="error-message">
                        Le champ Prénom est requis.
                      </div>
                    </div>

                    <div class="form-group col-md-2 col-lg-2">
                      <label for="exampleInputEmail1">Téléphone <span style="color: red">*</span>
                      </label>
                      <input v-model="momoData.telephone" type="text" class="form-control" id="exampleInputEmail1"
                        placeholder="Téléphone" required :class="{ 'is-invalid': formErrors.telephone }"
                        @input="formErrors.telephone = false" />
                      <div v-if="formErrors.telephone" class="error-message">
                        Ce champs est requis ou invalid.
                      </div>
                    </div>

                    <!-- <div class="form-group col-md-2">
                      <label for="exampleInputUsername1">Montant A Payer</label>
                      <input v-model="momoData.montant" readonly type="text" class="form-control"
                        id="exampleInputUsername1" placeholder="Montant total" required />
                    </div> -->
                    <div class="form-group col-md-2 col-lg-2 mt-4">
                      <button @click="validerPayement" type="button"
                        class="btn-medpay-green btn btn-success btn-sm text-center mt-n1"
                        style="white-space: nowrap; overflow: hidden">
                        <span class="text-center ml-1" style="font-size: 90%">Procéder au paiement</span>
                      </button>
                    </div>

                  </div>
                </div>

                <!-- <div v-if="selectedOptionMode == 4" class="control-group mt-3">
                  <img src="@/assets/images/celtis.jpg" alt="patient" class="row col-md-12 mx-auto h-50"
                    style="width: 200px" />

                  <div class="p-1 row">
                    <div class="form-group p-4 mx-auto home" @click="validerPayement">
                      <button id="" type="button" class="btn btn-success btn-medpay-green text-center"
                        style="white-space: nowrap; overflow: hidden">
                        <span class="text-center ml-1" style="font-size: 90%">Procéder au paiement</span>
                      </button>
                    </div>
                  </div>
                </div> -->

                <div v-if="selectedOptionMode == 4" class="">
                  <img src="@/assets/images/celtis.jpg" alt="patient" class="row col-md-12 mx-auto mt-1 h-25"
                    style="width: 170px" />

                  <div class="row col-md-12 col-lg-12 mt-1">

                    <div class="form-group col-md-4 col-lg-4">
                      <!-- <label for="exampleInputEmail1">Nom {{ momoData.statut }}</label> -->
                      <label for="exampleInputEmail1">Nom <span style="color: red">*</span>
                      </label>
                      <input v-model="momoData.nom" type="text" class="form-control" id="exampleInputEmail1"
                        placeholder="Nom" required :class="{ 'is-invalid': formErrors.nom }"
                        @input="formErrors.nom = false" />
                      <div v-if="formErrors.nom" class="error-message">
                        Le champ Nom est requis.
                      </div>
                    </div>
                    <div class="form-group col-md-4 col-lg-4">
                      <label for="exampleInputEmail1">Prénom(s) <span style="color: red">*</span>
                      </label>
                      <input v-model="momoData.prenom" type="text" class="form-control" id="exampleInputEmail1"
                        placeholder="Prénom(s)" required :class="{ 'is-invalid': formErrors.prenom }"
                        @input="formErrors.prenom = false" />
                      <div v-if="formErrors.prenom" class="error-message">
                        Le champ Prénom est requis.
                      </div>
                    </div>

                    <div class="form-group col-md-2 col-lg-2">
                      <label for="exampleInputEmail1">Téléphone <span style="color: red">*</span>
                      </label>
                      <input v-model="momoData.telephone" type="text" class="form-control" id="exampleInputEmail1"
                        placeholder="Téléphone" required :class="{ 'is-invalid': formErrors.telephone }"
                        @input="formErrors.telephone = false" />
                      <div v-if="formErrors.telephone" class="error-message">
                        Ce champs est requis ou invalid.
                      </div>
                    </div>

                    <!-- <div class="form-group col-md-2">
                      <label for="exampleInputUsername1">Montant A Payer</label>
                      <input v-model="momoData.montant" readonly type="text" class="form-control"
                        id="exampleInputUsername1" placeholder="Montant total" required />
                    </div> -->
                    <div class="form-group col-md-2 col-lg-2 mt-4">
                      <button @click="validerPayement" type="button"
                        class="btn-medpay-green btn btn-success btn-sm text-center mt-n1"
                        style="white-space: nowrap; overflow: hidden">
                        <span class="text-center ml-1" style="font-size: 90%">Procéder au paiement</span>
                      </button>
                    </div>

                  </div>
                </div>

                <div v-if="selectedOptionMode == 5" class="control-group mt-3">

                  <div class="d-flex justify-content-end mt-0">
                    <button @click="validerPayement" type="button"
                      class="btn-medpay-green btn btn-success btn-sm text-center mt-n1"
                      style="white-space: nowrap; overflow: hidden; ">
                      <span class="text-center ml-1" style="font-size: 90%">Procéder au paiement</span>
                    </button>
                  </div>
                </div>
                <div v-if="selectedOptionMode == 6" class="control-group">
                  <!-- <img src="@/assets/images/carte-credit.png" alt="patient" class="row col-md-12 mx-auto h-35"
                    style="width: 200px" /> -->

                  <div class="d-flex justify-content-end mt-0">
                    <button @click="validerPayement" type="button"
                      class="btn-medpay-green btn btn-success btn-sm text-center mt-n1"
                      style="white-space: nowrap; overflow: hidden; ">
                      <span class="text-center ml-1" style="font-size: 90%">Procéder au paiement</span>
                    </button>
                  </div>
                </div>
                <div v-if="selectedOptionMode == 7" class="control-group mt-3">
                  <!-- <img src="@/assets/images/tresor.png" alt="patient" class="row col-md-12 mx-auto h-40"
                    style="width: 200px" /> -->


                  <div class="d-flex justify-content-end mt-0">
                    <button @click="validerPayement" type="button"
                      class="btn-medpay-green btn btn-success btn-sm text-center mt-n1"
                      style="white-space: nowrap; overflow: hidden; ">
                      <span class="text-center ml-1" style="font-size: 90%">Procéder au paiement</span>
                    </button>
                  </div>
                </div>
                <div v-if="selectedOptionMode == 8" class="control-group mt-3">
                  <!-- <img src="@/assets/images/debts.jpeg" alt="patient" class="row col-md-12 mx-auto h-40"
                    style="width: 150px" /> -->

                  <!-- <div class="row">
                    <div class="form-group p-2 mx-auto home" @click="validerPayement">
                      <button id="" type="button" class="btn btn-success btn-medpay-green text-center">
                        <span class="text-center ml-1">Enregistrer</span>
                      </button>
                    </div>
                  </div> -->

                  <div class="d-flex justify-content-end mt-0">
                    <button @click="validerPayement" type="button"
                      class="btn-medpay-green btn btn-success btn-sm text-center mt-n1"
                      style="white-space: nowrap; overflow: hidden; ">
                      <span class="text-center ml-1" style="font-size: 90%">Enregistrer</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div class="modal fade" id="confirmationMOMO" tabindex="-1" role="dialog"
              aria-labelledby="confirmationMOMOLabel1" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="confirmationMOMOLabel">
                      {{
                        momoData.statut == "PENDING"
                        ? "Validation en cours"
                        : momoData.statut == "FAILED"
                          ? "Échec de paiement"
                          : "Paiement réussi avec succès"
                      }}
                    </h5>

                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <div class="modal-body" style="text-align: center">
                    <div id="pending-content" v-if="momoData.statut == 'PENDING'">
                      <!-- <img src="https://onecall.ci/fr/smspro/assets/img/loader.gif" alt="Trulli" width="300" height="233"> -->
                      <img src="@/assets/images/loading.gif" alt="Trulli" width="200" height="200" />
                      <h3 class="mt-3">
                        <label style="color: #1d7db4">Veuillez patienter s'il vous plaît...</label>
                      </h3>
                    </div>

                    <div id="success-content" v-if="momoData.statut == 'SUCCESSFUL'">
                      <!-- <img src="https://onecall.ci/fr/smspro/assets/img/loader.gif" alt="Trulli" width="300" height="233"> -->
                      <img src="@/assets/images/img-valider.png" alt="logo" class="w-50" />
                      <!-- <h4><a href="#"> Cliquez ici pour continuer le processus.</a></h4> -->
                    </div>

                    <div id="failed-content" v-if="momoData.statut == 'FAILED'">
                      <!-- <img src="https://onecall.ci/fr/smspro/assets/img/loader.gif" alt="Trulli" width="300" height="233"> -->
                      <img src="@/assets/images/delete.png" alt="Trulli" width="200" height="200" />
                      <h4>Le paiement a échoué. Veuillez réessayer.</h4>
                    </div>
                  </div>

                  <div class="modal-footer">
                    <button v-if="momoData.statut === 'PENDING'" type="button" class="btn btn-secondary btn-rounded"
                      @click="annulerMomo">
                      Annuler
                    </button>

                    <button class="btn btn-secondary btn-medpay-gray" v-if="momoData.statut === 'FAILED'"
                      data-dismiss="modal" type="button">
                      Fermer
                    </button>

                    <button v-if="momoData.statut === 'SUCCESSFUL'" type="button"
                      class="btn btn-success btn-connexion-green mx-auto mt-n2" @click="ShowFacture">
                      <i class="mdi mdi mdi-cloud-download"></i> Cliquer ici pour imprimer
                      la facture
                    </button>
                    <!-- <button type="button" class="btn btn-success btn-rounded" @click="validateData">Oui</button> -->
                  </div>
                </div>
              </div>
            </div>

            <div class="modal fade" id="confirmationModalFedapay" tabindex="-1" role="dialog"
              aria-labelledby="confirmationMOMOLabel1" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>

                  <div class="modal-body" style="text-align: center">
                    <div v-if="statusFedapay == 'approved'">
                      <!-- <div id="success-content" > -->
                      <!-- <img src="https://onecall.ci/fr/smspro/assets/img/loader.gif" alt="Trulli" width="300" height="233"> -->

                      <img src="@/assets/images/img-valider.png" alt="logo" class="w-50" />

                      <!-- <h4><a href="#"> Cliquez ici pour continuer le processus.</a></h4> -->
                    </div>
                    <div v-if="statusFedapay == 'canceled'">
                      <!-- <div id="success-content" > -->
                      <!-- <img src="https://onecall.ci/fr/smspro/assets/img/loader.gif" alt="Trulli" width="300" height="233"> -->

                      <img src="@/assets/images/delete.png" alt="logo" class="w-50" />

                      <!-- <h4><a href="#"> Cliquez ici pour continuer le processus.</a></h4> -->
                    </div>
                  </div>

                  <div class="modal-footer">
                    <button class="btn btn-secondary btn-rounded" v-if="statusFedapay == 'canceled'" data-dismiss="modal"
                      type="button">
                      Fermer
                    </button>

                    <button v-if="statusFedapay == 'approved'" type="button"
                      class="btn btn-success btn-connexion-green mx-auto mt-n2" @click="ShowFacture">
                      <i class="mdi mdi mdi-cloud-download"></i> Cliquer ici pour imprimer
                      la facture
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="modal fade" id="confirmationModal" tabindex="-1" role="dialog"
                aria-labelledby="confirmationModalLabel1" aria-hidden="true">
                <div class="modal-dialog" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="confirmationModalLabel">
                        Confirmation
                      </h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body d-flex justify-content-between col-12 flex-row">
                      Êtes-vous sûr de vouloir valider le paiement ?
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary btn-rounded" data-dismiss="modal">
                        Non
                      </button>

                      <button type="button" class="btn btn-success btn-rounded" @click="validerPayement">
                        Oui
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="modal fade" id="confirmationModalpay" tabindex="-1" role="dialog"
                aria-labelledby="confirmationModalPayLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="confirmationModalPayLabel" style="font-weight-bold">
                        Paiement validé avec succès
                      </h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>

                    <div class="modal-body text-center">
                      <img src="@/assets/images/img-valider.png" alt="logo" class="w-50" />
                      <p style="font-weight-bold">
                        Vous avez reçu un paiement de {{ patient.lastname }}
                        {{ patient.firstname }} !
                      </p>
                    </div>

                    <div class="modal-footer">
                      <button type="button" class="btn btn-success mx-auto mt-n2" @click="ShowFacture">
                        <i class="mdi mdi mdi-cloud-download"></i> Cliquer ici pour
                        imprimer la facture
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
<!-- 
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-dialog modal-xl" role="document">
                <div class="modal-content bg-white">
        
                  <div class="modal-body" id="print-section" ref="modalContent">
                    <div class="container-fluid">
                      <div class="row mb-2 mr-0 ml-0 col-sm-12">
                        <div class="col-sm-4"></div>
                        <div class="col-sm-12 d-flex justify-content-between">
                          <img src="@/assets/images/logo.png" alt="logo" class=""
                            style="width: 130px !important; height: 50px !important" />
                          <img src="@/assets/images/santee.png" alt="logo" class=""
                            style="width: 150px !important; height: 50px !important" />
                        </div>
                      </div>

                      <hr style="background-color: rgb(156, 151, 151)" class="mt-n2" />

                      <div class="row mb-1">
                        <div class="col-sm-6">
                          <h4>Partie versante :</h4>
                          <p>
                            <strong>{{ patient.lastname }} {{ patient.firstname }}</strong>
                          </p>
                          <p>{{ patient.maison }}</p>
                          <p>{{ patient.phone }}</p>
                          <p>
                            <strong>IPP :</strong> {{ patient.ipp }} |
                            <strong> IEP : {{ patient.iep }} </strong>
                          </p>
                        </div>
                        <div class="col-sm-6 text-right">
                          <h4>Facture N° {{ referenceFacture }}</h4>
                          <p>
                            <strong>Date : {{ invoice.date | formatDate }} </strong>
                          </p>
                          <p><strong>LOKOSSA ATHIEME</strong></p>
                          <p>Code postal 09 6 51 03</p>
                          <p>En allant à LINK Hotel</p>
                        </div>
                      </div>

                      <div class="table-responsive">
                        <table class="table table-bordered">
                          <thead style="padding: 3px !important; height: 10px">
                            <tr style="padding: 3px !important">
                              <th>Mode</th>
                              <th>code</th>
                              <th>Désignation</th>
                              <th>Quantité</th>
                              <th>Prix unitaire</th>
                              <th>Montant</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(acte, index) in medicalActDetailsFacture" :key="index">
                              <td>
                                <span v-if="selectedOptionMode == 1">ESPECE</span>
                                <span v-else-if="selectedOptionMode == 2">MTN MOBILE MONEY</span>
                                <span v-else-if="selectedOptionMode == 3">MOOV MONEY</span>
                                <span v-else-if="selectedOptionMode == 4">CELTIS</span>
                                <span v-else-if="selectedOptionMode == 5">CARTE BANCAIRE</span>
                                <span v-else-if="selectedOptionMode == 6">CARTE DE CRÉDIT</span>
                                <span v-else-if="selectedOptionMode == 7">PAIEMENT TRESORPAY</span>
                                <span v-else-if="selectedOptionMode == 8">PAIEMENT A CREDIT</span>
                              </td>
                              <td>{{ acte.code }}</td>
                              <td>{{ acte.designation }}</td>
                              <td>{{ acte.medical_acts_qte }}</td>
                              <td>{{ formatNumber(acte.medical_acts_price) }}</td>
                              <td>
                                {{
                                  formatNumber(
                                    Math.round(acte.medical_acts_price) *
                                    acte.medical_acts_qte
                                  )
                                }}
                              </td>
                            </tr>
                          </tbody>
                          <tfoot>
                            <tr>
                              <td colspan="5" class="text-right">
                                <strong>Montant Total (+) </strong>
                              </td>
                              <td>
                                <strong>{{ formatNumber(calculateTotalActes()) }} FCFA</strong>
                              </td>
                            </tr>

                            <tr>
                              <td colspan="5" class="text-right">
                                <strong> Total Prise en charge (-)</strong>
                              </td>
                              <td>
                                <strong>{{ formatNumber(totalPriseEncharge) }} FCFA</strong>
                              </td>
                            </tr>
                   

                            <tr>
                              <td colspan="5" class="text-right" style="background-color: rgb(213, 219, 218)">
                                <strong>Montant Total Versé</strong>
                              </td>
                              <td style="background-color: rgb(213, 219, 218)">
                                <strong>{{ formatNumber(calculateTotalAmount()) }} FCFA</strong>
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>

                      <div class="row mt-1">
                        <div class="col-sm-6">
           
                          <p>
                            la présente facture à la somme de :
                            <strong style="text-transform: capitalize">{{ convertNumberToLetter(calculateTotalAmount()) }}
                              FCFA
                            </strong>
                          </p>


                          <div>
                            <router-link v-if="qrCodeUrl" :to="{
                              name: 'FactureDetails',
                              params: { reference: referenceFacture },
                              path: '/facture' + $route.path,
                            }" target="_blank">
                              <img :src="qrCodeUrl" alt="QR Code" style="height: 60px" />
                            </router-link>
                          </div>
                        </div>
                        <div class="col-sm-6 text-right">
                          <p><strong> Le Caissier </strong></p>
                          <img src="@/assets/images/signature.png" alt="logo" class="" style="width: 80px" />
                          <p><strong> Félicien DAGBOGBO </strong></p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="modal-footer d-flex justify-content-between col-12 flex-row">
     
                    <button type="button" class="btn btn-danger btn-medpay-gray" data-dismiss="modal">
                      Annuler
                    </button>

                    <button type="button" class="btn btn-success btn-medpay-green" @click="printModal">
                      Imprimer
                    </button>
                  </div>
                </div>
              </div>
            </div>  -->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script></script>

<script type="text/javascript">
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
import { format } from "date-fns";

import { momoService } from "@/_services/momos_services.js";
// import { acteMedicalService } from "@/_services/acte_medical_services.js";
import { actsService } from "@/_services/actsmedicals_services.js";
import { patientService } from "@/_services/patients_services.js";
import { pourcentagePatient } from "@/_services/pourcentage_indigence_patient_services.js";
import { PriseEnChargePatientService } from "@/_services/priseenchargepatient_services.js";

import { modePayementService } from "@/_services/mode_payement_services.js";
import { payementService } from "@/_services/payements_services.js";
import { factureService } from "@/_services/facture_services.js";
import { especeService } from "@/_services/espece_services.js";
import { fedapayService } from "@/_services/fedapay_services.js";
import { useToast, POSITION } from "vue-toastification";
import QRCode from "qrcode";
import { affectterminalService } from "@/_services";
// import html2pdf from "html2pdf.js";

import "@/asset/js/fedapay_checkout.js?v=1.1.7";
// import "@/asset/js/kkiapay.js";
import { openKkiapayWidget, addKkiapayListener, removeKkiapayListener } from "kkiapay";

// import "../../../assets/js/alertify.js";

export default {
  name: "create-payement",

  data() {
    return {
      selectedPatient: "",
      isPrinting: false,
      modePayements: [],
      selectedCashRegister: "",
      displayedMovments: [], // Les mouvements à afficher dans le tableau
      searchTerm: "", // Terme de recherche

      // modePayement: {},
      //utilisateur connecté
      user: JSON.parse(localStorage.getItem("user")),

      modePayement: "",
      patients: [], // Remplir cette liste avec les patients disponibles
      patientsMove: [], // Remplir cette liste avec les patients disponibles
      patient: {},
      statutCashier: 0,

      assurance: "",
      indigence: "",
      assurancePourcentage: null,
      assuranceNumero: null,
      indigencePourcentage: "",
      totalPriseEncharge: "",
      indigencePatients: [],
      indigences: [],
      patientIndigence: null,
      pourcentageIndigence: null,
      prisenchargePourcentage: null,
      assurancepatient: null,
      indigencepatient: "",
      payementId: "",
      montantFedapay: null,
      montantKikiapay: null,
      qrCodeUrl: "",
      invoiceUrl: "",
      feesKikiapay: "",
      feesFedapay: "",
      patientInsuranceDetails: [],
      selectedInsuranceIndex: null,
      selectedInsurancePercentage: null,
      affectterminals: [],
      listMovments: [],
      referenceFacture: null,
      tableInsurance: null,
      totalActe: "",
      selectedRow: -1, // Index de la ligne sélectionnée (aucune ligne sélectionnée initialement)
      medicalActDetails: [], // Tableau pour stocker les détails des actes médicaux
      medicalActDetailsFacture: [],
      showModal: false,

      // pourcentageindigence:"",
      searchQuery: "",
      cashRegisterCashierCurrent: {},
      cashsHistoricalCurrent: {},
      searchQuery1: "",
      anotherParamSearch: "", // Ce paramètre sera utilisé pour la requête

      actesMedicals: [], // Tableau pour stocker l'acte medical en fonction de l'id de l'acte choisi par user
      listactes: [], // Tableau pour stocker l'acte medical en fonction de l'id de l'acte choisi par user
      actesSelectionnes: [], // Tableau pour stocker tous les actes medicaux chaque fois que user clique dessus
      // form: {
      //   acte: "", // Initialiser la valeur par défaut à "SA"
      //   code: "",
      //   prix: "",
      // },

      montantEspece: null,
      statusFedapay: null,

      momoData: {
        selectedOptionMode: "",
        nom: "",
        statut: "PENDING",
        prenom: "",
        telephone: "",
        montant: "",
        transaction: null,
      },

      momoDataEspece: {
        montant: "",
      },

      //  readonlyoption: 'autre',
      //  isreadonly: true,

      afficherModal: false,
      //selected: 'A',

      selectedOptionMode: "",

      selected: "",
      options: [
        { item: "F", name: " Feminin" },
        { item: "M", name: " Masculin" },
        //{ item: 'D', name: 'Option C', notEnabled: true },
        // { item: { d: 1 }, name: 'Option D' } this.forms.push({ mode: '', code: '', prix: '', quantite: '', montant: '' });
      ],

      forms: [
        {
          acte: "SA",
          quantite: "",
          code: "",
          prix: "",
          montant: "",
          autre: "",
          readonly: true,
        },
      ],

      showModal: false,

      invoice: {
        number: "230510406-CS006",
        date: new Date(),
      },

      formErrors: {
        nom: false,
        prenom: false,
        telephone: false,
        patient: false,
        agePatient: false,
        acteMedical: false,
        autreActe: false,
        prix: false,
      },
    };
  },

  methods: {
    selectInsuranceRow(index) {
      if (this.selectedInsuranceIndex === index) {
        // Si la ligne est déjà sélectionnée, désélectionnez-la
        this.selectedInsuranceIndex = null;
        this.selectedInsurancePercentage = null; // Réinitialisez la variable
      } else {
        // Sinon, sélectionnez la ligne
        this.selectedInsuranceIndex = index;
        // Récupérez le pourcentage de l'assurance correspondant à la ligne sélectionnée
        if (this.patientInsuranceDetails && this.patientInsuranceDetails[index]) {
          this.selectedInsurancePercentage = this.patientInsuranceDetails[
            index
          ].percentage;
          console.log(this.selectedInsurancePercentage);
        }
      }
    },

    getHistoricalCurrent() {
      // Si this.searchTerm est vide, obtenez les derniers mouvements par défaut.
      // Sinon, effectuez une recherche en utilisant this.searchTerm.

      factureService
        .getHistoricalCurrent(this.cashRegisterCashierCurrent.cash_registers_id)
        .then((res) => {
          this.cashsHistoricalCurrent = res.data.data;
          console.log("this.cashsHistoricalCurrent ");
          console.log(this.cashsHistoricalCurrent);
          // console.log("this.displayedMovments");
          // console.log(this.displayedMovments);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getCashRegisterCashierCurrent() {
      // Si this.searchTerm est vide, obtenez les derniers mouvements par défaut.
      // Sinon, effectuez une recherche en utilisant this.searchTerm.
      const user_id = this.user.id;
      factureService
        .getCashRegisterCashierCurrent(user_id)
        .then((res) => {
          this.cashRegisterCashierCurrent = res.data.data;
          this.getHistoricalCurrent();
          // console.log("this.cashRegisterCashierCurrent" );
          // console.log(this.cashRegisterCashierCurrent );
        })
        .catch((error) => {
          console.error(error);
        });
    },

    selectRow(index, movmentId) {
      if (this.selectedRow === index) {
        // Si la ligne est déjà sélectionnée, désélectionnez-la
        this.selectedRow = -1;
        this.medicalActDetails = [];
        this.medicalActDetailsFacture = [];
     
      } else {
        // Sinon, sélectionnez la ligne
        this.selectedRow = index;
        console.log("movmentId");
        console.log(movmentId);

        // console.log(movmentId);
        factureService
          .listBillsByMovment(movmentId)
          .then((response) => {
            this.medicalActDetails = response.data.data;
            this.medicalActDetailsFacture = response.data.data;

            if (this.medicalActDetails.length == 0) {
              this.$toast.error("Aucune facture trouvée!", {
                position: "top-right",
                timeout: 3000,
                style: {
                  background: "#ff0000", // Couleur de fond rouge pour l'erreur
                  color: "#fff", // Couleur du texte
                  fontWeight: "bold",
                },
              });

            } 

            console.log(this.medicalActDetails);
          })
          .catch((error) => {
            console.error(error);
          });

        factureService
          .getPatientInfo(movmentId)
          .then((res) => {
            this.patient = res.data.data;

            console.log("this.patientSelected");
            console.log(this.patient.ipp);

            return factureService.getInsuranceDetailsByIpp(this.patient.ipp);
          })

          .then((res) => {
            this.patientInsuranceDetails = res.data.data;

            console.log("this.patientInsuranceDetails");
            console.log(this.patientInsuranceDetails);
          })
          .catch((error) => {
            console.error(error);
          });
        // Appelez la méthode pour récupérer les détails des actes médicaux en utilisant movmentId
      }
    },

    getListMovment() {
      factureService.getListMovment().then((res) => {
        this.listMovments = res.data.data;

        // console.log(this.listMovments);
      });
    },
    getListAndSearchMovments() {
      // Si this.searchTerm est vide, obtenez les derniers mouvements par défaut.
      // Sinon, effectuez une recherche en utilisant this.searchTerm.
      const formData = { search: this.searchTerm };
      factureService
        .searchMovments(formData)
        .then((res) => {
          this.displayedMovments = res.data.data;
          // console.log("this.displayedMovments");
          // console.log(this.displayedMovments);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    kkiapay() {
      const k = openKkiapayWidget({
        amount: this.totalActe,
        position: "center",
        callback: "",
        data: "",
        url: "@/assets/images/logo.png",
        sandbox: "true",
        // sandbox: "false",
        theme: "green",
        // key: "a1d89eba52d05bf3629acc7836c8d602e72629a8",
        key: "d9da5d50d3a311edb532ad421d393c9e",
      });

      addSuccessListener((response) => {
        console.log(response);

        if (response.transactionId) {
          const transaction_id = response.transactionId;
          console.log(transaction_id);

          // this.createFacture();

          setTimeout(function () {
            // Code à exécuter après l'attente de 3 secondes
            $("#exampleModal").modal("show"); // modal de facture
          }, 3000); // 3000 millisecondes équivalent à 3 secondes

          factureService
            .gettransactionKikiapay(transaction_id)
            .then((res) => {
              const data = res.data.data;

              console.log(data);

              if (data.status == "SUCCESS") {
                this.feesKikiapay = data.fees;
                this.montantKikiapay = data.amount + data.fees;

                // const credentials = {
                //   mode_payements_id: this.selectedOptionMode,
                //   payement_id: payementId,
                //   nom: data.client.fullname,
                //   prenom: data.client.fullname,
                //   telephone: data.client.phone,
                //   montant: data.amount + data.fees,
                //   transaction_id: transaction_id,
                //   statut: data.status,
                // };

                // console.log(credentials);

                // fedapayService
                //   .requestFedapay(credentials, payementId)
                //   .then((response) => {
                //     console.log(response.data.data.montant);
                //   })

                //   .catch((error) => {
                //     console.error(error);
                //   });

                // this.createFacture();

                setTimeout(function () {
                  // Code à exécuter après l'attente de 3 secondes
                  $("#exampleModal").modal("show");
                }, 3000); // 3000 millisecondes équivalent à 3 secondes
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    },

    // successHandler(response, payementId ) {
    //   if (response.transactionId) {
    //     const transaction_id = response.transactionId;
    //     console.log(transaction_id)
    //     payementService
    //       .gettransactionKikiapay(transaction_id)
    //       .then((res) => {
    //         const data = res.data.data;

    //         console.log(data);

    //         if (data.status == "SUCCESS") {
    //           const credentials = {
    //             mode_payements_id: this.selectedOptionMode,
    //             payement_id: payementId,
    //             nom: data.client.fullname,
    //             prenom: data.client.fullname,
    //             telephone: data.client.phone,
    //             montant: data.amount + data.fees,
    //             transaction_id: transaction_id,
    //             statut: data.status,
    //           };

    //           console.log(credentials);

    //           // fedapayService
    //           //   .requestFedapay(credentials, payementId)
    //           //   .then((response) => {
    //           //     console.log(response.data.data.montant);

    //           //   })

    //           //   .catch((error) => {
    //           //     console.error(error);
    //           //   });

    //           // this.createFacture(payementId);
    //         }

    //       })
    //       .catch((error) => {
    //         console.error(error);
    //       });
    //   }
    // },

    tresorPay() {
      console.log("my trsepay function");
      return TresorPay.init("#tresorpay-btn", {
        public_key: "pk_live_MIG-bdEoIjCquToAx6nNBnuf",

        transaction: {
       
          amount: 1000,
          description: "Payement Facture",
          custom_metadata: {
            equittance: {
              receipe_nature: "national",
              receipe_class: "1019",
            },
          },
        },

        customer: {
          email: this.patient.email,
          lastname: this.patient.firstname,
          firstname: this.patient.lastname,
          phone_number: {
            number: "229" + this.patient.phone,
            country: "BJ",
          },
        },
        payment_method: {
          brand: "moov",
          number: "229" + this.patient.phone,
        },

        onComplete: (response) => {
          console.log(response.transaction);
          console.log(response.transaction.status);

          if (response.transaction.status == "approved") {
            this.statusFedapay = "approved";
            this.feesFedapay = response.transaction.fees;

            this.montantFedapay = response.transaction.amount_debited;

            this.createFacture();
          }

          $("#confirmationModalFedapay").modal("show");
        },
      });
    },

    fedaPay() {
      return FedaPay.init("#pay-btn", {
        public_key: "pk_sandbox_cdiapMSeRJxMt6rwvjP7t2Ns",

        transaction: {
          // amount: this.momoData.montant,
          amount: 1000,
          description: "Payement Facture",
          mode: "moov",
        },

        mode: "moov",
        customer: {
          email: this.patient.email,
          lastname: this.patient.firstname,
          firstname: this.patient.lastname,
          phone_number: {
            // number: "229" + this.patient.phone,
            number: "64000001",
            country: "BJ",
          },
        },
        payment_method: {
          brand: "moov",
          number: "229" + this.patient.phone,
        },

        onComplete: (response) => {
          console.log(response.transaction);
          console.log(response.transaction.status);

          if (response.transaction.status == "approved") {
            this.statusFedapay = "approved";
            this.feesFedapay = response.transaction.fees;

            this.montantFedapay = response.transaction.amount_debited;

            this.createFacture();
          } else {
            this.statusFedapay = "canceled";
          }

          $("#confirmationModalFedapay").modal("show");
        },
      });
    },

    // fetchModePayements() {
    //   modePayementService
    //     .getAllModePayement()
    //     .then((res) => {
    //       this.modePayements = res.data.data;
    //       // console.log(this.modePayement); // $('button#pay-btn').click(); })
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // },

    fetchModePayementDetails() {
      console.log(this.selectedOptionMode);
      if (this.selectedOptionMode == 2) {
        this.momoData.nom = this.patient.firstname;
        this.momoData.prenom = this.patient.lastname;
        this.momoData.telephone = this.patient.phone;
      }
    },

    fetchPatients() {
      patientService
        .getAllPatients()
        .then((res) => {
          this.patients = res.data.data;
          console.log("tous les patients");
          // console.log(this.patients);
        })
        .catch((error) => {
          console.error(error);
        });
    },

    detail() {
      this.formErrors.patient = false;
      patientService.getPatient(this.selectedPatient).then((res) => {
        this.patient = res.data.data;

        // this.assurance = this.patient.assurance;
        // this.indigence = this.patient.indigence;
        // this.assurancePourcentage = this.patient.assurancePourcentage;  pk_live_pEpqCZWH8MzLlFG06SCzq3ZU
        // this.indigencePourcentage = this.patient.indigencePourcentage;
      });

      pourcentagePatient
        .getPourcentagePatient(this.selectedPatient)
        .then((res) => {
          this.pourcentageIndigence = res.data.data;
          // console.log(this.pourcentageIndigence);
        })

        .catch((error) => {
          console.error(error);
        });

      PriseEnChargePatientService.getAssurancePatient(this.selectedPatient)
        .then((res) => {
          console.log(res.data.data);
          this.assurancepatient = res.data.data.assurance_nom;
          this.assurancePourcentage = res.data.data.pourcentage_assurance;
          this.assuranceNumero = res.data.data.numero_assurance;
          console.log(this.assurancepatient, this.assurancePourcentage);
        })
        .catch((error) => {
          console.error(error);
        });

      // Recharger la liste des actes médicaux

      // factureService
      //   .getActMovment(this.searchQuery)
      //   .then((res) => {
      //     this.actesMedicals = res.data.data;
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //   });
    },

    // fetchActeMedicalDetails(id) {    // function pour recuperer un acte medical

    //   acteMedicalService.getacteMedical(id)
    //     .then(response => {
    //       const acteMedicalDetails = response.data.data; // recuperer un acte medical
    //       // Mettre à jour les détails de l'acte médical
    //       this.form.code = acteMedicalDetails.code;
    //       this.form.prix = acteMedicalDetails.prix;
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    // },

    // formatDate(date) {
    //   const options = { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
    //   return new Date(date).toLocaleString('fr-FR', options);
    // },

    formaterDate(date) {
      const options = { day: "2-digit", month: "2-digit", year: "numeric" };
      const formattedDate = new Date(date).toLocaleDateString("fr-FR", options);
      const formattedTime = new Date(date).toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      return `${formattedDate} à ${formattedTime}`;
    },
    generateQRCode(reference) {
      const base = location.origin;
      reference = this.referenceFacture;
      const invoiceDetailsUrl = `${base}/facture/details/${this.referenceFacture}`;

      QRCode.toDataURL(invoiceDetailsUrl, { errorCorrectionLevel: "L" }, (err, url) => {
        if (err) {
          console.error(err);
          return;
        }

        this.qrCodeUrl = url; //  genere le code QR
        console.log("this.qrCodeUrl");
        console.log(this.qrCodeUrl);
      });
    },

    calculateTotalMontantActe() {
      let total = 0;
      for (const form of this.forms) {
        total += form.montant;
      }
      return total;
    },

    calculateTotalActes() {
      let totalAmount = 0;

      for (const acte of this.medicalActDetailsFacture) {
        totalAmount += acte.medical_acts_qte * Math.round(acte.medical_acts_price);
      }

      return totalAmount;
    },

    calculateTotalAmount() {
      let totalAmount = 0;
      let assuranceMontant = 0;

      for (const acte of this.medicalActDetailsFacture) {
        totalAmount += acte.medical_acts_qte * Math.round(acte.medical_acts_price);
      }

      this.totalActe = totalAmount;

      if (this.selectedInsurancePercentage) {
        assuranceMontant = (this.selectedInsurancePercentage * this.totalActe) / 100;
        this.totalPriseEncharge = assuranceMontant;
        // console.log("assuranceMontant")
      } else {
        assuranceMontant = 0;
      }

      if (this.selectedOptionMode == 2) {
        this.totalActe = this.totalActe + this.feesKikiapay;
      }

      if (this.selectedOptionMode == 3) {
        this.totalActe = this.totalActe + this.feesFedapay;
      }

      this.totalActe = this.totalActe - assuranceMontant;
      // console.log( "this.totalActe")
      // console.log( this.totalActe)

      this.momoData.montant = this.totalActe;
      // console.log("Total Amount:", this.totalActe);
      return this.totalActe;
    },

    calculateTotalMontant() {
      let total = 0;
      let assuranceMontant = 0;
      let indigenceMontant = 0;

      for (const form of this.forms) {
        total += form.montant;
      }

      if (this.assurancePourcentage) {
        assuranceMontant = (this.assurancePourcentage * total) / 100;
      } else {
        assuranceMontant = 0;
      }

      if (this.pourcentageIndigence) {
        indigenceMontant = (this.pourcentageIndigence * total) / 100;
      } else {
        indigenceMontant = 0;
      }

      // TotalPriseEncharge = assuranceMontant + indigenceMontant;
      this.totalPriseEncharge = assuranceMontant + indigenceMontant;
      total = total - this.totalPriseEncharge;

      if (this.selectedOptionMode == 4) {
        total = total + this.feesKikiapay;
      }

      if (this.selectedOptionMode == 3) {
        total = total + this.feesFedapay;
      }

      this.momoData.montant = total;

      return total;
    },

    calculateTotalMontantEspece() {
      // cette fonction calcule le montant total identique à calculateTotalMontant()
      let total = 0;
      let assuranceMontant = 0;
      let indigenceMontant = 0;

      for (const form of this.forms) {
        total += form.montant;
      }

      if (this.assurancePourcentage) {
        assuranceMontant = (this.assurancePourcentage * total) / 100;
      } else {
        assuranceMontant = 0;
      }

      if (this.pourcentageIndigence) {
        indigenceMontant = (this.pourcentageIndigence * total) / 100;
      } else {
        indigenceMontant = 0;
      }

      // TotalPriseEncharge = assuranceMontant + indigenceMontant;
      this.totalPriseEncharge = assuranceMontant + indigenceMontant;
      total = total - this.totalPriseEncharge;
      this.momoDataEspece.montant = total;
      return total;
    },

    formatNumber(value) {
      if (typeof value !== "number") {
        return value;
      }

      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    },

    Unite(nombre) {
      let unite;
      switch (nombre) {
        case 0:
          unite = "zéro";
          break;
        case 1:
          unite = "un";
          break;
        case 2:
          unite = "deux";
          break;
        case 3:
          unite = "trois";
          break;
        case 4:
          unite = "quatre";
          break;
        case 5:
          unite = "cinq";
          break;
        case 6:
          unite = "six";
          break;
        case 7:
          unite = "sept";
          break;
        case 8:
          unite = "huit";
          break;
        case 9:
          unite = "neuf";
          break;
      }
      return unite;
    },

    Dizaine(nombre) {
      let dizaine;
      switch (nombre) {
        case 10:
          dizaine = "dix";
          break;
        case 11:
          dizaine = "onze";
          break;
        case 12:
          dizaine = "douze";
          break;
        case 13:
          dizaine = "treize";
          break;
        case 14:
          dizaine = "quatorze";
          break;
        case 15:
          dizaine = "quinze";
          break;
        case 16:
          dizaine = "seize";
          break;
        case 17:
          dizaine = "dix-sept";
          break;
        case 18:
          dizaine = "dix-huit";
          break;
        case 19:
          dizaine = "dix-neuf";
          break;
        case 20:
          dizaine = "vingt";
          break;
        case 30:
          dizaine = "trente";
          break;
        case 40:
          dizaine = "quarante";
          break;
        case 50:
          dizaine = "cinquante";
          break;
        case 60:
          dizaine = "soixante";
          break;
        case 70:
          dizaine = "soixante-dix";
          break;
        case 80:
          dizaine = "quatre-vingt";
          break;
        case 90:
          dizaine = "quatre-vingt-dix";
          break;
      }
      return dizaine;
    },

    NumberToLetter(nombre) {
      let i, j, n, quotient, reste, nb;
      let ch;
      let numberToLetter = "";

      if (nombre.toString().replace(/ /gi, "").length > 15)
        return "dépassement de capacité";
      if (isNaN(nombre.toString().replace(/ /gi, ""))) return "Nombre non valide";

      nb = parseFloat(nombre.toString().replace(/ /gi, ""));
      if (Math.ceil(nb) !== nb) return "Nombre avec virgule non géré.";

      n = nb.toString().length;
      switch (n) {
        case 1:
          numberToLetter = this.Unite(nb);
          break;
        case 2:
          if (nb > 19) {
            quotient = Math.floor(nb / 10);
            reste = nb % 10;
            if (nb < 71 || (nb > 79 && nb < 91)) {
              if (reste === 0) numberToLetter = this.Dizaine(quotient * 10);
              if (reste === 1)
                numberToLetter = this.Dizaine(quotient * 10) + "-et-" + this.Unite(reste);
              if (reste > 1)
                numberToLetter = this.Dizaine(quotient * 10) + "-" + this.Unite(reste);
            } else
              numberToLetter =
                this.Dizaine((quotient - 1) * 10) + "-" + this.Dizaine(10 + reste);
          } else numberToLetter = this.Dizaine(nb);
          break;
        case 3:
          quotient = Math.floor(nb / 100);
          reste = nb % 100;
          if (quotient === 1 && reste === 0) numberToLetter = "cent";
          if (quotient === 1 && reste !== 0)
            numberToLetter = "cent" + " " + this.NumberToLetter(reste);
          if (quotient > 1 && reste === 0)
            numberToLetter = this.Unite(quotient) + " cents";
          if (quotient > 1 && reste !== 0)
            numberToLetter = this.Unite(quotient) + " cent " + this.NumberToLetter(reste);
          break;
        case 4:
        case 5:
        case 6:
          quotient = Math.floor(nb / 1000);
          reste = nb - quotient * 1000;
          if (quotient === 1 && reste === 0) numberToLetter = "mille";
          if (quotient === 1 && reste !== 0)
            numberToLetter = "mille" + " " + this.NumberToLetter(reste);
          if (quotient > 1 && reste === 0)
            numberToLetter = this.NumberToLetter(quotient) + " mille";
          if (quotient > 1 && reste !== 0)
            numberToLetter =
              this.NumberToLetter(quotient) + " mille " + this.NumberToLetter(reste);
          break;
        case 7:
        case 8:
        case 9:
          quotient = Math.floor(nb / 1000000);
          reste = nb % 1000000;
          if (quotient === 1 && reste === 0) numberToLetter = "un million";
          if (quotient === 1 && reste !== 0)
            numberToLetter = "un million" + " " + this.NumberToLetter(reste);
          if (quotient > 1 && reste === 0)
            numberToLetter = this.NumberToLetter(quotient) + " millions";
          if (quotient > 1 && reste !== 0)
            numberToLetter =
              this.NumberToLetter(quotient) + " millions " + this.NumberToLetter(reste);
          break;
        case 10:
        case 11:
        case 12:
          quotient = Math.floor(nb / 1000000000);
          reste = nb - quotient * 1000000000;
          if (quotient === 1 && reste === 0) numberToLetter = "un milliard";
          if (quotient === 1 && reste !== 0)
            numberToLetter = "un milliard" + " " + this.NumberToLetter(reste);
          if (quotient > 1 && reste === 0)
            numberToLetter = this.NumberToLetter(quotient) + " milliards";
          if (quotient > 1 && reste !== 0)
            numberToLetter =
              this.NumberToLetter(quotient) + " milliards " + this.NumberToLetter(reste);
          break;
        case 13:
        case 14:
        case 15:
          quotient = Math.floor(nb / 1000000000000);
          reste = nb - quotient * 1000000000000;
          if (quotient === 1 && reste === 0) numberToLetter = "un billion";
          if (quotient === 1 && reste !== 0)
            numberToLetter = "un billion" + " " + this.NumberToLetter(reste);
          if (quotient > 1 && reste === 0)
            numberToLetter = this.NumberToLetter(quotient) + " billions";
          if (quotient > 1 && reste !== 0)
            numberToLetter =
              this.NumberToLetter(quotient) + " billions " + this.NumberToLetter(reste);
          break;
      }

      // Respect de l'accord de "quatre-vingt"
      if (
        numberToLetter.substr(
          numberToLetter.length - "quatre-vingt".length,
          "quatre-vingt".length
        ) === "quatre-vingt"
      ) {
        numberToLetter += "s";
      }

      return numberToLetter;
    },

    convertNumberToLetter(number) {
      let result = this.NumberToLetter(number);
      return result;
    },

    // searchMedicalActs() {
    //   if (this.searchQuery1 && this.searchQuery) {
    //     // Les deux champs sont renseignés, choisissez l'IPP en premier
    //     this.anotherParamSearch = this.searchQuery;
    //   } else if (this.searchQuery && !this.searchQuery1) {
    //     // Le champ IPP/IEP est renseigné et le champ nom est vide
    //     this.anotherParamSearch = this.searchQuery;
    //   } else if (this.searchQuery1 && !this.searchQuery) {
    //     // Le champ nom est renseigné et le champ IPP est vide
    //     this.anotherParamSearch = this.searchQuery1;
    //   } else {
    //     // Aucun des champs n'est renseigné, utilisez une valeur par défaut (par exemple, une chaîne vide)
    //     this.anotherParamSearch = "";
    //     this.totalActe = 0;
    //     this.patientsMove = [];
    //   }

    //   const input = document.getElementById("exampleInputEmail1");
    //   const errorMessage = document.querySelector(
    //     ".form-group #exampleInputEmail1 + .error-message"
    //   );

    //   if (!input.checkValidity()) {
    //     errorMessage.style.display = "block";
    //     return;
    //   } else {
    //     errorMessage.style.display = "none";
    //   }

    //   // Nom prénom
    //   const inputname = document.getElementById("exampleInputName");
    //   const errorMessageName = document.querySelector(
    //     ".form-group #exampleInputName + .error-message"
    //   );

    //   if (this.searchQuery1.trim() == "") {
    //     errorMessageName.style.display = "none"; // Champ vide, le message d'erreur est masqué
    //   } else if (
    //     this.searchQuery1.length > 100 ||
    //     !/^[a-zA-ZÀ-ÿ\s]{2,}$/.test(this.searchQuery1)
    //   ) {
    //     errorMessageName.style.display = "block"; // Erreur détectée
    //   } else {
    //     errorMessageName.style.display = "none"; // La saisie est valide, le message d'erreur est masqué
    //   }

    //   // Effectuez d'abord la recherche en utilisant this.anotherParamSearch (IPP en priorité)
    //   factureService
    //     .getPatientInfo(this.anotherParamSearch)
    //     .then((res) => {
    //       this.patient = res.data.data;
    //       this.patientsMove = res.data.data;
    //       // console.log("Voici le patient qui correspond au mouvement :");
    //       // console.log(this.patientsMove);

    //       // Effectuez la recherche d'actes médicaux

    //       factureService
    //         .getActMovment(this.anotherParamSearch)
    //         .then((res) => {
    //           this.listactes = res.data.data;
    //           // console.log("Voici les actes médicaux correspondants à la saisie :");
    //           // console.log(this.listactes);
    //           this.calculateTotalAmount();
    //         })
    //         .catch((error) => {
    //           console.error(
    //             "Une erreur s'est produite lors de la recherche d'actes médicaux : " +
    //               error
    //           );
    //         });
    //     })
    //     .catch((error) => {
    //       console.error(
    //         "Une erreur s'est produite lors de la recherche du patient (IPP) : " + error
    //       );

    //       // Si aucune donnée n'a été trouvée avec IPP, testez ensuite avec le nom pour le patient
    //       if (this.searchQuery1) {
    //         factureService
    //           .getPatientInfo(this.searchQuery1)
    //           .then((res) => {
    //             this.patientsMove = res.data.data;
    //             console.log("Voici le patient qui correspond au mouvement :");
    //             console.log(res.data.data);

    //             // Effectuez la recherche d'actes médicaux si le patient est trouvé par le nom
    //             factureService
    //               .getActMovment(this.searchQuery1)
    //               .then((res) => {
    //                 this.listactes = res.data.data;
    //                 console.log("Voici les actes médicaux correspondants à la saisie :");
    //                 console.log(this.listactes);
    //               })
    //               .catch((error) => {
    //                 console.error(
    //                   "Une erreur s'est produite lors de la recherche d'actes médicaux : " +
    //                     error
    //                 );
    //               });
    //           })
    //           .catch((error) => {
    //             console.error(
    //               "Une erreur s'est produite lors de la recherche du patient (nom) : " +
    //                 error
    //             );
    //           });
    //       } else {
    //         // Aucun patient n'a été trouvé par le nom non plus
    //         this.listactes = [];
    //       }
    //     });
    // },

    // searchMedicalActs() {

    //   this.anotherParamSearch = this.searchQuery1 && this.searchQuery ? `${this.searchQuery1} ${this.searchQuery}` : this.searchQuery1 || this.searchQuery;

    //   if (this.searchQuery) {

    //     factureService
    //       .getPatientInfo(this.searchQuery)
    //       .then((res) => {
    //         this.patient = res.data.data;
    //         console.log("Voici le patient qui correspond au movement :");

    //         console.log(res.data.data);
    //       })
    //       .catch((error) => {
    //         console.error(
    //           "Une erreur s'est produite lors de la recherche du patient : " + error
    //         );

    //       });

    //     factureService
    //       .getActMovment(this.searchQuery)
    //       .then((res) => {
    //         this.actesMedicals = res.data.data;
    //         console.log("Voici les actes médicaux correspondants à la saisie :");
    //         console.log(this.actesMedicals);
    //       })
    //       .catch((error) => {
    //         console.error(
    //           "Une erreur s'est produite lors de la recherche d'actes médicaux : " + error
    //         );
    //       });
    //   } else {
    //     this.actesMedicals = [];
    //   }
    // },

    // fetchActesMedicals() {
    //   // actsService
    //   //   .getAllActes()
    //   //   .then((res) => {
    //   //     this.actesMedicals = res.data.data;
    //   //   })
    //   factureService
    //     .getActMovment(this.searchQuery)
    //     .then((res) => {
    //       this.actesMedicals = res.data.data;
    //       console.log("voici mes actes venue");
    //       console.log("voici mes actes venue");
    //       console.log("voici mes actes venue");
    //       console.log(this.actesMedicals);
    //     })

    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },

    fetchActeMedicalDetails(index) {
      const id = this.forms[index].acte;

      console.log("Mon id Acte" + id);
      console.log(id);

      if (id === "SA") {
        // L'utilisateur a sélectionné "Sélectionner un acte médical"
        this.forms[index].readonly = true;
        this.forms[index].code = "";
        this.forms[index].prix = "";
        this.forms[index].montant = "";

        // ...
      }

      if (id === "0") {
        // L'utilisateur a sélectionné "Autres"
        this.forms[index].readonly = false;
        this.forms[index].code = "";
        this.forms[index].prix = "";
        this.forms[index].montant = "";

        // Vérifier si l'objet formulaire existe déjà dans actesSelectionnes

        const existingIndex = this.actesSelectionnes.findIndex(
          (acte) => acte.index === index
        );

        if (existingIndex !== -1) {
          const existingForm = this.actesSelectionnes[existingIndex];

          // Mettre à jour les détails de l'objet formulaire existant
          existingForm.code = "";
          existingForm.prix = this.forms[index].prix;
          existingForm.quantite = this.forms[index].quantite;
          existingForm.montant = this.forms[index].montant;
          // Mettez à jour d'autres propriétés si nécessaire
        } else {
          // Ajouter l'objet formulaire à actesSelectionnes
          this.actesSelectionnes.push({
            index: index,
            id: "0",
            nom: "Autre",
            code: "AAAAA",
            prix: this.forms[index].prix,
            quantite: this.forms[index].quantite,
            montant: this.forms[index].montant,
            // Ajoutez d'autres propriétés si nécessaire
          });
        }
      } else {
        // L'utilisateur a sélectionné un acte médical existant
        this.forms[index].readonly = true;
        this.forms[index].quantite = ""; // Initialiser la quantité à 1

        if (!this.formErrors[index]) {
          this.formErrors[index] = {}; // Créez l'objet formErrors[index] s'il n'existe pas
        }

        // Vérifiez si la propriété acteMedical est définie avant de la définir à false
        if ("acteMedical" in this.formErrors[index]) {
          this.formErrors[index].acteMedical = false;
        }

        factureService
          .getActe(id)
          .then((response) => {
            const acteMedical = response.data.data; // Adapt this to your API response structure
            console.log("Detail acte acteMedical");
            console.log("Detail acte acteMedical");

            console.log(acteMedical);

            // Mettre à jour les détails du formulaire avec les détails de l'acte médical
            this.forms[index].code = acteMedical.code;
            this.forms[index].prix = Math.round(acteMedical.price);
            this.forms[index].montant =
              this.forms[index].quantite * Math.round(acteMedical.price);

            // Vérifier si l'objet formulaire existe déjà dans actesSelectionnes
            const existingIndex = this.actesSelectionnes.findIndex(
              (acte) => acte.index === index
            );
            // console.log(existingIndex);
            // console.log(this.actesSelectionnes);
            if (existingIndex !== -1) {
              const existingForm = this.actesSelectionnes[existingIndex];

              // Mettre à jour les détails de l'objet formulaire existant
              existingForm.nom = acteMedical.designation;
              existingForm.code = acteMedical.code;
              existingForm.prix = Math.round(acteMedical.price);
              existingForm.quantite = this.forms[index].quantite;
              existingForm.montant =
                this.forms[index].quantite * Math.round(acteMedical.price);
            } else {
              // Ajouter l'objet formulaire à actesSelectionne

              this.actesSelectionnes.push({
                index: index,
                id: acteMedical.id,
                nom: acteMedical.designation,
                code: acteMedical.code,
                prix: Math.round(acteMedical.price),
                quantite: this.forms[index].quantite,
                montant: this.forms[index].quantite * Math.round(acteMedical.price),
                // Ajoutez d'autres propriétés si nécessaire
              });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }

      // Calculer les totaux après avoir mis à jour les détails de l'acte médical
      this.calculateTotalMontantActe();
      this.calculateTotalMontant();
      this.calculateTotalMontantEspece();
    },

    // updateMontantActe(index) {
    //   const form = this.forms[index];
    //   form.montant = form.quantite * form.prix;

    //   if (this.actesSelectionnes[index]) {

    //     this.actesSelectionnes[index].quantite = form.quantite;
    //     this.actesSelectionnes[index].montant = form.quantite * form.prix;
    //     console.log( this.forms[index], );

    //     const acteMedical = this.actesMedicals.find(acte => acte.id === form.acte);
    //     if (acteMedical) {
    //       this.actesSelectionnes[index].nom = acteMedical.designation;
    //       this.actesSelectionnes[index].prix = Math.round(acteMedical.price);
    //     } else {

    //     }

    //   } else {

    //     const acteMedical = this.actesMedicals.find(acte => acte.id === form.acte);
    //     if (acteMedical) {
    //       this.actesSelectionnes.push({
    //         code: form.code,
    //         nom: acteMedical.designation,
    //         prix: Math.round(acteMedical.price),
    //         quantite: form.quantite,
    //         montant: form.quantite * form.prix,
    //         // Ajoutez d'autres propriétés si nécessaire
    //       });
    //     } else {

    //     }

    //   }

    //   this.calculateTotalMontantActe();
    //   this.calculateTotalMontant();
    // },

    updateMontantActe(index) {
      const form = this.forms[index];
      form.montant = form.quantite * form.prix;

      this.formErrors[index].quantite = false;
      this.formErrors[index].prix = false;

      if (this.actesSelectionnes[index]) {
        this.actesSelectionnes[index].quantite = form.quantite;
        this.actesSelectionnes[index].montant = form.quantite * form.prix;
        console.log(this.forms[index]);

        if (form.acte == "0") {
          // L'acte est "Autre"
          this.actesSelectionnes[index].nom = form.autre;
          this.actesSelectionnes[index].prix = form.prix;
        } else {
          const acteMedical = this.actesMedicals.find((acte) => acte.id === form.acte);
          if (acteMedical) {
            this.actesSelectionnes[index].nom = acteMedical.designation;
            this.actesSelectionnes[index].prix = Math.round(acteMedical.price);
          }
        }
      } else {
        // L'objet formulaire n'existe pas encore dans actesSelectionnes
        if (form.acte == "0") {
          // L'acte est "Autre"
          this.actesSelectionnes.push({
            code: "-",
            nom: form.autre,
            prix: form.prix,
            quantite: form.quantite,
            montant: form.quantite * form.prix,
            // Ajoutez d'autres propriétés si nécessaire
          });
        } else {
          const acteMedical = this.actesMedicals.find((acte) => acte.id === form.acte);

          if (acteMedical) {
            this.actesSelectionnes.push({
              code: form.code,
              nom: acteMedical.designation,
              prix: Math.round(acteMedical.price),
              quantite: form.quantite,
              montant: form.quantite * Math.round(acteMedical.price),
              // Ajoutez d'autres propriétés si nécessaire
            });
          }
        }
      }

      this.calculateTotalMontantActe();
      this.calculateTotalMontant();
      this.calculateTotalMontantEspece();
    },

    addForm() {
      // this.forms.push({ acte: 'SA', code: '', prix: '', quantite: '', montant: '' });
      this.forms.push({
        acte: "SA",
        quantite: "",
        code: "",
        prix: "",
        montant: "",
        autre: "",
        readonly: true,
      });
      // const newForm = { acte: 'SA', code: '', prix: '', quantite: '', montant: '' };
    },

    deleteForm(index) {
      this.forms.splice(index, 1);
      this.actesSelectionnes.splice(index, 1); // Supprimer l'élément correspondant de actesSelectionnes

      for (let i = index; i < this.actesSelectionnes.length; i++) {
        this.actesSelectionnes[i].index = i;
        // console.log(this.actesSelectionnes[i].index);// compter les index à partir de index
      }

      // for (let i = 0; i < this.actesSelectionnes.length; i++) {
      //   this.actesSelectionnes[i].index = i;
      //   console.log(this.actesSelectionnes[i].index);// compter les index à partir de index

      // }

      this.calculateTotalMontantActe();
      this.calculateTotalMontant();
      this.calculateTotalMontantEspece();

      //this.forms.splice(this.forms.length - 1, 1);
    },

    annulerMomo(event) {
      event.stopPropagation();
      this.momoData.statut = "FAILED";
    },

    initializeDataTableRapport() {
      this.$nextTick(() => {
        const table = $(this.$refs.myTablerapport).DataTable({
          // Configuration de la table DataTable
          dom:
            '<"row mb-3"<"col-md-12"B>>' +
            '<"row mb-0"<"col-md-6"l><"col-md-6"f>>' +
            '<"row"<"col-md-12"tr>>' +
            '<"row"<"col-md-6"i><"col-md-6"p>>',
          pageLength: 10, // Définir le nombre de résultats par page
          language: FrenchTranslation, // Configuration de la langue
          buttons: [
            // Configuration des boutons (si nécessaire)
          ],
        });

        // Stockez la nouvelle instance de la table dans la variable "this.table" pour une utilisation ultérieure
        this.tableInsurance = table;

        if (table) {
          $(table).DataTable().clear().destroy(); // Détruire DataTables s'il est déjà initialisé
          $(table).DataTable(); // Réinitialiser DataTables
        }
      });
    },

    // validerPayement() {

    //   this.formErrors = {};
    //   let isValid = true; // Variable pour suivre si tous les formulaires sont valides
    //   let hasQuantiteVide = false; // Variable pour suivre si au moins un champ quantité est vide
    //   let hasActeVide = false; // Variable pour suivre si au moins un acte est vide
    //   let hasAutreActeDesignation = false; // Variable pour suivre si au moins un acte est vide
    //   let hasAutreActeprix = false; // Variable pour suivre si au moins un acte est vide

    //   this.formErrors.nom = false;
    //   this.formErrors.prenom = false;
    //   this.formErrors.telephone = false;

    //   // Vérifier les champs obligatoires

    //   if (this.selectedOptionMode == 2 && this.momoData.nom == "") {
    //     this.formErrors.nom = true;
    //      // Sortir de la fonction en cas d'erreur
    //   }

    //   if (this.selectedOptionMode == 2 && this.momoData.prenom == "") {
    //     this.formErrors.prenom = true;
    //     return; // Sortir de la fonction en cas d'erreur
    //   }

    //   if (this.selectedOptionMode == 2 && this.momoData.telephone == "") {
    //     this.formErrors.telephone = true;
    //     return; // Sortir de la fonction en cas d'erreur
    //   }

    //   // Vérifier les champs obligatoires

    //   if (!this.selectedPatient) {
    //     this.formErrors.patient = true;
    //     isValid = false;

    //     this.$toast.error(
    //       "Veuillez sélectionnez un patient avant de procéder au paiement!",
    //       {
    //         position: "top-right",
    //         timeout: 3000,
    //         style: {
    //           background: "#ff0000", // Couleur de fond rouge pour l'erreur
    //           color: "#fff", // Couleur du texte
    //           fontWeight: "bold",
    //         },
    //       }
    //     );

    //     return; // Sortir de la fonction en cas d'erreur
    //   }

    //   this.forms.forEach((form, index) => {
    //     this.formErrors[index] = {}; // Réinitialiser les erreurs pour le formulaire actuel

    //     // Valider l'élément 'acteMedical' du formulaire actuel
    //     if (!form.acte || form.acte == "SA") {
    //       // si le champs acte medicaux n'est pas electionner
    //       hasActeVide = true; // Un acte est vide
    //       this.formErrors[index].acteMedical = true;
    //       isValid = false; // Le formulaire actuel est invalide

    //       return;
    //     }

    //     // Valider l'élément 'quantite' du formulaire actuel
    //     if (!form.quantite) {
    //       this.formErrors[index].quantite = true;
    //       isValid = false; // Le formulaire actuel est invalide
    //       hasQuantiteVide = true; // Un champ quantité est vide

    //       return;
    //     }

    //     if (form.acte && form.acte == "0" && !form.autre) {
    //       // form.autre c'est la designation de autre
    //       this.formErrors[index].autreActe = true;
    //       isValid = false; // Le formulaire actuel est invalide
    //       hasAutreActeDesignation = true; // Un champ quantité est vide

    //       return;
    //     }

    //     if (
    //       (form.acte && form.acte == "0" && !form.prix) ||
    //       !/^\d{3,}$/.test(form.prix)
    //     ) {
    //       // si le champs acte medicaux n'est pas electionner
    //       hasAutreActeprix = true; // Un acte est vide
    //       this.formErrors[index].prix = true;
    //       isValid = false; // Le formulaire actuel est invalide

    //       return;
    //     }
    //   });

    //   if (hasActeVide) {
    //     this.$toast.error("Le champs acte médical ne peut être vide!", {
    //       position: "top-right",
    //       timeout: 3000,
    //       style: {
    //         background: "#ff0000", // Couleur de fond rouge pour l'erreur
    //         color: "#fff", // Couleur du texte
    //         fontWeight: "bold",
    //       },
    //     });
    //     return;
    //   }
    //   if (hasQuantiteVide) {
    //     this.$toast.error("Le champs quantité ne peut  être vide!", {
    //       position: "top-right",
    //       timeout: 3000,
    //       style: {
    //         background: "#ff0000", // Couleur de fond rouge pour l'erreur
    //         color: "#fff", // Couleur du texte
    //         fontWeight: "bold",
    //       },
    //     });
    //     return;
    //   }

    //   if (hasAutreActeDesignation) {
    //     this.$toast.error("Le champs Désignation ne peut  être vide!", {
    //       position: "top-right",
    //       timeout: 3000,
    //       style: {
    //         background: "#ff0000", // Couleur de fond rouge pour l'erreur
    //         color: "#fff", // Couleur du texte
    //         fontWeight: "bold",
    //       },
    //     });
    //     return;
    //   }

    //   if (hasAutreActeprix) {
    //     this.$toast.error("Le champs prix ne peut  être vide ou est invalide!", {
    //       position: "top-right",
    //       timeout: 3000,
    //       style: {
    //         background: "#ff0000", // Couleur de fond rouge pour l'erreur
    //         color: "#fff", // Couleur du texte
    //         fontWeight: "bold",
    //       },
    //     });
    //     return;
    //   }

    //   if (this.selectedOptionMode == 2 && !/^\d{8,}$/.test(this.momoData.telephone)) {
    //     this.$toast.error(
    //       "Le Numéro de téléphone MOMO est invalide. Veuillez entrer au moins 8 chiffres!",
    //       {
    //         position: "top-right",
    //         timeout: 3000,
    //         style: {
    //           background: "#ff0000", // Couleur de fond rouge pour l'erreur
    //           color: "#fff", // Couleur du texte
    //           fontWeight: "bold",
    //         },
    //       }
    //     );

    //     this.formErrors.telephone = true;

    //     return;
    //   }

    //   if (isValid) {
    //     const credentials = {
    //       patient_id: this.selectedPatient,
    //       mode_payement_id: this.selectedOptionMode,
    //     };

    //     payementService
    //       .requestPayement(credentials)
    //       .then((response) => {
    //         const payementId = response.data.data; // Récupérer l'ID du paiement
    //         this.payementId = payementId;
    //         this.generateQRCode(payementId);
    //         console.log(payementId);

    //         if (this.selectedOptionMode == 4) {
    //           this.kkiapay(payementId);
    //         }

    //         if (this.selectedOptionMode == 3) {
    //           this.fedaPay(payementId);

    //           $("button#pay-btn").click(function (event) {
    //             event.stopPropagation();
    //           });

    //           $("button#pay-btn").click();
    //         }

    //         if (this.selectedOptionMode == 2) {
    //           this.validerMomo(payementId);
    //         }

    //         if (this.selectedOptionMode == 1) {
    //           this.validerEspece(payementId);

    //           this.createFacture(payementId);

    //           this.validateData();

    //           // console.log('aaaaaaaaaaa'+ this.modePayement);
    //         }
    //         if (this.selectedOptionMode == 5) {
    //           this.validerEspece(payementId);

    //           this.createFacture(payementId);

    //           this.validateData();

    //           // console.log('aaaaaaaaaaa'+ this.modePayement);
    //         }
    //       })

    //       .catch((error) => {
    //         console.error(error);
    //       });
    //   }
    // },

    // createFacture() {

    //   const factures = this.forms.map((form) => {
    //     return {
    //       movments_id: this.searchQuery,
    //       mode_payements_id: this.selectedOptionMode,
    //       is_synced: 0,
    //       acte_medical_id: form.acte,
    //       user_id: null,
    //       centre_id: null,
    //       code: form.code,
    //       autre: form.autre,
    //       prix: form.prix,
    //       quantite: form.quantite,
    //       montant: form.quantite * form.prix,

    //     };
    //   });
    //   console.log(factures);

    //   factureService
    //     .requestFacture({ factures: factures }) // Envoyez les données sous la clé "factures"
    //     .then((response) => {
    //       console.log("factures");
    //       console.log("factures");

    //       const facturesdata = response.data.data;
    //       this.referenceFacture = response.data.reference;
    //       console.log(this.referenceFacture);
    //       this.validateData();
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // },

    validerPayement() {

      console.log(this.cashRegisterCashierCurrent.statut);
      if (this.cashRegisterCashierCurrent.statut == 1) {
        this.$toast.error("La caisse est fermée !", {
          position: "top-right",
          timeout: 3000,
          style: {
            background: "#ff0000", // Couleur de fond rouge pour l'erreur
            color: "#fff", // Couleur du texte
            fontWeight: "bold",
          },
        });

        return;
      } else {
        if (this.selectedOptionMode == 1) {
          this.createFacture();
          this.ShowFacture();
        }

        if (this.selectedOptionMode == 2) {
          // this.validerMomo();
          this.kkiapay();
        }

        if (this.selectedOptionMode == 3) {
          // this.kkiapay();

          // $("button#pay-btn").click(function (event) {
          //   event.stopPropagation();
          // });

          // $("button#pay-btn").click();
        }

        if (this.selectedOptionMode == 4) {
          // this.kkiapay();
        }

        if (this.selectedOptionMode == 5) {
          // this.kkiapay();
        }

        if (this.selectedOptionMode == 6) {
          // this.kkiapay();
        }

        // if (this.selectedOptionMode == 7) {
        //   console.log("my tresopay");
        //   this.tresorPay();
        // }

        if (this.selectedOptionMode == 7) {
          this.tresorPay();

          $("button#tresorpay-btn").click(function (event) {
            event.stopPropagation();
          });

          $("button#tresorpay-btn").click();
        }

        if (this.selectedOptionMode == 8) {
          this.createFacture();
          this.ShowFacture();
        }
      }
    },

    createFacture() {
      const factures = this.medicalActDetailsFacture.map((acte) => ({
        cash_registers_id: this.cashRegisterCashierCurrent.cash_registers_id,
        movments_id: acte.movments_id,
        mode_payements_id: this.selectedOptionMode,
        is_synced: 0,
        acte_medical_id: acte.medical_acts_id,
        user_id: null,
        centre_id: null,
        code: acte.code,
        designation: acte.designation,
        type: acte.type,
        autre: null,
        prix: parseInt(acte.medical_acts_price),
        quantite: acte.medical_acts_qte,
        montant: acte.medical_acts_qte * parseInt(acte.medical_acts_price),
        percentageassurance: parseInt(this.selectedInsurancePercentage),
      }));
      console.log(factures);

      factureService
        .requestFacture({ factures: factures }) // Utilisez la clé "factures"
        .then((response) => {
          // Traitement de la réponse
          const facturesdata = response.data.data;
          this.referenceFacture = response.data.reference;
          console.log(this.referenceFacture);
          this.statutCashier = response.data.statutCash;
          console.log(this.statutCashier);
          this.generateQRCode(this.referenceFacture);
          this.selectedRow = -1;
          this.medicalActDetails = [];

          // this.validateData();
        })
        .catch((error) => {
          console.log(error.response);
        });
    },

    //     createFacture() {
    //   return new Promise((resolve, reject) => {
    //     const factures = this.medicalActDetails.map((acte) => ({
    //       cash_registers_id: 1,
    //       movments_id: acte.movments_id,
    //       mode_payements_id: this.selectedOptionMode,
    //       is_synced: 0,
    //       acte_medical_id: acte.id,
    //       user_id: null,
    //       centre_id: null,
    //       code: acte.code,
    //       autre: null,
    //       prix: parseInt(acte.medical_acts_price), // Convertir en entier
    //       quantite: acte.medical_acts_qte,
    //       montant: acte.medical_acts_qte * parseInt(acte.medical_acts_price),
    //     }));
    //     console.log(factures);

    //     factureService
    //       .requestFacture({ factures: factures })
    //       .then((response) => {
    //         // Traitement de la réponse
    //         const facturesdata = response.data.data;
    //         this.referenceFacture = response.data.reference;
    //         console.log(this.referenceFacture);
    //         this.statutCashier = response.data.statutCash;
    //         console.log(this.statutCashier);
    //         this.generateQRCode(this.referenceFacture);
    //         resolve(); // Résoudre la promesse

    //         // this.validateData();
    //       })
    //       .catch((error) => {
    //         console.log(error.response);
    //         this.statutCashier = 1;

    //         if (error.response.data.error === true) {
    //           console.log(error.response.status);
    //           console.log("pourquoi");
    //           console.log(this.statutCashier);

    //           this.$toast.error("La caisse est fermée", {
    //             position: "top-right",
    //             timeout: 3000,
    //             style: {
    //               background: "#ff0000", // Couleur de fond rouge pour l'erreur
    //               color: "#fff", // Couleur du texte
    //               fontWeight: "bold",
    //             },
    //           });

    //           reject(); // Rejeter la promesse en cas d'erreur
    //         }
    //       });
    //   });
    // },

    validerEspece(payementId) {
      const credentials = {
        mode_payements_id: this.selectedOptionMode,
        payement_id: payementId,
        montant: this.momoDataEspece.montant,
      };

      especeService
        .requestEspece(credentials, payementId)
        .then((response) => {
          const montant = response.data.data.montant;
          console.log(montant);
        })

        .catch((error) => {
          console.error(error);
        });
    },

    validerMomo() {
      this.formErrors = {};
      this.formErrors.nom = false;
      this.formErrors.prenom = false;
      this.formErrors.telephone = false;

      // Vérifier les champs obligatoires

      if (this.selectedOptionMode == 2 && this.momoData.nom == "") {
        this.formErrors.nom = true;
        return; // Sortir de la fonction en cas d'erreur
      }

      if (this.selectedOptionMode == 2 && this.momoData.prenom == "") {
        this.formErrors.prenom = true;
        return; // Sortir de la fonction en cas d'erreur
      }

      if (this.selectedOptionMode == 2 && this.momoData.telephone == "") {
        this.formErrors.telephone = true;
        return; // Sortir de la fonction en cas d'erreur
      }

      console.log("statut");
      // console.log(this.momoData.statut);

      $("#confirmationMOMO").modal("show");

      setTimeout(() => {
        if (this.momoData.statut === "PENDING") {
          this.momoData.statut = "SUCCESSFUL";
        }

        if (this.momoData.statut === "SUCCESSFUL") {
          $("#confirmationMOMO").modal("show");

          this.createFacture();
          this.showFacture();
        }
      }, 6000);
    },

    checkreadonly(form) {
      // console.log(form.acte);
      if (form.acte === "0") {
        // if (this.forms.some((form) => form.acte === "autre")) {
        form.readonly = false;
      } else {
        form.readonly = true;
      }
    },

    showConfirmationModal() {
      // const verifyAffectTerminal = this.affectterminals.find(
      //   (affectterminal) => affectterminal.user_id == this.user.id
      // );

      // if (!verifyAffectTerminal) {
      //   this.$toast.error("Vous n'êtes pas affecté à un terminal !", {
      //     position: "top-right",
      //     timeout: 3000,
      //     style: {
      //       background: "#ff0000", // Couleur de fond rouge pour l'erreur
      //       color: "#fff", // Couleur du texte
      //       fontWeight: "bold",
      //     },
      //   });

      //   return;
      // }

      $("#confirmationModal").modal("show"); // affciher le modal
    },

    validateData() {
      // Code pour valider les données dans la base de données

      $("#confirmationModal").modal("hide");
      $("#confirmationModalpay").modal("show");
    },

    validationEnCour() {
      // Code pour valider les données dans la base de données

      $("#paiementencour").modal("show");
    },

    ShowFacture() {
      // Code pour valider les données dans la base de données

      $("#confirmationModal").modal("hide");
      $("#confirmationModalpay").modal("hide");
      $("#exampleModal").modal("show");
      // $("#confirmationModalpay").modal("hide");
    },

    // printModal() {
    //   const modalContent = this.$refs.modalContent;
    //   const originalContents = document.body.innerHTML;

    //   // Temporairement remplacer le contenu de la page par le contenu du modal
    //   document.body.innerHTML = modalContent.innerHTML;

    //   // Imprimer le contenu
    //   window.print();

    //   // Restaurer le contenu original de la page
    //   document.body.innerHTML = originalContents;

    //   $("#exampleModal").modal("hide");
    // },

    printModal() {
      // Ouvrez le modal
      $("#showDetail").modal("show");

      // Assurez-vous que la fenêtre de prévisualisation ne s'ouvre qu'une fois
      if (typeof this.printWindow === "undefined" || this.printWindow.closed) {
        // Sélectionnez l'élément que vous voulez imprimer (la partie spécifique avec l'ID "print-section")
        const printContent = document.getElementById("print-section");

        // Créez une fenêtre de prévisualisation pour l'impression
        this.printWindow = window.open("", "", "width=600,height=600");

        // Attendez un court délai pour que le modal soit entièrement affiché
        setTimeout(
          function () {
            // Insérez le contenu HTML de la page d'origine dans la fenêtre de prévisualisation
            this.printWindow.document.write("<html><head><title>Impression</title>");

            // Incluez les balises <link> pour les fichiers Bootstrap CDN
            this.printWindow.document.write(
              '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">'
            );
            this.printWindow.document.write(
              '<link rel="stylesheet" href="../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css">'
            );

            // Incluez une balise <link> pour votre fichier CSS externe
            this.printWindow.document.write(
              '<link rel="stylesheet" type="text/css" href="../../../../assets/scss/style.css">'
            );

            // Ajoutez des styles CSS personnalisés pour les en-têtes de tableau
            this.printWindow.document.write(
              "<style>.table th { background-color: rgb(213, 219, 218) !important; padding: 5px; }</style>"
            );

            // Ajoutez des styles CSS pour réduire les marges internes (padding) des cellules du tableau
            this.printWindow.document.write(
              "<style>.table th td { padding: 2px; }</style>"
            );

            this.printWindow.document.write("</head><body>");
            this.printWindow.document.write(printContent.innerHTML);
            this.printWindow.document.write("</body></html>");
            this.printWindow.document.close();

            // Attendez que le contenu soit chargé avant d'imprimer
            this.printWindow.onload = function () {
              this.printWindow.print();
              this.printWindow.close();
            }.bind(this);

            // Fermez le modal
            // $("#showDetail").modal("hide");
          }.bind(this),
          1000
        ); // Ajustez la durée en fonction de votre besoin
      }
    },

    //    printModal() {

    //     const modalContent = this.$refs.modalContent;

    //     const pdfOptions = {
    //       margin: 10, // Marge en pixels
    //       filename: 'modal.pdf', // Nom du fichier PDF
    //       image: { type: 'jpeg', quality: 0.98 },
    //       html2canvas: { scale: 2 },
    //       jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    //     };

    //     html2pdf()
    //       .from(modalContent)
    //       .set(pdfOptions)
    //       .outputPdf(pdf => {
    //         pdf.output('datauristring'); // Pour afficher le PDF dans un nouvel onglet
    //       });
    // },
  },

  computed: {
    // ...
    filteredMedicalActDetailsA() {
      return this.medicalActDetailsFacture.filter((item) => item.type === "A");
    },

    filteredMedicalActDetailsP() {
      return this.medicalActDetailsFacture.filter((item) => item.type === "P");
    },

    totalAmountActesA() {
      return this.filteredMedicalActDetailsA.reduce((total, item) => {
        return total + item.quantite * item.prix;
      }, 0);
    },

    totalAmountActesB() {
      return this.filteredMedicalActDetailsP.reduce((total, item) => {
        return total + item.quantite * item.prix;
      }, 0);
    },
  },

  filters: {
    formatDate(value) {
      return format(value, "dd/MM/yyyy HH:mm:ss");
    },
  },

  watch: {
    searchTerm: function (newSearchTerm, oldSearchTerm) {
      // Si le champ de recherche est vide, appelez getListAndSearchMovments
      if (newSearchTerm === "") {
        this.getListAndSearchMovments();
      }
    },
  },

  mounted() {
    // addKkiapayListener("success", this.successHandler);
    this.getCashRegisterCashierCurrent(); // la caisse de l'utilisateur actuellement connecté

    this.getListAndSearchMovments();
    this.getListMovment();

    // this.fetchActesMedicals();
    $("#confirmationMOMO").on("hidden.bs.modal", () => {
      this.momoData.statut = "PENDING";
    });

    this.fetchPatients();
    // this.fetchModePayements();
  },

  beforeDestroy() {
    removeKkiapayListener("success", this.successHandler);
  },
};
</script>

<style scoped>
@import "../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";

.col-sm-6 p {
  margin-top: 0;
  /* Supprime la marge supérieure des paragraphes */
  margin-bottom: 2px !important;
  /* Réduit la marge inférieure des paragraphes */
}

.custom-width {
  width: 200px !important;
  /* Ajustez la largeur selon vos besoins */
}

.custom-margin-bottom {
  margin-bottom: -30px !important;
  /* Ajustez la valeur de la marge inférieure selon vos besoins */
}

.custom-padding {
  padding: 5px !important;
  /* Ajustez la valeur du padding selon vos besoins */
}

/* .custom-border-height {
  border: 1px solid #000 !important;
} */

.search-bar {
  display: flex;
  background-color: #fff;
  /* Couleur de fond de la barre de recherche */
  padding: 10px;
  /* Espacement interne */
  border: 1px solid #ccc;
  /* Bordure */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* Effet d'ombre */
  border-radius: 6px !important;
  align-items: center;
  /* Alignement vertical au centre */
  height: 50px !important;
  /* Hauteur réduite */
}

.search-bar {
  display: flex;
  background-color: #fff;
  /* Couleur de fond de la barre de recherche */
  padding: 10px;
  /* Espacement interne */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  /* Effet d'ombre */
  border-radius: 5px;
  /* Coins arrondis */
  align-items: center;
  /* Alignement vertical au centre */
}

.zebra-table tbody tr:nth-child(odd) {
  background-color: white;
}

.search-bar input {
  flex: 1 !important;
  /* Largeur flexible */
  outline: none !important;
  font-size: 16px !important;
  height: 40px !important;
  /* Hauteur ajustée pour correspondre à la hauteur du bouton */
  border: none !important;
  /* Supprimer la bordure */
}

.search-bar button {
  background-color: #0b5d3f;
  /* Couleur verte */
  color: #fff;
  border: none !important;
  padding: 0 !important;
  /* Pas de padding sur le bouton */
  width: 40px !important;
  /* Largeur ajustée pour correspondre à la hauteur du champ de recherche */
  height: 40px !important;
  /* Hauteur ajustée pour correspondre à la hauteur du champ de recherche */
  border-radius: 0 5px 5px 0 !important;
  /* Coins arrondis à gauche */
  cursor: pointer !important;
  transition: background-color 0.3s;
}

.search-bar button:hover {
  background-color: #5c695d;
  /* Couleur verte plus foncée au survol */
}

.patient-info {
  margin-right: 20px !important;
  font-weight: 500 !important;
  font-family: "Montserrat" !important;
  /* Ajustez la marge selon vos besoins */
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

table th,
td {
  text-align: left;
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
  text-align: left;
}

th {
  background-color: #d6dbd6;
  border: 1px solid #dee2e6;
  font-family: Montserrat !important;
}

.container-fluid {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 14px;
}

h2,
h4 {
  font-weight: bold;
  margin: 0;
  font-family: Montserrat !important;
}

.mb-4 {
  margin-bottom: 2rem;
}

img {
  max-width: 100%;
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


.selected {
  color: white !important;
  background-color: hsl(159, 38%, 25%);
  /* Couleur de fond rouge pour la ligne sélectionnée */
  cursor: pointer;
  /* Curseur pointeur */
}

.row-hover:hover {
  cursor: pointer !important;
  background-color: hsl(159, 38%, 25%);
  color: white !important;

  /* Curseur pointeur au survol des lignes du tableau */
}

.row-hover:hover td {
  cursor: pointer !important;
  background-color: hsl(159, 38%, 25%);
  color: white !important;
}

.selected td {
  background-color: hsl(159, 38%, 25%);
  color: white !important;
}

table {
  margin-bottom: 1rem;
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  font-family: Montserrat !important;
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
  font-family: "Montserrat" !important;
}

table td {
  font-weight: 500 !important;
}

table th {
  font-weight: bold;
  font-family: "Montserrat" !important;
}

table tbody+tbody {
  border-top: 2px solid #e4eaea;
}

.table-bordered {
  border: 1px solid #b6b9bb;
}

.table-bordered th,
.table-bordered td {
  border: 1px solid #b6b9bb;
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

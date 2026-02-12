<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h3 class="card-title text-white rounded px-3 py-1 mb-0 text-center flex-grow-1 mr-3"
                style="background-color: #0B5D3F; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-transform: none;">
                Dossier Médical Électronique (DME)
              </h3>
              <button class="btn btn-outline-success btn-sm rounded-pill" @click="$router.push('/patients/list')">
                <i class="mdi mdi-arrow-left"></i> Retour
              </button>
            </div>

            <!-- Skeleton Loader -->
            <div v-if="isLoading" class="row mt-4">
              <div class="col-md-3">
                <div class="card shadow-sm mb-4">
                  <div class="card-body">
                    <div class="skeleton-loader mb-3" style="width: 60px; height: 60px; border-radius: 50%; background: #e0e0e0; margin: 0 auto;"></div>
                    <div class="skeleton-loader mb-2" style="height: 20px; width: 80%; margin: 0 auto; background: #e0e0e0;"></div>
                    <div class="skeleton-loader mb-2" style="height: 15px; width: 60%; margin: 0 auto; background: #e0e0e0;"></div>
                    <div class="skeleton-loader" style="height: 15px; width: 70%; margin: 0 auto; background: #e0e0e0;"></div>
                  </div>
                </div>
                <div class="card shadow-sm">
                  <div class="card-body">
                    <div class="skeleton-loader mb-2" style="height: 15px; background: #e0e0e0;"></div>
                    <div class="skeleton-loader mb-2" style="height: 15px; background: #e0e0e0;"></div>
                    <div class="skeleton-loader" style="height: 15px; background: #e0e0e0;"></div>
                  </div>
                </div>
              </div>
              <div class="col-md-9">
                <div class="card shadow-sm">
                  <div class="card-body">
                    <div class="skeleton-loader mb-3" style="height: 40px; background: #e0e0e0;"></div>
                    <div class="skeleton-loader mb-2" style="height: 20px; background: #e0e0e0;"></div>
                    <div class="skeleton-loader mb-2" style="height: 20px; background: #e0e0e0;"></div>
                    <div class="skeleton-loader" style="height: 20px; background: #e0e0e0;"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="row mt-4">
              <div class="col-12">
                <div class="alert alert-danger shadow-sm" role="alert">
                  <h4 class="alert-heading">
                    <i class="mdi mdi-alert-circle"></i> Erreur de chargement
                  </h4>
                  <p class="mb-2">{{ error }}</p>
                  <hr>
                  <div class="d-flex justify-content-between align-items-center">
                    <button class="btn btn-outline-danger btn-sm" @click="fetchDme">
                      <i class="mdi mdi-refresh"></i> Réessayer
                    </button>
                    <button class="btn btn-outline-secondary btn-sm" @click="$router.push('/patients/list')">
                      <i class="mdi mdi-arrow-left"></i> Retour à la liste
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Main Content -->
            <div v-else class="row mt-4">
              <!-- Sidebar: Info & IA -->
              <div class="col-md-3">
                <fieldset class="form-group border px-3 py-1 text-center bg-white shadow-xs mb-4">
                  <legend class="w-auto px-2"><b style="font-size: 10px;">ID PATIENT</b></legend>
                  <div class="avatar-box bg-success text-white mx-auto mb-2" 
                       style="width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                    {{ getInitials() }}
                  </div>
                  <h5 class="mb-1 font-weight-bold text-dark">{{ patient.lastname }} {{ patient.firstname }}</h5>
                  <p class="small text-muted mb-0">IPP: {{ patient.ipp || 'N/A' }}</p>
                  <hr class="my-2">
                  <div class="text-left small">
                    <p class="mb-1"><b>Âge:</b> {{ patient.age || 'N/A' }} ans</p>
                    <p class="mb-1"><b>Sexe:</b> {{ patient.gender || 'N/A' }}</p>
                    <p class="mb-0 text-danger" v-if="allergies.length > 0">
                      <b><i class="mdi mdi-alert-circle"></i> {{ allergies.length }} Alerte(s) Allergie(s)</b>
                    </p>
                  </div>
                </fieldset>

                <fieldset class="form-group border px-3 py-1 bg-white shadow-xs" style="border-left: 3px solid #ffc107 !important;">
                  <legend class="w-auto px-2"><b style="font-size: 10px; color: #ffc107;">MEDKEY AI ANALYTICS</b></legend>
                  <div v-if="isAiLoading" class="text-center py-2">
                    <div class="spinner-border spinner-border-sm text-warning"></div>
                  </div>
                  <div v-else>
                    <p class="small text-dark italic mb-2" style="line-height: 1.5;">"{{ aiSummary }}"</p>
                    <button class="btn btn-xs btn-outline-warning btn-block rounded-pill font-weight-bold" 
                            @click="fetchAiSummary" :disabled="isAiLoading">
                      <i class="mdi mdi-refresh"></i> Regénérer
                    </button>
                  </div>
                </fieldset>
              </div>

              <!-- Main DME Content -->
              <div class="col-md-9">
                <div class="card p-0 border-0 shadow-none">
                  <ul class="nav nav-pills custom-tabs mb-3" role="tablist">
                    <li class="nav-item">
                      <a class="nav-link" :class="{ active: currentTab === 'identity' }" 
                         @click.prevent="currentTab = 'identity'" href="#">
                        <i class="mdi mdi-account"></i> Identité
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" :class="{ active: currentTab === 'atcd' }" 
                         @click.prevent="currentTab = 'atcd'" href="#">
                        <i class="mdi mdi-history"></i> Antécédents
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" :class="{ active: currentTab === 'allergies' }" 
                         @click.prevent="currentTab = 'allergies'" href="#">
                        <i class="mdi mdi-alert-circle"></i> Allergies
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" :class="{ active: currentTab === 'vaccinations' }" 
                         @click.prevent="currentTab = 'vaccinations'" href="#">
                        <i class="mdi mdi-needle"></i> Vaccinations
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" :class="{ active: currentTab === 'consultations' }" 
                         @click.prevent="currentTab = 'consultations'" href="#">
                        <i class="mdi mdi-stethoscope"></i> Consultations
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" :class="{ active: currentTab === 'exams' }" 
                         @click.prevent="currentTab = 'exams'" href="#">
                        <i class="mdi mdi-microscope"></i> Examens
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" :class="{ active: currentTab === 'prescriptions' }" 
                         @click.prevent="currentTab = 'prescriptions'" href="#">
                        <i class="mdi mdi-pill"></i> Prescriptions
                      </a>
                    </li>
                    <li class="nav-item">
                      <a class="nav-link" :class="{ active: currentTab === 'documents' }" 
                         @click.prevent="currentTab = 'documents'" href="#">
                        <i class="mdi mdi-file-document"></i> Documents
                      </a>
                    </li>
                  </ul>
                  
                  <div class="tab-content timeline-body p-3 border rounded bg-white" style="min-height: 500px;">
                    <!-- Identité -->
                    <div class="tab-pane fade" :class="{ 'show active': currentTab === 'identity' }" 
                         v-show="currentTab === 'identity'">
                      <div class="row">
                        <div class="col-md-6">
                          <h5 class="mb-3"><i class="mdi mdi-account-details"></i> Informations personnelles</h5>
                          <table class="table table-borderless">
                            <tr><td><b>Nom:</b></td><td>{{ patient.lastname || 'N/A' }}</td></tr>
                            <tr><td><b>Prénom(s):</b></td><td>{{ patient.firstname || 'N/A' }}</td></tr>
                            <tr><td><b>Date de naissance:</b></td><td>{{ format_date(patient.date_birth) }}</td></tr>
                            <tr><td><b>Âge:</b></td><td>{{ patient.age || 'N/A' }} ans</td></tr>
                            <tr><td><b>Sexe:</b></td><td>{{ patient.gender || 'N/A' }}</td></tr>
                            <tr><td><b>IPP:</b></td><td>{{ patient.ipp || 'N/A' }}</td></tr>
                          </table>
                        </div>
                        <div class="col-md-6">
                          <h5 class="mb-3"><i class="mdi mdi-phone"></i> Coordonnées</h5>
                          <table class="table table-borderless">
                            <tr><td><b>Téléphone:</b></td><td>{{ patient.phone || 'N/A' }}</td></tr>
                            <tr><td><b>Email:</b></td><td>{{ patient.email || 'N/A' }}</td></tr>
                            <tr><td><b>Contact urgence:</b></td><td>{{ patient.emergency_contac || 'N/A' }}</td></tr>
                          </table>
                        </div>
                      </div>
                    </div>

                    <!-- Antécédents -->
                    <div class="tab-pane fade" :class="{ 'show active': currentTab === 'atcd' }" 
                         v-show="currentTab === 'atcd'">
                      <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5><i class="mdi mdi-history"></i> Antécédents médicaux</h5>
                        <button 
                          class="btn btn-sm btn-success" 
                          @click="openAntecedentModal()"
                          :disabled="isSavingAntecedent || isDeletingAntecedent">
                          <span v-if="isSavingAntecedent" class="spinner-border spinner-border-sm mr-1"></span>
                          <i v-else class="mdi mdi-plus"></i> Ajouter
                        </button>
                      </div>
                      <div class="table-responsive">
                        <table class="table table-striped table-sm">
                          <thead>
                            <tr class="bg-light text-dark font-weight-bold">
                              <th>Type</th>
                              <th>Description</th>
                              <th>CIM-10</th>
                              <th>Date début</th>
                              <th>Date fin</th>
                              <th>Statut</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="atcd in antecedents" :key="atcd.id">
                              <td><span class="badge badge-info">{{ atcd.type || 'N/A' }}</span></td>
                              <td>{{ atcd.name || 'N/A' }}</td>
                              <td><code>{{ atcd.cim10_code || 'N/A' }}</code></td>
                              <td>{{ format_date(atcd.start_date) }}</td>
                              <td>{{ format_date(atcd.end_date) }}</td>
                              <td>
                                <span class="badge" :class="atcd.is_cured ? 'badge-success' : 'badge-warning'">
                                  {{ atcd.is_cured ? 'Guéri' : 'Chronique' }}
                                </span>
                              </td>
                              <td>
                                <button 
                                  class="btn btn-xs text-white" 
                                  @click.stop="editAntecedent(atcd)" 
                                  :disabled="isSavingAntecedent || isDeletingAntecedent || editingAntecedentId === atcd.id"
                                  style="background-color: #0B5D3F;">
                                  <span v-if="editingAntecedentId === atcd.id" class="spinner-border spinner-border-sm mr-1"></span>
                                  <i v-else class="mdi mdi-pencil"></i>
                                </button>
                                <button 
                                  class="btn btn-xs btn-danger ml-1" 
                                  @click.stop="deleteAntecedent(atcd.id)"
                                  :disabled="isSavingAntecedent || isDeletingAntecedent || editingAntecedentId === atcd.id">
                                  <span v-if="isDeletingAntecedent && editingAntecedentId === atcd.id" class="spinner-border spinner-border-sm mr-1"></span>
                                  <i v-else class="mdi mdi-delete"></i>
                                </button>
                              </td>
                            </tr>
                            <tr v-if="antecedents.length === 0">
                              <td colspan="7" class="text-center text-muted py-4">
                                <i class="mdi mdi-information-outline h3"></i>
                                <p>Aucun antécédent enregistré</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <!-- Allergies -->
                    <div class="tab-pane fade" :class="{ 'show active': currentTab === 'allergies' }" 
                         v-show="currentTab === 'allergies'">
                      <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5><i class="mdi mdi-alert-circle"></i> Allergies et intolérances</h5>
                        <button class="btn btn-sm btn-success" @click="openAllergieModal()">
                          <i class="mdi mdi-plus"></i> Ajouter
                        </button>
                      </div>
                      <div class="row">
                        <div v-for="all in allergies" :key="all.id" class="col-md-6 mb-3">
                          <div class="card" 
                               :style="getSeverityStyle(all.severity)">
                            <div class="card-body">
                              <div class="d-flex justify-content-between align-items-start">
                                <div>
                                  <h6 class="mb-1 font-weight-bold">{{ all.name || 'N/A' }}</h6>
                                  <p class="mb-1 small">
                                    <span class="badge badge-secondary">{{ all.type || 'N/A' }}</span>
                                    <span class="badge ml-1" :class="getSeverityBadgeClass(all.severity)">
                                      {{ all.severity || 'N/A' }}
                                    </span>
                                  </p>
                                  <p class="mb-1 small text-muted" v-if="all.reactions">
                                    <b>Réactions:</b> {{ all.reactions }}
                                  </p>
                                  <p class="mb-0 small text-muted">
                                    <b>Découverte:</b> {{ format_date(all.discovery_date) }}
                                  </p>
                                </div>
                                <div class="d-flex flex-column gap-2">
                                  <button class="btn btn-xs text-white mb-2" @click.stop="editAllergie(all)" style="background-color: #0B5D3F;width: 45px; height: 38px;">
                                    <i class="mdi mdi-pencil"></i>
                                  </button>
                                  <button class="btn btn-xs btn-danger" @click.stop="deleteAllergie(all.id)">
                                    <i class="mdi mdi-delete"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-if="allergies.length === 0" class="col-12 text-center text-muted py-5">
                          <i class="mdi mdi-information-outline h3"></i>
                          <p>Aucune allergie enregistrée</p>
                        </div>
                      </div>
                    </div>

                    <!-- Vaccinations -->
                    <div class="tab-pane fade" :class="{ 'show active': currentTab === 'vaccinations' }" 
                         v-show="currentTab === 'vaccinations'">
                      <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5><i class="mdi mdi-needle"></i> Vaccinations</h5>
                        <button class="btn btn-sm btn-success" @click="openVaccinationModal()">
                          <i class="mdi mdi-plus"></i> Ajouter
                        </button>
                      </div>
                      <div class="table-responsive">
                        <table class="table table-striped table-sm">
                          <thead>
                            <tr class="bg-light text-dark font-weight-bold">
                              <th>Vaccin</th>
                              <th>Code</th>
                              <th>Date</th>
                              <th>Lot</th>
                              <th>Voie</th>
                              <th>Prochaine dose</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="vacc in vaccinations" :key="vacc.id">
                              <td>{{ vacc.vaccine_name || 'N/A' }}</td>
                              <td><code>{{ vacc.vaccine_code || 'N/A' }}</code></td>
                              <td>{{ format_date(vacc.vaccination_date) }}</td>
                              <td>{{ vacc.batch_number || 'N/A' }}</td>
                              <td>{{ vacc.administration_route || 'N/A' }}</td>
                              <td>{{ format_date(vacc.next_dose_date) }}</td>
                              <td>
                                <button class="btn btn-xs text-white" @click="editVaccination(vacc)" style="background-color: #0B5D3F;">
                                  <i class="mdi mdi-pencil"></i>
                                </button>
                                <button class="btn btn-xs btn-danger" @click="deleteVaccination(vacc.id)">
                                  <i class="mdi mdi-delete"></i>
                                </button>
                              </td>
                            </tr>
                            <tr v-if="vaccinations.length === 0">
                              <td colspan="7" class="text-center text-muted py-4">
                                <i class="mdi mdi-information-outline h3"></i>
                                <p>Aucune vaccination enregistrée</p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <!-- Consultations (Observations SOAP) -->
                    <div class="tab-pane fade" :class="{ 'show active': currentTab === 'consultations' }" 
                         v-show="currentTab === 'consultations'">
                      <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5><i class="mdi mdi-stethoscope"></i> Observations cliniques (SOAP)</h5>
                        <button class="btn btn-sm btn-success" @click="openObservationModal()">
                          <i class="mdi mdi-plus"></i> Nouvelle consultation
                        </button>
                      </div>
                      <div class="timeline-list">
                        <div v-for="(obs, index) in observations" :key="index" 
                             class="card mb-3 border-left-primary">
                          <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                              <span class="badge badge-success">
                                {{ format_date(obs.observation_date || obs.created_at) }}
                              </span>
                              <small class="text-muted">
                                Dr. {{ getDoctorName(obs.doctor) }}
                              </small>
                            </div>
                            
                            <div class="row mb-2">
                              <div class="col-md-3">
                                <small><b>TA:</b> {{ obs.blood_pressure || '-' }}</small>
                              </div>
                              <div class="col-md-3">
                                <small><b>FC:</b> {{ obs.heart_rate || '-' }} bpm</small>
                              </div>
                              <div class="col-md-3">
                                <small><b>Temp:</b> {{ obs.temperature || '-' }}°C</small>
                              </div>
                              <div class="col-md-3">
                                <small><b>SpO2:</b> {{ obs.oxygen_saturation || '-' }}%</small>
                              </div>
                            </div>

                            <div class="row">
                              <div class="col-md-6 mb-2">
                                <small class="text-muted"><b>S (Subjectif):</b></small>
                                <p class="mb-0">{{ obs.subjective || 'Non renseigné' }}</p>
                              </div>
                              <div class="col-md-6 mb-2">
                                <small class="text-muted"><b>O (Objectif):</b></small>
                                <p class="mb-0">{{ obs.objective || 'Non renseigné' }}</p>
                              </div>
                              <div class="col-md-6 mb-2">
                                <small class="text-muted"><b>A (Analyse):</b></small>
                                <p class="mb-0">{{ obs.assessment || 'Non renseigné' }}</p>
                              </div>
                              <div class="col-md-6 mb-2">
                                <small class="text-muted"><b>P (Plan):</b></small>
                                <p class="mb-0">{{ obs.plan || 'Non renseigné' }}</p>
                              </div>
                            </div>

                            <div class="mt-2">
                              <button class="btn btn-xs text-white" @click="editObservation(obs)" style="background-color: #0B5D3F;">
                                <i class="mdi mdi-pencil"></i>
                              </button>
                              <button class="btn btn-xs btn-danger" @click="deleteObservation(obs.id)">
                                <i class="mdi mdi-delete"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div v-if="observations.length === 0" class="text-center py-5 text-muted">
                          <i class="mdi mdi-information-outline h1 opacity-50"></i>
                          <p>Aucune observation clinique enregistrée</p>
                        </div>
                      </div>
                    </div>

                    <!-- Examens -->
                    <div class="tab-pane fade" :class="{ 'show active': currentTab === 'exams' }" 
                         v-show="currentTab === 'exams'">
                      <h5 class="mb-3"><i class="mdi mdi-microscope"></i> Examens complémentaires</h5>
                      <div class="row">
                        <div class="col-md-6 mb-3">
                          <h6 class="text-primary">Examens de laboratoire</h6>
                          <div v-if="labExams.length > 0">
                            <div v-for="exam in labExams" :key="exam.id" class="card mb-2">
                              <div class="card-body p-2">
                                <small><b>Date:</b> {{ format_date(exam.created_at) }}</small>
                                <p class="mb-0 small">{{ exam.summary || 'Résultats disponibles' }}</p>
                              </div>
                            </div>
                          </div>
                          <p v-else class="text-muted small">Aucun examen de laboratoire</p>
                        </div>
                        <div class="col-md-6 mb-3">
                          <h6 class="text-info">Examens d'imagerie</h6>
                          <div v-if="imagingExams.length > 0">
                            <div v-for="exam in imagingExams" :key="exam.id" class="card mb-2">
                              <div class="card-body p-2">
                                <small><b>Date:</b> {{ format_date(exam.created_at) }}</small>
                                <p class="mb-0 small">{{ exam.summary || 'Résultats disponibles' }}</p>
                              </div>
                            </div>
                          </div>
                          <p v-else class="text-muted small">Aucun examen d'imagerie</p>
                        </div>
                      </div>
                    </div>

                    <!-- Prescriptions -->
                    <div class="tab-pane fade" :class="{ 'show active': currentTab === 'prescriptions' }" 
                         v-show="currentTab === 'prescriptions'">
                      <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5><i class="mdi mdi-pill"></i> Prescriptions médicamenteuses</h5>
                        <button class="btn btn-sm btn-success" @click="openPrescriptionModal()">
                          <i class="mdi mdi-plus"></i> Nouvelle prescription
                        </button>
                      </div>
                      <div class="card-list">
                        <div v-for="presc in prescriptions" :key="presc.id" class="card mb-3 border-left-success">
                          <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start mb-2">
                              <div>
                                <h6 class="mb-1">
                                  Prescription du {{ format_date(presc.prescription_date) }}
                                  <span class="badge ml-2" :class="getPrescriptionStatusBadge(presc.status)">
                                    {{ getPrescriptionStatusLabel(presc.status) }}
                                  </span>
                                </h6>
                                <small class="text-muted">
                                  Prescrit par: {{ getDoctorName(presc.doctor) }}
                                </small>
                                <p v-if="presc.notes" class="mb-1 small mt-2">{{ presc.notes }}</p>
                              </div>
                              <div>
                                <button class="btn btn-xs btn-secondary mb-2" @click="viewPrescription(presc)">
                                  <i class="mdi mdi-eye"></i>
                                </button>
                                <button class="btn btn-xs btn-danger" @click="deletePrescription(presc.id)">
                                  <i class="mdi mdi-delete"></i>
                                </button>
                              </div>
                              
                            </div>
                            <div class="mt-2">
                              <small><b>Médicaments prescrits:</b></small>
                              <ul class="mb-0 small">
                                <li v-for="item in presc.items" :key="item.id">
                                  {{ item.medication_name }}
                                  <span v-if="item.dosage">({{ item.dosage }})</span>
                                  - {{ item.quantity }} {{ item.form || 'unité(s)' }}
                                  <span v-if="item.frequency">- {{ item.frequency }}</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div v-if="prescriptions.length === 0" class="text-center py-5 text-muted">
                          <i class="mdi mdi-information-outline h3"></i>
                          <p>Aucune prescription enregistrée</p>
                        </div>
                      </div>
                    </div>

                    <!-- Documents -->
                    <div class="tab-pane fade" :class="{ 'show active': currentTab === 'documents' }" 
                         v-show="currentTab === 'documents'">
                      <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5><i class="mdi mdi-file-document"></i> Documents attachés</h5>
                        <button class="btn btn-sm btn-success" @click="openDocumentModal()">
                          <i class="mdi mdi-plus"></i> Ajouter
                        </button>
                      </div>
                      <div class="row">
                        <div v-for="doc in documents" :key="doc.id" class="col-md-6 mb-3">
                          <div class="card">
                            <div class="card-body">
                              <div class="d-flex justify-content-between align-items-start">
                                <div class="flex-grow-1">
                                  <h6 class="mb-1">
                                    <i class="mdi" :class="getDocumentIcon(doc.type)"></i>
                                    {{ doc.title }}
                                  </h6>
                                  <p class="mb-1 small text-muted">
                                    <span class="badge badge-secondary">{{ getDocumentTypeLabel(doc.type) }}</span>
                                    <span class="ml-2">{{ format_date(doc.document_date) }}</span>
                                  </p>
                                  <p v-if="doc.description" class="mb-1 small">{{ doc.description }}</p>
                                  <small class="text-muted">
                                    <i class="mdi mdi-file"></i> {{ doc.file_name }}
                                    <span v-if="doc.file_size">({{ formatFileSize(doc.file_size) }})</span>
                                  </small>
                                </div>
                                <div>
                                  <button class="btn btn-xs text-white" @click="downloadDocument(doc.id)" style="background-color: #0B5D3F;">
                                    <i class="mdi mdi-download"></i>
                                  </button>
                                  <button class="btn btn-xs btn-danger" @click="deleteDocument(doc.id)">
                                    <i class="mdi mdi-delete"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div v-if="documents.length === 0" class="col-12 text-center py-5 text-muted">
                          <i class="mdi mdi-information-outline h3"></i>
                          <p>Aucun document attaché</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals pour les formulaires -->
    <!-- Modal Antécédent -->
    <div class="modal fade" id="antecedentModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title">
              {{ editingAntecedent ? 'Modifier' : 'Ajouter' }} un antécédent
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveAntecedent">
              <div class="form-group">
                <label>Type <span class="text-danger">*</span></label>
                <select class="form-control" v-model="antecedentForm.type" required>
                  <option value="">Sélectionner</option>
                  <option value="médical">Médical</option>
                  <option value="chirurgical">Chirurgical</option>
                  <option value="familial">Familial</option>
                </select>
              </div>
              <div class="form-group">
                <label>Nom/Description <span class="text-danger">*</span></label>
                <input type="text" class="form-control" v-model="antecedentForm.name" required>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Code CIM-10</label>
                    <div class="input-group">
                      <input type="text" class="form-control" v-model="antecedentForm.cim10_code" 
                             @input="searchCim10" placeholder="Rechercher...">
                      <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" @click="showCim10Search = !showCim10Search">
                          <i class="mdi mdi-magnify"></i>
                        </button>
                      </div>
                    </div>
                    <div v-if="showCim10Search && cim10Results.length > 0" class="list-group mt-2" style="max-height: 200px; overflow-y: auto;">
                      <a v-for="item in cim10Results" :key="item.code" 
                         class="list-group-item list-group-item-action" 
                         @click="selectCim10(item)">
                        <strong>{{ item.code }}</strong> - {{ item.label }}
                      </a>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Statut</label>
                    <select class="form-control" v-model="antecedentForm.is_cured" :disabled="!!antecedentForm.end_date">
                      <option :value="false">Chronique</option>
                      <option :value="true">Guéri</option>
                    </select>
                    <small v-if="antecedentForm.end_date" class="text-muted">
                      <i class="mdi mdi-information"></i> Le statut est automatiquement défini sur "Guéri" car une date de fin est renseignée.
                    </small>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Date de début</label>
                    <input type="date" class="form-control" v-model="antecedentForm.start_date">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Date de fin</label>
                    <input 
                      type="date" 
                      class="form-control" 
                      v-model="antecedentForm.end_date"
                      @change="handleEndDateChange">
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label>Description complémentaire</label>
                <textarea class="form-control" rows="3" v-model="antecedentForm.description"></textarea>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal" :disabled="isSavingAntecedent">Annuler</button>
                <button type="submit" class="btn btn-success" :disabled="isSavingAntecedent">
                  <span v-if="isSavingAntecedent" class="spinner-border spinner-border-sm mr-1"></span>
                  {{ editingAntecedent ? 'Modifier' : 'Enregistrer' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Allergie -->
    <div class="modal fade" id="allergieModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">
              {{ editingAllergie ? 'Modifier' : 'Ajouter' }} une allergie
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveAllergie">
              <div class="form-group">
                <label>Substance/Allergène <span class="text-danger">*</span></label>
                <input type="text" class="form-control" v-model="allergieForm.name" required>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Type <span class="text-danger">*</span></label>
                    <select class="form-control" v-model="allergieForm.type" required>
                      <option value="">Sélectionner</option>
                      <option value="médicament">Médicament</option>
                      <option value="aliment">Aliment</option>
                      <option value="environnemental">Environnemental</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Niveau de gravité <span class="text-danger">*</span></label>
                    <select class="form-control" v-model="allergieForm.severity" required>
                      <option value="">Sélectionner</option>
                      <option value="léger">Léger</option>
                      <option value="modéré">Modéré</option>
                      <option value="sévère">Sévère</option>
                      <option value="anaphylaxie">Anaphylaxie</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label>Date de découverte</label>
                <input type="date" class="form-control" v-model="allergieForm.discovery_date">
              </div>
              <div class="form-group">
                <label>Réactions observées</label>
                <textarea class="form-control" rows="3" v-model="allergieForm.reactions" 
                          placeholder="Décrire les réactions observées..."></textarea>
              </div>
              <div class="form-group">
                <label>Description</label>
                <textarea class="form-control" rows="2" v-model="allergieForm.description"></textarea>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                <button type="submit" class="btn btn-success" :disabled="isSaving">
                  <span v-if="isSaving" class="spinner-border spinner-border-sm mr-1"></span>
                  {{ editingAllergie ? 'Modifier' : 'Enregistrer' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Observation SOAP -->
    <div class="modal fade" id="observationModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header text-white" style="background-color: #0B5D3F;">
            <h5 class="modal-title">
              <i class="mdi mdi-stethoscope mr-2"></i>
              {{ editingObservation ? 'Modifier' : 'Nouvelle' }} observation clinique (SOAP)
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveObservation">
              <!-- Constantes vitales -->
              <fieldset class="form-group border px-3 py-3 mb-4 bg-light">
                <legend class="w-auto px-3">
                  <b style="font-size: 12px; color: #0B5D3F;">
                    <i class="mdi mdi-heart-pulse mr-1"></i> CONSTANTES VITALES
                  </b>
                </legend>
                <div class="row">
                  <div class="col-md-3">
                    <div class="form-group mb-2">
                      <label class="small font-weight-bold">Tension artérielle (mmHg)</label>
                      <input type="text" class="form-control form-control-sm" v-model="observationForm.blood_pressure" 
                             placeholder="ex: 120/80">
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group mb-2">
                      <label class="small font-weight-bold">Fréquence cardiaque (bpm)</label>
                      <input type="number" class="form-control form-control-sm" v-model="observationForm.heart_rate" 
                             min="0" max="300" placeholder="ex: 72">
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group mb-2">
                      <label class="small font-weight-bold">Température (°C)</label>
                      <input type="number" class="form-control form-control-sm" v-model="observationForm.temperature" 
                             step="0.1" min="30" max="45" placeholder="ex: 37.0">
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group mb-2">
                      <label class="small font-weight-bold">SpO2 (%)</label>
                      <input type="number" class="form-control form-control-sm" v-model="observationForm.oxygen_saturation" 
                             min="0" max="100" placeholder="ex: 98">
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-3">
                    <div class="form-group mb-0">
                      <label class="small font-weight-bold">Fréquence respiratoire (cpm)</label>
                      <input type="number" class="form-control form-control-sm" v-model="observationForm.respiratory_rate" 
                             min="0" max="100" placeholder="ex: 16">
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group mb-0">
                      <label class="small font-weight-bold">Poids (kg)</label>
                      <input type="number" class="form-control form-control-sm" v-model="observationForm.weight" 
                             step="0.1" min="0" max="500" placeholder="ex: 70.5">
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group mb-0">
                      <label class="small font-weight-bold">Taille (cm)</label>
                      <input type="number" class="form-control form-control-sm" v-model="observationForm.height" 
                             step="0.1" min="0" max="300" placeholder="ex: 175">
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div class="form-group mb-0">
                      <label class="small font-weight-bold">Date d'observation <span class="text-danger">*</span></label>
                      <input type="datetime-local" class="form-control form-control-sm" v-model="observationForm.observation_date" required>
                    </div>
                  </div>
                </div>
              </fieldset>

              <!-- SOAP Format -->
              <div class="row">
                <div class="col-md-6">
                  <fieldset class="form-group border px-3 py-3 mb-3" style="border-left: 4px solid #007bff !important;">
                    <legend class="w-auto px-2">
                      <b style="font-size: 12px; color: #007bff;">
                        <i class="mdi mdi-account-voice mr-1"></i> S - SUBJECTIF
                      </b>
                    </legend>
                    <div class="form-group mb-0">
                      <label class="small">Motif de consultation, symptômes rapportés par le patient</label>
                      <textarea class="form-control" rows="4" v-model="observationForm.subjective" 
                                placeholder="Plaintes du patient, symptômes rapportés, antécédents de la maladie actuelle..."></textarea>
                    </div>
                  </fieldset>
                </div>
                <div class="col-md-6">
                  <fieldset class="form-group border px-3 py-3 mb-3" style="border-left: 4px solid #28a745 !important;">
                    <legend class="w-auto px-2">
                      <b style="font-size: 12px; color: #28a745;">
                        <i class="mdi mdi-eye mr-1"></i> O - OBJECTIF
                      </b>
                    </legend>
                    <div class="form-group mb-0">
                      <label class="small">Examen clinique, constatations objectives</label>
                      <textarea class="form-control" rows="4" v-model="observationForm.objective" 
                                placeholder="Constantes vitales, examen physique, signes cliniques observés..."></textarea>
                    </div>
                  </fieldset>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <fieldset class="form-group border px-3 py-3 mb-3" style="border-left: 4px solid #ffc107 !important;">
                    <legend class="w-auto px-2">
                      <b style="font-size: 12px; color: #ffc107;">
                        <i class="mdi mdi-brain mr-1"></i> A - ANALYSE
                      </b>
                    </legend>
                    <div class="form-group mb-0">
                      <label class="small">Diagnostic(s) posé(s), analyse clinique</label>
                      <textarea class="form-control" rows="4" v-model="observationForm.assessment" 
                                placeholder="Diagnostic(s) posé(s), analyse clinique, interprétation des résultats..."></textarea>
                    </div>
                  </fieldset>
                </div>
                <div class="col-md-6">
                  <fieldset class="form-group border px-3 py-3 mb-3" style="border-left: 4px solid #dc3545 !important;">
                    <legend class="w-auto px-2">
                      <b style="font-size: 12px; color: #dc3545;">
                        <i class="mdi mdi-clipboard-text mr-1"></i> P - PLAN
                      </b>
                    </legend>
                    <div class="form-group mb-0">
                      <label class="small">Plan de traitement, examens complémentaires, suivi</label>
                      <textarea class="form-control" rows="4" v-model="observationForm.plan" 
                                placeholder="Plan de traitement, examens complémentaires à prescrire, suivi recommandé..."></textarea>
                    </div>
                  </fieldset>
                </div>
              </div>

              <div class="modal-footer bg-light">
                <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">
                  <i class="mdi mdi-close mr-1"></i> Annuler
                </button>
                <button type="submit" class="btn btn-sm text-white" :disabled="isSaving" style="background-color: #0B5D3F;">
                  <span v-if="isSaving" class="spinner-border spinner-border-sm mr-1"></span>
                  <i v-else class="mdi mdi-content-save mr-1"></i>
                  {{ editingObservation ? 'Modifier' : 'Enregistrer' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Vaccination -->
    <div class="modal fade" id="vaccinationModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header bg-info text-white">
            <h5 class="modal-title">
              {{ editingVaccination ? 'Modifier' : 'Ajouter' }} une vaccination
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveVaccination">
              <div class="form-group">
                <label>Nom du vaccin <span class="text-danger">*</span></label>
                <input type="text" class="form-control" v-model="vaccinationForm.vaccine_name" required>
              </div>
              <div class="form-group">
                <label>Code du vaccin</label>
                <input type="text" class="form-control" v-model="vaccinationForm.vaccine_code" 
                       placeholder="ex: BCG, DTP, etc.">
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Date de vaccination <span class="text-danger">*</span></label>
                    <input type="date" class="form-control" v-model="vaccinationForm.vaccination_date" required>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Numéro de lot</label>
                    <input type="text" class="form-control" v-model="vaccinationForm.batch_number">
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Voie d'administration</label>
                    <input type="text" class="form-control" v-model="vaccinationForm.administration_route" 
                           placeholder="ex: IM, SC, etc.">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Site d'injection</label>
                    <input type="text" class="form-control" v-model="vaccinationForm.site" 
                           placeholder="ex: Bras gauche, etc.">
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label>Date de la prochaine dose</label>
                <input type="date" class="form-control" v-model="vaccinationForm.next_dose_date">
              </div>
              <div class="form-group">
                <label>Notes</label>
                <textarea class="form-control" rows="2" v-model="vaccinationForm.notes"></textarea>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                <button type="submit" class="btn btn-success" :disabled="isSaving">
                  <span v-if="isSaving" class="spinner-border spinner-border-sm mr-1"></span>
                  {{ editingVaccination ? 'Modifier' : 'Enregistrer' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Prescription -->
    <div class="modal fade" id="prescriptionModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content">
          <div class="modal-header text-white" style="background-color: #0B5D3F;">
            <h5 class="modal-title">
              <i class="mdi mdi-pill mr-2"></i>
              {{ editingPrescription ? 'Modifier' : 'Nouvelle' }} prescription médicamenteuse
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="savePrescription">
              <!-- Informations générales -->
              <fieldset class="form-group border px-3 py-3 mb-4 bg-light">
                <legend class="w-auto px-3">
                  <b style="font-size: 12px; color: #0B5D3F;">
                    <i class="mdi mdi-information-outline mr-1"></i> INFORMATIONS GÉNÉRALES
                  </b>
                </legend>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group mb-2">
                      <label class="small font-weight-bold">Date de prescription <span class="text-danger">*</span></label>
                      <input type="date" class="form-control form-control-sm" v-model="prescriptionForm.prescription_date" required>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group mb-2">
                      <label class="small font-weight-bold">Date de validité</label>
                      <input type="date" class="form-control form-control-sm" v-model="prescriptionForm.valid_until">
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group mb-2">
                      <label class="small font-weight-bold">Statut</label>
                      <select class="form-control form-control-sm" v-model="prescriptionForm.status">
                        <option value="active">Active</option>
                        <option value="completed">Terminée</option>
                        <option value="cancelled">Annulée</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="form-group mb-0">
                  <label class="small font-weight-bold">Notes du prescripteur</label>
                  <textarea class="form-control" rows="2" v-model="prescriptionForm.notes" 
                            placeholder="Instructions générales, précautions particulières..."></textarea>
                </div>
              </fieldset>

              <!-- Médicaments -->
              <fieldset class="form-group border px-3 py-3 mb-4">
                <legend class="w-auto px-3">
                  <b style="font-size: 12px; color: #0B5D3F;">
                    <i class="mdi mdi-pill mr-1"></i> MÉDICAMENTS PRESCRITS
                  </b>
                </legend>

                <!-- Formulaire d'ajout de médicament -->
                <div class="card bg-light mb-3">
                  <div class="card-body">
                    <h6 class="card-title small font-weight-bold mb-3">Ajouter un médicament</h6>
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group mb-2">
                          <label class="small">Nom du médicament <span class="text-danger">*</span></label>
                          <input type="text" class="form-control form-control-sm" v-model="prescriptionItemForm.medication_name" 
                                 placeholder="ex: Paracétamol" required>
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="form-group mb-2">
                          <label class="small">Dosage</label>
                          <input type="text" class="form-control form-control-sm" v-model="prescriptionItemForm.dosage" 
                                 placeholder="ex: 500mg">
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="form-group mb-2">
                          <label class="small">Forme</label>
                          <input type="text" class="form-control form-control-sm" v-model="prescriptionItemForm.form" 
                                 placeholder="ex: Comprimé">
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="form-group mb-2">
                          <label class="small">Quantité <span class="text-danger">*</span></label>
                          <input type="number" class="form-control form-control-sm" v-model.number="prescriptionItemForm.quantity" 
                                 min="1" required>
                        </div>
                      </div>
                      <div class="col-md-2">
                        <div class="form-group mb-2">
                          <label class="small">Voie</label>
                          <input type="text" class="form-control form-control-sm" v-model="prescriptionItemForm.administration_route" 
                                 placeholder="ex: Orale">
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-3">
                        <div class="form-group mb-2">
                          <label class="small">Fréquence</label>
                          <input type="text" class="form-control form-control-sm" v-model="prescriptionItemForm.frequency" 
                                 placeholder="ex: 3x/jour">
                        </div>
                      </div>
                      <div class="col-md-3">
                        <div class="form-group mb-2">
                          <label class="small">Durée (jours)</label>
                          <input type="number" class="form-control form-control-sm" v-model.number="prescriptionItemForm.duration_days" 
                                 min="1" placeholder="ex: 7">
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group mb-2">
                          <label class="small">Instructions</label>
                          <input type="text" class="form-control form-control-sm" v-model="prescriptionItemForm.instructions" 
                                 placeholder="ex: Avant les repas">
                        </div>
                      </div>
                    </div>
                    <button type="button" class="btn btn-sm text-white" @click="addPrescriptionItem" 
                            style="background-color: #0B5D3F;">
                      <i class="mdi mdi-plus mr-1"></i> Ajouter le médicament
                    </button>
                  </div>
                </div>

                <!-- Liste des médicaments ajoutés -->
                <div v-if="prescriptionForm.items.length > 0">
                  <div class="table-responsive">
                    <table class="table table-sm table-bordered">
                      <thead class="thead-light">
                        <tr>
                          <th>Médicament</th>
                          <th>Dosage</th>
                          <th>Forme</th>
                          <th>Quantité</th>
                          <th>Voie</th>
                          <th>Fréquence</th>
                          <th>Durée</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in prescriptionForm.items" :key="index">
                          <td>{{ item.medication_name }}</td>
                          <td>{{ item.dosage || 'N/A' }}</td>
                          <td>{{ item.form || 'N/A' }}</td>
                          <td>{{ item.quantity }}</td>
                          <td>{{ item.administration_route || 'N/A' }}</td>
                          <td>{{ item.frequency || 'N/A' }}</td>
                          <td>{{ item.duration_days ? item.duration_days + ' jours' : 'N/A' }}</td>
                          <td>
                            <button type="button" class="btn btn-sm btn-danger" @click="removePrescriptionItem(index)">
                              <i class="mdi mdi-delete"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div v-else class="alert alert-warning mb-0">
                  <i class="mdi mdi-information-outline mr-1"></i>
                  Aucun médicament ajouté. Veuillez ajouter au moins un médicament.
                </div>
              </fieldset>

              <div class="modal-footer bg-light">
                <button type="button" class="btn btn-danger btn-sm" data-dismiss="modal">
                  <i class="mdi mdi-close mr-1"></i> Annuler
                </button>
                <button type="submit" class="btn btn-sm text-white" :disabled="isSaving || prescriptionForm.items.length === 0" 
                        style="background-color: #0B5D3F;">
                  <span v-if="isSaving" class="spinner-border spinner-border-sm mr-1"></span>
                  <i v-else class="mdi mdi-content-save mr-1"></i>
                  {{ editingPrescription ? 'Modifier' : 'Enregistrer' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Document -->
    <div class="modal fade" id="documentModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header bg-success text-white">
            <h5 class="modal-title">
              {{ editingDocument ? 'Modifier' : 'Ajouter' }} un document
            </h5>
            <button type="button" class="close text-white" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveDocument">
              <div class="form-group">
                <label>Titre <span class="text-danger">*</span></label>
                <input type="text" class="form-control" v-model="documentForm.title" required 
                       placeholder="ex: Radiographie thorax">
              </div>
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Type <span class="text-danger">*</span></label>
                    <select class="form-control" v-model="documentForm.type" required>
                      <option value="">Sélectionner</option>
                      <option value="certificat_medical">Certificat médical</option>
                      <option value="ordonnance">Ordonnance</option>
                      <option value="resultat_examen">Résultat d'examen</option>
                      <option value="compte_rendu">Compte-rendu</option>
                      <option value="imagerie">Imagerie</option>
                      <option value="laboratoire">Laboratoire</option>
                      <option value="autre">Autre</option>
                    </select>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label>Date du document</label>
                    <input type="date" class="form-control" v-model="documentForm.document_date">
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label>Description</label>
                <textarea class="form-control" rows="3" v-model="documentForm.description" 
                          placeholder="Description du document..."></textarea>
              </div>
              <div class="form-group">
                <label>Fichier <span class="text-danger">*</span></label>
                <div class="custom-file">
                  <input type="file" class="custom-file-input" id="documentFile" 
                         @change="handleFileSelect" :required="!editingDocument">
                  <label class="custom-file-label" for="documentFile">
                    {{ documentForm.file ? documentForm.file.name : 'Choisir un fichier' }}
                  </label>
                </div>
                <small class="form-text text-muted">Taille maximale : 10 MB</small>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                <button type="submit" class="btn btn-success" :disabled="isSaving">
                  <span v-if="isSaving" class="spinner-border spinner-border-sm mr-1"></span>
                  {{ editingDocument ? 'Modifier' : 'Enregistrer' }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmation personnalisé -->
    <div class="modal fade" id="confirmDeleteModal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title">Confirmation</h5>
            <button type="button" class="close text-white" data-dismiss="modal">
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>{{ confirmDeleteMessage }}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
            <button type="button" class="btn btn-danger" @click="confirmDeleteAction">Confirmer</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { dmeService } from "@/_services";
import moment from "moment";
import $ from "jquery";
import "../../../../node_modules/bootstrap/dist/js/bootstrap.js";

export default {
  name: "Dme",
  props: ["uuid"],
  data() {
    return {
      isLoading: true,
      isAiLoading: false,
      isSaving: false,
      error: null,
      currentTab: 'identity',
      patient: {},
      observations: [],
      antecedents: [],
      // États de chargement pour les antécédents
      isSavingAntecedent: false,
      isDeletingAntecedent: false,
      editingAntecedentId: null,
      allergies: [],
      vaccinations: [],
      consultations: [],
      labExams: [],
      imagingExams: [],
      prescriptions: [],
      documents: [],
      aiSummary: "Dossier prêt pour analyse.",
      
      // Forms
      editingAntecedent: null,
      antecedentForm: {
        type: '',
        name: '',
        cim10_code: '',
        description: '',
        start_date: '',
        end_date: '',
        is_cured: false
      },
      
      editingAllergie: null,
      allergieForm: {
        name: '',
        type: '',
        severity: '',
        discovery_date: '',
        reactions: '',
        description: ''
      },
      
      editingObservation: null,
      observationForm: {
        subjective: '',
        objective: '',
        assessment: '',
        plan: '',
        blood_pressure: '',
        heart_rate: '',
        temperature: '',
        respiratory_rate: '',
        oxygen_saturation: '',
        weight: '',
        height: '',
        observation_date: ''
      },
      
      editingVaccination: null,
      vaccinationForm: {
        vaccine_name: '',
        vaccine_code: '',
        vaccination_date: '',
        batch_number: '',
        administration_route: '',
        site: '',
        notes: '',
        next_dose_date: ''
      },
      
      // CIM-10 Search
      showCim10Search: false,
      cim10Results: [],
      
      // Prescription Form
      editingPrescription: null,
      prescriptionForm: {
        prescription_date: '',
        notes: '',
        status: 'active',
        valid_until: '',
        items: []
      },
      prescriptionItemForm: {
        medication_name: '',
        dosage: '',
        form: '',
        administration_route: '',
        quantity: 1,
        frequency: '',
        instructions: '',
        duration_days: ''
      },
      
      // Document Form
      editingDocument: null,
      documentForm: {
        title: '',
        type: 'autre',
        description: '',
        document_date: '',
        file: null
      },
      
      // Confirmation modal
      confirmDeleteMessage: '',
      confirmDeleteCallback: null
    };
  },
  mounted() {
    this.uuid = this.uuid || (this.$route && this.$route.params && this.$route.params.uuid);
    if (this.uuid) {
      this.fetchDme();
    } else {
      this.$toast.error("UUID du patient manquant");
      this.$router.push('/patients/list');
    }
  },
  methods: {
    getInitials() {
      if (this.patient.lastname && this.patient.firstname) {
        return (this.patient.lastname.charAt(0) + this.patient.firstname.charAt(0)).toUpperCase();
      }
      return '??';
    },
    
    async fetchDme(showLoading = true) {
      if (showLoading) {
        this.isLoading = true;
      }
      this.error = null;
      try {
        const res = await dmeService.getFullDme(this.uuid);
        
        // Gérer différentes structures de réponse
        let dmeData = null;
        if (res.data) {
          if (res.data.data) {
            dmeData = res.data.data;
          } else if (res.data.patient) {
            dmeData = res.data;
          }
        }
        
        if (dmeData) {
          this.patient = dmeData.patient || {};
          this.observations = dmeData.observations || [];
          
          // Forcer la mise à jour réactive de la liste des antécédents
          // Remplacer complètement le tableau pour forcer la réactivité Vue
          const newAntecedents = Array.isArray(dmeData.antecedents) ? dmeData.antecedents : [];
          
          // Utiliser Vue.set pour garantir la réactivité
          this.$set(this, 'antecedents', [...newAntecedents]);
          
          this.allergies = dmeData.allergies || [];
          this.vaccinations = dmeData.vaccinations || [];
          this.consultations = dmeData.consultations || [];
          this.labExams = dmeData.lab_exams || [];
          this.imagingExams = dmeData.imaging_exams || [];
          this.prescriptions = dmeData.prescriptions || [];
          this.documents = dmeData.documents || [];
          
          // Vérifier que le patient existe
          if (!this.patient || !this.patient.uuid) {
            throw new Error('Données du patient incomplètes');
          }
          
          this.isLoading = false;
          if (showLoading) {
            this.fetchAiSummary();
          }
        } else {
          throw new Error('Structure de réponse invalide');
        }
      } catch (error) {
        console.error("Erreur DME:", error);
        
        // Déterminer le message d'erreur approprié
        let errorMessage = "Erreur de chargement du dossier médical.";
        
        if (error.response) {
          // Erreur HTTP (404, 500, etc.)
          if (error.response.status === 404) {
            errorMessage = "Patient non trouvé. Le dossier médical n'existe pas pour ce patient.";
          } else if (error.response.status === 403) {
            errorMessage = "Accès refusé. Vous n'avez pas les permissions nécessaires pour accéder à ce dossier.";
          } else if (error.response.status === 500) {
            errorMessage = "Erreur serveur. Veuillez réessayer plus tard ou contacter l'administrateur.";
          } else if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          } else if (error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;
          }
        } else if (error.message) {
          errorMessage = error.message;
        } else if (error.request) {
          errorMessage = "Impossible de contacter le serveur. Vérifiez votre connexion réseau.";
        }
        
        this.error = errorMessage;
        this.isLoading = false;
        if (showLoading) {
          this.$toast.error(errorMessage, {
            position: "top-right",
            timeout: 5000,
          });
        }
      }
    },

    async fetchAiSummary() {
      this.isAiLoading = true;
      try {
        const res = await dmeService.getAiSummary(this.uuid);
        if (res.data && res.data.data) {
          this.aiSummary = res.data.data.summary || "Analyse AI indisponible.";
        }
      } catch (error) {
        this.aiSummary = "Analyse AI indisponible.";
      } finally {
        this.isAiLoading = false;
      }
    },

    format_date(value) {
      if (!value) return 'N/A';
      return moment(String(value)).format('DD/MM/YYYY');
    },

    // Antécédents
    openAntecedentModal() {
      this.editingAntecedent = null;
      this.editingAntecedentId = null;
      this.antecedentForm = {
        type: '',
        name: '',
        cim10_code: '',
        description: '',
        start_date: '',
        end_date: '',
        is_cured: false
      };
      $('#antecedentModal').modal('show');
    },

    editAntecedent(atcd) {
      if (this.isSavingAntecedent || this.isDeletingAntecedent) return;
      this.editingAntecedent = atcd;
      this.editingAntecedentId = atcd.id;
      this.antecedentForm = {
        type: atcd.type || '',
        name: atcd.name || '',
        cim10_code: atcd.cim10_code || '',
        description: atcd.description || '',
        start_date: atcd.start_date ? moment(atcd.start_date).format('YYYY-MM-DD') : '',
        end_date: atcd.end_date ? moment(atcd.end_date).format('YYYY-MM-DD') : '',
        is_cured: atcd.is_cured || false
      };
      // Si une date de fin existe, forcer is_cured à true
      if (this.antecedentForm.end_date) {
        this.antecedentForm.is_cured = true;
      }
      $('#antecedentModal').modal('show');
    },

    handleEndDateChange() {
      // Si une date de fin est renseignée, passer automatiquement is_cured à true
      if (this.antecedentForm.end_date) {
        this.antecedentForm.is_cured = true;
      } else {
        // Si la date de fin est supprimée, permettre la modification manuelle
        // On ne force pas à false car l'utilisateur peut vouloir garder "Guéri" même sans date de fin
      }
    },

    async saveAntecedent() {
      if (this.isSavingAntecedent) return;
      
      this.isSavingAntecedent = true;
      try {
        // Validation des champs requis
        if (!this.antecedentForm.name || !this.antecedentForm.name.trim()) {
          this.$toast.error('Le nom de l\'antécédent est requis');
          this.isSavingAntecedent = false;
          return;
        }
        if (!this.antecedentForm.type || !this.antecedentForm.type.trim()) {
          this.$toast.error('Le type d\'antécédent est requis');
          this.isSavingAntecedent = false;
          return;
        }
        
        // Si une date de fin est renseignée, forcer is_cured à true
        if (this.antecedentForm.end_date && this.antecedentForm.end_date.trim()) {
          this.antecedentForm.is_cured = true;
        }
        
        // Préparer les données en nettoyant les valeurs vides et en convertissant les types
        const data = {
          name: this.antecedentForm.name.trim(),
          type: this.antecedentForm.type.trim(),
          cim10_code: (this.antecedentForm.cim10_code && this.antecedentForm.cim10_code.trim()) || null,
          description: (this.antecedentForm.description && this.antecedentForm.description.trim()) || null,
          start_date: (this.antecedentForm.start_date && this.antecedentForm.start_date.trim()) || null,
          end_date: (this.antecedentForm.end_date && this.antecedentForm.end_date.trim()) || null,
          is_cured: Boolean(this.antecedentForm.is_cured)
        };
        
        
        // Ajouter patients_id seulement pour la création (pas pour la mise à jour)
        if (!this.editingAntecedent) {
          data.patients_id = this.patient.id;
        }
        
        // Log pour debug (à retirer en production)
        // console.log('Données envoyées pour antécédent:', data);
        
        let res;
        if (this.editingAntecedent) {
          res = await dmeService.updateAntecedent(this.editingAntecedent.id, data);
          
          // Mise à jour locale (Optimistic UI update)
          const updatedAtcd = (res.data && res.data.data) ? res.data.data : { ...this.editingAntecedent, ...data };
          const index = this.antecedents.findIndex(a => a.id === this.editingAntecedent.id);
          if (index !== -1) {
            // Utiliser Vue.set ou splice pour garantir la réactivité
            this.antecedents.splice(index, 1, updatedAtcd);
          }
        } else {
          res = await dmeService.createAntecedent(data);
          
          // Ajout local (Optimistic UI update)
          const newAtcd = (res.data && res.data.data) ? res.data.data : data;
          // S'assurer que l'objet a un ID s'il vient de data direct (cas fallback)
          this.antecedents.unshift(newAtcd);
        }
        
        this.$toast.success((res.data && res.data.message) || 'Antécédent enregistré avec succès');
        $('#antecedentModal').modal('hide');
        
        // Réinitialiser le formulaire et l'état d'édition
        this.editingAntecedent = null;
        this.editingAntecedentId = null;
        this.antecedentForm = {
          type: '',
          name: '',
          cim10_code: '',
          description: '',
          start_date: '',
          end_date: '',
          is_cured: false
        };
        
        // Rafraîchir en arrière-plan pour synchroniser
        this.fetchDme(false);
      } catch (error) {
        console.error('Erreur sauvegarde antécédent:', error);
        console.error('Détails de l\'erreur:', error.response);
        
        // Afficher un message d'erreur détaillé
        let errorMessage = 'Erreur lors de l\'enregistrement';
        if (error.response && error.response.data) {
          if (error.response.data.message) {
            errorMessage = error.response.data.message;
          } else if (error.response.data.errors) {
            // Afficher les erreurs de validation
            const errors = error.response.data.errors;
            const errorList = Object.keys(errors).map(key => {
              const messages = Array.isArray(errors[key]) ? errors[key] : [errors[key]];
              return `${key}: ${messages.join(', ')}`;
            }).join('\n');
            errorMessage = `Erreurs de validation:\n${errorList}`;
          }
        }
        
        this.$toast.error(errorMessage);
        // En cas d'erreur, rafraîchir pour récupérer l'état correct
        await this.fetchDme(false);
      } finally {
        this.isSavingAntecedent = false;
      }
    },

    async deleteAntecedent(id) {
      if (this.isDeletingAntecedent || this.isSavingAntecedent) return;
      
      this.showConfirmDelete('Êtes-vous sûr de vouloir supprimer cet antécédent ?', async () => {
        this.isDeletingAntecedent = true;
        this.editingAntecedentId = id;
        
        // Sauvegarder l'index pour pouvoir restaurer en cas d'erreur
        const index = this.antecedents.findIndex(a => a.id === id);
        const deletedItem = index !== -1 ? this.antecedents[index] : null;
        
        try {
          const res = await dmeService.deleteAntecedent(id);
          const successMessage = (res.data && res.data.message) || (res.data && res.data.data && res.data.data.message) || 'Antécédent supprimé avec succès';
          this.$toast.success(successMessage);
          
          // Suppression locale (Optimistic UI update)
          const index = this.antecedents.findIndex(a => a.id === id);
          if (index !== -1) {
            this.antecedents.splice(index, 1);
          }
          
          // Rafraîchir en arrière-plan pour synchroniser
          this.fetchDme(false);
        } catch (error) {
          console.error('Erreur suppression antécédent:', error);
          const errorMessage = (error.response && error.response.data && error.response.data.message) || 'Erreur lors de la suppression de l\'antécédent';
          this.$toast.error(errorMessage);
          
          // Rafraîchir pour récupérer l'état correct du serveur
          await this.fetchDme(false);
        } finally {
          this.isDeletingAntecedent = false;
          this.editingAntecedentId = null;
        }
      });
    },

    // Allergies
    openAllergieModal() {
      this.editingAllergie = null;
      this.allergieForm = {
        name: '',
        type: '',
        severity: '',
        discovery_date: moment().format('YYYY-MM-DD'),
        reactions: '',
        description: ''
      };
      $('#allergieModal').modal('show');
    },

    editAllergie(all) {
      this.editingAllergie = all;
      this.allergieForm = {
        name: all.name || '',
        type: all.type || '',
        severity: all.severity || '',
        discovery_date: all.discovery_date ? moment(all.discovery_date).format('YYYY-MM-DD') : '',
        reactions: all.reactions || '',
        description: all.description || ''
      };
      $('#allergieModal').modal('show');
    },

    async saveAllergie() {
      this.isSaving = true;
      try {
        const data = {
          ...this.allergieForm,
          patients_id: this.patient.id
        };
        
        let res;
        if (this.editingAllergie) {
          res = await dmeService.updateAllergie(this.editingAllergie.id, data);
        } else {
          res = await dmeService.createAllergie(data);
        }
        
        this.$toast.success(res.data.message || 'Allergie enregistrée avec succès');
        $('#allergieModal').modal('hide');
        await this.fetchDme();
      } catch (error) {
        console.error('Erreur sauvegarde allergie:', error);
        this.$toast.error((error.response && error.response.data && error.response.data.message) || 'Erreur lors de l\'enregistrement');
      } finally {
        this.isSaving = false;
      }
    },

    async deleteAllergie(id) {
      this.showConfirmDelete('Êtes-vous sûr de vouloir supprimer cette allergie ?', async () => {
        try {
          const res = await dmeService.deleteAllergie(id);
          this.$toast.success((res.data && res.data.message) || 'Allergie supprimée avec succès');
          await this.fetchDme();
        } catch (error) {
          console.error('Erreur suppression allergie:', error);
          const errorMessage = (error.response && error.response.data && error.response.data.message) || 'Erreur lors de la suppression de l\'allergie';
          this.$toast.error(errorMessage);
        }
      });
    },

    getSeverityStyle(severity) {
      const styles = {
        'léger': 'border-left: 4px solid #28a745 !important;',
        'modéré': 'border-left: 4px solid #ffc107 !important;',
        'sévère': 'border-left: 4px solid #ff9800 !important;',
        'anaphylaxie': 'border-left: 4px solid #dc3545 !important;'
      };
      return styles[severity] || '';
    },

    getSeverityBadgeClass(severity) {
      const classes = {
        'léger': 'badge-success',
        'modéré': 'badge-warning',
        'sévère': 'badge-danger',
        'anaphylaxie': 'badge-danger'
      };
      return classes[severity] || 'badge-secondary';
    },

    // Observations
    openObservationModal() {
      this.editingObservation = null;
      this.observationForm = {
        subjective: '',
        objective: '',
        assessment: '',
        plan: '',
        blood_pressure: '',
        heart_rate: '',
        temperature: '',
        respiratory_rate: '',
        oxygen_saturation: '',
        weight: '',
        height: '',
        observation_date: moment().format('YYYY-MM-DDTHH:mm')
      };
      $('#observationModal').modal('show');
    },

    editObservation(obs) {
      this.editingObservation = obs;
      this.observationForm = {
        subjective: obs.subjective || '',
        objective: obs.objective || '',
        assessment: obs.assessment || '',
        plan: obs.plan || '',
        blood_pressure: obs.blood_pressure || '',
        heart_rate: obs.heart_rate || '',
        temperature: obs.temperature || '',
        respiratory_rate: obs.respiratory_rate || '',
        oxygen_saturation: obs.oxygen_saturation || '',
        weight: obs.weight || '',
        height: obs.height || '',
        observation_date: obs.observation_date 
          ? moment(obs.observation_date).format('YYYY-MM-DDTHH:mm')
          : moment().format('YYYY-MM-DDTHH:mm')
      };
      $('#observationModal').modal('show');
    },

    async saveObservation() {
      this.isSaving = true;
      try {
        const data = {
          ...this.observationForm,
          patients_id: this.patient.id
        };
        
        let res;
        if (this.editingObservation) {
          res = await dmeService.updateObservation(this.editingObservation.id, data);
        } else {
          res = await dmeService.createObservation(data);
        }
        
        this.$toast.success(res.data.message || 'Observation enregistrée avec succès');
        $('#observationModal').modal('hide');
        await this.fetchDme();
      } catch (error) {
        console.error('Erreur sauvegarde observation:', error);
        this.$toast.error((error.response && error.response.data && error.response.data.message) || 'Erreur lors de l\'enregistrement');
      } finally {
        this.isSaving = false;
      }
    },

    async deleteObservation(id) {
      this.showConfirmDelete('Êtes-vous sûr de vouloir supprimer cette observation ?', async () => {
        try {
          const res = await dmeService.deleteObservation(id);
          this.$toast.success((res.data && res.data.message) || 'Observation supprimée avec succès');
          await this.fetchDme();
        } catch (error) {
          console.error('Erreur suppression observation:', error);
          const errorMessage = (error.response && error.response.data && error.response.data.message) || 'Erreur lors de la suppression de l\'observation';
          this.$toast.error(errorMessage);
        }
      });
    },

    // Vaccinations
    openVaccinationModal() {
      this.editingVaccination = null;
      this.vaccinationForm = {
        vaccine_name: '',
        vaccine_code: '',
        vaccination_date: moment().format('YYYY-MM-DD'),
        batch_number: '',
        administration_route: '',
        site: '',
        notes: '',
        next_dose_date: ''
      };
      $('#vaccinationModal').modal('show');
    },

    editVaccination(vacc) {
      this.editingVaccination = vacc;
      this.vaccinationForm = {
        vaccine_name: vacc.vaccine_name || '',
        vaccine_code: vacc.vaccine_code || '',
        vaccination_date: vacc.vaccination_date 
          ? moment(vacc.vaccination_date).format('YYYY-MM-DD')
          : moment().format('YYYY-MM-DD'),
        batch_number: vacc.batch_number || '',
        administration_route: vacc.administration_route || '',
        site: vacc.site || '',
        notes: vacc.notes || '',
        next_dose_date: vacc.next_dose_date 
          ? moment(vacc.next_dose_date).format('YYYY-MM-DD')
          : ''
      };
      $('#vaccinationModal').modal('show');
    },

    async saveVaccination() {
      this.isSaving = true;
      try {
        const data = {
          ...this.vaccinationForm,
          patients_id: this.patient.id
        };
        
        let res;
        if (this.editingVaccination) {
          res = await dmeService.updateVaccination(this.editingVaccination.id, data);
        } else {
          res = await dmeService.createVaccination(data);
        }
        
        this.$toast.success(res.data.message || 'Vaccination enregistrée avec succès');
        $('#vaccinationModal').modal('hide');
        await this.fetchDme();
      } catch (error) {
        console.error('Erreur sauvegarde vaccination:', error);
        this.$toast.error((error.response && error.response.data && error.response.data.message) || 'Erreur lors de l\'enregistrement');
      } finally {
        this.isSaving = false;
      }
    },

    async deleteVaccination(id) {
      this.showConfirmDelete('Êtes-vous sûr de vouloir supprimer cette vaccination ?', async () => {
        try {
          const res = await dmeService.deleteVaccination(id);
          this.$toast.success((res.data && res.data.message) || 'Vaccination supprimée avec succès');
          await this.fetchDme();
        } catch (error) {
          console.error('Erreur suppression vaccination:', error);
          const errorMessage = (error.response && error.response.data && error.response.data.message) || 'Erreur lors de la suppression de la vaccination';
          this.$toast.error(errorMessage);
        }
      });
    },

    // CIM-10 Search
    async searchCim10() {
      const query = this.antecedentForm.cim10_code;
      if (!query || query.length < 2) {
        this.cim10Results = [];
        return;
      }
      
      try {
        const res = await dmeService.searchCim10(query);
        this.cim10Results = res.data || [];
        this.showCim10Search = true;
      } catch (error) {
        console.error('Erreur recherche CIM-10:', error);
      }
    },

    selectCim10(item) {
      this.antecedentForm.cim10_code = item.code;
      this.showCim10Search = false;
      this.cim10Results = [];
    },

    // Prescriptions
    openPrescriptionModal() {
      this.editingPrescription = null;
      this.prescriptionForm = {
        prescription_date: moment().format('YYYY-MM-DD'),
        notes: '',
        status: 'active',
        valid_until: '',
        items: []
      };
      this.prescriptionItemForm = {
        medication_name: '',
        dosage: '',
        form: '',
        administration_route: '',
        quantity: 1,
        frequency: '',
        instructions: '',
        duration_days: ''
      };
      $('#prescriptionModal').modal('show');
    },

    addPrescriptionItem() {
      if (!this.prescriptionItemForm.medication_name || !this.prescriptionItemForm.medication_name.trim()) {
        this.$toast.warning('Veuillez saisir le nom du médicament');
        return;
      }
      if (!this.prescriptionItemForm.quantity || this.prescriptionItemForm.quantity < 1) {
        this.$toast.warning('La quantité doit être au moins égale à 1');
        return;
      }
      
      // Ajouter l'item avec les valeurs formatées
      this.prescriptionForm.items.push({
        medication_name: this.prescriptionItemForm.medication_name.trim(),
        dosage: this.prescriptionItemForm.dosage ? this.prescriptionItemForm.dosage.trim() : null,
        form: this.prescriptionItemForm.form ? this.prescriptionItemForm.form.trim() : null,
        administration_route: this.prescriptionItemForm.administration_route ? this.prescriptionItemForm.administration_route.trim() : null,
        quantity: parseInt(this.prescriptionItemForm.quantity) || 1,
        frequency: this.prescriptionItemForm.frequency ? this.prescriptionItemForm.frequency.trim() : null,
        instructions: this.prescriptionItemForm.instructions ? this.prescriptionItemForm.instructions.trim() : null,
        duration_days: this.prescriptionItemForm.duration_days ? parseInt(this.prescriptionItemForm.duration_days) : null
      });
      
      // Réinitialiser le formulaire
      this.prescriptionItemForm = {
        medication_name: '',
        dosage: '',
        form: '',
        administration_route: '',
        quantity: 1,
        frequency: '',
        instructions: '',
        duration_days: ''
      };
      
      this.$toast.success('Médicament ajouté à la prescription');
    },

    removePrescriptionItem(index) {
      this.prescriptionForm.items.splice(index, 1);
    },

    async savePrescription() {
      if (this.prescriptionForm.items.length === 0) {
        this.$toast.warning('Veuillez ajouter au moins un médicament');
        return;
      }
      
      // Validation des champs requis
      if (!this.prescriptionForm.prescription_date) {
        this.$toast.warning('Veuillez saisir la date de prescription');
        return;
      }
      
      this.isSaving = true;
      try {
        // Préparer les données avec formatage correct
        const data = {
          patients_id: this.patient.id,
          prescription_date: this.prescriptionForm.prescription_date,
          notes: this.prescriptionForm.notes || null,
          status: this.prescriptionForm.status || 'active',
          valid_until: this.prescriptionForm.valid_until || null,
          items: this.prescriptionForm.items.map(item => ({
            medication_name: item.medication_name,
            dosage: item.dosage || null,
            form: item.form || null,
            administration_route: item.administration_route || null,
            quantity: parseInt(item.quantity) || 1,
            frequency: item.frequency || null,
            instructions: item.instructions || null,
            duration_days: item.duration_days ? parseInt(item.duration_days) : null
          }))
        };
        
        let res;
        if (this.editingPrescription) {
          res = await dmeService.updatePrescription(this.editingPrescription.id, data);
        } else {
          res = await dmeService.createPrescription(data);
        }
        
        this.$toast.success(res.data.message || 'Prescription enregistrée avec succès');
        $('#prescriptionModal').modal('hide');
        await this.fetchDme();
      } catch (error) {
        console.error('Erreur sauvegarde prescription:', error);
        let errorMessage = 'Erreur lors de l\'enregistrement';
        if (error.response && error.response.data) {
          if (error.response.data.message) {
            errorMessage = error.response.data.message;
          } else if (error.response.data.errors) {
            // Afficher les erreurs de validation
            const errors = error.response.data.errors;
            const firstError = Object.values(errors)[0];
            errorMessage = Array.isArray(firstError) ? firstError[0] : firstError;
          }
        }
        this.$toast.error(errorMessage);
      } finally {
        this.isSaving = false;
      }
    },

    viewPrescription(presc) {
      this.editingPrescription = presc;
      this.prescriptionForm = {
        prescription_date: presc.prescription_date ? moment(presc.prescription_date).format('YYYY-MM-DD') : '',
        notes: presc.notes || '',
        status: presc.status || 'active',
        valid_until: presc.valid_until ? moment(presc.valid_until).format('YYYY-MM-DD') : '',
        items: presc.items || []
      };
      $('#prescriptionModal').modal('show');
    },

    async deletePrescription(id) {
      this.showConfirmDelete('Êtes-vous sûr de vouloir supprimer cette prescription ?', async () => {
        try {
          const res = await dmeService.deletePrescription(id);
          this.$toast.success((res.data && res.data.message) || 'Prescription supprimée avec succès');
          await this.fetchDme();
        } catch (error) {
          console.error('Erreur suppression prescription:', error);
          const errorMessage = (error.response && error.response.data && error.response.data.message) || 'Erreur lors de la suppression de la prescription';
          this.$toast.error(errorMessage);
        }
      });
    },

    getPrescriptionStatusBadge(status) {
      const badges = {
        'active': 'badge-success',
        'completed': 'badge-info',
        'cancelled': 'badge-danger'
      };
      return badges[status] || 'badge-secondary';
    },

    getPrescriptionStatusLabel(status) {
      const labels = {
        'active': 'Active',
        'completed': 'Terminée',
        'cancelled': 'Annulée'
      };
      return labels[status] || status;
    },

    // Documents
    openDocumentModal() {
      this.editingDocument = null;
      this.documentForm = {
        title: '',
        type: 'autre',
        description: '',
        document_date: moment().format('YYYY-MM-DD'),
        file: null
      };
      $('#documentModal').modal('show');
    },

    handleFileSelect(event) {
      this.documentForm.file = event.target.files[0];
      // Mettre à jour le label du fichier
      const label = document.querySelector('label[for="documentFile"]');
      if (label && this.documentForm.file) {
        label.textContent = this.documentForm.file.name;
      }
    },

    async saveDocument() {
      if (!this.documentForm.file) {
        this.$toast.warning('Veuillez sélectionner un fichier');
        return;
      }
      
      this.isSaving = true;
      try {
        const formData = new FormData();
        formData.append('patients_id', this.patient.id);
        formData.append('title', this.documentForm.title);
        formData.append('type', this.documentForm.type);
        formData.append('description', this.documentForm.description || '');
        formData.append('document_date', this.documentForm.document_date);
        formData.append('file', this.documentForm.file);
        
        let res;
        if (this.editingDocument) {
          res = await dmeService.updateDocument(this.editingDocument.id, formData);
        } else {
          res = await dmeService.createDocument(formData);
        }
        
        this.$toast.success(res.data.message || 'Document enregistré avec succès');
        $('#documentModal').modal('hide');
        await this.fetchDme();
      } catch (error) {
        console.error('Erreur sauvegarde document:', error);
        this.$toast.error((error.response && error.response.data && error.response.data.message) || 'Erreur lors de l\'enregistrement');
      } finally {
        this.isSaving = false;
      }
    },

    async downloadDocument(id) {
      try {
        const res = await dmeService.downloadDocument(id);
        
        // Vérifier si la réponse est un blob
        if (res.data instanceof Blob) {
          const blob = res.data;
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          const docItem = this.documents.find(d => d.id === id);
          link.download = docItem ? docItem.file_name : 'document';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          this.$toast.success('Téléchargement démarré');
        } else {
          // Si ce n'est pas un blob, c'est probablement une erreur JSON
          const errorMessage = res.data?.message || res.data?.data?.message || 'Erreur lors du téléchargement';
          this.$toast.error(errorMessage);
        }
      } catch (error) {
        console.error('Erreur téléchargement:', error);
        let errorMessage = 'Erreur lors du téléchargement du document';
        
        if (error.response) {
          const status = error.response.status;
          
          if (error.response.data) {
            // Si c'est un blob d'erreur, essayer de le lire
            if (error.response.data instanceof Blob) {
              try {
                const text = await error.response.data.text();
                try {
                  const json = JSON.parse(text);
                  errorMessage = json.message || json.data?.message || errorMessage;
                } catch (e) {
                  // Ce n'est pas du JSON, utiliser le message par défaut
                }
              } catch (e) {
                console.error('Erreur lecture blob:', e);
              }
            } else if (error.response.data.message) {
              errorMessage = error.response.data.message;
            } else if (error.response.data.data && error.response.data.data.message) {
              errorMessage = error.response.data.data.message;
            }
          }
          
          if (status === 404) {
            errorMessage = errorMessage || 'Document non trouvé. Le fichier peut avoir été supprimé.';
          } else if (status === 500) {
            errorMessage = errorMessage || 'Erreur serveur lors du téléchargement';
          }
        } else if (error.request) {
          errorMessage = 'Impossible de contacter le serveur';
        }
        
        this.$toast.error(errorMessage);
      }
    },

    async deleteDocument(id) {
      this.showConfirmDelete('Êtes-vous sûr de vouloir supprimer ce document ?', async () => {
        try {
          const res = await dmeService.deleteDocument(id);
          this.$toast.success((res.data && res.data.message) || 'Document supprimé avec succès');
          await this.fetchDme();
        } catch (error) {
          console.error('Erreur suppression document:', error);
          const errorMessage = (error.response && error.response.data && error.response.data.message) || 'Erreur lors de la suppression du document';
          this.$toast.error(errorMessage);
        }
      });
    },

    // Méthodes pour le modal de confirmation
    showConfirmDelete(message, callback) {
      this.confirmDeleteMessage = message;
      this.confirmDeleteCallback = callback;
      $('#confirmDeleteModal').modal('show');
    },

    async confirmDeleteAction() {
      if (this.confirmDeleteCallback) {
        try {
          await this.confirmDeleteCallback();
        } catch (error) {
          console.error('Erreur lors de la suppression:', error);
          // L'erreur est déjà gérée dans le callback, on ne fait rien ici
        }
      }
      $('#confirmDeleteModal').modal('hide');
      this.confirmDeleteCallback = null;
    },

    getDocumentIcon(type) {
      const icons = {
        'certificat_medical': 'mdi-certificate',
        'ordonnance': 'mdi-pill',
        'resultat_examen': 'mdi-file-document-outline',
        'compte_rendu': 'mdi-file-document',
        'imagerie': 'mdi-x-ray',
        'laboratoire': 'mdi-test-tube',
        'autre': 'mdi-file'
      };
      return icons[type] || 'mdi-file';
    },

    getDocumentTypeLabel(type) {
      const labels = {
        'certificat_medical': 'Certificat médical',
        'ordonnance': 'Ordonnance',
        'resultat_examen': 'Résultat examen',
        'compte_rendu': 'Compte-rendu',
        'imagerie': 'Imagerie',
        'laboratoire': 'Laboratoire',
        'autre': 'Autre'
      };
      return labels[type] || type;
    },

    formatFileSize(bytes) {
      if (!bytes) return '0 B';
      const k = 1024;
      const sizes = ['B', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    },

    getDoctorName(doctor) {
      if (!doctor) {
        return 'Consultant';
      }
      
      const lastname = doctor.lastname || '';
      const firstname = doctor.firstname || '';
      
      if (!lastname && !firstname) {
        return 'Consultant';
      }
      
      return (lastname + ' ' + firstname).trim() || 'Consultant';
    }
  }
};
</script>

<style scoped>
.shadow-xs { box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
.custom-tabs .nav-link { 
  color: #6c757d; 
  border-radius: 5px; 
  font-weight: 500; 
  margin-right: 5px; 
  border: 1px solid #dee2e6; 
  padding: 0.5rem 1rem;
}
.custom-tabs .nav-link.active { 
  background-color: #0B5D3F !important; 
  color: white !important; 
  border-color: #0B5D3F; 
}
.timeline-body { box-shadow: inset 0 0 10px rgba(0,0,0,0.02); }
.italic { font-style: italic; }
.border-left-primary { border-left: 4px solid #007bff !important; }

/* Skeleton Loader Animation */
@keyframes skeleton-loading {
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
}

.skeleton-loader {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;
  border-radius: 4px;
}

/* Error State Styling */
.alert-danger {
  border-left: 4px solid #dc3545;
}

.alert-danger .alert-heading {
  color: #721c24;
  font-weight: 600;
}

/* Improved Card Styling */
.card {
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
}

/* Avatar Box Enhancement */
.avatar-box {
  transition: transform 0.3s ease;
}

.avatar-box:hover {
  transform: scale(1.05);
}

/* Tab Navigation Enhancement */
.custom-tabs .nav-link {
  transition: all 0.3s ease;
}

.custom-tabs .nav-link:hover:not(.active) {
  background-color: #f8f9fa;
  border-color: #0B5D3F;
  color: #0B5D3F;
}
</style>

<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-lg-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded px-3 py-1 mb-3 text-center"
              style=" background-color: #0B5D3F; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-transform: none;">
              Sortie du Patient
            </h3>

            <div v-if="isLoading" class="text-center p-5">
              <div class="spinner-border text-success" role="status">
                <span class="sr-only">Chargement...</span>
              </div>
            </div>

            <form v-else @submit.prevent="submitRelease">
              <fieldset class="form-group border px-3 py-1">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Résumé du séjour (Lecture seule)</b></legend>
                <div class="row">
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Patient</label>
                      <input type="text" class="form-control" :value="patient.lastname + ' ' + patient.firstname" readonly>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Entrée le</label>
                      <input type="text" class="form-control" :value="format_date(currentMovment.arrivaldate)" readonly>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="form-group">
                      <label>Lit Actuel</label>
                      <input type="text" class="form-control" :value="currentBed ? currentBed.code : 'Aucun'" readonly>
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset class="form-group border px-3 py-1">
                <legend class="w-auto px-2"><b style="font-size: 12px;">Motif de sortie</b></legend>
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Raison de la sortie <span class="text-danger">*</span></label>
                      <select v-model="form.outgoing_reason" class="form-control" required @change="onOutgoingReasonChange">
                        <option value="" disabled>Sélectionner</option>
                        <option value="guérison">Guérison</option>
                        <option value="transfert">Transfert (Autre établissement)</option>
                        <option value="décès">Décès</option>
                        <option value="contre avis médical">Contre avis médical</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label>Destination <span v-if="form.outgoing_reason === 'transfert'" class="text-danger">*</span></label>
                      <input v-model="form.destination" type="text" class="form-control" 
                        :required="form.outgoing_reason === 'transfert'"
                        placeholder="Ex: Domicile, Hôpital X...">
                    </div>
                  </div>
                </div>
                <div v-if="form.outgoing_reason === 'décès'" class="row mt-2">
                  <div class="col-md-12">
                    <div class="alert alert-warning">
                      <strong>Attention :</strong> En cas de décès, des documents spécifiques seront générés automatiquement.
                    </div>
                  </div>
                </div>
              </fieldset>

              <div class="mx-auto text-center mt-3">
                <button type="button" class="btn btn-danger btn-medpay-green mr-2" @click="$router.go(-1)">Annuler</button>
                <button type="submit" class="btn btn-success btn-medpay-green" :disabled="isSubmitting">
                    <span v-if="isSubmitting" class="spinner-border spinner-border-sm mr-2" role="status"></span>
                    Confirmer la sortie finale
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { movmentService } from "@/_services";
import axios from "axios";
import moment from "moment";

export default {
  name: "Release",
  props: ["movment_uuid"],
  data() {
    return {
      isLoading: true,
      isSubmitting: false,
      currentMovment: {},
      patient: {},
      currentBed: null,
      form: {
        movment_uuid: this.movment_uuid,
        outgoing_reason: "",
        destination: ""
      }
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      try {
        const res = await axios.get(`/movments/${this.movment_uuid}`);
        this.currentMovment = res.data.data;
        this.patient = this.currentMovment.patient;
        
        if (this.currentMovment.bed_patients && this.currentMovment.bed_patients.length > 0) {
           const activeStay = this.currentMovment.bed_patients.find(bp => !bp.end_occupation_date);
           if (activeStay) this.currentBed = activeStay.bed;
        }

        this.isLoading = false;
      } catch (error) {
        console.error("Erreur d'initialisation:", error);
        this.$toast.error("Impossible de récupérer le séjour.");
        this.$router.go(-1);
      }
    },

    format_date(value) {
      if (value) return moment(String(value)).format('DD/MM/YYYY HH:mm');
    },

    onOutgoingReasonChange() {
      // Si transfert, destination devient obligatoire
      if (this.form.outgoing_reason === 'transfert' && !this.form.destination) {
        // Le champ sera marqué comme required dans le template
      }
    },

    async submitRelease() {
      // Validation
      if (!this.form.outgoing_reason) {
        this.$toast.error("Veuillez sélectionner une raison de sortie");
        return;
      }
      
      if (this.form.outgoing_reason === 'transfert' && !this.form.destination) {
        this.$toast.error("La destination est obligatoire pour un transfert");
        return;
      }
      
      const confirmMessage = this.form.outgoing_reason === 'décès'
        ? "⚠️ ATTENTION : Vous confirmez le décès du patient. Cette action est irréversible. Continuer ?"
        : "Voulez-vous clôturer ce séjour ?";
      
      if (!confirm(confirmMessage)) return;
      
      this.isSubmitting = true;
      try {
        const response = await movmentService.releasePatient(this.form);
        
        // Afficher les informations sur les documents générés
        if (response.data && response.data.documents) {
          const docs = response.data.documents;
          let message = "Sortie enregistrée avec succès !\n\nDocuments générés :";
          
          if (docs.certificat_sortie) {
            message += `\n- Certificat de sortie`;
          }
          if (docs.resume_sejour) {
            message += `\n- Résumé de séjour (${docs.resume_sejour.duration_days} jour(s))`;
          }
          if (docs.certificat_deces) {
            message += `\n- Certificat de décès`;
          }
          
          alert(message);
        } else {
          this.$toast.success("Sortie enregistrée avec succès !");
        }
        
        this.$router.push("/movments/list");
      } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || "Erreur de sortie.";
        this.$toast.error(message);
      } finally {
        this.isSubmitting = false;
      }
    }
  }
};
</script>

<style>
fieldset {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: #f5f5f5;
  padding: 16px;
}
.btn-medpay-green {
    font-weight: bold;
}
</style>

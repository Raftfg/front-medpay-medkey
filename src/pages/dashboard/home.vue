<template>
  <section class="dashboard pb-5">
    <div class="page-header">
      <nav aria-label="breadcrumb"></nav>
    </div>
    <div class="row mb-4">
      <div v-if="showModule('Voir_module_patient')" class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3">
        <div class="card card-img-holder text-black text-center module-card">
          <router-link to="/patients/list" class="card-link">
            <img 
              src="@/assets/images/patients.png" 
              class="module-icon mt-3 mb-2" 
              alt="Patients"
              loading="lazy"
              width="64"
              height="64"
            />
            <div class="p-2 text-center">
              <h6 class="font-weight-bold text-black module-title">Patients</h6>
            </div>
          </router-link>
        </div>
      </div>
<div v-else class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3 locked-module" @click="openPricingModal">
        <div class="card card-img-holder text-black text-center module-card">
          <img 
              src="@/assets/images/patients.png" 
              class="module-icon mt-3 mb-2 locked-icon" 
              alt="Patients"
            loading="lazy"
            width="64"
            height="64"
          />
          <div class="p-2 text-center">
            <h6 class="font-weight-bold text-black module-title">Patients</h6>
          </div>
        </div>
      </div>
      <div v-if="showModule('Voir_module_mouvement')" class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3">
        <div class="card card-img-holder text-black text-center module-card">
          <router-link to="/movments/list" class="card-link">
            <img 
              src="@/assets/images/movment.png" 
              class="module-icon mt-3 mb-2" 
              alt="Mouvements"
              loading="lazy"
              width="64"
              height="64"
            />
            <div class="p-2 text-center">
              <h6 class="font-weight-bold text-black module-title">Mouvements</h6>
            </div>
          </router-link>
        </div>
      </div>

      <div v-else class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3 locked-module" @click="openPricingModal">
        <div class="card card-img-holder text-black text-center module-card">
          <img 
            src="@/assets/images/movment.png" 
            class="module-icon mt-3 mb-2 locked-icon" 
            alt="Mouvements"
            loading="lazy"
            width="64"
            height="64"
          />
          <div class="p-2 text-center">
            <h6 class="font-weight-bold text-black module-title">Mouvements</h6>
          </div>
        </div>
      </div>

      <div v-if="showModule('Voir_module_Service')" class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3">
        <div class="card card-img-holder text-black text-center module-card">
          <router-link to="/medical-services/urgences" class="card-link">
            <img src="@/assets/images/actsmedicaux.png" class="module-icon mt-3 mb-2" alt="Services Médicaux" />
            <div class="p-2 text-center">
              <h6 class="font-weight-bold text-black module-title">Services Médicaux</h6>
            </div>
          </router-link>
        </div>
      </div>

      <div v-else class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3 locked-module" @click="openPricingModal">
        <div class="card card-img-holder text-black text-center module-card">
          <img 
            src="@/assets/images/actsmedicaux.png" 
            class="module-icon mt-3 mb-2 locked-icon" 
            alt="Services Médicaux"
            loading="lazy"
            width="64"
            height="64"
          />
          <div class="p-2 text-center">
            <h6 class="font-weight-bold text-black module-title">Services Médicaux</h6>
          </div>
        </div>
      </div>

      <div v-if="showModule('Voir_module_pharmacie')" class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3">
        <div class="card card-img-holder text-black text-center module-card">
          <button @click="selectCashRegisterP" class="bien w-100 h-100 border-0 bg-transparent p-0">
            <img src="@/assets/images/pharmacie.png" class="module-icon mt-3 mb-2" alt="Pharmacies" />
            <div class="p-2 text-center">
              <h6 class="font-weight-bold text-black module-title">Pharmacies</h6>
            </div>
          </button>
        </div>
      </div>
      <div v-else class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3 locked-module" @click="openPricingModal">
        <div class="card card-img-holder text-black text-center module-card">
          <img src="@/assets/images/pharmacie.png" class="module-icon mt-3 mb-2 locked-icon" alt="Pharmacies" />
          <div class="p-2 text-center">
            <h6 class="font-weight-bold text-black module-title">Pharmacies</h6>
          </div>
        </div>
      </div>

      <div v-if="showModule('Voir_module_caisse')" class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3">
        <div class="card card-img-holder text-black text-center module-card">
          <button @click="selectCashRegisterA" class="bien w-100 h-100 border-0 bg-transparent p-0">
            <img src="@/assets/images/treasury.png" class="module-icon mt-3 mb-2" alt="Caisses" />
            <div class="p-2 text-center">
              <h6 class="font-weight-bold text-black module-title">Caisses</h6>
            </div>
          </button>
        </div>
      </div>
      <div v-else class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3 locked-module" @click="openPricingModal">
        <div class="card card-img-holder text-black text-center module-card">
          <img src="@/assets/images/treasury.png" class="module-icon mt-3 mb-2 locked-icon" alt="Caisses" />
          <div class="p-2 text-center">
            <h6 class="font-weight-bold text-black module-title">Caisses</h6>
          </div>
        </div>
      </div>
      <div v-if="showModule('Voir_module_facturation')" class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3">
        <div class="card card-img-holder text-black text-center module-card">
          <router-link to="/service/facturation" class="card-link">
            <img src="@/assets/images/facture.png" class="module-icon mt-3 mb-2" alt="Facturations" />
            <div class="p-2 text-center">
              <h6 class="font-weight-bold text-black module-title">Facturations</h6>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3 locked-module" @click="openPricingModal">
        <div class="card card-img-holder text-black text-center module-card">
          <img src="@/assets/images/facture.png" class="module-icon mt-3 mb-2 locked-icon" alt="Facturations" />
          <div class="p-2 text-center">
            <h6 class="font-weight-bold text-black module-title">Facturations</h6>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <div v-if="showModule('Voir_module_hospitalisation')" class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3">
        <div class="card card-img-holder text-black text-center module-card">
          <router-link to="/hospitalization/bed/list" class="card-link">
            <img src="@/assets/images/hopital.png" class="module-icon mt-3 mb-2" alt="Hospitalisations" />
            <div class="p-2 text-center">
              <h6 class="font-weight-bold text-black module-title">Hospitalisations</h6>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3 locked-module" @click="openPricingModal">
        <div class="card card-img-holder text-black text-center module-card">
          <img src="@/assets/images/hopital.png" class="module-icon mt-3 mb-2 locked-icon" alt="Hospitalisations" />
          <div class="p-2 text-center">
            <h6 class="font-weight-bold text-black module-title">Hospitalisations</h6>
          </div>
        </div>
      </div>
      <div v-if="showModule('Voir_module_Recouvrement')" class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3">
        <div class="card card-img-holder text-black text-center module-card">
          <router-link to="/rembourse_recouvre/recouvrement_patient" class="card-link">
            <img src="@/assets/images/money-flow.png" class="module-icon mt-3 mb-2" alt="Recouvrements" />
            <div class="px-2 py-2 text-center">
              <h6 class="font-weight-bold text-black module-title">Recouvrements et Remboursements</h6>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3 locked-module" @click="openPricingModal">
        <div class="card card-img-holder text-black text-center module-card">
          <img src="@/assets/images/money-flow.png" class="module-icon mt-3 mb-2 locked-icon" alt="Recouvrements" />
          <div class="p-2 text-center">
            <h6 class="font-weight-bold text-black module-title">Recouvrements et Remboursements</h6>
          </div>
        </div>
      </div>

      <div v-if="showModule('Voir_module_stock')" class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3">
        <div class="card card-img-holder text-black text-center module-card">
          <router-link to="/medicaments/list" class="card-link">
            <img src="@/assets/images/package.png" class="module-icon mt-3 mb-2" alt="Stocks" />
            <div class="px-2 py-2 text-center">
              <h6 class="font-weight-bold text-black module-title">Stocks / Consommables</h6>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3 locked-module" @click="openPricingModal">
        <div class="card card-img-holder text-black text-center module-card">
          <img src="@/assets/images/package.png" class="module-icon mt-3 mb-2 locked-icon" alt="Stocks" />
          <div class="p-2 text-center">
            <h6 class="font-weight-bold text-black module-title">Stocks / Consommables</h6>
          </div>
        </div>
      </div>
      <div v-if="showModule('Voir_module_Ressources')" class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3">
        <div class="card card-img-holder text-black text-center module-card">
          <router-link to="/grh/list" class="card-link">
            <img src="@/assets/images/teamwork.png" class="module-icon mt-3 mb-2" alt="Ressources Humaines" />
            <div class="px-2 py-2 text-center">
              <h6 class="font-weight-bold text-black module-title">Ressources Humaines</h6>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3 locked-module" @click="openPricingModal">
        <div class="card card-img-holder text-black text-center module-card">
          <img src="@/assets/images/teamwork.png" class="module-icon mt-3 mb-2 locked-icon" alt="Ressources Humaines" />
          <div class="p-2 text-center">
            <h6 class="font-weight-bold text-black module-title">Ressources Humaines</h6>
          </div>
        </div>
      </div>
      <div v-if="showModule('Voir_module_assurance')" class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3">
        <div class="card card-img-holder text-black text-center module-card">
          <router-link to="priseencharge/list" class="card-link">
            <img src="@/assets/images/assurancee.png" class="module-icon mt-3 mb-2" alt="Assurances" />
            <div class="p-2 text-center">
              <h6 class="font-weight-bold text-black module-title">Assurances</h6>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3 locked-module" @click="openPricingModal">
        <div class="card card-img-holder text-black text-center module-card">
          <img src="@/assets/images/assurancee.png" class="module-icon mt-3 mb-2 locked-icon" alt="Assurances" />
          <div class="p-2 text-center">
            <h6 class="font-weight-bold text-black module-title">Assurances</h6>
          </div>
        </div>
      </div>

      <div v-if="showModule('Voir_module_rendezvous')" class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3">
        <div class="card card-img-holder text-black text-center module-card">
          <router-link to="/rendezvous/planning" class="card-link">
            <img src="@/assets/images/calendrier.png" class="module-icon mt-3 mb-2" alt="Rendez-vous" />
            <div class="p-2 text-center">
              <h6 class="font-weight-bold text-black module-title">Rendez-vous</h6>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3 locked-module" @click="openPricingModal">
        <div class="card card-img-holder text-black text-center module-card">
          <img src="@/assets/images/calendrier.png" class="module-icon mt-3 mb-2 locked-icon" alt="Rendez-vous" />
          <div class="p-2 text-center">
            <h6 class="font-weight-bold text-black module-title">Rendez-vous</h6>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-2">
      <div v-if="showModule('Voir_module_Rapport')" class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3">
        <div class="card card-img-holder text-center bg-success module-card">
          <router-link to="/rapport_statistique/list" class="card-link">
            <img src="@/assets/images/data-report.png" class="module-icon mt-3 mb-2" alt="Rapports" />
            <div class="py-2 px-2 text-center">
              <h6 class="font-weight-bold text-white module-title">Rapports et Statistiques</h6>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3 locked-module" @click="openPricingModal">
        <div class="card card-img-holder text-black text-center module-card">
          <img src="@/assets/images/data-report.png" class="module-icon mt-3 mb-2 locked-icon" alt="Rapports" />
          <div class="p-2 text-center">
            <h6 class="font-weight-bold text-black module-title">Rapports et Statistiques</h6>
          </div>
        </div>
      </div>

      <div v-if="showModule('Voir_module_Configuration')" class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3">
        <div class="card card-img-holder text-black text-center bg-danger module-card">
          <router-link to="/configuration/store/list" class="card-link">
            <img src="@/assets/images/parametrage.png" class="module-icon mt-3 mb-2" alt="Configuration" />
            <div class="px-2 py-2 text-center">
              <h6 class="font-weight-bold text-white module-title">Configuration et Paramétrage</h6>
            </div>
          </router-link>
        </div>
      </div>
      <div v-else class="col-6 col-sm-4 col-md-3 col-lg-2 mb-3 locked-module" @click="openPricingModal">
        <div class="card card-img-holder text-black text-center module-card">
          <img src="@/assets/images/parametrage.png" class="module-icon mt-3 mb-2 locked-icon" alt="Configuration" />
          <div class="p-2 text-center">
            <h6 class="font-weight-bold text-black module-title">Configuration et Paramétrage</h6>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="selectcashprestation" tabindex="-1" role="dialog" aria-labelledby="selectCashModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header" style="background-color: #0b5d3f; color: white;">
            <h5 class="modal-title" id="selectCashModalLabel">Choisir une caisse</h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="forms-sample">
              <div class="form-group">
                <label for="cashRegisterSelectA">Caisses <span class="text-danger">*</span></label>
                <select 
                  v-model="selectedCashRegisterA" 
                  class="form-control form-control-lg" 
                  id="cashRegisterSelectA"
                >
                  <option value="">Sélectionner</option>
                  <option v-for="cashRegister in listCashRegisterA" :value="cashRegister.id" :key="cashRegister.id">
                    {{ cashRegister.designation }}
                  </option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Annuler
            </button>
            <button type="button" @click="chooseCashRegisterA" class="btn btn-success">
              Continuer
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal fade" id="selectcashpharmacie" tabindex="-1" role="dialog" aria-labelledby="selectCashPharmaModalLabel"
      aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header" style="background-color: #0b5d3f; color: white;">
            <h5 class="modal-title" id="selectCashPharmaModalLabel">Choisir une caisse</h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form class="forms-sample">
              <div class="form-group">
                <label for="cashRegisterSelectP">Caisses <span class="text-danger">*</span></label>
                <select 
                  v-model="selectedCashRegisterP" 
                  class="form-control form-control-lg" 
                  id="cashRegisterSelectP"
                >
                  <option value="">Sélectionner</option>
                  <option v-for="cashRegister in listCashRegisterP" :value="cashRegister.id" :key="cashRegister.id">
                    {{ cashRegister.designation }}
                  </option>
                </select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Annuler
            </button>
            <button type="button" @click="chooseCashRegisterP" class="btn btn-success">
              Continuer
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Plans tarifaires (comme sur la landing) -->
    <div class="modal fade" id="pricingPlansModal" tabindex="-1" role="dialog" aria-labelledby="pricingPlansModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header" style="background-color: #0b5d3f; color: white;">
            <h5 class="modal-title" id="pricingPlansModalLabel">{{ $t('pricing.section.pre_title') }} – {{ $t('pricing.section.subtitle') }}</h5>
            <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body p-4">
            <p class="text-muted mb-4">{{ $t('pricing.section.subtitle') }}</p>
            <div class="row">
              <div v-for="(plan, idx) in pricingPlans" :key="idx" class="col-12 col-md-6 col-xl-3 mb-3">
                <div class="card h-100 border shadow-sm" :class="{ 'border-primary': plan.featured }">
                  <div class="card-body">
                    <h5 class="card-title">{{ plan.name }}</h5>
                    <p class="text-muted small mb-2">{{ plan.subtitle }}</p>
                    <div class="mb-2">
                      <span v-if="plan.isCustom" class="h4">{{ plan.price }}</span>
                      <span v-else class="h4">{{ plan.priceDisplay }}</span>
                      <span v-if="!plan.isCustom" class="text-muted small"> {{ $t('pricing.section.per_month') }}</span>
                    </div>
                    <p class="small text-muted">{{ plan.target }}</p>
                    <ul class="list-unstyled small">
                      <li v-for="(feat, fIdx) in plan.features" :key="fIdx" class="mb-1">
                        <i class="bi bi-check-circle-fill text-success mr-1"></i>{{ feat }}
                      </li>
                    </ul>
                  </div>
                  <div class="card-footer bg-transparent border-0">
                    <a :href="landingPricingUrl" target="_blank" rel="noopener" class="btn btn-outline-primary btn-sm btn-block">{{ $t('pricing.section.cta_select') }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
            <a :href="landingPricingUrl" target="_blank" rel="noopener" class="btn btn-success">Voir les offres sur le site</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import $ from "jquery";
import "../../../node_modules/bootstrap/dist/js/bootstrap.js"; // tres important pour le modal
import "../../../node_modules/bootstrap/dist/js/bootstrap.min.js"; // tres important pour le modal

import { useToast, POSITION } from "vue-toastification";
import { caisseService } from "@/_services";

export default {
  name: "acceuil",
  data() {
    return {
      time1: null,
      selectedCashRegisterA: "",
      selectedCashRegisterP: "",
      listCashRegister: [],
      listCashRegisterA: [],
      listCashRegisterP: [],
      // permission: JSON.parse(localStorage.getItem("permission")),
      user: JSON.parse(localStorage.getItem("user")) || null,
      permission: JSON.parse(localStorage.getItem("permission")) || [], // Initialisation avec un tableau vide
      freePlanModules: ["Voir_module_patient", "Voir_module_mouvement", "Voir_module_pharmacie", "Voir_module_caisse"],
      // accessToken: JSON.parse(localStorage.getItem("access_token")) || null,
    };
  },

  computed: {
    isFreePlan() {
      const u = this.user;
      return !!(u && (u.plan === "free" || u.plan === "trial"));
    },
    landingPricingUrl() {
      return process.env.VUE_APP_LANDING_URL || window.location.origin + "/#pricing-1" || "#pricing-1";
    },
    pricingPlans() {
      return [
        {
          id: "free",
          name: this.$t("pricing.plans.free.name"),
          subtitle: this.$t("pricing.plans.free.subtitle"),
          price: this.$t("pricing.plans.free.price"),
          priceDisplay: this.$t("pricing.plans.free.price") + this.$t("pricing.section.currency"),
          target: this.$t("pricing.plans.free.target"),
          features: this.getPlanFeatures("free"),
          featured: false,
          isCustom: false
        },
        {
          id: "essential",
          name: this.$t("pricing.plans.essential.name"),
          subtitle: this.$t("pricing.plans.essential.subtitle"),
          priceFrom: this.$t("pricing.plans.essential.price_from"),
          priceTo: this.$t("pricing.plans.essential.price_to"),
          priceDisplay: this.$t("pricing.plans.essential.price_from") + " – " + this.$t("pricing.plans.essential.price_to") + this.$t("pricing.section.currency"),
          target: this.$t("pricing.plans.essential.target"),
          features: this.getPlanFeatures("essential"),
          featured: false,
          isCustom: false
        },
        {
          id: "professional",
          name: this.$t("pricing.plans.professional.name"),
          subtitle: this.$t("pricing.plans.professional.subtitle"),
          priceFrom: this.$t("pricing.plans.professional.price_from"),
          priceTo: this.$t("pricing.plans.professional.price_to"),
          priceDisplay: this.$t("pricing.plans.professional.price_from") + " – " + this.$t("pricing.plans.professional.price_to") + this.$t("pricing.section.currency"),
          target: this.$t("pricing.plans.professional.target"),
          features: this.getPlanFeatures("professional"),
          featured: true,
          isCustom: false
        },
        {
          id: "enterprise",
          name: this.$t("pricing.plans.enterprise.name"),
          subtitle: this.$t("pricing.plans.enterprise.subtitle"),
          price: this.$t("pricing.plans.enterprise.price"),
          priceDisplay: this.$t("pricing.plans.enterprise.price"),
          target: this.$t("pricing.plans.enterprise.target"),
          features: this.getPlanFeatures("enterprise"),
          featured: false,
          isCustom: true
        }
      ];
    }
  },
  mounted() {
    // L'appel API pour charger les caisses est maintenant fait de manière lazy
    // seulement quand l'utilisateur ouvre un modal (selectCashRegisterA ou selectCashRegisterP)
    // this.getCashRegisterCashier();
  },

  methods: {
    isFreePlanModule(perm) {
      return this.freePlanModules.includes(perm);
    },
    showModule(perm) {
      return this.hasPermission(perm) && (!this.isFreePlan || this.isFreePlanModule(perm));
    },
    hasPermission(permission) {
      if (!this.permission) return false;
      const permissionLower = permission.toLowerCase();
      return this.permission.some(p => p.toLowerCase() === permissionLower);
    },
    getPlanFeatures(planId) {
      const featuresObj = this.$t("pricing.plans." + planId + ".features", { returnObjects: true });
      if (typeof featuresObj === "object" && featuresObj !== null) {
        return Object.values(featuresObj);
      }
      return [];
    },
    openPricingModal() {
      this.$nextTick(() => {
        $("#pricingPlansModal").modal("show");
      });
    },

    // Méthode pour charger les caisses de manière lazy
    loadCashRegisters() {
      // Si les listes sont déjà chargées, ne pas refaire l'appel
      if (this.listCashRegisterA.length > 0 || this.listCashRegisterP.length > 0) {
        return Promise.resolve();
      }

      return caisseService
        .getAllCaisse()
        .then((response) => {
          console.log(response.data.data);
          this.listCashRegister = response.data.data;

          this.listCashRegisterA = this.listCashRegister.filter(
            (item) => item.type == "A"
          );
          this.listCashRegisterP = this.listCashRegister.filter(
            (item) => item.type == "P"
          );
        })
        .catch((error) => {
          console.log(error);
        });
    },

    selectCashRegisterA() {
      const user_id = this.user.id;
      
      // Charger les caisses seulement quand on ouvre le modal
      this.loadCashRegisters().then(() => {
        $("#selectcashprestation").modal("show");
      });
    },

    selectCashRegisterP() {
      const user_id = this.user.id;
      
      // Charger les caisses seulement quand on ouvre le modal
      this.loadCashRegisters().then(() => {
        $("#selectcashpharmacie").modal("show");
      });
    },

    chooseCashRegisterA() {
      if (this.selectedCashRegisterA == "") {
        this.$toast.error("Selectionnez une caisse !", {
          position: "top-right",
          timeout: 3000,
          style: {
            background: "#ff0000", // Couleur de fond rouge pour l'erreur
            color: "#fff", // Couleur du texte
            fontWeight: "bold",
          },
        });
      } else {
        console.log("this.selectedCashRegister");
        console.log(this.selectedCashRegisterA);

        const user_id = this.user.id;
        caisseService
          .chooseCashRegister(this.selectedCashRegisterA, user_id)
          .then((response) => {
            console.log("Caisse selectionnée");
            console.log(response.data.data);

            // Remplacez '/nouvelle-page' par le chemin de la page vers laquelle vous souhaitez rediriger.
            this.$toast.success("Caisse selectionnée avec succès !", {
              position: POSITION.TOP_RIGHT,
              timeout: 3000,
              bodyStyle: {
                borderRadius: "10px",
                backgroundColor: "#f0f0f0",
                color: "#333",
                fontWeight: "bold",
              },
            });

            // this.$router.push('/payement/create');
            this.$router.push("/caisse/payement");
            $("#selectcashprestation").modal("hide");
            // this.listCashRegisterCashier = response.data.data;
          })
          .catch((error) => {
            console.log(error);

            if (error.response.status == 422 && error.response.data.error) {
              this.$toast.error(error.response.data.error, {
                position: "top-right",
                timeout: 3000,
                style: {
                  background: "#ff0000",
                  color: "#fff",
                  fontWeight: "bold",
                },
              });
            } else {
              // Gérez d'autres erreurs ici
              console.error("Une erreur inattendue s'est produite :", error);
            }

          });
      }
    },


    chooseCashRegisterP() {
      if (this.selectedCashRegisterP == "") {
        this.$toast.error("Selectionnez une caisse !", {
          position: "top-right",
          timeout: 3000,
          style: {
            background: "#ff0000", // Couleur de fond rouge pour l'erreur
            color: "#fff", // Couleur du texte
            fontWeight: "bold",
          },
        });
      } else {
        const user_id = this.user.id;
        caisseService
          .chooseCashRegister(this.selectedCashRegisterP, user_id)
          .then((response) => {
            console.log("Caisse selectionnée");
            console.log(response.data.data);

            // Remplacez '/nouvelle-page' par le chemin de la page vers laquelle vous souhaitez rediriger.
            this.$toast.success("Caisse selectionnée avec succès !", {
              position: POSITION.TOP_RIGHT,
              timeout: 3000,
              bodyStyle: {
                borderRadius: "10px",
                backgroundColor: "#f0f0f0",
                color: "#333",
                fontWeight: "bold",
              },
            });

            // this.$router.push('/payement/create');
            this.$router.push("/pharmacy/sale");
            $("#selectcashpharmacie").modal("hide");
            // this.listCashRegisterCashier = response.data.data;
          })
          .catch((error) => {
            console.log(error);

            if (error.response.status == 422 && error.response.data.error) {
              this.$toast.error(error.response.data.error, {
                position: "top-right",
                timeout: 3000,
                style: {
                  background: "#ff0000",
                  color: "#fff",
                  fontWeight: "bold",
                },
              });
            } else {
              // Gérez d'autres erreurs ici
              console.error("Une erreur inattendue s'est produite :", error);
            }

          });
      }
    },
  },
};
</script>
<!-- <script>
export default {
  name: "acceuil",
  data() {
    return {
      time1: null,
      user: null,
    };
  },
  mounted() {
    this.fetchUserFromLocalStorage();
  },
  computed: {
    isUserRoleAdmin() {
      return (id) => this.user && this.user.role_id && this.user.role_id === id;
    },
  },
  methods: {
    fetchUserFromLocalStorage() {
      const user = localStorage.getItem("user");
      if (user) {
        this.user = JSON.parse(user);
      }
    },
  },
};
</script> -->

<style scoped>
/* Styles pour les cartes de modules */
.module-card {
  min-height: 130px;
  transition: all 0.3s ease;
  border: 1px solid #e0e0e0;
  cursor: pointer;
}

.module-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: #0b5d3f;
}

.module-icon {
  width: 25%;
  max-width: 60px;
  height: auto;
  display: block;
  margin: 0 auto;
}

.module-title {
  font-size: 0.9rem;
  line-height: 1.3;
  word-wrap: break-word;
  margin-bottom: 0;
}

.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.card-link:hover {
  text-decoration: none;
  color: inherit;
}

.text-black:hover {
  transition: 0.3s;
  background: #a5ddbe;
}

.bien {
  border: none;
  background: #fff;
  transition: background 0.3s;
  width: 100%;
  height: 100%;
  padding: 0;
}

.bien:hover {
  background: rgb(165, 221, 190);
}

/* Modules grisés (hors plan gratuit ou sans permission) : cliquables pour ouvrir la modal tarifs */
.locked-module {
  opacity: 0.65;
  cursor: pointer;
  filter: grayscale(0.4);
}

.locked-module:hover {
  opacity: 0.9;
  filter: grayscale(0.1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.locked-icon {
  opacity: 0.75;
}

/* Responsive styles */
@media (max-width: 575.98px) {
  .module-card {
    min-height: 110px;
  }
  
  .module-icon {
    width: 30%;
    max-width: 50px;
  }
  
  .module-title {
    font-size: 0.75rem;
    padding: 0.25rem;
  }
  
  .dashboard {
    padding: 0.5rem;
  }
}

@media (min-width: 576px) and (max-width: 767.98px) {
  .module-card {
    min-height: 120px;
  }
  
  .module-icon {
    width: 28%;
    max-width: 55px;
  }
  
  .module-title {
    font-size: 0.85rem;
  }
}

@media (min-width: 768px) and (max-width: 991.98px) {
  .module-card {
    min-height: 125px;
  }
  
  .module-icon {
    width: 26%;
    max-width: 58px;
  }
}

@media (min-width: 992px) {
  .module-card {
    min-height: 130px;
  }
}

/* Amélioration des modals pour mobile */
@media (max-width: 575.98px) {
  .modal-dialog {
    margin: 0.5rem;
  }
  
  .modal-content {
    border-radius: 0.5rem;
  }
  
  .modal-header h5 {
    font-size: 1rem;
  }
  
  .form-control-lg {
    font-size: 1rem;
    padding: 0.5rem;
  }
  
  .modal-footer {
    flex-direction: column;
  }
  
  .modal-footer .btn {
    width: 100%;
    margin: 0.25rem 0;
  }
}

/* Amélioration pour tablettes */
@media (min-width: 576px) and (max-width: 991.98px) {
  .modal-dialog {
    max-width: 500px;
  }
}
</style>

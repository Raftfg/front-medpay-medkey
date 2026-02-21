<template>
  <!-- Start pricing Section-->
  <section class="pricing mega-section" id="pricing-1">
    <div class="container">
      <div class="sec-heading">
        <div class="content-area">
          <span class="pre-title wow fadeInUp" data-wow-delay=".2s">{{ $t('pricing.section.pre_title') }}</span>
          <h2 class="title wow fadeInUp" data-wow-delay=".4s">
            <span class='hollow-text'>{{ $t('pricing.section.title') }}</span> {{ $t('pricing.section.pre_title') }}
          </h2>
          <p class="subtitle wow fadeInUp" data-wow-delay=".6s">{{ $t('pricing.section.subtitle') }}</p>
        </div>
        <div class="cta-area wow fadeInUp" data-wow-delay=".8s">
          <router-link class="cta-btn btn-solid" to="/pricing">
            {{ $t('pricing.section.cta_see_all') }}<i class="bi bi-arrow-right icon"></i>
          </router-link>
        </div>
      </div>
      <div class="row">
        <!--Plans-->
        <div v-for="(plan, idx) in plans" :key="idx" class="col-12 col-md-6 col-xl-3 mx-auto price-plan">
          <div :class="['plan wow fadeInUp', { featured: plan.featured }]" :data-wow-delay="plan.delay">
            <div v-if="plan.featured" class="plan-badge">{{ $t('pricing.comparison.professional') }}</div>
            <div class="plan-head">
              <i :class="plan.icon + ' plan-icon'"></i>
              <h4 class="plane-name">{{ plan.name }}</h4>
              <p class="plan-subtitle">{{ plan.subtitle }}</p>
              <div class="plan-price">
                <h3 class="price" v-if="plan.isCustom">
                  {{ plan.price }}
                </h3>
                <h3 class="price" v-else-if="plan.priceFrom">
                  {{ plan.priceFrom }}<sup class="currency-symbol">{{ plan.currency }}</sup>
                </h3>
                <h3 class="price" v-else>
                  {{ plan.price }}<sup class="currency-symbol">{{ plan.currency }}</sup>
                </h3>
                <span class="per" v-if="!plan.isCustom">{{ $t('pricing.section.per_month') }}</span>
              </div>
              <p class="plan-target">{{ plan.target }}</p>
            </div>
            <div class="plan-details">
              <ul class="plan-list">
                <li v-for="(feat, fIdx) in plan.features" :key="fIdx" class="plan-feat">
                  <i class="bi bi-check-circle-fill feat-icon"></i>
                  <span class="feat-text">{{ feat }}</span>
                </li>
              </ul>
            </div>
            <div class="plan-cta">
              <a class="cta-btn btn-outline" href="#0">{{ $t('pricing.section.cta_select') }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End pricing Section-->
</template>

<script>
export default {
  name: "FlexItPricingSection",
  computed: {
    plans() {
      return [
        {
          id: 'free',
          name: this.$t('pricing.plans.free.name'),
          subtitle: this.$t('pricing.plans.free.subtitle'),
          price: this.$t('pricing.plans.free.price'),
          currency: this.$t('pricing.section.currency'),
          target: this.$t('pricing.plans.free.target'),
          features: this.getTranslatedFeatures('free'),
          limitations: this.getTranslatedLimitations('free'),
          icon: 'flaticon-nft-1',
          delay: '.1s',
          featured: false,
          isCustom: false
        },
        {
          id: 'essential',
          name: this.$t('pricing.plans.essential.name'),
          subtitle: this.$t('pricing.plans.essential.subtitle'),
          priceFrom: this.$t('pricing.plans.essential.price_from'),
          priceTo: this.$t('pricing.plans.essential.price_to'),
          currency: this.$t('pricing.section.currency'),
          target: this.$t('pricing.plans.essential.target'),
          features: this.getTranslatedFeatures('essential'),
          benefits: this.getTranslatedBenefits('essential'),
          icon: 'flaticon-virtual-reality',
          delay: '.3s',
          featured: false,
          isCustom: false
        },
        {
          id: 'professional',
          name: this.$t('pricing.plans.professional.name'),
          subtitle: this.$t('pricing.plans.professional.subtitle'),
          priceFrom: this.$t('pricing.plans.professional.price_from'),
          priceTo: this.$t('pricing.plans.professional.price_to'),
          currency: this.$t('pricing.section.currency'),
          target: this.$t('pricing.plans.professional.target'),
          features: this.getTranslatedFeatures('professional'),
          benefits: this.getTranslatedBenefits('professional'),
          icon: 'flaticon-box',
          delay: '.5s',
          featured: true,
          isCustom: false
        },
        {
          id: 'enterprise',
          name: this.$t('pricing.plans.enterprise.name'),
          subtitle: this.$t('pricing.plans.enterprise.subtitle'),
          price: this.$t('pricing.plans.enterprise.price'),
          currency: '',
          target: this.$t('pricing.plans.enterprise.target'),
          features: this.getTranslatedFeatures('enterprise'),
          icon: 'flaticon-basic-shapes',
          delay: '.6s',
          featured: false,
          isCustom: true
        }
      ];
    }
  },
  methods: {
    getTranslatedFeatures(planId) {
      const featuresObj = this.$t(`pricing.plans.${planId}.features`, { returnObjects: true });
      if (typeof featuresObj === 'object' && featuresObj !== null) {
        return Object.values(featuresObj);
      }
      return [];
    },
    getTranslatedLimitations(planId) {
      try {
        const limitationsObj = this.$t(`pricing.plans.${planId}.limitations`, { returnObjects: true });
        if (typeof limitationsObj === 'object' && limitationsObj !== null) {
          return Object.values(limitationsObj);
        }
      } catch (e) {
        // Plan doesn't have limitations
      }
      return [];
    },
    getTranslatedBenefits(planId) {
      try {
        const benefitsObj = this.$t(`pricing.plans.${planId}.benefits`, { returnObjects: true });
        if (typeof benefitsObj === 'object' && benefitsObj !== null) {
          return Object.values(benefitsObj);
        }
      } catch (e) {
        // Plan doesn't have benefits
      }
      return [];
    }
  }
};
</script>

<style scoped>
/* Section pricing : présentation et lisibilité */
#pricing-1.pricing {
  padding-top: 2rem;
  padding-bottom: 3rem;
}

#pricing-1 .sec-heading .content-area,
#pricing-1 .subtitle,
#pricing-1 .plan-head,
#pricing-1 .plan-details,
#pricing-1 .plan-list,
#pricing-1 .plan-target,
#pricing-1 .feat-text,
#pricing-1 .limitation-text,
#pricing-1 .benefit-text {
  text-align: left !important;
}

#pricing-1 .plan {
  text-align: left;
  min-width: 240px;
}

#pricing-1 .price-plan {
  margin-bottom: 1.5rem;
}

#pricing-1 .plan .plan-head,
#pricing-1 .plan .plan-details {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

/* Réduire l'espace entre les modules pour tous les plans */
#pricing-1 .plan .plan-list {
  padding: 0.5rem 0 !important;
  margin-bottom: 0.75rem !important;
}

#pricing-1 .plan .plan-list .plan-feat {
  padding: 0.25rem 0 !important;
  min-height: auto !important;
}

/* Éviter toute coupure de texte : overflow visible partout */
#pricing-1.pricing,
#pricing-1 .plan,
#pricing-1 .plan-head,
#pricing-1 .plan-details,
#pricing-1 .plan-price {
  overflow: visible !important;
}

/* Largeur min des cartes pour que le contenu ne soit pas serré */
#pricing-1 .price-plan {
  min-width: 0;
}

#pricing-1 .plan .plan-price {
  width: 100%;
  max-width: 100%;
}

.plan .price {
  background: transparent !important;
  color: inherit !important;
}

/* Prix + devise visibles, taille réduite pour tout afficher (524 000 FCFA, Sur devis) */
.plan-price h3.price {
  background-color: transparent !important;
  display: inline !important;
  font-size: clamp(1.25rem, 2.5vw, 1.75rem) !important;
  font-weight: 600;
  line-height: 1.3;
  white-space: normal !important;
  word-break: keep-all;
  overflow: visible !important;
}

.plan-price sup.currency-symbol {
  background-color: transparent !important;
  position: static !important;
  left: auto !important;
  top: auto !important;
  display: inline !important;
  font-size: 0.65em !important;
  vertical-align: super;
  font-weight: 500;
  white-space: nowrap;
}

/* Descriptions et listes : tout visible, retour à la ligne si besoin */
#pricing-1 .plan-target,
#pricing-1 .feat-text,
#pricing-1 .limitation-text,
#pricing-1 .benefit-text {
  overflow: visible !important;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.plan.featured .price,
.plan.featured .currency-symbol {
  color: var(--clr-white) !important;
}

/* Plan badge for featured plan */
.plan-badge {
  position: absolute;
  top: -10px;
  right: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  z-index: 10;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.plan-subtitle {
  font-size: 14px;
  font-weight: 600;
  color: #667eea;
  margin-top: 5px;
  margin-bottom: 10px;
}

.plan-target {
  font-size: 12px;
  color: #666;
  margin-top: 10px;
  font-style: italic;
}

/* Features styling - espacement réduit entre les modules */
#pricing-1 .plan-feat {
  display: flex;
  align-items: center;
  margin-bottom: 0 !important;
}

.feat-icon {
  color: #28a745;
  margin-right: 8px;
  margin-top: 2px;
  font-size: 16px;
  flex-shrink: 0;
}

.feat-text {
  flex: 1;
  line-height: 1.5;
}

/* Limitations styling */
.plan-limitations {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px dashed #ddd;
}

.limitations-title {
  font-size: 14px;
  font-weight: 600;
  color: #dc3545;
  margin-bottom: 10px;
}

.limitations-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.limitation-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
  font-size: 13px;
}

.limitation-icon {
  color: #dc3545;
  margin-right: 8px;
  margin-top: 2px;
  font-size: 14px;
  flex-shrink: 0;
}

.limitation-text {
  flex: 1;
  color: #666;
  line-height: 1.4;
}

/* Benefits styling */
.plan-benefits {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px dashed #ddd;
}

.benefits-title {
  font-size: 14px;
  font-weight: 600;
  color: #28a745;
  margin-bottom: 10px;
}

.benefits-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
  font-size: 13px;
}

.benefit-icon {
  color: #ffc107;
  margin-right: 8px;
  margin-top: 2px;
  font-size: 14px;
  flex-shrink: 0;
}

.benefit-text {
  flex: 1;
  color: #333;
  font-weight: 500;
  line-height: 1.4;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .plan-badge {
    top: -5px;
    right: 10px;
    font-size: 10px;
    padding: 3px 10px;
  }
  
  .plan-target {
    font-size: 11px;
  }
}
</style>

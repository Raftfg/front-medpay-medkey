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
                <h3 class="price" v-else-if="plan.priceFrom && plan.priceTo">
                  {{ plan.priceFrom }}{{ plan.currency }} - {{ plan.priceTo }}{{ plan.currency }}
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
              <!-- Limitations pour le plan FREE -->
              <div v-if="plan.limitations && plan.limitations.length > 0" class="plan-limitations">
                <h5 class="limitations-title">{{ $t('pricing.comparison.not_included') }}</h5>
                <ul class="limitations-list">
                  <li v-for="(limitation, lIdx) in plan.limitations" :key="lIdx" class="limitation-item">
                    <i class="bi bi-x-circle-fill limitation-icon"></i>
                    <span class="limitation-text">{{ limitation }}</span>
                  </li>
                </ul>
              </div>
              <!-- Avantages clés pour Essential et Professional -->
              <div v-if="plan.benefits && plan.benefits.length > 0" class="plan-benefits">
                <h5 class="benefits-title">{{ $t('pricing.comparison.included') }}</h5>
                <ul class="benefits-list">
                  <li v-for="(benefit, bIdx) in plan.benefits" :key="bIdx" class="benefit-item">
                    <i class="bi bi-star-fill benefit-icon"></i>
                    <span class="benefit-text">{{ benefit }}</span>
                  </li>
                </ul>
              </div>
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
.plan .price {
  background: transparent !important;
  color: inherit !important;
}

/* Ensure digits don't have unwanted white backgrounds from external styles */
.plan-price h3.price, 
.plan-price span.currency-symbol {
  background-color: transparent !important;
  display: inline-block;
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

/* Features styling */
.plan-feat {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
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

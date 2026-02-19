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
        <!-- <div class="cta-area wow fadeInUp" data-wow-delay=".8s">
          <router-link class="cta-btn btn-solid" to="/pricing">
            {{ $t('pricing.section.cta_see_all') }}<i class="bi bi-arrow-right icon"></i>
          </router-link>
        </div> -->
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
                <h3 class="price" v-else>
                  {{ getDisplayPrice(plan) }}<sup class="currency-symbol" v-if="!plan.isCustom">{{ plan.currency }}</sup>
                </h3>
                <span class="per" v-if="!plan.isCustom">{{ $t('pricing.section.per_month') }}</span>
              </div>
              <p class="plan-target">{{ plan.target }}</p>
            </div>
            <div class="plan-details">
              <ul class="plan-list">
                <li v-for="(feat, fIdx) in displayedFeatures(plan)" :key="fIdx" class="plan-feat">
                  <i class="bi bi-check-circle-fill feat-icon"></i>
                  <span class="feat-text">{{ feat }}</span>
                </li>
              </ul>
              <div v-if="plan.features.length > 7" class="plan-see-more">
                <button 
                  @click="toggleFeatures(plan.id)" 
                  class="see-more-btn"
                  :aria-expanded="expandedPlans[plan.id]"
                >
                  {{ expandedPlans[plan.id] ? $t('pricing.section.see_less') : $t('pricing.section.see_more') }}
                  <i :class="['bi', expandedPlans[plan.id] ? 'bi-chevron-up' : 'bi-chevron-down']"></i>
                </button>
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
  data() {
    return {
      expandedPlans: {}
    };
  },
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
    getDisplayPrice(plan) {
      if (plan.isCustom) {
        return plan.price;
      }
      // Afficher uniquement le prix de départ pour les plans avec range
      if (plan.priceFrom) {
        return plan.priceFrom;
      }
      return plan.price;
    },
    displayedFeatures(plan) {
      if (plan.features.length <= 7) {
        return plan.features;
      }
      if (this.expandedPlans[plan.id]) {
        return plan.features;
      }
      return plan.features.slice(0, 7);
    },
    toggleFeatures(planId) {
      this.$set(this.expandedPlans, planId, !this.expandedPlans[planId]);
    },
    getTranslatedFeatures(planId) {
      const featuresObj = this.$t(`pricing.plans.${planId}.features`, { returnObjects: true });
      if (typeof featuresObj === 'object' && featuresObj !== null) {
        return Object.values(featuresObj);
      }
      return [];
    },
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

/* See more button styling */
.plan-see-more {
  margin-top: 15px;
  text-align: center;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.see-more-btn {
  background: transparent;
  border: none;
  color: #667eea;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  transition: all 0.3s ease;
}

.see-more-btn:hover {
  color: #764ba2;
  text-decoration: underline;
}

.see-more-btn i {
  font-size: 12px;
  transition: transform 0.3s ease;
}

.see-more-btn[aria-expanded="true"] i {
  transform: rotate(180deg);
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

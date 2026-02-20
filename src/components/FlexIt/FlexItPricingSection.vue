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
      <div class="row pricing-grid">
        <!--Plans-->
        <div v-for="(plan, idx) in plans" :key="idx" class="col-12 col-md-6 col-xl-3 mx-auto price-plan">
          <div class="plan wow fadeInUp plan-card" :data-wow-delay="plan.delay">
            <div class="plan-head">
              <i :class="plan.icon + ' plan-icon'"></i>
              <h4 class="plane-name">{{ plan.name }}</h4>
              <p class="plan-subtitle">{{ plan.subtitle }}</p>
              <div class="plan-price">
                <h3 class="price custom-price" v-if="plan.isCustom">
                  {{ plan.price }}
                </h3>
                <div class="price-line" v-else>
                  <div class="amount-row">
                    <h3 class="price">{{ getDisplayPrice(plan) }}</h3>
                  </div>
                  <span class="per">{{ plan.currency }}/{{ $t('pricing.section.per_month') }}</span>
                </div>
              </div>
              <p class="plan-target">{{ plan.target }}</p>
            </div>
            <div class="plan-details">
              <ul class="plan-list">
                <li v-for="(feat, fIdx) in displayedFeatures(plan)" :key="fIdx" class="plan-feat">
                  <i class="bi bi-check feat-icon"></i>
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
              <router-link class="btn-solid cta-link cta-link-primary" to="/auth-pages/login">
                Commencer dès maintenant
              </router-link>
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
          featured: false,
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
.pricing-grid {
  --bs-gutter-x: 0.9rem;
  --bs-gutter-y: 1rem;
  row-gap: 18px;
}

.price-plan {
  display: flex;
}

.plan-card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  border-radius: 16px;
  padding: 20px 18px 18px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: linear-gradient(180deg, #0e1f36 0%, #0a1627 100%);
  box-shadow: 0 14px 30px rgba(6, 15, 28, 0.35);
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
  overflow: hidden;
}

.plan-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at top right, rgba(65, 184, 255, 0.22), transparent 45%);
  pointer-events: none;
}

.plan-card:hover {
  transform: translateY(-6px);
  border-color: rgba(65, 184, 255, 0.45);
  box-shadow: 0 20px 42px rgba(6, 15, 28, 0.5);
}

.plan-card.featured {
  border-color: rgba(57, 197, 164, 0.55);
  box-shadow: 0 18px 38px rgba(21, 60, 52, 0.5);
}

.plan-head,
.plan-details,
.plan-cta {
  position: relative;
  z-index: 1;
}

.plan-icon {
  display: inline-flex;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: #d7efff;
  margin-bottom: 12px;
}

.plane-name {
  color: #ffffff;
  margin-bottom: 4px;
  font-size: 1.1rem;
  font-weight: 700;
}

.plan-subtitle {
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #7fd6ff;
  margin-bottom: 14px;
}

.plan .price {
  background: transparent !important;
  color: #ffffff !important;
  font-size: 1.55rem;
  line-height: 0.95;
  margin: 0;
  white-space: nowrap;
  font-weight: 800;
}

.plan .price.custom-price {
  font-size: 1rem;
  text-align: center;
  width: auto;
}

.plan-price h3.price,
.plan-price span.currency-symbol {
  background-color: transparent !important;
  display: inline-block;
}

.plan-price {
  margin-top: 6px;
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.price-line {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 0;
  width: fit-content;
  max-width: 100%;
}

.amount-row {
  display: inline-flex;
  align-items: flex-end;
  justify-content: center;
  gap: 6px;
}

.per {
  display: block;
  color: #2fd2ff;
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1.1;
  margin-top: 4px;
  white-space: nowrap;
  text-align: center;
}

.plan-target {
  margin-top: 10px;
  margin-bottom: 0;
  font-size: 0.8rem;
  color: #c8d6e3;
  line-height: 1.45;
}

.plan-details {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
  flex: 1;
}

.plan-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.plan-feat {
  display: flex;
  align-items: flex-start;
  gap: 5px;
  margin-bottom: 3px;
  text-align: left;
}

.feat-icon {
  color: #ffffff;
  margin-top: 2px;
  font-size: 14px;
  flex-shrink: 0;
}

.feat-text {
  flex: 1;
  line-height: 1.15;
  color: #ffffff;
  font-size: 0.88rem;
}

.plan-see-more {
  margin-top: 14px;
  text-align: left;
}

.see-more-btn {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 999px;
  color: #ffffff;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 12px;
  transition: all 0.25s ease;
}

.see-more-btn:hover {
  background: rgba(255, 255, 255, 0.16);
  border-color: rgba(255, 255, 255, 0.35);
}

.see-more-btn i {
  font-size: 12px;
  transition: transform 0.25s ease;
}

.see-more-btn[aria-expanded="true"] i {
  transform: rotate(180deg);
}

.plan-cta {
  margin-top: 16px;
  text-align: center;
}

.plan-cta .cta-link {
  min-width: 210px;
}

@media (max-width: 768px) {
  .plan-card {
    padding: 18px 16px;
  }

  .plan .price {
    font-size: 1.55rem;
  }

  .plan-target {
    font-size: 0.76rem;
  }
}
</style>

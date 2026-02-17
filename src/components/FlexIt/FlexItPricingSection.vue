<template>
  <!-- Start pricing Section-->
  <section class="pricing mega-section" id="pricing-1">
    <div class="container">
      <div class="sec-heading">
        <div class="content-area">
          <span class="pre-title wow fadeInUp" data-wow-delay=".2s">pricing plans</span>
          <h2 class="title wow fadeInUp" data-wow-delay=".4s"><span class='hollow-text'>affordable</span> pricing plans</h2>
          <p class="subtitle wow fadeInUp" data-wow-delay=".6s">Lorem ipsum dolor sit amet consectetur adipisicing elit Omnis <br>id atque dignissimos repellat quae ullam.</p>
        </div>
        <div class="cta-area wow fadeInUp" data-wow-delay=".8s"><router-link class="cta-btn btn-solid" to="/pricing">see all plans<i class="bi bi-arrow-right icon "></i></router-link></div>
      </div>
      <div class="row">
        <!--Plans-->
        <div v-for="(plan, idx) in plans" :key="idx" class="col-12 col-md-6 col-xl-3 mx-auto price-plan">
          <div :class="['plan wow fadeInUp', { featured: plan.featured }]" :data-wow-delay="plan.delay">
            <div class="plan-head"><i :class="plan.icon + ' plan-icon'"></i>
              <h4 class="plane-name">{{ plan.name }}</h4>
              <div class="plan-price">
                <h3 class="price">{{ plan.price }}<sup class="currency-symbol">$</sup></h3><span class="per">per project</span>
              </div>
            </div>
            <div class="plan-details">
              <ul class="plan-list">
                <li v-for="(feat, fIdx) in plan.features" :key="fIdx" class="plan-feat">
                  <span class="feat-text">{{ feat }}</span>
                </li>
              </ul>
            </div>
            <div class="plan-cta"><a class="cta-btn btn-outline" href="#0">select plan</a></div>
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
      plans: [
        { name: "free plan", price: "00", icon: "flaticon-nft-1", delay: ".1s", features: ["150 Lorem, ipsum dolor.", "20 Lorem ipsum dolor sit .", "Lorem ipsum dolor sit.", "free Lorem ipsum dolor .", "added Lorem ipsum dolor."] },
        { name: "standerd plan", price: "85", icon: "flaticon-virtual-reality", delay: ".3s", features: ["150 Lorem, ipsum dolor.", "20 Lorem ipsum dolor sit .", "Lorem ipsum dolor sit.", "free Lorem ipsum dolor .", "added Lorem ipsum dolor."] },
        { name: "pro plan", price: "150", icon: "flaticon-box", delay: ".5s", featured: true, features: ["150 Lorem, ipsum dolor.", "20 Lorem ipsum dolor sit .", "Lorem ipsum dolor sit.", "free Lorem ipsum dolor .", "added Lorem ipsum dolor."] },
        { name: "ultimate plan", price: "210", icon: "flaticon-basic-shapes", delay: ".6s", features: ["150 Lorem, ipsum dolor.", "20 Lorem ipsum dolor sit .", "Lorem ipsum dolor sit.", "free Lorem ipsum dolor .", "added Lorem ipsum dolor."] }
      ]
    };
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
</style>

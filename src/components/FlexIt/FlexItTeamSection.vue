<template>
  <!-- Start our-team Section-->
  <section class="our-team mega-section" id="our-team">
    <div class="container">
      <div class="sec-heading">
        <div class="content-area">
          <span class="pre-title wow fadeInUp" data-wow-delay=".2s">Team</span>
          <h2 class="title wow fadeInUp" data-wow-delay=".4s">our <span class='hollow-text'>Experts</span> team members</h2>
        </div>
        <div class="cta-area wow fadeInUp" data-wow-delay=".8s"><router-link class="cta-btn btn-solid" to="/contact-us">see more<i class="bi bi-arrow-right icon "></i></router-link></div>
      </div>
      <div class="container-fluid">
        <div class="row">
          <!--Team Members-->
          <div v-for="(member, idx) in team" :key="idx" class="col-12 col-md-6 col-lg-3 mx-md-auto">
            <div class="tm-member-card wow fadeInUp" :data-wow-delay="member.delay">
              <div class="tm-image js-tilt">
                <router-link class="tm-link" :to="'/our-team/' + member.slug"> 
                  <div class="overlay overlay-color"></div>
                  <img class="img-fluid parallax-img" loading="lazy" :src="member.img" alt="Team Member"/>
                </router-link>
              </div>
              <div class="tm-details">
                <router-link class="tm-link" :to="'/our-team/' + member.slug"> 
                  <h6 class="tm-name">{{ member.name }}</h6>
                </router-link>
                <span class="tm-role">{{ member.role }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End our-team Section-->
</template>

<script>
export default {
  name: "FlexItTeamSection",
  data() {
    return {
      team: [
        { name: "murad Aly", slug: "murad-aly", role: "co Founder", img: require("@/assets/flex-it/assets/images/our-team/1.jpg"), delay: "0.1s" },
        { name: "fairouz amin", slug: "fairouz-amin", role: "manager", img: require("@/assets/flex-it/assets/images/our-team/2.jpg"), delay: "0.2s" },
        { name: "beco Smith", slug: "beco-smith", role: "co leader", img: require("@/assets/flex-it/assets/images/our-team/3.jpg"), delay: "0.4s" },
        { name: "Morgan fray", slug: "morgan-fray", role: "consultant", img: require("@/assets/flex-it/assets/images/our-team/4.jpg"), delay: "0.6s" },
        { name: "tony hardy", slug: "tony-hardy", role: "advisor", img: require("@/assets/flex-it/assets/images/our-team/5.jpg"), delay: "0.1s" },
        { name: "tom faraday", slug: "tom-faraday", role: "analyzer", img: require("@/assets/flex-it/assets/images/our-team/6.jpg"), delay: "0.2s" },
        { name: "brad simon", slug: "brad-simon", role: "performer", img: require("@/assets/flex-it/assets/images/our-team/7.jpg"), delay: "0.4s" },
        { name: "daived chtorperg", slug: "daived-chtorperg", role: "actor", img: require("@/assets/flex-it/assets/images/our-team/8.jpg"), delay: "0.6s" }
      ]
    };
  }
};
</script>

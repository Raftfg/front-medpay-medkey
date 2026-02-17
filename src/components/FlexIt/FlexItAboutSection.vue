<template>
  <!-- Start about Section-->
  <section class="about mega-section" id="about">
    <div class="container">
      <!-- Start first about div-->
      <div class="content-block">
        <div class="row">
          <div class="col-12 col-lg-6 d-flex align-items-center order-1 order-lg-0 about-col pad-end wow fadeInUp" data-wow-delay="0.6s">
            <div class="text-area">
              <div class="sec-heading light-title">
                <div class="content-area">
                  <span class="pre-title wow fadeInUp" data-wow-delay=".2s">about Us</span>
                  <h2 class="title wow fadeInUp" data-wow-delay=".4s"><span class='hollow-text'>trusted</span> by worldwide clients since<span class='featured-text'> 1980. <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 150" preserveAspectRatio="none"><path d="M7.7,145.6C109,125,299.9,116.2,401,121.3c42.1,2.2,87.6,11.8,87.3,25.7"></path></svg></span></h2>
                </div>
              </div>
              <p class="about-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. A officia molestiae dolorum tempora ut accusamus cupiditate! Nesciunt tempora reiciendis libero voluptate!</p>
              <div class="info-items-list">
                <div class="row">
                  <div class="col-9 col-xl-6" v-for="(item, idx) in infoItems1" :key="idx">
                    <div class="info-item"><i :class="item.icon + ' info-icon'"></i>
                      <div class="info-content">
                        <h5 class="info-title">{{ item.title }}</h5>
                        <p class="info-text">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cta-area">
                <router-link class="btn-solid reveal-start" to="/contact-us">Get in touch</router-link>
                <div class="signature">
                  <div class="signature-img"></div>
                  <div class="signature-name">CEO & Founder </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6 d-flex align-items-center order-0 order-lg-1 about-col wow fadeInUp" data-wow-delay="0.2s">
            <div class="img-area" data-tilt>
              <div class="image"><img class="about-img img-fluid" loading="lazy" src="@/assets/flex-it/assets/images/about/1.png" alt="Our vision"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- Start second about div-->
      <div class="content-block">
        <div class="row">
          <div class="col-12 col-lg-6 d-flex align-items-center about-col wow fadeInUp" data-wow-delay="0.2s">
            <div class="img-area">
              <div class="image" data-tilt><img class="about-img img-fluid" loading="lazy" src="@/assets/flex-it/assets/images/about/2.png" alt="about"></div>
            </div>
          </div>
          <div class="col-12 col-lg-6 d-flex align-items-center about-col pad-start wow fadeInUp" data-wow-delay="0.6s">
            <div class="text-area">
              <div class="sec-heading light-title">
                <div class="content-area">
                  <span class="pre-title wow fadeInUp" data-wow-delay=".2s">why choose us</span>
                  <h2 class="title wow fadeInUp" data-wow-delay=".4s">Why our <span class='hollow-text'> customers</span> choose <span class='featured-text'>working <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 150" preserveAspectRatio="none"><path d="M7.7,145.6C109,125,299.9,116.2,401,121.3c42.1,2.2,87.6,11.8,87.3,25.7"></path></svg></span> with us</h2>
                </div>
              </div>
              <p class="about-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. A officia molestiae dolorum tempora ut accusamus cupiditate! Nesciunt tempora reiciendis libero voluptate!</p>
              <div class="info-items-list">
                <div class="row">
                  <div class="col-12" v-for="(item, idx) in infoItems2" :key="idx">
                    <div class="info-item"><span class="info-number">{{ item.num }}</span>
                      <div class="info-content">
                        <h5 class="info-title">{{ item.title }}</h5>
                        <p class="info-text">{{ item.text }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cta-area"><router-link class="btn-solid" to="/contact-us">get in touch</router-link></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End about Section-->
</template>

<script>
export default {
  name: "FlexItAboutSection",
  data() {
    return {
      infoItems1: [
        { title: "first on field", icon: "flaticon-medal" },
        { title: "easy to reach", icon: "flaticon-game-console" },
        { title: "worldwide services", icon: "flaticon-map" },
        { title: "24/7 support", icon: "flaticon-technical-support-1" }
      ],
      infoItems2: [
        { num: "01.", title: "latest technologies", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque repellendus minima reiciendis nobis dolore obcaecati." },
        { num: "02.", title: "uniqe solutions", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque repellendus minima reiciendis nobis dolore obcaecati." },
        { num: "03.", title: "powerful strategies", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque repellendus minima reiciendis nobis dolore obcaecati." }
      ]
    };
  }
};
</script>

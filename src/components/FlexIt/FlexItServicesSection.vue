<template>
  <!-- Start services Section-->
  <section class="services services-boxed mega-section" id="services">
    <div class="container">
      <div class="sec-heading">
        <div class="content-area">
          <span class="pre-title wow fadeInUp" data-wow-delay=".2s">services</span>
          <h2 class="title wow fadeInUp" data-wow-delay=".4s"><span class='hollow-text'>services</span> we offer</h2>
          <p class="subtitle wow fadeInUp" data-wow-delay=".6s">Lorem ipsum dolor sit amet consectetur adipisicing elit Omnis <br>id atque dignissimos repellat quae ullam.</p>
        </div>
        <div class="cta-area wow fadeInUp" data-wow-delay=".8s"><router-link class="cta-btn btn-solid" to="/services">see all services <i class="bi bi-arrow-right icon "></i></router-link></div>
      </div>
      <div class="row gx-4 gy-4 services-row text-center">  
        <div v-for="(service, index) in services" :key="index" class="col-12 col-md-6 col-lg-4 mx-auto">
          <!--Start service box-->
          <div class="box service-box wow fadeInUp reveal-start" :data-wow-offset="0" :data-wow-delay="service.delay">
            <div class="service-icon"><i :class="service.icon + ' font-icon'"></i></div>
            <span class="service-num hollow-text">{{ index + 1 }}</span>
            <div class="service-content">
              <h3 class="service-title">{{ service.title }}</h3>
              <p class="service-text">{{ service.text }}</p>
            </div>
            <router-link class="read-more" to="/services">read more<i class="bi bi-arrow-right icon "></i></router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End services Section-->
</template>

<script>
export default {
  name: "FlexItServicesSection",
  data() {
    return {
      services: [
        { title: "web development", icon: "flaticon-web-development", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque repellendus minima reiciendis nobis dolore obcaecati.", delay: ".1s" },
        { title: "Digital Marketing", icon: "flaticon-nanotechnology", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque repellendus minima reiciendis nobis dolore obcaecati.", delay: ".2s" },
        { title: "SaaS products", icon: "flaticon-web-domain", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque repellendus minima reiciendis nobis dolore obcaecati.", delay: ".3s" },
        { title: "Apps development", icon: "flaticon-profile", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque repellendus minima reiciendis nobis dolore obcaecati.", delay: ".4s" },
        { title: "SEO services", icon: "flaticon-search", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque repellendus minima reiciendis nobis dolore obcaecati.", delay: ".5s" },
        { title: "data analysis", icon: "flaticon-strategy", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque repellendus minima reiciendis nobis dolore obcaecati.", delay: ".6s" }
      ]
    };
  }
};
</script>

<template>
  <!-- Start testimonials Section-->
  <section class="testimonials testimonials-1-col has-dark-bg mega-section" id="testimonials-img-bg">
    <div class="overlay-photo-image-bg parallax" :style="{ backgroundImage: 'url(' + testiBg + ')' }" data-bg-opacity=".25"></div>
    <div class="container">
      <div class="sec-heading centered">
        <div class="content-area">
          <span class="pre-title wow fadeInUp" data-wow-delay=".2s">testimonials</span>
          <h2 class="title wow fadeInUp" data-wow-delay=".4s">customers <span class='hollow-text'>testmonials</span></h2>
        </div>
        <div class="cta-area wow fadeInUp" data-wow-delay=".8s"><a class="cta-btn btn-solid" href="#">see all reviews<i class="bi bi-arrow-right icon "></i></a></div>
      </div>
      <div class="row">
        <div class="col-12 col-lg-10 mx-auto">
          <div class="swiper-container wow fadeIn" data-wow-delay="0.4s">
            <div class="swiper-wrapper">
              <!--First Slide-->
              <div v-for="(testi, idx) in testimonials" :key="idx" class="swiper-slide">
                <div class="testimonial-content">
                  <div class="customer-img"><img class="img-fluid" loading="lazy" :src="testi.img" alt="customer image"></div>
                  <div class="customer-testimonial">
                    <div class="content">
                      <p class="testimonial-text">{{ testi.text }}</p>
                    </div>
                  </div>
                  <div class="customer-info">
                    <div class="customer-details">
                      <p class="customer-name">{{ testi.name }}</p>
                      <p class="customer-role">{{ testi.role }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!--navigation buttons-->
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End testimonials Section-->
</template>

<script>
export default {
  name: "FlexItTestimonials",
  data() {
    return {
      testiBg: require("@/assets/flex-it/assets/images/sections-bg-images/1.jpg"),
      testimonials: [
        { name: "Yusuf amin", role: "founder", text: " ipsum dolor sit amet consectetur adipisicing elit. Quod, id sequi aut qui est ab, corporis quis maiores reiciendis explicabo odio tenetur nulla sint vel.", img: require("@/assets/flex-it/assets/images/testimonials/1.png") },
        { name: "fouad osman", role: "officer", text: " ipsum dolor sit amet consectetur adipisicing elit. Quod, id sequi aut qui est ab, corporis quis maiores reiciendis explicabo odio tenetur nulla sint vel.", img: require("@/assets/flex-it/assets/images/testimonials/2.png") },
        { name: "fairouz mhmd", role: "manager", text: " ipsum dolor sit amet consectetur adipisicing elit. Quod, id sequi aut qui est ab, corporis quis maiores reiciendis explicabo odio tenetur nulla sint vel.", img: require("@/assets/flex-it/assets/images/testimonials/3.png") }
      ]
    };
  }
};
</script>

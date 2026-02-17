<template>
  <div class="flex-it-contact">
    <FlexItBreadcrumb 
      title="Contact Us" 
      :breadcrumbs="[{ name: 'contact us', active: true }]" 
    />
    <!-- Start Contact Us Section-->
    <section class="contact-us mega-section pb-0" id="contact-us">
      <div class="container">
        <section class="locations-section mega-section">
          <div class="sec-heading centered">
            <div class="content-area">
              <h2 class="title wow fadeInUp" data-wow-delay=".4s">our offices around the world</h2>
            </div>
          </div>
          <div class="contact-info-panel">
            <div class="info-section">
              <div class="row">
                <!-- New York Office -->
                <div class="col-12 col-lg-4">
                  <div class="info-panel wow fadeInUp" data-wow-delay=".4s">
                    <h4 class="location-title">New york</h4>
                    <div class="line-on-side"> </div>
                    <p class="location-address">United States, 307 Wilshire, 2nd av. new york 3516.</p>
                    <div class="location-card">
                      <i class="flaticon-email icon"></i>
                      <div class="card-content">
                        <h6 class="content-title">email:</h6>
                        <a class="email link" href="mailto:info@example.com">info@example.com</a>
                      </div>
                    </div>
                    <div class="location-card">
                      <i class="flaticon-phone-call icon"></i>
                      <div class="card-content">
                        <h6 class="content-title">phone:</h6>
                        <a class="tel link" href="tel:+29876543210">+29876543210</a>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- London Office -->
                <div class="col-12 col-lg-4">
                  <div class="info-panel wow fadeInUp" data-wow-delay=".6s">
                    <h4 class="location-title">London</h4>
                    <div class="line-on-side"> </div>
                    <p class="location-address">United kingdom, 12 smith town, 2nd av. London 2159.</p>
                    <div class="location-card">
                      <i class="flaticon-email icon"></i>
                      <div class="card-content">
                        <h6 class="content-title">email:</h6>
                        <a class="email link" href="mailto:info@example.com">info@example.com</a>
                      </div>
                    </div>
                    <div class="location-card">
                      <i class="flaticon-phone-call icon"></i>
                      <div class="card-content">
                        <h6 class="content-title">phone:</h6>
                        <a class="tel link" href="tel:+969876543210">+969876543210</a>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Tokio Office -->
                <div class="col-12 col-lg-4">
                  <div class="info-panel wow fadeInUp" data-wow-delay=".8s">
                    <h4 class="location-title">tokio</h4>
                    <div class="line-on-side"> </div>
                    <p class="location-address">Japan, 307 chinzo appy road, portsika way. tokio 3516.</p>
                    <div class="location-card">
                      <i class="flaticon-email icon"></i>
                      <div class="card-content">
                        <h6 class="content-title">email:</h6>
                        <a class="email link" href="mailto:info@example.com">info@example.com</a>
                      </div>
                    </div>
                    <div class="location-card">
                      <i class="flaticon-phone-call icon"></i>
                      <div class="card-content">
                        <h6 class="content-title">phone:</h6>
                        <a class="tel link" href="tel:+459876543210">+459876543210</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Google Maps Section -->
        <section class="map-section elf-section">
          <div class="sec-heading centered">
            <div class="content-area">
              <h2 class="title wow fadeInUp" data-wow-delay=".4s">find us on google maps</h2>
            </div>
          </div>
          <div class="map-box wow fadeInUp" data-wow-delay=".6s">
            <div class="mapouter">
              <div class="gmap_canvas">
                <iframe class="map-iframe" id="gmap_canvas" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d317718.69319292053!2d-0.3817765050863085!3d51.528307984912544!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2seg!4v1613762954590!5m2!1sen!2seg" allowfullscreen></iframe>
              </div>
            </div>
          </div>
        </section>

        <!-- Contact Form Section -->
        <section class="contact-us-form-section mega-section">
          <div class="row">
            <div class="col-12">
              <div class="contact-form-panel">
                <div class="sec-heading centered">
                  <div class="content-area">
                    <h2 class="title wow fadeInUp" data-wow-delay=".4s">Have any questions? Let's answer them</h2>
                  </div>
                </div>
                <div class="contact-form-inputs wow fadeInUp" data-wow-delay=".6s">
                  <div class="custom-form-area input-boxed">
                    <form class="main-form" id="contact-us-form" action="#" method="post">
                      <span class="done-msg"></span>
                      <div class="row">
                        <div class="col-12 col-lg-6">
                          <div class="input-wrapper">
                            <input class="text-input" id="user-name" name="UserName" type="text" />
                            <label class="input-label" for="user-name"> Name <span class="req">*</span></label>
                            <span class="b-border"></span><span class="error-msg"></span>
                          </div>
                        </div>
                        <div class="col-12 col-lg-6">
                          <div class="input-wrapper">
                            <input class="text-input" id="user-email" name="UserEmail" type="email" />
                            <label class="input-label" for="user-email"> E-mail <span class="req">*</span></label>
                            <span class="b-border"></span><span class="error-msg"></span>
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="input-wrapper">
                            <input class="text-input" id="msg-subject" name="subject" type="text" />
                            <label class="input-label" for="msg-subject"> Subject <span class="req">*</span></label>
                            <span class="b-border"></span><span class="error-msg"></span>
                          </div>
                        </div>
                        <div class="col-12">
                          <div class="input-wrapper">
                            <textarea class="text-input" id="msg-text" name="message"></textarea>
                            <label class="input-label" for="msg-text"> your message <span class="req">*</span></label>
                            <span class="b-border"></span><i></i><span class="error-msg"></span>
                          </div>
                        </div>
                        <div class="col-12 submit-wrapper">
                          <button class="btn-solid" id="submit-btn" type="submit" name="UserSubmit">Send your message</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
    <!-- End Contact Us Section-->
  </div>
</template>

<script>
import FlexItBreadcrumb from "@/components/FlexIt/FlexItBreadcrumb.vue";
import $ from 'jquery';

export default {
  name: "FlexItContact",
  components: {
    FlexItBreadcrumb
  },
  mounted() {
    try {
      require("@/assets/flex-it/js/main.js");
      if ($('.loading-screen').length) {
         $('.loading-screen').fadeOut(500);
      }
    } catch (e) {
      console.warn("Template JS initialization warning:", e);
    }
  }
};
</script>

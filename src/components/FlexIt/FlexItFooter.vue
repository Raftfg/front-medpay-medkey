<template>
  <!-- Start page-footer Section-->
  <footer class="page-footer dark-color-footer" id="page-footer">
    <div class="overlay-photo-image-bg" :style="{ backgroundImage: 'url(' + footerBg + ')' }" data-bg-opacity=".25"></div>
    <div class="container">
      <div class="row footer-cols">
        <div class="col-12 col-md-8 col-lg-4 footer-col">
          <img class="img-fluid footer-logo" loading="lazy" src="@/assets/flex-it/assets/images/logo/logo-colored.png" alt="logo"/>
          <div class="footer-col-content-wrapper">        
            <p class="footer-text-about-us">
               Medkey simplifie la gestion de votre santé avec une plateforme intuitive pour les patients et les professionnels. Accédez à vos dossiers, gérez vos rendezvous et plus encore, en toute sécurité.
            </p>
          </div>
          <div class="form-area">
            <div class="mailchimp-form">
              <form class="one-field-form" method="post" action="#0">
                <div class="field-group">
                  <label class="email-label" for="email-input"> Subscribe to our news letter</label>
                  <input class="email-input" type="email" value="" name="EMAIL" id="email-input" placeholder="Email Address" autocomplete="off"/>
                  <div class="cta-area">
                    <input class="btn-solid subscribe-btn" type="submit" value="Subscribe" name="subscribe"/>
                  </div>
                </div><span class="email-notice">*we will not share your personal info</span>
              </form>
            </div>
          </div>
        </div>
        <div class="col-6 col-lg-2 footer-col">
          <h2 class="footer-col-title">useful links</h2>
          <div class="footer-col-content-wrapper">
            <ul class="footer-menu">
              <li class="footer-menu-item"><i class="bi bi-arrow-right icon"></i><router-link class="footer-menu-link" to="/">Accueil</router-link></li>
              <li class="footer-menu-item"><i class="bi bi-arrow-right icon"></i><router-link class="footer-menu-link" to="/services">Fonctionnalités</router-link></li>
              <li class="footer-menu-item"><i class="bi bi-arrow-right icon"></i><router-link class="footer-menu-link" to="/pricing">Tarifs</router-link></li>
              <li class="footer-menu-item"><i class="bi bi-arrow-right icon"></i><router-link class="footer-menu-link" to="/contact-us">Contact</router-link></li>
            </ul>
          </div>
        </div>
        <div class="col-6 col-lg-2 footer-col">
          <h2 class="footer-col-title">Resources</h2>
          <div class="footer-col-content-wrapper">
            <ul class="footer-menu">
              <li class="footer-menu-item"><i class="bi bi-arrow-right icon"></i><router-link class="footer-menu-link" to="/faq">Documentation</router-link></li>
              <li class="footer-menu-item"><i class="bi bi-arrow-right icon"></i><router-link class="footer-menu-link" to="/auth-pages/login">Espace Client</router-link></li>
              <li class="footer-menu-item"><i class="bi bi-arrow-right icon"></i><router-link class="footer-menu-link" to="/contact-us">Assistance</router-link></li>
            </ul>
          </div>
        </div>
        <div class="col-12 col-lg-4 footer-col">
          <h2 class="footer-col-title">contact information</h2>
          <div class="footer-col-content-wrapper">       
            <div class="contact-info-card"><i class="bi bi-envelope icon"></i><a class="text-lowercase info" href="mailto:support@medkey.com">support@medkey.com</a></div>
            <div class="contact-info-card"><i class="bi bi-geo-alt icon"></i><span class="text-lowercase info">Abidjan, Côte d'Ivoire</span></div>
            <div class="contact-info-card"><i class="bi bi-phone icon"></i><a class="info" href="tel:+2250102030405">+225 01 02 03 04 05</a></div>
            <div class="contact-info-card">
              <div class="social-icons">
                <div class="sc-wrapper dir-row sc-size-32">
                  <ul class="sc-list">
                    <li class="sc-item" title="Facebook"><a class="sc-link" href="#0" title="social media icon"><i class="fab fa-facebook-f sc-icon"></i></a></li>
                    <li class="sc-item" title="youtube"><a class="sc-link" href="#0" title="social media icon"><i class="fab fa-youtube sc-icon"></i></a></li>
                    <li class="sc-item" title="instagram"><a class="sc-link" href="#0" title="social media icon"><i class="fab fa-instagram sc-icon"></i></a></li>
                    <li class="sc-item" title="X"><a class="sc-link" href="#0" title="social media icon"><i class="fab fa-x-twitter sc-icon"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="copyrights">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-6 d-flex justify-content-start">
            <p class="creadits">
              &copy; 2024 Créé par : <a class="link" href="#0">Medkey Team</a>
            </p>
          </div>
          <div class="col-12 col-md-6 d-flex justify-content-end">
            <div class="terms-links"><a href="#0">Terms of Use </a>
              | <a href="#0" data-bs-toggle="modal" data-bs-target="#privacyPolicyModal">Privacy Policy.</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <!-- End page-footer Section-->
</template>

<script>
export default {
  name: "FlexItFooter",
  data() {
    return {
      footerBg: require("@/assets/flex-it/assets/images/sections-bg-images/footer-bg-1.jpg")
    };
  }
};
</script>

<style scoped>
</style>

<template>
  <div>
    <!-- ======= Body ======= -->
    <!-- ======= Hero Section ======= -->
    <section id="hero">
      <div id="heroCarousel" data-bs-interval="5000" class="carousel slide carousel-fade" data-bs-ride="carousel">
        <ol class="carousel-indicators" id="hero-carousel-indicators"></ol>

        <div class="carousel-inner" role="listbox">
          <!-- Slide 1 -->
          <div id="slide1" class="carousel-item active">
            <div class="container">
              <h2>Bienvenue sur <span>MedKey</span></h2>
              <p>
                <!-- Il n'est plus nécessaire d'utiliser des formulaires papier, de
                créer des factures manuelles ou de faire face à des retards de
                paiement. Grâce à notre plateforme, vous pouvez tout gérer en un
                seul clic ! -->
                Avec Medkey, vous n'avez plus besoin de recourir à des formulaires en format papier, de générer des
                factures manuellement, ni de faire face à des délais de paiement. Notre plateforme vous permet de gérer
                l'ensemble de ces processus en un seul clic !
              </p>
              <a href="#about" class="btn-get-started scrollto rounded-pill">En savoir plus</a>
            </div>
          </div>

          <!-- Slide 2 -->
          <div id="slide2" class="carousel-item">
            <div class="container">
              <h2>Bienvenue sur MedKey</h2>
              <p>
                <!-- La plateforme de sécurité se positionne en tête pour protéger
                les informations sensibles des patients et des établissements de
                santé ! -->
                Cette plateforme de sécurité est spécialement conçue pour répondre aux besoins de tout hôpital de zone
                en matière de protection des informations sensibles des patients et des établissements de santé,
                se plaçant en première ligne pour assurer cette sécurité essentielle !
              </p>
              <a href="#about" class="btn-get-started scrollto rounded-pill">En savoir plus</a>
            </div>
          </div>

          <!-- Slide 3 -->
          <div id="slide3" class="carousel-item">
            <div class="container">
              <h2>Bienvenue sur MedKey</h2>
              <p>
                <!-- Plus besoin de formulaires papier, de factures manuelles ou de
                retards de paiement. Notre plateforme permet de tout gérer en un
                seul clic ! -->
                Vous n'avez plus à vous préoccuper des formulaires papier, des factures manuelles ou des retards de
                paiement. Tout peut être géré en un simple clic grâce à notre plateforme !
              </p>
              <a href="#about" class="btn-get-started scrollto rounded-pill">En savoir plus</a>
            </div>
          </div>
        </div>

        <a class="carousel-control-prev" href="#heroCarousel" role="button" data-bs-slide="prev">
          <span class="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
        </a>

        <a class="carousel-control-next" href="#heroCarousel" role="button" data-bs-slide="next">
          <span class="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
        </a>
      </div>
    </section>
    <!-- End Hero -->
  </div>
</template>

<script>
// Déplacez les importations JavaScript ici, à l'intérieur de la section <script>
//   import "../asset/vendor/purecounter/purecounter_vanilla.js";
//   import "../asset/vendor/aos/aos.js";
//   import "../asset/vendor/bootstrap/js/bootstrap.bundle.min.js";
//   import "../asset/vendor/glightbox/js/glightbox.min.js";
//  import  "../asset/vendor/swiper/swiper-bundle.min.js";
//   import "../asset/vendor/php-email-form/validate.js";
// import "../asset/js/main.js";
export default {
  name: "BodyComponent",
  components: {},
  mounted() {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim();
      if (all) {
        return [...document.querySelectorAll(el)];
      } else {
        return document.querySelector(el);
      }
    };

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all);
      if (selectEl) {
        if (all) {
          selectEl.forEach((e) => e.addEventListener(type, listener));
        } else {
          selectEl.addEventListener(type, listener);
        }
      }
    };

    /**
     * Hero carousel indicators
     */
    const heroCarouselIndicators = select("#hero-carousel-indicators");
    const heroCarouselItems = select("#heroCarousel .carousel-item", true);

    heroCarouselItems.forEach((item, index) => {
      if (index === 0) {
        heroCarouselIndicators.innerHTML += `<li data-bs-target="#heroCarousel" data-bs-slide-to="${index}" class="active"></li>`;
      } else {
        heroCarouselIndicators.innerHTML += `<li data-bs-target="#heroCarousel" data-bs-slide-to="${index}"></li>`;
      }
    });
  },
};
</script>

<style scoped>
/* Votre code CSS ici */

#iframe {
  border: 0;
  width: 100%;
  height: 350px;
}

#slide1 {
  background-image: url("../asset/img/slide/slide-1.jpg");
}

#slide2 {
  background-image: url("../asset/img/slide/slide-2.jpg");
}

#slide3 {
  background-image: url("../asset/img/slide/slide-3.jpg");
}

#iframe {
  border: 0;
  width: 100%;
  height: 350px;
}

.cta1 {
  background: #199187 !important;
  color: white !important;
}

@import "../asset/vendor/bootstrap-icons/bootstrap-icons.css";
@import "../asset/vendor/boxicons/css/boxicons.min.css";
@import "../asset/vendor/glightbox/css/glightbox.min.css";
@import "../asset/vendor/swiper/swiper-bundle.min.css";
@import "../asset/css/style.css";
</style>

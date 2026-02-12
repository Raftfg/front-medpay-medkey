<template>
  <!-- ======= Top Bar ======= -->

  <div>
    <div id="topbar" class="d-flex align-items-center fixed-top">
      <div class="container d-flex align-items-center justify-content-center justify-content-md-between"></div>
    </div>

    <!-- ======= Header ======= -->
    <header id="header" class="fixed-top align-items-center" style="height: 76px; top:0px;">
      <div class="container d-flex align-items-center justify-content-between">
        <!-- 
       -->
        <!-- Uncomment below if you prefer to use an image logo -->
        <img src="../asset/img/logo.png" alt="" class="logo" />
        <!-- <h1 class="logo me-auto"><a href="index.html">Medicio</a></h1> -->
        <nav id="navbar" class="navbar order-last order-lg-0 align-items-center ">
          <ul>
            <li>
              <a class="nav-link scrollto  " id="navo1" href="#hero">Accueil</a>
            </li>
            <li>
              <a class="nav-link scrollto " id="navo2" href="#about">A propos</a>
            </li>
            <li>
              <a class="nav-link scrollto " id="navo3" href="#services">Services</a>
            </li>
            <li>
              <a class="nav-link scrollto " id="navo4" href="#module">Solutions</a>
            </li>
            <li>
              <a class="nav-link scrollto " id="navo5" href="#actor">Acteurs</a>
            </li>

            <!-- <li>
              <a class="nav-link scrollto " id="navo6" href="#contact">Contact</a>
            </li> -->
          </ul>
          <i class="bi bi-list mobile-nav-toggle"></i>
        </nav>
        <div class="lien">
          <router-link to="/auth-pages/login" class="rounded-pill link">

            Se Connecter
          </router-link>
        </div>

      </div>
    </header>
    <!-- End Header -->
    <div class="container fixed-top" style="display: flex; justify-content: center; align-items: center">
      <div class="container" style="
            margin-top: 700px;
            height: 500px;
            border-radius: 10px;
            background-color: #3fbbc0;
          " id="menu">
        <button @click="toggleDiv" id="button">
          <div class="cross">
            <div class="line"></div>
            <div class="line"></div>
          </div>
        </button>
        <div :style="{ display: divDisplay }">
          <center>
            <ul>
              <li>
                <a class="nav-link scrollto" style="color: white; font-size: 18px" href="#hero">Accueil</a>
              </li>
              <li>
                <a class="nav-link scrollto" style="color: white; font-size: 18px" href="#about">A propos</a>
              </li>
              <li>
                <a class="nav-link scrollto" style="color: white; font-size: 18px" href="#services">Services</a>
              </li>
              <li>
                <a class="nav-link scrollto" style="color: white; font-size: 18px" href="#module">Solutions</a>
              </li>
              <li>
                <a class="nav-link scrollto" style="color: white; font-size: 18px" href="#actor">Acteurs</a>
              </li>
              <!-- <li>
                <a class="nav-link scrollto" style="color: white; font-size: 18px" href="#contact">Contact</a>
              </li> -->
            </ul>
          </center>
        </div>
      </div>
    </div>

    <nav id="mobile" class="fixed-top align-items-center" style="background-color: white; margin-top: 0px; height: 50px">
      <div class="d-flex justify-content-between align-items-center" style="transform: translateY(-30px)">
        <img src="../assets/images/logo.png" style="margin-left: 20px; width: 100px" alt="" />
        <a href="#" class="appointment-btn scrollto mb-4" style="margin-top: 30px"><span
            class="d-none d-md-inline"></span> Se Connecter</a>
        <div style="">
          <button @click="toggleDiv" id="button">
            <div style="border-top: 3px solid #3fbbc0; width: 40px"></div>
            <div style="
                  border-top: 3px solid #3fbbc0;
                  width: 40px;
                  margin-top: 5px;
                "></div>
            <div style="
                  border-top: 3px solid #3fbbc0;
                  width: 40px;
                  margin-top: 5px;
                "></div>
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<!-- <script>
export default {
  name: "NavbarComponent",
  components: {},
  mounted() {},
  methods: {
    toggleDiv() {
      var div = document.getElementById("menu");
      if (div.style.display === "none") {
        div.style.display = "block";
      } else {
        div.style.display = "none";
      }
    },
  },
};
</script> -->
<script>
export default {
  name: "NavbarComponent",
  data() {
    return {
      divDisplay: 'none',
    };
  },
  mounted() {
    var currentPageURL = window.location.href;

    // Fonction pour marquer l'élément de navigation actif
    function markCurrentPageAsActive() {
      var links = document.querySelectorAll('.navbar a');

      for (var i = 0; i < links.length; i++) {
        var link = links[i];
        if (link.href === currentPageURL) {
          link.classList.add('active');
        }
      }
    }

    // Appeler la fonction pour marquer l'élément de navigation actif
    markCurrentPageAsActive();
  },
  methods: {
    toggleDiv() {
      if (this.divDisplay === "none") {
        this.divDisplay = "block";
      } else {
        this.divDisplay = "none";
      }
    },
  },
};
</script>



<style scoped>
.cross {
  width: 40px;
  height: 40px;
  position: relative;
}


.line {
  width: 100%;
  height: 5px;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

.line:first-child {
  transform: translateY(-50%) rotate(45deg);
}

.line:last-child {
  transform: translateY(-50%) rotate(-45deg);
}

#button {
  border: 0px;
  margin-bottom: 30px;
  background: transparent;
}

.button-image {
  width: 50px;
}

/* Votre code CSS ici */
#navo1 {
  animation: 1s ease-in-out anime;
  animation-delay: 0.5s;
}

@keyframes anime {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }

  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

#navo2 {
  animation: 2s ease-in-out anime;
  animation-delay: 0.5s;
}

@keyframes anime1 {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }

  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

#navo3 {
  animation: 3s ease-in-out anime2;
  animation-delay: 0.5s;
}

@keyframes anime2 {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }

  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

#navo4 {
  animation: 4s ease-in-out anime3;
  animation-delay: 0.5s;
}

@keyframes anime3 {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }

  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

#navo5 {
  animation: 5s ease-in-out anime4;
  animation-delay: 0.5s;
}

@keyframes anime4 {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }

  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

#navo6 {
  animation: 6s ease-in-out anime5;
  animation-delay: 0.5s;
}

@keyframes anime5 {
  0% {
    transform: translateY(-20px);
    opacity: 0;
  }

  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

#mobile {
  display: none;
}

@media screen and (max-width: 1200px) {
  #header {
    display: none;

  }

  #mobile {
    display: block;
  }

  #button {
    margin-top: 40px;
  }

  /* Styles pour le menu */
  #menu {
    background-color: white;
    width: 300px;
    transition: 0.2s;
    transform: translateX();
    position: absolute;
    z-index: 9999;
    display: none;
  }

  ul {
    text-decoration: none;
    list-style: none;
  }
}

#menu {
  display: none;
}


.navbar a i,
.navbar a:focus i {
  font-size: 12px;
  line-height: 0;
  margin-left: 5px;
}

.navbar a:hover,
.navbar .active,
.navbar .active:focus,
.navbar li:hover>a {
  color: #0b5d3f !important;
}

@import "../asset/css/style.css";
</style>

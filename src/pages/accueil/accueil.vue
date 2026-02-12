<template>
  
    <section class="main-view">
      <NavbarComponent />
      <BodyComponent />
      <FeaturedComponent />
    <FooterComponent />
  
    </section>
   
  </template>
  
  <script>
  import NavbarComponent from "../../components/NavbarComponent.vue";
  import BodyComponent from "../../components/BodyComponent.vue";
  import FeaturedComponent from "../../components/FeaturedComponent.vue";
  import FooterComponent from "../../components/FooterComponent.vue";



  
  export default {
    name: "accueil",
    components: {
      NavbarComponent,
      BodyComponent,
      FeaturedComponent,
      FooterComponent,
      
    },
  };
  </script>
  
  <style scoped>
  /* Votre code CSS ici */

  </style>
  
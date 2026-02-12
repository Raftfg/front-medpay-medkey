<template>
  <section class="main-view">
    <div class="container-scroller">
      <Header/>
      <div class="container-fluid page-body-wrapper">


        <Sidebar/>


        <div class="main-panel">
          <div class="content-wrapper">
            <router-view></router-view>
          </div> 
          <Footer/>
        </div> 
      </div> 
    </div>
  </section>
</template>

<script>

  import Header from "./partials/Header";
  import Sidebar from "./partials/Sidebar";
  import Footer from "./partials/Footer";
  
  export default {
    name: "layout",
    components: {
      Header,
      Sidebar,
      Footer
    }
  }
</script>

<template>
    <section class="main-view">
      <div class="container-scroller">
        <Header/>
        <div class="container-fluid page-body-wrapper">
          <!--<Sidebar/>  <div class="main-panel"> -->
          <div  style="width: 100% !important; height: 100% !important;" >
            <div class="content-wrapper" style="height: 100% !important;" >
              <router-view></router-view>
            </div> <!-- content wrapper ends -->
            <Footer/>
          </div> <!-- main panel ends -->
        </div> <!-- page-body-wrapper ends -->
      </div>
    </section>
  </template>
  
  <script>
    import Header from "./partials/Header";
    import Sidebar from "./partials/Sidebar";
    import Footer from "../layout/partials/Footer";
    export default {
      name: "layout2",
      components: {
        Header,
        Sidebar,
        Footer
      }
    }
  </script>

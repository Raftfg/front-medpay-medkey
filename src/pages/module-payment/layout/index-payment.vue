<template>
  <section class="main-view">
    <div class="container-scroller">
      <Header />
      <div class="container-fluid page-body-wrapper">
        <sidebarPayment />
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
import Header from "../../../layout/partials/Header";
import sidebarPayment from "./Sidebar-payment";
import Footer from "../../../layout/partials/Footer";

export default {
  name: "layoutPayment",
  components: {
    Header,
    sidebarPayment,
    Footer
  }
}
</script>
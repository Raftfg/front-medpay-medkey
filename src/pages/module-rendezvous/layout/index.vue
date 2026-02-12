<template>
  <section class="main-view">
    <div class="container-scroller">
      <Header />
      <div class="container-fluid page-body-wrapper">
        <sidebar />
        <div class="main-panel">
          <div class="content-wrapper">
            <router-view />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Header from "../../../layout/partials/Header";
import sidebar from "./sidebar";
import Footer from "../../../layout/partials/Footer";

export default {
  name: "rendezvous-layout",
  components: {
    Header,
    sidebar,
    Footer,
  },
};
</script>


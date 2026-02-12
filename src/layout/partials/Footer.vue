<template>
  <section class="app-footer" >
    <footer class="footer" style="background-color: rgb(219, 222, 225)">
      <div class="container-fluid clearfix">
        <span class="text-dark d-block text-center text-sm-left d-sm-inline-block font-weight-bold">
          Akasi Group SARL
          <span style="color: rgb(11, 93, 63)">@{{ currentYear }}</span> all
          right reserved
        </span>
        <span class="float-none float-sm-right d-block mt-1 mt-sm-0 text-right">
          <a href="/" target="_blank" style="text-decoration: none !important">
            <span style="text-color: rgb(11, 93, 63) !important" class="font-weight-bold">MED</span>
            <span class="font-weight-bold" style="color: rgb(201, 31, 59)">
              + </span><span class="font-weight-bold" style="color: rgb(255, 13, 33)">KEY</span>
          </a>
        </span>
      </div>
    </footer>
  </section>
</template>

<script>
export default {
  name: "app-footer",
  data() {
    return {
      currentYear: null,
    };
  },
  mounted() {
    const date = new Date();
    this.currentYear = date.getFullYear();
  },
};
</script>

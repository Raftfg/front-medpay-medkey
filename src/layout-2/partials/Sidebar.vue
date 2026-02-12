<template>
  <section class="app-sidebar sideside">
    <nav
      class="sidebar sidebar-offcanvas"
      id="sidebar"
      style="background: #0b5d3f"
    >
      <ul class="nav">
        <div class="surcote">
          <li class="nav-profile">
            <a href="javascript:void(0);" class="nav-link">
              <div
                class="navbar-brand brand-logo text-center navbar-brand-wrapper d-flex align-items-top justify-content-center"
              >
                <!-- <img src="@/assets/images/oms.svg" alt="profile" style="width: 90%; height:100%; margin-top: 3rem;"> -->
              </div>
            </a>
          </li>
          <li class="nav-profile hola">
            <div>
              <div
                class="text-center navbar-brand-wrapper align-items-top justify-content-center"
              >
                <h3
                  style="
                    margin-top: 13rem;
                    margin-bottom: 10rem;
                    color: #fff;
                    font-size: 20px;
                    font-family: 'Montserrat';
                  "
                >
                  Plateforme de dématérialisation des recettes sanitaires
                  <hr
                    style="
                      background-color: #fff;
                      width: 75%;
                      height: 0.1rem;
                      border-radius: 1rem;
                    "
                  />
                </h3>
              </div>
            </div>
          </li>
          <li class="nav-profile">
            <a href="javascript:void(0); nav-link">
              <div
                class="navbar-brand brand-logo text-center navbar-brand-wrapper d-flex align-items-top justify-content-center"
              >
                <!-- <img src="@/assets/images/logopay.png" alt="profile" style="width: 80%; height:100%; padding-left: 10px;"> -->
              </div>
            </a>
          </li>
        </div>
      </ul>
    </nav>
  </section>
</template>

<script>
import { LoginService, setLoggedIn } from "@/_services";

export default {
  name: "sidebar",
  data() {
    return {
  
      collapses: [{ show: false }, { show: false }, { show: false }],
    };
  },
  methods: {
    collapseAll() {
      var exp_elm = document.getElementsByClassName("show");
      if (exp_elm.length > 0) {
        var elm_id = exp_elm[0].id;
        this.$root.$emit("bv::toggle::collapse", elm_id);
      }
    },
   
  },
  mounted() {
    const body = document.querySelector("body");
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll(".sidebar .nav-item").forEach(function (el) {
      el.addEventListener("mouseover", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.add("hover-open");
        }
      });
      el.addEventListener("mouseout", function () {
        if (body.classList.contains("sidebar-icon-only")) {
          el.classList.remove("hover-open");
        }
      });
    });
  },
  watch: {
    $route() {
      document.querySelector("#sidebar").classList.toggle("active");
    },
  },
};
</script>

<style>
.special-style-icon {
  color: black !important;
}

#app-sidebar {
  background: #46e1ab;
}

.surcote {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.hola:hover {
  text-decoration: none;
}
</style>

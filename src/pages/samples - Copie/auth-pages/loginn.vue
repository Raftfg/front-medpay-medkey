<template>
  <div>
    <section class="login">
      <div class="container-scroller">
        <div class="container-fluid page-body-wrapper full-page-wrapper">
          <div class="content-wrapper d-flex align-items-center auth">
            <div class="row w-100 flex-grow">
              <div class="col-xl-4 col-lg-6 mx-auto">
                <div class="auth-form-light text-left">
                  <div class="brand-logo logo-brand p-2">
                    <img
                      class="w-50 ml-n4"
                      src="../../../assets/images/sante.png"
                      style="height: 60% !important;"
                    />
                    <img class="w-30" src="../../../assets/images/oms.svg" />
                  </div>
                  <center>
                    <div class="brand-logo">
                      <img src="../../../assets/images/logopay.png" class="w-50" />
                    </div>
                  </center>

                  <marquee behavior="alternate">
                    <h4 class="p-3">Bienvenue sur MEDPAY</h4>
                  </marquee>

                  <form class="pt-3">
                    <!-- <div class="form-group">
                    <input type="email" class="form-control form-control-lg" id="exampleInputEmail1"
                      placeholder="Username">
                  </div> -->

                    <div class="input-group mb-1 form-group p-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"
                          ><i
                            class="mdi mdi-email icon-sm text-dark align-middle"
                          ></i
                        ></span>
                      </div>
                      <input
                        type="email"
                        name="email"
                        class="form-control form-control-lg"
                        placeholder="Email"
                        aria-label="email"
                        id="exampleInputEmail1"
                        aria-describedby="basic-addon1"
                      />
                    </div>

                    <div class="input-group mb-0 form-group p-2">
                      <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1"
                          ><i
                            class="mdi mdi-lock icon-sm text-dark align-middle"
                          ></i
                        ></span>
                      </div>
                      <input
                        type="password"
                        name="password"
                        class="form-control form-control-lg"
                        placeholder="Password"
                        aria-label="password"
                        id="exampleInputPassword1"
                        aria-describedby="basic-addon1"
                      />
                    </div>

                    <div class="recaptcha">
                      <div
                        class="g-recaptcha p-3 mx-auto "
                        data-sitekey="6Ldy5-8lAAAAAOr9QMmIu6Awz7kKv52jQoBcRs13"
                      ></div>
                    </div>
                    <div class="mt-n2 p-2 ">
                      <router-link to="/" class="underline-none">
                        <button
                          type="button"
                          class="connect text-center  btn btn-block legend-dots bg-gradient-success"
                        >
                          <i class="mdi"></i>Se connecter
                        </button>
                      </router-link>
                    </div>
                    <div class="text-right font-weight-light p-4 ">
                      <router-link
                        to="/auth-pages/forget-password"
                        class="text-info"
                      >
                        Mot de passe oublié ?</router-link
                      >
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <!-- content-wrapper ends -->
        </div>
        <!-- page-body-wrapper ends -->
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "login",
  mounted() {
    // Chargez la bibliothèque reCAPTCHA
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    document.body.appendChild(script);
  },
};
</script>
<style>
.logo-brand {
  display: flex;
  justify-content: space-between;
}

.logo-brand img {
  margin-left: 0;
  margin-right: 10px;
}

.connect {
  font-size: 1.2rem;
  color: #fff;
}

.underline-none:hover {
  text-decoration: none !important;
}

@media screen and (max-height: 767px) {
  #rc-imageselect,
  .g-recaptcha {
    transform: scale(0.6);
    -webkit-transform: scale(0.7);
    transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
  }
}
</style>

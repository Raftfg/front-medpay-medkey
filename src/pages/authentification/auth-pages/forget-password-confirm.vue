<template>
    <section class="login">
        <div class="container-scroller">
            <div class="container-fluid page-body-wrapper full-page-wrapper">
                <div class="content-wrapper d-flex align-items-center auth">
                    <div class="row w-100 flex-grow">
                        <div class="col-xl-4 col-lg-6 mx-auto">
                            <div class="auth-form-light text-left">
                                <center>
                                    <div class="brand-logo mt-4">
                                        <img class=" mt-4" src="../../../assets/images/logopay.png" />
                                    </div>
                                </center>
                                <form class="pt-3">
                                    <!-- <div class="form-group">
                      <input type="email" class="form-control form-control-lg" id="exampleInputEmail1"
                        placeholder="Username">
                    </div> -->

                                    <div class="input-group mb-1 form-group p-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1"><i
                                                    class="mdi mdi-email icon-sm text-dark align-middle"></i></span>
                                        </div>
                                        <input type="email" name="email" class="form-control form-control-lg"
                                            placeholder="Email" aria-label="email" id="exampleInputEmail1"
                                            aria-describedby="basic-addon1" />
                                    </div>

                                    <div class="mt-0 mb-0 p-3">
                                        <router-link to="/auth-pages/reset" class="linked"><button type="button"
                                                class="connect btn btn-block legend-dots bg-gradient-success auth-form-btn">
                                                <i class="mdi "></i>Envoyez un lien de rénitialisation
                                            </button></router-link>
                                    </div>
                                    <h4>Nous avons envoyé un lien de rénitialisation de votre mot de passe par e-mail</h4>
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
</template>
  
<script>
export default {
    name: "login",
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


@media screen and (max-height: 767px) {

    #rc-imageselect,
    .g-recaptcha {
        transform: scale(0.57);
        -webkit-transform: scale(0.67);
        transform-origin: 0 0;
        -webkit-transform-origin: 0 0;
    }
}

.connect {
    font-size: 1.2rem;
    color: #fff;
}

.linked:hover {
    text-decoration: none;
}

.btn-connexion-green {

border: 3px solid rgb(11, 93, 63) !important;

box-shadow: none !important;
font-weight: 700 !important;
/* font-size: 16px !important; */
color: white !important;

/* Ajustez la taille du texte selon vos préférences */
/* padding: 0.685rem 0.49rem !important; */

}

.btn-connexion-green:hover {
/* Changez la couleur de fond au survol */
color: rgb(11, 93, 63) !important;
background-color: #ffffff !important;
/* Par exemple, une couleur de fond différente au survol */
}


</style>
  
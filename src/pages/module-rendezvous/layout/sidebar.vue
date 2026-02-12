<template>
  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <li class="nav-item nav-profile">
          <div class="nav-link">
            <div class="profile-image">
              <img
                src="@/assets/images/calendrier.png"
                alt="Rendez-vous"
                class="sidebar-icon-image"
              />
            </div>
            <div class="profile-name">
              <p class="name">Rendez-vous</p>
              <p class="designation">Planification & plannings</p>
            </div>
          </div>
        </li>

        <li class="nav-item">
          <router-link
            class="nav-link"
            :to="{ name: 'rendezvous.planning' }"
            style="text-decoration: none"
          >
            <i class="mdi mdi-calendar-clock menu-icon text-white"></i>
            <span class="menu-title">Planning & rendez-vous</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </section>
</template>

<script>
export default {
  name: "rendezvous-sidebar",
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    try {
      this.user = JSON.parse(localStorage.getItem("user"));
    } catch (e) {
      console.error("Erreur lors du parsing de l'utilisateur dans Sidebar Rendez-vous:", e);
    }

    const body = document.querySelector("body");
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
.nav-item,
.nav-link {
  font-family: "Montserrat";
  text-align: left !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
}

.menu-icon {
  margin-right: 10px;
  font-size: 18px; /* Réduction de la taille de l'icône pour un meilleur rendu */
  color: #ffffff !important; /* Forcer l'icône en blanc dans le sidebar */
}

.sidebar-icon-image {
  width: 28px;
  height: 28px;
  object-fit: contain;
  filter: brightness(0) invert(1); /* transforme l'icône en blanc */
}
</style>

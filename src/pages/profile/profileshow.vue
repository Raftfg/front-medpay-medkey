<template>
  <!-- Affichage des informations du profil -->
  <div class="row">
    <div class="col-md-3">
      <div class="card card-primary card-outline">
        <!-- ... (le reste du code pour la partie gauche du profil) ... -->
      </div>
      <!-- Code added above "A propos" section -->

      <div class="card card-primary">
        <div class="card-header">
          <h3 class="card-title text-white">Profil</h3>
          <!-- Add the heading here -->
        </div>

        <div class="card-body">
          <!-- Profile image -->
          <div class="text-center mb-3">
            <img src="@/assets/images/user.png" alt="image" class="profile-image" />
          </div>

          <!-- User information -->
          <h3 class="profile-username text-center text-capitalize">
            {{ user.prenom }} {{ user.name }}
          </h3>
          <p class="text-muted text-center text-capitalize font-weight-bold">
            {{ user.roles[0].name }}
            <!-- <span class="font-weight-bold">{{ user.roles[0].name }}</span> -->
          </p>

          <router-link v-if="user.uuid" :to="{ name: 'profile-update', params: { uuid: user.uuid } }"
            class="nav-link baa text-center">
            Modifier mes informations
          </router-link>
        </div>
      </div>
    </div>

    <div class="col-md-9">
      <div class="card">
        <div class="card-header p-2 d-flex justify-content-between">
          <ul class="nav nav-pills">
            <li class="text-red">
              <!-- Lien actif pour les informations du profil -->
              <span class="text-white">Informations Générales</span>
            </li>
          </ul>
          <ul class="nav nav-pills">
            <li class="ml-3">
              <!-- Lien pour modifier le mot de passe -->
              <router-link :to="{ path: '/profile/create' }">
                Modifier mon mot de passe
              </router-link>
            </li>
          </ul>
        </div>
        <div class="card-body">
          <div class="tab-content">
            <div class="active tab-pane" id="activity">
              <div class="row post">
                <!-- Affichage des informations du profil -->
                <div class="col-md-4  d-grid">
                  <h6 class="form-label fw-bold font-weight-bold">Nom</h6>
                  <p class="text-capitalize">{{ user.name }}</p>
                </div>
                <!-- Prenoms -->

                <div class="col-md-4 p-1 d-grid">
                  <h6 class="form-label fw-bold font-weight-bold">Prénom(s)</h6>
                  <p class="text-capitalize">{{ user.prenom }}</p>
                </div>
                <!-- Email -->
                <div class="col-md-4 p-1 d-grid">
                  <h6 class="form-label fw-bold font-weight-bold">Email</h6>
                  <p>{{ user.email }}</p>
                </div>

                <div class="col-md-4  d-grid">
                  <h6 class="form-label fw-bold font-weight-bold">Sexe</h6>
                  <p class="text-capitalize">{{ user.sexe }}</p>
                </div>
                <!-- Email -->
                <div class="col-md-4 p-1 d-grid">
                  <h6 class="form-label fw-bold font-weight-bold">Adresse</h6>
                  <p>{{ user.adresse }}</p>
                </div>
                <div class="col-md-4 p-1 d-grid">
                  <h6 class="form-label fw-bold font-weight-bold">Téléphone</h6>
                  <p class="text-capitalize">{{ user.telephone }}</p>
                </div>

                <div class="col-md-4 d-grid">
                  <h6 class="form-label fw-bold font-weight-bold">Rôle</h6>
                  <p class="text-capitalize">{{ user.roles[0].name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- <script>
export default {
  name: "app-profil",
  data() {
    return {
      roles: [],
      role:{},
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  created() {
  },
  methods: {
  },
};
</script> -->

<script>
import { LoginService } from "@/_services";
import { roleService } from "@/_services";
export default {
  name: "app-profil",
  data() {
    return {
      roles: [],
      role: {},
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  mounted() {
   
  },
  created() {
    // Assurez-vous que l'événement 'user-updated' est écouté pour mettre à jour le localStorage
    this.$root.$on("user-updated", this.updateUserInLocalStorage);
  },
  methods: {
    updateUserProfile() {
      // Appel à votre service pour récupérer les dernières données de l'utilisateur
      LoginService.getUser(this.user.uuid)
        .then((res) => {
          // Mettez à jour la variable user du composant
          console.log(res);
          this.user = res.data.data;

          // Mettez à jour le localStorage
          localStorage.setItem("user", JSON.stringify(this.user));

          // Émettez l'événement pour signaler la mise à jour
          this.$root.$emit("user-updated", this.user);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    updateUserInLocalStorage(updatedUser) {
        // Conservez le rôle de l'utilisateur avant de mettre à jour
    updatedUser.roles = this.user.roles;

// Mettez à jour la variable user du composant
      this.user = updatedUser;
      localStorage.setItem("user", JSON.stringify(updatedUser));
    },
  },
};
</script>

<style scoped>
/* Styles spécifiques pour cette composante */

.profile-image {
  max-width: 59%;
  height: auto;
  border-radius: 50%;
}

.profile-username {
  font-size: 1.5rem;
  margin-bottom: 5px;
}

.text-capitalize {
  text-transform: capitalize;
}

/* Ajout de styles Bootstrap pour la cohérence */
.nav-pills .nav-link {
  color: #495057;
}

.nav-pills .nav-link.active {
  background-color: #0b5d3f;
  color: #fff;
}

.card-primary {
  border: 1px solid #0b5d3f;
}

.card-header {
  background-color: #0b5d3f;
  color: #fff;
}

.form-label {
  font-weight: bold;
}
</style>

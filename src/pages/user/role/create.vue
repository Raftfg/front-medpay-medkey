<template>
  <section class="container-scroller">
    <div class="page-header">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);" class="text-dark font-weight-bold"
              >Paramètre
            </a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Rôle Utilisateurs
          </li>
          <li
            class="breadcrumb-item active text-success font-weight-bold"
            aria-current="page"
          >
            Ajouter
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Ajouter un Rôle</h4>
            <form @submit.prevent="addRole" class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="roleName">Rôle</label>
                  <input
                    type="text"
                    v-model="roleName"
                    class="form-control"
                    id="roleName"
                    placeholder="Rôle"
                  />
                </div>
                <div class="form-group">
                  <label for="roleDescription">Description</label>
                  <textarea
                    class="form-control"
                    v-model="roleDescription"
                    id="roleDescription"
                    rows="4"
                  ></textarea>
                </div>
              </div>

               <div class="d-flex justify-content-between  col-12 flex-row">
                <button  class="btn btn-secondary btn-medpay-gray">Cancel</button>

        <button type="submit" class="btn btn-success btn-medpay-green mr-2">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import "@/assets/vendors/mdi/css/materialdesignicons.min.css";
import { roleService } from "@/_services/roles_services.js";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "create-role",

  data() {
    return {
      roleName: "",
      roleDescription: "",
    };
  },
  methods: {
    addRole() {
      const role = {
        name: this.roleName,
        description: this.roleDescription,
      };
      console.log("Valeurs entrées par l'utilisateur :", role);

      roleService
        .addRole(role)
        .then((response) => {
          // Traitement en cas de succès
          console.log("Résultat de l'ajout du rôle :", response.data);
          // Afficher un message de succès
          // alert("La compagnie a été ajoutée avec succès.");

          // Réinitialiser les champs du formulaire
          this.roleNameName = "";
          this.roleDescription = "";
          // Rediriger vers la page "compagnie/list"
          this.$router.push("/user/role/list");
          this.$toast.success("Enregistrement effctué avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
        
        })
        .catch((error) => {
          // Traitement en cas d'erreur
          console.error("Erreur lors de l'ajout du rôle :", error);
        });
    },
  },
};
</script>

<style>
select {
  cursor: pointer;
  height: 43px !important;
}

input[type="radio"].demo6 {
  display: none;
}

input[type="radio"].demo6 + label {
  position: relative;
  padding-left: 1.3rem;
}

input[type="radio"].demo6 + label::before,
input[type="radio"].demo6 + label::after {
  display: block;
  position: absolute;
  box-sizing: border-box;
  content: "";
  border-radius: 1rem;
}

input[type="radio"].demo6 + label::before {
  bottom: 0;
  left: 0;
  border: 1px solid #ccc;
  background-color: #eee;
  width: 1rem;
  height: 1rem;
}

input[type="radio"].demo6 + label::after {
  bottom: 3px;
  left: 3px;
  width: calc(1rem - 6px);
  height: calc(1rem - 6px);
}

input[type="radio"].demo6:checked + label::after {
  background-color: #45c28e;
}

input[type="checkbox"].demo2 {
  display: none;
}

input[type="checkbox"].demo2 + label::before {
  content: "";
  border: 1px solid #45c28e;
  padding: 0 0.6rem;
  margin-right: 0.3rem;
}

input[type="checkbox"].demo2:checked + label::before {
  background-color: #45c28e;
}
</style>

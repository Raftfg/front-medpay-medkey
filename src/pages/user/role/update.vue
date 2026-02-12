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
            Modifier
          </li>
        </ol>
      </nav>
    </div>

    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h4 class="card-title">Modifier un Rôle</h4>
            <form @submit.prevent="update" class="forms-sample row">
              <div class="col-md-12">
                <div class="form-group">
                  <label for="name">Rôle</label>
                  <input
                    type="text"
                    v-model="role.name"
                    class="form-control"
                    id="name"
                    placeholder="Rôle"
                  />
                </div>
                <div class="form-group">
                  <label for="description">Description</label>
                  <textarea
                    class="form-control"
                    v-model="role.description"
                    id="description"
                    rows="4"
                  ></textarea>
                </div>
              </div>

               <div class="d-flex justify-content-between  col-12 flex-row">
                <button  class="btn btn-secondary btn-medpay-gray">Cancel</button>

        <button type="submit" class="btn btn-success btn-medpay-green mr-2">
                  Modifier
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<!--<script>
// import "@/assets/vendors/mdi/css/materialdesignicons.min.css";
import { roleService } from "@/_services/roles_services.js";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "update-role",
  props: ["id"],
  data() {
    return {
      role: [],
    };
  },
  mounted() {
    roleService.getRole(this.id).then((res) => {
      this.role = res.data.data;
      this.role.id = this.id;
    });
  },
  methods: {
    update() {
      roleService
        .updateRole(this.role)
        .then((res) => {
          this.$toast.success("Modification effctuée avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
          this.$router.push("/user/role/list");
        })
        .catch((err) => {
          //   this.$toast.success("Veuillez remplir les champs requis, merci !", {
          //     position: POSITION.TOP_RIGHT,
          //     timeout: 3000,
          //     bodyStyle: {
          //       borderRadius: "10px",
          //       backgroundColor: "#f0f0f0",
          //       color: "#333",
          //       fontWeight: "bold",
          //     },
          //   })
        });
    },
  },
};
</script> -->

<script>
import { roleService } from "@/_services/roles_services.js";
import { useToast, POSITION } from "vue-toastification";

export default {
  name: "update-role",
  props: ["id"],
  data() {
    return {
      role: [],

    };
  },
  mounted() {
    roleService.getRole(this.id).then((res) => {
      this.role = res.data.data;
      this.role.id = this.id;
    });
  },
  methods: {
    update() {
      roleService
        .updateRole(this.role)
        .then((res) => {
          this.$toast.success("Modification effectuée avec succès !", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
          this.$router.push("/user/role/list");
        })
        .catch((err) => {
          this.$toast.error("Erreur lors de la modification du rôle.", {
            position: POSITION.TOP_RIGHT,
            timeout: 3000,
            bodyStyle: {
              borderRadius: "10px",
              backgroundColor: "#f0f0f0",
              color: "#333",
              fontWeight: "bold",
            },
          });
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

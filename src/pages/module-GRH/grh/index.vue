<template>
  <section class="container-scroller">

    <div class="row">
      <div class="col-lg-12 grid-margin">
        <h3 class="card-title text-white rounded p-1 mb-1 text-center" style="background-color: #0B5D3F; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-transform: none;">
          Liste du personnel
        </h3>
        <div class="card">

          <div class="card-body">
            <div class="input-group input-group-sm mb-3 w-100">
          <router-link to="/grh/create">
            <button class="btn btn-success btn-sm btn-medpay-green-small  " type="button">Nouvel employé</button> </router-link>
            &nbsp;&nbsp;
            <input @input="fetchEmployer(q)" type="text" v-model="q" class="form-control rounded-pill py-3" placeholder="Rechercher un employé ..."
            aria-label="">
          </div>

            <div class="table-responsive" style="min-height:200px">
              <table id="order-listing" ref="myTable" class="table table-bordered table-hover">
                <thead>
                  <tr style="background-color: rgb(216, 218, 216)">
                    <th>#</th>
                    <th>Nom</th>
                    <th>Prénom(s)</th>
                    <th>Téléphone</th>
                    <th>Service</th>
                    <th>Poste</th>
                    <th>Email</th>
                    <th>Sexe</th>
                    <!-- <th>N° Sécurité social</th> -->
                    <th class="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(employer, index) in employers" :key="employer.uuid">
                    <td>{{ index + 1 }}</td>
                    <td style="text-transform: uppercase">{{ employer.last_name }}</td>
                    <td style="text-transform: capitalize">
                      {{ employer.first_name }}
                    </td>
                    <td>{{ employer.phone_number }}</td>
                    <td>
                      <span v-if="employer.services && employer.services.name">{{ employer.services.name }}</span>
                      <span v-else class="text-muted">-</span>
                    </td>
                    <td>
                      <span v-if="employer.function">{{ employer.function }}</span>
                      <span v-else class="text-muted">-</span>
                    </td>
                    <td>{{ employer.email }}</td>
                    <td>{{ employer.sex }}</td>
                    <!-- <td>{{ employer.social_security_number }}</td> -->
                    <!-- <td class="text-right" width="50px"></td> -->
                    <td class="text-center">
                      <!-- <b-button
                        @click="detail(employer)"
                        size="sm"
                        v-b-tooltip.hover
                        title="Détail"
                        variant="success"
                      >
                        <i
                          class="mdi mdi-eye text-white menu-icon"
                        ></i>
                      </b-button>

                      <b-button
                        @click="update(employer.uuid)"
                        size="sm"
                        v-b-tooltip.hover
                        title="Modifier"
                        variant="warning"
                      >
                        <i
                          class="fa fa-pencil-square-o  text-dark" aria-hidden="true"
                        ></i>
                      </b-button>

                      <b-button
                        @click="supprimer(index)"
                        size="sm"
                        v-b-tooltip.hover
                        title="Supprimer"
                        variant="danger"
                      >
                        <i
                          class="mdi mdi mdi-delete text-white menu-icon"
                        ></i>
                      </b-button> -->
                      <div class="btn-group btn-group-sm" role="group">
                        <button
                          id="btnGroupDrop1"
                          type="button"
                          style="padding: 0px 10px"
                          class="btn btn-light dropdown-toggle"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          &nbsp;
                          <i class="fa fa-tasks" aria-hidden="true"></i> &nbsp;
                        </button>
                        <div class="dropdown-menu action-button-div" aria-labelledby="btnGroupDrop1" style="box-shadow: 0 4px 6px rgb(0 0 0 / 30%)">                          
                          <a @click="details(employer.uuid)" class="dropdown-item" style="cursor: pointer;">
                            <i class="mdi mdi-eye menu-icon"></i>Détail
                            </a>
                          <hr class="m-1" />
                          <a @click="update(employer.uuid)" class="dropdown-item" style="cursor: pointer;">
                            <i class="fa fa-pencil-square-o" aria-hidden="true"></i>Modifier
                          </a>
                          <!-- <a
                            @click="supprimer(index)"
                            class="dropdown-item text-danger"
                            href="#"
                          >
                            <i class="mdi mdi mdi-delete menu-icon"></i>
                            Supprimer</a
                          > -->
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import $ from "jquery";
import "../../../../node_modules/bootstrap/dist/js/bootstrap.js"; // tres important pour le modal
import "../../../../node_modules/bootstrap/dist/js/bootstrap.min.js"; // tres important pour le modal

import { employerService } from "@/_services";

export default {
  name: "employers",
  data() {
    return {
      employers: [],
      deleteIndex: null,
      deleteName: "",
      q: "",
      table: null,
      last_name: "",
      first_name: "",
      termination_date : "",
      address: "",
      date_birth: "",
      employment_status: "",
      social_security_number: "",
      hire_date: "",
      phone_number: "",
      email: "",
      uuid: "",
      // last_name, first_name, age, adresse, telephone, email, whatsapp, profession, sexe, urgencecontact, autre,
    };
  },
  mounted() {
    employerService.getEmployer(this.uuid).then((res) => {
      this.employer = res.data.data;
      this.employer.uuid = this.uuid;
    });

    employerService.getAllEmployers().then((res) => {
      this.employers = res.data.data;
      // Charger les relations service pour chaque employé si nécessaire
      this.employers.forEach(emp => {
        if (emp.services_id && !emp.services) {
          // Les relations devraient être chargées par l'API si le backend les inclut
        }
      });
      this.$nextTick(() => {
        // Initialisation simple de DataTables sans options avancées
        if ($.fn.DataTable.isDataTable(this.$refs.myTable)) {
          $(this.$refs.myTable).DataTable().destroy();
        }
        this.table = $(this.$refs.myTable).DataTable({
          pageLength: 10,
        });
      });
    });
  },
  methods: {
    fetchEmployer(request) {
      employerService.getSearchEmployers(request).then((res) => {
        this.employers = res.data.data;
      });
    },

    detail(employer) {
      this.uuid = employer.uuid;
      this.last_name = employer.last_name;
      this.first_name = employer.first_name;
      this.address = employer.address;
      this.phone_number = employer.phone_number;
      this.email = employer.email;
      this.hire_date = employer.hire_date;
      this.termination_date = employer.termination_date;
      this.date_birth = employer.date_birth;
      this.employment_status = employer.employment_status;
      this.social_security_number = employer.social_security_number;
      $("#showDetail").modal("show");
    },
    update(uuid) {
      this.$router.push("/grh/update/" + uuid);
    },
    details(uuid) {
      this.$router.push("/grh/detail/" + uuid);
    },
    // supprimer(index) {
    //   console.log(index);
    //   employerService
    //     .deleteemployer(this.employers[index].uuid)
    //     .then((res) => {
    //       this.employers.splice(index, 1);
    //       console.log(res);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    supprimer(index) {
      this.deleteIndex = index;
      this.deleteName =
        this.employers[index].last_name + " " + this.employers[index].first_name;
      $("#confirmDeleteModal").modal("show");
    },

    // confirmDelete() {
    //   const index = this.deleteIndex;
    //   const name = this.deleteName;

    //   if (index !== null) {
    //     employerService
    //       .deleteemployer(this.employers[index].uuid)
    //       .then((res) => {
    //         this.employers.splice(index, 1);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       })
    //       .finally(() => {
    //         this.deleteIndex = null;
    //         this.deleteName = "";
    //         $("#confirmDeleteModal").modal("huuide");
    //       });
    //   }

    // },
    confirmDelete() {
      const index = this.deleteIndex;
      const name = this.deleteName;
      if (index !== null) {
        employerService
          .deleteEmployer(this.employers[index].uuid)
          .then((res) => {
            this.employers.splice(index, 1);
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            this.deleteIndex = null;
            this.deleteName = "";
            $("#confirmDeleteModal").modal("hide");
          });
      }
    },
  },
};
</script>

<style scoped>
@import "../../../../node_modules/bootstrap-vue/dist/bootstrap-vue.css";
@import "../../../../node_modules/datatables.net-bs4/css/dataTables.bootstrap4.css";

#confirmDeleteModal .modal-dialog {
  max-width: 500px;
  border-radius: 10px;
}

#confirmDeleteModal .modal-content {
  border: none;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

#confirmDeleteModal .modal-header {
  background-color: #f8f9fa;
  border-radius: 10px 10px 0 0;
  border-bottom: none;
}

#confirmDeleteModal .close {
  font-size: 24px;
  color: #6c757d;
}

#confirmDeleteModal .alert {
  border-radius: 10px;
}

#confirmDeleteModal .alert p {
  margin-bottom: 0;
  font-weight: bold;
}

#confirmDeleteModal .modal-body {
  padding: 20px;
}

#confirmDeleteModal .modal-title {
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
}

#confirmDeleteModal .modal-value {
  margin-bottom: 10px;
  font-size: 16px;
}

#confirmDeleteModal .modal-footer {
  border-top: none;
  background-color: #f8f9fa;
  border-radius: 0 0 10px 10px;
}

#confirmDeleteModal .btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

#confirmDeleteModal .btn-danger:hover,
#confirmDeleteModal .btn-danger:focus {
  background-color: #c82333;
  border-color: #bd2130;
}
.btn-red {
    color: red; /* Définit la couleur du texte en rouge */
    background-color: #fff; /* Définit la couleur de fond en blanc (si nécessaire) */
    /* Ajoutez d'autres styles CSS au besoin */
}
</style>

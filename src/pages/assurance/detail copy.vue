<template>
  <section class="container-scroller">
    <div class="row">
      <div class="col-md-12 grid-margin stretch-card">
        <div class="card">
          <div class="card-body">
            <h3 class="card-title text-white rounded p-3  text-center" style="background-color: #0B5D3F;
                        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); ">
              <span style="text-transform: uppercase">{{ insurance.name }}</span>
            </h3>
            <div class="row bg-stripped">
              <div class="col-md-12">
                <!-- Fieldset pour les packs associés à l'assurance -->
                <fieldset class="form-group border px-5 py-1">
                  <legend class="w-auto px-2">Packs associé(s) à cette assurance 
                  </legend>
                  <div v-if="packs.length > 0" class="row">
                    <div v-for="(pack, index) in packs" :key="index" class="col-md-4 mb-4  middle vr" :style="{
                      borderRight: (index + 1) % 3 !== 0 && index !== packs.length - 1 ? '1px solid #ddd' : 'none',
                      borderLeft: index % 3 !== 0 ? '1px solid #ddd' : 'none'
                    }">
                      <h5>Pack {{ index + 1 }}</h5>
                      <p><strong>Nom du pack:</strong> <span style="text-transform: uppercase">{{ pack.designation
                      }}</span></p>
                      <p><strong>Pourcentage:</strong> {{ pack.percentage }}%</p>
                      <!-- <hr v-if="(index + 1) % 1 === 0 && index !== packs.length - 1"> -->
                    </div>
                  </div>
                  <!-- Afficher le message si aucun pack n'est disponible -->
                  <p v-else class="text-center">Aucun pack disponible pour cette assurance</p>

                </fieldset>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { packService } from "@/_services";
import { insuranceService } from "@/_services";
export default {
  name: "detail",
  props: ["uuid"],
  data() {
    return {
      packs: [],
      insurance: "",
    };
  },

  mounted() {
    // Récupérer les détails de l'assurance
    insuranceService.getInsurance(this.uuid).then((res) => {
      this.insurance = res.data.data;
    });

    // Récupérer les packs associés à l'assurance
    packService.getPackByAssurance(this.uuid).then((res) => {
      this.packs = res.data;
    }).catch((error) => {
      console.error(error);
    });
  },
};
</script>
<style>
fieldset {
  /* border: 1px solid #ccc; */

  padding: 10px;
  margin-bottom: 2px;
  border-radius: 5px;
  box-shadow: #f5f5f5;
  background-color: #f5f5f5;
  padding: 16px;
}

legend {
  font-size: 12px;
}
</style>
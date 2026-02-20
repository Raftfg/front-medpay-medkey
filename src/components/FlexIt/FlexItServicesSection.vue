<template>
  <!-- Section Fonctionnalités (page /services) -->
  <section class="services services-boxed mega-section" id="services">
    <div class="container">
      <div class="sec-heading">
        <div class="content-area">
          <span class="pre-title wow fadeInUp" data-wow-delay=".2s">{{ $t('accueil.services_page.pre_titre') }}</span>
          <h2 class="title wow fadeInUp" data-wow-delay=".4s">{{ $t('accueil.services_page.titre') }}</h2>
          <p class="subtitle wow fadeInUp" data-wow-delay=".6s">{{ $t('accueil.services_page.sous_titre') }}</p>
        </div>
      </div>
      <div class="row gx-4 gy-4 services-row text-center">
        <div v-for="(mod, index) in modules" :key="mod.key" class="col-12 col-md-6 col-lg-4 mx-auto">
          <div class="box service-box wow fadeInUp reveal-start" :data-wow-offset="0" :data-wow-delay="mod.delay">
            <div class="service-icon"><i :class="mod.icon + ' font-icon'"></i></div>
            <span class="service-num hollow-text">{{ index + 1 }}</span>
            <div class="service-content">
              <h3 class="service-title">{{ mod.titre }}</h3>
              <p class="service-text">{{ mod.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "FlexItServicesSection",
  data() {
    return {
      moduleKeys: [
        { key: "adt", icon: "fas fa-procedures" },
        { key: "dme", icon: "fas fa-file-medical" },
        { key: "cpoe", icon: "fas fa-prescription" },
        { key: "pharmacie", icon: "fas fa-pills" },
        { key: "lis", icon: "fas fa-microscope" },
        { key: "ris_pacs", icon: "fas fa-x-ray" },
        { key: "facturation", icon: "fas fa-file-invoice-dollar" },
        { key: "planification", icon: "fas fa-calendar-alt" },
        { key: "rh", icon: "fas fa-user-md" },
        { key: "maintenance", icon: "fas fa-tools" },
        { key: "stocks", icon: "fas fa-truck" },
        { key: "bi", icon: "fas fa-chart-bar" },
        { key: "portail_patient", icon: "fas fa-laptop-medical" },
        { key: "telemedecine", icon: "fas fa-network-wired" },
        { key: "epidemiologie", icon: "fas fa-chart-line" },
        { key: "datawarehouse", icon: "fas fa-database" },
        { key: "ehr", icon: "fas fa-user-injured" }
      ]
    };
  },
  computed: {
    modules() {
      return this.moduleKeys.map((m, i) => ({
        key: m.key,
        icon: m.icon,
        titre: this.$t("accueil.modules.liste." + m.key + ".titre"),
        description: this.$t("accueil.modules.liste." + m.key + ".description"),
        delay: (i % 6) * 0.1 + 0.1 + "s"
      }));
    }
  }
};
</script>

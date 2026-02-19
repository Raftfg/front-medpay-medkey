<template>
  <div class="box service-box wow fadeInUp reveal-start" :data-wow-delay="delay">
    <div class="service-icon"><i :class="icon + ' font-icon'"></i></div>
    <div class="service-content">
      <h3 class="service-title">{{ titre }}</h3>
      <p class="service-text">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlexItModuleCard",
  props: {
    icon: { type: String, required: true },
    titre: { type: String, required: true },
    description: { type: String, required: true },
    delay: { type: String, default: "0.1s" }
  }
};
</script>

<template>
  <!-- Start inner Page hero-->
  <section class="d-flex align-items-center page-hero inner-page-hero" id="page-hero">
    <div class="overlay-photo-image-bg parallax" :style="{ backgroundImage: 'url(' + bgImg + ')' }" data-bg-opacity="1"></div>
    <div class="overlay-color" data-bg-opacity=".75"></div>
    <div class="container">
      <div class="hero-text-area centerd">
        <h1 class="hero-title wow fadeInUp" data-wow-delay=".2s">{{ title }}</h1>
        <nav aria-label="breadcrumb">
          <ul class="breadcrumb wow fadeInUp" data-wow-delay=".6s">
            <li class="breadcrumb-item"><a class="breadcrumb-link" href="/"><i class="bi bi-house icon"></i>home</a></li>
            <li v-for="(item, idx) in breadcrumbs" :key="idx" :class="['breadcrumb-item', { active: item.active }]">
              <a v-if="!item.active" class="breadcrumb-link" :href="item.link">{{ item.name }}</a>
              <template v-else>{{ item.name }}</template>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </section>
  <!-- End inner Page hero-->
</template>

<script>
export default {
  name: "FlexItBreadcrumb",
  props: {
    title: { type: String, required: true },
    breadcrumbs: { type: Array, required: true },
    bgImg: { type: String, default: require("@/assets/flex-it/assets/images/hero/inner-page-hero.jpg") }
  }
};
</script>

<template>
  <!-- Start portfolio-slider Section-->
  <section class="portfolio mega-section" id="portfolio">
    <div class="container">
      <div class="sec-heading">
        <div class="content-area">
          <span class="pre-title wow fadeInUp" data-wow-delay=".2s">portfolio</span>
          <h2 class="title wow fadeInUp" data-wow-delay=".4s">Awesome <span class='hollow-text'>portfolio</span></h2>
        </div>
        <div class="cta-area wow fadeInUp" data-wow-delay=".8s"><router-link class="cta-btn btn-solid" to="/portfolio">see more <i class="bi bi-arrow-right icon "></i></router-link></div>
      </div>
      <div class="portfolio-wrapper">
        <!--a menu of links to show the photos users needs   -->
        <ul class="portfolio-btn-list wow fadeInUp" data-wow-delay=".2s">
          <li v-for="cat in categories" :key="cat.filter" :class="['portfolio-btn', { active: currentFilter === cat.filter }]" :data-filter="cat.filter" @click="currentFilter = cat.filter">
            {{ cat.name }}
          </li>
        </ul>
        <div class="portfolio-group wow fadeIn" data-wow-delay=".4s">
          <div class="row">
            <div v-for="(item, idx) in portfolioItems" :key="idx" :class="['col-12 col-md-6 col-lg-4 portfolio-item', item.category]">
              <div class="item">
                <router-link class="portfolio-img-link" to="/portfolio">
                  <img class="portfolio-img img-fluid" loading="lazy" :src="item.img" alt="portfolio item photo"/>
                </router-link>
                <div class="item-info">
                  <h3 class="item-title">{{ item.title }}</h3><i class="bi bi-arrow-right icon "></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End portfolio-slider Section-->
</template>

<script>
export default {
  name: "FlexItPortfolioSection",
  data() {
    return {
      currentFilter: "*",
      categories: [
        { name: "All", filter: "*" },
        { name: "mobile apps", filter: ".mobile" },
        { name: "cloud", filter: ".web" },
        { name: "data analaysis", filter: ".data" },
        { name: "hosting", filter: ".hosting" }
      ],
      portfolioItems: [
        { title: "mobile apps", category: "mobile", img: require("@/assets/flex-it/assets/images/portfolio/1.jpg") },
        { title: "cloud", category: "web", img: require("@/assets/flex-it/assets/images/portfolio/2.jpg") },
        { title: "data analaysis", category: "data", img: require("@/assets/flex-it/assets/images/portfolio/3.jpg") },
        { title: "hosting", category: "mobile", img: require("@/assets/flex-it/assets/images/portfolio/4.jpg") },
        { title: "SEO", category: "hosting", img: require("@/assets/flex-it/assets/images/portfolio/5.jpg") },
        { title: "other category", category: "mobile", img: require("@/assets/flex-it/assets/images/portfolio/6.jpg") }
      ]
    };
  }
};
</script>

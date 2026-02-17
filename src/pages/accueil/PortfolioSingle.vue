<template>
  <div class="portfolio-single-page">
    <FlexItBreadcrumb 
      :title="projectTitle" 
      :breadcrumbs="[
        { name: 'Home', path: '/' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: projectTitle, path: '' }
      ]"
    />
    
    <div class="portfolio-single">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-10 mx-auto">
            <!-- Project Gallery -->
            <div class="project-gallery row">
              <div v-for="(image, idx) in projectImages" :key="idx" class="col-12 col-md-6 mb-4">
                <div class="gallery-item">
                  <a :href="image" data-fancybox="gallery">
                    <img :src="image" class="img-fluid" loading="lazy" alt="Project Image">
                  </a>
                </div>
              </div>
            </div>
            
            <!-- Project Details -->
            <div class="project-details mt-5">
              <h2>{{ projectTitle }}</h2>
              <div class="row mt-4">
                <div class="col-12 col-md-3">
                  <div class="project-meta mb-3">
                    <strong>Client:</strong><br>
                    <span>{{ client }}</span>
                  </div>
                </div>
                <div class="col-12 col-md-3">
                  <div class="project-meta mb-3">
                    <strong>Category:</strong><br>
                    <span>{{ category }}</span>
                  </div>
                </div>
                <div class="col-12 col-md-3">
                  <div class="project-meta mb-3">
                    <strong>Date:</strong><br>
                    <span>{{ projectDate }}</span>
                  </div>
                </div>
                <div class="col-12 col-md-3">
                  <div class="project-meta mb-3">
                    <strong>Website:</strong><br>
                    <a :href="website" target="_blank">Visit Site</a>
                  </div>
                </div>
              </div>
              
              <div class="project-description mt-4">
                <h3>Project Description</h3>
                <div v-html="description"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FlexItBreadcrumb from "@/components/FlexIt/FlexItBreadcrumb.vue";

export default {
  name: "PortfolioSingle",
  components: {
    FlexItBreadcrumb
  },
  data() {
    return {
      projectTitle: "Amazing Project Title",
      client: "Acme Corporation",
      category: "Web Development",
      projectDate: "January 2024",
      website: "https://example.com",
      projectImages: [
        require("@/assets/flex-it/assets/images/sections-bg-images/1.jpg"),
        require("@/assets/flex-it/assets/images/sections-bg-images/2.jpg"),
        require("@/assets/flex-it/assets/images/sections-bg-images/1.jpg"),
        require("@/assets/flex-it/assets/images/sections-bg-images/2.jpg")
      ],
      description: `
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit explicabo quis veritatis, 
        sed ipsam reprehenderit aliquam magni perferendis nobis maiores inventore, harum pariatur.</p>
        
        <p>Deleniti quas, ea fuga vel, quis officiis laborum quaerat numquam possimus 
        qui alias fugiat aliquam eius soluta beatae? Nam eum unde tenetur nisi temporibus veniam cumque nemo!</p>
        
        <h4>Key Features</h4>
        <ul>
          <li>Responsive design for all devices</li>
          <li>Modern and clean interface</li>
          <li>Fast loading times</li>
          <li>SEO optimized</li>
        </ul>
      `
    };
  },
  mounted() {
    const slug = this.$route.params.slug;
    console.log("Portfolio project slug:", slug);
    // TODO: Fetch project data based on slug
  }
};
</script>

<style scoped>
.project-meta strong {
  color: var(--clr-main);
  font-weight: 600;
}

.gallery-item {
  overflow: hidden;
  border-radius: 8px;
}

.gallery-item img {
  transition: transform 0.3s ease;
}

.gallery-item:hover img {
  transform: scale(1.05);
}
</style>

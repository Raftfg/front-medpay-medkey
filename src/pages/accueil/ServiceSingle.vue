<template>
  <div class="service-single-page">
    <FlexItBreadcrumb 
      :title="serviceTitle" 
      :breadcrumbs="[
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: serviceTitle, path: '' }
      ]"
    />
    
    <div class="service-single">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-10 mx-auto">
            <!-- Service Header -->
            <div class="service-header text-center mb-5">
              <div class="service-icon mb-4">
                <i :class="serviceIcon" style="font-size: 64px; color: var(--clr-main);"></i>
              </div>
              <h1>{{ serviceTitle }}</h1>
              <p class="service-subtitle lead">{{ serviceSubtitle }}</p>
            </div>
            
            <!-- Service Image -->
            <div class="service-image mb-5">
              <img :src="serviceImage" class="img-fluid rounded" alt="Service Image">
            </div>
            
            <!-- Service Content -->
            <div class="service-content mb-5">
              <div v-html="serviceContent"></div>
            </div>
            
            <!-- Service Features -->
            <div class="service-features mb-5">
              <h3>Key Features</h3>
              <ul class="features-list">
                <li v-for="(feature, idx) in features" :key="idx" class="feature-item">
                  <i class="bi bi-check2-circle icon"></i>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
            
            <!-- CTA Section -->
            <div class="service-cta text-center p-5 rounded" style="background: var(--clr-main); color: white;">
              <h3>Interested in this service?</h3>
              <p class="mb-4">Let's discuss how we can help your business grow</p>
              <router-link to="/contact-us" class="btn-solid">Get in Touch</router-link>
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
  name: "ServiceSingle",
  components: {
    FlexItBreadcrumb
  },
  data() {
    return {
      serviceTitle: "Web Development",
      serviceSubtitle: "Building modern, responsive websites that drive results",
      serviceIcon: "flaticon-web-development",
      serviceImage: require("@/assets/flex-it/assets/images/sections-bg-images/1.jpg"),
      features: [
        "Custom website design and development",
        "Responsive layouts for all devices",
        "SEO optimization included",
        "Fast loading times and performance",
        "Ongoing support and maintenance",
        "Integration with third-party services"
      ],
      serviceContent: `
        <h2>About This Service</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit explicabo quis veritatis, 
        sed ipsam reprehenderit aliquam magni perferendis nobis maiores inventore, harum pariatur, 
        nam eum unde tenetur nisi temporibus veniam cumque nemo!</p>
        
        <h3>Our Approach</h3>
        <p>Deleniti quas, ea fuga vel, quis officiis laborum quaerat numquam possimus 
        qui alias fugiat aliquam eius soluta beatae? Nam eum unde tenetur nisi temporibus veniam cumque nemo! 
        Deleniti quas, ea fuga vel, quis officiis laborum quaerat numquam possimus.</p>
        
        <h3>Why Choose Us</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, quod nobis maiores inventore, 
        harum pariatur. Impedit explicabo quis veritatis, sed ipsam reprehenderit aliquam magni perferendis.</p>
      `
    };
  },
  mounted() {
    const slug = this.$route.params.slug;
    console.log("Service slug:", slug);
    // TODO: Fetch service data based on slug
  }
};
</script>

<style scoped>
.features-list {
  list-style: none;
  padding: 0;
}

.feature-item {
  padding: 10px 0;
  font-size: 1.1rem;
}

.feature-item .icon {
  color: var(--clr-main);
  margin-right: 10px;
  font-size: 1.3rem;
}
</style>

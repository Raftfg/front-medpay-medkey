<template>
  <div class="blog-single-page">
    <FlexItBreadcrumb 
      title="Blog Post Title" 
      :breadcrumbs="[
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
        { name: 'Post Title', path: '' }
      ]"
    />
    
    <div class="blog blog-post">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-10 mx-auto">
            <!-- Social Share -->
            <div class="social">
              <div class="share-us">
                <h6 class="share-title">share post:</h6>
                <div class="sc-wrapper dir-row sc-flat">
                  <ul class="sc-list">
                    <li class="sc-item" title="Facebook"><a class="sc-link" href="#0"><i class="fab fa-facebook-f sc-icon"></i></a></li>
                    <li class="sc-item" title="X"><a class="sc-link" href="#0"><i class="fab fa-x-twitter sc-icon"></i></a></li>
                    <li class="sc-item" title="LinkedIn"><a class="sc-link" href="#0"><i class="fab fa-linkedin-in sc-icon"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <!-- Post Title -->
            <h2 class="post-title">{{ postTitle }}</h2>
            
            <!-- Featured Image -->
            <div class="post-img-wrapper post-featured-area">
              <img class="featured-img" loading="lazy" :src="featuredImage" alt="Featured Image">
            </div>
          </div>
          
          <div class="col-12 col-lg-9 mx-auto">
            <div class="post-main-area">
              <!-- Post Info -->
              <div class="post-info">
                <a class="info post-cat" href="#"><i class="fas fa-list-alt icon"></i>{{ category }}</a>
                <a class="info post-author" href="#"><i class="fas fa-user icon"></i>{{ author }}</a>
                <a class="info post-date" href="#"><i class="fas fa-history icon"></i>{{ date }}</a>
                <a class="info post-time" href="#"><i class="fas fa-eye icon"></i>{{ views }}</a>
              </div>
              
              <!-- Post Content -->
              <div class="post-content">
                <p class="first-litter post-text" v-html="content"></p>
              </div>
              
              <!-- Tags -->
              <div class="tags panel">
                <ul class="sidebar-list tags-list">
                  <li class="tags-icon-label"><i class="fas fa-tags icon"></i></li>
                  <li v-for="tag in tags" :key="tag" class="tag-item">
                    <a class="tag-link" href="#">{{ tag }}</a>
                  </li>
                </ul>
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
  name: "BlogSingle",
  components: {
    FlexItBreadcrumb
  },
  data() {
    return {
      postTitle: "Lorem ipsum dolor sit amet consectetur elit",
      featuredImage: require("@/assets/flex-it/assets/images/sections-bg-images/2.jpg"),
      category: "Technology",
      author: "John Doe",
      date: new Date().toLocaleDateString(),
      views: "1,234",
      tags: ["cloud", "hosting", "app dev", "design", "web"],
      content: `
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit explicabo quis veritatis, 
        sed ipsam reprehenderit aliquam magni perferendis nobis maiores inventore, harum pariatur, 
        nam eum unde tenetur nisi temporibus veniam cumque nemo!</p>
        
        <h2 class="post-heading">About our awesome firm</h2>
        <p>Deleniti quas, ea fuga vel, quis officiis laborum quaerat numquam possimus 
        qui alias fugiat aliquam eius soluta beatae? Lorem ipsum dolor sit amet consectetur adipisicing 
        elit. Dicta, quod nobis maiores inventore, harum pariatur.</p>
      `
    };
  },
  mounted() {
    // Get slug from route params if needed
    const slug = this.$route.params.slug;
    // TODO: Fetch post data based on slug
    console.log("Blog post slug:", slug);
  }
};
</script>

<style scoped>
/* Blog single styles are in the template CSS */
</style>

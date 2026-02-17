<template>
  <!-- Start blog Section-->
  <section class="blog blog-home mega-section" id="blog">
    <div class="container">
      <div class="sec-heading" v-if="showCta">
        <div class="content-area">
          <span class="pre-title wow fadeInUp" data-wow-delay=".2s">blog</span>
          <h2 class="title wow fadeInUp" data-wow-delay=".4s">latest <span class='hollow-text'>news</span></h2>
        </div>
        <div class="cta-area wow fadeInUp" data-wow-delay=".8s"><router-link class="cta-btn btn-solid" to="/blog">see all posts<i class="bi bi-arrow-right icon "></i></router-link></div>
      </div>
      <div class="row">
        <div class="col-12"> 
          <div class="posts-grid">
            <div class="row">
              <div v-for="(post, idx) in posts" :key="idx" class="col-12 col-lg-4">
                <div class="post-box">
                  <router-link class="post-link" to="/blog" :title="post.title"> 
                    <div class="post-img-wrapper">
                      <img class="parallax-img post-img" loading="lazy" :src="post.img" alt=""/>
                      <span class="post-date"><span class="day">{{ post.day }}</span>{{ post.monthYear }}</span>
                    </div>
                  </router-link>
                  <div class="post-summary">
                    <div class="post-info">
                      <router-link class="info post-cat" to="/blog"> <i class="bi bi-bookmark icon"></i>{{ post.cat }}</router-link>
                      <router-link class="info post-author" to="/blog"> <i class=" bi bi-person icon"></i>{{ post.author }}</router-link>
                    </div>
                    <div class="post-text">
                      <router-link class="post-link" to="/blog"> 
                        <h2 class="post-title">{{ post.title }}</h2>
                      </router-link>
                      <p class="post-excerpt">{{ post.excerpt }}</p>
                      <router-link class="read-more" to="/blog" :title="post.title">read more<i class="bi bi-arrow-right icon "></i></router-link>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12" v-if="showPagination">
                <!--Start pagination-->
                <nav class="ma-pagination">
                  <ul class="pagination justify-content-center">
                    <li class="ma-page-item deactive-page-item"><a class="ma-page-link" href="#" title="Previous Page"><i class="bi bi-chevron-left icon"></i></a></li>
                    <li class="ma-page-item active"><a class="ma-page-link" href="#">1</a></li>
                    <li class="ma-page-item"><a class="ma-page-link" href="#">2</a></li>
                    <li class="ma-page-item"><a class="ma-page-link" href="#">3</a></li>
                    <li class="ma-page-item"><a class="ma-page-link" href="#" title="Next Page"><i class="bi bi-chevron-right icon"></i></a></li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End blog Section-->
</template>

<script>
export default {
  name: "FlexItBlogSection",
  props: {
    showCta: { type: Boolean, default: true },
    showPagination: { type: Boolean, default: false }
  },
  data() {
    return {
      posts: [
        { title: "How litespeed technology works to speed up your site", cat: "hosting", author: "Allan Moore", day: "05", monthYear: "oct 2022", excerpt: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Iure nulla dolorem, voluptates molestiae", img: require("@/assets/flex-it/assets/images/blog/post-images/1.jpg") },
        { title: "give your website a new look and feel with themes", cat: "web dev", author: "mhmd amin", day: "15", monthYear: "sep 2022", excerpt: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Iure nulla dolorem, voluptates molestiae", img: require("@/assets/flex-it/assets/images/blog/post-images/2.jpg") },
        { title: "the role of domain names in SEO world explained", cat: "SEO", author: "yusuf amin", day: "27", monthYear: "aug 2022", excerpt: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.Iure nulla dolorem, voluptates molestiae", img: require("@/assets/flex-it/assets/images/blog/post-images/3.jpg") }
      ]
    };
  }
};
</script>

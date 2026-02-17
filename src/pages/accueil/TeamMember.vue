<template>
  <div class="team-member-page">
    <FlexItBreadcrumb 
      :title="memberName" 
      :breadcrumbs="[
        { name: 'Home', path: '/' },
        { name: 'Our Team', path: '/our-team' },
        { name: memberName, path: '' }
      ]"
    />
    
    <div class="team-member">
      <div class="container">
        <div class="row">
          <div class="col-12 col-lg-10 mx-auto">
            <!-- Member Profile -->
            <div class="member-profile row mb-5">
              <div class="col-12 col-md-4 text-center mb-4">
                <div class="member-photo">
                  <img :src="memberPhoto" :alt="memberName" class="img-fluid rounded-circle" style="max-width: 300px;">
                </div>
              </div>
              <div class="col-12 col-md-8">
                <div class="member-info">
                  <h1>{{ memberName }}</h1>
                  <p class="member-position lead" style="color: var(--clr-main);">{{ position }}</p>
                  <div class="member-contact mb-3">
                    <p><i class="bi bi-envelope"></i> {{ email }}</p>
                    <p><i class="bi bi-phone"></i> {{ phone }}</p>
                  </div>
                  <div class="member-social">
                    <div class="sc-wrapper dir-row sc-size-32">
                      <ul class="sc-list">
                        <li v-for="social in socialLinks" :key="social.platform" class="sc-item">
                          <a class="sc-link" :href="social.url" :title="social.platform">
                            <i :class="social.icon + ' sc-icon'"></i>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Member Bio -->
            <div class="member-bio mb-5">
              <h3>About {{ memberName }}</h3>
              <div v-html="bio"></div>
            </div>
            
            <!-- Member Skills -->
            <div class="member-skills mb-5">
              <h3>Skills & Expertise</h3>
              <div v-for="skill in skills" :key="skill.name" class="skill-bar mb-4">
                <div class="d-flex justify-content-between mb-2">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-level">{{ skill.level }}%</span>
                </div>
                <div class="progress" style="height: 10px;">
                  <div 
                    class="progress-bar" 
                    role="progressbar" 
                    :style="{ width: skill.level + '%', backgroundColor: 'var(--clr-main)' }"
                    :aria-valuenow="skill.level" 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                  ></div>
                </div>
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
  name: "TeamMember",
  components: {
    FlexItBreadcrumb
  },
  data() {
    return {
      memberName: "John Anderson",
      position: "Senior Developer",
      email: "john.anderson@example.com",
      phone: "+1 234 567 8900",
      memberPhoto: require("@/assets/flex-it/assets/images/sections-bg-images/1.jpg"),
      socialLinks: [
        { platform: "Facebook", url: "#", icon: "fab fa-facebook-f" },
        { platform: "Twitter", url: "#", icon: "fab fa-x-twitter" },
        { platform: "LinkedIn", url: "#", icon: "fab fa-linkedin-in" },
        { platform: "GitHub", url: "#", icon: "fab fa-github" }
      ],
      bio: `
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit explicabo quis veritatis, 
        sed ipsam reprehenderit aliquam magni perferendis nobis maiores inventore, harum pariatur, 
        nam eum unde tenetur nisi temporibus veniam cumque nemo!</p>
        
        <p>Deleniti quas, ea fuga vel, quis officiis laborum quaerat numquam possimus 
        qui alias fugiat aliquam eius soluta beatae? Nam eum unde tenetur nisi temporibus veniam cumque nemo!</p>
        
        <h4>Experience</h4>
        <p>With over 10 years of experience in web development, John has worked on numerous high-profile projects 
        and has expertise in modern web technologies and frameworks.</p>
      `,
      skills: [
        { name: "Web Development", level: 95 },
        { name: "JavaScript/Vue.js", level: 90 },
        { name: "UI/UX Design", level: 85 },
        { name: "Project Management", level: 80 },
        { name: "Team Leadership", level: 88 }
      ]
    };
  },
  mounted() {
    const slug = this.$route.params.slug;
    console.log("Team member slug:", slug);
    // TODO: Fetch member data based on slug
  }
};
</script>

<style scoped>
.member-contact p {
  margin-bottom: 0.5rem;
}

.member-contact i {
  color: var(--clr-main);
  margin-right: 10px;
}
</style>

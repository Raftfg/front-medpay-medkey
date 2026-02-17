<template>
  <!-- Start faq Section-->
  <section class="faq mega-section" id="faq">
    <div class="container">
      <div class="sec-headingcentered">
        <div class="content-area">
          <span class="pre-title wow fadeInUp" data-wow-delay=".2s">FAQ</span>
          <h2 class="title wow fadeInUp" data-wow-delay=".4s">frequently asked <span class='hollow-text'>questions</span></h2>
        </div>
      </div>
      <div class="faq-accordion wow fadeInUp" data-wow-delay=".2s" id="accordion">
        <div class="row">
          <div class="col-12 col-lg-6">
            <div v-for="(item, idx) in faqs.slice(0, 3)" :key="idx" class="card mb-2">
              <div class="card-header" :id="'heading-' + idx">
                <h5 class="mb-0 faq-title">
                  <button class="btn btn-link faq-btn collapsed" data-bs-toggle="collapse" :data-bs-target="'#collapse-' + idx" :aria-expanded="false" :aria-controls="'collapse-' + idx">
                    {{ item.q }}
                  </button>
                </h5>
              </div>
              <div :id="'collapse-' + idx" class="collapse" :aria-labelledby="'heading-' + idx" data-bs-parent="#accordion">
                <div class="card-body">
                  <p class="faq-answer">{{ item.a }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-6">
            <div v-for="(item, idx) in faqs.slice(3)" :key="idx + 3" class="card mb-2">
              <div class="card-header" :id="'heading-' + (idx + 3)">
                <h5 class="mb-0 faq-title">
                  <button class="btn btn-link faq-btn collapsed" data-bs-toggle="collapse" :data-bs-target="'#collapse-' + (idx + 3)" :aria-expanded="false" :aria-controls="'collapse-' + (idx + 3)">
                    {{ item.q }}
                  </button>
                </h5>
              </div>
              <div :id="'collapse-' + (idx + 3)" class="collapse" :aria-labelledby="'heading-' + (idx + 3)" data-bs-parent="#accordion">
                <div class="card-body">
                  <p class="faq-answer">{{ item.a }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- End faq Section-->
</template>

<script>
export default {
  name: "FlexItFAQSection",
  data() {
    return {
      faqs: [
        { q: "Are your services easy to use?", a: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, id sequi aut qui est ab, corporis quis maiores reiciendis explicabo odio tenetur nulla sint vel." },
        { q: "Will I receive future updates?", a: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, id sequi aut qui est ab, corporis quis maiores reiciendis explicabo odio tenetur nulla sint vel." },
        { q: "Is this service available in my country?", a: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, id sequi aut qui est ab, corporis quis maiores reiciendis explicabo odio tenetur nulla sint vel." },
        { q: "How much will I pay?", a: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, id sequi aut qui est ab, corporis quis maiores reiciendis explicabo odio tenetur nulla sint vel." },
        { q: "Are there other fees?", a: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, id sequi aut qui est ab, corporis quis maiores reiciendis explicabo odio tenetur nulla sint vel." },
        { q: "How can I sign up for the contract?", a: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, id sequi aut qui est ab, corporis quis maiores reiciendis explicabo odio tenetur nulla sint vel." }
      ]
    };
  }
};
</script>

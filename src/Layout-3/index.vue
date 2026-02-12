<template>
    <section>
      <div>
        <Header/>
        <div>
          <div>
            <div>
              <router-view></router-view>
            </div> 
            <Footer/>
          </div> 
        </div>
      </div>
    </section>
  </template>
  
  <script>
    import Header from "./partials/Header";
    import Footer from "../layout/partials/Footer";
    export default {
      name: "layout3",
      components: {
        Header,
        Footer
      }
    }
  </script>
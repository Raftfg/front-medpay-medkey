<template>
    <button v-if="showBtn" @click="scrollTop" class="btn-go-top">
        <font-awesome-icon icon='arrow-up' class="nav-icon"/>
    </button>
</template>

<script>
    export default {
        name: 'AgBaseButton',
        data() {
            return {
            showBtn: false
            }
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll);
        },
        methods: {
            handleScroll() {
            if (window.pageYOffset > 300) {
                this.showBtn = true;
            } else {
                this.showBtn = false;
            }
            },
            scrollTop() {
            window.scrollTo(0, 0);
            }
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.handleScroll);
        }
    }
</script>

<style scoped>
.btn-go-top {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #449012;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 15px;
  border-radius: 20%;
  font-size: 10px;
}
</style>
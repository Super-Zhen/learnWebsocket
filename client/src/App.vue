<template>
  <div id="app">
    <router-view/>

    <Footer v-show="$route.meta.isShowFooter"></Footer>
  </div>
</template>

<script>
  import footer from 'components/footer.vue'
  import serverApi from './api/'
export default {
  name: 'App',
  components:{
    Footer:footer
  },
  beforeRouteEnter(to,from,next){
    debugger

  },
  async mounted() {
    console.log(this.$route.path)
    if (localStorage.getItem("token")) {
     await this.$store.dispatch('GetInfo')
    }else{
      this.$router.replace('/login')
    }
    // console.log('12312',this.$store.getters.getUserInfo.email)
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-bottom: 50px;
}
</style>

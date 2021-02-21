<template>
  <div id="app">
    <router-view/>
    <transition name="fade">
      <Menu v-show="showMenu"></Menu>
    </transition>
<!--    <Footer v-show="$route.meta.isShowFooter"></Footer>-->
  </div>
</template>

<script>
  import footer from 'components/footer.vue'
  import Menu from './pages/Menu'
  import {mapState} from 'vuex'
  import serverApi from './api/'
export default {
  name: 'App',
  components:{
    Footer:footer,
    Menu
  },
  beforeRouteEnter(to,from,next){

  },
  computed:{
    ...mapState([
      'showMenu'
    ])
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
  @import 'assets/css/base.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*padding-bottom: 50px;*/
}
  .fade-enter-active, .fade-leave-active {
    transition: all .8s ease;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: translateX(-375px);
    opacity: 0;
  }
</style>

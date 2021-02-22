<template>
    <div>
      <nav-bar :title="title" :leftClick = 'menu' :rightClick="search"></nav-bar>
      <friend-cell :list="userInfo.friendList"></friend-cell>
    </div>
</template>

<script>
  import FriendCell from 'components/addressBook/FriendCell'
  import NavBar from 'components/NavBar'
  import SideNav from 'components/addressBook/sideNav'
  import {mapState,mapMutations} from 'vuex'
    export default {
        name: "Friends",
      components:{
          FriendCell,
          NavBar,
        SideNav
      },
      created(){
        this.title='Friends'
      },
     computed:{
       ...mapState([
         'userInfo'
       ]),
     },
      data(){
          return{
            // list:[
            //   {id: "600a87b05f38cf2c30417da1", name: "zcq"},
            //   {id: "600a87b05f38cf2c30417da1", name: "你好"},
            //   {id: "600a87b05f38cf2c30417da1", name: "哈哈哈"},
            //   {id: "600a87b05f38cf2c30417da1", name: "中國"},
            //   {id: "600a87b05f38cf2c30417da1", name: "張三"},
            //   {id: "600a87b05f38cf2c30417da1", name: "里斯"},
            //   {id: "600a87b05f38cf2c30417da1", name: "么雷尔"},
            //   {id: "600a87b05f38cf2c30417da1", name: "社会主义"},
            //   {id: "600a87b05f38cf2c30417da1", name: "大风车"},
            //   {id: "600a87b05f38cf2c30417da1", name: "大风1"},
            //   {id: "600a87b05f38cf2c30417da1", name: "耳耳"},
            //   {id: "600a87b05f38cf2c30417da1", name: "彷徨"},
            //   {id: "600a87b05f38cf2c30417da1", name: "wewe"},
            //   {id: "600a87b05f38cf2c30417da1", name: "rocket"},
            // ]
          }
      },
      methods:{
        ...mapMutations([
          'setShowMenu'
        ]),
        menu(){
          this.setShowMenu(true)
        },
        search(){
          console.log('点击search')
          this.$router.push('/search/2')
        },
      }
    }
</script>

<style scoped>

</style>

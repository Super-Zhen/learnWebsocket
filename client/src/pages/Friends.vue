<template>
    <div>
      <nav-bar title="Friends"></nav-bar>
      <friend-cell :list="userInfo.friendList"></friend-cell>
    </div>
</template>

<script>
  import FriendCell from 'components/addressBook/FriendCell'
  import NavBar from 'components/NavBar'
  import SideNav from 'components/addressBook/sideNav'
  import {mapState} from 'vuex'
    export default {
        name: "Friends",
      components:{
          FriendCell,
          NavBar,
        SideNav
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
      }
    }
</script>

<style scoped>

</style>

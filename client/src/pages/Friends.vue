<template>
    <div>
      <nav-bar :title="title" :leftClick = 'menu' :rightClick="search" :iconShow="!show"></nav-bar>
      <search-nav-bar></search-nav-bar>
<!--      <cell :value="info">-->
<!--        <template #right>-->
<!--          <div>-->
<!--            <van-button  size="middle" class="fontS18 pad1020" color="#ff347E" @click="addFriends(info)">Add</van-button>-->
<!--          </div>-->
<!--        </template>-->
<!--      </cell>-->
      <friend-cell :list="friendList" :flag="!!true"></friend-cell>
<!--      <van-popup v-model="show" :overlay=true position="bottom" :style="{lineHeight:'100px', background: '-webkit-gradient(linear, 0 0, 0 100%, from(#ffffffbf), to(#e6e3e3))' }" >-->
<!--        <van-button type="primary" color="#FF347E" size="large" @click="tosearch">Add New Friend</van-button>-->
<!--      </van-popup>-->
    </div>
</template>

<script>
  import FriendCell from 'components/addressBook/FriendCell'
  import NavBar from 'components/NavBar'
  import SearchNavBar from 'components/addressBook/searchNavBar'
  import SideNav from 'components/addressBook/sideNav'
  import Cell from 'components/chat/cell'
  import {Popup,Button} from 'vant'
  import {mapState,mapMutations,mapActions} from 'vuex'
    export default {
        name: "Friends",
      components:{
          [Popup.name]:Popup,
          [Button.name]:Button,
          FriendCell,
          NavBar,
        SideNav,
        Cell,
        SearchNavBar
      },
      created(){
        this.title='Friends'
      },
     computed:{
       ...mapState([
         'userInfo',
         'friendAddMsg',
         'friendList'
       ]),
       info(){
         return{
           ...this.friendAddMsg.friend_id,
            name:this.friendAddMsg.friend_id.username,

         }
       },

     },
      mounted(){
        this.FindFriendsList({user_id:this.userInfo._id})
      },
      data(){
          return{
            // info:{
            //   name:'新的朋友'
            // },
            show:false
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
          'setShowMenu',
        ]),
        ...mapActions([
          'friendAgree',
          'FindFriendsList'
        ]),
        menu(){
          this.setShowMenu(true)
        },
        search(){
          this.show = true

        },
        tosearch(){
          console.log('点击search')
          this.$router.push('/search/2')
        },
        async addFriends(param){
            const data = {user_id:this.userInfo._id,friend_id:param._id,flag:'Agree'}
            try{
             let result = await this.friendAgree(data)
              console.log(result)
            }catch (e) {
              console.log(e)
            }
        }
      }
    }
</script>

<style scoped>
/deep/ .van-overlay{
  background-color: rgba(0,0,0,0);
}
</style>

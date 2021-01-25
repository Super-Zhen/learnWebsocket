<template>
  <div>
    <search-nav-bar @callback="change" :placeholder="placeholder"></search-nav-bar>
    <template v-for="item in friendsList" >
      <van-cell @click="isAddFriend(item._id)">
        <template #title>
          <div class="flexAC">
<!--            <img :src="ImgSrc" alt="" @click="showImg(ImgSrc)" class="headImg">-->
            <div style="width:50px;height: 50px;border:1px solid red"></div>
            <div class="mgl20">
              <p class="fontS20">{{item.username}}</p>
              <p class="fontS14">uid:{{item._id}}</p>
            </div>
          </div>
        </template>
      </van-cell>
    </template>
  </div>
</template>

<script>
  import SearchNavBar from 'components/addressBook/searchNavBar'
  import {Cell} from 'vant'
    export default {
        name: "Search",
      components:{
        SearchNavBar,
        [Cell.name]:Cell
      },
      data(){
          return{
            debounce:'',
            friendsList:[]
          }
      },
      mounted(){
        this.debounce = this.util.debounce(this.getFriends,1000)
      },
      computed:{
        placeholder(){
          const {id} = this.$route.params
          console.log(id)
          let placeholder = ''
          if(id === '1'){
            placeholder = '请输入好友昵称'
          }else {
            placeholder = '请输入用户邮箱'
          }
          return placeholder
        }
      },
      methods:{
         async change(value){
            const {id} = this.$route.params
            if(id === "1"){ // 等于1得时候是查询好友
              this.$store.dispatch('FindFriend',{keyword:value})
            }else{ // 等于2的时候是查找用户
              const result = await this.$store.dispatch('FindUserByEmail',{email:value})
              this.friendsList = result
            }
          },
        async isAddFriend(param){
           // 点击之后判断是否是好友，如果不是好友的情况就显示添加好友，如果是好友的情况就显示发送消息
          const user_id = this.$store.getters.getUserInfo._id
            const data = {user_id,friend_id: param}
            const result = await this.$store.dispatch('FindRelation',data)
            console.log(result)
            // 通过返回的信息判断是否是好友
          if(result.relations === 1){
            // 跳转路由的时候需要将用到的信息都传递过去 不能通过url  需要通过store进行存储
            this.$store.commit('setSearchUserInfo',result)
              this.$router.push({
                name:'UserInfo',
                params:{
                  id:result.relations
                }})
                // this.$router.push({
                //   path:'/userInfo',
                //   query:{
                //     id:result.relations
                //   }
                // })
          }
        }
      }
    }
</script>

<style scoped>

</style>

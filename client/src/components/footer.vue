<template>
  <div>
    <van-tabbar v-model="active" active-color="#07c160" route fixed >
      <van-tabbar-item name="chats" to="/" replace icon="chat">消息</van-tabbar-item>
      <van-tabbar-item name ='friends' to="/friends" replace icon="friends">好友</van-tabbar-item>
      <van-tabbar-item name="me" to="/me" replace icon="manager">我</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import { Tabbar, TabbarItem } from 'vant';
    export default {
      name: "Footer",
      components:{
          [Tabbar.name]: Tabbar,
          [TabbarItem.name]: TabbarItem,
      },
      data(){
          return {
            active:'chats'
          }
      },
      beforeMount(){
        // this.active=sessionStorage.getItem('router')
      },
     methods:{
       onChange(data){
         // this.active= data
       }
     }
    }
</script>

<style scoped>

</style>

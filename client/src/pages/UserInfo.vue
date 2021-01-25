<template>
    <div>
      <div class="flexDc flexAC mgt50">
        <div style="width: 100px;height: 100px;border: 1px solid #ff6974;border-radius: 50%"></div>
        <div class="mgt25 mgb50">
          <p class="mgb15 fontS34">{{Info.username}}
            <van-icon name="manager" size="20px" :color="Info.gender==='女'?'#ff6974':'#1949FF'" />
          </p>
          <p class="textAC">{{Info.sign}}</p>
        </div>
      </div>

      <template v-if="friendFlag === '2'">
          <van-button type="primary" size="large">添加好友</van-button>
      </template>
      <template v-else>
        <van-button type="primary" size="large" @click="toRoom">发送消息</van-button>
      </template>
    </div>
</template>

<script>
  import {Icon,Button} from 'vant'
    export default {
        name: "UserInfo",
      components:{
          [Icon.name]:Icon,
          [Button.name]:Button,
      },
      data(){
        return{
          friendFlag:"1",
          Info:{
            email: "zhenchaoqun@163.com",
            gender: "男",
            sign: "你的眼睛是我不曾遇到的海",
            username: "zhenchaoqun",
            _id: "600586341160024c4c39ca51"
          },
        }
      },
      mounted() {
          // this.Info = this.$store.getters.searchUserInfo.friendInfo
          this.friendFlag = this.$route.params.id
      },
      methods:{
        toRoom(){
          // 点击发送消息
          this.$router.push({

          })
        }
      }
    }
</script>

<style scoped>

</style>

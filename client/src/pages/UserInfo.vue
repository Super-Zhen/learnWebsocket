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

      <template v-if="friendFlag === 2">
          <van-button type="primary" size="large" @click="addFriend(Info._id)">添加好友</van-button>
      </template>
      <template v-else>
        <van-button type="primary" size="large" @click="toRoom">发送消息</van-button>
      </template>
    </div>
</template>

<script>
  import {Icon,Button,Dialog} from 'vant'
  import { addData} from '../indexedDB'
    export default {
        name: "UserInfo",
      components:{
          [Icon.name]:Icon,
          [Button.name]:Button,
          [Dialog.name]:Dialog,
      },
      data(){
        return{
          friendFlag:1,
          Info:{
            // email: "zhenchaoqun@163.com",
            // gender: "男",
            // sign: "你的眼睛是我不曾遇到的海",
            // username: "zhenchaoqun",
            // _id: "600586341160024c4c39ca51"
          },
        }
      },
      mounted() {
          this.Info = this.$store.getters.searchUserInfo.friendInfo
          this.friendFlag = this.$route.params.id
      },
      methods:{
        toRoom(){
          // 点击发送消息
          this.$router.push({
              path:'/room',
              query:{
                roomId:this.$store.getters.searchUserInfo.roomId,
                isSingle:1
            }
          })
        },
        async addFriend(id){
        //  参数为查询用户的id  加上自身的id 传递给后端
          // 这儿传递给后端之后需要查看是否是好友
          const _this = this
          const {_id} = this.$store.getters.getUserInfo
          const data = {user_id:_id.localeCompare(id)<0?_id:id,friend_id:_id.localeCompare(id)<0?id:_id}
          let res = await this.$store.dispatch('AddFriend',data)
          let message= ''
          if(res.codeFlag===1){
            message = '已经是好友'
          }else{
            message = '添加好友成功，现在可以聊天了'
            // 添加好友成功 就需要在浏览器的房间表中创建一条数据来进行判断已读还是未读
            addData({ objStoreName:'rooms', data:{roomId:res.roomId,time:Date.now()}})
          }
          Dialog.confirm({
            title: '标题',
            message: message,
          })
            .then(() => {
              this.$router.push({
                path:'/room',
                query:{
                  roomId:res.roomId,
                  isSingle:1,

                }
              })
            })
            .catch(() => {
              // on cancel
            });
        }
      }
    }
</script>

<style scoped>

</style>

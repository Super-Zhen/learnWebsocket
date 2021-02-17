<template>
    <div style="padding-bottom: 50px">
      <send-box @getMessage="getMessage" style="z-index: 1000" ></send-box>
      <message v-for="(item,index) in rooms[roomId]"
               :key="index"
        :message="item.content"
        :isMe="item.isMe"
        :sendTime = 'item.send_time'
        :sendId = 'item.send_id'
        :status = 'item.status'
      ></message>
    </div>
</template>

<script>
  import SendBox from 'components/room/sendBox'
  import Message from 'components/room/message'
  import {mapGetters, mapState} from 'vuex';
  import { changeTime,addData} from '../indexedDB'

  export default {
    name: "room",
    components:{
      SendBox,
      Message
    },
    data(){
      return {
        message:{},
        List:[],
        roomDetail:[],
      }
    },

    created(){
      this.roomId = this.util.GetRequest().roomId
      // 当页面刷新得时候获取历史记录
    },
    mounted(){
      // 进入房间之后就更新房间时间，离开也需要更新
      // addData({ objStoreName:'rooms',version:2, data:{roomId:this.roomId,time:Date.now()}})
      // 需要考虑修改了本地时间的问题
      changeTime({ objStoreName:'rooms', roomId:this.roomId})
      this.$once('hook:beforeDestroy', () => {
        changeTime({ objStoreName:'rooms', roomId:this.roomId})
      })
    },
    computed:{
      ...mapState([
        'rooms'
      ]),
      // roomDetail(){
      //   debugger
      //     return JSON.parse(JSON.stringify())
      // }
    },
    methods:{
      getMessage(data){
        // this.List.push( data)
      }
    }
  }
</script>

<style scoped>

</style>

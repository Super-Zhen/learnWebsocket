<template>
  <div class="pad10 box">
    <div class="borderR5 flexAC flexJB overfH">
      <input class="message fontS22 pdl10" type="text" v-model="message" @keyup.enter="sendMsg">
      <van-button class="submit fontS22 fontCff347e" @click="sendMsg" >Send</van-button>
    </div>
  </div>
</template>

<script>
  import {Field,Button} from 'vant'
  import {socket} from "../../../socket.config";

export default {
    name: "sendBox",
    components:{
        [Field.name]:Field,
        [Button.name]:Button,
    },
    created(){
      this.query = this.util.GetRequest()
      this.id = this.$store.getters.getUserInfo._id
      // 通过当前号查找接收消息用户的id
    },
    data(){
        return{
          message:'',
          messageCopy:''
        }
    },
    methods:{
      sendMsg(){
        if(!this.message) return
        this.messageCopy = this.message
        this.message = ''
        const data = {
          content:this.messageCopy,
          contentType:1,
          info:{
            roomId:this.query.room,
            send_id:this.id,
            send_time:Date.now(),
            receive_id:'123123'
          }
        }
        socket.emit('messages',data)
        this.$emit('getMessage',{value:this.messageCopy,query:this.query,status:0,isMe:true})

      }
    }
  }
</script>

<style scoped>
  .box{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #f9f9f9;
    /*border-top: 1px solid #f5f5f5;*/
    box-shadow: 0 0px 2px #d5d5d5;
  }
  .message{
    border: none;
    width: 100%;
    height: 42px;
  }
  .borderR5{
    border-radius: 5px;
  }
  .submit{
    border: none;
    outline: none;
  }
  /*.van-cell{*/
  /*  !*padding: 2px 10px;*!*/
  /*  line-height: 50px;*/
  /*  font-size: 20px;*/
  /*}*/
  /*.van-field__control{*/
  /*  border: 1px solid red;*/
  /*}*/
</style>

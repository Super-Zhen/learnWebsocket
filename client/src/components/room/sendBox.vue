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
  import {v4 as uuidv4} from 'uuid'
  import {socket} from "../../../socket.config";

export default {
    name: "sendBox",
    components:{
        [Field.name]:Field,
        [Button.name]:Button,
    },
    async created(){
      this.index = 0
      this.query = this.util.GetRequest()
      this.id = this.$store.getters.getUserInfo._id
      // 通过房间号查询接收者的user_id
      this.userArray =await this.$store.dispatch('FindRoomUser',{...this.query,id:this.id})
      console.log('useArray',this.userArray)
    },
    data(){
        return{
          message:'',
          messageCopy:''
        }
    },
  mounted(){

  },
    methods:{
      sendMsg(){
        if(!this.message) return
        this.messageCopy = this.message
        this.message = ''
        const data = {
          roomId:this.query.roomId,
          info:{
            content:this.messageCopy,
            contentType:1,
            isSingle:this.query.isSingle,
            send_id:this.id,
            send_time:Date.now(),
            receive_id:this.userArray,
            uid:uuidv4(),
            isMe:true,
            index:this.index++
          }
        }
        socket.emit('messages',data)
        // this.$emit('getMessage',{value:this.messageCopy,query:this.query,status:0,isMe:true})
        this.$store.commit('setRooms',{...data,status:"loading"})
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

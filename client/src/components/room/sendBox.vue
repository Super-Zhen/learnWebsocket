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
  import {mapState} from 'vuex'
  import {socket} from "../../../socket.config";
  import { addData,showMessage} from '../../indexedDB'
export default {
    name: "sendBox",
    components:{
        [Field.name]:Field,
        [Button.name]:Button,
    },
    computed:{
      ...mapState([
        "sendMsgName"
      ])
    },
    async created(){
      this.index = 0
      this.query = this.util.GetRequest() // 房间号和私聊标志
      this.id = this.$store.getters.getUserInfo._id
      this.receiveInfo = this.$store.getters.receiveUserInfo
      // 通过房间号查询接收者的user_id
      // 通过好友列表查询接收者的user_id
      if(this.receiveInfo){
        this.name = this.receiveInfo.name
      }else{
        this.userArray =await this.$store.dispatch('FindRoomUser',{...this.query,id:this.id})
        if(this.userArray.length===1 && !this.sendMsgName){
          this.name = this.$store.getters.getUserInfo.friendList.filter(item=>item.id== this.userArray[0])[0].name
        }else if(this.userArray.length===1 && this.sendMsgName){
          this.name = this.sendMsgName
        }
      }
    },
    data(){
        return{
          message:'',
          messageCopy:''
        }
    },
  async mounted(){
    // 读取数据
    // await showMessage({ objStoreName:'messages', version:2,cb:this.getMessage,roomId:this.query.roomId})

  },

    methods:{
      // 从前端数据库中获取数据然后添加到store中
      getMessage(data){
        const roomId = data[0].roomId
        let infoArray = data.map(item=>item.info).sort((a,b)=>a.send_time-b.send_time)
        console.log(infoArray)
        this.$store.commit('setRoomHistory',{roomId,infoArray})
      },
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
            index:this.index++,
            name:this.name
          }
        }
        socket.emit('messages',data)
        // this.$emit('getMessage',{value:this.messageCopy,query:this.query,status:0,isMe:true})
        this.$store.commit('setRooms',{...data,status:"loading"})
        addData({ objStoreName:'messages', data});//这里填入三个参数数据库名，表名，json数据
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

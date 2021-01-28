<template>
  <div class="pad10 box">
    <div class="borderR5 flexAC flexJB overfH">
      <input class="message fontS22 pdl10" type="text" v-model="message">
      <van-button class="submit fontS22 fontCff347e" @click="sendMsg">Send</van-button>
    </div>
  </div>
</template>

<script>
  import {Field,Button} from 'vant'
    export default {
        name: "sendBox",
      components:{
          [Field.name]:Field,
          [Button.name]:Button,
      },
      data(){
          return{
            message:'',
            messageCopy:''
          }
      },
      methods:{
        sendMsg(){
          this.messageCopy = this.message
          this.message = ''
          console.log(this.messageCopy)
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

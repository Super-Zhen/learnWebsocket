<template>
      <div class="flex pad10" :class="[isMe ? 'box':'box1']">
        <div class="flex imgBox" ><span class="img" ></span></div>
        <div class="message">
          <span class="pad10 flexAC msgStatus">
            {{message}}
          </span>
        </div>
      </div>
</template>

<script>
  import {Icon} from 'vant'

  export default {
    name: "rigthMessage",
    props:['isMe','message'],
    data(){
      return{

      }
    }
  }
</script>

<style scoped>
  .box{
    min-height: 60px;
    flex-direction: row-reverse;
  }
  .box1{
    min-height: 60px;
    /*flex-direction: row-reverse;*/
  }
  .message::before{
    content:'';
    width: 10px;
    height: 10px;
    border: 1px solid red;
    display: inline-block;
    position: absolute;
    top: 50%;
    left: -16px;
    transform:translate(-50%,-50%);
  }
  .message{
    display: flex;
    position: relative;
    max-width: 65%;
    color: #fff;
    line-height: 24px;
    letter-spacing: 0.09px;

  }
  .box>.message{
    background-color: #ff347e;
    border-radius: 20px 20px 2px;
    /*flex-direction: row-reverse;*/
  }
  .box1>.message{
    background-color:#999;
    border-radius: 20px 20px 20px 2px;
  }

  .imgBox{
    flex-flow: column-reverse;
  }
  .box>.imgBox{
    margin-left: 10px;
  }
  .box1>.imgBox{
    margin-right: 10px;


  }
.img{
  width: 40px;
  height: 40px;
  display: inline-block;
  border-radius: 50%;
  border: 1px solid;

}
</style>

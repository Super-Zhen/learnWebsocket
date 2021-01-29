<template>
  <div>
    <div class="flex box pad10">
      <div class="mgl10 flex imgBox" ><span class="img" ></span></div>
      <div class="message messageRadiusRight"><span class="pad10">
        你好你好你好你好你好你好你好你好你好你好你好你好
      </span></div>
    </div>
    <div class="flex box1 pad10">
      <div class="mgr10 flex imgBox" ><span class="img" ></span></div>
      <div class="message messageRadiusLeft"><span class="pad10">
        你好你好你好你好你好你好你好你好你好你好你好你好
      </span></div>
    </div>
  </div>


</template>

<script>
    export default {
        name: "rigthMessage"
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
  .message{
    display: flex;
    flex-direction: row-reverse;
    width: 65%;
    color: #fff;
    line-height: 24px;
    letter-spacing: 0.09px;

  }
  .messageRadiusRight{
    background-color: #ff347e;
    border-radius: 20px 20px 2px;
  }
  .messageRadiusLeft{
    background-color:#999;
    border-radius: 20px 20px 20px 2px;
  }
  .message span{
  }
  .imgBox{
    flex-flow: column-reverse;
  }
.img{
  width: 40px;
  height: 40px;
  display: inline-block;
  border-radius: 50%;
  border: 1px solid;

}
</style>

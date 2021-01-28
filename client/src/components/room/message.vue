<template>
    <div class="flex box pad10">
      <div class="mgl10" ><span class="img" ></span></div>
      <div class="message"><span class="pad10">你好你好你好你好你好你好你好你好你好你好你好你好</span></div>
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
  .message{
    display: flex;
    flex-direction: row-reverse;
    width: 60%;
    background-color: #ff347e;
    border-radius: 20px 20px 5px;
  }
  .message span{
  }
.img{
  width: 45px;
  height: 45px;
  display: inline-block;
  border-radius: 50%;
  border: 1px solid;

}
</style>

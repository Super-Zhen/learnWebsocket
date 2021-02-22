<template>
    <div class="height40 flexAC pad1020">
      <van-icon class="fontS26 mg10" :color="i.color" :name='i.icon' :dot="i.dot"></van-icon>
      <p class="fontS16 lineHeigh40 fontC666 mgl10">{{i.title}}</p>
    </div>
</template>

<script>
  import {Icon} from 'vant'
    export default {
        name: "cell",
      props:['i'],
      components:{
          [Icon.name]:Icon
      }
    }
</script>

<style scoped>
.height40{
  height: 40px;
}
  .lineHeigh40{
    line-height: 40px;
  }
  .mg10{
    margin: 10px;
  }
</style>

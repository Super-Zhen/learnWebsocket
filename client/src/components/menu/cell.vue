<template>
    <div class="height40 flexAC pad1020">
      <van-icon class="fontS26 pad10" :color="i.color" :name='i.icon'></van-icon>
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
</style>

<template>
  <van-index-bar>
    <van-index-anchor index="A" />
    <van-cell title="文本" />
    <van-cell title="文本" />
    <van-cell title="文本" />

    <van-index-anchor index="B" />
    <van-cell title="文本" />
    <van-cell title="文本" />
    <van-cell title="文本" />
  </van-index-bar>
</template>

<script>
  import {Cell,IndexBar, IndexAnchor} from 'vant'
    export default {
        name: "friendCell",
      components:{
          [Cell.name]:Cell,
          [IndexAnchor.name]:IndexAnchor,
          [IndexBar.name]:IndexBar,
      }
    }
</script>

<style scoped>

</style>

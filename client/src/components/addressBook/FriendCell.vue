<template>
  <van-index-bar>
<!--    <van-index-anchor index="A" />-->
<!--    <van-cell title="文本" />-->
<!--    <van-cell title="文本" />-->
<!--    <van-cell title="文本" />-->

<!--    <van-index-anchor index="B" />-->
<!--    <van-cell title="文本" />-->
<!--    <van-cell title="文本" />-->
<!--    <van-cell title="文本" />-->
    <template v-for="item in lists">
      <van-index-anchor :index="item.name" />
      <template v-for="items in item.value">
        <van-cell :title="items" />
      </template>
    </template>
  </van-index-bar>
</template>

<script>
  import {Cell,IndexBar, IndexAnchor} from 'vant'
  // import { pinyin } from 'pinyin-pro'
    export default {
      name: "friendCell",
      components:{
          [Cell.name]:Cell,
          [IndexAnchor.name]:IndexAnchor,
          [IndexBar.name]:IndexBar,
      },
      data(){
        return{
          list:[
            {name:'A',
              value:['文本','文本1']
            },
            {name:'B',
              value:['文本','文本1']}
          ]
        }
      },
      computed:{
        lists:()=>{
          // 获取到数据之后先将数据进行拼音格式化 然后进行排序
          const array = "ABCDEFGHIGKLMNOPQRSTUVWXYZ".split('')
          // const res = this.$store.getters.getUserInfo.friendList
         return array.map((item,index)=>{
            return {name:item,value:[item]}
          })

        }
      }
    }
</script>

<style scoped>

</style>

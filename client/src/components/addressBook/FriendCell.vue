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
    {{lists}}
<!--    <template v-for="item in lists">-->
<!--      <van-index-anchor :index="item.name" />-->
<!--      <template v-for="items in item.value">-->
<!--        <van-cell :title="items" />-->
<!--      </template>-->
<!--    </template>-->
  </van-index-bar>
</template>

<script>
  import {Cell,IndexBar, IndexAnchor} from 'vant'
  import {mapGetters} from 'vuex'
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
        ...mapGetters([
          'getUserInfo'
        ]),
        lists(){
          // 获取到数据之后先将数据进行拼音格式化 然后进行排序
          debugger
          const array = "ABCDEFGHIGKLMNOPQRSTUVWXYZ".split('')
          const {friendList} = JSON.parse(JSON.stringify(this.getUserInfo))
          // console.log(friendList)
          array.map(item=>({name:item,value:[]}))
         return friendList

        }
      }
    }
</script>

<style scoped>

</style>

<template>
  <div>
<!--    <side-nav></side-nav>-->
    {{lists}}
    <template v-for="item in list">

    </template>
  </div>
<!--  <van-index-bar>-->
<!--    <template v-for="item in lists">-->
<!--      <van-index-anchor :index="item.name" />-->
<!--      <template v-for="items in item.value">-->
<!--        <van-cell :title="items" />-->
<!--      </template>-->
<!--    </template>-->
<!--  </van-index-bar>-->
</template>

<script>
  // import {Cell,IndexBar, IndexAnchor} from 'vant'

  import {mapGetters} from 'vuex'
  // import { pinyin } from 'pinyin-pro'
  import SideNav from './sideNav'
    export default {
      name: "friendCell",
      components:{
        SideNav
          // [Cell.name]:Cell,
          // [IndexAnchor.name]:IndexAnchor,
          // [IndexBar.name]:IndexBar,
      },
      data(){
        return{
          vvv:'你好',
          list:[
            {id: "600a87b05f38cf2c30417da1", name: "zcq"},
            {id: "600a87b05f38cf2c30417da1", name: "你好"},
            {id: "600a87b05f38cf2c30417da1", name: "哈哈哈"},
            {id: "600a87b05f38cf2c30417da1", name: "中國"},
            {id: "600a87b05f38cf2c30417da1", name: "張三"},
            {id: "600a87b05f38cf2c30417da1", name: "里斯"},
            {id: "600a87b05f38cf2c30417da1", name: "么雷尔"},
            {id: "600a87b05f38cf2c30417da1", name: "社会主义"},
            {id: "600a87b05f38cf2c30417da1", name: "大风车"},
            {id: "600a87b05f38cf2c30417da1", name: "耳耳"},
            {id: "600a87b05f38cf2c30417da1", name: "彷徨"},
            {id: "600a87b05f38cf2c30417da1", name: "wewe"},
            {id: "600a87b05f38cf2c30417da1", name: "rocket"},
          ]
        }
      },
      mounted(){
        // console.log( pinyin(this.vvv, { pattern: 'initial' }))
      },
      computed:{
        ...mapGetters([
          'getUserInfo'
        ]),
        lists(){
          // 获取到数据之后先将数据进行拼音格式化 然后进行排序
          debugger
          this.list.forEach(item=>{
            // let initial = pinyin(item.name, { pattern: 'initial' })
            let initial = ''
            item.initial = initial
          })
          return this.list

         //  const array = "ABCDEFGHIGKLMNPQRSTUVWXYZ#".split('')
         //  const {friendList} = JSON.parse(JSON.stringify(this.getUserInfo))
         //  console.log(friendList)
         //  const aa = array.map(item=>({name:item,value:['123123123','2222222']}))
         // return aa

        }
      }
    }
</script>

<style scoped>

</style>

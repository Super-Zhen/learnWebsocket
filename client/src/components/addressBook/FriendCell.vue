<template>
  <div >
    <side-nav @choose = 'choose' v-show="flag"></side-nav>
    <template v-for="(value, key, index) of lists">
        <p class="bgColor lineHeigh pdl20" :key="index" :ref="key">{{key}}</p>
      <template v-for="(item) in value">
        <cell :value="item.friend_id" @click.native="toRoom(item.friend_id)"></cell>
      </template>
    </template>
  </div>
</template>

<script>

  import {mapGetters} from 'vuex'
  import pinyin  from 'pinyin'
  import SideNav from './sideNav'
  import Cell from 'components/chat/cell'
    export default {
      name: "friendCell",
      props:[
        'list',
        'flag'
      ],
      components:{
        SideNav,
        Cell
      },
      methods:{
        getPinyin(val){
          return pinyin(val,{
            style: pinyin.STYLE_NORMAL
          })
        },
        choose(data){
          if(!this.$refs[data][0].offsetTop) return
          window.scrollTo(0,this.$refs[data][0].offsetTop)
        },
        async toRoom(param){
          debugger
          let user_id = this.$store.getters.getUserInfo._id
          let friend_id = param._id
          let res =''
          try {
            res = await this.$store.dispatch('FindRoomId',{user_id,friend_id})
            this.$router.push({
              path:'/room',
              query:{
                roomId:res.roomId,
                isSingle:1
              }
            })
          }catch (e) {

          }

        }
      },
      computed:{

        lists(){
          // 获取到数据之后先将数据进行拼音格式化 然后进行排序
          if(!this.list) return {}
          const list = JSON.parse(JSON.stringify(this.list))
          // 获取名字的拼音
          list.forEach((item) =>item.friend_id.initial = this.getPinyin(item.friend_id.username).join('').toUpperCase())
           // 将名字排序
          let result = list.sort((a,b)=>a.friend_id.initial.localeCompare(b.friend_id.initial))
          // 将名字首字母去重
          const letters = Array.from(new Set(list.map(item=>item.friend_id.initial.charAt())))
          let obj = {}
          for (let item of letters){
            obj[item]= []
          }
          result.forEach(item=>obj[item.friend_id.initial.charAt(0)].push(item))
          return obj

        }
      }
    }
</script>

<style scoped>
.bgColor{
  background-color: #F3F3F7;
}
</style>

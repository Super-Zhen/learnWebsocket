<template>
  <div>
    <side-nav @choose = 'choose'></side-nav>
    <template v-for="(value, key, index) of lists">
        <p style="line-height: 80px" :key="index" :ref="key">{{key}}</p>
      <template v-for="(item) in value">
        <p style="line-height: 80px">{{item.name}}</p>
      </template>
    </template>
  </div>
</template>

<script>

  import {mapGetters} from 'vuex'
  import pinyin  from 'pinyin'
  import SideNav from './sideNav'
    export default {
      name: "friendCell",
      props:[
        'list'
      ],
      components:{
        SideNav
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
        }
      },
      computed:{

        lists(){
          // 获取到数据之后先将数据进行拼音格式化 然后进行排序
          const list = JSON.parse(JSON.stringify(this.list))
          // 获取名字的拼音
          list.forEach(item=>item.initial = this.getPinyin(item.name).join('').toUpperCase())
           // 将名字排序
          let result = list.sort((a,b)=>a.initial.localeCompare(b.initial))
          // 将名字首字母去重
          const letters = Array.from(new Set(list.map(item=>item.initial.charAt())))
          let obj = {}
          for (let item of letters){
            obj[item]= []
          }
          result.forEach(item=>obj[item.initial.charAt(0)].push(item))
          return obj

        }
      }
    }
</script>

<style scoped>

</style>

<template>
    <div class="flexAC flexJB flexWrap pad10 mgt10">
       <div class="wid30 iconBox flexAC flexJC flexDc"  v-for="i in list">
         <van-icon class="fontS26 pad10" :color="i.color" :name='i.icon'></van-icon>
         {{i.title}}
       </div>
    </div>
</template>

<script>
  import { Icon,Image} from 'vant';
    export default {
      name: "Grids",
      components:{
        [Icon.name]:Icon,
        [Image.name]:Image,
      },
      data(){
        return{
          list:[
            {icon:'location',title:'文字', color:'red'},
            {icon:'like',title:'文字', color:'red'},
            {icon:'phone',title:'文字', color:'red'},
            {icon:'star',title:'文字', color:'red'},
            {icon:'fire',title:'文字', color:'red'},
            {icon:'gift',title:'文字', color:'red'},
            {icon:'award',title:'文字', color:'red'},
            {icon:'diamond',title:'文字', color:'red'},
            {icon:'shop',title:'文字', color:'red'},
            {icon:'gift',title:'文字', color:'red'},
            {icon:'award',title:'文字', color:'red'},
            {icon:'diamond',title:'文字', color:'red'},
          ]
        }
      }
    }
</script>

<style scoped>
.iconBox{
  height: 85px;
  /*border: 1px solid;*/
}
</style>

<template>
      <van-cell>
        <template #title>
          <div class="flexAC">
            <img :src="ImgSrc" alt="" @click="showImg(ImgSrc)" class="headImg">
            <div class="mgl15">
              <p class="fontS24">{{useInfo.username}}</p>
              <p  class="fontS14">uid:{{useInfo._id}}</p>
            </div>
          </div>
        </template>
        <template #right-icon>
          <div class="flexAC" @click="goto('/info')"><van-icon name="arrow" class="arrow fontS22" /></div>
        </template>
      </van-cell>
</template>

<script>
  import {Cell,Icon,ImagePreview} from 'vant'
  import img from '../assets/img/20210113105735.jpg'
    export default {
        name: "HeadCard",
      components:{
          [Cell.name]:Cell,
          [Icon.name]:Icon,
          [ImagePreview .name]:ImagePreview ,

      },
      data(){
          return{
            name:'Super_Zhen',
            ImgSrc:img
          }
      },
      computed:{
        useInfo:function (){
          return this.$store.getters.getUserInfo
        }
      },
      mounted(){

      },
      methods:{
        goto(data){
          this.$router.push(data)
        },
        showImg(src){
          ImagePreview({
            images: [
              src,
            ],
            closeable: true,
            showIndex:false
          });
        }
      }
    }
</script>

<style scoped>
.headImg{
  width: 100px;
  /*height: 100px;*/
}
</style>

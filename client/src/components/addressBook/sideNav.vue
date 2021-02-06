<template>
    <div>
      <div class="flexDc flexAC navBox " >
        <template v-for="(item,index) in navList">
          <span class="fontS16 letterItem" :key="index" @click="showLetter(item)" :value="item">{{item}}</span>
        </template>
      </div>
      <div class="fontS70 showShadow" v-show="!!flag">
        <span>{{value}}</span>
      </div>
    </div>
</template>

<script>
    export default {
        name: "sideNav",
      created() {
          this.navList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'
        this.timer = null
      },
      data(){
        return {
          value:''

        }
      },
      computed:{
        flag(){
          return this.value
        }
      },
      methods:{
        showLetter(e){
          this.value= e
          if(this.timer) clearTimeout(this.timer)
          this.timer =setTimeout(()=>{
            this.value = ''
          },1000)
        }
      }

    }
</script>

<style scoped>
.navBox{
  position: fixed;
  top:100px;
  bottom: 100px;
  right:10px;
  z-index: 10;
  /*border:1px solid red;*/
  width: 20px;
}
  .letterItem{
    width: 20px;
    text-align: center;
    line-height: 1.4;
    display: block;
    color: #333333;
  }
  .showShadow{
    z-index: 9;
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.3);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

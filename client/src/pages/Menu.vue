<template>
   <div class="flex box" @click="hidenMenu('hide')">
     <div class="right ">
       <div class="flexAC flexJC flexDc head">
         <img class="headImg mgb15" src="@/assets/img/20210113105735.jpg" alt="">
         <p class="fontCfff fontS22">{{userInfo.username}}</p>
       </div>
       <template v-for="item in list">
         <Cell :i="item" @click.native="hidenMenu(item)"></Cell>
       </template>

       <div style="position:absolute;bottom: 20px;" @click="loginOuts">
         <Cell :i="loginOut"></Cell>
       </div>
     </div>
   </div>
</template>

<script>
  import {mapState,mapMutations} from 'vuex'
  import Cell from 'components/menu/cell'
    export default {
        name: "Menu",
      data(){
          return {
            list:[
              {icon:'wap-home-o',title:'Home', color:'#666',to:'/'},
              {icon:'friends-o',title:'Friends', color:'#666', to:'/friends',dot:!!this.friendAddMsg},
              {icon:'comment-o',title:'Messages', color:'#666',to:'/'},
              {icon:'setting-o',title:'Settings', color:'#666', to:'/me'},
            ],
            loginOut:{icon:'delete-o',title:'login Out', color:'#666'}
          }
      },
      components:{
        Cell
      },
      computed:{
          ...mapState([
            'userInfo',
            'friendAddMsg'
          ])
      },
      watch:{
        friendAddMsg(data){
          console.log(!!data)
          this.list.splice(1,1,{icon:'friends-o',title:'Friends', color:'#666', to:'friends',dot:!!data})
        }
      },
      methods:{
          ...mapMutations([
            'setShowMenu'
          ]),
        loginOuts(){
          localStorage.removeItem('userInfo')
          localStorage.removeItem('isLogin')
          localStorage.removeItem('token')
          this.setShowMenu(false)
          setTimeout(()=>{
            this.$router.push('/login')
          },1000)
        },
        hidenMenu(param){
            if(param!=='hide'){
              if(param.to==='/friends' &&param.dot){
                this.$router.push('/search/2')
              }else{
                this.$router.push(param.to)
              }

            }
          this.setShowMenu(false)
        }
      }
    }
</script>

<style scoped>
  .box{
    z-index: 1000;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
.right{
  width: 315px;
  height: 100%;
  box-shadow:5px 0 60px #bbb6b6;
  background-color: #fff;
}
.left{
  flex: 1;
  /*background-color: #fff;*/
}
.headImg{
  height: 75px;
  width: 75px;
  border-radius: 50%;
  border: 1px solid #fff;
}
  .head{
    display: flex;
    height: 169px;
    background-color: #0F195B;
  }
</style>

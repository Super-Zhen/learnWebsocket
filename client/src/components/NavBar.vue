<template>
    <div class="nav pdr10 pdl10 flexAC flexJB">
      <div>
        <slot name="left">
          <van-icon name="wap-nav" size="24" color="#fff"  @click="leftBtn" dot/>
        </slot>
      </div>
      <div class="fontS22">
        <slot name="title" >
          {{title}}
        </slot>
      </div>
      <div class="">
        <slot name="right" >
          <van-icon name="add-o" v-show="iconShow" size="24" color="#fff" class="mgr10" @click="rightBtn"/>
        </slot>
      </div>

<!--      <van-nav-bar-->
<!--        style="background-color: #0F195B;"-->
<!--        :title="navbarobj.title"-->
<!--        fixed-->
<!--      >-->
<!--        <slot>-->
<!--          <template #left>-->
<!--            <van-icon name="wap-nav" size="28" color="#fff"  @click="menu"/>-->
<!--          </template>-->
<!--        </slot>-->
<!--&lt;!&ndash;        <template #right>&ndash;&gt;-->
<!--&lt;!&ndash;          {{navbarobj.right}}&ndash;&gt;-->
<!--&lt;!&ndash;        </template>&ndash;&gt;-->
<!--      </van-nav-bar>-->
    </div>
</template>

<script>
  import {NavBar,Icon} from 'vant'
  import {mapMutations} from 'vuex'
    export default {
        name: "NavBar",
      components:{
          [NavBar.name]:NavBar,
          [Icon.name]:Icon,
      },
      props:[
        'title',
        'leftClick',
        'rightClick',
        'iconShow'
      ],
      methods:{
        leftBtn(){
          this.leftClick&&this.leftClick()
        },
        rightBtn(){
          this.rightClick()
        }
      }
    }
</script>

<style scoped>
  .nav{
    background-color: #0F195B;
    height: 56px;
    color: #fff;
  }
  .wid34{
    width: 34px;
  }
.nav /deep/ .van-nav-bar__content{

}
.nav /deep/ .van-nav-bar__title{
  color: #fff;
  font-size: 20px;
}
</style>

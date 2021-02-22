<template>
    <div class="nav  pdl10 flexAC flexJB">
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
      <div>
        <slot name="right">
          <van-icon name="add-o" size="24" color="#fff" class="pdr10" @click="rightBtn"/>
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
        'rightClick'
      ],
      methods:{
        leftBtn(){
          this.leftClick()
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
.nav /deep/ .van-nav-bar__content{

}
.nav /deep/ .van-nav-bar__title{
  color: #fff;
  font-size: 20px;
}
</style>

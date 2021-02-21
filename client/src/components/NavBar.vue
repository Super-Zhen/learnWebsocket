<template>
    <div class="nav ">
      <van-nav-bar
        style="background-color: #0F195B;"
        :title="this.title"
        fixed
      >
        <template #left>
          <van-icon name="wap-nav" size="28" color="#fff"  @click="menu"/>
        </template>
        <template #right>
<!--          <van-icon name="search" size="30" color="#fff" @click="search"/> &nbsp;&nbsp;&nbsp;-->
          <van-icon name="add-o" size="28" color="#fff" @click="addFriends"/>
        </template>
      </van-nav-bar>
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
        'title'
      ],
      methods:{
          search(){
            console.log('点击search')
            this.$router.push('/search/1')
          },
        addFriends(){
          console.log('点击addFriends')
          this.$router.push('/search/2')
        },
        ...mapMutations([
          'setShowMenu'
        ]),
        menu(){
          this.setShowMenu(true)
        }
      }
    }
</script>

<style scoped>
.nav /deep/ .van-nav-bar__content{
  height: 56px;
}
.nav /deep/ .van-nav-bar__title{
  color: #fff;
  font-size: 20px;
}
</style>

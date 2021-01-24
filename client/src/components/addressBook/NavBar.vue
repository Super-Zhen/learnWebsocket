<template>
    <div>
      <van-nav-bar
        title=""
        left-text="通讯录"
      >
        <template #right>
          <van-icon name="search" size="22" @click="search"/> &nbsp;&nbsp;&nbsp;
          <van-icon name="add-o" size="22" @click="addFriends"/>
        </template>
      </van-nav-bar>
    </div>
</template>

<script>
  import {NavBar,Icon} from 'vant'
    export default {
        name: "NavBar",
      components:{
          [NavBar.name]:NavBar,
          [Icon.name]:Icon,
      },
      methods:{
          search(){
            console.log('点击search')
            this.$router.push('/search/1')
          },
        addFriends(){
          console.log('点击addFriends')
          this.$router.push('/search/2')
        }
      }
    }
</script>

<style scoped>

</style>

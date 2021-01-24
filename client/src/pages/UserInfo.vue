<template>
    <div>
      这个是用户页面
      <template v-if="friendFlag === '2'">
        展示添加好友
      </template>
      <template v-else>
        展示已经是好友 点击发送消息
      </template>
    </div>
</template>

<script>
    export default {
        name: "UserInfo",
      data(){
        return{
          friendFlag:"2"
        }
      },
      mounted() {
          this.friendFlag = this.$route.params
      }
    }
</script>

<style scoped>

</style>

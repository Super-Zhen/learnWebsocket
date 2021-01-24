<template>
    <van-search
      v-model="searchValue"
      show-action
      :placeholder='placeholder'
      @input="onSearch"
      @cancel="onCancel"
    />
</template>

<script>
  import {Search,Form } from 'vant'
    export default {
        name: "searchNavBar",
      components:{
          [Search.name]:Search,
      },
      props:{
        placeholder:{
          type:String,
          default:'请输入好友昵称'
        }
      },
      data(){
          return{
            searchValue:'',
            debounce:'',
          }
      },
      mounted(){
          this.debounce = this.util.debounce(this.getFriends,1000)
      },
      methods:{
        //  这个是通过监听输入然后进行自动搜索，这个时候就需要进行节流操作
        onSearch(){
          this.debounce(this.searchValue)
        },
        getFriends(value){
          this.$emit('callback',value)
        },
        onCancel(){
          this.searchValue =''
          this.$router.replace('/friends')
        },
      }
    }
</script>

<style scoped>

</style>

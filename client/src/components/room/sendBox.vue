<template>
  <div>
    <van-field
      v-model="message"
      center
      clearable
      placeholder="请输入"
    >
      <template #button>
        <van-button size="small" type="primary">发送</van-button>
      </template>
    </van-field>
  </div>
</template>

<script>
  import {Field,Button} from 'vant'
    export default {
        name: "sendBox",
      components:{
          [Field.name]:Field,
          [Button.name]:Button,
      },
      data(){
          return{
            message:''
          }
      }

    }
</script>

<style scoped>
  .van-cell{
    padding: 0 10px;
    line-height: 40px;
    font-size: 20px;
  }
  .van-field__control{
    border: 1px solid red;
  }
</style>

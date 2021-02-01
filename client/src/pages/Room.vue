<template>
    <div >
      <send-box @getMessage="getMessage"></send-box>
      <message v-for="(item,index) in List"
               :key="index"
        :message="item.value"
        :isMe="item.isMe"
      ></message>
    </div>
</template>

<script>
  import SendBox from 'components/room/sendBox'
  import Message from 'components/room/message'
  export default {
    name: "room",
    components:{
      SendBox,
      Message
    },
    data(){
      return {
        message:{},
        List:[]
      }
    },
    created(){
      // this.message={}
    },
    methods:{
      getMessage(data){
        this.List.push( data)
      }
    }
  }
</script>

<style scoped>

</style>

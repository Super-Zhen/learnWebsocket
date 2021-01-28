<template>
    <div >
      <send-box></send-box>
      <message></message>
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
    }
  }
</script>

<style scoped>

</style>

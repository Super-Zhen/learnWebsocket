<template>
    <div >
      <send-box @getMessage="getMessage" ></send-box>
      {{JSON.stringify(rooms)}}
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
  import {mapGetters, mapState} from 'vuex';

  export default {
    name: "room",
    components:{
      SendBox,
      Message
    },
    data(){
      return {
        message:{},
        List:[],
        roomDetail:[],
      }
    },

    created(){
      this.roomId = this.util.GetRequest().roomId
    },
    mounted(){

    },
    watch:{
      roomDetail:{
        handler(data){
          debugger
          return this.$store.getters.getRooms
        },
        deep:true
      }
    },
    computed:{
      ...mapState([
        'rooms'
      ]),
      // roomDetail(){
      //   debugger
      //     return JSON.parse(JSON.stringify())
      // }
    },
    methods:{
      getMessage(data){
        // this.List.push( data)
      }
    }
  }
</script>

<style scoped>

</style>

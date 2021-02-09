<template>
    <div>
      <template v-for="(value,key,index) in roomList">
        <cell :value="getRoomMsgLast(key)" @click.native="toRoom(value,key)"></cell>
      </template>

    </div>
</template>

<script>
  import Cell from '../components/chat/cell'
    export default {
        name: "Chat",
      components:{
        Cell
      },
      data(){
          return {
          }
      },
      mounted(){

      },
      computed:{
        roomList(){
          return this.$store.getters.getRooms
        }
      },
      methods:{
          toRoom(param,id){
            this.$router.push({
              path:'/room',
              query:{
                roomId:id,
                isSingle:param[0].isSingle
              }
            })
          },
          getRoomMsgLast(roomId){
            let roomData = this.roomList[roomId]
            return roomData[roomData.length-1]
          }
        // 查询消息记录 过滤数据库中的所有房间  这种方式不可取
        // 需要先从自己的好友列表中查询所有的房间号，
        // 也就是查询自己的id 所在的所有房间号

      }
    }
</script>

<style scoped>

</style>

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
            if(param[0].isSingle=='1'){
              this.$store.commit('setReceiveUserInfo',{name:param[0].name,id:param[0].receive_id[0]})
            }
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
        //需要查询本地的话 只需要查询房间号 然后去重就能得到所有得有聊天记录得房间进行展示

      }
    }
</script>

<style scoped>

</style>

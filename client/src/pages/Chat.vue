<template>
    <div>
      <nav-bar :title="title" :leftClick = 'menu'>
        <template #right>
          <van-icon name="search" size="24" color="#fff" @click="search"/>
          <van-icon name="ellipsis" size="24" color="#fff" @click="settings" style="transform: rotate(90deg)"/>
        </template>
      </nav-bar>
      <template v-for="(value,key,index) in roomList">
        <cell :value="getRoomMsgLast(key)" @click.native="toRoom(value,key)">
<!--          <template slot-scope="props">-->
<!--            <div class="height50 fontS1 time" v-if="props.value.send_time">-->
<!--              {{value.send_time}}-->
<!--            </div>-->
<!--          </template>-->
        </cell>
      </template>

    </div>
</template>

<script>
  import Cell from '../components/chat/cell'
  import NavBar from 'components/NavBar'
  import {mapMutations,mapActions} from 'vuex'
  import {Icon} from 'vant'
  import {getRooms} from '../indexedDB'
    export default {
        name: "Chat",
      components:{
          [Icon.name]:Icon,
        Cell,
        NavBar
      },
      data(){
          return {
            title:'Messages'
          }
      },
      async mounted(){
          // 先获取本地数据，然后获取远程服务的数据这样
        await getRooms({objStoreName:'rooms',cb:this.roomLists})
        this.getAddFriendMsg({user_id:this.id})
      },
      computed:{
        roomList(){
          return this.$store.getters.getRooms
        },
        id(){
          return this.$store.getters.getUserInfo._id
        }
      },
      // toDo
      // 研究一下插槽
      // 添加上路由
      methods:{
        ...mapMutations([
          'setShowMenu'
        ]),
        ...mapActions([
          'getAddFriendMsg'
        ]),
        search(){
          console.log('点击search')
          this.$router.push('/search/3') // 3位本地
        },
        menu(){
          this.setShowMenu(true)
        },
        settings(){
          console.log('设置为已读')
        },
        toRoom(param,id){
            if(param[0].isSingle=='1'){
              this.$store.commit('setReceiveUserInfo',{name:param[0].name,id:param[0].receive_id})
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
          },
          roomLists(data){
              console.log(data)
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

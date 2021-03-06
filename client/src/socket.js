import {socket} from '../socket.config'
import store from './store/index'
import {addData} from "./indexedDB";

var num = 0
const maxNum = 10

socket.on('connect', () => {

  if(num){
    console.log('重新连接到服务器')
    console.log(socket.id)
    num = 1
  }else{
    console.log('连接服务器成功');
    console.log(socket.id)
    num>maxNum?num=1:num++
  }

  // 连接成功之后需要将当前的socketId保存到数据库
  if(store.state.userInfo._id){
    // socket.emit('messages',{id:socket.id})
    socket.emit('loginAfter',{user_id:store.state.userInfo._id})
    console.log(store.state.userInfo._id)
  }

});
socket.on('connect_error',()=>{
  num++
  console.log("连接服务器失败",Date.now());
  // if(num>maxNum) socket.close()
  // if(!socket.connected && num>maxNum){
  //   console.log('断开服务器连接')
  // }
})
socket.on('message',function (data) {
  console.log("data-node-message",data)
})
// 接收消息的方法
socket.on('messages',function (data) {
  console.log("data-node",data)
  store.commit('setRooms',data)
  addData({objStoreName:'messages', version:2,data})
})
// 发送消息的状态更新
socket.on('status',function (data) {
  store.commit('setStatus',{...data,status:'success'})
  console.log("status-node",{...data,status:'success'})

})
socket.on('addFriend',function (data) {
  console.log('addFriend',data)
})



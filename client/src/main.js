import Vue from 'vue'
import App from './App'
import router from './router'
import 'normalize.css/normalize.css'
import '@/assets/css/base.css'
import store from './store/index'
import './rem.js'
import {socket} from '../socket.config'
import util from './util/index'
import {getAES, getDAes} from "../crypto";

Vue.use(util)
// 只是保留了这些信息，用户得基础信息需要通过请求获取到

var num = 0
const maxNum = 10

Vue.config.productionTip = false
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
  // socket.emit('messages',{id:socket.id})
  // 连接成功之后需要将当前的socketId保存到数据库
  if(store.state.userInfo._id){
    console.log(store.state.userInfo._id)
  }

});
socket.on('connect_error',()=>{
  num++
  console.log("连接服务器失败");
  if(num>maxNum) socket.close()
  if(!socket.connected && num>maxNum){
    console.log('断开服务器连接')
  }
})
socket.on('message',function (data) {
  console.log("data-node-message",data)
})
socket.on('messages',function (data) {
  console.log("data-node",data)
})
socket.on('status',function (data) {
  console.log("status-node",data)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

import Vue from 'vue'
import Vuex from 'vuex'
import serverApi from '../api/index'
Vue.use(Vuex)
import {changeStatus,addData} from '../indexedDB'

const store =  new Vuex.Store({

  state: {
    userInfo:JSON.parse(localStorage.getItem('userInfo'))?JSON.parse(localStorage.getItem('userInfo')):{},
    friendList:[], // 好友列表
    searchUserInfo:{}, // 查找后的好友信息
    rooms:{}, // 将所有的房间号存放到这儿，每个房间号中包含信息以及信息状态
    sendMsgName:'',
    receiveUserInfo:{},
    friendAddMsg:{},
    showMenu:false,
  },

  mutations: {

    //这里是set方法
    setUserInfo(state,param){
      state.userInfo = Object.assign(state.userInfo,param)
      localStorage.setItem('userInfo',JSON.stringify(state.userInfo))
    },
    setFriendList(state,param){
      state.friendList = param
    },
    setSearchUserInfo(state,param){
      state.searchUserInfo = param
    },
    setRooms(state,param){
      const {roomId,info} = param
      // 获取rooms 中所有的房间号 然后找到对应的房间号，将相应的信息存放进去
      if(!state.rooms[roomId]) state.rooms[roomId]=[]
        let length = state.rooms[roomId].length
        info.status = param.status
        state.rooms[roomId].push(info)
        state.rooms = JSON.parse(JSON.stringify(state.rooms))

    },
    setStatus(state,param){
      // 设置消息的状态
      const {roomId,uid,status} = param
      let uidIndex = state.rooms[roomId].findIndex(item=>item.uid === uid)
      state.rooms[roomId][uidIndex].status = status
      changeStatus({objStoreName:'messages', version:2,uid})
    },
    setRoomHistory(state,param){
      const {roomId,infoArray} = param
      // 获取rooms 中所有的房间号 然后找到对应的房间号，将相应的信息存放进去
      if(!state.rooms[roomId]) state.rooms[roomId]=[]
      let length = state.rooms[roomId].length
      // info.status = param.status
      state.rooms[roomId].push(...infoArray)
      state.rooms = JSON.parse(JSON.stringify(state.rooms))
    },
    setSendMsgName(state,param){
      const {name} = param
      state.sendMsgName = name
    },
    setReceiveUserInfo(state,param){
      state.receiveUserInfo = {...state.receiveUserInfo,...param}
    },
    setFriendAddMsg(state,param){
      state.friendAddMsg= param
    },
    setShowMenu(state,param){
      state.showMenu = param
    },
    // set
  },

  getters: {        //这里是get方法 
    getUserInfo: state => state.userInfo ,
    searchUserInfo: state => state.searchUserInfo ,
    getRooms: state => state.rooms ,
    getReceiveUserInfo:state => state.receiveUserInfo
  },

  actions: {
    // 登录
    async Login({commit}, data){
      const result = await serverApi.login(data)
      // commit('setUserInfo',{username:result.username})
      return result
    },
    // 注册
    async Register({}, data){
      const result = await serverApi.register(data)
     return result
    },
    //获取用户信息
    async GetInfo({commit},data){
      const result = await serverApi.getInfo(data)
      commit('setUserInfo',result)
    },
    async SaveInfo({commit},data){
      const result = await serverApi.saveInfo(data)
      commit('setUserInfo',result)
    },
    // 查找好友
    async FindFriend({commit},data){
      const result = await serverApi.findFriend(data)
      commit('setFriendList',result)
    },
    // 查询好友列表
    async FindFriendsList({commit},data){
      const result = await  serverApi.findFriendsList(data)
      commit('setFriendList',result)
    },
    async FindUserByEmail({commit},data){
      const result = await serverApi.findUserByEmail(data)
      return result
    },
    async FindRelation({},data){
      const result = await serverApi.findRelation(data)
      return result
    },
    async AddFriend({commit},data){
      debugger
      const result = await serverApi.addFriend(data)
      commit('setUserInfo',result)
      return result
    },
    async FindRoomUser({},data){
      const result = await serverApi.findRoomUser(data)
      return result
    },
    async FindRoomId({},data){
      const result = await serverApi.findRoomId(data)
      return result
    },
    // 通过id 获取有消息的房间
    async getHasMsgRoom({},data){
      // const
    },
    // 通过id 查询添加好友的消息
    async getAddFriendMsg({commit},data){
      const result = await serverApi.getAddFriendMsg(data)
      commit('setFriendAddMsg',result)
    },
    async friendAgree({commit},data){
      const result = await serverApi.friendAgree(data)
      return result
    }
  },


  // modules: {
  //
  //   //这里是我自己理解的是为了给全局变量分组，所以需要写提前声明其他store文件，然后引入这里
  //
  // }

  })
export default store

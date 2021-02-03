import Vue from 'vue'
import Vuex from 'vuex'
import serverApi from '../api/index'
Vue.use(Vuex)

const store =  new Vuex.Store({

  state: {
    userInfo:JSON.parse(localStorage.getItem('userInfo'))?JSON.parse(localStorage.getItem('userInfo')):{},
    friendList:[], // 好友列表
    searchUserInfo:{}, // 查找后的好友信息
    //这里放全局参数

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
    }
  },

  getters: {        //这里是get方法 
    getUserInfo: state => state.userInfo ,
    searchUserInfo: state => state.searchUserInfo ,

  },

  actions: {
    async Login({commit}, data){
      const result = await serverApi.login(data)
      // commit('setUserInfo',{username:result.username})
      return result
    },
    async Register({}, data){
      const result = await serverApi.register(data)
     return result
    },
    async GetInfo({commit},data){
      const result = await serverApi.getInfo(data)
      commit('setUserInfo',result)
    },
    async SaveInfo({commit},data){
      const result = await serverApi.saveInfo(data)
      commit('setUserInfo',result)
    },
    async FindFriend({commit},data){
      const result = await serverApi.findFriend(data)
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
      const result = await serverApi.addFriend(data)
      commit('setUserInfo',result)
      return result
    },
    async FindRoomUser({},data){
      const result = await serverApi.findRoomUser(data)
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

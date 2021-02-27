import axios from './axios'
import {getAES, getDAes} from "../../crypto";
const serverApi = {
  // 登录得时候会将数据进行对称加密
  login: data => axios.post('/api/user/login',{data:getAES(JSON.stringify(data))}),
  register: data => axios.post('/api/user/register',{data:getAES(JSON.stringify(data))}),
  getInfo: data => axios.get('/api/user/getInfo',{params: data}),
  saveInfo:data => axios.post('/api/user/saveInfo',data),
  // 查找好友 通过昵称进行查找
  findFriend:data => axios.get('/api/find/friend',{params:data}),
  // 查找用户 通过邮箱进行查找
  findUserByEmail: data => axios.get('/api/find/userByEmail',{params:data}),
  // 查看用户是否是好友关系
  findRelation: data => axios.post('/api/find/relation',data),
  // 添加好友
  addFriend: data=> axios.post('/api/find/addFriend',data),
  // 通过房间号查询接收者的user_id
  findRoomUser: data => axios.get('/api/find/roomUser',{params:data}),
   // 通过当前用户查询所在的所有房间
  getHasMsgRoom: data => axios.get('/api/find/msgRoom',{params:data}),
  // 点击朋友列表中的某个人的时候获取房间id
  findRoomId: data => axios.get('/api/find/roomId',{params:data}),
  // 获取离线 好友的添加消息
  getAddFriendMsg: data =>axios.get('/api/find/addFriendMsg',{params:data}),
  // 被添加好友同意
  friendAgree: data => axios.get('/api/find/agree',{params:data})
  }

export default serverApi

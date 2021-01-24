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
  findRelation: data => axios.post('/api/find/relation',data)
  }

export default serverApi

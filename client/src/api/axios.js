import axios from 'axios'
import server from '../../linkUrl'
import { Dialog } from 'vant';

const baseUlr = server.server

const instance = axios.create()
// instance.defaults.baseURL = baseUlr
instance.defaults.timeout = 60000

instance.interceptors.request.use(config=>{
  if(config.url && config.url.charAt(0) === '/'){
    config.url = `${config.url}`
  }
  let token = localStorage.getItem('token')
  config.headers.authorization = token===null?'':token
  return config
},error => Promise.reject(error))

instance.interceptors.response.use(response=>{
    if(response.status === 200){
      return Promise.resolve(response.data)
    }
    return Promise.reject(response)
},error => {
  console.log(error.response)
  // if(error.response.status=== 401){
  //   Dialog.alert({
  //     title: '错误提示',
  //     message: error.response.data.msg,
  //   })
  //     .then(() => {
  //     })
  // }else{
  //   Dialog.alert({
  //     title: '错误提示',
  //     message: error,
  //   })
  //     .then(() => {
  //     })
  // }

  return Promise.reject(error)
})

export default instance

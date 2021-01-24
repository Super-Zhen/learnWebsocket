<template>
   <div>
     <p class="textAC mgt50 mgb100 fontW fontS32"><i>Learn-Websocket</i></p>
     <van-form @submit="onSubmit" class="pad10">
       <van-field
         v-model="username"
         name="用户名"
         label="用户名"
         placeholder="用户名"
         autocomplete="off"
         :rules="[{ required: true, message: '请填写用户名' }]"
       />
       <van-field
         v-model="password"
         type="password"
         name="密码"
         label="密码"
         placeholder="密码"
         :rules="[{ required: true, message: '请填写密码' }]"
       />
       <div style="margin: 16px;">
         <van-button :loading='status' round block type="info" native-type="submit">提交</van-button>
       </div>
     </van-form>
     <p class="flexJE fontC999">
       <span>忘记密码？</span><span @click="$router.replace('/register')">注册账号</span>
     </p>
   </div>
</template>

<script>
  import { Button,Form, Field,Dialog } from 'vant';
  import { getDAes,md5s} from "../../crypto";
  import serverApi from '@/api/'
    export default {
        name: "Login",
      components:{
          [Button.name]: Button,
          [Field.name]: Field,
          [Form.name]: Form,
          [Dialog.name]: Dialog,
      },
      data(){
          return{
            username: '',
            password: '',
            status:false
          }
      },
      beforeRouteEnter(to,from,next){
        if(localStorage.getItem('token') && localStorage.getItem('isLogin')=== 'true' ){
          Dialog.alert({
            title:'您已登录'
          }).then(()=>{
            next({
              path:'/',
              replace:true
            })
          })
          this.status = false

        }
        next()
      }
      ,
      beforeCreate(){

      },
      methods:{
        async onSubmit(values) {
          if(this.username && this.password){
            this.status = true
            console.log(md5s(this.password))
            const obj ={username:this.username,userpwd:md5s(this.password)}
            let res = ''
            try {
               res = await this.$store.dispatch('Login',obj)

              localStorage.setItem('token',res.token)
              localStorage.setItem('isLogin',res.isLogin)
              this.$store.dispatch('GetInfo',{token:localStorage.getItem("token")})
              this.$router.replace('/')
            }catch (e) {
              debugger
              console.log(e.response)
            }
              this.status = false

          }else{
            alert('请输入账号或者密码')
          }
        }
      }
    }
</script>

<style scoped>

</style>

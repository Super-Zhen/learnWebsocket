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
        v-model="email"
        name="邮箱"
        label="邮箱"
        placeholder="邮箱"
        autocomplete="off"
        :rules="[{ required: true, message: '请填写邮箱' }]"
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
    <p class="flexJC fontC999" @click="back">
      <van-icon name="arrow-left" />&nbsp;
      <span>返回登录</span>
    </p>
  </div>
</template>

<script>
  import { Button,Form, Field,Dialog,Icon } from 'vant';
  import { getDAes,md5s} from "../../crypto";
  import serverApi from '@/api/'
  export default {
    name: "Register",
    components:{
      [Button.name]: Button,
      [Field.name]: Field,
      [Form.name]: Form,
      [Dialog.name]: Dialog,
      [Icon.name]:Icon
    },
    data(){
      return{
        username: '',
        password: '',
        status:false,
        email:''
      }
    },
    beforeRouteEnter(to,from,next){
      if(localStorage.getItem('token')){
        localStorage.removeItem('token')
      }
      next()
    }
    ,
    beforeCreate(){

    },
    methods:{
      back(){
        this.$router.replace('/login')
      },
      async onSubmit(values) {
        let {username,password,email,status} = this
        if(username && password && email){
          status = true
          console.log(md5s(password))
          const obj ={username,userpwd:md5s(password),email}
          let res = ''
          try {
            res = await this.$store.dispatch('Register',obj)

            if(!res.flag){
              return Dialog.alert({
                title: res.msg
              }).then(() => {
                this.$router.replace('/login')
              })
            }
            localStorage.setItem('token',res.token)
            localStorage.setItem('isLogin',res.isLogin)
            this.$router.replace(res.path)
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

<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-form @submit="onSubmit">
      <van-field v-model="info.username" readonly label="用户名" name="username" placeholder="请输入用户名"  input-align="right"/>
      <van-field v-model="info.tel" label="联系电话" name="tel" placeholder="请输入手机号码"  input-align="right"/>
      <van-field is-link placeholder="请选择性别" name="gender" label="性别" @click="show = true" :value="info.gender" input-align="right"/>
      <van-field  placeholder="请输入你的个性签名" name="sign"  label="签名" v-model="info.sign" input-align="right"/>

      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
      <div class="submit">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
  import {NavBar,Form, Cell,CellGroup,ActionSheet,Field,Button } from 'vant'
    export default {
      name: "Info",
      data(){
        return{
          info:{
            sign:''
          },
          show: false,
          actions:[{ name: '男',value:'0' }, { name: '女',value:'1' }, { name: '保密',value:'2' }]
        }
      },
      components:{
          [NavBar.name]:NavBar,
          [Field.name]:Field,
          [CellGroup.name]:CellGroup,
          [Cell.name]:Cell,
          [ActionSheet.name]:ActionSheet,
          [Form.name]:Form,
          [Button.name]:Button,
      },
      mounted(){
        this.info = this.$store.getters.getUserInfo
      },
      methods:{
        onClickLeft(){
          this.$router.back()
        },
        onSelect(item) {
          console.log(item.value)
          this.info.gender = item.name
          // 默认情况下点击选项时不会自动收起
          // 可以通过 close-on-click-action 属性开启自动收起
          this.show = false;
          // Toast(item.name);
        },
        onSubmit(values){
          this.$store.dispatch('SaveInfo',Object.assign(values,{id:this.$store.getters.getUserInfo._id}))
        }
      }
    }
</script>

<style scoped>
.submit{
  margin: 16px;
  position:fixed;
  bottom: 100px;
  right:15px;
  left: 15px;
  width: 80%
}
</style>

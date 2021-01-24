import Vue from 'vue'
import Router from 'vue-router'
const Helloworld = () => import(/* webpackChunkName: 'Helloworld'*/ '@/components/HelloWorld')
const Chat = () => import(/* webpackChunkName: 'chat'*/ '@/pages/Chat')
const Login = () => import(/* webpackChunkName: 'login'*/ '@/pages/Login')
const Register = () => import(/* webpackChunkName: 'Register'*/ '@/pages/Register')
const Me = () => import(/* webpackChunkName: 'me'*/  '@/pages/me/Me')
const Info = () => import(/* webpackChunkName: 'Info'*/  '@/pages/me/Info')
const Friends = () => import(/* webpackChunkName: 'Friends'*/  '@/pages/Friends')
const Search = () => import(/* webpackChunkName: 'Search'*/  '@/pages/Search')
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)
const router =  new Router({
  routes: [
    {
      path: '/chat',
      name: 'HelloWorld',
      meta:{
        isShowFooter:false,
        requireLogin:true

      },
      component: Helloworld
    },{
      path: '/',
      name: 'chat',
      meta:{
        isShowFooter:true,
        requireLogin:true
      },
      component: Chat
    },{
      path: '/me',
      name: 'me',
      meta:{
        isShowFooter:true,
        requireLogin:true
      },
      component: Me
    },{
      path: '/info',
      name: 'info',
      meta:{
        isShowFooter:true,
        requireLogin:true
      },
      component: Info
    },{
      path: '/friends',
      name: 'Friends',
      meta:{
        isShowFooter:true,
        requireLogin:true
      },
      component: Friends
    },{
      path: '/register',
      name: 'Register',
      meta:{
        isShowFooter:false,
        requireLogin:false
      },
      component: Register
    },{
      path: '/login',
      name: 'login',
      meta:{
        isShowFooter:false,
        requireLogin:false
      },
      component: Login
    },{
      path: '/search/:id',
      name: 'search',
      meta:{
        isShowFooter:false,
        requireLogin:false
      },
      component: Search
    }
  ]
})
export default router
router.beforeEach(function(to, from, next) {
    //页面是否登录
    if (localStorage.getItem("token") || !to.meta.requireLogin) {
      //本地存储中是否有token(uid)数据
      next(); //表示已经登录
    } else {
      //next可以传递一个路由对象作为参数 表示需要跳转到的页面
      next({
        path: '/login',
        replace:true
      });
    }

});

const jwt  = require('jsonwebtoken');

const Crypto = require('../util/cryptoNode')
const User = require('../schema_model/user')
const jsonwebtoken = require('../config/jsonwebtoken.config')
module.exports = function(app){
    // 用户登录
    app.post('/user/login', function (req, res) {
        // console.log(Crypto.getDAes(req.body.data))
        const {username,userpwd} = JSON.parse(Crypto.getDAes(req.body.data))
        User.findOne({username},(err,data)=>{
            if(err) console.log(err)
            console.log(data)
            if(!!data){ // 判断用户是否存在
                if(data.username === username && data.userpwd === userpwd){
                    User.updateOne({username},{logindate:new Date()},(err,datas)=>{
                        if(err) res.status(500)
                        let payload = {username};
                        let token = jwt.sign(payload,jsonwebtoken.key);
                        console.log('token:',token)
                        console.log('data:',data)
                        res.send({token,username,isLogin:true,id:data._id})
                    })
                }
            }
        })
        // userData.save((err,data)=>{
        //     if(err) console.log(err)
        //     let payload = {username};
        //     let token = jwt.sign(payload,jsonwebtoken.key);
        //     console.log('token:',token)
        //     res.send({token,username})
        // })

    });
// 注册
    app.post('/user/register', function (req, res) {
        // console.log(Crypto.getDAes(req.body.data))
        const {username,userpwd,email} = JSON.parse(Crypto.getDAes(req.body.data))

        User.findOne({email},(err,data)=>{
            if(err) console.log(err)
            if(!!data){ // 判断用户是否存在
                res.send({msg:'用户已存在',flag:false})
            }else {
                const userData = new User({
                    username,
                    userpwd,
                    email,
                    createdate:String(new Date().getTime())
                })
                userData.save((err,data)=>{
                    if(err) console.log(err)
                    let token = jwt.sign({username},jsonwebtoken.key);
                    console.log('token:',token)
                    res.send({
                        path:'/login',
                        msg:'注册成功，三秒后跳转到登录页',
                        username,
                        token,
                        isLogin:false
                    })
                })
            }
        })


    });
// 用户刷新页面或者重新登录得时候
    app.get('/user/getInfo',function (req,res) {
        const token = req.headers.authorization
        let payloads = jwt.verify(token,jsonwebtoken.key)
        console.log('token2',payloads)
        User.findOne({username:payloads.username},{username:1,email:1,sign:1,gender:1,tel:1,friendList:1},(err,data)=>{
            if(err) {
                console.log(err)
                res.status(500)}
            console.log(data)
            // data._doc.friendList = data._doc.friendList
            let result = []
            res.send(data)
        })

    })
// 保存用户信息
    app.post('/user/saveInfo',function (req,res) {
        const {tel,sign,gender,username,id} = req.body
        User.findOneAndUpdate({username},{tel,sign,gender},{new:true},(err,data)=>{
            if(err) res.status(500)
            console.log(data)
            res.send(data)
        })
    })

};

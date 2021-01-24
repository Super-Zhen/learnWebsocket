const User = require('../schema_model/user')
module.exports = function (app) {
    // 查询好友
    app.get('/find/friend',(req,res)=>{
        // 通过昵称关键字查找好友
        const {keyword} = req.query
        console.log(req.query)
        res.send({name:'213123'})
    })
    // 获取好友列表
    // 查找用户（通过邮箱）
    app.get('/find/userByEmail',(req,res)=>{
        // 通过邮箱查找用户，查找到用户之后然后判断用户是否是好友
        const {email} = req.query
        User.findOne({email},{username:1,sign:1,gender:1},(err,data)=>{
            if(err) res.status(500).send({msg:'服务器错误'})
            console.log(data)
            res.send(data?Array(data):[])
        })
    })

}

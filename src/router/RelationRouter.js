const Relationship = require('../schema_model/relationship')
const User = require('../schema_model/user')
const uuid = require('node-uuid')
module.exports = function (app) {
    // 判断是否是好友关系
    let friendInfo = ''
    app.post('/find/relation',async (req,res)=>{
        const {user_id,friend_id} = req.body
        // 通过id查询 //返回关系  普通写法
        /*Relationship.findOne({$or:[{friend_id,user_id},{user_id:friend_id,friend_id:user_id}]},{_id:0},(err,data)=>{
           if(err) res.status(500).json({msg:'服务器错误'})
            if(data && data.relations === 1){
                User.findById(friend_id,{username:1,sign:1,gender:1,_id:0,email:1},(err,datas)=>{
                    if(err) res.status(500).json({msg:'服务器错误'})
                    console.log(datas,data[0])

                    let result = Object.assign({},{friendInfo:datas._doc},data._doc)
                    res.send(result)
                })
            }else{
                res.send([])
            }
        })*/
        try {
            const result =await Relationship.findOne({$or:[{friend_id,user_id},{user_id:friend_id,friend_id:user_id}]})
            friendInfo = await User.findById(friend_id,{username:1,sign:1,gender:1,email:1})
            if(result && friendInfo){ // 如果查询到有数据
                res.send(Object.assign({relations:result._doc.relations},{friendInfo:friendInfo._doc},{roomId:result._doc.roomId}))
            }else if(!result && friendInfo){ // 用户存在不是好友
                res.send(Object.assign({relations:2},{friendInfo:friendInfo._doc}))
            } else {
              res.send({msg:'用户不存在'})
            }
        }catch(e)
        {
            res.status(500).json({msg:'服务器错误'})
        }

    })
    // 添加好友，同时更新好友表 个人表， 以及好友关系表
    app.post('/find/addFriend',async (req,res)=>{
        const {user_id,friend_id} = req.body
        // 查询是否已经是好友
        // 如果已经是好友，就直接返回
        // 如果不是好友则添加好友 同时更新用户friendList 数组

        try {

            const result =await Relationship.findOne({$or:[{friend_id,user_id},{user_id:friend_id,friend_id:user_id}],relations:1})
            if(result ){ // 如果查询到有数据
                // 已经是好友
                console.log(result)
                res.send({msg:'已经是好友',roomId:result._doc.roomId,codeFlag:1})
            }else{ // 用户存在不是好友
                // 添加好友得操作
                const roomId = uuid.v1()
                let id = user_id.localeCompare(friend_id)<0?{user_id,friend_id}:{user_id:friend_id,friend_id:user_id}
                const RelationshipData = new Relationship({
                    ...id,
                    relations:1,
                    roomId
                })
                // 好友关系库添加
                RelationshipData.save(async (err,data)=>{
                    if(err) res.status(500).json({msg:'服务器错误'})
                    await changeFriendList(friend_id,user_id)
                    await changeFriendList(user_id,friend_id)
                    let result = await User.findById(user_id,{userpwd:0})
                    res.send(Object.assign(result._doc,{roomId,codeFlag: 2}))
                })
            }
        }catch(e)
        {
            res.status(500).json({msg:'服务器错误'})
        }
    })
    // 通过当前用户 查询房间号
}
 async function changeFriendList(user_id,friend_id,callback) {
    const result =await User.findById(friend_id,{username:1,_id:0})
    const res =await User.findByIdAndUpdate(user_id,{$push:{friendList:{id:friend_id,name:result._doc.username}}})
    return res
}

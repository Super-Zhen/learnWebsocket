const Relationship = require('../schema_model/relationship')
const User = require('../schema_model/user')
const compareLocal = require('../util/compareLocal')
const Online = require('../schema_model/online')
const uuid = require('node-uuid')
module.exports = function (app) {
    // 判断是否是好友关系
    /*
       添加好友的时候最初的想法是按照先将两个id对比大小存入，
       然后再个人信息表中friendList 中添加上对方的id
       但是再查询双方是否是好友的时候然后再返回好友信息的时候就变得比较复杂
       （因为好友关联表和用户信息表关联，用户和用户的好友不能再表中确定身份，
       就会出现friend 返回用户信息，user 返回朋友信息，需要做判断处理）
       后来借鉴别人项目中的方法 将好友关联表中 好友添加 存成不同顺序的两个 a,b or b,a 查询的时候比较方便
     */
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
            // 这儿得传入的参数是小的在前面 大的
            // const [user,friend] = compareLocal(user_id,friend_id)
            // const path = friend=== friend_id?'friend_id':'user_id'
            const result =await Relationship.findOne({friend_id,user_id}).populate({
                path: 'friend_id',
                select: 'username email'
            })
            console.log(result)
            if(result){ // 如果查询到有数据
                res.send(result)
            }else if(!result && friendInfo){ // 用户存在不是好友
                friendInfo = await User.findById(friend_id,{username:1,sign:1,gender:1,email:1})
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
            // 由于上面的修改 这儿的查询也不再需要or 来查询，只需要查询其中一条是否存在就可以了
            const result =await Relationship.findOne({$or:[{friend_id,user_id},{user_id:friend_id,friend_id:user_id}],relations:1})
            if(result ){ // 如果查询到有数据
                // 已经是好友
                console.log(result)
                res.send({msg:'已经是好友',roomId:result._doc.roomId,codeFlag:1})
            }else{ // 用户存在不是好友
                // 不是好友的时候需要给对方发送一条通知
                const isOnline = await Online.findOne({user_id:friend_id}).exec()
                if(!isOnline){
                    throw Error('添加好友，查询不到好友是否在线')
                }
                if(isOnline._doc.status==="1"){//在线
                    global.SOCKETIO.to(isOnline._doc.socketId).emit('addFriend',{})
                }
                // 添加好友得操作
                const roomId = uuid.v1()
                // 比较也不再需要
                // let id = user_id.localeCompare(friend_id)<0?{user_id,friend_id}:{user_id:friend_id,friend_id:user_id}
                const relations = {
                    friend_id,
                    user_id,
                    relations:1,
                    roomId
                }
                const otherRelations ={
                    friend_id:user_id,
                    user_id:friend_id,
                    relations:1,
                    roomId
                }
                const relationshipData = new Relationship(relations).save()
                const otherRelationshipData = new Relationship(otherRelations).save()
                // 好友关系库添加
                RelationshipData.save(async (err,data)=>{
                    if(err) res.status(500).json({msg:'服务器错误'})
                    // await changeFriendList(friend_id,user_id)
                    // await changeFriendList(user_id,friend_id)
                    // let result = await User.findById(user_id,{userpwd:0})
                    // res.send(Object.assign(result._doc,{roomId,codeFlag: 2}))
                    res.send({msf:'成功'})
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

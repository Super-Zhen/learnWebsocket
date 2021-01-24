const Relationship = require('../schema_model/relationship')
const User = require('../schema_model/user')
module.exports = function (app) {
    // 判断是否是好友关系
    app.post('/find/relation',async (req,res)=>{
        const {user_id,friend_id} = req.body
        // 通过id查询 //返回关系  普通写法
        // Relationship.findOne({$or:[{friend_id,user_id},{user_id:friend_id,friend_id:user_id}]},{_id:0},(err,data)=>{
        //    if(err) res.status(500).json({msg:'服务器错误'})
        //     if(data && data.relations === 1){
        //         User.findById(friend_id,{username:1,sign:1,gender:1,_id:0,email:1},(err,datas)=>{
        //             if(err) res.status(500).json({msg:'服务器错误'})
        //             console.log(datas,data[0])
        //
        //             let result = Object.assign({},{friendInfo:datas._doc},data._doc)
        //             res.send(result)
        //         })
        //     }else{
        //         res.send([])
        //     }
        // })
        try {
            const result =await Relationship.findOne({$or:[{friend_id,user_id},{user_id:friend_id,friend_id:user_id}]})
            const friendInfo = await User.findById(friend_id,{username:1,sign:1,gender:1,email:1})
            if(result && friendInfo){ // 如果查询到有数据
                res.send(Object.assign({relations:result._doc.relations},{friendInfo:friendInfo._doc}))
            }else if(!result && friendInfo){ // 用户存在不是好友
                res.send(Object.assign({relations:2},{friendInfo:friendInfo._doc}))
            }
        }catch(e)
        {
            res.status(500).json({msg:'服务器错误'})
        }
    })
    // 添加好友得操作
    // const RelationshipData = new Relationship({
    //     user_id,
    //     friend_id,
    //     relations:1
    // })
    // RelationshipData.save((err,data)=>{
    //     if(err) res.status(500).json({msg:'服务器错误'})
    //     console.log(data)
    // })
}

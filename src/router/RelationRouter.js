const Relationship = require('../schema_model/relationship')
module.exports = function (app) {
    // 判断是否是好友关系
    app.post('/find/relation',(req,res)=>{
        const {user_id,friend_id} = req.body
        // 通过id查询 //返回关系
        Relationship.find({"$or":[{user_id},{friend_id}]},{relations:1},(err,data)=>{
            if(err) res.status(500).json({msg:'服务器错误'})
            res.send(data)
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
    })
}

const Relationship = require('../schema_model/relationship')

module.exports = function (app) {
    app.get('/find/roomUser',async (req,res)=>{
        const {roomId,id} = req.query
        let result = await Relationship.findOne({roomId,relations:1},{roomId:0,_id:0}).populate({
            path:'friend_id',
            select:"-userpwd -createdate -logindate -__v"
        }).exec()
        console.log(result)
        let sendData = [result._doc.friend_id,result._doc.user_id].filter(item=>item!==id)
        console.log(sendData)
        res.send(sendData)
    })
    app.get('/find/roomId', async (req,res)=>{
        const {user_id,friend_id} = req.query
        try {
            const result =await Relationship.findOne({user_id,friend_id})
            if(result ){ // 如果查询到有数据
                console.log(result)
                res.send(result)
            }else {
                res.status(500).json({msg:'服务器错误'})
            }
        }catch(e)
        {
            res.status(500).json({msg:'服务器错误'})
        }
    })
}

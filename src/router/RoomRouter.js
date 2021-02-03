const Relationship = require('../schema_model/relationship')

module.exports = function (app) {
    app.get('/find/roomUser',async (req,res)=>{
        const {roomId,id} = req.query
        let result = await Relationship.findOne({roomId},{roomId:0,_id:0}).exec()
        let sendData = [result._doc.friend_id,result._doc.user_id].filter(item=>item!==id)
        console.log(sendData)
        res.send(sendData)
    })
}

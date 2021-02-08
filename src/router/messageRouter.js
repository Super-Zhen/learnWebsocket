const relation  = require('../schema_model/relationship')
const message = require('../schema_model/message')

module.exports = function (app) {
    app.get('/find/msgRoom',(req,res)=>{
        console.log(req)
        //获取所有的房间 然后通过房间查询相应的消息

        res.send(2123123)
    })
}

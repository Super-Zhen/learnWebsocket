const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Message = new Schema({
    //记录ID、会话号、发送人ID、接收人ID、时间、内容类型、内容、状态
    send_id:{type:String}, // 发送者的id
    send_time:{type:Date},
    content:{type:String},
    contentType:{type:Number}, // 1 text 2 img 3 voice 4 video
    receive_id:{type:String}, // 接收id
    roomId:{type:String}             // 房間號
})
const  Message = mongoose.model('Message',Message)

module.exports = Message

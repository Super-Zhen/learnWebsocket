// 更新用户在线状态
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Status = new Schema({
    user_id:{type:Schema.Types.ObjectId,ref:'user'},
    status:{
        type:String,
        enum:["1","2"], // 1是在线 2是下线
    },
    socketId:String
})

Status.index({ user_id: 1 }, { unique: true });
Status.statics.findByUserId= function(data,cb){
    return this.findOne(data,cb)
}
const status = mongoose.model('Status',Status,'status')

module.exports = status

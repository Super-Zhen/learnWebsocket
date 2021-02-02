// 用户储存用户得socketid
const mongoose = require('mongoose')
const Schema =mongoose.Schema
const socketId =new Schema({
    user_id:String,
    time:{
        type:Date,
        default:Date.now()
    },
    socketId:String,
    ip:String,
    os:String,
})
const socket = mongoose.model('SocketId',socketId)
module.exports = socket

const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 用法简介
// https://www.cnblogs.com/chris-oil/p/9142795.html

const UserSchema = new Schema({
    username : { type: String },                    //用户账号
    userpwd: {type: String},                        //密码
    tel:{ type:String,default:''},                  // 电话
    // uuid:{type:String},
    email:{type:String},                            // 邮箱
    gender:{type:String,default:''},                // 性别
    sign:{type:String,default:''},                  // 签名
    logindate : { type: Date,default:Date.now},     // 最近登录时间
    createdate:{type:Date},                          // 注册时间
    friendList:{type:Array}                         // 好友列表
})
UserSchema.statics.findUser = function(param,cb){
            return this.find(param,cb)
        }

const user = mongoose.model('user',UserSchema)

module.exports = user


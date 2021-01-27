const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RelationShip = new Schema({
    user_id:{type:String},
    friend_id:{type:String},
    relations:{type:Number},  // 1 代表好友关系 2 代表以前是好友关系 后解除好友关系
    roomId:{type:String}             // 房間號
})
const  relation = mongoose.model('Relation',RelationShip)

module.exports = relation

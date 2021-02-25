const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RelationShip = new Schema({
    user_id:{type:String},    //user_id 和friend_id 存放的规则是user_id.localeCompare(friend_id)较小的存放为user_id
    friend_id:{type: Schema.Types.ObjectId,ref:'user'},
    relations:{type:Number},  // 1 代表好友关系 2 代表以前是好友关系 后解除好友关系 3 从未添加过好友  不是好友，未通过验证
    roomId:{type:String}             // 房間號
})
const  relation = mongoose.model('Relation',RelationShip)

module.exports = relation

const express = require('express')
const bodyParse = require('body-parser')
const mongodb = require('./util/mongodb')
const Message = require('./schema_model/message')
const Socket =  require('./schema_model/soceketid')
const Online =  require('./schema_model/online')
const Relation =  require('./schema_model/relationship')
const getClientIp = require('./util/getIp')
const app = express()
// const router = require('./router/index')
const router = require('./router')

app.use(bodyParse.json())
// 记录登陆信息
let device ={}
app.use("*",function(req,res,next){
    device.ip = getClientIp(req)
    device.os = req.headers['user-agent'].toUpperCase().replace(/\s+/g,'')
    // console.log('authorization',req.headers.authorization)
    // if(req.headers.authorization){
    //     let payloads = jwt.verify(req.headers.authorization,'12312wasdasd')
    //     console.log('token2',payloads)
    // }else{
    //     res.status(401).send({msg:'请先登录哦！'})
    // }
    return next()
})
router(app)
// app.post('/user/login', function (req, res) {
//     // console.log(req.body.data)
//
//
//     console.log(Crypto.getDAes(req.body.data))
//     let payload = {name:Crypto.getDAes(req.body.data).name};
//     // let payload = {name:JSON.parse(req.body.data).name};
//     let secret = '12312wasdasd';
//     let token = jwt.sign(payload,secret);
//     console.log('token:',token)
//     res.send(token)
// });
const server = app.listen(8000,data=>{
    console.log('listen8000')
})
const io = require('socket.io')(server,{
    cors: true
})
// 当前在线用户
let onlineUsers = {};
// //当前在线人数
let onlineCount = 0;
io.on('connection', socket => {
    console.log('connected');
    setTimeout(()=>{
        socket.broadcast.emit('message','user connected');
        },2000)
    //监听disconnect事件
    socket.on('disconnect', async () => {
        console.log(socket.id)
        Online.findOneAndUpdate({socketId:socket.id},{status:'2'})
        console.log('disconnect')
    })

    // 用户登录后进行的操作
    socket.on('loginAfter',async data=>{
        console.log('loginAfter',data)
        const {user_id} = data
        // 判断 socket中是否存在当前用户的当前信息
        // 如果没有或者设备ip 不一样就进行储存
        // 如果设备ip一样的话，就直接更新
        // socket.
        try {
            const res = await Socket.findOne({user_id,...device}).exec()
            if(!res){
                let result = await new Socket({user_id,...device,socketId:socket.id}).save()
                console.log(user_id,result)
            }else{
                let result = await Socket.updateOne({_id:res._id},{socketId:socket.id}).exec()
                console.log(user_id,result)
            }
            let result =  await Online.findByUserId({user_id})
            if(!result){
               let result =  await new Online({user_id,socketId:socket.id,status:"1"}).save()
                console.log(user_id,result,'数据保存成功')
            }else{
                let result = Online.findOneAndUpdate({user_id},{socketId:socket.id,status:"1"}).exec()
                console.log(user_id,result)
            }
        }catch (e) {
            console.log(e)
        }

    })



    socket.on('messages',async (data)=>{
        // 通过roomId 来查找用户的id,然后在查找用户的socketid
        // Relation.aggregate([{
        //     $lookup:{
        //         from:"status",
        //         localField:"user_id",
        //         foreignField:"user_id",
        //         as:"item"
        //     }
        // }],(err,docs)=>{
        //     if(err) return err
        //     console.log(JSON.stringify(docs))
        // })
        // socket.join(data.info.roomId)
        // io.to(data.info.roomId).emit('messages',{'qwe':'大家好'})
        console.log(data)
        // io.to(data.id).emit('messages',{'qwe':'21312'})
        const {send_id,send_time,content,contentType,receive_id,isSingle,uid,index} = data.info
        const saveData =await new Message({
            index,
            send_id, // 发送者的id
            send_time,
            content,
            contentType, // 1 text 2 img 3 voice 4 video
            receive_id, // 接收id
            roomId:data.roomId,
            isSingle,
            uid
        })
        // console.log(saveData)
        saveData.save( async function (err,data) {
            if(err) {
                socket.emit('status','0')
            }
            console.log(data)
            socket.emit('status','1')
            // socket.emit('messages',saveData)
            const result = await Socket.findOne({user_id:receive_id[0]})
            io.to(result._doc.socketId).emit('messages',data )

        })
    })
});

// function getClientIp(req) {
//     let ipAddress;
//     let forwardedIpsStr = req.header('x-forwarded-for');
//     if (forwardedIpsStr) {
//         let forwardedIps = forwardedIpsStr.split(',');
//         ipAddress = forwardedIps[0];
//     }
//     if (!ipAddress) {
//         ipAddress = req.connection.remoteAddress;
//     }
//     return ipAddress;
// }
function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

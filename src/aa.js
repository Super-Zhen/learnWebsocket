const express = require('express')
const bodyParse = require('body-parser')
const mongodb = require('./util/mongodb')
const Message = require('./schema_model/message')
const app = express()
// const router = require('./router/index')
const router = require('./router')

app.use(bodyParse.json())

// app.use("*",function(req,res,next){
//     console.log('authorization',req.headers.authorization)
//     if(req.headers.authorization){
//         let payloads = jwt.verify(req.headers.authorization,'12312wasdasd')
//         console.log('token2',payloads)
//     }else{
//         res.status(401).send({msg:'请先登录哦！'})
//     }
//     return next()
// })
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
io.on('connection', socket => {
    console.log('connected');

    //监听disconnect事件
    socket.on('disconnect', () => {
        console.log('disconnect')
    })
    socket.on('messages',(data)=>{
        console.log(data)
        console.log(io,socket)
        io.to(data.id).emit('messages',{'qwe':'21312'})
        // const saveData = new Message({
        //     send_id:data.info.send_id, // 发送者的id
        //     send_time:data.info.send_time,
        //     content:data.content,
        //     contentType:data.contentType, // 1 text 2 img 3 voice 4 video
        //     receive_id:data.info.receive_id, // 接收id
        //     roomId:data.info.roomId
        // })
        // saveData.save(function (err,data) {
        //     socket.emit('status','1')
        //     socket.emit('messages',saveData)
        // })

    })
});
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

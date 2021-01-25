const url = require('../config/mongoose.config').url()
const mongoose = require('mongoose')
mongoose.connect(url,{ config: { autoIndex: false },useUnifiedTopology: true,useNewUrlParser: true  }) // 添加后面得配置https://www.cnblogs.com/chris-oil/p/9142795.html 中提到
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + url);
});
mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});
module.exports = mongoose

const CryptoJs = require('crypto-js')
const key_vi = require('../config/crypto.config')
// var a= CryptoJs.MD5('你好').toString();
// console.log(a)
// var md5Password = CryptoJs.MD5(a+"zol") + ' ';
// console.log(md5Password.toString())
function getAesString(data,key,iv){//加密
    var key  = CryptoJs.enc.Utf8.parse(key);
    var iv   =  CryptoJs.enc.Utf8.parse(iv);
    var encrypted =CryptoJs.AES.encrypt(data,key,
        {
            iv:iv,
            mode:CryptoJs.mode.ECB,
            padding:CryptoJs.pad.Pkcs7
        });
    return encrypted.toString();    //返回的是base64格式的密文
}
function getDAesString(encrypted,key,iv){//解密
    var key  = CryptoJs.enc.Utf8.parse(key);
    var iv   =  CryptoJs.enc.Utf8.parse(iv);
    var decrypted =CryptoJs.AES.decrypt(encrypted,key,
        {
            iv:iv,
            mode:CryptoJs.mode.ECB,
            padding:CryptoJs.pad.Pkcs7
        });
    return decrypted.toString(CryptoJs.enc.Utf8);
}

 function getAES(data){ //加密
    var key  = key_vi.key;  //密钥
    var iv   = key_vi.iv;
    var encrypted =getAesString(data,key,iv); //密文
    var encrypted1 =CryptoJs.enc.Utf8.parse(encrypted);
    return encrypted;
}

 function getDAes(data){//解密
     var key  = key_vi.key;  //密钥
     var iv   = key_vi.iv;
    var decryptedStr =getDAesString(data,key,iv);
    return decryptedStr;
}
module.exports = {
    getAES,
    getDAes
}

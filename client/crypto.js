import AES from 'crypto-js/aes'
import Utf8 from 'crypto-js/enc-utf8'
import ecb from 'crypto-js/mode-ecb'
import Pkcs7 from 'crypto-js/pad-pkcs7'
// var md5 = require('crypto-js/md5')
import md5 from 'crypto-js/md5'
function getAesString(data,key,iv){//加密
  var key  = Utf8.parse(key);
  var iv   = Utf8.parse(iv);
  var encrypted =AES.encrypt(data,key,
    {
      // iv:iv,
      mode:ecb,
      padding:Pkcs7
    });
  return encrypted.toString();    //返回的是base64格式的密文
}
function getDAesString(encrypted,key,iv){//解密
  var key  = Utf8.parse(key);
  var iv   = Utf8.parse(iv);
  var decrypted =AES.decrypt(encrypted,key,
    {
      // iv:iv,
      mode:ecb,
      padding:Pkcs7
    });
  return decrypted.toString(Utf8);
}

export function getAES(data){ //加密
  var key  = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';  //密钥
  var iv   = '1234567812345678';
  var encrypted =getAesString(data,key,iv); //密文
  var encrypted1 =Utf8.parse(encrypted);
  return encrypted;
}

export function getDAes(data){//解密
  var key  = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA';  //密钥
  var iv   = '1234567812345678';
  var decryptedStr =getDAesString(data,key,iv);
  return decryptedStr;
}
export function md5s(data) {
  return md5(data).toString()
}

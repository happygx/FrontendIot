/* const CryptoJS = require("crypto-js"); // 引用AES源码js

const key: any = CryptoJS.enc.Utf8.parse("1234123412ABCDEF"); // 十六位十六进制数作为密钥
const iv: any = CryptoJS.enc.Utf8.parse("ABCDEF1234123412"); // 十六位十六进制数作为密钥偏移量

// 解密方法
function Decrypt(word: string) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

// 加密方法
function Encrypt(word: string) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return encrypted.ciphertext.toString().toUpperCase();
}

export {
  Decrypt,
  Encrypt
}; */

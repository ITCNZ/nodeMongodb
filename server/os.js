// var os = require("os");
// // 字节顺序
// console.log('endianness : ' + os.endianness());
// // 操作系统类型
// console.log('type : ' + os.type());
// // 操作系统平台
// console.log('platform : ' + os.platform());
// // 内存总量
// console.log('total memory : ' + os.totalmem() + " bytes.");
// // 空闲内存大小
// console.log('free memory : ' + os.freemem() + " bytes.");



var path = require("path");
// 规范化
console.log('normalization : ' + path.normalize('/test/test1//2slashes/1slash/tab/..'));
// 联合
console.log('joint path : ' + path.join('/test', 'test1', '2slashes/1slash', 'tab', '..'));
// 转换
console.log('resolve : ' + path.resolve('main.js'));
// 拓展名
console.log('ext name : ' + path.extname('main.js'));
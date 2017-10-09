// var fs = require('fs');
// var data = fs.readFileSync('../txt/input.txt', (error, data) => {
//         console.log('error', error);
//         console.log('data', data.toString())
//     });
//
// console.log(data.toString());


var fs = require("fs");
var data = '';

// 创建一个读取流
var readerStream = fs.createReadStream('../txt/input.txt');

//设置编码方式为utf-8
readerStream.setEncoding('UTF8');

// 处理流事件： data, end, and error
readerStream.on('data', function(chunk) {
    data += chunk;
});

readerStream.on('end',function(){
    console.log(data);
});

readerStream.on('error', function(err){
    console.log(err.stack);
});

console.log("程序结束");
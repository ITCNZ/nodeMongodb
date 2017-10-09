// var fs = require("fs");
// // 异步读取
// fs.readFile('../txt/input.txt', (err, data) => {
//     if (err) {
//         return console.error(err);
//     }
//     console.log("异步读取: " + data.toString());
// });
// // 同步读取
// var data = fs.readFileSync('../txt/input.txt');
// console.log("同步读取: " + data.toString());
// console.log("程序结束");



// var fs = require("fs");
// console.log("即将获取文件信息!");
// fs.stat('../txt/input.txt', function (err, stats) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log(stats);
//     console.log("成功获取文件!");
//
//     // 检查文件类型
//     console.log("是否为文件?" + stats.isFile());
//     console.log("是否为目录?" + stats.isDirectory());
// });


var fs = require("fs");
console.log("即将写入文件");
fs.writeFile('../txt/input.txt', 'This is a 重新写文件', (err) => {
    if (err) {
        return console.error(err);
    }
    console.log("成功写入数据！");
    console.log("让我们来看看写入的新数据");
    fs.readFile('../txt/input.txt', (err, data) => {
        if (err) {
            return console.error(err);
        }
        console.log("异步读取: " + data.toString());
    });
});
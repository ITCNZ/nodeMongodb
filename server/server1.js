var http = require('http');
var fs = require('fs');
var url = require('url');
// 创建一个服务器
http.createServer( function (request, response) {
    // 获取包含文件名的请求
    var pathname = url.parse(request.url).pathname;

    // 输出请求对应的文件名
    console.log("Request for " + pathname + " received.");

    // 在文件系统中读取请求文件的内容
    fs.readFile(pathname.substr(1), function (err, data) {
        if (err) {
            console.log(err);
            // HTTP 状态: 404 : NOT FOUND
            // 内容类型: text/plain
            response.writeHead(404, {'Content-Type': 'text/html'});
        }else{
            //找到页面  
            // HTTP 状态: 200 : OK
            //内容类型: text/plain
            response.writeHead(200, {'Content-Type': 'text/html'});

            // 将文件的内容写入响应中
            response.write(data.toString());
        }
        //发送响应
        response.end();
    });
}).listen(8081);
//控制台输出信息
console.log('Server running at http://127.0.0.1:8081/');
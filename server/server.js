var HTTP = require('http');


HTTP.createServer(function (request, response) {
    // 设置HTTP的标题
    // HTTP 状态: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});
    // 将响应的body设置为 "Hello World"
    response.end('Hello World\n');
}).listen(8081);
// 控制台会打印这段信息
console.log('服务器运行在http://127.0.0.1:8081/');








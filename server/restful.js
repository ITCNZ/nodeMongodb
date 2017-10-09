var express = require('express');
var app = express();
var fs = require("fs");
var path = require('path');

//添加的新用户数据
var user = {
    "user4" : {
        "name" : "mohit",
        "password" : "password4",
        "profession" : "teacher",
        "id": 5
    }
};

app.get('/listUsers/:id', function (req, res) {
    fs.readFile( path.resolve(__dirname, '..') + "/public/json/users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);

        // 添加会员数据
        data['user4'] = user['user4'];

        // 获取会员详情
        data = data['user' + req.params.id];


        res.end( JSON.stringify(data));
    });
});

var server = app.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

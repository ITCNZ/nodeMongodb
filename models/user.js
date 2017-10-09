
var blogs = require('./blog');
var express = require('express');
var router = express.Router();

console.log(blogs)

// 查
router.get('/list',(req,res) => {
    
    // 通过模型去查找数据库
    blogs.find((err,data) => {
        console.log('docs::::::', docs);  //测试，输出查询获得的对象，其实就是一个json文档。

    });
});

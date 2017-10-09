var express = require('express');
var router = express.Router();
var moment = require('moment');

// 引入模型
var listModel = require('./db');

// 读取全部文章
router.get('/api/newslist', (req, res, next) => {

    listModel.find((err, data) => {

        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });

});

// 读取单个文章详情
router.get('/api/newslist/:id', (req, res, next) => {
    listModel.findById(req.params.id, (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

// 写入文章
router.post('/api/newsedit', (req, res, next) => {

    let editList = new listModel({
        title: req.body.title,
        author: req.body.author,
        date: req.body.date ? req.body.date : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        content: req.body.content
    });

    editList.save((err, data) => {

        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });

});

// 删除文章
router.get('/api/newsdelet/:id',(req, res, next) => {

    listModel.findById(req.params.id, (err, data) => {
        data.remove((err, data) => {
            res.send({
                msg: '你很叼哦,请求成功了!'
            });
            res.end();
        });
    });

});

// 编辑文章
router.post("/api/newsedit/:id", (req, res, next) => {

    listModel.findById(req.params.id, (err, data) => {
        data.content = req.body.content;
        data.date = req.body.date ? req.body.date : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        data.author = req.body.author;
        data.title = req.body.title;

        data.save(function(err, data) {
             if (err) {
                 res.send(err);
             } else {
                 res.send(data);
             }
        });

    });
});



// 爬虫案例
var request = require('request');
var cheerio = require('cheerio');

router.get('/api/cnode', (req, res, next) => {
    var param = req.query || req.params;
    var indexPage = param.page;
    if (indexPage == null) {
        indexPage = 1;
    }

    request('http://cnodejs.org/?tab=all&page=' + indexPage, (err, response, body) => {
        if (err) {
            res.send(err)
        } else {
            var $ = cheerio.load(body, {decodeEntities: false}); //当前的$符相当于拿到了所有的body里面的选择器
            var listText = $('.cell'); //拿到导航栏的内容
            var dataList = {
                msg: "请求成功!",  // 状态提示信息
                status: "200",   // 状态码 200表示成功  201表示失败
                currentPage: indexPage  // 当前的页码数
            };
            var resDatas = [];

            listText.each(function (i, elem) {
                var resData = {};
                resData.title = $(this).find(".topic_title").text().replace(/(^\s*)|(\s*$)/g,"");
                resData.time = $(this).find(".last_active_time").text().replace(/(^\s*)|(\s*$)/g,"");
                resData.viewCount = $(this).find(".count_of_visits").text().replace(/(^\s*)|(\s*$)/g,"");
                resData.replyCount = $(this).find(".count_of_replies").text().replace(/(^\s*)|(\s*$)/g,"");
                resData.url = 'http://cnodejs.org' + $(this).find(".topic_title").attr('href');
                // console.log('navText---', resData)
                resDatas.push(resData);
            });

            dataList.resDatas = resDatas;
            // res.end(JSON.stringify(dataList));
            res.send(dataList);
        }
    })

});


module.exports = router;

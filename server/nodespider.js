var express = require('express');
var app = express();
var request = require('request');
var cheerio = require('cheerio');

/*
* 请求案例 http://localhost:8088/spider?page=3
* @param page 当前页
*
 */
app.get('/api/cnode', (req, res, next) => {
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
                resDatas.push(resData);
            });

            dataList.resDatas = resDatas;
            // res.end(JSON.stringify(dataList));
            res.send(dataList);

        }
    })

});



var server = app.listen(8082, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

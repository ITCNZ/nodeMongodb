var express = require('express');
var router = express.Router();
var User = require('./users');

router.get('/login', function (req, res) {
    res.render('login');
});
router.get('/register', function (req, res) {
    res.render('register');
});

// 这里的业务逻辑将写在 两个post 路由里
router.post('/login', function (req, res) {

});
router.post('/register', function (req, res) {

});
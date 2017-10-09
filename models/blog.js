var mongoose = require("mongoose");  //  顶会议用户组件
mongoose.connect('mongodb://localhost/blogdata');

// 为这次连接绑定事件
var db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));

// 创建模型
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs:  Number
    }
});

const Blog = mongoose.model('Blog',blogSchema);

module.exports = Blog;

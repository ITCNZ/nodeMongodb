// 加载事件模块
var events = require('events');
// 创建一个eventEmitter对象
var eventEmitter = new events.EventEmitter();
// 创建一个事件句柄
var connectHandler = function connected() {
    console.log('连接成功');
    // 触发data_received事件
    eventEmitter.emit('data_received');
}
// 将事件和句柄绑定
eventEmitter.on('connection', connectHandler);
// 将data_received和一个函数绑定
eventEmitter.on('data_received', function(){
    console.log('成功接收数据');
});
// 触发事件
eventEmitter.emit('connection');
console.log("程序结束");

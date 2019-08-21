const fs = require('fs');
const path = require('path');//解析需要遍历的文件夹
const filePath = path.resolve('../docs');
const wss = require('./WebSocketServer');

module.exports = {
    start: function () {
        fs.watch(filePath, function (event, filename) {
            if (event === 'change') {
                console.log(`watch onEvent change`);
                wss.sendRefreshMsg();
            }
        });
    }
};

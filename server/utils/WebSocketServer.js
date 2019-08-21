const WebSocket = require('ws');

const WebSocketServer = WebSocket.Server;

const wss = new WebSocketServer({
    port: 3001
});

wss.on('connection', function (ws) {
    console.log(`a connection create`);
    ws.on('message', function (message) {
        console.log(`收到客户端的数据: ${message}`);
    })
});

module.exports = {
    sendRefreshMsg: function () {
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send("refresh");
            }
        });
    }
};
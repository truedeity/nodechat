/// <reference path="../declarations/node.d.ts" />
/// <reference path="../declarations/ws.d.ts" />
'use strict';
var WebSocket = require("ws");
var models = require("./models");
var port = process.env.PORT || 3000;
var WebSocketServer = WebSocket.Server;
var server = new WebSocketServer({ port: port });
server.on('connection', function (ws) {
    ws.on('message', function (message) {
        try {
            var userMessage = new models.UserMessage(message);
            broadcast(JSON.stringify(userMessage));
            console.log('test22');
        }
        catch (e) {
        }
    });
});
function broadcast(data) {
    server.clients.forEach(function (client) {
        client.send(data);
        console.log("test");
    });
}
console.log("server is running on port ", port);
//tsc --removeComments --module commonjs --target ES5 --outDir build src/server.ts
//node build/server 

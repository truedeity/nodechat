


/// <reference path="../declarations/node.d.ts" />
/// <reference path="../declarations/ws.d.ts" />

'use strict';

import WebSocket = require("ws");
import models = require("./models");


var port: number = process.env.PORT || 3000;
var WebSocketServer = WebSocket.Server;

var server = new WebSocketServer({ port: port });



server.on('connection', ws => {
    
    ws.on('message', message => {
        try {
            
            var userMessage: models.UserMessage = new models.UserMessage(message);
            broadcast(JSON.stringify(userMessage));
            
        } catch (e) {
            
        }
    })
    
})


function broadcast(data:string) :void {
    server.clients.forEach(client => {
        
        client.send(data);
        
    })
}


console.log("server is running on port ", port);


//tsc --removeComments --module commonjs --target ES5 --outDir build src/server.ts
//node build/server 

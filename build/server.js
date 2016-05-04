/// <reference path="../declarations/node.d.ts" />
/// <reference path="../declarations/azure.d.ts" />
/// <reference path="../declarations/azure-sb.d.ts" />
"use strict";
var azure = require('azure');
var utils = require("./sbUtils");
var config = require("./config");
var client = azure.createServiceBusService(config.ServiceBusEndpoint);
var topic = config.Topic;
var queue = config.Queue;
var useQueue = config.UseQueue;
var util = new utils.ServiceBusUtility(client);
console.log("Server is ready to listen for the messages");
if (useQueue) {
    console.log("using queues");
    util.receiveQueueMessage(queue, function (error, message) {
        if (error) {
            console.log(error);
            return;
        }
        console.log(message.body);
    });
}
else {
    console.log("using topics");
    util.subscribe(topic, function (error, message) {
        if (error) {
            console.log(error);
            return;
        }
        console.log(message.body);
    });
}

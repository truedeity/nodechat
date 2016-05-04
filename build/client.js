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
process.stdin.addListener("data", function (msg) {
    var buffer = new Buffer(msg);
    var message = buffer.toString("utf-8");
    if (useQueue) {
        util.sendQueueMessage(queue, message, function (error, result) {
            if (error) {
                console.log(error);
            }
        });
    }
    else {
        util.sendTopicMessage(topic, message, function (error, result) {
            if (error) {
                console.log(error);
            }
        });
    }
});

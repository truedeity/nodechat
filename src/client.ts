/// <reference path="../declarations/node.d.ts" />
/// <reference path="../declarations/azure.d.ts" />
/// <reference path="../declarations/azure-sb.d.ts" />


import azure = require('azure');
import utils = require("./sbUtils");
var config = require("./config")

var client = azure.createServiceBusService(config.ServiceBusEndpoint);
var topic = config.Topic;
var queue = config.Queue;
var useQueue:boolean = config.UseQueue;
var util:utils.ServiceBusUtility = new utils.ServiceBusUtility(client);




process.stdin.addListener("data", (msg)=> {
    
    var buffer = new Buffer(msg);
    var message = buffer.toString("utf-8");
    
    
    if (useQueue) {
        
        util.sendQueueMessage(queue, message, (error, result) => {
            if (error) {
                console.log(error); 
            }   
        })
    } else {
        util.sendTopicMessage(topic, message, (error, result) => {
            if(error) {
                console.log(error);
            }
        });
    }
        
    
    
})

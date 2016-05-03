/// <reference path="../declarations/node.d.ts" />
/// <reference path="../declarations/azure.d.ts" />
/// <reference path="../declarations/azure-sb.d.ts" />
"use strict";
var azure = require('azure');
var serviceBusService = azure.createServiceBusService("Endpoint=sb://shcpatientportal-dev.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=7Y/K3coL51vIPEqg9uELnQwJFllt7QTy7hgts4mMEmg=");
var topic = 'fhir_datasync_topic_dev';
var subscription = 'client1';
function sendMessage(message) {
    serviceBusService.sendQueueMessage(topic, message, function (error) {
        if (error) {
            console.log(error);
        }
        else {
            console.log('Message sent to queue ');
        }
    });
}
sendMessage("blah");
sendMessage("blah");
sendMessage("blah");
sendMessage("blah");

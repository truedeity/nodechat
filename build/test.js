/// <reference path="../declarations/node.d.ts" />
/// <reference path="../declarations/azure.d.ts" />
/// <reference path="../declarations/azure-sb.d.ts" />
/// <reference path="sbUtils.ts" />
"use strict";
var azure = require('azure');
var utils = require("./sbUtils");
var client = azure.createServiceBusService("Endpoint=sb://shcpatientportal-dev.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=7Y/K3coL51vIPEqg9uELnQwJFllt7QTy7hgts4mMEmg=");
var mytopic = 'fhir_datasync_topic_dev';
var util = new utils.ServiceBusUtility(client);
util.getSubscriptions(mytopic, function (error, message) {
    if (error) {
        console.log(error);
        return;
    }
    console.log(message);
});
util.getTopics(function (error, message) {
    if (error) {
        console.log(error);
        return;
    }
    console.log(message);
});

/// <reference path="../declarations/node.d.ts" />
/// <reference path="../declarations/azure.d.ts" />
/// <reference path="../declarations/azure-sb.d.ts" />
"use strict";
var azure = require('azure');
var serviceBusService = azure.createServiceBusService("Endpoint=sb://shcpatientportal-dev.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=7Y/K3coL51vIPEqg9uELnQwJFllt7QTy7hgts4mMEmg=");
var mytopic = 'fhir_datasync_topic_dev';
function subscribe(topic) {
    serviceBusService.receiveSubscriptionMessage(topic, 'PatientPortalDev', function (error, message) {
        if (!error) {
            console.log("got a message");
            console.log(message.body);
        }
        else {
            console.log(error);
        }
        subscribe(topic);
    });
}
subscribe(mytopic);

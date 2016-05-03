/// <reference path="../declarations/node.d.ts" />
/// <reference path="../declarations/azure.d.ts" />
/// <reference path="../declarations/azure-sb.d.ts" />
/// <reference path="sbUtils.ts" />


import azure = require('azure');
import utils = require("./sbUtils")


var client:any = azure.createServiceBusService("Endpoint=sb://shcpatientportal-dev.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=7Y/K3coL51vIPEqg9uELnQwJFllt7QTy7hgts4mMEmg=");
var mytopic = 'fhir_datasync_topic_dev';



var util:utils.ServiceBusUtility = new utils.ServiceBusUtility(client);


util.getSubscriptions(mytopic, (error, message) => {
    
    if (error) {
        console.log(error);
        return;
        
    }
    
    console.log(message);
    
})
/// <reference path="../declarations/node.d.ts" />
/// <reference path="../declarations/azure.d.ts" />
/// <reference path="../declarations/azure-sb.d.ts" />


import azure = require('azure');


var serviceBusService:any = azure.createServiceBusService("Endpoint=sb://shcpatientportal-dev.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=7Y/K3coL51vIPEqg9uELnQwJFllt7QTy7hgts4mMEmg=");
var mytopic = 'fhir_datasync_topic_dev';





function subscribe(topic:string) {
  
  serviceBusService.receiveSubscriptionMessage(topic, 'PatientPortalDev', (error, message) => {
      
      if (!error) {
        console.log("got a message");
        
        console.log(message.body);
      } else {
        console.log(error);
      }  
      
      subscribe(topic);
    
  });


}



subscribe(mytopic);
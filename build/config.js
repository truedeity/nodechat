var config = {};
config.ServiceBusEndpoint = "Endpoint=sb://shcpatientportal-dev.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=7Y/K3coL51vIPEqg9uELnQwJFllt7QTy7hgts4mMEmg=";
config.Topic = "fhir_datasync_topic_dev";
config.Queue = "fhir_datasync_queue_dev";
config.UseQueue = true;
module.exports = config;

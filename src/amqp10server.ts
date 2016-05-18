/// <reference path="../declarations/node.d.ts" />

var AMQPClient = require('amqp10').Client, Policy = require('amqp10').Policy,
    Promise = require('bluebird');

var client = new AMQPClient(Policy.ServiceBusQueue); // Uses PolicyBase default policy
client.connect('amqps://RootManageSharedAccessKey:7Y%2FK3coL51vIPEqg9uELnQwJFllt7QTy7hgts4mMEmg%3D@shcpatientportal-dev.servicebus.windows.net')
  .then(function() {
    console.log("THEN");
    return Promise.all([
      client.createReceiver('fhir_datasync_queue_dev', { auto_delete: true })
      //client.createSender('fhir_datasync_queue_dev')
    ]);
  })
  .spread(function(receiver, sender) {
    console.log("SPREAD");
    //sender.on('errorReceived', function(tx_err) { console.warn('===> TX ERROR: ', tx_err); });
    receiver.on('errorReceived', function(rx_err) { console.warn('===> RX ERROR: ', rx_err); });
    var receive_callback = function (message) {
      console.log('Rx message: ', message.body);
    };
    receiver.on('message', receive_callback);
  })
  .error(function(err) {
    console.log("error: ", err);
  });

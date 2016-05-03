
/// <reference path="../declarations/amqplib.d.ts" />


import amqplib = require("amqplib")
var fhir = require("fhir.js")



var connection = amqplib.connect("amqp://10.2.1.113")
var channelName = "test";

//consumer

connection.then((con) => {
    
    var channnel = con.createChannel();
    
    channnel.then((chan) => {
        
        chan.assertQueue(channelName);
        
        chan.consume(channelName, (msg) => {
            
          
           
            
            
        })
        
    })
    
})
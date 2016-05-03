/// <reference path="../declarations/amqplib.d.ts" />
"use strict";
var amqplib = require("amqplib");
var connection = amqplib.connect("amqp://10.2.1.113");
var channelName = "test";
//consumer
connection.then(function (con) {
    var channnel = con.createChannel();
    channnel.then(function (chan) {
        chan.assertQueue(channelName);
        chan.sendToQueue(channelName, new Buffer("something to do"));
    });
});
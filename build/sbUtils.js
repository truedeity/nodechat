"use strict";
var ServiceBusUtility = (function () {
    function ServiceBusUtility(client) {
        this.client = client;
    }
    ServiceBusUtility.prototype.getSubscriptions = function (topic, callback) {
        this.client.listSubscriptions(topic, function (error, result) {
            if (error) {
                callback(error);
            }
            var subscriptions = result.map(function (subscription) {
                return {
                    name: subscription.SubscriptionName,
                    totalMessages: subscription.MessageCount
                };
            });
            callback(null, subscriptions);
        });
    };
    ServiceBusUtility.prototype.getTopics = function (callback) {
        this.client.listTopics(function (error, result) {
            if (error) {
                callback(error);
            }
            var topics = result.map(function (topic) {
                return {
                    name: topic.TopicName,
                    totalSubscriptions: topic.SubscriptionCount,
                    totalSize: topic.SizeInBytes
                };
            });
            callback(null, topics);
        });
    };
    return ServiceBusUtility;
}());
exports.ServiceBusUtility = ServiceBusUtility;

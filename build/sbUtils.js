'use strict';
var ServiceBusUtility = (function () {
    function ServiceBusUtility(client) {
        this.client = client;
    }
    ServiceBusUtility.prototype.getSubscriptions = function (topic, callback) {
        this.client.listSubscriptions(topic, function (error, result) {
            if (error) {
                callback(error, result);
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
                callback(error, result);
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
    ServiceBusUtility.prototype.sendTopicMessage = function (topic, message, callback) {
        this.client.sendTopicMessage(topic, message, callback);
    };
    ServiceBusUtility.prototype.sendQueueMessage = function (queue, message, callback) {
        this.client.sendQueueMessage(queue, message, callback);
    };
    ServiceBusUtility.prototype.receiveQueueMessage = function (queue, callback) {
        var _this = this;
        this.client.receiveQueueMessage(queue, { isPeekLock: true }, function (error, message) {
            callback(error, message);
            setImmediate(function () {
                _this.receiveQueueMessage(queue, callback);
            });
        });
    };
    ServiceBusUtility.prototype.subscribe = function (topic, callback) {
        var _this = this;
        this.client.receiveSubscriptionMessage(topic, "PatientPortalDev", function (error, message) {
            callback(error, message);
            setImmediate(function () {
                _this.subscribe(topic, callback);
            });
        });
    };
    return ServiceBusUtility;
}());
exports.ServiceBusUtility = ServiceBusUtility;

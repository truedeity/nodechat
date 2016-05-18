'use strict'

/// <reference path="../declarations/azure.d.ts" />
import azure  = require("azure");


export class ServiceBusUtility {
    
    constructor(public client:azure.ServiceBusService) {
        
    }
    
    
    getSubscriptions(topic:string, callback:Azure.ServiceBus.Callback) {
        this.client.listSubscriptions(topic, (error, result) => {
            if(error) {
                callback(error, result);
            }
            var subscriptions = result.map((subscription) => {
                return {
                    name: subscription.SubscriptionName, 
                    totalMessages: subscription.MessageCount
                }
            });
            
            callback(null, subscriptions);
        })
    }
    
    
    getTopics(callback:Azure.ServiceBus.Callback) {
        this.client.listTopics( (error, result) => {
            
            if(error) {
                callback(error, result);
            }
            
            var topics  = result.map((topic) => {
                return {
                    name: topic.TopicName,
                    totalSubscriptions: topic.SubscriptionCount,
                    totalSize: topic.SizeInBytes
                }
            });
             
            callback(null, topics);
            
        })

    }
    
    
    sendTopicMessage(topic:string, message:string, callback:Azure.ServiceBus.Callback) {
        this.client.sendTopicMessage(topic, message, callback);
    }
    
    sendQueueMessage(queue:string, message:any, callback:Azure.ServiceBus.Callback) {
        this.client.sendQueueMessage(queue, message, callback);
    }
    
    receiveQueueMessage(queue:string, callback:Azure.ServiceBus.Callback) {
        this.client.receiveQueueMessage(queue, { isPeekLock: true }, (error, message) => {
            callback(error,message);
            setImmediate(() => {
                this.receiveQueueMessage(queue, callback);
            })
        });
    }
    
    
    subscribe(topic:string, callback:Azure.ServiceBus.Callback) {
        this.client.receiveSubscriptionMessage(topic, "PatientPortalDev", (error, message) => {
            callback(error, message);
            setImmediate(() => {
                this.subscribe(topic, callback);
            });
        });
       
         
    }    
    
    
  
    
}
    


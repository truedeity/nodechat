
export class ServiceBusUtility {
    
    constructor(public client:any) {
        
    }
    
    
    getSubscriptions(topic:string, callback:Function) {
        this.client.listSubscriptions(topic, (error, result) => {
            if(error) {
                callback(error);
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
    
    
    getTopics(callback:Function){
        this.client.listTopics( (error, result) => {
            
            if(error) {
                callback(error);
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
    
    
}
    


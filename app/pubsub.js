const redis = require("redis");

const CHANNELS = {
    TEST: "TEST",
    BLOCKCHAIN: "BLOCKCHAIN"
}

const redisUrl = "//redis-11774.c265.us-east-1-2.ec2.cloud.redislabs.com:11774";

const redisConf = {password: "redisdb123"}

class PubSub {

    constructor({blockchain}) {

        this.blockchain = blockchain;

        this.publisher = new redis.createClient(redisUrl,redisConf);
        this.subscriber = new redis.createClient(redisUrl,redisConf);

        this.subscribeToChannels();

        this.subscriber.on("message", (channel,message)=>{
            this.handleMessage(channel, message);
        })

    }


    handleMessage(channel, message)
    {
        console.log(`Message Received. Channel. ${channel}. Message: ${message}.`);

        //Parse JSON
        const newchain = JSON.parse(message);

        if(channel === CHANNELS.BLOCKCHAIN)
        {
            this.blockchain.replaceChain(newchain);
        }

    }

    subscribeToChannels()
    {
        Object.values(CHANNELS).forEach((channel,index,array)=>{
            this.subscriber.subscribe(channel);
        })
    }

    publish({channel,message})
    {
        this.subscriber.unsubscribe(channel,()=>{

            this.publisher.publish(channel,message,()=>{

                //Resubscribe after publish is complete

                this.subscriber.subscribe(channel);

            });

        });

        
    }

    broadcastBlockchain()
    {
        this.publish({channel:CHANNELS.BLOCKCHAIN,message: JSON.stringify(this.blockchain.chain)});
    }
}

module.exports = PubSub;
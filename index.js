const express = require('express');
const Blockchain = require('./blockchain.js');
const PubSub = require('./pubsub.js');
const app = express();

const blockchain = new Blockchain();
const pubsub = new PubSub({blockchain});

setTimeout(() => {pubsub.broadcastBlockchain()},1000)



app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.get('/api/blocks',(req,res)=>{

    res.status(200).json(blockchain.chain);

});

app.post("/api/mine",(req,res)=>{

    let {data} = req.body;

    blockchain.addBlock({data});

    pubsub.broadcastBlockchain();

    res.redirect(303,"/api/blocks");

})

// app.post('/api/',(req,res)=>{})

const DEFAULT_PORT = 3000;

let PEER_PORT;

if(process.env.GENERATE_PEER_PORT === "true") 
{
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random()*1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;

app.listen(PORT,()=>{

    console.log(`Server started on ${PORT}`);

});
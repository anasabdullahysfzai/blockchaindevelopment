const express = require('express');
const app = express();
const Blockchain = require('./blockchain');
const PubSub = require('./app/pubsub.js');
const axios = require("axios").default;


const blockchain = new Blockchain();
const pubsub = new PubSub({ blockchain });


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/blocks', (req, res) => {

    res.status(200).json(blockchain.chain);

});

app.post("/api/mine", (req, res) => {

    let { data } = req.body;

    blockchain.addBlock({ data });

    pubsub.broadcastBlockchain();

    res.redirect(303, "/api/blocks");

})

// app.post('/api/',(req,res)=>{})

const DEFAULT_PORT = 3000;

let PEER_PORT;

if (process.env.GENERATE_PEER_PORT === "true") {
    PEER_PORT = DEFAULT_PORT + Math.ceil(Math.random() * 1000);
}

const PORT = PEER_PORT || DEFAULT_PORT;

app.listen(PORT, () => {

    console.log(`Server started on ${PORT}`);

    //sync the chain with root node of network

    const ROOT_NODE_URL = `http://localhost:${DEFAULT_PORT}`;


    let isRootNode = PORT === DEFAULT_PORT;

    //If the recently created blockchain network node is not root node then update it with latest chain data
    if (!isRootNode) {
        
        ( function syncChain(){
            axios.get(ROOT_NODE_URL + "/api/blocks")
            .then((response) => {

                const latestChain = response.data;
                console.log(`latestChain: ${JSON.stringify(latestChain)}`);

                blockchain.replaceChain(latestChain);

                console.log("Blockchain updated with latest chain from root node \n "+ JSON.stringify(blockchain.chain));

            }).catch((error) => {
                console.log(error);
            });
        })();

    }
});
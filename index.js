const express = require('express');
const Blockchain = require('./blockchain.js');
const app = express();

const blockchain = new Blockchain();

const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended:true}));

app.get('/api/blocks',(req,res)=>{

    res.status(200).json(blockchain.chain);

});

app.post("/api/mine",(req,res)=>{

    let {data} = req.body;

    blockchain.addBlock({data});

    res.redirect(303,"/api/blocks");

})

// app.post('/api/',(req,res)=>{})


app.listen(PORT,()=>{

    console.log(`Server started on ${PORT}`);

});
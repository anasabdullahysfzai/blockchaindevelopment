let Blockchain = require('..//blockchain');

let blockchain = new Blockchain();

let prevTime , newTime , nextBlock , averageTime;

let timeTaken = [];

blockchain.addBlock({data: "Test"});

console.log(`First Block: `+ JSON.stringify(blockchain.chain[blockchain.chain.length-1]));

for (let i = 0;i<10000;i++)
{

    prevTime = blockchain.chain[blockchain.chain.length-1].timestamp;

    blockchain.addBlock({data:`New Block : ${i+1}`});
    
    nextBlock = blockchain.chain[blockchain.chain.length-1];

    newTime = nextBlock.timestamp;

    let timeTakenToMine = newTime - prevTime;

    timeTaken.push(timeTakenToMine);

    averageTime = (timeTaken.reduce((total,item)=> total + item))/timeTaken.length;

    console.log(`Time to mine new block: ${timeTakenToMine}ms. Difficulty: ${nextBlock.difficulty}. Average Time: ${averageTime}ms.`);

}
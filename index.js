let hash = require("bcrypt").hashSync;

let generateHash = (data)=>
  {
    return hash(data,1);
  }

class Block {

  constructor(index,createdAt,data,hash,lastHash)
  {
    this.index = index;
    this.data = data;
    this.hash = hash;
    this.lastHash = lastHash;
  }

}


class Blockchain {

  constructor() {
    
    const genesisBlock = new Block(0,Date.now(),'gen-data',generateHash('gen-data'),null);

    this.chain = [genesisBlock];

  }



  addBlock(data) {

    let lastHash = this.chain[this.chain.length-1].hash;

    let hash = generateHash(data);

    const block = new Block(this.chain.length,Date.now(),data,hash,lastHash);

    this.chain.push(block);

  }

}

let blockchain = new Blockchain();

blockchain.addBlock("one");
blockchain.addBlock("two");
blockchain.addBlock("three");

console.log(blockchain);
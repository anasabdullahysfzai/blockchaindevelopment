const Block = require("./block");
const cryptoHash = require("./crypto-hash");

class Blockchain {

    constructor()
    {
        this.chain = [Block.genesis()];
    }


    addBlock({data})
    {
        let newBlock = Block.mineBlock({lastBlock:this.chain[this.chain.length-1],data});
        this.chain.push(newBlock);
    }

    replaceChain(chain)
    {
        //If the chain length is same
        if(chain.length <= this.chain.length)
        {
            console.error("The incoming chain must be longer")
            return;
        }

        if(!Blockchain.isValidChain(chain))
        {
            console.error("The incoming chain must be valid")
            return;
        }

        this.chain = chain;
    }

    static isValidChain(chain)
    {
        //When chain doesnt start with genesis block
        if(JSON.stringify(Block.genesis()) != JSON.stringify(chain[0]))
        {
            console.log(`Chain doesnt start with genesis block`)
            return false;
        }

        //When last hash reference has changed
        for(let i = 1 ; i<chain.length;i++)
        {
            if( chain[i].lastHash !== chain[i-1].hash)
            {
                console.log("lastHash reference changed")
                return false;
            }
        }

        //When block has invalid field
        for(let i = 1; i<chain.length ; i++)
        {
            let {timestamp,data,lastHash,hash,nonce,difficulty} = chain[i];

            console.log(`This block = \n data:${data} \n lastHash: ${lastHash} \n timestamp: ${timestamp}`);
            
            let newHash = cryptoHash(timestamp,lastHash,data,nonce,difficulty);

            //If the new calculated hash doesnt match the actual hash then it means that some data has been changed ,
            //so return false
            if(newHash !== hash)
            {
                console.log("Invalid Hash");

                return false;
            }
        }

        return true;
    }
}

module.exports = Blockchain;
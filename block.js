const { GENESIS_DATA , MINE_RATE} = require("./config");
const cryptoHash = require("./crypto-hash");

class Block {

    constructor({timestamp,lastHash,hash,data,nonce,difficulty})
    {
        this.timestamp = timestamp;
        this.lastHash = lastHash;
        this.hash = hash;
        this.data = data;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static genesis()
    {
        return new this(GENESIS_DATA);
    }

    static adjustDifficulty({originalBlock,newBlockTimeStamp})
    {
        const {difficulty} = originalBlock;

        let difference = newBlockTimeStamp - originalBlock.timestamp;

        if(difference > MINE_RATE)
        {
            return difficulty-1;
        }

        return difficulty + 1;
    }

    static mineBlock({lastBlock,data})
    {
        let hash,timestamp;

        //let timestamp = Date.now();
        let lastHash = lastBlock.hash;

        let difficulty = lastBlock.difficulty;
        let nonce = 0;

        do {
            nonce++;
            timestamp = Date.now();
            hash = cryptoHash(timestamp,lastHash,data,nonce,difficulty);
        }
        while(hash.substring(0,difficulty) !== "0".repeat(difficulty));


        return new this({
            timestamp,
            lastHash,
            data:data,
            difficulty,
            nonce,
            hash
            //hash: cryptoHash(timestamp,lastHash,data,nonce,difficulty)
        });
    }

}

module.exports = Block;
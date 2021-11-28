const Block = require("./block");
const { GENESIS_DATA , MINE_RATE } = require("./config");
const cryptoHash = require("./crypto-hash");

describe("Block",()=>{
    const timestamp = 2000;
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = ['blockchain','data'];
    const nonce = 1;
    const difficulty = 1;
    const block = new Block({timestamp,lastHash,hash,data,nonce,difficulty});
    
    it("has timestamp , lastHash , hash , data properties , nonce and difficulty",()=>{
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
        expect(block.nonce).toEqual(nonce);
        expect(block.difficulty).toEqual(difficulty);
    })

    describe("Genesis", ()=>{

        const genesisBlock = Block.genesis();
    
        console.log(`genesisBlock : ${genesisBlock}`);
    
        it("returns a block instance",()=>{
    
            expect(genesisBlock instanceof Block).toBe(true);
    
        })
    
        it("returns the genesis data",()=>{
    
            expect(genesisBlock).toEqual(GENESIS_DATA);
    
        })
    
    });
    
    describe("mineBlock()",()=>{
    
        const lastBlock = Block.genesis();
        const data = "mined data"
        const minedBlock = Block.mineBlock({lastBlock,data});
    
        it("returns a Block Instance",()=>{
    
            expect(minedBlock instanceof Block).toBe(true);
    
        });
    
        it("sets the `lastHash` to be the `hash` of `lastBlock`",()=>{
    
            expect(minedBlock.lastHash).toEqual(lastBlock.hash);
    
        });
    
        it("sets the `data`",()=>{
    
            expect(minedBlock.data).toEqual(data);
    
        })
    
        it("sets the `timestamp`",()=>{
    
            expect(minedBlock.timestamp).not.toEqual(undefined);
    
        })
    
        it("creates a SHA-256 `hash` based on proper inputs",()=>{
    
            expect(minedBlock.hash).toEqual(cryptoHash(minedBlock.timestamp,lastBlock.hash,data,minedBlock.nonce,minedBlock.difficulty));
    
        })
    
        it("sets a hash which meets a difficulty criteria",()=>{
    
            expect(minedBlock.hash.substring(0,minedBlock.difficulty)).toEqual("0".repeat(minedBlock.difficulty));
    
        })

        it("adjusts the difficulty",()=>{

            const possibleResults = [lastBlock.difficulty+1,lastBlock.difficulty-1];

            expect(possibleResults.includes(minedBlock.difficulty)).toBe(true);

        })
    
    })
    
    describe("adjustDifficulty()",()=>{
    
        it("Increases the difficulty for new block to be mined",()=>{
    
            expect(Block.adjustDifficulty({originalBlock: block,newBlockTimeStamp: block.timestamp + MINE_RATE - 100}))
            .toEqual(block.difficulty+1);
    
        });
    
    
        it("Lowers the difficulty for new block to be mined",()=>{
    
            expect(Block.adjustDifficulty({originalBlock: block,newBlockTimeStamp: block.timestamp + MINE_RATE + 100}))
            .toEqual(block.difficulty-1);

        });

        it("has a lower limit of 1",()=>{

            block.difficulty = 0;

            expect(Block.adjustDifficulty({originalBlock: block})).toBe(1)

            block.difficulty = -1;

            expect(Block.adjustDifficulty({originalBlock: block})).toBe(1);

        })
    })
})


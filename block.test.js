const Block = require("./block");
const { GENESIS_DATA } = require("./config");

describe("Block",()=>{
    const timestamp = 'a-data';
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = ['blockchain','data'];
    const block = new Block({timestamp,lastHash,hash,data});
    
    it("has timestamp , lastHash , hash , data properties",()=>{
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
    })
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

})
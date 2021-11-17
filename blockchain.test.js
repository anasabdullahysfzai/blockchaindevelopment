const Blockchain = require("./blockchain");
const Block = require("./block");

describe("Blockchain",()=>{

    const blockchain = new Blockchain();

    it("contins a `chain` array instance",()=>{

        expect(blockchain.chain instanceof Array).toBe(true);

    })

    it("starts with a genesis block",()=>{

        expect(blockchain.chain[0]).toEqual(Block.genesis());

    })

    it("add a new block to the chain",()=>{

        let newData = "foo bar";
        blockchain.addBlock({data:newData});

        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);

    })

})
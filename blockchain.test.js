const Blockchain = require("./blockchain");
const Block = require("./block");

let blockchain;

describe("Blockchain",()=>{

    

    beforeEach(()=>{
       
        //Initiate Blockchain before running each test

        blockchain = new Blockchain();

        console.log("Initiated new Blockchain Instance");

    })

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

    describe("isValidChain()",()=>{

        describe("when the chain doesnt start with genesis block",() => {

            

            it("returns false",()=>{

                blockchain.chain[0] = { data: 'fake-genesis' }

                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);

            });

        });

        describe("when the chain start with genesis block and has multiple blocks",() => {

            describe("and the `lastHash` reference has changed",()=>{

                it("returns false",()=>{

                    blockchain.addBlock({data: "Bears"});
                    blockchain.addBlock({data: "Beets"});
                    blockchain.addBlock({data: "Battlestar Galactica"});

                    //Tamper the chain
                    blockchain.chain[2].lastHash = "broken-lastHash";

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);

                });
            
            });

            describe("and the chain contains a block with invalid field",()=>{

                it("returns false",()=>{

                    blockchain.addBlock({data: "Bears"});
                    blockchain.addBlock({data: "Beets"});
                    blockchain.addBlock({data: "Battlestar Galactica"});

                    //Change a field

                    blockchain.chain[2].data = 'some-bad-and-evil-data';

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);

                })

            })

            describe("and the `chain` doesnt contain any invalid block",()=>{

                it("returns true ",()=>{

                    blockchain.addBlock({data: "Bears"});
                    blockchain.addBlock({data: "Beets"});
                    blockchain.addBlock({data: "Battlestar Galactica"});

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);

                });
            
            });

        });

    })   

})
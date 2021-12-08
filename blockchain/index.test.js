const Blockchain = require("./index.js");
const Block = require("./block.js");
const cryptoHash = require("../util/crypto-hash.js");

let blockchain;
let newChain;
let originalChain;

describe("Blockchain",()=>{

    

    beforeEach(()=>{
       
        //Initiate Blockchain before running each test

        blockchain = new Blockchain();
        newChain = new Blockchain();

        //Set Original Chain to blockchain
        originalChain = blockchain;

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

            describe("and the `chain` has a negative jumped difficulty", ()=>{

                it("returns false",()=>{

                    let lastBlock = blockchain.chain[blockchain.chain.length-1];
                    let lastHash = lastBlock.hash;

                    let timestamp = Date.now();
                    let data = [];
                    let nonce = 0;
                    let difficulty = lastBlock.difficulty-3;

                    let hash = cryptoHash(timestamp,lastHash,data,nonce,difficulty);

                    let badBlock = new Block({timestamp,lastHash,hash,data,nonce,difficulty});

                    blockchain.chain.push(badBlock);

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);

                })

            })

            describe("and the `chain` has a positive jumped difficulty", ()=>{

                it("returns false",()=>{

                    let lastBlock = blockchain.chain[blockchain.chain.length-1];
                    let lastHash = lastBlock.hash;

                    let timestamp = Date.now();
                    let data = [];
                    let nonce = 0;
                    let difficulty = lastBlock.difficulty+3;

                    let hash = cryptoHash(timestamp,lastHash,data,nonce,difficulty);

                    let badBlock = new Block({timestamp,lastHash,hash,data,nonce,difficulty});

                    blockchain.chain.push(badBlock);

                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);

                })

            })

        });

    })   

    describe("replaceChain()",()=>{

        describe("The new chain is of same length and not longer",()=>{

            it("does not change the chain",()=>{

                newChain.chain[0].data = {new:"data"};

                blockchain.replaceChain(newChain.chain);

                expect(blockchain.chain).toEqual(originalChain.chain);

            });

        })

        describe("The new chain is longer",()=>{

            beforeEach(()=>{

                newChain.addBlock({data: "Bears"});
                newChain.addBlock({data: "Beets"});
                newChain.addBlock({data: "Battlestar Galactica"});

            });
            
            describe("but the chain is invalid",()=>{

                it("does not change the chain",()=>{
                    
                    newChain.chain[1].data = "fake-block-data"

                    blockchain.replaceChain(newChain.chain);

                    expect(blockchain.chain).toEqual(originalChain.chain);

                });

            })

            describe("and the chain is valid",()=>{

                it("replaces the chain",()=>{

                    blockchain.replaceChain(newChain.chain);

                    expect(blockchain.chain).toEqual(newChain.chain);


                });

            })

        })

    })

})
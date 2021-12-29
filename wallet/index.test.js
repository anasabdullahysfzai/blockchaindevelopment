const Wallet = require("./index.js");
const {Transaction} = require("./transaction.js");
const {verifySignature} = require("../util")

describe("Wallet", ()=>{
    let wallet;

    beforeEach(()=>{
        wallet = new Wallet();
    })

    it("has balances", ()=>{

        expect(wallet).toHaveProperty("balance");

    })

    it("has public key", ()=>{

        expect(wallet).toHaveProperty("publicKey")

    })

    describe("signing data", ()=>{

        let data = "test data"

        it("should verify the signature", ()=>{

            expect(verifySignature({publicKey: wallet.publicKey,data,signature: wallet.sign(data)})).toBe(true);

        })

        it("should not verify the signature", ()=>{

            expect(verifySignature({publicKey: wallet.publicKey,data,signature:new Wallet().sign(data)})).toBe(false);

        })

    })

    describe("createTransaction()",()=>{

        let transaction,amount,recepient;

        describe("is invalid transaction",()=>{

            it("show throw error",()=>{

                expect(()=>{wallet.createTransaction({amount:999999,recepient:'foo-recepient'})}).toThrow("Amount exceeds balance");

            })

        })

        describe("is valid transaction",()=>{

            beforeEach(()=>{
                amount = 50;
                recepient = 'foo-recepient';
    
                transaction = wallet.createTransaction({amount,recepient});
            })

            it("creates the instance of transaction", ()=>{

                expect(transaction instanceof Transaction).toBe(true);

            })

            it("transaction input address matches the wallet public key", ()=>{

                expect(transaction.input.address).toEqual(wallet.publicKey);

            })


            it("expects the recepient amount in outputMap to match amount", ()=>{

                expect(transaction.outputMap[recepient]).toEqual(amount);

            })
        })

    })

})
const Wallet = require("./index.js");
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

})
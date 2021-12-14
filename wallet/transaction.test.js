const Wallet = require("./index.js");
const {Transaction} = require("./transaction.js");


describe("Transaction",() => {

    let senderWallet,recepient,amount,transaction;

    beforeEach(() => {

        senderWallet = new Wallet();
        recepient = "my-recepient";
        amount = 50;
        transaction = new Transaction({senderWallet,recepient,amount});
    })

    it("should have an `id`",() => {

        expect(transaction).toHaveProperty("id");

    })


    describe("outputMap",() => {

        it("has property `outputMap`",() => {
            expect(transaction).toHaveProperty("outputMap");
        })

        it("outputs the amount to send to recepient",() => {
            expect(transaction.outputMap[recepient]).toEqual(amount);
        })

        it("outputs the amount remaining in `senderWallet`",() => {
            expect(transaction.outputMap[senderWallet.publicKey]).toEqual(senderWallet.balance - amount);
        })

    })

})
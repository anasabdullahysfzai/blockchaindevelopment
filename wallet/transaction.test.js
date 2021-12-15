const { verifySignature } = require("../util/index.js");
const Wallet = require("./index.js");
const { Transaction } = require("./transaction.js");


describe("Transaction", () => {

    let senderWallet, recepient, amount, transaction;

    beforeEach(() => {

        senderWallet = new Wallet();
        recepient = "my-recepient";
        amount = 50;
        transaction = new Transaction({ senderWallet, recepient, amount });
    })

    it("should have an `id`", () => {

        expect(transaction).toHaveProperty("id");

    })


    describe("outputMap", () => {

        it("has property `outputMap`", () => {
            expect(transaction).toHaveProperty("outputMap");
        })

        it("outputs the amount to send to recepient", () => {
            expect(transaction.outputMap[recepient]).toEqual(amount);
        })

        it("outputs the amount remaining in `senderWallet`", () => {
            expect(transaction.outputMap[senderWallet.publicKey]).toEqual(senderWallet.balance - amount);
        })

    })

    describe("input", () => {

        it("has the `input`", () => {

            expect(transaction).toHaveProperty('input');

        })

        it("has the `timestamp` in input", () => {

            expect(transaction.input).toHaveProperty('timestamp');

        })

        it("sets the `amount` to equal `senderWallet.balance`", () => {

            expect(transaction.input.amount).toEqual(senderWallet.balance);

        })

        it("sets the `address` to equal `senderWallet.publicKey`", () => {

            expect(transaction.input.address).toEqual(senderWallet.publicKey);

        })

        it("has the `signature` in `input`", () => {

            expect(transaction.input).toHaveProperty('signature');

        })

        it("sign an input", () => {

            expect(
                verifySignature({ publicKey: senderWallet.publicKey, data: transaction.outputMap, signature: transaction.input.signature })
            ).toBe(true);

        })

    })

})
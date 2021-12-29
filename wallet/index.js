const {STARTING_BALANCE} = require("../config.js");
const {ec,cryptoHash} = require("../util/index.js");
const {Transaction} = require("./transaction.js");

class Wallet {

    constructor()
    {
        this.balance = STARTING_BALANCE;

        this.keyPair = ec.genKeyPair();

        this.publicKey = this.keyPair.getPublic().encode("hex");

    }

    sign(data)
    {
        return this.keyPair.sign(cryptoHash(data));
    }

    createTransaction({amount,recepient})
    {
        if(amount > this.balance)
        {
            throw("Amount exceeds balance");
        }

        let transaction = new Transaction({senderWallet:this,recepient,amount});

        return transaction;
    }
}

module.exports = Wallet;
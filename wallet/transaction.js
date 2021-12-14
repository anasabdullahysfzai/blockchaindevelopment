const {v4:uuidv4} = require("uuid");

class Transaction
{
    constructor({senderWallet,recepient,amount})
    {
       this.id = uuidv4();
       this.outputMap = this.createOutputMap({senderWallet,recepient,amount});
    }

    createOutputMap({senderWallet,recepient,amount})
    {
        let outputMap = {};

        outputMap[recepient] = amount;
        outputMap[senderWallet.publicKey] = senderWallet.balance - amount; 

        return outputMap;
    }
}

module.exports = {Transaction}
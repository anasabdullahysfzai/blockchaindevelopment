const {v4:uuidv4} = require("uuid");

class Transaction
{
    constructor({senderWallet,recepient,amount})
    {
       this.id = uuidv4();
       this.outputMap = this.createOutputMap({senderWallet,recepient,amount});
       this.input = this.createInput(senderWallet,this.outputMap);
    }

    createOutputMap({senderWallet,recepient,amount})
    {
        let outputMap = {};

        outputMap[recepient] = amount;
        outputMap[senderWallet.publicKey] = senderWallet.balance - amount; 

        return outputMap;
    }

    createInput(senderWallet,outputMap)
    {
        return {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(this.outputMap)
        }
    }
}

module.exports = {Transaction}
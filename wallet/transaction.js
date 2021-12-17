const {v4:uuidv4} = require("uuid");
const {verifySignature} = require("../util");

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

    static validTransaction(transaction)
    {
        let outputMapTotalAmount = Object.values(transaction.outputMap).reduce((total,currentValue)=>{

            return total+currentValue;

        });

        //OutputMapTotalAmount should be equal to the input amount(senderWallet balance)


        let isOutputMapTampered = outputMapTotalAmount != transaction.input.amount;

        if(isOutputMapTampered)
        {
            console.error("outputMap is invalid");
            return false;
        }

        if(!verifySignature({publicKey:transaction.input.address,data:transaction.outputMap,signature:transaction.input.signature}))
        {
            console.error("input signature is invalid");
            return false;
        }

        return true;
    }
}

module.exports = {Transaction}
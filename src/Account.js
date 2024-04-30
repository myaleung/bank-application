import dateReformatter from "./helpers/dateReformatter.js";
export default class Account { 
    #accountId;
    #balance;
    #statement;
    #overdraft;
    #overdraftLimit;

    constructor(accountId) { 
        this.#accountId = accountId;
        this.#balance = 0;
        this.#statement = [];
        this.#overdraft = false;
    }

    getAccountId = () => this.#accountId;
    getBalance = () => this.#balance;
    getStatement = () => this.#statement;
    hasOverdraft = () => this.#overdraft;
    getOverdraftLimit = () => this.#overdraftLimit;

    deposit = (amount, date) => {
        const tDate = dateReformatter(date);
        const transaction = {
            "date": tDate,
            "type": "credit",
            "amount": amount,
            "balance": this.#balance += amount,
        };
        this.#statement.unshift(transaction);
        return true;
    };

    withdraw = (amount, date) => { 
        const tDate = dateReformatter(date);
        const transaction = {
            "type": "debit",
            "amount": amount,
            "date": tDate,
            "balance": this.#balance,
        };
        //? If value is less than or equal to current account balance, deduct value
        if (amount <= this.#balance) {
            this.#balance -= amount;
            this.#statement.unshift(transaction);
            return true;
        } else {
            //? Check if balance goes into negative
            const bal = this.#balance -= amount;            
            //? See if the account has an overdraft to deduct from
            if (bal < 0 && this.#overdraft) { 
                if (bal <= -this.#overdraftLimit) { 
                    const difference = bal + this.#overdraftLimit;
                    this.#balance = this.#balance + Math.abs(difference);
                    transaction["amount"] = amount - Math.abs(difference);
                } else {
                    this.#balance = bal;
                }
            }
            //? Else only withdraw up till balance reaches 0
            if (bal < 0 && !this.#overdraft) { 
                const remainder = this.#balance %= amount;
                this.#balance = bal + Math.abs(remainder);
                transaction["amount"] = amount - Math.abs(remainder);
            }
            this.#statement.unshift(transaction);
            return false;   
        }
    }

    addOverdraft = (limit) => { 
        this.#overdraft = true;
        if ((limit === undefined) || (limit === null)) {
            this.#overdraftLimit = 0;
        } else { 
            this.#overdraftLimit = limit;
        }
        return this.#overdraft;
    }
}
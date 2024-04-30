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

    deposit = (value, date) => {
        const tDate = dateReformatter(date);
        const transaction = {
            "date": tDate,
            "type": "credit",
            "value": value,
            "balance": this.#balance += value,
        };
        this.#statement.unshift(transaction);
        return true;
    };

    withdraw = (value, date) => { 
        const tDate = dateReformatter(date);
        const transaction = {
            "type": "debit",
            "value": value,
            "date": tDate,
            "balance": this.#balance,
        };
        //? If value is less than or equal to current account balance, deduct value
        if (value <= this.#balance) {
            this.#balance -= value;
            this.#statement.unshift(transaction);
            return true;
        } else {
            //? Check if balance goes into negative
            const bal = this.#balance -= value;
            
            //? See if the account has an overdraft to deduct from
            if (bal < 0 && this.#overdraft) { 
                if (bal <= this.#overdraftLimit) { 
                    const remainder = this.#balance %= this.#overdraftLimit;
                    this.#balance = bal + Math.abs(remainder);
                    transaction["value"] = value - Math.abs(remainder);
                } else {
                    this.#balance = bal;
                }
                // transaction["value"] = value;
            }
            //? Else only withdraw up till balance reaches 0
            if (bal < 0 && !this.#overdraft) { 
                const remainder = this.#balance %= value;
                this.#balance = bal + Math.abs(remainder);
                transaction["value"] = value - Math.abs(remainder);
            }
            this.#statement.unshift(transaction);
            return false;   
        }
    }

    addOverdraft = (limit) => { 
        this.#overdraft = true;
        this.#overdraftLimit = limit;
        return this.#overdraft;
    }
}
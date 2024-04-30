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
        //? If value is less than or equal to current account balance
        if (value <= this.#balance) {
            this.#balance -= value;
            this.#statement.unshift(transaction);
            return true;
        } else {
            //? Check if balance goes into negative
            const bal = this.#balance -= value;
            const remainder = this.#balance %= value;
            const withdrawal = value - Math.abs(remainder);

            if (bal < 0 && this.#overdraft ) { 
                this.#balance = bal;
                // transaction["value"] = value;
            }

            if (bal < 0 && !this.#overdraft) { 
                this.#balance = 0;
                transaction["value"] = withdrawal;
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
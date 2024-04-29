import dateReformatter from "./helpers/dateReformatter.js";
export default class Account { 
    #accountId;
    #balance;
    #statement;

    constructor(accountId) { 
        this.#accountId = accountId;
        this.#balance = 0;
        this.#statement = [];
    }

    getAccountId = () => this.#accountId;
    getBalance = () => this.#balance;
    getStatement = () => this.#statement;

    deposit = (value, date) => {
        const tDate = dateReformatter(date);
        const transaction = {
            "type": "credit",
            "value": value,
            "date": tDate,
        };

        this.#balance += value;
        this.#statement.unshift(transaction);
        return true;
    };

    withdraw = (value, date) => { 
        const tDate = dateReformatter(date);
        const transaction = {
            "type": "debit",
            "value": value,
            "date": tDate,
        };

        if (value <= this.#balance) {
            this.#balance -= value;
            this.#statement.unshift(transaction);
            return true;
        }
        return false;
    }
}
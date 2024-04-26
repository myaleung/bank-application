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
        const newDate = date !== undefined ? new Date(date) : new Date();
        const tMonth = String(newDate.getMonth() + 1).padStart(2, '0');
        const tDate = newDate.getDate() + "/" + tMonth + "/" + newDate.getFullYear();
        const transaction = {
            "type": "credit",
            "value": value,
            "date": tDate,
        };

        this.#balance += value;
        this.#statement.push(transaction);
        return true;
    };

    withdraw = (value, date) => { 
        const newDate = date !== undefined ? new Date(date) : new Date();
        const tMonth = String(newDate.getMonth() + 1).padStart(2, '0');
        const tDate = newDate.getDate() + "/" + tMonth + "/" + newDate.getFullYear();
        const transaction = {
            "type": "debit",
            "value": value,
            "date": tDate,
        };

        this.#balance -= value;
        this.#statement.push(transaction);
        return true
    }
}
export default class Account { 
    #accountId;
    #balance;

    constructor(accountId) { 
        this.#accountId = accountId;
        this.#balance = 0;
    }

    getAccountId = () => this.#accountId;
    getBalance = () => this.#balance;

    deposit = (value) => {
        this.#balance += value;
        return true;
    };
}
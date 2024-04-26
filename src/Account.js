export default class Account { 
    #accountId;
    #balance;

    constructor(accountId) { 
        this.#accountId = accountId;
    }

    getAccountId = () => this.#accountId;

    deposit = (value) => {
        this.#balance += value
        return true;
    };
}
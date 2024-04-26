export default class Account { 
    #accountId;

    constructor(accountId) { 
        this.#accountId = accountId;
    }

    getAccountId = () => this.#accountId;

}
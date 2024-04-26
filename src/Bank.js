import Account from "./Account.js";
export default class Bank { 
    #name = "";
    #accounts = [];
    constructor(name) {
        this.#name = name;
    }

    getAccounts = () => this.#accounts;

    createAccount = () => {
        const accountsLength = this.#accounts.length + 1;
        const accountId = 1000 + accountsLength;
        this.#accounts.push(new Account(accountId))
        if (this.getAccounts().length === accountsLength) return true;
    }
}
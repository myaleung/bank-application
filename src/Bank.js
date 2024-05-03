import Account from "./Account.js";
export default class Bank { 
    #name = "";
    #accounts = [];

    constructor(name) {
        this.#name = name;
    }

    getName = () => this.#name;
    getAccounts = () => this.#accounts;

    createAccount = () => {
        const accountsLength = this.#accounts.length < 1 ? 1 : this.#accounts.length + 1 ;
        this.#accounts.push(new Account(accountsLength));
        return new Account(accountsLength);
    }
}
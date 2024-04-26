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
        const newDate = new Date(date);
        const tMonth = String(newDate.getMonth() + 1);
        const tDate = newDate.getDate() + "/" + (tMonth.padStart(2, '0')) + "/" + newDate.getFullYear();
        const transaction = {
            "type": "deposit",
            "value": value,
            "date": tDate,
        };
        this.#balance += value;
        this.#statement.push(transaction);
        return true;
    };
}
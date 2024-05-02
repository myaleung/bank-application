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

    deposit = (amount, date) => {
        const tDate = dateReformatter(date);
        this.handleStatement(tDate, "credit", amount, (this.#balance += amount));
        return true;
    };

    withdraw = (amount, date) => { 
        const tDate = dateReformatter(date);

        if (this.#overdraft) {
            this.handleOverdraft(amount, tDate);
            return;
        }

        if (amount <= this.#balance) {
            //? If value is less than or equal to current account balance, deduct value
            this.#balance -= amount;
            this.handleStatement(tDate, "debit", amount);
            return true;
        } else { 
            //? Insufficient funds, only withdraw up until balance reaches 0
            const bal = this.#balance - amount;
            const withdrawn = amount - Math.abs(bal);
            this.#balance -= withdrawn;
            this.handleStatement(tDate, "debit", withdrawn);
            return false; 
        }
    }

    addOverdraft = (limit) => { 
        this.#overdraft = true;
        if ((limit === undefined) || (limit === null)) {
            this.#overdraftLimit = 0;
        } else { 
            this.#overdraftLimit = limit;
        }
        return this.#overdraft;
    }

    setOverdraft = (newLimit) => { 
        if (this.hasOverdraft() && -newLimit <= this.#balance) {
            this.#overdraftLimit = newLimit;
            return true;
        }
        return false;
    }

    handleOverdraft = (amount, date) => { 
        const availableBalance = this.#balance + this.#overdraftLimit;
        
        if (amount <= availableBalance) {
            //? Withdraw money
            this.#balance -= amount;
            this.handleStatement(date, "debit", amount);
            return true;
        } else { 
            //? Insufficient funds, withdraw up till overdraft limit
            const withdrawn = this.#balance + this.#overdraftLimit;

            this.#balance -= withdrawn;
            this.handleStatement(date, "debit", withdrawn);
            return false;
        }
    }

    handleStatement = (date, type, amount, balance) => { 
        const transaction = {
            "date": date,
            "type": type,
            "amount": amount.toFixed(2),
            "balance": balance ? balance.toFixed(2) : this.#balance,
        };
        this.#statement.unshift(transaction);
    }
}
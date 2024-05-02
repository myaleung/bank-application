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
        const transaction = {
            "date": tDate,
            "type": "credit",
            "amount": amount.toFixed(2),
            "balance": (this.#balance += amount).toFixed(2),
        };
        this.#statement.unshift(transaction);
        return true;
    };

    withdraw = (amount, date) => { 
        const tDate = dateReformatter(date);
        const transaction = {
            "type": "debit",
            "amount": amount.toFixed(2),
            "date": tDate,
            "balance": this.#balance.toFixed(2),
        };

        if (this.#overdraft) {
            this.handleOverdraft(amount, tDate);
            return;
        }

        if (amount <= this.#balance) {
            //? If value is less than or equal to current account balance, deduct value
            this.#balance -= amount;
            this.#statement.unshift(transaction);
            return true;
        } else { 
            //? Insufficient funds, only withdraw up until balance reaches 0
            const bal = this.#balance - amount;
            const withdrawn = amount - Math.abs(bal);
            this.#balance -= withdrawn;
            transaction["amount"] = withdrawn;
            this.#statement.unshift(transaction);
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
        const transaction = {
            "type": "debit",
            "amount": amount.toFixed(2),
            "date": date,
            "balance": this.#balance.toFixed(2),
        };
        const availableBalance = this.#balance + this.#overdraftLimit;
        
        if (amount <= availableBalance) {
            //? Withdraw money
            this.#balance -= amount;
            this.#statement.unshift(transaction);
            return true;
        } else { 
            //? Insufficient funds, withdraw up till overdraft limit
            const withdrawn = this.#balance + this.#overdraftLimit;

            this.#balance -= withdrawn;
            transaction["amount"] = withdrawn;
            this.#statement.unshift(transaction);
            return false;
        }
    }
}
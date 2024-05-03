import chalk from "chalk";

export default class Statement {
    constructor() {
        if (new.target === Statement)
            throw new Error("Cannot create instance of abstract Statement class");
    }

    static printStatement = (account) => {
        const heading = "date".padEnd(12) + " || " + "credit".padEnd(9) + " || " + "debit".
            padEnd(10) + " || " + "balance".padEnd(10) + "\n";
        let result = ``;
        account.getStatement().forEach(transaction => {
            const date = transaction.date;
            const type = transaction.type;
            const amount = transaction.amount.toString();
            const balance = transaction.balance.toString();
            
            result += `${date.padEnd(12)} || ${type === "credit" ? chalk.green(amount.padEnd(10))+ "||".padEnd(13) : "|| ".padStart(13) + chalk.red(amount.padEnd(10))} || ${Math.sign(transaction.balance) === 1 ? chalk.green(balance.padEnd(10)) :  chalk.red(balance.padEnd(10))}\n`;
        });
        return heading.concat(result);
    }
}
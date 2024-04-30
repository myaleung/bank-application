import chalk from "chalk";

export default class Statement {
    constructor() {
        if (new.target === Statement)
            throw new Error("Cannot create instance of abstract class");
    }

    static printStatement = (account) => {
        const heading = "date".padEnd(13) + " || " + "credit".padEnd(9) + " || " + "debit".
            padEnd(10) + " || " + "balance".padEnd(10) + "\n";
        let result = ``;
        account.getStatement().forEach(transaction => {
            const date = transaction.date;
            const type = transaction.type;
            const value = transaction.value.toString();
            const balance = transaction.balance.toString();
            
            result += `${date.padEnd(12)} || ${type === "credit" ? chalk.green(value.padEnd(10))+ "||".padEnd(13) : "|| ".padStart(13) + chalk.red(value.padEnd(10))} || ${Math.sign(transaction.balance) === 1 ? chalk.green(balance.padEnd(10)) :  chalk.red(balance.padEnd(10))}\n`;
        });
        return heading.concat(result);
    }
}
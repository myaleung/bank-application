export default class Statement {
    constructor() {
        if (new.target === Statement)
            throw new Error("Cannot create instance of abstract class");
    }

    static printStatement = (account) => {
        return account.getStatement();
    }
}
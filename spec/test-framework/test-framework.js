export const assertEquals = (actual, expected) => {
    if (actual !== expected) {
        throw new Error(`Expected ${expected}, but got ${actual}`);
    }
    return true;
};

export const assertTrue = (actual) => {
    if (!actual) {
        throw new Error(`Expected true, but got ${actual}`);
    }
    return true;
};

export const it = (description, testFunc) => {
    try {
        testFunc();
        console.log(chalk.green(`${description}`));
    } catch (error) {
        console.error(chalk.red(`${description}`));
        console.error(chalk.red(`${error.message}`));
        console.log(error.stack);
    }
};

export const xit = (description) => {
    console.log(chalk.yellow(`TEST SKIPPED: ${description}`));
};
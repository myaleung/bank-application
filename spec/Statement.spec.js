import Account from "../src/Account.js";
import Statement from "../src/Statement.js";
import chalk from "chalk";

describe("Printer Class Tests:", () => { 
    describe("Printer Statement Tests:", () => { 
        let testAccount;

        beforeEach(() => {
            testAccount = new Account(1000);
            spyOn(Statement, 'printStatement').and.callThrough();
        });

        it("should print statements from the account given", () => { 
            //Arrange
            //Act
            testAccount.deposit(230);
            testAccount.withdraw(30);
            //Assert
            expect(Statement.printStatement(testAccount)).toContain("date".padEnd(12) + " || " + "credit".padEnd(9) + " || " + "debit".padEnd(10) + " || " + "balance".padEnd(10) + "\n");
        });
            
        it("should return an output of all transactions made in chronological order", () => { 
            //Arrange
            //Act
            testAccount.deposit(230);
            testAccount.withdraw(30);
            //Assert
            expect(testAccount.getStatement(testAccount)[0]).toEqual(jasmine.objectContaining({ "type": "debit", "date": new Date().toLocaleDateString() }));
        });

        it("should return the deposit details at the top of the list", () => { 
            //Arrange
            //Act
            testAccount.deposit(250);
            //Assert
            expect(testAccount.getStatement(testAccount)[0]).toEqual(jasmine.objectContaining({ "type": "credit", "date": new Date().toLocaleDateString() }));
        });
        
        it("should return the deposit details at the top of the list", () => { 
            //Arrange
            //Act
            testAccount.deposit(200);
            testAccount.withdraw(10);
            //Assert
            expect(testAccount.getStatement(testAccount)[0]).toEqual(jasmine.objectContaining({ "type": "debit", "date": new Date().toLocaleDateString() }));
        });
    });    

    describe("Printer formatting Tests:", () => { 
        let testAccount;

        beforeEach(() => {
            testAccount = new Account(1000);
            spyOn(Statement, 'printStatement').and.callThrough();
            spyOn(console, 'log');
        });
            
        it("should show credits on the statement in green text", () => { 
            //Arrange
            //Act
            testAccount.deposit(230);
            testAccount.withdraw(30);
            console.log(Statement.printStatement(testAccount));
            //Assert
            const sections = console.log.calls.mostRecent().args[0].split('||');
            sections.forEach(section => {
                if (section.includes(chalk.green('230.00'))) {
                    expect(section).toEqual(chalk.green('230.00'));
                }
            });
        });

        it("should show debits on the statement in red text", () => { 
            //Arrange
            //Act
            testAccount.deposit(230);
            testAccount.withdraw(30);
            console.log(Statement.printStatement(testAccount));
            //Assert
            const sections = console.log.calls.mostRecent().args[0].split('||');
            sections.forEach(section => {
                if (section.includes(chalk.red('30.00'))) {
                    expect(section).toEqual(chalk.red('30.00'));
                }
            });
        });
    });    
});
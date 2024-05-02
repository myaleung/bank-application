import Account from "../src/Account.js";
import Statement from "../src/Statement.js";

describe("Account Class Tests:", () => { 
    describe("Account Initialisation Tests:", () => { 
        let testAccount;

        beforeEach(() => {
            testAccount = new Account(1000);
            spyOn(testAccount, "getAccountId").and.callThrough();
        });
            
        it("should return an ID if account is available", () => { 
            //Arrange
            //Act
            //Assert
            expect(testAccount.getAccountId()).toBe(1000);
        });

        it("should have a balance property that is initialised to 0", () => { 
            //Arrange
            const expected = 0;
            //Act
            //Assert
            expect(testAccount.getBalance()).toBe(expected);
        });
    });
    
    describe("Account Balance Mutation Tests:", () => { 
        let testAccount;

        beforeEach(() => {
            testAccount = new Account(1000);
            spyOn(testAccount, "getAccountId").and.callThrough();
            jasmine.clock().install();
        });
        
        afterEach(() => {
            jasmine.clock().uninstall();
        });
            
        it("should return true if money was added to account", () => { 
            //Arrange
            const expected = true;
            //Act
            //Assert
            expect(testAccount.deposit(1000)).toBe(expected);
        });
        
        it("should reflect the increase in balance according to the value passed", () => { 
            //Arrange
            const money = 1000;
            const total = testAccount.getBalance() + money;
            //Act
            testAccount.deposit(money)
            //Assert
            expect(testAccount.getBalance()).toEqual(total);
        });
        
        it("should save the date of the deposit as passed", () => { 
            //Arrange
            const date = "2012-01-10";
            const money = 1000;
            //Act
            testAccount.deposit(money, date);
            //Assert
            expect(testAccount.getStatement()[0]).toEqual(jasmine.objectContaining({"date": new Date(date).toLocaleDateString()}));
        });
        
        it("should save the date of the deposit as today if undefined", () => { 
            //Arrange
            const money = 200;
            //Act
            testAccount.deposit(money);
            //Assert
            expect(testAccount.getStatement()[0]).toEqual(jasmine.objectContaining({ "type": "credit", "date": new Date().toLocaleDateString() }));
        });

        it("should return true if money was deducted from account", () => { 
            //Arrange
            const expected = true;
            testAccount.deposit(1000);
            //Act
            //Assert
            expect(testAccount.withdraw(100)).toBe(expected);
        });
        
        it("should reflect the decrease in balance according to the value passed", () => { 
            //Arrange
            testAccount.deposit(1000);
            const request = 100;
            const total = testAccount.getBalance() - request;
            //Act
            testAccount.withdraw(request);
            //Assert
            expect(testAccount.getBalance()).toEqual(total);
        });

        it("should save the date of the withdrawal as passed", () => { 
            //Arrange
            const date = "2012-01-13";
            const request = 200;
            testAccount.deposit(1000);
            //Act
            testAccount.withdraw(request, date);
            //Assert
            expect(testAccount.getStatement()[0]).toEqual(jasmine.objectContaining({ "type": "debit", "date": new Date(date).toLocaleDateString() }));
        });

        it("should save the date of the withdrawal as today if undefined", () => { 
            //Arrange
            const request = 200;
            testAccount.deposit(1000);
            //Act
            testAccount.withdraw(request);
            //Assert
            expect(testAccount.getStatement()[0]).toEqual(jasmine.objectContaining({ "type": "debit", "date": new Date().toLocaleDateString() }));
        });

        it("should not be able to remove cash and go into a negative balance if withdraw amount is higher than balance", () => { 
            //Arrange
            const request = 200;
            testAccount.deposit(150);
            //Act
            testAccount.withdraw(request);
            //Assert
            expect(testAccount.withdraw(request)).toBe(false);
        });
        
        it("should only withdraw amount up to the account balance", () => { 
            //Arrange
            const request = 200;
            testAccount.deposit(150);
            //Act
            testAccount.withdraw(request);
            //Assert
            expect(testAccount.getBalance()).toBe(0);
        });

        it("should tell me my bank balance with getBalance", () => { 
            //Arrange
            //Act
            //Assert
            expect(testAccount.getBalance()).toBe(0);
        });

        it("should increase my bank balance by the amount deposited", () => { 
            //Arrange
            //Act
            testAccount.deposit(150);
            //Assert
            expect(testAccount.getBalance()).toBe(150);
        });

        it("should decrease my bank balance by the amount withdrawn", () => { 
            //Arrange
            testAccount.deposit(1500);
            //Act
            testAccount.withdraw(500);
            //Assert
            expect(testAccount.getBalance()).toBe(1000);
        });
    });

    describe("Account Overdraft Tests:", () => { 
         let testAccount;

        beforeEach(() => {
            testAccount = new Account(1000);
            spyOn(testAccount, "getAccountId").and.callThrough();
        });

        it("should set overdraft to true when called", () => { 
            //Arrange
            const expected = true;
            //Act
            //Assert
            expect(testAccount.addOverdraft()).toBe(expected);
        });

        it("should set overdraft limit to value passed", () => { 
            //Arrange
            const expected = 1000;
            //Act
            testAccount.addOverdraft(expected);
            //Assert
            expect(testAccount.getOverdraftLimit()).toBe(expected);
        });
        
        it("should set overdraft limit to 0 if value passed is undefined", () => { 
            //Arrange
            const expected = 0;
            //Act
            testAccount.addOverdraft();
            //Assert
            expect(testAccount.getOverdraftLimit()).toBe(expected);
        });
        
        it("should allow withdrawals past the bank balance if overdraft is added on account", () => { 
            //Arrange
            testAccount.deposit(100);
            testAccount.addOverdraft(100);
            //Act
            testAccount.withdraw(150);
            //Assert
            expect(testAccount.getBalance()).toBe(-50);
        });
        
        it("should allow withdrawals up to the value of the overdraft limit only", () => { 
            //Arrange
            testAccount.deposit(100);
            testAccount.addOverdraft(300);
            //Act
            testAccount.withdraw(500);
            //Assert
            expect(testAccount.getBalance()).toBe(-300);
        });
        
        it("should allow the overdraft limit to change", () => { 
            //Arrange
            testAccount.addOverdraft(300);
            //Act
            testAccount.setOverdraft(500);
            //Assert
            expect(testAccount.getOverdraftLimit()).toBe(500);
        });
        
        it("should not change the overdraft limit lower than the balance", () => { 
            //Arrange
            testAccount.deposit(100);
            testAccount.addOverdraft(100);
            //Act
            testAccount.withdraw(160);
            testAccount.setOverdraft(50);
            //Assert
            expect(testAccount.setOverdraft()).toBe(false);
        });
    });
});
import Account from "../src/Account.js";

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
            expect(testAccount.getStatement()[0]).toEqual(jasmine.objectContaining({"type": "credit", "date": new Date().toLocaleDateString()}));
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
            expect(testAccount.getBalance()).toEqual(150);
        });
    });
});
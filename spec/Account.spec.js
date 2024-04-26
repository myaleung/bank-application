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
            const money = testAccount.getBalance() + 1000;
            //Act
            testAccount.deposit(money)
            //Assert
            expect(testAccount.getBalance()).toEqual(money);
        });
    });
});
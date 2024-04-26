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
    });
    
    describe("Account Balance Mutation Tests:", () => { 
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
    });
});
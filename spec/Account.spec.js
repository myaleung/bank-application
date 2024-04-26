import Account from "../src/Account.js";

describe("Account Class Tests:", () => { 
    describe("Account Initialisation Tests:", () => { 
        let testAccount;

        beforeEach(() => {
            testAccount = new Account(1000);
            spyOn(testAccount, "getAccountId").and.callThrough();
        });
            
        it("should return true when an account was created", () => { 
            //Arrange
            //Act
            //Assert
            expect(testAccount).toBeInstanceOf(Account);
        });
    });
});
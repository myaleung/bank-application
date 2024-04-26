import Account from "../src/Account.js";

describe("Account Class Tests:", () => { 
    describe("Account Initialisation Tests:", () => { 
        it("should return true when an account was created", () => { 
            //Arrange
            const testAccount = new Account();
            //Act
            //Assert
            expect(testAccount).toBeInstanceOf(Account);
        });
    });
});
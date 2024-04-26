import Bank from "../src/Bank.js";

describe("Bank Class Tests:", () => { 
    describe("Bank Initialisation Tests:", () => { 
        it("should create a new instance of Bank class", () => { 
            //Arrange
            const testBank = new Bank("Digital Futures Bank");
            //Act
            //Assert
            expect(testBank).toBeInstanceOf(Bank);
        });
        
        it("should create a new account when createAccount is called", () => { 
            //Arrange
            const testBank = new Bank("Digital Futures Bank");
            let expected = testBank.getAccounts().length + 1;
            //Act
            testBank.createAccount();
            //Assert
            expect(testBank.getAccounts().length).toBe(expected);
        });
    });
});
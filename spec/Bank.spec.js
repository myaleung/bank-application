import Bank from "../src/Bank.js";

describe("Bank Class Tests:", () => { 
    describe("Bank Initialisation Tests:", () => { 
        let testBank;

        beforeEach(() => {
            testBank = new Bank("Digital Futures Bank");
            spyOn(testBank, "getAccounts").and.callThrough();
        });

        it("should create a new instance of Bank class", () => { 
            //Arrange
            //Act
            //Assert
            expect(testBank).toBeInstanceOf(Bank);
        });
        
        it("should create a new account when createAccount is called", () => { 
            //Arrange
            testBank = jasmine.createSpyObj('Bank', ['createAccount']);
            //Act
            testBank.createAccount();
            //Assert
            expect(testBank.createAccount).toHaveBeenCalled();
        });
        
        it("should increase accounts length by 1 when createAccount is called", () => { 
            //Arrange
            let expected = testBank.getAccounts().length + 1;
            //Act
            testBank.createAccount();
            //Assert
            expect(testBank.getAccounts().length).toBe(expected);
        });
        
        it("should return true if account was created", () => { 
            //Arrange
            let expected = true;
            //Act
            //Assert
            expect(testBank.createAccount()).toBe(expected);
        });
        
        it("should add a new accountId to the Account upon creation", () => { 
            //Arrange
            const testBank = new Bank("Digital Futures Bank");
            let expected = 1000 + 1;
            //Act
            testBank.createAccount();
            //Assert
            expect(testBank.getAccounts()[0].getAccountId()).toEqual(expected);
        });
    });
});
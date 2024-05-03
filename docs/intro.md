# Bank Challenge - Challenge 2
```
               _._._                       _._._
              _|   |_                     _|   |_
              | ... |_._._._._._._._._._._| ... |
              | ||| | o DIGITAL FUTURES o | ||| |
              | ||| | o      BANK       o | ||| |
              | """ |  """    """    """  | """ |
         ())  |[-|-]| [-|-]  [-|-]  [-|-] |[-|-]|  ())
        (())) |     |---------------------|     | (()))
       (())())| """ |  """    """    """  | """ |(())())
       (()))()|[-|-]|  :::   .-"-.   :::  |[-|-]|(()))()
       ()))(()|     | |~|~|  |_|_|  |~|~| |     |()))(()
          ||  |_____|_|_|_|__|_|_|__|_|_|_|_____|  ||
       ~ ~^^ @@@@@@@@@@@@@@/=======\@@@@@@@@@@@@@@ ^^~ ~
            ^~^~                                ~^~^
```

## Introduction
This is a console banking application created to help monitor the cash flow of bank accounts for Digital Futures Bank. The application will output in the terminal funds that were deposited or credited into an account. Users will be able to deposit funds or withdraw money from their accounts if they have a sufficient balance to do so.
Overdrafts can also be added to accounts and the limit adjusted as applicable to help customers manage their finances.
Statements for the account can be printed to show all the transactions applied to the account with colour coded credits and debits to signify whether the value was positive or negative.

### Benefits
* **Efficiency:** The bank currently doesn't have an banking application and would benefit greatly from this as users and tellers can now easily see what their bank balance is. As well handling account deposits and withdraws easily.
* **Clarity:** The application will display clearly what was credited into the account and how much money and when it was credited/deposited.
* **Ease:** Users can easily deposit or withdraw money from their bank account with the new application.
* **Keeps a record:** The bank now has a was of keeping a record of their customer's transactions and knows how much balance each of their customer's accounts have.
* **Unique Accounts:** Each customer is able to hold their own account and the system also allows for different bank branches with multiple accounts to be intialised.

### Risks
* **No feedback:** Customers can't interact with the application and thus would need to have the teller conduct the transactions.
* **Unable to make edits:** If the user enters an incorrect amount or mistyped a number, they can't change/undo the transaction.
* **No interest handling:** There isn't a scope to handle interest. If customers are in debt and using their overdraft the bank doesn't have a way to calculate interest occurred on overdraft. Nor is there a way to add annual interest on positive bank balances.
* **Date handling:** Future dates can be added to transactions as this is an edge case that hadn't been discussed. Transactions added to the statement are also made in the order they are handled and not reordered by date.
* **Currency:** This software only deals with values and figures that aren't tied to a currency. Therefore there isn't any clarification on what currency the money in the bank account is.
  
### Conclusion
The bank application is easy to use and straightforward to understand. Users can simply choose to deposit an amount of money into their account and withdraw funds from it. If they don't have a sufficient balance, they can look to add an overdraft and set a limit on it.
Statements can be printed on all accounts and will list the transactions in chronological order, where the latest is shown at the top. Though these transactions are appended based on the time of when this transaction was applied in the software. It doesn't sort the dates before printing but it should be included when this software is updated. There also isn't an error to handle when dates that are in the future are set when adding transactions. 
Credits and debits as well as positive/negative account balances are shown in green and red respectively to help easily differentiate the amounts on the printed statement. 

## Install
`npm i`

## Run
`npm start` - Run the demo system\
`npm test` - Run the test program
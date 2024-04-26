# Domain Models and Test Plan
### User Story 1
![As a customer, I want to be able to create/open a bank account, so that I can have a new account at my bank](image-1.png)

**Domain Model**
| Objects | Properties     | Messages                          | Output |
| ------- | -------------- | --------------------------------- | ------ |
| Bank | name @String<br>Account @Object[] | createAccount() | @Boolean  |
| Account | accountId @Integer    |    |    |

**Tests**
- [ ] createAccount should return true if account was created
- [ ] accountId should be added to the new Account

### User Story 2
![As a customer, I want to be able to deposit money in my bank account, so that I can increase my bank balance](image-2.png)

**Domain Model**
| Objects | Properties         | Messages                          | Output   |
| ------- | ------------------ | --------------------------------- | -------- |
| Account | balance @Integer<br>statement @Array[@type, @amount, @date] | deposit(@Integer, @date)<br>getBalance() | @Boolean         |

**Tests**
- [ ] deposit should return true if successful and money added to account
- [ ] balance in account should reflect increase in money deposited
- [ ] date of deposit should be shown as today's date unless otherwise

### User Story 3
![As a customer, I'd like to be able to withdraw money from my account, so that I can spend it](image-3.png)

**Domain Model**
| Objects | Properties                                                           | Messages                             | Output   |
| ------- | -------------------------------------------------------------------- | ------------------------------------ | -------- |
| Account | balance @Integer<br>statement @Array[@type, @amount, @date]          | withdraw(@Integer, @date)<br>getBalance() | @Boolean |          |

**Tests**
- [ ] if amount is withdrawn successfully, return true
- [ ] withdraw should deduct the withdrawn amount from the balance
- [ ] date of withdraw should be shown as today's date unless otherwise

### User Story 4
![As a customer I want to only be able to withdraw from the funds I have, so that I can get sufficient funds](image-4.png)

**Domain Model**
| Objects | Properties                                                                    | Messages                              | Output   |
| ------- | ----------------------------------------------------------------------------- | ------------------------------------- | -------- |
| Account | balance @Integer<br>statement @Array[@type, @amount, @date] | withdraw(@Integer, @date) | @Boolean |

**Tests**
- [ ] balance should not go past 0 if withdraw amount is more than balance
- [ ] withdrawal amount should withdraw up to the whole balance if it is more than bank balance

### User Story 5
![As a customer, I want to be able to check my bank balance, so that I know how much money I have in my account](image-5.png)

**Domain Model**
| Objects | Properties         | Messages                          | Output   |
| ------- | ------------------ | --------------------------------- | -------- |
| Account | balance @Integer   | getBalance()                      | @Integer |

**Tests**
- [ ] getBalance should return the amount of money currently in the account
- [ ] After depositing money, getBalance should increase by the amount deposited
- [ ] After withdrawing money, getBalance should decrease by the amount requested or up to the balance reaching 0.

### User Story 6
![As a customer, I'd like to be able to print my statement, so I can see and check my deposits and withdraws](image-6.png)

**Domain Model**
| Objects | Properties         | Messages                          | Output   |
| ------- | ------------------ | --------------------------------- | -------- |
| Account | statement @Array[@type, @amount, @date]| printStatement()      | @String         |

**Tests**
- [ ] printStatement should return all the transactions made to the account in chronological order
- [ ] after depositing money, printStatement should add the transaction details to the top of the list
- [ ] after withdrawing money, printStatement should add the transaction details to the top of the list

### User Story 7
![As a customer I'd like to be able to see my account balance colour coordinated, so the information is clear](image-7.png)

**Domain Model**
| Objects | Properties         | Messages                          | Output   |
| ------- | ------------------ | --------------------------------- | -------- |
| Account | statement @Array[@type, @amount, @date] | printStatement()                                  | @String         |

**Tests**
- [ ] The output of the statement should be formatted so credits and positive balances appear in green text
- [ ] The output of the statement should be formatted so debits and negative balances appear in red text

### User Story 8
![As a customer I want to be able to add an overdraft to my account, so that I can withdraw more than my balance](image-8.png)

**Domain Model**
| Objects | Properties         | Messages                          | Output   |
| ------- | ------------------ | --------------------------------- | -------- |
| Account | overdraft @Integer | addOverdraft()                    | @Boolean |

**Tests**
- [ ] addOverdraft should return true when an overdraft is added to the account

### User Story 9
![As a customer, I want to be able to set the overdraft to my account, so that I can choose the overdraft balance](image-9.png)

**Domain Model**
| Objects | Properties         | Messages                          | Output   |
| ------- | ------------------ | --------------------------------- | -------- |
| Account | overdraft @Integer | addOverdraft(@Integer)            | @Boolean |

**Tests**
- [ ] addOverdraft should pass through a value which sets the overdraft limit as entered

### User Story 10
![As a customer, I want access my overdraft if my withdrawal exceeds my bank balance, so that I can withdraw the full amount of funds I need](image-10.png)

**Domain Model**
| Objects | Properties         | Messages                          | Output   |
| ------- | ------------------ | --------------------------------- | -------- |
| Account | overdraft @Integer<br>balance @Int | withdraw(@Integer)| @Boolean |

**Tests**
- [ ] If account has an overdraft set, allow the customer to withdraw money past their available balance.
- [ ] When withdraw is called, overdraft should not exceed the overdraft limit set.

### User Story 11
![As a customer, I want change my overdraft limit, so that I can withdraw and borrow more funds](image-11.png)

**Domain Model**
| Objects | Properties         | Messages                          | Output   |
| ------- | ------------------ | --------------------------------- | -------- |
| Account | overdraft @Integer | setOverdraft(@Integer)            | @Boolean |

**Tests**
- [ ] If account has an overdraft set, setOverdraft should change the overdraft balance to the new value.
- [ ] If account has an overdraft set, setOverdraft should not change the overdraft limit lower than the current balance.

## Kanban Board
I used a kanban board on Miro to help organise my user stories and production tickets.\
See Miro Board: <https://miro.com/app/board/uXjVKP-w-MM=/?share_link_id=534173247809>

![Kanban board with user stories](image.png)
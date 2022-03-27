/* eslint-disable no-unused-vars */
import {Component} from 'react'
import {v4} from 'uuid'

import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    transactionList: [],
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteTransaction = id => {
    const {transactionList} = this.state
    const updatedList = transactionList.filter(
      eachTransaction => eachTransaction.id !== id,
    )
    this.setState({transactionList: updatedList})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId, transactionList} = this.state
    const typeOption = transactionTypeOptions.map(
      eachTransaction => eachTransaction.optionId === optionId,
    )

    const {displayText} = typeOption

    const newTransaction = {
      id: v4(),
      title: titleInput,
      amount: amountInput,
      type: displayText,
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmount = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOption = event => {
    this.setState({optionId: event.target.value})
  }

  getExpense = () => {
    const {transactionList} = this.state
    let expenseAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displaytext) {
        expenseAmount += eachTransaction.amount
      }
    })
    return expenseAmount
  }

  getIncome = () => {
    const {transactionList} = this.state
    let incomeAmount = 0
    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  getBalance = () => {
    const {transactionList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expenseAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expenseAmount += eachTransaction.amount
      }
    })
    balanceAmount = incomeAmount - expenseAmount
    return balanceAmount
  }

  render() {
    const {titleInput, amountInput, transactionList, optionId} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expenseAmount = this.getExpense()

    return (
      <div>
        <div>
          <h1>Hi,Richard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>

        <MoneyDetails
          balanceAmount={balanceAmount}
          incomeAmount={incomeAmount}
          expenseAmount={expenseAmount}
        />
        <div>
          <form onSubmit={this.onAddTransaction}>
            <h1>Add Transaction</h1>
            <label htmlFor="title">TITLE</label>
            <input
              type="text"
              id="title"
              onChange={this.onChangeTitle}
              value={titleInput}
              placeholder="TITLE"
            />
            <label htmlFor="amount">AMOUNT</label>
            <input
              type="text"
              id="amount"
              value={amountInput}
              onChange={this.onChangeAmount}
              placeholder="AMOUNT"
            />
            <label htmlFor="select">TYPE</label>
            <select id="select" value={optionId} onChange={this.onChangeOption}>
              {transactionTypeOptions.map(eachOption => (
                <option key={eachOption.optionId} value={eachOption.optionId}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>
            <button type="submit">Add</button>
          </form>
          <div>
            <h1>History</h1>
            <div>
              <ul>
                <li>
                  <p>Title</p>
                  <p>Amount</p>
                  <p>Type</p>
                </li>
                {transactionList.map(eachTransaction => (
                  <TransactionItem
                    key={eachTransaction.id}
                    optionDetails={eachTransaction}
                    deleteTransaction={this.deleteTransaction}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager

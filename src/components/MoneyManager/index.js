import {Component} from 'react'
import {v4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'

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
const moneyDetail = [
  {
    id: 'BALANCE',
    dataTestId: 'balanceAmount',
    text: 'Your Balance',
    money: 0,
    url:
      'https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png',
  },
  {
    id: 'INCOME',
    text: 'Your Income',
    dataTestId: 'incomeAmount',
    money: 0,
    url:
      'https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png',
  },
  {
    id: 'EXPENSES',
    text: 'Your Expenses',
    dataTestId: 'expensesAmount',
    money: 0,
    url:
      'https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png',
  },
]
class MoneyManager extends Component {
  state = {
    moneyDetails: moneyDetail,
    transationDetails: [],
    title: '',
    amount: '',
    type: transactionTypeOptions[0].optionId,
  }

  onTitleChange = event => {
    const title = event.target.value
    this.setState({title})
  }

  onAmountChange = event => {
    const amount = parseInt(event.target.value)
    this.setState({amount})
  }

  onTypeChange = event => {
    const type = event.target.value
    this.setState({type})
  }

  submitFormData = event => {
    event.preventDefault()
    const {title, amount, type, moneyDetails, transationDetails} = this.state

    const updatedMoneyDetails = moneyDetails.map(each => {
      if (type === 'INCOME') {
        switch (each.id) {
          case 'BALANCE':
            return {...each, money: each.money + amount}

          case 'INCOME':
            return {...each, money: each.money + amount}

          default:
            return each
        }
      } else {
        switch (each.id) {
          case 'BALANCE':
            return {...each, money: each.money - amount}

          case 'EXPENSES':
            return {...each, money: each.money + amount}

          default:
            return each
        }
      }
    })

    const transation = {
      id: v4(),
      title,
      amount,
      type,
    }
    this.setState({
      moneyDetails: updatedMoneyDetails,
      transationDetails: [...transationDetails, transation],
      title: '',
      amount: '',
      type: transactionTypeOptions[0].optionId,
    })
  }

  onDeleteTran = id => {
    const {transationDetails, moneyDetails} = this.state
    const deletedTran = transationDetails.filter(eachTran => eachTran.id === id)
    console.log(deletedTran[0].amount)
    const filteredTrans = transationDetails.filter(
      eachTran => eachTran.id !== id,
    )

    const updatedMoneyDetails = moneyDetails.map(eachCard => {
      if (deletedTran[0].type === 'EXPENSES') {
        switch (eachCard.id) {
          case 'BALANCE':
            return {
              ...eachCard,
              money: eachCard.money + deletedTran[0].amount,
            }
          case 'EXPENSES':
            return {
              ...eachCard,
              money: eachCard.money - deletedTran[0].amount,
            }
          default:
            return eachCard
        }
      } else {
        switch (eachCard.id) {
          case 'BALANCE':
            return {
              ...eachCard,
              money: eachCard.money - deletedTran[0].amount,
            }
          case 'INCOME':
            return {
              ...eachCard,
              money: eachCard.money - deletedTran[0].amount,
            }
          default:
            return eachCard
        }
      }
    })

    this.setState({
      transationDetails: filteredTrans,
      moneyDetails: updatedMoneyDetails,
    })
  }

  render() {
    const {moneyDetails, transationDetails, title, amount, type} = this.state

    return (
      <div className="bg-container">
        <div className="header-container">
          <h1>Hi, Rechard</h1>
          <p>
            Welcome back to your <span>Money Manager</span>
          </p>
        </div>

        <ul className="money-cards-container">
          {moneyDetails.map(eachItem => (
            <MoneyDetails key={v4()} eachItem={eachItem} />
          ))}
        </ul>
        <div className="bottom-container">
          <form onSubmit={this.submitFormData}>
            <h1>Add Transaction</h1>
            <label htmlFor="title">TITLE</label>
            <br />
            <input
              id="title"
              value={title}
              placeholder="Title"
              onChange={this.onTitleChange}
            />
            <br />
            <label htmlFor="amount">AMOUNT</label>
            <br />
            <input
              id="amount"
              value={amount}
              placeholder="Amount"
              onChange={this.onAmountChange}
            />
            <br />
            <label htmlFor="type">TYPE</label> <br />
            <select id="type" value={type} onChange={this.onTypeChange}>
              {transactionTypeOptions.map(eachObj => (
                <option key={eachObj.optionId} value={eachObj.optionId}>
                  {eachObj.displayText}
                </option>
              ))}
            </select>
            <br />
            <button type="submit">Add</button>
          </form>
          <div className="trans-container">
            <h1>History</h1>
            <div className="history-header">
              <p>Title</p>
              <p>Amount</p>
              <p>Type</p>
              <p> </p>
            </div>
            <div>
              <ul className="tranc-container">
                {transationDetails.map(eachTran => (
                  <TransactionItem
                    key={eachTran.id}
                    eachTran={eachTran}
                    onDeleteTran={this.onDeleteTran}
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

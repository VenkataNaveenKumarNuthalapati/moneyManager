import './index.css'

const TransactionItem = props => {
  const {eachTran, onDeleteTran} = props
  const {title, amount, type, id} = eachTran
  console.log(eachTran)

  return (
    <li className="li-container">
      <div className="head-container">
        <p>{title}</p>
        <p>Rs {amount}</p>
        <p>{type === 'INCOME' ? 'Income' : 'Expenses'}</p>
      </div>
      <button
        className="delete-button"
        type="button"
        data-testid="delete"
        onClick={() => onDeleteTran(id)}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem

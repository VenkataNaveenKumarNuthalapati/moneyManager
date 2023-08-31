// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {eachItem} = props
  const {text, money, url, dataTestId} = eachItem
  let selectedContainer = ''
  switch (text) {
    case 'Your Balance':
      selectedContainer = 'balance'
      break
    case 'Your Income':
      selectedContainer = 'income'
      break
    case 'Your Expenses':
      selectedContainer = 'expense'
      break
    default:
      break
  }

  return (
    <li className={`money-details-card ${selectedContainer}`}>
      <img src={url} alt={text} />
      <div>
        <p>{text}</p>
        <p data-testid={dataTestId}>Rs {money}</p>
      </div>
    </li>
  )
}

export default MoneyDetails

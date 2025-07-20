import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [rates, setRates] = useState({})
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => response.json())
      .then(data => {
        console.log('Exchange rates:', data.rates);
        setRates(data.rates);
      })
      .catch(error => console.error('Error fetching rates:', error));
  }, []);

  const inputHandler = (e) => {
    setAmount(e.target.value);
  }
  const handleFromCurrencyChange = (e) => {
    setFromCurrency(e.target.value)
  }

  const handleToCurrencyChange = (e) => {
    setToCurrency(e.target.value)
  }

  const convertCurrency = () => {
    if (!rates[fromCurrency] || !rates[toCurrency]) return 0;
    if (fromCurrency === 'USD') {
      return (amount * rates[toCurrency]).toFixed(2);
    } else if (toCurrency === 'USD') {
      return (amount / rates[fromCurrency]).toFixed(2);
    } else {
      const usdAmount = amount / rates[fromCurrency];
      return (usdAmount * rates[toCurrency]).toFixed(2);
    }
  }

  const currencies = Object.keys(rates);

  return (
    <div className="app">
      <div className="container">
        <h1>💱 Currency Converter</h1>

        <div className="converter-card">
          <div className="input-group">
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={inputHandler}
              placeholder="Enter amount"
              className="amount-input"
            />
          </div>

          <div className="currency-selectors">
            <div className="selector-group">
              <label>From</label>
              <select
                value={fromCurrency}
                onChange={handleFromCurrencyChange}
                className="currency-select"
              >
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>

            <div className="swap-icon">⇄</div>

            <div className="selector-group">
              <label>To</label>
              <select
                value={toCurrency}
                onChange={handleToCurrencyChange}
                className="currency-select"
              >
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="result">
            <div className="result-text">
              {amount} {fromCurrency} =
            </div>
            <div className="result-amount">
              {convertCurrency()} {toCurrency}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

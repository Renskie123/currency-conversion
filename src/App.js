import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [conversionRes, setConversionRes] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      try {
        async function convert() {
          setIsLoading(true);
          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
          );
          const data = await res.json();
          setConversionRes(data.rates[toCurrency]);
          setIsLoading(false);
        }
        if (fromCurrency === toCurrency) return setConversionRes(amount);
        convert();
      } catch (error) {}
    },
    [amount, fromCurrency, toCurrency]
  );

  return (
    <div className="App">
      <input
        value={amount}
        type="number"
        min={0}
        disabled={isLoading}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select
        value={fromCurrency}
        disabled={isLoading}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrency}
        disabled={isLoading}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{isLoading ? "Loading..." : conversionRes + " " + toCurrency}</p>
    </div>
  );
}

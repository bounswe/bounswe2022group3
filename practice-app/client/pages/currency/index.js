import { useState } from "react"
import axios from "axios"
import { API_URL } from "../../next.config";

export default function Home() {

    const allCurrencies = ["USD", "EUR", "TRY", "AZN"]

    const [ratesTable, setRatesTable] = useState(null)
    const [from, setFrom] = useState("USD")
    const [to, setTo] = useState("TRY")
    const [amount, setAmount] = useState(null)
    const [convertedValue, setConvertedValue] = useState(null)

    async function convert(e) {
        if (!amount) {
            return alert("Enter amount to convert!")
        }

        const convertedValue = (await axios.get(`${API_URL}/currency/getConversion?from=${from}&to=${to}&amount=${amount}`)).data.convertedValue

        setConvertedValue(`${amount}${from} = ${convertedValue}${to}`)
        setRatesTable(null)
    }

    async function fetchAll(e) {

        const rates = (await axios.post(`${API_URL}/currency/allConversions`, {
            allCurrencies
        })).data.rates

        const tableItem = (
            <table>
                <thead>
                    <tr>
                        <td>from</td>
                        <td>to</td>
                        <td>rate</td>
                    </tr>
                </thead>
                <tbody>
                    {rates.map((rate, index) => {
                        return (
                            <tr key={index.toString()}>
                                <td>USD</td>
                                <td>{allCurrencies[index]}</td>
                                <td>{rate}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )

        setRatesTable(tableItem)
        setConvertedValue(null)
    }

    return (
        <div style={{
            textAlign: "center",
            padding: 200
        }}>
            <button onClick={fetchAll}>Show conversion rates From USD</button>

            <br />
            <br />

            <label htmlFor="from-select" >Choose a currency to convert from:</label>
            <select id="from-select" onChange={e => setFrom(e.target.value)} value={from}>
                {allCurrencies.map(currency => {
                    return (<option key={"from_" + currency}>{currency}</option>);
                })}
            </select>

            <br />
            <br />

            <label htmlFor="to-select">Choose a currency to convert to:</label>
            <select id="to-select" onChange={e => setTo(e.target.value)} value={to}>
                {allCurrencies.map(currency => {
                    return (<option key={"to_" + currency}>{currency}</option>);
                })}
            </select>

            <br />
            <br />

            <input type="number" placeholder={`... ${from}`} onChange={e => setAmount(e.target.value)}></input>
            <button onClick={convert}>convert to {to}</button>

            <div>
                <h2>Results...</h2>

                <div id="allConversions">{convertedValue}</div>

                <div id="conversionResult">{ratesTable}</div>
            </div>
        </div>
    )
}
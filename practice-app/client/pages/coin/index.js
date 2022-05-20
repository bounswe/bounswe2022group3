import { useState } from "react"
import axios from "axios"
import { API_URL } from "../../next.config";
import styles from "../../styles/coin/coin.module.scss";

export default function Coin() {

    const availableCoins = ["bitcoin","ethereum","tether","usd-coin","binancecoin","ripple","binance-usd","cardano","solana","dogecoin"]
    const availableCurrencies = ["USD","EUR","GBP","TRY","RUB","CNY","JPY"]

    const[coinId, setCoinId] = useState("bitcoin")
    const[currencyId, setCurrencyId] = useState("USD")
    const[coinPrice, setCoinPrice] = useState(null)
    const[addedCoin, setAddedCoin] = useState(null)
    const[coinsList, setCoinsList] = useState(null)

    async function getCoinValue(e) {
        
        const price = (await axios.get(`${API_URL}/coin/coinValue?coinId=${coinId}&currencyId=${currencyId}`)).data
        const coinPrice = price.value
    
        setCoinPrice(`${coinId} = ${coinPrice} ${currencyId}`)
        
        setAddedCoin(null)
        setCoinsList(null)

    }

    async function getCoinHistory(e){
        
        const coinsList = (await axios.get(`${API_URL}/coin/coinList`)).data

        const coinTable = (
            <table className={`${styles.tablelatitude}`}>
                <thead>
                    <tr>
                        <th>Coin ID</th>
                        <th>Currency ID</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {coinsList.map((element,index) =>{
                        return (
                            <tr key={`${element._id}`}>
                                <td>{element.coin_id}</td>
                                <td>{element.currency_id}</td>
                                <td>{element.price}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )

        setCoinsList(coinTable)

        setAddedCoin(null)
        setCoinPrice(null)
        
    }

    async function postCoinValue(e) {


        const price = (await axios.post(`${API_URL}/coin/addCoinHistory?coinId=${coinId}&currencyId=${currencyId}`))
        .data.currentPrice
        setAddedCoin(`${coinId} = ${price} ${currencyId} added to history successfully`)
        
        setCoinPrice(null)
        setCoinsList(null)

        
    }

    return (

        <div className={`${styles.divStyle}`}>

            <div style={{
                textAlign: "center",
                padding: 50,
            }}>
                <font size="+2">Cryptocurrency Converter</font>
                </div>

            <label htmlFor="availableCoins-select">Select a coin: </label>
            <select id="availableCoins-select" onChange={e => setCoinId(e.target.value)} value={coinId}>
                {availableCoins.map(coinId => {
                    return (<option key={coinId}>{coinId}</option>);
                })}
            </select>

            <br />

            <label htmlFor="availableCurrencies-select">Select a currency: </label>
            <select id="availableCurrencies-select" onChange={e => setCurrencyId(e.target.value)} value={currencyId}>
                {availableCurrencies.map(currencyId => {
                    return (<option key={currencyId}>{currencyId}</option>);
                })}
            </select>

            <br />

            <button style={{
                backgroundColor: "darkblue",
                color: "white"
            }}
            onClick={getCoinValue}>Show the coin's price</button>
            <br />
            <button style={{
                backgroundColor: "darkblue",
                color: "white"
            }}
            onClick={postCoinValue}>Add the current price to the database</button>
            <br />
            <button style={{
                backgroundColor: "darkblue",
                color: "white"
            }}
            onClick={getCoinHistory}>See the last 5 searches</button>

            <br />

            <div style={{
                border: "2px solid lawngreen",
            }}>
                <div style={{
                    backgroundColor: "#F1F1F1",
                    color: "black",
                }}>{coinPrice}</div>

                <div style={{
                    backgroundColor: "#F1F1F1",
                    color: "black",
                }}>{addedCoin}</div>
                <div className="panel panel-default">{coinsList}</div>
                
            </div>
            
        </div>

    )
}
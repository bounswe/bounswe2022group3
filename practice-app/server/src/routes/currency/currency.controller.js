const axios = require("axios");

const currencyApiUrl = process.env.CURRENCY_API_URL
const currencyApiKey = process.env.CURRENCY_API_KEY

const CurrencyController = {
    allConversions: async function (req, res) {

        const allCurrencies = req.body.allCurrencies
        const rates = []

        for (let i = 0; i < allCurrencies.length; i++) {
            const response = (await axios.get(`${currencyApiUrl}/convert?q=USD_${allCurrencies[i]}&compact=ultra&apiKey=${currencyApiKey}`)).data
            const rate = response[`USD_${allCurrencies[i]}`]
            rates.push(rate)
        }

        res.send({ "status": "ok", "rates": rates })
    },
    getConversion: async function (req, res) {

        const { from, to, amount } = req.query
        const response = (await axios.get(`${currencyApiUrl}/convert?q=${from}_${to}&compact=ultra&apiKey=${currencyApiKey}`)).data

        const rate = response[`${from}_${to}`]
        const convertedValue = amount * rate

        res.send({ "status": "ok", "convertedValue": convertedValue })
    }
};

module.exports = CurrencyController;
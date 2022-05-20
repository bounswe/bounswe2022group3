const axios = require("axios");
const Coin = require("../../models/coin/coin.model");

const coinApiUrl = "https://api.coingecko.com/api/v3"

const CoinController = {
    coinValue: async function (req, res) {

        try {
            const {coinId, currencyId} = req.query

            const response = (await axios.get(`${coinApiUrl}/simple/price?ids=${coinId}&vs_currencies=${currencyId.toLowerCase()}`)).data
            const valueToSend = response[`${coinId}`][`${currencyId.toLowerCase()}`]
            
            res.status(200).send({ value: valueToSend })
        }
        catch(e) {
            res.status(400).send({ error: e })
        }
    },

    coinList: async function (req, res){

        const coinsList = await Coin
        .find({},{ coin_id: 1, currency_id: 1, price: 1, date: 1, _id: 0})
        .sort({ date: -1 }).limit(5)
        res.status(200).send(coinsList)

    },

    addCoinHistory: async function (req, res) {

        try {
            const {coinId, currencyId} = req.query

            const response = (await axios.get(`${coinApiUrl}/simple/price?ids=${coinId}&vs_currencies=${currencyId.toLowerCase()}`)).data
            const value = response[`${coinId}`][`${currencyId.toLowerCase()}`]

            var coinHistory = new Coin({coin_id: coinId, currency_id: currencyId, price: value, date: Date.now()})

            coinHistory.save()

            res.send({coin_id: coinId, currency_id: currencyId, currentPrice: value, date: Date.now()})
        }
        catch (e) {
            res.status(400).send({ error: e })
        }
        


    }
};

module.exports = CoinController;
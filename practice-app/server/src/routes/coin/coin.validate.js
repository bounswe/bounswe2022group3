const { query } = require("express-validator");

exports.validate = (method) => {
    switch (method) {
        case "coinValue": {
            return [
                query("coinId", "Invalid coin or currency ID")
                .exists().isIn(["bitcoin","ethereum","tether","usd-coin","binancecoin","ripple","binance-usd","cardano","solana","dogecoin"]),
                query("currencyId", "Invalid coin or currency ID")
                .exists().isIn(["USD","EUR","GBP","TRY","RUB","CNY","JPY"]),
            ];
        }
        case "addCoinHistory": {
            return [
                query("coinId", "Invalid coin or currency ID")
                .exists().isIn(["bitcoin","ethereum","tether","usd-coin","binancecoin","ripple","binance-usd","cardano","solana","dogecoin"]),
                query("currencyId", "Invalid coin or currency ID")
                .exists().isIn(["USD","EUR","GBP","TRY","RUB","CNY","JPY"]),
            ]
        }
    }
};


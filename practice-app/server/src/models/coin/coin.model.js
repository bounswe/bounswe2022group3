const mongoose = require("mongoose");

const CoinSchema = new mongoose.Schema({
    coin_id: 
    { 
        type: String,
        required: true 
    },
    currency_id: 
    { 
        type: String,
        required: true 
    },
    price: 
    { 
        type: String,
        required: true 
    },
    date: 
    { 
        type: Date,
        required: true 
    }
});

const Coin = mongoose.model("Coin", CoinSchema)

module.exports = Coin
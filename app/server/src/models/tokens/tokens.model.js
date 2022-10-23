const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    email: {
        unique: true,
        type: String
    },
    access_token: {
        unique: true,
        type: String
    },
    refresh_token: {
        unique: true,
        type: String
    },
},
    {
        timestamps: true
    }
);
const Tokens = mongoose.model('Tokens', tokenSchema);

const createToken = async ({ email, access_token, refresh_token }) => {
    let tokens = await getTokensByEmail(email);
    if (!tokens) {
        tokens = new Tokens({
            email: email,
        })
    }
    tokens.access_token = access_token
    tokens.refresh_token = refresh_token
    const res = await tokens.save()
    return res
}

const getTokensByEmail = async (email) => {
    const result = await Tokens.findOne({ email }).exec();
    return result;
}

module.exports = { Tokens, createToken, getTokensByEmail };
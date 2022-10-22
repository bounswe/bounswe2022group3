const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        unique: true,
        type: String
    },
    name: {
        type: String
    },
    surname: {
        type: String
    },
    password_hash: {
        type: String
    },
    password_salt: {
        type: String
    },
    password_iter: {
        type: String
    },
},
    {
        timestamps:true
    }
);
const User = mongoose.model('User', userSchema);

const createUser = async ({email, name, surname, password_hash, password_salt, password_iter}) => {
    var user = new User({ 
        email: email,
        name: name,
        surname: surname,
        password_hash: password_hash,
        password_salt: password_salt,
        password_iter: password_iter
    })
    const res = await user.save()
    return res
}

const getUserByEmail = async (email) => {

    const result = await User.findOne({email : `${email}`}).exec();
    return result;
}
const getUserByID = async (user_id) => {

    const result = await User.findById(user_id).exec();
    return result;
}

const deleteUser = async (email) => {
    const res = await User.findOneAndDelete({ email: email })
    return res
}
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
        timestamps:true
    }
);
const Tokens = mongoose.model('Tokens', tokenSchema);

const createToken= async ({email, access_token, refresh_token}) => {
    var tokens = new Tokens({ 
        email: email, 
        access_token: access_token, 
        refresh_token: refresh_token
    })
    const res = await tokens.save()
    return res
}

const getTokensByEmail = async (email) => {
    const result = await Tokens.findOne({email}).exec();
    return result;
}

module.exports = { User, Tokens,createUser, deleteUser, getUserByEmail, getUserByID, createToken, getTokensByEmail };

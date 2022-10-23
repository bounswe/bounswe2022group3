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
    tokens: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Tokens"
    },
},
    {
        timestamps:true
    }
);
const User = mongoose.model('User', userSchema);

const createUser = async ({email, name, surname, password_hash, password_salt, password_iter,tokens}) => {
    var user = new User({ 
        email: email,
        name: name,
        surname: surname,
        password_hash: password_hash,
        password_salt: password_salt,
        password_iter: password_iter,
        tokens: tokens
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

const getPopulatedTokens = async (user_id) => {
    return User.findById(user_id)
    .populate("tokens").exec()
}

module.exports = { User, createUser, deleteUser, getUserByEmail, getUserByID, getPopulatedTokens};

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        unique: true,
        type: String
    },
    name: {
        unique: true,
        type: String
    },
    surname: {
        unique: true,
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
    }
});
const User = mongoose.model('User', userSchema);

const createUser = async (email, name, surname, password_hash) => {
    var user = new User({ email: email, name: name, surname: surname, password_hash: password_hash })
    const res = await user.save()
    return res
}

const getUserByEmail = async (email) => {

    const result = await User.findOne({email : `${email}`}, '_id').exec();
    return result;
}

const deleteUser = async (email) => {
    const res = await User.findOneAndDelete({ email: email })
    return res
}


module.exports = { User, createUser, deleteUser, getUserByEmail };

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
    password: {
        type: String
    },
});
const User = mongoose.model('User', userSchema);

const createUser = async (email, name, surname, password) => {
    var user = new User({ email: email, name: name, surname: surname, password: password })
    const res = await user.save()
    return res
}


const deleteUser = async (email) => {
    const res = await User.findOneAndDelete({ email: email })
    return res
}


module.exports = { User, createUser, deleteUser };

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

const createUser = async (email, name, surname, password_hash) => {
    var user = new User({ email: email, name: name, surname: surname, password_hash: password_hash })
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


module.exports = { User, createUser, deleteUser, getUserByEmail, getUserByID };

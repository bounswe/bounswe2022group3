const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    client_id: {
        type: String, 
        unique: true, 
        required: true
    },
    tenant: {
        type: String
    },
    email:{
        type: String
    },
    password: {
        type: String
    },
    connection: {
        type: String
    },
    given_name: {
        type: String
    },
    family_name: {
        type: String
    },
});
const User = mongoose.model('User', userSchema);

const getUserByID = async (user_id) => {

    const result = await User.findById(user_id, 'email given_name family_name').exec();
    return result;
}

const getUserByEmail = async (email) => {

    const result = await User.findOne({email : `${email}`}, '_id').exec();
    return result;
}

module.exports = {User, getUserByID, getUserByEmail};

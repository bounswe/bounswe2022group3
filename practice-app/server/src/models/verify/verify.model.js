const mongoose = require("mongoose");

const emailSchema = new mongoose.Schema({
    email:{
        unique: true,
        type: String
    }
});


const Email = mongoose.model('Email', emailSchema);

const getEmail = async (email) => {

    const result = await Email.findOne({email : `${email}`}).exec();
    return result;
}

module.exports = {Email,getEmail};

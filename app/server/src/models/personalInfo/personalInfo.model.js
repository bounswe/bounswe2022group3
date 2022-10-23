const mongoose = require("mongoose");


const personalInfoSchema = new mongoose.Schema({
    personal_info_id:
    {
        type: mongoose.Schema.Types.ObjectId
    },
    user_profile_id:{
        type: mongoose.Schema.Types.ObjectId,
    },
    bio:
    {
        type: String
    },
    personal_achievements:
    [{
        type: String
    }],
    interest_badges_selected:
    [{
        type: String
    }],
    personal_activities:
    [{
        type: String
    }],
    knowledge:
    [{
        type: String
    }],
    personal_rating:
    {
        type: mongoose.Types.Decimal128
    },
    interests:
    [{
        type: String
    }],
    badges:
    [{
        type: mongoose.Schema.Types.ObjectId
    }]
});

const PersonalInfo = mongoose.model('personalInfo', personalInfoSchema);

const createPersonalInfo = async (id) => {
    var info = new PersonalInfo()
    info.personal_info_id = info._id
    info.user_profile_id = id
    const res = await info.save()
    return [info.personal_info_id, res]
}

const getPersonalInfo = async (id) => {
    const res = await PersonalInfo.findById(id)
    return res
}

module.exports = { PersonalInfo, createPersonalInfo, getPersonalInfo };
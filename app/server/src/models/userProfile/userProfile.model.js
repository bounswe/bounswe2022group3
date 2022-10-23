const mongoose = require("mongoose");

const userProfileSchema = new mongoose.Schema({
    user_profile_id:
    {
        type: mongoose.Schema.Types.ObjectId
    },
    name:
    {
        type: String,
        required: true
    },
    surname:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true
    },
    created_at:
    {
        type: Date,
        required: true
    },
    personal_info:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PersonalInfo"
    },
    enrollments:
    [{
        type: String
    }],
    created_courses:
    [{
        type: String
    }],
    followed_users:
    [{
        type: String
    }],
    follower_users:
    [{
        type: String
    }],
    blocked_users:
    [{
        type: String
    }],
    is_confirmed:
    {
        type: Boolean
    },
    is_banned:
    {
        type: Boolean
    },
    failed_login_count:
    {
        type: Number,
        required: true
    },
    is_private:
    {
        type: Boolean,
        default: false
    }

});

const UserProfile = mongoose.model('UserProfile', userProfileSchema);

const createUserProfile = async (name, surname, email, created_at) => {
    var profile = new UserProfile({
        name: name,
        surname: surname,
        created_at: created_at,
        email: email,
        is_banned: false,
        is_confirmed: false,
        failed_login_count: 0
        })

    profile.user_profile_id = profile._id
 
    var res = await profile.save()
    return [profile.user_profile_id, res]
}

const getUserProfile = async (id) => {
    return UserProfile.findById(id).exec()


}

module.exports = { UserProfile, createUserProfile, getUserProfile };


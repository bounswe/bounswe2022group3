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
    personal_info:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PersonalInfo"
    },
    enrollments:
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Enrollment"
    }],
    created_courses:
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }],
    followed_users:
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    follower_users:
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    blocked_users:
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    is_confirmed:
    {
        type: Boolean
    },
    is_banned:
    {
        type: Boolean
    },
    failed_login_count: // TODO: Integrate this such that failed logins would require user to recreate their password.
    {
        type: Number,
    },
    is_private:
    {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    }
);
const User = mongoose.model('User', userSchema);

const createUser = async ({ email, name, surname, password_hash, password_salt, password_iter, tokens }) => {
    var user = new User({
        email: email,
        name: name,
        surname: surname,
        password_hash: password_hash,
        password_salt: password_salt,
        password_iter: password_iter,
        tokens: tokens
    })
    // After profile branch merged, add here
    ```
    const createPersonalInfo = async () => {
        var user = new User({
            email: email,
            name: name,
            surname: surname,
            password_hash: password_hash,
            password_salt: password_salt,
            password_iter: password_iter,
            tokens: tokens
        })
        const PersonalInfoModel = require("../../models/personalInfo/personalInfo.model");
        const personalInfo = (await PersonalInfoModel.createPersonalInfo());
        user.personal_info = personalInfo._id
    ```
    const res = await user.save()
    return res
}

const getUserByEmail = async (email) => {

    const result = await User.findOne({ email: `${email}` }).exec();
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

module.exports = { User, createUser, deleteUser, getUserByEmail, getUserByID, getPopulatedTokens };

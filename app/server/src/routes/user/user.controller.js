const UserModel = require("../../models/users/users.model");
const crypto = require("crypto");
//const {authorization_admin} = require("../../services/auth");
//const axios = require("axios");

function hashPassword(password) {
    try{
        var salt = crypto.randomBytes(128).toString('base64');
        var iterations = 10000;
        var hash = crypto.pbkdf2Sync(password, salt, iterations,256,'sha256');
    }catch (error) {
        console.log(error)
    }
    return {
        salt: salt,
        hash: hash,
        iterations: iterations
    };
}

function isPasswordCorrect(savedHash, savedSalt, savedIterations, passwordAttempt) {
    return savedHash == pbkdf2(passwordAttempt, savedSalt, savedIterations);
}

const UserController = {
    register: async function (req, res) {
        const { email, name, surname, password } = req.body;

        try {
            
            //Check if user already exist
            const user = await UserModel.getUserByEmail(email);
            if (user) {
                return res
                    .status(409)
                    .json({ message: "The user already exists."});
            }

            console.log("Proceeding with signup")
            // Proceeding with signup
            passwd_data = hashPassword(password)

            user_data = {
                email: email,
                name: name,
                surname: surname,
                password_hash: passwd_data.hash,
                password_salt: passwd_data.salt,
                password_iter: passwd_data.iterations
            }
            console.log("asdasd")
            var new_user = new UserModel.User(user_data);
            const response = (await new_user.save()); 
            console.log(response)

        } catch (error) {
            console.log(error)
            return res.json({
                message: error,
            });
        }
    },
    login: async function (req, res) {
        const grant_type = 'password';
        const { email, password } = req.body;

        try {
            const user = await UserModel.getUserByEmail(email);
            if (!user) {
                return res
                    .status(403)
                    .json({ message: "The user does not exist." });
            }
            // hash request password, compare with the one in db
            // if they match create access token, refresh token, return them 
            return res.status(200).json({
                
            })
        } catch (error) {
            return res.status(400).json({
                message:"Failed to login!",
            });
        }
    },

};

module.exports = UserController;

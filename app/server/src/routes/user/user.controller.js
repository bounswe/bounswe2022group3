const UserModel = require("../../models/user/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken")
//const {authorization_admin} = require("../../services/auth");
//const axios = require("axios");
const jwt_secret = process.env.JWT_KEY
const access_jwtExpiry = '24h'
const refresh_jwtExpiry = '30d'

function hashPassword(password) {
    try{
        var salt = crypto.randomBytes(128).toString('hex');
        var iterations = 10000;
        var hash = crypto.pbkdf2Sync(password, salt, iterations,keylen=512,'sha256').toString('hex');;
    }catch (error) {
        console.log(error,"hash")
    }
    return {
        salt: salt,
        hash: hash,
        iterations: iterations
    };
}

function isPasswordCorrect(savedHash, savedSalt, savedIterations, passwordAttempt) {
    try{
        var trial = crypto.pbkdf2Sync(passwordAttempt, savedSalt, Number(savedIterations),keylen=512,'sha256').toString('hex'); 
    }catch (error) {
        console.log(error,"trial")
    }
    return savedHash == trial;
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
            var new_user = new UserModel.User(user_data);
            const response = (await new_user.save()); 
            if(response.createdAt){
                return res.status(201).json({
                    created_at: response.createdAt,
                    message: `Created the user with ${email}`,
                })
            }else{
                return res.status(400).json({
                    message: "Could not create a user with the parameters you provided.",
                });
            }

        } catch (error) {
            return res.json({
                message: error,
            });
        }
    },
    login: async function (req, res) {

        const { email, password } = req.body;

        try {
            const user = await UserModel.getUserByEmail(email);
            if (!user) {
                return res
                    .status(403)
                    .json({ message: "The user does not exist." });
            }
            // hash request password, compare with the one in db
            const comparison_result = isPasswordCorrect(user.password_hash,user.password_salt,user.password_iter,password)
            if(!comparison_result){
                return res.status(401).json({
                    message: "Incorrect Password !",
                });
            }
            // if they match create access token, refresh token, return them 
            var id = user._id.toString()
            const payload = {
                'id': id,
            };
            const options = {
                algorithm: "HS256",
                expiresIn: access_jwtExpiry,
            }
            try{
                var access_token = jwt.sign(payload,jwt_secret,options)
            }catch (error) {
                console.log(error,"trial")
            }
            return res.status(200).json({
                'id': id,
                'email': user.email,
                'accessToken': access_token,
            })
        } catch (error) {
            return res.status(400).json({
                message:"Failed to login!",
                error: error.toString()
            });
        }
    },

};

module.exports = UserController;

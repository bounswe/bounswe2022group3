const UserModel = require("../../models/user/user.model");
const auth = require("../../services/auth");
const crypto = require("crypto");
const jwt = require("jsonwebtoken")
//const {authorization_admin} = require("../../services/auth");
//const axios = require("axios");
const jwt_ac_secret = process.env.JWT_AC_KEY
const jwt_ref_secret = process.env.JWT_REF_KEY
const access_jwtExpiry = '24h'
const refresh_jwtExpiry = '30d'



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
            passwd_data = auth.hashPassword(password)

            user_data = {
                email: email,
                name: name,
                surname: surname,
                password_hash: passwd_data.hash,
                password_salt: passwd_data.salt,
                password_iter: passwd_data.iterations
            }
            const response = (await UserModel.createUser(user_data)); 
            if(response.createdAt){
                // TODO: User created, we must send confirmation email!
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
            const comparison_result = auth.isPasswordCorrect(user.password_hash,user.password_salt,user.password_iter,password)
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

            var access_token = jwt.sign(payload,jwt_ac_secret,options)
            var refresh_token = jwt.sign(payload,jwt_ref_secret,options)

            token_data = {
                user_id: id,
                access_token: access_token,
                refresh_token: refresh_token
            };
            const response = (await UserModel.createToken(token_data)); 
            if(response.createdAt){
                return res.status(200).json({
                    id: id,
                    email: email,
                    access_token: access_token,
                    refresh_token: refresh_token
                })
            }else{
                return res.status(400).json({
                    message: "Could not login with the parameters you provided.",
                });
            }
        } catch (error) {
            return res.status(400).json({
                message:"Failed to login!",
                error: error.toString()
            });
        }
    },
    refresh_access_token: async function (req, res) {

        const { user_id, refresh_token } = req.body;

        try {
            jwt.verify(refresh_token, jwt_ref_secret, (err, decoded) => {
                tokenError = err;
                decrytedData = decoded;
            });
            // Acquire ID from decrypted token
            id = decrytedData.id;
            // Does given refresh token exist in db
            const tokens = await UserModel.getTokensById(id);
            if (!tokens) {
                return res
                    .status(400)
                    .json({ message: "The token does not exist." });
            }
            // Token exists, check if it belongs to same user
            if(user_id !== id){
                return res
                    .status(400)
                    .json({ message: "The token exists but user id mismatch." });
            }
            // Generate ACT
            const payload = {
                'id': id,
            };
            const options = {
                algorithm: "HS256",
                expiresIn: access_jwtExpiry,
            }
            var access_token = jwt.sign(payload,jwt_ac_secret,options)
            token_data = {
                user_id: id,
                access_token: access_token,
                refresh_token: refresh_token
            };
            const response = (await UserModel.createToken(token_data)); 
            // TODO: Check if this updates the token data, if not avoid duplicates
            if(response.createdAt){
                return res.status(200).json({
                    message: "Access Token Updated!",
                    access_token: access_token
                })
            }else{
                return res.status(400).json({
                    message: "Failed while creating Tokens at db!",
                });
            }
        } catch (error) {
            return res.status(400).json({
                message:"Failed to refresh access-token!",
                error: error.toString()
            });
        }
    },
    confirmEmail: async function (req, res) {

        const { email, password } = req.body;

        try {
           

        } catch (error) {
            return res.status(400).json({
                message:"Failed to send confirmation mail!",
                error: error.toString()
            });
        }
    },
};

module.exports = UserController;

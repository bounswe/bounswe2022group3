const UserModel = require("../../models/user/user.model");
const auth = require("../../services/auth");
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
            // Check if user already exists
            const user = await UserModel.getUserByEmail(email);
            if (user) {
                return res
                    .status(409)
                    .json({ message: "The user already exists." });
            }

            // Proceeding with signup
            // Hash the password
            passwd_data = auth.hashPassword(password)

            // Save all data in DB
            user_data = {
                email: email,
                name: name,
                surname: surname,
                password_hash: passwd_data.hash,
                password_salt: passwd_data.salt,
                password_iter: passwd_data.iterations
            }
            const response = (await UserModel.createUser(user_data));
            if (response.createdAt) {
                // TODO: User created, we must send confirmation email!
                return res.status(201).json({
                    created_at: response.createdAt,
                    message: `Created the user with ${email}`,
                })
            } else {
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
            // Check if user exists in DB
            const user = await UserModel.getUserByEmail(email);
            if (!user) {
                return res
                    .status(403)
                    .json({ message: "The user does not exist." });
            }

            // Hash the req password, compare with the one in db
            const comparison_result = auth.isPasswordCorrect(user.password_hash, user.password_salt, user.password_iter, password)
            if (!comparison_result) {
                return res.status(401).json({
                    message: "Incorrect Password !",
                });
            }

            // If they match, create access token and refresh token, return them 
            const access_token = await auth.generateToken(email, jwt_ac_secret,access_jwtExpiry)
            const refresh_token = await auth.generateToken(email, jwt_ref_secret,refresh_jwtExpiry)

            // Save them to DB
            token_data = {
                email: email,
                access_token: access_token,
                refresh_token: refresh_token
            };
            const response = (await UserModel.createToken(token_data));
            if (response.createdAt) {
                return res.status(200).json({
                    id: user._id,
                    email: email,
                    access_token: access_token,
                    refresh_token: refresh_token
                })
            } else {
                return res.status(400).json({
                    message: "Could not login with the parameters you provided.",
                });
            }
        } catch (error) {
            return res.status(400).json({
                message: "Failed to login!",
                error: error.toString()
            });
        }
    },
    refresh_tokens: async function (req, res) {
        const { email, refresh_token } = req.body;// email?
        try {
            // does refresh token exist in DB 
            const tokens = await UserModel.getTokensByEmail(email);
            if (!tokens) {
                return res
                    .status(400)
                    .json({ message: "The token does not exist." });
            }
            // If exists, decrypt
            jwt.verify(refresh_token, jwt_ref_secret, (err, decoded) => {
                tokenError = err;
                decrytedData = decoded;
                console.log(decoded)
            });
            // Acquire email from decrypted token
            console.log(decrytedData)
            token_email = decrytedData.email;

            // Token exists, check if it belongs to same user
            if (email !== token_email) {
                return res
                    .status(400)
                    .json({ message: "The token exists but email mismatch." });
            }
            // Generate new tokens and update DB
            const new_access_token = await auth.generateToken(email, jwt_ac_secret,access_jwtExpiry)
            const new_refresh_token = await auth.generateToken(email, jwt_ref_secret,refresh_jwtExpiry)
            tokens.access_token = new_access_token
            tokens.refresh_token = new_refresh_token
            tokens.save()
            return res.status(200).json({
                message: "Access and Refresh Tokens are Updated!",
                access_token: new_access_token,
                refresh_token: new_refresh_token,
            })
        } catch (error) {
            return res.status(400).json({
                message: "Failed to refresh tokens!",
                error: error.toString()
            });
        }
    },
};

module.exports = UserController;

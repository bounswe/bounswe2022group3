const UserModel = require("../../models/user/user.model");
const TokensModel = require("../../models/tokens/tokens.model");
const auth = require("../../services/auth");
const { sendEmail, send_confirmation_email } = require("../../services/email/email")
const jwt = require("jsonwebtoken")
const crypto = require("crypto");
const jwt_ac_secret = process.env.JWT_AC_KEY
const jwt_ref_secret = process.env.JWT_REF_KEY
const jwt_conf_secret = jwt_ref_secret
const access_jwtExpiry = '24h'
const refresh_jwtExpiry = '7d'
const confirmation_token_expiry = '1d'




const UserController = {
    register: async function (req, res) {
        const { email, name, surname, password, agreement } = req.body;
        try {
            if (!agreement) {
                return res
                    .status(400)
                    .json({ message: "You must agree to the Terms of Use and Privacy Policy ." });
            }
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
            const confirmationToken = await auth.generateToken(email, jwt_conf_secret, confirmation_token_expiry)

            token_data = {
                email: email,
                password_hash: passwd_data.hash,
                password_salt: passwd_data.salt,
                password_iter: passwd_data.iterations,
                confirmation_token: confirmationToken,
            };
            const response_tokens = (await TokensModel.createToken(token_data));
            if (!(response_tokens.createdAt)) {
                return res.status(400).json({
                    message: "Could not create tokens with the parameters you provided.",
                });
            }
            // Save all data in DB
            user_data = {
                email: email,
                name: name,
                surname: surname,
            }
            const response = (await UserModel.createUser(user_data));
            if (response.createdAt) {
                payload = {
                    first_name: name,
                    last_name: surname,
                    token: confirmationToken,
                };
                const conf_response = await send_confirmation_email(email, payload);
                console.log(conf_response.message)
                if (!(conf_response.res)) {
                    return res.status(400).json({
                        message: conf_response.message,
                    });
                }
                return res.status(201).json({
                    created_at: response.createdAt,
                    message: `Confirmation mail send to ${email}.`,
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
            // Check if user tokens exists in DB
            const tokens = await TokensModel.getTokensByEmail(email);
            if (!tokens) {
                return res
                    .status(403)
                    .json({ message: "The user does not exist." });
            } else if (tokens.confirmation_token != "confirmed") {
                return res
                    .status(403)
                    .json({ message: "Please confirm your email to login to your account." });
            }
            // Hash the req password, compare with the one in db
            const comparison_result = auth.isPasswordCorrect(tokens.password_hash, tokens.password_salt, tokens.password_iter, password)
            if (!comparison_result) {
                return res.status(401).json({
                    message: "Incorrect Password !",
                });
            }
            // If they match, create access token and refresh token, return them 

            const access_token = await auth.generateToken(email, jwt_ac_secret, access_jwtExpiry)
            const refresh_token = await auth.generateToken(email, jwt_ref_secret, refresh_jwtExpiry)
            // Save them to DB
            token_data = {
                email: email,
                access_token: access_token,
                refresh_token: refresh_token,
                confirmation_token: "confirmed",// since we already checked confirmation token, we can set it to confirmed, nothing changes. We have to set it to something, otherwise it will be null. 
            };
            const response = (await TokensModel.createToken(token_data));
            const user = await UserModel.getUserByEmail(email);
            if (response.createdAt) {
                return res.status(200).json({
                    id: user._id,
                    name: user.name,
                    surname: user.surname,
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
            const tokens = await TokensModel.getTokensByEmail(email);
            if (!tokens) {
                return res
                    .status(400)
                    .json({ message: "The token does not exist." });
            } else if (tokens.confirmation_token != "confirmed") {
                return res
                    .status(403)
                    .json({ message: "Please confirm your email to refresh your tokens." });
            }
            // If exists, decrypt
            const decoded = jwt.verify(refresh_token, jwt_ref_secret);
            // Acquire email from decrypted token
            token_email = decoded.email;

            // Token exists, check if it belongs to same user
            if (email !== token_email || tokens.refresh_token !== refresh_token) {
                return res
                    .status(400)
                    .json({ message: "The token does not exist." });// The token exists but email mismatch.
            }
            // Generate new tokens and update DB
            const new_access_token = await auth.generateToken(email, jwt_ac_secret, access_jwtExpiry)
            const new_refresh_token = await auth.generateToken(email, jwt_ref_secret, refresh_jwtExpiry)
            tokens.access_token = new_access_token
            tokens.refresh_token = new_refresh_token
            tokens.save();
            const user = await UserModel.getUserByEmail(email);
            return res.status(200).json({
                // message: "Access and Refresh Tokens are Updated!",
                id: user._id,
                name: user.name,
                surname: user.surname,
                image: user.image,
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
    logout: async function (req, res) {
        const auth = req.auth;
        try {
            // Remove access and refresh tokens upon logging out
            const tokens = await TokensModel.getTokensByEmail(auth.email);
            tokens.access_token = ""
            tokens.refresh_token = ""
            tokens.save()
            return res.status(200).json({
                message: "Logout is successful!",
            })
        } catch (error) {
            return res.status(400).json({
                message: "Failed to logout!",
                error: error.toString()
            });
        }
    },

    confirmEmail: async function (req, res) {
        const { code } = req.body;
        try {

            // JWT Validation, also checks expiry
            const decoded = jwt.verify(code, jwt_conf_secret);
            // Acquire email from decrypted token
            const email = decoded.email;

            // Return user data
            const user = await UserModel.getUserByEmail(email);

            if (!user) {
                return res
                    .status(400)
                    .json({ message: "There is not any registered user with this email!" });
            }

            const tokens = await TokensModel.getTokensByEmail(email);
            if (!tokens) {
                return res
                    .status(400)
                    .json({ message: "The token does not exist." });
            }

            if (tokens.confirmation_token != code) {
                return res.status(400).json({
                    message: "Confirmation token does not match.",
                })
            }

            const new_access_token = await auth.generateToken(email, jwt_ac_secret, access_jwtExpiry)
            const new_refresh_token = await auth.generateToken(email, jwt_ref_secret, refresh_jwtExpiry)
            tokens.access_token = new_access_token
            tokens.refresh_token = new_refresh_token
            tokens.confirmation_token = "confirmed"
            tokens.save()
            return res.status(200).json({
                id: user._id,
                name: user.name,
                surname: user.surname,
                email: email,
                access_token: new_access_token,
                refresh_token: new_refresh_token,
            })

        } catch (error) {
            return res.status(400).json({
                message: "Failed to confirm email!",
                error: error.toString()
            });
        }
    },
    resend_confirmation: async function (req, res) {
        const { email } = req.body;
        try {
            // Check the related users confirmation token.
            const tokens = await TokensModel.getTokensByEmail(email);
            if (!tokens) {
                return res
                    .status(400)
                    .json({ message: "The user does not exist." });
            }
            else {
                const user = await UserModel.getUserByEmail(email);
                const conf = tokens.confirmation_token
                if (conf !== 'confirmed') {
                    // resend conf mail
                    const confirmationToken = await auth.generateToken(email, jwt_conf_secret, confirmation_token_expiry)
                    tokens.confirmation_token = confirmationToken
                    tokens.save()
                    payload = {
                        first_name: user.name,
                        last_name: user.surname,
                        token: confirmationToken,
                    };
                    const conf_response = await send_confirmation_email(email, payload);
                    if (!(conf_response.res)) {
                        return res.status(400).json({
                            message: conf_response.message,
                        });
                    }
                    return res.status(200).json({
                        message:
                            "A verification email has been sent to " +
                            email +
                            ". The link will be expired after one day.",
                    });
                }
                else {
                    return res
                        .status(200)
                        .json({ message: "User is already confirmed. Proceed to login." });
                }
            }
        } catch (error) {
            return res.status(400).json({
                message: "Failed to resend confirmation mail!",
                error: error.toString()
            });
        }
    },
};

module.exports = UserController;

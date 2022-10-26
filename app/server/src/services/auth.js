//We will do the authorization checks here !!
const jwt = require('jsonwebtoken');
const UserModel = require("../models/user/user.model");
const TokensModel = require("../models/tokens/tokens.model");
const crypto = require("crypto");
const jwt_ac_secret = process.env.JWT_AC_KEY
const jwt_ref_secret = process.env.JWT_REF_KEY


const authorization = async (req, res, next) => {

    try {
        let token = req.headers.authorization
        if (!token) {
            return res.status(400).json({
                message: "Authorization token missing !",
            });
        }
        // JWT Validation, also checks expiry
        token = token.substring(7); // getting rid of  'Bearer' part
        jwt.verify(token, jwt_ac_secret, (err, decoded) => {
            tokenError = err;
            decrytedData = decoded;
        });

        if (tokenError) {
            return res.status(400).json({
                message: tokenError.toString(),
            });
        }
        // Acquire email from decrypted token
        const email = decrytedData.email;

        // Return user data
        const user = await UserModel.getUserByEmail(email);
        if (user) {
            // Populating user token and checking if the request token is deprecated.
            token_populated_user = await UserModel.getPopulatedTokens(user._id)
            if (token_populated_user.tokens.access_token !== token) {
                return res.status(400).json({
                    message: "This token is deprecated, user has been logged-out or has a new token now!",
                });
            }
            req.auth = {
                id: user._id,
                email: user.email,
                name: user.name,
                surname: user.surname,
                createdAt: user.createdAt
            }
        }
        else {
            return res.status(400).json({
                message: "There is no existing user with the given token !",
            });
        }
        return next();
    } catch (error) {
        return res.status(400).json({
            message: error.toString(),
        });
    }

};

function hashPassword(password) {
    try {
        var salt = crypto.randomBytes(128).toString('hex');
        var iterations = 10000;
        var hash = crypto.pbkdf2Sync(password, salt, iterations, keylen = 512, 'sha256').toString('hex');;
        return {
            salt: salt,
            hash: hash,
            iterations: iterations
        };
    } catch (error) {
        return {
            error: error
        }
    }
}

function isPasswordCorrect(savedHash, savedSalt, savedIterations, passwordAttempt) {
    try {
        var trial = crypto.pbkdf2Sync(passwordAttempt, savedSalt, Number(savedIterations), keylen = 512, 'sha256').toString('hex');
    } catch (error) {
        return {
            error: error
        }
    }
    return savedHash == trial;
}

async function generateToken(email, secret, expiry) {
    try {
        // Generate ACT
        const payload = {
            'email': email,
        };
        const options = {
            algorithm: "HS256",
            expiresIn: expiry,
        }
        const created_token = jwt.sign(payload, secret, options)
        return created_token
    } catch (error) {
        return {
            error: error
        }
    }
}

module.exports = { authorization, hashPassword, isPasswordCorrect, generateToken }
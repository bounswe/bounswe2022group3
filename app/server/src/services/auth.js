//We will do the authorization checks here !!
const jwt = require('jsonwebtoken');
const UserModel = require("../models/user/user.model");
const crypto = require("crypto");
const jwt_ac_secret = process.env.JWT_AC_KEY
const jwt_ref_secret = process.env.JWT_REF_KEY


const authorization = async (req, res, next) => {

    try{
        token = req.headers.authorization
        if(!token){
            return res.status(400).json({
                message: "Authorization token missing !",
            });
        }
        // JWT Validation
        token = token.substring(7); // getting rid of  'Bearer' part
        jwt.verify(token, jwt_ac_secret, (err, decoded) => {
            tokenError = err;
            decrytedData = decoded;
        });

        if(tokenError){
            return res.status(400).json({
                message: tokenError.toString(),
            });
        }

        // Acquire email from decrypted token
        email = decrytedData.email;
        
        // Return user data
        const user = await UserModel.getUserByEmail(id);
        if(user){
            req.auth = user
        }
        else{
            return res.status(400).json({
                message: "There is no existing user with the given token !",
            });
        }
        return next();
    }catch (error) {
        return res.status(400).json({
            message: error.toString(),
        });
    }

};

function hashPassword(password) {
    try{
        var salt = crypto.randomBytes(128).toString('hex');
        var iterations = 10000;
        var hash = crypto.pbkdf2Sync(password, salt, iterations,keylen=512,'sha256').toString('hex');;
        return {
            salt: salt,
            hash: hash,
            iterations: iterations
        };
    }catch (error) {
        return {
            error: error
        }
    }
}

function isPasswordCorrect(savedHash, savedSalt, savedIterations, passwordAttempt) {
    try{
        var trial = crypto.pbkdf2Sync(passwordAttempt, savedSalt, Number(savedIterations),keylen=512,'sha256').toString('hex'); 
    }catch (error) {
        return {
            error: error
        }
    }
    return savedHash == trial;
}

async function generateToken(email, secret, expiry) {
    try{
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
    }catch (error) {
        return {
            error: error
        }
    }
}

module.exports = {authorization, hashPassword, isPasswordCorrect,generateToken}
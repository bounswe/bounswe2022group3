//We will do the authorization checks here !!
const jwt = require('jsonwebtoken');
const UserModel = require("../models/user/user.model");
const crypto = require("crypto");
const jwt_ac_secret = process.env.JWT_AC_KEY
const jwt_ref_secret = process.env.JWT_REF_KEY


const authorization = async (req, res, next) => {

    try{
        // JWT Validation
        try{
            token = req.headers.authorization
        }catch (error){
            return res.status(400).json({
                message: error.toString(),
            });
        }
        if(!token){
            return res.status(400).json({
                message: "Authorization token missing !",
            });
        }
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
        
        // Get user data, inserting it to request
        console.log(decrytedData)
        // !!!!!!!!!!!!!!!!!!!!!!!!!
        // What data should I put in request, all user data or just email,name,surname 
        const user = await UserModel.getUserByEmail(id);
        if(user){
            req.auth = user // user_id
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

async function generateAccessToken(user_id, refresh_token) {
    try{
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
        return access_token
    }catch (error) {
        return {
            error: error
        }
    }
}

module.exports = {authorization, hashPassword, isPasswordCorrect}
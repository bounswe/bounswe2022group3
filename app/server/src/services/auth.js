//We will do the authorization checks here !!
const jwks = require("../services/jwkeys");
const jwt = require('jsonwebtoken');
const UserModel = require("../models/user/user.model");

const jwt_secret = process.env.JWT_KEY


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
        jwt.verify(token, jwt_secret, (err, decoded) => {
            tokenError = err;
            decrytedData = decoded;
        });

        if(tokenError){
            return res.status(400).json({
                message: tokenError.toString(),
            });
        }

        // Acquire ID from decrypted token
        id = decrytedData.id;
        
        // Get user data, inserting it to request
        // What data should I put in request, all user data or just email,name,surname 
        const user = await UserModel.getUserByID(id);
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
        console.log(error.toString());
    }

};

module.exports = {authorization}
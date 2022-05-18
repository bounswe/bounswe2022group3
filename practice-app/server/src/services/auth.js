//We will do the authorization checks here !!
const jwks = require("../services/jwkeys");
const jwt = require('jsonwebtoken');
const UserModel = require("../models/users/users.model");
const axios = require("axios");
require("dotenv").config();

const AUTH0_DOMAIN = process.env.auth0_domain;
const client_id = process.env.auth0_client_id;
const client_secret = process.env.auth0_clientSecret;
const audience = process.env.auth0_audience;
const auth0_connection = process.env.auth0_connection

const aud = process.env.auth0_audience

const authorization = async (req, res, next) => {

    try{
        // JWT Validation
        // Get pem certificates and verify the header token
        const pem = jwks.getPem();
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
        token = token.substring(7);
        jwt.verify(token, pem, (err, decoded) => {
            tokenError = err;
            decrytedData = decoded;
        });
        // Token audience validation
        try{
            if(tokenError){
                return res.status(400).json({
                    message: tokenError.toString(),
                });
            }
            if(decrytedData.aud !== aud ){
                return res.status(400).json({
                    message: "Audience mismatch !",
                });
            }
            // Acquire ID from decrypted token
            id = decrytedData.sub.substring(6);
        }catch (error){
            return res.status(400).json({
                message: error.toString(),
            });
        }
        
        // Get user data, inserting it to request
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
const authorization_admin = async () => {
    try{
        const grant_type = 'client_credentials';
        const url = `https://${AUTH0_DOMAIN}/oauth/token`;
        const payload = {
            'client_id': client_id,
            'client_secret': client_secret,
            'grant_type': grant_type,
            'audience': audience,
        };
        const options = {
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const response = (await axios.post(url, payload, options)).data;
        if (response.access_token) {
            return response.access_token
        }else{
            return ({
                error: "Failed to acquire Admin Authorization.",
            })
        }
    }catch (error){
        return ({
            error: error.toString(),
        })
    }
};

module.exports = {authorization, authorization_admin}
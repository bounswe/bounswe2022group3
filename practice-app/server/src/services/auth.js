//We will do the authorization checks here !!
const jwks = require("../services/jwkeys");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const aud = process.env.auth0_audience

exports.authorization = (req, res, next) => {

    // JWT Validation
    const pem = jwks.getKeys();
    jwt.verify(req.access_token, pem[0], (err, decoded) => {
        tokenError = err;
        decrytedData = decoded;
    });
    console.log(decrytedData)

    // Token audience validation
    if(decrytedData.aud !== aud ){
        return res.status(400).json({
            message: errors.array()[0].msg,
        });
    }

    // Verify Scopes
    // should I check if the token userid mathces ????

    // const errors = validationResult(req);
    // if (errors.isEmpty()) {
    //     return next();
    // }

    // return res.status(400).json({
    //     message: errors.array()[0].msg,
    // });
    return next();
};


const axios = require("axios");

const jwkToPem = require("jwk-to-pem");

require("dotenv").config();


var KEYS =[];
const AUTH0_DOMAIN = process.env.auth0_domain

const getJwks = async () => {
    try{
        const url = `https://${AUTH0_DOMAIN}/.well-known/jwks.json`;
        const response = (await axios.get(url)).data;
        response.keys.forEach(function(e,i,a) {
            const pem = jwkToPem(e)
            KEYS.push(pem);
        });
        // KEYS.forEach(function(e,i,a) {
        //     console.log("--->>", e);
        // });
    }catch (error){
        // TODO: throw error!
        console.log(error.toString());
    }
};

const getPem = () => {
    //console.log(KEYS);
    return KEYS[0];
}

module.exports = {getPem, getJwks};
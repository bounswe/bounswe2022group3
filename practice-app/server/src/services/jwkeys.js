

const axios = require("axios");

const jwkToPem = require("jwk-to-pem");

require("dotenv").config();


var KEYS =[];
const AUTH0_DOMAIN = process.env.auth0_domain

const getJwks = async () => {
    const url = `https://${AUTH0_DOMAIN}/.well-known/jwks.json`;
    const response = (await axios.get(url)).data;
    //const pem = jwkToPem()
    //console.log(response);
    response.keys.forEach(function(e,i,a) {
        //console.log("--->>", e);
        const pem = jwkToPem(e)
        KEYS.push(pem);
    });
    // KEYS.forEach(function(e,i,a) {
    //     console.log("--->>", e);
    // });
};

const getKeys = () => {
    //console.log(KEYS);
    return KEYS;
}

module.exports = {getKeys, getJwks};
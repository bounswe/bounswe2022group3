const crypto = require("crypto");
const UserModel = require("../../models/users/users.model");
const { encryptPassword } = require("../../services/password");
const axios = require("axios");
const jwt = require('jsonwebtoken');
require("dotenv").config();


const UserController = {
    register: async function (req, res) {

        const AUTH0_DOMAIN = process.env.auth0_domain;
        const client_id = process.env.auth0_client_id;
        const client_secret = process.env.auth0_clientSecret;
        const grant_type = 'client_credentials';
        const audience = process.env.auth0_audience;
        const auth0_connection = process.env.auth0_connection
        access_token ="";

        const { first_name, last_name, email, password } = req.body;

        try {

            const url = `https://${AUTH0_DOMAIN}/oauth/token`;
            // console.log(url)
            // console.log(client_id)
            // console.log(client_secret)
            // console.log(grant_type)
            // console.log(audience)

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
            const meta = response.meta
            if (response.access_token) {
                access_token = response.access_token
                // res.status(201).json({
                //     access_token: response.access_token,
                // })
            }else{
                //not authorized ,????
            }
             // check if user already exist
            try {
                const url_email_check = `https://${AUTH0_DOMAIN}/api/v2/users-by-email?email=${email}`;
                console.log(access_token)
                const headers_email_check = {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                };
                const response_email_check = (await axios.get(url_email_check,headers_email_check)).data;
                if (response_email_check.length === 0) {
                    console.log("Proceeding with signup")

                    const url_signup = `https://${AUTH0_DOMAIN}/api/v2/users`;
                    const payload_signup = {
                        'email': email,
                        'password': password,
                        'connection': auth0_connection,
                        'given_name': first_name,
                        'family_name': last_name,
                    };
                    const headers_signup = {
                        headers: {
                            Authorization: `Bearer ${access_token}`,
                        },
                    };
                    const response_signup = (await axios.post(url_signup,payload_signup,headers_signup)).data;
                    if (response_signup.created_at) {
                        res.status(201).json({
                            message: `Created the user with ${email}`,
                        })
                    }
                    else{
                        res.status(400).json({
                            message: "Could not create a user with the parameters you provided.",
                        })
                    }
                }
                else{
                    return res
                        .status(409)
                        .json({ message: "User Already Exists. Please Login" });
                }
            } catch (error) {
                console.log(error.toString());
            }

        } catch (error) {
            console.log(error.toString());
        }
    },
    login: async function (req, res) {
        const AUTH0_DOMAIN = process.env.auth0_domain;
        const client_id = process.env.auth0_client_id;
        const client_secret = process.env.auth0_clientSecret;
        const grant_type = 'password';
        const audience = process.env.auth0_audience;

        const { email, password } = req.body;

        try {

            const url = `https://${AUTH0_DOMAIN}/oauth/token`;

            const payload = {
                'client_id': client_id,
                'client_secret': client_secret,
                'grant_type': grant_type,
                'audience': audience,
                'username': email,
                'password': password,
            };
            // const headers = {
            //     headers: {
            //         Authorization: `Bearer ${access_token}`,
            //     },
            // };
            const response = (await axios.post(url, payload)).data;
            if (response.access_token) {
                //access_token = response.access_token

                // TODO: Find a way to reach server.js global KEYS array from this file
                //const pem = KEYS;
                //console.log(pem);
                //const decodedToken = jwt.verify(response.access_token, 'RANDOM_TOKEN_SECRET');
                res.status(202).json({
                    access_token: response.access_token,
                    scope: response.scope,
                })
            }
        } catch (error) {
            console.log(error.toString());
        }
    },
};

module.exports = UserController;

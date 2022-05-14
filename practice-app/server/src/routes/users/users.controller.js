const crypto = require("crypto");
const UserModel = require("../../models/users/users.model");
const { encryptPassword } = require("../../services/password");
const {authorization_admin} = require("../../services/auth");
const axios = require("axios");
const jwt = require('jsonwebtoken');
require("dotenv").config();

const AUTH0_DOMAIN = process.env.auth0_domain;
const client_id = process.env.auth0_client_id;
const client_secret = process.env.auth0_clientSecret;
const audience = process.env.auth0_audience;
const auth0_connection = process.env.auth0_connection
access_token_admin ="";

const UserController = {
    trialEndpoint: async function (req, res) {
        console.log(req.auth);
    },
    register: async function (req, res) {
        const { first_name, last_name, email, password } = req.body;

        try {
            try{
                access_token_admin = await authorization_admin();
                console.log(access_token_admin)
                if(access_token_admin.error){
                    return res.status(401).json({
                        message: access_token_admin.error,
                    })
                }
            }catch (error) {
                return res.status(400).json({
                    message: error.toString(),
                });
            } 
            // Check if user already exist
            const user = await UserModel.getUserByEmail(email);
            if (user) {
                return res
                    .status(409)
                    .json({ message: "User Already Exists. Please Login" });
            }
            console.log("Proceeding with signup")
            // Proceeding with signup
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
                    Authorization: `Bearer ${access_token_admin}`,
                },
            };
            const response_signup = (await axios.post(url_signup,payload_signup,headers_signup)).data;
            if (response_signup.created_at) {
                // TODO: We need to redirect user to login after sign-up
                return res.status(201).json({
                    message: `Created the user with ${email}`,
                })
            }else{
                return res.status(400).json({
                    message: "Could not create a user with the parameters you provided.",
                });
            }
        } catch (error) {
            return res.status(400).json({
                message: error.toString(),
            });
        }
    },
    login: async function (req, res) {
        const grant_type = 'password';
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
            const response = (await axios.post(url, payload)).data;
            if (response.access_token) {
                res.status(202).json({
                    access_token: response.access_token,
                })
            }
        } catch (error) {
            return res.status(400).json({
                message: error.toString(),
            });
        }
    },
};

module.exports = UserController;

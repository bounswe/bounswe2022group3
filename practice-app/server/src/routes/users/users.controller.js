const crypto = require("crypto");
const UserModel = require("../../models/users/users.model");
const { encryptPassword } = require("../../services/password");
const axios = require("axios");
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
            // let { rule, tag } = defineRule(hashtag, has_image, lang)
            // const payload = {
            //     "add": [
            //         {
            //             value: rule,
            //             tag: tag
            //         }
            //     ]
            // }
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

        
        //const oldUser = await UserModel.getUserByEmail(email);
        // const userExists = getUser(email)
        // if(userExists) {
        //     return res
        //         .status(409)
        //         .json({ message: "User Already Exists. Please Login" });
        // }
        // const AUTH0_DOMAIN = process.env.auth0_domain
        // const client_id = process.env.auth0_client_id
        // const client_secret = process.env.auth0_clientSecret
        // const grant_type = 'client_credentials'
        // const audience = process.env.auth0_audience
        // // Get user input
        // const { first_name, last_name, email, password } = req.body;
        
        // const url = `https://${AUTH0_DOMAIN}/oauth/token`;
        // console.log(url)
        // console.log(client_id)
        // console.log(client_secret)
        // console.log(grant_type)
        // console.log(audience)

        // const payload = {
        //     client_id: client_id,
        //     client_secret: client_secret,
        //     grant_type: grant_type,
        //     audience: audience,
        // };
        // // const headers = {
        // //     headers: {
        // //         Authorization: `Bearer ${process.env.LICHESS_TOKEN}`,
        // //     },
        // // };
        // const headers = {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // }
        // const response = (await axios.post(url, payload,headers)).data;

        // if (response && response.access_token) {
        //     return res.status(200).json({
        //         access_token: response.access_token,
        //     });
        // }
        // return res.status(500).json({
        //     message: "Could not initiate a game against the AI",
        // });
        // check if user already exist
        // const oldUser = await UserModel.getUserByEmail(email);

        // if (oldUser) {
        //     return res
        //         .status(409)
        //         .json({ message: "User Already Exists. Please Login" });
        // }

        // //Encrypt user password
        // const salt = crypto.randomBytes(128).toString("hex");
        // const encryptedPassword = encryptPassword(password, salt);

        // // Create user in our database
        // const user = await UserModel.createUser(
        //     first_name,
        //     last_name,
        //     email,
        //     encryptedPassword,
        //     salt
        // );

        // if (user) {
        //     res.status(200).json({
        //         message: "User was created successfully.",
        //     });
        // }
        // res.status(500).json({
        //     message: "Could not create the user",
        // });
        // response => {
        //     res.status(200).json({
        //         message: "User was created successfully.",
        //     });
        // }
    },
};

module.exports = UserController;

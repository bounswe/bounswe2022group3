const emailModel = require("../../models/verify/verify.model");
const axios = require("axios");
const { response } = require("express");

const EmailController = {
    verifyEmail: async function (req, res) {
        const { email } = req.body;
        const url = `https://api.eva.pingutil.com/email?email=${email}`;

        try {
            const response = (await axios.get(url)).data;
            return res.status(200).json({
                ok: response,
            });
        } catch (error) {
            return res.status(400).json({
                message: error.toString(),
            });
        }
    },

    saveEmail: async function (req, res) {
        
        const { email } = req.body;
        try {
        
            if(!(await emailModel.getEmail(email))){
                savedEmail = await emailModel.Email.create({
                    email: email,
                });
            }else{
                return res.status(409).json({
                    message: "email already exist.",
                });
            }
        }catch(e){
            return res.status(400).json({
                message: e.toString(),
            });
        }
        if(savedEmail) {
            return res.status(200).json({
                email: email,
            });
        }
    },

    getEmails: async function (req, res) {
        try {
            emails = await emailModel.Email.find({});
      
        } catch (e) {
            return res
                .status(500)
                .json({ message: "Could not retrieve emails."});
        }

        return res.status(200).json({
            emails,
        });
    },

};

module.exports = EmailController;

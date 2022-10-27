const userModel = require("../../models/user/user.model");
const personalInfoModel = require("../../models/personalInfo/personalInfo.model");
const mongoose = require("mongoose");

const UserProfileController = {
    
    updatePersonalInfo: async function (req,res) {

        try{
            const {id, bio} = req.body
            console.log(id)
            console.log(bio)
            const profile = await userModel.getUserByID(id)
            const personalInfoId = profile.personal_info 
            console.log(personalInfoId)
            personalInfoModel.updateBio(personalInfoId, bio)
            res.status(201).send({"message": "Updated bio successfully"})

        }   
        catch (e) {
            res.status(400).send({"error": e.toString()})
        }
    }, 

    
    getProfile: async function (req,res) {
            try{
                const {id} = req.body
                console.log(id)
                // Need a new function in user model that returns populated versions of personal info and badges
                const profile = await userModel.getUserByID(id)
                res.status(201).send({profile})  

            }
            catch (e) {
                res.status(400).send({"error": e.toString() })
            }

    }
};

module.exports = UserProfileController;

const userProfileModel = require("../../models/userProfile/userProfile.model");
const personalInfoModel = require("../../models/personalInfo/personalInfo.model");
const badgeModel = require("../../models/badges/badges.model");
const mongoose = require("mongoose");

const UserProfileController = {
    
    postCreate: async function (req,res) {

        try{
            const {name, surname, email} = req.query
            const [idProfile, profile] = await userProfileModel.createUserProfile(name, surname, email, Date.now())
            const [idInfo, info] = await personalInfoModel.createPersonalInfo(idProfile)
            profile.personal_info = idInfo
            profile.save()
            res.status(201).send({"message": "Created user profile successfully"})

        }   
        catch (e) {
            res.status(400).send({"error": e})
        }
    }, 

    getProfile: async function (req,res) {
            try{
                const id = req.params.id
                const profile = await userProfileModel.getUserProfile(id)
                const info = await personalInfoModel.getPersonalInfo(profile.personal_info)
                const badges = []

                for(let x of info.badges){
                    const badge = await badgeModel.getBadge(x)
                    badges.push({"id": badge._id, "title": badge.title, "description": badge.description})
                }

                const valueToSend = 
                {
                "id": profile.user_profile_id, 
                "email": profile.email,
                "name": profile.name, 
                "surname": profile.surname,
                "personal info": {
                    "bio": info.bio,
                    "badges": badges,
                    "interests": info.interests
                },
                "is_private": profile.is_private 
                }
                res.status(201).send({"message": valueToSend})
            }
            catch (e) {
                console.log("Cannot get")
                res.status(400).send({"error": e })
            }

    }
};

module.exports = UserProfileController;

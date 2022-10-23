const UserModel = require("../../models/users/users.model");

const BasicController = {

    getCall: async function (req, res) {

        try {

            // res.send({ "status": "ok", "message": "Hello!" })
            res.sendFile("/home/ubuntu/a.png")
        }
        catch (e) {
            console.log("Error on getCall:", e)
            res.status(400).send({ "error": e })
        }
    },
    getCreate: async function (req, res) {
        try {
            await UserModel.createUser("email", "name", "surname", "password")
            res.send({ "status": "ok", "message": "Created!" })
        }
        catch (e) {
            console.log("Error on getCreate:", e)
            res.status(400).send({ "error": e })
        }
    },
    getDelete: async function (req, res) {
        try {
            await UserModel.deleteUser("email")
            res.send({ "status": "ok", "message": "Deleted!" })
        }
        catch (e) {
            console.log("Error on getDelete:", e)
            res.status(400).send({ "error": e })
        }
    }
};

module.exports = BasicController;
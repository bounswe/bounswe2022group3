const UserModel = require("../../models/users/users.model");
const { sendEmail } = require("../../services/email/email")

const BasicController = {

    getCall: async function (req, res) {

        try {
            // res.send({ "status": "ok", "message": "Hello!" })
            const email = "a@b.c"
            sendEmail(
                email,
                "confirmation email",
                {
                    first_name: "first",
                    last_name: "last",
                    token: "SomeRandomToken",
                },
                function (err) {
                    if (err) {
                        res.status(500).json({
                            message:
                                "Technical Issue! Please, click on resend to verify your email.",
                        });
                    }
                    res.status(200).json({
                        message:
                            "User was created successfully. A verification email has been sent to " +
                            email +
                            ". The link will be expired after one day. If you did not get a verification email, click on resend.",
                    });
                }
            )


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